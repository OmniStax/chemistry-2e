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

- sim-downs-cell · Figure 17.18 · electrolysis, electrolytic-cell, driving-nonspontaneous-cell-reaction · flow by animation: the book prints the ions' drift and the electrons' push as frozen arrows; here the source pulls electrons out of the anode and pushes them into the cathode, Cl⁻ drifts to the carbon anode and leaves it as Cl₂ bubbles, Na⁺ drifts to the iron cathode and rises from it as liquid sodium, which gathers on the melt beside the cathode, on either side of the porous screen · arrows: kinematic (e⁻ in the wire; Cl⁻ and Na⁺ migrating; Cl₂ and Na rising); the two e⁻ arrows beside the wires and the half-reactions under the tank are the book's notation, symbolic · moving, the cell runs 6 s and holds, two electrons through the source for every Cl₂ and every two Na formed · no slider and no choice: nothing in the text varies, the book gives no voltage for this cell · no headline: the half-reactions under each electrode, as the book prints them, say it · no graph; a legend row beneath names each particle · 2D (rebuilt flat on 2026-11-14 from the image): an apparatus read from the front, which the 3D bench, with its view buttons and labels on the glass, never added to (rules 26.2, 28.5) · Na, Cl, C, Fe and e⁻ by `F.el`, liquid sodium a pale drop with a heavy rim; the melt's own ions drawn at rest on both sides; labels Anode, Cathode, Porous screen, Molten NaCl, the two half-reactions, Voltage source with + and − · readout $N_{e^-} = N_{\text{Na}} = 2N_{\text{Cl}_2} = 2 \times 4 = 8$, one chain, clock-driven, never highlighted · no note
  works: parts: a tank of molten NaCl; a porous screen standing in it from above the melt to the floor, splitting it in two; a carbon anode in the left half and an iron cathode in the right, each rising out of the melt to a wire; the wires to a voltage source above, the anode's to its +, the cathode's to its − · flow: electrons up out of the anode to + and out of − down into the cathode; Cl⁻ to the anode, leaving as Cl₂ bubbles that escape the melt; Na⁺ to the cathode, rising as liquid sodium that gathers on the melt's surface on the cathode's side · must hold: (1) the anode is on the + terminal and the cathode on the −; (2) electrons leave the anode and enter the cathode; (3) Cl⁻ moves only to the anode and Na⁺ only to the cathode; (4) chlorine forms only on the anode's side and sodium only on the cathode's; (5) per event two e⁻, one Cl₂, two Na · read off the image: "Voltage source" with + on the left and − on the right, "e⁻ ↑" beside the anode's wire and "e⁻ ↓" beside the cathode's, "Porous screen", "Anode", "Cathode", green bubbles on the anode and gray drops on the cathode, "Cl⁻ ←" and "→ Na⁺", "2Cl⁻ ⟶ Cl₂(g) + 2e⁻", "Molten NaCl", "2Na⁺ + 2e⁻ ⟶ 2Na(l)". The caption names a carbon anode and an iron cathode, which the drawing colours by element.
- sim-water-electrolysis · Figure 17.19 · driving-nonspontaneous-cell-reaction, electrolysis · variation by slider and flow by animation: the book draws one moment with the gases already collected; here the applied voltage is a slider with the threshold the text names, and above it the reader watches O₂ and twice its volume of H₂ bubble up and collect while the liquid they push down rises into the reservoir · arrows: kinematic (the bubbles, the electrons in the wire) · moving, 6 s of clock; below 1.229 V nothing moves; above it the rate grows with the excess voltage (no current is stated) · one slider, applied voltage `potential` (0 to 3.000 V, default 2.000 V, three decimals so the threshold reads exactly), with a dashed circle at 1.229 V, $-E°_{\text{cell}}$ · no headline: the readout's relation sign turns at the threshold and the caption names it · no graph · 2D (rebuilt flat on 2026-11-14 from the image): the Hofmann apparatus is read from the front, and the 3D bench added a turn and view buttons but no view the book's drawing lacks (rules 26.2, 28.5) · O, H, Pt, e⁻ by `F.el`; labels O₂(g), H₂(g), H₂O + H₂SO₄, Anode +, Cathode −, Voltage source · readout $\text{applied voltage} = 2.000\ \text{V} > 1.229\ \text{V} = -E°_{\text{cell}}$ · note: four electrons through the source for every O₂ and two H₂, so the hydrogen arm fills twice as fast
  works: parts: two closed glass arms, each narrowing at the top to a closed stopcock and a tip; a cross tube joining their lower ends to a central column that rises into a reservoir bulb open at its neck; a platinum electrode in the foot of each arm, its lead through a stopper to a wire; the wires to a voltage source below, the left arm's to + (the anode) and the right arm's to − (the cathode) · flow: O₂ bubbles from the anode up its arm and collects at the top; H₂ likewise in the right arm; the gas pushes the liquid down the arms and across into the column, so the liquid in the bulb rises; electrons from the anode to + and from − to the cathode · must hold: (1) O₂ over the anode on +, H₂ over the cathode on −; (2) the hydrogen's volume is twice the oxygen's at every moment; (3) the liquid in the bulb rises as the gases collect; (4) below 1.229 V no gas forms; (5) both stopcocks are closed, so the gases stay in the arms · read off the image: "H₂O + H₂SO₄" at the reservoir, "O₂(g)" on the left arm, "H₂(g)" on the right arm with its level lower, "Anode +", "Cathode −", "Voltage source" with + on the left and − on the right, brown stoppers, blue-handled stopcocks.
- sim-silver-plating · Figure 17.20 · electroplating, electric-current, charge-and-moles-of-electrons, electrolysis-stoichiometry · variation by slider and flow by animation: the book's arrows send one Ag⁺ each way; here the silver anode thins and the spoon silvers while the charge, the moles of electrons and the silver deposited count up with the clock, for any current and time, Example 17.9's 10.23 A for 1 hour the default · arrows: kinematic (e⁻ in the wire; Ag⁺ from the anode to the spoon); the two e⁻ arrows beside the wires are the book's notation · moving, the clock plays the electrolysis from 0 to the chosen time in 6 s and holds · two sliders, current I `current` (0.50 to 20.00 A, default 10.23 A) and time t `time` (5 to 120 min, default 60 min) · no headline: the caption says what to watch · no graph · 2D (rebuilt flat on 2026-11-14 from the image): the beaker is read from the front, and the 3D bench added view buttons but no view the book's drawing lacks (rules 26.2, 28.5) · Ag and e⁻ by `F.el`, the spoon's base metal in muted ink turning to silver's colour as the coat grows; labels silver (anode), Spoon (cathode), AgNO₃(aq), Voltage source with + and − · readout $n = \frac{It}{F} = \frac{(10.23\ \text{A})(3600\ \text{s})}{96\,485\ \text{C/mol}} = 0.3817\ \text{mol}$, t running with the clock, never highlighted · note: one mole of silver per mole of electrons, with the mass on the spoon, 41.19 g at the end of the default run
  works: parts: a beaker of AgNO₃(aq); a silver strip standing in it, rising out of it to a wire to the source's +; a spoon hung bowl down, its handle rising out to a wire to the source's −; the voltage source above · flow: electrons up out of the silver strip to + and out of − down into the spoon; Ag⁺ from the strip's face through the solution to the spoon's bowl · must hold: (1) the silver is the anode on + and the spoon the cathode on −; (2) Ag⁺ moves only from strip to spoon; (3) the strip loses what the spoon gains, 107.9 g per mole of electrons; (4) the default run gives 0.3817 mol and 41.19 g, as Example 17.9 · read off the image: "Voltage source" with + on the left and − on the right, "e⁻ ↑" by the anode's wire and "e⁻ ↓" by the spoon's, "silver (anode)" marked +, "Spoon (cathode)" marked −, "→ Ag⁺" leaving the strip and "Ag⁺ →" reaching the bowl, "AgNO₃(aq)".

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

Applied by the chapter pass (2026-10-05):

- Both forms and the eight variables rows anchored as listed.
- The type colours had already been refitted for `current` before the pass (commit 7dff6a2f); the colours script was not rerun.

## Derivations

- Example 17.10, the time to electroplate a chromium layer · score 2 · not built: a worked example of unit conversions into Q = nF and Q = It, every line printed
