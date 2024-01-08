package web.itmo.lab4.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.function.Function;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    private static final String KEY = "399641f5bd69cd470e061d2d1bd6946c03855e89cfbff32f48f06eb5fd5876a4";

    private Claims extractClaims(String jwt) {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    private Key getSignInKey() {
        byte[] bytes = Decoders.BASE64.decode(KEY);
        return Keys.hmacShaKeyFor(bytes);
    }

    public <T> T extractClaim(String jwt, Function<Claims, T> method) {
        Claims claims = extractClaims(jwt);
        return method.apply(claims);
    }

    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public boolean validToken(String jwt, UserDetails details) {
        String username = extractUsername(jwt);

        return username.equals(details.getUsername()) &&
                expirationDatePassed(jwt).after(new Date());
    }

    public Date expirationDatePassed(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }

    public String generateToken(UserDetails details, Map <String, Object> extraClaims) {
        return Jwts.
                builder().
                claims().
                empty().
                add(extraClaims).
                and().
                subject(details.getUsername()).
                issuedAt(new Date(System.currentTimeMillis())).
                expiration(new Date(System.currentTimeMillis() + 3600 * 24 * 1000)).
                signWith((SecretKey) getSignInKey(), Jwts.SIG.HS256).
                compact();
        /*
                         ↑
                         |
                         |
               ░░░░░░░░░░░░░░░░░░░░
               ░░░░░ЗАПУСКАЕМ░░░░░░░
               ░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
               ▄███▀░◐░░░▌░░░░░░░░░
               ░░░░▌░░░░░▐░░░░░░░░░
               ░░░░▐░░░░░▐░░░░░░░░░
               ░░░░▌░░░░░▐▄▄░░░░░░░
               ░░░░▌░░░░▄▀▒▒▀▀▀▀▄
               ░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
               ░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄
               ░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
               ░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
               ░░░░░░░░░░░▌▌░▌▌░░░░░
               ░░░░░░░░░░░▌▌░▌▌░░░░░
               ░░░░░░░░░▄▄▌▌▄▌▌░░░░░
        */
    }
}
