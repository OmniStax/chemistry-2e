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

- `sim-caprise` · Figure 10.20 · capillary-action, capillary-rise-equation, cohesive-and-adhesive-forces · value add: variation (the reader picks the liquid and the tube diameter and reads the rise, or the fall, off a centimetre scale: the book's picture has no numbers and draws its tubes alike, so the inverse dependence on the radius and the dependence on T and ρ are only in words) · arrows: none · still: the equation gives the height the column rests at, and how fast it gets there is not taught; a change of liquid bends the columns and the menisci from one state to the other (choice morph) · choice liquid (select: water, ethanol, ethylene glycol, mercury, the Table 10.3 liquids less octane, which shows nothing ethanol does not), slider d (length; 0.20 to 2.00 mm, opens at 0.25 mm, a special circle there labelled Example 10.4) · headline "Water rises 11.8 cm in the 0.25 mm tube and 5.9 cm in the 0.50 mm tube." (mercury: "falls") · no graph: the scale beside the tubes is the reading, and the two tubes d and 2d show the halving · 2D: a height against a scale; the 3D bench of `exploration.md` adds no view. Tube widths are drawn 20 times their true size against the height scale and the figure says so (root 28.4); the close-up has its own scale. Liquids: water, ethanol and ethylene glycol a pale ink fill, mercury `F.el('Hg')` as in 9.1's barometer; the glass of each tube in its referent's colour (narrow, wide); the beaker in ink (the beaker referent is gone: nothing in the text points at it). Data: T from Table 10.3; ρ 1.00 (Example 10.4's water), 0.789, 1.11 and 13.53 g/cm³; θ 0° for the three liquids that wet glass (the book's value for water) and 140° for mercury, a handbook value the book does not print; g = 9.8 m/s². Labels: d and 2d with their values under the tubes, the two heights beside their brackets (outer side of the wide tube, inner side of the narrow tube, so neither meets the guide lines to the close-up), 2r and θ in the close-up, one line under it on adhesion against cohesion. Hover names for the tubes, the liquid, the glass and the meniscus. Readout: one line, h = 2T cos θ/(rρg) = numbers = result, for the narrow tube.
  works: parts: a glass beaker (pouring lip, rounded floor) half full of the chosen liquid; two glass capillary tubes standing upright in it, open at both ends, their bottoms below the surface and clear of the floor, inner diameters d and 2d; in each tube a column of the same liquid, joined through the open bottom to the liquid in the beaker and ending in a meniscus; a centimetre scale with 0 at the flat surface outside the tubes, a dashed line joining the two; a box on the narrow tube's meniscus joined by two guide lines to a magnifying circle that holds the narrow tube's two glass walls, the liquid, its meniscus meeting the wall at θ, and 2r across the inside wall to wall · flow: none · must hold: each column is continuous with the beaker's liquid through the tube's open bottom; water, ethanol and ethylene glycol curve up at the walls (concave) and stand above the outside surface, mercury curves down at the walls (convex) and stands below it, the tube above a mercury column empty down to the column; the narrow tube's column stands twice as far from the surface as the wide tube's at every d and liquid; each height runs from the outside surface to the centre of the meniscus and agrees with the scale, the headline and the readout (water at 0.25 mm: 11.8 cm, the book's 0.12 m); the tube bottoms stay below the deepest column (mercury at 0.20 mm, −5.3 cm) and the tops above the highest (water at 0.20 mm, 14.7 cm); the close-up shows the same liquid and meniscus as the narrow tube, 2r spans the inside of the tube, and θ is measured through the liquid from the wall to the surface · read off the image: two beakers labelled "water" (blue; both tubes above the surface; "Capillary attraction") and "mercury" (grey; both tubes below it; "Capillary repulsion"), two tubes in each labelled "Capillary tubes", open at both ends, bottoms near the floor; a lone tube with a box on its meniscus and an arrow to a circle with "2r" across the inside of the tube; no numbers, and the book's tubes are drawn alike, so the narrower-is-higher relation of the text is not in the picture. The alt text agrees with the image.

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

## Derivations

- `capillary-rise`, h = 2T cos θ/rρg · score 7 · not built: a formula the book states, with no claim that it follows from anything; the force balance is told only in words, and the weight of the column rests on weight = mg, which the book never states.

## Figure re-examination, 2026-11-14 (Claude Opus 5.5)

`sim-caprise` rebuilt. Against the book's image it was correct in its science (the heights follow the equation, water rises and mercury falls, the contact angle is drawn through the liquid) but drawn like a toy: the tubes were bare coloured stripes with no glass, a 0.25 mm tube was 5 units wide so its column and meniscus could not be seen, the beaker was an empty purple outline far from its scale, and the caption ran to seven sentences. The beaker referent is removed (nothing in the text points at the beaker once the caption is cut). Widths are now drawn 20 times true size, the tubes are glass with open ends, the scale stands beside the beaker, and a box on the narrow meniscus leads to the close-up.

