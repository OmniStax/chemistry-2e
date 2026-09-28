# Plan: 5.3 Enthalpy

Written 2026-09-28 before building, left for review (`ch05/config.md`: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts and spans

| Span | `<h2>` | Concepts |
|---|---|---|
| `first-law` | Internal energy, heat, and work | first-law-of-thermodynamics (introduces) |
| `expansion-work` | Expansion work | first-law-of-thermodynamics (reinforces) |
| `state-functions` | State functions | state-function (introduces) |
| `enthalpy` | Enthalpy | enthalpy-change-at-constant-pressure (introduces) |
| `thermochemical-equations` | Thermochemical equations, with Examples 5.8 `ex-hcl-naoh` and 5.9 `ex-gummy-bear` | thermochemical-equations (introduces) |
| `standard-state` | Standard states | standard-enthalpy-of-formation (introduces) |
| `combustion` | Standard Enthalpy of Combustion (the book's header), Table 5.2, Example 5.10 `ex-isooctane`, the algae note | enthalpy-of-combustion (introduces) |
| `formation` | Standard Enthalpy of Formation (the book's header), Examples 5.11 `ex-ozone`, 5.12 `ex-formation-equations` | standard-enthalpy-of-formation (reinforces) |
| `hess-law` | Hess’s Law (the book's header), Examples 5.13 `ex-fecl3`, 5.14 `ex-clf3` | hess-law (introduces) |
| `formation-enthalpies` | Reaction enthalpies from enthalpies of formation, Example 5.15 `ex-hno3` | enthalpy-from-formation-enthalpies (introduces) |

Summary to `summary_html`; objectives, the Key Equations (first law, Hess from formation enthalpies) and 12 glossary terms are in the tables. The footnote of the algae note is `<sup>1</sup>` with its `<small>` at the end of the page.

## Figures

- `sim-first-law` · Figure 5.19 · first-law-of-thermodynamics · variation (the sign convention of q and w becomes arrows that turn round and grow, and ΔU a pair of levels the reader moves) · still: the relation has no clock · sliders `\kq` and `\kwork` (energy, −100 to +100 kJ, defaults +40 and −15 kJ), each with a dashed special at the value that cancels the other (ΔU = 0) · headline "The system absorbs 40 kJ of heat and does 15 kJ of work on the surroundings, so its internal energy rises by 25 kJ." · none (the U levels sit beside the system) · 2D, a relation between quantities. Heat and work share the energy hue and are told apart by label and stroke (heat solid, work dashed), as `ch05/COLOR.md` asks. Labels: q, w, ΔU, U before and U after, fewer than six.
- `fig-summit` · Figure 5.20 · photograph kept: the text points at the two paths.
- `fig-gas-burning` · Figure 5.21 · photograph kept, though a drop-candidate: Example 5.10 opens with “As Figure 5.21 suggests”, so the text points at it.
- `fig-algal-fuel`, `fig-algal-process` · Figures 5.22, 5.23 · kept inside the note, which points at both.
- `sim-hess` · Figure 5.24 · hess-law, state-function, thermochemical-equations, enthalpy-from-formation-enthalpies · variation (a live enthalpy ladder: reversing and scaling the equations, the two features the text lists right after the figure, and the sum of the steps always landing on the overall arrow) · still, nothing has a clock; the direction choice morphs the arrows round through `choice.mix`, the reaction choice slides the levels · `F.select` reaction (CO₂ from carbon as in Figure 5.24, FeCl₃ from iron as in Example 5.13, Example 5.15 by way of its elements with the equation's numbers), `F.choice` direction (forward, reverse), slider factor (untyped, 0.5 to 2 in steps of 0.5, detents 0.5, 1, 2) · headline "Step 1 (−111 kJ) and step 2 (−283 kJ) add up to −394 kJ, the same as the overall reaction in one step, which is exothermic." · none; the running sum sits at the right · 2D (the book's rule: ladders are flat). Enthalpy axis, levels and arrows in the energy hue, formulas in ink. The enthalpy scale is fixed at +50 to −850 kJ. The CYL of Example 5.13 (NO₂) is not a choice, so the figure does not give its answer away.

Readouts: `\kdU = \kq + \kwork` and `\kdHo_{overall} = \kdHo_1 + \kdHo_2` with live numbers in the energy hue.

## Tables

Table 5.2 as `div.book-table`, isooctane printed –5465.5 as the book prints it.

## Exercises

8 Check Your Learning inline, one per example (hosts `ex-hcl-naoh`, `ex-gummy-bear`, `ex-isooctane`, `ex-ozone`, `ex-formation-equations`, `ex-fecl3`, `ex-clf3`, `ex-hno3`), all keyed. End of chapter: 48 items; 24 keyed and kept; 4 unkeyed conceptual kept with an AI approach (fs-idp103276080, fs-idp104124592, fs-idp154782528, fs-idp157714624); 20 unkeyed numerical left out and named in `exercise_notes`. References to Examples 5.5, 5.6 and Exercise 5.25 are plain text; Figure 5.7 and Figure 5.17 are named in plain text.

## Binds

energy only. No figure draws PΔV, so `volume` and `pressure` stay unbound; P, V and ΔV in the enthalpy equations are ink on this page.

## Wanted at chapter level

- eq-first-law → 5.3-first-law
- eq-enthalpy → 5.3-enthalpy
- eq-enthalpy-change → 5.3-enthalpy
- eq-expansion-work → 5.3-enthalpy
- eq-dh-qp → 5.3-enthalpy
- eq-hess-formation → 5.3-formation-enthalpies
- edge thermochemical-equations → identify-limiting-reactant (Examples 5.8 and 5.9 and their Check Your Learning items)
- edge thermochemical-equations → mass-mole-conversion
- edge enthalpy-of-combustion → mass-mole-conversion (Example 5.10)
- edge enthalpy-from-formation-enthalpies → balanced-equation

Applied by the chapter pass: the six equations anchored as asked, and every 5.3 variable anchored (U, ΔU, w to first-law; H, ΔH, P, V, ΔV, q_p to enthalpy; ΔH° to standard-state; ΔH_c° to combustion; ΔH_f° to formation; n_coef to formation-enthalpies). Edges merged: thermochemical-equations → balanced-equation, identify-limiting-reactant, mass-mole-conversion, molar-mass; enthalpy-of-combustion → mass-mole-conversion, molar-mass; enthalpy-from-formation-enthalpies → balanced-equation.
