package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.domain.RecipeList;
import com.csi3450.myapp.repository.RecipeListRepository;
import com.csi3450.myapp.repository.search.RecipeListSearchRepository;
import com.csi3450.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.csi3450.myapp.domain.RecipeList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RecipeListResource {

    private final Logger log = LoggerFactory.getLogger(RecipeListResource.class);

    private static final String ENTITY_NAME = "recipeList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecipeListRepository recipeListRepository;

    private final RecipeListSearchRepository recipeListSearchRepository;

    public RecipeListResource(RecipeListRepository recipeListRepository, RecipeListSearchRepository recipeListSearchRepository) {
        this.recipeListRepository = recipeListRepository;
        this.recipeListSearchRepository = recipeListSearchRepository;
    }

    /**
     * {@code POST  /recipe-lists} : Create a new recipeList.
     *
     * @param recipeList the recipeList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recipeList, or with status {@code 400 (Bad Request)} if the recipeList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recipe-lists")
    public ResponseEntity<RecipeList> createRecipeList(@Valid @RequestBody RecipeList recipeList) throws URISyntaxException {
        log.debug("REST request to save RecipeList : {}", recipeList);
        if (recipeList.getId() != null) {
            throw new BadRequestAlertException("A new recipeList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecipeList result = recipeListRepository.save(recipeList);
        recipeListSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/recipe-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recipe-lists} : Updates an existing recipeList.
     *
     * @param recipeList the recipeList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recipeList,
     * or with status {@code 400 (Bad Request)} if the recipeList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recipeList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recipe-lists")
    public ResponseEntity<RecipeList> updateRecipeList(@Valid @RequestBody RecipeList recipeList) throws URISyntaxException {
        log.debug("REST request to update RecipeList : {}", recipeList);
        if (recipeList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecipeList result = recipeListRepository.save(recipeList);
        recipeListSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, recipeList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recipe-lists} : get all the recipeLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recipeLists in body.
     */
    @GetMapping("/recipe-lists")
    public List<RecipeList> getAllRecipeLists() {
        log.debug("REST request to get all RecipeLists");
        return recipeListRepository.findAll();
    }

    /**
     * {@code GET  /recipe-lists/:id} : get the "id" recipeList.
     *
     * @param id the id of the recipeList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recipeList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recipe-lists/{id}")
    public ResponseEntity<RecipeList> getRecipeList(@PathVariable Long id) {
        log.debug("REST request to get RecipeList : {}", id);
        Optional<RecipeList> recipeList = recipeListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recipeList);
    }

    /**
     * {@code DELETE  /recipe-lists/:id} : delete the "id" recipeList.
     *
     * @param id the id of the recipeList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recipe-lists/{id}")
    public ResponseEntity<Void> deleteRecipeList(@PathVariable Long id) {
        log.debug("REST request to delete RecipeList : {}", id);
        recipeListRepository.deleteById(id);
        recipeListSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/recipe-lists?query=:query} : search for the recipeList corresponding
     * to the query.
     *
     * @param query the query of the recipeList search.
     * @return the result of the search.
     */
    @GetMapping("/_search/recipe-lists")
    public List<RecipeList> searchRecipeLists(@RequestParam String query) {
        log.debug("REST request to search RecipeLists for query {}", query);
        return StreamSupport
            .stream(recipeListSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
