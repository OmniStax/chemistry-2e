## Pass (2026-09-28): Chapter 4, Stoichiometry of Chemical Reactions, is built

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Six pages: the chapter introduction in `ch04/intro/` with
Figure 4.1, and the five sections 4.1 to 4.5, none of them folded. Thirty
figure rows across them, numbered 4.1 to 4.18 as the publisher numbers them
with no gap: photographs kept where the text points at them (4.1, 4.4, 4.6 to
4.10, 4.12, 4.15 to 4.17), the book's drawings redrawn as live Figures (the
methane reaction of 4.2 folded with the mixtures of 4.3, the dissolving acid
of 4.5, the ten-box route chart of 4.11, the sandwich and the hydrogen and
chlorine box of 4.13 and 4.14, the combustion train of 4.18), the unnumbered
route boxes of Examples 4.8 to 4.11 and 4.14 to 4.16 as still copies with each
box in the hue of what it holds, and six Sims that replace nothing: a
balancing bench (4.1), a mixing bench for twelve soluble salts (4.2), the
ammonia ratio at any count (4.3), the silicon nitride masses and a percent
yield (4.4), and a titration (4.5). Two figures carry a clock, the acid
entering the water and the titrant leaving the buret; every other figure is
still, and every figure is flat. Sixty-six exercises, sixteen of them the
Check Your Learning items placed inline after their examples, each with its
host; the end-of-chapter items are the forty-eight the key answers plus two
unkeyed conceptual questions kept with a suggested approach. Twenty-nine
concept nodes with fifty-seven prerequisite edges; forty-nine glossary
entries, three equations and one variable in `chapter.json`; Tables 4.1 and
4.2 kept in 4.2 as `div.book-table`.

What the chapter pass changed. Fourteen prerequisite edges staged and merged:
the chemical equation now rests on molecular formulas and ionic equations on
ionic compounds (Chapter 2), oxidation numbers on ions and atomic charge, mole
stoichiometry on the mole and Avogadro's number, mass stoichiometry on molar
mass, mass–mole conversion and molarity, the titration calculation on
molarity, combustion analysis on the empirical formula, gravimetric analysis
on percent composition, theoretical yield on Dalton's atomic theory, and
within the chapter the limiting reactant on the coefficients read as ratios
and its identification on mass–mole conversion. The three equation rows and
the variable M are anchored in the text of 4.4 and 4.5. Each section's plan
records what it asked for and what was applied.

Decisions. No exercise moved between sections. Two keyed items of 4.3 that
point at the reactions of an unkeyed exercise carry those reactions in their
own prompts. Molarity, the stoichiometric factor, coefficients, subscripts
and every percent stay ink; the route boxes of the book, shaded by kind, take
the type hue of the quantity each holds.

Errata, carried as printed and named in `notes`: the key's MgC1₂ with a digit
one (4.1), "(2 × 3+) = 6 +" in Example 4.7 (4.2), CO₂(s) in an unkeyed item of
4.4 (left out); a stray `**` in the key of Example 4.6 is dropped.

Checks. `ost check chemistry-2e` reports no errors and the two standing sheet
warnings. `npm test`, `astro check` and a build of the book pass, and every
page of the chapter was opened in light and dark with no console error, no
blank canvas, no KaTeX error, no missing image and every inline card present.
