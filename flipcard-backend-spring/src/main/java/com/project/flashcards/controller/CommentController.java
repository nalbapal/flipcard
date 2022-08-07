package com.project.flashcards.controller;

import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Comment;
import com.project.flashcards.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    /**
     * returns all comments
     * @return
     */
    @GetMapping("getAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(commentService.getAllCards());
    }

    /**
     * returns all comments associated with particular card_Id
     * @param id
     * @return
     * @throws NotFoundException
     */
    @GetMapping("getCommentsByBoxId/{id}")
    public ResponseEntity<?> getCommentsByBoxId(@PathVariable( name= "id") int id) throws NotFoundException {
        return ResponseEntity.ok(commentService.getCommentsByBoxId(id));
    }

    /**
     * returns all comments by UserId
     * @param id
     * @return
     * @throws NotFoundException
     */
    @GetMapping("getCommentsByUserId/{id}")
    public ResponseEntity<?> findCommentByUserId(@PathVariable( name= "id") int id) throws NotFoundException {
        return ResponseEntity.ok(commentService.getCommentsByUserId(id));
    }

    /**
     * creates comment
     * @param comment
     * @return
     */
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Comment comment){
        try{
            return ResponseEntity.ok(commentService.addNewComment(comment));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }}


    /**
     * update comment
      * @param comment
     * @return
     */
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Comment comment){
        try{
            return ResponseEntity.ok(commentService.updateCommentInfo(comment));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * delete comment by id
     * @param id
     * @return
     */
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable( name= "id") int id){
        try{
            return ResponseEntity.ok(commentService.removeComment(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
