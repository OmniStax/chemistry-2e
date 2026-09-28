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
- sim-he-ar · Figure 11.3 · ideal-solution · flow by animation and shape in 3D: the reader watches the atoms wander through the tube and spread into both bulbs, which the book's before-and-after pair leaves to the imagination; helium, the lighter atom, visibly spreads first · moving, the atoms travel continuously (diffusion has a clock), the transport runs it · stopcock (a choice, closed or open; closing sets the two gases apart again, opening lets them mix), no slider · headline "12 of 30 helium atoms and 7 of 30 argon atoms have crossed into the other bulb" · strip beneath with the count of each gas in each bulb, `F.el('He')` and argon bars; the element palette gives He and Ar one colour, so argon is drawn in `F.el('Ar')` mixed 45 % toward ink, and is also the larger sphere · physical 3D, a particle picture (book rule): two glass bulbs on a stand, pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the atoms already move, views front and above
- sim-steps · Figure 11.4 · dissolution-energy-steps, endothermic-and-exothermic-dissolution, predict-solution-formation, ideal-solution · variation by slider: the book draws the three steps with no energies, so whether the solution lands above or below its start is left to words; here the energy of each step is set and the ladder shows the sum · still, a ladder answering its sliders · ΔH₁ (energy, kJ/mol, 0 to 100, default 60), ΔH₂ (energy, 0 to 100, default 40), ΔH₃ (energy, −250 to 0, default −130, a dashed circle at −(ΔH₁ + ΔH₂) labelled "ideal") · headline "Separating solute and solvent costs 100 kJ/mol and solvation returns 130 kJ/mol, so the solution forms exothermically" · the ladder alone: four levels left to right (solute + solvent, expanded solute, expanded solute and solvent, solution), each with its particle box in `F.cat(0)` solute and `F.cat(1)` solvent, step arrows and the dashed direct arrow in the energy hue, energy axis −250 to 250 kJ/mol fixed · 2D, an energy ladder (book rule: ladders and energy diagrams are flat)
- fig-cold-pack · Figure 11.5 · endothermic-and-exothermic-dissolution · kept photograph, the text points at it · photo

The PhET sugar-and-salt lab the first Link to Learning names is a trigger for a Sim of dissolution; the salt crystal coming apart among water molecules is 11.2's Figure 11.7, so no second one is built here.

## Tables

Table 11.1, Different Types of Solutions, as `div.book-table` with its footnote on soft drinks as a `p.tnote` below.

## Types bound

`energy` (the three ΔH steps and ΔH of solution in Figure 11.4). Nothing else: the atoms are `F.el`, the solute and solvent roles `F.cat(0)` and `F.cat(1)`, counts in ink.

## Exercises

Eight end-of-section items. Four keyed (fs-idm71361392, fs-idm84066432, fs-idm6481344, fs-idm95777520), set open with the key. Three unkeyed conceptual kept with an AI-marked approach (fs-idm105740080, fs-idm33766240, fs-idm118513216). One unkeyed numerical left out (fs-idm30601328, hydrogen in palladium; its density "10.8 g cm³" printed without the minus sign).

## Left out

The two Link to Learning notes (the PhET sugar-and-salt lab and the video of endothermic and exothermic dissolution).

## Wanted at chapter level

- none: the section has no variables or equations, and its five concepts and four glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): nothing wanted; Figure 11.3 now draws argon with `F.el('Ar')`, since the palette grades the noble gases by period.
