/**
 * DSAG Platform - Game Manager
 * Handles game launching, iframe management, and game communication
 */

class GameManager {
    constructor() {
        this.currentGame = null;
        this.gameFrame = null;
        this.gameConfigs = new Map();
        this.isGameLoaded = false;
        
        this.setupGameConfigs();
        this.setupGameFrame();
    }
    
    /**
     * Setup game configurations
     */
    setupGameConfigs() {
        this.gameConfigs.set('cosmic-rift', {
            title: 'Cosmic Rift Scanners',
            file: 'test-game.html',
            description: 'Master the Two-Pointer Technique',
            difficulty: 'Intermediate',
            rating: 5,
            emoji: '🚀',
            color: 'from-blue-500 to-purple-500'
        });
        
        this.gameConfigs.set('recursionauts', {
            title: 'Recursionauts',
            file: 'recursionauts.html',
            description: 'Navigate the Depths of Recursion',
            difficulty: 'Advanced',
            rating: 5,
            emoji: '🔄',
            color: 'from-cyan-500 to-blue-500'
        });
        
        this.gameConfigs.set('enigma-protocol', {
            title: 'The Enigma Protocol',
            file: 'enigma-protocol.html',
            description: 'Decrypt Binary Search Mastery',
            difficulty: 'Intermediate',
            rating: 4,
            emoji: '🎯',
            color: 'from-amber-500 to-orange-500'
        });
        
        this.gameConfigs.set('sorting-chef', {
            title: 'The Sorting Chef',
            file: 'sorting-chef.html',
            description: 'Master All 5 Sorting Algorithms',
            difficulty: 'Beginner to Advanced',
            rating: 5,
            emoji: '👨‍🍳',
            color: 'from-green-500 to-emerald-500'
        });
    }
    
    /**
     * Setup game frame
     */
    setupGameFrame() {
        this.gameFrame = document.getElementById('game-frame');
        if (!this.gameFrame) {
            console.error('Game frame not found');
            return;
        }
        
        // Setup iframe event listeners
        this.gameFrame.addEventListener('load', () => {
            console.log('Iframe load event fired');
            this.onGameLoaded();
        });
        
        this.gameFrame.addEventListener('error', (e) => {
            console.error('Iframe error event fired:', e);
            this.onGameError();
        });
        
        // Setup message listener for game communication
        window.addEventListener('message', (e) => {
            this.handleGameMessage(e);
        });
    }
    
    /**
     * Launch a specific game
     */
    launchGame(gameId) {
        const config = this.gameConfigs.get(gameId);
        if (!config) {
            console.error(`Game config not found: ${gameId}`);
            return;
        }
        
        this.currentGame = gameId;
        this.isGameLoaded = false;
        
        // Show game container
        this.showGameContainer();
        
        // Update game title
        this.updateGameTitle(config.title);
        
        // Load game
        this.loadGame(config.file);
        
        // Update navigation
        if (window.dsagApp?.navigation) {
            window.dsagApp.navigation.navigate(`games/${gameId}`, true);
        }
        
        // Announce to screen readers
        if (window.dsagApp?.announce) {
            window.dsagApp.announce(`Loading ${config.title}`);
        }
    }
    
    /**
     * Load game into iframe
     */
    loadGame(filename) {
        if (!this.gameFrame) {
            console.error('Game frame not available');
            return;
        }
        
        console.log('Loading game:', filename);
        
        // Show loading state
        this.showLoadingState();
        
        // Set iframe source
        this.gameFrame.src = filename;
        console.log('Iframe src set to:', this.gameFrame.src);
        
        // Set loading timeout
        this.loadingTimeout = setTimeout(() => {
            if (!this.isGameLoaded) {
                console.error('Game loading timeout for:', filename);
                this.onGameTimeout();
            }
        }, 10000); // 10 second timeout
    }
    
    /**
     * Show game container
     */
    showGameContainer() {
        const container = document.getElementById('game-container');
        if (container) {
            container.classList.remove('hidden');
            
            // Hide main content
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'none';
            }
        }
    }
    
    /**
     * Hide game container
     */
    hideGameContainer() {
        const container = document.getElementById('game-container');
        if (container) {
            container.classList.add('hidden');
            
            // Show main content
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        }
    }
    
    /**
     * Update game title
     */
    updateGameTitle(title) {
        const titleElement = document.getElementById('current-game-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }
    
    /**
     * Show loading state
     */
    showLoadingState() {
        // Create loading overlay if it doesn't exist
        let loadingOverlay = document.getElementById('game-loading');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'game-loading';
            loadingOverlay.className = 'absolute inset-0 bg-gray-900 flex items-center justify-center z-10';
            loadingOverlay.innerHTML = `
                <div class="text-center">
                    <div class="loading-spinner mx-auto mb-4"></div>
                    <p class="text-gray-400">Loading game...</p>
                </div>
            `;
            
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                gameContainer.appendChild(loadingOverlay);
            }
        }
        
        loadingOverlay.classList.remove('hidden');
    }
    
    /**
     * Hide loading state
     */
    hideLoadingState() {
        const loadingOverlay = document.getElementById('game-loading');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
    
    /**
     * Handle game loaded event
     */
    onGameLoaded() {
        this.isGameLoaded = true;
        this.hideLoadingState();
        
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
        }
        
        // Announce to screen readers
        if (window.dsagApp?.announce) {
            window.dsagApp.announce('Game loaded successfully');
        }
        
        console.log(`Game loaded: ${this.currentGame}`);
    }
    
    /**
     * Handle game error
     */
    onGameError() {
        this.hideLoadingState();
        
        // Show error message
        this.showErrorMessage('Failed to load game. Please try again.');
        
        console.error(`Game failed to load: ${this.currentGame}`);
    }
    
    /**
     * Handle game timeout
     */
    onGameTimeout() {
        this.hideLoadingState();
        
        // Show timeout message
        this.showErrorMessage('Game is taking too long to load. Please check your connection and try again.');
        
        console.error(`Game timeout: ${this.currentGame}`);
    }
    
    /**
     * Show error message
     */
    showErrorMessage(message) {
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'absolute inset-0 bg-gray-900 flex items-center justify-center z-10';
        errorOverlay.innerHTML = `
            <div class="text-center max-w-md mx-auto p-6">
                <div class="text-red-400 text-4xl mb-4">⚠️</div>
                <h3 class="text-xl font-semibold text-white mb-2">Game Error</h3>
                <p class="text-gray-400 mb-4">${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        `;
        
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(errorOverlay);
        }
    }
    
    /**
     * Handle messages from game iframe
     */
    handleGameMessage(event) {
        // Verify origin for security
        if (event.origin !== window.location.origin) {
            return;
        }
        
        const { type, data } = event.data;
        
        switch (type) {
            case 'game-complete':
                this.handleGameComplete(data);
                break;
            case 'level-complete':
                this.handleLevelComplete(data);
                break;
            case 'score-update':
                this.handleScoreUpdate(data);
                break;
            case 'error':
                this.handleGameError(data);
                break;
            default:
                console.log('Unknown game message:', type, data);
        }
    }
    
    /**
     * Handle game completion
     */
    handleGameComplete(data) {
        if (window.dsagApp) {
            window.dsagApp.updateProgress(this.currentGame, data.level, data.score);
        }
        
        // Show completion modal
        this.showCompletionModal(data);
        
        console.log('Game completed:', data);
    }
    
    /**
     * Handle level completion
     */
    handleLevelComplete(data) {
        if (window.dsagApp) {
            window.dsagApp.updateProgress(this.currentGame, data.level, data.score);
        }
        
        console.log('Level completed:', data);
    }
    
    /**
     * Handle score update
     */
    handleScoreUpdate(data) {
        // Update progress display if needed
        console.log('Score updated:', data);
    }
    
    /**
     * Handle game error
     */
    handleGameError(data) {
        console.error('Game error:', data);
        // Could show error notification to user
    }
    
    /**
     * Show completion modal
     */
    showCompletionModal(data) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                <div class="text-center">
                    <div class="text-green-400 text-4xl mb-4">🎉</div>
                    <h3 class="text-xl font-semibold text-white mb-2">Level Complete!</h3>
                    <p class="text-gray-400 mb-4">Score: ${data.score}</p>
                    <div class="flex gap-4 justify-center">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Continue
                        </button>
                        <button onclick="window.dsagApp.closeGame()" 
                                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                            Back to Platform
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    /**
     * Close current game
     */
    closeGame() {
        if (this.currentGame) {
            // Clear iframe source
            if (this.gameFrame) {
                this.gameFrame.src = '';
            }
            
            // Hide game container
            this.hideGameContainer();
            
            // Reset state
            this.currentGame = null;
            this.isGameLoaded = false;
            
            // Navigate back to home
            if (window.dsagApp?.navigation) {
                window.dsagApp.navigation.navigate('home', true);
            }
            
            // Announce to screen readers
            if (window.dsagApp?.announce) {
                window.dsagApp.announce('Returned to platform');
            }
        }
    }
    
    /**
     * Get current game
     */
    getCurrentGame() {
        return this.currentGame;
    }
    
    /**
     * Get game config
     */
    getGameConfig(gameId) {
        return this.gameConfigs.get(gameId);
    }
    
    /**
     * Get all game configs
     */
    getAllGameConfigs() {
        return Array.from(this.gameConfigs.entries()).map(([id, config]) => ({
            id,
            ...config
        }));
    }
    
    /**
     * Check if game is currently loaded
     */
    isGameActive() {
        return this.currentGame !== null && this.isGameLoaded;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameManager;
}
