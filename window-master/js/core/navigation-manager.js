// Navigation Manager - Handles sector and level selection

class NavigationManager {
    constructor() {
        this.currentSector = null;
        this.currentLevel = null;
        this.initializeNavigation();
    }

    initializeNavigation() {
        // Welcome screen navigation
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.showSectorSelection();
        });

        // Back to welcome
        document.getElementById('back-to-welcome-btn').addEventListener('click', () => {
            this.showWelcome();
        });

        // Back to sectors
        document.getElementById('back-to-sectors-btn').addEventListener('click', () => {
            this.showSectorSelection();
        });

        // Level completion buttons
        document.getElementById('restart-level-btn').addEventListener('click', () => {
            this.restartCurrentLevel();
        });
        document.getElementById('back-to-sector-btn').addEventListener('click', () => {
            this.backToSector();
        });

        // Sector selection
        document.querySelectorAll('.sector-card.available').forEach(card => {
            card.addEventListener('click', (e) => {
                const sectorId = parseInt(e.currentTarget.dataset.sector);
                this.selectSector(sectorId);
            });
        });

        // Level selection
        document.querySelectorAll('.level-card.available').forEach(card => {
            card.addEventListener('click', (e) => {
                const levelId = parseInt(e.currentTarget.dataset.level);
                this.selectLevel(levelId);
            });
        });
    }

    showWelcome() {
        document.getElementById('welcome-screen').classList.remove('hidden');
        document.getElementById('sector-selection-screen').classList.add('hidden');
        document.getElementById('level-selection-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.add('hidden');
    }

    showSectorSelection() {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('sector-selection-screen').classList.remove('hidden');
        document.getElementById('level-selection-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.add('hidden');
    }

    showLevelSelection(sectorId) {
        this.currentSector = sectorId;
        const levelSelectionTitle = document.getElementById('level-selection-title');
        
        // Update title based on sector
        const sectorTitles = {
            1: "Sector 1: Maximum Sum – Fixed Window",
            2: "Sector 2: Minimum Sum – Fixed Window",
            3: "Sector 3: Variable Window – Target Sum",
            4: "Sector 4: String Problems – Distinct Characters",
            5: "Sector 5: Maximum/Minimum in Dynamic Window",
            6: "Sector 6: Multiple Arrays",
            7: "Sector 7: Nested Windows",
            8: "Sector 8: Edge Cases & Pitfalls",
            9: "Sector 9: Large Data / Performance",
            10: "Sector 10: Master Challenges"
        };
        
        levelSelectionTitle.textContent = sectorTitles[sectorId] || `Sector ${sectorId}`;

        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('sector-selection-screen').classList.add('hidden');
        document.getElementById('level-selection-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('hidden');
    }

    selectSector(sectorId) {
        console.log(`Selected sector: ${sectorId}`);
        
        // For now, only sector 1 is available
        if (sectorId === 1) {
            this.showLevelSelection(sectorId);
        } else {
            // Show appropriate message based on sector
            const sectorNames = {
                2: 'Minimum Sum – Fixed Window',
                3: 'Variable Window – Target Sum',
                4: 'String Problems – Distinct Characters',
                5: 'Maximum/Minimum in Dynamic Window',
                6: 'Multiple Arrays',
                7: 'Nested Windows',
                8: 'Edge Cases & Pitfalls',
                9: 'Large Data / Performance',
                10: 'Master Challenges'
            };
            
            const sectorName = sectorNames[sectorId] || `Sector ${sectorId}`;
            alert(`${sectorName} is coming soon! Currently only Sector 1 is available.`);
        }
    }

    selectLevel(levelId) {
        console.log(`Selected level: ${levelId} in sector: ${this.currentSector}`);
        
        // Check if level is available
        if (this.currentSector === 1 && (levelId >= 1 && levelId <= 5)) {
            this.startGame(levelId);
        } else {
            alert('This level is coming soon!');
        }
    }

    startGame(levelId = 1) {
        // Set the game state
        gameState.currentSector = this.currentSector - 1; // Convert to 0-based index
        gameState.currentLevel = levelId - 1; // Convert to 0-based index
        
        // Hide level selection and show game
        document.getElementById('level-selection-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        
        // Initialize the game
        if (typeof initializeGame === 'function') {
            initializeGame();
        }
        
        // Start the game
        if (typeof initializeGameForLevel === 'function') {
            initializeGameForLevel();
        }
    }

    // New navigation methods
    restartCurrentLevel() {
        console.log('Restarting current level');
        // Hide completion modal
        document.getElementById('final-summary-modal').classList.add('hidden');
        
        // Reset game state
        this.resetGameState();
        
        // Start the same level again
        this.startGame(this.currentLevel);
    }


    backToSector() {
        console.log('Going back to sector');
        // Hide completion modal
        document.getElementById('final-summary-modal').classList.add('hidden');
        
        // Show level selection for current sector
        this.showLevelSelection(this.currentSector);
    }

    resetGameState() {
        // Reset game state to initial values
        if (typeof gameState !== 'undefined') {
            gameState.currentStage = 'bruteForce';
            gameState.playerEnergy = 100;
            gameState.playerXP = 0;
            
            // Reset brute force state
            gameState.bruteForce = {
                currentIndex: 0,
                maxSum: -Infinity,
                steps: 0,
                costPerStep: 25,
                mistakes: 0,
                energyUsed: 0,
                log: [],
                isLogCollapsed: true,
            };
            
            // Reset sliding window state
            gameState.slidingWindow = {
                currentIndex: 0,
                currentSum: 0,
                maxSum: -Infinity,
                steps: 0,
                energyCost: 0,
                mistakes: 0,
                log: [],
                isLogCollapsed: true,
            };
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});
