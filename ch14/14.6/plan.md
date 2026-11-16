# Plan: 14.6 Buffers (m68808)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

Two objectives, four numbered figures (14.14 to 14.17), one unnumbered ICE-table image, no numbered table, one worked example (14.20) with its Check Your Learning, two boxed notes (Portrait of a Chemist, Medicine), one Link to Learning, fifteen end-of-section items (chapter exercises 77 to 91), three glossary entries, three key equations.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `buffers` | Buffer solutions (the section's own introduction, Figure 14.14) | introduces `buffer-composition`; uses `conjugate-acid-base-pairs`, `weak-acid`, `ph` |
| `how-buffers-work` | How Buffers Work (the book's header; the Figure 14.15 + 14.17 fold; Example 14.20 with its ICE table) | introduces `how-buffers-work`, `buffer-ph-calculations`; uses `le-chateliers-principle`, `neutralization-reaction`, `weak-acid-base-equilibrium-concentrations`, `ph-plus-poh` |
| `capacity` | Buffer Capacity (the book's header; Figure 14.16) | introduces `buffer-capacity`; uses `buffer-composition` |
| `selection` | Selection of Suitable Buffer Mixtures (the book's header; the two rules of thumb, blood) | reinforces `buffer-capacity`, `how-buffers-work` |
| `henderson-hasselbalch` | The Henderson-Hasselbalch Equation (the book's header; the Portrait of a Chemist and the Medicine note) | introduces `henderson-hasselbalch`; uses `acid-ionization-constant`, `ph` |

## Figures

- sim-buffer · Figure 14.15 + 14.17 · how-buffers-work, buffer-capacity, buffer-ph-calculations, henderson-hasselbalch · variation by slider and choice, and a comparison the book never draws: the same addition goes into the buffer and into the unbuffered solution of Example 14.20, and the reader sees where it went. In the buffer it has turned one partner into the other and almost none is left as OH⁻ or H₃O⁺; in the unbuffered solution, which holds neither partner, all of it is left, so its pH leaps. Dragged far enough the consumed partner runs out and the buffer's pH leaps too · arrows: symbolic (the book's "Add H₃O⁺" to the left and "Add OH⁻" to the right name an operation, and become the two halves of one slider and one axis) · still: adding acid or base is an amount, not a clock; the drip of a titration belongs to 14.7 · slider added (`volume`, 120 mL of 0.10 M HCl through nothing to 120 mL of 0.10 M NaOH, step 0.1 mL, default 1.0 mL of NaOH, Example 14.20; dashed circles at the buffer capacity either way, where the consumed partner is 11% of the other and the pH has moved one unit: 80.2 mL at 0.10 M, 40.1 mL at 0.050 M, 20.0 mL at 0.025 M); choice each buffer partner (0.025 M · 0.050 M · 0.10 M, default 0.10 M, the book's; the text's "more concentrated buffer has the greater capacity at the same pH" is the plateau widening in proportion) · no headline: each panel's title carries its solution's name and "pH 4.74 → 10.99" · bars above, graph below · 2D, bar charts and a graph (book rule) · two panels on one fixed scale of amount (0 to 20 mmol), the unbuffered solution left and the acetate buffer right, three slots each: CH₃CO₂H (`F.cat(0)`), CH₃CO₂⁻ (`F.cat(1)`), and the OH⁻ or H₃O⁺ still free (`F.cat(2)`, `F.cat(3)`) inside a dashed outline of what was added (legend "OH⁻ added"); every bar carries its amount in mmol in the `amount` hue, "none" in the unbuffered solution's two partner slots. Graph: pH (0 to 14, `concentration`) against volume added, 120 mL of HCl at the left end to 120 mL of NaOH at the right, zero in the middle, fixed; the right half is the book's Figure 14.17. The buffer's curve in `F.ref('buffer')` and the unbuffered solution's in `F.ref('unbuffered')`, both from the exact charge balance, named in a legend; a filled dot on each at the volume added with a drop line; a dashed level at the starting pH; hollow dots at the capacity either way, the one on the side being added labelled as the book does "[CH₃CO₂H] is 11% of [CH₃CO₂⁻]" (reversed for HCl); a choice bends the buffer's curve and slides its bars. Hover names every bar, outline and dot · readout, two formulas on two lines: the buffer's, Henderson-Hasselbalch with the live stoichiometric concentrations while both partners remain (ratio between 0.01 and 100), pH = pK_a + log([A⁻]/[HA]) = 4.74 + log(0.100 M/0.0980 M) = 4.75, morphing to pH = 14.00 + log[OH⁻] or −log[H₃O⁺] once the excess sets the pH; the unbuffered solution's, pH = 14.00 + log[OH⁻] = 14.00 + log(9.72 × 10⁻⁴ M) = 10.99, as Example 14.20(c) works it · note only once a partner is spent: "All 10.0 mmol of CH₃CO₂H is used up, so the OH⁻ added after that stays in the buffer too." · draws `amount`, `concentration`, `equilibrium-constant`, `volume`; referents `buffer`, `unbuffered`; no conventions, no facts · K_a of acetic acid 1.8 × 10⁻⁵ (pK_a 4.74), titrant 0.10 M, 100 mL of each solution, the unbuffered solution 1.8 × 10⁻⁵ M HCl, K_w 1.0 × 10⁻¹⁴
  works: parts (Figure 14.15: the equilibrium CH₃COOH + H₂O ⇌ H₃O⁺ + CH₃COO⁻ over three pairs of bars, CH₃COOH and CH₃COO⁻, standing on one baseline under a dashed line at the equimolar height; the middle pair equal, "Add H₃O⁺" pointing left to a pair with CH₃COOH taller and CH₃COO⁻ shorter, "Add OH⁻" pointing right to the reverse; the bars carry no scale. Figure 14.17: pH from 0 to 11, with a break below 4, against "Added mL of 0.10 M NaOH", 0 to 110, one curve rising slowly from 4.74 through about 5.0 at 30 mL, 5.3 at 50 mL and 6.1 at 90 mL, a label "[CH₃CO₂H] is 11% of [CH₃CO₂⁻]" with its leader ending near 77 mL and pH 5.7, then a near-vertical rise at 100 mL to 11) · flow (each mmol of OH⁻ added turns a mmol of CH₃CO₂H into CH₃CO₂⁻, each mmol of H₃O⁺ the reverse; in the unbuffered solution the addition meets only 0.0018 mmol of H₃O⁺ and the rest stays) · must hold (the partner bars change by exactly the amount added, 0.10 mmol per mL, the one that grows never past twice its start, the one consumed never below zero; acid to the left and base to the right as in 14.15; with 1.0 mL of NaOH the buffer reads 4.75 and the unbuffered solution 10.99, with 0.098 mmol of OH⁻ left in it (Example 14.20), and with 1.0 mL of HCl the unbuffered solution reads 3.00 (its Check Your Learning); with nothing added both read 4.74; the buffer curve passes 5.70 at the 11% point, 80.2 mL, and rises steeply at 100 mL, as 14.17; halving the buffer halves the volume at the capacity point; the unbuffered curve is one unbroken line through zero; the readout's numbers give its pH) · read off the images (as above; the volume axis is the book's, in mL of 0.10 M titrant, extended to 120 mL and mirrored for HCl; the bars are in mmol, which the book's bars do not give, 10.0 mmol of each partner from Example 14.20's 100 mL of 0.10 M)
  Rebuilt 2026-11-16 (second pass). The first build opened on a small pair of bars in a blank left half beside a graph in which Example 14.20's addition sat on the y axis; acid and base were two separate states, nothing showed why the unbuffered solution leaps, and the 1.0 M option only flattened the curve. Now both solutions' contents stand side by side, acid and base share one axis so the plateau and both of its ends are seen at once, and the buffer choice (0.025, 0.050, 0.10 M) moves the capacity in proportion.
- fig-compare · Figure 14.14 · buffer-composition · kept photograph; the text points at it and methyl orange's colours are physical fact · photo
- fig-exhaust · Figure 14.16 · buffer-capacity · kept photograph; the text points at it and the indicator colours are physical fact · photo

The ICE table of Example 14.20 (`ICETable16`) is a table, so it is written in the text as an unnumbered `div.book-table` where the book prints it, read from the image; no image is copied.

Extra simulations: none. The blood buffer of the Medicine note is one Henderson-Hasselbalch substitution, which the readout of the fold already writes live.

## Tables

The ICE table above. The Key Equations table is not printed; its three relations are the forms `eq-pka`, `eq-pkb` and `eq-henderson-hasselbalch`.

## Types bound

`concentration` ([HA], [A⁻], [H₃O⁺], [OH⁻], pH, the given and calculated concentrations and pH values, the buffer choice, the graph's pH axis), `amount` (the moles of acid, base and buffer partner in Example 14.20, the bar amounts), `volume` (the volumes in Example 14.20 and its Check Your Learning, the slider and the graph's volume axis), `equilibrium-constant` (K_a, pK_a). Logarithm terms and x stay ink (chapter `COLOR.md`); the kind in general ("the pH of a buffer") stays ink.

## Referents

`buffer`, the acetate buffer of Example 14.20, and `unbuffered`, the unbuffered solution of pH 4.74 it is compared with; both drawn by `sim-buffer`, marked in Example 14.20 and the figure's caption. The chapter `COLOR.md` also plans acetic acid and acetate as referents; their bars take `F.cat(0)` and `F.cat(1)` instead, as the chapter notes ask, since the text names the two species everywhere in the section and they are kinds, not one example's things.

## Exercises

One Check Your Learning inline, cyl1 (source Example 14.20, `fs-idm144695456`), host `ex-buffer-ph`, an open item with the book's worked answer.

Fifteen end-of-section items, Exercises 77 to 91, ids e77 to e91: seven keyed kept (e78 open, e80 number, e82 number, e84 open, e86 number, e88 multi, e90 multi with (b) in the solution); three unkeyed conceptual kept with an AI-marked approach (e77 fs-idm2126064, e79 fs-idp21075184, e85 fs-idm126903712); five unkeyed numerical left out and named (fs-idm163403536, fs-idm111908400, fs-idm128715952, fs-idp80593472, fs-idm111629776). Nothing moves between sections.

## Left out

Objectives, summary, key equations and glossary go to the tables. The Link to Learning on buffers in natural waters is dropped and named in `notes`. Errata kept as printed: Example 14.20(b) "1.0 mL of 0.10 NaOH" without its M, in the question as first stated; Figure 14.16's caption "has little affect"; "the buffer pairs pKa" in the blood paragraph is set as p<em>K</em><sub>a</sub>, its missing apostrophe kept.

## Wanted at chapter level

- variables `pK_a` → 14.6-henderson-hasselbalch
- variables `pH` → 14.6-how-buffers-work
- variables `[HA]` → 14.6-henderson-hasselbalch
- variables `[A-]` → 14.6-henderson-hasselbalch
- forms `eq-pka` → 14.6-henderson-hasselbalch
- forms `eq-pkb` → 14.6-henderson-hasselbalch (the text states only pK_a; the key equations give pK_b beside it)
- forms `eq-henderson-hasselbalch` → 14.6-henderson-hasselbalch
- variables row wanted for 14.6 `n` (`\kn`, amount): the amount of strong acid or base added to the buffer, the slider of `sim-buffer`
- variables rows wanted for 14.6 `[H3O+]`, `[OH-]`, `K_a`, `pOH`: used in Example 14.20, the derivation and the readout of `sim-buffer`

Applied by the chapter pass (2026-10-05): every anchor as asked (`pK_b` too); rows `n`, `[H3O+]`, `[OH-]`, `K_a` and `pOH` added at `how-buffers-work`. The numbering 77 to 91 is the publisher's (openstax.org checked); the keyed items are even because the book keys both 47 and 48, so nothing is renumbered. General mentions of pH and buffer are marked.

## Derivations

- The Henderson-Hasselbalch equation · score 3 · built as drv-henderson-hasselbalch
- Example 14.20, the pH of an acetate buffer before and after adding base · score 8 · not built: a worked example of the section's own method, neutralization stoichiometry then the buffer equilibrium, with numbers throughout
