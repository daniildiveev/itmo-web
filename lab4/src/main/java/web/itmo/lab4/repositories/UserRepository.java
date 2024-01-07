package web.itmo.lab4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.itmo.lab4.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
