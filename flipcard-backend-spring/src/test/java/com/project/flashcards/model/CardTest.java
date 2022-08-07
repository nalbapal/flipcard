package com.project.flashcards.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardTest {

    @Test
    void getCardId() {
        Card card= new Card();
        card.setCardId(1);
        assertEquals(1,card.getCardId(),"expected 1");
        assertNotEquals(2,card.getCardId(),"unexpected ");
    }

    @Test
    void getTitle() {
        Card card= new Card();
        card.setTitle("aamir");
        assertEquals("aamir",card.getTitle(),"expected");
        assertNotEquals("aaa",card.getTitle(), "unexpected");
    }

    @Test
    void getDescription() {
        Card card= new Card();
        card.setDescription("hello");
        assertEquals("hello", card.getDescription(), "expected  'hello'");
        assertNotEquals("here", card.getDescription(),"unexpected");


    }

    @Test
    void getBoxId() {
        Card card= new Card();
        card.setBoxId(1);
        assertEquals(1,card.getBoxId(),"expected '1'");
        assertNotEquals(2,card.getBoxId(),"unexpected");

    }

    @Test
    void getBox() {
        Card card= new Card();
        Box box= new Box();
        box.setBoxId(1);
        card.setBox(box);
        assertEquals(1,card.getBox().getBoxId(),"expected ");
        assertNotEquals(2, card.getBox().getBoxId(),"unxpected");
    }
}
