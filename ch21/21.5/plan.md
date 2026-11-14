# Plan: 21.5 Uses of Radioisotopes (m68857)

Written 2026-10-05 before the build and left for review, as `ch21/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

One objective, six numbered figures (21.24 to 21.29), no worked example, no table, no boxed note, no Link to Learning, one displayed nuclear equation and one chemical equation, three end-of-section items (chapter exercises 55 to 57). The book prints no header, so the page takes three of its own.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `tracers` | Radioactive Tracers (OmniStax's header: the opening, radioimmunoassay, the four medical tracers, Figure 21.24, Tc-99m and its generator, Figure 21.25) | introduces `radioactive-tracer`, `medical-radioisotopes`; uses `isotopes`, `radioactive-half-life`, `gamma-ray`, `beta-decay`, `parent-and-daughter-nuclides`, `polyatomic-ions` |
| `therapy` | Radiation Therapy (OmniStax's header: radiation therapy, external and internal, chemotherapy, cobalt-60, Figures 21.26 and 21.27) | introduces `radiation-therapy`, `chemotherapy`; uses `gamma-ray`, `beta-decay`, `gamma-emission`, `nuclear-transmutation`, `radioactive-half-life`, `balanced-nuclear-equation` |
| `other-uses` | Other Uses of Radioisotopes (OmniStax's header: plants and animals, photosynthesis, commercial uses, Figure 21.28, the smoke detector, Figure 21.29) | introduces `uses-of-radiation`; uses `radioactive-tracer`, `photosynthesis`, `gamma-ray`, `alpha-particle`, `alpha-decay`, `radioactive-half-life`, `electric-current`, `electrical-potential`, `ion` |

The five glossary terms sit on their concepts already (radioactive tracer with radioactive label, radiation therapy with external beam and internal radiation therapy, chemotherapy); the bold terms are the introducing spans.

## Figures

- fig-thallium · Figure 21.24 · photo, kept: the text points at it for thallium-201 in a stress test.
- fig-tc99 · Figure 21.25 · photo (a) and scan (b), kept: the text points at it for the Tc-99m generator, and the scan shows where the tracer collects; the red of the scan is its own and stays in the photograph.
- sim-gantry · Figure 21.26 · radiation-therapy · flow by animation and variation by slider: the cobalt-60 source rides the gantry through its arc and the γ beam always crosses the target, while the time each part of the head spends in the beam builds up as a shading, darkest at the target and thinning away from it; the still diagram cannot show that a swinging beam spreads the healthy tissue's share and keeps the target's whole · arrows: kinematic (the γ rays travel from the source through the head; the gantry swings) · moving: the gantry sweeps the arc once over 10.0 min of treatment (about 2 min a second), holds, and repeats; the shading and the two bars follow the clock · arc of the swing (slider, `angle`, 0° to 360°, default 120°), beam width (slider, `length`, 1.0 to 4.0 cm, default 2.0 cm) · headline "Swung through 120°, the beam is on the skin above the target for 1.2 min of the target's 10.0 min." · bars beside: time in the beam for the target and for the skin point, 0 to 10 min fixed · readout the ratio of the two times with the live numbers; no note (the readout says it) · 2D: an axial slice of the head, since every beam lies in the plane of the arc and a turned 3D machine adds no view of that plane (rule 28.5); flat as the book's (b) is · labels: target and skin (static), the source and beam named in a legend and by hover, since the source moves (26.7)
  works: parts: the patient's head in an axial slice, the target (tumor) inside it; the cobalt-60 source on the gantry, outside the head; its γ beam from the source through the target · flow: the gantry swings the source along its arc about the target; the beam travels from the source across the head; the time in the beam builds as a shading · must hold: (1) the beam passes through the target at every position of the arc; (2) the target's time in the beam equals the whole treatment, 10.0 min; (3) a point of skin is in the beam only while the beam crosses it, so its time falls as the arc widens; (4) the bars and the readout's ratio agree · read off the image: (a) the cobalt-60 machine and the patient on the table, (b) "Target", "Gamma rays", "Radioactive cobalt": many sources on a ring, their rays converging on the target. The figure plays the caption's "gantry swings through an arc" with one source, the motion (b) implies. Kept 2026-11-14; caption cut.
- sim-co60-decay · Figure 21.27 · gamma-emission, beta-decay, radiation-therapy · reverted to the book's image on 2026-11-14: a still redraw of the decay scheme whose levels the book already draws close to scale and labels in full (0.31 MeV β 99.88 %, 1.48 MeV β 0.12 %, 1.1732 and 1.3325 MeV γ, 5.272 a); the added energy axis did not make it clearly better than the image · photo
- fig-uses · Figure 21.28 · photos (a) and (b), kept: the text points at them for luggage X-rays and food preservation.
- sim-smoke · Figure 21.29 · uses-of-radiation, electric-current · flow by animation: α particles from americium-241 cross the chamber and leave pairs of ions and electrons behind them, the battery's plates draw the positive ions down and the electrons up, and with smoke in the chamber the smoke particles catch them, so fewer ions reach the plates and the current on the meter falls past the alarm's mark · arrows: kinematic (α particles in flight, ions and electrons drifting to the plates) · moving: emission on a 6.00 s clock that loops seamlessly · air (choice: no smoke, smoke; default no smoke) · headline "With no smoke, nearly every ion reaches a plate and 1.92 × 10⁻¹⁰ A flows." · no graph: the meter with the alarm's mark sits beside the chamber · readout I = Q/t with the charge the positive ions carry to the negative plate over the loop; note "Each ion drawn stands for 10⁸ ions." (the factor drawn, rule 28.4) · 2D: the book draws a cutaway of the chamber, and the chapter config keeps cutaways flat · labels: plates (+, −), americium source, meter and alarm (static); α particle, nitrogen and oxygen ions, electron and smoke particle in a legend and by hover, since they move. The book's photograph of the detector's inside goes with the diagram in the original.
  works: parts: the ionization chamber with two metal plates, the upper + and the lower −, the lower with a hole over the americium source beneath it; a battery and a meter in series with the plates; the alarm · flow: α particles rise from the source through the hole into the air between the plates, leaving positive ions and electrons; the positive ions drift to the negative plate and the electrons to the positive one, a current through the meter; smoke particles catch ions so fewer reach the plates · must hold: (1) the source sits under the lower plate and the α particles enter through its hole; (2) positive ions drift toward −, electrons toward +; (3) the battery, the plates and the meter form one loop; (4) with smoke the current falls below the alarm's mark and the alarm sounds; (5) I = Q/t holds with the numbers shown · read off the image: "Ionization chamber", "Alarm" on the photograph; "Metal plates" (+ above, − below), "Alpha particles", "Americium source", "Smoke particle", a 9 V battery wired to both plates; "No smoke, charged particles complete the circuit", "Smoke uncharges the particles, circuit is broken, alarm is triggered". The book's arrows show the positive ion moving up toward +; the figure moves it toward −, as a battery's field does. Kept 2026-11-14; caption cut.

Photographs: all kept, as above; none dropped.

Extra simulations (offered, not built): a Tc-99m generator, Mo-99 decaying on the alumina column with its 66 h half-life and the pertechnetate eluted each day, the reader setting the hours between elutions; it would show why a generator is milked daily rather than stocked.

## Types bound

`time` (the half-lives 6.01 hours, 66 hours, 458 years, Co-60's 5.272 a, the times in the beam), `energy` (the MeV of Figure 21.27), `current` and `charge` (the smoke detector's readout and "a small electric current"), `potential` ("a potential" the battery supplies), `angle` and `length` (the gantry's sliders), `mass` ("a few micrograms"). Nuclide notation, counts of procedures and tests, percents stay ink; particles through `F.el`.

Variables rows to add for the readouts: `t` (time), `I` (`electric-current`), `Q_charge` (charge).

## Referents

None.

## Exercises

No inline check. Three end-of-section items (55 to 57): `fs-idp257856896` keyed, kept; `fs-idp183594912` (Tc-99m leaving time) unkeyed numerical, left out and named; `fs-idp88874912` keyed, kept with the key as printed (it writes ¹³³I for the I-131 the prompt names).

## Left out

Nothing in the text. Errata kept as printed: "Radioimmunossays", "Grave’s disease" (twice), Tc-99m's half-life 6.01 hours here against 8.01 hours in Table 21.2, and the I-131/I-133 of `fs-idp88874912` and its key.

## Wanted at chapter level

- none

Applied by the chapter pass: the section's own variables rows anchored, `t` at `21.5-therapy`, `I` and `Q_charge` at `21.5-other-uses`; `ch21/COLOR.md` records the `current`, `charge`, `potential`, `angle`, `length` and `mass` bindings.
