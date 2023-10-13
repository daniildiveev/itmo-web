package web.itmo.lab2.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;

@WebServlet(name = "controllerServet", value = "/controller")
public class ControllerServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException{
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request,
                                HttpServletResponse response)
            throws ServletException, IOException{
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String R = request.getParameter("r");

        boolean hasCoordinates = (x != null ) && (y != null) && (R != null);

        if (hasCoordinates) {
            request.getRequestDispatcher("/area-check-servlet").forward(request, response);
        } else {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
