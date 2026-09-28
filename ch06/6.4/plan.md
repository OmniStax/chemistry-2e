# Plan: 6.4 Electronic Structure of Atoms (Electron Configurations) (m68734)

Source: `source.md`, converted with `python3 tools/convert.py 6.4`.
Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the
book without check-ins; left for review after the build (`config.md`).

Three learning objectives, six numbered figures (6.24 to 6.29), eight
unnumbered orbital diagrams in the text and Example 6.10, two worked examples
(6.10, 6.11) each with a Check Your Learning, one display equation (Li and Na
abbreviated), no table, no boxed note, no Link to Learning, twenty-one
end-of-chapter exercises plus three taken from 6.5, seven glossary terms. One
page (root rule 11).

## Sub-concepts (page headers)

1. `orbital-energies` **Orbital energies and atomic structure** (book's header;
   the opening paragraph, Figure 6.24, the shielding paragraph). Introduces
   `orbital-energy-order`.
2. `notation` **Writing an electron configuration** (the three pieces of
   information, 2p⁴ and 3d⁸, Figure 6.25). Introduces
   `writing-electron-configurations`.
3. `aufbau` **The Aufbau principle** (book's header; the building-up paragraph,
   Figures 6.26 and 6.27). Introduces `aufbau-principle`; uses
   `orbital-energy-order`, `pauli-exclusion-principle`.
4. `first-atoms` **Hydrogen to beryllium, two arrows to a box** (H, He, Li, Be
   with their orbital diagrams). Reinforces `aufbau-principle`; uses
   `pauli-exclusion-principle`, `spin-quantum-number`,
   `writing-electron-configurations`.
5. `hunds-rule` **Boron to neon and Hund's rule** (B, C, N to Ne). Introduces
   `hunds-rule`; uses `aufbau-principle`, `magnetic-quantum-number`.
6. `valence-core` **Valence and core electrons** (Na, Figure 6.28, the Li and
   Na display, Mg to Ar, first mention of Figure 6.29). Introduces
   `valence-and-core-electrons`; uses `writing-electron-configurations`.
7. `after-argon` **Potassium and beyond: 4s before 3d** (K, Ca, Sc, the d and
   f series; Example 6.10 as `ex-phosphorus` with its Check Your Learning
   after it). Reinforces `orbital-energy-order`, `aufbau-principle`; uses
   `working-with-quantum-numbers`.
8. `exceptions` **Exceptions to the predicted order** (Cr, Cu, Nb).
   Introduces `configuration-exceptions`.
9. `periodic-table` **Electron configurations and the periodic table** (book's
   header; groups, the three categories and the list). Introduces
   `periodic-table-blocks`; uses `valence-and-core-electrons`.
10. `ions` **Electron configurations of ions** (book's header; Example 6.11 as
    `ex-ions` with its Check Your Learning). Introduces `ion-configurations`.

Apparatus: objectives, the Key Concepts and Summary (to `summary_html`) and
the glossary go to the tables. No Key Equations table.

## Figures

id · replaces · concepts · value add · motion · controls · headline · graph · 2D/3D

1. `sim-aufbau` · Figure 6.24 · orbital-energy-order, aufbau-principle,
   hunds-rule, configuration-exceptions · variation by slider: the book's
   empty ladder becomes any atom's filled one, the reader sees each electron
   take the lowest free box, single before paired, 4s before 3d, and the
   exceptions shift an electron · still: the ladder answers its slider and
   nothing has a clock; landing on an exception eases the moved electron from
   its predicted box to its observed one once (a morph, manim 8) · one slider,
   Z, the number of electrons (1 to 118, step 1, default 15 for Example 6.10's
   phosphorus, ink, since a count is untyped), dashed circles at Cr 24, Cu 29
   and Nb 41, the three exceptions the text names. Z is a slider rather than a
   choice although it names an element: the Aufbau procedure adds one electron
   at a time, so the ordered count is the idea, and the element name rides in
   the headline · "Phosphorus, Z = 15: its 15 electrons fill 1s, 2s, 2p and 3s
   and put three unpaired electrons in the three 3p orbitals." · no graph: the
   ladder is the book's four columns (capacity 2, 6, 10, 14), rungs in rank
   order, not to scale as the book says, in the energy hue with the energy
   arrow; boxes on each rung, half-arrows in ink; the rung being filled
   emphasised · readout the configuration, full, then core-abbreviated, with
   a note of valence count and, at an exception, the predicted one · 2D.
2. `fig-notation` · Figure 6.25 · writing-electron-configurations · faithful
   copy (standardisation): a hydrogen atom disc in `F.el('H')` with its
   electron, the notation 1s¹ with the book's two labels · still, no
   controls · 2D.
3. `fig-fill-order` · Figure 6.26 · aufbau-principle, orbital-energy-order ·
   faithful copy: the circles 1s to 7p in columns, blocks by `F.cat(0..3)`,
   the diagonal arrows drawn in ink along their length on arrival · still ·
   2D.
4. `sim-periodic` · Figure 6.27 + 6.29 (fold: one periodic table drawn twice
   by the book, once with the subshell being filled, once with every outer
   configuration) · aufbau-principle, periodic-table-blocks,
   valence-and-core-electrons, configuration-exceptions · variation by choice
   and hover: any element's configuration is built on request, with its
   valence electrons underlined as the book underlines gallium's; the blocks
   by `F.cat(0..3)` (s, p, d, f); exceptions to the building-up order outlined
   dashed, so the reader sees they cluster in the d and f blocks · still ·
   controls: `F.choice` view ('filling' = 6.27, each cell names the subshell
   being filled; 'configuration' = 6.29, each cell names its last subshell with
   its electron count) and `F.select` element (118 options, default Ga, the
   book's valence example); every cell names itself and its full observed
   configuration under the pointer · headline names the element, its block
   and category · readout the core-abbreviated configuration with valence
   underlined, note the count of valence electrons and, for an exception, the
   predicted configuration; the configurations are the elements sheet's
   observed ones and the caption says so · 2D (periodic table: flat by the
   book's rule).
5. `fig-valence` · Figure 6.28 · valence-and-core-electrons · faithful copy:
   Na (disc in `F.el('Na')`), its configuration with the core bracketed and
   the valence electron bracketed, and the abbreviation [Ne]3s¹ · still · 2D.
6. Unnumbered orbital diagrams, redrawn live as faithful copies in the ink of
   orbital diagrams with the atom's disc in `F.el`, no controls, one shared
   drawing routine with `sim-aufbau` so the boxes are the same boxes:
   `fig-od-h`, `fig-od-he`, `fig-od-li`, `fig-od-be`, `fig-od-b`, `fig-od-c`,
   `fig-od-nofne` (four rows), `fig-od-p` (inside Example 6.10). Each a
   `figure` row with no number, eyebrow "Figure", the book's image in
   `data-original`. Kept live rather than as images because the ladder above
   draws the same boxes and arrows and the two must look alike.

Photographs: none. The five images inside the key of fs-idp45725024 stay on
the card, copied to `media/ch06/`.

Extra simulations considered and left: a filling-order diagonal that lights as
Z rises (the ladder of `sim-aufbau` already fills in that order); an ion
builder (Example 6.11's rules are one sentence each and the periodic figure
already shows the neutral configuration to start from).

## Exercises

- Inline `check-your-learning`: `cyl1` after `ex-phosphorus` ((a) Mn (b) Xe),
  `cyl2` after `ex-ions` (Tc²⁺, Ru³⁺); open with the book's answers.
- End, keyed (10): fs-idp32862336, fs-idp165789584, fs-idp108900240,
  fs-idp45725024 (its five orbital diagrams in the solution), fs-idp203400832,
  fs-idp26092016, fs-idp162194832 (choice, (e)), fs-idp3240128,
  fs-idp32131696, fs-idp81167248 (stays: its configurations are this page's).
- End, unkeyed, none numerical, kept with a suggested approach marked
  OmniStax's own (11): fs-idp203800544, fs-idp28734432, fs-idp44567104,
  fs-idm11516304, fs-idp22673408, fs-idp20553216, fs-idp42173648 (a pick from
  Li, B, N, F, Ne: open with its options, never graded), fs-idm7500224,
  fs-idp50820528, fs-idm62612928, fs-idm9054704.
- Taken from 6.5 with `source_section` "6.5" (3): fs-idm150214960 (keyed, 15
  (5A)), fs-idm121823200 and fs-idp177066416 (unkeyed, approach).

## Colour

Binds `energy` only (the rungs and energy arrow of `sim-aufbau`). `F.el` for
the H and Na atoms and the atom beside each orbital diagram; `F.cat(0..3)` for
the s, p, d and f blocks in `sim-periodic` and `fig-fill-order`. Ink: boxes,
arrows, configuration text, Z and every quantum number.

## Wanted at chapter level

- glossary `6.4/Aufbau principle` → 6.4-aufbau
- glossary `6.4/core electron` → 6.4-valence-core
- glossary `6.4/electron configuration` → 6.4-notation
- glossary `6.4/Hund’s rule` → 6.4-hunds-rule
- glossary `6.4/orbital diagram` → 6.4-first-atoms
- glossary `6.4/valence electrons` → 6.4-valence-core
- glossary `6.4/valence shell` → 6.4-periodic-table
- 6.5 `exercise_notes`: name fs-idm150214960, fs-idm121823200 and fs-idp177066416 as moved to 6.4
