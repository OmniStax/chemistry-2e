# Plan: 3.3 Molarity (m68703)

Source: `source.md`, converted with `python3 tools/convert.py 3.3`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left for review after the build.

Three objectives, three figures (two photographs and the dilution photograph), eight worked examples (3.14 to 3.21) each with a Check Your Learning, one Link to Learning (the PhET dilution simulation, dropped and named in `notes`; it triggers the dilution figure), 25 end-of-chapter exercises (12 keyed), the Key Equations table (not printed; `eq-molarity`, `eq-dilution`), nine glossary terms.

## Sub-concepts (page headers)

1. `mixtures` **The composition of mixtures** (the opening paragraph, Figure 3.14). No concept introduced; it motivates `concentration`.
2. `solutions` **Solutions** (the book's header; solvent, solute, dissolved, aqueous, dilute, concentrated). Introduces `solution-components`, `concentration`.
3. `molarity` **Molarity** (the definition and its equation, `sim-molarity`, Examples 3.14 and 3.15). Introduces `molarity`.
4. `molarity-calculations` **Calculating with molarity** (Examples 3.16 to 3.18, Figure 3.15, the guard-digit paragraphs). Introduces `molarity-calculations`.
5. `dilution` **Dilution of solutions** (the book's header; iced tea, Figure 3.16, stock solutions). Introduces `dilution`.
6. `dilution-equation` **The dilution equation** (n = ML to C₁V₁ = C₂V₂, Examples 3.19 to 3.21). Introduces `dilution-equation`.

Example ids: `ex-molar-concentration`, `ex-moles-volumes`, `ex-from-mass`, `ex-mass-in-volume`, `ex-volume-for-mass`, `ex-diluted-concentration`, `ex-diluted-volume`, `ex-stock-volume`.

## Figures

1. `fig-espresso` · Figure 3.14 · concentration · photograph, kept: the text points at it ("see Figure 3.14") and it shows the mixture the paragraph describes · book caption with credit.
2. `sim-molarity` · Sim · molarity, molarity-calculations · value add: variation by slider (the same grams give a lower molarity in a larger volume, and the particles thin out) · arrows: symbolic, one, from the weighed solute to the beaker, carrying the division by the molar mass · still, the idea has no clock · a solute dropdown (`F.select`, the six solutes of Examples 3.14 to 3.18 and their Check Your Learning: sucrose, acetic acid, NaCl, CoCl₂, CaCl₂, KBr; choosing one sets the example's mass and volume and the slider ranges that solute can really reach), mass of solute (mass), volume of solution (volume, a dashed circle at 1 L, where the molarity is the number of moles) · headline "Each liter of this solution holds 0.839 mol of acetic acid.", the definition the readout does not write · a balance with the solute weighed in a dish (a mound for a solid, a level for acetic acid, a liquid), its display in the mass hue, and a 1 L beaker filled to the volume with one solute glyph (two characteristic elements through `F.el`) per 0.04 mol, evenly spread, the scale in an `F.legend` · readout $\kM = \frac{\km/\kMM}{\kV} = \frac{\kn}{\kV}$ with the numbers, one chain · no graph · flat, 2D: every particle must be seen and counted, and a turn shows nothing more (rule 28.5) · Example 3.16 on load.
  works: parts: a top-loading balance (body, display, stem, pan) on the bench; a glass dish on the pan holding the solute; an arrow from the dish to the mouth of the beaker; a 1 L beaker with a pouring lip and a mark every 0.1 L, on the same bench, holding the solution · flow: none (still); the arrow stands for moving the weighed solute into the beaker and making the solution up to the volume · must hold: (1) the display reads the mass slider; (2) moles = mass ÷ the book's molar mass, and M = moles ÷ volume, in the readout and the headline alike; (3) the liquid surface stands at the volume slider on the beaker's marks; (4) the beaker holds round(n ÷ 0.04) particles, all inside the liquid and none stacked on another; (5) each solute opens on its example's numbers and gives the book's answer (sucrose 0.375 M, acetic acid 0.839 M, NaCl 5.30 M, CoCl₂ 0.674 M, CaCl₂ 0.200 M, KBr 1.50 M); (6) no setting gives a molarity the solute cannot reach: each solute's mass and volume ranges stop short of its saturated (or, for acetic acid, pure) concentration; (7) acetic acid is drawn as a liquid in the dish, the salts and sucrose as a mound · read off the image: no image (a Sim that replaces nothing). Numbers from the text: sucrose 0.133 mol (45.53 g at 342.30 g/mol) in 355 mL; acetic acid 25.2 g, 60.052 g/mol, 0.500 L; NaCl 58.44 g/mol, 77.4 g in 0.250 L; CoCl₂ 6.52 g, "128.9 g/mol" as the book prints it, 75.0 mL; CaCl₂ 110.98 g/mol, 5.55 g in 250.0 mL; KBr 66.0 g in 0.370 L of 1.50 M (119.00 g/mol). Re-examined 2026-11-14: rebuilt. The idea earns its Sim, but the balance was a box under a lump, the beaker a bare rectangle in a half-empty stage, particles clumped at random, the headline repeated the readout, the caption ran to four sentences, and the sliders reached 34 M sodium chloride. All repaired as above.
3. `fig-vinegar` · Figure 3.15 · molarity-calculations · photograph, kept: Example 3.16 points at it · book caption.
4. `sim-dilution` · Figure 3.16 (the photograph of two cylinders with the same mass of copper nitrate in `originals`) · dilution, dilution-equation · value add: variation by slider (the same particles spread through more liquid, the colour pales, and on the graph the rectangle C × V keeps its area) · arrows: symbolic, one, "water added" from the stock to the diluted cylinder · still, no clock · C₁ (concentration, 0.10 to 5.00 M), V₁ (volume, 0.10 to 1.25 L), V₂ (volume, up to 2.50 L and never below V₁, a dashed circle at V₂ = V₁ where no water has been added) · headline "Diluted to 2.12 times the volume, the solution has 1/2.12 of the stock's concentration.", the ballpark check of Example 3.19 · two graduated cylinders, stock and diluted, the same Cu glyphs (one per 0.25 mol, `F.el('Cu')`) in both, the liquid tinted by a named constant `CU_NITRATE` (the blue-green of the photograph) whose opacity follows the concentration (the colour is the physical fact of Figure 3.16, never the concentration hue) · readout $\kCone\kVone = \kCtwo\kVtwo$ with the numbers and the unchanged moles, one chain · graph beside: C against V, the curve C = n/V, the stock a hollow point with a dashed rectangle, the diluted solution a filled point with a solid rectangle, both rectangles of area n · flat, 2D: every particle must be seen, and a turn shows nothing more (rule 28.5) · Example 3.19 on load.
  works: parts: two identical graduated cylinders on one bench, each with a pouring lip, a foot and marks, the left holding the stock and the right the diluted solution; an arrow between them; a graph of concentration against volume with one curve, two points and two rectangles from the origin · flow: none (still); the arrow stands for adding water · must hold: (1) both cylinders hold the same number of particles, round(n ÷ 0.25), all inside the liquid; (2) the right-hand level is never below the left-hand one, and the right-hand colour is never deeper; (3) C₂ = C₁V₁/V₂ in the readout, under the cylinder and on the graph; (4) both points lie on the curve and both rectangles have the area C × V = n; (5) it opens on Example 3.19 (5.00 M, 0.850 L, 1.80 L, 2.36 M) with the levels standing as in the photograph, about a third and three quarters of the way up; (6) at V₂ = V₁ the two cylinders and the two points are the same; (7) no label covers a level, a point or the curve at any setting · read off the image: two identical tall graduated cylinders with hexagonal feet and pouring lips on a white cloth; the left about a third full of a deeper blue-green solution, the right about three quarters full of a paler one; no numbers or labels are legible. The alt text and caption agree with the image. Re-examined 2026-11-14: rebuilt. The sliders are what the photograph cannot do, so the figure stays, but the cylinders were wide boxes in a stage half blank, the liquid was a royal blue the photograph does not show, V₂ could be dragged below V₁ to "evaporate" the stock to 48 M, the headline repeated the readout and the caption ran to five sentences. Now the cylinders are drawn as cylinders at the photograph's proportions, the graph shows the conserved product as an area, dilution only, and the caption is one sentence.

Extra simulations considered: a triangle of n, M, L solved for any one (the two Sims already vary all three); left.

Labels: the balance reading, the moles and the volume marks are few and fixed; glyphs are named by hover and a legend, never labelled one by one (rule 26.7).

## Exercises

- Inline `check-your-learning`, eight, one after each example with the book's answer: cyl1 0.05 M, cyl2 80 mL, cyl3 0.674 M, cyl4 5.55 g, cyl5 0.370 L, cyl6 0.102 M, cyl7 3.76 L, cyl8 0.261 L.
- End `exercise`, keyed (12): fs-idm66121488 (open), fs-idm98103760 (multi a–f), fs-idm62194192 (number, part (b) 27 g, (a) in the solution), fs-idm62322112 (multi, 8 parts), fs-idm26500064 (number, part (b)), fs-idm26577792 (multi), fs-idm26521728, fs-idm27167936, fs-idm27694256 (numbers), fs-idm27672496 (multi), fs-idm27373392, fs-idm26483264 (numbers).
- Unkeyed conceptual kept with an AI suggested approach: fs-idm107608448, fs-idm80527600.
- Left out, unkeyed numerical: fs-idm78757216, fs-idm26412832, fs-idm26440336, fs-idm27178816, fs-idm27153856, fs-idm27683248, fs-idm27384272, fs-idm27364240, fs-idm26471216, and fs-idm59335888 and fs-idm3478704 (their part (a) is an outline whose part (b) is unkeyed; the keyed outline items fs-idm62194192 and fs-idm26500064 test the same skill).

## Colour

Binds `amount`, `volume`, `concentration`, and `mass` (the molarity Sim weighs the solute). Molar mass is mass per mole, in the mass hue. Glyph counts, the per-glyph scale and the copper-nitrate blue are not type hues.

## Wanted at chapter level

- variables `M` → 3.3-molarity
- variables `L` → 3.3-dilution-equation
- variables `M_1` → 3.3-dilution-equation
- variables `M_2` → 3.3-dilution-equation
- variables `L_1` → 3.3-dilution-equation
- variables `L_2` → 3.3-dilution-equation
- variables `C_1` → 3.3-dilution-equation
- variables `C_2` → 3.3-dilution-equation
- variables `V_1` → 3.3-dilution-equation
- variables `V_2` → 3.3-dilution-equation
- variables `n_1` → 3.3-dilution-equation
- variables `n_2` → 3.3-dilution-equation
- equations `eq-molarity` → 3.3-molarity
- equations `eq-moles-from-molarity` → 3.3-dilution-equation
- equations `eq-dilution-molarity` → 3.3-dilution-equation
- equations `eq-dilution` → 3.3-dilution-equation

### Applied by the chapter pass

Every variable and equation anchor set as asked.

## Derivations

- `dilution-equation`, the dilution equation · score 0, a printed block · built as drv-dilution-equation: n = ML written for the solution before and after (two nodes) and joined by the unchanged amount of solute. The block's lines and connecting phrases are replaced; the "where the subscripts" clause stays as a sentence after it, and the general form C₁V₁ = C₂V₂ stays as printed, a renaming rather than a move.
