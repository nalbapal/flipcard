package com.project.flashcards.repository;

import com.project.flashcards.model.Box;
import com.project.flashcards.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Integer> {
    @Query("select card from Card card where card.title=?1")
    Card findByCardTitle(String name);

    @Query("select card from Card card where card.box.boxId=?1")
    List<Card> findAllByBoxId(int id);


    @Modifying
    @Query("delete from Card card where card.cardId=?1")
    @Override
    void deleteById(Integer id);
}
