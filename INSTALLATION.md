# Quick Installation Guide

## Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

## Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Setup MongoDB
**Option A: Local MongoDB**
- Make sure MongoDB is running on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file

### Step 3: Configure Environment
Create `.env` file in root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calculator-hub
NODE_ENV=development
```

### Step 4: Run the Application
```bash
# Run both frontend and backend
npm run dev
```

Visit: http://localhost:3000

## Alternative: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## Common Issues

### Port Already in Use
- Change PORT in `.env` file
- Kill process using the port

### MongoDB Connection Error
- Check if MongoDB is running
- Verify MONGODB_URI in `.env`

### Module Not Found
- Run `npm install` in both root and frontend directories

## Next Steps

1. Update domain name in SEO files (search for "yourdomain.com")
2. Customize colors in CSS files
3. Add Google Analytics
4. Deploy to hosting platform

## Deployment Options

- **Heroku**: Full stack deployment
- **Vercel**: Frontend only (connect to external API)
- **Railway**: Full stack with MongoDB
- **DigitalOcean**: VPS deployment

## Support

- Check README.md for detailed documentation
- Open issue on GitHub for bugs
- Review calculator examples in code

---

🎉 **You're ready to go! Your calculator website is now running.**

