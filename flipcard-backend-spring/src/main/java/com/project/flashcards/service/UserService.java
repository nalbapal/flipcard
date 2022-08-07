package com.project.flashcards.service;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.InvalidCredentialsException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.User;
import com.project.flashcards.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import static java.lang.Boolean.TRUE;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * loging in with username and password
     * @param user
     * @return
     * @throws InvalidCredentialsException
     */
    public User loginAsUser(User user) throws InvalidCredentialsException {
        User findUser = userRepository.findByUserPassword(user.getUserName(), user.getPassword());
        if (findUser == null)
            throw new InvalidCredentialsException("Invalid Credentials");
        return findUser;
    }

    /**
     * get all users
     * @return
     */
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    /**
     * add new user
     * @param user
     * @return
     * @throws EmptyException
     * @throws NotFoundException
     */
    @Transactional
    public User addNewUser(User user) throws EmptyException, NotFoundException {
        if (user.getEmail()==null)
            throw new EmptyException("Please mention email id");
        if (user.getPassword()==null)
            throw new EmptyException("Please mention strong password");
        if (user.getUserName()==null)
            throw new EmptyException("Please mention username");
        if (user.getFirstName()==null)
            throw new EmptyException("Please mention firstName");
        if (user.getLastName()==null)
            throw new EmptyException("Please mention lastName");
        User findUser = userRepository.findByEmail(user.getEmail());
        if (findUser!=null)
            throw new EmptyException("User already exists with provided email account");
        findUser = userRepository.findByUsername(user.getUserName());
        if (findUser!=null)
            throw new EmptyException("Username already taken");
        return userRepository.save(user);
    }

    /**
     * find user by id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public User findUserById(int id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(()-> new NotFoundException("User not found for id = "+id));
    }

    /**
     * update user info
     * @param user
     * @return
     * @throws NotFoundException
     */
    public User updateUserInfo(User user) throws NotFoundException {
        User findUser = findUserById(user.getUserId());
        return userRepository.save(user);
    }

    /**
     * remove user
     * @param id
     * @return
     * @throws NotFoundException
     */
    public User removeUser(int id) throws NotFoundException {
        User findUser = findUserById(id);
        userRepository.delete(findUser);
        return findUser;
    }
}
