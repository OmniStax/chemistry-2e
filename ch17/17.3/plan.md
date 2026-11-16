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

- sim-she-cell · Figure 17.5 + 17.6 · standard-hydrogen-electrode, electrode-potential, standard-electrode-potential · flow by animation and variation by choice: the book draws the SHE alone with its platinum surface magnified (17.5) and then the SHE against a copper half-cell with a voltmeter reading +0.337 V (17.6); here one cell carries both, the reader picks the half-cell X on the voltmeter's red input and reads E°_X off the meter, sees the electrons run SHE → X for a positive reading and X → SHE for a negative one, sees both electrode surfaces magnified beneath, and reads between them which electrode is the anode and which the cathode, each half-reaction and their sum · arrows: kinematic (H₂ bubbles, electrons in the wire, ions meeting the strip, particles meeting the two magnified surfaces); the two "e⁻ flow" arrows are the book's notation, symbolic, and flip with the sign · moving, a continuous clock with the transport · choice half-cell X (Ag⁺/Ag +0.7996 V, Cu²⁺/Cu +0.337 V the default and the book's, Pb²⁺/Pb −0.1262 V, Zn²⁺/Zn −0.7618 V; two above and two below the SHE) · headline "Electrons run from the SHE to the copper, where Cu²⁺ is reduced, so the voltmeter reads +0.337 V." (for a negative reading, from the metal to the SHE, where H⁺ is reduced) · no graph · 2D: an apparatus read from the front (rules 26.2, 28.5) · colour: Cu²⁺(aq) blue as the fact `#3c9ad6`, the voltmeter's red and black inputs as the instrument's own (`#c62828`, `#1f1f1f`), electrodes and particles through `F.el`; the meter's reading in `potential` · readout $E^\circ_{\text{cell}} = E^\circ_{\text{X}} - E_{\text{SHE}}$ with the live numbers; no note
  works: parts: left beaker of 1 M H⁺ holding the SHE: a glass jacket closed at its top and open at its foot, an H₂ inlet arm near the top, the platinum wire running down inside it from the top to a platinum plate at its mouth, under the liquid; right beaker of 1 M X ion holding a strip of the metal X that rises out of the beaker; an inverted-U salt bridge with a porous plug in each foot, both feet under the liquid; a wire from the platinum's top and from the strip's top up to a voltmeter between them, the SHE on its black (−) input and X on its red (+) input · flow: H₂ in at the arm, down the jacket and out at its mouth past the plate, bubbling up through the acid; electrons along the wire from the SHE to X when E°_X > 0, from X to the SHE when E°_X < 0; at the magnified platinum, H₂ gives up 2e⁻ and leaves as 2H⁺ (oxidation) or 2H⁺ take 2e⁻ and leave as H₂ (reduction); at the magnified metal, X ions take electrons and join the surface or atoms leave as ions · must hold: (1) the SHE is on the black input and X on the red, whatever X is; (2) the meter's sign is the sign of E°_X and the e⁻ arrows, the moving electrons and the headline agree with it; (3) the platinum is oxidized exactly when X is reduced, the labels say anode/oxidation and cathode/reduction accordingly, and the cell reaction is the sum of the two half-reactions as shown (2Ag⁺ and 2Ag for silver); (4) the plate is under the acid and the bubbles leave the jacket's mouth; (5) both plugs are under the liquid; (6) the meter reads +0.337 V for copper, as in Figure 17.6, and the other three read Table 17.1's values · read off the image: 17.5: "H₂(g) at 1 atm" at the inlet, "Pt wire", "H₂(g)" at the bubbles, "Pt electrode", "1 M H⁺(aq)", "Pt electrode atoms", H⁺ taking e⁻ and H₂ leaving and the reverse. 17.6: "Voltmeter" reading "+0.337 V", "e⁻ flow →" on both sides, "1 atm H₂(g)", "Standard hydrogen electrode", "T = 298 K", "Cu electrode", Cu²⁺ → Cu at the strip, 2H⁺ ← H₂ at the plate, "1 M H⁺", "1 M Cu²⁺". The images print 1 atm at the inlet; the text defines the SHE at 1 bar, and the figure follows the text. The images show no red and black inputs; the text names them, so they are drawn and named on the meter's two ends.
  Re-examined 2026-11-16 (second pass): rebuilt. The flat cell of the first pass was right in its parts but small in its stage, with the half-reactions in small type under two small circles and an empty band between them. The bench is now a third larger, the jacket is a tube full of gas with the plate at its mouth, every part the book labels is labelled, the inputs are named, the magnified surfaces are larger, and the band between them carries what the reader had to work out: which electrode is the anode, each half-reaction, and the cell reaction. A headline says the direction and the sign together.
- sim-ladder · Sim · electrode-potential-and-oxidant-strength, cell-potential-and-spontaneity, predict-redox-spontaneity, standard-cell-potential · variation by choice and standardisation: Table 17.1 lists its couples in order but the reader must judge distances between rows by subtraction, and must pick the oxidant and the reductant out of each half-reaction; here the 37 rows stand ranked by E° with the oxidant in one column and the reductant in the next, E° as printed, and a bar from the SHE's 0 V to E° on one scale, so the oxidants weaken and the reductants strengthen down the page, the reader takes an oxidant (the cathode) and a reductant (the anode), and E°_cell is the arrow from the anode's bar end to the cathode's, to the right (positive, spontaneous) exactly when the oxidant's entry is above the reductant's · arrows: symbolic (the E°_cell arrow on the scale and the arrow on the centre line from the reductant to the oxidant are notation, redrawn on a choice and never animated) · still: a comparison of tabulated values has no clock · choices cathode and anode (two dropdowns, 37 options each; a tap on an oxidant or on a reductant sets the same two; defaults Ag⁺/Ag and Cu²⁺/Cu, Example 17.4's cell with the table's +0.34 V) · headline "The entry for Ag⁺ is above the entry for Cu, so Ag⁺ oxidizes Cu spontaneously." · graph alone (a ranked table with bars; the table is the idea) · 2D (book rule: ladders are flat) · axis E° (V), fixed +3.0 to −3.1 V, every table value inside it, a tick each volt; rows ranked by value, so Zn²⁺/Zn (−0.7618 V) stands between Cr³⁺ and Mn²⁺, not where the book's table prints it; unchosen bars in pale `potential`, the cathode's row and the anode's in `F.ref('cathode-half-cell')` and `F.ref('anode-half-cell')` (the oxidant's name, the reductant's name, the bars, the guide lines); the H⁺/H₂ row marked as the SHE; "stronger oxidant" and "stronger reductant" arrows at the left; two notes on what the sign of E° says; hover names every row with its whole half-reaction and E° · readout $E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}$ with the live numbers, the difference to the decimals of the less precise value as the book's examples round (+0.46 V, +0.297 V, −0.47 V, ±0.5518 V, and exercises 21, 23 and 25: +2.115, +1.048, +0.727, +1.16, −1.259 V) · note none: the headline says the verdict and the readout the arithmetic · draws `potential`; referents `cathode-half-cell`, `anode-half-cell`
  works: read off the image: no image; the 37 rows and their values are Table 17.1 as printed (checked row by row against `source.md` on 2026-11-16). must hold: (1) the rows run from +2.866 V at the top to −3.04 V at the bottom with no bar out of order; (2) the E°_cell arrow points right and the centre-line arrow up exactly when E°_cell > 0, and the headline says spontaneous exactly then; (3) Ag⁺/Cu reads +0.46 V, Pb²⁺/Cu −0.47 V, Fe²⁺/Cr +0.297 V, I₂/Br⁻ −0.5518 V.
  Re-examined 2026-11-16 (second pass): rebuilt. The ladder was one thin axis with 37 unnamed ticks, two labelled rungs and blank stage either side: it named no species the reader had not already chosen from a dropdown, so "above is spontaneous" could not be seen across the table. Now every entry is on the page as oxidant and reductant with its bar, in the manner of 14.3's ranked table.
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
