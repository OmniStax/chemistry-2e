# Plan: 2.3 Atomic Structure and Symbolism (m68692)

Source: `source.md`, converted with `tools/convert.py 2.3`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the plan is left here for review after (`ch02/config.md`).

Three objectives, five numbered figures (2.11 to 2.15, 2.12 inside Example 2.3), three tables (2.2 to 2.4) and the unprinted Key Equations table, three worked examples (2.3 to 2.5) each with a Check Your Learning, three equations, eleven glossary terms, seventeen end-of-chapter exercises of which eight are keyed, and five Link to Learning notes. One page.

## Sub-concepts (page headers)

1. `inside-the-atom` **A small nucleus inside a large atom**: the opening paragraph, the sizes of atom and nucleus, Figure 2.11.
2. `units` **Units for the very small**: the atomic mass unit, the dalton and the fundamental unit of charge; the masses and charges of the three particles; Table 2.2. Introduces `atomic-mass-unit`; the variable `e` anchors here.
3. `atomic-number` **Atomic number and mass number**: Z, A and A − Z with the equation `eq-nucleon-numbers`. Introduces `atomic-number-and-mass-number`; `Z`, `A` anchor here.
4. `ions` **Ions: atoms with a charge**: atomic charge, anions and cations, sodium and oxygen, `eq-atomic-charge`; Example 2.3 (`ex-composition`, Figure 2.12) with its Check Your Learning. Introduces `ions-and-atomic-charge`, `composition-of-an-atom`.
5. `chemical-symbols` **Chemical Symbols** (the book's header): Figure 2.13, Table 2.3, capitals, naming of new elements. Introduces `chemical-symbols`; "Appendix A" links the elements page.
6. `isotopes` **Isotopes** (the book's header): the isotope symbol, magnesium's three isotopes, Figure 2.14, Table 2.4, deuterium and tritium. Introduces `isotope-symbols`.
7. `atomic-mass` **Atomic Mass** (the book's header): the weighted average, `eq-average-atomic-mass`, boron worked, the average-mass Sim, Example 2.4 (`ex-average-mass`) and Example 2.5 (`ex-abundance`), each with its Check Your Learning. Introduces `average-atomic-mass`, `isotopic-abundance-from-average-mass`.
8. `mass-spectrometry` **Measuring isotopes with a mass spectrometer**: oxygen-18 and Mildred Cohn, the mass spectrometer, Figure 2.15. Introduces `mass-spectrometry`.

## Figures

- sim-atom-symbol · Figure 2.14 · isotope-symbols, ions-and-atomic-charge, atomic-number-and-mass-number, composition-of-an-atom · variation by slider: the reader builds the atom and the symbol writes itself, its three numbers moving with the particles they count, which the still anatomy cannot do · still, nothing here has a clock · sliders protons (1 to 12, untyped), neutrons (0 to 14, untyped), electrons (0 to 14, untyped); defaults 2, 2, 0, the book's ⁴₂He²⁺ · headline names the atom or ion ("helium-4 cation, charge 2+, stable") · readout: atomic charge = protons − electrons in the `charge` hue, a small line A = Z + neutrons · no graph · 2D (a symbol and a counting picture; a shell drawing is not yet taught, so the electrons sit on one dashed ring for counting only). Protons, neutrons, electrons are drawn with `F.el('p+'|'n0'|'e-')`, named in a legend and by hover; the symbol's three parts are labelled with leaders as the book does. The 1–12 range reaches the book's second symbol, ²⁴Mg²⁺, and the stable isotopes of H to Mg are a fact list in the code, so the headline says stable or unstable, which carries the Build an Atom exercises.
- sim-average-mass · Sim · average-atomic-mass, isotopic-abundance-from-average-mass · variation by slider: the average is the balance point of the isotope bars on a mass axis and slides as the mix changes · still · choice (dropdown) of element: boron (text, 19.9 %), neon (Example 2.4's solar wind, 91.84 / 0.47 / 7.69 %), chlorine (Example 2.5's result, 75.76 %), lithium (Table 2.4, 7.59 %); one percent slider per isotope but the last (untyped, ink), the last isotope taking the rest; dashed circles at the natural abundance (Table 2.4 or the text) labelled "nature" · headline states the average · readout the book's sum with the live fractions, masses and products in the `mass` hue, the products rounded as shown and added as shown · no graph beyond the axis · 2D. Isotope bars in `F.cat(i)`, the fulcrum and average marker in the mass hue.
- sim-mass-spec · Figure 2.15 · mass-spectrometry, average-atomic-mass · flow by animation: ions leave the source, bend in the field (the lighter ones more) and pile up as peaks, which the still cannot show · moving: the ions fly and the peaks grow over one 5 s cycle, then hold; the clock is the flight of the ions · choice of element: zirconium (the book's default), boron, neon, chlorine, with natural abundances · headline names the element and its isotopes · readout: average mass from the peaks, `mass` hue · spectrum beside the instrument (relative abundance against mass-to-charge ratio, ink per `ch02/COLOR.md`) · 2D, argued against the book's bench rule: the lesson is a path bending in one plane and the spectrum it writes, and a turned bench adds no view the flat plan lacks (root rule 28.5). The spread of the paths is exaggerated (the true difference in radius between Zr-90 and Zr-96 is about 3 %), and a note under the spectrum says so (rule 28.4). Ions in the element's colour through `F.el`, each with a small + in ink.

Photographs: Figure 2.11 (atom, stadium, blueberry) kept as `photo`: the text points at it, and a scale of 10⁵ cannot be drawn live at any useful size. Figure 2.12 (goiter, iodized salt) kept: the example points at it and it shows what the example is about. Figure 2.13 (the jar of mercury) kept: the text points at it.

Extra simulations: none beyond the Sim above; it takes the place of the PhET Isotopes and Atomic Mass link, as Figure 2.14 takes Build an Atom's.

## Tables

Table 2.2 Properties of Subatomic Particles, Table 2.3 Some Common Elements and Their Symbols, Table 2.4 Nuclear Compositions of Atoms of the Very Light Elements (rowspans kept) as `div.book-table`. The Key Equations table is not printed. Table 2.4's cells are printed, not its summary (errata).

## Exercises

Check Your Learning: cyl1 (Example 2.3, platinum ion, multi), cyl2 (Example 2.4, magnesium, 24.31 amu), cyl3 (Example 2.5, copper, multi); each under a `data-place` host in its example.

End of chapter (17): kept keyed fs-idm174365776, fs-idm187202528, fs-idm80933584, fs-idp165798448 (number), fs-idm95116240 (multi); simulation-exercise fs-idm164758784 and fs-idm103886288 rewritten against Figure 2.14, fs-idm112612912 rewritten against the average-mass Sim, the book's answers kept; unkeyed conceptual fs-idp67066944 and fs-idm4055376 kept with an AI-marked suggested approach. Left out and named: fs-idm2862432, fs-idm75926528, fs-idp18872976, fs-idm201300912, fs-idp15704448 (unkeyed, definite answers), fs-idp1819392 and fs-idm28786800 (unkeyed simulation items).

## Binds

`charge` (Figure 2.14's net charge) and `mass` (the isotopic and average masses of the Sim and Figure 2.15). Z, A, counts, percents, abundances and mass-to-charge ratio are ink.

## Wanted at chapter level

- variable e → 2.3-units
- variable Z → 2.3-atomic-number
- variable A → 2.3-atomic-number
- equation eq-nucleon-numbers → 2.3-atomic-number
- equation eq-atomic-charge → 2.3-ions
- equation eq-average-atomic-mass → 2.3-atomic-mass

**Applied by the chapter pass (2026-09-28).** All six anchors set as listed. The Figure 2.14 caption no longer speaks of "the book’s drawing"; it opens on "a helium ion". Zirconium in `sim-mass-spec` takes the palette's new Zr colour.
