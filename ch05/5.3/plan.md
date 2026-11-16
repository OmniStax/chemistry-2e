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

- `sim-first-law` · Figure 5.19 · first-law-of-thermodynamics · variation (the book's four arrows q_in, q_out, w_on, w_by become two the reader sets, and beside the system the same two are laid head to tail from the level U before to the level U after, so ΔU = q + w is seen as an addition of signed arrows) · arrows: symbolic (the direction of each transfer), never animated · still: the relation has no clock · sliders `\kq` and `\kwork` (energy, −50 to +50 kJ, opening on +40 and −15 kJ; the book's figure has no numbers), each with a dashed special at the value that cancels the other (ΔU = 0) · no headline: the arrow labels, the levels and the readout say it · the U levels beside the system on a fixed scale of 1.95 units per kJ · 2D, a relation between quantities. Heat and work share the energy hue and are told apart by label and stroke (heat solid, work dashed), as `ch05/COLOR.md` asks. Rebuilt on 2026-11-14: the old drawing was a small ellipse and a pair of levels 18 units apart in a blank band, and its headline repeated the readout.
  works: parts: the surroundings, a box; the system, a closed region inside it; one heat arrow and one work arrow, each crossing the system's boundary; beside them the internal energy as two levels, U before and U after, joined by the heat arrow and then the work arrow head to tail and by one ΔU arrow · flow: energy crosses the boundary as heat or as work, into the system for a positive value and out of it for a negative one · must hold: (1) a positive q points into the system and is named heat in, a negative q points out and is named heat out; (2) a positive w points into the system and is named work done on the system, a negative w points out and is named work done by the system; (3) heat is a solid arrow and work a dashed one, in both drawings; (4) on the levels the q arrow starts on U before, the w arrow starts where q ends, and w ends on U after, so the ΔU arrow spans exactly their sum; (5) U after is above U before when ΔU > 0, below when ΔU < 0, on it when ΔU = 0, and the system reads ΔU > 0, ΔU < 0 or ΔU = 0 to match; (6) the readout's numbers add up · read off the image: a grey frame round a cream box labelled "Surroundings"; a green ellipse labelled "System" with "ΔU < 0" above and "ΔU > 0" below the word; four curved arrows, q_out and w_by leaving the top of the ellipse, q_in and w_on entering the bottom; "ΔU = q + w" beneath. No numbers. The alt text agrees with the image.
- `fig-summit` · Figure 5.20 · photograph kept: the text points at the two paths.
- `fig-gas-burning` · Figure 5.21 · photograph kept, though a drop-candidate: Example 5.10 opens with “As Figure 5.21 suggests”, so the text points at it.
- `fig-algal-fuel`, `fig-algal-process` · Figures 5.22, 5.23 · kept inside the note, which points at both.
- `sim-hess` · Figure 5.24 · hess-law, state-function, thermochemical-equations, enthalpy-from-formation-enthalpies · variation (the book's one ladder becomes three: the image's carbon dioxide, the iron(III) chloride of Example 5.13, and Example 5.15 taken by way of its elements, where the first step climbs and the second falls past the start; reversing turns every arrow round and swaps which level holds the reactants) · arrows: symbolic (each enthalpy change, from its reactants' level to its products'), drawn once · still, nothing has a clock; the direction choice turns the arrows through `choice.mix`, the reaction choice slides the levels · `F.select` reaction (three), `F.choice` direction (forward, reverse) · no headline: each arrow carries its value, the right-hand key says which level is the reactants and whether the reaction is exothermic, and the readout the sum · none · 2D (the book's rule: ladders are flat). Enthalpy axis, levels and arrows in the energy hue, formulas in ink. The axis is in kJ with the elements at 0, fixed at +40 to −430 kJ for all three reactions, so each level sits at the sum of its substances' enthalpies of formation. The factor slider was removed on 2026-11-14: it forced a scale to −850 kJ that left the opening ladder in the top third of an empty stage, and the text's NO₂ pair right after the figure shows the doubling. The CYL of Example 5.13 (NO₂) is not a choice, so the figure does not give its answer away.
  works: parts: a vertical enthalpy axis; three horizontal levels, each the enthalpy of a set of substances named beside it (the reactants, the intermediate set, the products); one arrow from the reactants' level to the products' (the reaction in one step); two arrows, reactants to intermediate and intermediate to products (the two steps); a key at the right naming the reactants' and the products' levels · flow: none · must hold: (1) every arrow starts on the level of what its step consumes and ends on the level of what it forms; (2) an arrow pointing down carries a negative value and one pointing up a positive value; (3) the two step values add to the one-step value as printed (−111 + −282.5 = −393.5; −341.8 + −57.7 = −399.5; +186.23 + −323.03 = −136.80); (4) reversing turns all three arrows, changes all three signs, swaps the reactants and products tags and turns exothermic into endothermic; (5) the levels do not move on reversing; (6) each level stands at its height on the kJ axis · read off the image: axis "H increasing"; top level "C(s) + O₂(g)", middle level "CO(g) + ½O₂(g)" starting to the right of the top one, bottom level "CO₂(g)"; arrows "ΔH = –393.5 kJ" (one step), "ΔH = –111 kJ" and "ΔH = –282.5 kJ" (the two steps, one under the other); at the right, "Enthalpy of reactants", "Enthalpy of products" and braces reading "Enthalpy change of exothermic reaction in 1 or 2 steps". The alt text and the surrounding text print –394 and –283; the image prints –393.5 and –282.5, and the figure follows the image. Example 5.13: −341.8, −57.7, −399.5 kJ. Example 5.15: −323.03 + 186.23 = −136.80 kJ.

Readouts: `\kdU = \kq + \kwork` and `\kdHo_{overall} = \kdHo_1 + \kdHo_2`, each one chain with its live numbers in the energy hue.

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

## Derivations

- `enthalpy`, ΔH = q_p · score 2, a printed block · built as drv-enthalpy-change-heat: one node from ΔH = ΔU + PΔV through PΔV = −w and the first law to q_p, the skipped line ΔH = ΔU − w inserted. The definitions H = U + PV, ΔH = ΔU + PΔV and PΔV = −w stay displayed where the book states them; only the "Substituting … yields" paragraph and its three lines are replaced.
- `hess-law`, Hess's law · score 2 · not built: asserted from the state-function property and checked on one numerical instance; three moves.
- `formation-enthalpies`, ΔH°reaction from enthalpies of formation · score 5, hidden in prose · built as drv-reaction-enthalpy-from-formation: one node, Hess's law over decompositions and formations, then the reversal and scaling rules for each, then the rearrangement the book prints. The prose is kept; the host replaces the displayed result after it.
- Example 5.14, ClF + F₂ → ClF₃ · score 0 · not built: a worked example applying Hess's law, every line printed.
