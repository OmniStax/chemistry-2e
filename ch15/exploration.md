# Exploration: Chemistry 2e, Chapter 15 Equilibria of Other Reaction Classes

Written 2026-09-28, before the chapter was prepared. The four modules were converted with `python3 tools/convert.py 15` and read in full. Figure and example numbers follow openstax.org (checked for 15.1 on the publisher's page), from the opener as Figure 15.1. Nothing departs from the book's organisation; 15.2 and 15.3 are short in prose but stay pages of their own.

## Why this chapter

Chapter 13 built equilibrium and Chapter 14 spent it on the proton. This chapter spends it on three more reaction classes. A sparingly soluble salt in contact with its saturated solution is an equilibrium whose constant, K_sp, gives the molar solubility through an ICE table, predicts precipitation through Q_sp against K_sp, separates ions by selective precipitation and explains the common ion effect (15.1). Lewis widens the acid to any electron-pair acceptor, and a metal ion taking ligands forms a complex ion whose formation constant K_f can pull a "insoluble" salt into solution (15.2). Coupled equilibria put the two together: a salt of a basic anion dissolves in acid (coral reefs, tooth enamel) and a hydroxide dissolves in base by complex formation, each net K a product or quotient of the constants (15.3). The thread is one inequality, Q against K, drawn on a log concentration plane where the K_sp curve divides clear solution from precipitate.

## Modules

| Section | Module | Ex. | Fig. | Img. (outside exercises) | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68810 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 15.1 Precipitation and Dissolution | m68811 | 13 | 5 | 4 ICE tables | 0 | 4 | 13 | 60 | 30 | Key Equations; How Sciences Interconnect (barium sulfate, Figure 15.4); Chemistry in Everyday Life (wastewater, Figure 15.6); 1 Link to Learning (solubility simulation) |
| 15.2 Lewis Acids and Bases | m68813 | 1 | 0 | 7 (5 Lewis equations, Cu(CN)₂⁻ structure, 1 ICE table) | 0 | 9 | 1 | 24 | 12 | — |
| 15.3 Coupled Equilibria | m68814 | 2 | 3 | 2 (Al(OH)₄⁻, Ag(S₂O₃)₂³⁻ equation) | 0 | 1 | 2 | 22 | 10 | Chemistry in Everyday Life (fluoride, Figure 15.9); 1 Link to Learning (ocean acidification) |

## Numbers as openstax.org prints them

- Figures: intro 15.1 Fluorite. 15.1: 15.2 AgCl (two beakers, dissolution ⇌ precipitation, a particle drawing), 15.3 OilPaints (photo, Example 15.5), 15.4 BariumXray (photo, in the note), 15.5 Blood (photo, Example 15.9), 15.6 Wastewater (photo, in the note). 15.2: none. 15.3: 15.7 CoralReef (a)(b), 15.8 Apatite, 15.9 Toothpaste (in the note).
- Examples: 15.1–15.13 (15.1), 15.14 (15.2), 15.15–15.16 (15.3). No numbered table; Key Equations table not printed.
- Unnumbered images: 15.1 `CNX_Chem_15_01_ICETable1_img.jpg`, `…ICETable7_img`, `…ICETable2_img`, `…ICETable3_img` (Examples 15.3, 15.4, 15.6, 15.13). 15.2 `CNX_Chem_15_03_hydronium_img.jpg` (note: a 15_03 name in 15.2), `CNX_Chem_15_02_BF3-LA_img`, `…NH3-LBase_img`, `…NonmetalOx_img`, `…Displace_img`, `…CuCN2-_img`, `…ICETable1_img` (Example 15.14); exercise images `…ICETable3_img` and `…Answer18a–e_img`, `…Answer24a–d_img` sit in keys. 15.3 `CNX_Chem_15_02_AlOH4_img.jpg` (a 15_02 name in 15.3), `CNX_Chem_15_03_AgBr_img.jpg` (Example 15.16). No bundle name carries a space. The bundle holds other ICE files; use only the ones `source.md` names.

## What is new

The solubility product and its expression; K_sp from solubility and molar solubility from K_sp; Q_sp against K_sp; the concentration at which precipitation begins or to which an ion is lowered; selective precipitation; the common ion effect. Coordinate covalent bonds; Lewis acids, bases and adducts; displacement reactions; complex ions and ligands; formation and dissociation constants. Coupled equilibria of dissolution with acid-base and with complex formation.

No new type. Symbols staged: untyped `K_sp`, `Q_sp`, `K_f_form` (latex K_f, since `K_f` is Chapter 11's cryoscopic constant), `K_d`, `p_stoich`, `q_stoich`; typed concentration `[M^m+]` `\kconcMion`, `[X^n-]` `\kconcXion`. Reused: `K`, `K_a2`, `x_ice`, `[H3O+]` `\kconcHyd`, `[OH-]` `\kconcOH`, `pH` `\kpH`, `pOH` `\kpOH`, `M` `\kM`. Molar solubility has no symbol of its own (the book writes x).

## Sketches to redraw and photographs to keep

- 15.2 AgCl (15.1): a particle picture, so 3D by the book's rule: a still (or slowly exchanging) `F.view3d` box, lattice of Ag⁺ and Cl⁻ in `F.el` with water, a choice of salt from the `ksp` sheet and the saturated ion concentrations in the readout. Candidate for the chapter's showpiece is a flat Sim beside it: log [cation] against log [anion] with the K_sp line, a point for the mixture (Q_sp) that shows clear solution or precipitate, a common-ion slider sliding along the line, and selective precipitation as two lines crossed by a rising [Ag⁺] (Examples 15.7–15.11, 15.13). The section decides one or both.
- 15.1's Link to Learning (solubility simulation) is dropped and named in `notes`; it triggers the Sim above. Its exercise `fs-idp2894848` is a `simulation-exercise`, held unless the Sim carries it and the plan rewrites the prompt.
- 15.3, 15.4, 15.5, 15.6 photographs (15.1): the text points at each; kept.
- 15.2's Lewis equation images: flat Lewis structures (book rule), each an unnumbered Figure or one still Sim with a choice of reaction (H₂O + H⁺, NH₃ + H⁺, F⁻ + BF₃, 2NH₃ + Ag⁺, O²⁻ + SO₃, the two displacements), the donated pair marked as a symbolic curly arrow, never animated. Ag(NH₃)₂⁺ as a structure the text names: both views with a view choice, default 2D. A still Sim of AgCl dissolving as ammonia is added (K_f, Q < K_sp) is the section's call.
- 15.7 CoralReef, 15.8 Apatite, 15.9 Toothpaste (15.3): photographs the text points at; kept. 15.9's bundle alt is a placeholder ("Replace with updated art"); write your own.
- 15.3: a still Sim of solubility against pH for a salt of a basic anion (Al(OH)₃ or CaCO₃ on the `ksp` sheet), log axes in the concentration hue, and a second branch for Al(OH)₄⁻ at high pH, is the natural figure for Examples 15.15 and the net-K equations. Section's call.
- ICE tables as HTML tables (as Chapters 13–14 did) or kept images; each plan says which.

## Keyed and unkeyed (exercise moves included)

- 15.1: 60 items, 30 keyed. Unkeyed numerical, left out: `fs-idp13178304`, `fs-idp13415712`, `fs-idp14351088`, `fs-idp14705520`, `fs-idp14816032`, `fs-idp14880288`, `fs-idp14989248`, `fs-idp1289872`, `fs-idp1405168`, `fs-idp1563760`, `fs-idp1597744`, `fs-idp1664496`, `fs-idp1720944`, `fs-idp1768416`, `fs-idp1852800`, `fs-idp1891472`, `fs-idp2236432`, `fs-idp2372080`, `fs-idp2754176`, `fs-idp2852912`, `fs-idp2945408`, `fs-idp3007504` (22). Kept with a suggested approach: `fs-idp15620912`, `fs-idp15767216`, `fs-idp15773008`, `fs-idp15782160`, `fs-idp14702288`; open choice items with their options: `fs-idp13349584` (four salts), `fs-idp2172896` (AgBr or AgCl). Held: `fs-idp2894848` (simulation-exercise). Moves in: `fs-idp46388832` (keyed, from 15.2), `fs-idm301808` (unkeyed conceptual, from 15.3), `fs-idp11595856` (keyed AP MgF₂, from 15.3). 40 items.
- 15.2: 24 items, 12 keyed. Left out: `fs-idm212489824`, `fs-idm50986272`, `fs-idm19606400`, `fs-idp18044656`, `fs-idm65404096`, `fs-idp26835744`, `fs-idm23888576` (7). Kept with a suggested approach: `fs-idp28555376`, `fs-idp56004352`, `fs-idp127234208`. Moves out: `fs-idp46388832` → 15.1; `fs-idm65484352`, `fs-idm98555648` (unkeyed conceptual, NH₃ or HNO₃ dissolving a salt) → 15.3. Moves in: `fs-idm299312`, `fs-idp457072`, `fs-idp135248` (keyed complex-ion concentrations, from 15.3). 17 items.
- 15.3: 22 items, 10 keyed. Left out: `fs-idp12915808`, `fs-idm356832`, `fs-idp103984`, `fs-idm455072`, `fs-idp11095024`, `fs-idp65312`, `fs-idm397184`, `fs-idp12821792` (8). Kept with a suggested approach: `fs-idp12964976`, `fs-idp12981920`, `fs-idp12998992`, plus the two moved in from 15.2. Moves out as above. 11 items.
- CYL: 13, 1, 2, all keyed, each with its `data-place` host.

## Errata to carry as printed and name in `notes`

- 15.1: "Le ChÂtelier’s" (write it Le Châtelier’s only if the CNXML has it right; the converter may have garbled it, so read the CNXML); Example 15.1 (e) "(PO₄)3OH" without the subscript; Example 15.10 "log(3.3 × 10-4)"; exercise `fs-idp15620912` "(b" unclosed; key `fs-idp14499248` "[Ti⁺]" for Tl⁺ and "[C₂)₄²⁻]" for [OH⁻] in (d); keys `fs-idp14703872` and `fs-idp14702288` cite the neighbouring exercise, read the CNXML for which; `fs-idp2976256` key ends "*K*<sub>sp</sub> value." twice.
- 15.2: `fs-idm55438304` "0.100 NH₃" without M; `fs-idm73346208` "potassium cyanide ion"; key `fs-idm47551360` "BF₄" without its charge; bundle alts of `Displace_img` ("4 FC atoms") and `Answer18d_img` ("F atom") are wrong, write your own.
- 15.3: the dissolution equation writes "CO₃^{-2}"; Example 15.15 "solublities"; Example 15.16 "Ag(S₂O₂)₂³⁻" once; `fs-idm397184` prints K_sp of CoS as 2.3 × 10²⁷ (positive exponent); key `fs-idp12990000` heads its third column [OH⁻]; key `fs-idp11209952` runs "1.08 × 10⁻¹⁰[Ba²⁺]=2.2 × 10⁻⁹" together.
- As built, gathered by the chapter pass on 2026-10-05. 15.1 keeps "Le ChÂtelier’s" (so in the CNXML, not the converter), Example 15.1 (e)'s "(PO₄)3OH", Example 15.10's "log(3.3 × 10-4)", the barium note's "10.08 × 10⁻¹⁰" and the wastewater note's "Ca₅(PO4)₃OH"; the key of `fs-idp14499248` with [Ti⁺] and [C₂)₄²⁻]; `fs-idp14703872` citing Exercise 15.18, which itself cites 15.17; the doubled "K_sp value." of `fs-idp2976256`'s key; `fs-idp15620912`'s unclosed "(b". 15.2 keeps "0.100 NH₃" (exercise 64), "potassium cyanide ion" (exercise 72), the chargeless BF₄ of exercise 82's key, and Example 15.14's [Ag(NH₃)₂⁺] = 0.099 without a unit; the wrong bundle alts are replaced by alts of OmniStax's own. 15.3 keeps CO₃^{−2}, "solublities", Ag(S₂O₂)₂³⁻ once, the [OH⁻] heading of exercise 105's key and exercise 95's run-together key; CoS's positive exponent leaves with its unkeyed item (exercise 98). Each is named in its section's `notes` or `exercise_notes`.

## Root rule 28

Physical 3D: Figure 15.2's dissolving lattice (particle picture), 15.2's complex ions if drawn in 3D (Ag(NH₃)₂⁺ linear, Al(OH)₄⁻ tetrahedral) with a view choice. Nothing mathematical in 3D; the K_sp plane and solubility-against-pH curves are flat. No locked view.

## BE INSPIRING

Make the reader see that "insoluble" is a number. One plane, log [cation] against log [anion], carries the whole of 15.1: the K_sp line, a mixture's point that falls in the clear or precipitate region, a common ion pushing the point along the line, two salts' lines crossed one after the other as silver nitrate drips in. Then 15.3 bends the same line with pH or a ligand and shows a reef's carbonate or a tooth's enamel dissolving as the acid rises.
