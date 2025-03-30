
package com.egovernance.servlet;

import com.egovernance.dao.UserDAO;
import com.egovernance.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Servlet to handle user login
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        UserDAO userDAO = new UserDAO();
        User user = userDAO.authenticate(username, password);
        
        if (user != null) {
            // Authentication successful
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            
            // Redirect based on user type
            if ("admin".equals(user.getUserType())) {
                response.sendRedirect("admin/dashboard.html");
            } else {
                response.sendRedirect("dashboard.html");
            }
        } else {
            // Authentication failed
            request.setAttribute("errorMessage", "Invalid username or password");
            request.getRequestDispatcher("login.html").forward(request, response);
        }
    }
}
