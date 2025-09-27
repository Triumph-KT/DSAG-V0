/**
 * DSAG Platform - Main Application
 * Production-ready, modular, maintainable code
 */

class DSAGApp {
    constructor() {
        this.currentGame = null;
        this.userProgress = this.loadUserProgress();
        this.isInitialized = false;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupGameManager();
        this.setupProgressTracking();
        this.setupAccessibility();
        
        this.isInitialized = true;
        console.log('DSAG Platform initialized successfully');
    }
    
    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Hero section buttons
        document.getElementById('hero-start-btn')?.addEventListener('click', () => {
            this.startLearning();
        });
        
        document.getElementById('hero-demo-btn')?.addEventListener('click', () => {
            this.showDemo();
        });
        
        document.getElementById('hero-games-btn')?.addEventListener('click', () => {
            this.scrollToSection('games');
        });
        
        // Game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const gameId = e.currentTarget.dataset.game;
                this.launchGame(gameId);
            });
        });
        
        // Mobile menu
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Back to platform button
        document.getElementById('back-to-platform')?.addEventListener('click', () => {
            this.closeGame();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Window events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        window.addEventListener('beforeunload', () => {
            this.saveUserProgress();
        });
    }
    
    /**
     * Setup navigation system
     */
    setupNavigation() {
        this.navigation = new NavigationManager();
    }
    
    /**
     * Setup game management
     */
    setupGameManager() {
        this.gameManager = new GameManager();
    }
    
    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        this.progressTracker = new ProgressTracker();
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels
        this.addAriaLabels();
        
        // Setup focus management
        this.setupFocusManagement();
        
        // Setup screen reader announcements
        this.setupScreenReaderSupport();
    }
    
    /**
     * Start learning flow
     */
    startLearning() {
        // Show onboarding or redirect to first game
        const firstGame = this.getRecommendedGame();
        this.launchGame(firstGame);
    }
    
    /**
     * Show demo video/modal
     */
    showDemo() {
        // TODO: Implement demo modal
        console.log('Demo requested');
    }
    
    /**
     * Scroll to specific section
     */
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    /**
     * Launch a specific game
     */
    launchGame(gameId) {
        if (!this.gameManager) {
            console.error('Game manager not initialized');
            return;
        }
        
        this.currentGame = gameId;
        this.gameManager.launchGame(gameId);
    }
    
    /**
     * Close current game
     */
    closeGame() {
        if (this.gameManager) {
            this.gameManager.closeGame();
        }
        this.currentGame = null;
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        // ESC key closes game
        if (e.key === 'Escape' && this.currentGame) {
            this.closeGame();
        }
        
        // Enter key activates focused elements
        if (e.key === 'Enter' && e.target.classList.contains('game-card')) {
            e.target.click();
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }
    
    /**
     * Get recommended game for user
     */
    getRecommendedGame() {
        // Simple recommendation logic
        const games = ['cosmic-rift', 'sorting-chef', 'enigma-protocol', 'recursionauts'];
        const completedGames = Object.keys(this.userProgress.completedGames || {});
        
        // Return first uncompleted game
        for (const game of games) {
            if (!completedGames.includes(game)) {
                return game;
            }
        }
        
        // If all completed, return first game
        return games[0];
    }
    
    /**
     * Load user progress from localStorage
     */
    loadUserProgress() {
        try {
            const saved = localStorage.getItem('dsag-user-progress');
            return saved ? JSON.parse(saved) : {
                completedGames: {},
                achievements: [],
                totalScore: 0,
                lastPlayed: null
            };
        } catch (error) {
            console.error('Error loading user progress:', error);
            return {
                completedGames: {},
                achievements: [],
                totalScore: 0,
                lastPlayed: null
            };
        }
    }
    
    /**
     * Save user progress to localStorage
     */
    saveUserProgress() {
        try {
            localStorage.setItem('dsag-user-progress', JSON.stringify(this.userProgress));
        } catch (error) {
            console.error('Error saving user progress:', error);
        }
    }
    
    /**
     * Add ARIA labels for accessibility
     */
    addAriaLabels() {
        // Game cards
        document.querySelectorAll('.game-card').forEach(card => {
            const gameId = card.dataset.game;
            const gameName = card.querySelector('h3')?.textContent || 'Game';
            card.setAttribute('aria-label', `Play ${gameName}`);
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
        });
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', link.textContent.trim());
            }
        });
    }
    
    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    /**
     * Setup screen reader support
     */
    setupScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-announcements';
        document.body.appendChild(liveRegion);
    }
    
    /**
     * Announce to screen readers
     */
    announce(message) {
        const liveRegion = document.getElementById('live-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
    
    /**
     * Update user progress
     */
    updateProgress(gameId, level, score) {
        if (!this.userProgress.completedGames[gameId]) {
            this.userProgress.completedGames[gameId] = {
                levels: [],
                totalScore: 0,
                lastPlayed: Date.now()
            };
        }
        
        const gameProgress = this.userProgress.completedGames[gameId];
        
        if (!gameProgress.levels.includes(level)) {
            gameProgress.levels.push(level);
        }
        
        gameProgress.totalScore += score;
        gameProgress.lastPlayed = Date.now();
        this.userProgress.totalScore += score;
        this.userProgress.lastPlayed = Date.now();
        
        this.saveUserProgress();
    }
    
    /**
     * Get user statistics
     */
    getStats() {
        const completedGames = Object.keys(this.userProgress.completedGames).length;
        const totalLevels = Object.values(this.userProgress.completedGames)
            .reduce((total, game) => total + game.levels.length, 0);
        
        return {
            completedGames,
            totalLevels,
            totalScore: this.userProgress.totalScore,
            achievements: this.userProgress.achievements.length
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dsagApp = new DSAGApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSAGApp;
}
