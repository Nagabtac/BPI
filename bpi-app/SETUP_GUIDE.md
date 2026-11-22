# BPI Online Banking — Setup Guide for a New Computer

This guide walks you through every step needed to run the project from scratch on a new machine.

---

## What You Need to Install

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 18 or higher | https://nodejs.org |
| **Java JDK** | 17 or higher | https://adoptium.net |
| **Apache Maven** | 3.8 or higher | https://maven.apache.org/download.cgi |
| **MySQL** (via XAMPP) | Any recent | https://www.apachefriends.org |
| **Git** *(optional)* | Any | https://git-scm.com |

---

## Step 1 — Install Node.js

1. Go to https://nodejs.org and download the **LTS** version.
2. Run the installer — keep all defaults.
3. Open a terminal and confirm:
   ```
   node -v
   npm -v
   ```
   Both should print version numbers.

---

## Step 2 — Install Java JDK

1. Go to https://adoptium.net and download **Temurin JDK 21** (or 17+).
2. Run the installer — tick **"Set JAVA_HOME"** if the option appears.
3. Confirm in a terminal:
   ```
   java -version
   ```

---

## Step 3 — Install Maven

1. Go to https://maven.apache.org/download.cgi and download the **Binary zip archive**.
2. Extract it somewhere permanent, e.g. `C:\Program Files\Maven`.
3. Add Maven's `bin` folder to your **PATH** environment variable:
   - Search "Environment Variables" in the Start menu.
   - Under **System Variables → Path** click **Edit → New**.
   - Paste the path to Maven's `bin` folder, e.g. `C:\Program Files\Maven\apache-maven-3.9.x\bin`.
4. Confirm in a new terminal:
   ```
   mvn -version
   ```

---

## Step 4 — Install XAMPP and Start MySQL

1. Download XAMPP from https://www.apachefriends.org and install it.
2. Open the **XAMPP Control Panel**.
3. Click **Start** next to **MySQL**.
4. MySQL is now running on `localhost:3306` with username `root` and **no password** by default.

> **If your MySQL already has a password**, skip to Step 6 and enter it in `application.properties`.

---

## Step 5 — Get the Project Files

**Option A — Copy from USB / shared folder**
Copy the entire `bpi-app` folder to your computer, e.g. to `C:\Projects\bpi-app`.

**Option B — Clone from Git** *(if the project is on a repository)*
```bash
git clone <repo-url>
cd bpi-app
```

---

## Step 6 — Configure the Database Connection

1. Open this file in any text editor:
   ```
   bpi-app/backend/src/main/resources/application.properties
   ```

2. Find these lines and update them to match your MySQL setup:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bpidb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=
   ```

   | Setting | What to put |
   |---------|------------|
   | `url` port | Change `3306` if your MySQL runs on a different port (check XAMPP — it may show e.g. `3310`) |
   | `username` | Usually `root` for XAMPP |
   | `password` | Leave blank for a default XAMPP install, or enter your password |

   > The database `bpidb` is **created automatically** on first startup — you don't need to create it manually.

---

## Step 7 — Start the Backend (Spring Boot)

Open a terminal, go to the `backend` folder, and run:

```bash
cd bpi-app/backend
mvn spring-boot:run
```

Wait about 20–30 seconds. When you see this line the backend is ready:

```
Started BpiApplication in X.XXX seconds
```

The API is now running at **http://localhost:8080**

> Leave this terminal open while using the app.

---

## Step 8 — Install Frontend Dependencies

Open a **second terminal**, go to the `frontend` folder, and run:

```bash
cd bpi-app/frontend
npm install
```

This downloads all React/Vite packages into a `node_modules` folder. It only needs to be done once per machine (or after updating `package.json`).

---

## Step 9 — Start the Frontend (React)

In the same terminal:

```bash
npm run dev
```

You will see:

```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser — the BPI website is running.

> Leave this terminal open too.

---

## Quick Reference — Starting Every Day

Once everything is installed, you only need these steps each time:

| # | Action | Command |
|---|--------|---------|
| 1 | Start MySQL | Open XAMPP Control Panel → Start MySQL |
| 2 | Start backend | `cd bpi-app/backend` then `mvn spring-boot:run` |
| 3 | Start frontend | `cd bpi-app/frontend` then `npm run dev` |
| 4 | Open browser | Go to **http://localhost:5173** |

---

## Project Layout

```
bpi-app/
├── backend/                        ← Spring Boot (Java)
│   ├── pom.xml                     ← Maven dependencies
│   └── src/main/
│       ├── java/com/bpi/backend/
│       │   ├── BpiApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/FaqController.java
│       │   ├── model/FaqItem.java
│       │   ├── repository/FaqItemRepository.java
│       │   └── service/FaqService.java
│       └── resources/
│           ├── application.properties   ← database config
│           └── data.sql                 ← seed data
│
└── frontend/                       ← React + Vite
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── public/
    │   ├── images/                 ← all images and SVGs
    │   └── video/                  ← hero video
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        └── components/
            ├── Header.jsx
            ├── HeroVideo.jsx
            ├── LeadingTheWay.jsx
            ├── Pillars.jsx
            ├── SustainabilityLinks.jsx
            ├── Newsroom.jsx
            ├── FinancialLeader.jsx
            ├── Awards.jsx
            ├── CareersBanner.jsx
            ├── ExploreSolutions.jsx
            ├── CustomerSupport.jsx
            ├── Footer.jsx
            └── LoginPage.jsx
```

---

## Troubleshooting

### "npm is not recognized"
Node.js is not installed or not in PATH. Re-install from https://nodejs.org and restart your terminal.

### "mvn is not recognized"
Maven is not in PATH. Re-do Step 3, then open a **new** terminal window.

### "java is not recognized"
JDK is not installed. Re-do Step 2.

### Backend fails with "Access denied for user 'root'"
Your MySQL password is wrong. Open `application.properties` and correct `spring.datasource.password`.

### Backend fails with "Communications link failure" or "Connection refused"
MySQL is not running. Open XAMPP Control Panel and start MySQL.

### Wrong port error (e.g. port 3310 instead of 3306)
Check the port number shown in XAMPP next to MySQL, then update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3310/bpidb?...
```

### Frontend shows blank page or 404
Make sure you ran `npm install` first, then `npm run dev`.

### Page loads but FAQ is empty / shows error
The backend may not be running. The page still works — the FAQ falls back to static data automatically.

---

## Ports Used

| Service | Port |
|---------|------|
| React frontend | 5173 |
| Spring Boot backend | 8080 |
| MySQL | 3306 (default XAMPP) |
