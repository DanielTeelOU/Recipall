package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.IngredientList;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the IngredientList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngredientListRepository extends JpaRepository<IngredientList, Long> {

    @Query("select ingredientlist from IngredientList ingredientlist where ingredientlist.recipe.id = :recipeId")
    List<IngredientList> findByRecipeId(@Param("recipeId") Long recipeId);

}
