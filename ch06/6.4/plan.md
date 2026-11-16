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

Re-examined on 2026-11-14 with the book's images open (figure pass, `claude-fable-5-2`).

id · replaces · concepts · value add · arrows · motion · controls · headline · graph · 2D/3D

1. `sim-aufbau` · Figure 6.24 · orbital-energy-order, aufbau-principle,
   hunds-rule, configuration-exceptions · variation by slider: the book's
   empty ladder becomes any atom's filled one, each electron taking the lowest
   open box, single before paired, 4s before 3d · arrows: the energy arrow is
   symbolic; none kinematic · still; landing on an exception eases the moved
   electron from its predicted box to its observed one once · one slider, Z
   (1 to 118, default 15, Example 6.10's phosphorus, ink), dashed circles at
   Cr 24, Cu 29 and Nb 41, the exceptions the text names. Z is a slider though
   it names an element: the procedure adds one electron at a time · headline
   "Phosphorus, Z = 15: the last electron enters 3p, leaving 3 unpaired
   electrons."; at an exception which electron sits where and the two
   configurations · no graph · readout the configuration, full where it fits
   the line (to Kr), then core-abbreviated · legend: a box with a pair, a box
   with one arrow, a rung · 2D.
   works: parts: the energy arrow E at the left; four columns headed by their
   capacity 2, 6, 10, 14; a rung for each subshell, its label at its left, one
   box per orbital on it (1, 3, 5, 7) · flow: nothing flows; an electron is a
   half-arrow in a box · must hold: each rung stands higher than the one
   before it in the order 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f
   6d 7p; nd lies between (n+1)s and (n+1)p, 4f between 6s and 5d; no box
   holds more than two arrows and a pair points up and down; a subshell takes
   one arrow in every box before any pairs; at Z = 15 the three 3p boxes hold
   one up arrow each; Cr shows 4s one arrow and 3d five single, Cu 4s one and
   3d five pairs, Nb 5s one and 4d four single; the readout's superscripts
   add to Z · read off the image: the title "Subshell electron capacity" with
   2, 6, 10, 14; rung order as above up to 6d; the image stops at 6d and 5f
   (7p is added so Z reaches 118); the alt text says three columns, the image
   has four.
2. `sim-periodic` · Figure 6.27 (un-folded from 6.27 + 6.29 on 2026-11-14;
   6.29 is the book's image again, `fig-ptable-config`) ·
   aufbau-principle, periodic-table-blocks, configuration-exceptions ·
   variation by slider: the caption's "building up from hydrogen" done on the
   table, the squares from hydrogen to the element marked and the rows read
   in order into its configuration, which the book's still leaves to the
   reader · arrows: none (the book's double arrows only span a row and are
   replaced by the subshell written in each square) · still · one slider, Z
   (1 to 118, default 31, gallium, the text's valence example; dashed circles
   at Cr, Cu, Nb); a tap on a square sets Z · headline names the element and
   the square it stands on ("Gallium, Z = 31, is the 1st square of the 4p
   row."), or at an exception the configuration read and the observed one ·
   no graph · readout the configuration read from the table, full where it
   fits, then core-abbreviated · legend: the four blocks by `F.cat(0..3)` (the
   caption names the dashed outline); under 700 px a square keeps only its
   symbol and the enlarged square carries the subshell · hover names each element with its observed configuration
   · 2D (periodic table).
   works: parts: 18 groups by 7 periods, group numbers over the first square
   of each column and period numbers at the left; s block groups 1, 2 and He,
   d block groups 3 to 12 from period 4 with La and Ac in group 3, p block
   groups 13 to 18 from period 2; two rows beneath for 4f (Ce to Lu) and 5f
   (Th to Lr), which the image leaves out and its caption sends to Figure
   6.29; an enlarged square as the key (symbol, subshell, electrons in it) ·
   flow: none · must hold: each square carries the subshell of its row and
   its count along that row (Sc 3d¹ to Zn 3d¹⁰, B 2p¹ to Ne 2p⁶, He 1s², La
   5d¹, Hf 5d²); the squares marked are exactly those with atomic number up
   to Z; the readout is the rows crossed in order with their counts, summing
   to Z; a dashed square is one whose observed configuration (Figure 6.29's)
   is not the one read · read off the image: symbol upper left, electrons in
   the subshell upper right, subshell in the middle; rows 1s to 7s, 3d to 6d,
   2p to 6p; La "*1" and Ac "**1" in the 5d and 6d rows; Nh to Og blank in
   the image (drawn here as 7p); the alt text agrees with the image.
3. Reverted to the book's images on 2026-11-14, each a still redraw that
   showed nothing the image does not and drew it smaller: `fig-notation`
   (6.25, the redraw lost the highlighted superscript and the arrows),
   `fig-fill-order` (6.26, the redraw's arrows were short stubs without the
   dashed return paths that make the diagram one continuous route),
   `fig-valence` (6.28, lost the two shadings), and the eight unnumbered
   orbital diagrams `fig-od-h`, `fig-od-he`, `fig-od-li`, `fig-od-be`,
   `fig-od-b`, `fig-od-c`, `fig-od-nofne`, `fig-od-p` (boxes a third the size
   of the book's). Numbered ones are `photo` rows, the unnumbered ones kept
   images (`figure` rows without `originals`).
4. `fig-ptable-config` · Figure 6.29 · the book's image, kept: a reference
   table the text cites nine times by its colours (blue, red, yellow, green),
   which a redraw in other hues contradicted. The block referents and their
   `data-ref` spans went with the fold.

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

Binds `energy` only (the rungs and energy arrow of `sim-aufbau`).
`F.cat(0..3)` for the s, p, d and f blocks in `sim-periodic`. Ink: boxes,
arrows, configuration text, Z and every quantum number. No referents.

## Wanted at chapter level

- glossary `6.4/Aufbau principle` → 6.4-aufbau
- glossary `6.4/core electron` → 6.4-valence-core
- glossary `6.4/electron configuration` → 6.4-notation
- glossary `6.4/Hund’s rule` → 6.4-hunds-rule
- glossary `6.4/orbital diagram` → 6.4-first-atoms
- glossary `6.4/valence electrons` → 6.4-valence-core
- glossary `6.4/valence shell` → 6.4-periodic-table
- 6.5 `exercise_notes`: name fs-idm150214960, fs-idm121823200 and fs-idp177066416 as moved to 6.4

### Applied by the chapter pass (2026-09-28)

Glossary rows carry no anchor field, so the glossary lines are not written. The `exercise_notes` of 6.5 already name fs-idm150214960, fs-idm121823200 and fs-idp177066416 as set on 6.4 with `source_section` 6.5, and 6.4's notes agree.
