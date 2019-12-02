package com.csi3450.myapp.repository.search;
import com.csi3450.myapp.domain.IngredientList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link IngredientList} entity.
 */
public interface IngredientListSearchRepository extends ElasticsearchRepository<IngredientList, Long> {
}
