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
- sim-galvanic-cell · Figure 17.3 + 17.4 · galvanic-cell, half-cell, anode, cathode, salt-bridge, inert-electrode, active-electrode, cell-notation · flow by animation, counting and variation by choice: the book draws each cell once with arrows; here the cell runs in four beats of two electrons, and in each beat one Cu²⁺ (Mg²⁺) leaves the anode, two Ag⁺ plate onto the cathode as atoms that stay (two Fe³⁺ touch the platinum and leave as Fe²⁺), and two anions and two cations leave the salt bridge, every ion wearing its charge and staying where it arrives, so the reader can count that each solution stays neutral; taking the salt bridge out stops everything, which is the section's exercise on why the bridge is needed; the cell schematic stands under the cell, each term under the part it names, so the notation is read off the apparatus from anode to cathode · arrows: kinematic (electrons in the wire, ions in the bridge and the solutions); "flow of electrons", "Flow of anions" and "Flow of cations" are the book's notation, symbolic · moving, four beats of 1.75 s then a hold; the current has a clock · two choices: cell (copper and silver(I), the default and Figure 17.3; magnesium and iron(III), Figure 17.4) and salt bridge (in place, taken out) · no headline: the half-reaction over each electrode's wire and the book's "flow of electrons →" say what happens where · no graph; a key row names each particle · 2D, an apparatus drawn flat from the two images (book rule on apparatus) · electrodes, ions and electrons by `F.el`; each ion carries its charge as a mark (chapter `COLOR.md`), which also tells Mg²⁺ from Cl⁻, both green in the palette, with Cl⁻ drawn larger; the blue of Cu²⁺(aq) the named fact CU_BLUE `#3b8fd9`, deepening as Cu²⁺ forms; labels on still parts, moving particles in the key and on hover · readout: the charge added to each solution so far, one line per half-cell, each a sum of the drawn ions' charges that comes to 0; clock-driven, never highlighted; a note only when the bridge is out. Rebuilt on 2026-11-16: the earlier flat drawing was correct but showed ions that faded away after a moment, unmarked and too small to tell apart, so the charge balance the passage is about could only be read in a note.
  works: parts: two beakers, each over half full; in the left a copper strip (a magnesium ribbon that comes down the left wall and coils flat into a spiral), in the right a silver strip (a platinum wire that comes down the right wall and coils along the floor); a wire from the top of each electrode up and across to the external circuit box at top centre; an inverted-U glass tube, the salt bridge, filled with NaNO₃ (NaCl) solution, one leg dipping into each solution on the side away from the electrode, each foot closed by a gray porous plug under the liquid · flow: electrons along the wire from the anode (left) through the box to the cathode (right); Cu²⁺ (Mg²⁺) off the anode into its solution; Ag⁺ (Fe³⁺) from the solution to the cathode, where Ag stays as metal (Fe²⁺ goes back into the solution); NO₃⁻ (Cl⁻) along the bridge to its left foot and out into the anode half-cell; Na⁺ to its right foot and out into the cathode half-cell · must hold: (1) the anode is the left electrode and the cathode the right, oxidation on the left and reduction on the right; (2) electrons move only in the wire, left to right, and only while the bridge is in place; (3) with the bridge in place both plugs sit below the liquid surface, and taken out both feet hang clear above it; (4) anions leave the bridge only into the anode half-cell and cations only into the cathode half-cell; inside the bridge every anion moves left and every cation right; (5) each electrode is one piece from the wire down into its solution; (6) the platinum does not change; copper is eaten away and magnesium thins; silver atoms build up on the cathode; (7) per beat: 2 electrons, 1 Cu²⁺ (Mg²⁺), 2 Ag (2 Fe³⁺ → 2 Fe²⁺), 2 anions and 2 cations, and the counts in the readout and in the box are the particles drawn; (8) the schematic reads anode, |, anode solution, ‖, cathode solution, |, cathode, each under its part, with the book's formulas · read off the image: 17.3: "flow of electrons →", "external circuit", "Flow of anions ←", "→ Flow of cations", NO₃⁻ and Na⁺ in the bridge, "Salt bridge (NaNO₃)", "Porous plug", "Cu anode", "Ag cathode", Cu²⁺ leaving the copper, Ag⁺ arriving at the silver, "1 M solution of copper (II) nitrate (Cu(NO₃)₂)" and "1 M solution of silver nitrate (AgNO₃)". 17.4: "Mg anode" (a flat spiral), "Pt cathode" (a coil along the floor), "Salt bridge" with Cl⁻ and Na⁺, Fe³⁺ → Fe²⁺ at the coil, Mg²⁺ leaving the spiral, "0.1 M MgCl₂" and "0.2 M FeCl₃ and 0.3 M FeCl₂". The schematics are the text's: Cu(s) | 1 M Cu(NO₃)₂(aq) ‖ 1 M AgNO₃(aq) | Ag(s) and Mg(s) | 0.1 M MgCl₂(aq) ‖ 0.2 M FeCl₃(aq), 0.3 M FeCl₂(aq) | Pt(s); they open on the book's values, written to two decimals, and change with the ions drawn (each Cu²⁺ drawn is 0.05 M, each Mg²⁺ 0.01 M, equal volumes in the two half-cells, a scale chosen so the change shows). The alt text calls the copper anode "negative" and the silver cathode "positive"; the image prints no signs, so none are drawn. The solutions' own ions are not drawn: only the ions the reaction makes, uses up or the bridge sends, so the count stays readable. The salt bridge taken out is not in the book's images; the section's exercise says the circuit is then open and no current flows.
- Folded: Figure 17.4 is the second state of the choice; the eyebrow reads "Figure 17.3 + 17.4", both images in `originals`, and the citation of Figure 17.4 in Cell Notation links back to it, a short scroll above.

Extra simulations: none. A Sim for writing schematics would only replay the guidelines; the figure writes both cells' schematics under their parts.

## Tables

None.

## Types bound

`concentration` (the concentrations in the schematic under the cell, and the 1 M of the example's prose). Charges, coefficients and the counts per two electrons stay ink; atoms, ions and electrons by `F.el`; Cu²⁺ blue a fact. `mass` is not bound: no mass is stated, the electrodes' change is shown and not measured.

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
