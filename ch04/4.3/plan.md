# Plan: 4.3 Reaction Stoichiometry (m68713)

Source: `source.md`, converted with `python3 tools/convert.py 4.3`. Status: built 2026-09-28 without a review stop, as `ch04/config.md` records; this file is left for review.

Three objectives, three numbered figures (4.10 photograph, 4.11 flowchart, 4.12 photograph in the Airbags note), four unnumbered route boxes inside the examples, four worked examples (4.8 to 4.11) each with a Check Your Learning, eighteen end-of-chapter exercises of which nine are keyed, and two glossary terms. One page.

## Sub-concepts (page headers)

1. `stoichiometry` **Stoichiometry** (the opening paragraph, the pancake recipe and its two display equations). Introduces `stoichiometry`; uses `balanced-equation`, `coefficients-as-ratios`.
2. `factors` **Stoichiometric factors** (the ammonia equation, its factors in molecules, dozens and moles, the closing sentence; `sim-ammonia`). Introduces `stoichiometric-factor`; uses `coefficients-as-ratios`.
3. `moles` **Relating moles and numbers of molecules** (Example 4.8 `ex-moles-reactant` with Figure 4.10 and `fig-route-al`; Example 4.9 `ex-product-molecules` with `fig-route-propane`). Introduces `mole-stoichiometry`; uses `stoichiometric-factor`.
4. `masses` **Relating masses** (the sentence on measuring mass; Example 4.10 `ex-masses-product` with `fig-route-naoh`; Example 4.11 `ex-masses-reactants` with `fig-route-octane`). Introduces `mass-stoichiometry`; uses `mole-stoichiometry`, `stoichiometric-factor`.
5. `routes` **The general route** (the closing paragraph, Figure 4.11 as `sim-flowchart`, the Airbags note with Figure 4.12). Reinforces `mass-stoichiometry`, `stoichiometric-factor`.

No Link to Learning in this module. The Key Concepts and Summary go to `summary_html`; objectives and glossary to the tables. No key equations.

## Figures

1. `sim-ammonia` · Sim · stoichiometric-factor · intuition and variation: each row is the equation once (one N₂ and three H₂ give two NH₃), so the 3 : 1 : 2 ratio is seen in every row and at every count, and the same factor reads in molecules, dozens or moles · arrows: symbolic (the reaction arrow of each row) · still: the rows answer the slider, nothing has a clock · slider H₂ (count, 3 to 18 in steps of 3, untyped, ink; its value is written in the chosen unit), choice "counted in" (molecules, dozens, moles) · no headline: the counts stand over their columns as the equation's terms, "3 N₂ molecules + 9 H₂ molecules → 6 NH₃ molecules" · no graph · readout the book's factor times the amount of H₂, in the chosen unit; with moles chosen the amounts wear `amount` · 2D (the lesson is a ratio, not an arrangement in space). Molecules in `F.el` colours (N blue, H white), named by their column heads and by hover names. Six places are always drawn as bands and filled from the top, so a small count is not a drawing lost in a blank stage. Reworked 2026-11-14: the molecules were 7 px across in a loose grid that did not show the ratio, with their labels far below them.
   works: read off the text (the Sim replaces no image): N₂ + 3H₂ → 2NH₃; the factors 2 NH₃ molecules / 3 H₂ molecules, 2 doz / 3 doz, 2 mol / 3 mol · must hold: (1) every filled row holds one N₂, three H₂ and two NH₃; (2) the three counts over the columns are rows × 1, 3 and 2 and match the molecules drawn; (3) the readout's product equals the NH₃ count, with a unit on every number; (4) changing the unit changes no molecule, only the words and the note that one drawn molecule stands for a dozen or a mole.
2. `fig-iodine` · Figure 4.10, photograph, kept: Example 4.8 points at it and it shows the reaction the example computes.
3. `fig-route-al`, `fig-route-propane`, `fig-route-naoh`, `fig-route-octane` · the four unnumbered route boxes (moleratio1, moleratio2, map2, map3) · the book's images, kept, kind `figure`, eyebrow "Figure". They had been redrawn as still copies; reverted on 2026-11-14 because a restyled row of boxes with no control shows nothing the book's drawing does not (root rule 25), the redraw flattened the book's down-and-back shape of the two mass routes, and its lettering was smaller than the book's. Figure 4.11 runs each of these routes with its numbers.
4. `sim-flowchart` · Figure 4.11 · mass-stoichiometry, mole-stoichiometry, stoichiometric-factor · standardisation and variation: the book's ten-box chart with the route of any of the four examples lit, its given amount on a slider, each box on the route showing its live value · arrows: symbolic (the chart's double-headed arrows) · still: a route is chosen, not run; the route draws along its length when it changes (arrival, not a clock) · choice of example (F.select: Examples 4.8 to 4.11), of what is given of A and of what is sought of B (mass, moles, particles); one slider for the given amount, whose quantity follows the given choice (mass g, amount mol, or particles × 10²³, the leaving slider fading out, manim 9), ranged per example so it opens on the book's number in the book's digits (0.429 mol, 0.75 mol, 16 g, 702 g) · no headline: the readout already states what is given and what comes out; substance A and substance B are named over their halves in their referent colours · no graph · readout the chain of factors with the live numbers on one line, masses and amounts coloured · 2D. The volume boxes (pure substance by density, solution by molarity) are drawn in the volume hue as the book draws them but carry no route here, since none of the four examples starts from a volume and the book gives no density or molarity for them; the particle boxes are counts and ink. Binds `mass`, `amount`, `volume`. Reworked 2026-11-14: larger boxes and lettering (values had run out of their boxes), the answer rounded as the book rounds it, the factor under its arrow as the fraction it is.
   works: parts (ten boxes, five for A and five for B, mirrored: volume of pure substance joined to mass by density; mass joined to moles by molar mass; volume of solution joined to moles by molarity; moles joined to number of particles by Avogadro's number; moles of A joined to moles of B by the stoichiometric factor, the only link between the halves) · flow (nothing moves; a calculation runs from the given box of A to the sought box of B along the arrows) · must hold: (1) every arrow of the image is there, double-headed, joining the same two boxes with the same label; (2) every route passes through moles of A and moles of B and no route joins A to B anywhere else; (3) the lit boxes are exactly the route of the chosen given and sought quantities; (4) on load of each example the given and the answer are the book's: 0.429 mol Al → 0.644 mol I₂; 0.75 mol C₃H₈ → 1.4 × 10²⁴ CO₂ molecules; 16 g Mg(OH)₂ → 22 g NaOH; 702 g C₈H₁₈ → 2.46 × 10³ g O₂; (5) the readout's factors are the ones on the lit arrows, with the book's molar masses, and multiply out to the value in the sought box; (6) no text leaves its box · read off the image (boxes "Volume of pure substance A", "Mass of A", "Volume of solution A", "Moles of A", "Number of particles of A" and the same for B; arrow labels Density, Molar mass, Molarity, Avogadro's number, Stoichiometric factor; volume boxes lavender, mass yellow, moles pink, particles green; the alt text agrees). The image sets mass above and particles below the moles box on diagonals; here they stand in one column so a route reads straight. Molar masses from the examples: Mg(OH)₂ 58.3, NaOH 40.0, C₈H₁₈ 114.23, O₂ 32.00 g/mol.
5. `fig-airbag` · Figure 4.12, photograph, kept: the note points at it and it shows the deployed bags.

Motion: none. No figure has a clock, so no cycle and no transport. Labels: every box of Figure 4.11 names itself; molecules in `sim-ammonia` are named by their column heads and carry hover names.

Extra simulations considered and left: a mass-to-mass balance for Example 4.10 (the flowchart carries it); an airbag inflating from sodium azide (the volume of a gas is Chapter 9's).

## Exercises

- Inline `check-your-learning`, keyed: `cyl1` after `ex-moles-reactant` (2.04 mol), `cyl2` after `ex-product-molecules` (4.8 × 10²⁴), `cyl3` after `ex-masses-product` (39.0 g), `cyl4` after `ex-masses-reactants` (13.22 g).
- End `exercise`, keyed and kept: fs-idp147780304 and fs-idp61309952 (prompts rewritten to carry the reactions of the unkeyed items they refer to, fs-idp166618800 and fs-idp16477696, with their images on the card), fs-idp272460112, fs-idp172099056, fs-idp65199360, fs-idp220471472, fs-idp82714064, fs-idp8090960, fs-idp149769296.
- Left out, unkeyed and numerical: fs-idp166618800, fs-idp16477696, fs-idp33547424, fs-idp102353344, fs-idp216213984, fs-idp9841552, fs-idp89497728, fs-idp10650096, fs-idp158165536.
- No item moved between sections.

## Colour

Binds `amount`, `mass` and `volume`. Molar mass, density, molarity, the stoichiometric factor and the particle count are ink.

## Wanted at chapter level

- concept_prereqs `mole-stoichiometry` → `mole`
- concept_prereqs `mole-stoichiometry` → `avogadro-number`
- concept_prereqs `mass-stoichiometry` → `molar-mass`
- concept_prereqs `mass-stoichiometry` → `mass-mole-conversion`
- concept_prereqs `mass-stoichiometry` → `molarity`

Applied by the chapter pass: all five edges staged in book-rows.json and merged.
