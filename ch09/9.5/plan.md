# Plan: 9.5 The Kinetic-Molecular Theory (m68758)

Source: `source.md`, converted with `python3 tools/convert.py 9.5`.
Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins (`config.md`); left for review after the build.

Two learning objectives, four numbered figures (9.31 a sketch, 9.32 to 9.34 graphs), one worked example (9.23) with its Check Your Learning, one Link to Learning note (dropped), no numbered table, nine end-of-chapter exercises of which four are keyed, and two glossary terms. The book prints three headers; the opening paragraphs and the five postulates before the first of them get a page header of their own.

## Sub-concepts (page headers)

1. `postulates` **The postulates of the kinetic-molecular theory** (the opening, the five postulates as a numbered list). Introduces `kinetic-molecular-theory`.
2. `kmt-part-1` **The kinetic-molecular theory explains the behavior of gases, part I** (the five laws explained, Figure 9.31). Introduces `kmt-explains-gas-laws`; uses `kinetic-molecular-theory`.
3. `speeds` **Molecular speeds and kinetic energy** (the speed distribution, KE, u_rms, KE_avg = 3/2 RT, u_rms = √(3RT/ℳ), Figures 9.32 to 9.34, the Sim), with Example 9.23 `ex-urms` and its Check Your Learning inline. Introduces `maxwell-boltzmann-distribution`, `average-kinetic-energy-and-temperature`, `root-mean-square-speed`.
4. `kmt-part-2` **The kinetic-molecular theory explains the behavior of gases, part II** (effusion rate ∝ u_rms and the derivation of Graham's law). Introduces `grahams-law-from-kmt`; uses `root-mean-square-speed`, `grahams-law`.

## Figures

- `sim-kmt` · Figure 9.31 · kmt-explains-gas-laws, kinetic-molecular-theory · the book's three frozen before-and-after pairs become running gases, and the reader sees the collisions the book marks with orange dashes: every strike on the walls is counted, and the strip beneath compares the strikes per unit of wall area per second in the baseline and the changed cylinder; tier: a moving particle picture, the chapter's gas box reused · moving: the molecules travel and the count is their rate of striking, which is the whole explanation; a continuous run with the transport and no scrubber, as 9.2's gas box · one choice (rule 26.1), law: Amontons's (temperature doubled, 300 K to 600 K, volume held), Boyle's (volume halved), Avogadro's (amount doubled, volume doubled at constant pressure), the book's three panels; no slider, since the book's point is the direction of each change and a factor of two shows it · headline: the strikes per unit area in the two cylinders and what the gauge would read · strip beneath with two bars in `F.cat(0)` (baseline) and `F.cat(1)` (changed), readout the law with the two states in type hues (`\kPone`, `\kPtwo`, `\kTone`, `\kTtwo`, `\kVone`, `\kVtwo`, `\knone`, `\kntwo`) · 3D, physical: two piston cylinders of N₂ side by side on a bench, pitch held between level and 72° above it so the bench is never seen from beneath, yaw free, no idle spin since the molecules already move; flat fallback from `F.view3d`. The book's image labels panel (a) "Charles's Law" for a temperature raised at constant volume; the choice names it Amontons's law, which is what the text says, and the original keeps its label.
- `sim-speeds` · Figure 9.32 + 9.33 + 9.34 · maxwell-boltzmann-distribution, root-mean-square-speed, average-kinetic-energy-and-temperature · the book draws one curve, then a family over temperature, then a family over gases; one live curve that the reader moves with a temperature slider and a gas choice is all three, with v_p and u_rms marked on it and the book's two families behind it as the comparison · still: a distribution is not a motion, and the curve answers its controls · controls: compare with (none, temperatures, gases) as a choice, the three book figures; gas (O₂, N₂, He, Ne, Ar, Xe) as a dropdown, since six would wrap; T slider `temperature`, 100 to 1000 K, detents at 100, 200, 300, 500, 1000 K (the book's temperatures). Defaults O₂ at 300 K reproduce Figure 9.32 · headline: the most probable and root mean square speeds at this temperature · graph alone (the graph is the idea); the live curve in ink with drop lines at v_p and u_rms, the comparison curves thin in `F.cat(i)` with a legend; axes: speed u in ink, fixed per gas for one gas and four temperatures, from 0 to 1.55 u_rms at 1000 K rounded up to 500 m/s (1500 m/s for N₂, O₂ and Ar, the book’s frame for 9.33; 1000 for Xe, 2000 for Ne, 4000 for He), 0 to 3000 m/s for the gases (the book's frame for 9.34); fraction of molecules unnumbered, as the book prints it, fixed per frame from the tallest curve the frame can show, clipped at the frame · readout u_rms = √(3RT/ℳ) with the live numbers, T in the temperature hue and ℳ in the mass hue, and a second line KE_avg = 3/2 RT in the energy hue, the same for every gas · 2D (a graph).
- `sim-gasbox` · Sim · maxwell-boltzmann-distribution, average-kinetic-energy-and-temperature · the Link to Learning's gas simulator, answered by our own: the chapter's gas box with a histogram of the speeds of the very molecules the reader watches, building up under the box, with the Maxwell-Boltzmann curve drawn over it; the reader sees that the curve is a count of real molecules and that the temperature slider flattens it and shifts it right; tier: moving particle picture over a flat strip · moving: the molecules travel, each collision gives the struck molecule a new speed drawn from the distribution at the box's temperature, and the histogram is a running tally of the speeds, so time is the tally · controls: T slider `temperature`, 100 to 1000 K, default 300 K; gas as a choice (He, N₂, Ar, Xe), default N₂ · headline: how many speeds have been counted and the average speed so far against u_rms · strip beneath: the histogram in `F.cat(0)`, the curve in ink, u_rms marked; readout KE_avg = 3/2 RT in type hues · 3D, physical: a glass box of molecules in the element palette, no ground, yaw free, pitch within ±70°, no idle spin; flat fallback from `F.view3d`.

Example 9.23 gets no figure of its own: `sim-speeds` with N₂ gives u_rms at any temperature.

## Photographs

None in the section.

## Exercises

Inline: the Check Your Learning after Example 9.23 (441 m/s, number), host `ex-urms`.
End: fs-idm159823744 (unkeyed conceptual, AI approach), fs-idm178556768 (keyed, open), fs-idm213877296 (unkeyed conceptual, AI approach), fs-idp16129152 (keyed, open; points at Figure 9.34, which draws no H₂ or H₂O curve, carried as printed), fs-idm124543936 (keyed, open), fs-idm150122880 (keyed, open, the book's full key), fs-idm194405232 (unkeyed derivation, AI approach). Left out as unkeyed numerical: fs-idp62923856, fs-idm98413904. No `source_section`, no simulation-exercise.

## Binds

`temperature` (the sliders, T in the readouts, the heat under the Amontons cylinder), `energy` (KE_avg), `mass` (ℳ), and for Figure 9.31 `pressure`, `volume` and `amount` (the two states of each law in the readout, the gas body of each cylinder). u and u_rms are ink. Molecules in `F.el`; bars and comparison curves in `F.cat`.

## Notes

The Link to Learning to the gas simulator is dropped; the Sim answers it. Errata kept as printed: "According to Graham's law" at the head of Part II; Figure 9.32's caption ν_p; Figure 9.31's image label "Charles's Law"; Figure 9.34's caption beginning "molecular".

## Wanted at chapter level

- eq-kinetic-energy → 9.5-speeds
- eq-u-rms-definition → 9.5-speeds
- eq-ke-avg → 9.5-speeds
- eq-u-rms → 9.5-speeds
- KE → 9.5-speeds
- KE_avg → 9.5-speeds
- u → 9.5-speeds
- u_rms → 9.5-speeds
- MM (9.5 row, kg/mol) → 9.5-speeds
- ch09/COLOR.md: 9.5 also binds `pressure`, `volume` and `amount` through Figure 9.31's two-state readout and gas bodies

### Applied by the chapter pass

Every item above was applied on 2026-09-28: the four equations and the five variable rows carry the anchors listed, and `ch09/COLOR.md` records that 9.5 also binds `pressure`, `volume` and `amount` through Figure 9.31. The caption of the folded Figure 9.32 + 9.33 + 9.34 said "as the book draws nitrogen" and spoke to the reader of the controls; its last sentence now reads "The same distribution may be drawn for nitrogen at 100, 200, 500, and 1000 K, or for xenon, argon, neon, and helium at a single temperature."
