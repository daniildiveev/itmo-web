package web.itmo.lab2.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import web.itmo.lab2.models.HitDataTableBean;

import java.io.IOException;

@WebServlet(name = "controllerServet", value = "/controller")
public class ControllerServlet extends HttpServlet{
    private HitDataTableBean beans;

    public ControllerServlet() {
        this.beans = new HitDataTableBean();
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("resultTable", this.beans);
        processRequest(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException{
        request.setAttribute("resultTable", this.beans);
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request,
                                HttpServletResponse response)
            throws ServletException, IOException{
        try {
            String x = request.getParameter("x");
            String y = request.getParameter("y");
            String R = request.getParameter("r");

            boolean hasCoordinates = (x != null) && (y != null) && (R != null);

            if (hasCoordinates) {
                request.getRequestDispatcher("/area-check-servlet").forward(request, response);
            } else {
                request.getRequestDispatcher("/index.jsp").forward(request, response);
            }
        } catch (Exception e){
            getServletContext().setAttribute("error", e.getMessage());
            getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
}
