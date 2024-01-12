package web.itmo.lab4.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.itmo.lab4.models.Hit;
import web.itmo.lab4.models.Response;
import web.itmo.lab4.service.JWTService;
import web.itmo.lab4.service.implementation.HitServiceImplementation;
import web.itmo.lab4.utils.HitChecker;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/hits")
public class HitController {
    private final HitServiceImplementation hitService;
    private final JWTService jwtService;

    @PostMapping("/add")
    public ResponseEntity<Response> get(@RequestBody Hit hit,
                                        @RequestHeader(name="Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtService.extractUsername(jwt);

        hit.setUsername(username);
        hit.setDateTime(LocalDateTime.now());

        long scriptStart = System.nanoTime();
        boolean result = HitChecker.check(hit);
        double executionTime = (double) (System.nanoTime() - scriptStart) * 0.0001;

        hit.setExecutionTime(executionTime);
        hit.setHit(result);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(LocalDateTime.now())
                        .data(Map.of("New element added", hitService.addHit(hit)))
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
        );
    }

    @GetMapping("/")
    public List<Hit> getHits (@RequestHeader(name = "Authorization") String token){
        String jwt = token.substring(7);
        String username = jwtService.extractUsername(jwt);

        return hitService.getUsersHits(username);
    }
}
