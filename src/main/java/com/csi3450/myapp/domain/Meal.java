package com.csi3450.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Meal.
 */
@Entity
@Table(name = "meal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "meal")
public class Meal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "meal_name")
    private String mealName;

    @Column(name = "meal_desc")
    private String mealDesc;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("meals")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMealName() {
        return mealName;
    }

    public Meal mealName(String mealName) {
        this.mealName = mealName;
        return this;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public String getMealDesc() {
        return mealDesc;
    }

    public Meal mealDesc(String mealDesc) {
        this.mealDesc = mealDesc;
        return this;
    }

    public void setMealDesc(String mealDesc) {
        this.mealDesc = mealDesc;
    }

    public User getUser() {
        return user;
    }

    public Meal user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meal)) {
            return false;
        }
        return id != null && id.equals(((Meal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", mealName='" + getMealName() + "'" +
            ", mealDesc='" + getMealDesc() + "'" +
            "}";
    }
}
