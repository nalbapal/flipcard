package com.project.flashcards.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name="comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int comId;
    private String comment;

    @Transient
    private String username; //card id
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JsonIgnore
//    @JoinColumn(name = "fk_card")
//    private Card card;

    @Transient
    private int boxId; //box id


    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "fk_box")
    private Box box;

    @Transient
    private int userId; //user id
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "fk_user")
    private User user;


}
