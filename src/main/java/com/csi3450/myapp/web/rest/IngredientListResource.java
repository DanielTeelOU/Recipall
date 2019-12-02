package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.domain.IngredientList;
import com.csi3450.myapp.repository.IngredientListRepository;
import com.csi3450.myapp.repository.search.IngredientListSearchRepository;
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
 * REST controller for managing {@link com.csi3450.myapp.domain.IngredientList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IngredientListResource {

    private final Logger log = LoggerFactory.getLogger(IngredientListResource.class);

    private static final String ENTITY_NAME = "ingredientList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngredientListRepository ingredientListRepository;

    private final IngredientListSearchRepository ingredientListSearchRepository;

    public IngredientListResource(IngredientListRepository ingredientListRepository, IngredientListSearchRepository ingredientListSearchRepository) {
        this.ingredientListRepository = ingredientListRepository;
        this.ingredientListSearchRepository = ingredientListSearchRepository;
    }

    /**
     * {@code POST  /ingredient-lists} : Create a new ingredientList.
     *
     * @param ingredientList the ingredientList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingredientList, or with status {@code 400 (Bad Request)} if the ingredientList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingredient-lists")
    public ResponseEntity<IngredientList> createIngredientList(@Valid @RequestBody IngredientList ingredientList) throws URISyntaxException {
        log.debug("REST request to save IngredientList : {}", ingredientList);
        if (ingredientList.getId() != null) {
            throw new BadRequestAlertException("A new ingredientList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IngredientList result = ingredientListRepository.save(ingredientList);
        ingredientListSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/ingredient-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingredient-lists} : Updates an existing ingredientList.
     *
     * @param ingredientList the ingredientList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingredientList,
     * or with status {@code 400 (Bad Request)} if the ingredientList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingredientList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingredient-lists")
    public ResponseEntity<IngredientList> updateIngredientList(@Valid @RequestBody IngredientList ingredientList) throws URISyntaxException {
        log.debug("REST request to update IngredientList : {}", ingredientList);
        if (ingredientList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IngredientList result = ingredientListRepository.save(ingredientList);
        ingredientListSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ingredientList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ingredient-lists} : get all the ingredientLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingredientLists in body.
     */
    @GetMapping("/ingredient-lists")
    public List<IngredientList> getAllIngredientLists() {
        log.debug("REST request to get all IngredientLists");
        return ingredientListRepository.findAll();
    }

    @GetMapping("/ingredient-lists/byrecipe/{id}")
    public List<IngredientList> getIngredientListsByRecipe(@PathVariable Long recipeId) {
        log.debug("REST request to get IngredientList by Recipe ID : {}", recipeId);
        return ingredientListRepository.findByRecipeId(recipeId);
    }

    /**
     * {@code GET  /ingredient-lists/:id} : get the "id" ingredientList.
     *
     * @param id the id of the ingredientList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingredientList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingredient-lists/{id}")
    public ResponseEntity<IngredientList> getIngredientList(@PathVariable Long id) {
        log.debug("REST request to get IngredientList : {}", id);
        Optional<IngredientList> ingredientList = ingredientListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ingredientList);
    }

    /**
     * {@code DELETE  /ingredient-lists/:id} : delete the "id" ingredientList.
     *
     * @param id the id of the ingredientList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingredient-lists/{id}")
    public ResponseEntity<Void> deleteIngredientList(@PathVariable Long id) {
        log.debug("REST request to delete IngredientList : {}", id);
        ingredientListRepository.deleteById(id);
        ingredientListSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/ingredient-lists?query=:query} : search for the ingredientList corresponding
     * to the query.
     *
     * @param query the query of the ingredientList search.
     * @return the result of the search.
     */
    @GetMapping("/_search/ingredient-lists")
    public List<IngredientList> searchIngredientLists(@RequestParam String query) {
        log.debug("REST request to search IngredientLists for query {}", query);
        return StreamSupport
            .stream(ingredientListSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
