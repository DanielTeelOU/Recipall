package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.Recipe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Recipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
