package com.csi3450.myapp.repository.search;
import com.csi3450.myapp.domain.RecipeList;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecipeList} entity.
 */
public interface RecipeListSearchRepository extends ElasticsearchRepository<RecipeList, Long> {
}
