package web.itmo.lab2.servlets;

import java.io.*;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import web.itmo.lab2.checker.HitChecker;
import web.itmo.lab2.validator.ParameterValidator;
import web.itmo.lab2.validator.ValidParameter;

@WebServlet(name = "areaCheckServlet", value = "/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws IOException, ServletException {
        String xString = request.getParameter("x");
        String yString = request.getParameter("y");
        String rString = request.getParameter("r");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String message = "";

        ValidParameter checkString = ParameterValidator.checkStrings(xString, yString, rString);

        if (checkString.getValid()) {
            float x = Float.parseFloat(xString);
            float y = Float.parseFloat(yString);
            float R = Float.parseFloat(rString);

            ValidParameter checkRanges = ParameterValidator.checkRanges(x, y, R);

            if (checkRanges.getValid()) {
                boolean hit = HitChecker.checkHit(x, y, R);

                if (hit) {
                    message = "Point hits the area";
                } else {
                    message = "Point doesn't hit the area";
                }
            } else {
                message = checkRanges.getMessage();
            }
        } else {
            message = checkString.getMessage();
        }

        out.print("{\"hit\": \"" + message + "\" }");

        out.flush();
        out.close();
    }
}
