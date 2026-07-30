# Ascend

Ascend is a full-stack job application tracker that helps users organize applications, track interview progress, and manage their job search from a single dashboard — built to feel like a real product, not a spreadsheet.

**Live demo:** [ascendjobs.infinityfreeapp.com](http://ascendjobs.infinityfreeapp.com)

## Features

- Landing page with a live preview of the application pipeline
- Secure user authentication (register / login / logout) with hashed passwords and session-based auth
- Protected routes — dashboard, applications, and profile pages redirect to login if not authenticated
- Dashboard with live stats (total applications, interviews, offers, rejections) and recent activity
- Full application management — add, edit, search by company, and filter by status
- Tracks Job Type (Internship / Full-time), Mode (On-Campus / Off-Campus), and referral source
- Per-application notes for tracking what worked and what didn't across attempts
- Editable user profile — college, branch, experience, status, and contact emails
- Responsive, modern dark-themed UI with a custom design system and a signature pipeline-stage tracker

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (vanilla, no framework)

**Backend:** PHP (PDO), MySQL

**Hosting:** InfinityFree (shared PHP + MySQL hosting)

## Project Status

**Complete.** Frontend and backend are both fully built, integrated, and deployed live.

## Getting Started (running locally)

This is a real PHP + MySQL application, so it needs a local server environment like [XAMPP](https://www.apachefriends.org/) — opening the HTML files directly in a browser won't work.

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahimayadav02/Ascend.git
   ```

2. **Move the project into your local server's web root**
   e.g. for XAMPP on Mac: `/Applications/XAMPP/xamppfiles/htdocs/Ascend`

3. **Create the database**
   Open phpMyAdmin (`http://localhost/phpmyadmin`) and run the table definitions in [`backend/schema.sql`](backend/schema.sql).

4. **Add your database credentials**
   `backend/config/db.php` isn't included in this repo (it holds live credentials). Create it yourself:
   ```php
   <?php
   $DB_HOST = 'localhost';
   $DB_NAME = 'your_db_name';
   $DB_USER = 'root';
   $DB_PASS = '';
   ```

5. **Start Apache + MySQL** in XAMPP, then visit:
   ```
   http://localhost/Ascend/index.html
   ```

## Future Improvements

- Dashboard analytics / charts over time
- Application timeline view
- Email reminders for follow-ups
- Light theme toggle

## Author

Mahima Yadav
