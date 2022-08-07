package com.project.flashcards.controller;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Box;
import com.project.flashcards.model.Card;
import com.project.flashcards.service.BoxService;
import com.project.flashcards.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

    /**
     * returns all cards
     * @return
     */
    @GetMapping("getAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(cardService.getAllCards());
    }

    /**
     * gets all cards by Box Id
     * @param id
     * @return
     * @throws NotFoundException
     * @throws EmptyException
     */
    @GetMapping("getByBoxId/{id}")
    public ResponseEntity<?> findByBoxId(@PathVariable( name= "id") int id) throws NotFoundException, EmptyException {
        return ResponseEntity.ok(cardService.getAllCardsByBoxId(id));
    }

    /**
     * creates card
     * @param card
     * @return
     */
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Card card){
        try{
            return ResponseEntity.ok(cardService.addNewCard(card));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }}


    /**
     * updates card
      * @param card
     * @return
     */
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Card card){
        try{
            return ResponseEntity.ok(cardService.updateCardInfo(card));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * delete card by id
     * @param id
     * @return
     */
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable( name= "id") int id){
        try{
            return ResponseEntity.ok(cardService.removeCard(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
