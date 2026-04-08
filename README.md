# TreadOwl [XMPLR]

A beautiful, real-time dashboard displaying current and recently played music via the Last.fm API, paired with a scrolling marquee of verses from the Holy Bhagavad Gita. Built with modern web technologies, it features a sleek dark mode UI and smooth animations.

# Features

- **Live Now Playing status:** Real-time updates of your currently playing track from Last.fm with animated music bars.
- **Recent Tracks history:** A scrollable list of your previous 20 last played songs with relative timestamps.
- **Bhagavad Gita Marquee:** A continuous marquee displaying translated verses from the Holy Bhagavad Gita in a classic font.
- **Optimized Data Fetching:** Next.js caching is utilized to decouple data fetching from the client-side auto-refresh, significantly reducing latency and API load (song updates are polled approximately every ~30s).
- **Responsive & Dynamic UI:** Built with Tailwind CSS, featuring glassmorphism effects, hover interactions, and smooth transitions.

# Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Source:** [Last.fm API](https://www.last.fm/api)
- **Package Manager:** [Bun](https://bun.sh/)

# Getting Started

First, make sure you have [Bun](https://bun.sh/) installed.

### 1. Clone & Install Dependencies

```bash
bun install
```

### 2. Environment Variables

Create a `.env.local` (or `.env`) file in the root directory and add your Last.fm credentials:

```bash
LASTFM_USER=your_lastfm_username
LASTFM_API_KEY=your_lastfm_api_key
```

### 3. Run the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`.

# Details & Architecture

- **Fonts:** This project uses specialized fonts (e.g., Cormorant) configured in `app/layout.tsx`.
- **Content:** `file/bg.json` contains the verses from the Holy Bhagavad Gita that are parsed and displayed within the marquee header.
- **Data Fetching optimization:** Data fetching is cached utilizing Next.js `revalidate: 10` cache option, which works beautifully alongside client auto-refresh components to enhance both responsiveness and rate-limiting limits.
