# BudgetTechIndia

> Best Budget Tech Products Under â¹2000 in India

BudgetTechIndia is a professional affiliate marketing website focused on helping Indian consumers discover the best budget tech products under â¹2000.

## Tech Stack

- **Framework**: [Astro 4.x](https://astro.build/) - Static Site Generator with Islands Architecture
- **UI Components**: [React 18.x](https://react.dev/) - For interactive islands
- **Styling**: [Tailwind CSS 3.x](https://tailwindcss.com/) - Utility-first CSS framework
- **Content**: Markdown + MDX for articles, JSON for product data
- **Build Tool**: Vite (included with Astro)
- **Deployment**: Vercel (primary) / Render (secondary)

## Features

- **Fast Performance**: Zero JavaScript by default, selective hydration for interactive components
- **SEO Optimized**: Built-in sitemap generation, meta tags, and structured data support
- **Content-First**: Native Markdown/MDX support for editorial content
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Affiliate Ready**: Built-in affiliate link management and tracking

## Project Structure

```
budgettechindia/
âââ public/
â   âââ images/          # Static images
â   â   âââ products/    # Product images
â   â   âââ categories/  # Category thumbnails
â   â   âââ blog/       # Blog post images
â   â   âââ og/         # Open Graph images
â   âââ fonts/          # Self-hosted fonts
âââ src/
â   âââ components/     # UI components
â   âââ layouts/        # Page layouts
â   âââ pages/         # Route pages
â   âââ content/        # MDX content collections
â   âââ data/          # JSON data files
â   âââ styles/         # Global styles
â   âââ utils/          # Utility functions
âââ astro.config.mjs    # Astro configuration
âââ tailwind.config.mjs # Tailwind configuration
âââ tsconfig.json       # TypeScript configuration
âââ package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/budgettechindia/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:4321](http://localhost:4321) in your browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run validate` | Run typecheck and lint |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Production site URL | Yes |
| `AMAZON_AFFILIATE_TAG` | Amazon Associates India tag | Yes |
| `ANALYTICS_ID` | Google Analytics ID | No |

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Render

1. Connect repository to Render
2. Configure as Static Site
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Bundle Size | < 100KB JS |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Documentation

For detailed architecture and implementation details, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

Built with â¤ï¸ by BudgetTechIndia Team