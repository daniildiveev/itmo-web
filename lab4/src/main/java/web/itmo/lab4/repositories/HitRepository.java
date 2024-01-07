package web.itmo.lab4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.itmo.lab4.models.Hit;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {
}