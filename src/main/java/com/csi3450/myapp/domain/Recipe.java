package com.csi3450.myapp.domain;

import com.csi3450.myapp.config.Constants;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.time.Instant;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;


@Entity
@Table(name = "rpa_recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "recipe")
public class Recipe extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;


    @Column(name = "time")
    private int time;

    @Column(name = "difficulty")
    private int difficulty;

    
    @Column(name = "rating")
    private double rating;

    @Size(max = 512)
    @Column(name = "steps",length = 50)
    private String steps;

    
    @Column(name = "creationDate")
    private Date creationDate;

    @NotNull
    @Column(name = "authorId")
    private int authorId;

    
    @Column(name = "serving")
    private int serving;


    @NotNull
    @Column(name = "score")
    private int score;


    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;





 
}