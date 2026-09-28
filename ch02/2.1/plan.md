# Plan: 2.1 Early Ideas in Atomic Theory (m68685)

Source: `source.md`, converted with `tools/convert.py 2.1`. Status: built 2026-09-28 without a review stop, on Chen's instruction to finish the book without check-ins (`ch02/config.md`); the plan is left here for review after.

Two objectives, five postulates, Figures 2.2 to 2.5, Table 2.1, Examples 2.1 and 2.2 each with a Check Your Learning, four end-of-chapter exercises (two keyed), four glossary terms, no key equation, no boxed note and no Link to Learning. One page (root rule 11).

## Sub-concepts (page headers)

1. `daltons-postulates` **Dalton’s atomic theory** (book: the Greek philosophers, Aristotle’s four elements, Dalton’s hypothesis and his five postulates with Figures 2.2 to 2.4, the paragraph tying the theory to the conservation of matter, Example 2.1 with its Check Your Learning). Introduces `daltons-atomic-theory`.
2. `definite-proportions` **The law of definite proportions** (book: Proust’s finding, the law of definite proportions or constant composition, Table 2.1 on isooctane, and the note that the converse is not true). Introduces `law-of-definite-proportions`.
3. `multiple-proportions` **The law of multiple proportions** (book: the law, the two copper chlorides and their ratio of ratios, the atomic explanation, Figure 2.5, Example 2.2 with its Check Your Learning). Introduces `law-of-multiple-proportions`.

Examples are Example 2.1 (`ex-testing-dalton`) and Example 2.2 (`ex-proportions`), the publisher’s numbers. The objectives and glossary go to the tables and the Key Concepts and Summary to `summary_html`.

## Concept nodes (already in book.json)

`daltons-atomic-theory` (introduced in `daltons-postulates`, reinforced in `multiple-proportions`), `law-of-definite-proportions` (introduced in `definite-proportions`, used in `multiple-proportions`), `law-of-multiple-proportions` (introduced in `multiple-proportions`). Used from Chapter 1: `atoms-and-molecules`, `elements-and-compounds`, `conservation-of-matter` (postulates), `chemical-property` is not leaned on and is not tagged.

## Binds

`mass` only (`ch02/COLOR.md`): the grams of carbon and hydrogen in the isooctane Sim and the grams of copper and chlorine in Figure 2.5. A mass ratio is ink. Atoms are in the element palette through `F.el` (copper brown, oxygen red, chlorine green, carbon and hydrogen in their book colours); the example drawings’ unnamed “green” and “blue” elements have no identity and take `F.cat`.

## Figures

- `fig-penny` · Figure 2.2 · photo, kept: the text points at it and it shows the thing the postulate is about, a real copper penny beside its atoms.
- `fig-copper-oxide` · Figure 2.3 · photo, kept: the text points at it and it shows the black powder the postulate’s 1:1 ratio describes.
- `sim-copper-oxygen` · Figure 2.4 · `daltons-atomic-theory` (postulate 5), `conservation-of-matter` · value add: flow by morph, which the two still bottles leave to the imagination; the reader switches the choice between the elements and the compound and sees each copper and oxygen atom travel from the metal block and the O₂ pairs to its place in copper(II) oxide, none made and none lost · still, a choice morph with no clock (the change is a before and an after, not a rate) · choice `sample` (the elements, the compound), untyped · headline counts the copper and oxygen atoms and names the state · no graph · 2D: a particle picture of small clusters whose lesson is a count, not an arrangement in space (`ch02` notes: the Dalton pictures read well flat). Labels: three region names; atoms by legend and hover names.
- `sim-isooctane` · Sim (serves Table 2.1) · `law-of-definite-proportions` · value add: variation; the sample’s mass is a slider with detents at the book’s samples A, B and C, the grams of carbon and hydrogen grow and shrink together on a fixed 0–30 g axis while the strip beneath, rescaled to 1.00 g of hydrogen, never moves · still: the bars answer the slider · slider `sample mass` (mass, 5–30 g, default sample A, 17.60 g, detents at A 17.60 g, C 23.04 g and B 26.52 g) · headline states the grams of each element and the 5.33 ratio · strip bars, no graph · 2D.
- `sim-copper-chlorides` · Figure 2.5 · `law-of-multiple-proportions`, `daltons-atomic-theory` · value add: variation; the mass of copper is a slider (mass, 0.50–5.00 g, default 1.00 g as in the text), and the chlorine each compound holds is drawn as a bar beneath its flat particle picture, the brown compound’s always twice the green’s, so the ratio of ratios reads 2/1 at every setting · still: the idea has no time in it · headline states the two chlorine masses · bars beneath the two panels · 2D flat pictures: a 1:1 lattice of copper and chlorine for (a) and a chain with two chlorine atoms per copper for (b), since the lesson is the count of chlorine per copper, not the crystal’s shape. Readout: the ratio of the two mass ratios with the live masses in the mass hue.
- `fig-dalton-test` · Figure (unnumbered, Example 2.1, `Dalton6_img`) · faithful copy redrawn so that it reads in both themes, still, no sliders; `F.cat` for the two unnamed elements with a legend; readout counts the spheres as the solution does.
- `Dalton8_img` (the Check Your Learning’s drawing) and `Dalton10_img` (exercise `e1`) stay as the book’s images in their cards, through the exercise’s `figure` field, since the prompt reads “the following drawing” and the card is where the reader answers; a redrawn copy in the text would sit apart from its question.

Extra simulations: none; the three live figures cover the section’s three ideas.

## Exercises

- `cyl1` (fs-idp149298560, after `ex-testing-dalton`), `cyl2` (after `ex-proportions`): check-your-learning, open, the book’s answers.
- `e1` fs-idp69222896 keyed, open, with its image. `e2` fs-idp28065472 unkeyed conceptual, open, AI suggested approach. `e3` fs-idm83132240 keyed, open. `e4` fs-idp146757152 unkeyed, kept as the judgment it asks for (config’s one judgment call) with an AI suggested approach that gives the method and not the conclusion.

## Wanted at chapter level

- None: no anchors (no variables or equations in 2.1), no concept, edge or symbol fixes.

**Applied by the chapter pass (2026-09-28).** Nothing to apply.
