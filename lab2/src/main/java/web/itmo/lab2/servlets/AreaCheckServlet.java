package web.itmo.lab2.servlets;

import java.io.*;
import java.util.ArrayList;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import web.itmo.lab2.checker.HitChecker;
import web.itmo.lab2.models.HitDataBean;
import web.itmo.lab2.models.HitDataTableBean;
import web.itmo.lab2.validator.ParameterValidator;
import web.itmo.lab2.validator.ValidParameter;

@WebServlet(name = "areaCheckServlet", value = "/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws IOException, ServletException {
        try {
            String xString = request.getParameter("x");
            String yString = request.getParameter("y");
            String rString = request.getParameter("r");

            response.setCharacterEncoding("UTF-8");
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

            HitDataBean newBean = new HitDataBean();

            newBean.setX(xString);
            newBean.setY(yString);
            newBean.setR(rString);
            newBean.setHit(message);

            HitDataTableBean hitTable = (HitDataTableBean) request.getAttribute("resultTable");
            ArrayList<HitDataBean> beans = hitTable.getHits();

            beans.add(newBean);
            hitTable.setHits(beans);

            getServletContext().setAttribute("resultRow", newBean);
            getServletContext().setAttribute("resultTable", hitTable);
        }
        catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
}
