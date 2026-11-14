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
- sim-galvanic-cell · Figure 17.3 + 17.4 · galvanic-cell, half-cell, anode, cathode, salt-bridge, inert-electrode, active-electrode, cell-notation · flow by animation and variation by choice: the book draws each cell once with arrows for the electrons and the ions; here the electrons run along the wire from anode to cathode, Cu²⁺ (Mg²⁺) leaves the anode, Ag⁺ plates out (Fe³⁺ turns to Fe²⁺ at the platinum), anions run down the bridge and out of its left plug while cations leave its right plug, the active electrodes thin and grow while the platinum does not, and the copper solution deepens in blue · arrows: kinematic (electrons in the wire, ions in the bridge and the solutions); the two "flow of" arrows and the "flow of electrons" arrow are the book's notation, symbolic · moving, the cell runs about 6 s and holds, two electrons through the wire for each Cu²⁺ (or Mg²⁺) formed, two Ag⁺ plated (or two Fe³⁺ reduced) and two anions and two cations out of the bridge · one choice, cell (copper and silver(I), the default and Figure 17.3; magnesium and iron(III), Figure 17.4) · no headline: the book's "flow of electrons →" over the circuit says where the electrons go · no graph; a legend row beneath names each moving particle · 2D (rebuilt flat on 2026-11-14 from the two images): an apparatus whose parts and connections are the lesson, which a turn never added to, and the 3D bench was small with labels on the glass and view buttons (rules 26.2, 28.5) · electrodes, ions and electrons by `F.el`, each ion sized by its ionic radius; the blue of Cu²⁺(aq) the named fact CU_BLUE `#3b8fd9`, deepening with [Cu²⁺]; labels on still parts only (electrodes, salt bridge, porous plug, the two solutions, external circuit), moving particles in the legend and on hover · readout: the cell schematic with the ion concentrations in `concentration`, Cu(s) | 1.00 M Cu²⁺(aq) ‖ 1.00 M Ag⁺(aq) | Ag(s) at the start, changing as the cell runs with equal volumes in the two half-cells (Cu²⁺ to 1.25 M, Ag⁺ to 0.50 M; Mg²⁺ 0.100 to 0.175 M, Fe³⁺ 0.200 to 0.050 M, Fe²⁺ 0.300 to 0.450 M); clock-driven, never highlighted · note: the count per two electrons
  works: parts: two beakers, each half full; in the left a copper strip (a magnesium ribbon coiled flat into a spiral near the floor), in the right a silver strip (a platinum wire coiled along the floor); each electrode rises out of its beaker and joins a wire that runs up and across to the external circuit box at the top centre; an inverted-U glass tube, the salt bridge, filled with electrolyte, its two legs dipping into the two solutions, each foot closed by a gray porous plug under the liquid · flow: electrons along the wire from the anode (left) through the box to the cathode (right); Cu²⁺ (Mg²⁺) from the anode into its solution; Ag⁺ (Fe³⁺) from the solution onto the cathode; anions (NO₃⁻ or Cl⁻) along the bridge to its left foot and out into the anode half-cell; cations (Na⁺) to its right foot and out into the cathode half-cell · must hold: (1) the anode is the left electrode and the cathode the right; (2) electrons move only through the wire, left to right; (3) both plugs sit below the liquid surface; (4) anions leave the bridge only on the anode side and cations only on the cathode side; (5) each electrode is one piece from the wire down into its solution; (6) the platinum does not change; the copper and magnesium thin and the silver thickens; (7) per two electrons, one metal ion forms, two cathode ions are reduced, two anions and two cations leave the bridge · read off the image: 17.3: "flow of electrons →", "external circuit", "Flow of anions ←", "→ Flow of cations", NO₃⁻ and Na⁺ on the bridge, "Salt bridge (NaNO₃)", "Porous plug", "Cu anode", "Ag cathode", Cu²⁺ leaving the copper, Ag⁺ arriving at the silver, "1 M solution of copper (II) nitrate (Cu(NO₃)₂)" and "1 M solution of silver nitrate (AgNO₃)". 17.4: "Mg anode" (a flat spiral ribbon), "Pt cathode" (a coil lying along the floor), "Salt bridge" with Cl⁻ and Na⁺, Fe³⁺ → Fe²⁺ at the coil, "0.1 M MgCl₂" and "0.2 M FeCl₃ and 0.3 M FeCl₂". The alt text calls the copper anode "negative" and the silver cathode "positive"; the image prints no signs, so none are drawn. The solutions are named by formula under the beakers and their live concentrations are in the readout, since the book's initial molarities go stale as the cell runs.
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

Applied by the chapter pass (2026-10-05):

- Nothing to apply. A fact comment now names the blue of Cu²⁺(aq) beside its colour in `figures.js`.
