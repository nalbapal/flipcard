package com.project.flashcards.service;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Box;
import com.project.flashcards.model.Comment;
import com.project.flashcards.model.User;
import com.project.flashcards.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CardService cardService;
    @Autowired
    private UserService userService;
    @Autowired
    private BoxService boxService;

    /**
     * get all comments
     * @return
     */
    public List<Comment> getAllCards(){
        return commentRepository.findAll();
    }

    /**
     * get all comments by card id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public List<Comment> getCommentsByBoxId(int id) throws NotFoundException {
        Box findbox =boxService.findBoxById(id);
        List<Comment> comments = commentRepository.findByBoxId(findbox.getBoxId());
        for (Comment comment:comments) {
            comment.setUsername(comment.getUser().getUserName());
        }
        return comments;
    }

    /**
     * get all comments by userid
     * @param id
     * @return
     * @throws NotFoundException
     */
    public List<Comment> getCommentsByUserId(int id) throws NotFoundException {
        User user=userService.findUserById(id);
        return commentRepository.findByUserId(id);
    }

    /**
     * add new comment
     * @param comment
     * @return
     * @throws EmptyException
     * @throws NotFoundException
     */
    @Transactional
    public Comment addNewComment(Comment comment) throws EmptyException, NotFoundException {
        if (comment.getComment()==null)
            throw new EmptyException("Please mention Comment");


//        Card findCard= cardService.findCardById(comment.getCardId());
        Box findbox = boxService.findBoxById(comment.getBoxId());
        if(findbox==null)
            throw new EmptyException("boxId(card) Does not exist");
//        comment.setCard(findCard);
        comment.setBox(findbox);
        User findUser= userService.findUserById(comment.getUserId());
        if(findUser==null)
            throw new EmptyException("userId(user) Does not exist");
        comment.setUser(findUser);
        return commentRepository.save(comment);
    }

    /**
     * find comment by id
     * @param id
     * @return
     * @throws NotFoundException
     */

    public Comment findCommentById(int id) throws NotFoundException {
        return commentRepository.findById(id).orElseThrow(()-> new NotFoundException("Comment not found for id = "+id));
    }

    /**
     *  edit the comment
     * @param comment
     * @return
     * @throws NotFoundException
     */
    public Comment updateCommentInfo(Comment comment) throws NotFoundException {
        Comment findCard = findCommentById(comment.getComId());
        return commentRepository.save(comment);
    }

    /**
     * remove comment by id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public Comment removeComment(int id) throws NotFoundException {
        Comment findComment = findCommentById(id);
        commentRepository.delete(findComment);
        return findComment;
    }

    /**
     * delete all comments
     * @param comments
     */
    public void deleteAllComments(List<Comment> comments) {
        for (Comment comment:comments) {
            commentRepository.deleteById(comment.getComId());
        }
    }
}
