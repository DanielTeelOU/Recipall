package com.csi3450.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.csi3450.myapp.web.rest.TestUtil;

public class MealListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MealList.class);
        MealList mealList1 = new MealList();
        mealList1.setId(1L);
        MealList mealList2 = new MealList();
        mealList2.setId(mealList1.getId());
        assertThat(mealList1).isEqualTo(mealList2);
        mealList2.setId(2L);
        assertThat(mealList1).isNotEqualTo(mealList2);
        mealList1.setId(null);
        assertThat(mealList1).isNotEqualTo(mealList2);
    }
}
