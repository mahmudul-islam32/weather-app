# German Weather App

A modern, responsive weather application built with React, TypeScript, and Docker. Get accurate weather forecasts for any location in Germany using the free Open-Meteo API. The application features an intuitive interface with search functionality, detailed weather displays, and a calendar component for date-based weather viewing.

## Features

- 🌤️ **Real-time Weather Data**: Current weather conditions with temperature, humidity, wind speed, and more
- 📅 **7-Day Forecast**: Detailed daily forecasts with precipitation and wind information
- 🇩🇪 **German Locations**: Search and select from cities and towns across Germany
- 🔍 **Smart Search**: Autocomplete suggestions with location details
- � **Interactive Calendar**: Navigate through dates to view historical and forecast weather data
- �📱 **Responsive Design**: Beautiful UI that works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean design with FontAwesome icons and smooth animations
- 🐋 **Docker Ready**: Fully containerized for easy deployment and development

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **HTTP Client**: Axios for API requests
- **Icons**: FontAwesome for weather and UI icons
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx for production serving
- **Development**: Hot module replacement with Vite

## API Integration

This application uses the free [Open-Meteo API](https://open-meteo.com/) which provides:
- High-resolution weather data
- No API key required
- CORS-enabled endpoints
- Geocoding for location search
- European weather model data

## Quick Start with Docker

The easiest way to run the application is using Docker. Choose between development mode (with hot reload) or production mode.

### Development Mode (Recommended for local development)
```bash
# Clone the repository
git clone <repository-url>
cd weather

# Start development server with hot reload
docker-compose up --build

# The app will be available at http://localhost:3000
# Changes to code will automatically reload the browser
```

### Production Mode
```bash
# Run production build with optimized bundle
docker-compose --profile prod up --build

# The app will be available at http://localhost:3001
```

### Individual Docker Commands
```bash
# Build development image
docker build -f Dockerfile.dev -t weather-app-dev .

# Run development container
docker run -p 3000:5173 -v $(pwd):/app -v /app/node_modules weather-app-dev

# Build production image
docker build -t weather-app .

# Run production container
docker run -p 3000:80 weather-app
```

## Local Development (Without Docker)

If you prefer to run the application directly on your system without Docker:

### Prerequisites
- **Node.js**: Version 18 or higher ([Download here](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm as alternative)
- **Git**: For cloning the repository

### Installation Steps
```bash
# Clone the repository
git clone <repository-url>
cd weather

# Install all dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
# The development server includes hot reload for instant updates
```

### Available Scripts
```bash
# Start development server with hot reload
npm run dev

# Build the application for production
npm run build

# Preview the production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Run TypeScript compiler check
npm run type-check
```

### Production Build
```bash
# Create optimized production build
npm run build

# The built files will be in the 'dist' directory
# You can serve these files with any static file server
```

### Serving Production Build
```bash
# Option 1: Use npm to preview
npm run preview

# Option 2: Use a simple HTTP server (install globally if needed)
npm install -g serve
serve -s dist -l 3000

# Option 3: Use Python (if available)
cd dist
python -m http.server 3000
```

## Docker Deployment

### Production Deployment
The application uses a multi-stage Docker build:
1. **Build Stage**: Installs dependencies and builds the React app
2. **Production Stage**: Serves the built app with Nginx

```bash
# Build production image
docker build -t weather-app .

# Run production container
docker run -p 3000:80 weather-app
```

### Development with Docker
```bash
# Use development Dockerfile for hot reload
docker build -f Dockerfile.dev -t weather-app-dev .
docker run -p 5173:5173 -v $(pwd):/app weather-app-dev
```

## Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── WeatherSearch.tsx    # Location search with autocomplete
│   │   ├── WeatherDisplay.tsx   # Weather data display component
│   │   └── Calendar.tsx         # Interactive calendar for date selection
│   ├── services/
│   │   └── weatherService.ts    # API integration and data fetching
│   ├── types/
│   │   └── weather.ts           # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles and CSS variables
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts           # Vite environment type definitions
├── public/                      # Static assets
├── Dockerfile                   # Production Docker configuration
├── Dockerfile.dev               # Development Docker configuration
├── docker-compose.yml           # Docker Compose configuration
├── nginx.conf                   # Nginx configuration for production
├── vite.config.ts              # Vite build tool configuration
├── tsconfig.json               # TypeScript compiler configuration
├── tsconfig.node.json          # TypeScript config for Node.js files
├── package.json                # Project dependencies and scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using the port
lsof -i :3000  # or :5173 for dev mode

# Kill the process using the port
kill -9 <PID>

# Or use different ports
docker-compose up --build -p 3001:5173  # for development
```

**Docker permission issues (Linux/macOS):**
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Or run with sudo
sudo docker-compose up --build
```

**Module not found errors:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# For Docker, rebuild without cache
docker-compose build --no-cache
```

**TypeScript errors:**
```bash
# Run type check
npm run lint

# Check TypeScript configuration
npx tsc --noEmit
```

## Environment Configuration

The application is configured to work out of the box with no additional setup required. All weather data comes from the free Open-Meteo API which doesn't require authentication.

### Weather Data Sources
- **Current Weather**: Open-Meteo current weather API
- **Forecasts**: Open-Meteo forecast API (7 days)
- **Geocoding**: Open-Meteo geocoding API for location search

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern browser features used:
- CSS backdrop-filter
- CSS Grid and Flexbox
- ES2020+ JavaScript features
- Fetch API

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them thoroughly
4. **Test with Docker**: `docker-compose up --build`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Submit a pull request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Test on both Docker and local environments
- Update documentation for new features

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons and emojis for weather visualization
- React and TypeScript communities
