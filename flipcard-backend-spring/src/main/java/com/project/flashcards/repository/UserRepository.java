package com.project.flashcards.repository;

import com.project.flashcards.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query("select user from User user where user.email=?1")
    User findByEmail(String email);

    @Query("select user from User user where user.userName=?1")
    User findByUsername(String username);

    @Query("select user from User user where user.userName=?1 and user.password=?2")
    User findByUserPassword(String username, String password);



}
