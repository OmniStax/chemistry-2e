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

- sim-halogen-radii · Figure 6.30 · covalent-radius-trend · value add: variation by choice (the halogen) and standardisation; the reader sees the internuclear distance halved into the radius for one halogen at a time, and the same radius among the radii of the whole table drawn to scale below · still: a radius has no clock · choice halogen F, Cl, Br, I (strings) · headline "The Cl–Cl distance is 198 pm, so the covalent radius of chlorine is 99 pm." · table of circles below the molecule · the molecule on a locked view (shaded spheres, the book prints it in perspective); the table 2D. Atoms by `F.el`. Radii of Table 6.2 and of the text where printed, the rest from the elements page, which the caption names. Labels: the two atoms of the molecule named once; table circles by hover names (over a hundred).
- sim-trends-graph · Figure 6.31 + 6.33 · covalent-radius-trend, ionization-energy-trend, effective-nuclear-charge · value add: standardisation and one frame for two properties; switching the property shows the peaks of radius at the alkali metals become the troughs of IE₁ at the same Z · still: a graph against Z has no clock · choice property radius, IE₁; choice period 2 to 6 highlights one period's run · headline states the run across the chosen period for the chosen property · graph alone · 2D. Radius to Z = 60 and IE₁ to Z = 86, as the book plots them; the book's printed values where given (6.31's alkali metals and noble gases, Table 6.2, 6.34's IE₁), the elements page elsewhere, named in the caption. IE₁ axis in the energy hue, radius axis in ink. Alkali metals and noble gases labelled (twelve labels at most per curve, placed at fixed peaks and troughs, so they never collide); other points by hover.
- sim-ions · Figure 6.32 · ionic-radius-trend · value add: variation by choice (atom or ion) and standardisation; choosing ion shrinks Al into Al³⁺ and swells S into S²⁻ in one morph, with protons and electrons counted · still, the choice morphs · choice state atom, ion · headline "Aluminum loses three electrons and shrinks from 118 pm to 68 pm; sulfur gains two and grows from 104 pm to 170 pm." · none · locked view spheres, 2D chrome. Ions keep their element colours and carry the charge as a mark.
- sim-ie-table · Figure 6.34 + 6.35 · ionization-energy-trend, electron-affinity-trend · value add: one frame for two properties, a heat shading in the energy hue that shows the trend at a glance, hover names · still: the values are fixed · choice property IE₁, EA · headline names the largest and the smallest value · none · 2D. Only the book's printed values; a cell the book leaves empty stays empty, "…" where it prints dots, the asterisk of a calculated EA kept.
- sim-successive · Sim (Table 6.3 stays in the text) · successive-ionization-energies · value add: variation by choice; the reader sees the bars of one element climb slowly and then jump where the core begins · still · choice element K, Ca, Sc, Ga, Ge, As · headline names the jump and its factor · bars alone · 2D. Energy hue on bars and axis; the core bars hollow. The trigger is the Link to Learning on periodic-trend visualizations, whose graphs of ionization energies this and sim-trends-graph take over.

Photographs and unnumbered images: none of the section's figures is a photograph. The unnumbered orbital diagram of oxygen (CNX_Chem_06_05_Oxygen122_img) is kept as a `figure` row with no number, the book's image in its own markup (a still copy says all it has to say, and 6.4's orbital diagrams are the live ones).

Readouts: every sim writes its relation with live numbers: r = d/2; the chosen species' radius with its protons and electrons; `\kIE_{1}` or `\kEA_{1}` with its process; IE₍ₙ₊₁₎/IEₙ at the jump.

Binds: `energy` (IE, EA). Radius, Z and Z_eff in ink. Atoms and ions through `F.el`. No `F.cat`.

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
