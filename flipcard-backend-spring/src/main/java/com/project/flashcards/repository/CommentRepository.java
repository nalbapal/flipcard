package com.project.flashcards.repository;

import com.project.flashcards.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer > {
    @Query("select comment from Comment comment where comment.box.boxId=?1")
    List<Comment> findByBoxId(int id);
    @Query("select comment from Comment comment where comment.user.userId=?1")
    List<Comment> findByUserId(int id);

    @Modifying
    @Override
    @Query("delete from Comment comment where comment.comId=?1")
    void deleteById(Integer comId);
}
