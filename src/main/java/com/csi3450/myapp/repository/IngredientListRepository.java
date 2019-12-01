package com.csi3450.myapp.repository;
import com.csi3450.myapp.domain.IngredientList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IngredientList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IngredientListRepository extends JpaRepository<IngredientList, Long> {

}
