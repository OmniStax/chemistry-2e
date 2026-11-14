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

- sim-d-orbitals · Figure 19.33 + 19.34 + 19.36 · crystal-field-theory, eg-and-t2g-orbitals, crystal-field-splitting, crystal-field-other-geometries · value add 3D and variation by choice: the book prints five perspective drawings of the d orbitals among their ligands, a separate box diagram, and the tetrahedral ligands on a cube inside Example 19.8; here the reader turns one orbital among the ligands of the chosen geometry and sees its box on the splitting beneath, so "points at the ligands" and "lies higher" are read off one figure · arrows: symbolic (axes, energy axis, Δ arrow) · still: a change of geometry slides the ligands to their new sites (two fade out for tetrahedral and square planar) while the boxes slide to their new heights; a change of orbital bends the old lobes into the new, as 6.3's orbital shapes do · choices geometry (octahedral, tetrahedral, square planar; default octahedral) and orbital (dx²−y², dz², dyz, dxz, dxy, the book's order; default dx²−y²) · headline in the stage's band says where the chosen orbital's lobes point relative to the ligands · box diagram below on its own flat canvas, as Figure 19.34 draws it: an energy axis, five boxes named beneath, the chosen box shaded, the level lines at the boxes' floors with "e_g orbitals" and "t_2g orbitals" (or e, t₂) and the Δ arrow between them; Δtet four ninths of Δoct; square planar in the order of the book's unnumbered diagram with spacing for reading, since the book gives no values · readout E(e_g) − E(t_2g) = Δoct; E(t₂) − E(e) = Δtet = 4/9 Δoct; the square planar order as one chain · mathematical 3D (the lobes are the maths): each orbital is one contour of |ψ| for its angular function with a hydrogen-like 3d radial factor, as 6.3 draws its orbitals, so the lobes are closed and rounded like the book's; the two signs of ψ in the two colours 6.3 uses, F.cat(0) and F.cat(1); axes x, y, z drawn with their names at the tips, hidden while seen against a lobe; free orbit, idle spin, no other button · ligands are point charges, F.el('L') spheres on thin sticks; the tetrahedral cube in muted lines fading in with the tetrahedron · a key row under the scene: ligand L, ψ > 0, ψ < 0
  works: parts: the metal at the origin, the three axes, the ligands on ±x, ±y, ±z (octahedral), at alternate corners of a cube (tetrahedral), on ±x, ±y (square planar); one d orbital · must hold: dx²−y² lobes along x and y; dz² two lobes along z and a ring in the xy plane of the other sign; dxy, dxz, dyz lobes between their two axes in their plane; each orbital's opposite lobes of the same sign; eg (dz², dx²−y²) above t2g (dxy, dxz, dyz) by Δoct; tetrahedral e below t₂ by 4/9 Δoct; square planar dxz = dyz < dz² < dxy < dx²−y² · read off the image: 19.33 z up with x toward the reader on the right and y away, L at each axis end, the lobes in two shades; 19.34 three boxes dxy, dxz, dyz below two boxes dz², dx²−y², "e_g orbitals", "t_2g orbitals", Δoct between the lines; 19.36 the cube with four ligands at alternate corners and dxz between x and z; 2026-11-14 re-examination: rebuilt, the stock lobes, small scene, boxed labels and three view buttons gone, the orbital now drawn from its wave function to fill the stage, the levels drawn as the book's boxes
- sim-high-low-spin · Figure 19.35 · pairing-energy, high-and-low-spin-complexes, crystal-field-splitting, hunds-rule · value add variation by slider and by choice: the book prints two fixed iron(II) cases; here the splitting is dragged against a fixed pairing energy, drawn beside it as a bracket from the same floor so the two lengths are compared directly, and the electrons of any d count rearrange as Δoct passes P · arrows: symbolic (spins, the Δ arrow, the energy axis) · still: the gap answers the slider; crossing the special value moves the electrons that change between e_g and t_2g in one eased beat · slider Δoct/P (0.50 to 2.00, default 0.60, the weak-field case of [Fe(H₂O)₆]²⁺; the floor keeps the two rows of boxes apart), dashed circle at 1; select d count d¹ to d¹⁰ (default d⁶) · headline "Six d electrons, Δoct < P: high spin, four unpaired electrons, as in [Fe(H₂O)₆]²⁺." and its low-spin, equal and no-choice forms, the book's complex named for d⁶ · no graph; the free ion's five boxes on the left (Hund's rule), the octahedral boxes about the same average, e_g 0.6 Δoct above it and t_2g 0.4 Δoct below (a drawing choice; the book's diagram is not to scale) · readout one line, Δoct = 0.60 P < P ⇒ t_2g⁴ e_g², or Δoct = 0.60 P ⇒ the one arrangement for d¹–d³ and d⁸–d¹⁰ · 2D (an energy diagram, book rule)
  works: parts: free-ion row of five boxes; complex rows of three (t_2g) below two (e_g); the Δ arrow between their floors; P as a bracket from the t_2g floor · must hold: the free ion is filled by Hund's rule; d⁴–d⁷ high spin when Δoct < P and low spin when Δoct > P; d⁶ high spin t_2g⁴e_g² with four unpaired, low spin t_2g⁶ with none; half arrows up with the barb left, down with it right, as the book draws them · read off the image: "Fe²⁺ no ligands" five boxes 1 pair + 4 singles; [Fe(H₂O)₆]²⁺ "High spin, small Δoct" with t_2g 1 pair + 2 and e_g 2 singles; [Fe(CN)₆]⁴⁻ "Low spin, large Δoct" t_2g three pairs, e_g empty; 2026-11-14 re-examination: kept, enlarged to fill the stage, the readout one comparison where it compared 2Δoct with 2P, the slider's floor raised so the rows never overlap
- sim-color-wheel · Figure 19.37 · complementary-colors, colors-of-complexes, photon-energy · value add variation by slider and flow by animation: the book prints one test tube of [Cu(NH₃)₄]²⁺ and a fixed wheel; here the absorbed wavelength is dragged around the book's wheel, its complement is marked across it, the solution takes the colour of white light with that band removed, and the photon energy of Example 19.9 is computed live · arrows: kinematic (white light travelling into the tube and the transmitted light leaving it) · moving: each loop the light's front crosses the bench in 4 s, linearly, the absorbed colours ending in the solution, then holds 1.2 s · slider λ (400 to 800 nm, default 499 nm, Example 19.9's absorption maximum) · headline "The solution absorbs light around 499 nm; the eye sees the color across the wheel." · no graph; the wheel left with a key for absorbed and seen, the test tube right · readout E = hν = hc/λ = … = 3.99 × 10⁻¹⁹ J = Δoct, one chain · 2D · facts: the wheel, the seven rays and the solution's colour are light in its own colour ("spectrum"); the solution's colour is white light less a band about λ, which the book's broad absorptions only approximate
  works: parts: the wheel of six sectors; white light of seven colours; a test tube of solution; the transmitted rays · flow: rays left to right through the tube · must hold: wheel boundaries at 620 nm (top), 580, 560, 490 (bottom), 430 and 400/800 nm in the book's places; the complement 180° across; rays absorbed near λ stop in the solution · read off the image: (b) 620 nm top, 580 nm upper right, 560 nm lower right, 490 nm bottom, 430 nm lower left, 800 nm/400 nm upper left; (c) "White light", "Blue-appearing light", seven rays, the red and orange ones ending at the tube; panel (a) is not redrawn; 2026-11-14 re-examination: kept, the wheel and tube enlarged, the tube drawn with its lip and meniscus, a key in place of the hand-drawn one, the caption one sentence
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

## Derivations

- Example 19.8, the tetrahedral splitting as four ninths of the octahedral · score 11 · not built: asserted without argument; its derivation rests on crystal field theory the book never states
