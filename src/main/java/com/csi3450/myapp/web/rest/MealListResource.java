package com.csi3450.myapp.web.rest;

import com.csi3450.myapp.domain.MealList;
import com.csi3450.myapp.repository.MealListRepository;
import com.csi3450.myapp.repository.search.MealListSearchRepository;
import com.csi3450.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.csi3450.myapp.domain.MealList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MealListResource {

    private final Logger log = LoggerFactory.getLogger(MealListResource.class);

    private static final String ENTITY_NAME = "mealList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MealListRepository mealListRepository;

    private final MealListSearchRepository mealListSearchRepository;

    public MealListResource(MealListRepository mealListRepository, MealListSearchRepository mealListSearchRepository) {
        this.mealListRepository = mealListRepository;
        this.mealListSearchRepository = mealListSearchRepository;
    }

    /**
     * {@code POST  /meal-lists} : Create a new mealList.
     *
     * @param mealList the mealList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mealList, or with status {@code 400 (Bad Request)} if the mealList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/meal-lists")
    public ResponseEntity<MealList> createMealList(@RequestBody MealList mealList) throws URISyntaxException {
        log.debug("REST request to save MealList : {}", mealList);
        if (mealList.getId() != null) {
            throw new BadRequestAlertException("A new mealList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MealList result = mealListRepository.save(mealList);
        mealListSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/meal-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /meal-lists} : Updates an existing mealList.
     *
     * @param mealList the mealList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mealList,
     * or with status {@code 400 (Bad Request)} if the mealList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mealList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/meal-lists")
    public ResponseEntity<MealList> updateMealList(@RequestBody MealList mealList) throws URISyntaxException {
        log.debug("REST request to update MealList : {}", mealList);
        if (mealList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MealList result = mealListRepository.save(mealList);
        mealListSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, mealList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /meal-lists} : get all the mealLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mealLists in body.
     */
    @GetMapping("/meal-lists")
    public List<MealList> getAllMealLists() {
        log.debug("REST request to get all MealLists");
        return mealListRepository.findAll();
    }

    /**
     * {@code GET  /meal-lists/:id} : get the "id" mealList.
     *
     * @param id the id of the mealList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mealList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/meal-lists/{id}")
    public ResponseEntity<MealList> getMealList(@PathVariable Long id) {
        log.debug("REST request to get MealList : {}", id);
        Optional<MealList> mealList = mealListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mealList);
    }

    /**
     * {@code DELETE  /meal-lists/:id} : delete the "id" mealList.
     *
     * @param id the id of the mealList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/meal-lists/{id}")
    public ResponseEntity<Void> deleteMealList(@PathVariable Long id) {
        log.debug("REST request to delete MealList : {}", id);
        mealListRepository.deleteById(id);
        mealListSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/meal-lists?query=:query} : search for the mealList corresponding
     * to the query.
     *
     * @param query the query of the mealList search.
     * @return the result of the search.
     */
    @GetMapping("/_search/meal-lists")
    public List<MealList> searchMealLists(@RequestParam String query) {
        log.debug("REST request to search MealLists for query {}", query);
        return StreamSupport
            .stream(mealListSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
