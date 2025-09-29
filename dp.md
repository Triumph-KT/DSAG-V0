# 🎮 Echoes of the Stairwell
## A Dynamic Programming Adventure

### Complete Game Design Document

---

## I. Core Theme & Narrative

You are trapped in the **Stairwell of Echoes**, an infinite structure where every step reverberates with the weight of past decisions. The stairwell is alive, testing your memory, punishing inefficiency, and rewarding structure. Your goal: climb to the top by mastering the stairwell's laws of recurrence.

**Narrator**: The **Archivist**, a spectral guide whispering cryptic but educational hints about "base cases" and "reuse the echoes."

### Atmosphere & Aesthetic
- **Visual Style**: Surreal gothic-neon stairwell with endless vertical void
- **Ghost Echoes**: Semi-transparent "ghost echoes" of past selves flickering across stairs
- **Architecture**: The stairwell is not merely architecture—it is an algorithmic prison

---

## II. Educational Mapping (DP Concepts → Game Mechanics)

| DP Concept | Game Mechanic |
|------------|---------------|
| **State Definition** | Each stair = a state i |
| **Recurrence Relation** | Energy flows from prior stairs: ways[i] = ways[i-1] + ways[i-2] (+ variants) |
| **Base Cases** | Stair 0 & Stair 1 glow as constants |
| **Overlapping Subproblems** | Ghost echoes swarm when brute-forcing |
| **Memoization** | Rune-marked stairs store results, removing ghosts and saving mana |
| **Tabulation** | DP table overlays, filling bottom-up with glowing values |
| **Optimization Insight** | Player experiences exponential clutter → caching relief → efficient tabulation |

---

## III. Core Gameplay Mechanics

### Movement & State System
- **Each stair = state i**
- **Player Movement**: Choose to jump +1 or +2 steps
- **Visualization**: Upon reaching stair i, the game shows how many distinct echoes (ways) led there

### Recurrence Visualization
- **Energy Flow**: Stair i glows with energy from stair i-1 and stair i-2
- **Animated Arrows**: Recurrence arrows show flows of energy merging
- **Physical Embodiment**: Recurrence relation is visually embodied in the environment

### Ghost Echo System
- **Brute-Force Penalty**: Every brute-force attempt spawns ghost versions of the player
- **Visual Clutter**: Ghosts repeat failed paths endlessly, cluttering the stairwell
- **Inefficiency Visualization**: The more overlap, the heavier the visual "noise"
- **Tangible Consequence**: Inefficiency is felt, not just explained

### Energy & Penalty System
- **Mana Drain**: Each recomputation drains mana/health
- **Failure State**: Too many wasted attempts = collapse before the top
- **Memoization Relief**: Caching a result halts ghosts at that stair, turning them into guardians of knowledge who prevent repetition

### Dynamic Programming Modes

#### Memoization Mode (Mid-game upgrade)
- Players "record" stairs with glowing runes
- Revisiting cached stairs consumes no energy
- Eliminates ghost clutter at marked locations

#### Tabulation Mode (High-level unlock)
- Bottom-up DP table UI overlays the stairwell
- Table fills from stair 0 upwards
- Allows near-instant climbing of huge staircases

---

## IV. Gameplay Loop

1. **Start** at stair 0 (glowing "1")
2. **Jump** step-by-step, spawning echoes with each recursive call
3. **Experience** exponential blow-up visually and mechanically
4. **Unlock** memoization → manage resources smarter
5. **Unlock** tabulation → speedrun through massive stairwells
6. **Survive** time pressure, energy drain, and ghost clutter to reach the final stair

---

## V. Complete Level Progression System

### Sector 1: Awakening of Recurrence (Levels 1–3)

#### Level 1 – Base Cases (3 stairs)
- **Objective**: Reach stair 3
- **Mechanics Introduced**:
  - Player learns movement (jump 1 or 2)
  - Stair 0 glows "1" (1 way)
  - Stair 1 glows "1"
- **Educational Payoff**: Base cases are given constants
- **Narrative Cue**: *"Every journey begins with anchors. Without them, there is nothing to climb."*

#### Level 2 – First Recurrence (5 stairs)
- **Objective**: Reach stair 5
- **Mechanics Introduced**:
  - Ghost echoes spawn when player revisits subproblems
  - Player notices stair 2 can be reached two ways: (0→1→2, 0→2)
- **Educational Payoff**: Player feels the recurrence: ways[i] = ways[i-1] + ways[i-2]
- **Narrative Cue**: *"Each step is not alone—it carries the weight of echoes below."*

#### Level 3 – Overlapping Subproblems (10 stairs)
- **Objective**: Climb 10 stairs
- **Challenge**: Brute force produces a screen full of ghost echoes
- **Mechanics Introduced**:
  - Fatigue penalty for repeated recomputation
  - Player must discover caching (memoization rune unlocks here)
- **Educational Payoff**: Overlapping subproblems visualized as clutter. Memoization eliminates clutter
- **Narrative Cue**: *"Do not repeat what you already know. Mark the stairs, and remember."*

### Sector 2: Memory of the Stairwell (Levels 4–6)

#### Level 4 – Memoization Tutorial (12 stairs)
- **Mechanics Introduced**:
  - Players can place a memory rune on a stair
  - Any future ghost reaching that stair vanishes instantly—computation reused
- **Educational Payoff**: Memoization saves energy and avoids ghost clutter
- **UI Addition**: Cached stairs glow bright blue, showing stored subresults

#### Level 5 – Energy Management (15 stairs)
- **Challenge**: Limited mana pool
- **Mechanics**:
  - Each recomputation drains mana
  - Memoization is no longer optional; it's required to survive
- **Educational Payoff**: Shows that caching isn't just convenience—it's essential for scaling

#### Level 6 – Branching Variants (20 stairs)
- **Challenge**: Stairwell allows jumps of 1, 2, or 3
- **Mechanics**: Recurrence expands to ways[i] = ways[i-1] + ways[i-2] + ways[i-3]
- **Educational Payoff**: Generalization of recurrence
- **Narrative Cue**: *"The stairwell shifts. Its law is not fixed. Adapt your memory."*

### Sector 3: Insight of Tabulation (Levels 7–10)

#### Level 7 – Tabulation Unlock (25 stairs)
- **Mechanics Introduced**:
  - Player unlocks DP Insight Mode (overlay table)
  - Table fills bottom-up as they climb
- **Educational Payoff**: Tabulation = linear, efficient, no ghost clutter
- **Narrative Cue**: *"Why climb blindly when the stairwell reveals its own truth below you?"*

#### Level 8 – Comparative Speedrun (30 stairs)
- **Challenge**: Timer added (stairwell collapsing)
- **Mechanics**:
  - Brute force = impossible under time
  - Memoization works but risky under pressure
  - Tabulation = only safe option
- **Educational Payoff**: Time efficiency forces tabulation

#### Level 9 – Obstructed Stairwell (40 stairs)
- **Challenge**: Some stairs are broken (can't land on them)
- **Mechanics**:
  - Recurrence must skip invalid states
  - Visualization: broken stairs are "dark void" nodes
- **Educational Payoff**: Real-world DP variations (adding conditions)
- **Narrative Cue**: *"Not all states can be reached. The void consumes some paths."*

#### Level 10 – The Boss Stairwell (50 stairs)
- **Challenge**:
  - Timer + mana drain + ghost clutter pressure
  - Brute force = death by fatigue
  - Memoization = too slow
  - Only tabulation clears before collapse
- **Educational Payoff**: Full DP mastery
- **Climactic Payoff**:
  - Entire DP table glows as numbers fill in instantly
  - Recurrence arrows animate across table
  - Narrator proclaims: *"You have mastered the echoes. This is Dynamic Programming."*

---

## VI. Progression Summary

- **Levels 1–3**: Base cases → recurrence → inefficiency pain
- **Levels 4–6**: Memoization as survival tool → generalizing recurrence  
- **Levels 7–10**: Tabulation unlock → optimization under pressure → final mastery

---

## VII. Feedback & Pedagogical Payoff

### Visual Learning Reinforcement
- **Ghosts = Overlapping Subproblems**: Player sees exponential clutter firsthand
- **Fatigue = Computational Cost**: Repetition literally hurts
- **Memoization = Upgrade Path**: "Rune-marked" stairs eliminate ghost clutter
- **Tabulation = Speedrun Efficiency**: Filling the DP table = climbing instantly

### Victory Screen Experience
- Shows full DP table with recurrence arrows
- Narrator whispers: *"You have learned to master time itself through memory and structure. This is Dynamic Programming."*

---

## VIII. Design Inspirations

### Borrowed Elements
- **From Recursionauts**: Immersive visualization of algorithm execution (stack traces → ghost echoes)
- **From Cosmic Rift Scanners**: Scoring/analysis breakdown (efficiency score, optimal vs actual)
- **From Both**: Lore-driven framing, neon-tech mysticism aesthetic, tangible consequences for inefficiency

### ⚡ Unique Strength
This game transforms DP from abstract recurrence relations into lived experience: ghost clutter = overlapping subproblems, rune caching = memoization, DP table = tabulation.

---

## IX. Technical Implementation Notes

### Core Systems Required
- **State Management**: Track player position, cached results, ghost spawning
- **Visualization Engine**: Render recurrence arrows, energy flows, DP table overlay
- **Performance Monitoring**: Track computational efficiency for scoring
- **Progressive Unlocks**: Memoization and tabulation mode systems

### UI/UX Considerations
- **Visual Clarity**: Distinguish between active computation, cached results, and tabulated solutions
- **Feedback Loops**: Immediate visual and mechanical consequences for inefficient choices
- **Learning Curve**: Gentle introduction of concepts through gameplay necessity rather than exposition

---

*"To escape the Stairwell of Echoes, you must learn not just to climb, but to remember, to structure, and to see patterns in the chaos. Only then can you transform inefficiency into insight, and algorithm into art."*