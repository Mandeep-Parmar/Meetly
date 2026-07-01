<div align="center">
  <img src="docs/logo.png" alt="Meetly" width="64" /><br /><br />

  <h1>Meetly</h1>
  <p>Modern real-time video conferencing platform built with the MERN Stack, WebRTC, and Socket.IO.</p>
  <sub>
    Secure authentication • Peer-to-peer video • Screen sharing • Live chat • Meeting history
  </sub>

  <br /><br />

  <a href="https://meetly-live.vercel.app">
    <img src="https://img.shields.io/badge/🚀 Live Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/mandeepparmar/meetly">
    <img src="https://img.shields.io/badge/📂 Source Code-1a1a2e?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" />
  </a>

  <br /><br />

  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=webrtc&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0f172a?style=flat-square&logo=tailwind-css&logoColor=38bdf8" />

  <br /><br />

</div>

<br />

## Overview

**Meetly** is a full-stack, real-time video conferencing application built entirely from scratch using the **MERN stack**, **WebRTC**, and **Socket.IO**. It lets users instantly create or join meetings via a unique meeting code or shareable link — no downloads, no friction.

Meetly was built to demonstrate a production-grade understanding of real-time systems: peer-to-peer media negotiation, signaling servers, stateful socket rooms, secure authentication flows, and a polished, responsive UI — all wired together into a cohesive product rather than a collection of tutorials stitched together.

<br />

## Project Highlights

-  &nbsp;Built completely from scratch — no video SDK
-  &nbsp;Secure JWT authentication with persistent sessions
-  &nbsp;Peer-to-peer video calls via WebRTC
-  &nbsp;Screen sharing mid-call
-  &nbsp;Real-time in-call chat via Socket.IO
-  &nbsp;Persistent meeting history per user
-  &nbsp;Guest join — no account required
-  &nbsp;Fully responsive across all screen sizes

<br />

## Features

<table>
<tr>
<td valign="top" width="25%">

**🔐 Authentication**
- Register & login
- JWT + persistent sessions
- bcrypt password hashing
- Guest join

</td>
<td valign="top" width="25%">

**🎥 Meetings**
- Lobby with camera & mic preview
- P2P video via WebRTC
- Screen sharing
- Camera & mic toggles
- Live timer · Copy link

</td>
<td valign="top" width="25%">

**💬 Chat**
- Real-time messaging
- Unread message badge
- Auto-scroll
- Timestamps

</td>
<td valign="top" width="25%">

**📊 Dashboard**
- Create & join meetings
- Meeting history log
- Rejoin or copy link
- Personalized UI

</td>
</tr>
</table>

<br />

## Screenshots

<table>
<tr>
  <td><img src="docs/screenshots/landing.png" alt="Landing" /></td>
  <td><img src="docs/screenshots/dashboard.png" alt="Dashboard" /></td>
</tr>
<tr>
  <td align="center"><sub>Landing Experience</sub></td>
  <td align="center"><sub>Dashboard</sub></td>
</tr>
<tr>
  <td><img src="docs/screenshots/lobby.png" alt="Lobby" /></td>
  <td><img src="docs/screenshots/meeting.png" alt="Meeting Room" /></td>
</tr>
<tr>
  <td align="center"><sub>Lobby Preview</sub></td>
  <td align="center"><sub>Meeting Room</sub></td>
</tr>
<tr>
  <td><img src="docs/screenshots/chat.png" alt="Chat" /></td>
  <td><img src="docs/screenshots/history.png" alt="History" /></td>
</tr>
<tr>
  <td align="center"><sub>Live Chat</sub></td>
  <td align="center"><sub>Meeting History</sub></td>
</tr>
</table>

<br />

## 🛠️ Tech Stack

<div align="center">

| | |
|:--|:--|
| **Frontend** | React · Tailwind CSS · React Router · Context API · Axios · Lucide React |
| **Backend** | Node.js · Express · MongoDB · Mongoose · JWT · bcrypt |
| **Real-time** | Socket.IO · WebRTC |
| **Deployed on** | Vercel · Render |

<br />

</div>


## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/meetly.git
cd meetly
```

### Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

```

Create a `.env` file inside the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000

```

<br />


## 👨‍💻 Author

<div align="center">

**Built with 💜 by Mandeep Paramr**

Full-Stack Developer specializing in the MERN stack and real-time web applications

</div>

---

## 🔗 Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](#)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](#)

</div>

---

<div align="center">
  <sub>⭐ If you found this project helpful, consider starring the repository.</sub><br />
  <sub>built with ❤️ by Mandeep Parmar.</sub>
</div>
