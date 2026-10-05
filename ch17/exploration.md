# Exploration: Chemistry 2e, Chapter 17 Electrochemistry

Written 2026-10-05, before the chapter was prepared. The eight modules were converted with `python3 tools/convert.py 17` and read in full. Figure, table and example numbers follow openstax.org (checked on the publisher's pages for 17.4, 17.5, 17.6 and 17.7), from the opener as Figure 17.1. Nothing departs from the book's organisation.

## Why this chapter

Chapter 4 balanced redox equations; Chapter 16 asked whether a reaction will go. This chapter sends the electrons of a redox reaction through a wire and reads the answer off a voltmeter. 17.1 reviews oxidation numbers and the half-reaction method, adding the basic-solution step. 17.2 separates the reactants into half-cells joined by a salt bridge and an external circuit (the galvanic cell), names anode and cathode, and writes the cell in its schematic. 17.3 measures the driving force as a cell potential, fixes the zero at the standard hydrogen electrode, tabulates standard electrode potentials in order of oxidant strength and predicts spontaneity from the sign of E°cell. 17.4 ties the three measures together (ΔG° = −nFE°cell, E°cell = (RT/nF) ln K) and lets the composition move the potential through the Nernst equation, down to the concentration cell. 17.5 turns galvanic cells into batteries (dry, alkaline, NiCd, lithium ion, lead acid) and fuel cells; 17.6 finds the same cell, unwanted, on a scratched iron surface and protects against it; 17.7 runs a cell backwards with an external voltage (electrolysis) and counts the electrons with Q = It = nF.

## Modules

| Section | Module | Ex. | Fig. | Img. | Tables | Glossary | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68820 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 17.1 Review of Redox Chemistry | m68821 | 2 | 0 | 0 | 0 | 2 | 2 | 10 | 5 | glossary holds two terms of later sections |
| 17.2 Galvanic Cells | m68822 | 1 | 3 | 0 | 0 | 7 | 1 | 10 | 5 | — |
| 17.3 Electrode and Cell Potentials | m68823 | 2 | 2 | 0 | 1 | 3 | 2 | 6 | 3 | Key Equations |
| 17.4 Potential, Free Energy, and Equilibrium | m68824 | 3 | 1 | 0 | 1 | 3 | 3 | 5 | 3 | Key Equations |
| 17.5 Batteries and Fuel Cells | m68825 | 0 | 7 | 0 | 0 | 9 | 0 | 5 | 3 | 7 Link to Learning |
| 17.6 Corrosion | m68826 | 0 | 3 | 0 | 0 | 5 | 0 | 6 | 3 | Chemistry in Everyday Life: Statue of Liberty: Changing Colors |
| 17.7 Electrolysis | m68827 | 2 | 3 | 0 | 0 | 2 | 2 | 7 | 2 | Key Equations; Chemistry in Everyday Life: Electroplating |

No Portrait of a Chemist or How Sciences Interconnect box. No image inside an exercise.

## Numbers as openstax.org prints them

- Figures: intro 17.1 EVCharging (photo). 17.2: 17.2 CuAg (three photographs of a copper coil in silver nitrate), 17.3 Galvanicel (Cu | Ag cell with salt bridge, electron and ion flows), 17.4 Oxidareduc (Mg | Fe³⁺, Fe²⁺ | Pt cell). 17.3: 17.5 SHE (the electrode with a magnified Pt surface), 17.6 GalvanCu (SHE against Cu²⁺/Cu with a voltmeter reading +0.337 V). 17.4: 17.7 Relation (the K, ΔG°, E°cell triangle). 17.5: 17.8 Daniell (1904 drawing beside a simplified cell), 17.9 DryCell, 17.10 AlkalineBat, 17.11 NiCd, 17.12 LiIon (Li⁺ moving between LiCoO₂ and graphite on charge and discharge), 17.13 Lead, 17.14 FuelCell. 17.6: 17.15 Statue (two images (a)(b), inside the note), 17.16 Rust, 17.17 Protect. 17.7: 17.18 NaCl (Downs cell), 17.19 Water (electrolysis apparatus), 17.20 Electroplate (inside the note).
- Tables: 17.1 Selected Standard Reduction Potentials at 25 °C (17.3, `fs-idm42585168`); 17.2 untitled (17.4, `fs-idm241340256`, K, ΔG°, E°cell and a fourth unheaded column). Key Equations tables are not printed.
- Examples: 17.1–17.2 (17.1), 17.3 (17.2), 17.4–17.5 (17.3), 17.6–17.8 (17.4), 17.9–17.10 (17.7). 17.5 and 17.6 have none.
- File-name quirks: Figure 17.8 is `CNX_Chem_17_08_Daniell.jpg` though it sits in 17.5; the bundle also holds `CNX_Chem_17_01_Electric.jpg` and `CNX_Chem_17_03_GalvanAg.jpg`, which no module names. No bundle name carries a space. Appendix L (standard electrode potentials) is cited as `module:m68870`; link it as the sheet `/chemistry-2e/sheets/potentials/`.

## What is new

Electrochemical, galvanic and electrolytic cells, half-cells, anode and cathode, salt bridge, active and inert electrodes, cell notation; potential, cell and electrode potentials and their standard values, the standard hydrogen electrode, oxidant strength from E°, spontaneity from the sign of E°cell; Faraday's constant, ΔG° = −nFE°cell, E°cell and K, the Nernst equation, concentration cells; batteries (primary, secondary, five chemistries) and fuel cells; corrosion, rusting, passivation, galvanization, cathodic protection, sacrificial anodes; electrolysis of molten salts, water and brine, electroplating, current and Q = It = nF. 17.1 is a review: oxidation numbers, redox reactions, half-reactions, oxidants and reductants and the half-reaction method stand in 4.2 and are reused.

One new type, `current` (I, in A), for 17.7: its figures draw a current on a slider and its readout writes Q = It. Symbols staged and merged: potential `E_potential` (latex E, `\kEpot`), `E°_cell` `\kEocell`, `E_cathode` `\kEcathode`, `E_anode` `\kEanode`, `E°_cathode` `\kEocathode`, `E°_anode` `\kEoanode`, `E_X` `\kEX`, `E°_X` `\kEoX`, `E_SHE` `\kEshe`; charge `F_Faraday` (latex F, `\kFaraday`); current `I` `\kI`; energy `w_elec` `\kwelec`. Reused: `E_cell` `\kEcell`, `E_std` `\kEo` (E°), `Q_charge` `\kQ` (charge), `Q_c` `\kQrxn` (reaction quotient), `n` `\kn`, `t` `\kt`, `ΔG` `\kdG`, `ΔG°` `\kdGo`, `w_max` `\kwmax`, `K` `\kK`, `T` `\kT`, untyped `R`.

## Sketches to redraw and photographs to keep

- 17.2 CuAg: three photographs the text points at; kept as a photo row.
- 17.3 Galvanicel and 17.4 Oxidareduc: the chapter's founding apparatus. A galvanic cell is a 3D bench by the book's rule (bounded orbit, never from beneath). Both draw kinematic arrows (electrons through the wire, Cu²⁺ leaving the anode, Ag⁺ plating, NO₃⁻ and Na⁺ leaving the salt bridge), so the floor is the moving tier: electrons and ions on a clock, the anode solution turning blue (the colour is a fact), the silver growing. A fold 17.3 + 17.4 with a choice of cell (Cu | Ag, active electrodes; Mg | Fe³⁺, Fe²⁺ | Pt, an inert cathode) and the cell schematic written beneath is natural; 17.2's call.
- 17.5 SHE and 17.6 GalvanCu: apparatus (3D bench). 17.6 is the natural slider-and-choice figure: the SHE as anode, a choice of half-cell X from Table 17.1 as cathode, the voltmeter reading E°X; or a still Sim beside it, Table 17.1 as a vertical ladder of E° where the reader picks a cathode and an anode couple and reads E°cell = E°cathode − E°anode and the verdict (Example 17.4: Ag over Cu +0.46 V, Pb under Cu −0.47 V). The bubbles of 17.5 rise (kinematic); 17.5 may fold into 17.6 or stay a copy. 17.3's call.
- 17.7 Relation: a still Figure. One E°cell slider (with n as a choice) moves the three vertices together, ΔG° and K live, the special at E°cell = 0 (K = 1, ΔG° = 0) a dashed circle; Table 17.2 stays as `div.book-table` beside it.
- Nernst (no book figure): a still Sim, E_cell against log Q as a line of slope −0.0592/n, Q on a slider, E°cell and n as choices, the crossing E_cell = 0 at Q = K as a special. The concentration cell of Example 17.8 is a moving Sim candidate (the two Zn²⁺ concentrations converging to 0.30 M on a clock while E_cell falls to zero), which also answers exercise `fs-idm100291296` (a battery goes dead at Q = K). 17.4's call which to build.
- 17.8 Daniell: the 1904 drawing is a historical document; keep the figure as a copy. 17.9 DryCell, 17.10 AlkalineBat, 17.11 NiCd, 17.13 Lead: labelled cutaways in perspective; faithful copies, or a locked view (rule 28.2) if one is redrawn. 17.12 LiIon: kinematic arrows (Li⁺ shuttling) put it at the moving tier: a choice of charge or discharge, lithium ions (`F.el('Li')`) moving between the layered oxide and graphite, the electrons through the external circuit. 17.14 FuelCell: kinematic (fuel and air in, water out, H⁺ across the electrolyte, electrons around): a moving Figure, flat (the book's section). 17.5's call on which to redraw.
- 17.15 Statue: two images inside the note; kept as a photo row (the note points at it).
- 17.16 Rust and 17.17 Protect: both draw electrons and ions moving (kinematic). A moving Figure each, flat (cross sections); a fold with a choice of protection (bare scratch, paint, zinc coat, sacrificial Mg anode) showing where the corrosion moves is possible, with E° of the chosen anode metal against iron's −0.447 V in the readout (exercises `fs-idm150150768`, `fs-idp47040832`). 17.6's call.
- 17.18 NaCl (Downs cell), 17.19 Water, 17.20 Electroplate: electrolytic apparatus, 3D bench by the book's rule, kinematic arrows (ions migrating, gas bubbling, electrons pushed by the source). 17.19 or 17.20 carries the section's quantitative idea: current I and time t on sliders, Q = It, moles of electrons, moles and mass (or gas volume, 2:1 H₂ to O₂) of product, with Example 17.9 (10.23 A, 1 h, 41.19 g Ag) as defaults. 17.7's call.
- 17.1 has no figure; a still Sim stepping through the eight steps of the half-reaction method on Example 17.1 or 17.2 (a choice of acidic or basic medium), the equation morphing step to step, is the one candidate; 17.1's call under rule 24.

## Notes, Link to Learning and PhET

Seven Link to Learning notes, all in 17.5 (batteries, zinc-carbon, alkaline, NiCd, lithium ion, lead acid, fuel cells); dropped and named in `notes`. No PhET link and no `simulation-exercise`. Two Chemistry in Everyday Life notes, kept verbatim as `div.note` with their figures: Statue of Liberty: Changing Colors (17.6, Figure 17.15) and Electroplating (17.7, Figure 17.20, with the `electroplating` term).

## Exercises that belong elsewhere

None move. `fs-idm100291296` (17.5, a dead battery's Q) uses the Nernst equation of 17.4 but is about a battery and stays; the 17.6 items read Table 17.1 and stay.

Several keyed items lean on an unkeyed item left out: `fs-idp35560976` on `fs-idp25311568` and `fs-idp52202560` on `fs-idp171005680` (17.1), `fs-idm144742192` on `fs-idm104280704` and `fs-idm20230112` on `fs-idm218235136` (17.2), `fs-idp30833248` on `fs-idm27929184` (17.7). Each kept item restates the reactions, schematics or salts it refers to, quoted from the item left out, and the section's `exercise_notes` say so.

## Keyed and unkeyed

Precedent (4.2): an unkeyed balancing, schematic or half-reaction item has an answer that would have to be computed and is left out like a numerical one; an unkeyed choice item is kept open with its options; an unkeyed why or explain item is kept with an AI-marked suggested approach.

- 17.1: 10 items, 5 keyed. Left out: `fs-idp25311568`, `fs-idp171005680` (balancing). Kept open with options: `fs-idp124081968` (oxidation or reduction, four parts). Suggested approach: `fs-idp176626064`, `fs-idp22326976`. 8 items. CYL 2.
- 17.2: 10 items, 5 keyed. Left out: `fs-idm104280704`, `fs-idm218235136`, `fs-idp19248144`. Kept open with options: `fs-idm144354208` (anode or cathode, explain). Suggested approach: `fs-idm33124048`. 7 items. CYL 1.
- 17.3: 6 items, 3 keyed. Left out: `fs-idm18460288`, `fs-idp4217296`, `fs-idp110111760`. 3 items. CYL 2.
- 17.4: 5 items, 3 keyed. Left out: `fs-idp27704096`, `fs-idp126191568`. 3 items. CYL 3.
- 17.5: 5 items, 3 keyed. Left out: `fs-idm149853488` (parts (a) and (b) need computed answers). Suggested approach: `fs-idp39083136`. 4 items. No CYL.
- 17.6: 6 items, 3 keyed. Kept open with options: `fs-idp66944528` (which of each pair). Suggested approach: `fs-idm127027504`, `fs-idp44419248`. 6 items. No CYL.
- 17.7: 7 items, 2 keyed. Left out: `fs-idm330221280`, `fs-idm324128112`, `fs-idm27929184`, `fs-idp30601424`, `fs-idm13758224`. 2 items. CYL 2.
- Every CYL is keyed and needs its `data-place` host. Read the CNXML for each key.

## Errata to carry as printed and name in `notes`

- 17.1: "the oxidations numbers"; step 8 "add OH⁻ ions the equation obtained" (twice); Example 17.2's problem lacks the full stop before "The reaction takes place"; the module's glossary carries "electrode potential" and "half cell", which the chapter places on 17.3's and 17.2's concepts.
- 17.2: the overall equation sets "Cu^{2}{}^{+}"; key `fs-idm154595184` (d) sets "(aq), Cu²⁺" with a misplaced parenthesis; the glossary carries "cell potential", defined in 17.3.
- 17.3: CYL answer "−0. 47 V"; CYL answer of Example 17.5 writes "Br₂(s)"; Table 17.1 prints Cu²⁺/Cu as +0.34 while the text and Figure 17.6 read +0.337, puts Mn²⁺ (−1.185) and Zn(OH)₂ (−1.245) above Zn²⁺ (−0.7618), writes "Mg^{2}(aq)" without the +, and its summary attribute disagrees with the cells (use the cells); "insure", "predication"; the glossary's "standard electrode potential ((E°X))" and "1 bar or 1 atm or gases".
- 17.4: "TFaraday's constant is defined … C/mol e–.he relation" (openstax.org prints it so); "(298) K)"; Example 17.7 writes "−0.1 7 V"; the Key Equations write "w_ele".
- 17.5: "its intended use a source"; "a potassium hydroxide electrode" for electrolyte; "a large amount current"; "via a catalyzed electrochemical that is"; Figure 17.14 precedes the equations it illustrates.
- 17.6: "as illustrated in Figure 17.15" for the rust cell of Figure 17.16 (openstax.org prints 17.15); "a passivating an oxide layer"; "because as they get used up"; the cathode's E° subscript "O₂/O²"; Fe²⁺/Fe at −0.44 V against the table's −0.447; exercise `fs-idm127027504` gives −2.07 V for Al and −0.477 V for Fe³⁺/Fe; `fs-idm80636048` lacks its question mark; the summary's "Corrosion process involve"; the glossary's "salt bridge" belongs to 17.2's concept.
- 17.7: "OH<sup>-</sup>" with a hyphen; "n mole of electrons"; Example 17.10 "from a solution of containing".

## Root rule 28

Physical 3D: the galvanic cells of Figures 17.3, 17.4 and 17.6 (and the SHE of 17.5 if redrawn), the electrolytic cells of 17.18, 17.19 and 17.20: benches with beakers, electrodes, a salt bridge or a source, a bounded orbit that never shows the underside. The layered electrodes of 17.12 could be a 3D stage of `F.el` spheres, but the lesson is the shuttle between two layers, which reads flat. Locked view: the battery cutaways 17.9–17.11 and 17.13 if any is redrawn. Nothing mathematical in 3D: the E° ladder, the K–ΔG°–E° triangle, the Nernst line, the rust and protection cross sections and the fuel cell are flat.

## BE INSPIRING

Make the reader feel the voltage as a push of electrons with a number on it. Drop a copper coil into silver nitrate and watch the blue rise, then pull the two reactants apart into half-cells and see the same electrons forced through a wire and a voltmeter. Hand the reader the ladder of standard potentials and let them pair any two rungs to read the push, positive downhill and negative uphill; then let the cell run, the concentrations creep toward each other and the needle sag to zero exactly where Q reaches K, which is why a battery dies. End with the push reversed: an external source drives electrons uphill, and a current dial and a clock decide how many grams of silver land on a spoon.

## Errata as built

Gathered at the chapter pass (2026-10-05) from each section's `notes` and `exercise_notes`. Every slip below is kept as printed and named in its section's `notes`; none is corrected.

- 17.1: "the oxidations numbers"; step 8's "add OH⁻ ions the equation obtained in step 7"; the missing full stop in the problem of Example 17.2.
- 17.2: the overall equation's "Cu^{2}{}^{+}"; the misplaced parenthesis "(aq), Cu²⁺" in the key of `fs-idm154595184` (d).
- 17.3: the Check Your Learning answers' "−0. 47 V" and "Br₂(s)"; Table 17.1's +0.34 V for copper beside the text's and Figure 17.6's +0.337 V; its Mn²⁺ and Zn(OH)₂ rows printed above Zn²⁺; "Mg²(aq)" without its plus sign; "predication" for prediction.
- 17.4: "TFaraday’s constant … C/mol e–.he relation", run together as openstax.org prints it; "(298) K)"; Example 17.7's "−0.1 7 V". The Key Equations' "w_ele" is not printed, since the Key Equations table is the chapter's forms.
- 17.5: "its intended use a source"; "a potassium hydroxide electrode" for the electrolyte; "a large amount current"; "via a catalyzed electrochemical that is"; Figure 17.14 standing before the equations it illustrates. The seven Link to Learning notes are dropped and named in `notes`.
- 17.6: "as illustrated in Figure 17.15" in the text, which means the rust cell of Figure 17.16; openstax.org prints 17.15 there too, so the reference is kept as printed and Figure 17.16 + 17.17 is the figure it describes. Also "a passivating an oxide layer", "because as they get used up", the cathode's subscript O₂/O², the summary's "Corrosion process involve", the missing question mark of `fs-idm80636048`, and in `fs-idm127027504` −2.07 V for aluminum and −0.477 V for Fe³⁺/Fe (named in `exercise_notes`).
- 17.7: Example 17.10's "from a solution of containing"; "n mole of electrons"; "OH-" with a hyphen among the water species.
