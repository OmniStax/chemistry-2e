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
  Kept and fixed 2026-11-14: the beam no longer shows inside saltwater or in the clear water above settled mud (a beam is seen only where something scatters it; the in-glass glow was blended in a way that left it on); the caption cut to what to choose and what to follow.
  works: parts: a glass of liquid seen from the side, a green laser on the left, a card on the right · flow: the beam crosses the glass; the mud's grains fall to the bottom · must hold: (1) no beam visible inside saltwater; (2) the beam's path glows through milk; (3) mud hides the beam while it clouds the water and the beam vanishes inside once the water clears; (4) the card's spot is brightest for saltwater and settled mud, dim for milk, faint for cloudy mud · read off the images: Figure 11.29's particle sketches, (a) many tiny dots, (b) fewer medium spheres, (c) a few large spheres; Figure 11.30's searchlight beam seen in the fog.
- sim-amphiphile · Figure 11.31 + 11.32 · soaps-and-detergents · variation by choice: the book prints the soap and the detergent as two condensed formulas; here one ball-and-stick molecule keeps the twelve carbon atoms the two share while the five extra carbon atoms of the stearate chain and the carboxylate head fade into the sulfate head of lauryl sulfate, the brackets naming the two ends following · still, the choice morphs; nothing in the idea has a clock · choice amphiphile (soap: sodium stearate, detergent: sodium lauryl sulfate; default soap) · headline "Sodium stearate, C₁₇H₃₅CO₂Na, has a nonpolar hydrocarbon end of 17 carbon atoms and an ionic carboxylate end." · none · 2D from one locked perspective. Kept and fixed 2026-11-14: the 2D/3D view choice is removed (book rule: a view choice only where both views teach; turning a zigzag chain shows nothing the drawing lacks, and the passage only names the two ends); the canvas fitted to the molecule; caption cut. Atoms by `F.el` (C, H, O, S, Na); the book's blue and red ends become two brackets in the `tail` and `head` referent colours; the charges as ink marks; hover names on every atom.
  works: read off the images: Figure 11.31, CH₃(CH₂)₁₆CO₂⁻Na⁺, "Hydrocarbon chain" and "Ionic end" over the two ends, "sodium stearate (soap)"; Figure 11.32, CH₃(CH₂)₁₁OSO₃⁻Na⁺, "sodium lauryl sulfate (detergent)"; chains blue, ionic ends red · must hold: (1) 17 chain carbons for the soap and 12 for the detergent; (2) the carboxylate's two O on its carbon, the sulfate's S with four O, one of them bonded to the chain; (3) the brackets span the chain and the head exactly; (4) one − on the head and one + on Na.
- sim-emulsion · Figure 11.33 · soaps-and-detergents · flow by animation: the book shows the finished drop; here 32 soap anions drift through the water, turn, and settle at the surface of a drop of oil with their hydrocarbon tails inside and their ionic ends in the water, while the freed Na<sup>+</sup> ions gather their water molecules · moving, the molecules arrive over an 8 s clock (orientation at an interface has a time) · no slider or choice: the book's picture is the end state and nothing in it varies that the section teaches · headline "20 of 32 soap anions have settled at the surface of the oil drop, their hydrocarbon tails in the oil and their ionic ends in the water." · none · 2D: the book's own cross section, since the lesson is the orientation across one interface; the config line that gives 11.33 a 2D/3D view choice is not followed, because a sphere of radial chains in 3D hides the tails the cross section shows · OIL_AMBER is the pale gold of oil, a physical colour; tails drawn in `F.el('C')`, ionic ends `F.el('O')`, Na<sup>+</sup> `F.el('Na')`, water by `F.el` as the book draws them; four labels in the book's words (solvated cation, ionic end, hydrocarbon tail, drop of oil), hover names on the rest
  Kept and fixed 2026-11-14: the drop enlarged (radius 205, 40 anions as the book draws about 50) so the tails no longer pack into a black hub in a small disc; the labels "ionic end" and "hydrocarbon tail" now appear at rest (they waited for a settled check that never quite passed); caption cut.
  works: parts: a drop of oil in cross section, soap anions round it, sodium ions each in a shell of water molecules, free water molecules · flow: each anion drifts to its place at the surface and turns so its tail points into the oil · must hold: (1) at rest every tail lies in the oil and every ionic end just outside it; (2) water molecules point their oxygen at each Na⁺; (3) the four labels are the book's · read off the image: "Solvated cation", "Ionic end", "Hydrocarbon tail", "Drop of oil" on the left with leaders; about 50 anions with red heads and black wavy tails; four solvated cations and some free water above the drop.
- sim-precipitator · Figure 11.36 · charged-colloidal-particles · flow by animation: soot enters with the smoke, takes up a charge beside the point electrode, crosses to the plate electrode, falls into the hopper as dust, while the gases leave at the top; with the voltage off the soot rides straight through · arrows: kinematic in the book (the flow in and out, the soot going down); here the soot itself moves · moving, the smoke flows continuously (a clock with no end) · choice high DC voltage (off, on; default on) · headline "With the high DC voltage on, 43 of 45 soot particles have been removed from the smoke." · 2D, rebuilt flat on 2026-11-14 from the book's image: the 3D cylinder had no hopper neck or insulator, its labels covered the chamber, and turning it showed nothing. Soot by `F.el('C')`; the wall in the `plate-electrode` colour, the funnel and neck in the `hopper` colour, the wire and its barbs in the `point-electrode` colour; six labels in the book's words, the ground by hover name. Readout: the share removed since the last switch.
  works: parts: a chamber with rounded shoulders whose grounded wall is the plate electrode; an insulator on top carrying the point electrode down the middle, barbs along it; the inlet pipe low on the left, the outlet high on the right; the funnel and neck of the hopper at the bottom; the ground symbol on the wall · flow: soot in at the inlet, up with the gases toward the outlet; with the voltage on, out to the wall, down the wall into the hopper and out of its neck · must hold: (1) no soot passes through the wall; (2) with the voltage off nothing reaches the wall and all leave by the outlet; (3) with it on, a particle is charged only near the point electrode and goes to the nearer side of the wall; (4) the counts are of particles that finished since the last switch · read off the image: "High DC voltage" over the electrode; "Soot-laden smoke" with an arrow into the inlet; "Soot-free gases escape" with an arrow out; "Plate electrode", "Point electrode" with leaders; "Ground"; "Soot particles removed here" under the neck; the barbs as short forked branches.

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
