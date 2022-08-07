package com.project.flashcards.controller;

import com.project.flashcards.model.User;
import com.project.flashcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * get all users
     * @return
     */
    @GetMapping("getAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * create user
     * @param user
     * @return
     */
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody User user){
        try{
            return ResponseEntity.ok(userService.addNewUser(user));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }}

    /**
     * update user
      * @param user
     * @return
     */
    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody User user){
            try{
                return ResponseEntity.ok(userService.updateUserInfo(user));
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

    /**
     * find user by Id
      * @param id
     * @return
     */
    @GetMapping("findById/{id}")
    public ResponseEntity<?> findById(@PathVariable( name= "id") int id){
        try{
            return ResponseEntity.ok(userService.findUserById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * delete user by id
     * @param id
     * @return
     */
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable( name= "id") int id){
        try{
            return ResponseEntity.ok(userService.removeUser(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    }


