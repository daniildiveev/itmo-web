package web.itmo.lab2.validator;

public class ParameterValidator {
    public static ValidParameter checkStrings(String x,
                                              String y,
                                              String R) {
        try {
            Float.parseFloat(x);
        } catch (NumberFormatException | NullPointerException e) {
            return new ValidParameter("X value is not valid", false);
        }

        try {
            Float.parseFloat(y);
        } catch (NumberFormatException | NullPointerException e) {
            return new ValidParameter("Y value is not valid", false);
        }

        try {
            Float.parseFloat(R);
        } catch (NumberFormatException | NullPointerException e) {
            return new ValidParameter("R value is not valid", false);
        }

        return new ValidParameter(null, true);
    }

    public static ValidParameter checkRanges(float x,
                                             float y,
                                             float R) {
        if (!((x <= 2) && (x >= -2))) {
            return new ValidParameter("X must be float in range (-2; 2)", false);
        }

        if (!((y >= -3) && (y <= 5))) {
            return new ValidParameter("Y must be float in range (-3; 5)", false);
        }

        if (!((R >= 1) && (R <= 3))) {
            return new ValidParameter("R must be float in range (1, 3)", false);
        }

        return new ValidParameter(null, true);
    }
}
