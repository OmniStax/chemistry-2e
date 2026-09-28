# Exploration: Chemistry 2e, Chapter 5 Thermochemistry

Written 2026-09-28, before the chapter was prepared. The four modules were converted with `python3 tools/convert.py 5` and read in full. Nothing in the chapter departs from the book's apparatus as `RULES.md` records it.

## Modules

Ex. = worked examples, Fig. = numbered figures, CYL = Check Your Learning items (all keyed), Exer. = end-of-chapter exercises, Keyed = those carrying the book's answer.

| Section | Module | Ex. | Fig. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Intro | m68723 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | one footnote |
| 5.1 Energy Basics | m68724 | 2 | 9 | 1 | 14 | 2 | 13 | 7 | 3 link-to-learning, 1 everyday-life |
| 5.2 Calorimetry | m68726 | 5 | 8 | 0 | 6 | 6 | 25 | 12 | 3 link-to-learning, 2 everyday-life, one footnote |
| 5.3 Enthalpy | m68727 | 8 | 6 | 1 | 12 | 8 | 48 | 24 | 2 link-to-learning, 1 everyday-life, one footnote |

Example 5.3 carries two Check Your Learning items, so 5.2 has six for five examples. No image is printed inside an exercise; the chapter has no unnumbered image.

## Numbers in book order (checked against openstax.org for 5.3; the rest follow the same count)

| Section | Figures | Tables | Examples |
|---|---|---|---|
| Intro | 5.1 CNX_Chem_05_00_Match (photo) | | |
| 5.1 | 5.2 Thermochem (photos: cheeseburger, traffic, furnace), 5.3 Waterfall (photos), 5.4 HotCold (sketch: hot and cold water molecules), 5.5 Thermom (photo + sketch: alcohol and bimetallic thermometers), 5.6 HeatTrans1 (sketch: H and L to thermal equilibrium), 5.7 OxyacTorch (photos), 5.8 HeatCapacity (photo: two frying pans), 5.9 SolTherm1 (photo + schematic, in a note), 5.10 SolTherm2 (photos, in a note) | 5.1 fs-idm68801008 Specific Heats of Common Substances at 25 °C and 1 bar | 5.1 Measuring Heat, 5.2 Determining Other Quantities |
| 5.2 | 5.11 HeatMeas (sketch: exothermic and endothermic in solution), 5.12 Calorim (sketch: coffee cup calorimeter), 5.13 Calorim2 (sketch: commercial calorimeters), 5.14 HeatTrans2 (sketch: metal in water), 5.15 HandWarmer (photos, in a note), 5.16 IcePack (sketch, in Example 5.6), 5.17 BombCalor (photo + cutaway), 5.18 FoodLabel (photo + label, in a note) | | 5.3 rebar, 5.4 identifying a metal, 5.5 exothermic reaction, 5.6 ice pack, 5.7 bomb calorimetry |
| 5.3 | 5.19 Systemqw (sketch: q and w arrows), 5.20 Summit (photo with two paths), 5.21 GasBurning (photo, in Example 5.10), 5.22 AlgalFuel1 (photos, in a note), 5.23 AlgalFuel2 (flowchart, in a note), 5.24 HessCO2 (enthalpy diagram) | 5.2 fs-idp98710048 Standard Molar Enthalpies of Combustion | 5.8 and 5.9 Writing Thermochemical Equations, 5.10 combustion, 5.11 ozone, 5.12 formation equations, 5.13 stepwise Hess, 5.14 more challenging Hess, 5.15 Using Hess's Law |

Every bundle file name is `CNX_Chem_05_0M_Name.jpg` with no space.

## What is new

The chapter introduces energy in the book for the first time as a quantity the reader computes: heat, heat capacity and specific heat, the calorimeter's heat balance, internal energy and the first law, enthalpy as a state function, thermochemical equations, and Hess's law with enthalpies of formation. It leans on 1.3 (extensive and intensive), 1.6 (temperature scales, unit arithmetic), and on the stoichiometry of Chapters 3 and 4 (molar mass, limiting reactant, balanced equations), whose concepts are being prepared at the same time.

## Sketches, photographs, notes

- Sketches the live figures replace: 5.4 + 5.6 (molecules of hot and cold water, then H and L reaching equilibrium) fold naturally into one particle picture; 5.11 + 5.14 (calorimetry of a reaction and of a hot metal in water) into one calorimeter; 5.19 (q and w into and out of a system); 5.24 (the Hess enthalpy ladder). 5.12, 5.13, 5.17(b) and 5.16 are apparatus drawings; 5.12 is the candidate for a 3D bench (the book's rule for a calorimeter), 5.13 and 5.16 stay faithful copies or are dropped by the section.
- Photographs kept: 5.3 (the text points at it), 5.5(a) with its bimetallic sketch, 5.7 (the text points at both halves), 5.8 (the pans the text computes), 5.15, 5.17(a), 5.18 (the label worked in the note), 5.20 (the paths the text names), the notes' figures 5.9, 5.10, 5.22, 5.23 with their boxes. Candidates to drop: 5.2 (a collage opener of three stock scenes) and 5.21 (a stock fire beside an example); each section decides.
- Link to Learning, all dropped and named in `notes`: 5.1 the PhET temperature simulation (16PHETtempFX), the bimetallic strip demonstration, the PhET energy forms simulation; 5.2 the hand-warmer precipitation video, the bomb calorimeter video and the calorimetric calculations site, the USDA database; 5.3 the internal combustion engine and the algae biofuel page. The two PhET links are the trigger for 5.1's particle Sim.
- Boxes: Solar Thermal Energy Power Plants (5.1), Thermochemistry of Hand Warmers and Measuring Nutritional Calories (5.2), Emerging Algae-Based Energy Technologies (5.3), all everyday-life, kept verbatim.
- Footnotes: one each in the intro, 5.2 (the Snellen calorimeter paper) and 5.3 (the algal fuel article); kept as a numbered `<small>` note at the end of the section in which they stand.
- Appendix G is cited by 5.3's text, Example 5.15 and many exercises: link the sheet `/chemistry-2e/sheets/thermo/`.

## Exercises

No exercise needs moving: each tests its own module. Several cite an example or exercise of an earlier section of this chapter (5.2's Examples 5.5 and 5.6 and exercise fs-idm68277040 from 5.3; 5.3's fs-idp140736768 hints at 5.2's fs-idm11354032, unkeyed and left out anyway); these are plain-text references, no `source_section`.

| Section | Keyed | Unkeyed conceptual (kept, AI approach) | Unkeyed numerical (left out) |
|---|---|---|---|
| 5.1 | 7 | fs-idp25217856 (automobile energy table) | fs-idm38026992, fs-idm26658464, fs-idm42475152, fs-idp43279360, fs-idp36071488 |
| 5.2 | 12 | fs-idm40469024 (four students), fs-idm15197120, fs-idp3696624 (explain the doubled volumes) | fs-idm75457248, fs-idm5511248 (part (b) is conceptual; the section may keep it as an open item), fs-idm57057808, fs-idm66134336, fs-idm54145200, fs-idp17899648, fs-idp26469408, fs-idp47280960, fs-idm30519744, fs-idp47244464 |
| 5.3 | 24 | fs-idp103276080 (torch versus table), fs-idp104124592 (which combustions are formations), fs-idp154782528 (graphite or diamond), fs-idp157714624 (solid or gaseous OsO<sub>4</sub>) | the other 20 |

## Errata carried as printed and named in `notes`

5.1: Table 5.1 lists silicon last, out of its descending order; the specific-heat equation prints m, Δ and T in roman. 5.2: Example 5.4 substitutes 4.18 J/g °C and then solves with 4.184; Example 5.5's Check Your Learning answer reads "1.34 × 10<sup>3</sup> kJ, or 1.34 kJ"; Example 5.7 computes −48.8 kJ and then says 48.7 kJ; fs-idp3696624 prints the ordinal º (written ° on the page, root rule 26.11 allows the book's own text to keep it, but the chapter's config corrects it as Chapter 1 did). 5.3: the ethanol combustion equation drops a parenthesis, "(g+"; Table 5.2 prints isooctane as −5465.5 where the text and Example 5.10 use −5460; Example 5.9 calls KClO<sub>3</sub> "perchlorate"; Example 5.15 takes HNO<sub>3</sub> as −207.4 then computes with −206.64 and reaches −136.80 kJ by the equation and −138.4 kJ by the steps; fs-idp104124592 reads "in Table 5.2 the table"; fs-idp166201552's key prints "kJ/ºC"; the key of fs-idp167492016 writes "HCL".

## Flat or 3D (root rule 28)

- Physical 3D: the coffee cup calorimeter of Figure 5.12 (and the metal-in-water of 5.14 inside it) is an apparatus and by the book's rule a bench with a bounded orbit; the section may judge the flat cutaway clearer if the lesson is the temperature trace. The bomb calorimeter 5.17(b) is the same class; a 3D bench is optional and costly, a faithful cutaway is enough unless 5.2's plan argues otherwise.
- Particle picture: 5.4 + 5.6, hot and cold water, is by the book's rule spheres in a box the reader turns, readings on a flat strip beneath.
- Locked view: none needed; the frying pans are a photograph.
- Flat: 5.19 (system diagram), 5.24 (enthalpy ladder), every graph and readout.

## BE INSPIRING (root rule 23)

Thermochemistry is bookkeeping of an invisible quantity, and print can show only the before and after. Live figures can make the flow of energy visible and keep the books balanced in front of the reader.

1. **5.1**: two boxes of water molecules, H and L, whose particles the reader sees jiggle fast and slow; put in contact, the jiggling evens out while an arrow of heat shrinks to nothing and the two temperatures meet (5.4 + 5.6). Beside it, the section's key equation as a heating bench: choose a substance from Table 5.1, set a mass and a heat, and watch ΔT; the small and the large frying pan show the same specific heat and five-fold heat capacities.
2. **5.2**: a calorimeter with a hot metal dropped in, two thermometers converging to one final temperature, and a balance bar showing q<sub>metal</sub> and q<sub>water</sub> equal and opposite at every moment (5.11 + 5.14); the metal and its mass are the sliders, and Examples 5.3 and 5.4 are two of its states.
3. **5.3**: the first law as a system the reader feeds with heat and work arrows whose lengths sum into ΔU (5.19); and the Hess ladder of 5.24 as a live enthalpy diagram where steps can be reversed and scaled and the sum always lands on the same level, which is the state-function idea of Figure 5.20 made quantitative.
