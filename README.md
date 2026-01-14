# Merge Game

An educational merge-style game that helps students learn research synthesis by transforming citations into thesis statements.

## Overview

Players start with Level 1 cards containing raw citations and progressively merge them through five levels:

1. Raw Citations
2. Synthesis Statements
3. Synthesis Paragraphs
4. Section Headers
5. Thesis Statement (Goal)

## Structure

- `index.html` - Main game interface
- `game.js` - Game logic and mechanics
- `styles.css` - Visual styling and animations
- `nginx.conf` - Server configuration
- `docker-compose.yml` - Container deployment

## Deployment

```bash
docker compose up -d
```

The game is accessible at `/merge-game` on the apps portal.

## How to Play

1. Drag two cards of the same level into the merge zone
2. Click "Merge" to combine them into a higher-level concept
3. Continue merging until you reach Level 5 - your complete thesis statement
