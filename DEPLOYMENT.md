# DSAG Platform - Deployment Guide

## 🚀 GitHub Pages Deployment

### Prerequisites
- GitHub account
- Repository with your code
- GitHub Pages enabled

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 2: Push Your Code

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial DSAG platform release"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/triumphkiateh/DSAG-V0.git

# Push to main branch
git push -u origin main
```

### Step 3: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the deployment workflow to complete
3. Visit your site at: `https://triumphkiateh.github.io/DSAG-V0/`

## 🔧 Local Development

### Quick Start
```bash
# Clone repository
git clone https://github.com/triumphkiateh/DSAG-V0.git
cd DSAG-V0

# Serve locally (choose one method)
python -m http.server 8000
# OR
npx serve .
# OR
open index.html
```

### Development Server
For better development experience:
```bash
# Install live server globally
npm install -g live-server

# Run with live reload
live-server --port=8000
```

## 📁 Project Structure

```
DSAG-V0/
├── index.html              # Main platform page
├── styles/
│   └── main.css           # Custom styles
├── js/
│   ├── app.js             # Main application
│   ├── navigation.js      # Navigation manager
│   ├── game-manager.js    # Game integration
│   └── progress-tracker.js # Progress tracking
├── assets/
│   └── favicon.svg        # Platform favicon
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── 1.cosmic-rift-scanners.html    # Game 1
├── 2.Recursionauts: The Echo Chamber.html  # Game 2
├── 3.snipers intercept.html       # Game 3
├── 4.kitchen rush.html            # Game 4
├── README.md              # Project documentation
├── DEPLOYMENT.md          # This file
└── .gitignore            # Git ignore rules
```

## 🎮 Game Integration

### How Games Are Loaded
1. User clicks on a game card
2. `GameManager` launches the game in an iframe
3. Game runs in full-screen mode
4. Progress is tracked via postMessage API
5. User can return to platform anytime

### Game Communication
Games can communicate with the platform using:
```javascript
// Send progress updates
window.parent.postMessage({
    type: 'level-complete',
    data: { level: 1, score: 100 }
}, '*');

// Send game completion
window.parent.postMessage({
    type: 'game-complete',
    data: { level: 10, score: 1000 }
}, '*');
```

## 🔧 Customization

### Adding New Games
1. Add game HTML file to root directory
2. Update `gameConfigs` in `js/game-manager.js`
3. Add game card to `index.html`
4. Update navigation dropdown

### Styling Changes
- Main styles: `styles/main.css`
- Component styles: Use Tailwind classes in HTML
- Custom CSS variables: Defined in `:root` selector

### Configuration
- Game settings: `js/game-manager.js`
- Navigation routes: `js/navigation.js`
- Progress tracking: `js/progress-tracker.js`

## 🐛 Troubleshooting

### Common Issues

**Games not loading:**
- Check file paths in `game-manager.js`
- Ensure game files are in root directory
- Check browser console for errors

**Styling issues:**
- Verify Tailwind CSS is loading
- Check custom CSS in `main.css`
- Ensure responsive classes are correct

**Navigation not working:**
- Check JavaScript console for errors
- Verify all JS files are loaded
- Test in different browsers

**GitHub Pages not updating:**
- Check Actions tab for deployment status
- Verify workflow file is correct
- Wait a few minutes for propagation

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- All assets are optimized for fast loading
- Games load on-demand
- Progress is cached locally
- No external dependencies except Tailwind CDN

## 📊 Analytics (Future)

To add analytics later:
1. Add Google Analytics or similar
2. Track game completions
3. Monitor user engagement
4. A/B test different features

## 🔒 Security

### Current Security Measures
- No user data collection
- All progress stored locally
- No external API calls
- HTTPS enforced on GitHub Pages

### Future Security
- User authentication
- Data encryption
- API rate limiting
- Input validation

## 🚀 Scaling

### Current Limitations
- Static hosting only
- No user accounts
- Local storage only
- No real-time features

### Future Scaling Options
- Move to Vercel/Netlify
- Add backend services
- Implement user accounts
- Add real-time multiplayer

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review GitHub Actions logs
3. Test locally first
4. Create GitHub issue with details

---

**Ready to deploy?** Follow the steps above and your DSAG platform will be live in minutes!
