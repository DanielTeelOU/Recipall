package com.csi3450.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MealListSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MealListSearchRepositoryMockConfiguration {

    @MockBean
    private MealListSearchRepository mockMealListSearchRepository;

}
