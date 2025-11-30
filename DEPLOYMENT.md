# Deployment Guide

## 🚀 Deployment Options

### Option 1: Heroku (Easiest - Full Stack)

**Pros:** Free tier, easy setup, PostgreSQL/MongoDB add-ons
**Best for:** Quick deployment, beginners

#### Steps:

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-calculator-hub
```

4. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

5. **Deploy**
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

6. **Open App**
```bash
heroku open
```

**Environment Variables:**
```bash
heroku config:set NODE_ENV=production
```

---

### Option 2: Vercel (Frontend) + Railway (Backend)

**Pros:** Great performance, automatic deployments
**Best for:** Professional projects

#### Frontend (Vercel):

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Frontend**
```bash
cd frontend
vercel
```

3. **Update API URL**
Update axios base URL to your backend URL

#### Backend (Railway):

1. Go to railway.app
2. Create new project
3. Deploy from GitHub
4. Add MongoDB database
5. Set environment variables

---

### Option 3: DigitalOcean / VPS (Full Control)

**Pros:** Full control, best performance
**Best for:** Production-grade applications

#### Steps:

1. **Create Droplet** (Ubuntu 20.04)

2. **SSH into Server**
```bash
ssh root@your-server-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install MongoDB**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

5. **Clone Repository**
```bash
git clone your-repo-url
cd calculator-hub
```

6. **Install Dependencies**
```bash
npm install
cd frontend
npm install
cd ..
```

7. **Build Frontend**
```bash
npm run build
```

8. **Install PM2**
```bash
sudo npm install -g pm2
```

9. **Start App**
```bash
pm2 start backend/server.js --name calculator-hub
pm2 startup
pm2 save
```

10. **Setup Nginx**
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/calculator-hub
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/calculator-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

11. **Setup SSL (Free with Let's Encrypt)**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Option 4: Netlify (Frontend Only)

**Pros:** Free, automatic deployments, CDN
**Best for:** Static hosting with external API

1. Build frontend
2. Drag-and-drop `frontend/build` to Netlify
3. Configure redirects for React Router

---

## 🔧 Pre-Deployment Checklist

### 1. Update Domain References
- [ ] Update in `frontend/src/components/SEO/SEO.js`
- [ ] Update in `frontend/public/sitemap.xml`
- [ ] Update in `frontend/public/robots.txt`
- [ ] Update in all calculator pages

### 2. Environment Variables
- [ ] Set `NODE_ENV=production`
- [ ] Set `MONGODB_URI` to production database
- [ ] Set `PORT` if needed

### 3. Security
- [ ] Enable HTTPS
- [ ] Set secure headers (already configured with helmet)
- [ ] Configure CORS properly
- [ ] Hide sensitive data

### 4. Performance
- [ ] Build frontend for production
- [ ] Enable compression (already configured)
- [ ] Optimize images
- [ ] Enable CDN (optional)

### 5. Monitoring
- [ ] Setup Google Analytics
- [ ] Setup error tracking (Sentry)
- [ ] Setup uptime monitoring
- [ ] Configure logs

---

## 📊 Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check if site loads
curl https://yourdomain.com

# Check API endpoint
curl https://yourdomain.com/api/calculate
```

### 2. Test All Calculators
- Test each calculator page
- Verify calculations work
- Check mobile responsiveness
- Test on different browsers

### 3. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Analytics is tracking
- [ ] Check meta tags are correct

### 4. Performance Testing
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
```

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install && cd ..

# Rebuild
npm run build
```

### MongoDB Connection Issues
- Check MONGODB_URI is correct
- Verify MongoDB is running
- Check firewall rules
- Whitelist IP in MongoDB Atlas

### 404 Errors on Refresh
Add to server.js or configure hosting:
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
```

### Slow Performance
- Enable compression
- Use CDN for static assets
- Optimize images
- Implement caching

---

## 💰 Cost Estimates

### Free Options:
- **Heroku**: Free tier (sleeps after 30min inactivity)
- **Vercel**: Free for personal projects
- **Netlify**: Free tier available
- **MongoDB Atlas**: Free 512MB cluster
- **Railway**: Free tier with limitations

### Paid Options:
- **Heroku Hobby**: $7/month
- **DigitalOcean Droplet**: $5-10/month
- **MongoDB Atlas**: $9/month (shared cluster)
- **Domain Name**: $10-15/year

### Recommended Starting Setup:
- **Total**: ~$15-20/month
  - DigitalOcean: $5/month
  - MongoDB Atlas: $9/month (optional, can use droplet)
  - Domain: $1.25/month (yearly)

---

## 🎯 Recommended Deployment Strategy

**For Development/Testing:**
- Heroku (free tier)
- MongoDB Atlas (free tier)

**For Production:**
- DigitalOcean VPS ($5-10/month)
- MongoDB Atlas or local MongoDB
- Cloudflare CDN (free)
- SSL via Let's Encrypt (free)

---

## 📝 Deployment Commands Quick Reference

```bash
# Heroku
heroku create
git push heroku main
heroku logs --tail

# Vercel
vercel
vercel --prod

# PM2 (VPS)
pm2 start server.js
pm2 logs
pm2 restart all
pm2 stop all

# MongoDB
mongod --dbpath /data/db  # Start MongoDB
mongo  # Connect to MongoDB shell

# Nginx
sudo nginx -t  # Test config
sudo systemctl restart nginx  # Restart
sudo systemctl status nginx  # Check status
```

---

## 🚀 You're Ready to Deploy!

Choose the deployment option that best fits your needs and budget. For most users, starting with Heroku or Vercel + Railway is recommended for ease of use.

**Good luck with your deployment! 🎉**

