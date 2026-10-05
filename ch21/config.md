# Config: Chemistry 2e, Chapter 21

Proposed by the agent after the chapter exploration (2026-10-05). Status: applied as proposed on 2026-10-05, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 21 Nuclear Chemistry, modules m68850 (introduction), m68851, m68852, m68854, m68856, m68857, m68858 |
| Front matter | the chapter introduction (m68850) is a page of its own in `ch21/intro/`, listed before 21.1, built by the prep agent with Figure 21.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded |
| Loop | prep → plan file → build → validator, the six sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), Key Equations and the glossary go to the tables |
| Headers | the book's own headers kept (21.1 Nuclear Binding Energy, Nuclear Stability; 21.2 Types of Particles in Nuclear Reactions, Balancing Nuclear Reactions; 21.3 Types of Radioactive Decay, Radioactive Decay Series, Radioactive Half-Lives, Radiometric Dating with its two subheads; 21.4 Synthesis of Nuclides, Nuclear Fission with Fission Reactors, Nuclear Fuels, Nuclear Moderators, Reactor Coolants, Control Rods, Shield and Containment System, Nuclear Fusion and Fusion Reactors; 21.6 Ionizing and Nonionizing Radiation with Biological Effects of Exposure to Radiation, Measuring Radiation Exposure with Units of Radiation Measurement, Effects of Long-term Radiation Exposure on the Human Body); one header of the section's own for each untitled opening (21.1, 21.2, 21.3, 21.6), and 21.5, which prints no header, takes two or three (tracers and medicine, therapy, other uses) |
| Boxed notes | PET Scan (21.3), CERN Particle Accelerator and Nuclear Accidents (21.4), Radon Exposure (21.6), verbatim as `div.note` with the book's eyebrow and an `<h3>` title |
| Link to Learning | seven (21.1 one, 21.3 two, 21.4 four) dropped and named in `notes`; the PhET radiometric-dating link (21.3) and the fission simulation (21.4) are triggers for Sims of our own |
| Footnotes | Table 21.2's on Tc-99m and Table 21.5's source, kept as the book's footnotes |
| Tables | Tables 21.1 to 21.5 as `div.book-table`; 21.4 and 21.5 have spanned rows written from the CNXML by hand |
| Example numbers | 21.1 to 21.8 (three in 21.1, one in 21.2, three in 21.3, one in 21.6), each with a keyed Check Your Learning inline |
| Figure numbers | 21.1 to 21.37, listed per section in `exploration.md` |
| Figures | 21.2 band of stability on a still n–Z chart; 21.3 binding energy per nucleon with a slider on A; 21.5 + 21.7 one decay Figure with a choice of mode (moving: the particle leaves); 21.6 deflection of α, β, γ (moving, a bench); 21.9 the U-238 series stepped; 21.10 Co-60 decaying at random under its curve (moving), a choice of Table 21.2's isotopes; 21.11 or a Sim for radiocarbon dating (PhET trigger); 21.14 + 21.16 fission and the chain reaction (moving, fission-simulation trigger); 21.17 critical mass (moving); 21.26 the gantry (moving); 21.29 the smoke detector (moving); 21.31 the ionizing threshold on a frequency slider; 21.33 penetration (moving); the rest copies or kept photographs; each section's plan decides folds and tiers |
| Photographs | every photograph is pointed at by the text or sits in a kept box, and is kept (listed in `exploration.md`); Figure 21.1 on the introduction page |
| Unnumbered images | one, 21.6's hydroxyl-radical reaction (`fs-idp161523696`), kept as a `figure` row with no number or rebuilt as a displayed equation |
| 3D | the deflection bench (21.6) and the critical-mass sphere (21.17) physical 3D under the book's rule, bounded; nuclei as flat packings of nucleon discs; charts, graphs, cutaways, equations and tables flat; see `exploration.md` |
| Motion | per figure in its plan line; an emitted particle, a beam, a neutron in flight, a flow in a reactor or detector and a swinging gantry are kinematic and set the moving tier; reaction arrows and decay arrows on a chart are not |
| Colour | `F.el('p+')`, `F.el('n0')`, `F.el('e-')`, `F.el('e+')`, `F.el('gamma')` for the particles, never the book's green protons; types as `COLOR.md` binds them |
| Types | one added: `dose` (Gy, rad, Sv, rem); the colours script is run by the chapter pass or Chen, not the prep |
| Symbols | `λ_decay` (`\klamdecay`), `N_0`, `N_t`, `activity` (`\kactivity`) staged; `E`, `m`, `c`, `d`, `V`, `r`, `t`, `t_half`, `rate`, `N_particles` reused; never `\klam` for the decay constant |
| Inline exercises | eight Check Your Learning items, each in a host `div.exercises` with `data-place` after its example |
| Exercises tab | end-of-section items, kind `exercise`; no `simulation-exercise` |
| Exercise placement | one move, 21.2's `fs-idp74968928` to 21.1 with `source_section` 21.2 |
| Answers to book problems | the book's key only; 20 unkeyed items whose answers would be computed left out (4, 3, 11, 1, 1, 0); one unkeyed choice item kept open with its options (21.1); seven unkeyed conceptual items kept with an AI-marked suggested approach (0, 1, 3, 3, 0, 3) |
| Generated questions | none |
| Concept nodes | merged per section (see `book-rows.json`) with prerequisite edges into Chapters 1, 2, 4, 5, 6, 7, 9, 12 and within the chapter |
| Formulas | E = mc² on `mass-energy-equivalence`; λ = ln 2/t<sub>1/2</sub> and t<sub>1/2</sub> = ln 2/λ on `decay-constant`; decay rate = λN on `radioactive-decay-rate`; N<sub>t</sub> = N<sub>0</sub>e<sup>−λt</sup> and its solution for t on `first-order-radioactive-decay`; rem = RBE × rad and Sv = RBE × Gy on `dose-equivalent`; the nuclear equations stay in the text |
| Glossary | the book's wording, 67 entries, each a term on this chapter's concepts on the section that introduces it, except "alpha particle", which is 2.2's `alpha-particle` |
| Degrees | `°` in prose and `^\circ` in math, never `º` |
| Cross references | plain text to other sections; `/chemistry-2e/sheets/half-lives/` for Appendix M and `/chemistry-2e/sheets/elements/` where the text points at the periodic table |
| Labels | Figure for a book number, Sim for an addition |
| `ai` and `built` | `{"text":[{"model":"claude-opus-5-5","effort":"high"}],"figures":[{"model":"claude-opus-5-5","effort":"high"}]}`, `2026-10-05`; every figure row carries its own `ai` |
| Book manifest | `ch21` added to `book.json` by `ost merge chemistry-2e 21` |
