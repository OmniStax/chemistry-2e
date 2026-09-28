# Plan: 10.2 Properties of Liquids (m68764)

Source: `source.md`, converted with `python3 tools/convert.py 10.2`.
Status: built 2026-09-28 without a review stop, on Chen's instruction to finish the book without check-ins (`config.md`); left here for review.

Three learning objectives, seven figures (10.15 to 10.21), two numbered tables (10.2, 10.3), one display equation, Example 10.4 with its Check Your Learning, one Chemistry in Everyday Life note, eight end-of-section exercises (22 to 29 of the chapter, four keyed), five glossary terms. No Link to Learning. One page.

## Sub-concepts (page headers)

The book prints no headers in this module; the page divides it by idea.

1. `viscosity` **Viscosity**: the opening paragraph, Figure 10.15, the paragraph on IMFs, molecular shape and temperature, Table 10.2. Introduces `viscosity`; uses `phase-from-imf-and-kinetic-energy`, `rank-by-intermolecular-forces`.
2. `surface-tension` **Cohesive forces and surface tension**: the cohesive forces paragraph, Figure 10.16, the surface tension paragraph, Table 10.3, Figure 10.17, the Agnes Pockels paragraph. Introduces `cohesive-and-adhesive-forces` and `surface-tension`; uses `hydrogen-bonding`.
3. `adhesion` **Adhesive forces and wetting**: the adhesive forces paragraph and Figure 10.18. Reinforces `cohesive-and-adhesive-forces`.
4. `capillary` **Capillary action**: the wine and paper towel paragraph, Figure 10.19, the towel paragraph, the capillary tube paragraph, Figure 10.20. Introduces `capillary-action`; uses `cohesive-and-adhesive-forces`, `hydrogen-bonding`.
5. `capillary-rise` **The height of capillary rise**: the equation and its paragraph, Example 10.4 (`ex-capillary-rise`) with its Check Your Learning inline, the note Biomedical Applications of Capillary Action (`note-blood`) with Figure 10.21. Introduces `capillary-rise-equation`; uses `capillary-action`, `surface-tension`.

Objectives, the summary (to `summary_html`), the Key Equations table (the chapter's `eq-capillary-rise`) and the glossary go to the tables.

## Figures

- `sim-caprise` · Figure 10.20 · capillary-action, capillary-rise-equation, cohesive-and-adhesive-forces · value add: the book's two beakers become one beaker whose liquid the reader chooses and whose tube diameter the reader sets, so the rise (or the fall) and its inverse dependence on the radius are read off a centimeter scale, and a close-up draws the meniscus with its contact angle and the 2r the equation uses; tier 2 (sliders over a still scene) · still: the equation gives the height the column comes to rest at, and the time it takes to get there is not taught; a change of liquid bends the columns and the meniscus from one state to the other (choice morph), a slider change shows the new height at once · choice liquid (water, ethanol, ethylene glycol, mercury; the book's Table 10.3 liquids, octane left out as it adds nothing ethanol does not show), slider tube diameter d, 0.20 to 2.00 mm, untyped, a special circle at 0.25 mm labelled Example 10.4 · headline "Water rises 11.8 cm in the tube 0.25 mm across and 5.9 cm in the tube twice as wide." (mercury: "stands … below the surface") · no graph; the scale beside the beaker is the reading · 2D: the relation is a height against a scale, and a 3D bench (the candidate in `exploration.md`) adds no view the section drawing lacks. Two tubes stand in the beaker, of diameter d and 2d, as the book's two tubes do; tube widths are drawn ten times their true size against the height scale, and the figure says so. The close-up is drawn to its own scale. Liquids are drawn in ink outline over the soft panel fill, told apart by label and meniscus (chapter `COLOR.md`); nothing is bound. Data: surface tensions from Table 10.3; densities 1.00 (the book's value for water in Example 10.4), 0.789, 1.11 and 13.53 g/cm<sup>3</sup>; contact angle 0° for the three liquids that wet glass (the book's statement for water) and 140° for mercury, a handbook value the book does not print; g = 9.8 m/s<sup>2</sup>. Labels: tube names (d, 2d) and the two heights beside their columns (four, never collide: heights are set on the outer side of each tube); close-up labels 2r and θ. Readout: one line, h = 2T cos θ / rρg = numbers = result, for the narrow tube.

Photographs and images kept (the text points at each):

- `fig-viscosity` · Figure 10.15 · photo, kept: honey and motor oil are what the paragraph names.
- `fig-droplet` · Figure 10.16 · kept as the book's image: a photograph with its drawing in one file; the drawing (an interior molecule pulled all ways, a surface molecule pulled inward) is a still arrow diagram that a redraw would copy without adding a view, so it stays the book's (exploration listed it for a redraw; decided against on rule 24's value test).
- `fig-strider` · Figure 10.17 · kept as the book's image, the same reasoning.
- `fig-meniscus` · Figure 10.18 · photo, kept: the two menisci are the evidence.
- `fig-wicking` · Figure 10.19 · kept as the book's image (photograph with its molecular inset in one file); the inset is the book's IMF drawing, and the view choice of the book's rule would redraw a crowded cellulose picture for little gain.
- `fig-blooddraw` · Figure 10.21 · photo in the note, kept.
- Exercise images: `CNX_Chem_10_02_Testtubeoi_img.jpg` (exercise 22), `CNX_Chem_10_02_Needlefloa_img.jpg` with its credit (exercise 23), `CNX_Chem_10_02_Question4_img.jpg` (exercise 24, a table of four liquids set as an image in the book) kept in their prompts.

Extra simulations, not built: a cross-section of a liquid in which the reader picks a molecule at the surface or inside and sees its neighbours' pulls and the net inward pull (the idea of 10.16 and 10.17); a falling-ball viscometer with the book's liquids and a temperature slider.

## Tables

Table 10.2 and Table 10.3 in the text as `div.book-table`. The exercise 27 table is set in its prompt.

## Binds

Nothing: the capillary equation's h, T, θ, r, ρ and g are untyped (chapter `COLOR.md`), and no figure varies a temperature.

## Exercises

- Inline: `cyl1` (Example 10.4, keyed 0.36 mm).
- End of section: 22 `fs-idm178529488` unkeyed, open with an AI approach; 23 `fs-idm82765632` keyed open; 24 `fs-idm187023264` unkeyed, AI approach; 25 `fs-idm183311984` keyed open; 26 `fs-idm91274448` unkeyed, AI approach; 27 `fs-idm92213792` keyed open; 28 `fs-idp26872272` unkeyed numerical, left out; 29 `fs-idm169275296` keyed number 1.7 × 10<sup>−4</sup> m.

## Wanted at chapter level

- eq-capillary-rise → 10.2-capillary-rise

Applied by the chapter pass (2026-09-28): each equation anchored as listed, and its variables anchored with it.
