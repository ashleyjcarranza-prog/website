# Ashley Carranza Website

Static HTML/CSS/JS site with clean routing and JSON-driven content.

## UI Libraries
- Bootstrap 5.3.8
- Bootstrap Icons 1.11.3
- AOS 2.3.1 (scroll animations)

## GitHub Pages deployment
A GitHub Actions workflow is included at `.github/workflows/deploy.yml` and deploys on pushes to `main`.

## Content updates
- Products: `data/products.json`
- Events: `data/events.json`
- Global metadata: `data/site.json`

## Local preview
```bash
python3 -m http.server 8080
```
Then open: `http://localhost:8080`
