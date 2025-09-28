# DetachedOut

**DetatchedOut** is a social networking web app inspired by LinkedIn. Built with **SvelteKit** and **SQLite3**, it supports:

- User profiles with avatars and privacy controls  
- Posts with text and images  
- Friend / connection requests  
- Real-time messaging via WebSockets  
- Notifications, timelines, and infinite scrolling feeds  
- Job postings and applications  
- Basic account and session management  

---

## Table of Contents

1. [Key Features](#key-features)  
2. [Technical Stack](#technical-stack)  
3. [Repository Structure](#repository-structure)  
4. [Setup & Installation](#setup--installation)  
5. [Usage & Examples](#usage--examples)  
6. [Real-Time Communication](#real-time-communication)  
7. [Database & Models](#database--models)  
8. [Testing & Debugging](#testing--debugging)  
9. [Limitations & Future Ideas](#limitations--future-ideas)  
10. [License & Attribution](#license--attribution)  

---

## Key Features

- **User accounts**: registration, authentication, profile editing  
- **Profile privacy settings**: choose who can see your information and posts  
- **Posts**: text + image upload support  
- **Connections / friend requests**: send, accept, reject  
- **Feed / timeline**: infinite scroll and pagination for posts from your connections  
- **Messaging**: real-time chat between connected users  
- **Jobs**: create job adverts, browse listings, apply for positions  
- **Notifications**: e.g. new friend request, message received, job updates  
- **Basic UI / navigation**: landing page, dashboard, profile pages, jobs tab  

---

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend / Routing | SvelteKit |
| Backend API & Logic | Node.js / SvelteKit server endpoints |
| Realtime Messaging | WebSockets |
| Database | SQLite3 |
| File uploads | Local file storage |
| State & Session | Signed cookies / server session in SvelteKit |
| Utilities | Environment variables, input validation, etc. |

---
## Setup & Installation

### Prerequisites

- Node.js (latest LTS)  
- npm or yarn  
- SQLite3 (CLI) for migrations / inspection  

### Steps

1. **Clone the repo**  
   ```bash
   git clone https://github.com/BronzeKennen/detached-out.git
   cd detached-out
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**  
   Copy `.env.example` to `.env` and update values:
   ```
   DATABASE_URL=sqlite://./data/detached.sqlite
   SESSION_SECRET=your_secret_here
   WS_PORT=4001
   ```

4. **Initialize database / run migrations**  
   Ensure schema is created either by running scripts or using the provided SQLite file.

5. **Run development server**  
   ```bash
   npm run dev
   ```

6. **Access application**  
   Open in browser: `http://localhost:3000`

---

## Real-Time Communication

- A WebSocket server handles connections for real-time messaging.  
- Users connect after authentication, and messages are routed between clients instantly.  
- Notifications (e.g., friend requests, job updates) may also be pushed over WebSockets.  

---

## Limitations & Future Ideas

- Currently optimized for small deployments; may require DB migration (PostgreSQL/MySQL) for scale.  
- Image uploads are stored locally; consider integrating a CDN or cloud storage.  
- Additional feed ranking / recommendation features could be added.  
- Resume/job application handling could be extended (attachments, tracking).  

---

## License & Attribution

- Include a license file of your choice (e.g., MIT, Apache 2.0).  
- Built with **SvelteKit**.  
