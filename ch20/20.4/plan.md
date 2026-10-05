# Plan: 20.4 Amines and Amides (m68849)

Written 2026-10-05 before the build and left for review, as `ch20/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Two objectives, eight numbered figures (20.17 to 20.24; all but 20.17 inside the boxed notes), six unnumbered images in the text, no worked example and no Check Your Learning, four boxed notes (DNA in Forensics and Paternity, Addictive Alkaloids, Proteins and Enzymes, Kevlar), one Link to Learning note (dropped), ten end-of-section items (chapter exercises 54 to 63). No table, no footnote, no Key Equations. The book prints no header in this module; the page takes two of its own, Amines and Amides (config).

## Sub-concepts and spans

| Span | Header or block | Concepts |
|---|---|---|
| `amines` | Amines (the section's own; the amines image as `fig-amines`, pyridine, Figure 20.17) | introduces `amine`; uses `lone-pair`, `aromatic-hydrocarbon`, `resonance-forms` |
| `dna` | the DNA in Forensics and Paternity note (its `div` carries the id; Figure 20.18) | introduces `dna-structure`; uses `polymer`, `hydrogen-bonding` |
| `amine-bases` | the paragraph "Like ammonia, amines are weak bases" (the ammonia image follows it) | introduces `amine-basicity`; uses `weak-base`, `lone-pair`, `functional-group`, `polymer` |
| `alkaloids` | the Addictive Alkaloids note (Figure 20.19) | reinforces `amine-basicity`; uses `functional-group`, `salt`, `base`, `ether`, `ester` |
| `amides` | Amides (the section's own; the amide image) | introduces `amide`; uses `carbonyl-group`, `amine`, `carboxylic-acid`, `polymer` |
| `amidation` | the paragraph on amidation (its reaction image follows it) | introduces `amidation`; uses `carboxylic-acid`, `amine`, `ester` |
| `proteins` | the Proteins and Enzymes note (Figures 20.20, 20.21) | introduces `proteins-and-peptide-bonds`; uses `functional-group`, `carboxylic-acid`, `carbonyl-group`, `enzymes`, `catalyst`, `activation-energy` |
| `kevlar` | the Kevlar note (Figures 20.22 to 20.24) | introduces `kevlar-polyamide`; uses `polymer`, `hydrogen-bonding`, `carbonyl-group`, `electronegativity` |
| `functional-groups` | the closing sentence and the functional-group table image | reinforces `functional-group` |

The glossary terms (amine, amide) sit on `amine` and `amide`; their bold terms are the introducing spans. Earlier concepts are marked `uses`, never `introduces` (chapter notes).

## Figures

- fig-amines · replaces the unnumbered amines image (`fs-idp22598720`), kind `figure`, eyebrow "Figure" · amine, amine-basicity · value add: variation by choice and depth: the book draws three amines side by side; here one choice replaces ammonia's hydrogen atoms by methyl groups one at a time, so the reader sees that every amine keeps nitrogen's three bonds and its lone pair (the text's definition) whichever atoms they reach, and a second choice lets the lone pair take a hydrogen ion, turning each amine into its ammonium ion (the basicity the text names a few paragraphs on, and exercise 55); in 3D the four electron pairs at the corners of a tetrahedron show the trigonal pyramid becoming a tetrahedron, which the flat Lewis structure cannot show · arrows: none · still: a series of structures and a reaction's two sides, no clock; the choices morph (in 2D a hydrogen crossfades into CH<sub>3</sub> on its site, the lone pair slides up into the shared pair as the hydrogen ion arrives and the brackets fade in; in 3D the hydrogen sphere grows into a methyl group, the lone-pair lobe shrinks as the new hydrogen atom grows on its corner) · choice amine (NH<sub>3</sub>, CH<sub>3</sub>NH<sub>2</sub>, (CH<sub>3</sub>)<sub>2</sub>NH, (CH<sub>3</sub>)<sub>3</sub>N; untyped; default CH<sub>3</sub>NH<sub>2</sub>, the book's first), choice nitrogen (lone pair, bonded to H<sup>+</sup>; untyped; default lone pair), choice view (2D, 3D; default 2D, book rule for a structure the text names) · headline "In methyl amine, nitrogen bonds to one carbon atom and two hydrogen atoms and keeps one lone pair." per state · graph none · 2D: the book's Lewis structure (substituents left, right and below, the lone pair above; letters in ink, as 18.9 draws its Lewis structures), the name beneath as the book prints it; 3D: physical 3D, ball-and-stick at N–C 1.47 Å, N–H 1.01 Å, C–H 1.09 Å on tetrahedral corners with the lone pair as a lobe, mounted on the first switch; free yaw, pitch within ±90° (a molecule has no ground and no underside to hide), idle spin, views front (the book's) and from above (down the lone pair); flat fallback without WebGL is the 2D view · colours: 3D atoms by `F.el` (N, C, H), lobe and brackets in ink, no type bound · labels: in 2D the atom symbols are the structure, the name beneath (one); in 3D no entity labels, hover names on atoms, groups and the lobe · readout the condensed formula, and with H<sup>+</sup> chosen the book's reaction $\text{CH}_3\text{NH}_2 + \text{H}^+ \longrightarrow \text{CH}_3\text{NH}_3^{\,+}$, morphing by meaning (the amine keeps its key, H<sup>+</sup> and the ion arrive) · note: the molecular structure about nitrogen, trigonal pyramidal with a lone pair, tetrahedral without one.
- fig-pyridine · Figure 20.17 · amine · kept as printed: one resonance structure of a molecule the text names once and points at; nothing varies and the ring is flat (24.9: no viewer for a molecule merely named) · photo row
- fig-dna · Figure 20.18 · dna-structure · kept as printed, inside the note: three panels at three scales; the double helix in 3D is listed below as an extra and not built · photo row
- fig-amine-protonation · unnumbered image (ammonia, `fs-idp78463392`) · amine-basicity · kept as printed: the two reactions the colon leads into, arrows symbolic; fig-amines carries their 3D shape change · figure row, no number
- fig-alkaloids · unnumbered image (alkaloids, `fs-idp25168336`) · amine-basicity · kept as printed, inside the note: the text reads its wedges and dashes and its hydroxyl and ester groups off this drawing; four large molecules merely named · figure row, no number
- fig-poppies · Figure 20.19 · kept photograph inside the note, the text points at it · photo row
- fig-amide-names · unnumbered image (amide1, `fs-idp118957072`) · amide · kept as printed: the general amide and two named examples the colon leads into; fig-peptide draws the same C(O)–N link live · figure row, no number
- fig-amidation · unnumbered image (amide2, `fs-idp42793392`) · amidation · kept as printed: a reaction with a symbolic arrow; the condensation it shows is the one fig-peptide repeats and extends · figure row, no number
- sim-peptide · Figure 20.20 · proteins-and-peptide-bonds, amidation · value add: variation by choice: the book draws one condensation of two amino acids and says that more peptide bonds can form, extending the chain; here the reader joins two, three or four amino acids and sees the OH of each carboxylic acid group and an H of the next amine group leave together as one water molecule per peptide bond, the chain keep one free amine group and one free carboxylic acid group at its ends, and the count of water molecules stay one less than the count of amino acids · arrows: none drawn (the book's reaction arrow and its curved arrow to H<sub>2</sub>O are symbolic and are not replayed as a path; the water is shown assembled beneath each new bond) · still: a reaction's two sides, no clock; the choice morphs (the leaving O, H and H glide down and assemble into H–O–H beneath the bond as the next amino acid slides in and the C–N bond is drawn; a new amino acid fades in from the right) · choice amino acids (2, 3, 4; untyped count; default 2, the book's), choice condensation (before, after; default before, the top of the book's figure) · headline "Each amino acid carries an amine group, a carboxylic acid group and a side chain R." before; "Two amino acids join by one peptide bond, and one molecule of water leaves." after · graph none · 2D: the book's structural formulas, letters and bond lines in ink (book rule: reactions and structural formulas are flat) · colours: none bound, every atom an ink letter as the book's figure sets it; the book's green dashed boxes are ink dashed boxes and its red leaving atoms are set in bold (chapter COLOR.md: emphasis, never a hue) · labels: "amino group" and "carboxyl group" over the two end boxes and "peptide bond" once, on the first bond (three; a kind labelled once, 26.7); every group and the water named on hover · readout $2\ \text{amino acids} \longrightarrow \text{dipeptide} + \text{H}_2\text{O}$ after, the reactants alone before, morphing by meaning · note after: the chain still ends in an amine group and a carboxylic acid group, so another amino acid can join; none before.
- fig-phenylalanine-hydroxylase · Figure 20.21 · kept computer rendering inside the note, the text points at it · photo row
- fig-kevlar-formula · Figure 20.22 · kevlar-polyamide · kept as printed: the repeat unit the text points at · photo row
- fig-kevlar-sheet · Figure 20.23 · kevlar-polyamide · kept as printed: the hydrogen bonds between chains read from the flat sheet as the text asks ("see dashed line"); the stacking of sheets is a clause of the text and a 3D sheet is listed below as an extra · photo row
- fig-kevlar-uses · Figure 20.24 (a)–(c) · kept photographs inside the note, the text points at them · photo row, one row
- fig-functional-groups · unnumbered image (FunctGroup, `fs-idp88107120`) · functional-group, amine, amide · kept as printed, a table of the chapter's functional groups with ball-and-stick models; rebuilding it as a `div.book-table` would lose the models, which the reader compares · figure row, no number

Key images (pyridinium, reaction1f) go in their exercise cards.

Extra simulations (not built, root rule 15): the double helix of Figure 20.18 as a physical 3D scene, the two sugar-phosphate backbones outside and the paired bases inside held by hydrogen bonds; Kevlar's sheets of Figure 20.23 in 3D, hydrogen bonds within a sheet and the rings stacked between sheets.

## Types bound

`temperature` on "–196 °C" in the Kevlar note (a bare value, `data-type`). No other typed value in the prose; "5 times stronger" is a rating and stays ink. Atoms drawn: N, C, H (3D of fig-amines). No referents.

## Exercises

No Check Your Learning. End of section, 54 to 63. Five keyed kept with the book's answers, all open: fs-idp41306208 (55), fs-idm49015296 (57, key image), fs-idp61577168 (59, equation and key image), fs-idp39423488 (61, prompt states 20.1's reactions: 2-butene reacts with chlorine, benzene burns in air; key as printed, "+ Cl" and "CH₃CH(Cl)H(Cl)CH₃"), fs-idp10362640 (63, prompt states 20.3's reactions: 1-butanol reacts with acetic acid, propionic acid is poured onto solid calcium carbonate). Five unkeyed left out and named: fs-idp72930352 (isomer structures), fs-idp42366896 (resonance structures), fs-idp98463728 (isomer structures), fs-idp8208496 (equations), fs-idp70207696 (hybridization). No suggested approaches, no moves.

## Left out

The Link to Learning on DNA packaging. Errata kept as printed: "a phosphate group (−PO₄³⁻) When new DNA" without its full stop; "one of which are proteins"; key fs-idp39423488's "+ Cl" for Cl₂ and "CH₃CH(Cl)H(Cl)CH₃"; key fs-idm49015296's image "pyridium ion"; the glossary's amine "one or more alkyl group".

## Wanted at chapter level

- No anchors: the chapter has no variables rows and the section states no form.
- No concept, edge or symbol fixes.

Applied by the chapter pass (2026-10-05): nothing to anchor. The closing clause on resting the pointer was taken out of the captions of `fig-amines` and `sim-peptide`; hover names stay. The key images `react2a`, `react2b`, `react2c` and `react2e` that 20.2 and 20.3 use are one copy each in `media/ch20/`.
