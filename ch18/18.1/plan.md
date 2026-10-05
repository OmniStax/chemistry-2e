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

- sim-periodic · Figure 18.2 · representative-metal, alkali-metal-properties, alkaline-earth-metal-properties, group-12-metals, group-13-metals, tin-and-lead, bismuth · value add: variation by choice; the book prints the table once, and the text then walks six groups one at a time, each with a trend down the group (ionization energy and reactivity in groups 1 and 2, the reversal in group 12, the inert pair in 13 to 15); choosing a group lights its column and sets its members' first ionization energies (the book's own values from Figure 6.34) as bars beside the oxidation states the text gives each metal, so the reader sees the trend rather than recalling where the group sits · arrows: none · still: the table and its values have no clock; the choice crossfades the bars and the shading · choice group (all, 1, 2, 12, 13, 14, 15; `F.choice`, default all, which is the book's table) · headline: all, "The 20 nonradioactive representative metals lie in groups 1, 2, 12, 13, 14 and 15"; a group, the text's statement for it (e.g. "Gallium, indium and thallium form 1+ ions as well as 3+, two below the group oxidation state.") · graph below (the table is horizontal): bars of IE₁ on a fixed axis of 0 to 2000 kJ/mol (nitrogen's 1400 the largest, with room for its value under the axis title), in place of the f-block rows and legend, which fade out while a group is chosen · 2D (book rule: the periodic table is flat) · colours: the book's legend colours (representative metals cream-yellow, transition and inner transition blue, metalloids purple, nonmetals grey-green, radioactive white), deepened from the printed tints so a mix into the panel reads in both themes, through `F.fact` as named constants; energy hue on the bars and axis; metals' bars filled, metalloids' and nonmetals' hollow; the inert-pair state in a dashed box, named once in a legend line · labels: symbols in the cells (the book's), the bars' values and symbols, the states; names, classes and states of matter as hover names on every cell (118 cells, far past six labels) · readout: all, the count 5 + 5 + 3 + 4 + 2 + 1 = 20; a group, $\kIE_1$ at its top and bottom member · the figure shades zinc, cadmium and mercury as representative metals and the lanthanides as inner transition metals, as the text classes them; the printed figure shades them the other way round, which `notes` records.
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

`energy` (IE₁ on the bars, axis and readout; lattice energies in prose), `density` (lithium's 0.5 g/cm³), `temperature` (25 °C, 30 °C, 13.2 °C, and "temperatures" where named), `potential` ("reduction potential" in the Group 12 paragraph and the Sacrificial Anodes note), `concentration` (the note's "electrolyte concentration"). "Ionization energy" in the prose stays ink, as `ch18/COLOR.md` says; oxidation states, charges, group numbers and counts stay ink. Atoms none drawn; no referents (one group at a time is plotted).

## Exercises

Fourteen end-of-section items. Seven keyed kept with the book's answers (fs-idp50563648, fs-idp111201728, fs-idp156797456, fs-idm18187152, fs-idp74127408 as 11 lb with 5% tolerance, fs-idp203792128, fs-idm16477216). Two unkeyed choice items kept open with their options and a suggested approach (fs-idp230369616, fs-idp144851648). Two unkeyed conceptual items with a suggested approach (fs-idp81885328, fs-idp36484288). Three left out and named (fs-idp139403392 and fs-idm8427088 numerical, fs-idp36975968 with a Lewis structure in part (c)). The key to fs-idp111201728 prints Na + I₂ ⟶ 2NaI unbalanced; kept as printed. No moves.

## Left out

The two Link to Learning videos (alkali metals with water; aluminum attacked by mercury). Errata kept as printed: "alkaline metal comes from", "Streetlights sometime employ", "grey (brittle) tin" beside "gray tin", "tin plate-sheet iron", the hyphenated "2+-oxidation state", and "groups 1, 2, 3, 12, 13, 14, and 15" for the 20 representative metals, which lie in groups 1, 2, 12, 13, 14 and 15.

## Wanted at chapter level

- glossary term "passivation" → concept `passivation` (17.6), another chapter's row
- glossary terms "representative element", "metalloid", "alkaline earth metal" → `main-group-element`, `metalloid`, `alkaline-earth-metal` (2.5), if not already their terms
- `ch18/COLOR.md`: 18.1's figure states IE₁ as numbers in `energy`, so "ionization energy" in 18.1's prose could wear `energy` (`ionization-energy`, 6.5) as 7.2 and 7.5 do; left ink here as COLOR.md says
- `ch18/COLOR.md`: the Figure 18.2 legend colours are drawn deepened (#e3c46e, #7392cb, #c49ac4, #8fb8aa) so a tint reads on a dark panel
