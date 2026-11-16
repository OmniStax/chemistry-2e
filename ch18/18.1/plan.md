# Plan: 18.1 Periodicity (m68829)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, eight numbered figures (18.2 to 18.9: the periodic table by class and seven photographs), two equations of the book's own in each of several groups (chemical equations, kept in the text), two Everyday Life notes (Sacrificial Anodes, Amalgams), two Link to Learning notes (dropped), fourteen end-of-section items (chapter exercises 1 to 14). No worked example, so no Check Your Learning and no inline host.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `classes` | Classifying the representative elements (the section's own header for the untitled opening; Figure 18.2) | introduces `representative-metal`; uses `main-group-element`, `transition-metal`, `inner-transition-metal`, `metalloid`, `nonmetal`, `metal`, `salt`, `passivation` |
| `alkali` | Group 1: The Alkali Metals (the book's; Figures 18.3 to 18.5) | introduces `alkali-metal-properties`; uses `alkali-metal`, `density`, `electrolysis`, `line-spectra` |
| `alkaline-earth` | Group 2: The Alkaline Earth Metals (the book's; Figure 18.6) | introduces `alkaline-earth-metal-properties`; uses `alkaline-earth-metal`, `passivation`, `lattice-energy`, `reducing-agent` |
| `group-12` | Group 12 (the book's; Figures 18.7, 18.8; Sacrificial Anodes and Amalgams notes) | introduces `group-12-metals`, `amalgam`; uses `standard-electrode-potential`, `sacrificial-anode`, `cathodic-protection`, `alloy`, `passivation` |
| `group-13` | Group 13 (the book's) | introduces `group-13-metals`; uses `amphoteric`, `inert-pair-effect`, `passivation`, `amalgam` |
| `group-14` | Group 14 (the book's; Figure 18.9) | introduces `tin-and-lead`, `allotropes`; uses `inert-pair-effect` |
| `group-15` | Group 15 (the book's) | introduces `bismuth`; uses `inert-pair-effect` |

## Figures

- sim-periodic · Figure 18.2 · representative-metal, alkali-metal-properties, alkaline-earth-metal-properties, group-12-metals, group-13-metals, tin-and-lead, bismuth · value add: variation by choice; the book prints the table once and the text then walks six groups one at a time, each with a trend down the group. The table stays in full with the chosen column outlined, and under it the group is read down, one row to a period: each member's square, its first ionization energy (Figure 6.34's values) as a bar on one fixed scale, the oxidation states the text gives each metal, and an arrow the way reactivity rises where the text states a trend (down groups 1 and 2, up group 12). Group 2 carries the alkali metal of the same period as a thin bar under each row, the comparison its paragraph makes · arrows: symbolic (the direction of rising reactivity) · still: no clock; a choice morphs the bars' lengths and crossfades the rest · choice group (1, 2, 12, 13, 14, 15; `F.choice`, default 1, the first the text takes), and a tap on a column of the table chooses it · headline: the text's statement for the group (group 1, "Down group 1 the first ionization energy falls, so each metal gives up its one valence electron more easily than the one above it.") · graph below (the table is horizontal): rows for periods 2 to 6, bars on 0 to 1500 kJ/mol (nitrogen's 1400 the longest) · 2D (book rule: the periodic table is flat) · colours: the book's legend colours deepened, through `F.fact`; energy hue on the bars, their values and the axis title; a metal's bar filled, a metalloid's or nonmetal's hollow; the state two below the group's in a dashed box, named in a key · labels: symbols and atomic numbers in the cells, the class key in the gap above the transition metals, bar values, the states; names, classes and states of matter as hover names · readout: the group's valence configuration and the electrons its metals lose (group 13, ns²np¹: M ⟶ M³⁺ + 3e⁻, and on a second line Ga, In and Tl keeping the ns² pair, M ⟶ M⁺ + e⁻), which is what "two below" means and what the bars and chips do not say · zinc, cadmium and mercury are shaded as representative metals and the lanthanides as inner transition metals, as the text classes them; the printed figure shades them the other way round, which `notes` records.
  works: parts: the 18-column table (periods 1 to 7, the La–Lu and Ac–Lr places in group 3; the two f-block rows are left out, since no representative metal is in them and the Original keeps them), the class key, the outlined column, the rows of the chosen group aligned by period · flow: none · must hold: every bar's length and printed value is Figure 6.34's for that element; rows run top to bottom in the order of the column; group 1 and group 2 bars shorten down the group and the arrow points down; every group 2 bar is longer than the group 1 bar under it; in group 12 mercury's bar is the longest and the arrow points up to zinc; only metals carry oxidation states, and the dashed boxes are exactly Ga, In, Tl 1+, Sn, Pb 2+ and Bi 3+; hydrogen is not outlined with group 1; the 20 cream squares are the text's 20 representative metals · read off the image: the 118 cells and the legend's five classes (representative metals, transition and inner transition metals, radioactive elements, metalloid, nonmetal). The image shades Zn, Cd and Hg blue and the lanthanides cream; the figure follows the text. IE₁ from the image of Figure 6.34 (checked cell by cell, 2026-11-16): Li 520, Na 490, K 420, Rb 400, Cs 380; Be 900, Mg 730, Ca 590, Sr 550, Ba 500; Zn 910, Cd 870, Hg 1000; B 800, Al 580, Ga 580, In 560, Tl 590; C 1090, Si 780, Ge 780, Sn 700, Pb 710; N 1400, P 1060, As 960, Sb 830, Bi 800 kJ/mol. Oxidation states from the text: 1+ (group 1), 2+ (group 2, group 12, and mercury's 1+ in Hg₂²⁺), Al 3+, Ga/In/Tl 3+ and 1+, Sn/Pb 4+ and 2+, Bi 5+ and 3+.
  Rebuilt 2026-11-16 (second pass): the first build opened on a restyled copy of the book's table, and a chosen group dimmed the table to a ghost over five short bars on a 0 to 2000 axis; the group 2 headline claimed a comparison with group 1 that nothing drew, and the readout repeated the bars' values.
- fig-lithium · Figure 18.3 · alkali-metal-properties · kept photograph, the text points at it (lithium floating) · photo
- fig-alkali-storage · Figure 18.4 · alkali-metal-properties · kept photograph, the text points at it · photo
- fig-sodium-flame · Figure 18.5 · alkali-metal-properties · kept photograph, the text points at it; the yellow flame is itself the fact · photo
- fig-magnesium-water · Figure 18.6 · alkaline-earth-metal-properties · kept photograph, the text points at it · photo
- fig-zinc-hcl · Figure 18.7 · group-12-metals · kept photograph, the text points at it · photo
- fig-mercury · Figure 18.8 · group-12-metals · kept photograph, the text points at it · photo
- fig-tin-chlorides · Figure 18.9 · tin-and-lead · kept photograph (a)(b), the text points at it · photo

Extra simulations (not built, root rule 15): a flame test with a choice of metal, the flame drawn in the colour the text names for lithium, sodium, potassium, calcium, strontium and barium; it would show colours the reader otherwise imagines, but the text gives them in words only and the only photograph is sodium's, so its hues would be guesses.

## Tables

None numbered. The two-column table of exercise fs-idp111201728 stays in its prompt.

## Types bound

`energy` (IE₁ on the bars and axis; lattice energies in prose), `density` (lithium's 0.5 g/cm³), `temperature` (25 °C, 30 °C, 13.2 °C, and "temperatures" where named), `potential` ("reduction potential" in the Group 12 paragraph and the Sacrificial Anodes note), `concentration` (the note's "electrolyte concentration"). "Ionization energy" in the prose stays ink, as `ch18/COLOR.md` says; oxidation states, charges, group numbers and counts stay ink. Atoms none drawn; no referents (one group at a time is plotted).

## Exercises

Fourteen end-of-section items. Seven keyed kept with the book's answers (fs-idp50563648, fs-idp111201728, fs-idp156797456, fs-idm18187152, fs-idp74127408 as 11 lb with 5% tolerance, fs-idp203792128, fs-idm16477216). Two unkeyed choice items kept open with their options and a suggested approach (fs-idp230369616, fs-idp144851648). Two unkeyed conceptual items with a suggested approach (fs-idp81885328, fs-idp36484288). Three left out and named (fs-idp139403392 and fs-idm8427088 numerical, fs-idp36975968 with a Lewis structure in part (c)). The key to fs-idp111201728 prints Na + I₂ ⟶ 2NaI unbalanced; kept as printed. No moves.

## Left out

The two Link to Learning videos (alkali metals with water; aluminum attacked by mercury). Errata kept as printed: "alkaline metal comes from", "Streetlights sometime employ", "grey (brittle) tin" beside "gray tin", "tin plate-sheet iron", the hyphenated "2+-oxidation state", and "groups 1, 2, 3, 12, 13, 14, and 15" for the 20 representative metals, which lie in groups 1, 2, 12, 13, 14 and 15.

## Wanted at chapter level

- glossary term "passivation" → concept `passivation` (17.6), another chapter's row
- glossary terms "representative element", "metalloid", "alkaline earth metal" → `main-group-element`, `metalloid`, `alkaline-earth-metal` (2.5), if not already their terms
- `ch18/COLOR.md`: 18.1's figure states IE₁ as numbers in `energy`, so "ionization energy" in 18.1's prose could wear `energy` (`ionization-energy`, 6.5) as 7.2 and 7.5 do; left ink here as COLOR.md says
- `ch18/COLOR.md`: the Figure 18.2 legend colours are drawn deepened (#e3c46e, #7392cb, #c49ac4, #8fb8aa) so a tint reads on a dark panel

Applied by the chapter pass (2026-10-05):

- Glossary: "passivation" added as a term of 17.6's `passivation` through `ch17/book-rows.json` and merged; "representative element", "metalloid" and "alkaline earth metal" were already terms of `main-group-element`, `metalloid` and `alkaline-earth-metal` (2.5), so nothing was staged for them.
- "ionization energy" stays ink in the prose, as `COLOR.md` says; the figure's IE₁ values wear `energy`.
- `COLOR.md` records the Figure 18.2 legend colours as drawn (#e3c46e, #7392cb, #c49ac4, #8fb8aa), and `exploration.md` the shading of zinc, cadmium and mercury as representative metals and the lanthanides as inner transition metals against the printed figure.
