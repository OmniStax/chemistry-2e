# Plan: 19.2 Coordination Chemistry of Transition Metals (m68843)

Written 2026-10-05 before the build and left for review, as `ch19/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Five objectives, twenty-one numbered figures (19.12 to 19.32), five tables (19.1 to 19.5), three worked examples (19.4 to 19.6) each with a keyed Check Your Learning, two boxed notes (Transition Metal Catalysts, Portrait of Deanna D’Alessandro), one Link to Learning (dropped), sixteen glossary entries (already on the concepts), ten end-of-section items (chapter exercises 26 to 35).

## Sub-concepts and spans

The opening has no book header and takes one of the section's own; the other four headers are the book's.

| Span | Header | Concepts |
|---|---|---|
| `coordination` | Coordination compounds (the section's own; Figures 19.12, 19.13, 19.15, 19.16, 19.17) | introduces `central-metal`, `donor-atom`, `coordination-sphere`, `monodentate-ligand`, `bidentate-ligand`, `polydentate-ligand`, `chelate`; uses `coordination-compound`, `coordinate-covalent-bond`, `lewis-acid`, `lewis-base`, `ligand`, `coordination-number`, `transition-metal`, `inner-transition-metal`, `main-group-element`, `octet-rule`, `valence-electrons`, `covalent-bond`, `ionic-bond`, `lone-pair` |
| `naming` | The Naming of Complexes (Tables 19.1 to 19.4, Example 19.4) | introduces `naming-coordination-compounds`; uses `coordination-sphere`, `oxidation-number`, `anion`, `cation`, `ligand`, `coordination-number` |
| `structures` | The Structures of Complexes (Figure 19.14 + 19.18 + 19.19 + 19.20, Table 19.5) | introduces `complex-geometry`; uses `coordination-number`, `vsepr-theory`, `bond-angle`, `main-group-element` |
| `isomerism` | Isomerism in Complexes (Figure 19.21 + 19.22, Example 19.5, Figure 19.23 + 19.24) | introduces `geometric-isomer`, `cis-trans-configuration`, `optical-isomer`, `linkage-isomer`, `ionization-isomer`; uses `isomers`, `polar-molecule`, `electronegativity`, `bond-dipole-moment` |
| `nature` | Coordination Complexes in Nature and Technology (Figures 19.25 to 19.32, both notes, Example 19.6) | introduces `complexes-in-nature-and-technology`; uses `main-group-element`, `photosynthesis`, `catalyst`, `activation-energy`, `chelate`, `polydentate-ligand`, `donor-atom`, `electroplating`, `cis-trans-configuration` |

## Figures

- sim-complex-geometry · Figure 19.14 + 19.18 + 19.19 + 19.20 · complex-geometry, coordination-sphere, coordination-number, monodentate-ligand, bidentate-ligand · value add: depth and standardisation: the book draws the complexes of these four figures in wedge-and-dash perspective and the shapes of coordination numbers seven and eight as bare polyhedra, while Table 19.5 names ten geometries in words; here every complex the four figures and Table 19.5 name is one ball-and-stick ion the reader turns, its donor atoms at the corners of a faint polyhedron, so the shape each coordination number gives is seen rather than imagined from a wedge · arrows: none · still: no clock; a new complex is one morph, each ligand swinging along a great circle from its old corner to its new one, ligands that leave shrinking into the metal and new ones growing out of it, an atom of a changed ligand crossfading · choice complex (`F.select`, sixteen options in Table 19.5's order of coordination number: [Ag(NH₃)₂]⁺; [Cu(CN)₃]²⁻; [CuCl₄]²⁻, [Zn(CN)₄]²⁻, [Ni(CO)₄]; [Ni(CN)₄]²⁻, [Pt(NH₃)₂Cl₂]; [CoCl₅]²⁻; [VO(CN)₄]²⁻; [Co(H₂O)₆]²⁺, [Cr(en)₃]³⁺, K₂[PtCl₆], [CoCl₆]³⁻; [ZrF₇]³⁻; [ReF₈]²⁻; [Mo(CN)₈]⁴⁻; default [Co(H₂O)₆]²⁺, Figure 19.14 (c) and 19.19 (a)); [ReH₉]²⁻ is left out because the book names no shape for it · headline: the geometry and coordination number of the chosen complex ("In [Co(H₂O)₆]²⁺ six donor atoms sit at the corners of an octahedron: the coordination number is six.") · readout: the book's way of finding the metal's oxidation state (Example 19.4), the ion's charge as the sum of the ligands' charges and x, e.g. $+2 = 6(0) + x$, $x = +2$, morphing by meaning when the ligand set changes; note: the bond angle the text states for that shape (109.5° tetrahedral, 90° and 180° square planar, 90° octahedral), drawn as an arc in the angle hue between two donor atoms, or none for the shapes whose angles the text does not state · graph none · 3D, physical (coordination geometries are 3D by the book's rule): a molecule on no ground, free yaw, pitch within ±90°, idle spin, views front and down the axis, zoom; flat fallback without WebGL is figlib's message · labels: the metal and one ligand of each kind (at most three labels); every atom named on hover (up to 33 atoms with [Cr(en)₃]³⁺, en drawn as its two N and two C atoms, H omitted on en as the book writes NH₂ and CH₂).
- sim-cis-trans · Figure 19.21 + 19.22 · geometric-isomer, cis-trans-configuration · value add: depth and variation by choice: the book draws cis and trans side by side in perspective; here one chloride ligand swings round the metal from beside the other to opposite it, so the reader sees that the isomers differ only in where that one ligand sits · arrows: none · still: a choice is one morph, the moving chloride and the ligand it trades places with each swinging along a great circle, the second bowed outward so they pass · choices complex (`F.select`, a row would wrap: [Co(H₂O)₄Cl₂]⁺ (Figure 19.21), [Co(NH₃)₄Cl₂]⁺ (the text's), [Pt(NH₃)₂Cl₂] (Figure 19.20 (b) and 19.22)) and isomer (`F.choice`: cis, trans), default [Co(H₂O)₄Cl₂]⁺ cis · headline: which isomer and, for the two cobalt complexes, its colour as fact (violet cis, green trans, a swatch through `F.fact`) · readout: the Cl–M–Cl angle, $\angle\text{Cl–Co–Cl} = 90^\circ$ or $180^\circ$, drawn as an arc in the angle hue; note: whether the bond dipoles cancel (the text's polarity argument) · graph none · 3D, physical, bound as above; views front (the book's) and from above · labels: the metal and one of each ligand kind; hover names on all.
- sim-optical-isomers · Figure 19.23 + 19.24 · optical-isomer, cis-trans-configuration · value add: depth, the chapter's clearest 3D lesson: the book asks the reader to see that a mirror image cannot be laid on its original; here the image is turned every way the octahedron allows and laid over the original, and its rings land where the original has none, while the trans form of [Co(en)₂Cl₂]⁺ lands atom for atom · arrows: none · still: a choice is one morph, the original and its image sliding together as the image turns about the axis of the best overlay · choices complex (`F.select`, a row would wrap: [M(en)₃]ⁿ⁺ (Figure 19.23), *cis*-[Co(en)₂Cl₂]⁺, *trans*-[Co(en)₂Cl₂]⁺ (Figure 19.24)) and arrangement (`F.choice`: mirror images, laid over), default [M(en)₃]ⁿ⁺ mirror images · headline: what the arrangement shows for the chosen complex · readout: the count of atoms the image leaves without a twin in the best overlay, e.g. $\text{atoms without a match} = 6$, or $= 0$ for trans; note: none · graph none · 3D, physical, bound as above; no idle spin, since a pair turning about its middle hides one behind the other; views front (the book's, the mirror plane edge-on) and from above · the mirror plane a faint ink square between the two, fading as they are laid over; in the overlay the image is drawn translucent so an unmatched atom shows as a ghost · labels: M or Co, one N, one C, one Cl where present, and "mirror" on the plane; hover names on all, an unmatched atom of the image named as such.
- fig-colors · Figure 19.12 · kept photograph, the text points at it; the six solutions' colours are the facts of 19.3 · photo
- fig-bond-type · Figure 19.13 · kept as printed, electron-dot structures: flat notation the text points at, nothing varies · photo
- fig-en · Figure 19.15 · kept as printed: (a) is a Lewis structure with lone pairs, flat by the book's rule, and (b) [Co(en)₃]³⁺ is the complex the optical-isomer Sim turns · photo
- fig-heme · Figure 19.16 · kept as printed, a skeletal structure · photo
- fig-glycinate · Figure 19.17 · kept as printed, a skeletal structure · photo
- fig-chlorophyll · Figure 19.25 · kept as printed, two skeletal structures · photo
- fig-catalysts · Figure 19.26 · kept photographs inside the Everyday Life note · photo
- fig-catalytic-converter · Figure 19.27 · kept labelled photograph inside the Portrait box · photo
- fig-dalessandro · Figure 19.28 · kept portrait (Portrait of a Chemist) · photo
- fig-hemoglobin · Figure 19.29 · kept ribbon model, the text points at it · photo
- fig-edta · Figure 19.30 · kept as printed: EDTA's six donor atoms round the metal would turn well, but the text only names the ligand and its hexadentate binding; listed below as an extra · photo
- fig-bal-enterobactin · Figure 19.31 · kept as printed, skeletal structures · photo
- fig-dmsa · Figure 19.32 · kept as printed inside Example 19.6, which asks the reader to find donor atoms on it: a figure that serves an exercise is copied · photo
- Unnumbered image `fs-idp9187376` (Example 19.5's answer) stays in its answer; the key images of exercises 29 and 35 stay in their answers.

Extra simulations (not built, root rule 15): EDTA wrapping round a metal ion in 3D, its six donor atoms closing on the octahedron's corners one by one as the chelate forms.

## Tables

Tables 19.1 to 19.5 as `div.book-table`, 19.2 to 19.4 without a header row as the book prints them.

## Types bound

`angle` only: the bond angles the text states (109.5°, 90°, 180°) are marked `data-type="angle"` as 7.6 marks them, and the figures' arcs, their labels and the readout's angle wear the angle hue (`draws: ["angle"]` on the two figures that draw an arc). Oxidation states, charges, coordination numbers and the count of unmatched atoms stay ink. Conventions: `F.el` for Ag, Cu, Zn, Ni, Pt, Co, V, Cr, Zr, Re, Mo, M, N, H, O, C, Cl, F. Facts: violet and green of cis and trans [Co(NH₃)₄Cl₂]⁺ and [Co(H₂O)₄Cl₂]⁺. No referents.

## Exercises

Check Your Learning, inline after their examples, each keyed: Example 19.4 (fs-idp246755792, open), 19.5 (fs-idp279300448, open with the answer image), 19.6 (fs-idp8695360, open). End of section, chapter numbers 26 to 35: keyed and kept, 27 (fs-idp151424672), 29 (fs-idp5586896, the six key images), 31 (fs-idp39161552, with the eight compounds of exercise 28 written into its prompt), 33 (fs-idp74861776), 35 (fs-idp128328048, the key image); kept open with its options and an AI-marked approach, 34 (fs-idp128328592); left out and named, 26 (fs-idp178303616) and 28 (fs-idp104842000), coordination numbers, 30 (fs-idp55630960), drawings, 32 (fs-idp39687552), names. No moves.

## Left out

The Link to Learning to the University of Sydney's naming quizzes. Errata kept as printed: "dicyanoargenate(I)"; "[Cu(Cl)₄]²⁻" in Figure 19.14's caption (now in the original caption); "SCN−" written flat; the ionization isomers [CoCl₆][Br] and [CoCl₅Br][Cl]; Figure 19.22's "directly across from an adjacent ligand"; Figure 19.27's catalytic converter that changes "carbon dioxide emissions from power plants"; Example 19.5's "In the Figure 19.20"; its answer image marked 2−; the key's "tetraamine", "diaminedibromo", "diaminedichloro"; "dibromobis(ethylenediamine) cobalt(III)"; "CO₃²⁻will".

## Wanted at chapter level

- none

Applied by the chapter pass (2026-10-05): nothing wanted. The bond angles typed `angle` where the chapter notes bound nothing are kept and written into `ch19/COLOR.md` as built.
