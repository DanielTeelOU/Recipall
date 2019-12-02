package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.RecipallApp;
import com.csi3450.myapp.domain.IngredientList;
import com.csi3450.myapp.domain.Recipe;
import com.csi3450.myapp.repository.IngredientListRepository;
import com.csi3450.myapp.repository.search.IngredientListSearchRepository;
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
 * Integration tests for the {@link IngredientListResource} REST controller.
 */
@SpringBootTest(classes = RecipallApp.class)
public class IngredientListResourceIT {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    @Autowired
    private IngredientListRepository ingredientListRepository;

    /**
     * This repository is mocked in the com.csi3450.myapp.repository.search test package.
     *
     * @see com.csi3450.myapp.repository.search.IngredientListSearchRepositoryMockConfiguration
     */
    @Autowired
    private IngredientListSearchRepository mockIngredientListSearchRepository;

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

    private MockMvc restIngredientListMockMvc;

    private IngredientList ingredientList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngredientListResource ingredientListResource = new IngredientListResource(ingredientListRepository, mockIngredientListSearchRepository);
        this.restIngredientListMockMvc = MockMvcBuilders.standaloneSetup(ingredientListResource)
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
    public static IngredientList createEntity(EntityManager em) {
        IngredientList ingredientList = new IngredientList()
            .amount(DEFAULT_AMOUNT)
            .unit(DEFAULT_UNIT);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        ingredientList.setRecipe(recipe);
        return ingredientList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IngredientList createUpdatedEntity(EntityManager em) {
        IngredientList ingredientList = new IngredientList()
            .amount(UPDATED_AMOUNT)
            .unit(UPDATED_UNIT);
        // Add required entity
        Recipe recipe;
        if (TestUtil.findAll(em, Recipe.class).isEmpty()) {
            recipe = RecipeResourceIT.createUpdatedEntity(em);
            em.persist(recipe);
            em.flush();
        } else {
            recipe = TestUtil.findAll(em, Recipe.class).get(0);
        }
        ingredientList.setRecipe(recipe);
        return ingredientList;
    }

    @BeforeEach
    public void initTest() {
        ingredientList = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngredientList() throws Exception {
        int databaseSizeBeforeCreate = ingredientListRepository.findAll().size();

        // Create the IngredientList
        restIngredientListMockMvc.perform(post("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientList)))
            .andExpect(status().isCreated());

        // Validate the IngredientList in the database
        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeCreate + 1);
        IngredientList testIngredientList = ingredientListList.get(ingredientListList.size() - 1);
        assertThat(testIngredientList.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testIngredientList.getUnit()).isEqualTo(DEFAULT_UNIT);

        // Validate the IngredientList in Elasticsearch
        verify(mockIngredientListSearchRepository, times(1)).save(testIngredientList);
    }

    @Test
    @Transactional
    public void createIngredientListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredientListRepository.findAll().size();

        // Create the IngredientList with an existing ID
        ingredientList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredientListMockMvc.perform(post("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientList)))
            .andExpect(status().isBadRequest());

        // Validate the IngredientList in the database
        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeCreate);

        // Validate the IngredientList in Elasticsearch
        verify(mockIngredientListSearchRepository, times(0)).save(ingredientList);
    }


    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = ingredientListRepository.findAll().size();
        // set the field null
        ingredientList.setAmount(null);

        // Create the IngredientList, which fails.

        restIngredientListMockMvc.perform(post("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientList)))
            .andExpect(status().isBadRequest());

        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = ingredientListRepository.findAll().size();
        // set the field null
        ingredientList.setUnit(null);

        // Create the IngredientList, which fails.

        restIngredientListMockMvc.perform(post("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientList)))
            .andExpect(status().isBadRequest());

        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIngredientLists() throws Exception {
        // Initialize the database
        ingredientListRepository.saveAndFlush(ingredientList);

        // Get all the ingredientListList
        restIngredientListMockMvc.perform(get("/api/ingredient-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientList.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)));
    }
    
    @Test
    @Transactional
    public void getIngredientList() throws Exception {
        // Initialize the database
        ingredientListRepository.saveAndFlush(ingredientList);

        // Get the ingredientList
        restIngredientListMockMvc.perform(get("/api/ingredient-lists/{id}", ingredientList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingredientList.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT));
    }

    @Test
    @Transactional
    public void getNonExistingIngredientList() throws Exception {
        // Get the ingredientList
        restIngredientListMockMvc.perform(get("/api/ingredient-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngredientList() throws Exception {
        // Initialize the database
        ingredientListRepository.saveAndFlush(ingredientList);

        int databaseSizeBeforeUpdate = ingredientListRepository.findAll().size();

        // Update the ingredientList
        IngredientList updatedIngredientList = ingredientListRepository.findById(ingredientList.getId()).get();
        // Disconnect from session so that the updates on updatedIngredientList are not directly saved in db
        em.detach(updatedIngredientList);
        updatedIngredientList
            .amount(UPDATED_AMOUNT)
            .unit(UPDATED_UNIT);

        restIngredientListMockMvc.perform(put("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIngredientList)))
            .andExpect(status().isOk());

        // Validate the IngredientList in the database
        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeUpdate);
        IngredientList testIngredientList = ingredientListList.get(ingredientListList.size() - 1);
        assertThat(testIngredientList.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testIngredientList.getUnit()).isEqualTo(UPDATED_UNIT);

        // Validate the IngredientList in Elasticsearch
        verify(mockIngredientListSearchRepository, times(1)).save(testIngredientList);
    }

    @Test
    @Transactional
    public void updateNonExistingIngredientList() throws Exception {
        int databaseSizeBeforeUpdate = ingredientListRepository.findAll().size();

        // Create the IngredientList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredientListMockMvc.perform(put("/api/ingredient-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientList)))
            .andExpect(status().isBadRequest());

        // Validate the IngredientList in the database
        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeUpdate);

        // Validate the IngredientList in Elasticsearch
        verify(mockIngredientListSearchRepository, times(0)).save(ingredientList);
    }

    @Test
    @Transactional
    public void deleteIngredientList() throws Exception {
        // Initialize the database
        ingredientListRepository.saveAndFlush(ingredientList);

        int databaseSizeBeforeDelete = ingredientListRepository.findAll().size();

        // Delete the ingredientList
        restIngredientListMockMvc.perform(delete("/api/ingredient-lists/{id}", ingredientList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IngredientList> ingredientListList = ingredientListRepository.findAll();
        assertThat(ingredientListList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the IngredientList in Elasticsearch
        verify(mockIngredientListSearchRepository, times(1)).deleteById(ingredientList.getId());
    }

    @Test
    @Transactional
    public void searchIngredientList() throws Exception {
        // Initialize the database
        ingredientListRepository.saveAndFlush(ingredientList);
        when(mockIngredientListSearchRepository.search(queryStringQuery("id:" + ingredientList.getId())))
            .thenReturn(Collections.singletonList(ingredientList));
        // Search the ingredientList
        restIngredientListMockMvc.perform(get("/api/_search/ingredient-lists?query=id:" + ingredientList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientList.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)));
    }
}
