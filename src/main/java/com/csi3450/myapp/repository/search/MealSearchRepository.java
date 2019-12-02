package com.csi3450.myapp.repository.search;
import com.csi3450.myapp.domain.Meal;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Meal} entity.
 */
public interface MealSearchRepository extends ElasticsearchRepository<Meal, Long> {
}
