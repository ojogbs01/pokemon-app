# Pokémon React App

A modern Pokédex web app built with React and Vite. Browse, search, and filter Pokémon with a clean UI and responsive design.

## Features

- Browse Pokémon cards with images, names, and types
- Load more Pokémon with a button (pagination)
- Type badges with dynamic colors
- Responsive layout (4 cards per row on desktop)
- Search and filter bar in the navbar
- Styled with CSS Modules and Google Fonts (Poppins)

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ojogbs01/pokemon-app.git
    cd pokemon-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` — React components (Navbar, PokemonGrid, PokemonCard, etc.)
- `src/assets/` — Images and static assets
- `src/index.css` — Global styles
- `public/` — Static files

## API

This app uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.

## License

MIT
