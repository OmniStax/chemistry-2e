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
   ground-and-excited-states, hydrogen-like-ions · **moving**: an electron
   that travels between two rungs and a photon that leaves the atom or
   arrives at it are an event with a time in it, so the figure registers a
   cycle of five seconds and gets the app's transport with a scrubber · three
   sliders, all untyped and in ink since a quantum number and a nuclear
   charge are labels rather than quantities: n<sub>i</sub> (1 to 6, default
   3), n<sub>f</sub> (1 to 6, default 2) and Z (1 to 3, default 1) · "The
   electron falls from n = 3 to n = 2 in hydrogen and the atom emits a
   photon of 656 nm, which is red light." · the scene is the ladder: the
   levels n = 1 to 6 and the ionization limit drawn to scale in the energy
   hue with each rung's energy written beside it as Figure 6.14 writes
   them (the labels of the crowded upper rungs fan out on leaders), the
   arrow between the two chosen rungs in the energy hue as Figure 6.15
   draws it, the electron as an ink disc that slides from one rung to the
   other, the photon as a wave packet that leaves the ladder for the strip
   after an emission or arrives from the strip before an absorption; the
   graph beneath is a wavelength strip in the wavelength hue, logarithmic
   from 10 nm to 10 000 nm so that the ultraviolet, the visible band and
   the infrared all fit one fixed frame at every Z, with the visible band
   painted in the colours of light, and every line the reader has landed
   stays on it · readout ΔE = kZ²(1/n₁² − 1/n₂²) and λ = hc/|ΔE| with the
   live numbers, ΔE in the energy hue and λ in the wavelength hue · the
   fold is the one `config.md` states: the book drew one scene twice
   because print cannot move, and one figure that moves the electron and
   writes the energies says both · defaults reproduce the red Balmer line
   of hydrogen, the one line of Figure 6.13 the reader can see land in the
   visible; setting n<sub>i</sub> = 4 and n<sub>f</sub> = 6 reproduces
   Example 6.5 · draws energy, wavelength.
2. `sim-orbit-rung` · **Sim, replaces nothing** · bohr-orbit-radius,
   bohr-energy-levels, hydrogen-like-ions · **still**: a set of orbits and a
   ladder answer their sliders and nothing else, so it registers
   `update: () => {}`, no cycle and no transport · two sliders, untyped and
   in ink: n (1 to 8, default 3) and Z (1 to 3, default 1) · "In hydrogen
   the n = 3 orbit has a radius of 9 a₀, which is 4.76 Å, and the electron
   in it has an energy of −2.421 × 10⁻¹⁹ J." · no graph: the left panel
   draws the circular orbits r = n²a₀/Z at a fixed scale of 12 canvas units
   per Bohr radius with the nucleus at the centre and the chosen orbit and
   its electron in ink, and the orbits of large n run off the frame, which
   is the point; the right panel is the energy ladder for n = 1 to 8 with
   the ionization limit, in the energy hue, with a marker on the chosen rung
   and a bracket from it to E = 0 for the energy that would remove the
   electron · readout E<sub>n</sub> = −kZ²/n² and r = n²a₀/Z with the live
   numbers, E<sub>n</sub> in the energy hue, r in ink since a length is
   untyped · what print cannot show: the energies crowding toward zero
   while the orbits spread as n², the same fact seen from two sides, and
   the ionization limit as the place the two descriptions meet · defaults
   reproduce Example 6.4; n = 8 in hydrogen reads 33.9 Å, the answer of
   exercise fs-idm7154736 · draws energy.
3. `sim-series` · **Sim, replaces nothing** · rydberg-constant-recovered,
   photon-emission-absorption, calculating-bohr-transition-energies ·
   **still**: a family of transitions has no clock in it, so it registers
   `update: () => {}`, no cycle and no transport · three sliders, untyped
   and in ink: n₁, the orbit the electron falls to (1 to 4, default 2),
   the highest n₂ drawn (3 to 12, default 8) and Z (1 to 3, default 1) ·
   "In hydrogen the transitions from n₂ = 3 to 8 down to n₁ = 2 give six
   lines from 656 nm to 389 nm, four of them in the visible, crowding
   toward the series limit at 365 nm." · the graph is the picture: a
   wavelength axis in the wavelength hue, logarithmic from 10 nm to
   10 000 nm as in the folded Figure so that every series and every Z fits
   one fixed frame, the visible band painted in the colours of light, one
   line per transition labelled with its n₂, and the series limit as a
   dashed line in the wavelength hue · readout 1/λ = (k/hc) Z² (1/n₁² −
   1/n₂²) with k/hc = 1.097 × 10⁷ m⁻¹ and the first line's wavelength ·
   what print cannot show: the finished plate of Figure 6.13 is the end of
   this loop, and here the reader closes it, watching four lines land in
   the visible for n₁ = 2 in hydrogen, the whole family move into the
   ultraviolet for n₁ = 1 or for a larger Z, and every series crowd to its
   own limit · draws wavelength.
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
