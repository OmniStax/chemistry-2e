# Plan: 9.6 Non-Ideal Gas Behavior (m68759)

Source: `source.md`, converted with `python3 tools/convert.py 9.6`.
Status: written 2026-09-28 before the build and left for review after, on Chen's instruction to finish the book without check-ins (`config.md`).

Four learning objectives, two numbered figures (a graph and a sketch), one image of the van der Waals equation in the text, Table 9.3, one worked example (Example 9.24) with its Check your Learning, seven end-of-chapter exercises of which four are keyed, two glossary terms and the Key Equations table. No boxed note and no Link to Learning. One page.

## Sub-concepts (page headers)

The book prints no header in this section, so the page splits it by idea:

1. `compressibility` **The compressibility factor** (the opening paragraph, the definition of Z, Figure 9.35). Introduces `compressibility-factor`; uses `ideal-gas-law`.
2. `causes` **Why real gases depart from ideal behavior** (the finite volume of the molecules and their attractions, Figure 9.36). Introduces `causes-of-non-ideal-behavior`; uses `compressibility-factor`, `boyles-law`.
3. `van-der-waals` **The van der Waals equation** (the equation and its two corrections, Table 9.3, the dips of Figure 9.35 explained). Introduces `van-der-waals-equation`; reinforces `causes-of-non-ideal-behavior` and `compressibility-factor`.
4. `ideal-conditions` **When a gas behaves ideally** (low pressure and high temperature, Example 9.24 as `ex-co2-flask` with its Check your Learning inline). Introduces `conditions-for-ideal-behavior`; `ex-co2-flask` uses `van-der-waals-equation` and `ideal-gas-law`.

## Figures

- `sim-z-graph` · Figure 9.35 · compressibility-factor, van-der-waals-equation, conditions-for-ideal-behavior · value add: variation by slider (the dips fill in and the curves flatten toward Z = 1 as the temperature rises, which the book states in words and the print cannot show) · still: a state is a place on the curves and nothing has a clock · sliders `P` (0 to 1000 atm, pressure; default 200) running a marker along every curve, `T` (310 to 800 K, temperature; default 310), and a dropdown (`F.select`, since five buttons wrap) of the gas the readout follows (H₂, N₂, O₂, CH₄, CO₂; default CO₂); a dashed circle on `P` where the chosen gas's curve crosses Z = 1 (the pressure the text says the gas "appears to follow PV = nRT"), placed from the van der Waals equation and hidden above the gas's Boyle temperature · headline "At 200 atm and 310 K, Z for CO₂ is 0.55, so its molar volume is 55% of an ideal gas's." · graph alone: Z (0 to 2.5, ink) against P (0 to 1000 atm, pressure hue), the ideal line dashed in ink, the region below it softly shaded as in the book, each gas's curve in `F.cat(i)` with a legend in ink · the curves are the van der Waals equation solved for the molar volume with each gas's a and b (Table 9.3 for N₂, O₂ and CO₂; the standard constants for H₂, 0.244 and 0.0266, and CH₄, 2.25 and 0.0428), which reproduces the book's measured curves in shape; 310 K is the lowest temperature above CO₂'s critical point, where the equation gives one volume for each pressure; the caption says the curves are calculated · readout $Z = \kP\kVm/(R\kT)$ with the live numbers for the chosen gas · 2D: a relation between quantities (rule 28.1).
- `sim-real-boxes` · Figure 9.36 · causes-of-non-ideal-behavior, van-der-waals-equation · value add: flow by animation (molecules travel and strike the walls, and in the real box the attractions pull those near a wall back toward the rest, so they strike more softly) and variation by slider (the difference grows with the amount and shrinks with the temperature) · moving: the molecules travel, so a continuous cycle with the transport and no scrubber · controls: a choice of what is held constant, pressure (the book's panel a) or volume (panel b, the default, since it reproduces Example 9.24 on load); a choice of gas (He, N₂, O₂, CO₂ from Table 9.3; H₂O and CCl₄ are left out because their critical temperatures lie above the slider range, where the equation no longer gives one volume); `n` (0.50 to 10.00 mol, amount; default 3.46) and `T` (310 to 600 K, temperature; default 502), in the 4.25-L flask of Example 9.24; four molecules drawn per mole, fourteen at the default as in the book's drawing · headline "At 502 K, 3.46 mol of CO₂ in 4.25 L exerts 32.4 atm, 1.1 atm less than an ideal gas would." · the scene with a strip beneath: at constant volume two pressure bars (ideal nRT/V; real nRT/(V − nb) with n²a/V² taken off it), at constant pressure two volume bars (ideal 4.25 L; real from the van der Waals equation, nb marked) · 3D, physical: a particle picture is 3D by the book's rules; the two glass boxes have no up, so the yaw is free and the pitch is held within 70° of level so that the boxes stay side by side; no idle spin, since the molecules already move; front and corner views, zoom; the real box's width follows its volume at constant pressure. The ideal gas's molecules are drawn at a fifth of their size, since an ideal particle has no volume. No attraction arrows are drawn: a line pairing two moving molecules would travel (manim-style 17), so the attraction is shown by the motion and by the n²a/V² bar · readout: the van der Waals equation with the live numbers in type colours, its form changing by meaning with the constant held · hover names on every molecule and both boxes.

The image of the van der Waals equation (fs-idm139964416) is redrawn as display math in the text, PV = nRT ⟶ (P + n²a/V²)(V − nb) = nRT with the book's two labels as underbraces, P and V in their type hues as `ch09/COLOR.md` asks; its image is not copied. Images inside exercises: `CNX_Chem_09_06_Exercise1_img` (the six graphs of fs-idm14870688) and `CNX_Chem_09_06_RealGases` (PV against P for fs-idp200327600) are kept as images in their prompts, since the items cannot be answered without them.

Extra simulations considered and left: a slider for a and b on an invented gas (Table 9.3 and the gas choice already span the range).

## Tables

Table 9.3, Values of van der Waals Constants for Some Common Gases, in the text as `div.book-table`. The Key Equations table is the chapter's equations rows.

## Exercises

- Inline, `check-your-learning`: `cyl1` after `ex-co2-flask` (N₂ in a 560-mL flask), multi: (a) 46.562 atm, (b) 46.594 atm, the book's five significant figures kept, (c) in the solution.
- End, keyed: `e1` fs-idm14870688 (Gases C, E and F; open, with its image), `e3` fs-idm29887312 (conditions (b); open), `e5` fs-idp137909616 (SF₆; open), `e7` fs-idm89275552 (five parts on Z; open, "If XX behaved" as printed).
- End, unkeyed conceptual, AI-marked approach: `e2` fs-idp200327600 (PV of CO₂, with its image), `e4` fs-idm58636672 (the factors).
- Left out, unkeyed numerical, named in `exercise_notes`: fs-idm23432208 (0.467 mol CO₂ in 0.245 L).

## Colour

Binds `pressure`, `volume`, `temperature`, `amount` (`ch09/COLOR.md`); V_m is `\kVm`, a variant of volume. Z, a, b and R are ink. The five curves of Figure 9.35 take `F.cat(0..4)`; every molecule of Figure 9.36 is `F.el`.

## Wanted at chapter level

- variables `Z_comp` → 9.6-compressibility
- variables `V_m` → 9.6-compressibility
- variables `a_vdw` → 9.6-van-der-waals
- variables `b_vdw` → 9.6-van-der-waals
- equations `eq-compressibility` → 9.6-compressibility
- equations `eq-van-der-waals` → 9.6-van-der-waals

### Applied by the chapter pass

Every item above was applied on 2026-09-28: the two equations and the four variable rows carry the anchors listed.
