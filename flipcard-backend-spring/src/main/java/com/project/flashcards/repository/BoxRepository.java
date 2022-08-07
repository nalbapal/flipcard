package com.project.flashcards.repository;

import com.project.flashcards.model.Box;
import com.project.flashcards.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoxRepository extends JpaRepository<Box, Integer> {
    @Query("select box from Box box where box.boxName=?1")
     Box findByBoxName(String name);

    @Query("select box from Box box where box.user.userId=?1")
    List<Box> findAllByUserId(int id);


    @Modifying
    @Query("delete from Box box where box.boxId=?1")
    @Override
    void deleteById(Integer id);
}
