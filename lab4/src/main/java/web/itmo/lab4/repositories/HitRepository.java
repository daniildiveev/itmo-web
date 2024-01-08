package web.itmo.lab4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.itmo.lab4.models.Hit;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {
    List<Hit> findAllByUsername(String user);
}