# Plan: 20.1 Hydrocarbons (m68846)

Written 2026-10-05 before the build and left for review, as `ch20/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Four objectives, ten numbered figures (20.2 to 20.11; 20.8 and 20.9 inside the Recycling Plastics note), twelve unnumbered images in the text and twelve in the examples, one table (20.1) with two footnotes, two footnotes in the opening, seven worked examples (20.1 to 20.7) each with a keyed Check Your Learning, one boxed note, one Link to Learning (dropped), twenty-nine end-of-section items (chapter exercises 1 to 29).

## Sub-concepts and spans

The opening prints no header and takes one of its own; the book's five headers are kept, with "Isomers of Alkenes" as an `<h3>` inside Alkenes. Spans below `<section>` are paragraph and example ids.

| Span | Where | Concepts |
|---|---|---|
| `organic` | Organic Compounds and Hydrocarbons (own header) | introduces `organic-compound` (the bold term), `carbon-compound-diversity`; uses `hydrocarbon`, `hybridization` |
| `alkanes` | Alkanes, first paragraph (Figure 20.2) | introduces `alkane`; uses `sp3-hybrid-orbital`, `lewis-structure-diagram`, `bond-angle` |
| `condensed` | condensed formulas paragraph | introduces `write-organic-structures` |
| `skeletal` | skeletal structure paragraph (Figure 20.3, Examples 20.1, 20.2) | introduces `skeletal-structure` |
| `alkane-trend` | C<sub>n</sub>H<sub>2n+2</sub> paragraph (Table 20.1 and its Sim) | introduces `alkane-properties-trend`; uses `dispersion-forces`, `melting-point`, `boiling-point`, `standard-temperature-and-pressure`; anchor of `eq-alkane-formula` |
| `isomers` | C<sub>4</sub>H<sub>10</sub> isomers (Figure 20.4) | introduces `alkane-structural-isomers`; uses `structural-isomer`, `molecular-formula`, `lewis-structure-diagram` |
| `naming` | The Basics of Organic Nomenclature: Naming Alkanes | introduces `naming-alkanes`, `substituent`; uses `nomenclature` |
| `alkyl` | alkyl group paragraph (Example 20.4, Figure 20.5) | introduces `alkyl-group` |
| `fuels` | combustion and fractional distillation (Figure 20.6) | introduces `alkanes-as-fuels`; uses `combustion-reaction`, `exothermic-process`, `distillation`, `boiling-point`, `intermolecular-force` |
| `substitution` | substitution reaction paragraph | introduces `substitution-reaction`; uses `hybridization` |
| `functional` | functional group paragraph | introduces `functional-group` |
| `alkenes` | Alkenes | introduces `alkene`; uses `sigma-bond`, `pi-bond`, `trigonal-planar-geometry` |
| `recycling` | Recycling Plastics note (Figures 20.8, 20.9) | introduces `polymer`; uses `catalyst` |
| `alkene-names` | naming paragraph | introduces `naming-unsaturated-hydrocarbons` |
| `alkene-isomers` | Isomers of Alkenes (Figure 20.10, folded) | introduces `alkene-geometric-isomers`; uses `geometric-isomer`, `structural-isomer`, `sp2-hybrid-orbital` |
| `addition` | addition reaction paragraph (Example 20.5) | introduces `addition-reaction`; uses `pi-bond`, `sigma-bond`, `sp3-hybrid-orbital` |
| `alkynes` | Alkynes | introduces `alkyne`; uses `sp-hybrid-orbital`, `naming-unsaturated-hydrocarbons`, `addition-reaction` |
| `ex-alkyne-structure` | Example 20.6 | introduces `carbon-geometry-and-hybridization` |
| `aromatic` | Aromatic Hydrocarbons (Figure 20.11) | introduces `aromatic-hydrocarbon`; uses `resonance-hybrid`, `resonance-forms`, `valence-bond-theory`, `resonance-and-delocalization`, `substitution-reaction` |

## Figures

Re-examined on 2026-11-14 against the book's images: four stay drawn (two rebuilt, two fixed), three went back to the book's images.

- sim-hydrocarbon-models · Figure 20.2 + 20.7 + 20.10 · alkane, alkene, alkene-geometric-isomers, write-organic-structures · shape in 3D: the Lewis structure stands on a flat strip as the book draws it and the same molecule turns as a model under it, so the reader sets the flat drawing against the shape it flattens: pentane's 109.5° zigzag, ethene's flat double bond, the methyl groups of cis- and trans-2-butene on one side or opposite sides of the rigid C=C · arrows: none · still, a molecule has no clock · choices: molecule (dropdown of ten: methane, ethane, n-butane, pentane, 2-methylpropane, ethene, propene, 1-butene, cis-2-butene, trans-2-butene; n-butane and 2-methylpropane from the unnumbered C₄H₁₀ image), model (ball-and-stick · space-filling; the balls swell and the sticks fade into them) · headline one sentence per molecule on the strip · readout the name with the condensed formula "or" the molecular formula as the book prints them, and for an alkane a second line C_nH_{2n+2} = C₅H_{2(5)+2} = C₅H₁₂ · no graph · physical 3D under a flat strip that holds the headline, the Lewis structure and the key; free orbit (a molecule has no ground), idle spin, no view buttons and no 2D/3D switch (rebuilt from a Lewis drawing with the models hidden behind a choice and front/end-on buttons) · atoms by `F.el` (C black, H white), hover names on every atom in both layers; no entity labels, every atom being one of two kinds named by the key.
  works: parts (carbon atoms joined in a chain, single, or double bonds between them; every hydrogen atom on one carbon atom; on the strip the Lewis structure) · flow (none but the reader's turn; on the model choice the balls grow to their space-filling radii and the sticks fade) · must hold (C–C 1.54 Å, C=C 1.34 Å, C–H 1.09 Å; sp³ carbon atoms tetrahedral at 109.5°, so an alkane chain zigzags; the two carbon atoms of a double bond and the four atoms bonded to them coplanar at 120°; cis-2-butene's methyl groups on one side of the C=C axis and trans-2-butene's on opposite sides; the hydrogen count of every carbon atom gives four bonds; the Lewis structure on the strip matches the model atom for atom) · read off the image (20.2: methane, ethane, pentane as square Lewis structures, CH₄, CH₃CH₃ or C₂H₆, CH₃CH₂CH₂CH₂CH₃ or C₅H₁₂; 20.7: ethene, propene, 1-butene as expanded 120° drawings, the CH₃ of propene as a cross; 20.10: 1-butene with CH₂–CH₃ condensed, cis and trans 2-butene with CH₃ condensed, the book's red CH₃ emphasis left out; the C₄H₁₀ image draws 2-methylpropane's methyl group hanging below the middle carbon on a long bond; carbon black, hydrogen white).
- sim-line-structures · Figure 20.3 · write-organic-structures, skeletal-structure · intuition by morph: the book prints three drawings side by side and leaves the reader to match atom to atom; here each hydrogen atom slides into its carbon atom's condensed label and each label shrinks into its end or bend of the skeletal structure · arrows: none · still · choice drawing (expanded · condensed · skeletal) · headline per drawing · readout C₉H₂₀ = C_nH_{2n+2}, n = 9 · 2D by the book rule · ink only; hover names on the carbon atoms. Fixed: the expanded formula had its methyl and ethyl groups on short bonds, so their hydrogen atoms ran into the chain's; it now stands on long bonds as the book's does.
  works: parts (a six-carbon main chain; a methyl group on carbon 2; an ethyl group on carbon 3; 20 hydrogen atoms) · flow (the hydrogen atoms into their carbon's label; the labels to the vertices) · must hold (nine carbon atoms and twenty hydrogen atoms in the expanded formula, no label touching another; the condensed labels CH₃, CH, CH, CH₂, CH₂, CH₃, CH₃ above carbon 2, CH₂ and CH₃ below carbon 3; in the skeletal structure the methyl group straight up from carbon 2 and the ethyl group down then down to the right from carbon 3, the chain zigzagging) · read off the image (Expanded formula, Condensed formula, Skeletal structure, as above).
- sim-alkane-trend · Sim (Table 20.1 stays in the text as the book's table) · alkane-properties-trend · variation by slider: the reader grows the chain carbon by carbon and sees both temperatures climb past 0 °C, so the alkane turns from a gas to a liquid to a solid at STP · arrows: none · still · slider carbon atoms n (1 to 18, detents at the table's twelve alkanes; default 5, pentane) · headline the phase and why in words ("Pentane is a liquid at STP: it melts below 0 °C and boils above it.") · chain of n carbon atoms above; graph below, melting points dashed and boiling points solid in `temperature`, x 0 to 19, y −200 to 350 °C · readout two lines: C_nH_{2n+2} with n substituted, and the comparison with 0 °C that sets the phase (melting point = −129.7 °C < 0 °C < 36.1 °C = boiling point). Fixed: the readout joined the two temperatures with a comma, and the headline repeated it.
  works: read off the image (Table 20.1: methane −182.5/−161.5, ethane −183.3/−88.6, propane −187.7/−42.1, butane −138.3/−0.5, pentane −129.7/36.1, hexane −95.3/68.7, heptane −90.6/98.4, octane −56.8/125.7, nonane −53.6/150.8, decane −29.7/174.0, tetradecane 5.9/253.5, octadecane 28.2/316.1 °C; gas to butane, liquid pentane to decane, solid tetradecane and octadecane).
- sim-butane-drawings · Figure 20.4 · reverted to the book's image, and the C₄H₁₀ image it had folded in is kept as `fig-butane-isomers`: the book sets the three drawings of n-butane side by side with their ball-and-stick and space-filling models, which is the comparison the text makes; the drawn figure showed one drawing at a time, dropped the models, and drew 2-methylpropane's hydrogen atoms into each other.
- sim-alkyl-groups · Figure 20.5 · reverted to the book's image: a reference table of eight groups the reader looks across; the drawn figure showed one group at a time, and the propane image above it already marks the equivalent hydrogen atoms.
- sim-fractional-distillation · Figure 20.6 · reverted to the book's image: it had no control and replayed the book's own arrows in a thin, toy-like tower that hid the molecules, while the book's cutaway carries the photograph, the coloured fractions and the volatility arrow.
- sim-benzene · Figure 20.11 (the two resonance structures folded in, in `originals`) · aromatic-hydrocarbon, valence-bond-theory · 3D the book describes and does not draw: the unhybridized p orbital of each sp² carbon atom perpendicular to the flat ring, and their overlap into π electron density above and below it · arrows: the book's double-headed resonance arrow, symbolic, drawn on the strip · still · choice six p orbitals (one on each carbon atom · overlapping) · headline on the 3D stage per state · readout the electron count the text gives: 4 valence electrons per carbon atom = 3 in sp² (σ bonds) + 1 in p (π bonds), and when overlapping 6 × 1 = 6 π electrons shared by all six bonds · physical ball-and-stick ring by `F.el` with a mathematical layer of p lobes and π rings in ink; free orbit, idle spin about the ring's axis, no view buttons; the strip holds the book's two resonance structures and the condensed formula with its circle, as drawn. Rebuilt: the old figure slid the double bonds around the ring between the resonance structures, which suggests the molecule flips between them, and hid the orbitals behind a 2D/3D switch.
  works: parts (six carbon atoms in a regular hexagon, each bonded to one hydrogen atom; one p orbital per carbon atom, two lobes) · flow (none; on the choice the lobes fade into two rings of π density) · must hold (C–C 1.39 Å all equal, C–H 1.09 Å, all twelve atoms in one plane; each p orbital's axis perpendicular to that plane through its carbon atom; the rings of π density centred on the ring above and below it; the strip's resonance structures have their double bonds on alternate edges, the second shifted by one edge) · read off the image (resonance structures with C at the left and right vertices and H on every carbon, double bonds right/upper-right, upper-left/left, lower pair in the first; top, lower-left, lower-right in the second; the condensed formula as six CH joined in a ring with a circle inside).

Kept as images (each a `figure` row with no number and a caption of its own, or a `photo` row with its number):

- fig-butane-isomers (butaneIsom), fig-substituents (substitu), fig-alkyl-names (alkyl), fig-propane-hydrogens (propane, its black, purple and green hydrogen atoms named by the text, so kept as printed), fig-alkyl-locations (alklnm), fig-ethane-chlorine (ethylChlor), fig-alkene-names (alkenes), fig-ethene-chlorine (halogen), fig-ethyne (alkyne), fig-acetylene-bromine (acetylene), fig-benzene-derivatives (subbenzene): structures and reactions the text reads off; a reaction arrow is symbolic and nothing varies, so a faithful image is the lowest tier that serves
- the twelve example images (LineStruct2, 3, 6, 7, HalAlkane, HalAlkane2, octane1, HaloReact, HaloReact2, GeomHybr1, AromatIso1, AromatIso2) as `figure` rows inside their examples; the images of the Check Your Learning prompts and answers stay in the exercise rows
- fig-monomer · Figure 20.8 · photo row inside the note: the polymerization arrow is symbolic, and ethylene's ball-and-stick and space-filling models are in sim-hydrocarbon-models (ethene)
- fig-recycle · Figure 20.9 · photo row inside the note: a table of recycling codes

Dropped: the Link to Learning video on naming alkanes (named in `notes`).

Extra simulations: none. The twist of n-butane about its middle bond against the rigid C=C of 2-butene is carried by turning the models of sim-hydrocarbon-models; a separate dihedral slider would show one molecule changing shape, which the book never asks of the reader.

## Tables

Table 20.1 as `div.book-table` with its two footnotes as `p.tnote`; the temperatures take `data-type="temperature"`, and the footnote's 0 °C and 1 atm their types.

## Types bound

`temperature` (Table 20.1, 425 °C, the trend Sim's graph and readout, the tower's temperature bar), `pressure` (1 atm), `mass` (135 million tons of ethylene; the exercises' 25.5 g, 74.5 g, 1.000 × 10³ kg, 9.328 × 10² kg). Carbon counts, locants, bond angles as the book states them (109.5°, 120°, 180°), hybridizations, counts of compounds and percents stay ink. No symbol is written by a readout: the temperatures are words with hued numbers, so no variables row is wanted. Atoms by `F.el` (C, H). No referents: the propane image keeps the book's colours, which its text names.

## Exercises

Seven Check Your Learning items inline after Examples 20.1 to 20.7, hosts `ex-skeletal-draw`, `ex-skeletal-read`, `ex-halogen-names`, `ex-substituted-names`, `ex-alkene-reactivity`, `ex-alkyne-structure`, `ex-aromatic-structure`; all open or keyed text from the book, the answers to 20.1 and 20.7 as the book's images.

Twenty-nine end-of-section items (1 to 29): fifteen keyed kept (fs-idp73372304, fs-idp46944768, fs-idp53563584, fs-idp68859088, fs-idp15287488, fs-idp7100896, fs-idp47819536, fs-idp63809536, fs-idp67272704, fs-idp51534160, fs-idp51005312, fs-idp64361104, fs-idp68973952 open; fs-idp81497952 74.5 g and fs-idp9096944 9.328 × 10² kg as numbers); three unkeyed conceptual kept with an AI-marked suggested approach (fs-idp53479808, fs-idp14199456, fs-idp45666096); eleven unkeyed left out and named (fs-idp52657872, fs-idp6728112, fs-idp4501296, fs-idp1311200, fs-idp65090000, fs-idp53700896, fs-idp69267152, fs-idp53031744, fs-idp68859968, fs-idp49893888, fs-idp80653232). No moves; 20.4's fs-idp39423488 states the reaction of fs-idp49893888 in its own prompt.

## Left out

The Link to Learning on naming alkanes. Errata kept as printed: "2–methylpropane" with an en dash (twice); "branched chain (… three other carbon atoms)" with no full stop; "(It may be easier to see the equivalency … Figure 20.2." with its parenthesis unclosed; constitutional isomers said to have "different spatial arrangements"; the empty superscript after 120°; the stray bold around "The location of the double bond"; key fs-idp68973952 (b) "6H₂O" set inside the formula.

## Wanted at chapter level

- `eq-alkane-formula` → 20.1-alkane-trend
- No concept, edge or symbol fixes.

Applied by the chapter pass (2026-10-05): `eq-alkane-formula` anchored at `20.1-alkane-trend`. No concept, edge or symbol rows changed. The distillation Sim's tower shows no fraction temperatures, since the book gives none, and no dihedral Sim was built; both are recorded in `config.md` and `exploration.md`. "round the ring" made "around the ring" in Figure 20.11's caption, headline and the caption of the example's isomers.
