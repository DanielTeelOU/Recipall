package com.csi3450.myapp.repository.search;
import com.csi3450.myapp.domain.Ingredient;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Ingredient} entity.
 */
public interface IngredientSearchRepository extends ElasticsearchRepository<Ingredient, Long> {
}
