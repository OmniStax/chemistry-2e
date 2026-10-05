# Plan: 20.3 Aldehydes, Ketones, Carboxylic Acids, and Esters (m68848)

Written 2026-10-05 before the build and left for review, as `ch20/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, three numbered figures (20.14 to 20.16: a drawn functional group, a sheet of skeletal structures, one photograph), ten unnumbered structure and reaction images in the text, one worked example (Example 20.10) with a keyed Check Your Learning carrying two images, fourteen end-of-section items (chapter exercises 40 to 53). No note, no table, no Link to Learning, no Key Equations.

## Sub-concepts and spans

The book's two headers are kept; the untitled opening paragraph takes a header of the section's own.

| Span | Header | Concepts |
|---|---|---|
| `carbonyl` | Carbonyl compounds (the section's own) | uses `trigonal-planar-geometry`, `functional-group` |
| `aldehydes-ketones` | Aldehydes and Ketones (the book's; Figure 20.14; Example 20.10 `ex-oxidation` with its Sim) | introduces `carbonyl-group`, `aldehyde`, `ketone`, `organic-oxidation-reduction`, `oxidizing-alcohols`; uses `functional-group`, `naming-alkanes`, `naming-alcohols`, `trigonal-planar-geometry`, `sp-sp2-sp3-hybrid-orbitals`, `sigma-bond`, `pi-bond`, `bond-polarity`, `electronegativity`, `lewis-base`, `oxidation`, `reduction`, `oxidation-number`, `alcohol` |
| `carboxylic-acids-esters` | Carboxylic Acids and Esters (the book's; Figures 20.15, 20.16) | introduces `carboxylic-acid`, `ester`, `fats-and-oils`; uses `hydrogen-bonding`, `vapor-pressure`, `weak-acid`, `base`, `salt`, `distillation`, `alcohol`, `nomenclature`; reinforces `oxidizing-alcohols` |

## Figures

- sim-carbonyl · Figure 20.14 · carbonyl-group, aldehyde, ketone, carboxylic-acid, ester · value add: standardisation, variation by choice and depth: the book draws the polar, trigonal planar carbonyl once with R¹ and R², and the four subfamilies in four separate images; one choice puts each family's two substituents on the same carbonyl, so the reader sees the δ+ carbon, the δ− oxygen and the ~120° arrangement stay while only the substituents change (the summary's claim), and in 3D sees the three σ bonds lie in one plane with the p orbitals of the π bond above and below it, which the flat drawing cannot show · arrows: none · still: the families are states, not a clock; the choice morphs (the shared carbonyl holds, the substituent that only one family has fades out as the next fades in with a slight shift, the readout morphs by meaning) · choice family as a dropdown, since the row wraps beside the view choice (aldehyde, ketone, carboxylic acid, ester; untyped; default ketone, the book's R¹ and R²), choice view (2D, 3D; default 2D, book rule for a structure the text names) · headline per family, e.g. "In a ketone, the carbonyl carbon bonds to two carbon groups, R¹ and R²." · graph none · 2D: the book's drawing (letters and bond lines, δ+ and δ−, the ~120° arc); 3D: physical 3D, ball-and-stick in the plane with the two p lobes on carbon and on oxygen, mounted on the first switch; free yaw, pitch within ±90° (a molecule has no ground), idle spin, views front (the book's) and edge-on (the plane seen edge-on, the π lobes either side); flat fallback without WebGL is the 2D view · colours: atoms by `F.el` (C, O, H, and `F.el('R')` for an R group), lobes, δ marks and the arc in ink (angle untyped: no figure varies it) · labels: in 2D the atom letters are the structure itself; R¹, R², δ+, δ− and ~120° are the book's (five, fixed, none moves); in 3D the R groups (labelled outward along their bonds) and δ marks are labelled, atoms and lobes named on hover · readout the family's condensed group, `ketone: R¹COR²`, morphing by meaning (R, the carbonyl and the second group as keys) · no note: the headline names the substituents and the readout writes them.
- sim-carbon-oxidation · Sim (Example 20.10) · organic-oxidation-reduction, oxidation-number · value add: standardisation and variation by choice: the example writes CH₄ → CH₃OH → CH₂O → HCO₂H → CO₂ as condensed formulas and works the oxidation numbers in a paragraph; the choice draws each molecule and trades one C–H bond for a C–O bond at each step, the hydrogen fading where the oxygen arrives, while carbon's marker steps two units up an oxidation-number scale from −4 to +4, so the definition "oxidation is a C–H bond replaced by a C–O bond" and the algebra are seen as one motion · arrows: symbolic only (none drawn; the reaction arrows stay in the equation) · still: a series of states; the choice morphs (atoms that stay glide to their new places, the leaving H fades, the new O fades in, a single bond gains its second line) · choice molecule (CH₄, CH₃OH, CH₂O, HCO₂H, CO₂; untyped; default CH₄, where the example starts) · headline per molecule naming its C–H and C–O bonds · strip below (horizontal): carbon's oxidation number on a fixed scale from −4 to +4, the five molecules named at their values, "more reduced" and "more oxidized" at the ends, the chosen one's marker filled · 2D: a flat ball-and-stick drawing (book rule: a ladder of structures is 2D) · colours: atoms by `F.el` (C, H, O), legend of the three; scale and marker in ink (oxidation numbers are untyped) · labels: the five formulas on the strip (five, fixed); atoms named by the legend and on hover · readout the book's algebra for the chosen molecule, for methanol $x_\text{C} + 4(+1) + 1(−2) = 0,\ x_\text{C} = −2$, true in every state · no note.
- fig-esters · Figure 20.15 · ester · kept as printed: nine skeletal structures named by fruit; standardisation alone, nothing varies, and a reader compares them side by side · photo
- fig-strawberry · Figure 20.16 · ester · kept photograph, the text points at it · photo
- Unnumbered images, kept as `figure` rows with no number (each sits in the sentence that ends on a colon before it; reaction arrows are symbolic and nothing varies): fig-carbonyl-unit (`fs-idm18746560`), fig-aldehyde-ketone-groups (`fs-idp29213312`), fig-ethanal-butanone (`fs-idp7703504`), fig-alcohol-oxidation (`fs-idp41917344`), fig-to-aldehyde (`fs-idp8735120`), fig-to-ketone (`fs-idp45920128`), fig-acid-ester-names (`fs-idm75981808`), fig-acid-salt (`fs-idp25667904`), fig-to-acid (`fs-idp46862656`), fig-ester-formation (`fs-idp54563712`). The two functional-group images (`fs-idm18746560`, `fs-idp29213312`) stay beside sim-carbonyl because the text's colon leads into them before the figure is cited.
- Example and exercise images stay in their items: `fs-idp27444048` and `fs-idp15315088` in the Check Your Learning prompt; the keyed exercises' images in their prompts and answers.

Extra simulations (not built, root rule 15): none survives; the oxidation of 1-propanol and 2-propanol to an aldehyde and a ketone would only replay the two reaction images.

## Types bound

`pressure` through "vapor pressures" (`vapor-pressure`, a pressure concept); no typed value in the prose; the mass in fs-idp49933200 is left out with its item. Percents (37%, 1%, 100%, 3–6%), oxidation numbers (−4 to +4), the year 1670 and the bond angle ~120° stay ink. Atoms drawn: C, H, O, R. No referents (one molecule at a time in each figure; the ladder is a scale with one marker, not a point per molecule).

## Exercises

Check Your Learning (source_id `fs-idm15460912`, the example) inline in `ex-oxidation`, keyed, open, with both images in the prompt.

End of section, 40 to 53. Seven keyed kept with the book's answers, all open: fs-idm15644704 (41, images), fs-idp71829088 (43), fs-idp82703040 (45), fs-idp58454944 (47, (e) as printed), fs-idp14955296 (49, image), fs-idp40990752 (51, equations and images), fs-idp7346736 (53, image). Seven unkeyed left out and named: fs-idp3066720 (an order), fs-idm12119040 (products), fs-idp44497952 (hybridization), fs-idm53048272 (formulas and geometry), fs-idp27562320 (structures, oxidation numbers), fs-idp28291200 (equations), fs-idp49933200 (percent yield). No suggested approaches, no moves.

## Left out

Nothing of the prose. Errata kept as printed: esters said to have "lower vapor pressures"; the stray bold before "which means “ant”" (dropped as markup, the words kept); "constitutes 3–6% vinegar"; the glossary's aldehyde "bonded to two hydrogen atoms or a hydrogen atom and a carbon substituent"; key fs-idp58454944 (e) CH₃CH₂CH₂CH(CH₃)CHCH₂ without its double bond.

## Wanted at chapter level

- No anchors: the chapter has no variables rows.
- No concept, edge or symbol fixes.
