package web.itmo.lab4.service.implementation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.itmo.lab4.models.Hit;
import web.itmo.lab4.repositories.HitRepository;
import web.itmo.lab4.service.HitService;


@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class HitServiceImplementation implements HitService {
    private final HitRepository hitRepository;

    @Override
    public Hit addHit(Hit hit) {
        log.info("Registering new hit for user " + hit.getUsername());

        return hitRepository.save(hit);
    }
}