# Plan: 17.7 Electrolysis (m68827)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Three objectives, three numbered figures (17.18 NaCl, 17.19 Water, 17.20 Electroplate inside the note), no table, two worked examples (17.9, 17.10) each with its Check Your Learning, one boxed note (Chemistry in Everyday Life: Electroplating), no Link to Learning, seven end-of-section items (chapter exercises 43 to 49).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `electrolytic` | Electrolytic cells (our own, for the untitled opening) | introduces `electrolysis`, `electrolytic-cell`; uses `galvanic-cell`, `redox-reaction`, `spontaneous-process`, `secondary-cell` |
| `molten-nacl` | The Electrolysis of Molten Sodium Chloride (Figure 17.18) | introduces `driving-nonspontaneous-cell-reaction`; uses `cell-potential`, `anode`, `cathode`, `half-reaction` |
| `water` | The Electrolysis of Water (Figure 17.19) | reinforces `driving-nonspontaneous-cell-reaction`; uses `standard-electrode-potential`, `standard-cell-potential`, `strong-acid` |
| `aqueous-nacl` | The Electrolysis of Aqueous Sodium Chloride | introduces `electrolysis-of-aqueous-solutions`; uses `standard-electrode-potential`, `standard-cell-potential`, `oxidation`, `reduction` |
| `electroplating` | the note Electroplating (Chemistry in Everyday Life; Figure 17.20) | introduces `electroplating`; uses `electrolytic-cell`, `anode`, `cathode`, `oxidation`, `reduction` |
| `quantitative` | Quantitative Aspects of Electrolysis | introduces `electric-current`, `charge-and-moles-of-electrons`, `electrolysis-stoichiometry`; uses `faradays-constant`, `half-reaction`, `time` |
| `ex-current-moles` | Example 17.9 · Converting Current to Moles of Electrons | reinforces `electrolysis-stoichiometry`, `charge-and-moles-of-electrons`; uses `electric-current`, `faradays-constant`, `molar-mass`, `mole` |
| `ex-deposition-time` | Example 17.10 · Time Required for Deposition | reinforces `electrolysis-stoichiometry`; uses `electric-current`, `density`, `volume`, `molar-mass` |

## Figures

- sim-downs-cell · Figure 17.18 · electrolysis, electrolytic-cell, driving-nonspontaneous-cell-reaction · flow by animation and depth: the book prints the ions' drift and the electrons' push as frozen arrows; here the source pumps electrons out of the anode and into the cathode, Cl⁻ drifts to the carbon anode and leaves it as Cl₂ bubbles, Na⁺ drifts to the iron cathode and rises from it as liquid sodium, on either side of the porous screen · arrows: kinematic (e⁻ through the wire and the source; Cl⁻ and Na⁺ migrating to the electrodes; Cl₂ and Na rising from them); the two half-reaction arrows under the book's drawing are reaction arrows, symbolic, left to the equation above · moving, the cell runs on the clock for 6 s and holds, two electrons through the source for every Cl₂ and every two Na formed · no slider and no choice: nothing in the text varies, the book gives no voltage for this cell · headline "Chloride ions give up electrons at the anode, and sodium ions take them at the cathode." · no graph; a legend strip beneath names each particle · physical 3D, an apparatus (book rule): a tank on a bench split by a porous screen, the source above; pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the particles already move, views front and above · Na, Cl, C, Fe and e⁻ by `F.el`; labels anode (+), cathode (−), porous screen, molten NaCl, voltage source (five, all on still parts); every ion, atom, molecule and electron moves, so they are named in the legend and on hover · readout the counts the clock drives, $n_{e^-} = n_{\text{Na}} = 2\,n_{\text{Cl}_2}$, never highlighted · no note: the readout says it
- sim-water-electrolysis · Figure 17.19 · driving-nonspontaneous-cell-reaction, electrolysis · variation by slider, flow by animation and depth: the book draws one moment with the gases already collected; here the applied voltage is a slider with the threshold the text names, and above it the reader watches O₂ and twice its volume of H₂ form and collect while the liquid is pushed up into the reservoir · arrows: none in the book, but the gases bubbling and collecting are motion (config: kinematic) and the electrons are pushed through the wire · moving, 6 s of clock; below 1.229 V nothing moves; above it the rate of gas formation grows with the excess voltage (no current is stated) · one slider, applied voltage `potential` (0 to 3.000 V, default 2.000 V, three decimals so the threshold reads exactly), with a dashed circle at 1.229 V, $-E°_{\text{cell}}$ · headline "Above 1.229 V, oxygen forms at the anode and twice its volume of hydrogen at the cathode." or "Below 1.229 V, the source cannot decompose water." · no graph · physical 3D, an apparatus (book rule): the Hofmann apparatus of the book on a bench, two stoppered arms with stopcocks, the central column and reservoir, platinum electrodes, the source on the bench; pitch bound as above · O, H, Pt, e⁻ by `F.el`; labels anode (+), cathode (−), O₂(g), H₂(g), H₂O + H₂SO₄, voltage source (six, still parts: the gas labels at the arm tops) · readout $\text{applied voltage} = 2.000\ \text{V} > 1.229\ \text{V} = -E°_{\text{cell}}$, the relation sign turning at the threshold · note: four electrons through the source for every O₂ and two H₂, so the hydrogen arm fills twice as fast
- sim-silver-plating · Figure 17.20 · electroplating, electric-current, charge-and-moles-of-electrons, electrolysis-stoichiometry · variation by slider, flow by animation and depth: the book's arrows send one Ag⁺ each way; here the silver anode thins and the spoon silvers while the charge, the moles of electrons and the silver deposited count up with the clock, for any current and time, Example 17.9's 10.23 A for 1 hour the default · arrows: kinematic (e⁻ through the wire; Ag⁺ leaving the anode; Ag⁺ moving to the spoon) · moving, the clock plays the electrolysis from 0 to the chosen time in 6 s and holds · two sliders, current I `current` (0.50 to 20.00 A, default 10.23 A) and time t `time` (5 to 120 min, default 60 min) · headline "Silver leaves the anode as Ag⁺ and plates onto the spoon at the cathode." · no graph · physical 3D, an apparatus (book rule): the beaker of AgNO₃(aq) on a bench, a silver strip, a spoon hung bowl down, the source above; pitch bound as above · Ag and e⁻ by `F.el`, the spoon's base metal in the muted ink, its coat in silver's colour growing with the mass deposited; labels silver (anode, +), spoon (cathode, −), AgNO₃(aq), voltage source (four) · readout $n = \frac{It}{F} = \frac{(10.23\ \text{A})(3600\ \text{s})}{96\,485\ \text{C/mol}} = 0.3817\ \text{mol}$, t running with the clock, never highlighted · note: one mole of silver per mole of electrons, with the mass on the spoon, 41.19 g at the end of the default run

Extra simulations: none. A choice of electrolyte (molten NaCl, water, aqueous NaCl) on one bench was weighed and rejected: the book draws three different apparatus, and the aqueous case is a reading of the potentials, which the text's two lists already lay out.

## Tables

None.

## Types bound

`potential` (the applied voltage, $E°_{\text{anode}}$, $E°_{\text{cathode}}$, $E°_{\text{cell}}$), `charge` ($Q$, $F$), `current` ($I$), `time` ($t$), `amount` ($n$), `mass` (the silver deposited, the examples' masses), `volume` (the chromium's 33 cm³), `density`, `area` and `length` where the examples state them. Counts and coefficients stay ink; atoms, ions and electrons by `F.el`.

## Referents

None. The anode and cathode compartments of 17.19 are told by their gases (O and H by `F.el`), and no graph plots them side by side.

## Exercises

Check Your Learning after Example 17.9 (host `ex-current-moles`, `source_id` fs-idm34493360) and after Example 17.10 (host `ex-deposition-time`, fs-idm33432704), open answers from the book. Two keyed end-of-section items kept: fs-idp30833248 (46, restating the four molten salts of the left-out fs-idm27929184), fs-idm171259104 (48, 0.79 L, a number answer, the card carrying Figure 17.19). Five unkeyed left out because the answer would be computed: fs-idm330221280 (coulombs), fs-idm324128112 (electrons), fs-idm27929184 (half-reactions), fs-idp30601424 (times), fs-idm13758224 (area). Nothing moved.

## Left out

Nothing of the prose. Errata kept as printed: "OH<sup>-</sup>" with a hyphen, "n mole of electrons", "from a solution of containing", the opening's "electroplating" in italics though the glossary term is defined in the note.

## Wanted at chapter level

- anchors: `eq-charge-current-time` → 17.7-quantitative; `eq-charge-moles-electrons` → 17.7-quantitative
- variables anchors: 17.7/I → 17.7-quantitative; 17.7/Q_charge → 17.7-quantitative; 17.7/t → 17.7-quantitative; 17.7/n → 17.7-quantitative; 17.7/F_Faraday → 17.7-quantitative; 17.7/E°_anode → 17.7-water; 17.7/E°_cathode → 17.7-water; 17.7/E°_cell → 17.7-water
- type colours: rerun `npm run colours:default -- chemistry-2e` for `current`
