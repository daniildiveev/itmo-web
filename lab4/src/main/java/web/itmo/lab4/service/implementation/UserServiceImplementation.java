package web.itmo.lab4.service.implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.itmo.lab4.models.User;
import web.itmo.lab4.repositories.UserRepository;
import web.itmo.lab4.service.UserService;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public boolean authenticate(User user) {
        log.info("Authenticating user: " + user.getUsername() + "...");

        if (userRepository.existsById(user.getUsername())) {
            String userPassword = userRepository
                    .findByUsername(user.getUsername())
                    .getPassword();

            if (encoder.matches(user.getPassword(), userPassword)){
                log.info("Successfully logged in!");
                return true;
            }

            log.info("Incorrect password");
            return false;
        }

        log.info("User not found in database");
        return false;
    }

    @Override
    public boolean register(User user) {
        log.info("Registering user: " + user.getUsername() + "...");

        if (userRepository.existsById(user.getUsername())) {
            log.info("User already exists!");
            return false;
        }

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        userRepository.save(user);
        return true;
    }
}
