# Weather App Development Setup

## 🚀 Quick Start

### Development Mode (Hot Reloading)
```bash
docker-compose up --build
```
- Runs on: http://localhost:3000
- Auto-reloads when you change files
- Uses Vite dev server with HMR

### Production Mode
```bash
docker-compose --profile prod up --build
```
- Runs on: http://localhost:3001
- Optimized build with Nginx

## 📁 Docker Configuration

### Development (Default)
- **Port**: 3000
- **Hot Reload**: ✅ Enabled
- **File Watching**: ✅ Enabled with polling
- **Dockerfile**: `Dockerfile.dev`

### Production
- **Port**: 3001 
- **Optimized Build**: ✅ Nginx + Static files
- **Dockerfile**: `Dockerfile`

## 🛠 Development Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **File Polling**: Works in Docker containers
- **Volume Mounting**: Source code is mounted for live updates
- **TypeScript**: Full type checking and IntelliSense

## 🔧 Commands

```bash
# Start development server
docker-compose up

# Rebuild and start
docker-compose up --build

# Stop containers
docker-compose down

# Production mode
docker-compose --profile prod up --build

# View logs
docker-compose logs -f
```

## 📝 Making Changes

1. Edit any file in `src/`
2. Save the file
3. Changes appear automatically in browser
4. No need to restart Docker!

## 🌤️ Features

- 🔍 **Real-time Search**: Type and see suggestions instantly
- ⚡ **Loading States**: Beautiful loading animations
- 🎨 **Modern Design**: Blue gradient with glassmorphism effects
- 📱 **Responsive**: Works on all devices
- 🌡️ **Weather Data**: 7-day forecast with hourly details
