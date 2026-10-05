# Plan: 12.6 Reaction Mechanisms (m68794)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied without check-ins on Chen's instruction).

Four objectives, two numbered figures (12.17, 12.18), one unnumbered image (the cyclobutane equation), no table, one worked example (12.14) with one Check Your Learning, no boxed note, no Link to Learning, nine end-of-section items.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `mechanisms` | Reaction mechanisms and intermediates (the section's opening: the two steps of ozone's decomposition, their sum, the oxygen atom as an intermediate) | introduces `reaction-mechanism`, `elementary-reaction`, `reaction-intermediate`; uses `rate-law`, `rate-laws-are-experimental` |
| `unimolecular` | Unimolecular elementary reactions (the book's header; the cyclobutane figure) | introduces `molecularity`, `unimolecular-reaction`, `elementary-rate-laws`; uses `rate-law`, `rate-constant`, `concentration`, `reaction-rate` |
| `bimolecular` | Bimolecular elementary reactions (the book's header; Figure 12.17) | introduces `bimolecular-reaction`; uses `elementary-rate-laws`, `molecularity` |
| `termolecular` | Termolecular elementary reactions (the book's header) | introduces `termolecular-reaction`; uses `molecularity`, `elementary-rate-laws` |
| `rate-determining` | Relating reaction mechanisms to rate laws (the book's header; Figure 12.18, the NO<sub>2</sub> + CO mechanisms, the Sim) | introduces `rate-determining-step`, `mechanism-consistent-with-rate-law`; uses `rate-law`, `reaction-intermediate`, `elementary-rate-laws`, `temperature` |
| `fast-equilibrium` | A fast, reversible step before the slow one (the reversible dimerization of NO, Example 12.14 `ex-mechanism`) | introduces `rate-law-from-mechanism`; uses `dynamic-equilibrium`, `reaction-intermediate`, `rate-determining-step` |

## Figures

- fig-cyclobutane · unnumbered image (CyclobD_img) · unimolecular-reaction, elementary-rate-laws · depth: the book's flat structural formula is kept as the 2D view, and the 3D view shows what it cannot, a puckered four-carbon ring with one hydrogen of each carbon above it and one below, against two flat ethylene molecules · arrows: symbolic (the reaction arrow) · still, a structure has no clock · choice view (2D, 3D) · headline "A single molecule of cyclobutane, C₄H₈, is the only reactant, so the step is unimolecular." in 2D, "The ring of cyclobutane is slightly puckered; each ethylene molecule is flat." in 3D · no graph · 2D and 3D by the book's rule for a structure the text names (physical 3D, a molecule): ball-and-stick on `F.view3d`, mounted on the first switch, pitch within ±80° and yaw within ±70° so the row of molecules is never seen end on, idle spin off with its button, views front and edge on (the edge-on view lines each ethylene up flat beside the ring) · atoms by `F.el` in 3D; the 2D view keeps the book's ink letters; hover names on every atom; names "cyclobutane" and "ethylene" under the molecules in 2D (three labels), hover names alone in 3D, where a pinned name would cross the atoms as the scene turns · readout rate = k[C₄H₈], the first-order rate law the text writes from the unimolecular step · figure row, no number
- sim-no2-co · Figure 12.17 · bimolecular-reaction, elementary-reaction, elementary-rate-laws · variation by choice and depth: the book prints three frozen frames of one collision; here one choice walks the step, NO₂ and CO apart, the transition state, NO and CO₂ apart, and each change is one morph in which the oxygen atom slides from nitrogen to carbon while the rest follows, so the reader watches one atom change partners in a single bimolecular event · arrows: symbolic (the book's two reaction arrows, replaced by the stage choice) · still, the stages are discrete states of one event and the figure only answers its choices · choice stage (NO₂ + CO, transition state, NO + CO₂), choice view (2D, 3D) · headline per stage, the first "One NO₂ molecule and one CO molecule, two reactant molecules, meet in a single step." · no graph · 2D by default, space-filling discs in the book's arrangement; 3D on `F.view3d` (physical 3D, the book's own space-filling picture), pitch within ±60° and yaw within ±70°, spin off with its button, views front and above · N, O, C by `F.el`; in 2D the molecule or stage name under each group (two labels at most), in 3D hover names alone; hover names on the five atoms name the oxygen that moves · readout rate = k[NO₂][CO], first order in each · kind `sim` with the number
- fig-cattle · Figure 12.18 · rate-determining-step · kept photograph: the text points at it as its picture of a rate-determining step; nothing in it moves or varies that a slider could carry · photo
- sim-slow-step · Sim · rate-determining-step, reaction-intermediate, mechanism-consistent-with-rate-law · variation by slider: the text states that a reaction cannot go faster than its slowest step and shows it only with a cattle chute; here the book's own two-step mechanism for NO₂ + CO below 225 °C runs on a concentration–time graph, and the reader makes either step the slow one, sees NO₃ stay near zero when step 1 is slow and pile up when step 2 is, and reads at any moment that CO₂ forms at the rate of the slower step · arrows: none · still, the graph carries the time course and a time slider marks the moment read; the curves answer the sliders with no clock of their own · k₁ (rate-constant, 0.2 to 5.0 L mol⁻¹ s⁻¹, default 0.5), k₂ (rate-constant, 0.2 to 5.0 L mol⁻¹ s⁻¹, default 5.0), t (time, 0 to 100 s, default 20 s); both reactants start at 0.100 M; the rate constants are chosen for illustration, since the book gives none, and the caption says so · headline "Step 1 is the slow step: NO₃ is used as fast as it forms, and CO₂ forms at the rate of step 1." or its two other cases (step 2 slow, the steps comparable) · graph alone, the graph is the idea: [NO₂], [NO₃] and [CO₂] against t, concentration 0 to 0.100 M and time 0 to 100 s fixed (every curve stays under the starting 0.100 M at every slider position) · 2D, a graph (book rule) · curves in `F.cat(0)`, `F.cat(1)`, `F.cat(2)`, each labelled once at its right end; the two step equations above the graph, each marked slow or fast from the sliders; dots on the curves at t, a dashed drop line · readout rate = rate₂ = k₂[NO₃][CO] with the live numbers, small line rate₁ = k₁[NO₂]² at the same moment

Extra simulations: none. The molecularity of a step is carried by the cyclobutane figure (one molecule), Figure 12.17 (two) and the text's termolecular equations; a termolecular collision drawn on its own would show nothing the bimolecular frames do not.

## Types bound

`rate` (rate, rate₁, rate₂, the readouts), `rate-constant` (k, k₁, k₂, k₋₁, typed in `book.json` and `ch12/COLOR.md`, which overrule the chapter notes' "never a typed k"), `concentration` ([A], [B], the concentration axis), `time` (t and Δt, the time axis and slider). A named species' bracket ([NO₂], [NOCl₂]) has no symbol row and stays in ink in the prose; the Sim's readout colours it with `C('concentration')`. Energy is not drawn: no reaction diagram is printed in this section.

## Referents

None. `ch12/COLOR.md` planned the steps of a mechanism as referents where the text names step 1 and step 2; the only steps the text names are those of Example 12.14, which no figure draws, and the Sim's mechanism is named by its slow and fast steps, so step 1 and step 2 stay in ink and the curves take `F.cat`.

## Exercises

One Check Your Learning inline after Example 12.14 (`ex-mechanism`), keyed, an open answer compared with the key. Nine end-of-section items, all kept: four keyed (fs-idp146992064, fs-idm4441216, fs-idp199466816 open with the key; fs-idm20987200, the AP item, multi with its numbers (c) and (d) checked and its key printed whole), five unkeyed conceptual or symbolic with an AI-marked suggested approach (fs-idm14620304, fs-idp48807664, fs-idp38703248 with its five options kept as an open item, fs-idp63617152, fs-idp225129424). None left out, none moved.

## Left out

Nothing of the prose. Errata kept as printed: "the butadiene reaction" for the cyclobutane decomposition; the AP key's k in mol² L⁻² min⁻¹ and its "Step II" for the book's Step 2; "a *single* reactant entities". The book's alt text for Figure 12.17 describes two HI molecules; the image and the caption show NO₂ and CO, and the figure follows them.

## Wanted at chapter level

- variables `k_m1` → 12.6-fast-equilibrium
- variables rows in 12.6 for `rate`, `k`, `[A]`, `[B]`, `k_1`, `k_2`, `Δt` (the meanings of 12.1, 12.3 and 12.5) if the chapter pass wants them per section; the page writes `\krate`, `\kk`, `\kconcA`, `\kconcB`, `\kkone`, `\kktwo`, `\kkmone`, `\kdt`
- `ch12/COLOR.md` and the chapter notes disagree on k: the tables type it `rate-constant` (`\kk`), and the page follows them
- `ch12/config.md`: the cyclobutane equation of 12.6 is an unnumbered image redrawn as a figure row with no number

Applied by the chapter pass (2026-10-05): the k₋₁ anchor set; no per-section rows for the reused symbols, whose cards fall back to the chapter's meanings; k stays typed (`COLOR.md`, `config.md`); `config.md` names the cyclobutane figure row.
