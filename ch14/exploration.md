# Exploration: Chemistry 2e, Chapter 14 Acid-Base Equilibria

Written 2026-09-28, before the chapter was prepared. The eight modules were converted with `python3 tools/convert.py 14` and read in full. The figure, table and example numbers follow the book's order as openstax.org prints them, from the opener as Figure 14.1. Nothing in the chapter departs from the book's organisation as the book's `RULES.md` records it; 14.4, 14.5 and 14.7 are thin in exercises but stay pages of their own.

## Why this chapter

Chapter 13 built the machinery of equilibrium; this chapter spends it on one reaction class, the transfer of a proton. Brønsted and Lowry's definition turns every acid and base into a conjugate pair, and water, amphiprotic, ionizes itself with a constant K_w that ties [H₃O⁺] to [OH⁻] (14.1). The p-function compresses both onto the pH and pOH scales, which sum to 14.00 at 25 °C (14.2). K_a and K_b measure strength, K_a × K_b = K_w couples a pair, water levels the strong acids, the ICE table of 13.4 gives every weak acid's pH, and molecular structure explains the order (14.3). Salts are conjugate partners dissolved (14.4); polyprotic acids ionize one proton at a time (14.5); a conjugate pair held together resists a change in pH, and Henderson and Hasselbalch write its pH in one line (14.6); a titration walks the whole pH scale and an indicator is itself a buffer that changes colour (14.7). The thread is a single logarithmic axis on which [H₃O⁺] and [OH⁻] slide against each other, and every later quantity (pK_a, a buffer's pH, an equivalence point, a colour-change interval) is a mark on it.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68802 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 14.1 Brønsted-Lowry Acids and Bases | m68803 | 3 | 0 | 4 | 0 | 10 | 3 | 14 | 7 | Key Equations |
| 14.2 pH and pOH | m68804 | 3 | 4 | 0 | 1 | 5 | 3 | 11 | 6 | Key Equations; Environmental Science note (acid rain) |
| 14.3 Relative Strengths of Acids and Bases | m68805 | 8 | 7 | 7 (2 equilibria, 4 ICE tables, 1 E–O–H) | 0 | 5 | 8 | 43 | 22 | Key Equations; 1 link-to-learning (simulation) |
| 14.4 Hydrolysis of Salts | m68806 | 4 | 1 | 2 (ICE tables) | 0 | 0 | 4 | 3 | 1 | — |
| 14.5 Polyprotic Acids | m68807 | 1 | 0 | 2 (acetic acid, ICE table) | 0 | 5 | 1 | 5 | 3 | — |
| 14.6 Buffers | m68808 | 1 | 4 | 1 (ICE table) | 0 | 3 | 1 | 15 | 7 | Key Equations; Portrait of a Chemist (Henderson and Hasselbalch); Medicine note (blood buffer); 1 link-to-learning |
| 14.7 Acid-Base Titrations | m68809 | 2 | 3 | 0 | 1 | 3 | 2 | 4 | 2 | — |

The modules print more ICE-table and equation images than they display (several bundle files named `…ICETableN_img` are not referenced by the CNXML); only the referenced ones count.

## Numbers as openstax.org prints them

- Figures: intro 14.1 Sinkhole (photograph). 14.2: 14.2 phscale (the pH and pOH chart), 14.3 AcidRain (two photographs, inside the Environmental Science note), 14.4 pHMeter (two photographs), 14.5 indicator (two photographs). 14.3: 14.6 strong (a two-column list of six strong acids and six strong bases, printed as an image), 14.7 strengths (conjugate pairs with K_a and K_b), 14.8 corresp (the long ladder of pairs relative to water), 14.9 Vinegar (photograph, in Example 14.9), 14.10 AntSting (photograph, in Example 14.12), 14.11 AcidpH (binary acid trends on the periodic table), 14.12 Oxyacid (nitrous, nitric, sulfurous, sulfuric acids). 14.4: 14.13 hydronium (the hydrated aluminum ion donating a proton). 14.5: none. 14.6: 14.14 compare (four beakers, photographs), 14.15 bufferchrt (buffering action, bar chart), 14.16 exhaust (three beakers, photographs), 14.17 buffer (pH against added NaOH). 14.7: 14.18 titration (two titration curves, (a) HCl and (b) acetic acid), 14.19 indicators (colour-change intervals), 14.20 titration2 (the two curves with three indicator bands).
- Tables: Table 14.1 Summary of Relations for Acidic, Basic and Neutral Solutions (14.2); Table 14.2 pH Values in the Titrations of a Strong Acid and of a Weak Acid (14.7, with a table footnote per acid column). Key Equations tables not printed.
- Examples: 14.1–14.3 (14.1); 14.4–14.6 (14.2); 14.7–14.14 (14.3); 14.15–14.18 (14.4); 14.19 (14.5); 14.20 (14.6); 14.21–14.22 (14.7).
- Unnumbered images (referenced): 14.1 `CNX_Chem_14_01_conjugate_img.jpg`, `…_HF_img.jpg`, `…_NH3_img.jpg`, `…_Water_img.jpg` (Lewis-structure equations with each conjugate pair in one colour; the HF and NH3 images carry the same alt text in the bundle, pyridine’s, so the section reads each image and writes its own alt); 14.3 `CNX_Chem_14_03_acetate_img.jpg`, `…_ammonia.jpg` (ionization equations), `…_ICETable2_img.jpg`, `…3_img`, `…4_img`, `…5_img` (Examples 14.11–14.14), `…_OHbonds_img.jpg` (the E–O–H skeleton); 14.4 `CNX_Chem_14_04_steps1_img.jpg` (Example 14.15's ICE table), `…_ICETable13_img.jpg` (Example 14.18); 14.5 `CNX_Chem_14_05_acetic_img.jpg`, `…_ICETable1_img.jpg` (Example 14.19); 14.6 `CNX_Chem_14_06_ICETable16_img.jpg` (Example 14.20). No image in an exercise. No bundle name carries a space.

## What is new

Brønsted-Lowry acids and bases, conjugate pairs, acid and base ionization, amphiprotic and amphoteric species, autoionization and K_w with its temperature dependence. Acidic, basic and neutral; the p-function, pH, pOH, pH + pOH = pK_w; pH meters and indicators. K_a, K_b, percent ionization, K_a × K_b = K_w, the leveling effect, K from equilibrium data or pH, weak acid and base equilibria with the 5% test and the quadratic, binary acid and oxyacid trends, amphoteric hydroxides. Acidic and basic salt ions, mixed salts, hydrated metal ions as acids. Mono-, di- and triprotic acids, stepwise ionization, polyprotic bases. Buffers, buffer action, buffer capacity and the choice of pair, pK_a, pK_b and the Henderson-Hasselbalch equation, the blood buffer. Titration curves and their four stages, strong and weak acid titrations, the half-equivalence point, indicators and their colour-change intervals, the choice of indicator.

No new type. pH and pOH already stand as variants of concentration (`\kpH`, `\kpOH`). New typed concentration symbols: [H₃O⁺] `\kconcHyd`, [OH⁻] `\kconcOH`, [HA] `\kconcHA`, [A⁻] `\kconcAm`, [HB⁺] `\kconcHBp`, [HA]₀ `\kconcHAz`, [H₃O⁺]_eq `\kconcHydeq`. New untyped: K_w, K_a, K_b (key `K_b_ion`, since `K_b` is Chapter 11's ebullioscopic constant), pK_w, pK_a, pK_b, K_a1, K_a2, K_a3, K_b1, K_b2. Reused: [B] `\kconcB` for a weak base, `x_ice`, `V` `\kV`, `n` `\kn`, `T` `\kT`. Percent ionization is a percent, untyped, with no symbol row.

## Sketches to redraw and photographs to keep

- 14.1's four unnumbered equation images: Lewis structures with each conjugate pair in one colour. A redraw is an unnumbered Figure (eyebrow "Figure") with the pairs in `F.cat(0)` and `F.cat(1)` and atoms in ink or `F.el`; or a single still Sim of proton transfer with a choice of reaction (HF + H₂O, H₂O + pyridine, H₂O + H₂O), the moving proton marked and the two pairs coloured. The section decides; they may also stay as images in `figure` rows.
- 14.2 (14.2): the pH and pOH chart is the chapter's spine; a still Figure with one slider on pH (the book's substances as detents or hover names), [H₃O⁺] and [OH⁻] sliding in opposite directions on two log columns whose product stays K_w, and a temperature choice (25 °C, 80 °C) that moves the neutral line to 6.31. The acidic-red to basic-blue arrow of the book is decoration, not a physical colour; the section decides whether universal indicator's real colours carry it instead.
- 14.3 AcidRain, 14.4 pH meters, 14.5 universal indicator and pH paper (14.2): photographs the text points at; kept. The indicator colours are physical facts.
- 14.6 strong (14.3): a list printed as an image; a faithful copy, written as the book's list in the figure's markup or kept as the image. Not a table (it carries a Figure number).
- 14.7 strengths and 14.8 corresp (14.3): two views of one ladder; a still Figure 14.7 + 14.8 fold is the natural candidate: a vertical log K axis with acids on one side and their conjugate bases on the other, K_a × K_b = K_w in the readout, a choice of pair, and water's two entries marking where the leveling effect cuts off. All K in ink; species named by hover.
- 14.9 Vinegar and 14.10 AntSting (14.3): photographs inside Examples 14.9 and 14.12 that the text points at; kept.
- 14.11 AcidpH and 14.12 Oxyacid (14.3): 14.11 a faithful copy on the periodic-table grid with element colours and hover; 14.12 a still Figure with a choice of oxyacid (Lewis structures, 2D, the book's four) or a faithful copy. The section decides.
- 14.3's Link to Learning (a simulation of strong and weak acids at the molecular level) is dropped and named in `notes`; it triggers a Sim: a 3D particle box (the book's rule for particle pictures) of an acid in water with a choice of acid (a strong one and two weak ones from the `ka` sheet) and a concentration slider, HA, A⁻ and H₃O⁺ in element colours, percent ionization and pH in the readout. Still unless the section argues the dynamic exchange.
- 14.13 hydronium (14.4): a coordination geometry, so 3D by the book's rule; a still F.view3d Figure of [Al(H₂O)₆]³⁺ with a choice of before and after proton transfer, bounded orbit.
- 14.14 compare and 14.16 exhaust (14.6): photographs of methyl orange in beakers; kept (physical colour).
- 14.15 bufferchrt and 14.17 buffer (14.6): 14.15 a still Figure with a slider on added strong acid or base (moles), bars for CH₃CO₂H and CH₃CO₂⁻ in `F.cat` and pH by Henderson-Hasselbalch in the readout; 14.17 a still Figure of pH against NaOH added. A fold of the two is the section's call.
- 14.18 titration, 14.19 indicators, 14.20 titration2 (14.7): one live titration Figure is the chapter's showpiece: a buret over a flask (apparatus, 3D bench by the book's rule, or a flat buret if the section argues the curve is the lesson), a volume slider or a drip clock, a choice of strong or weak acid, the curve drawn from Table 14.2's model with its four stages, and a choice of indicator whose band lies on the curve and whose colour tints the flask as a physical fact. A fold of 14.18 + 14.20 is natural; 14.19 may stay a faithful chart or join as the indicator choice. Table 14.2 stays as `div.book-table`.
- ICE tables in 14.3–14.6 and 14.1's–14.5's equation images: HTML tables and LaTeX as Chapter 13 did, or kept as `figure` rows; each section's plan says which.

## Notes and Link to Learning

Kept verbatim as `div.note`: Environmental Science (14.2, acid rain, with Figure 14.3 inside; its sentence pointing to an EPA website is kept with its link as printed, since it is part of a kept note rather than a Link to Learning box), Portrait of a Chemist (14.6, Henderson and Hasselbalch, no figure), Medicine: The Buffer System in Blood (14.6). Link to Learning dropped and named in `notes`: 14.3 (strong and weak acid simulation, the trigger for 14.3's Sim) and 14.6 (buffers in natural waters). No PhET item in an exercise, so no `simulation-exercise`.

## Exercises that belong elsewhere

- `fs-idm94404336` and `fs-idm94046624` (14.3, why a strong acid with a weak base, or a weak acid with a strong base, gives a weakly acidic or basic solution) test 14.4's salt hydrolysis: moved to 14.4 with `source_section` "14.3".
- `fs-idm8587472` (14.3, placing [Al(H₂O)₆]³⁺ in Figure 14.7 from its K_a) tests 14.4's hydrated metal ions: moved to 14.4 with `source_section` "14.3"; the prompt names Figure 14.7 in plain text.
- `fs-idm75310368` (14.3, nicotine with K_b1 and K_b2) tests 14.5's polyprotic bases: moved to 14.5 with `source_section` "14.3".
Both sections' `exercise_notes` say so. Every other item stays where it is printed.

## Keyed and unkeyed

- 14.1: 14 items (7 keyed). Unkeyed, all kept with a suggested approach (equation writing or a judgement, no number to compute): `fs-idm85056096`, `fs-idm76406352`, `fs-idm3064240`, `fs-idm70827280`, `fs-idp141145072`, `fs-idp122889456`, `fs-idp42982384` (endothermic or exothermic from two K_w values).
- 14.2: 11 items (6 keyed). Unkeyed numerical, left out: `fs-idm59232064`, `fs-idp100037936`, `fs-idm113520992`, `fs-idm93267520`, `fs-idm60999568`. 6 remain.
- 14.3: 43 items (22 keyed). Unkeyed numerical, left out: `fs-idm38113296`, `fs-idm65088304`, `fs-idp58811168`, `fs-idm5851168`, `fs-idm78141920`, `fs-idm68637072`, `fs-idp85725440`, `fs-idm82940432`. Kept with a suggested approach: `fs-idm97090576`, `fs-idm81289984`, `fs-idm98073520`, `fs-idp121913696`, `fs-idp82803792`, `fs-idm157978560`, `fs-idp33478144`, `fs-idm79428208`, `fs-idm81298048`, `fs-idp58815696`; `fs-idp75773712` is an unkeyed choice item, kept open with its three options. Moves out: `fs-idm94404336` (unkeyed, kept in 14.4 with a suggested approach), `fs-idm94046624` (keyed), `fs-idm8587472` (unkeyed, kept in 14.4 with a suggested approach) to 14.4; `fs-idm75310368` (keyed) to 14.5. 31 remain.
- 14.4: 3 items (1 keyed). `fs-idm95651552` kept with a suggested approach; `fs-idm1823584` (novocaine, acidic or basic and then three concentrations) left out as numerical. With the three moves in, 5 items.
- 14.5: 5 items (3 keyed). Unkeyed numerical, left out: `fs-idp108710816`, `fs-idp33679104`. With the move in, 4 items.
- 14.6: 15 items (7 keyed). Unkeyed numerical, left out: `fs-idm163403536`, `fs-idm111908400`, `fs-idm128715952`, `fs-idp80593472`, `fs-idm111629776` (parts (a) and (c) numerical, (b) follows from (a)). Kept with a suggested approach: `fs-idm2126064`, `fs-idp21075184`, `fs-idm126903712`. 10 remain.
- 14.7: 4 items (2 keyed). `fs-idm81056688` kept with a suggested approach; `fs-idp105330480` left out as numerical. 3 remain.
- Every CYL keyed: 3, 3, 8, 4, 1, 1, 2.

## Errata to carry as printed and name in `notes`

- Intro: "H+" without a superscript once.
- 14.1: the two bundle images `CNX_Chem_14_01_HF_img.jpg` and `…_NH3_img.jpg` carry the same alt text (pyridine’s); the section writes its own alt from each image.
- 14.1 key `fs-idp125665056` (a) writes NH₄OH as a product; kept.
- 14.2: Table 14.1's CNXML summary writes "H subscript 2 O" for H₃O⁺; the table itself is right. Figure 14.3's caption "It also is corrodes statues"; Figure 14.4's caption carries a dollar sign (write `&#36;`).
- 14.3: the base-ionization-constant term is printed "base-ionization constant" in the text and "base ionization constant" in the glossary; the glossary's wording is the term. The Check Your Learning after Example 14.11 ends "What is K_b for NH₃." with a full stop.
- 14.6: Figure 14.16's caption "has little affect"; Example 14.20 (b) "1.0 mL of 0.10 NaOH" drops the M in the question. The exercises header prints empty ("##  {section:exercises}") in 14.6 and 14.7; nothing to carry.
- 14.7: the indicator equation writes "pKa" with K and a both roman (`\text{p}K\text{a}`); written as pK_a.

## Depth: flat, locked or 3D (root rule 28)

- Physical 3D: 14.13's hydrated aluminum ion (a coordination geometry, octahedral, bounded orbit); 14.3's acid-in-water Sim (a particle picture); 14.7's buret and flask if the section builds the bench (an apparatus, bounded orbit, never from beneath).
- Built both ways with a view choice (the book's rule for a structure the text names): 14.1's water, ammonia and pyridine if drawn as molecules; 14.12's oxyacids if drawn as structures. Default 2D.
- Flat: the pH chart, the conjugate-pair ladders, the periodic-table trends, every bar chart and curve, the ICE tables.
- No locked view: the book prints nothing in perspective besides photographs.

## BE INSPIRING (root rule 23)

The chapter's single picture is a logarithmic ladder. On it, [H₃O⁺] rises exactly as fast as [OH⁻] falls, so the reader drags one and watches the other answer, with 7 as the meeting point at 25 °C and 6.31 at 80 °C (14.2). The same ladder carries K_a on one side and K_b on the other, and choosing a conjugate pair shows the two always the same distance from pK_w/2, which is K_a × K_b = K_w made visible; the strong acids pile up above H₃O⁺, which is the leveling effect (14.3). A buffer is a pin in the ladder at pK_a: add acid and base and the pH moves only while both partners remain, then falls off a cliff (14.6). A titration walks the ladder from the acid to the base, stalls at pK_a, jumps at equivalence, and an indicator band sits across the jump in its real colours, so the reader sees why phenolphthalein works for acetic acid and methyl orange does not (14.7). Every live figure in the chapter should share that vertical log axis and its concentration hue, so a reader crossing sections is always reading the same scale.
