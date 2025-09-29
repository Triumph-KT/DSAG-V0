Perfect — let’s build you a **Sound Design Bible** for **Sector 1 Level 1**.
This will be your blueprint so anyone (developer, sound designer, even a free SFX library user) can know **what sounds to prepare, when to trigger them, and why they matter**.

---

# 🎵 Sound Design Bible — *Window Master (Sector 1, Level 1)*

## 1. Background Ambience

| Stage                | Description                         | Sound Type                         | Duration      | Notes                                                            |
| -------------------- | ----------------------------------- | ---------------------------------- | ------------- | ---------------------------------------------------------------- |
| Brute Force Stage    | Tense, heavy, “draining” atmosphere | Low-pitched drone, slow bass pulse | Loop (20–40s) | Should feel tiring; maybe a slow drum or low hum.                |
| Sliding Window Stage | Light, airy, “flowing” atmosphere   | Gentle synth pads, twinkling arps  | Loop (20–40s) | Feels magical, smooth, and efficient. Contrast with brute force. |

---

## 2. Player Actions

| Action                                             | Sound Type                           | Duration                  | Pitch/Variation                      | Notes                                                   |
| -------------------------------------------------- | ------------------------------------ | ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| Correct Input                                      | Sparkly chime / bell ping            | < 1s                      | Rising pitch on consecutive corrects | Reinforces progress & mastery.                          |
| Incorrect Input                                    | Soft “buzz” or dull pop              | < 1s                      | Constant                             | Not harsh; enough to signal mistake but doesn’t punish. |
| Energy Bar Drops Below 30%                         | Heartbeat bass “thump-thump”         | Loop (3–5s, fades in/out) | Slight reverb                        | Builds urgency subtly.                                  |
| XP Gain (+25 XP popup)                             | Coin clink or short ascending melody | < 1.5s                    | Higher pitch for larger XP rewards   | Sync with XP popup animation.                           |
| Banish Element (outgoing number in sliding window) | Low “whoosh” or puff sound           | < 0.8s                    | Slight downward pitch                | Reinforces the idea of removing.                        |
| Summon Element (incoming number in sliding window) | Magical “ding” or bright whoosh      | < 0.8s                    | Slight upward pitch                  | Pairs with banish for contrast.                         |

---

## 3. Stage & Level Events

| Event                               | Sound Type                              | Duration | Notes                                         |
| ----------------------------------- | --------------------------------------- | -------- | --------------------------------------------- |
| Window Highlight (new focus)        | Soft shimmer                            | < 0.5s   | Plays when the highlight shifts in the array. |
| Brute Force Completion              | Short, tired bell toll                  | ~2s      | Symbolizes “finished, but exhausting.”        |
| Sliding Window Completion           | Bright, sparkling harp gliss or fanfare | ~2s      | Clear feeling of victory & efficiency.        |
| Level Complete (before modal opens) | Small triumphant fanfare                | 3–4s     | Works as a transition cue.                    |
| Final Summary Screen                | Gentle “reveal” flourish                | 2s       | Light magical sound, avoids feeling heavy.    |

---

## 5. General Guidance

* **Volume:** Keep action sounds louder than ambient sounds (so feedback is clear).
* **Consistency:** Same instrument family (bells, chimes, light synths) across all “good” sounds → creates signature identity.
* **Contrast:** Brute force = *low, heavy, tiring*. Sliding window = *bright, light, magical*. Learners will **hear the efficiency difference**.
* **Memory Hook:** The “banish & summon” pair should be so distinct that players *instantly recognize sliding window steps just from sound*.

---

👉 This is enough to guide asset sourcing or commissioning. You can pull free assets from sites like **Freesound.org**, **Mixkit**, or **Kenney.nl**, then layer them with slight pitch variations to get variety.

Would you like me to go one step further and **map this table directly into code triggers** (e.g., `playSound("banish")` at `checkSlidingWindowSum`), so your dev side is plug-and-play ready?
