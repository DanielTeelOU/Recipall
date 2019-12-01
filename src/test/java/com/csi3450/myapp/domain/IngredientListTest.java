package com.csi3450.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.csi3450.myapp.web.rest.TestUtil;

public class IngredientListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredientList.class);
        IngredientList ingredientList1 = new IngredientList();
        ingredientList1.setId(1L);
        IngredientList ingredientList2 = new IngredientList();
        ingredientList2.setId(ingredientList1.getId());
        assertThat(ingredientList1).isEqualTo(ingredientList2);
        ingredientList2.setId(2L);
        assertThat(ingredientList1).isNotEqualTo(ingredientList2);
        ingredientList1.setId(null);
        assertThat(ingredientList1).isNotEqualTo(ingredientList2);
    }
}
