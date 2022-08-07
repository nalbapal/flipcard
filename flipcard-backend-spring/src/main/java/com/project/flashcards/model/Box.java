package com.project.flashcards.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.flashcards.enums.BoxStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
@Table(name="box")
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int boxId;
    private String boxName;
    private String boxDescription;
    private BoxStatus boxStatus;
    @Transient
    private String username;
    @Transient
    private int userId; //box id
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "fk_user")
    private User user;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL)
    private List<Card> cards;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL)
    private List<Comment> comments;
}
