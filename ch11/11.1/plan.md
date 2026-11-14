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
- sim-he-ar · Figure 11.3 · ideal-solution · flow by animation: the book's before-and-after pair leaves the mixing to the imagination; here the atoms wander through the tube and helium, the lighter atom, visibly spreads first · arrows: none in the book; the atoms themselves move · moving: the atoms travel continuously (diffusion has a clock), the transport runs it · choice valve (closed, open; default open, so the mixing starts on load; closing starts again from the book's left panel) · headline "Helium, the lighter atom, crosses faster than argon." then "Each gas has spread evenly through both bulbs, with no energy exchanged." · beside each bulb its count of He and Ar, the sample atom beside each symbol the key · 2D, rebuilt flat on 2026-11-14: the 3D bulbs with view buttons were small, the atoms hid one another and turning showed nothing (book rule, particle pictures). Readout: the share of each gas that has crossed, two lines, heading for 50 %.
  works: parts: two glass bulbs joined by a short tube, a valve (tapered plug with a handle) in the middle of the tube · flow: atoms travel in straight lines, turn at the glass, and pass the valve only while it is open · must hold: (1) no atom outside the glass; (2) none crosses the closed valve; (3) helium moves √(39.95/4.00) = 3.2 times faster than argon; (4) argon drawn larger than helium, as the book draws it; (5) the counts beside the bulbs add to 30 for each gas · read off the image: two panels, "Valve closed" with He (small, gray) left and Ar (larger, teal) right, about 30 atoms each; "Valve open" with both kinds in both bulbs; the valve drawn as a plug with a handle on top. Colours are the element palette, not the book's gray and teal.
- sim-steps · Figure 11.4 · dissolution-energy-steps, endothermic-and-exothermic-dissolution, predict-solution-formation, ideal-solution · variation by slider: the book draws the three steps as a cycle of boxes with no energies, so whether the solution lands above or below its start is left to words; here each box stands on its energy level and the ladder shows the sum · arrows: symbolic (the step arrows) · still, a ladder answering its sliders · ΔH₁ (energy, 0 to 100 kJ/mol, default 60), ΔH₂ (energy, 0 to 100, default 40), ΔH₃ (energy, −200 to 0, default −130, a dashed circle at −(ΔH₁ + ΔH₂) labelled "ideal") · headline "Spreading out costs 100 kJ/mol and solvation returns 130 kJ/mol: the solution forms exothermically." · the ladder alone, axis −200 to 200 kJ/mol (the slider limits reach both ends) · 2D, an energy ladder. Rebuilt 2026-11-14: the particle boxes were too small to read and the axis ran 50 kJ/mol past anything the sliders reach; the boxes are now the book's (packed solute, packed solvent, each spread out, the mixed solution), large, on their levels; the caption is cut to what to set and what to look at.
  works: parts: four levels left to right, solute + solvent (two packed boxes), spread-out solute (solute box opened), both spread out, solution (one mixed box); step arrows between levels; a dashed arrow from 0 to the solution's level, the direct formation · must hold: (1) each level sits at the running sum of the steps; (2) the dashed arrow's length equals the sum and the readout's result; (3) the special on ΔH₃ lands the solution level on 0; (4) the boxes hold the same 7 solute and 16 or 17 solvent particles throughout (7 and 17 in the mixed box) · read off the image: boxes "Solute", "Solvent", "Expanded solute", "Expanded solvent" and the mixed box; labels "Step 1", "Step 2", "Step 3", "Direct formation of solution"; solute blue, solvent red, no identity and no energies given (our values are illustrative, the slider defaults chosen to land exothermic).
- fig-cold-pack · Figure 11.5 · endothermic-and-exothermic-dissolution · kept photograph, the text points at it · photo

The PhET sugar-and-salt lab the first Link to Learning names is a trigger for a Sim of dissolution; the salt crystal coming apart among water molecules is 11.2's Figure 11.7, so no second one is built here.

## Tables

Table 11.1, Different Types of Solutions, as `div.book-table` with its footnote on soft drinks as a `p.tnote` below.

## Types bound

`energy` (the three ΔH steps and ΔH of solution in Figure 11.4). Nothing else: the atoms are `F.el`, the solute and solvent the referents `solute` and `solvent`, counts in ink.

## Exercises

Eight end-of-section items. Four keyed (fs-idm71361392, fs-idm84066432, fs-idm6481344, fs-idm95777520), set open with the key. Three unkeyed conceptual kept with an AI-marked approach (fs-idm105740080, fs-idm33766240, fs-idm118513216). One unkeyed numerical left out (fs-idm30601328, hydrogen in palladium; its density "10.8 g cm³" printed without the minus sign).

## Left out

The two Link to Learning notes (the PhET sugar-and-salt lab and the video of endothermic and exothermic dissolution).

## Wanted at chapter level

- none: the section has no variables or equations, and its five concepts and four glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): nothing wanted; Figure 11.3 now draws argon with `F.el('Ar')`, since the palette grades the noble gases by period.
