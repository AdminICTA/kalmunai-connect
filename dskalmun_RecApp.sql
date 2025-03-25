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
