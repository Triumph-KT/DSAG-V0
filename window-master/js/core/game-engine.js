// --- Game Logic ---

function initializeGame() {
    // Initialize sound manager
    soundManager = new SoundManager();
    
    // Add event listeners only if elements exist
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }
    if (nextStageBtn) {
        nextStageBtn.addEventListener('click', advanceStage);
    }
    if (toggleLogBtn) {
        toggleLogBtn.addEventListener('click', toggleLogVisibility);
    }
    
    if (closeTheoryBtn) {
        closeTheoryBtn.addEventListener('click', () => {
            theoryScrollModal.classList.add('hidden');
            // Check if we are on the brute force completion modal and unlock the next stage button
            if (gameState.currentStage === 'bruteForce' && !levelCompleteModal.classList.contains('hidden')) {
                const nextBtn = document.getElementById('next-stage-btn');
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    nextBtn.textContent = "Proceed to Advanced Magic";
                }
                
                const hint = document.getElementById('unlock-hint');
                if (hint) hint.remove();
            }
        });
    }

    // Note: playAgainBtn is no longer used - replaced with new navigation buttons
    // The old playAgainBtn functionality is now handled by the NavigationManager
}

function toggleLogVisibility() {
    const content = document.getElementById('sums-log-content');
    const icon = toggleLogBtn.querySelector('svg');
    content.classList.toggle('hidden');
    if (content.classList.contains('hidden')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

function startGame() {
    console.log('startGame called');
    try {
        soundManager.playSound('levelComplete'); // Welcome to game sound
        console.log('Sound played');
    } catch (e) {
        console.warn('Sound error:', e);
    }
    
    try {
        soundManager.startBackgroundMusic(); // Start background music
        console.log('Background music started');
    } catch (e) {
        console.warn('Background music error:', e);
    }
    
    try {
        soundManager.startAmbientBackground(); // Start continuous ambient background
        console.log('Ambient background started');
    } catch (e) {
        console.warn('Ambient background error:', e);
    }
    
    console.log('Adding fade-out class');
    if (welcomeScreen) {
        welcomeScreen.classList.add('fade-out');
    }
    
    setTimeout(() => {
        console.log('Timeout executed - transitioning to game screen');
        if (welcomeScreen) {
            welcomeScreen.classList.add('hidden');
        }
        if (gameScreen) {
            gameScreen.classList.remove('hidden');
        }
        gameScreen.classList.add('fade-in');
        console.log('About to call loadLevel');
        loadLevel();
    }, 500);
}

// New function for modular navigation - just initializes game without screen transitions
function initializeGameForLevel() {
    console.log('initializeGameForLevel called');
    try {
        soundManager.playSound('levelComplete'); // Welcome to game sound
        console.log('Sound played');
    } catch (e) {
        console.warn('Sound error:', e);
    }
    
    try {
        soundManager.startBackgroundMusic(); // Start background music
        console.log('Background music started');
    } catch (e) {
        console.warn('Background music error:', e);
    }
    
    try {
        soundManager.startAmbientBackground(); // Start continuous ambient background
        console.log('Ambient background started');
    } catch (e) {
        console.warn('Ambient background error:', e);
    }
    
    console.log('About to call loadLevel');
    loadLevel();
}

function loadLevel() {
    console.log('loadLevel called');
    console.log('Current sector index:', gameState.currentSector);
    console.log('Current level index:', gameState.currentLevel);
    console.log('Current stage:', gameState.currentStage);
    console.log('Available sectors:', gameSectors.length);
    try {
        const sector = gameSectors[gameState.currentSector];
        const level = sector.levels[gameState.currentLevel];
        console.log('Sector and level loaded:', sector.title, level.problem);

        sectorTitle.textContent = sector.title;
        problemDescription.textContent = level.problem;
    
        // Calculate dynamic energy costs for the level
        const totalBruteForceSteps = level.array.length - level.windowSize + 1;
        gameState.bruteForce.costPerStep = 100 / totalBruteForceSteps;
        console.log('Energy costs calculated');

        resetGameStateForStage();
        updateUI();
        console.log('Game state reset and UI updated');
        
        if (gameState.currentStage === 'bruteForce') {
            levelTitle.textContent = `Level ${sector.sectorId}.${level.levelId}.1: Brute Force Magic`;
            console.log('Starting brute force stage');
            startBruteForceStage();
        } else {
            levelTitle.textContent = `Level ${sector.sectorId}.${level.levelId}.2: Sliding Window Magic`;
            console.log('Starting sliding window stage');
            startSlidingWindowStage();
        }
    } catch (e) {
        console.error('Error in loadLevel:', e);
    }
}

function resetGameStateForStage() {
    gameState.playerEnergy = 100;
    if (gameState.currentStage === 'bruteForce') {
        gameState.bruteForce.currentIndex = 0;
        gameState.bruteForce.maxSum = -Infinity;
        gameState.bruteForce.steps = 0;
        gameState.bruteForce.mistakes = 0;
        gameState.bruteForce.log = [];
        gameState.bruteForce.isLogCollapsed = true;
    } else {
        gameState.slidingWindow.currentIndex = 0;
        gameState.slidingWindow.currentSum = 0;
        gameState.slidingWindow.maxSum = -Infinity;
        gameState.slidingWindow.steps = 0;
        gameState.slidingWindow.energyCost = 0;
        gameState.slidingWindow.mistakes = 0;
        gameState.slidingWindow.log = [];
        gameState.slidingWindow.isLogCollapsed = true;
    }
    renderSumLog(); // Clear the log visually
}

function updateUI() {
    energyBar.style.width = `${gameState.playerEnergy}%`;
    xpBar.style.width = `${gameState.playerXP}%`;
    
    if (gameState.playerEnergy < 30) {
        energyBar.className = 'bg-red-500 h-full rounded-full progress-bar-fill';
        soundManager.checkEnergyWarning();
    } else if (gameState.playerEnergy < 60) {
        energyBar.className = 'bg-yellow-500 h-full rounded-full progress-bar-fill';
    } else {
        energyBar.className = 'bg-green-500 h-full rounded-full progress-bar-fill';
    }
}

function renderArray() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    arrayContainer.innerHTML = '';
    level.array.forEach((num, index) => {
        const el = document.createElement('div');
        el.textContent = num;
        el.className = 'array-element text-2xl md:text-3xl font-bold border-2 border-violet-500/50 bg-violet-900/40 w-16 h-16 rounded-lg flex items-center justify-center';
        el.dataset.index = index;
        arrayContainer.appendChild(el);
    });
}

function highlightWindow(startIndex, windowSize) {
    soundManager.playSound('windowHighlight');
    document.querySelectorAll('.array-element').forEach(el => {
        el.classList.remove('highlight');
    });

    for (let i = 0; i < windowSize; i++) {
        const el = document.querySelector(`.array-element[data-index='${startIndex + i}']`);
        if (el) {
            el.classList.add('highlight');
        }
    }
}

// --- Brute Force Stage Logic ---
function startBruteForceStage() {
    renderArray();
    highlightWindow(0, gameSectors[gameState.currentSector].levels[gameState.currentLevel].windowSize);
    promptForBruteForceInput();
}

function promptForBruteForceInput() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const { currentIndex } = gameState.bruteForce;
    const window = level.array.slice(currentIndex, currentIndex + level.windowSize);

    interactionArea.innerHTML = `
        <div class="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
            <p class="text-xl font-semibold text-red-200 mb-3 text-center">Brute Force Magic</p>
            <p class="text-lg text-center text-gray-300 mb-2">Calculate the sum of the highlighted window:</p>
            <p class="text-2xl font-bold text-yellow-300 text-center">[${window.join(', ')}]</p>
        </div>
        
        <div class="flex items-center space-x-3">
            <input id="sum-input" type="number" class="bg-gray-900/50 border border-violet-500 rounded-lg p-2 text-center text-xl w-40" placeholder="Enter sum" autofocus>
            <button id="calculate-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 glow-effect" title="Calculate the sum for me">
                Calculate
            </button>
            <button id="submit-sum-btn" class="btn-primary text-white font-bold py-2 px-6 rounded-lg">Cast Spell</button>
        </div>
        <p id="feedback-message" class="mt-2 h-6"></p>
    `;
    
    document.getElementById('sum-input').focus();
    document.getElementById('submit-sum-btn').addEventListener('click', checkBruteForceSum);
    document.getElementById('calculate-btn').addEventListener('click', () => calculateSum(window));
    document.getElementById('sum-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checkBruteForceSum();
    });
}

function checkBruteForceSum() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const { currentIndex } = gameState.bruteForce;
    const input = document.getElementById('sum-input');
    const feedback = document.getElementById('feedback-message');
    const userSum = parseInt(input.value);

    const window = level.array.slice(currentIndex, currentIndex + level.windowSize);
    const correctSum = window.reduce((a, b) => a + b, 0);

    // Disable button to prevent double submission
    document.getElementById('submit-sum-btn').disabled = true;

    // Log the attempt regardless of correctness
    gameState.bruteForce.log.push({
        window: window,
        sum: userSum || '?', // Handle empty input
        isCorrect: userSum === correctSum
    });
    renderSumLog();

    if (userSum === correctSum) {
        soundManager.playSound('correctInput');
        feedback.textContent = 'Correct!';
        feedback.className = 'mt-2 h-6 text-green-400';
        gameState.bruteForce.maxSum = Math.max(gameState.bruteForce.maxSum, userSum);
        gameState.bruteForce.steps++;
        gameState.playerEnergy -= gameState.bruteForce.costPerStep;
        gameState.bruteForce.energyUsed += gameState.bruteForce.costPerStep;
        updateUI();
        
        gameState.bruteForce.currentIndex++;
        if (gameState.bruteForce.currentIndex <= level.array.length - level.windowSize) {
             setTimeout(() => {
                highlightWindow(gameState.bruteForce.currentIndex, level.windowSize);
                promptForBruteForceInput();
            }, 1000);
        } else {
            setTimeout(() => showResultSelection(), 1000);
        }
    } else {
        soundManager.playSound('incorrectInput');
        feedback.textContent = 'Incorrect calculation. Try again.';
        feedback.className = 'mt-2 h-6 text-red-400';
        gameState.bruteForce.mistakes++;
        input.value = '';
        input.focus();
        document.getElementById('submit-sum-btn').disabled = false;
    }
}

// --- Sliding Window Stage Logic ---
function startSlidingWindowStage() {
    renderArray();
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const { windowSize } = level;

    const initialSum = level.array.slice(0, windowSize).reduce((a, b) => a + b, 0);
    gameState.slidingWindow.currentSum = initialSum;
    gameState.slidingWindow.maxSum = initialSum;
    gameState.slidingWindow.currentIndex = 0;

    highlightWindow(0, windowSize);
    promptForSlidingWindowInput();
}

function promptForSlidingWindowInput() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const { currentIndex, currentSum } = gameState.slidingWindow;

    if (currentIndex === 0) {
        interactionArea.innerHTML = `
            <div class="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
                <p class="text-xl font-semibold text-green-200 mb-3 text-center">Initial Window Calculation</p>
                <p class="text-lg text-center text-gray-300 mb-2">Calculate the sum of the highlighted window:</p>
                <p class="text-2xl font-bold text-yellow-300 text-center">[${level.array.slice(0, level.windowSize).join(', ')}]</p>
            </div>
            
            <div class="flex items-center space-x-3">
                <input id="sum-input" type="number" class="bg-gray-900/50 border border-violet-500 rounded-lg p-2 text-center text-xl w-40" placeholder="Enter sum" autofocus>
                <button id="calculate-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 glow-effect" title="Calculate the sum for me">
                    Calculate
                </button>
                <button id="submit-sum-btn" class="btn-primary text-white font-bold py-2 px-6 rounded-lg">Cast Spell</button>
            </div>
            <p id="feedback-message" class="mt-2 h-6"></p>
        `;
        document.getElementById('submit-sum-btn').addEventListener('click', checkInitialSlidingSum);
        document.getElementById('calculate-btn').addEventListener('click', () => calculateSum(level.array.slice(0, level.windowSize)));
        document.getElementById('sum-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') checkInitialSlidingSum();
        });
    } else {
        const outgoingElement = level.array[currentIndex - 1];
        const incomingElement = level.array[currentIndex + level.windowSize - 1];

        // Animate the banish/summon visual
        const outgoingEl = document.querySelector(`.array-element[data-index='${currentIndex - 1}']`);
        if(outgoingEl) {
            outgoingEl.classList.add('banish');
            soundManager.playSound('banish');
        }

        setTimeout(() => {
            const incomingEl = document.querySelector(`.array-element[data-index='${currentIndex + level.windowSize - 1}']`);
            if(incomingEl) {
                incomingEl.classList.add('summon');
                soundManager.playSound('summon');
            }
            highlightWindow(currentIndex, level.windowSize);
        }, 750);
        
        setTimeout(() => {
            if(outgoingEl) outgoingEl.classList.remove('banish');
            const incomingEl = document.querySelector(`.array-element[data-index='${currentIndex + level.windowSize - 1}']`);
            if(incomingEl) incomingEl.classList.remove('summon');
        }, 1500);


        interactionArea.innerHTML = `
            <div class="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
                <p class="text-xl font-semibold text-blue-200 mb-2">Previous Sum:</p>
                <p class="text-3xl font-bold text-yellow-300 text-center">${currentSum}</p>
            </div>
            
            <div class="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-6">
                <p class="text-xl font-semibold text-gray-200 mb-3 text-center">Sliding Window Magic</p>
                <div class="flex items-center justify-center space-x-4 text-lg">
                    <span class="text-red-400 font-bold">Banish ${outgoingElement}</span>
                    <span class="text-gray-400">+</span>
                    <span class="text-green-400 font-bold">Summon ${incomingElement}</span>
                </div>
                <p class="text-lg text-center mt-3 text-gray-300">What is the new sum?</p>
            </div>
            
            <div class="flex items-center space-x-3">
                <input id="sum-input" type="number" class="bg-gray-900/50 border border-violet-500 rounded-lg p-2 text-center text-xl w-40" placeholder="New sum" autofocus>
                <button id="calculate-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 glow-effect" title="Calculate the new sum for me">
                    Calculate
                </button>
                <button id="submit-sum-btn" class="btn-primary text-white font-bold py-2 px-6 rounded-lg">Adjust Spell</button>
            </div>
            <p id="feedback-message" class="mt-2 h-6"></p>
        `;
        document.getElementById('submit-sum-btn').addEventListener('click', checkSlidingWindowSum);
        document.getElementById('calculate-btn').addEventListener('click', () => calculateSlidingSum(currentSum, outgoingElement, incomingElement));
        document.getElementById('sum-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') checkSlidingWindowSum();
        });
    }
    document.getElementById('sum-input').focus();
}

function checkInitialSlidingSum() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const input = document.getElementById('sum-input');
    const feedback = document.getElementById('feedback-message');
    const userSum = parseInt(input.value);
    const window = level.array.slice(0, level.windowSize);
    
    // Disable button
    document.getElementById('submit-sum-btn').disabled = true;

     // Log the attempt
    gameState.slidingWindow.log.push({
        window: window,
        sum: userSum || '?',
        isCorrect: userSum === gameState.slidingWindow.currentSum
    });
    renderSumLog();
    
    if (userSum === gameState.slidingWindow.currentSum) {
        feedback.textContent = 'Correct! Initial sum set.';
        feedback.className = 'mt-2 h-6 text-green-400';
        gameState.slidingWindow.steps++;
        
        const initialCost = 10; // Flat cost for the first calculation
        gameState.playerEnergy -= initialCost;
        gameState.slidingWindow.energyCost += initialCost;
        
        updateUI();

        gameState.slidingWindow.currentIndex++;
        setTimeout(() => {
            promptForSlidingWindowInput();
        }, 1500);
    } else {
        soundManager.playSound('incorrectInput');
        feedback.textContent = 'Incorrect initial sum. Try again.';
        feedback.className = 'mt-2 h-6 text-red-400';
        gameState.slidingWindow.mistakes++;
        input.value = '';
        input.focus();
        document.getElementById('submit-sum-btn').disabled = false;
    }
}

function checkSlidingWindowSum() {
    const level = gameSectors[gameState.currentSector].levels[gameState.currentLevel];
    const { currentIndex, currentSum } = gameState.slidingWindow;
    const input = document.getElementById('sum-input');
    const feedback = document.getElementById('feedback-message');
    const userSum = parseInt(input.value);

    // Disable button
    document.getElementById('submit-sum-btn').disabled = true;

    const outgoingElement = level.array[currentIndex - 1];
    const incomingElement = level.array[currentIndex + level.windowSize - 1];
    const correctSum = currentSum - outgoingElement + incomingElement;

    // Log the attempt
    gameState.slidingWindow.log.push({
        window: level.array.slice(currentIndex, currentIndex + level.windowSize),
        sum: userSum || '?',
        isCorrect: userSum === correctSum,
        isSliding: true,
        change: { out: outgoingElement, in: incomingElement }
    });
    renderSumLog();
    
    if (userSum === correctSum) {
        soundManager.playSound('correctInput');
        feedback.textContent = 'Perfect adjustment!';
        feedback.className = 'mt-2 h-6 text-green-400';
        
        gameState.slidingWindow.currentSum = correctSum;
        gameState.slidingWindow.maxSum = Math.max(gameState.slidingWindow.maxSum, correctSum);
        gameState.slidingWindow.steps++;

        const slideCost = 2; // Minimal cost for an efficient adjustment
        gameState.playerEnergy -= slideCost;
        gameState.slidingWindow.energyCost += slideCost;

        updateUI();

        gameState.slidingWindow.currentIndex++;
        if (gameState.slidingWindow.currentIndex <= level.array.length - level.windowSize) {
             setTimeout(() => {
                promptForSlidingWindowInput();
            }, 1500);
        } else {
             setTimeout(() => showResultSelection(), 1000);
        }
    } else {
        soundManager.playSound('incorrectInput');
        feedback.textContent = 'That calculation is not quite right.';
        feedback.className = 'mt-2 h-6 text-red-400';
        gameState.slidingWindow.mistakes++;
        input.value = '';
        input.focus();
        document.getElementById('submit-sum-btn').disabled = false;
    }
}

// --- Calculate Functions ---
function calculateSum(window) {
    const sum = window.reduce((a, b) => a + b, 0);
    document.getElementById('sum-input').value = sum;
    soundManager.playSound('correctInput');
    
    // Add visual feedback
    const input = document.getElementById('sum-input');
    input.classList.add('bg-green-900/30', 'border-green-500');
    setTimeout(() => {
        input.classList.remove('bg-green-900/30', 'border-green-500');
    }, 1000);
}

function calculateSlidingSum(currentSum, outgoingElement, incomingElement) {
    const newSum = currentSum - outgoingElement + incomingElement;
    document.getElementById('sum-input').value = newSum;
    soundManager.playSound('correctInput');
    
    // Add visual feedback
    const input = document.getElementById('sum-input');
    input.classList.add('bg-green-900/30', 'border-green-500');
    setTimeout(() => {
        input.classList.remove('bg-green-900/30', 'border-green-500');
    }, 1000);
}

// --- Modal and Stage Progression ---
function showResultSelection() {
    // Get sector type from the current sector data
    const currentSectorData = gameSectors[gameState.currentSector];
    const sectorType = currentSectorData?.targetType || 'maximum';
    const stageState = gameState[gameState.currentStage];
    
    // Initialize result selection manager if not already done
    if (typeof resultSelectionManager === 'undefined') {
        resultSelectionManager = new ResultSelectionManager();
    }
    
    // Show result selection
    resultSelectionManager.showResultSelection(stageState, sectorType);
}

function showLevelCompleteModal(isBruteForce) {
    if (isBruteForce) {
        soundManager.playSound('bruteForceComplete');
    } else {
        soundManager.playSound('slidingWindowComplete');
    }
    
    const title = document.getElementById('level-complete-title');
    const summary = document.getElementById('level-complete-summary');
    const statsSteps = document.getElementById('stats-steps');
    const statsEnergy = document.getElementById('stats-energy');
    const statsMistakes = document.getElementById('stats-mistakes');

    // Clean up any previous hint text
    const oldHint = document.getElementById('unlock-hint');
    if (oldHint) oldHint.remove();

    if (isBruteForce) {
        title.textContent = "Brute Force Complete";
        const currentSectorData = gameSectors[gameState.currentSector];
        const sectorType = currentSectorData?.targetType || 'maximum';
        const targetText = sectorType === 'minimum' ? 'minimum' : 'maximum';
        summary.textContent = `You found the ${targetText} sum: ${gameState.bruteForce.maxSum}. Now, witness true efficiency.`;
        statsSteps.textContent = gameState.bruteForce.steps;
        statsEnergy.textContent = `${gameState.bruteForce.energyUsed}`;
        statsEnergy.className = 'text-2xl font-bold text-red-400';
        statsMistakes.textContent = gameState.bruteForce.mistakes;
        
        nextStageBtn.textContent = "Learn Advanced Magic";
        nextStageBtn.disabled = true;
        nextStageBtn.classList.add('opacity-50', 'cursor-not-allowed');
        
        // Add a hint to guide the player
        const hint = document.createElement('p');
        hint.id = 'unlock-hint';
        hint.className = 'text-xs text-gray-400 mt-2';
        hint.textContent = 'View the Theory Scroll to unlock the next stage.';
        nextStageBtn.parentElement.insertBefore(hint, viewTheoryBtn.nextSibling);


        viewTheoryBtn.onclick = () => showTheoryScroll('s1l1_brute');
    } else {
        const sectorNumber = gameState.currentSector + 1;
        title.textContent = `Sector ${sectorNumber} Complete!`;
        const currentSectorData = gameSectors[gameState.currentSector];
        const sectorType = currentSectorData?.targetType || 'maximum';
        const targetText = sectorType === 'minimum' ? 'minimum' : 'maximum';
        summary.textContent = `Excellent work! You found the ${targetText} sum: ${gameState.slidingWindow.maxSum} with elegant efficiency.`;
        statsSteps.textContent = gameState.slidingWindow.steps;
        
        statsEnergy.textContent = `${gameState.slidingWindow.energyCost}`;
        statsEnergy.className = 'text-2xl font-bold text-green-400';
        statsMistakes.textContent = gameState.slidingWindow.mistakes;

        nextStageBtn.textContent = "Continue Training";
        
        // Ensure button is enabled for this stage
        nextStageBtn.disabled = false;
        nextStageBtn.classList.remove('opacity-50', 'cursor-not-allowed');

        viewTheoryBtn.onclick = () => showTheoryScroll('s1l1_sliding');
        
        // Award XP and show visual feedback
        const xpToAward = calculateXP('slidingWindow', gameState.slidingWindow.mistakes, true);
        if(gameState.playerXP < xpToAward) { // Prevent awarding XP twice on replay
            gameState.playerXP += xpToAward;
            showXpGain(xpToAward);
        }
        updateUI();
    }

    // Finalize log by highlighting the max sum
    const stageState = isBruteForce ? gameState.bruteForce : gameState.slidingWindow;
    const maxSum = stageState.maxSum;
    stageState.log.forEach(entry => {
        if (entry.sum === maxSum && entry.isCorrect) {
            entry.isMax = true;
        }
    });
    renderSumLog();

    levelCompleteModal.classList.remove('hidden');
}

function showTheoryScroll(scrollId) {
    theoryContent.innerHTML = theoryScrolls[scrollId];
    theoryScrollModal.classList.remove('hidden');
}

function renderSumLog(fullLog = false) {
    const stageState = gameState[gameState.currentStage];
    if (!stageState) return;

    const LOG_COLLAPSE_THRESHOLD = 7;
    const LOG_VISIBLE_COUNT = 5;
    let logEntries = stageState.log;
    let showCollapseButton = false;

    if ((stageState === gameState.bruteForce || stageState === gameState.slidingWindow) && stageState.log.length > LOG_COLLAPSE_THRESHOLD && !fullLog) {
        logEntries = stageState.log.slice(stageState.log.length - LOG_VISIBLE_COUNT);
        showCollapseButton = true;
    }

    let html = logEntries.map((entry, index) => {
        const originalIndex = stageState.log.indexOf(entry);
        const isLatestEntry = originalIndex === stageState.log.length - 1;
        let classes = "p-2 rounded-md transition-all duration-300 ";
        let sumText = `Sum: ${entry.sum}`;
        let changeText = '';
        let id = isLatestEntry ? 'id="latest-log-entry"' : '';


        if (!entry.isCorrect) {
            classes += "bg-red-900/50 text-red-300";
            sumText = `<span class="line-through">Sum: ${entry.sum}</span> (Incorrect)`;
        } else {
            sumText = `Sum: <strong class="font-bold">${entry.sum}</strong>`;
            if (entry.isMax) {
                classes += "bg-yellow-800/50 ring-2 ring-yellow-400 text-yellow-200";
                sumText += " (Max)";
            } else if (isLatestEntry) {
                classes += "bg-violet-800/60";
            } else {
                 classes += "bg-gray-800/50";
            }
        }
        
        const windowText = `Window [${entry.window.join(', ')}]`;
        
        if (entry.isSliding && entry.change) {
            changeText = ` <span class="text-xs text-gray-400">(banish ${entry.change.out}, summon ${entry.change.in})</span>`;
        }

        return `<div ${id} class="${classes}">${windowText} → ${sumText}${changeText}</div>`;
    }).join('');

    if (showCollapseButton) {
        const hiddenCount = stageState.log.length - LOG_VISIBLE_COUNT;
        const buttonHtml = `<button id="show-more-logs-btn" class="w-full text-center p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md text-violet-300 text-xs">Show ${hiddenCount} older entries...</button>`;
        html = buttonHtml + html;
    }

    sumsLogContent.innerHTML = html;

    if (showCollapseButton) {
        document.getElementById('show-more-logs-btn').addEventListener('click', () => renderSumLog(true));
    }

    // Highlight the latest entry
    const latestEntryEl = document.getElementById('latest-log-entry');
    if (latestEntryEl) {
        latestEntryEl.classList.add('log-entry-highlight');
    }

    // Auto-scroll to the bottom
    sumsLogContent.scrollTop = sumsLogContent.scrollHeight;
}

function showFinalSummary() {
    soundManager.playSound('finalSummary');
    // Populate the modal with data from gameState
    document.getElementById('summary-bf-steps').textContent = gameState.bruteForce.log.filter(e => e.isCorrect).length;
    document.getElementById('summary-bf-energy').textContent = gameState.bruteForce.energyUsed;
    document.getElementById('summary-bf-mistakes').textContent = gameState.bruteForce.mistakes;

    document.getElementById('summary-sw-steps').textContent = gameState.slidingWindow.log.filter(e => e.isCorrect).length;
    document.getElementById('summary-sw-energy').textContent = gameState.slidingWindow.energyCost;
    document.getElementById('summary-sw-mistakes').textContent = gameState.slidingWindow.mistakes;


    finalSummaryModal.classList.remove('hidden');
}

function showXpGain(amount) {
    soundManager.playSound('xpGain');
    const popup = document.getElementById('xp-popup');
    popup.textContent = `+${amount} XP`;
    
    // Reset animation
    popup.classList.remove('hidden', 'xp-popup-animate');
    
    // Trigger reflow to restart animation
    void popup.offsetWidth; 
    
    popup.classList.add('xp-popup-animate');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 1500);
}

function calculateXP(stage, mistakes, isCorrect) {
    let baseXP = 25;
    
    // Difficulty scaling based on stage
    if (stage === 'slidingWindow') {
        baseXP = 35; // Sliding window is more advanced
    }
    
    // Bonus for no mistakes
    if (mistakes === 0) {
        baseXP += 15; // Perfect performance bonus
    } else if (mistakes <= 2) {
        baseXP += 5; // Good performance bonus
    }
    
    // Penalty for many mistakes
    if (mistakes > 5) {
        baseXP = Math.max(10, baseXP - (mistakes - 5) * 3);
    }
    
    return baseXP;
}

function advanceStage() {
    levelCompleteModal.classList.add('hidden');

    if (gameState.currentStage === 'bruteForce') {
        gameState.currentStage = 'slidingWindow';
        soundManager.startBackgroundMusic(); // Switch to sliding window ambient
        loadLevel();
    } else {
        showFinalSummary();
    }
}

// --- Initializer ---
// Note: Game initialization is now handled by NavigationManager
// The game will be initialized when a level is selected
