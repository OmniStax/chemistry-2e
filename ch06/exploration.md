# Exploration: Chemistry 2e, Chapter 6 Electronic Structure and Periodic Properties of Elements

Written 2026-09-12, before the chapter was prepared. The source of record is
the CNXML bundle at `source/osbooks-chemistry-bundle/`; the six modules of the
chapter were converted with `python3 tools/convert.py 6` and 6.2 was read in
full, with the other five read far enough to number the chapter's figures and
tables and to see what 6.2 leans on. The book's organisation, its apparatus
and its conventions are as `exploration.md` beside `RULES.md` records them for
the whole book; nothing in this chapter departs from that account.

Only 6.2, The Bohr Model, is built in this pass. Chen asked for the three
sections of the book with the richest opportunity for interactive simulation
to be built as showcases in one job, and 6.2 is one of them. The chapter has
no introduction page yet and the other four sections are not built, so this
file prepares the whole chapter only as far as 6.2 needs it: the module table
and the figure and table numbers are for the chapter, and everything after
them is for the one section.

## Why this section

The Bohr model is the book's first quantitative model of an atom, and it is
the place where two things the reader has met separately become one thing.
Chapter 2 gave the reader a nucleus with electrons about it; 6.1 gave the
reader a photon whose energy is set by its frequency, and a line spectrum that
classical physics cannot explain. The section puts them together: the electron
is allowed only certain energies, and the light an atom gives off is the
difference between two of them. Everything the reader meets afterwards, the
quantum numbers of 6.3, the filling order of 6.4 and the periodic trends of
6.5, rests on the postulate this section makes.

## Chapter 6 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline
images, Eq. = marked display equations, Defs = glossary entries, CYL = Check
Your Learning items (every one keyed), Exer. = end-of-chapter exercises,
Keyed = those carrying the book's own solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68728 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 6.1 Electromagnetic Energy | m68729 | 3 | 12 (5 photos, 7 sketches) | 0 | 1 unnumbered | 8 | 17 | 3 | 15 | 8 | 1 everyday-life, 1 chemist-portrait, 2 link-to-learning |
| 6.2 The Bohr Model | m68732 | 2 | 2 sketches | 1 | 1 unnumbered | 15 | 4 | 2 | 15 | 7 | — |
| 6.3 Development of Quantum Theory | m68733 | 4 | 8 | 2 | 4 (1 numbered) | 9 | 17 | 4 | 15 | 8 | 3 link-to-learning |
| 6.4 Electronic Structure of Atoms | m68734 | 2 | 6 | 13 | 0 | 1 | 7 | 2 | 21 | 10 | — |
| 6.5 Periodic Variations in Element Properties | m68735 | 2 | 6 | 1 | 2 (both numbered) | 4 | 5 | 2 | 20 | 10 | 1 link-to-learning |

Eighty-six exercises in the chapter, forty-three of them keyed, which is the
odd-numbered half of the book's own list as the Preface promises; the parity
runs over the publisher's chapter-wide numbering, so within 6.2's own list it
is the second, fourth, sixth and following items that carry the answer, not
the first. Fifteen Check Your Learning items, all of them keyed. Fifty
glossary entries.

## The figure numbers

The book numbers figures chapter-wide on openstax.org, beginning with the
introduction's splash photograph as Figure 6.1. The chapter's thirty-five
numbered figures, in book order:

| Section | Numbers | What they are |
|---|---|---|
| Intro | 6.1 | photograph: the Crab Nebula |
| 6.1 | 6.2 to 6.13 | the wave and its wavelength (6.2), the electromagnetic spectrum (6.3), the radio-wave technologies (6.4) and AM and FM (6.5) in the everyday-life note, the interference fringes (6.6), the vibrating string (6.7) and the vibrating drumhead (6.8), the solar distribution (6.9), the blackbody curves (6.10), the photon energies (6.11), the neon sign (6.12), the continuous spectrum beside four line spectra (6.13) |
| 6.2 | 6.14, 6.15 | the hydrogen energy levels with their energies (CNX_Chem_06_02_Hlevels), and the same levels with the absorption and emission arrows drawn between them (CNX_Chem_06_02_BohrArrows) |
| 6.3 | 6.16 to 6.23 | water waves, electron waves, the electron-in-a-box, the quantum numbers, the s orbital, the orbital shapes, the subshells, electron spin |
| 6.4 | 6.24 to 6.29 | the energy-level diagram, the electron configuration notation, the filling order, the configuration table, the valence electrons, the periodic table by configuration |
| 6.5 | 6.30 to 6.35 | the covalent radii table, the radius graph, the ionic radii, the first ionization energy graph and table, the electron affinities |

The one unnumbered inline image of 6.2 is `fs-exercise`, which prints
`CNX_Chem_06_01_2spectra.jpg`, the same continuous-and-line-spectra plate the
book numbers as Figure 6.13 in 6.1, inside the last exercise of the section.
The book prints it without a number there, so it stays unnumbered on the page.

## The tables

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 6.1 | 6.3 | fs-idm21167392 | Quantum Numbers, Their Properties, and Significance |
| Table 6.2 | 6.5 | fs-idp28766560 | Covalent Radii of the Halogen Group Elements |
| Table 6.3 | 6.5 | fs-idp3693744 | First Ionization Energies of Some Elements |

**Section 6.2 prints no numbered table.** Its one `> TABLE` block is the
unnumbered one-column Key Equations table, which is the book's own formula
sheet and goes to `chapter.json`'s equations rather than into the text. Three
further unnumbered tables sit in 6.3. So no `div.book-table` is written on the
6.2 page.

## The worked examples

The book numbers its worked examples chapter-wide as it numbers its figures.
6.1 carries Examples 6.1, 6.2 and 6.3, so 6.2's two examples are **Example
6.4**, "Calculating the Energy of an Electron in a Bohr Orbit", and **Example
6.5**, "Calculating the Energy and Wavelength of Electron Transitions in a
One–electron (Bohr) System". A heading reads "Example 6.4 · Calculating the
Energy of an Electron in a Bohr Orbit", never a number built from the section.

## The Link to Learning notes and the PhET items

**Section 6.2 has none.** The chapter's six Link to Learning notes are all in
6.1, 6.3 and 6.5, and none of them is a PhET simulation of what 6.2 teaches.
The section's `notes` therefore names no dropped link, and the section carries
no `simulation-exercise` item: every end-of-chapter exercise of 6.2 is a
question about the model, not an instruction to open an outside simulation.

## The exercises, and what they lean on

Fifteen items, seven of them keyed. The key runs by the publisher's
chapter-wide numbering, so in this section's own list the even-placed items
carry the book's answer.

| Kept | Id | What it asks | Answer |
|---|---|---|---|
| yes | fs-idp230795648 | why an electron with n = 3 is bound less tightly than one with n = 1 | unkeyed, conceptual: kept with a suggested approach marked as OmniStax's own |
| yes | fs-idp105537776 | what it means to say the energy of the electrons is quantized | the book's |
| no | fs-idp5349488 | the energy to ionize a ground-state hydrogen atom | unkeyed, numerical |
| yes | fs-idp21050416 | the photon energy in electron volts for n = 5 to n = 2 in hydrogen | the book's |
| no | fs-idp205846816 | the lowest energy for the electron in Li<sup>2+</sup> | unkeyed, numerical |
| yes | fs-idp171106816 | the lowest energy for the electron in He<sup>+</sup> | the book's |
| no | fs-idm55982592 | the energy of an electron with n = 6 in hydrogen | unkeyed, numerical |
| yes | fs-idp44268800 | the energy of an electron with n = 8 in hydrogen | the book's |
| no | fs-idp48379808 | the distance from the nucleus at a given energy | unkeyed, numerical |
| yes | fs-idm7154736 | the radius of the n = 8 orbit in angstroms | the book's |
| no | fs-idp40494944 | the photon energy for n = 5 to n = 2 in He<sup>+</sup> | unkeyed, numerical |
| yes | fs-idp90797744 | the photon energy for n = 2 to n = 1 in Li<sup>2+</sup> | the book's |
| no | fs-idp165455056 | how many wavelengths come from atoms spread over n = 1 to 4, and their energies and frequencies | unkeyed, numerical, in three parts |
| yes | fs-idp24507936 | how the Bohr and Rutherford models are alike and how they differ | the book's |
| yes | fs-idp97637648 | what causes the lines in the hydrogen and calcium spectra, and why calcium's is the more complicated | unkeyed, conceptual: kept with a suggested approach, and it prints the unnumbered spectra plate |

Six unkeyed numerical items are left out and named in `exercise_notes`; no
answer is computed (root rule 13).

Two items lean on material the reader meets in a section that is not built,
and both are kept here rather than held, since the section that would carry
them is not a page yet and 6.2 is where the reader is standing when the
question makes sense:

- **fs-idp24507936**, the Bohr and Rutherford comparison, wants the nuclear
  atom of 2.2. The book's own answer states the Rutherford picture in full, so
  the reader who has only this page can still follow it; the item is tagged to
  6.2's concepts and `exercise_notes` says where the Rutherford model is
  introduced.
- **fs-idp97637648**, the two spectra, wants the line spectra of 6.1. The
  answer the section can support is 6.2's own: each line is one transition
  between two allowed energies, the colour is the size of the energy
  difference, and calcium has more electrons and so more allowed differences.
  It is kept with a suggested approach and no `source_section`, since 6.1 is
  not built and there is no page to take it from.

## What 6.2 leans on, and the placeholders

The section rests on three things from outside itself. Two are ideas of 6.1
and are staged as placeholder concept nodes, rows whose `section` is 6.1 and
which carry a `why` but no evidence, so the edges out of 6.2's nodes resolve:

- `photon-energy` — light is carried in photons whose energy is set by the
  frequency, E = hν = hc/λ;
- `line-spectra` — an excited gas emits light at a few sharp wavelengths
  rather than over a continuous band.

The third, the nuclear atom of 2.2, is not staged: a placeholder whose section
belongs to another chapter would be a row `ch06` does not own, and the merge
tool assigns a concept to the chapter its section sits in. The edges that
would have pointed at it point at Chapter 1's `atoms-and-molecules` instead,
which is the built node closest to what the section assumes.

## What a live figure could show in this section that print cannot

Root rule 23, answered for 6.2. The book's answer to why this section is hard
is that its argument runs between three pictures that print can only set side
by side: a ladder of allowed energies, an electron that moves between two
rungs, and a coloured line in a spectrum. The reader is asked to believe that
the third is caused by the first two. One canvas that holds all three, and one
pair of knobs that sets the jump, makes the causation something the reader
does rather than something the reader is told.

**Figure 6.14 + 6.15, the Bohr ladder (interactive, moving).** The book draws
the levels twice, once with their energies written beside them and once with
arrows between them, which is print drawing one scene in two frames because it
cannot move; root rule 14 folds them. The figure draws the levels of a
hydrogen-like atom to scale, the reader sets the initial and the final
quantum number, the electron travels between the two rungs, a photon of the
right colour leaves the atom when it falls or arrives when it rises, and the
line lands on a wavelength strip beneath, where the lines already drawn stay.
The readout writes ΔE = kZ²(1/n₁² − 1/n₂²) and λ = hc/|ΔE| in live numbers.
It moves, and it is the only figure of the section that does: the jump and the
photon that leaves are an event with a time in it, so the figure registers a
cycle and carries the app's transport. Its sliders are n<sub>i</sub> and
n<sub>f</sub>, 1 to 6, and the nuclear charge Z, 1 to 3, all three untyped and
drawn in ink; the energy of a rung and of the jump wears the energy hue, and
the wavelength strip and the λ readout wear the wavelength hue. It needs no
projection and no three.js.

**Sim: the orbit and the rung (still).** The energies crowd toward zero as n
grows while the orbits spread as n², and these are the same fact seen from two
sides. Print prints one expression for each and draws neither. The Sim puts
the circular orbits of r = n²a₀/Z on the left and the energy ladder on the
right, with one n slider moving a marker on both, so the reader watches the
rungs close up while the circles run off the canvas, and reads the ionization
limit as the place the two descriptions meet. Sliders: n, 1 to 8, and Z, 1 to
3, both untyped and in ink; the ladder and the E readout wear the energy hue,
the radius is a length and stays in ink. It answers its sliders and nothing
else, so it registers no cycle and gets no transport.

**Sim: the series (still).** The reader picks a floor n₁ and the figure draws
every transition down to it from n₁+1 upward as a line on a wavelength axis
with the visible band painted, so the Lyman series stands in the ultraviolet,
the Balmer series puts exactly four lines in the visible where the book's
Figure 6.13 photographs them, and each series crowds to its own limit. This is
the one figure that closes the loop the section opens, from a model to a
measured spectrum, and print can only show the finished plate. Sliders: n₁, 1
to 4, the highest n₂ drawn, 2 to 12, and Z, 1 to 3, all untyped and in ink;
the axis and the lines wear the wavelength hue, and the visible lines are
painted in the colours of visible light, which `RULES.md` keeps as a physical
fact rather than a type. Still: nothing in a family of transitions has a clock
in it.

Judged and not built: an animation of the electron spiralling into the nucleus
under classical electromagnetism, which would be a picture of something that
does not happen and would take the paragraph's argument away from the prose;
and an ionization figure of its own, since the ionization limit is a readout
on the orbit-and-rung Sim rather than a picture of its own.
