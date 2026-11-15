# Kedar Chashtve — Portfolio

A standalone, responsive portfolio website with a cinematic streaming-platform-inspired presentation.

## Deployment

The production entry point is the root-level `index.html`. It is intentionally self-contained (HTML, CSS and JavaScript), so static hosting can serve it directly without a React build step.

For GitHub Pages:
1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select `main` and the `/ (root)` folder.
4. Save and wait for the Pages deployment to finish.

For Netlify or Cloudflare Pages, use the repository root as the publish directory. No build command is required for the standalone portfolio.

The original React application remains in `frontend/` for reference; the root `index.html` is the static-site entry point.
