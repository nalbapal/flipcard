package com.project.flashcards.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CommentTest {

    @Test
    void getComId() {
        Comment comment= new Comment();
        comment.setComId(1);
        assertEquals(1,comment.getComId(), "expected id=1");
        assertNotEquals(2,comment.getComId(),"unexpected");
    }

    @Test
    void getComment() {
        Comment comment= new Comment();
        comment.setComment("hello");
        assertEquals("hello",comment.getComment(), "expected 'hello'");
        assertNotEquals("yello",comment.getComment(),"unexpected");


    }

    @Test
    void getBoxId() {
        Comment comment= new Comment();
        comment.setBoxId(1);
        assertEquals(1,comment.getBoxId(),"eunexpected");

    }

    @Test
    void getBox() {
        Comment comment= new Comment();
        Box box=new Box();
        box.setBoxId(1);
        comment.setBox(box);
        assertEquals(1,comment.getBox().getBoxId(),"expected 1");
        assertNotEquals(2,comment.getBox().getBoxId(),"unexpected");

    }

    @Test
    void getUserId() {
        Comment comment= new Comment();
        comment.setUserId(1);
        assertEquals(1,comment.getUserId(),"expected 1");
        assertNotEquals(2,comment.getUserId(),"unexpected");

    }

    @Test
    void getUser() {
        Comment comment= new Comment();
        User user= new User();
        user.setUserId(1);
        comment.setUser(user);
        assertEquals(1,comment.getUser().getUserId(), "expected 1");
        assertNotEquals(2,comment.getUser().getUserId(),"unexpected");

    }
}
