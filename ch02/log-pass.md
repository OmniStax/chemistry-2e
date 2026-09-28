## Chapter 2, Atoms, Molecules, and Ions, is built and passed

Prompted by: Chen asking for the rest of the book to be built in waves,
with no check-ins. The chapter was prepared in one pass (its `config.md`,
`COLOR.md`, `exploration.md`, the introduction page and its rows), its
seven sections were built in parallel by one agent each, and a chapter
pass tied them together.

## What was built

Eight pages: the introduction and 2.1 to 2.7. Figures 2.1 to 2.32 in the
publisher's order, 2.9 and 2.10 folded into one live figure; 18 live
figures and Sims (the cathode ray, Millikan's drops, the gold foil bench
in 3D, the ion builder that writes its own symbol, the average-mass
balance, the mass spectrometer, the 2D and 3D molecules of 2.4 with the
carvone mirror pair, the ion and formula Sims of 2.6, chromate and
dichromate), the rest kept as the book's photographs. Tables 2.1 to 2.13,
Examples 2.1 to 2.14 with 14 inline checks, 51 exercises in all, 40
concepts, 4 equations and 3 variables (every one anchored), 61 glossary
entries; no new type or symbol. Only the four experiments have a clock.

## Decisions

- The chapter pass anchored every variable and equation and added the
  edges empirical-formula → empirical-formula-from-molecular-formula,
  formula-mass → average-atomic-mass and formula-mass → molecular-formula
  into Chapter 3, and predict-ion-charge → predict-ion-charge-from-group
  and ionic-bond → ionic-and-covalent-bonds into Chapter 7.
- The glossary anchors 2.5 and 2.7 asked for are not written, since a
  glossary row carries no anchor.
- The element palette gained Al, Se, Zr, Pb and Cr, so the figures that
  drew those atoms in the fallback colour now draw them in their own.
- 2.5 builds no periodic table; it keeps Figures 2.26 and 2.27 and links
  the elements page. The three Build a Molecule items of 2.4 are held and
  named, since no figure of the page builds a molecule.
- Two figure captions that spoke of "the book" were reworded.

## Errata

Figure 2.6's caption says "mass-to-charge"; 2.5's glossary prints
"hydrate" and "12–18"; 2.7 prints "Some examples demonstrating this Some
other examples" and the key's "AIF₃·3H₂O"; Table 2.4's summary differs
from its cells. All kept as printed and named in `notes`.

## Checks

`ost check` clean for the chapter, `npm test` (two failures, both in
other chapters), `astro check`, a build, and every page of the chapter in
light and dark in a headless browser with no console error, no blank
canvas, no KaTeX error, no missing image and every inline card present.
