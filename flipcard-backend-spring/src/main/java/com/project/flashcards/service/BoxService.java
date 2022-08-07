package com.project.flashcards.service;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Box;
import com.project.flashcards.model.Card;
import com.project.flashcards.model.Comment;
import com.project.flashcards.model.User;
import com.project.flashcards.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BoxService {
    @Autowired
    private BoxRepository boxRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CardService cardService;
    @Autowired
    private CommentService commentService;

    /**
     * return all boxes
     * @return
     */
    public List<Box> getAllBoxes(){
        List<Box> boxes = boxRepository.findAll();
        for (Box box : boxes) {
            box.setUsername(box.getUser().getUserName());
            box.setUserId(box.getUser().getUserId());
        }
        return boxes;
    }

    /**
     * return boxes by User Id
     * @param id
     * @return
     * @throws NotFoundException
     * @throws EmptyException
     */
    public List<Box> getAllBoxesByUserId(int id) throws NotFoundException, EmptyException {
        User findUser=userService.findUserById(id);
        if(findUser==null)
            throw new EmptyException("user does not exist");

        return  boxRepository.findAllByUserId(id);
    }

    /**
     * add new box
     * @param box
     * @return
     * @throws EmptyException
     * @throws NotFoundException
     */
    @Transactional
    public Box addNewBox(Box box) throws EmptyException, NotFoundException {
        if (box.getBoxName()==null)
            throw new EmptyException("Please mention boxName");
        if (box.getBoxStatus()==null)
            throw new EmptyException("Please mention boxStatus");

       Box findbox = boxRepository.findByBoxName(box.getBoxName());
        if (findbox!=null)
            throw new EmptyException("Box with this name already exists");
        User findUser=userService.findUserById(box.getUserId());
        if (findUser==null)
            throw new EmptyException("userId does not exist");
        box.setUser(findUser);
        return boxRepository.save(box);
    }

    /**
     * find box by id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public Box findBoxById(int id) throws NotFoundException {
        return boxRepository.findById(id).orElseThrow(()-> new NotFoundException("Box not found for id = "+id));
    }

    /**
     * update box
     * @param box
     * @return
     * @throws NotFoundException
     */
    public Box updateBoxInfo(Box box) throws NotFoundException {
        Box findBox = findBoxById(box.getBoxId());
        if(box.getBoxName()!=null)
            findBox.setBoxName(box.getBoxName());
        if(box.getBoxDescription()!=null)
            findBox.setBoxDescription(box.getBoxDescription());

        return boxRepository.save(findBox);
    }

    /**
     * remove box by id by removing cards and comments associated with eac card
     * @param id
     * @return
     * @throws NotFoundException
     * @throws EmptyException
     */
    @Transactional(rollbackOn = {NotFoundException.class, EmptyException.class})
    public Box removeBox(int id) throws NotFoundException, EmptyException {
        Box findBox = findBoxById(id);
        if(findBox!=null) {
            List<Card> cards = cardService.getAllCardsByBoxId(findBox.getBoxId());
//            for(Card card : cards) {
//                List<Comment> comments = commentService.getCommentsByCardId(card.getCardId());
//                commentService.deleteAllComments(comments);
//            }
            List<Comment> comments = commentService.getCommentsByBoxId(findBox.getBoxId());
            commentService.deleteAllComments(comments);
            cardService.removeAllCards(cards);

        }
        boxRepository.deleteById(findBox.getBoxId());
        return findBox;
    }

    public Box findById(int id) throws NotFoundException, EmptyException {
        Box findBox = findBoxById(id);
        if(findBox!=null) {
            List<Card> cards = cardService.getAllCardsByBoxId(findBox.getBoxId());
            findBox.setCards(cards);
        }
        return findBox;
    }
}
