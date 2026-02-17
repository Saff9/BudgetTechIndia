# BudgetTechIndia

> Best Budget Tech Products Under ₹2000 in India

BudgetTechIndia is a professional affiliate marketing website focused on helping Indian consumers discover the best budget tech products under ₹2000.

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
- **Dual Storage System**: Support for both local JSON file storage and Firebase Firestore
- **Storage Management**: Easy configuration and migration between storage systems
- **Enhanced Admin Panel**: Improved product editor with advanced features and batch operations

## Project Structure

```
budgettechindia/
├── public/
│   ├── images/          # Static images
│   │   ├── products/    # Product images
│   │   ├── categories/  # Category thumbnails
│   │   ├── blog/       # Blog post images
│   │   └── og/         # Open Graph images
│   └── fonts/          # Self-hosted fonts
├── src/
│   ├── components/     # UI components
│   │   └── admin/      # Admin dashboard components (ProductForm, StorageSelector, DataMigration)
│   ├── layouts/        # Page layouts
│   ├── pages/         # Route pages
│   │   └── admin/      # Admin dashboard routes (products, settings)
│   ├── content/        # MDX content collections
│   ├── data/          # JSON data files (products, categories, content, settings)
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
│       └── storage/    # Dual storage system implementation
│           ├── index.ts       # Storage system factory and types
│           ├── firebaseStorage.ts  # Firebase Firestore implementation
│           └── localStorage.ts    # Local JSON file storage implementation
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
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
| `PUBLIC_STORAGE_TYPE` | Storage system type: 'local' (default) or 'firebase' | No |
| `PUBLIC_FIREBASE_API_KEY` | Firebase API key (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_APP_ID` | Firebase app ID (required for Firebase storage) | No |
| `PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID (required for Firebase storage) | No |

## Storage System

The application supports dual storage options:

### 1. Local JSON File Storage (Default)

- Simple and lightweight
- No external dependencies
- Files stored in `src/data/` directory
- Products: `src/data/products.json`
- Categories: `src/data/categories.json`
- Content: `src/data/content.json`
- Settings: `src/data/settings.json`
- Perfect for small to medium datasets and development

### 2. Firebase Firestore Storage

- Cloud-based NoSQL database
- Real-time synchronization
- Automatic backup and redundancy
- Scalable for large datasets
- Requires Firebase project configuration

### Configuration

Set the storage type in your `.env` file:

```env
# Use local JSON files (default)
PUBLIC_STORAGE_TYPE=local

# Or use Firebase Firestore
PUBLIC_STORAGE_TYPE=firebase
```

For Firebase storage, you need to configure all Firebase environment variables.

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

Built with ❤️ by BudgetTechIndia Team