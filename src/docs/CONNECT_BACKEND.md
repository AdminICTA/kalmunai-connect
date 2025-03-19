
# Connecting to the PHP Backend

This document explains how to set up the PHP backend for the Kalmunai DS application.

## Setup Instructions

1. **Deploy PHP files to your server:**
   - Copy the PHP files from the `src/docs/backend-php` directory to your server's web root directory
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
     ```

2. **Database Configuration:**
   - Make sure your MySQL database is properly set up with the required tables
   - Ensure the database connection credentials are correct in each PHP file:
     ```php
     $dbHost = '162.214.204.205';
     $dbPort = '3306';
     $dbUser = 'dskalmun_Admin';
     $dbPass = 'Itadmin@1993';
     $dbName = 'dskalmun_database';
     ```

3. **API Endpoints Configuration:**
   - Update the API_BASE_URL in `src/services/api-config.ts` to point to your server:
     ```typescript
     export const API_BASE_URL = import.meta.env.PROD 
       ? 'https://dskalmunai.lk/api' 
       : 'http://localhost/dskalmunai/api';
     ```

4. **Testing the API:**
   - Use tools like Postman or Insomnia to test your API endpoints
   - Example test for login:
     ```
     POST https://dskalmunai.lk/api/auth/login.php
     Content-Type: application/json
     
     {
       "username_or_email": "icta@dskalmunai.com",
       "password": "1993"
     }
     ```

5. **Security Considerations:**
   - In production, implement proper password hashing using `password_hash()` and `password_verify()`
   - Add proper JWT token generation and validation
   - Secure your API endpoints with appropriate authentication checks
   - Use HTTPS for all API communications

## Development Environment

For local development:

1. Install a local PHP server like XAMPP, WAMP, or MAMP
2. Place the PHP files in your local server's web directory
3. Update the API_BASE_URL to point to your local server
4. Set `VITE_USE_REAL_API=true` in your .env file to use the real API instead of mock data

## Database Schema

The main tables required for the application:

```sql
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `departments` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `services` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `service_requests` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `service_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` enum('pending','processing','completed','rejected') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
