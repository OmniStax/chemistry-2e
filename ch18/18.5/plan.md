# Plan: 18.5 Occurrence, Preparation, and Compounds of Hydrogen (m68833)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, four numbered figures (18.26 Electrolys, 18.27 IronHCl, 18.28 LiqHliqO, 18.29 Ammonia), one unnumbered image (`fs-idp81139952`, the Lewis structures of ammonia, chloramine and hydrazine), Table 18.1, no worked example, no note, no Link to Learning, five end-of-section items (chapter exercises 51 to 55). No Check Your Learning, so no inline host.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `hydrogen` | Hydrogen and its isotopes (the section's own header for the untitled opening) | introduces `hydrogen-isotopes`; uses `isotopes`, `molecule`, `vapor-pressure`, `electrolysis` |
| `preparation` | Preparation of Hydrogen (the book's; h3 From Steam and Carbon or Hydrocarbons, Electrolysis, Reaction of Metals with Acids, Reaction of Ionic Metal Hydrides with Water; Figures 18.26, 18.27) | introduces `hydrogen-preparation`; uses `catalyst`, `hydrocarbon`, `electrolysis`, `cathode`, `anode`, `standard-electrode-potential`, `strong-base` |
| `reactions` | Reactions (the book's; h3 Reactions with Elements with Table 18.1, Reaction with Compounds; Figure 18.28) | introduces `hydrogenation`, `hydrogen-place-in-periodic-table`, `hydrogen-reactions`; uses `exothermic-process`, `valence-electrons`, `cation`, `anion`, `covalent-bond`, `ionic-compounds`, `reducing-agent`, `strong-base`, `electronegativity`, `weak-acid` |
| `compounds` | Hydrogen Compounds (the book's; h3 Nitrogen, Phosphorus, Sulfur and Halogen Hydrogen Compounds; Figure 18.29, the unnumbered image) | introduces `haber-process`, `ammonia-chemistry`, `hydrogen-halide`; uses `nonmetal`, `weak-acid`, `strong-base`, `catalyst`, `enthalpy-change`, `hydrogen-bonding`, `bronsted-lowry-base`, `lewis-base`, `standard-free-energy-of-formation`, `oxidizing-agent`, `reducing-agent`, `disproportionation-reaction`, `diprotic-acid`, `strong-acid`, `standard-electrode-potential` |

## Figures

- sim-electrolysis · Figure 18.26 · hydrogen-preparation, electrolysis · value add: flow by animation and depth; the book draws one moment and explains the 2:1 volumes in the caption; here the gases bubble up from the battery's terminals and collect in the two test tubes, the hydrogen column growing twice as fast as the oxygen against the tubes' graduations, so the reader sees the caption's ratio form rather than reading it · arrows: the book's three arrows point from the scene to its molecule insets, symbolic, and become the legend strip; no kinematic arrow is printed, but the bubbles rising and the gas collecting are motion (config: gas bubbling is kinematic) · moving: the electrolysis runs for 6 s of clock and holds, one O₂ for every two H₂ rising from the terminals, the water in each tube falling as its gas collects · no slider and no choice: the text gives no current, voltage or time to vary, and the ratio is the same at every rate · headline "Hydrogen collects at the cathode (−) twice as fast as oxygen at the anode (+)." · no graph; a legend strip beneath names water, hydrogen and oxygen in the book's inset molecules · physical 3D, an apparatus (book rule): the beaker on a bench, the battery standing in it, two inverted test tubes over its terminals held by a ring; pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the gases already move, views front and above · H and O by `F.el`; labels H₂(g), O₂(g), cathode (−), anode (+), battery, H₂O(l) + H₂SO₄ (six, all on still parts); the rising molecules move and are named in the legend and on hover · readout the volumes the clock drives, $\kV_{\text{H}_2} = 2\,\kV_{\text{O}_2}$ with the collected millilitres in the `volume` hue, never highlighted (the tubes are drawn as 10 mL tubes, a scale of the drawing's own, since the book states none) · no note: the caption gives the reason and the readout the ratio
- fig-iron-hcl · Figure 18.27 · hydrogen-preparation · kept photograph, the text points at it (iron in hydrochloric acid) · photo
- fig-shuttle · Figure 18.28 · hydrogen-reactions · kept photograph, the text points at it (liquid hydrogen as rocket fuel) · photo
- fig-ammonia · Figure 18.29 · ammonia-chemistry · kept as printed: a ball-and-stick ammonia molecule the text names as the product; its shape is 7.6's lesson, turned there in 3D, and a viewer here would be a molecule merely named (rule 24.9) · arrows: none · photo row with its number
- fig-ammonia-derivatives · unnumbered image `fs-idp81139952` · ammonia-chemistry · kept as the book prints it: three Lewis structures (ammonia, chloramine, hydrazine), 2D by the book's rule, nothing to vary · arrows: none · figure row, no number, the image in its own markup

Extra simulations: none. Isotopes side by side were weighed and rejected: the text states their names and a ratio, and a drawing would only restate them.

## Tables

Table 18.1, Chemical Reactions of Hydrogen with Other Elements, as `div.book-table` with its eyebrow and title.

## Types bound

`energy` (ΔH° of the Haber process and of hydrazine's combustion, $\kdHo$; the 286 kJ released per mole of water), `potential` (E° of the halogen couples and of Br₂ + HI, $\kEo$; "reduction potentials" in the metals-with-acids paragraph), `temperature` (1000 °C, 2800 °C, −33 °C, 2 °C, 113.5 °C, 25 °C), `density` (hydrazine's 1.00 g/mL), `volume` (658 L of ammonia, 1 L of water; the figure's gas volumes, a new variables row `18.5/V`), and $\kdGf$ for hydrazine's free energy of formation (`energy`). Oxidation states, the 1 in 7000 and 1 in 10¹⁸ ratios, the 90% and two thirds, coefficients and charges stay ink. Atoms H and O by `F.el`. No referents.

## Exercises

Five items. Three keyed and kept: fs-idm24100896 (51, open), fs-idp235517504 (53, open), fs-idp52465648 (55, 0.43 g H₂, number with 2% tolerance). Two left out and named: fs-idp75856256 (identify Lewis acid and base, oxidant, reductant and the changes in oxidation number, unkeyed, the answer would be computed) and fs-idp249418928 (numerical, unkeyed). No suggested approaches, no moves.

## Left out

No Link to Learning. Errata kept as printed: "Water gas is as an industrial fuel"; "Inorganic derivations include"; "In which case, the sulfide may oxidize"; Table 18.1's first row writes "MH or MH₂ ⟶ MOH or M(OH)₂ + H₂" without the water.

## Wanted at chapter level

- 18.5/ΔH° → 18.5-compounds
- 18.5/ΔG_f° → 18.5-compounds
- 18.5/E_std → 18.5-compounds
- 18.5/V added by this section with its anchor (→ 18.5-preparation), concept `volume`

Applied by the chapter pass (2026-10-05):

- Anchors: 18.5/ΔH°, 18.5/ΔG_f° and 18.5/E_std → 18.5-compounds; 18.5/V was already anchored at 18.5-preparation.
- Figure 18.26's readout rounds the oxygen volume first and writes the hydrogen volume as twice it, so the two numbers shown always agree (it read 1.9 mL = 2 (0.9 mL) before).
