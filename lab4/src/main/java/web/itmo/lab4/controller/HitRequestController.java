package web.itmo.lab4.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.itmo.lab4.models.Hit;
import web.itmo.lab4.repositories.HitRepository;

import java.util.List;

@Slf4j
@RestController
public class HitRequestController {
    @Autowired
    private HitRepository hitRepository;

    @PostMapping("/add_hit")
    public Hit saveHit(@RequestBody Hit hit) {
        System.out.println(hit);

        return hitRepository.save(hit);
    }

    @GetMapping("/add_hit")
    public List<Hit> getHits(){
        return hitRepository.findAll();
    }
}
