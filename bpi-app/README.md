# BPI Online Banking – Full-Stack App

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 18 + Vite                   |
| Backend  | Spring Boot 3 (Java 17)           |
| Database | PostgreSQL                        |

---

## Quick Start

### 1. PostgreSQL

Create the database once:

```sql
CREATE DATABASE bpidb;
```

Update the credentials in `backend/src/main/resources/application.properties`:

```
spring.datasource.username=postgres
spring.datasource.password=your_password_here
```

---

### 2. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run      # Linux / macOS
mvnw.cmd spring-boot:run    # Windows
```

The API starts on **http://localhost:8080**.  
Main endpoint: `GET /api/faq`

---

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**.  
Vite proxies `/api/*` to the Spring Boot backend automatically.

---

## Project Structure

```
bpi-app/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/bpi/backend/
│       │   ├── BpiApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/FaqController.java
│       │   ├── model/FaqItem.java
│       │   ├── repository/FaqItemRepository.java
│       │   └── service/FaqService.java
│       └── resources/
│           ├── application.properties
│           └── data.sql          ← seed FAQ rows
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── images/               ← hero.jpg, phone.jpg, security.jpg …
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Header.jsx
            ├── Hero.jsx
            ├── Intro.jsx
            ├── FeatureRows.jsx
            ├── MoreFeatures.jsx
            ├── Experience.jsx
            ├── Tools.jsx
            ├── Discover.jsx
            ├── Faq.jsx
            └── Footer.jsx
```

---

## Notes

- The FAQ section fetches data from the backend (`/api/faq`). If the backend is offline, it falls back to static data so the page still renders correctly.
- Images live in `frontend/public/images/` so Vite serves them at `/images/<file>` with no import needed.
- `data.sql` seeds the FAQ table on first startup; it uses `WHERE NOT EXISTS` so it won't duplicate rows on restart.
