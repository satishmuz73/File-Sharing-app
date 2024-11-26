
# Project Name: File Sharing App

## Description:
This project is a file-sharing app that allows users to upload and share files securely. It uses various technologies and frameworks for efficient handling of files, user authentication, and email notifications.

## Technologies Used:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.
- **Express.js**: A web framework for Node.js used for building APIs and handling HTTP requests.
- **MongoDB**: A NoSQL database for storing user data and file metadata.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **Dotenv**: To load environment variables from a `.env` file.
- **EJS**: Embedded JavaScript templating for dynamic HTML views.
- **Nodemailer**: A module for sending emails, used in the app to send notifications (e.g., when a file is uploaded or an account is created).
- **UUID**: A library used for generating unique identifiers, which are used for files and user sessions.
- **Git**: Version control using Git, with `.gitignore` to exclude unnecessary files.

## Project Structure:
- **`config/`**: Contains configuration files for database connections and other settings.
- **`models/`**: Contains MongoDB models for users, files, and other entities.
- **`node_modules/`**: Directory for all npm packages.
- **`public/`**: Static files (e.g., CSS, images) used by the front-end.
- **`routes/`**: Defines routes for different endpoints of the application (e.g., upload, download, user authentication).
- **`services/`**: Business logic related to file handling, authentication, and email notifications.
- **`uploads/`**: Directory where uploaded files are stored.
- **`views/`**: EJS templates for rendering dynamic HTML pages.
- **`server.js`**: The main server file that sets up Express.js and other middleware.

## Setup:
1. Clone this repository:
   ```bash
   git clone <repo_url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env` file:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   SMTP_HOST= smtp.ethereal.email
   SMTP_PORT= 587
   MAIL_USER=your_email_username
   MAIL_PASS=your_email_password
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Features:
- File upload and download functionality
- File metadata storage in MongoDB
- Frontend built using EJS
- Email notifications for events (e.g., file uploads, user registrations)
- Secure file sharing

