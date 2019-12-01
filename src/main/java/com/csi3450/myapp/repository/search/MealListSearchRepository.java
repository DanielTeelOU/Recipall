package com.csi3450.myapp.repository.search;
import com.csi3450.myapp.domain.MealList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MealList} entity.
 */
public interface MealListSearchRepository extends ElasticsearchRepository<MealList, Long> {
}
