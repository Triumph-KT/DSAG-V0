/**
 * DSAG Platform - Navigation Manager
 * Handles routing, navigation state, and URL management
 */

class NavigationManager {
    constructor() {
        this.currentRoute = null;
        this.routes = new Map();
        this.history = [];
        
        this.setupRoutes();
        this.setupHistoryListener();
        this.handleInitialRoute();
    }
    
    /**
     * Setup available routes
     */
    setupRoutes() {
        this.routes.set('home', {
            element: 'home',
            title: 'DSAG - The New Paradigm for Learning & Hiring',
            handler: () => this.showHome()
        });
        
        this.routes.set('games', {
            element: 'games',
            title: 'Games - DSAG',
            handler: () => this.showGames()
        });
        
        this.routes.set('games/cosmic-rift', {
            element: 'game-container',
            title: 'Cosmic Rift Scanners - DSAG',
            handler: () => this.showGame('cosmic-rift')
        });
        
        this.routes.set('games/recursionauts', {
            element: 'game-container',
            title: 'Recursionauts - DSAG',
            handler: () => this.showGame('recursionauts')
        });
        
        this.routes.set('games/enigma-protocol', {
            element: 'game-container',
            title: 'The Enigma Protocol - DSAG',
            handler: () => this.showGame('enigma-protocol')
        });
        
        this.routes.set('games/sorting-chef', {
            element: 'game-container',
            title: 'The Sorting Chef - DSAG',
            handler: () => this.showGame('sorting-chef')
        });
        
        this.routes.set('learning-path', {
            element: 'learning-path',
            title: 'Learning Path - DSAG',
            handler: () => this.showLearningPath()
        });
        
        this.routes.set('progress', {
            element: 'progress',
            title: 'Progress - DSAG',
            handler: () => this.showProgress()
        });
        
        this.routes.set('leaderboards', {
            element: 'leaderboards',
            title: 'Leaderboards - DSAG',
            handler: () => this.showLeaderboards()
        });
    }
    
    /**
     * Setup browser history listener
     */
    setupHistoryListener() {
        window.addEventListener('popstate', (e) => {
            const route = e.state?.route || this.getRouteFromUrl();
            this.navigate(route, false);
        });
    }
    
    /**
     * Handle initial route on page load
     */
    handleInitialRoute() {
        const route = this.getRouteFromUrl();
        this.navigate(route, false);
    }
    
    /**
     * Navigate to a route
     */
    navigate(route, pushState = true) {
        if (this.currentRoute === route) {
            return;
        }
        
        const routeConfig = this.routes.get(route);
        if (!routeConfig) {
            console.warn(`Route not found: ${route}`);
            this.navigate('home', pushState);
            return;
        }
        
        // Update history
        if (pushState) {
            this.history.push(this.currentRoute);
            window.history.pushState({ route }, '', this.getUrlForRoute(route));
        }
        
        // Update current route
        this.currentRoute = route;
        
        // Update page title
        document.title = routeConfig.title;
        
        // Hide all sections
        this.hideAllSections();
        
        // Show target section
        this.showSection(routeConfig.element);
        
        // Execute route handler
        if (routeConfig.handler) {
            routeConfig.handler();
        }
        
        // Update navigation state
        this.updateNavigationState(route);
        
        // Announce to screen readers
        if (window.dsagApp?.announce) {
            window.dsagApp.announce(`Navigated to ${routeConfig.title}`);
        }
    }
    
    /**
     * Get route from current URL
     */
    getRouteFromUrl() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            return hash;
        }
        
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
            return 'home';
        }
        
        // Handle direct game URLs
        const gameMatch = path.match(/\/games\/(.+)/);
        if (gameMatch) {
            return `games/${gameMatch[1]}`;
        }
        
        return 'home';
    }
    
    /**
     * Get URL for route
     */
    getUrlForRoute(route) {
        if (route === 'home') {
            return '/';
        }
        
        if (route.startsWith('games/')) {
            return `/#${route}`;
        }
        
        return `/#${route}`;
    }
    
    /**
     * Hide all sections
     */
    hideAllSections() {
        const sections = [
            'home', 'games', 'game-container', 'learning-path', 
            'progress', 'leaderboards'
        ];
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }
    
    /**
     * Show specific section
     */
    showSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.classList.remove('hidden');
            
            // Scroll to top if not a game
            if (sectionId !== 'game-container') {
                window.scrollTo(0, 0);
            }
        }
    }
    
    /**
     * Update navigation state
     */
    updateNavigationState(route) {
        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-300');
        });
        
        // Find and activate current route link
        const activeLink = document.querySelector(`[href="#${route}"]`);
        if (activeLink) {
            activeLink.classList.remove('text-gray-300');
            activeLink.classList.add('text-white');
        }
        
        // Handle game-specific navigation
        if (route.startsWith('games/')) {
            const gameId = route.split('/')[1];
            this.updateGameNavigation(gameId);
        }
    }
    
    /**
     * Update game navigation state
     */
    updateGameNavigation(gameId) {
        const gameTitles = {
            'cosmic-rift': 'Cosmic Rift Scanners',
            'recursionauts': 'Recursionauts',
            'enigma-protocol': 'The Enigma Protocol',
            'sorting-chef': 'The Sorting Chef'
        };
        
        const title = gameTitles[gameId];
        if (title) {
            const titleElement = document.getElementById('current-game-title');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
    }
    
    /**
     * Show home section
     */
    showHome() {
        // Add any home-specific logic here
        console.log('Showing home section');
    }
    
    /**
     * Show games section
     */
    showGames() {
        // Add any games-specific logic here
        console.log('Showing games section');
    }
    
    /**
     * Show specific game
     */
    showGame(gameId) {
        if (window.dsagApp?.gameManager) {
            window.dsagApp.gameManager.launchGame(gameId);
        }
    }
    
    /**
     * Show learning path section
     */
    showLearningPath() {
        // TODO: Implement learning path section
        console.log('Showing learning path section');
    }
    
    /**
     * Show progress section
     */
    showProgress() {
        // TODO: Implement progress section
        console.log('Showing progress section');
    }
    
    /**
     * Show leaderboards section
     */
    showLeaderboards() {
        // TODO: Implement leaderboards section
        console.log('Showing leaderboards section');
    }
    
    /**
     * Go back to previous route
     */
    goBack() {
        if (this.history.length > 0) {
            const previousRoute = this.history.pop();
            this.navigate(previousRoute, false);
        } else {
            this.navigate('home', false);
        }
    }
    
    /**
     * Get current route
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    /**
     * Check if route exists
     */
    hasRoute(route) {
        return this.routes.has(route);
    }
    
    /**
     * Add new route
     */
    addRoute(route, config) {
        this.routes.set(route, config);
    }
    
    /**
     * Remove route
     */
    removeRoute(route) {
        this.routes.delete(route);
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}
