// --- Game Data ---
// Note: Sector data is now loaded from individual sector files
// This will be populated dynamically when sectors are loaded
let gameSectors = [];

const theoryScrolls = {
    s1l1_brute: `
        <h4 class="font-cinzel text-xl text-red-400">Insight: Brute Force Magic</h4>
        <p>You just experienced <strong class="text-red-300">O(n * k)</strong> complexity. In the world of algorithms, this represents a significant expenditure of magical energy.</p>
        <p>Your spell involved two nested actions:</p>
        <ul>
            <li>An outer loop to select the starting point of each window (n steps).</li>
            <li>An inner process to sum the 'k' elements within that window.</li>
        </ul>
        <p>For large scrolls (arrays), this method becomes exhausting and impractical. It works, but at a great cost to your energy reserves.</p>
    `,
    s1l1_sliding: `
        <h4 class="font-cinzel text-xl text-green-400">Mastery: Sliding Window Magic</h4>
        <p>You've now mastered <strong class="text-green-300">O(n)</strong> complexity, a mark of a true sorcerer. This is a far more efficient and powerful form of magic.</p>
        <p>Instead of recalculating everything, you simply:</p>
        <ul>
            <li>Calculated the sum of the first window once.</li>
            <li>For each subsequent step, you <strong class="text-red-400">banished</strong> the outgoing element and <strong class="text-green-400">summoned</strong> the incoming one.</li>
        </ul>
        <p>This single pass through the array maintains a perfect balance of energy, allowing you to solve vast problems with minimal effort. This principle of reusing work is key to advanced algorithm mastery.</p>
    `
};

// --- Game State ---
let gameState = {
    currentSector: 0,
    currentLevel: 0,
    currentStage: 'bruteForce', // 'bruteForce' or 'slidingWindow'
    playerXP: 0,
    playerEnergy: 100,
    bruteForce: {
        currentIndex: 0,
        maxSum: -Infinity,
        steps: 0,
        costPerStep: 25,
        mistakes: 0,
        energyUsed: 0, // Track energy used in brute force stage
        log: [],
        isLogCollapsed: true,
    },
    slidingWindow: {
        currentIndex: 0,
        currentSum: 0,
        maxSum: -Infinity,
        steps: 0,
        energyCost: 0,
        mistakes: 0,
        log: [],
        isLogCollapsed: true,
    }
};
