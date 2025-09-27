/**
 * DSAG Platform - Progress Tracker
 * Handles user progress, achievements, and statistics
 */

class ProgressTracker {
    constructor() {
        this.progress = this.loadProgress();
        this.achievements = this.loadAchievements();
        this.statistics = this.loadStatistics();
        
        this.setupAchievementSystem();
    }
    
    /**
     * Load progress from localStorage
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem('dsag-progress');
            return saved ? JSON.parse(saved) : {
                games: {},
                totalScore: 0,
                totalTime: 0,
                lastPlayed: null,
                streak: 0,
                level: 1
            };
        } catch (error) {
            console.error('Error loading progress:', error);
            return {
                games: {},
                totalScore: 0,
                totalTime: 0,
                lastPlayed: null,
                streak: 0,
                level: 1
            };
        }
    }
    
    /**
     * Load achievements from localStorage
     */
    loadAchievements() {
        try {
            const saved = localStorage.getItem('dsag-achievements');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading achievements:', error);
            return [];
        }
    }
    
    /**
     * Load statistics from localStorage
     */
    loadStatistics() {
        try {
            const saved = localStorage.getItem('dsag-statistics');
            return saved ? JSON.parse(saved) : {
                gamesPlayed: 0,
                levelsCompleted: 0,
                perfectScores: 0,
                averageScore: 0,
                bestStreak: 0,
                totalPlayTime: 0
            };
        } catch (error) {
            console.error('Error loading statistics:', error);
            return {
                gamesPlayed: 0,
                levelsCompleted: 0,
                perfectScores: 0,
                averageScore: 0,
                bestStreak: 0,
                totalPlayTime: 0
            };
        }
    }
    
    /**
     * Save progress to localStorage
     */
    saveProgress() {
        try {
            localStorage.setItem('dsag-progress', JSON.stringify(this.progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    /**
     * Save achievements to localStorage
     */
    saveAchievements() {
        try {
            localStorage.setItem('dsag-achievements', JSON.stringify(this.achievements));
        } catch (error) {
            console.error('Error saving achievements:', error);
        }
    }
    
    /**
     * Save statistics to localStorage
     */
    saveStatistics() {
        try {
            localStorage.setItem('dsag-statistics', JSON.stringify(this.statistics));
        } catch (error) {
            console.error('Error saving statistics:', error);
        }
    }
    
    /**
     * Setup achievement system
     */
    setupAchievementSystem() {
        this.achievementDefinitions = [
            {
                id: 'first-game',
                name: 'First Steps',
                description: 'Complete your first game',
                icon: '🎮',
                condition: (progress) => Object.keys(progress.games).length >= 1,
                points: 10
            },
            {
                id: 'all-games',
                name: 'Algorithm Master',
                description: 'Complete all 4 games',
                icon: '🏆',
                condition: (progress) => Object.keys(progress.games).length >= 4,
                points: 50
            },
            {
                id: 'perfect-score',
                name: 'Perfectionist',
                description: 'Get a perfect score in any game',
                icon: '💯',
                condition: (progress) => this.statistics.perfectScores >= 1,
                points: 25
            },
            {
                id: 'streak-7',
                name: 'Consistent Learner',
                description: 'Maintain a 7-day learning streak',
                icon: '🔥',
                condition: (progress) => progress.streak >= 7,
                points: 30
            },
            {
                id: 'speed-demon',
                name: 'Speed Demon',
                description: 'Complete a game in under 5 minutes',
                icon: '⚡',
                condition: (progress) => this.hasFastCompletion(progress),
                points: 20
            },
            {
                id: 'dedicated',
                name: 'Dedicated',
                description: 'Play for 10 hours total',
                icon: '⏰',
                condition: (progress) => progress.totalTime >= 36000000, // 10 hours in ms
                points: 40
            }
        ];
    }
    
    /**
     * Update game progress
     */
    updateGameProgress(gameId, level, score, timeSpent) {
        if (!this.progress.games[gameId]) {
            this.progress.games[gameId] = {
                levels: [],
                totalScore: 0,
                bestScore: 0,
                totalTime: 0,
                lastPlayed: Date.now(),
                completed: false
            };
        }
        
        const gameProgress = this.progress.games[gameId];
        
        // Update level completion
        if (!gameProgress.levels.includes(level)) {
            gameProgress.levels.push(level);
        }
        
        // Update scores
        gameProgress.totalScore += score;
        if (score > gameProgress.bestScore) {
            gameProgress.bestScore = score;
        }
        
        // Update time
        gameProgress.totalTime += timeSpent;
        gameProgress.lastPlayed = Date.now();
        
        // Update global progress
        this.progress.totalScore += score;
        this.progress.totalTime += timeSpent;
        this.progress.lastPlayed = Date.now();
        
        // Update statistics
        this.updateStatistics(gameId, score, timeSpent);
        
        // Check for achievements
        this.checkAchievements();
        
        // Save all data
        this.saveProgress();
        this.saveStatistics();
        this.saveAchievements();
        
        return gameProgress;
    }
    
    /**
     * Update statistics
     */
    updateStatistics(gameId, score, timeSpent) {
        this.statistics.gamesPlayed++;
        this.statistics.levelsCompleted++;
        this.statistics.totalPlayTime += timeSpent;
        
        // Check for perfect score
        if (score >= 100) {
            this.statistics.perfectScores++;
        }
        
        // Update average score
        const totalGames = Object.keys(this.progress.games).length;
        this.statistics.averageScore = this.progress.totalScore / totalGames;
        
        // Update best streak
        if (this.progress.streak > this.statistics.bestStreak) {
            this.statistics.bestStreak = this.progress.streak;
        }
    }
    
    /**
     * Check for new achievements
     */
    checkAchievements() {
        this.achievementDefinitions.forEach(achievement => {
            if (!this.achievements.includes(achievement.id) && 
                achievement.condition(this.progress)) {
                this.unlockAchievement(achievement);
            }
        });
    }
    
    /**
     * Unlock achievement
     */
    unlockAchievement(achievement) {
        this.achievements.push(achievement.id);
        
        // Show achievement notification
        this.showAchievementNotification(achievement);
        
        // Announce to screen readers
        if (window.dsagApp?.announce) {
            window.dsagApp.announce(`Achievement unlocked: ${achievement.name}`);
        }
        
        console.log('Achievement unlocked:', achievement.name);
    }
    
    /**
     * Show achievement notification
     */
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="text-2xl">${achievement.icon}</div>
                <div>
                    <div class="font-semibold">Achievement Unlocked!</div>
                    <div class="text-sm">${achievement.name}</div>
                    <div class="text-xs opacity-90">${achievement.description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    /**
     * Get game progress
     */
    getGameProgress(gameId) {
        return this.progress.games[gameId] || null;
    }
    
    /**
     * Get overall progress
     */
    getOverallProgress() {
        const totalGames = 4; // Total number of games
        const completedGames = Object.keys(this.progress.games).length;
        const totalLevels = Object.values(this.progress.games)
            .reduce((total, game) => total + game.levels.length, 0);
        
        return {
            gamesCompleted: completedGames,
            totalGames,
            completionPercentage: (completedGames / totalGames) * 100,
            totalLevels,
            totalScore: this.progress.totalScore,
            totalTime: this.progress.totalTime,
            streak: this.progress.streak,
            level: this.progress.level
        };
    }
    
    /**
     * Get achievements
     */
    getAchievements() {
        return this.achievements.map(achievementId => 
            this.achievementDefinitions.find(a => a.id === achievementId)
        ).filter(Boolean);
    }
    
    /**
     * Get statistics
     */
    getStatistics() {
        return { ...this.statistics };
    }
    
    /**
     * Check if user has fast completion
     */
    hasFastCompletion(progress) {
        return Object.values(progress.games).some(game => 
            game.totalTime < 300000 // 5 minutes in ms
        );
    }
    
    /**
     * Update learning streak
     */
    updateStreak() {
        const now = Date.now();
        const lastPlayed = this.progress.lastPlayed;
        
        if (lastPlayed) {
            const daysSinceLastPlay = Math.floor((now - lastPlayed) / (1000 * 60 * 60 * 24));
            
            if (daysSinceLastPlay === 1) {
                // Consecutive day
                this.progress.streak++;
            } else if (daysSinceLastPlay > 1) {
                // Streak broken
                this.progress.streak = 1;
            }
            // If daysSinceLastPlay === 0, same day, don't change streak
        } else {
            // First time playing
            this.progress.streak = 1;
        }
        
        this.saveProgress();
    }
    
    /**
     * Reset all progress
     */
    resetProgress() {
        this.progress = {
            games: {},
            totalScore: 0,
            totalTime: 0,
            lastPlayed: null,
            streak: 0,
            level: 1
        };
        
        this.achievements = [];
        
        this.statistics = {
            gamesPlayed: 0,
            levelsCompleted: 0,
            perfectScores: 0,
            averageScore: 0,
            bestStreak: 0,
            totalPlayTime: 0
        };
        
        this.saveProgress();
        this.saveAchievements();
        this.saveStatistics();
        
        console.log('Progress reset');
    }
    
    /**
     * Export progress data
     */
    exportProgress() {
        return {
            progress: this.progress,
            achievements: this.achievements,
            statistics: this.statistics,
            exportDate: new Date().toISOString()
        };
    }
    
    /**
     * Import progress data
     */
    importProgress(data) {
        try {
            if (data.progress) this.progress = data.progress;
            if (data.achievements) this.achievements = data.achievements;
            if (data.statistics) this.statistics = data.statistics;
            
            this.saveProgress();
            this.saveAchievements();
            this.saveStatistics();
            
            console.log('Progress imported successfully');
            return true;
        } catch (error) {
            console.error('Error importing progress:', error);
            return false;
        }
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
