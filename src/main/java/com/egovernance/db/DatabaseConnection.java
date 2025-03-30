
package com.egovernance.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Utility class for managing database connections
 */
public class DatabaseConnection {
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/e_governance_db";
    private static final String USER = "root";
    private static final String PASSWORD = "password"; // Change this in production

    /**
     * Gets a connection to the database
     * @return a Connection object
     * @throws SQLException if a database access error occurs
     * @throws ClassNotFoundException if the database driver is not found
     */
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        // Register JDBC driver
        Class.forName(JDBC_DRIVER);
        
        // Open a connection
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }
    
    /**
     * Closes a database connection safely
     * @param connection the connection to close
     */
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
