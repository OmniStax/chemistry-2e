# Plan: 6.2 The Bohr Model (m68732)

Source: `source.md`, converted from the CNXML with `python3 tools/convert.py 6.2`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the showcase sections in one job; the decisions below follow the
book's `RULES.md` and the chapter's `config.md` where a rule would have
asked, and the plan is left for review after the build.

The chapter's first quantitative model of an atom. Two learning objectives,
two sketch figures (the hydrogen energy levels with their energies, and the
same levels with the absorption and emission arrows), no photograph, one
unnumbered image inside the last exercise, no numbered table and the
unnumbered Key Equations table, fifteen display equations, two worked
examples each with a Check Your Learning, no boxed note of any kind,
fifteen end-of-chapter exercises of which seven are keyed, and a glossary
of four terms. One page (root rule 11).

## Sub-concepts (page headers)

The book prints no titled header of its own in this section, so every
header is the page's. The prose is one argument that runs from the
planetary atom to the Rydberg constant and then applies the model, and the
page divides it where the idea changes. One block per idea, the book's
paragraphs kept whole and in the book's order:

1. `planetary-model` **The planetary atom and why it cannot last** (book:
   Rutherford's picture, the electrostatic force, the accelerating electron
   that classical electromagnetism says must radiate and spiral in).
   Introduces `classical-atom-instability`; uses `atoms-and-molecules`.
2. `stationary-states` **Bohr's postulate: allowed orbits and quantized
   energies** (book: Planck's quantization and Einstein's photons brought
   into the planetary picture, the stationary state hypothesis, the photon
   relation |ΔE| = |E<sub>f</sub> − E<sub>i</sub>| = hν = hc/λ with h,
   E<sub>i</sub> and E<sub>f</sub> named, and the quantized energies
   E<sub>n</sub> = −k/n²). Introduces `bohr-stationary-states`,
   `photon-emission-absorption` and `bohr-energy-levels`; uses
   `photon-energy` and `classical-atom-instability`.
3. `rydberg-recovered` **The Rydberg equation falls out of the model**
   (book: what k gathers together, the energy difference k(1/n₁² − 1/n₂²) =
   hc/λ, its rearrangement to 1/λ, the identification R<sub>∞</sub> = k/hc
   and the agreement with the measured constant that made the model taken
   seriously). Introduces `rydberg-constant-recovered`; uses
   `bohr-energy-levels`, `photon-emission-absorption` and `line-spectra`.
   The series Sim stands at the end of this block, where the reader has
   just seen the formula for 1/λ.
4. `energy-ladder` **Ground state, excited states and the photon between
   them** (book: the lowest few levels shown in Figure 6.14, matter is most
   stable with the lowest energy, the ground electronic state and the
   excited electronic state, emission on the way down and absorption on the
   way up, conservation of energy and Figure 6.15). Introduces
   `ground-and-excited-states`; reinforces `photon-emission-absorption`;
   uses `bohr-energy-levels`. The folded Figure 6.14 + 6.15 stands under
   this paragraph, which is the one that points at both numbers; the book
   prints the two images four paragraphs later, where print had room for
   them, and the prose's two references land on the one figure either way.
5. `hydrogen-like` **Hydrogen-like ions: the nuclear charge enters** (book:
   He<sup>+</sup>, Li<sup>2+</sup>, Be<sup>3+</sup>, the generalized energy
   with Z, and the value of k). Introduces `hydrogen-like-ions`;
   reinforces `bohr-energy-levels`.
6. `orbit-radius` **The size of an orbit and the ionization limit** (book:
   r = n²a₀/Z with the Bohr radius, the electron found further out as n
   grows and held less tightly, the limits n → ∞ and r → ∞ giving E = 0,
   and the ionization energy of ground-state hydrogen as k). Introduces
   `bohr-orbit-radius`; uses `hydrogen-like-ions`, `bohr-energy-levels` and
   `ground-and-excited-states`. The orbit-and-rung Sim stands at the end of
   this block.
7. `beyond-bohr` **What the model achieved and where it failed** (book: the
   three paradoxes solved with Planck's constant in each, the failure with
   helium, and the flaw of precise orbits). Reinforces
   `bohr-stationary-states` and `hydrogen-like-ions`.
8. `worked-examples` **Two calculations with the model**, holding Example
   6.4 as `ex-bohr-energy` (the energy of the electron with n = 3 in
   hydrogen; its Check Your Learning inline after it) and Example 6.5 as
   `ex-transition` (the energy and wavelength of the transition from n = 4
   to n = 6 in hydrogen, and the part of the spectrum it falls in; its
   Check Your Learning inline after it). `ex-bohr-energy` uses
   `bohr-energy-levels`, `hydrogen-like-ions` and
   `ground-and-excited-states`; `ex-transition` introduces
   `calculating-bohr-transition-energies` and uses
   `photon-emission-absorption` and `bohr-energy-levels`. The reference to
   "Electromagnetic Energy" in Example 6.5 is the book's own wording and
   stays plain text, since 6.1 is not built.
9. `features` **What the model leaves to every later model** (book: the
   model's three features as a list, the postulate of quantized energy
   levels as the most important, and Bohr's Nobel Prize). Reinforces
   `bohr-stationary-states`, `bohr-orbit-radius` and
   `rydberg-constant-recovered`. The unnumbered spectra plate that the last
   exercise prints stands after the list, under the sentence that says the
   lines in the spectra of the elements result from quantized energies.

The `{index:…}` markers are the plain names. `{term:Bohr's model}`,
`{term:ground electronic state}`, `{term:excited electronic state}` and
`{term:quantum numbers}` are `<strong>`. The two `[ref:…]` markers are
"Figure 6.14" and "Figure 6.15" in the book's wording, and the build links
each to the one figure that carries both numbers. Ion formulas are
`<sup>` in the prose and LaTeX in the display equations. Learning
objectives, the summary and the glossary go to the tables; the Key
Equations table is the chapter's `eq-bohr-energy`, `eq-bohr-transition`
and `eq-bohr-radius`. No Link to Learning note, no boxed note, no
photograph, no dollar sign and no temperature occur.

## Concept nodes (in book-rows.json, merged into book.json)

| id | kind | introduced in | evidence on this page |
|---|---|---|---|
| classical-atom-instability | idea | planetary-model | the opening paragraph; exercise fs-idp24507936 |
| bohr-stationary-states | idea | stationary-states | the stationary state hypothesis; exercise fs-idp105537776 |
| bohr-energy-levels | result, eq-bohr-energy | stationary-states | E<sub>n</sub> = −k/n², Figure 6.14, Example 6.4 and its Check Your Learning; exercises fs-idp171106816, fs-idp44268800 |
| photon-emission-absorption | result, eq-photon-energy-difference | stationary-states | the photon relation, Figure 6.15, Example 6.5; exercise fs-idp21050416 |
| rydberg-constant-recovered | result, eq-rydberg-from-bohr | rydberg-recovered | the derivation and the agreement; exercise fs-idp97637648 |
| ground-and-excited-states | idea | energy-ladder | the two terms and Figure 6.14; exercise fs-idp230795648 |
| hydrogen-like-ions | idea | hydrogen-like | the generalized energy; exercises fs-idp171106816, fs-idp90797744 and the second Check Your Learning |
| bohr-orbit-radius | result, eq-bohr-radius | orbit-radius | r = n²a₀/Z; exercise fs-idm7154736 |
| calculating-bohr-transition-energies | skill, eq-bohr-transition | ex-transition | Example 6.5 and its Check Your Learning; exercises fs-idp21050416, fs-idp90797744 |

Every node of the section has a book exercise on this page, so no
question is generated (config: generated questions, none). The two
placeholder nodes of 6.1, `photon-energy` and `line-spectra`, are used and
not introduced here.

## Figures

id · replaces · concepts · still or moving, and why · sliders (type) ·
headline · graph

1. `sim-bohr-ladder` · **replaces Figure 6.14 + 6.15** (the hydrogen energy
   levels with their energies, and the same levels with the absorption and
   emission arrows) · bohr-energy-levels, photon-emission-absorption,
   ground-and-excited-states, hydrogen-like-ions · value add: flow by
   animation and variation by choice. The book draws twelve arrows at once
   and leaves the photon to the caption; here one jump is made at a time, a
   photon comes in before the electron rises or leaves after it falls, and
   the photon carries the gap between the two rungs as its energy and its
   wavelength · arrows: the book's are symbolic (one arrow per transition)
   and the figure keeps one, still, between the two rungs; what moves is the
   electron and the photon · **moving**: a cycle of 3 s with the transport,
   the electron eased between its rungs (a jump has no path in time to be
   honest about) and the photon travelling at a steady pace · three
   choices, in ink since a quantum number and a nuclear charge are labels:
   n<sub>i</sub> (1 to 6, default 3), n<sub>f</sub> (1 to 6, default 2),
   atom or ion (H, He⁺, Li²⁺) · headline: which way the electron went and
   what light the photon is, "In hydrogen the electron falls from n = 3 to
   n = 2 and a photon of red light is emitted." · no graph · 2D (a ladder).
   Rebuilt on 2026-11-14: the wavelength strip, the diagonal line to it and
   the magnified inset are gone (the spectrum is `sim-series`'s), so the
   ladder takes the stage, 570 units tall, and every rung is told apart at
   its true height.
   works: parts: seven horizontal rungs, n = 1 to 6 solid and n = ∞ dashed,
   at heights in proportion to Eₙ = −kZ²/n², the n = 1 rung at the foot and
   E = 0 at the top; an energy axis with its arrow up on the left; beside
   each rung its n and its energy, the crowded upper labels fanned out on
   leaders as the image fans them; the electron on a rung; one arrow from
   the rung it starts on to the rung it ends on; a photon, a short wave
   packet, in the space left of the rungs at the height of the middle of
   the jump; the words "ground state" at n = 1 and a bracket "excited
   states" over n = 2 to 6, the two terms the passage defines · flow:
   absorption, the photon travels in from the left to the electron and is
   gone, then the electron rises; emission, the electron falls, then the
   photon leaves to the left · must hold: (1) the rungs are to scale: the
   gap from n = 1 to n = 2 is three quarters of the ladder and each gap
   above is smaller than the one below it; (2) the arrow points up and the
   photon moves toward the ladder when n<sub>f</sub> > n<sub>i</sub>, down
   and away when n<sub>f</sub> < n<sub>i</sub>, and with n<sub>f</sub> =
   n<sub>i</sub> there is no arrow and no photon; (3) the photon's energy is
   |ΔE| of the readout and its wavelength hc/|ΔE|, in the colour of that
   light when it is visible and in the wavelength hue when it is not; (4)
   the labels read the book's energies for hydrogen; (5) no label lies on a
   rung, the arrow or the photon at any choice · read off the image: 6.14
   labels "Energy, n" and reads 0.0 J, ∞; −8.72 × 10⁻²⁰ J, 5; −1.36 × 10⁻¹⁹
   J, 4; −2.42 × 10⁻¹⁹ J, 3; −5.45 × 10⁻¹⁹ J, 2; −2.18 × 10⁻¹⁸ J, 1, an
   arrow E up the left side; 6.15 draws the same six levels with five
   arrows up from n = 1 and three up from n = 2 over "Electron moves to
   higher energy as light is absorbed", five down to n = 1 and three down
   to n = 2 over "Electron moves to lower energy as light is emitted". The
   image stops at n = 5 and rounds to three figures; the figure adds n = 6,
   which Example 6.5 jumps to, and writes the four figures the text's k =
   2.179 × 10⁻¹⁸ J gives (−2.421 × 10⁻¹⁹ J is Example 6.4's answer). The
   image colours each level differently for no stated reason; the rungs
   wear the energy hue. Opens on 3 → 2 in hydrogen, the red line; 4 → 6
   is Example 6.5 (7.566 × 10⁻²⁰ J, 2.626 × 10⁻⁶ m, infrared).
2. `sim-orbit-rung` · **Sim, replaces nothing** · bohr-orbit-radius,
   bohr-energy-levels, hydrogen-like-ions · value add: variation by choice;
   the section prints r = n²a₀/Z and Eₙ = −kZ²/n² and no picture of an
   orbit, and here the orbit and its rung are seen together: the orbits
   spread as n² while the rungs crowd toward E = 0, and a larger nuclear
   charge draws every orbit in · arrows: none · **still**: it answers its
   two choices · n (1 to 5, the levels of Figure 6.14, default 3, Example
   6.4's orbit) and atom or ion · headline: the pattern neither label
   states, "The n = 3 orbit is 9 times as wide as n = 1, and its electron
   takes 1/9 of the energy to remove." · no graph ·
   2D. Rebuilt on 2026-11-14: the orbits of n = 5 and 6 used to run off the
   frame, the ladder stood small in a blank half with eight crowded labels,
   and the headline repeated the readout. Now every orbit is inside the
   frame at one fixed scale (12.6 units to a Bohr radius), the ladder is as
   tall as the atom, only the chosen orbit is labelled, in a column clear of every orbit on a
   leader from the electron (the rest answer to the pointer, since their
   labels would collide once Z shrinks them, rule 26.7), and the readout works out both equations.
   works: parts: the nucleus, an ink dot with its charge; five circular
   orbits round it of radius n²a₀/Z; the electron on the chosen orbit and a
   dashed radius from the nucleus to it, in the length hue; a scale bar of
   5 a₀; on the right the ladder of the same five levels and E = 0, to
   scale, the electron on the chosen rung and a bracket from that rung up
   to E = 0, the energy that removes the electron · must hold: (1) the
   radii are in the ratio 1 : 4 : 9 : 16 : 25 at one scale for every ion,
   so He⁺ is half and Li²⁺ a third the size of hydrogen; (2) the rung of
   the chosen n is the one marked, and the bracket spans it to E = 0; (3)
   the labelled radius and energy are the readout's; (4) nothing is clipped
   or covered at n = 5 or at n = 1 of Li²⁺ · no image to read: the numbers
   are the text's, a₀ = 5.292 × 10⁻¹¹ m and k = 2.179 × 10⁻¹⁸ J.
3. `sim-series` · **Sim, replaces nothing** · rydberg-constant-recovered,
   photon-emission-absorption, calculating-bohr-transition-energies ·
   value add: variation by choice. The Rydberg equation gives one
   wavelength at a time; here the four series it gives stand one above the
   other on one wavelength axis, so the reader sees that each is the same
   crowding pattern in a different place, that only the lines ending on
   n = 2 reach the visible band in hydrogen, and that a larger Z slides
   every series toward shorter wavelengths without changing its shape ·
   arrows: none · **still** · n₁ (1 to 4, default 2) as a choice, n₂ (n₁ + 1
   to n₁ + 8, default 3) as a dropdown whose list follows n₁, atom or ion ·
   headline: how many lines of the chosen series are visible light · the
   graph is the picture, in two parts. Above, the four series on one
   logarithmic wavelength axis, 10 nm to 5000 nm (Li²⁺'s shortest limit is
   10.1 nm, hydrogen's 5 → 4 line 4051 nm), fixed for every choice; on a
   logarithmic axis a factor of Z² is one rigid shift. Below, the chosen
   series alone, spread out on a linear axis that runs from its limit to
   its longest wavelength: a zoom, whose range follows the choice, because
   on the shared axis a whole series is 60 to 120 units wide and its lines
   cannot be told apart · readout 1/λ = R∞Z²(1/n₁² − 1/n₂²) with the live
   numbers, then λ · 2D. Rebuilt on 2026-11-14: one thin strip in a blank
   stage, its lines bunched in 60 units, an "n₂ up to" control that changed
   the drawing and not the idea, and a readout that left n₂ a letter.
   works: parts: above, four rows, one for each n₁, each with one line for
   every n₂ up to 20 and a dashed line at the series limit, the chosen row
   at full strength with a frame round its lines and the others faint; the
   visible band, 400 to 700 nm, painted on the axis and marked through the
   rows by two faint lines, the three regions named over their columns.
   Below, the framed series again: every line up to n₂ = 40, the first
   eight numbered with their n₂ where there is room, the chosen line
   heavier with its wavelength, the limit dashed, the visible part of the
   stretch painted along the foot. A line in the visible band is drawn in
   its own colour, a line outside it in the wavelength hue · must hold: (1)
   in hydrogen the lines to n₁ = 2 from n₂ = 3, 4, 5, 6 stand at 656, 486,
   434 and 410 nm inside the visible band and the rest of that series in
   the ultraviolet, limit 364.6 nm; the row n₁ = 1 lies wholly in the
   ultraviolet and the rows 3 and 4 in the infrared; (2) every series
   crowds toward its dashed limit on the short-wavelength side; (3) the
   readout's wavelength is where the chosen line stands; (4) for He⁺ every
   line is at a quarter, for Li²⁺ a ninth, of hydrogen's wavelength, so the
   rows shift left together and the spread-out pattern keeps its shape · no
   image to read: R∞ = 1.097 × 10⁷ m⁻¹, which is k/hc from the text's
   constants to four figures. The ladder figure works its wavelength from
   ΔE as Example 6.5 does (656.5 nm for 3 → 2) and this one from R∞
   (656.3 nm); the two differ in the fourth figure because the text's
   constants carry four.
4. `fig-spectra` · **the unnumbered spectra plate**, `CNX_Chem_06_01_2spectra.jpg`,
   which the last exercise prints without a number (the book numbers the
   same file 6.13 in 6.1) · rydberg-constant-recovered · a faithful copy,
   kept as a `figure` row with no number whose eyebrow reads "Figure", as
   `config.md` decides: the validator refuses a `photo` row without a
   number, and root rule 14 asks that a figure serving an exercise be
   copied as it is. The image is copied into `media/ch06/` under the
   bundle's file name and stands in the `features` block; the exercise's
   card carries the same image through its `figure` field, so the reader
   sees the plate beside the question. `widths` stays empty, since the
   bundle gives no width · draws nothing.

Photographs: none in this section. Unnumbered images: the one above.
Figures that serve exercises: `fig-spectra` serves fs-idp97637648;
`sim-orbit-rung` reads out the radius that fs-idm7154736 asks for and the
energies that fs-idp44268800 and fs-idp171106816 ask for, and
`sim-bohr-ladder` reads out the photon energies of fs-idp21050416 and
fs-idp90797744, but none of those items is rewritten against a figure,
since each is a calculation the book sets in words.

The two Sims the chapter's `exploration.md` names for this section, the
orbit beside the rung and the series on a wavelength axis, are both built;
neither failed its own test. Judged and not built, as the exploration
says: an animation of the electron spiralling into the nucleus, which
would picture something that does not happen, and an ionization figure of
its own, since the ionization limit is a readout of the orbit-and-rung Sim.

3D: none; every figure is planar and drawn through `figlib`.

## Re-examined on 2026-11-14

All three drawn figures were set beside the book's images of Figure 6.14 and
6.15 and rebuilt; none was reverted, since each shows something the still
images cannot (the order of photon and jump, the orbit beside its rung, the
series side by side). The three had been built to share one small ladder and
one wavelength strip, so each stage was half empty and the same things were
drawn three times. Now each figure has one job: `sim-series` is the
spectrum, `sim-bohr-ladder` the ladder and one jump with its photon,
`sim-orbit-rung` the orbit beside its rung. The plan lines above are the
current ones; the dated passes below describe the figures as they were.

The chapter's `COLOR.md` was written before the element palette landed
and does not need it: no figure of this section draws an atom by element.
The nucleus and the electron are ink discs, as `COLOR.md` says.

## Tables

None numbered. The unnumbered Key Equations table is not printed; its
three rows are `eq-bohr-energy`, `eq-bohr-transition` and `eq-bohr-radius`
in `chapter.json`. No `div.book-table` is written.

## Exercises

- Inline, kind `check-your-learning`, with the book's answers: `cyl1` after
  `ex-bohr-energy` (the electron promoted to n = 6, −6.053 × 10⁻²⁰ J;
  number) and `cyl2` after `ex-transition` (He<sup>+</sup> from n = 5 to
  n = 3, 6.198 × 10⁻¹⁹ J and 3.205 × 10⁻⁷ m; multi).
- End, kind `exercise`, keyed and kept with the book's answer: `e2`
  fs-idp105537776 (what quantized means; open; Remember), `e3`
  fs-idp21050416 (n = 5 to n = 2 in hydrogen in electron volts, 2.856 eV;
  number; Apply), `e4` fs-idp171106816 (the lowest energy in
  He<sup>+</sup>, −8.716 × 10⁻¹⁸ J; number; Apply), `e5` fs-idp44268800 (n
  = 8 in hydrogen, −3.405 × 10⁻²⁰ J; number; Apply), `e6` fs-idm7154736
  (the radius of n = 8 in angstroms, 33.9 Å; number; Apply), `e7`
  fs-idp90797744 (Li<sup>2+</sup> from n = 2 to n = 1, 1.471 × 10⁻¹⁷ J;
  number; Apply), `e8` fs-idp24507936 (Bohr and Rutherford compared; open
  with the book's answer; Analyze).
- End, kind `exercise`, unkeyed and conceptual, kept with a suggested
  approach the page marks as OmniStax's own: `e1` fs-idp230795648 (why n =
  3 is bound less tightly than n = 1; Understand) and `e9` fs-idp97637648
  (what causes the lines of the hydrogen and calcium spectra and why
  calcium's is more complicated; Understand; carries the spectra plate in
  its card).
- Left out, unkeyed and numerical, no answer computed (root rule 13):
  fs-idp5349488 (the ionization energy of ground-state hydrogen),
  fs-idp205846816 (the lowest energy in Li<sup>2+</sup>), fs-idm55982592
  (n = 6 in hydrogen), fs-idp48379808 (the distance from the nucleus at
  −8.72 × 10⁻²⁰ J), fs-idp40494944 (He<sup>+</sup> from n = 5 to n = 2),
  fs-idp165455056 (the wavelengths from atoms spread over n = 1 to 4, in
  three parts).
- Two kept items lean on sections that are not built and stay here, as
  `config.md` decides: `e8` on the Rutherford atom of 2.2, whose book
  answer states that picture in full, and `e9` on the line spectra of 6.1,
  answered from this section's own claim that each line is one transition.
  Neither carries a `source_section`; `exercise_notes` says so.
- No item taken from a sibling section; none given away. No
  `simulation-exercise`.
- Weights: `e3` and `e7` give `calculating-bohr-transition-energies` the
  full value and `photon-emission-absorption` weight 2, since the photon
  relation is one step of the calculation; `e4` and `e5` give
  `bohr-energy-levels` the full value and `hydrogen-like-ions` weight 2
  where Z enters; `e6` gives `bohr-orbit-radius` the full value; `e1` gives
  `ground-and-excited-states` the full value and `bohr-orbit-radius` weight
  2; `e8` gives `classical-atom-instability` and `bohr-stationary-states`
  the full value; `e9` gives `rydberg-constant-recovered` the full value
  and `photon-emission-absorption` weight 2; `cyl2` gives
  `calculating-bohr-transition-energies` the full value and
  `hydrogen-like-ions` weight 2.

## Views

- Formulas: the seven equations of the chapter, all in this section, four
  of them important, anchored below.
- Definitions: the fourteen variable rows of the chapter and the four
  glossary terms.
- Concept map: the nine nodes above with their edges to 6.1's two
  placeholders and to Chapter 1.

## Colour

The page binds `energy` and `wavelength`, as `ch06/COLOR.md` plans:
`sim-bohr-ladder` draws the rungs, the arrow between them and the
E<sub>n</sub> and ΔE of its readout in the energy hue and the strip, its
axis and the λ of its readout in the wavelength hue; `sim-orbit-rung`
draws its ladder and E<sub>n</sub> in the energy hue; `sim-series` draws
its axis, its limit and its λ in the wavelength hue. The quantum numbers,
the nuclear charge, the orbit radius, the Bohr radius, h, c, k and
R<sub>∞</sub>, the nucleus and the electron are ink. The colours of the
visible band on the two strips are the colours of light and a physical
fact, as the book's `RULES.md` keeps them; a line outside the band is
drawn in the wavelength hue. `frequency` stays unbound: the page writes ν
once and draws no frequency.

## Wanted at chapter level

- variables `E_n` → 6.2-stationary-states
- variables `ΔE` → 6.2-stationary-states
- variables `n_quantum` → 6.2-stationary-states
- variables `Z` → 6.2-hydrogen-like
- variables `k` → 6.2-rydberg-recovered
- variables `r` → 6.2-orbit-radius
- variables `a_0` → 6.2-orbit-radius
- variables `E_i` → 6.2-stationary-states
- variables `E_f` → 6.2-stationary-states
- variables `λ` → 6.2-stationary-states
- variables `ν` → 6.2-stationary-states
- variables `h` → 6.2-stationary-states
- variables `c` → 6.2-stationary-states
- variables `R_inf` → 6.2-rydberg-recovered
- equations `eq-photon-energy-difference` → 6.2-stationary-states
- equations `eq-bohr-energy-hydrogen` → 6.2-stationary-states
- equations `eq-bohr-energy` → 6.2-hydrogen-like
- equations `eq-bohr-transition` → 6.2-rydberg-recovered
- equations `eq-rydberg-from-bohr` → 6.2-rydberg-recovered
- equations `eq-bohr-radius` → 6.2-orbit-radius
- equations `eq-ionization-limit` → 6.2-orbit-radius
- The `eq-bohr-transition` row states the general form with Z², which the
  book prints only in its Key Equations; the text's own display equation is
  the hydrogen form ΔE = k(1/n₁² − 1/n₂²) = hc/λ, and the page writes that
  one in `rydberg-recovered`. No change is needed, but the anchor above
  lands on the hydrogen form.
- The `eq-ionization-limit` row's `latex` writes E₁ in plain LaTeX while
  the page writes it as an energy; a `ktex` of
  `\kdE=\kE_{n\;\longrightarrow\;\infty}-\kE_{1}=0+k=k` would colour it on
  the sheet as the page does.

### What the chapter pass did with them (2026-09-12)

Every item above was applied. The fourteen variable rows and the seven
equation rows of `ch06/chapter.json` now carry the anchors this list asks
for, so that the formula sheet and the definitions view jump into the
header that states each one. The `eq-bohr-transition` row keeps the
general form with Z², as the plan says it should, and its anchor lands on
`6.2-rydberg-recovered`, where the page writes the hydrogen form. The
`eq-ionization-limit` row gained the `ktex` the plan proposed,
`\kdE=\kE_{n\;\longrightarrow\;\infty}-\kE_{1}=0+k=k`, so the sheet
colours its energies as the page does. The Formulas line of
`ch06/config.md` records that the anchors are written and corrects its
count of the variable rows from twelve to fourteen.

## Recoloured and re-controlled, 2026-09-12

Reviewed against root rules 7, 25 and 26 by Claude Fable 5.1. No colour
changes: the electron and the nucleus stay ink for the reason
`ch06/COLOR.md` gives, the energy and wavelength hues stay where they
are, and the visible band keeps its physical colours. The one addition
is rule 26.6: the electron of the Bohr ladder and the nucleus and
electron of the orbit-and-rung Sim name themselves under the pointer
through `F.hover`, so no disc in the section is unnamed. The quantum
number sliders are integer quantities and stay sliders.

## Figure audit pass, 2026-09-12

Brought up to the audit of the book's figures against `RULES.md`. Each line
below says what the figure now is: its tier, whether it moves, its controls,
whether it is flat or three-dimensional and with what bound, and whether its
labels are on.

- `sim-bohr-ladder` (Figure 6.14 + 6.15): a still Figure with no transport;
  a change of transition eases the electron once and draws the line to the
  strip once (rule 24.1). Controls: the two orbit
  sliders, and the atom or ion is now a row of buttons, H, He⁺ and Li²⁺,
  since three named species are states and never a quantity to slide through
  (rule 26.1). Flat. Three things the audit found are corrected. The rungs
  from n = 3 up lie within about fifty units of one another on a ladder drawn
  to scale, so they are drawn again in an inset magnified eight times, with
  the factor stated and the band it enlarges outlined on the ladder (rule
  28.4); the jump between two of them is drawn in the inset as well. The
  transition arrow is notation and now stands still at its full length while
  only the electron moves (rule 24.1). The word "electron" is
  set beside the electron with a leader back to it, and never on the rung it
  sits on. Labels on: the rung names, the two axis names and the inset's are
  the frame, and the electron carries a hover name.
- `sim-orbit-rung` (Sim): a still simulation. Controls: the orbit slider,
  now stopping at n = 6 rather than n = 8, and the same three ion buttons.
  Flat. The canvas scale is fixed at 7.5 units to the Bohr radius, which is
  what holds the largest orbit the buttons reach inside the frame; n = 7 and
  n = 8 were off the frame and told apart by nothing, so they are gone.
  Labels on, the ladder's names fanned into slots and tied back by leaders,
  with hover names on the nucleus and the electron.
- `sim-series` (Sim): a still simulation. Controls: two orbit sliders and the
  ion buttons. Flat. The highest orbit is now clamped by moving its own
  control rather than silently overridden when it falls at or below the orbit
  the electron falls to (rule 24.6), and the ultraviolet count is taken at
  400 nm, the same boundary the visible band uses, so the three counts add up
  to the number of lines (rule 24.7). Labels on.
- `fig-spectra` (Figure): a kept image, not redrawn; a `figure` row with no
  number whose eyebrow reads "Figure", which is the row this book gives an
  unnumbered image that is kept rather than redrawn, now recorded in the
  book's `RULES.md` as well as in `ch06/config.md`. No controls, flat.
- Colour: the nucleus and the electron stay in ink. A nucleus drawn without
  its electrons is not yet an atom of any element and an electron belongs to
  no element at all, so neither can take an element colour; the book's
  `COLOR.md` now says so in a sentence of its own. The colours of the visible
  band are the colours of light and stay a physical fact.

## Manim duplicates

- Merged, 2026-09-28 (Claude Opus 5.5): `sim-bohr-ladder-style` is folded into `sim-bohr-ladder`, which keeps the book's number. From it the figure takes the equation that morphs by meaning, ΔE = kZ²(1/n₁² − 1/n₂²) = … J becoming Eₙ = −kZ²/n² = … J where n_i = n_f (k, Z² and their values move; 1/n₁² bends into n²; ΔE and Eₙ have no counterpart and cross-fade), the dashed circle on each orbit slider at the other's value (the same orbit: no photon), and the bracket that gathers the labels of the rungs from n = 3 up so no leader is crossed. The wavelength λ = hc/|ΔE| moves to the sentence beneath the equation (one equation). The thicker rungs and plate-less labels were restyling and are not kept. The duplicate's row and figure element are removed.

## Figure pass, 2026-09-28 (Claude Opus 5.5)

Judged against `docs/prompts/manim-style.md`; only the figures below changed.

- `sim-orbit-rung` · readout Eₙ alone, the radius in the sentence (manim 12); the ion choice bends every orbit to its new radius (manim 15/16).
- `sim-series` · readout one equation, the longest wavelength in the sentence (manim 12); the ion choice slides every line to its new wavelength (manim 16).

## Derivations

- `stationary-states`, the Bohr energy levels Eₙ = −k/n² (and the orbit radius) · score 13 · not built: Bohr's derivation rests on Coulomb's law, circular motion and the angular-momentum postulate, none of which the book states; the book says only that k comprises fundamental constants.
- `rydberg-recovered`, the Rydberg equation from Bohr's levels · score 5, a printed block · built as drv-rydberg-equation: the energy levels put into Bohr's photon equation and solved for 1/λ, then matched with Rydberg's formula of 6.1 to give R∞ = k/hc. The work keeps |ΔE|, as the book's photon equation does, and inserts the line with the two levels substituted. The block's lines and its "Inserting …", "or" and "which is identical …" phrases are replaced; the sentence on k and the paragraph on Bohr's agreement stay.
- `orbit-radius`, the ionization energy ΔE = E∞ − E₁ = k · score 0 · not built (found in the re-read, not in the scan): one printed line substituting the section's formula at n = 1 and n → ∞.
