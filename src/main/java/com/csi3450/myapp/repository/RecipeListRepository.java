package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.RecipeList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the RecipeList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeListRepository extends JpaRepository<RecipeList, Long> {

    @Query("select recipeList from RecipeList recipeList where recipeList.user.login = ?#{principal.username}")
    List<RecipeList> findByUserIsCurrentUser();

}
