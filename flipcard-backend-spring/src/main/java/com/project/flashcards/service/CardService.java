package com.project.flashcards.service;

import com.project.flashcards.exception.EmptyException;
import com.project.flashcards.exception.NotFoundException;
import com.project.flashcards.model.Box;
import com.project.flashcards.model.Card;
import com.project.flashcards.model.Comment;
import com.project.flashcards.model.User;
import com.project.flashcards.repository.BoxRepository;
import com.project.flashcards.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private BoxService boxService;

    /**
     * add new card
     * @param card
     * @return
     * @throws EmptyException
     * @throws NotFoundException
     */
    @Transactional
    public Card addNewCard(Card card) throws EmptyException, NotFoundException {
        if (card.getTitle()==null)
            throw new EmptyException("Please mention Title");
        if (card.getDescription()==null)
            throw new EmptyException("Please mention Description");
        Card findcard = cardRepository.findByCardTitle(card.getTitle());
        if (findcard!=null)
            throw new EmptyException("Card with this title already exists");
        Box findBox= boxService.findBoxById(card.getBoxId());
        if (findBox==null)
            throw new EmptyException("boxId does not exist");
        card.setBox(findBox);
        return cardRepository.save(card);
    }

    /**
     * get all cards
     * @return
     */
    public List<Card> getAllCards(){
        return cardRepository.findAll();
    }

    /**
     * get all cards by box id
     * @param id
     * @return
     * @throws NotFoundException
     * @throws EmptyException
     */
    public List<Card> getAllCardsByBoxId(int id) throws NotFoundException, EmptyException {
        Box findBox=boxService.findBoxById(id);
        if(findBox==null)
            throw new EmptyException("box does not exist");

        return  cardRepository.findAllByBoxId(id);
    }

    /**
     * find card by id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public Card findCardById(int id) throws NotFoundException {
        return cardRepository.findById(id).orElseThrow(()-> new NotFoundException("Card not found for id = "+id));
    }

    /**
     * update the card info
     * @param card
     * @return
     * @throws NotFoundException
     */
    public Card updateCardInfo(Card card) throws NotFoundException {
        Card findCard = findCardById(card.getCardId());
        if (card.getTitle()!=null)
            findCard.setTitle(card.getTitle());
        if (card.getDescription()!=null)
            findCard.setDescription(card.getDescription());

        return cardRepository.save(findCard);
    }

    /**
     * remove card by card id
     * @param id
     * @return
     * @throws NotFoundException
     */
    public Card removeCard(Integer id) throws NotFoundException {
        Card findCard = findCardById(id);
        cardRepository.deleteById(findCard.getCardId());
        return findCard;
    }

    /**
     * remove lists of card from box
     * @param cards
     */
    public void removeAllCards(List<Card> cards) {
        for (Card card:cards) {
            cardRepository.deleteById(card.getCardId());
        }
    }
}
