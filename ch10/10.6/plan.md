# Plan: 10.6 Lattice Structures in Crystalline Solids

Written before the build on 2026-09-28 and applied without a check-in, as `ch10/config.md` records.

## Sub-concepts

| Span | Header | Concepts |
|---|---|---|
| `crystalline` | Crystalline solids | types-of-crystalline-solids (uses) |
| `metals` | The structures of metals (the book's header) | unit-cell (uses) |
| `unit-cell` | Unit cells of metals (the book's header) | unit-cell (introduces) |
| `simple-cubic` | The simple cubic structure | cubic-unit-cells (introduces) |
| `ex-po` | Example 10.14 | unit-cell-radius-and-density (introduces), density, molar-mass, avogadro-number (uses) |
| `cubic-cells` | Body-centered and face-centered cubic cells | cubic-unit-cells (reinforces) |
| `closest-packing` | Closest packing | closest-packing (introduces) |
| `ex-ca` | Example 10.15 | unit-cell-radius-and-density (uses) |
| `lattice-systems` | The seven lattice systems | unit-cell (reinforces) |
| `ionic-crystals` | The structures of ionic crystals (the book's header) | holes-in-closest-packed-arrays (introduces), ionic-radius-trend (uses) |
| `ex-zns` | Example 10.16 | formula-from-hole-occupancy (introduces), empirical-formula (uses) |
| `octahedral` | Octahedral holes | holes-in-closest-packed-arrays (reinforces) |
| `ex-al2o3` | Example 10.17 | formula-from-hole-occupancy (uses) |
| `cubic-holes` | Cubic holes | holes-in-closest-packed-arrays (reinforces) |
| `ionic-cells` | Unit cells of ionic compounds (the book's header) | ionic-unit-cells (introduces), ionic-compound-formula (uses) |
| `ionic-radii` | Calculation of ionic radii (the book's header) | unit-cell-radius-and-density (reinforces) |
| `ex-licl` | Example 10.18 | ionic-unit-cells (uses), unit-cell-radius-and-density (uses) |
| `xray` | X-ray crystallography (the book's header) | bragg-equation (introduces), wave-properties (uses) |
| `ex-bragg` | Example 10.19 | bragg-equation (uses) |
| `franklin` | the note X-ray Crystallographer Rosalind Franklin | bragg-equation (reinforces) |

## Figures

- sim-simple · Figure 10.46 + 10.47 + 10.48 + 10.49 · unit-cell, cubic-unit-cells · value add: shape in 3D (the cell turned to see its corners shared by eight cells), standardisation (the book's four drawings of one cell become one) · still: nothing in a cell has a clock · choice picture (lattice points, atoms, inside the cell; three models the book draws of one structure, discrete) · headline names the picture and what it shows (the six neighbours of one point, the atoms in contact along an edge, one-eighth of an atom at each corner) · no graph · physical 3D (rule 28.3): spheres of polonium in `F.el('Po')`, lattice points and cell edges in ink; the lattice-point picture is the 2×2×2 block of 10.46 and 10.48 with the shared centre point joined to its six neighbours; free yaw, pitch bounded to ±80° since a crystal has no ground; snap views along an edge, a face diagonal and the body diagonal; auto-rotate idle; hover names every atom and point with its share of the cell. Readout `8 \times \tfrac{1}{8} = 1` atom per cell, the coordination number and the 52% filled in its note.
- fig-simpcube · the unnumbered image of Example 10.14 (`SimpCube_img`) · kept as the book's image in its own markup: the solution points at it, and it is a labelled step of the working.
- sim-cubic · Figure 10.50 + 10.51 + 10.52 · cubic-unit-cells, unit-cell · value add: shape in 3D, variation by choice (the three cells side by side in the book become one cell that morphs, the body and face atoms arriving) · still · choice cell (simple, body-centered, face-centered; default body-centered, since the simple cell has the figure above) and the same picture choice · headline counts the atoms and names the contact direction · no graph · physical 3D as sim-simple; atoms Po, Fe and Cu for the three cells (metals the text names for each), lattice points in ink · readout morphs `8×1/8 (+ 1) (+ 6×1/2) = n` by meaning when the cell changes, with the coordination number and filled fraction in its note.
- fig-ex-ca · the unnumbered image of Example 10.15 (`Ex100602_img`) · kept as the book's image: the solution's right triangle is read off it.
- sim-density · Sim · unit-cell-radius-and-density · value add: variation by slider and choice (the edge length and the metal set the radius and the density, and the plane the atoms touch along is drawn to scale) · still · choice metal (polonium, simple cubic; iron, body-centered; calcium, face-centered) and slider edge length a (pm, untyped, ink, 250 to 650, a dashed circle at the measured edge of the chosen metal) · headline names where the atoms touch and the radius · the contact plane at the left (a cell face for simple and face-centered cells, the plane through the body diagonal for a body-centered cell), the working on the right · 2D: the lesson is one right triangle in one plane. Readout the density `ρ = m/V` with the cell's mass (mass hue) and volume (volume hue); defaults Example 10.14 (Po, 336 pm) when polonium is chosen and Example 10.15 (Ca, 558.8 pm) on load. Neither Ag, W nor Ba is offered, so the figure gives no keyed answer.
- sim-packing · Figure 10.53 + 10.54 · closest-packing · value add: shape in 3D, variation by choice (the third and fourth layers slide between A and C sites, and the face-centered cube appears in the cubic stack) · still: the morph between stackings is the only motion · choice stacking (hexagonal ABAB, cubic ABCA) · headline names the stacking and the coordination number 12 · no graph · physical 3D: four layers of touching spheres, layers told apart by `F.cat(0..2)` for A, B, C as the chapter's `COLOR.md` says; in the cubic stack the fourteen atoms of one face-centered cube are drawn solid, the rest faded, with the cube's edges in ink; free yaw, pitch ±90°; snap views top, side and "cube face" (straight at a face of the cube); no idle spin.
- sim-lattices · Figure 10.55 + 10.56 · unit-cell · value add: shape in 3D (a cell's axes and angles seen in space), variation by choice (fourteen cells, the cell shape bending from one to the next) · still · a dropdown of the fourteen cells, since a row of fourteen buttons would wrap · headline names the system and its axes and angles · no graph · physical 3D: cell edges in ink, lattice points in ink, a, b, c labelled on the three edges from one corner and α, β, γ arcs at that corner; the hexagonal cell is the book's hexagonal prism; free orbit bounded ±80° in pitch; views front and corner; idle spin. Readout the system's constraints, `a = b \ne c,\ α = β = 90°,\ γ = 120°`.
- sim-holes · Figure 10.57 + 10.58 · holes-in-closest-packed-arrays, ionic-radius-trend · value add: shape in 3D (four, six and eight anions around a cation), standardisation (one radius-ratio line for the three holes) · still · choice compound (ZnS tetrahedral, NaCl octahedral, CsCl cubic) · headline names the hole and the number of anions around it · the ratio line beneath (0 to 1 with the book's limits 0.225, 0.414, 0.732) · physical 3D: anions and cation at their real radii (S²⁻ 184, Zn²⁺ 74, Cl⁻ 181, Na⁺ 102, Cs⁺ 174 pm) in the element palette, anions translucent so the cation shows, the polyhedron's edges in ink; free orbit; views face and diagonal; idle spin. Readout `r₊/r₋ = 102 pm / 181 pm = 0.564`.
- sim-ionic · Figure 10.59 + 10.60 + 10.61 + 10.62 · ionic-unit-cells · value add: shape in 3D, variation by choice · still · choice compound (CsCl, NaCl, ZnS, CaF₂) · headline counts the ions and names the formula · no graph · physical 3D: ions in the element palette at half their radii so the inside of the cell can be seen (the caption says so), ZnS and CaF₂ with the book's lines from each small ion to its four neighbours; free orbit; views face and body diagonal; idle spin; hover names every ion with its share of the cell. Readout counts both ions, `\text{Cl}^-: 8\times\tfrac18 + 6\times\tfrac12 = 4`, and so on.
- fig-licl · the unnumbered image of Example 10.18 (`LiClstrctr`) · kept as the book's image: the solution reads the right triangle off it.
- sim-bragg · Figure 10.63 + 10.64 · bragg-equation · value add: variation by slider (the angle, wavelength and plane spacing change the extra path and the sum of the two waves), standardisation · still: the waves are drawn at one instant, and the lesson is their relative phase, not their travel · sliders θ (°, untyped, 5 to 60), λ (wavelength hue, 0.050 to 0.300 nm), d (nm, untyped, 0.100 to 0.500); a dashed circle on each at the values that satisfy nλ = 2d sin θ for n = 1, 2, 3 · headline states the extra path in wavelengths and whether the waves reinforce or cancel · the two planes of copper atoms (`F.el('Cu')`, Example 10.19) with the two rays at the left, the two scattered waves and their sum at the right (10.63) · 2D: a section through the crystal is the point (rule 28.1). Defaults Example 10.19, λ = 0.1315 nm, θ = 25.25°, d = 0.154 nm. Readout `2d\sin\theta = 2(0.154\ \text{nm})\sin 25.25° = 0.131\ \text{nm} = 1.00\,λ`.
- fig-diffractometer · Figure 10.65 · kept as the book's image: the text names the apparatus only; nothing varies or moves in the passage (rule 24.3), and the pattern (b) is a picture of data.
- fig-franklin · Figure 10.66 · photograph, kept: the Portrait of a Chemist points at it.

Extra simulations: none beyond sim-density, which carries the Bragg-free half of the section's calculations (the Link to Learning's Bragg simulator is replaced by sim-bragg).

## Tables

None.

## Binds

`mass` and `volume` (sim-density's readout), `wavelength` (sim-bragg's slider, drawn waves and readout). Everything else is ink, the element palette or `F.cat` for the layers.

## Exercises

- Inline: `cyl1` (Example 10.14, Ni, open, keyed), `cyl2` (Example 10.15, Ag, multi 144 pm and 10.5 g/cm³), `cyl3` (Example 10.16, Li₂Se, open), `cyl4` (Example 10.17, TiO₂, open), `cyl5` (Example 10.18, 1.33 Å, number), `cyl6` (Example 10.19, 10.8°, number).
- End of section, exercises 75 to 105 of the chapter: keyed 75 (open), 77 (number 8), 79 (number 12), 81 (multi), 83 (multi), 85 (open), 87 (open), 89 (open), 91 (open), 93 (multi), 95 (open), 97 (open), 99 (number), 101 (number), 103 (number), 105 (number). Unkeyed conceptual, kept with an AI approach that does not state the answer: 76, 78, 80, 88, 90, 94, 96. Unkeyed choice 92 kept open with its options. Unkeyed numerical, left out and named in `exercise_notes`: 82, 84, 86, 98, 100, 102, 104.
- Errata printed as the book has them and named in `notes`: the tungsten answer "19.26 g/cm", "What it the formula" (Example 10.17's CYL), "the formula for thallium is TlI" (91), "occupied the same cites" (95).

## Wanted at chapter level

- eq-bragg → 10.6-xray
- `ch10/config.md` Photographs row: the unnumbered images of Examples 10.14, 10.15 and 10.18 (`SimpCube_img`, `Ex100602_img`, `LiClstrctr`) are kept as the book's images in `figure` rows without a number.

Applied by the chapter pass (2026-09-28): each equation anchored as listed, and its variables anchored with it.

Applied by the chapter pass (2026-09-28): the Photographs row of `config.md` names the three images; `a_cell` and `r_atom` anchored at Example 10.14 (`10.6-ex-po`).
