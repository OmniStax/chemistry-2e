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

- sim-na-cation · Figure 2.28 · predict-ion-charge-from-group, ions-and-atomic-charge · variation by choice: the book draws sodium alone, as two plain spheres with the counts in words; the reader picks any of the ten elements the section names or relies on and sees the atom and its ion side by side with every electron countable, the electrons lost or gained standing between them and marked on the ion · arrows: one, atom to ion, symbolic · still, an atom and its ion have no clock · one dropdown (discrete states, rule 26.1): sodium (default, the book's picture), magnesium, aluminum, calcium, nitrogen, oxygen, sulfur, chlorine, selenium, bromine · headline "A sodium atom loses one electron to form Na⁺, which has 10 electrons, as many as an atom of neon." · readout: charge = protons − electrons = 11 − 10 = 1+ with the result in the `charge` hue, one line, nothing under it · no graph · 2D (an atom drawn for counting, as in 2.3; shells are not yet taught, so the electrons sit on one dashed ring). The cloud is tinted in the element's colour through `F.el`; electrons `F.el('e-')` with a minus stroke, the nucleus an ink disc; hover names every electron and the nucleus. The element switch fades the panels in with `choice.k`.
  works: parts: (a) the atom: a nucleus at the centre of a round electron cloud; (b) its ion: the same nucleus in a cloud of a different size; an arrow from (a) to (b) with the electrons that are lost or gained above it · flow: none drawn moving; the arrow says the atom becomes the ion · must hold: (1) the atom has as many electrons as protons, and the ion's electrons are Z − charge, countable on the ring; (2) the nucleus is the same in both panels (same protons and neutrons under each); (3) a cation's cloud is smaller than its atom's and an anion's is larger, and every neutral atom is drawn the same size, since the drawing makes no claim about one element's size against another's; (4) in the ion, each electron lost leaves an empty dashed place and each electron gained wears a ring, as many as the charge; (5) the counts under each panel, the headline and the readout agree at every element; (6) "nucleus" and "electron" are named once, on the atom, and no label covers the thing it names · read off the image: two purple spheres, the left (Na atom, (a)) larger than the right (Na⁺ ion, (b)) by about a fifth in radius; a small red nucleus at each centre labelled "Nucleus (11 protons, 12 neutrons)"; "11 electrons" on (a) and "10 electrons" on (b). The image draws no single electrons; ours does, which is the gain. The alt text agrees with the image.
  Rebuilt 2026-11-14: the atoms were small in a tall stage, the nucleus's counts sat on the cloud, nothing said how many electrons each panel had (the book's image does), the ring grew with Z as if bromine were larger than sodium, selenium's nucleus had 45 neutrons (the commonest isotope, selenium-80, has 46), and the headline read "A aluminum atom". The small line under the readout went; "a cation" or "an anion" is now in the ion's name.
- sim-ionic-formula · Sim · ionic-compound-formula, ionic-compounds, polyatomic-ions · variation by choice: the formula of an ionic compound written from the charges; two bars of unit charges, positive over negative, are built from the ions' own blocks (three cells for Al³⁺, two for O²⁻), and the ions are as many as make the bars end together, which the text states in words · arrows: none · still, the balance is a count and has no clock; new ions fade in one after another on a change (LaggedStart) · two dropdowns: cation (Na⁺, K⁺, Li⁺, Mg²⁺, Ca²⁺, Sr²⁺, Ba²⁺, Al³⁺, NH₄⁺) and anion (F⁻, Cl⁻, Br⁻, I⁻, O²⁻, S²⁻, N³⁻, OH⁻, CN⁻, NO₃⁻, ClO₄⁻, H₂PO₄⁻, O₂²⁻, CO₃²⁻, SO₄²⁻, HPO₄²⁻, PO₄³⁻), default Al³⁺ and O²⁻, Example 2.10's sapphire · headline "Two Al³⁺ ions and three O²⁻ ions carry six positive and six negative charges, so the formula is Al₂O₃." · readout: n₊ × (charge) + n₋ × (charge) = 0 with the charges in the `charge` hue; a small line only when a polyatomic ion is needed more than once, saying it goes in parentheses · no graph · 2D. Monatomic ions are element-coloured discs through `F.el`, polyatomic ions small clusters of element-coloured atoms; each ion carries its charge beside it in the charge hue and is tied by a bracket to its block of cells; positive cells are filled and negative ones outlined, both in the charge hue; each row is labelled once with its count, ion and name, hover names each ion and each block; the formula stands large at the right. The defaults and options reproduce Examples 2.10 and 2.11 and their Check Your Learning items (Na₂S, Li₂O₂) and exercise fs-idp178456496.
  works: read off the image: no image; the ions and charges are those of the section's text, Table 2.5 and Figure 2.29 · must hold: (1) the two bars are the same length at every pair, and each has as many cells as the total charge; (2) each ion's block has as many cells as its charge and the ion stands centred on it; (3) the counts are the smallest whole numbers that balance (CaS, not Ca₂S₂; Li₂O₂ keeps the peroxide ion whole); (4) a polyatomic ion taken more than once is in parentheses in the formula, a single one is not; (5) the formula fits beside the bars at the longest case ((NH₄)₂HPO₄, Sr(H₂PO₄)₂); (6) headline, row labels, bars and readout give the same numbers.
  Rebuilt 2026-11-14: the old strip of unit charges sat under the ions with nothing joining a charge to the ion that carries it, so it only repeated the totals; now the bars are made of the ions' blocks and the reader sees why two 3+ ions meet three 2− ions at six. The caption was cut to one sentence and the "formula" tag and the line naming the ions under the readout were dropped (the names stand in the row labels).

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
