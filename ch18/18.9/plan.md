# Plan: 18.9 Occurrence, Preparation, and Compounds of Oxygen (m68837)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, sixteen numbered figures (18.42 to 18.57: three photographs, one labelled apparatus sketch, twelve molecule and ion drawings), one table (18.2), the book's chemical equations (kept in the text), one Everyday Life note (The Chlor-Alkali Process), one Link to Learning (dropped), eleven end-of-section items (chapter exercises 79 to 89). No worked example, so no Check Your Learning and no inline host.

## Sub-concepts and spans

The book's own headers are all of one level in the CNXML; each is an `<h2>` block, its subheads `<h3>`. The untitled opening takes two headers of the section's own.

| Span | Header | Concepts |
|---|---|---|
| `oxygen` | Occurrence and uses of oxygen (the section's own) | introduces `oxygen-occurrence-and-reactivity`, `photosynthesis`; uses `distillation`, `boiling-point`, `oxidizing-agent`, `combustion-reaction`, `energy-and-work` |
| `ozone` | Ozone (the section's own; Figure 18.42) | introduces `ozone`; uses `allotropes`, `exothermic-and-endothermic`, `enthalpy-change`, `resonance-forms` |
| `reactions` | Reactions (the book's, with its two subheads) | uses `oxygen-occurrence-and-reactivity`, `oxidizing-agent`, `standard-electrode-potential`, `oxidation-number`, `noble-gas`, `halogen` |
| `oxides` | Oxides, Peroxides, and Hydroxides (the book's, with Oxides, Peroxides and Superoxides, Hydroxides; Figures 18.43 to 18.46; the Chlor-Alkali note) | introduces `oxide`, `peroxide`, `superoxide`, `hydroxide`, `base-anhydride`, `chlor-alkali-process`; uses `inert-pair-effect`, `acid-base-reaction`, `salt`, `bond-order`, `precipitation-reaction`, `net-ionic-equation`, `complex-ion`, `lewis-acids-and-bases`, `electrolysis-of-aqueous-solutions`, `oxidizing-agent`, `base`, `alkali-metal`, `alkaline-earth-metal` |
| `nonmetal-oxides` | Nonmetal Oxygen Compounds (the book's, with Sulfur and Halogen Oxygen Compounds; Figures 18.47 to 18.49) | introduces `sulfite`, `sulfate`; uses `lewis-acids-and-bases`, `enthalpy-change`, `electronegativity`, `resonance-forms` |
| `oxyacids` | Nonmetal Oxyacids and Their Salts (the book's) | uses `acid-anhydride`, `oxyanion`, `oxyacid` |
| `nitrogen-oxyacids` | Nitrogen Oxyacids and Salts (the book's; Figures 18.50, 18.51) | introduces `ostwald-process`, `nitrate`; uses `nitrogen-oxides-with-water`, `strong-acid`, `weak-acid`, `oxidizing-agent`, `disproportionation-reaction` |
| `phosphorus-oxyacids` | Phosphorus Oxyacids and Salts (the book's; Figures 18.52, 18.53) | introduces `oxyacid-structure-and-strength`; uses `phosphorus-oxides`, `phosphorus-halides`, `disproportionation-reaction` |
| `sulfur-oxyacids` | Sulfur Oxyacids and Salts (the book's; Figure 18.54) | uses `sulfate`, `sulfite`, `diprotic-acid`, `acid-ionization-constant`, `strong-acid`, `oxidizing-agent` |
| `halogen-oxyacids` | Halogen Oxyacids and Their Salts (the book's; Table 18.2; Figure 18.55 + 18.56 + 18.57) | reinforces `oxyacid-structure-and-strength`; uses `oxyacid-strength`, `acid-ionization-constant`, `disproportionation-reaction`, `weak-acid`, `strong-acid`, `oxidizing-agent` |

## Figures

- sim-chlorine-oxyanions · Figure 18.55 + 18.56 + 18.57 · oxyacid-structure-and-strength, oxyacid-strength, molecular-structure-versus-electron-pair-geometry · value add: variation by choice and depth: the book draws three ions in three separate figures; here one choice walks the series the text names, hypochlorite (named, not drawn) to perchlorate, and the four stand side by side, so the reader sees each step turn one of chlorine's lone pairs into its bond to a new oxygen atom while the parent acid goes from pK_a 7.5 to strong · arrows: none in the scene; one symbolic arrow under the table, "stronger acid" · still: the four ions are states of a series, not a clock; the choice morphs (the lobe shrinks as the oxygen atom grows on its corner) · choice ion (ClO⁻, ClO₂⁻, ClO₃⁻, ClO₄⁻, untyped; default ClO₂⁻, Figure 18.55); a tap on a column of the table chooses too; one control, since nothing else varies · headline "In chlorite, ClO₂⁻, two of chlorine's four electron pairs bond oxygen atoms and two are lone pairs, so the ion is bent." for the chosen ion · below the scene: the four electron-dot structures in a row, the chosen column banded, each over its name, chlorine's oxidation state (1+, 3+, 5+, 7+), its parent acid and Table 18.2's pK_a (7.5, 2.0; "strong acid" for HClO₃ and HClO₄, which the book gives no value) · 3D: physical 3D, the book rule for molecular geometry and the book's own left-hand panels: ball and stick, lone pairs as lobes, the tetrahedron's edges faint; free yaw, pitch within ±90°, no spin (the opening view of each ion is chosen so its shape reads at once: chlorite a V, chlorate and perchlorate with the last corner straight up) and no view buttons; the electron-dot structures stay flat (book rule) · colours: atoms by `F.el` (Cl, O), dots, lobes and edges in ink, the pK_a values and their row name `equilibrium-constant` · labels: a key under the scene (chlorine atom, oxygen atom, lone pair on chlorine, edge of the tetrahedron) and hover names; in the table the atom symbols are the structures, every dot pair named on hover · readout: the reaction of the book's three captions, the parent acid with a base giving the ion, HClO₂(aq) + OH⁻(aq) ⟶ ClO₂⁻(aq) + H₂O(l), set at first paint · no note.
  works: parts: chlorine at the centre of a tetrahedron; each of the four corners holds either an oxygen atom joined to chlorine by a stick or a lone-pair lobe on chlorine; six faint edges join the corners · flow: none · must hold: (1) oxygen atoms plus lone pairs on chlorine make four in every ion (1+3, 2+2, 3+1, 4+0); (2) oxygen takes the corners in the book's order, right, left, down, up, so chlorite has its lone pairs up and down and chlorate its one lone pair up, as Figures 18.55 and 18.56 draw them; (3) every electron-dot structure is the book's: single bonds, an octet on every atom (three lone pairs on each O), square brackets, a 1− charge at the upper right; (4) the scene and the banded structure are the same ion; (5) pK_a 7.5 under HOCl and 2.0 under HClO₂, no number under HClO₃ or HClO₄; oxidation states 1+, 3+, 5+, 7+; (6) the ion fills its stage and nothing is clipped at any setting · read off the image: 18.55 ClO₂⁻, two O left and right, two lobes up and down, each lobe with two dots; 18.56 ClO₃⁻, O left, right and down, one lobe up; 18.57 ClO₄⁻ drawn only as a space-filling model and the dot structure, four O; all in brackets with a superscript −; the dot structures O Cl O in a row with the third O below and the fourth above. Table 18.2: HOCl (7.5), HClO₂ (2.0), HClO₃ and HClO₄ without a value. The book's lobes are orange and its space-filling panel is not redrawn (the turnable model gives the shape). Rebuilt 2026-11-16: the first build opened on a small flat dot structure in a blank stage with the 3D drawing behind a view switch, and a pK_a strip whose two strong acids had no place on its axis; now the ion opens in 3D, the view switch is gone, and the series is a table of four structures.
- fig-ozone · Figure 18.42 · ozone · kept as printed: a space-filling model beside two resonance forms; the molecule is named and drawn once (root 24.9), its bent shape reads without turning, and the resonance forms are flat notation · photo
- fig-limelight · Figure 18.43 · oxide · kept as printed, a labelled apparatus sketch; no arrows, nothing varies · photo
- fig-sunblock · Figure 18.44 · oxide · kept photograph, the text points at it · photo
- fig-zinc-hydroxide · Figure 18.45 · hydroxide · kept photographs (a)(b), the text points at them; the white precipitate is the fact · photo
- fig-antacid · Figure 18.46 · hydroxide · kept photograph, the text points at it · photo
- fig-so2 · Figure 18.47 · sulfite · kept as printed, a ball-and-stick model and two resonance forms; a fold of 18.47 + 18.48 with a choice of oxide was weighed and refused: the text says only that SO₂ is bent, and a turnable model would add no view the printed one lacks (root 28.5) · photo
- fig-so3 · Figure 18.48 · sulfate · kept as printed, the same reason · photo
- fig-chlorine-oxides · Figure 18.49 (a)(b) · kept as printed, two space-filling models the text names only as bleaching agents · photo
- fig-nitric-acid · Figure 18.50 · nitrate · kept as printed, model and resonance forms · photo
- fig-nitrous-acid · Figure 18.51 · kept as printed, a space-filling model · photo
- fig-phosphoric-acid · Figure 18.52 · oxyacid-structure-and-strength · kept as printed, model and Lewis structure; a fold with 18.53 was weighed and refused, since a choice would only swap two printed pictures and the caption of 18.53 already says which hydrogen atoms are acidic · photo
- fig-phosphorous-acid · Figure 18.53 · oxyacid-structure-and-strength · kept as printed, the same reason · photo
- fig-sulfuric-acid · Figure 18.54 · sulfate · kept as printed, a space-filling model · photo

Extra simulations (not built, root rule 15): the chlor-alkali cell on a clock, chloride ions migrating to the positive electrode and leaving as Cl₂, water reduced at the negative electrode to H₂ and OH⁻ while Na⁺ drifts toward it and is not reduced; it would show what the note describes in words, but the book prints no figure for it and 17.7's electrolysis figures already run ions to electrodes.

## Tables

Table 18.2 Oxyacids of the Halogens (`fs-idp152462192`) as `div.book-table`, its pK_a values in parentheses marked `equilibrium-constant`.

## Types bound

`energy` ($\kdHo$ in the two display equations; "endothermic", "energy" where the text names it), `equilibrium-constant` ($\kKa$, $\kKaone$, $\kKatwo$, $\kpKa$; the table's pK_a values; the Sim's strip), `temperature` (90 K, 77 K, 500 °C, 2050 °C, 25 °C, 17 °C, 43 °C, 42 °C, 70.1 °C, 200 °C, 10.5 °C, 338 °C, −40 °C), `volume` (49 mL in 1 L), `mass` (40 grams in 60 grams), `potential` ("reduction potentials" in Reaction with Elements), `pressure` ("reduced pressure", through `gas-pressure`), `concentration` (where the text names one). Percents, the bond order 1½, oxidation states and counts stay ink. Atoms drawn: Cl, O. No referents (one ion and one acid at a time).

## Exercises

Eleven end-of-section items (79 to 89). Six keyed kept with the book's answers, all open: fs-idp58245760 (FrO₂), fs-idp175610544, fs-idp99009104, fs-idm57353488, fs-idp61089040, fs-idp59653392. Five unkeyed left out and named: fs-idp152584704, fs-idm11343008, fs-idm41302384, fs-idm53754112 (equations to write), fs-idm95780080 (numerical). No suggested approaches, no moves.

## Left out

The Link to Learning video of gold dissolving in aqua regia. Errata kept as printed: "2HCL"; Na₂O(s) + H₂O(l) ⟶ NaOH(aq) unbalanced; "Tl₂O(s) + H₂O(aq)"; "peroxides ions"; "a bond order of 1½," with a comma for the full stop; "tin(IV), SnO₂, and lead(IV), PbO₂"; "hydrogen phosphate ion, HPO₃²⁻" for hydrogen phosphite; "few second- and third-row transition metals"; "The process known as the chlor-alkali process, utilizes"; "Nitrogen pentaoxide"; the Δ over the arrow of 2H₂SO₃ + O₂; K_a = 1.2 × 10⁻² for both HSO₄⁻ and the first ionization of H₂SO₃; "2+-oxidation state", "7+-oxidation state"; "H₂S," with the comma subscripted; the summary's "Most metals oxides"; the key's "the oxygen electron".

## Wanted at chapter level

- `18.9/ΔH°` → 18.9-ozone
- `18.9/K_a` → 18.9-sulfur-oxyacids
- `18.9/K_a1` → 18.9-sulfur-oxyacids
- `18.9/K_a2` → 18.9-sulfur-oxyacids
- `18.9/pK_a` → 18.9-halogen-oxyacids
- No concept, edge or symbol fixes.
- ch18/18.6 `section.json`: its exercises carry `source_number` 1 and 2; the chapter numbers its exercises continuously (18.1 has 14, 18.2 13, 18.3 16, 18.4 7, 18.5 5), so they are 56 and 57

Applied by the chapter pass (2026-10-05):

- Anchors: 18.9/ΔH° → 18.9-ozone; 18.9/K_a, K_a1, K_a2 → 18.9-sulfur-oxyacids; 18.9/pK_a → 18.9-halogen-oxyacids.
- 18.6 renumbered 56 and 57 (see 18.6).
- `exploration.md` records the two folds weighed and refused (18.47 + 18.48, 18.52 + 18.53).
