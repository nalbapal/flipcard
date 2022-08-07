package com.project.flashcards.model;

import com.project.flashcards.enums.BoxStatus;
import org.junit.jupiter.api.Test;

import java.util.Collection;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class BoxTest {

    @Test
    void setGetBoxId() {
        Box box = new Box();
        box.setBoxId(1);
        assertEquals(1, box.getBoxId(), "Box id = 1");
        assertNotEquals(2, box.getBoxId(), "Box id != 1");
    }

    @Test
    void setGetBoxName() {
        Box box = new Box();
        box.setBoxName("Box1");
        assertEquals("Box1", box.getBoxName(), "Box name = Box1");
        assertNotEquals("Box2", box.getBoxName(), "Box Name != Box1");
    }

    @Test
    void setGetBoxDescription() {
        Box box = new Box();
        box.setBoxDescription("Box 1 Description");
        assertEquals("Box 1 Description", box.getBoxDescription(), "Box description = Box 1 Description");
        assertNotEquals(null, box.getBoxDescription(), "Box Name != null");  }

    @Test
    void setGetBoxStatus() {
        Box box = new Box();
        box.setBoxStatus(BoxStatus.PRIVATE);
        assertEquals(BoxStatus.PRIVATE, box.getBoxStatus(), "Box status = PRIVATE");
        assertNotEquals(BoxStatus.PUBLIC, box.getBoxStatus(), "Box Status != Public");
    }

    @Test
    void setGetUserId() {
        Box box = new Box();
        box.setUserId(1);
        assertEquals(1, box.getUserId(), "Box User id = 1");
        assertNotEquals(2, box.getUserId(), "Box User Id != 2");
    }

    @Test
    void setGetUser() {
        Box box = new Box();
        User user = new User();
        user.setUserId(1);
        box.setUser(user);
        assertEquals(1, box.getUser().getUserId(), "Box User id = 1");
        assertNotEquals(2, box.getUser().getUserId(), "Box User Id != 2");
    }

    @Test
    void setGetCards() {
        Box box = new Box();
        Card card = new Card();
        card.setCardId(1);
        box.setCards(Collections.singletonList(card));
        assertEquals(1, box.getCards().get(0).getCardId(), "Box Card 1 id = 1");
        assertNotEquals(2, box.getCards().get(0).getCardId(), "Box Card 1 Id != 2");
    }
}