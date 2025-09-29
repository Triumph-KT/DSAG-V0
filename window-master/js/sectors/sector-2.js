// Sector 2: Minimum Sum – Fixed Window
// Concept: Same as Sector 1, but focuses on minimum sums instead of maximum
// Learning Outcome: Learners see sliding window works for both "max" and "min" problems

const sector2Data = {
    sectorId: 2,
    title: "Minimum Sum – Fixed Window",
    concept: "Apply the same sliding window technique to find minimum sums instead of maximum sums.",
    targetType: "minimum", // For result selection - find minimum instead of maximum
    levels: [
        {
            levelId: 1,
            problem: "A magical scroll contains exam scores. Find the minimum sum of 2 consecutive scores to unlock the next chamber.",
            array: [5, 1, 3, 2, 6, 7],
            windowSize: 2,
            solution: {
                bruteForceSteps: 5,
                slidingWindowSteps: 5,
                answer: 4 // [5,1]=6, [1,3]=4, [3,2]=5, [2,6]=8, [6,7]=13. Minimum: 4
            }
        },
        {
            levelId: 2,
            problem: "A smaller scroll contains fewer scores. Find the minimum sum of 3 consecutive scores to unlock the next chamber.",
            array: [3, 7, 2, 9, 1],
            windowSize: 3,
            solution: {
                bruteForceSteps: 3,
                slidingWindowSteps: 3,
                answer: 12 // [3,7,2]=12, [7,2,9]=18, [2,9,1]=12. Minimum: 12
            }
        },
        {
            levelId: 3,
            problem: "A scroll contains both positive and negative scores. Find the minimum sum of 3 consecutive scores.",
            array: [2, -1, 7, -3, 1, 4, -2, 3],
            windowSize: 3,
            solution: {
                bruteForceSteps: 6,
                slidingWindowSteps: 6,
                answer: 2 // [2,-1,7]=8, [-1,7,-3]=3, [7,-3,1]=5, [-3,1,4]=2, [1,4,-2]=3, [4,-2,3]=5. Minimum: 2
            }
        },
        {
            levelId: 4,
            problem: "A scroll contains identical scores. Find the minimum sum of 2 consecutive scores.",
            array: [5, 5, 5, 5, 5],
            windowSize: 2,
            solution: {
                bruteForceSteps: 4,
                slidingWindowSteps: 4,
                answer: 10 // All sums are [5, 5] = 10
            }
        },
        {
            levelId: 5,
            problem: "A very large scroll contains many scores. Find the minimum sum of 4 consecutive scores to unlock the final chamber.",
            array: [5, 1, 3, 2, 6, 7, 4, 8, 9, 2, 1, 5, 3, 6, 4, 7, 2, 8, 1, 9],
            windowSize: 4,
            solution: {
                bruteForceSteps: 17,
                slidingWindowSteps: 17,
                answer: 11 // [5,1,3,2]=11, [1,3,2,6]=12, [3,2,6,7]=18, etc. Minimum: 11
            }
        }
    ]
};

// Calculate the correct answers
function calculateSector2Answers() {
    sector2Data.levels.forEach(level => {
        const array = level.array;
        const windowSize = level.windowSize;
        
        // Calculate all possible sums
        const sums = [];
        for (let i = 0; i <= array.length - windowSize; i++) {
            const window = array.slice(i, i + windowSize);
            const sum = window.reduce((a, b) => a + b, 0);
            sums.push(sum);
        }
        
        // Find minimum sum
        const minSum = Math.min(...sums);
        level.solution.answer = minSum;
        
        console.log(`Level ${level.levelId}: Array [${array.join(', ')}], Window size ${windowSize}`);
        console.log(`Sums: [${sums.join(', ')}]`);
        console.log(`Minimum sum: ${minSum}`);
        console.log('---');
    });
}

// Calculate answers
calculateSector2Answers();

// Add to global sectors array
if (typeof gameSectors !== 'undefined') {
    gameSectors.push(sector2Data);
    console.log('Sector 2 data added to gameSectors:', gameSectors.length, 'sectors total');
    console.log('Sector 2 data:', sector2Data);
} else {
    console.error('gameSectors array not found. Make sure progress-tracker.js is loaded first.');
}
