package web.itmo.lab4.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Table
@Entity(name="hit")
public class Hit {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private float x;
    private float y;
    private float r;
    private LocalDateTime dateTime;
    private double executionTime;
    private boolean hit;
    private String user;
}