package web.itmo.lab4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table
@Entity(name="users")
public class User{
    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;
}
