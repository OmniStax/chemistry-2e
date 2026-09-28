# Plan: 2.6 Ionic and Molecular Compounds (m68696)

Source: `source.md`, converted with `tools/convert.py 2.6`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the plan is left here for review after (`ch02/config.md`).

Three objectives, four numbered figures (2.28 to 2.31, 2.31 inside Example 2.10), one table (2.5), five worked examples (2.8 to 2.12) each with a Check Your Learning, eight glossary terms, six end-of-chapter exercises of which three are keyed, and one Link to Learning note. One page.

## Sub-concepts (page headers)

1. `ions` **Ions and the periodic table**: electrons transferred, Figure 2.28, cations and anions by group, Figure 2.29, Example 2.8 (`ex-ion-composition`) and Example 2.9 (`ex-ion-formation`). Introduces `predict-ion-charge-from-group`.
2. `polyatomic-ions` **Monatomic and polyatomic ions**: the terms, Table 2.5, the -ate, -ite, per- and hypo- names. Introduces `polyatomic-ions`.
3. `bonds` **Ionic and covalent bonds**: the one paragraph that classifies bonds. Introduces `ionic-and-covalent-bonds`.
4. `ionic-compounds` **Ionic Compounds** (the book's header): metal with nonmetal, properties, Figure 2.30, electrical neutrality, the formula Sim, Example 2.10 (`ex-sapphire`, Figure 2.31), polyatomic ions in formulas, Example 2.11 (`ex-polyatomic-formula`), formulas that are not empirical. Introduces `ionic-compounds`, `ionic-compound-formula`.
5. `molecular-compounds` **Molecular Compounds** (the book's header): sharing, properties, nonmetals, Example 2.12 (`ex-bond-type`). Introduces `molecular-compounds`, `predict-bond-type`.

## Figures

- sim-na-cation · Figure 2.28 · predict-ion-charge-from-group, ions-and-atomic-charge · variation by choice: the book draws sodium alone; the reader picks any of the ten elements the section names or relies on and sees the atom and its ion side by side, the electrons lost or gained standing between them and the ion's electron count matching the noble gas beside it · still, an atom and its ion have no clock · one dropdown (discrete states, rule 26.1): sodium (default, the book's picture), magnesium, aluminum, calcium, nitrogen, oxygen, sulfur, chlorine, selenium, bromine · headline "A sodium atom loses one electron to form Na⁺, which has 10 electrons, as many as an atom of neon." · readout: charge = protons − electrons with the result in the `charge` hue, a small line naming the ion · no graph · 2D (an atom drawn for counting, as in 2.3; shells are not yet taught, so the electrons sit on one dashed ring). The cloud is tinted in the element's colour through `F.el`, the ion's cloud drawn smaller for a cation and larger for an anion as the book draws it; electrons `F.el('e-')` with a minus stroke, the nucleus an ink disc with its counts written beside it; hover names every electron and the nucleus. The element switch fades the panels in with `choice.k`.
- sim-ionic-formula · Sim · ionic-compound-formula, ionic-compounds, polyatomic-ions · variation by choice: the formula of an ionic compound written from the charges, with the ions laid out in the ratio that makes the positive and negative charges equal, which the text states in words · still, the balance is a count and has no clock · two dropdowns: cation (Na⁺, K⁺, Li⁺, Mg²⁺, Ca²⁺, Sr²⁺, Ba²⁺, Al³⁺, NH₄⁺) and anion (F⁻, Cl⁻, Br⁻, I⁻, O²⁻, S²⁻, N³⁻, OH⁻, CN⁻, NO₃⁻, ClO₄⁻, H₂PO₄⁻, O₂²⁻, CO₃²⁻, SO₄²⁻, HPO₄²⁻, PO₄³⁻), default Al³⁺ and O²⁻, Example 2.10's sapphire · headline "Two Al³⁺ ions and three O²⁻ ions carry six positive and six negative charges, so the formula is Al₂O₃." · readout: n₊ × (charge) + n₋ × (charge) = 0 with the charges in the `charge` hue, the small line naming the compound's ions · no graph; a strip of unit charges beneath the ions, positive filled and negative outlined, both in the charge hue with their sign strokes in ink · 2D. Monatomic ions are element-coloured discs through `F.el`, polyatomic ions small clusters of element-coloured atoms; each ion carries its charge beside it in the charge hue; each row labelled once with its ion and count, hover names each ion. New ions arrive staggered on a change (LaggedStart). The defaults and options reproduce Examples 2.10 and 2.11 and their Check Your Learning items (Na₂S, Li₂O₂) and exercise fs-idp178456496.

Figure 2.29 (common ion charges on the periodic table) is kept as the book's image (`photo` row with its number), with the elements page linked in its paragraph: a live redraw would be a second full table, which the chapter's config rules out, and standardisation alone makes a faithful copy.

Photographs: Figure 2.30 (molten sodium chloride lighting the bulb) kept: the text points at it and it shows the conduction the passage describes. Figure 2.31 (the sapphire ring) kept: the example points at it and its caption carries a fact (trace iron and titanium give the colour).

Extra simulations: none. A periodic-table Sim for Example 2.12 would be a second table; the elements page linked from the paragraph serves.

## Tables

Table 2.5 Common Polyatomic Ions as `div.book-table`, printed with the four columns of its cells (name, formula, related acid, formula), not the three of its summary.

## Exercises

Check Your Learning: cyl1 (Example 2.8, Se²⁻), cyl2 (Example 2.9, Al³⁺ and C⁴⁻), cyl3 (Example 2.10, Na₂S), cyl4 (Example 2.11, Li₂O₂), cyl5 (Example 2.12, four compounds); each open with the book's answer, under a `data-place` host in its example.

End of chapter (6): kept keyed fs-idp298677568, fs-idp221295264, fs-idp178456496, all open with the key. Left out and named: fs-idp44267360, fs-idp4856416, fs-idp286976176 (unkeyed, definite answers).

## Binds

`charge`: the ion's charge in Figure 2.28's readout and the charges and their totals in the formula Sim. Counts of protons, electrons and ions, and subscripts, are ink.

## Wanted at chapter level

- `omnistax-web/src/lib/fig/elements.ts` has no hue for Al or Se, which Figure 2.28 and the formula Sim draw; they fall back to `other` (pink). A CPK value for each would be better (Al is conventionally a pale pink-gray, Se a light orange).

**Applied by the chapter pass (2026-09-28).** The element palette now carries Al and Se; Figure 2.28 and the formula Sim draw them in their own colours. The edge predict-ion-charge (7.1) → predict-ion-charge-from-group is staged in `ch07/book-rows.json` and merged, with ionic-bond → ionic-and-covalent-bonds.
