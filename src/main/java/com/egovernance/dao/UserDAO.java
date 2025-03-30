
package com.egovernance.dao;

import com.egovernance.db.DatabaseConnection;
import com.egovernance.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for User-related operations
 */
public class UserDAO {
    
    /**
     * Authenticates a user
     * @param username the username
     * @param password the password
     * @return User object if authentication successful, null otherwise
     */
    public User authenticate(String username, String password) {
        Connection connection = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        User user = null;
        
        try {
            connection = DatabaseConnection.getConnection();
            String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, password); // In production, use password hashing
            
            rs = stmt.executeQuery();
            
            if (rs.next()) {
                user = new User();
                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("full_name"));
                user.setPhone(rs.getString("phone_number"));
                user.setAddress(rs.getString("address"));
                user.setUserType(rs.getString("user_type"));
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                DatabaseConnection.closeConnection(connection);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return user;
    }
    
    /**
     * Registers a new user
     * @param user the user to register
     * @return true if registration successful, false otherwise
     */
    public boolean registerUser(User user) {
        Connection connection = null;
        PreparedStatement stmt = null;
        boolean success = false;
        
        try {
            connection = DatabaseConnection.getConnection();
            String sql = "INSERT INTO users (username, password, email, full_name, phone_number, address, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)";
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword()); // In production, hash the password
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getFullName());
            stmt.setString(5, user.getPhone());
            stmt.setString(6, user.getAddress());
            stmt.setString(7, user.getUserType());
            
            int rowsAffected = stmt.executeUpdate();
            success = rowsAffected > 0;
            
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) stmt.close();
                DatabaseConnection.closeConnection(connection);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return success;
    }
    
    /**
     * Gets a user by ID
     * @param userId the user ID
     * @return User object if found, null otherwise
     */
    public User getUserById(int userId) {
        Connection connection = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        User user = null;
        
        try {
            connection = DatabaseConnection.getConnection();
            String sql = "SELECT * FROM users WHERE user_id = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, userId);
            
            rs = stmt.executeQuery();
            
            if (rs.next()) {
                user = new User();
                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("full_name"));
                user.setPhone(rs.getString("phone_number"));
                user.setAddress(rs.getString("address"));
                user.setUserType(rs.getString("user_type"));
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                DatabaseConnection.closeConnection(connection);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        return user;
    }
}
