package com.project.flashcards.model;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void setGetUserId() {
        User user = new User();
        user.setUserId(1);
        assertEquals(1, user.getUserId(), "Expected User id is = 1");
        assertNotEquals(2, user.getUserId(), "Expected User id is <> 1");
    }

    @Test
    void setGetFirstName() {
        User user = new User();
        user.setUserName("fahad");
        assertEquals("fahad", user.getUserName(), "Expected User name is = fahad");
        assertNotEquals("qureshi", user.getUserName(), "Expected User id is <> qureshi");
    }

    @Test
    void setGetLastName() {
        User user = new User();
        user.setFirstName("warrior");

        assertEquals("warrior", user.getFirstName(), "Expected First Name is = warrior");
        assertNotEquals("abc", user.getFirstName(), "Expected Fist Name id is <> warrior");
    }

    @Test
    void setGetUserName() {
        User user = new User();
        user.setLastName("abc");

        assertEquals("abc", user.getLastName(), "Expected Last Name is = abc");
        assertNotEquals("xyz", user.getLastName(), "Expected Last Name id is <> abc");
    }

    @Test
    void setGetEmail() {
        User user = new User();
        user.setEmail("abc@gmail.com");
        assertEquals("abc@gmail.com", user.getEmail(), "Expected Email is = abc@gmail.com");
        assertNotEquals("xyz@gmail.com", user.getEmail(), "Expected Email id is <> abc@gmail.com");
    }

    @Test
    void setGetPassword() {
        User user = new User();
        user.setPassword("12345");
        assertEquals("12345", user.getPassword(), "Expected Password is 12345");
        assertNotEquals("0917611", user.getPassword(), "Expected Password is not 12345");
    }

    @Test
    void setGetDof() {
        User user = new User();
        Date date = new Date();
        user.setDof(new Date());
        assertEquals(date, user.getDof(), "Expected date is equal");
        assertNotEquals(new Date().getTime(), user.getDof(), "Expected Dof is not equal");
    }
}