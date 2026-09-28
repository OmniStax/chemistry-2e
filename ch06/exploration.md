# Exploration: Chemistry 2e, Chapter 6 Electronic Structure and Periodic Properties of Elements

Written 2026-09-12 for 6.2, The Bohr Model, and extended on 2026-09-28 to the
whole chapter before its other sections were built. The source of record is
the CNXML bundle at `source/osbooks-chemistry-bundle/`; the six modules were
converted with `python3 tools/convert.py 6` and every `source.md` was read in
full. The book's organisation, its apparatus and its conventions are as the
book's `exploration.md` records them; nothing in this chapter departs from
that account. What this file says of 6.2 is kept as written on 2026-09-12,
under "Section 6.2" below.

## Why this chapter

The chapter walks from light to the periodic table in one argument. 6.1
shows light behaving as a wave and as a particle, and ends on three
paradoxes classical physics cannot resolve; 6.2 quantizes the hydrogen atom
and recovers its spectrum; 6.3 replaces the orbit by a wave and the wave by
a probability, and names the four quantum numbers; 6.4 fills the orbitals
atom by atom until the periodic table explains itself; 6.5 reads size and
energy off that table. Every section rests on the one before, and the
concept graph says so.

## Chapter 6 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered images,
Defs = glossary entries, CYL = Check Your Learning items (every one keyed),
Exer. = end-of-chapter exercises, Keyed = those carrying the book's own
solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68728 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 6.1 Electromagnetic Energy | m68729 | 3 | 12 (5 photos, 7 sketches and graphs) | 0 | Key Equations only | 17 | 3 | 15 | 8 | 1 everyday-life, 1 chemist-portrait, 2 link-to-learning |
| 6.2 The Bohr Model | m68732 | 2 | 2 sketches | 1 (exercise) | Key Equations only | 4 | 2 | 15 | 7 | — |
| 6.3 Development of Quantum Theory | m68733 | 4 | 8 (1 photo) | 2 (exercises) | Table 6.1, two unnumbered in Example 6.9, one in a key | 17 | 4 | 15 | 8 | 3 link-to-learning |
| 6.4 Electronic Structure of Atoms | m68734 | 2 | 6 | 13 (8 in text and Example 6.10, 5 in a key) | 0 | 7 | 2 | 21 | 10 | — |
| 6.5 Periodic Variations in Element Properties | m68735 | 2 | 6 | 1 (in text) | Tables 6.2 and 6.3 | 5 | 2 | 20 | 10 | 1 link-to-learning |

Eighty-six exercises, forty-three keyed (the odd-numbered half by the
publisher's chapter-wide numbering, so within a section the parity may
start on either item). Thirteen Check Your Learning items, all keyed (the
count of fifteen written on 2026-09-12 was wrong). Fifty glossary entries.

## The figure numbers

Chapter-wide on openstax.org from the opener as Figure 6.1, checked on the
6.5 page on 2026-09-28:

| Section | Number | Bundle file | What it is | Proposal |
|---|---|---|---|---|
| Intro | 6.1 | CNX_Chem_06_00_CrabNeb | the Crab Nebula | kept photograph (built) |
| 6.1 | 6.2 | _06_01_Frequency | waves of three frequencies, two amplitudes | moving Figure: a travelling wave, ν and amplitude sliders, λ bracket, readout c = λν |
| 6.1 | 6.3 | _06_01_emspectrum | the electromagnetic spectrum with photos | still Figure: a log wavelength axis with regions, a λ slider across twelve decades, readouts ν and E = hc/λ; the book's photo strip stays in `originals` |
| 6.1 | 6.4 | _06_01_RadioCell | three radio and cell towers (Everyday Life note) | photograph; a stock scene beside a note, dropped or kept by 6.1's plan |
| 6.1 | 6.5 | _06_01_AMFM | AM and FM modulation (note) | moving Figure, choice AM / FM, one signal |
| 6.1 | 6.6 | _06_01_LiteInterf | interference fringes of four colours | kept photograph (the text points at it) |
| 6.1 | 6.7 | _06_01_Vibrstring | standing waves on a string | moving Figure, choice n = 1 to 4 (or more), nodes marked, readout n − 1 nodes |
| 6.1 | 6.8 | _06_01_Vibratdrum | Chladni drumhead photos | kept photograph (the text points at it) |
| 6.1 | 6.9 | _06_01_Solardist | solar spectrum against a 5250 °C blackbody | faithful copy, or folded into 6.10 as its 5250 °C state; measured data the book does not tabulate |
| 6.1 | 6.10 | _06_01_Blackbody | blackbody curves at four temperatures | still Figure: T slider with the book's four as detents, λ_max marker and its locus, the classical curve as a choice that shows the ultraviolet catastrophe |
| 6.1 | 6.11 | _06_01_Ephoton | photoelectric effect at 700, 550, 400 nm | moving Figure: λ slider, metal choice, threshold as a special, electrons leave only above it; the PhET link's Sim of our own |
| 6.1 | 6.12 | _06_01_neon | a neon sign | kept photograph |
| 6.1 | 6.13 | _06_01_2spectra | continuous spectrum and the lines of Na, H, Ca, Hg | kept as a faithful image (measured spectra); 6.2 already reuses the file unnumbered in an exercise |
| 6.2 | 6.14, 6.15 | _06_02_Hlevels, _06_02_BohrArrows | hydrogen levels, and with arrows | built: one moving Figure 6.14 + 6.15 |
| 6.3 | 6.16 | _06_03_waterw | interference of water waves | kept photograph |
| 6.3 | 6.17 | _06_03_elecw | electron wave about a circular orbit | still Figure: n choice, and a continuous wavelength slider whose non-integer states fail to close the wave |
| 6.3 | 6.18 | _06_03_Electrnin | (a) electron interference, (b) build-up over time | moving Figure: electrons arrive one at a time and the fringes emerge; a clock is the whole point |
| 6.3 | 6.19 | _06_03_Qnumbers | shells numbered about a nucleus | faithful copy, or folded with 6.22 as a shell-and-subshell ladder by 6.3's plan |
| 6.3 | 6.20 | _06_03_sorbit | 1s, 2s, 3s cutaways and their radial graphs | mathematical 3D: n choice, a cutaway density cloud through `F.view3d` above a flat radial graph with its n − l − 1 nodes marked |
| 6.3 | 6.21 | _06_03_Oshapes | shapes of s, p, d and f orbitals | mathematical 3D: l and m_l choices, lobes signed with `F.cat`, free orbit, auto-rotate |
| 6.3 | 6.22 | _06_03_subshells | subshell energies of a multi-electron atom | still flat Figure, energy axis, a choice of hydrogen (degenerate) against a many-electron atom |
| 6.3 | 6.23 | _06_03_spin | spin up and down in a field | locked view of the two spinning spheres, faithful, no sliders |
| 6.4 | 6.24 | _06_04_eLeveldiag | orbital energy-level diagram | the centre of the section: an Aufbau builder, Z slider, electrons dropping into boxes by the Pauli principle and Hund's rule, configuration readout; the unnumbered orbital diagrams of H to Ne are its states |
| 6.4 | 6.25 | _06_04_Econfig | parts of the notation 1s¹ | faithful copy |
| 6.4 | 6.26 | _06_04_Efillorder | diagonal filling-order mnemonic | faithful copy, or a still Figure that lights the diagonal as the builder's Z rises (6.4's plan) |
| 6.4 | 6.27 | _06_04_Econtable | partial periodic table of filling subshells | fold with 6.29 into one periodic table Figure, blocks by `F.cat`, hover for each element's configuration from the elements sheet |
| 6.4 | 6.28 | _06_04_Valence | core and valence of sodium | faithful copy |
| 6.4 | 6.29 | _06_04_Ptableconf | configuration of every element | see 6.27 |
| 6.5 | 6.30 | _06_05_CovalradiT | (a) halogen radii from bond lengths, (b) radii to scale on the table | (a) locked view of the four molecules with Table 6.2's numbers; (b) a still Figure of circles to scale on the table, `F.el` |
| 6.5 | 6.31 | _06_05_Radiigraph | radius against Z | still Figure, one trends graph with a property choice (radius, IE₁), hover names; may fold 6.33 |
| 6.5 | 6.32 | _06_05_Ionradii | Al, S and their ions | locked view with an element choice |
| 6.5 | 6.33 | _06_05_Firstiongr | IE₁ against Z | see 6.31 |
| 6.5 | 6.34 | _06_05_Firstionen | IE₁ on a periodic table | still Figure, heat map of the book's printed values |
| 6.5 | 6.35 | _06_05_Elaffin | electron affinities on a periodic table | still Figure, same frame as 6.34 |

## The tables

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 6.1 | 6.3 | fs-idm21167392 | Quantum Numbers, Their Properties, and Significance |
| Table 6.2 | 6.5 | fs-idp28766560 | Covalent Radii of the Halogen Group Elements |
| Table 6.3 | 6.5 | fs-idp3693744 | Successive Ionization Energies for Selected Elements (kJ/mol) |

The title written for Table 6.3 on 2026-09-12 was wrong and is corrected
here. Table 6.3 prints K's IE₂, 3051.8, in red, to mark the jump to the core.

## The worked examples

6.1: Examples 6.1 (frequency of a sodium streetlight), 6.2 (energy of a
neon photon), 6.3 (the photoelectric effect). 6.2: 6.4 and 6.5. 6.3: 6.6
(wavelength of a particle), 6.7 (shells and subshells), 6.8 (maximum number
of electrons), 6.9 (completing a table of orbitals). 6.4: 6.10 (quantum
numbers and configurations, phosphorus), 6.11 (configurations of ions).
6.5: 6.12 (sorting atomic radii), 6.13 (ranking ionization energies).

## Link to Learning notes and PhET items

Six, all dropped and named in `notes`: 6.1 the kettle-drum radial nodes
video and the photoelectric-effect simulation (the trigger for 6.1's Sim of
our own); 6.3 the Dr. Quantum double-slit cartoon, the uncertainty article
and the Schrödinger's cat story; 6.5 the periodic-trends visualizations (the
trigger for 6.5's trends Sim). No end-of-chapter item opens a simulation, so
there is no `simulation-exercise`.

## Exercises per section, keyed and unkeyed

- **6.1**: 15, 8 keyed. The seven unkeyed are all numerical (fs-idm65612800,
  fs-idp23451200, fs-idp158798576, fs-idm74058400, fs-idp80961152,
  fs-idp181189472, fs-idp156427216) and are left out.
- **6.2**: as below, 15 items, 7 keyed, 6 left out.
- **6.3**: 15, 8 keyed. The seven unkeyed (fs-idm185773696, fs-idp16534928,
  fs-idm65709728, fs-idm109521552, fs-idm109481472, fs-idm165892704,
  fs-idm68696640) are conceptual and kept with a suggested approach.
- **6.4**: 21, 10 keyed, 11 unkeyed, none numerical: configurations, orbital
  diagrams, "which atom" items and fs-idp42173648 (pick from Li, B, N, F, Ne),
  kept with a suggested approach or as an open item with its options.
  fs-idp81167248 counts protons and neutrons (2.3) and stays, since its
  configurations are 6.4's.
- **6.5**: 20, 10 keyed, 10 unkeyed, none numerical. Three items belong to
  6.4, which relates configurations to groups: fs-idm150214960 (keyed,
  group of ns²np³), fs-idm121823200 (unkeyed, group of ns²) and
  fs-idp177066416 (unkeyed, why Al is in group 13). They move to 6.4 with
  `source_section` 6.5, leaving 6.5 with 17 (9 keyed) and 6.4 with 24 (11
  keyed).

## Errata carried as printed

6.1: Figure 6.9's caption says "the blue curve" where the drawing's curve
is grey; "Neils Bohr" at the end of Line Spectra. 6.3: "the special
distribution of the probability" (spatial); Example 6.7 writes "*m* can have
values" for m_l; the key of fs-idm127368704 writes m₁ for m_l;
fs-idm68696640 writes E = mν²/2 and λ = h/mν with ν where v is meant. The
converter's stray `**` in the CYL answer "2**s" (Example 6.7) and in the key
of fs-idm5890656 is conversion residue, not the book's, and is dropped.

## Depth under root rule 28

Mathematical 3D: the orbitals, 6.20 and 6.21 (the book's rules settle
orbitals as 3D). Locked views: 6.23, 6.30(a), 6.32. Candidate bench: 6.18
by the book's apparatus rule, though its lesson is the flat screen. Flat:
everything else, including every spectrum, graph, ladder, orbital diagram
and periodic table.

## What a live chapter could show that print cannot (root rule 23)

The chapter's hard idea is that discreteness comes from waves: a string
that only fits whole half-wavelengths, an electron wave that only closes on
itself at whole numbers, an orbital that has n − l − 1 nodes. One visual
thread can run through all of it: in 6.1 the reader plucks the string and
sees only integers survive; in 6.3 the same reader drags a wavelength
around an orbit and watches it fail to close except at integers, then sees
the standing wave become a cloud with the same count of nodes; in 6.4 the
reader drags Z and watches the table fill box by box, with chromium and
copper as named specials where an electron jumps; in 6.5 the reader sees
the same filling as a sawtooth of radius and ionization energy. The
blackbody curve with its classical twin running off to infinity, and the
electron double slit whose fringes emerge one dot at a time, are the two
moments where the reader sees classical physics fail.

The elements sheet (`sheets/elements.json`) carries a configuration,
first ionization energy and covalent radius for every element, from
standard reference values; they differ from the book's printed numbers in
places (Cl radius 102 pm against Table 6.2's 99 pm, F 57 against 64). A
figure uses the book's numbers wherever the book prints them, and says in
its caption where a value comes from the sheet.

# Section 6.2, as explored on 2026-09-12

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
