# Exploration: Chemistry 2e, Chapter 21 Nuclear Chemistry

Written 2026-10-05, before the chapter was prepared. The seven modules were converted with `python3 tools/convert.py 21` and read in full. Figure, table and example numbers follow openstax.org (checked on the publisher's pages for 21.3 and 21.6), from the opener as Figure 21.1. Nothing departs from the book's organisation. This is the book's last chapter.

## Why this chapter

Every chapter before this one left the nucleus alone; this one opens it. 21.1 describes the nucleus as nucleons held by the strong nuclear force, measures its density, finds the mass defect and turns it into binding energy with E = mc², and reads stability from the band of stability, magic numbers and the curve of binding energy per nucleon. 21.2 names the particles of nuclear reactions (α, β, positron, γ, proton, neutron), meets antimatter and annihilation, and balances nuclear equations by mass number and charge. 21.3 is the chapter's heart: the five modes of decay and how a nuclide's place against the band predicts its mode, Rutherford's deflection of the three rays, decay series, first-order kinetics of decay with the decay constant and half-life, and radiometric dating by carbon-14 and by uranium, potassium and rubidium. 21.4 turns to transmutation, particle accelerators and the transuranium elements, then fission, chain reactions and critical mass, the bomb, the five parts of a reactor, three accidents, and fusion. 21.5 surveys radioactive tracers, medical isotopes and the Tc-99m generator, radiation therapy and commercial uses. 21.6 separates ionizing from nonionizing radiation, describes direct and indirect damage, penetration, radon, detectors, the units of activity and dose, and the effects of exposure.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Glossary | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68850 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 21.1 Nuclear Structure and Stability | m68851 | 3 | 2 | 0 | 1 | 13 | 3 | 10 | 5 | 1 Link to Learning |
| 21.2 Nuclear Equations | m68852 | 1 | 1 | 0 | 0 | 6 | 1 | 8 | 4 | — |
| 21.3 Radioactive Decay | m68854 | 3 | 8 | 0 | 1 | 12 | 3 | 28 | 14 | Everyday Life: PET Scan; 2 Link to Learning (one a PhET) |
| 21.4 Transmutation and Nuclear Energy | m68856 | 0 | 11 | 0 | 1 | 18 | 0 | 8 | 4 | Everyday Life: CERN Particle Accelerator, Nuclear Accidents; 4 Link to Learning (one a fission simulation) |
| 21.5 Uses of Radioisotopes | m68857 | 0 | 6 | 0 | 0 | 5 | 0 | 3 | 2 | — |
| 21.6 Biological Effects of Radiation | m68858 | 1 | 8 | 1 | 2 | 13 | 1 | 5 | 2 | Everyday Life: Radon Exposure |

Key Equations: 21.1 E = mc²; 21.3 decay rate = λN and t<sub>1/2</sub> = ln 2/λ = 0.693/λ; 21.6 rem = RBE × rad and Sv = RBE × Gy. Each is a form of its concept; the 21.3 equation N<sub>t</sub> = N<sub>0</sub>e<sup>−λt</sup> (not in the Key Equations box) is a form too.

## Numbers as openstax.org prints them

- Figures: intro 21.1 NuclearMed (PET scans, kept). 21.1: 21.2 BandStable, 21.3 BindEnergy. 21.2: 21.4 Nuclearrxs (id `CNX_Chem_21_02_Nuclearrxs`, file `CNX_Chem_21_03_RadioDecay-d92b.jpg`). 21.3: 21.5 Reaction1, 21.6 Radiation, 21.7 RadioDecay (file `CNX_Chem_21_03_RadioDecay-e619.jpg`), 21.8 PETScan (in the note), 21.9 DecayS, 21.10 HalfLife, 21.11 CarbonDate, 21.12 DSScrolls (inside Example 21.6). 21.4: 21.13 CERN (in the note), 21.14 Fission1, 21.15 Fission2 (a)(b), 21.16 ChnReact1, 21.17 CritMass (a)(b), 21.18 FissnBomb (a)(b), 21.19 NuclearPwr (a) photo (b) diagram, 21.20 ControlRod (a)(b), 21.21 3MileIslnd (a)(b) (in the note), 21.22 Fukushima (a) photo (b) map (in the note), 21.23 Fusion (a)(b). 21.5: 21.24 Thallium, 21.25 Tc-99 (a)(b), 21.26 RadTherapy (a)(b), 21.27 Co60Decay, 21.28 UsesOfRad (a)(b), 21.29 SmokeAlarm (photo + diagram). 21.6: 21.30 Damage1, 21.31 IonRadSpec, 21.32 Damage2 (a)(b), 21.33 Penetrate, 21.34 RadonExpos (in the note), 21.35 Monitors (a)–(c), 21.36 Exposure1, 21.37 Exposure2.
- Tables: 21.1 Stable Nuclear Isotopes (21.1, `fs-idp70040672`); 21.2 Half-lives of Radioactive Isotopes Important to Medicine (21.3, `fs-idp14399952`, with a footnote on the "m" of Tc-99m); 21.3 Preparation of Some of the Transuranium Elements (21.4, `fs-idm128006320`); 21.4 Units Used for Measuring Radiation (21.6, `fs-idp3417984`, spanned rows: write it from the CNXML); 21.5 Health Effects of Radiation (21.6, `fs-idp167827232`, spanned rows and a source footnote).
- Examples: 21.1 Density of a Neutron Star, 21.2 Calculation of Nuclear Binding Energy, 21.3 Calculation of Binding Energy per Nucleon (21.1); 21.4 Balancing Equations for Nuclear Reactions (21.2); 21.5 Rates of Radioactive Decay, 21.6 Radiocarbon Dating, 21.7 Radioactive Dating of Rocks (21.3); 21.8 Amount of Radiation (21.6). Each ends on a keyed Check Your Learning with a text answer.
- Unnumbered images in the text: one, 21.6 `fs-idp161523696` (`CNX_Chem_21_06_Hydroxyrad_img.jpg`, H₂O⁺ + H₂O → H₃O⁺ + OH). No exercise, key or example carries an image. Every one of the bundle's 38 `CNX_Chem_21_*` files is named by a module; none is spare.
- Cross-references to appendices: Appendix M (21.3, 21.5) is the sheet `/chemistry-2e/sheets/half-lives/`; "Check the periodic table" (Example 21.4) points at `/chemistry-2e/sheets/elements/`.

## What is new

Nuclear chemistry, the nuclide and its notation, nucleons, nuclear density, the strong nuclear force, mass defect, the mass-energy equivalence equation, nuclear binding energy, the electron volt, binding energy per nucleon and its peak near A = 56, the band of stability and the n:p ratio, magic numbers and the even–odd pattern, radioactivity and radioisotopes. Nuclear reactions, β particles, positrons, antimatter and annihilation, γ rays, balancing nuclear equations. Radioactive decay, parent and daughter nuclides, α decay, β decay, γ emission, positron emission, electron capture, predicting a decay mode from the band, decay series, first-order decay with its decay constant and half-life, radiometric and radiocarbon dating, dating rocks. Nuclear transmutation, particle accelerators, transuranium elements, fission, chain reactions, fissile material, critical, subcritical and supercritical mass, the nuclear reactor and its fuel, moderator, coolant, control rods and containment, fusion and fusion reactors. Radioactive tracers, medical radioisotopes, radiation therapy (external and internal) and chemotherapy, commercial uses. Ionizing and nonionizing radiation, direct and indirect radiation damage, penetrating power, detectors (Geiger counter, scintillation counter, dosimeter), activity units (becquerel, curie), absorbed dose (gray, rad), dose equivalent (sievert, rem, RBE), exposure and its effects.

Reused rather than restated: nucleus, proton, neutron, electron and alpha particle (2.2), isotopes, atomic number and mass number, isotope symbols, atomic mass unit (2.2, 2.3), the periodic table (2.5), density (1.4), mass (1.2), energy and energy units (5.1), chemical equations and balanced equations (4.1), electromagnetic radiation, photons and the spectrum (6.1), excited states (6.2), core electrons (6.4), ionization energy (6.5), free radicals (7.3), Graham's law (9.4), rate constant and first-order kinetics with half-life (12.3, 12.4), dynamic equilibrium (13.1, in one exercise).

Types: one added, `dose` (radiation dose in Gy, rad, Sv and rem), as College Physics 2e declares it: a dose is energy per kilogram of tissue, not an energy, and 21.6's figures and its key equations rem = RBE × rad and Sv = RBE × Gy draw it. Activity is a `rate` (the book: "if the rate is stated in nuclear decays per second, we refer to it as the activity"); the decay constant is a `rate-constant` (the book: "the same as a rate constant"); half-life is `time`; binding energy, binding energy per nucleon and the energy of a decay are `energy`; the mass defect is `mass`; nuclear density `density`; a radius or penetration depth `length`. In ink: Z, A, N, the n:p ratio, the RBE, counts of nuclei, percentages and fractions remaining, a yield of fission products.

Symbols staged: `λ_decay` (`\lambda`, `\klamdecay`), since `λ` is the wavelength; `N_0` and `N_t` (untyped, LaTeX only); `activity` (`\text{Activity}`, `\kactivity`) for Example 21.8's "Activity = λN". Reused: `E`, `m`, `c`, `d`, `V`, `r`, `t`, `t_half`, `rate`, `N_particles`.

## Sketches to redraw and photographs to keep

Photographs kept, each pointed at by the text or in a kept box: 21.1 (opener, intro page), 21.8 PET scanner and scans (note), 21.12 Dead Sea Scrolls, 21.13 CERN (note), the photograph halves of 21.19 and 21.20, 21.21 Three Mile Island and 21.22 Fukushima (note), 21.23 ITER model and NIF target, 21.24 thallium stress test, 21.25 Tc-99m generator and scan, 21.28 luggage X-ray and irradiated food, the photograph half of 21.29, 21.35 detectors. All with the book's captions and credits.

- 21.2 BandStable: neutrons against protons with the band, the stable line and n = Z. A still Figure on the chart: hover or a choice of the text's nuclides (nitrogen-14, iron-56, lead-207, the double-magic four) reading Z, n and the n:p ratio, the band and magic-number lines drawn; or a copy.
- 21.3 BindEnergy: binding energy per nucleon against mass number. A still Figure with a slider on A along the curve (detents at the text's ⁴He, ¹⁹F, ⁵⁶Fe, ²³⁵U), the readout from the book's numbers, the fusion and fission arrows as the two ways uphill to the peak near 56.
- Examples 21.2 and 21.3: a mass-defect Sim (nucleons apart, then bound, the missing mass turned into E = mc² in the readout) is a candidate; 21.1's call.
- 21.4 Nuclearrxs: a table of particles; rebuilt as a `div.book-table`-like table is not allowed for a numbered figure, so a faithful copy or a redrawn still Figure with `F.el('p+')`, `F.el('n0')`, `F.el('e-')`, `F.el('e+')`, `F.el('gamma')`.
- Example 21.4 and the history equations: a nuclear-equation balancer (still Sim, the A and Z sums in the readout) is a candidate; 21.2's call.
- 21.5 Reaction1 + 21.7 RadioDecay: one decay Figure with a choice of mode (α, β, γ, positron, electron capture), the parent nucleus emitting its particle (kinematic: the particle leaves), the daughter, the equation with A and Z changes in the readout. A fold (21.7 + 21.5) is natural; 21.3 decides.
- 21.6 Radiation: lead block, charged plates, photographic plate, the three beams bent by charge and mass. Kinematic (the beams travel); an apparatus, so a 3D bench with a bounded orbit under the book's rule, or flat moving if the section argues the side view is the lesson.
- 21.9 DecayS: the U-238 series stepped on its n–Z chart, a choice of step or a story through 14 decays (8 α, 6 β); still or moving.
- 21.10 HalfLife: Co-60 decay. A moving Figure: a sample of nuclei winking out at random under the curve, a choice of isotope from Table 21.2, N<sub>t</sub> = N<sub>0</sub>e<sup>−λt</sup> in the readout with the book's 5.27 y the default.
- 21.11 CarbonDate: kinematic arrows (neutron in, CO₂ taken up, decay after death); a moving Figure or a dating Sim with a slider on the measured ratio returning the age (Example 21.6's numbers). The PhET radiometric-dating link is the trigger for a dating Sim (rule 18 of the book).
- 21.14 Fission1 + 21.16 ChnReact1: a neutron striking U-235, the U-236 neck, fragments and neutrons flying (kinematic); a chain-reaction Sim that branches generation by generation is the chapter's centrepiece candidate, with the fission-simulation link as its trigger.
- 21.15 Fission2: equations and the yield graph; copy, or the graph redrawn flat.
- 21.17 CritMass: neutrons escaping a small sphere and not a large one, kinematic; a particle picture, so 3D under the book's rule (a sphere with a size slider, the fraction escaping read as surface against volume). 21.4 argues the tier.
- 21.18 FissnBomb: gun and implosion designs with photographs; copy (the white arrows are motion, but the section may argue a copy keeps the subject restrained).
- 21.19(b) PWR diagram: flow arrows are kinematic; a moving cutaway with control-rod depth is a candidate, folding 21.20(b).
- 21.26 RadTherapy: the gantry swinging round the tumour; a moving Figure where the beam rotates and the dose piles up at the target and not around it.
- 21.27 Co60Decay: energy ladder, copy or still with the two branches.
- 21.29 SmokeAlarm diagram: ions carrying current between plates, smoke stopping them; a moving Figure with a smoke slider and the current falling.
- 21.31 IonRadSpec: the spectrum split at the ionizing threshold; a still Figure with a slider on frequency, the photon energy against a bond energy, spectrum colours as fact in the visible band only.
- 21.33 Penetrate: α, β, neutron and γ against paper, metal, water, concrete, lead; kinematic, a moving Figure with a choice of radiation.
- 21.30 Damage1, 21.32 Damage2, 21.34 RadonExpos, 21.36 Exposure1: copies, or a morph for 21.32 (b); 21.37 Exposure2: bar graph, copy or redrawn with the `dose` hue on a broken axis.

## Notes, Link to Learning and PhET

Seven Link to Learning notes, dropped and named in `notes`: four fundamental forces (21.1); cloud chamber, PhET radiometric dating (21.3, the second a trigger for a dating Sim); CERN tour and video, fission simulation (a trigger), reactors video, waste management (21.4). No `simulation-exercise`. Boxes kept verbatim as `div.note`: PET Scan (Everyday Life, with 21.8) in 21.3; CERN Particle Accelerator (with 21.13) and Nuclear Accidents (with 21.21, 21.22) in 21.4; Radon Exposure (with 21.34) in 21.6. Footnotes: Table 21.2's on Tc-99m; Table 21.5's source.

## Exercises that belong elsewhere

One move: 21.2's `fs-idp74968928` (binding energy of ¹⁹F, keyed) tests only 21.1's binding energy and goes to 21.1 with `source_section` 21.2; both sections' `exercise_notes` say so. 21.2's `fs-idp208355344` (C-14 decay to N₂ gas) is unkeyed and left out. 21.3's `fs-idp168859936` and `fs-idp172415648` (energy of a decay from masses) use 21.1's mass defect but also the decay modes, and stay.

## Keyed and unkeyed

Precedent (Chapters 18 to 20): an unkeyed item whose answer would be computed (a number, an equation, a nuclide symbol, a decay mode) is left out; an unkeyed choice item is kept open with its options; an unkeyed why or explain item is kept with an AI-marked suggested approach.

- 21.1: 10 items, 5 keyed. Left out: `fs-idm1122208` (nuclide notation), `fs-idm82455680` (counts of particles), `fs-idm91931648`, `fs-idm82186208` (numerical). Open with options: `fs-idp43351040`. Plus the keyed `fs-idp74968928` from 21.2. 7 items.
- 21.2: 8 items, 4 keyed (one moved to 21.1). Left out: `fs-idm5988192`, `fs-idp59747856` (equations), `fs-idp208355344` (numerical). Suggested approach: `fs-idp158311008`. 4 items.
- 21.3: 28 items, 14 keyed. Left out: `fs-idm82641568`, `fs-idp53072816` (decay modes), `fs-idp14930000`, `fs-idm23721392` (equations), `fs-idm20282880`, `fs-idp160912384`, `fs-idp22881184`, `fs-idp75965808`, `fs-idm70032656`, `fs-idp172415648`, `fs-idp50360016` (numerical, the last two with equations). Suggested approach: `fs-idp81671360`, `fs-idm39924368`, `fs-idp1698768`. 17 items.
- 21.4: 8 items, 4 keyed. Left out: `fs-idm210379536` (numerical). Suggested approach: `fs-idm227188304`, `fs-idm153436832`, `fs-idm209547408`. 7 items.
- 21.5: 3 items, 2 keyed. Left out: `fs-idp183594912` (numerical). 2 items.
- 21.6: 5 items, 2 keyed. Suggested approach: `fs-idp29076672`, `fs-idp16044272`, `fs-idp224139168`. 5 items.
- Eight Check Your Learning items, all keyed, inline after their examples (21.1 three, 21.2 one, 21.3 three, 21.6 one). Read the CNXML for each key.

## Errata to carry as printed and name in `notes`

- 21.1: "divided by the number or nucleons"; Example 21.3's "(Note also that this is the same process as in Example 21.1 …)" points at the density example rather than Example 21.2; the CYL key of Example 21.2 is 148.4 MeV and the key of `fs-idp74968928` 148.8 MeV for the same ¹⁹F; the glossary's "radioactivity: phenomenon exhibited by an unstable nucleon"; the bundle's alt text of 21.2 and 21.3 swaps the axes (the alt is ours anyway).
- 21.2: key `fs-idp225643904` (b) "¹⁴₇C + n" for ¹⁴₇N.
- 21.3: "the actinide series" (the actinium series); "The decay constant, λ, which is the same as a rate constant" (a fragment); "²³⁹₉₄Ra is 24,000 years" (plutonium); "as seen is gas samples"; the doubled "¹⁴C¹⁴CO₂"; Example 21.5's "(15 × y)" and 2.0% then 2.00%; Rb-87's half-life 48.8 billion years in the text and 4.7 × 10¹⁰ y in Example 21.7 and `fs-idp60953824`; the carbon-14 limit "about 57,000 years" after "a maximum of about 50,000 years"; keys `fs-idp13838752` "η (neutrons)", `fs-idp50277600` (a) "+₊₁⁰e" for the β particle and (c) "₀¹p" for the neutron, `fs-idp87827184` "5770 years", `fs-idp226288768` "c = 0", `fs-idp92569456` (b) "₋₁⁰e" for the positron and (c) "₋₁⁰Np".
- 21.4: "split the U-238 nuclei" after uranium-235; "Strassman"; Table 21.3's meitnerium "107" beside ²⁶⁶₁₀₉Mt; the sun's equation "2₊₁⁰e⁺"; fusion's 3.6 × 10¹¹ kJ "somewhat larger" than fission's 1.8 × 10¹⁰ kJ; "any radioactive materials might be released"; the summary names technetium and astatine, which this section does not make.
- 21.5: "Radioimmunossays"; "Grave’s disease" (twice); Tc-99m's half-life 6.01 hours here and 8.01 hours in Table 21.2; `fs-idp88874912` speaks of I-131 with a half-life of 8.70 days and of I-133, and its key writes ¹³³I.
- 21.6: Example 21.8's "1 Ci = 3.7 × 10¹¹ decay/s" (the text says 10¹⁰) with its result 5.7 × 10² Ci; Co-60's half-life 5.26 y here and 5.27 y in 21.3; "cause phosphorus to glow"; "uranium-238, a radon emitter"; "cosmic rays from the sun"; "Rem = RBE × rad" in Table 21.4; "the tissue damage units (rem or Sv) includes"; "loss of consciousness;"; the glossary's millicurie repeating the curie's definition and calling the rad an "SI unit"; "roentgen equivalent for man" in the text and "roentgen equivalent man" in the glossary; the 21.36 image's "bequerels".

## Root rule 28

Physical 3D under the book's rule: the deflection bench of 21.6 (an apparatus), the critical-mass sphere of 21.17 (a particle picture whose lesson is surface against volume), and a reactor core if 21.4 argues one; each bounded, never from beneath where it stands on a bench. Flat: the n–Z chart and band of stability, the binding-energy curve, decay and chain-reaction diagrams (a nucleus is a packing of nucleon discs whose counts are the lesson, not its arrangement), the decay series, the half-life and dating graphs, the yield graph, the reactor and smoke-detector cutaways, the gantry, the spectrum, the penetration strip, the dose bars, every nuclear equation and table. No locked view argued; the lead block of 21.6, if drawn flat, may take one.

## BE INSPIRING

Pull a helium nucleus apart and watch 0.0305 amu reappear as 28.4 MeV. Slide along the curve of binding energy and feel both fission and fusion run uphill toward iron. Pick a nuclide off the chart, see which side of the band it sits on, and watch it spit the α, β or positron that walks it back toward stability, step by step down the fourteen decays from uranium-238 to lead-206. Hold a sample of cobalt-60 and watch half of it vanish every 5.27 years, at random, one nucleus at a time, while the curve traces itself. Fire one neutron into uranium-235 and watch the chain branch, then shrink the sphere until too many neutrons escape and the chain dies. Swing the cobalt-60 gantry around a tumour and watch the dose pile up at the target and nowhere else.
