# Plan: 12.7 Catalysis (m68795)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied as proposed, without check-ins).

Two objectives, seven numbered figures (12.19 to 12.25: 12.20 in the Molina portrait, 12.21 and 12.22 in the G6PD note, 12.24 in the converter note, 12.25 in the enzyme note), one unnumbered image in Example 12.15 and one in its Check Your Learning, one table (12.3, in the enzyme note), one worked example (12.15) with a Check Your Learning, four boxed notes kept and two Link to Learning notes dropped, nine end-of-section items (chapter exercises 76 to 84).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `catalysts` | Catalysts and reaction diagrams (the section's opening, Figure 12.19, Example 12.15 `ex-catalyzed`) | introduces `catalysis-lowers-activation-energy`, `catalyzed-reaction-diagrams`; uses `catalyst`, `reaction-diagram`, `activation-energy`, `reaction-mechanism`, `rate-determining-step`, `activated-complex`, `reaction-intermediate`, `enthalpy-change`, `arrhenius-equation` (the Sim's readout) |
| `homogeneous` | Homogeneous catalysts (the book's header; the ozone mechanisms, the Molina portrait with Figure 12.20, the G6PD note with Figures 12.21 and 12.22) | introduces `homogeneous-catalysis`; uses `reaction-mechanism`, `reaction-intermediate`, `elementary-reaction`, `catalysis-lowers-activation-energy` |
| `heterogeneous` | Heterogeneous catalysts (the book's header; the four processes, Figure 12.23, the converter note with Figure 12.24) | introduces `heterogeneous-catalysis`; uses `catalysis-lowers-activation-energy`, `sigma-and-pi-bonds`, `surface-area-and-rate` |
| `enzymes` | Enzymes (the enzyme note with Table 12.3 and Figure 12.25) | introduces `enzymes`; uses `catalysis-lowers-activation-energy`, `reaction-intermediate` |

## Figures

- sim-catalysis · Figure 12.19 · catalysis-lowers-activation-energy, catalyzed-reaction-diagrams · variation by slider and choice: the book draws one catalyzed path beside the uncatalyzed one; here the reader sets how low the catalyst brings the barrier and whether its path takes one step or two, sees the reactants, the products and ΔH stay where they are while the barrier falls, and reads how many times faster the catalyzed path is · arrows: symbolic (the E_a and ΔH double arrows, drawn as brackets) · still, a reaction diagram has no clock: its x axis is the extent of reaction, not time · E_a of the catalyzed path (energy, 6 to 26 kJ/mol, default 14), choice catalyzed path (two steps, one step; default two steps, the book's picture) · headline "The catalyst lowers $\kEa$ from 26 to 14 kJ/mol and leaves ΔH at 4 kJ/mol." (the longer one wrapped mid-number) · graph alone, the graph is the idea · 2D, a reaction diagram (book rule) · energies from Example 12.15 (reactants 6, products 10, uncatalyzed peak 32 kJ/mol), so one step at 14 kJ/mol is the example's pair; the second step of the two-step path keeps its share of the barrier as the slider moves; curves are the referents `uncatalyzed` and `catalyzed`; E_a brackets and the ΔH bracket in `energy`; labels reactants, products, intermediate (fades out with one step) and the three bracket names, six in all; a legend for the two paths; hover names on the transition states and the intermediate · readout k_cat/k_uncat = exp((E_a,uncat − E_a,cat)/RT) at 298 K with the live numbers (127 at the default), the same frequency factor on both paths, which the caption says; no note, the readout says it
  works: read off the image: Energy against Extent of reaction, no numbers; Reactants on the left plateau and a dashed level through it; Products on a higher right plateau (endothermic); the uncatalyzed curve one tall peak with its E_a arrow from the reactants' level; the catalyzed curve a lower first peak, a shallow valley (the intermediate) and a smaller second peak, its E_a arrow from the same level to its first peak; ΔH a double arrow from the reactants' level up to the products'. Numbers from Example 12.15: reactants 6, products 10, uncatalyzed peak 32, catalyzed peak 20 kJ/mol. must hold: both curves start and end on the same plateaus at every setting; each E_a bracket spans from the reactants' level to its path's highest peak; the readout's E_a difference is the two brackets'. Reviewed 2026-11-14: kept; caption cut, headline shortened.
- fig-ex-catalyzed · unnumbered image (Rxndiagramex_img, Example 12.15) · catalyzed-reaction-diagrams · kept as printed: the example asks the reader to read energies off these two diagrams, so it is a faithful copy and the image is the copy · figure row, no number
- the Check Your Learning image (Rxndiagramcyl_img) goes in its card as `figure`
- fig-molina · Figure 12.20 · kept photograph, a Portrait of a Chemist (book rule) · photo
- fig-g6pd · Figure 12.21 · kept, the note points at it as the enzyme's picture; a ribbon model whose turning would show nothing the note speaks of · photo
- fig-pathway · Figure 12.22 · kept as printed, a pathway chart whose curved arrows are notation (rule 24.9: no mechanism replay) · photo
- sim-hydrogenation · Figure 12.23 · heterogeneous-catalysis · flow by animation: the book prints four frozen panels with arrows of motion; here one clock runs the four steps on one nickel surface, so the H–H bond breaking as hydrogen lands, the π bond giving way as ethylene lies down, the hydrogen atoms travelling across the surface to the carbons, and ethane lifting off are seen as one process · arrows: kinematic (the book's arrows of hydrogen and ethylene falling onto the surface, of atoms diffusing across it, of ethane leaving it), so the floor is the moving tier · moving, the steps have a clock, 11.4 s a loop and a 1.4 s hold, the transport scrubs it · no slider or choice · headline per step, the book's caption sentence for (a) to (d) · 2D, rebuilt on 2026-11-14 as a locked perspective (root rule 28.2) from about the book's viewpoint: the 3D scene had front/above view buttons, a small slab in a large stage and a separate strip of step names that repeated the headline; one oblique view shows every atom on the surface and every height above it, which is all turning showed. Nickel atoms by `F.el('Ni')` on a slab painted in the same colour, H and C by `F.el` keyed in a legend; atoms painted far to near, each bond at the depth of its middle, Ni–C bonds in muted ink; one fixed label "Ni surface"; every moving atom named on hover (rule 26.7) · readout the overall equation C₂H₄ + H₂ ⟶ C₂H₆ over Ni
  works: parts: a slab of nickel whose top is a layer of touching atoms; two H₂ molecules; one C₂H₄ (C=C with two H on each C); at the end one C₂H₆ (C–C with three H on each C) and two H atoms left on the surface · flow: (a) the H₂ molecules fall to the surface and each splits into two H atoms on nickel sites; (b) ethylene falls and lies flat, its double bond becoming single as each C bonds to a nickel atom; (c) one H atom slides across the surface under each C and bonds to it; (d) the ethane rises away · must hold: (1) no atom inside the slab; (2) an H–H bond shown only until the atoms reach their sites; (3) the C=C drawn double until (b) and single after; (4) exactly two of the four H atoms end on the carbons and two stay on the surface; (5) the headline names the step the atoms are in · read off the image: four panels (a) to (d); labels "Ni surface", "Hydrogen", "Ethylene", "Ethylene adsorbed on surface breaking π bonds"; in (a) two H₂ arrows to the surface and two lone H already there; in (c) curved arrows bring two H atoms to the carbons; in (d) ethane leaving with two H atoms left behind. The book's (a) shows H atoms already on the surface beside the falling H₂; here both H₂ fall, so the count of four is kept.
- fig-converter · Figure 12.24 · kept as printed, a cutaway with its labels; the flow arrows are labels of where gas enters and leaves, and nothing in the note asks how the gas moves through · photo
- sim-enzyme · Figure 12.25 · the book's image, kept (a `photo`); reverted on 2026-11-14. The Sim showed one model at a time behind a choice, losing the side-by-side comparison of lock-and-key and induced fit the book's two pairs give at once, and its enzyme and substrates were rounded boxes where the book draws distinct shapes whose fit is the point. The referents `enzyme` and `substrates`, which only its caption marked, are removed.

Extra simulations: none. The ozone mechanisms of 12.6 and 12.7 are equations the text works through; a diagram of the NO-catalyzed path beside the uncatalyzed one would repeat Figure 12.19 with no numbers the book gives.

## Tables

Table 12.3 in the enzyme note as `div.book-table`. No Key Equations table.

## Types bound

`energy` (E_a, ΔH, the energy axis and the brackets of 12.19), `rate-constant` (k_cat and k_uncat in the readout), `temperature` (the 298 K of the readout). Everything else ink, the element palette, or a referent.

## Referents

`uncatalyzed`, `catalyzed`: the two paths of Figure 12.19, one curve each, marked in the paragraph that compares them and in the caption. (`enzyme` and `substrates`, the shapes of Figure 12.25, went with its Sim on 2026-11-14.)

## Exercises

One Check Your Learning inline after Example 12.15 (`ex-catalyzed`), keyed, an open answer with its diagram. Nine end-of-section items (76 to 84): five keyed kept (fs-idm121944048, fs-idm268031984, fs-idm218836096 open, fs-idm219276192 open, fs-idm225889216 open; fs-idm218836096 as two numbers with a 20 % tolerance, since they are read off a graph), three unkeyed conceptual with an AI-marked approach (fs-idm119808848, fs-idm194307024, fs-idm189363504), one unkeyed numerical left out (fs-idm260004768). fs-idm189363504 points at the diagrams of the left-out fs-idm260004768: its prompt keeps the book's words and carries those two images. No PhET item; none moved.

## Left out

The two Link to Learning notes (the ChemWiki page on catalytic converters, the Royal Society of Chemistry's introduction to enzymes). Errata kept as printed: the caption's "two transitions states"; the converter note's first equation decomposing NO₂ where the text says nitric oxide.

## Wanted at chapter level

- `config.md`: Example 12.15's diagram (Rxndiagramex_img) is an unnumbered image kept as a figure row with no number.
- variables rows in 12.7 for `E_a`, `ΔH`, `k`, `R`, `T` (the meanings of 12.3 and 12.5) if the chapter pass wants them per section; the page writes `\kEa`, `\kdH`, `\kk`, `\kT`
- the concept prereqs list both `reaction-diagram` and `reaction-energy-diagram` under `catalyzed-reaction-diagrams`, two rows for one idea from 12.5

Applied by the chapter pass (2026-10-05): `config.md` names Example 12.15's figure row; no per-section rows for the reused symbols. `reaction-energy-diagram` (the definition) and `reaction-diagram` (the skill of reading one) are two kinds and both stay; the edge from `catalyzed-reaction-diagrams` to each was redundant, and the chapter's edges were Hasse-reduced, so it now rests on `catalysis-lowers-activation-energy` alone.
