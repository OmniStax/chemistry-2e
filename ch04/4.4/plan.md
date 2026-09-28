# Plan: 4.4 Reaction Yields

Written 2026-09-28 before the build; applied as proposed on Chen's instruction to finish the book without check-ins (`ch04/config.md`).

## Sub-concepts (spans)

| Span | Header | Concepts introduced |
|---|---|---|
| `stoichiometric-amounts` | Reactants that are not in stoichiometric amounts | (uses stoichiometry) |
| `limiting-reactant` | Limiting Reactant (the book's header) | limiting-reactant |
| `comparing-products` | Finding the limiting reactant from the product each gives | identify-limiting-reactant; Example 4.12 `ex-silicon-nitride` |
| `percent-yield` | Percent Yield (the book's header) | theoretical-and-actual-yield, percent-yield; Example 4.13 `ex-copper-yield` |
| `atom-economy` | Green chemistry and atom economy | atom-economy (the sciences-interconnect note) |

The key concepts and summary go to `summary_html`; objectives, the Key Equations table (percent yield, `eq-percent-yield`) and the five glossary terms are in the tables. The Link to Learning note (the PhET Reactants, Products and Leftovers simulation) is dropped and named in `notes`; it is the trigger for the Sims below.

## Figures

- `sim-sandwich` · Figure 4.13 · limiting-reactant · variation (the reader sets the slices provided and watches which one runs out) · still, the idea has no clock · sliders bread slices and cheese slices, untyped counts, each with a dashed special at the stoichiometric amount the other calls for · headline "28 slices of bread and 11 slices of cheese make 11 sandwiches, with 6 slices of bread left over" · none · 2D. Bread and cheese are instances with no element and no type: `F.cat(0)`, `F.cat(1)`. Kind names are drawn once per row; individual slices are not labelled (28 of them).
- `sim-hcl-limiting` · Figure 4.14 · limiting-reactant, identify-limiting-reactant · variation · still · sliders molecules of H₂ and of Cl₂ (1 to 10, the figure's 6 and 4 as defaults), untyped counts, each with a dashed special at the equal (1:1) pair · headline "6 H₂ and 4 Cl₂ give 8 HCl and leave 2 H₂; chlorine is the limiting reactant" · none · 2D: the lesson is counting before and after, which rows of molecules show best; the book's particle-box rule is not reached, since no arrangement in space or motion of particles is taught here. Molecules in the element palette through `F.el` (H white, Cl green); hover names every molecule; kind labels only under each panel.
- `sim-silicon-nitride` · Sim · identify-limiting-reactant · variation (masses of Si and N₂ as sliders; the route mass → moles → product each could give, and the two ratios compared) · still · sliders `\km` of Si (0.50 to 4.00 g, 2.00) and `\km` of N₂ (0.50 to 3.00 g, 1.50), mass hue; a dashed special on the N₂ slider at the stoichiometric mass for the Si present · headline states which reactant limits and the lesser product amount · bars of the product each reactant would give, beside the route · 2D. Binds `mass`, `amount`. Molecules not drawn (the example is arithmetic).
- `sim-percent-yield` · Sim · theoretical-and-actual-yield, percent-yield · variation · still · sliders `\km` of CuSO₄ (0.500 to 2.500 g, 1.274) and actual `\km` of Cu (0 to 1.00 g, 0.392), clamped at the theoretical yield, with a dashed special at the theoretical yield (100%) · headline "1.274 g of CuSO₄ can give 0.5072 g of Cu; 0.392 g is a 77.3% yield" · a theoretical-yield bar (dashed outline, mass hue) with the actual yield filled inside it · 2D. Binds `mass`, `amount`. Percent yield is untyped and ink.
- `fig-green-chem` · Figure 4.15 · photo kept: the note points at it, and part (b) is the book's own drawing of the three-step BHC process, a named structure series that no slider would improve (faithful, rule 24.3).

Readouts: each Sim writes its relation with live numbers, `\kn` and `\km` in their hues, counts and percents in ink.

## Exercises

- Check Your Learning: 2, inline after Examples 4.12 and 4.13 (hosts `ex-silicon-nitride`, `ex-copper-yield`), both keyed (O₂; 48.3%).
- End of chapter: 18 items, 9 keyed and kept (fs-idm48529264, fs-idm38653920, fs-idm57693344, fs-idp34342864, fs-idm46525040, fs-idm49726752, fs-idp70668864, fs-idm71853216 with its saccharin image, fs-idm19471568 with ＄5 and its URL as plain text). One unkeyed conceptual item kept with an AI-marked suggested approach: fs-idm47361200 (Dalton). Eight unkeyed numerical items left out: fs-idm72007808, fs-idp61299760 (prints CO₂(s) as an erratum), fs-idp99327968, fs-idm7557120, fs-idm43326768, fs-idm21873728, fs-idm574992, fs-idp41861648.

## Binds

`amount`, `mass` (the two Sims with sliders in grams). Counts, ratios and percents are ink.

## Wanted at chapter level

- eq-percent-yield → 4.4-percent-yield
- eq-atom-economy → 4.4-atom-economy
- edge theoretical-and-actual-yield → daltons-atomic-theory (the Dalton exercise; concept exists in 2.1)
- edge identify-limiting-reactant → mass-mole-conversion (Example 4.12 converts grams to moles; 3.1)
- edge limiting-reactant → coefficients-as-ratios (the 1:1 and 2:1 stoichiometric ratios)

Applied by the chapter pass: eq-percent-yield anchored at 4.4-percent-yield, eq-atom-economy at 4.4-atom-economy; all three edges merged.
