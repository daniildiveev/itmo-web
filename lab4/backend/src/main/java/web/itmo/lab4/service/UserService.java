package web.itmo.lab4.service;

import web.itmo.lab4.models.User;

public interface UserService {
    boolean authenticate(User user);
    boolean register(User user);
}
