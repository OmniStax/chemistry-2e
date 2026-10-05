# Plan: 17.2 Galvanic Cells (m68822)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, three numbered figures (17.2 to 17.4), no table, one worked example (17.3) with its Check Your Learning, no boxed note, no Link to Learning, ten end-of-section items (chapter exercises 11 to 20).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `transfer` | Spontaneous electron transfer (our own, for the opening; Figure 17.2) | uses `redox-reaction`, `half-reaction`, `oxidation`, `reduction`, `spontaneous-process` |
| `galvanic` | Galvanic cells (our own, for the second untitled paragraph; Figure 17.3 + 17.4) | introduces `electrochemical-cell`, `galvanic-cell`, `half-cell`, `anode`, `cathode`, `salt-bridge`; uses `spontaneous-process`, `oxidation`, `reduction`, `electrolyte`, `concentration` |
| `notation` | Cell Notation (the book's header; Figure 17.4 is cited here) | introduces `cell-notation`, `inert-electrode`, `active-electrode`; uses `anode`, `cathode`, `half-cell`, `salt-bridge`, `half-reaction`, `molarity` |
| `ex-schematics` | Example 17.3 · Writing Galvanic Cell Schematics | reinforces `cell-notation`; uses `half-reaction-method`, `half-reaction`, `anode`, `cathode` |

## Figures

- fig-cu-ag · Figure 17.2 · redox-reaction · kept photograph: the text points at it and it shows the blue of Cu²⁺(aq) and the gray silver as they appear · photo
- sim-galvanic-cell · Figure 17.3 + 17.4 · galvanic-cell, half-cell, anode, cathode, salt-bridge, inert-electrode, active-electrode, cell-notation · flow by animation, depth, and variation by choice: the book draws each cell once with arrows for the electrons and the ions; here the electrons run through the wire from anode to cathode, the cations enter the anode solution or plate out, the salt bridge's anions and cations leave its two plugs in step, the active electrodes thin and grow while the inert platinum does not, and the copper solution deepens in blue · arrows: kinematic (electrons through the external circuit; Cu²⁺ and Mg²⁺ leaving the anode; Ag⁺ and Fe³⁺ moving to the cathode; NO₃⁻ or Cl⁻ and Na⁺ leaving the salt bridge); the Fe³⁺ → Fe²⁺ arrow at the platinum is a reaction arrow, symbolic, drawn as the same iron ion leaving again · moving, the cell runs on the clock for about 6 s and holds, two electrons through the wire for each Cu²⁺ (or Mg²⁺) formed, two Ag⁺ plated (or two Fe³⁺ reduced) and two anions and two cations out of the bridge · one choice, cell (copper and silver(I), the default and Figure 17.3; magnesium and iron(III), Figure 17.4), untyped; no slider, since nothing in the text varies continuously · headline "Electrons flow from the copper anode to the silver cathode." ("… to the platinum." for the magnesium cell) · no graph; a legend strip beneath names each particle · physical 3D, an apparatus (book rule): two beakers on a bench joined by a salt bridge and a wire through the external circuit, pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the particles already move, views front and above · electrodes, ions and electrons by `F.el` (Cu, Ag, Mg, Pt, Fe, Na, Cl, N and O for nitrate, e⁻), each ion sized by its ionic radius so Mg²⁺ and Cl⁻, alike in hue, differ in size; the blue of Cu²⁺(aq) a physical fact, the named constant CU_BLUE `#3b8fd9`, its depth following [Cu²⁺]; the other solutions colorless as the book draws them; labels: anode, cathode, salt bridge, external circuit and the two solutions (six, all on still parts); every ion and electron is moving, so their names are in the legend and on hover · readout: the cell schematic with the ion concentrations in `concentration`, Cu(s) | 1.00 M Cu²⁺(aq) ‖ 1.00 M Ag⁺(aq) | Ag(s) at the start (the book's cell, its salts written as their ions, as the book's own key writes schematics), changing as the cell runs with equal volumes in the two half-cells (Cu²⁺ to 1.25 M, Ag⁺ to 0.50 M; Mg²⁺ 0.100 to 0.175 M, Fe³⁺ 0.200 to 0.050 M, Fe²⁺ 0.300 to 0.450 M); clock-driven, so never highlighted; the formula morphs by meaning when the cell is changed · note: the count per two electrons, which the event rhythm makes visible
- Folded: Figure 17.4 is the second state of the choice; the eyebrow reads "Figure 17.3 + 17.4", both images in `originals`, and the citation of Figure 17.4 in Cell Notation links back to it, a short scroll above.

Extra simulations: none. A Sim for writing schematics would only replay the guidelines; the readout writes both cells' schematics live.

## Tables

None.

## Types bound

`concentration` (the ion concentrations in the readout, and the 1 M of the example's prose). Charges, coefficients and the counts per two electrons stay ink; atoms, ions and electrons by `F.el`; Cu²⁺ blue a fact. `mass` is not bound: no mass is stated, the electrodes' change is shown and not measured.

## Referents

None (the two half-cells differ by element; chapter `COLOR.md`).

## Exercises

Check Your Learning after Example 17.3, host `ex-schematics`, open answer from the book (`source_id` the example's id, fs-idm168909584). Ten end-of-section items: five keyed kept (fs-idm154595184, fs-idm144742192, fs-idm20230112, fs-idm117307760, fs-idp44043568); fs-idm144742192 and fs-idm20230112 restate the schematics and reactions of the items they refer to; fs-idm144354208 (unkeyed choice, anode or cathode) kept open with a suggested approach; fs-idm33124048 (unkeyed conceptual) kept with a suggested approach; three unkeyed left out because the answer would be computed (fs-idm104280704 half-reactions, fs-idm218235136 balancing and schematics, fs-idp19248144 schematics). Nothing moved.

## Left out

Nothing of the prose. Errata kept as printed: the overall equation's "Cu^{2}{}^{+}"; the key of fs-idm154595184 (d) with its misplaced parenthesis, "(aq), Cu²⁺".

## Wanted at chapter level

- No variables, forms or anchors: 17.2 has no variables rows and states no formula.
- concepts `cell-potential`: the glossary term "cell potential" printed in 17.2's glossary already sits on 17.3's concept (no change).
