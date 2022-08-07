package com.project.flashcards.controller;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Box;
import com.project.flashcards.model.User;
import com.project.flashcards.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/box")
@CrossOrigin(origins = {"3000"})
public class BoxController {
    @Autowired
    private BoxService boxService;

    /**
     * returns all boxes
     * @return
     */
    @GetMapping("getAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(boxService.getAllBoxes());
    }

    /**
     * returns all boxes with user id
     * @param id
     * @return
     * @throws NotFoundException
     * @throws EmptyException
     */
    @GetMapping("getByuserId/{id}")
    public ResponseEntity<?> findAll(@PathVariable( name= "id") int id) throws NotFoundException, EmptyException {
        return ResponseEntity.ok(boxService.getAllBoxesByUserId(id));
    }

    @GetMapping("findById/{id}")
    public ResponseEntity<?> findById(@PathVariable( name= "id") int id) throws NotFoundException, EmptyException {
        return ResponseEntity.ok(boxService.findById(id));
    }

    /**
     * creates Box
     * @param box
     * @return
     */
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Box box){
        try{
            return ResponseEntity.ok(boxService.addNewBox(box));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }}


    /**
     * updates existing box
      * @param box
     * @return
     */
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Box box){
        try{
            return ResponseEntity.ok(boxService.updateBoxInfo(box));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * deletes box by id
     * @param id
     * @return
     */
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable( name= "id") int id){
        try{
            return ResponseEntity.ok(boxService.removeBox(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
