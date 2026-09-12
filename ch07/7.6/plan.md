# Plan: 7.6 Molecular Structure and Polarity (m68742)

Source: `source.md`, converted from the CNXML with `python3 tools/convert.py 7.6`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the showcase sections in one job; the decisions below follow the
book's `RULES.md` and the chapter's `config.md` where a rule would have
asked, and the chapter's `exploration.md` is the brief for the figures.

The chapter's last section and the one the book leaves the flat page in.
Three learning objectives, fifteen numbered figures (all sketches, no
photograph), seventeen unnumbered inline images, four display relations,
eight worked examples each with a Check Your Learning, two Link to
Learning notes (both PhET simulations), thirty-two end-of-chapter
exercises of which sixteen are keyed and five are instructions to run a
PhET simulation, and a glossary of sixteen terms. No table. One page
(root rule 11).

## Sub-concepts (page headers)

The book's own headers are "VSEPR Theory" (with "Electron-pair Geometry
versus Molecular Structure", "Predicting Electron Pair Geometry and
Molecular Structure" and "Molecular Structure for Multicenter Molecules"
beneath it) and "Molecular Polarity and Dipole Moment" (with "Properties
of Polar Molecules" beneath it). The VSEPR half carries five ideas in a
row and the page divides it so that each is a block of its own; the
page's header stands in the book's place wherever the two coincide.

1. `bond-angles` **A molecule occupies space: bond angles and bond
   distances** (book: the opening paragraph; Figure 7.14). Introduces
   `bond-angle-and-bond-distance`; uses `atoms-and-molecules`,
   `lewis-structure`.
2. `vsepr` **VSEPR theory** (book's header; the three paragraphs on the
   assumption, its limits and BeF₂; Figure 7.15). Introduces
   `vsepr-theory`; uses `lewis-structure`, `bond-angle-and-bond-distance`.
3. `geometries` **The five electron-pair geometries** (book: the
   "Figure 7.16 illustrates" paragraph; the VSEPR bench that folds
   Figures 7.16, 7.19 and 7.20; the Sim of the regions finding their
   places). Introduces `electron-pair-geometry`; uses `vsepr-theory`.
4. `structure-versus-geometry` **Electron-pair geometry versus molecular
   structure** (book's sub-header; methane and ammonia; Figures 7.17 and
   7.18). Introduces `molecular-structure-versus-electron-pair-geometry`;
   uses `electron-pair-geometry`.
5. `repulsion-order` **The order of repulsions and the space a region
   takes** (book: "As seen in Figure 7.18, small distortions…" through
   the ammonia paragraph that ends by citing Figure 7.19; the two
   displayed orders). Introduces `electron-pair-repulsion-order`; uses
   `bond-angle-and-bond-distance`,
   `molecular-structure-versus-electron-pair-geometry`.
6. `axial-equatorial` **Axial and equatorial positions** (book:
   "According to VSEPR theory, the terminal atom locations…", ClF₃, and
   the square planar paragraph; Figure 7.20 is folded into the bench).
   Introduces `axial-and-equatorial-positions`; uses
   `electron-pair-repulsion-order`.
7. `predicting` **Predicting electron-pair geometry and molecular
   structure** (book's sub-header; the four-step procedure; Examples
   7.11 to 7.15 as `ex-co2-bcl3`, `ex-ammonium`, `ex-water`, `ex-sf4`,
   `ex-xef4`, each with its Check Your Learning inline; Figures 7.21 to
   7.25 inside the examples). Introduces `predict-molecular-structure`;
   uses `lewis-structure`, `electron-pair-geometry`,
   `molecular-structure-versus-electron-pair-geometry`,
   `axial-and-equatorial-positions`.
8. `multicenter` **Molecular structure for multicenter molecules**
   (book's sub-header; Example 7.16 as `ex-glycine`; Example 7.17 as
   `ex-shape-simulator`). Reinforces `predict-molecular-structure`.
9. `bond-dipole` **The bond dipole moment** (book's header "Molecular
   Polarity and Dipole Moment" stands here; the two paragraphs on the
   partial charges, μ = Qr and the vector; the bond-moment bench that
   folds Figures 7.26 and 7.27). Introduces `bond-dipole-moment`; uses
   `bond-polarity`, `bond-angle-and-bond-distance`.
10. `molecular-dipole` **The dipole moment of a molecule** (book: "A whole
    molecule may also…" through the two-point summary; OCS, chloromethane,
    H₂S and NH₃). Introduces `molecular-polarity`; uses
    `bond-dipole-moment`, `predict-molecular-structure`.
11. `polar-properties` **Properties of polar molecules** (book's
    sub-header; Figure 7.28; Example 7.18 as `ex-polarity-simulator`).
    Reinforces `molecular-polarity`.

The two Link to Learning notes (the PhET molecular shape simulator and the
PhET molecule polarity simulation) are dropped and named in `notes`.
Examples 7.17 and 7.18 are the book's own instructions for those two
simulations and are kept verbatim with their link words unlinked; the
figures of this page stand where the simulations stood, and the Check
Your Learning of Example 7.17 is rewritten against the VSEPR bench (see
Exercises). The `{term:…}` markers are `<strong>`; chemical formulas are
`<sub>` and `<sup>` in prose and LaTeX in math; every degree sign is `°`.
The one equation with symbols, μ = Qr, is plain LaTeX, since the page
binds no type. The learning objectives, the summary and the glossary go
to the tables; the section prints no Key Equations, and its three
relations are the chapter's `eq-dipole-moment`, `eq-repulsion-order` and
`eq-domain-size-order`.

## Concept nodes (in book-rows.json, merged into book.json)

| id | kind | introduced in | evidence on this page |
|---|---|---|---|
| bond-angle-and-bond-distance | idea | bond-angles | Figure 7.14; no book exercise tests it alone |
| vsepr-theory | idea | vsepr | Figure 7.15; exercises fs-idp14744000, fs-idm2043120 |
| electron-pair-geometry | idea | geometries | the bench, the Sim; exercises fs-idp57252544, fs-idp67177072, fs-idp123628080 |
| molecular-structure-versus-electron-pair-geometry | idea | structure-versus-geometry | Figures 7.17, 7.18; exercises fs-idp14744000, fs-idp281408272, fs-idm2043120 |
| electron-pair-repulsion-order | result, eq-repulsion-order | repulsion-order | the two orders, Figures 7.14 and 7.18; exercises fs-idp134531056, fs-idp17379424, fs-idp37961056 |
| axial-and-equatorial-positions | idea | axial-equatorial | the bench at five regions; Examples 7.14 and 7.15; exercise fs-idp67177072 (e) |
| predict-molecular-structure | skill | predicting | Examples 7.11 to 7.16 and their Check Your Learning; exercises fs-idp57252544, fs-idp67177072, fs-idp123628080, fs-idp16503888, fs-idp149682416, fs-idp122940912, fs-idp73458400, fs-idp46580240 |
| bond-dipole-moment | result, eq-dipole-moment | bond-dipole | the bond-moment bench; exercises fs-idp87226080, fs-idp56829344 |
| molecular-polarity | skill | molecular-dipole | the bench, Figure 7.28; exercises fs-idp170194320, fs-idm5235936, fs-idp87226080, fs-idp60611664, fs-idp32930976, fs-idp164286384 |

`bond-angle-and-bond-distance` has no book exercise of its own; no
question is generated for it (config: generated questions, none). The
two placeholders `lewis-structure` (7.3) and `bond-polarity` (7.2) are
used, never introduced, on this page.

## Figures

id · replaces · concepts · still or moving, and why · sliders (type) ·
headline · graph. Every figure that shows a molecule's shape (the VSEPR
bench, the electron-domain Sim, the bond-moment bench, formaldehyde and
the panels of ammonia, water, SF₄ and XeF₄) is a full three-dimensional
scene the reader turns by dragging, on Chen's decision of 2026-09-12,
which replaced the earlier plan of a `figlib` projection with yaw and
pitch sliders; those two sliders are gone, and the sliders that remain
are the chemical ones (the number of regions, the lone pairs, the
molecule). The wedge-and-dash sketches (Figures 7.17, 7.21, 7.22, the
chloromethane and glycine images) are the book's own flat notation and
stay on `figlib`, as do the Lewis structures and Figure 7.28.

How a figure mounts the scene: the shell loads THREE r128 on every page
as the global `THREE` from `/vendor/three.min.js`, and `figures.js`
carries one helper, `viewer(stage, {h, dist, tilt, spin, onRender})`,
that appends a `div.three-wrap` (the CSS the app already has, with its
aspect ratio set to 1400 : h so it sits like a `figlib` canvas) to the
figure's stage and mounts a `WebGLRenderer` with `alpha: true` and a
transparent clear colour in it, so the page's own panel shows through in
both themes. One directional lamp from the upper left front and an
ambient light; a perspective camera at `dist`; a `part(x)` group per
panel that a pointer drag turns about its own centre (an orbit written in
the file, yaw about the screen's vertical and pitch about its horizontal,
applied to every part together, with `touch-action: none` and pointer
capture), and a slow idle spin about the vertical until the first drag,
none under reduced motion, none while the page's animation switch is
off. Atoms are spheres in the element palette through `F.el(symbol)`,
bonds are cylinders in ink (two or three offset cylinders for a double
or triple bond), lone pairs are ellipsoids in ink at half opacity, arcs
and brackets are `THREE.Line`s in ink, bond moments are cylinder-and-cone
arrows in ink, and every label is an HTML `.lab3d` element laid over the
canvas at the projected point, so it sets in the page's face and colour.
Geometries are shared (one sphere, one cylinder, one cone); a redraw
clears the parts and disposes their materials; the renderer follows the
container through a `ResizeObserver` and sets the device pixel ratio
capped at 2; it renders only when something changed and only while an
`IntersectionObserver` says the figure is on screen; and it disposes
itself once the wrapper has been out of the document for five seconds. A
`figlib` canvas beneath the scene carries the headline, the names, any
key and the graph, exactly as the rest of the book's figures do, and the
readout sits under the sliders as before. Every colour of the scene is
read from `PAL` and `F.el()` on each draw, so a theme change redraws it
with the page. A browser without WebGL gets a one-line note in the
wrapper instead of a scene.

Atoms are filled spheres in the element palette through `F.el(symbol)`,
which the app now has; `ch07/COLOR.md` was written before it landed and
its fallback of ink discs told apart by size is not used. Hydrogen is a
light fill. A generic central atom E and terminal atom X (the book's own
letters in Figures 7.19 and 7.20) are not elements and are drawn in the
panel's own grey, with the letter beside them. No image of the bundle carries a width, so `widths` stays empty
and no `data-width` or `data-original-width` is written.

1. `sim-formaldehyde` · replaces Figure 7.14 · bond-angle-and-bond-distance
   · **still**, 3D, drag to rotate: the molecule answers a drag and
   nothing in the idea has a clock · no sliders · "The H–C–H bond angle
   is 118° and the C=O bond distance is 1.21 Å; from this viewpoint a flat
   drawing would show the angle as 125°." · no graph: formaldehyde in
   three dimensions with the H–C–H angle as an arc and the C=O distance as
   a bracket, both measured in the molecule's own plane, and the projected shadow of the
   angle read out beside the true one so the reader sees why a flat
   drawing can lie about an angle · draws nothing.
2. `fig-bef2` · Figure 7.15 · vsepr-theory · **faithful copy**, kind
   `figure`: the Lewis structure of BeF₂ with its three lone pairs on each
   fluorine and the 180° angle, exactly as the book prints it; no sliders,
   no motion · draws nothing (the atoms are letters, as in the book).
3. `sim-vsepr` · replaces Figure 7.16, folds 7.19 and 7.20 (the eyebrow
   reads "Figure 7.16 + 7.19 + 7.20"; the three images are its
   `originals`; every citation of the three numbers links to it) ·
   electron-pair-geometry, molecular-structure-versus-electron-pair-geometry,
   axial-and-equatorial-positions, predict-molecular-structure ·
   **still**, 3D, drag to rotate: the arrangement answers its sliders and
   a drag and has no clock in it · regions of electron density (2 to 6,
   ink), lone pairs (0 to the book's maximum for that count, ink) · "Four
   regions with one lone pair: the electron-pair geometry is tetrahedral
   and the molecular structure is trigonal pyramidal, as in NH₃." · no
   graph: the central atom E with its regions drawn as a rotatable solid,
   bonds ending in X atoms and lone pairs as lobes, the ideal angles
   drawn as arcs in the molecule's own space, the axial and equatorial
   positions named at five regions, and beneath the drawing the two
   names in the book's words, with the book's wedge-and-dash sketch of
   the same case beside the solid · the fold is the one the chapter's
   exploration recommends: 7.16 is the five geometries, 7.19 the
   structures that follow from them as lone pairs are added, 7.20 the two
   kinds of position within one of them, and one solid whose lone pairs
   the reader adds shows all three · draws nothing.
4. `sim-domains` · Sim, replaces nothing · electron-pair-geometry,
   vsepr-theory, electron-pair-repulsion-order · **moving**: the regions
   travel from a scattered start and the smallest angle between them
   grows as a clock runs, so it registers a cycle and carries the
   transport; a stop returns them to the same scattered start · regions
   (2 to 6, ink), lone pairs (0 to 3, ink, drawn as the larger lobes the
   size order calls for and pushing harder); 3D, drag to rotate · "t =
   2.3 s · the smallest angle between two regions has grown to 104° and
   is still growing" then "settled: the five regions have found a
   trigonal bipyramid, two of them 90° from the rest" · a small trace
   below the solid of the smallest angle against time, on a fixed frame
   of 0 to 180° · this is the Sim the chapter's `exploration.md` names,
   built as it describes: Figure 7.16 states the five answers and this
   shows where they come from, the regions pushing one another apart
   until the separation is as large as it can be; the fifth case is
   honest, with two of the five settling closer to their neighbours than
   the other three, and a lone pair, which pushes harder, squeezes the
   bonds toward one another · draws nothing.
5. `fig-methane` · Figure 7.17 · molecular-structure-versus-electron-pair-geometry
   · **faithful copy**, kind `figure`: methane in the book's wedge and
   dash notation, solid lines in the plane, a wedge coming out, a dashed
   line going in, as the caption explains · draws nothing.
6. `fig-ammonia` · Figure 7.18 · molecular-structure-versus-electron-pair-geometry,
   electron-pair-repulsion-order · **faithful copy**, kind `figure`: the
   book's three panels (a) the four regions with the lone pair as a lobe,
   (b) the trigonal pyramid of the atoms, (c) the same with the 106.8°
   angles marked, the three molecules in one three-dimensional scene
   that a drag turns together; 3D, drag to rotate · draws nothing.
7. `fig-bcl3` · Figure 7.21 · predict-molecular-structure · **faithful
   copy**, kind `figure`: BCl₃ in wedge and dash notation as in Example
   7.11 · draws nothing.
8. `fig-ammonium` · Figure 7.22 · predict-molecular-structure · **faithful
   copy**, kind `figure`: the ammonium ion in wedge and dash notation
   inside its brackets with its charge · draws nothing.
9. `fig-water` · Figure 7.23 · predict-molecular-structure,
   molecular-structure-versus-electron-pair-geometry · **faithful copy**,
   kind `figure`: (a) the four regions about oxygen, (b) the same with
   hydrogen atoms on two of them, the bent structure, the two panels in
   one scene; 3D, drag to rotate · draws nothing.
10. `fig-sf4` · Figure 7.24 · predict-molecular-structure,
    axial-and-equatorial-positions · **faithful copy**, kind `figure`:
    (a) the five regions of SF₄ as a trigonal bipyramid, (b) the seesaw
    with the lone pair equatorial, the two panels in one scene; 3D, drag
    to rotate · draws nothing.
11. `fig-xef4` · Figure 7.25 · predict-molecular-structure,
    axial-and-equatorial-positions · **faithful copy**, kind `figure`:
    (a) the octahedron of XeF₄ with two lone pairs opposite, (b) the
    square planar structure, the two panels in one scene; 3D, drag to
    rotate · draws nothing.
12. `sim-bond-moments` · replaces Figure 7.26, folds 7.27 (the eyebrow
    reads "Figure 7.26 + 7.27") · bond-dipole-moment, molecular-polarity
    · **still**: a vector sum has no time in it · the molecule (an index
    over HF, CO, C–H and B–F as the two bonds of 7.26, CO₂, OCS, H₂O,
    H₂S, BF₃, NH₃, CH₄, CH₃Cl, PF₅, SF₆; ink); 3D, drag to rotate ·
    "Water is bent, so its two O–H bond moments do not cancel: the
    molecule is polar and its dipole points from between the hydrogens
    toward the oxygen." · no graph: the molecule as a solid with each bond
    moment drawn as an arrow along its bond, from the less electronegative
    atom toward the more, its length proportional to the electronegativity
    difference of Figure 7.6 and a small plus sign at its tail, and the
    molecular dipole drawn as one heavier arrow from the centre, the
    vector sum computed in three dimensions; the two electronegativities
    of the chosen bond are read out beside it · the fold is the one the
    exploration recommends: 7.26 is one bond's vector and 7.27 is the sum
    over a molecule, and one figure that draws both shows why CO₂ is
    nonpolar and water is not · the arrows are ink, since μ has no type
    (`ch07/COLOR.md`) · draws nothing.
13. `sim-field` · replaces Figure 7.28 · molecular-polarity · **moving**:
    the molecules tumble at random with the field off, and when the field
    comes on they turn until their positive ends face the negative plate,
    which has a clock in it; the loop runs about six seconds, half with
    the field off and half with it on, and holds · the molecule (HF, which
    is polar, or F₂, which is not; ink) and the number of molecules (6 to
    20, ink) · "The field is on: every HF molecule has turned its hydrogen
    end toward the negative plate." against "The field is on, but F₂ has
    no dipole moment, so the molecules go on tumbling as before." · no
    graph: two plates with their signs, the molecules between them, the
    field drawn as faint lines while it is on · the second molecule is
    what the text's sentence about nonpolar molecules needs and the print
    cannot show · draws nothing.

Photographs: none in this section. Unnumbered images, every one decided
by root rule 14: the schema does not allow a `photo` row without a
number (the validator refuses its eyebrow), so an image the running text
argues from is redrawn faithfully as an unnumbered `figure` row whose
eyebrow reads "Figure" and whose `originals` carry the book's image, and
an image that is part of an exercise's answer is kept as the book's own
image inside the solution:

- `fig-lewis-co2`, `fig-lewis-bcl3` (Example 7.11), `fig-lewis-nh4`
  (7.12), `fig-lewis-h2o` (7.13), `fig-lewis-sf4` (7.14), `fig-lewis-xef4`
  (7.15), `fig-lewis-glycine` and `fig-glycine-3d` (7.16), `fig-ocs`,
  `fig-chloromethane`, `fig-h2s-nh3`: eleven redrawn Lewis structures and
  vector sketches, faithful, kind `figure`, no sliders.
- `CNX_Chem_07_06_ala_img.jpg`, the Lewis structure of alanine that the
  Check Your Learning of Example 7.16 refers to, is the book's own image
  on that card through the exercise's `figure` field, as Chapter 1 keeps
  the diagrams its exercises refer to.
- `CNX_Chem_07_06_Ques23ans_img.jpg` (the three AB₂ shapes),
  `CNX_Chem_07_06_CS3a_img.jpg`, `CS3b`, `CS3c` (the Lewis structures of
  the carbon–sulfur species) and `CNX_Chem_07_06_Ques28ans_img.jpg` (the
  propene structure): five images inside the book's keyed answers, kept
  as `<img>` in the exercise's solution, copied to `media/ch07/`.

Figures that serve exercises: `sim-vsepr` carries the three
shape-simulator items and `sim-bond-moments` carries one of the
polarity-simulation items, all with their prompts rewritten (see
Exercises).

Extra simulations (root rule 15), considered and left, as the chapter's
exploration already judged them: a glycine bench for Example 7.16 (it
would animate what the book's own sketch shows, and the example's lesson
is reading one centre at a time), a Lewis-structure builder (7.3's
skill), and an electronegativity table to hover (Figure 7.6, in 7.2).
One more was considered here: a three-atom molecule whose
electronegativities the reader sets, which is what Example 7.18 and
exercise fs-idp67065360 are written against. It was left because the
bond-moment bench already shows the vector that an electronegativity
difference makes and the sum it enters, and a slider over a fictitious
electronegativity teaches nothing the real molecules do not; the two
items that need it are named in `exercise_notes`.

## Tables

None. The chapter's four numbered tables are all in 7.2 and 7.5.

## Exercises

- Inline, kind `check-your-learning`, with the book's answers, one after
  each example: `cyl1` after `ex-co2-bcl3` (carbonate, open), `cyl2` after
  `ex-ammonium` (a trigonal bipyramidal molecule, open), `cyl3` after
  `ex-water` (hydronium, open), `cyl4` after `ex-sf4` (XeF₂, open), `cyl5`
  after `ex-xef4` (three lone pairs and two bonds, open), `cyl6` after
  `ex-glycine` (alanine, open; the card points at the Lewis structure the
  example prints), `cyl7` after `ex-shape-simulator` (the book's "build a
  more complex molecule in the simulator", rewritten to name the VSEPR
  bench, an open answer the reader compares with the book's "Answers will
  vary", not a graded one), `cyl8` after `ex-polarity-simulator` (the
  largest bond dipoles, open, the book's own words).
- End, kind `exercise`, keyed and kept with the book's answer: `e1`
  fs-idp14744000 (HOH bent and HBeH linear; open; Understand), `e3`
  fs-idm2043120 (the difference between the two geometries; open;
  Understand), `e5` fs-idp170194320 (polar bonds in a nonpolar molecule;
  open; Understand), `e7` fs-idp57252544 (SF₆, PCl₅, BeH₂, CH₃⁺; open;
  Apply), `e9` fs-idp67177072 (ClF₅ to PH₂⁻; open; Apply), `e11`
  fs-idp123628080 (ClNO to ClOF₂⁺; open; Apply), `e13` fs-idp87226080
  (which have polar bonds and which have dipole moments; open; Analyze),
  `e15` fs-idp60611664 (five molecules for dipole moments; open;
  Analyze), `e17` fs-idp32930976 (XF₃ has a dipole moment, boron or
  phosphorus; choice over the two; Analyze), `e19` fs-idp164286384
  (Cl₂BBCl₂ polar or nonpolar; choice over the two; Analyze), `e21`
  fs-idp16503888 (nine indicated atoms; open; Apply), `e23`
  fs-idp149682416 (the three AB₂ shapes; open, with the book's own answer
  image; Analyze), `e25` fs-idp122940912 (the carbon–sulfur species; open,
  with the book's three answer images; Apply), `e27` fs-idp73458400 (the
  compound of molar mass 42; open, with the book's answer image; Analyze).
- End, kind `exercise`, unkeyed conceptual items kept with a suggested
  approach the page marks as OmniStax's own: `e2` fs-idp281408272 (what
  feature of a Lewis structure), `e4` fs-idp134531056 (why the H–N–H
  angle is smaller), `e6` fs-idm5235936 (the two exceptions to the MXₙ
  rule). Each approach points at the passage and the figure that carry
  the idea and states no answer of its own beyond what the text says.
- End, kind `simulation-exercise`, carried by the figures with the prompt
  rewritten against them: `s29` fs-idp56829344 (keyed; the bond-moment
  bench set to NH₃ for parts (b) and (c); part (a), ozone, is left out,
  since the bench draws a bond moment from the electronegativity
  difference alone and two oxygen atoms give none; open with the book's
  answer), `s30` fs-idp46580240 (unkeyed; the VSEPR bench at three
  regions and one lone pair; open with a suggested approach marked as
  OmniStax's), `s31` fs-idp17379424 (keyed; the bench's ideal angle at
  four regions and two lone pairs against the 104.5° that the bond-moment
  bench and Example 7.13 give water; open with the book's answer), `s32`
  fs-idp37961056 (unkeyed; S₂O on the bench at three regions and one lone
  pair; open with a suggested approach marked as OmniStax's).
- Left out, unkeyed items whose answer is a definite prediction the page
  will not compute (root rule 13): fs-idm179024, fs-idm5404912,
  fs-idp23296480, fs-idp24689744, fs-idm62749296, fs-idp90274464,
  fs-idp95408832, fs-idp120029040, fs-idp126465632, fs-idm2150336; and
  fs-idp67065360, the two-atom polarity simulation with adjustable
  electronegativities, which no figure of the page carries.
- No item taken from a sibling section; none given away.
- Weights (root rule 20, the agent's judgement): `e1` gives
  `molecular-structure-versus-electron-pair-geometry` its full value and
  `vsepr-theory` weight 2; `e9` and `e11` give `predict-molecular-structure`
  the full value and `electron-pair-geometry` weight 2; `e13` gives
  `molecular-polarity` the full value and `bond-dipole-moment` weight 2;
  `s31` gives `electron-pair-repulsion-order` the full value and
  `molecular-structure-versus-electron-pair-geometry` weight 2.

## Views

- Formulas: `eq-dipole-moment`, important; `eq-repulsion-order` and
  `eq-domain-size-order`, not; all three anchored below.
- Definitions: the three variable rows (μ, Q, r) and the sixteen
  glossary terms.
- Concept map: the nine nodes above, with edges to 1.2, to the
  placeholders of 7.2 and 7.3, and among themselves.

## Colour

The page binds nothing from the scheme, as `ch07/COLOR.md` says: a shape
is not a quantity. Every atom is a filled disc in its element colour
through `F.el(symbol)`; a generic E or X atom, every bond, every lone
pair, every arc, bracket, arrow and vector, the partial charges, the
plates and the field lines are ink. No
`\k` macro is written, and μ = Qr is plain LaTeX. Every `draws` is empty.

## Wanted in the app, for the next three-dimensional figure

- `figlib` should carry the `viewer` helper of this file (the wrapper,
  the renderer with a transparent clear colour, the lamp, the drag orbit
  with the idle spin, the `.lab3d` labels, the resize and pixel-ratio
  handling, the on-screen gating and the teardown) and the sphere,
  cylinder, lobe, arrow and arc builders, so that 8.2 and 10.6 do not
  copy them; a `F.view3d(stage, opts)` beside `F.sim()`.
- `figlib`'s `sim()` could take a third argument or an option that says
  the stage wants no canvas of its own, which is what a 3D figure calls it
  with today by passing no height.
- The `.three-wrap` rule's `aspect-ratio: 16/9` and `background:
  var(--soft)` are overridden inline here (1400 : h, transparent); the
  rule could take the ratio from a `data-h` attribute as canvases do.

## Wanted at chapter level

- variables `μ` → 7.6-bond-dipole
- variables `Q_partial` → 7.6-bond-dipole
- variables `r_bond` → 7.6-bond-dipole
- equations `eq-dipole-moment` → 7.6-bond-dipole
- equations `eq-repulsion-order` → 7.6-repulsion-order
- equations `eq-domain-size-order` → 7.6-repulsion-order
- `ch07/COLOR.md`: the paragraph "until `figlib` has that map, the atoms
  are drawn in ink and told apart by size and by fill" is out of date; the
  element palette exists and this page draws every atom through
  `F.el(symbol)`, hydrogen as a light fill with an ink outline.
- `ch07/config.md`, the Simulation exercises line: of the five PhET
  items, four are carried (fs-idp56829344, fs-idp46580240,
  fs-idp17379424, fs-idp37961056) and fs-idp67065360 is left out and
  named in `exercise_notes`.

### What the chapter pass did with them (2026-09-12)

Every item above was applied. The three variable rows and
`eq-dipole-moment` of `ch07/chapter.json` anchor on `7.6-bond-dipole`, and
the two orders, of repulsion and of the space a region takes, anchor on
`7.6-repulsion-order`. `ch07/COLOR.md` no longer describes the fallback of
ink discs told apart by size: it says that the element palette exists as
`omnistax-web/src/lib/fig/elements.ts`, that every atom of the section
takes its element's colour through `F.el(symbol)` with hydrogen as a light
fill and an ink outline, and that a generic central atom E or terminal
atom X takes the panel's own grey. The same file's paragraphs on the
projection were rewritten for Chen's decision of 2026-09-12: a solid is
lit by one fixed lamp in a three-dimensional scene rather than shaded by
`figlib`'s `face()`, the scene's clear colour is transparent so the page's
panel shows through in both themes, and the yaw and pitch sliders are gone,
the reader turning a molecule by dragging it. `ch07/config.md` records
that decision in its Three dimensions line, with how the section's
`viewer()` helper mounts the scene and where to find what `figlib` should
gain before the next such figure, and its Simulation exercises line now
names the four PhET items the figures carry and the one, fs-idp67065360,
that is left out.
