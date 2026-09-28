## Chapter 3 (2026-09-28): Composition of Substances and Solutions is built

Prompted by: Chen asking for the rest of the book to be built in waves,
with no check-ins. The chapter was prepared in one pass (its
`config.md`, `COLOR.md`, `exploration.md`, the introduction page and
its rows), its four sections were built in parallel by one agent each,
and a chapter pass closed over them. The review stops of root rules 2,
5 and 15 are replaced by a `plan.md` per page, left for review.

## What was built

**Introduction** (m68699). The book's paragraph on a swimming pool's
calcium, under Figure 3.1.

**3.1 Formula Mass and the Mole Concept** (m68700). Four page headers.
Figures 3.2, 3.3 and 3.4 are folded into one live Figure of chloroform,
aspirin and sodium chloride, each model drawn flat by default and turned
in 3D on a choice, the salt as a packing of ions. One still Sim carries
the route from grams to moles to entities through Examples 3.3 to 3.8;
five of the examples' six flowcharts are left out for it. Thirteen
figure rows in all, eight Check Your Learning items and nineteen
end-of-chapter exercises of thirty-one.

**3.2 Determining Empirical and Molecular Formulas** (m68702). Figure
3.11 becomes a still Figure: the six-box chart with live values under
two mass sliders and a choice of the section's samples, the formula
unit drawn in element colours. Three figure rows, five Check Your
Learning items, seven exercises of twelve.

**3.3 Molarity** (m68703). A molarity Sim (a balance, the moles, and a
beaker of solute glyphs) and a live dilution Figure folding the
photograph of Figure 3.16, the copper nitrate blue paling as a named
physical colour while C₁V₁ = C₂V₂ holds. Both are flat, argued in the
plan. Four figure rows, eight Check Your Learning items, fourteen
exercises of twenty-five.

**3.4 Other Units for Solution Concentrations** (m68704). A Sim that
reads one mass ratio as a percentage, in ppm and in ppb at once. Five
figure rows, four Check Your Learning items, six exercises of twelve.

The chapter holds 23 concepts on 43 edges, 11 equations and 17
variables (every one anchored), 20 glossary entries and nine new
symbols; no new type. Nothing in it has a clock.

## Decisions

- The chapter pass anchored every variable and equation, added the
  edge molecular-versus-formula-mass → ionic-compounds into Chapter 2
  (the other edges the prep asked for were already rows), and renamed
  the glossary term "Avogadro's number (N<sub>A</sub>)" to "Avogadro's
  number", since the app shows and matches a term as plain text.
- 3.3's "outline the steps" items whose second part is unkeyed are
  left out whole; 3.1's choice among three drawn molecules is kept as
  an open item.
- 3.4 binds mass only; its volumes stay in prose.

## Errata

Example 3.13 writes 8.624 where the line above gives 8.641 mol H; the
key gives 82.24% N for ammonia where the text computes 82.27%; Example
3.24 prints "alchol". All kept as printed and named in `notes`.

## Checks

`ost check` clean for the chapter, `npm test`, `astro check`, a build,
and every page of the chapter in light and dark in a headless browser.
