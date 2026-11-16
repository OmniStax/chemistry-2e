# Plan: 11.1 The Dissolution Process (m68778)

Written 2026-09-28 before the build and left for review, as `ch11/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

Three objectives, four numbered figures (11.2 to 11.5), one table (11.1), no worked example and no Check Your Learning, two Link to Learning notes (dropped), eight end-of-section exercises.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `solutions` | Solutions and their defining traits (Figure 11.2, Table 11.1) | introduces `properties-of-solutions` |
| `formation` | The formation of solutions (the book's header) | uses `properties-of-solutions` |
| `ideal` | Ideal solutions and the dispersal of matter (Figure 11.3) | introduces `ideal-solution` |
| `steps` | Dissolution as three steps (Figure 11.4) | introduces `dissolution-energy-steps`, `predict-solution-formation` |
| `heat` | Solutions that release or absorb heat (Figure 11.5) | introduces `endothermic-and-exothermic-dissolution` |

## Figures

- fig-dichromate · Figure 11.2 · properties-of-solutions · kept photograph; the text and two exercises point at it · photo
- sim-he-ar · Figure 11.3 · ideal-solution · flow by animation: the book's before-and-after pair leaves the mixing to the imagination and says nothing of how it ends; here the atoms wander through the open valve and a trace beneath counts how many of each gas have reached the other bulb, so the reader sees the count climb to half and stay there with nothing pulling it · arrows: none in the book; the atoms themselves move · moving: one fixed run on the transport, 30 s (the valve shut for 2 s, then open), worked out once from a seeded generator so every frame is a function of the time and the reader can scrub back to the closed valve; reduced motion opens on the mixed end · no controls beyond the transport (a valve the reader closes would have to un-mix the gases to start again, which no valve does) · headline "Valve closed: helium fills the left bulb and argon the right." then "No atom attracts another. Each wanders through the open valve on its own." then, once both counts stay within 5 of half, "Each gas has spread through both bulbs, twice the volume it began in, with no change in energy." · graph below: atoms in the other bulb (0 to 30) against time, a dashed level at 15 · 2D (book rule, particle pictures: every atom in view, turning shows nothing). No readout: the section has no equation, and the counts stand beside the bulbs.
  works: parts: two glass bulbs joined by a short tube, a valve (tapered plug with a handle on top) in the middle of the tube · flow: atoms travel in straight lines, turn at the glass, and pass the valve only once it is open · must hold: (1) no atom outside the glass; (2) none crosses before the valve opens; (3) helium moves √(39.95/4.00) = 3.2 times faster than argon; (4) argon drawn larger than helium, as the book draws it; (5) the counts beside the bulbs add to 30 for each gas and agree with the trace; (6) both traces end near 15 · read off the image: two panels, "Valve closed" with He (small, gray) left and Ar (larger, teal) right, about 30 atoms each; "Valve open" with both kinds in both bulbs; the valve drawn as a plug with a handle on top. Colours are the element palette, not the book's gray and teal. The tube is drawn wider than the book's so that thirty atoms mix within the run.
  Second pass (2026-11-16): the first pass's flat figure was chapter 9's stopcock figure again, with a valve choice that un-mixed the gases and a headline about Graham's law; rebuilt round this passage's point, the dispersal.
- sim-steps · Figure 11.4 · dissolution-energy-steps, endothermic-and-exothermic-dissolution, predict-solution-formation, ideal-solution · variation by slider: the book draws the three steps as a cycle of boxes with no energies, so whether the solution ends above or below its start is left to words; here the book's boxes stand in a row, one frame per state, and under each frame is that state's energy level, so the climb of steps 1 and 2, the fall of step 3 and their sum are seen at once · arrows: symbolic (the step arrows) · still, a ladder answering its sliders · step 1 (energy, 0 to 100 kJ/mol, default 70), step 2 (energy, 0 to 50, default 20), step 3 (energy, −150 to 0, default −110, a dashed circle at −(step 1 + step 2) labelled "ideal") · headline "Solvation returns 110 kJ/mol, more than the 90 kJ/mol spent separating the particles: the solution forms exothermically." · the ladder below the frames, axis −150 to 150 kJ/mol (the slider limits reach both ends) · 2D, an energy ladder. Readout: step 1 + step 2 + step 3 with the numbers, in the text's words (the section writes no ΔH).
  works: parts: four frames left to right, (1) solute box and solvent box, both packed, (2) solute expanded, (3) solvent expanded too, (4) one box, the mixed solution; an arrow between frames; under each frame its level; a step arrow from the end of one level to the start of the next; at the right the arrow of the direct formation, from zero to the solution's level · must hold: (1) each level sits at the running sum of the steps; (2) the direct arrow's length equals the sum and the readout's result; (3) the special on step 3 lands the solution's level on zero; (4) every frame holds the same 7 solute and 16 solvent particles; (5) packed particles touch and expanded ones do not · read off the image: boxes "Solute", "Solvent", "Expanded solute", "Expanded solvent" and the mixed box; labels "Step 1", "Step 2", "Step 3", "Direct formation of solution"; 7 solute particles (blue) and 16 solvent (red), no identity and no energies given (the values are the reader's; the defaults make step 1 the largest cost and land mildly exothermic).
  Second pass (2026-11-16): the first pass's boxes rode on the levels at a size nobody could read, the mixed box held 17 solvent particles, and the axis left half the stage empty; rebuilt with the boxes as a row of frames and the ladder under them.
- fig-cold-pack · Figure 11.5 · endothermic-and-exothermic-dissolution · kept photograph, the text points at it · photo

The PhET sugar-and-salt lab the first Link to Learning names is a trigger for a Sim of dissolution; the salt crystal coming apart among water molecules is 11.2's Figure 11.7, so no second one is built here.

## Tables

Table 11.1, Different Types of Solutions, as `div.book-table` with its footnote on soft drinks as a `p.tnote` below.

## Types bound

`energy` (the three steps and their sum in Figure 11.4). Nothing else: the atoms are `F.el`, the solute and solvent the referents `solute` and `solvent`, counts in ink.

## Exercises

Eight end-of-section items. Four keyed (fs-idm71361392, fs-idm84066432, fs-idm6481344, fs-idm95777520), set open with the key. Three unkeyed conceptual kept with an AI-marked approach (fs-idm105740080, fs-idm33766240, fs-idm118513216). One unkeyed numerical left out (fs-idm30601328, hydrogen in palladium; its density "10.8 g cm³" printed without the minus sign).

## Left out

The two Link to Learning notes (the PhET sugar-and-salt lab and the video of endothermic and exothermic dissolution).

## Wanted at chapter level

- none: the section has no variables or equations, and its five concepts and four glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): nothing wanted; Figure 11.3 now draws argon with `F.el('Ar')`, since the palette grades the noble gases by period.
