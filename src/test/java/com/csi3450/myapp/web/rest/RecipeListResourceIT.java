package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.RecipallApp;
import com.csi3450.myapp.domain.RecipeList;
import com.csi3450.myapp.domain.User;
import com.csi3450.myapp.domain.Recipe;
import com.csi3450.myapp.repository.RecipeListRepository;
import com.csi3450.myapp.repository.search.RecipeListSearchRepository;
import com.csi3450.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.csi3450.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RecipeListResource} REST controller.
 */
@SpringBootTest(classes = RecipallApp.class)
public class RecipeListResourceIT {

    @Autowired
    private RecipeListRepository recipeListRepository;

    /**
     * This repository is mocked in the com.csi3450.myapp.repository.search test package.
     *
     * @see com.csi3450.myapp.repository.search.RecipeListSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecipeListSearchRepository mockRecipeListSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRecipeListMockMvc;

    private RecipeList recipeList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecipeListResource recipeListResource = new RecipeListResource(recipeListRepository, mockRecipeListSearchRepository);
        this.restRecipeListMockMvc = MockMvcBuilders.standaloneSetup(recipeListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecipeList createEntity(EntityManager em) {
        RecipeList recipeList = new RecipeList();
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        recipeList.setUser(user);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeList.setRecipe(recipe);
        return recipeList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecipeList createUpdatedEntity(EntityManager em) {
        RecipeList recipeList = new RecipeList();
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        recipeList.setUser(user);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createUpdatedEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        recipeList.setRecipe(recipe);
        return recipeList;
    }

    @BeforeEach
    public void initTest() {
        recipeList = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeList() throws Exception {
        int databaseSizeBeforeCreate = recipeListRepository.findAll().size();

        // Create the RecipeList
        restRecipeListMockMvc.perform(post("/api/recipe-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeList)))
            .andExpect(status().isCreated());

        // Validate the RecipeList in the database
        List<RecipeList> recipeListList = recipeListRepository.findAll();
        assertThat(recipeListList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeList testRecipeList = recipeListList.get(recipeListList.size() - 1);

        // Validate the RecipeList in Elasticsearch
        verify(mockRecipeListSearchRepository, times(1)).save(testRecipeList);
    }

    @Test
    @Transactional
    public void createRecipeListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeListRepository.findAll().size();

        // Create the RecipeList with an existing ID
        recipeList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeListMockMvc.perform(post("/api/recipe-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeList)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeList in the database
        List<RecipeList> recipeListList = recipeListRepository.findAll();
        assertThat(recipeListList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecipeList in Elasticsearch
        verify(mockRecipeListSearchRepository, times(0)).save(recipeList);
    }


    @Test
    @Transactional
    public void getAllRecipeLists() throws Exception {
        // Initialize the database
        recipeListRepository.saveAndFlush(recipeList);

        // Get all the recipeListList
        restRecipeListMockMvc.perform(get("/api/recipe-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeList.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRecipeList() throws Exception {
        // Initialize the database
        recipeListRepository.saveAndFlush(recipeList);

        // Get the recipeList
        restRecipeListMockMvc.perform(get("/api/recipe-lists/{id}", recipeList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeList.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeList() throws Exception {
        // Get the recipeList
        restRecipeListMockMvc.perform(get("/api/recipe-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeList() throws Exception {
        // Initialize the database
        recipeListRepository.saveAndFlush(recipeList);

        int databaseSizeBeforeUpdate = recipeListRepository.findAll().size();

        // Update the recipeList
        RecipeList updatedRecipeList = recipeListRepository.findById(recipeList.getId()).get();
        // Disconnect from session so that the updates on updatedRecipeList are not directly saved in db
        em.detach(updatedRecipeList);

        restRecipeListMockMvc.perform(put("/api/recipe-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipeList)))
            .andExpect(status().isOk());

        // Validate the RecipeList in the database
        List<RecipeList> recipeListList = recipeListRepository.findAll();
        assertThat(recipeListList).hasSize(databaseSizeBeforeUpdate);
        RecipeList testRecipeList = recipeListList.get(recipeListList.size() - 1);

        // Validate the RecipeList in Elasticsearch
        verify(mockRecipeListSearchRepository, times(1)).save(testRecipeList);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeList() throws Exception {
        int databaseSizeBeforeUpdate = recipeListRepository.findAll().size();

        // Create the RecipeList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipeListMockMvc.perform(put("/api/recipe-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeList)))
            .andExpect(status().isBadRequest());

        // Validate the RecipeList in the database
        List<RecipeList> recipeListList = recipeListRepository.findAll();
        assertThat(recipeListList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecipeList in Elasticsearch
        verify(mockRecipeListSearchRepository, times(0)).save(recipeList);
    }

    @Test
    @Transactional
    public void deleteRecipeList() throws Exception {
        // Initialize the database
        recipeListRepository.saveAndFlush(recipeList);

        int databaseSizeBeforeDelete = recipeListRepository.findAll().size();

        // Delete the recipeList
        restRecipeListMockMvc.perform(delete("/api/recipe-lists/{id}", recipeList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecipeList> recipeListList = recipeListRepository.findAll();
        assertThat(recipeListList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecipeList in Elasticsearch
        verify(mockRecipeListSearchRepository, times(1)).deleteById(recipeList.getId());
    }

    @Test
    @Transactional
    public void searchRecipeList() throws Exception {
        // Initialize the database
        recipeListRepository.saveAndFlush(recipeList);
        when(mockRecipeListSearchRepository.search(queryStringQuery("id:" + recipeList.getId())))
            .thenReturn(Collections.singletonList(recipeList));
        // Search the recipeList
        restRecipeListMockMvc.perform(get("/api/_search/recipe-lists?query=id:" + recipeList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeList.getId().intValue())));
    }
}
