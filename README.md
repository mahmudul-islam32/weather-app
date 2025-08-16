# German Weather App

A modern, responsive weather application built with React, TypeScript, and Docker. Get accurate weather forecasts for any location in Germany using the free Open-Meteo API.

## Features

- 🌤️ **Real-time Weather Data**: Current weather conditions with temperature, humidity, wind speed, and more
- 📅 **7-Day Forecast**: Detailed daily forecasts with precipitation and wind information
- 🇩🇪 **German Locations**: Search and select from cities and towns across Germany
- 🔍 **Smart Search**: Autocomplete suggestions with location details
- 📱 **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- 🐋 **Docker Ready**: Fully containerized for easy deployment

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **HTTP Client**: Axios for API requests
- **Date Handling**: date-fns for date formatting
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx for production serving

## API Integration

This application uses the free [Open-Meteo API](https://open-meteo.com/) which provides:
- High-resolution weather data
- No API key required
- CORS-enabled endpoints
- Geocoding for location search
- European weather model data

## Quick Start with Docker

### Production Build
```bash
# Build and run the production container
docker-compose up --build

# The app will be available at http://localhost:3000
```

### Development Mode
```bash
# Run in development mode with hot reload
docker-compose --profile dev up --build

# The app will be available at http://localhost:5173
```

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
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
│   │   └── WeatherDisplay.tsx   # Weather data display
│   ├── services/
│   │   └── weatherService.ts    # API integration
│   ├── types/
│   │   └── weather.ts           # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # Application entry point
├── public/
├── Dockerfile                   # Production Docker configuration
├── Dockerfile.dev               # Development Docker configuration
├── docker-compose.yml           # Docker Compose configuration
├── nginx.conf                   # Nginx configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Environment Configuration

The application is configured to work out of the box. All API endpoints are publicly available and don't require authentication.

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

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons and emojis for weather visualization
- React and TypeScript communities
