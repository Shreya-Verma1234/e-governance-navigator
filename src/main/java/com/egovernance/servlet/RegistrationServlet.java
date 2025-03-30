
package com.egovernance.servlet;

import com.egovernance.dao.UserDAO;
import com.egovernance.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet to handle user registration
 */
@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String email = request.getParameter("email");
        String fullName = request.getParameter("fullName");
        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        
        // Validation
        if (!password.equals(confirmPassword)) {
            request.setAttribute("errorMessage", "Passwords do not match");
            request.getRequestDispatcher("register.html").forward(request, response);
            return;
        }
        
        // Create user object
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // In production, hash the password
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPhone(phone);
        user.setAddress(address);
        user.setUserType("citizen"); // Default type for new registrations
        
        // Register user
        UserDAO userDAO = new UserDAO();
        boolean success = userDAO.registerUser(user);
        
        if (success) {
            // Registration successful
            response.sendRedirect("login.html?registration=success");
        } else {
            // Registration failed
            request.setAttribute("errorMessage", "Registration failed. Username or email may already exist.");
            request.getRequestDispatcher("register.html").forward(request, response);
        }
    }
}
