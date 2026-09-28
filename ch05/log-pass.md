## Pass (2026-09-28): Chapter 5, Thermochemistry, is built

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Four pages: the chapter introduction in `ch05/intro/` with
Figure 5.1 and its one footnote, and the three sections 5.1 to 5.3, none of
them folded. Twenty-one figure rows across them, numbered 5.1 to 5.24 as the
publisher numbers them, with the collage of Figure 5.2 dropped and the folds
named on their rows: photographs kept where the text points at them (5.1, 5.3,
5.5, 5.7 to 5.10, 5.13, 5.15 to 5.18, 5.20 to 5.23), the fast and slow
molecules of 5.4 and 5.6 folded into one moving Figure in three dimensions,
the coffee cup calorimeter of 5.11, 5.12 and 5.14 folded into one moving flat
Figure, the first-law diagram of 5.19 and the Hess ladder of 5.24 redrawn as
still Figures, and one Sim that replaces nothing, a heating bench over the
sixteen substances of Table 5.1. Two figures carry a clock, heat flowing to
equilibrium and a calorimeter settling; every other figure is still.
Sixty-eight exercises, sixteen of them the Check Your Learning items placed
inline after their examples, each with its host; the end-of-chapter items are
the forty-three the key answers plus nine unkeyed conceptual questions, or parts of one, kept
with a suggested approach. Twenty-three concept nodes with forty-seven
prerequisite edges; thirty-two glossary entries, twelve equations and twenty
variables in `chapter.json`; Tables 5.1 and 5.2 kept as `div.book-table`.

What the chapter pass changed. Every equation and variable row anchored to
the span that introduces it. Eight prerequisite edges staged and merged now
that Chapters 3 and 4 are in the book: thermochemical equations rest on
balanced equations, the limiting reactant, mass and mole conversion and molar
mass; the enthalpy of combustion on mass and mole conversion and molar mass;
reaction enthalpies from formation enthalpies on balanced equations; coffee
cup calorimetry on molarity. Section 5.3 binds energy alone, since no figure
draws PΔV, and `COLOR.md` says so.

Errata carried as printed and named in `notes`: Example 5.4's 4.18 and 4.184,
Example 5.5's "1.34 × 10³ kJ, or 1.34 kJ", Example 5.7's −48.8 and 48.7 kJ,
the ethanol equation's "(g+", Table 5.2's isooctane −5465.5 against −5460,
Example 5.9's "perchlorate", Example 5.15's −136.80 and −138.4 kJ; the book's
º in two keys is written °.

Checks: `ost check` and the content check clean for the book, `npm test`,
`astro check`, a build, and every page of the chapter in a headless browser
in light and dark.
