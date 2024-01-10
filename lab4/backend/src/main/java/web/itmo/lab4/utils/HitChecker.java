package web.itmo.lab4.utils;

import web.itmo.lab4.models.Hit;

public class HitChecker {
    public static boolean check(Hit hit) {
        float x = hit.getX();
        float y = hit.getY();
        float r = hit.getR();

        if (x < 0 && y < 0) {
            return Math.sqrt(x * x + y * y) <= r;
        } else if (x < 0 && y > 0) {
            return (2 * x + r) > y;
        } else if (x > 0 && y < 0){
            return (x < r / 2) && (y > -r);
        } return false;
    }
}
