# Plan: 6.5 Periodic Variations in Element Properties

Module m68735. Written 2026-09-28 before the build and left for review, as `ch06/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

## Sub-concepts and spans

| Span | `<h2>` | Introduces |
|---|---|---|
| `periodic-properties` | Size, ionization energy, and electron affinity | (opening; uses `valence-and-core-electrons`, `principal-quantum-number-shells`) |
| `covalent-radius` | Variation in covalent radius | `covalent-radius-trend` |
| `effective-nuclear-charge` | Effective nuclear charge | `effective-nuclear-charge` |
| `ex-radii` | Example 6.12 Sorting Atomic Radii | (uses `predicting-periodic-trends`) |
| `ionic-radii` | Variation in ionic radii | `ionic-radius-trend` |
| `isoelectronic` | Isoelectronic species | (reinforces `ionic-radius-trend`) |
| `ionization-energy` | Variation in ionization energies | `ionization-energy-trend` |
| `ie-exceptions` | Dips at a new subshell and past a half-filled one | (reinforces `ionization-energy-trend`) |
| `successive-ie` | Successive ionization energies | `successive-ionization-energies` |
| `ex-ionization` | Example 6.13 Ranking Ionization Energies | `predicting-periodic-trends` (introduced by the two examples together; `ex-radii` introduces, `ex-ionization` uses) |
| `electron-affinity` | Variation in electron affinities | `electron-affinity-trend` |
| `reactivity` | Periodic properties and chemical reactivity | (uses the trends) |

The book's paragraph on valence electrons being easiest to remove (which sits in the covalent-radius subsection) stays where it is, inside `effective-nuclear-charge`.

## Figures

- sim-halogen-radii · Figure 6.30 · reverted 2026-11-14 to the book's image, a kept figure (`photo` row, the id kept). The drawing showed one halogen at a time where the image sets the four side by side, which is the group trend; its table of circles left out group 18 and period 7, which the image draws, coloured the atoms by element where the image has one colour, and took its radii from outside the book (lithium 167 pm beside fluorine 64 pm, two different kinds of radius). Nothing was left that the image does not show better.
- sim-trends-graph · Figure 6.31 + 6.33 · covalent-radius-trend, ionization-energy-trend, effective-nuclear-charge · value add: standardisation and one axis for two properties; the book prints the two graphs on different Z scales (the radii are even plotted half a unit to the left), and stacked on one Z axis the peaks of radius stand over the troughs of IE₁ · arrows: none · still: a graph against Z has no clock · choice period 2 to 6 (strings), opening on 4, the book's example "from K to Kr" · headline gives the reason, the nuclear charge growing across the period while the outer shell stays n · the two graphs are the figure, radius above and IE₁ below, one band through both for the period · 2D. Alkali metals and noble gases named at their peaks and troughs as both images name them (eleven labels a panel, fixed places); the main-group dips of the chosen period (B and O, Al and S, Ga and Se, In, Tl) named on the IE₁ curve; every other point by hover. Radius axis in the length hue, IE₁ axis in the energy hue.
  works: read off the image · Figure 6.31 prints no numbers, so the radii of H to La are measured from its points (pixel centres on the 0 to 300 pm and 0 to 60 axes; Cl, Br and I land on Table 6.2's 99, 114 and 133 pm): H 37, He 32, Li 151, Be 113, B 86, C 77, N 70, O 72, F 72, Ne 70, Na 186, Mg 160, Al 143, Si 118, P 110, S 103, Cl 99, Ar 99, K 228, Ca 197, Sc 162 … Zn 134, Ga 135, Ge 122, As 120, Se 117, Br 114, Kr 112, Rb 248, Sr 215, Y 180 … Cd 151, In 166, Sn 140, Sb 141, Te 143, I 133, Xe 130, Cs 265, Ba 222, La 195, where the line leaves the frame. The alt text's "Li 167, Na 190, K 243, Rb 265, Cs 298; He 31, Ne 38, Ar 71, Kr 88, Xe 108" is not what the graph plots, and the first build followed it. Figure 6.33's vertical scale is uneven (its 2000 to 2500 band is taller than the others), so its curve is drawn from Figure 6.34's printed IE₁ values, which the text names as the graph's data; cerium to lutetium and astatine, which 6.34 leaves out and 6.33 plots, are the measured values rounded to 10 kJ/mol and said "about" on hover · must hold: each alkali metal is a peak of radius and a trough of IE₁ at the same Z; each noble gas the reverse; the radius curve ends at La; B lies below Be and O below N on the IE₁ curve; the readout's two inequalities are true for every period.
- sim-ions · Figure 6.32 · reverted 2026-11-14 to the book's image, a kept figure (`photo` row, the id kept). The image shows the two atoms and the two ions at once with their four radii; the drawing showed two of the four at a time behind a choice that changed no idea, and its proton and electron counts are in the sentences beside it.
- sim-ie-table · Figure 6.34 + 6.35 · ionization-energy-trend, electron-affinity-trend · value add: one frame for two properties, a shading by value in the energy hue (the images are shaded by metal, metalloid and nonmetal, which says nothing of the trend), and the exceptions the text explains ringed where they stand · arrows: none · still: the values are fixed · choice property IE₁, EA; choice period 2 to 6, whose values the readout writes out · headline gives the reasons for the ringed cells (IE₁: a p subshell begins at group 13, a p orbital first holds a pair at group 16; EA: groups 2, 15 and 18) · none · 2D. Only the book's printed values; a cell the book leaves empty stays empty, "…" where it prints dots, the asterisk of a calculated EA kept with the image's footnote. A main-group cell is ringed when its value turns back from that of the element just before it in the period (lower IE₁; less negative EA): groups 13 and 16 for IE₁, groups 2, 15 and 18 for EA. The key (the scale of the shading and the ring) stands in the gap above the transition metals.
  works: read off the image · every value checked cell by cell against the two images (72 values of IE₁, 42 of EA). The alt texts differ from the images at Ru (720 for the image's 710), He (written "Be 2370" in group 18), S (−20 for −200) and Ne (−30 for +30*); the images are followed · must hold: every printed number equals the image's; At and Fr read "…" for IE₁; the transition metals, Fr and Ra are empty for EA; the readout's chain has a true sign between every two neighbours and "⋯" where elements are skipped; the rings fall in groups 13 and 16 (IE₁) and 2, 15 and 18 (EA).
- sim-successive · Sim (Table 6.3 stays in the text) · successive-ionization-energies · value add: variation by choice; the reader sees the bars of one element climb slowly and then jump where the core begins · arrows: symbolic (the jump) · still · choice element K, Ca, Sc, Ga, Ge, As · headline says how many valence electrons the element has and which electron is the first from the core · bars alone · 2D. Energy hue on bars and axis; the core bars hollow, the two groups named under the axis. The trigger is the Link to Learning on periodic-trend visualizations. Kept on 2026-11-14 with the headline cut to what the readout does not say (the ratio is on the arrow and in the readout) and a one-line caption.

Photographs and unnumbered images: none of the section's figures is a photograph; Figures 6.30 and 6.32 are the book's drawings, kept as `photo` rows since 2026-11-14. The unnumbered orbital diagram of oxygen (CNX_Chem_06_05_Oxygen122_img) is kept as a `figure` row with no number, the book's image in its own markup (a still copy says all it has to say, and 6.4's orbital diagrams are the live ones).

Readouts: the radius and the IE₁ of the first and last element of the chosen period as two inequalities; the chosen period's IE₁ or EA values as one chain of < and >; IE₍ₙ₊₁₎/IEₙ at the jump.

Binds: `energy` (IE, EA) and `length` (the radius). Z and Z_eff in ink. No atom is drawn, so no `F.el`; no `F.cat`.

## Tables

Table 6.2 and Table 6.3 in the text as `div.book-table`; Table 6.3's red 3051.8 kept as a `<strong>`.

## Exercises

Two Check Your Learning inline (`ex-radii`, `ex-ionization`), both keyed. End of chapter: 20 in the source, 3 move to 6.4 (fs-idm150214960, fs-idm121823200, fs-idp177066416, each with `source_section` 6.5 on the 6.4 row); 17 stay, 9 keyed and 8 unkeyed. Unkeyed pick-from-list items (fs-idp30124176, fs-idm54929680, fs-idm176990768) are open items that print the options and carry a suggested approach, never graded; the unkeyed rankings (fs-idm147454816, fs-idm116086704, fs-idm44955136), fs-idm2181648 and fs-idm108984736 carry a suggested approach. Keyed single picks are `choice` items over the book's options; keyed rankings and fs-idm119922592, fs-idm68979552 are open with the book's answer.

## Notes and errata

The Link to Learning note is dropped. Figure 6.34's alt text prints Ru 720 and "Be 2370" in group 18, and 6.35's alt prints S −20 and Ne −30; the images print Ru 710, He 2370, S −200 and Ne +30*, and the figures follow the images.

## Wanted at chapter level

- eq-effective-nuclear-charge → 6.5-effective-nuclear-charge
- eq-first-ionization → 6.5-ionization-energy
- eq-second-ionization → 6.5-ionization-energy
- eq-electron-affinity → 6.5-electron-affinity
- glossary 6.5/covalent radius → 6.5-covalent-radius
- glossary 6.5/effective nuclear charge → 6.5-effective-nuclear-charge
- glossary 6.5/electron affinity → 6.5-electron-affinity
- glossary 6.5/ionization energy → 6.5-ionization-energy
- glossary 6.5/isoelectronic → 6.5-isoelectronic
- variables 6.5/Z, 6.5/Z_eff → 6.5-effective-nuclear-charge; 6.5/r → 6.5-covalent-radius; 6.5/IE → 6.5-ionization-energy; 6.5/EA → 6.5-electron-affinity
- concept edges: `effective-nuclear-charge` → `valence-and-core-electrons`; `covalent-radius-trend` → `effective-nuclear-charge`, `principal-quantum-number-shells`; `ionic-radius-trend` → `ion-configurations`; `ionization-energy-trend` → `covalent-radius-trend`, `orbital-energy-order`, `hunds-rule`; `successive-ionization-energies` → `valence-and-core-electrons`; `electron-affinity-trend` → `effective-nuclear-charge`; `predicting-periodic-trends` → the five trends (only where not already present)

### Applied by the chapter pass (2026-09-28)

Every variable and equation anchor above is written; glossary rows carry no anchor field. Of the edges, only `ionization-energy-trend` → `hunds-rule` was missing and is added; the others were already present. `predicting-periodic-trends` rests on the four trends it predicts (radii, ionic radii, ionization energy, electron affinity) and is left without an edge to `successive-ionization-energies`. Also added in this pass from the chapter's notes: `classical-atom-instability` → `nuclear-model-of-the-atom` and `hydrogen-like-ions` → `subatomic-particles`.
