# Exploration: Chemistry 2e, Chapter 12 Kinetics

Written 2026-09-28, before the chapter was prepared. The eight modules were converted with `python3 tools/convert.py 12` and read in full; the figure, table and example numbers of 12.4 and 12.7 were checked against openstax.org and the rest follow from them in book order. Nothing in the chapter departs from the book's organisation as the book's `RULES.md` records it.

## Why this chapter

Every chapter so far asked what a reaction makes and how much energy it trades; this one asks how fast. It defines a rate and ties the rates of all species together through the coefficients (12.1), names the five things that change a rate (12.2), writes the rate law and finds its orders by experiment (12.3), integrates it to follow a concentration through time and defines the half-life (12.4), explains all of it by collisions with the right orientation and enough energy, which is the Arrhenius equation (12.5), breaks a reaction into elementary steps whose slowest sets the rate (12.6), and shows a catalyst opening a lower road over the barrier (12.7). The thread is the activation barrier: 12.2's temperature and catalyst are explained in 12.5 and 12.7.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68785 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 12.1 Chemical Reaction Rates | m68786 | 2 | 4 | 0 | 0 | 5 | 2 | 6 | 3 | 1 everyday-life (urine test strips) |
| 12.2 Factors Affecting Reaction Rates | m68787 | 0 | 2 | 0 | 0 | 1 | 0 | 5 | 3 | 3 link-to-learning (one PhET) |
| 12.3 Rate Laws | m68789 | 3 | 1 | 0 | 1 | 5 | 4 | 20 | 10 | — |
| 12.4 Integrated Rate Laws | m68791 | 7 | 4 | 0 | 1 | 2 | 7 | 18 | 9 | two CYL answers are images |
| 12.5 Collision Theory | m68793 | 1 | 4 | 0 | 0 | 6 | 1 | 17 | 9 | — |
| 12.6 Reaction Mechanisms | m68794 | 1 | 2 | 1 | 0 | 8 | 1 | 9 | 4 | one AP item |
| 12.7 Catalysis | m68795 | 1 | 7 | 2 | 1 | 2 | 1 | 9 | 5 | 1 portrait, 2 sciences-interconnect, 1 everyday-life, 2 link-to-learning |

## Numbers as openstax.org prints them

- Figures: intro 12.1 Ectotherm. 12.1: 12.2 KDataH2O2 (a data table printed as an image), 12.3 RRateIll, 12.4 Urinestrip (in the test-strip note), 12.5 NH3Decomp. 12.2: 12.6 AcidDissol, 12.7 NYSStatue. 12.3: 12.8 OzoneHole (inside Example 12.4). 12.4: 12.9 FrstOKin, 12.10 2OrdKin, 12.11 AmDecomK (after Example 12.10 in the CNXML), 12.12 HPerDcmp (inside Example 12.11). 12.5: 12.13 COandO2, 12.14 RCooDgm, 12.15 SuccessR, 12.16 ArrhPlot. 12.6: 12.17 BimoElRe, 12.18 Cattle. 12.7: 12.19 CatReCoDig, 12.20 Molina (in the portrait), 12.21 Gluc6PhoDe, 12.22 HMPShuntPa (both in the G6PD note), 12.23 HetCats (file `CNX_Chem_12_07_HetCats-230a.jpg`), 12.24 CatConvert (in the converter note), 12.25 Enzyme (in the enzyme note).
- Tables: 12.1 Rate Constant Units for Common Reaction Orders (12.3); 12.2 Summary of Rate Laws for Zero-, First-, and Second-Order Reactions (12.4); 12.3 Classes of Enzymes and Their Functions (12.7). Every data table inside an example or an exercise is unnumbered and stays with it.
- Examples: 12.1–12.2 (12.1); 12.3–12.5 (12.3, Example 12.3 with two Check Your Learning items); 12.6–12.12 (12.4); 12.13 (12.5); 12.14 (12.6); 12.15 (12.7).
- Unnumbered images: 12.4 the CYL answer plots `CNX_Chem_12_04_CYL1_img.jpg` and `CNX_Chem_12_04_CYL2_img.jpg`; 12.6 `CNX_Chem_12_06_CyclobD_img.jpg` (the cyclobutane equation in structures); 12.7 `CNX_Chem_12_07_Rxndiagramex_img.jpg` (Example 12.15) and `CNX_Chem_12_07_Rxndiagramcyl_img.jpg` (its CYL). In exercises: 12.4 `Exercise02_img`, `Exercise04_img_new`, `Cycloprop_img`, `ExSolutio2_img`; 12.7 `Exercise4a/4b/5a/5b/6a/6b/7a/7b_img`. No bundle name carries a space.

## What is new

Rate and its sign convention; average, instantaneous and initial rates as secant and tangent; relative rates; the rate law, orders, rate constant and its units; the method of initial rates; integrated rate laws of orders 0, 1, 2 and their linear plots; half-life; collision theory, orientation, activation energy, the transition state; reaction diagrams; the Arrhenius equation and its linear and two-point forms; mechanisms, molecularity, intermediates, the rate-determining step, the pre-equilibrium derivation; homogeneous, heterogeneous and enzyme catalysis. No new type: the book already declares `rate`. New typed symbols: [A], [A]₀, [A]ₜ, [B], Δ[A], Δ[B] (concentration), E_a (energy); untyped k₁, k₂, k₋₁, the frequency factor A and the orders m and n.

## Sketches to redraw and photographs to keep

Sketches that teach and invite a live figure: 12.2 with 12.3 (the data table and its curve with a draggable tangent, a fold candidate), 12.5 (three curves and their tangents at a chosen time), 12.9 + 12.10 + 12.11 (one data set plotted as [A], ln[A] or 1/[A], a fold candidate), 12.12 (flasks fading by half each half-life, a clock), 12.13 (orientation of CO on O₂), 12.14 (reaction diagram), 12.15 (energy distribution with sliders for T and E_a, a fold of (a) and (b)), 12.16 (Arrhenius plot), 12.17 (NO₂ + CO through its transition state), 12.19 (reaction diagram with a catalyst choice), 12.23 (hydrogenation on nickel, four steps as a choice), 12.25 (lock-and-key against induced fit, a choice). Kept as stills: 12.22 (a pathway chart), 12.24 (a cutaway with equations).

Photographs, all kept because the text points at each: 12.1, 12.4, 12.6, 12.7, 12.8 (the ozone map, which Example 12.4 cites), 12.18, 12.20 (a portrait and the ozone hole), 12.21 (the enzyme model).

## Notes, links and PhET

Link to Learning, all dropped and named in `notes`: 12.2 the cesium video, the phosphorus video and the PhET Reactions & Rates interactive (the trigger for a collision Sim of our own); 12.7 the ChemWiki converter page and the Royal Society of Chemistry enzymes page. Boxed notes kept verbatim: Reaction Rates in Analysis: Test Strips for Urinalysis (12.1); Mario J. Molina (12.7); Glucose-6-Phosphate Dehydrogenase Deficiency, Automobile Catalytic Converters, Enzyme Structure and Function (12.7). The Molina note carries a footnote to NobelPrize.org, kept as the note's own words.

Five exercises open the PhET Reactions & Rates simulation and are `simulation-exercise`: 12.2 `fs-idm66513728` (keyed, single collision, angle), `fs-idm66455280` (unkeyed, many collisions), `fs-idm49710224` (keyed, many collisions, temperature); 12.5 `fs-idp179196768` (unkeyed, energy view), `fs-idp11390128` (keyed, angled shot with energy view). Each is held and named in `exercise_notes` unless the section builds a Sim of its own that carries it (A + BC with a launch angle and energy, and a many-collisions box with temperature and amounts) and the plan rewrites the prompt against that Sim.

## Exercises and keys

Every CYL is keyed. Keyed counts per section are in the table above.

- Left out, unkeyed numerical: 12.1 `fs-idp24119136`, `fs-idm40595504`; 12.3 `fs-idm211287824`, `fs-idm207653024`, `fs-idm53134032`, `fs-idm147604432`, `fs-idm233306880`, `fs-idm146074112`, `fs-idm168734944`, `fs-idm140371280`, `fs-idm152420960`; 12.4 `fs-idm81797520`, `fs-idp123052496`, `fs-idm71090800`, `fs-idm82644240`, `fs-idm22532944`, `fs-idm45932336`, `fs-idp120051200`, `fs-idm43018880`; 12.5 `fs-idm67340288`, `fs-idm129065792`, `fs-idm166518032`; 12.7 `fs-idm260004768` (estimate E_a from two diagrams).
- Kept open with its options, never graded: 12.5 `fs-idm3600240` (four choices, collisions per second).
- Kept with an AI-marked approach, unkeyed conceptual or symbolic: 12.1 `fs-idp77962352` (a relative-rate expression for ozone); 12.2 `fs-idm86018304`; 12.3 `fs-idm181252208`; 12.4 `fs-idp11885680`; 12.5 `fs-idm147445136`, `fs-idm190953584`, `fs-idm122581792`; 12.6 `fs-idm14620304`, `fs-idp48807664`, `fs-idp38703248`, `fs-idp63617152`, `fs-idp225129424`; 12.7 `fs-idm119808848`, `fs-idm194307024`, `fs-idm189363504` (it points at the diagrams of `fs-idm260004768`, which is left out, so the section carries those two images into this item's prompt or leaves it out too).
- Belongs to another section: none moves. 12.1's `fs-idm57147216` data reappear as 12.4's second-order CYL, and 12.1's `fs-idp24119136` data as Example 12.9, but each tests its own section.

Errata kept as printed and named in `notes`: Figure 12.6's caption equation, Fe(s) + HCl(aq) ⟶ 2FeCl₂(aq) + 3H₂(g), is unbalanced; 12.1's key to `fs-idm82430624` writes ClF₃ as "CIF₃"; 12.1 text "t₂** − t₁" is a markup slip written plainly; 12.3's list of rate laws writes 2N₂O₅ ⟶ NO₂ + O₂ unbalanced; Example 12.4's "the rate increases also triples"; 12.3 `fs-idm57376432` key opens with a stray "(a)"; the summary of `fs-idm49483024`'s table says 4.7 × 10⁻⁴ where the cell has 4.17 × 10⁻⁴; Example 12.8 writes 1/0.200 mol⁻¹ for 1/(0.200 mol L⁻¹); the 12.4 glossary term is printed "t_l/2" with a letter l; 12.5's key to `fs-idm167771040` gives "E_a = 108 kJ" with no (a) and no per mole; 12.5 "E_a** =" markup slip; 12.6 calls the cyclobutane decomposition "the butadiene reaction"; 12.6's AP key gives k in mol² L⁻² min⁻¹ (it is L² mol⁻² min⁻¹) and names "Step II" for the book's Step 2; 12.7's caption "two transitions states"; the converter note's first equation decomposes NO₂ where the text says nitric oxide. Found while building and kept as printed: 12.1's relative-rate equation writes ΔA and ΔB without brackets; Example 12.4's "is equal to 1.The rate law"; 12.6's "a *single* reactant entities"; the alt text of Figure 12.17 describes two HI molecules where the image and caption show NO₂ and CO, and the figure follows the image.

As built (chapter pass, 2026-10-05): 12.7's `fs-idm189363504` carries the two diagrams of the left-out `fs-idm260004768` in its prompt. Of the PhET items, 12.2's `fs-idm66455280` is set against 12.2's many-collisions Sim and 12.5's `fs-idp179196768` and `fs-idp11390128` against 12.5's single collision; 12.2's `fs-idm66513728` (an aimed shot) and `fs-idm49710224` (PhET's reversible A + BC) stay held.

## Flat or 3D (root rule 28 and the book's `RULES.md`)

Particle pictures are 3D boxes the reader turns, readings on a flat strip beneath: 12.13 (CO meeting O₂ in two orientations, a choice) and any collision Sim for 12.2 or 12.5 (A + BC, or a many-collisions box whose counts feed a flat concentration strip); 12.23 (hydrogen and ethylene on a nickel surface, the four steps as a choice, a bench-like surface with a bounded orbit that never shows its underside). Named structures carry the 2D/3D view choice, 2D by default: 12.17's NO₂ + CO through its transition state and the cyclobutane of 12.6. Flat: every graph (12.3, 12.5, 12.9–12.11, 12.15, 12.16), the reaction diagrams 12.14 and 12.19, the pathway 12.22, the enzyme models of 12.25 (schematic shapes), the flasks of 12.12. Every 3D figure follows root rule 26.

## Folds (candidates, each section's call)

12.2 + 12.3 (the table and its curve, each row a secant, a draggable tangent for the instantaneous rate); 12.9 + 12.10 + 12.11 (one plot with a choice of [A], ln[A] or 1/[A] and a choice of data set); 12.15(a) + (b) are one figure already; 12.14 is not folded with 12.19 across sections.

## Root rule 23, BE INSPIRING

The chapter's surprise is how steeply a rate answers to temperature. In 12.5, a single temperature slider under the energy distribution should grow the shaded tail beyond E_a while a readout of k from the Arrhenius equation climbs by powers of ten, and the lizard of the introduction warming by 10 °C should be the same doubling. 12.4's picture is the half-life: a clock under the flasks of 12.12 halving the colour every 6 h for a first-order reaction, beside a second-order reaction whose half-lives stretch out as it goes, so the reader sees that "half-life" is constant for one order only. 12.7 closes on the lower road: a catalyst choice on one reaction diagram that drops the barrier while leaving reactants, products and ΔH where they were.
