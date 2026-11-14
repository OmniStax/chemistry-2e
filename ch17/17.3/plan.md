# Plan: 17.3 Electrode and Cell Potentials (m68823)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Three objectives, two numbered figures (17.5 SHE, 17.6 GalvanCu), one numbered table (17.1), two worked examples (17.4, 17.5) with their Check Your Learning items, no boxed note, no Link to Learning, six end-of-section items (chapter exercises 21 to 26).

## Sub-concepts and spans

The book prints one header, "Interpreting Electrode and Cell Potentials"; the opening before it takes three headers of the page's own.

| Span | Header | Concepts |
|---|---|---|
| `cell-potentials` | Cell potentials (ours: the opening, potential and the volt, E_cell and E°_cell) | introduces `electrical-potential`, `cell-potential`, `standard-cell-potential`; uses `energy-and-work`, `redox-reaction`, `oxidizing-agent`, `reducing-agent`, `half-cell`, `cathode`, `anode`, `standard-state` |
| `she` | The standard hydrogen electrode (ours: the SHE, E_X, E°_X, the Cu cell, Figure 17.5 + 17.6) | introduces `standard-hydrogen-electrode`, `electrode-potential`, `standard-electrode-potential`; uses `inert-electrode`, `half-reaction`, `galvanic-cell`, `salt-bridge` |
| `table` | Tables of standard electrode potentials (ours: Table 17.1 and Example 17.4 with its Check Your Learning) | reinforces `standard-electrode-potential`, `standard-cell-potential`; uses `galvanic-cell`, `half-reaction` |
| `interpreting` | Interpreting Electrode and Cell Potentials (the book's; the ladder Sim, the Cu/Pb pair, Example 17.5 with its Check Your Learning) | introduces `electrode-potential-and-oxidant-strength`, `cell-potential-and-spontaneity`, `predict-redox-spontaneity`; uses `oxidizing-agent`, `spontaneous-process`, `nonspontaneous-process` |

Example ids: `ex-standard-cell` (Example 17.4, inside `table`), `ex-spontaneity` (Example 17.5, inside `interpreting`); each holds its Check Your Learning host.

## Figures

- sim-she-cell · Figure 17.5 + 17.6 · standard-hydrogen-electrode, electrode-potential, standard-electrode-potential · flow by animation and variation by choice: the book draws the SHE alone with its platinum surface magnified (17.5) and then the SHE against a copper half-cell with a voltmeter reading +0.337 V (17.6); here one cell carries both, the reader picks the half-cell X on the voltmeter's red input and reads E°_X off the meter, sees the electrons run SHE → X for a positive reading and X → SHE for a negative one, and sees both electrode surfaces magnified beneath, each with the half-reaction the direction decides · arrows: kinematic (H₂ bubbles, electrons in the wire, ions meeting the strip, particles meeting the two magnified surfaces); the two "e⁻ flow" arrows are the book's notation, symbolic, and flip with the sign · moving, a continuous clock with the transport · choice half-cell X (Ag⁺/Ag +0.7996 V, Cu²⁺/Cu +0.337 V the default and the book's, Pb²⁺/Pb −0.1262 V, Zn²⁺/Zn −0.7618 V; two above and two below the SHE) · no headline: the meter shows the reading and the arrows the flow · beneath the cell, the two magnified surfaces joined to their electrodes by callout lines, the half-reaction under each, a legend row naming every particle · 2D (rebuilt flat on 2026-11-14 from the two images): an apparatus read from the front, which the 3D bench, with its view buttons and labels on the glass, never added to (rules 26.2, 28.5) · colour: Cu²⁺(aq) blue as the fact `#3c9ad6`, the voltmeter's red and black inputs as the instrument's own (`#c62828`, `#1f1f1f`), electrodes and particles through `F.el`; the meter's reading in `potential` · readout $E^\circ_{\text{cell}} = E^\circ_{\text{X}} - E_{\text{SHE}}$ with the live numbers; no note
  works: parts: left beaker of 1 M H⁺ holding the SHE: a glass jacket closed at its top with an H₂ inlet arm near the top, the platinum wire running down inside it from the top to a platinum plate at its open foot, under the liquid; right beaker of 1 M X ion holding a strip of the metal X that rises out of the beaker; an inverted-U salt bridge with a porous plug in each foot, both feet under the liquid; a wire from the platinum's top and from the strip's top up to a voltmeter between them, the SHE on its black (−) input and X on its red (+) input · flow: H₂ in at the arm, down the jacket and out at its foot past the plate, bubbling up through the acid; electrons along the wire from the SHE to X when E°_X > 0, from X to the SHE when E°_X < 0; at the magnified platinum, H₂ gives up 2e⁻ and leaves as 2H⁺ (oxidation) or 2H⁺ take 2e⁻ and leave as H₂ (reduction); at the magnified metal, X ions take electrons and join the surface or atoms leave as ions · must hold: (1) the SHE is on the black input and X on the red, whatever X is; (2) the meter's sign is the sign of E°_X and the e⁻ arrows and the moving electrons agree with it; (3) the platinum is oxidized exactly when X is reduced, and the half-reaction labels say anode/oxidation and cathode/reduction accordingly; (4) the plate is under the acid and the bubbles leave the jacket's foot; (5) both plugs are under the liquid; (6) the meter reads +0.337 V for copper, as in Figure 17.6 · read off the image: 17.5: "H₂(g) at 1 atm" at the inlet, "Pt wire", "H₂(g)", "Pt electrode", "1 M H⁺(aq)", "Pt electrode atoms", H⁺ taking e⁻ and H₂ leaving and the reverse. 17.6: "Voltmeter" reading "+0.337 V", "e⁻ flow →" on both sides, "1 atm H₂(g)", "Standard hydrogen electrode", "T = 298 K", "Cu electrode", Cu²⁺ → Cu at the strip, 2H⁺ ← H₂ at the plate, "1 M H⁺", "1 M Cu²⁺". The images print 1 atm at the inlet; the text defines the SHE at 1 bar, and the figure follows the text. The images show no red and black inputs; the text names them, so they are drawn on the meter's two sides.
- sim-ladder · Sim · electrode-potential-and-oxidant-strength, cell-potential-and-spontaneity, predict-redox-spontaneity, standard-cell-potential · variation by choice and standardisation: Table 17.1 lists its couples in order but the reader must judge distances between rows by subtraction; here the 37 couples stand as rungs on one E° scale from +3.0 V to −3.1 V, the reader picks a cathode couple and an anode couple, and the arrow from the anode's rung to the cathode's is E°_cell, pointing up (positive, spontaneous) when the oxidant's rung is above the reductant's and down when it is below, so "above is spontaneous" is seen rather than read · arrows: symbolic (the E°_cell arrow between two rungs is notation, drawn once and never animated) · still: a comparison of tabulated values has no clock · choices cathode couple and anode couple (two dropdowns, 37 options each, since a row would wrap; defaults Ag⁺/Ag and Cu²⁺/Cu, Example 17.4's cell with the table's +0.34 V) · headline "The oxidant Ag⁺ sits above the reductant Cu, so the reaction is spontaneous." · graph alone (a vertical scale, the scale is the idea) · 2D, a ladder (book rule: ladders are flat) · axis E° (V), fixed +3.0 to −3.1 V, every table value inside it; rungs are short ticks in muted ink, the chosen cathode and anode rungs long and in `F.ref('cathode-half-cell')` and `F.ref('anode-half-cell')`, each labelled with its half-reaction and E° (two labels), the SHE rung labelled at 0.00 V (three in all, pushed apart where they would touch); "stronger oxidants" and "stronger reductants" arrows at the scale's ends (frame); hover names every rung with its half-reaction and E° · readout $E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$ with the live numbers, the difference to the decimals of the less precise value as the book's examples round (+0.46 V, +0.297 V, −0.47 V, ±0.5518 V) · note none: the headline says the verdict and the readout the arithmetic · draws `potential`; referents `cathode-half-cell`, `anode-half-cell`
  works: read off the image: no image; the 37 rungs and their values are Table 17.1 as printed.
  Re-examined 2026-11-14: kept. The rung labels wore their referent's colour over the whole half-reaction; now only the words cathode and anode wear it and the E° values wear `potential` (rule 26.17), and the caption is cut to the choice and the arrow.
- Table 17.1 stays a `div.book-table` (37 rows as printed, the out-of-order Mn²⁺/Zn(OH)₂ rows and "Mg^{2}" kept).

Extra simulations: none. The Cu/Pb pair and Examples 17.4 and 17.5 are states of the ladder.

## Types bound

`potential` (every E, E°, the voltmeter reading, the ladder's axis, values in prose marked `data-type="potential"`), `temperature` (298 K where stated), `concentration` (1 *M* where stated), `pressure` (1 bar where stated). Oxidation numbers, coefficients and counts of electrons stay ink.

## Referents

- `cathode-half-cell` · the cathode half-cell · sim-ladder
- `anode-half-cell` · the anode half-cell · sim-ladder

The ladder's caption marks both. E°_cathode and E°_anode take them as `ref` (chapter level).

## Exercises

- Check Your Learning of Example 17.4 (`cyl1`, source `fs-idm10620896`): number −0.47 V from the key ("−0. 47 V" as printed), host `ex-standard-cell`.
- Check Your Learning of Example 17.5 (`cyl2`, source `fs-idm226975904`): multi, −0.5518 V and +0.5518 V, the printed answer as solution, host `ex-spontaneity`.
- End of section, keyed: 21 `fs-idm2030592` (multi, four potentials), 23 `fs-idm8651504` (+1.16 V), 25 `fs-idm10353296` (−1.259 V).
- Left out, unkeyed with computed answers: 22 `fs-idm18460288`, 24 `fs-idp4217296`, 26 `fs-idp110111760`.
- No moves; no `simulation-exercise`.

## Left out

Learning objectives, the summary (to `summary_html`), the Key Equations table and the glossary go to the tables. Errata kept as printed: "−0. 47 V"; "Br₂(s)" in the second Check Your Learning answer; Table 17.1's +0.34 V for Cu²⁺/Cu against the text's +0.337 V, its Mn²⁺ and Zn(OH)₂ rows above Zn²⁺, and "Mg^{2}(aq)"; "insure", "predication".

## Wanted at chapter level

- variables `17.3/E_potential` → 17.3-cell-potentials
- variables `17.3/E_cell` → 17.3-cell-potentials
- variables `17.3/E_cathode` → 17.3-cell-potentials
- variables `17.3/E_anode` → 17.3-cell-potentials
- variables `17.3/E°_cell` → 17.3-cell-potentials
- variables `17.3/E°_cathode` → 17.3-cell-potentials
- variables `17.3/E°_anode` → 17.3-cell-potentials
- variables `17.3/E_SHE` → 17.3-she
- variables `17.3/E_X` → 17.3-she
- variables `17.3/E°_X` → 17.3-she
- variables `17.3/E_std` → 17.3-interpreting
- forms `eq-cell-potential` → 17.3-cell-potentials
- forms `eq-standard-cell-potential` → 17.3-cell-potentials
- forms `eq-electrode-potential` → 17.3-she
- variables `17.3/E°_cathode`: set `ref` to `cathode-half-cell`
- variables `17.3/E°_anode`: set `ref` to `anode-half-cell`
- concepts `standard-electrode-potential`: add the term "standard reduction potential" (the book's other name for it, italicized in 17.3)

Applied by the chapter pass (2026-10-05):

- The eleven variables rows anchored as listed and the three forms anchored as listed.
- `17.3/E°_cathode` and `17.3/E°_anode` carry `ref` `cathode-half-cell` and `anode-half-cell`.
- `standard-electrode-potential` has the term "standard reduction potential", merged into `book.json`.
