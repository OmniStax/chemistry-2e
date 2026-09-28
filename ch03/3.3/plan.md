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
2. `sim-molarity` · Sim · molarity, molarity-calculations · value add: variation by slider (the reader sees the same grams give a lower molarity in a larger volume, and the particles thin out) · still, the idea has no clock · a solute dropdown (`F.select`, six solutes of Examples 3.14 to 3.18 and their Check Your Learning: sucrose, acetic acid, NaCl, CoCl₂, CaCl₂, KBr; choosing one sets the example's mass and volume), mass of solute (mass, 0.5 to 100 g), volume of solution (volume, 0.050 to 1.000 L) · headline "25.2 g of acetic acid is 0.420 mol, and dissolved to make 0.500 L of solution it is 0.839 M." · a balance with the weighed solute reading grams in the mass hue, an arrow to the moles in the amount hue, and a beaker filled to the volume with one solute glyph (its two characteristic elements through `F.el`) per 0.04 mol, the scale in a legend, hover names on glyphs, beaker and balance · readout $\kM = \frac{\km/\kMM}{\kL} = \frac{\kn}{\kL}$ with the numbers · no graph · flat, 2D: the lesson is a relation among three quantities read off the picture, and the particle count in a flat beaker reads directly where a turned 3D beaker would hide particles behind one another (rule 28.1, argued past the book's particle-picture default) · Example 3.16 on load.
3. `fig-vinegar` · Figure 3.15 · molarity-calculations · photograph, kept: Example 3.16 points at it · book caption.
4. `sim-dilution` · Figure 3.16 (the photograph of two cylinders with the same mass of copper nitrate in `originals`) · dilution, dilution-equation · value add: variation by slider (the reader sees the same particles spread through more liquid and the blue pale) · still, no clock · C₁ (concentration, 0.10 to 6.00 M), V₁ (volume, 0.100 to 2.000 L), V₂ (volume, 0.100 to 4.000 L, a dashed circle at V₂ = V₁ where nothing changes; below V₁ the solution is evaporated, as exercises ask) · headline "0.850 L of 5.00 M copper nitrate diluted to 1.80 L is 2.36 M; the 4.25 mol of solute is unchanged." · two graduated cylinders, stock and diluted, the same Cu glyphs (one per 0.25 mol, `F.el('Cu')`) in both, the liquid tinted copper-nitrate blue by a named constant `CU_NITRATE` whose opacity follows the concentration (the colour is the physical fact of Figure 3.16, never the concentration hue) · readout $\kCone\kVone = \kCtwo\kVtwo$ with the numbers and the unchanged moles · flat, 2D, for the same reason as `sim-molarity` · Example 3.19 on load.

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
