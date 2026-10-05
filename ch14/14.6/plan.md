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

- sim-buffer · Figure 14.15 + 14.17 · how-buffers-work, buffer-capacity, buffer-ph-calculations, henderson-hasselbalch · variation by slider and choice: the book draws the buffer's two partners three times (14.15, a schematic with no amounts) and its pH against added NaOH once (14.17); here one slider adds the strong acid or base and the reader watches the partner it consumes shrink while the pH barely moves, until that partner is nearly gone and the curve turns up the cliff, the unbuffered solution of Example 14.20 beside it leaping at the first drop; a buffer choice of 0.10 M or 1.0 M in each partner shows the text's claim that the more concentrated buffer has the greater capacity at the same pH · arrows: symbolic (the book's "Add H₃O⁺" and "Add OH⁻" arrows name an operation, and become the choice) · still: adding acid or base is an amount, not a clock; the drip of a titration belongs to 14.7 · choice added (HCl · NaOH, default NaOH, the book's Figure 14.17 and Example 14.20); choice buffer (0.10 M · 1.0 M in each partner, `concentration`, default 0.10 M); slider n added (`amount`, 0 to 11.00 mmol of 0.10 M titrant, step 0.01, default 0.10 mmol, Example 14.20's 1.0 mL of 0.10 M NaOH; a dashed circle at the buffer capacity, where the consumed partner is 11% of the other and the pH has moved one unit, 8.02 mmol at 0.10 M, off the track at 1.0 M) · headline "Adding 0.10 mmol of NaOH moves the buffer from pH 4.74 to 4.75 and the unbuffered solution from pH 4.74 to 10.99." with the live numbers · bars at the left, graph beside them · 2D, a bar chart and a graph (book rule) · bars: CH₃CO₂H and CH₃CO₂⁻ in `F.cat(0)` and `F.cat(1)`, heights relative to their starting amount, which the dashed line marks as the book's does (the book's bars carry no scale), each with its amount in mmol above it in the `amount` hue and its formula beneath; graph: n added (mmol, 0 to 11, `amount`) against pH (0 to 14, `concentration`), fixed; every state lies inside (the unbuffered solution reaches pH 12.72 with 11 mmol of NaOH and 1.28 with 11 mmol of HCl), so nothing is pinned. The buffer's pH curve in `F.ref('buffer')`, the unbuffered solution's in `F.ref('unbuffered')`, both from the exact charge balance; a filled dot on each at n with a drop line from the buffer's; the capacity point a hollow dot on the buffer curve labelled as the book does "[CH₃CO₂H] is 11% of [CH₃CO₂⁻]" (reversed for HCl); a choice bends both curves into their new shapes. Labels: the two curves named once where they run apart, the capacity label, the bars' formulas and amounts, "start" on the dashed line (six or fewer, none on a moving body); hover names each dot with its pH · readout, while both partners remain (ratio between 0.01 and 100), the Henderson-Hasselbalch equation with the live stoichiometric concentrations, pH = pK_a + log([A⁻]/[HA]) = 4.74 + log(0.100/0.0980) = 4.75, as Example 14.20(b) works it; past that, the excess strong base or acid sets the pH and the readout morphs to pH = 14.00 + log[OH⁻] or pH = −log[H₃O⁺] with the live concentration, as Example 14.20(c) does · note: the stoichiometry the bars show, "0.10 mmol of OH⁻ has turned 0.10 mmol of CH₃CO₂H into CH₃CO₂⁻.", and once the partner is spent, "All 10.0 mmol of CH₃CO₂H is used up; the excess OH⁻ sets the pH." · draws `amount`, `concentration`, `equilibrium-constant`; referents `buffer`, `unbuffered`; no conventions, no facts · K_a of acetic acid 1.8 × 10⁻⁵ (pK_a 4.74), titrant 0.10 M, 100 mL of buffer, the unbuffered solution 100 mL of 1.8 × 10⁻⁵ M HCl, K_w 1.0 × 10⁻¹⁴
- fig-compare · Figure 14.14 · buffer-composition · kept photograph; the text points at it and methyl orange's colours are physical fact · photo
- fig-exhaust · Figure 14.16 · buffer-capacity · kept photograph; the text points at it and the indicator colours are physical fact · photo

The ICE table of Example 14.20 (`ICETable16`) is a table, so it is written in the text as an unnumbered `div.book-table` where the book prints it, read from the image; no image is copied.

Extra simulations: none. The blood buffer of the Medicine note is one Henderson-Hasselbalch substitution, which the readout of the fold already writes live.

## Tables

The ICE table above. The Key Equations table is not printed; its three relations are the forms `eq-pka`, `eq-pkb` and `eq-henderson-hasselbalch`.

## Types bound

`concentration` ([HA], [A⁻], [H₃O⁺], [OH⁻], pH, the given and calculated concentrations and pH values, the buffer choice, the graph's pH axis), `amount` (the moles of acid, base and buffer partner in Example 14.20, the slider, the bar amounts), `volume` (the volumes in Example 14.20 and its Check Your Learning), `equilibrium-constant` (K_a, pK_a). Logarithm terms and x stay ink (chapter `COLOR.md`); the kind in general ("the pH of a buffer") stays ink.

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
