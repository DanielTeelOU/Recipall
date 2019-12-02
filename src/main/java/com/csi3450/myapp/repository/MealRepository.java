package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.Meal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Meal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("select meal from Meal meal where meal.user.login = ?#{principal.username}")
    List<Meal> findByUserIsCurrentUser();

}
