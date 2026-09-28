# Plan: 11.5 Colloids (m68784)

Written 2026-09-28 before the build and left for review, as `ch11/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

Two objectives, nine numbered figures (11.29 to 11.37; 11.34 inside the Deepwater Horizon note, 11.35 inside the Cottrell portrait), one table (11.4), no worked example and no Check Your Learning, five end-of-section exercises.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `colloids` | Solutions, colloids and suspensions (Figures 11.29, 11.30, the Tyndall Sim) | introduces `colloids-solutions-and-suspensions` |
| `dispersed` | Dispersed phase and dispersion medium (Table 11.4) | introduces `dispersed-phase-and-medium`, uses `colloids-solutions-and-suspensions` |
| `preparation` | Preparation of colloidal systems (the book's header) | introduces `colloid-preparation` |
| `soaps` | Soaps and detergents (the book's header, Figures 11.31 to 11.34) | introduces `soaps-and-detergents`, uses `colloid-preparation` |
| `charged` | Electrical properties of colloidal particles (the book's header, Figures 11.35, 11.36) | introduces `charged-colloidal-particles` |
| `gels` | Gels (the book's header, Figure 11.37) | uses `dispersed-phase-and-medium` |

## Figures

- sim-tyndall · Sim · colloids-solutions-and-suspensions · flow by animation and choice: the book shows three photographs with a still particle sketch under each; here one glass holds the reader's choice of saltwater, milk or muddy water, a green laser beam crosses it, and over the clock the mud settles while the ions and the butterfat droplets only jostle; the beam's path shows in the milk (the Tyndall effect), not in the saltwater, and is lost in the cloudy mud until it clears · moving, the particles jostle and the suspended ones settle over a 6 s clock (settling has a time; the caption says the minutes are compressed) · choice of mixture (solution, colloid, suspension; default colloid), no slider · headline "The droplets of butterfat in milk stay dispersed, and they are large enough to scatter the beam." · none beneath · 2D: a side view of a glass, the lesson is size, settling and a beam in one plane · LASER_GREEN is the green of a laser pointer, chosen over red so the beam never reads as a particle, a physical colour; Na<sup>+</sup> and Cl<sup>−</sup> by `F.el`, the butterfat droplets and the mud grains, which have no single identity, `F.cat(0)` (the chapter's dispersed-solute role); a legend names each kind, hover names every particle
- sim-amphiphile · Figure 11.31 + 11.32 · soaps-and-detergents · variation by choice and shape in 3D: the book draws the soap and the detergent as two separate ball-and-stick pictures; here one molecule keeps the twelve carbon atoms the two share while the five extra carbon atoms of the stearate chain and the carboxylate head fade into the sulfate head of lauryl sulfate · still, the choice morphs; nothing in the idea has a clock · choice of amphiphile (soap: sodium stearate, detergent: sodium lauryl sulfate; default soap), view choice (2D, 3D) per the book's rule for a named structure · headline "Sodium stearate, C<sub>17</sub>H<sub>35</sub>CO<sub>2</sub>Na, has a nonpolar hydrocarbon end of 17 carbon atoms and an ionic carboxylate end." · none · 2D default, the book's own perspective of the ball-and-stick drawing; 3D as physical 3D, a molecule's shape, no ground, free yaw, pitch within ±70°, idle spin, views side and end on · atoms by `F.el` (C, H, O, S, Na); the book's blue and red ends become two ink brackets naming the nonpolar and ionic ends; the charges − and + as ink marks beside their atoms, hover names on every atom
- sim-emulsion · Figure 11.33 · soaps-and-detergents · flow by animation: the book shows the finished drop; here 32 soap anions drift through the water, turn, and settle at the surface of a drop of oil with their hydrocarbon tails inside and their ionic ends in the water, while the freed Na<sup>+</sup> ions gather their water molecules · moving, the molecules arrive over an 8 s clock (orientation at an interface has a time) · no slider or choice: the book's picture is the end state and nothing in it varies that the section teaches · headline "20 of 32 soap anions have settled at the surface of the oil drop, their hydrocarbon tails in the oil and their ionic ends in the water." · none · 2D: the book's own cross section, since the lesson is the orientation across one interface; the config line that gives 11.33 a 2D/3D view choice is not followed, because a sphere of radial chains in 3D hides the tails the cross section shows · OIL_AMBER is the pale gold of oil, a physical colour; tails drawn in `F.el('C')`, ionic ends `F.el('O')`, Na<sup>+</sup> `F.el('Na')`, water by `F.el` as the book draws them; four labels in the book's words (solvated cation, ionic end, hydrocarbon tail, drop of oil), hover names on the rest
- sim-precipitator · Figure 11.36 · charged-colloidal-particles · flow by animation and shape in 3D: soot particles enter with the smoke, take up a charge beside the point electrode, cross to the plate electrode, lose their charge and fall into the hopper as dust, while clean air leaves at the top; with the voltage off, the soot rides straight through · moving, the smoke flows continuously (a clock with no end) · choice of voltage (off, on; default on) · headline "With the high DC voltage on, 46 of 50 soot particles have been removed from the smoke." · strip beneath with the soot collected and the soot escaping as two bars · physical 3D, an apparatus (book rule): a cylindrical chamber with its hopper, the central point electrode, the inlet and outlet pipes, on a stand; pitch between 2° and 70° above level so the stand is never seen from beneath, spin off since the smoke already moves, views front and above · soot by `F.el('C')`, the chamber and electrodes in ink and muted; labels on the plate electrode, point electrode, inlet and outlet in the book's words, hover names on every part

Photographs, all kept (root rule 14):

- fig-colloids · Figure 11.29 · keep: the text points at it for the three kinds of mixture; the particle sketches beneath the photographs are the size comparison the Tyndall Sim animates, so they stay as printed
- fig-searchlight · Figure 11.30 · keep: the text points at it for the Tyndall effect
- fig-oil-spill · Figure 11.34 · keep: the note points at it; panels (a) and (b) are photographs, and (c) is a molecule merely named, which rule 24.9 keeps from a viewer of its own
- fig-cottrell · Figure 11.35 · keep: a Portrait of a Chemist (book rule)
- fig-gel · Figure 11.37 · keep: the text points at it; its molecular model is a picture of a protein the text does not discuss

## Tables

Table 11.4, Examples of Colloidal Systems, as `div.book-table`. The unnumbered answer table of the first exercise stays inside its answer.

## Types bound

Nothing, as `ch11/COLOR.md` says. Atoms and ions in the element palette, the butterfat and mud particles in `F.cat(0)`, the laser beam and the oil as physical colours.

## Exercises

Five end-of-section items, all kind `exercise`, all open. Three keyed (fs-idm110325696 with its answer table, fs-idm42853312, fs-idm167047216). Two unkeyed conceptual kept with an AI-marked approach (fs-idm115359200, fs-idm26172416). No numerical item is left out.

## Left out

Nothing. The section prints no Link to Learning note; the Deepwater Horizon note's link to NOAA stays as the note's own words.

## Extra simulations

None beyond sim-tyndall, which carries the section's first idea.

## Wanted at chapter level

- `ch11/config.md` 3D line: 11.33 is built flat (the book's cross section), not with the 2D/3D view choice; 11.34(c) is kept inside the photograph rather than given a view choice (rule 24.9, a molecule merely named).
- none otherwise: the section has no variables or equations, and its five concepts and nine glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): `config.md`'s 3D line now records 11.33 as flat and 11.34(c) inside its photograph; the precipitator's camera is pulled back (distance 9.4) so its top ring stays in frame.
