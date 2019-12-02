package com.csi3450.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.csi3450.myapp.web.rest.TestUtil;

public class RecipeListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeList.class);
        RecipeList recipeList1 = new RecipeList();
        recipeList1.setId(1L);
        RecipeList recipeList2 = new RecipeList();
        recipeList2.setId(recipeList1.getId());
        assertThat(recipeList1).isEqualTo(recipeList2);
        recipeList2.setId(2L);
        assertThat(recipeList1).isNotEqualTo(recipeList2);
        recipeList1.setId(null);
        assertThat(recipeList1).isNotEqualTo(recipeList2);
    }
}
