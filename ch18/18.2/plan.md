# Plan: 18.2 Occurrence and Preparation of the Representative Metals (m68830)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, two numbered figures (18.10 Downs cell, 18.11 Hall–Héroult cell, both drawings of apparatus), fourteen chemical equations of the book's own (kept in the text), no note, no table, no worked example (so no Check Your Learning and no inline host), thirteen end-of-section items (chapter exercises 15 to 27).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `occurrence` | Occurrence of the representative metals (the section's own header for the untitled opening) | uses `representative-metal`, `alkaline-earth-metal`, `electrolysis`, `chemical-reduction` |
| `electrolysis` | Electrolysis (the book's) | introduces `metal-isolation-by-electrolysis`; uses `electrolysis`, `reduction`, `energy-and-work` |
| `sodium` | `<h3>` The Preparation of Sodium (the book's; Figure 18.10) | introduces `downs-cell`; uses `electrolysis`, `melting-point`, `colligative-properties`, `electric-current`, `cathode`, `anode`, `reduction`, `oxidation`, `density`, `temperature` |
| `aluminum` | `<h3>` The Preparation of Aluminum (the book's; Figure 18.11) | introduces `hall-heroult-cell`; uses `electrolytic-cell`, `electrolysis`, `precipitate`, `cathode`, `anode`, `reduction` |
| `magnesium-electrolysis` | `<h3>` The Preparation of Magnesium (the book's, under Electrolysis) | uses `metal-isolation-by-electrolysis`, `electrolysis`, `precipitate`, `chemical-reduction` |
| `chemical-reduction` | Chemical Reduction (the book's) | introduces `chemical-reduction`; uses `representative-metal`, `reducing-agent`, `electrolysis`, `chemical-equilibrium`, `le-chateliers-principle` |
| `pidgeon` | `<h3>` The Preparation of Magnesium (the book's, under Chemical Reduction) | introduces `pidgeon-process`; uses `temperature`, `chemical-thermodynamics`, `le-chateliers-principle` |
| `zinc` | `<h3>` The Preparation of Zinc (the book's) | introduces `carbon-reduction-of-zinc-and-tin`; uses `boiling-point`, `distillation`, `temperature` |
| `tin` | `<h3>` The Preparation of Tin (the book's) | uses `carbon-reduction-of-zinc-and-tin`, `reduction`, `temperature` |

Two `<section>` blocks carry the book's two headers (Electrolysis, Chemical Reduction) as `<h2>`; their subheads are `<h3 id>` spans inside them, as `ch01/1.4` does.

## Figures

- sim-downs-cell · Figure 18.10 · downs-cell, metal-isolation-by-electrolysis · value add: flow by animation, variation by choice and depth: the book's section shows three arrows of flow (chlorine up the hood and out, sodium out of its collector) and a still sprinkle of bubbles; here the cell runs, Na⁺ ions crossing the melt to the ring cathode and rising as liquid sodium into the collector, Cl⁻ ions crossing to the central anode and pairing as Cl₂ that climbs the hood, electrons through the external circuit, and the iron screen visibly keeps the two products apart; the choice of electrolyte shows the caption's claim, hydrogen bubbling off the cathode in place of sodium when the solution is aqueous · arrows: kinematic (chlorine flowing up and out of the hood, liquid sodium out of the collector; drawn as moving particles, never as replayed arrows) · moving: ions migrate, products rise and leave, electrons circulate on a 6 s clock, holding 1.2 s, then the cell runs on from the start; the readout counts the ions discharged · choice electrolyte (`F.choice`, molten NaCl / aqueous NaCl, default molten, the book's) · headline: molten, "Na⁺ is reduced at the cathode and Cl⁻ oxidized at the anode, and the iron screen keeps sodium and chlorine apart."; aqueous, "In aqueous solution water is reduced at the cathode instead of Na⁺, so hydrogen forms in place of sodium." · graph none; a legend strip beneath names the particles · physical 3D, an apparatus (book rule): the cylindrical cell cut in half through its axis so the central anode, the screen round it and the ring cathode outside both read as the rings they are (the flat section shows them as slabs), pitch held between 3° and 65° above level so the cell is never seen from beneath, yaw ±69° so the cut face stays toward the reader, spin off since the particles already move, views front and above · conventions `F.el` Na (Na⁺ and sodium atoms), Cl (Cl⁻ and Cl₂), H (H₂), e- (electrons); facts: graphite #3a3d42 for the anode, molten metal #c9ced6 for the liquid sodium in the collector and reservoir; the melt and the steel in panel greys · labels: anode (+), cathode (−), iron screen, the electrolyte's name, Cl₂ outlet, Na outlet (six, all on still parts); the voltage source and the moving particles by hover name and the legend · readout: the overall change with the live counts of ions discharged as coefficients, true and balanced at every moment (molten: 2n Na⁺ + 2n Cl⁻ ⟶ 2n Na(l) + n Cl₂(g); aqueous: 2n H₂O + 2n Cl⁻ ⟶ n H₂(g) + n Cl₂(g) + 2n OH⁻, as 18.9's chlor-alkali equation counts it), clock-driven, never highlighted; the choice morphs it by meaning; no note (the readout and headline say it all).
- sim-hall-heroult · Figure 18.11 · hall-heroult-cell, metal-isolation-by-electrolysis · value add: flow by animation and depth: Al³⁺ ions drift down through the molten cryolite to the pool of molten aluminum over the carbon cathode, which deepens, while oxide ions drift up to the carbon anodes and bubbles of O₂, CO and CO₂ stream off them, past the gaps in the crust and out of the exhaust; the book draws no external circuit, only the two terminals, so no electrons are drawn; the still drawing shows the layers but not which way anything moves · arrows: kinematic (the exhaust gases leaving upward) · moving: ions migrate, bubbles rise, the aluminum pool rises on a 6 s clock, holding 1.2 s · no slider or choice: the cell has no variable the text gives · headline "Al³⁺ is reduced to molten aluminum at the carbon cathode while O₂, CO and CO₂ bubble off the carbon anodes." · graph none; a legend strip beneath · physical 3D, an apparatus (book rule): the steel shell and ceramic lining cut away at the front so the layers stand in depth, two anodes on a bus bar, the hood in outline as the book draws it; pitch 3° to 34° and yaw ±46°, since the layers read from the side and from higher the crust hides them, spin off, one view (front) · conventions `F.el` Al, O, C; facts: graphite #3a3d42 for the anodes and cathode, molten metal #c9ced6 for the aluminum · labels: carbon anode (+) on one representative, carbon cathode (−), molten aluminum, Al₂O₃ in molten Na₃AlF₆, ceramic, steel shell (six, the last four in columns outside the cell as the book sets them); the crust, the hood and the moving particles by hover and the legend · readout: Al³⁺ + 3e⁻ ⟶ Al(l) with the live count, n Al³⁺ + 3n e⁻ ⟶ n Al(l); no note.

Both cells are drawn from the book's own figures; the melt's lavender and the electrolyte's green there are drawing colours, not facts, so the melts are panel greys. Two colours are facts, named constants the same in both themes: graphite black for the carbon electrodes and the silver of molten sodium and aluminum. Chlorine is drawn as Cl₂ molecules in the element palette.

Extra simulations (not built, root rule 15): none survived; the bauxite purification and the Pidgeon retort would replay the book's equations without a view they lack.

## Tables

None.

## Types bound

`temperature` (801 °C, 600 °C, 907 °C and the four impurities' boiling points, 1000 °C, as `data-type`; "melting point" and "boiling point" are untyped concepts and stay ink), `current` ("direct current", concept `electric-current`, 17.7), `energy` ("electrical energy", `energy-and-work`), `density` ("less dense" names `density`). Percentages (0.5%, 75%) and dates stay ink. No referents.

## Exercises

Thirteen end-of-section items (chapter numbers 15 to 27). Seven keyed, read against the CNXML: fs-idp79750944, fs-idp265303360, fs-idm19716784, fs-idp72169040 open with the book's answers; fs-idp84582880 (0.5035 g), fs-idp139236992 (25.83%), fs-idp116461520 (39 kg) as numbers. Three unkeyed conceptual items with an AI-marked suggested approach: fs-idp199448112, fs-idp236482640, fs-idp198987536. Three unkeyed numerical items left out and named: fs-idp119437920, fs-idp56785888, fs-idp237555664. No moves.

## Left out

Nothing in the text. Errata kept as printed: "Ions of metals in of groups 1 and 2"; "The principle tin ore" and "the principle lead and thallium ores"; "In honor to the two inventors"; "In the next section, we will see how the Pidgeon process" (it is the next subsection); the summary's "sodium, potassium, and aluminum" for the metals made by electrolysis.

## Wanted at chapter level

- none for 18.2: every concept of the section is introduced on its span (metal-isolation-by-electrolysis → 18.2-electrolysis, downs-cell → 18.2-sodium, hall-heroult-cell → 18.2-aluminum, chemical-reduction → 18.2-chemical-reduction, pidgeon-process → 18.2-pidgeon, carbon-reduction-of-zinc-and-tin → 18.2-zinc), and no row, edge or symbol needs a fix
