package web.itmo.lab2.checker;

public class HitChecker {
    public static boolean checkHit(float x, float y, float R) {
        if (x > 0 && y > 0) {
            return (x * x + y * y < R /2);
        } else if (x > 0 && y < 0) {
            return (x < R && -y < R);
        } else if (x < 0 && y < 0) {
            return (y > -x - R);
        } else return false;
    }
}
