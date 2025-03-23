
# Connecting to the PHP Backend

This document explains how to set up the PHP backend for the Kalmunai DS application.

## Setup Instructions

1. **Deploy PHP files to your cPanel server:**
   - Log in to your cPanel account (usually https://yourdomain.com/cpanel)
   - Go to File Manager and navigate to your web root directory (usually public_html)
   - Create a folder named `api` and upload all PHP files from the `src/docs/backend-php` directory
   - Create the following directory structure on your server:
     ```
     /api/
       /auth/
         login.php
         register.php
         logout.php
       /users/
         get-all.php
         get-by-id.php
         create.php
         update.php
         delete.php
       /services/
         get-all.php
         get-by-id.php
         apply.php
       /stats/
         admin.php
         staff.php
         public.php
       /departments/
         get-all.php
         get-by-id.php
         create.php
         update.php
         delete.php
       /messages/
         get-all.php
         get-new.php
         mark-read.php
         send.php
     ```

2. **Database Configuration in cPanel:**
   - In cPanel, go to "MySQL Databases" section
   - Note your existing database name, username, and password:
     ```
     Database: dskalmun_database
     Username: dskalmun_Admin
     Password: Itadmin@1993
     Host: 162.214.204.205
     Port: 3306
     ```
   - Or create a new database and user if needed:
     1. Create a new database (e.g., yourdomain_dsapp)
     2. Create a new user with password
     3. Add the user to the database with all privileges
     4. Note the database name, username, and password

3. **Import Database Schema:**
   - In cPanel, open phpMyAdmin
   - Select your database from the left sidebar
   - Click on the "Import" tab
   - Choose the SQL file containing your database schema (included below)
   - Click "Go" to execute the SQL
   - Verify that all tables were created successfully

4. **Update Database Connection in PHP Files:**
   - Make sure all PHP files have the correct database credentials:
     ```php
     $dbHost = '162.214.204.205'; // Your database host
     $dbPort = '3306';            // Your database port
     $dbUser = 'dskalmun_Admin';  // Your database username
     $dbPass = 'Itadmin@1993';    // Your database password
     $dbName = 'dskalmun_database'; // Your database name
     ```

5. **API Endpoints Configuration in React App:**
   - Update the API_BASE_URL in `src/services/api-config.ts` to point to your production server:
     ```typescript
     export const API_BASE_URL = import.meta.env.PROD 
       ? 'https://yourdomain.com/api' // Update this to your actual domain
       : 'http://localhost/dskalmunai/api';
     ```
   - Make sure to build and deploy your React app with the updated configuration

6. **Testing the API:**
   - Use Postman or curl to test your endpoints:
     ```
     POST https://yourdomain.com/api/auth/login.php
     Content-Type: application/json
     
     {
       "username_or_email": "icta@dskalmunai.com",
       "password": "1993"
     }
     ```

7. **Security Considerations for Production:**
   - Implement password hashing using PHP's `password_hash()` and `password_verify()`
   - Add proper JWT token authentication
   - Configure HTTPS on your domain
   - Set up proper CORS headers to prevent unauthorized access
   - Add rate limiting to prevent brute force attacks

## Real-Time Messaging Configuration

To enable real-time messaging after work completion:

1. **Polling Method (Simpler):**
   - Your app is already configured to poll for updates
   - Make sure the messages endpoints are properly implemented
   - Configure polling interval in `subscribeToUpdates` method:
     ```typescript
     // To adjust polling frequency to 5 seconds
     apiService.subscribeToUpdates('/messages/get-new.php', handleMessages, 5000);
     ```

2. **WebSocket Method (More Advanced):**
   - Check if your hosting supports WebSockets
   - If supported, install a WebSocket server like Ratchet or ReactPHP
   - Update your WebSocket endpoint in the `subscribeToUpdates` method

## Database Schema

Here's the complete SQL schema for your application:

```sql
-- Users table
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE `departments` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Divisions table
CREATE TABLE `divisions` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE `roles` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE `services` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Public users table
CREATE TABLE `public_users` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `qr_code` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci,
  `phone` varchar(20) COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service requests table
CREATE TABLE `service_requests` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `public_user_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `service_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` enum('pending','processing','completed','rejected') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leave requests table
CREATE TABLE `leave_requests` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `staff_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `leave_type` enum('casual','vacation','medical','other') COLLATE utf8mb3_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pending',
  `chief_clerk_id` varchar(36) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `chief_clerk_approval` enum('pending','approved','rejected') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pending',
  `hod_id` varchar(36) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `hod_approval` enum('pending','approved','rejected') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Messages table for real-time messaging
CREATE TABLE `messages` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL PRIMARY KEY,
  `sender_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `receiver_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Sample Data for Testing

```sql
-- Sample roles
INSERT INTO `roles` (`id`, `name`) VALUES
('Admin', 'Administrator'),
('Staff', 'Staff Member'),
('User', 'Regular User');

-- Sample departments
INSERT INTO `departments` (`id`, `name`, `description`) VALUES
('ADM1', 'Administration', 'Administrative department'),
('ACC1', 'Accounts', 'Accounts and finance department'),
('LND1', 'Land', 'Land administration department'),
('NIC1', 'NIC', 'National Identity Card department');

-- Sample users (for testing)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `department_id`) VALUES
('u1', 'ICTA', 'icta@dskalmunai.com', '1993', 'Admin', 'ADM1'),
('u2', 'Farhana', 'farhana@dskalmunai.com', '0726', 'Admin', 'ADR1'),
('u3', 'Marliya', 'marliya@dskalmunai.com', '1966', 'User', 'ACC1'),
('u4', 'Maya', 'maya@dskalmunai.com', '1991', 'User', 'NIC1'),
('u5', 'Staff1', 'staff@dskalmunai.com', 'staff123', 'Staff', 'LND1');
```
