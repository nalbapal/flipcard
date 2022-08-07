package com.project.flashcards.controller;

import com.project.flashcards.model.User;
import com.project.flashcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
    @Autowired
    private UserService userService;

    /**
     * test method
     * @return
     */
    @GetMapping("/")
    public String Home(){
        return "welcome home";
    }

    /**
     * login method
     * @param user
     * @return
     */
    @PostMapping("/loginUser")
    public ResponseEntity<?> createLogin(@RequestBody User user){
        try{
            return ResponseEntity.ok(userService.loginAsUser(user));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
