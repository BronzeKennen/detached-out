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
   Note: You will need to set up an account on cloudinary and an api key if you want image and video functionality
   Copy `.env.example` to `.env` and update values:
   ```
   DATABASE_URL=sqlite://./data/detached.sqlite
   WS_PORT=4001
   ACCESS_TOKEN_SECRET = YOUR_SECRET_HERE
   CLOUD_NAME = YOUR_CLOUD_NAME
   API_KEY = YOUR_API_KEY
   API_SECRET = YOUR_API_SECRET
   ```

5. **Initialize database / run migrations**  
   Ensure schema is created either by running scripts or using the provided SQLite file.

6. **Run development server**  
   ```bash
   npm run dev
   ```

7. **Access application**  
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
