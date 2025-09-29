// Sector 1: Maximum Sum – Fixed Window (Basics)
// This sector contains only Level 1 implementation from the original window-master.html

// Sector 1 Data
const sector1Data = {
    sectorId: 1,
    title: "Maximum Sum – Fixed Window (Basics)",
    concept: "Introduction to the fundamental concept of a fixed-size sliding window to find the maximum sum in a subarray.",
    targetType: "maximum", // For result selection
    levels: [
        {
            levelId: 1,
            problem: "A magical scroll contains exam scores. Find the maximum sum of 3 consecutive scores to unlock the next chamber.",
            array: [5, 1, 3, 2, 6, 7],
            windowSize: 3,
            solution: {
                bruteForceSteps: 4,
                slidingWindowSteps: 3,
                answer: 15
            }
        },
        {
            levelId: 2,
            problem: "A smaller scroll contains fewer scores. Find the maximum sum of 2 consecutive scores to unlock the next chamber.",
            array: [3, 7, 2, 9, 1],
            windowSize: 2,
            solution: {
                bruteForceSteps: 4,
                slidingWindowSteps: 4,
                answer: 11
            }
        },
        {
            levelId: 3,
            problem: "A larger scroll contains more scores. Find the maximum sum of 5 consecutive scores to unlock the next chamber.",
            array: [1, 4, 2, 10, 23, 3, 1, 0, 20],
            windowSize: 5,
            solution: {
                bruteForceSteps: 5,
                slidingWindowSteps: 5,
                answer: 57
            }
        },
        {
            levelId: 4,
            problem: "A scroll contains both positive and negative scores. Find the maximum sum of 3 consecutive scores.",
            array: [2, -1, 7, -3, 1, 4, -2, 3],
            windowSize: 3,
            solution: {
                bruteForceSteps: 6,
                slidingWindowSteps: 6,
                answer: 5
            }
        },
        {
            levelId: 5,
            problem: "A very large scroll contains many scores. Find the maximum sum of 4 consecutive scores to unlock the final chamber.",
            array: [5, 1, 3, 2, 6, 7, 4, 8, 9, 2, 1, 5, 3, 6, 4, 7, 2, 8, 1, 9],
            windowSize: 4,
            solution: {
                bruteForceSteps: 17,
                slidingWindowSteps: 17,
                answer: 30
            }
        }
    ]
};

// Initialize sound manager
let soundManager;

// Register this sector with the game system
if (typeof gameSectors !== 'undefined') {
    gameSectors.push(sector1Data);
}

// This sector uses the existing game logic from game-engine.js
// All functionality is preserved from the original window-master.html
// Only Level 1 is available - other levels will be added later
