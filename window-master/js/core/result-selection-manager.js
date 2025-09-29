// Result Selection Manager - Handles interactive result selection

class ResultSelectionManager {
    constructor() {
        this.selectedResult = null;
        this.correctAnswer = null;
        this.resultOptions = [];
        this.sectorType = 'maximum'; // maximum, minimum, target, etc.
        this.initializeResultSelection();
    }

    initializeResultSelection() {
        // Get DOM elements
        this.resultSelectionModal = document.getElementById('result-selection-modal');
        this.resultOptionsContainer = document.getElementById('result-options-container');
        this.confirmResultBtn = document.getElementById('confirm-result-btn');
        this.hintResultBtn = document.getElementById('hint-result-btn');
        this.resultFeedback = document.getElementById('result-feedback');
        this.targetTypeSpan = document.getElementById('target-type');

        // Add event listeners
        this.confirmResultBtn.addEventListener('click', () => this.confirmSelection());
        this.hintResultBtn.addEventListener('click', () => this.showHint());
    }

    showResultSelection(stageState, sectorType = 'maximum') {
        this.sectorType = sectorType;
        this.resultOptions = [];
        this.selectedResult = null;
        this.correctAnswer = null;

        // Update instruction text based on sector type
        const targetTypes = {
            'maximum': 'maximum',
            'minimum': 'minimum', 
            'target': 'target value',
            'longest': 'longest',
            'shortest': 'shortest',
            'average': 'highest average',
            'median': 'highest median',
            'difference': 'smallest difference',
            'count': 'highest count'
        };
        
        this.targetTypeSpan.textContent = targetTypes[sectorType] || 'maximum';

        // Extract all computed sums from the log
        const computedSums = stageState.log
            .filter(entry => entry.isCorrect)
            .map(entry => ({
                value: entry.sum,
                window: entry.window,
                isSliding: entry.isSliding || false,
                change: entry.change || null
            }));

        if (computedSums.length === 0) {
            console.error('No computed sums found');
            return;
        }

        // Determine the correct answer based on sector type
        this.correctAnswer = this.findCorrectAnswer(computedSums, sectorType);
        this.resultOptions = computedSums;

        // Create option elements
        this.createResultOptions();

        // Show the modal
        this.resultSelectionModal.classList.remove('hidden');
    }

    findCorrectAnswer(computedSums, sectorType) {
        switch (sectorType) {
            case 'maximum':
                return Math.max(...computedSums.map(s => s.value));
            case 'minimum':
                return Math.min(...computedSums.map(s => s.value));
            case 'target':
                // For target problems, we'll need to define the target value
                // This would be passed from the level data
                return computedSums[0].value; // Placeholder
            case 'longest':
                return Math.max(...computedSums.map(s => s.window.length));
            case 'shortest':
                return Math.min(...computedSums.map(s => s.window.length));
            case 'average':
                // For nested windows (Sector 7)
                return Math.max(...computedSums.map(s => s.value));
            case 'median':
                // For sliding window median (Sector 10)
                return Math.max(...computedSums.map(s => s.value));
            case 'difference':
                // For minimum difference (Sector 6)
                return Math.min(...computedSums.map(s => s.value));
            case 'count':
                // For counting problems
                return Math.max(...computedSums.map(s => s.value));
            default:
                return Math.max(...computedSums.map(s => s.value));
        }
    }

    createResultOptions() {
        this.resultOptionsContainer.innerHTML = '';

        this.resultOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'result-option';
            optionElement.dataset.index = index;
            optionElement.dataset.value = option.value;

            // Create content based on sector type
            let content = '';
            if (this.sectorType === 'longest' || this.sectorType === 'shortest') {
                content = `
                    <div class="result-value">${option.window.length}</div>
                    <div class="result-window">[${option.window.join(', ')}]</div>
                `;
            } else {
                content = `
                    <div class="result-value">${option.value}</div>
                    <div class="result-window">[${option.window.join(', ')}]</div>
                `;
            }

            optionElement.innerHTML = content;

            // Add click handler
            optionElement.addEventListener('click', () => this.selectOption(optionElement, option));

            this.resultOptionsContainer.appendChild(optionElement);
        });
    }

    selectOption(optionElement, option) {
        // Remove previous selection
        document.querySelectorAll('.result-option').forEach(el => {
            el.classList.remove('selected');
        });

        // Select this option
        optionElement.classList.add('selected');
        this.selectedResult = option.value;

        // Enable confirm button
        this.confirmResultBtn.disabled = false;
        this.confirmResultBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    confirmSelection() {
        if (this.selectedResult === null) return;

        const isCorrect = this.selectedResult === this.correctAnswer;
        
        // Show visual feedback
        document.querySelectorAll('.result-option').forEach(el => {
            const value = parseFloat(el.dataset.value);
            if (value === this.correctAnswer) {
                el.classList.add('correct');
            } else if (value === this.selectedResult && !isCorrect) {
                el.classList.add('incorrect');
            }
        });

        // Show feedback message
        this.resultFeedback.classList.remove('hidden');
        if (isCorrect) {
            this.resultFeedback.textContent = 'Correct! You found the right answer.';
            this.resultFeedback.className = 'mt-4 text-lg text-green-400';
            soundManager.playSound('correctInput');
        } else {
            this.resultFeedback.textContent = `Incorrect. The correct answer is ${this.correctAnswer}.`;
            this.resultFeedback.className = 'mt-4 text-lg text-red-400';
            soundManager.playSound('incorrectInput');
        }

        // Disable all options
        document.querySelectorAll('.result-option').forEach(el => {
            el.classList.add('disabled');
        });

        // Update confirm button
        this.confirmResultBtn.textContent = 'Continue';
        this.confirmResultBtn.onclick = () => this.proceedToCompletion();

        // Disable hint button
        this.hintResultBtn.disabled = true;
        this.hintResultBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    showHint() {
        // Show a hint about the correct answer
        const hintMessages = {
            'maximum': 'Look for the largest number among all the sums you computed.',
            'minimum': 'Look for the smallest number among all the sums you computed.',
            'target': 'Look for the sum that matches the target value.',
            'longest': 'Look for the window with the most elements.',
            'shortest': 'Look for the window with the fewest elements.',
            'average': 'Look for the highest average among all computed values.',
            'median': 'Look for the highest median among all computed values.',
            'difference': 'Look for the smallest difference among all computed values.',
            'count': 'Look for the highest count among all computed values.'
        };

        const hint = hintMessages[this.sectorType] || 'Look carefully at all the computed sums.';
        
        this.resultFeedback.classList.remove('hidden');
        this.resultFeedback.textContent = `💡 Hint: ${hint}`;
        this.resultFeedback.className = 'mt-4 text-lg text-yellow-400';
    }

    proceedToCompletion() {
        // Hide result selection modal
        this.resultSelectionModal.classList.add('hidden');
        
        // Proceed to the normal completion flow
        // This will be called from the game engine
        if (typeof showLevelCompleteModal === 'function') {
            showLevelCompleteModal(gameState.currentStage === 'bruteForce');
        }
    }
}

// Initialize result selection manager
let resultSelectionManager;
