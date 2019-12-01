package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.MealList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MealList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealListRepository extends JpaRepository<MealList, Long> {

}
