# HireOn

<h3 align="center">
Transform Any Job Description Into a Winning Interview Strategy
</h3>

<p align="center">
AI-powered interview preparation platform that analyzes job requirements, resumes, and personal profiles to generate personalized interview roadmaps, technical questions, behavioral questions, and skill-gap insights.
</p>

---

## Overview

HireOn helps job seekers prepare smarter by turning a job description into a complete interview preparation plan.

Instead of spending hours researching technologies, preparing answers, and identifying weaknesses, users can upload their resume, describe their experience, and instantly receive a customized interview strategy tailored to the target role.

---

## Features

### AI-Powered Interview Report Generation

Generate complete interview preparation reports using:

- Job Description
- Resume Upload (PDF)
- Personal Background & Self Description

---

### Technical Interview Questions

Receive role-specific technical interview questions with:

- Interviewer Intent
- Suggested Answers
- Skill Evaluation Focus

---

### Behavioral Interview Questions

Practice realistic behavioral questions designed around:

- Previous Experience
- Communication Skills
- Collaboration Ability
- Leadership & Problem Solving

---

### Skill Gap Analysis

Identify missing skills and weaknesses between:

- Candidate Profile
- Resume Experience
- Job Requirements

Includes severity indicators to prioritize learning.

---

### Personalized Preparation Roadmap

Receive a structured preparation plan with:

- Daily Learning Goals
- Recommended Topics
- Interview Readiness Tasks
- Strategic Focus Areas

---

### Report History

Access all previously generated reports:

- Match Score
- Generation Date
- Interview Strategy
- Roadmap & Questions

---

### Secure Authentication

- User Registration
- Login System
- JWT Authentication
- Protected Routes

---

## Tech Stack

### Frontend

- React
- React Router
- SCSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT Authentication

### AI

- Google Gemini API

---

## Project Structure

```bash
HireOn
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── app.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── web
│   ├── public
│   │   └── fonts
│   │
│   ├── src
│   │   ├── features
│   │   │   ├── auth
│   │   │   │   ├── components
│   │   │   │   ├── hooks
│   │   │   │   ├── pages
│   │   │   │   └── services
│   │   │   │
│   │   │   └── interview
│   │   │       ├── components
│   │   │       ├── hooks
│   │   │       ├── pages
│   │   │       ├── services
│   │   │       └── style
│   │   │
│   │   └── styles
│   │
│   ├── package.json
│   └── vite.config.js
│
├── LICENSE
├── README.md
├── package.json
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/hireon.git
cd hireon
```

---

### Install Dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Running Locally

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## Screenshots
<p align="center">
  <img src="./screenshots/Screenshot 2026-06-20 133410.png" alt="HireOn Logo" width="120"/>
</p>

---

## Future Improvements

- Export Reports as PDF
- AI Mock Interview Mode
- Voice-Based Interviews
- Company-Specific Interview Preparation
- ATS Resume Scoring
- Interview Performance Tracking
- Learning Resource Recommendations

---

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

See the LICENSE file for details.

---

## Author

Built with passion by **Abhas Paul**.

If you found this project useful, consider giving it a ⭐ on GitHub.
