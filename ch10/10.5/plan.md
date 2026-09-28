# Plan: 10.5 The Solid State of Matter (m68770)

Source: `source.md`, converted with `python3 tools/convert.py 10.5`.
Status: built 2026-09-28 without a review stop, on Chen's instruction to finish the book without check-ins (`config.md`); left here for review.

Three learning objectives, nine figures (10.37 to 10.45), Table 10.4, no worked example, one How Sciences Interconnect note (Graphene: Material of the Future), eleven end-of-section exercises (five keyed), eight glossary terms. No Link to Learning. One page.

## Sub-concepts (page headers)

The book's own headers mark the divisions; the page follows them, its two singular headers ("Covalent Network Solid", "Molecular Solid") set in the plural as the section's own summary names the kinds, the book's wording kept in the prose.

1. `crystalline-amorphous` **Crystalline and amorphous solids**: the opening three paragraphs, Figures 10.37 and 10.38 (folded). Introduces `crystalline-and-amorphous-solids`.
2. `ionic-solids` **Ionic solids**: the paragraph and Figure 10.39 (folded into the solids figure). Introduces `types-of-crystalline-solids`.
3. `metallic-solids` **Metallic solids**: the paragraph and Figure 10.40. Uses `types-of-crystalline-solids`.
4. `network-solids` **Covalent network solids**: the paragraph and Figure 10.41. Uses `types-of-crystalline-solids`.
5. `molecular-solids` **Molecular solids**: the paragraph and Figure 10.42. Uses `types-of-crystalline-solids`.
6. `properties` **Properties of solids**: the paragraph, Table 10.4, and the note Graphene: Material of the Future (`note-graphene`) with Figures 10.43 and 10.44. Introduces `classify-crystalline-solid`; reinforces `crystalline-and-amorphous-solids`, `types-of-crystalline-solids`.
7. `defects` **Crystal defects**: the paragraph and Figure 10.45. Introduces `crystal-defects`.

Objectives, the summary (to `summary_html`) and the glossary go to the tables. No key equations.

## Figures

- `sim-order` · Figure 10.37 + 10.38 · crystalline-and-amorphous-solids · morph and variation by slider: the book's two drawings of ordered and disordered particles are one network of the same atoms, which bends from order into disorder when the choice changes, and a temperature slider shows why the ordered network melts at one temperature while the disordered one softens over a range (the text's Properties of Solids paragraph); tier 2 · still: nothing in the idea has a clock; the choice morphs the positions, the slider redraws at once · choice crystalline (quartz) / amorphous (fused silica); slider T (temperature, 1000 to 1800 °C, default 1400, dashed circle at 1713 °C, the melting point) · headline "At 1400 °C none of the 36 Si–O links of crystalline SiO₂ is broken." · graph below: fraction of links broken against T, a step for the crystal and a ramp for the glass, one curve bending into the other · 2D: the book draws both forms as flat nets and the contrast of order with disorder reads from above; a 3D box (the particle-picture default) would add depth and no new view (rule 28.5). Si `F.el('Si')`, O `F.el('O')`, links ink, a broken link dashed and faded. Every link of the crystal has the same length, so it breaks at the one melting point; in the glass each link breaks at a temperature set by how far it is strained, spread between 1100 and 1713 °C. Handbook values the book does not print: 1713 °C for the melting of crystalline SiO₂ and about 1100 °C for the start of fused silica's softening range; named in `notes`. Readout: T against the melting point and the count of broken links. Labels: Si and O named once in a legend; atoms on hover.
- `sim-solids` · Figure 10.39 + 10.40 + 10.41 + 10.42 · types-of-crystalline-solids, classify-crystalline-solid · shape in 3D, variation by choice: the four kinds of solid as crystals the reader turns, the kind of particle and the kind of attraction told by what is bonded to what · still: a crystal answers its choice · select NaCl, Cu, C (diamond), SiO₂, SiC, C (graphite), CO₂, I₂ (the book's own examples in its figures) · headline "Sodium chloride is an ionic solid: Na⁺ and Cl⁻ ions held together by electrostatic attractions." · none · physical 3D (book rule: every crystal structure is 3D), no ground, pitch bounded to ±1.3 rad so the reader never flips the crystal past its poles, yaw free, idle spin on, views "along an axis" and "along a diagonal". Atoms `F.el`; covalent bonds as muted sticks within molecules and networks; no sticks between ions or metal atoms, or between graphite's sheets or separate molecules. The substance fades out and the next fades in. Readout: particles → attractions → properties as Table 10.4 gives them, and the melting point where the text gives it (Cu none; diamond above 3500 °C, CO₂ −78 °C, I₂ 114 °C) in the temperature hue. The I₂ crystal is drawn as molecules lying in parallel planes, tilted alternately, as the book draws it.
- `fig-carbon` · Figure 10.43 · photo, kept: photographs of diamond and graphite with their structures in one image; the note points at it.
- `sim-graphene` · Figure 10.44 · crystalline-and-amorphous-solids (uses) · shape in 3D, morph: one graphene sheet rolls into a nanotube and back, lies in a stack of sheets, or is set beside a buckyball, each turnable · still: the roll is a choice morph · choice sheet, buckyball, nanotube, stacked sheets · headline "A single graphene sheet is one layer of carbon atoms, 1.4 × 10⁻¹⁰ m apart." · none · physical 3D (the shapes are the lesson), no ground, pitch ±1.3, idle spin, views "face on" and "edge on". Carbon `F.el('C')`, bonds muted sticks. Readout: the count of carbon atoms drawn and the C–C distance of Figure 10.43, untyped ink.
- `fig-defects` · Figure 10.45 · crystal-defects · standardisation · still faithful redraw, no controls: a layer of host atoms with a vacancy, two substitution impurity atoms (one small, one large with the layer distorted round it) and an interstitial impurity · none · 2D (a single layer; the book's drawing). The host atoms and impurities carry no element in the book, so the host is ink and the three impurities `F.cat(0..2)`, each labelled as the book labels it (four labels).

Extra simulations, not built: none; the section's ideas are carried above.

## Tables

Table 10.4 in the text as `div.book-table`. The two exercise tables go into their prompts.

## Binds

`temperature` (the slider and axis of `sim-order`, the melting points of `sim-solids`). Element palette for every atom; `F.cat(0..2)` for the defects.

## Exercises

End of section, chapter numbers 76 to 86: `fs-idp61090560` unkeyed, AI approach; `fs-idm10952384` keyed choice (e); `fs-idp95742064` unkeyed choice, open with its options; `fs-idp91522240` keyed open; `fs-idm41685552` unkeyed, AI approach; `fs-idp150351456` keyed open; `fs-idm128882560` unkeyed, AI approach; `fs-idm39063008` keyed open; `fs-idm126229856` unkeyed, AI approach; `fs-idp33413008` keyed choice (b); `fs-idp12717008` unkeyed choice, open with its options. No numerical items, none left out.

## Wanted at chapter level

- none (no equation, no anchor, no new symbol, no edge)

Applied by the chapter pass (2026-09-28): nothing wanted.
