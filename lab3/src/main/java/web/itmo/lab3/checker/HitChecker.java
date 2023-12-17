package web.itmo.lab3.checker;

public class HitChecker {
    public static boolean checkHit(float x, float y, float R) {
        if (x < 0 && y < 0) {
            return (y > -R) && (x > -R);
        } else if (x > 0 && y < 0) {
            return y > (x / 2 - R / 2);
        } else if (x < 0 && y > 0) {
            return (x * x + y * y < R);
        } else return false;
    }
}
