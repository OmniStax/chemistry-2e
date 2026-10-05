# Plan: 19.3 Spectroscopic and Magnetic Properties of Coordination Compounds (m68844)

Written 2026-10-05 before the build and left for review, as `ch19/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Four objectives, eight numbered figures (19.33 to 19.40, 19.36 inside Example 19.8), two unnumbered images (the tetrahedral splitting in Example 19.8's solution, the square planar pattern after it), no table, three worked examples (19.7, 19.8, 19.9) each with a keyed Check Your Learning, no boxed note, one Link to Learning (dropped), thirteen end-of-section items (chapter exercises 36 to 48).

## Sub-concepts and spans

The book's three headers stand (root rule 3); the untitled opening takes a header of our own.

| Span | Header | Concepts |
|---|---|---|
| `opening` | Explaining transition metal complexes (our own) | uses `valence-bond-theory`, `degenerate-orbitals`, `coordination-compound`, `d-orbital` |
| `cft` | Crystal Field Theory (Figures 19.33, 19.34, 19.35) | introduces `crystal-field-theory`, `eg-and-t2g-orbitals`, `crystal-field-splitting`, `spectrochemical-series`, `ligand-field-strength`, `pairing-energy`, `high-and-low-spin-complexes`; uses `d-orbital`, `ligand`, `hunds-rule`, `degenerate-orbitals`, `octahedral-geometry`, `aufbau-principle` |
| `ex-high-low-spin` | Example 19.7 · High- and Low-Spin Complexes | introduces `predict-unpaired-electrons`; reinforces `high-and-low-spin-complexes`; uses `ion-configurations`, `ligand-field-strength` |
| `ex-other-geometries` | Example 19.8 · CFT for Other Geometries (Figure 19.36) | introduces `crystal-field-other-geometries`; uses `tetrahedral-geometry`, `eg-and-t2g-orbitals`, `hunds-rule` |
| `square-planar` | the paragraph after Example 19.8 and its pattern | reinforces `crystal-field-other-geometries`; uses `complex-geometry`, `cis-trans-configuration` |
| `magnetic` | Magnetic Moments of Molecules and Ions | introduces `magnetic-moment-unpaired-electrons`; uses `paramagnetism`, `diamagnetism`, `high-and-low-spin-complexes` |
| `colors` | Colors of Transition Metal Complexes (Figures 19.37 to 19.40) | introduces `complementary-colors`, `colors-of-complexes`; uses `electromagnetic-spectrum`, `photon-energy`, `crystal-field-splitting`, `ligand-field-strength` |
| `ex-colors` | Example 19.9 · Colors of Complexes | reinforces `colors-of-complexes`, `complementary-colors`; uses `photon-energy`, `wave-speed-relation`, `frequency`, `wavelength`, `blackbody-radiation`, `crystal-field-splitting` |

## Figures

- sim-d-orbitals · Figure 19.33 + 19.34 + 19.36 · crystal-field-theory, eg-and-t2g-orbitals, crystal-field-splitting, crystal-field-other-geometries · value add 3D and variation by choice: the book prints five perspective drawings of the d orbitals with the ligands omitted from one, a separate energy diagram, and the tetrahedral ligands on a cube inside Example 19.8; here the reader turns one orbital among the ligands of the chosen geometry and sees its level on the splitting beneath, so "points at the ligands" and "lies higher" are read off one figure · arrows: symbolic (the axes, the energy axis and the double-headed Δ arrow); the book draws no arrow of motion, its ligands are placed, not arriving · still: a change of geometry slides the ligands to their new sites (two fade out for tetrahedral and square planar) while the levels slide to their new heights; a change of orbital bends the old lobes into the new, as 6.3's orbital shapes do · choices geometry (octahedral, tetrahedral, square planar; default octahedral, the book's 19.33) and orbital (d<sub>x²−y²</sub>, d<sub>z²</sub>, d<sub>yz</sub>, d<sub>xz</sub>, d<sub>xy</sub>, the book's order; default d<sub>x²−y²</sub>) · headline (the stage's band) says where the chosen orbital's lobes point relative to the ligands, e.g. "Six ligands on the axes: the lobes of $d_{x^2-y^2}$ point straight at four of them." · energy diagram below the scene on its own flat canvas (the scene is wide and the levels read best as rows): an unnumbered energy axis in the energy hue, five levels named under each, the chosen one in ink and the rest muted, $\kdoct$ drawn 120 units, $\kdtet$ four ninths of it; the square planar rows in the book's order with spacing for reading, since the book gives no values · readout: octahedral $\kdoct:\ t_{2g}\ \text{(lower)} \to e_{g}\ \text{(higher)}$, tetrahedral $\kdtet = \tfrac{4}{9}\kdoct$ with $e \to t_{2}$, square planar the order $d_{xz} = d_{yz} < d_{z^2} < d_{xy} < d_{x^2-y^2}$; no note, the headline carries the orbital · mathematical 3D (root rule 28: the lobes are the maths), lobes the surface r = |angular part| in two ink tones for the two phases (chapter COLOR.md), axes x, y, z drawn and named, free orbit, idle spin, views "perspective", "down z" (shows d<sub>xy</sub> against d<sub>x²−y²</sub> and the square plane) and "along x"; the flat diagram stays where WebGL is missing · ligands are point charges, `F.el('L')` spheres on thin sticks from the metal `F.el('M')`, one named "L" and every one on hover; the tetrahedral cube (the book's 19.36) in muted lines fading in with the tetrahedron · labels: x, y, z, L in the scene; e<sub>g</sub>, t<sub>2g</sub> (or e, t<sub>2</sub>) and the Δ arrow on the diagram.
- sim-high-low-spin · Figure 19.35 (and 19.34's boxes) · pairing-energy, high-and-low-spin-complexes, crystal-field-splitting, hunds-rule · value add variation by slider and by choice: the book prints two fixed iron(II) cases; here the splitting is dragged against a fixed pairing energy, drawn beside it as a bracket so the two lengths are compared directly, and the electrons of any d count rearrange as $\kdoct$ passes $\kPpair$ · arrows: symbolic (the electrons' half arrows are spins, the Δ arrow and the energy axis are notation) · still: the gap answers the slider; crossing the special value moves the electrons that change between e<sub>g</sub> and t<sub>2g</sub> in one eased beat, their spins turning over · slider $\kdoct/\kPpair$ (a rating, ink: 0.20 to 2.00, default 0.60, the weak-field case of [Fe(H<sub>2</sub>O)<sub>6</sub>]<sup>2+</sup>), dashed circle at 1, where $\kdoct = \kPpair$ (rule 26.1, an equal pair the text names); choice d count d¹ to d¹⁰ (default d⁶, the book's Fe<sup>2+</sup>) · headline "Six d electrons, $\kdoct < \kPpair$: high spin, four unpaired electrons." and its low-spin, equal and no-choice forms · no graph; the free ion's five degenerate boxes on the left (Hund's rule), the octahedral boxes centred about the free ion's level, the e<sub>g</sub> row 0.6$\kdoct$ above it and t<sub>2g</sub> 0.4$\kdoct$ below (the barycentre is a drawing choice; the book's diagram is not to scale) · readout for d⁴ to d⁷ the cost of sending electrons up against the cost of pairing them, e.g. $2\kdoct = 1.20\,\kPpair < 2\kPpair \Rightarrow t_{2g}^{4}e_{g}^{2}$, and for the other counts the one arrangement at the current $\kdoct$ · 2D (an energy diagram, book rule) · labels: free ion, octahedral complex, e<sub>g</sub>, t<sub>2g</sub>, $\kdoct$, $\kPpair$ (six); electrons are ink half arrows (chapter COLOR.md).
- sim-color-wheel · Figure 19.37 · complementary-colors, colors-of-complexes, photon-energy · value add variation by slider and flow by animation: the book prints one test tube of [Cu(NH<sub>3</sub>)<sub>4</sub>]<sup>2+</sup> and a fixed wheel; here the absorbed wavelength is dragged around the book's wheel, its complement is marked across it, the solution takes the colour of white light with that band removed, and the photon energy of Example 19.9 is computed live · arrows: kinematic (white light travelling into the tube and the transmitted light leaving it), which sets the floor at the moving tier · moving: each loop the light's front crosses the bench in 4 s, linearly, the absorbed colours ending at the glass and the rest continuing, then holds 1.2 s; reduced motion shows the held state · slider λ `wavelength` (400 to 800 nm, the wheel's range, default 499 nm, Example 19.9's absorption maximum) · headline "The solution absorbs light around 499 nm; the eye sees the colour across the wheel." · no graph; the wheel left, the tube right · readout $\kE = h\knu = \frac{h\kc}{\klam} = \dots = 3.99\times10^{-19}\ \text{J} = \kdoct$, the clock never touching it · 2D · facts: the wheel, the seven rays, and the solution's colour are light in its own colour (`"spectrum"`), computed from the wavelength; the solution's colour is white light less a band 46 nm either side of λ, which the book's broad absorptions only approximate · labels: the wheel's seven wavelengths as the book prints them, absorbed, seen, white light, transmitted light. Panel (a), the black, white and yellow strips, is not redrawn; it stays in the book's image the reader can call up.
- fig-aqueous-colors · Figure 19.38 · photo kept: the text points at it, and the colours are the fact.
- fig-iron-complexes · Figure 19.39 · photo kept: the text points at it.
- fig-copper-complexes · Figure 19.40 · photo kept: the text points at it.
- fig-tet-splitting · unnumbered (`fs-idp4747504`) · kept as the book's image: it is Example 19.8's answer and stays in the solution; the Sim above shows the same splitting live.
- fig-square-planar · unnumbered (`fs-idm6075904`) · kept as the book's image: the text says "as depicted below", and the book's drawing puts each orbital's shape beside its level.

Extra simulations: none.

## Tables

None.

## Types bound

`energy` ($\kdoct$, $\kdtet$, $\kPpair$, the photon's $\kE$, the energy axes), `wavelength` ($\klam$, the absorbed wavelengths in the prose), `frequency` ($\knu$), `velocity` ($\kc$). Planck's constant, counts of electrons, d counts and the 4/9 stay ink; the rating $\kdoct/\kPpair$ is ink. Atoms through `F.el` (M and L take the palette's fallback); light, the wheel and solution colours are facts.

## Referents

None. The two iron(II) complexes of Figure 19.35 are not drawn side by side; the slider passes from one case to the other.

## Exercises

Check Your Learning after Example 19.7 (host `ex-high-low-spin`, `source_id` fs-idm131078432, open, "d⁴, d⁵, d⁶, and d⁷"), Example 19.8 (`ex-other-geometries`, fs-idm108712192, the number 4 with the book's explanation) and Example 19.9 (`ex-colors`, fs-idp4936672, open, "red, 620–800 nm").

End of section, ten of thirteen kept. Six keyed: fs-idm69906288 (37, open, the key is the book's image), fs-idm40512384 (39, the number 3 with the product), fs-idm67958768 (41, five counts as a multi answer), fs-idm124930528 (43, open), fs-idm79409024 (45, open), fs-idm103127008 (47, open). Two unkeyed choice items kept open with their options and an AI-marked suggested approach: fs-idp74371168 (46, diamagnetic or paramagnetic), fs-idp70727968 (48, which absorbs higher-energy photons, which has the larger splitting). Two unkeyed conceptual items with an AI-marked suggested approach: fs-idm98451056 (40), fs-idm107475184 (42). Left out and named, since the answers would be worked out: fs-idp119097632 (36, unpaired electrons), fs-idp62990928 (38, oxidation state and counts), fs-idm147246656 (44, formula and geometry from an analysis). No moves.

## Left out

The Link to Learning on the reduction of vanadium complexes; the sentence pointing at it is kept as printed. Errata kept as printed: "*d<sub>zy</sub>*" in the t<sub>2g</sub> list, "Hund's rule" with a straight apostrophe, Figure 19.35's "5*d* orbitals" and "*eg*" (in its original caption), Example 19.9's v for the frequency and "450 (blue)", "blue, blue-green violet, or yellow", and exercise 36's missing space (36 is left out).

## Wanted at chapter level

- form anchor: eq-delta-tet → 19.3-ex-other-geometries
- variables anchors: 19.3/Δ_oct → 19.3-cft; 19.3/P_pair → 19.3-cft; 19.3/Δ_tet → 19.3-ex-other-geometries; 19.3/λ → 19.3-ex-colors; 19.3/ν → 19.3-ex-colors; 19.3/E → 19.3-ex-colors; 19.3/c → 19.3-ex-colors; 19.3/h → 19.3-ex-colors
- no concept, edge or symbol fixes

Applied by the chapter pass (2026-10-05): `eq-delta-tet` anchored to `19.3-ex-other-geometries` through `ost set … forms` (merged into `book.json`); `Δ_oct` and `P_pair` anchored to `19.3-cft`, `Δ_tet` to `19.3-ex-other-geometries`, and `λ`, `ν`, `E`, `c` and `h` to `19.3-ex-colors`. The colour wheel's computed pink-magenta at 499 nm, where the book calls the solution purple, is recorded in `ch19/exploration.md`.
