# TreadOwl [XMPLR]

A real-time web application that serves as a personal dashboard and interactive playground. It integrates live music tracking, a public message board, and dynamic text displays, all built with modern web technologies focusing on performance and a polished user interface.

## Project Highlights

- **Live Music Dashboard**: Integrates with the Last.fm API to display the currently playing track in real-time, alongside a history of recently played songs.
- **Interactive Message Board**: Features a live chat wall where visitors can leave messages, powered by a real-time database.
- **Dynamic Text Marquee**: A continuous, scrolling display of translated verses from the Bhagavad Gita.
- **RPG Integration (WIP)**: Includes a portal to "One Shot Dungeon," an work-in-progress web-based RPG adventure.
- **Optimized Data Fetching:** Next.js caching is utilized to decouple data fetching from the client-side auto-refresh, significantly reducing latency and API load (song updates are polled approximately every ~30s).

## Technical Implementation

This project is built to demonstrate modern data fetching, real-time updates, and responsive design principles.

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Data Source:** [Last.fm API](https://www.last.fm/api)
- **Database:** [Supabase](https://www.supabase.com)
- **Package Manager:** [Bun](https://bun.sh/)

## Local Development

To run this project locally, ensure you have [Bun](https://bun.sh/) installed on your system.

### 1. Clone & Install Dependencies

```bash
bun  install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory and provide the necessary credentials for Last.fm and Supabase:

```bash
LASTFM_USER=your_lastfm_username
LASTFM_API_KEY=your_lastfm_api_key

SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 3. Start the Server

Launch the development server:

```bash
bun  dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser. The main entry point for the application is `app/page.tsx`.

---

### Details & Architecture

- **Fonts:** This project uses specialized fonts (e.g., Cormorant, Medeival, Cinzel) configured in `app/layout.tsx`.
- **Content:** `file/bg.json` contains the verses from the Holy Bhagavad Gita that are parsed and displayed within the marquee header.
- **Data Fetching optimization:** Data fetching is cached utilizing Next.js `revalidate: 15` cache option, which works beautifully alongside client auto-refresh components to enhance both responsiveness and rate-limiting limits.
