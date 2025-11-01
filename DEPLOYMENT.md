# Deployment Guide - Movie Review Platform

This guide will help you deploy your Movie Review app to free hosting services.

## Quick Overview

- **Frontend**: Deploy to Vercel or Netlify (free, instant)
- **Backend**: Deploy to Render (free, with cold starts)
- **Database**: Already hosted (Firebase/Firestore)

---

## 🚀 Step 1: Deploy Backend (Render)

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easiest)

### 1.2 Deploy Server
1. Click **New +** → **Web Service**
2. Connect your GitHub repo: `PrimordialFire/MovieRepo`
3. Configure:
   - **Name**: `movieexp-api` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 1.3 Add Environment Variables
In Render dashboard, go to **Environment** tab and add:
```
TMDB_API_KEY=6ee85eb9ced65444e2dd1f98863bdbc4
PORT=4000
```

### 1.4 Get Your Backend URL
After deployment completes (3-5 minutes), copy your URL:
- Example: `https://movieexp-api.onrender.com`
- Keep this URL - you'll need it for frontend!

---

## 🎨 Step 2: Deploy Frontend (Vercel - Recommended)

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### 2.2 Deploy Client
1. Click **Add New...** → **Project**
2. Import `PrimordialFire/MovieRepo`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Add Environment Variables
Click **Environment Variables** and add all these:

```
VITE_FIREBASE_API_KEY=AIzaSyC2_v6tuf3OICHhgbt_GfNIdLx1HxaptLo
VITE_FIREBASE_AUTH_DOMAIN=moviebase-b9c4d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=moviebase-b9c4d
VITE_FIREBASE_STORAGE_BUCKET=moviebase-b9c4d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=843599923769
VITE_FIREBASE_APP_ID=1:843599923769:web:3d4ee6e957ff6fc1555be8
VITE_API_BASE=https://your-backend-url.onrender.com
```

**IMPORTANT**: Replace `https://your-backend-url.onrender.com` with your actual Render backend URL from Step 1.4!

### 2.4 Deploy
1. Click **Deploy**
2. Wait 1-2 minutes
3. Get your live URL (e.g., `https://movieexp.vercel.app`)

---

## 🔄 Alternative: Deploy Frontend to Netlify

If you prefer Netlify over Vercel:

### 1. Create Netlify Account
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub

### 2. Deploy
1. Click **Add new site** → **Import an existing project**
2. Connect GitHub → Select `MovieRepo`
3. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

### 3. Environment Variables
Go to **Site settings** → **Environment variables** → Add the same variables as Vercel (see Step 2.3 above)

### 4. Redeploy
Click **Deploys** → **Trigger deploy** to rebuild with env vars

---

## 📋 Step 3: Update Firebase CORS (Important!)

Your deployed frontend needs permission to call Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select `moviebase-b9c4d` project
3. **Authentication** → **Settings** → **Authorized domains**
4. Add your Vercel/Netlify domain:
   - Example: `movieexp.vercel.app` (without https://)

---

## ✅ Step 4: Test Your Deployed App

1. Open your frontend URL (from Vercel/Netlify)
2. Register a new account
3. Search for a movie
4. Add a review
5. Edit/delete your review
6. Check Firebase Console to confirm data is saving

---

## 🔧 Troubleshooting

### Backend Issues

**"Service Unavailable" on first load:**
- Render free tier "sleeps" after 15 min of inactivity
- First request takes 30-60 seconds to "wake up"
- Subsequent requests are fast
- This is normal for free tier!

**Can't search movies:**
- Check Render logs: Dashboard → Logs
- Verify `TMDB_API_KEY` env var is set
- Test backend directly: `https://your-api.onrender.com/api/search?query=inception`

### Frontend Issues

**"Network Error" when searching:**
- Check `VITE_API_BASE` points to your Render URL
- Make sure backend is deployed and running
- Check browser console (F12) for CORS errors

**Firebase errors:**
- Verify all `VITE_FIREBASE_*` env vars are set
- Check Firebase Console → Authentication is enabled
- Verify your domain is in Firebase authorized domains

**Can't login/register:**
- Check Firebase Console → Authentication → Users
- Verify Email/Password provider is enabled
- Check browser console for detailed error

### Redeploy After Fixes

**Render (backend):**
- Go to dashboard → **Manual Deploy** → **Deploy latest commit**

**Vercel (frontend):**
- Go to project → **Deployments** → **Redeploy**
- OR: Push to GitHub (auto-deploys)

**Netlify (frontend):**
- Go to **Deploys** → **Trigger deploy**

---

## 🎯 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app` or `https://your-app.netlify.app`
- **Backend API**: `https://your-api.onrender.com`
- **GitHub Repo**: `https://github.com/PrimordialFire/MovieRepo`

Add these to your README.md for easy access!

---

## 💰 Cost

- **Render**: Free (500 hours/month, sleeps after 15 min inactivity)
- **Vercel**: Free (100 GB bandwidth, unlimited projects)
- **Netlify**: Free (100 GB bandwidth, 300 build minutes/month)
- **Firebase**: Free (Spark plan sufficient for demo/testing)

**Total cost: $0** ✅

---

## 🚀 Quick Deploy Commands (Optional)

If you prefer CLI deployment:

### Vercel CLI
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod

# Follow prompts, add env vars when asked
```

### Netlify CLI
```powershell
# Install Netlify CLI
npm i -g netlify-cli

# Deploy frontend
cd client
netlify deploy --prod

# Follow prompts
```

---

## 📝 Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Add live URLs to README.md
3. ✅ Share frontend URL for grading
4. ✅ Keep backend awake during demo (visit URL before presentation)
5. ✅ Take screenshots for documentation

---

## 🎓 For Your Submission

Include in your README or submission:
- **Live Demo**: `https://your-app.vercel.app`
- **GitHub Repo**: `https://github.com/PrimordialFire/MovieRepo`
- **Backend API**: `https://your-api.onrender.com`

Good luck! 🌟
