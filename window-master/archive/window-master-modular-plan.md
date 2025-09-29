# Window Master: Modular Architecture Plan

## 🎯 Project Overview
Transform the single-file `window-master.html` into a scalable modular architecture while preserving ALL existing code, styles, UI/UX, and logic.

## 📁 Target Architecture

```
window-master/
├── index.html                    # Main hub - sector selection
├── js/
│   ├── core/
│   │   ├── game-engine.js        # Core game logic (from window-master.html)
│   │   ├── sound-manager.js      # Sound system (from window-master.html)
│   │   ├── ui-manager.js         # UI components (from window-master.html)
│   │   └── progress-tracker.js   # Progress tracking (from window-master.html)
│   └── sectors/
│       ├── sector-1.js           # Maximum Sum - Fixed Window (Basics)
│       ├── sector-2.js           # Minimum Sum - Fixed Window
│       ├── sector-3.js           # Variable Window - Target Sum
│       ├── sector-4.js           # String Problems - Distinct Characters
│       ├── sector-5.js           # Maximum/Minimum in Dynamic Window
│       ├── sector-6.js           # Multiple Arrays
│       ├── sector-7.js           # Nested Windows
│       ├── sector-8.js           # Edge Cases & Pitfalls
│       ├── sector-9.js           # Large Data / Performance
│       └── sector-10.js          # Master Challenges
├── css/
│   └── styles.css                # All styles from window-master.html
└── assets/
    └── favicon.svg               # From window-master.html
```

## 🔄 Migration Strategy

### Phase 1: Extract Core Components
1. **Extract CSS** → `css/styles.css`
2. **Extract SoundManager class** → `js/core/sound-manager.js`
3. **Extract game engine logic** → `js/core/game-engine.js`
4. **Extract UI management** → `js/core/ui-manager.js`
5. **Extract progress tracking** → `js/core/progress-tracker.js`

### Phase 2: Create Sector Structure
1. **Create main hub** → `index.html` (sector selection)
2. **Extract Sector 1** → `js/sectors/sector-1.js` (current implementation)
3. **Add 4 more levels** to Sector 1
4. **Test modular structure** with Sector 1

### Phase 3: Scale to All Sectors
1. **Implement remaining 9 sectors** using Sector 1 as template
2. **Add sector-specific** problem types and logic
3. **Maintain consistent** UI/UX across all sectors

## 📋 Code Extraction Plan

### From window-master.html:

**CSS Styles (→ css/styles.css):**
- All `<style>` content (lines 9-132)
- Preserve all classes, animations, and responsive design

**SoundManager Class (→ js/core/sound-manager.js):**
- Complete SoundManager class (lines 401-1162)
- All sound creation methods
- Ambient background system
- Error handling and initialization

**Game Engine (→ js/core/game-engine.js):**
- Game state management
- Level loading logic
- Brute force and sliding window algorithms
- UI update functions
- Modal management

**UI Manager (→ js/core/ui-manager.js):**
- DOM element references
- Event handlers
- Animation functions
- Modal show/hide logic

**Progress Tracker (→ js/core/progress-tracker.js):**
- XP calculation system
- Energy management
- Achievement tracking
- State persistence

## 🎮 Sector Implementation Template

Each sector will follow this structure:

```javascript
// js/sectors/sector-X.js
class SectorX {
    constructor() {
        this.sectorId = X;
        this.title = "Sector Title";
        this.levels = [
            // 5 levels per sector
        ];
    }
    
    // Sector-specific logic
    // Reuse all existing game mechanics
    // Maintain same UI/UX patterns
}
```

## 🔧 Implementation Principles

1. **Preserve Everything**: No code, styles, or logic should be lost
2. **Reuse Existing**: All new levels use existing game mechanics
3. **Maintain Consistency**: Same UI/UX across all sectors
4. **Keep Simplicity**: Each sector file is self-contained
5. **Enable Scaling**: Easy to add new sectors and levels

## 📊 File Size Estimates

- **Current**: 1,872 lines, 88KB
- **Target per sector**: ~200-300 lines
- **Core engine**: ~500-600 lines
- **Total modular**: ~3,000-4,000 lines across all files
- **Maintainable**: Each file < 500 lines

## 🚀 Benefits

1. **Scalability**: Easy to add 50+ levels
2. **Maintainability**: Fix bugs in specific sectors
3. **Performance**: Load only current sector
4. **Development**: Work on sectors independently
5. **Preservation**: All existing work is preserved and reused

## 📝 Next Steps

1. Create directory structure
2. Extract core components from window-master.html
3. Create main hub (index.html)
4. Implement Sector 1 with all 5 levels
5. Test modular structure
6. Implement remaining sectors

---

**Source of Truth**: `window-master.html` (1,872 lines)
**Target**: Modular architecture preserving 100% of existing functionality
