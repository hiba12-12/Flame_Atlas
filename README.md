# 🔥 Flame Atlas

**Explore wildfire activity through an interactive, data-focused web experience.**

Flame Atlas is a web application developed as part of a **NASA Space Apps Challenge** project. It aims to make wildfire-related information easier to explore, compare, and understand through a clear, accessible interface.

> **Project status:** Frontend implementation (V8). Data integrations and analysis capabilities should be verified against the deployed application before being described as live features.

## 🌍 Project Overview

Wildfires affect ecosystems, communities, and air quality. Understanding wildfire patterns requires bringing complex information into a format that people can navigate and interpret.

Flame Atlas focuses on an approachable interface for exploring wildfire-related information, comparing areas, and asking questions within a unified web experience.

## ✨ Application Pages

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Introduces Flame Atlas and provides entry points to the experience. |
| `/explorer` | Explorer | Interface for exploring wildfire-related information. |
| `/ranker` | Ranker | Interface for viewing and comparing ranked results. |
| `/ask` | Ask | Question-oriented interface for wildfire-related exploration. |



## 🛠️ Technology Stack

- **Next.js 16** — React-based web application framework
- **React** — Component-based user interfaces
- **TypeScript / JavaScript** — Application development (depending on source files)
- **CSS** — Styling and responsive layout
- **Node.js and npm** — Local development and package management

For the exact dependency list and versions, see [`package.json`](./package.json).

## 🚀 Getting Started

### Prerequisites

Install a Node.js version supported by the project's Next.js version (Next.js 16 requires **Node.js 20.9 or later**) and npm.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hiba12-12/flame_atlas.git
   cd flame_atlas
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000** in your browser.

### Production Build

```bash
npm run build
npm run start
```

> If the application uses environment variables or external APIs, configure them according to the implementation before running it. Never commit API keys or `.env` secrets.

## 📁 Project Structure

```text
flame_atlas/
├── public/                 # Public images and static assets
├── src/
│   ├── app/                # Next.js App Router pages and global styles
│   │   ├── page.*          # Home route (/)
│   │   ├── explorer/       # Explorer route (/explorer)
│   │   ├── ranker/         # Ranker route (/ranker)
│   │   └── ask/            # Ask route (/ask)
│   └── components/         # Reusable UI components
├── package.json            # Scripts and dependencies
├── next.config.ts          # Next.js configuration
└── README.md               # Project documentation
```

*This is a simplified structural overview; individual filenames and additional directories may vary.*

## 🎯 Project Goals

- Present wildfire-related information in a user-friendly interface.
- Support exploration and comparison of wildfire-related data.
- Help users navigate complex environmental information.
- Provide a foundation for future integration with trustworthy Earth-observation datasets and analytical services.

## 🛰️ Data Sources and Integrations



## 🤝 Team and Contributions

Developed collaboratively for the NASA Space Apps Challenge.

**Repository:** [hiba12-12/flame_atlas](https://github.com/hiba12-12/flame_atlas)


## 📌 Future Improvements


---

**Flame Atlas** — Making wildfire information easier to explore.
