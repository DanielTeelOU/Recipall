package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.RecipallApp;
import com.csi3450.myapp.domain.MealList;
import com.csi3450.myapp.repository.MealListRepository;
import com.csi3450.myapp.repository.search.MealListSearchRepository;
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
 * Integration tests for the {@link MealListResource} REST controller.
 */
@SpringBootTest(classes = RecipallApp.class)
public class MealListResourceIT {

    @Autowired
    private MealListRepository mealListRepository;

    /**
     * This repository is mocked in the com.csi3450.myapp.repository.search test package.
     *
     * @see com.csi3450.myapp.repository.search.MealListSearchRepositoryMockConfiguration
     */
    @Autowired
    private MealListSearchRepository mockMealListSearchRepository;

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

    private MockMvc restMealListMockMvc;

    private MealList mealList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MealListResource mealListResource = new MealListResource(mealListRepository, mockMealListSearchRepository);
        this.restMealListMockMvc = MockMvcBuilders.standaloneSetup(mealListResource)
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
    public static MealList createEntity(EntityManager em) {
        MealList mealList = new MealList();
        return mealList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MealList createUpdatedEntity(EntityManager em) {
        MealList mealList = new MealList();
        return mealList;
    }

    @BeforeEach
    public void initTest() {
        mealList = createEntity(em);
    }

    @Test
    @Transactional
    public void createMealList() throws Exception {
        int databaseSizeBeforeCreate = mealListRepository.findAll().size();

        // Create the MealList
        restMealListMockMvc.perform(post("/api/meal-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealList)))
            .andExpect(status().isCreated());

        // Validate the MealList in the database
        List<MealList> mealListList = mealListRepository.findAll();
        assertThat(mealListList).hasSize(databaseSizeBeforeCreate + 1);
        MealList testMealList = mealListList.get(mealListList.size() - 1);

        // Validate the MealList in Elasticsearch
        verify(mockMealListSearchRepository, times(1)).save(testMealList);
    }

    @Test
    @Transactional
    public void createMealListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mealListRepository.findAll().size();

        // Create the MealList with an existing ID
        mealList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMealListMockMvc.perform(post("/api/meal-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealList)))
            .andExpect(status().isBadRequest());

        // Validate the MealList in the database
        List<MealList> mealListList = mealListRepository.findAll();
        assertThat(mealListList).hasSize(databaseSizeBeforeCreate);

        // Validate the MealList in Elasticsearch
        verify(mockMealListSearchRepository, times(0)).save(mealList);
    }


    @Test
    @Transactional
    public void getAllMealLists() throws Exception {
        // Initialize the database
        mealListRepository.saveAndFlush(mealList);

        // Get all the mealListList
        restMealListMockMvc.perform(get("/api/meal-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealList.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMealList() throws Exception {
        // Initialize the database
        mealListRepository.saveAndFlush(mealList);

        // Get the mealList
        restMealListMockMvc.perform(get("/api/meal-lists/{id}", mealList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mealList.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMealList() throws Exception {
        // Get the mealList
        restMealListMockMvc.perform(get("/api/meal-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMealList() throws Exception {
        // Initialize the database
        mealListRepository.saveAndFlush(mealList);

        int databaseSizeBeforeUpdate = mealListRepository.findAll().size();

        // Update the mealList
        MealList updatedMealList = mealListRepository.findById(mealList.getId()).get();
        // Disconnect from session so that the updates on updatedMealList are not directly saved in db
        em.detach(updatedMealList);

        restMealListMockMvc.perform(put("/api/meal-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMealList)))
            .andExpect(status().isOk());

        // Validate the MealList in the database
        List<MealList> mealListList = mealListRepository.findAll();
        assertThat(mealListList).hasSize(databaseSizeBeforeUpdate);
        MealList testMealList = mealListList.get(mealListList.size() - 1);

        // Validate the MealList in Elasticsearch
        verify(mockMealListSearchRepository, times(1)).save(testMealList);
    }

    @Test
    @Transactional
    public void updateNonExistingMealList() throws Exception {
        int databaseSizeBeforeUpdate = mealListRepository.findAll().size();

        // Create the MealList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMealListMockMvc.perform(put("/api/meal-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mealList)))
            .andExpect(status().isBadRequest());

        // Validate the MealList in the database
        List<MealList> mealListList = mealListRepository.findAll();
        assertThat(mealListList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MealList in Elasticsearch
        verify(mockMealListSearchRepository, times(0)).save(mealList);
    }

    @Test
    @Transactional
    public void deleteMealList() throws Exception {
        // Initialize the database
        mealListRepository.saveAndFlush(mealList);

        int databaseSizeBeforeDelete = mealListRepository.findAll().size();

        // Delete the mealList
        restMealListMockMvc.perform(delete("/api/meal-lists/{id}", mealList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MealList> mealListList = mealListRepository.findAll();
        assertThat(mealListList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MealList in Elasticsearch
        verify(mockMealListSearchRepository, times(1)).deleteById(mealList.getId());
    }

    @Test
    @Transactional
    public void searchMealList() throws Exception {
        // Initialize the database
        mealListRepository.saveAndFlush(mealList);
        when(mockMealListSearchRepository.search(queryStringQuery("id:" + mealList.getId())))
            .thenReturn(Collections.singletonList(mealList));
        // Search the mealList
        restMealListMockMvc.perform(get("/api/_search/meal-lists?query=id:" + mealList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mealList.getId().intValue())));
    }
}
