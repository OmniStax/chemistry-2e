# Plan: 6.1 Electromagnetic Energy (m68729)

Source: `source.md`. Status: applied as proposed on 2026-09-28, on Chen's
instruction to finish the book without check-ins; left for review after the build.

Five learning objectives, twelve numbered figures (6.2 to 6.13), three worked
examples (6.1 to 6.3) each with a Check Your Learning, one Chemistry in Everyday
Life note, one Portrait of a Chemist, two Link to Learning notes (dropped), the
unnumbered Key Equations table (the chapter's equations table), fifteen
end-of-chapter exercises of which eight are keyed, seventeen glossary terms.

## Sub-concepts (page headers)

1. `light` **The nature of light**: the two opening paragraphs, Newton to Maxwell to the paradoxes. Uses `wave-particle-duality` (foreshadowed).
2. `waves` **Waves** (book): wave, wavelength, frequency, amplitude, Figure 6.2. Introduces `wave-properties`.
3. `wave-speed` **The speed of a wave**: λν = c. Introduces `wave-speed-relation`.
4. `em-spectrum` **The electromagnetic spectrum**: Figure 6.3, Example 6.1 (`ex-frequency`), the Wireless Communication note with Figure 6.5. Introduces `electromagnetic-spectrum`.
5. `interference` **Interference**: Figure 6.6 and the Dorothy Crowfoot Hodgkin portrait. Uses `wave-properties`.
6. `standing-waves` **Standing waves and quantization**: Figures 6.7 and 6.8. Introduces `standing-waves-quantization`.
7. `blackbody` **Blackbody Radiation and the Ultraviolet Catastrophe** (book): Figures 6.9 and 6.10, E = nhν. Introduces `blackbody-radiation`.
8. `photoelectric` **The Photoelectric Effect** (book): photons, E = hν = hc/λ, duality, Figure 6.11, Examples 6.2 (`ex-photon-energy`) and 6.3 (`ex-photoelectric`). Introduces `photoelectric-effect`, `photon-energy`, `wave-particle-duality`.
9. `line-spectra` **Line Spectra** (book): continuous against line spectra, Figures 6.12 and 6.13. Introduces `line-spectra`.
10. `rydberg` **The Balmer and Rydberg formulas**: the two empirical formulas and Bohr. Reinforces `line-spectra`.

## Figures

- sim-wave · Figure 6.2 · wave-properties, wave-speed-relation · variation by slider, flow by animation: the reader sees the wavelength shrink as the frequency rises while the front still covers the same distance in one second · moving, the wave travels and one crest is followed across the one-second frame (a travelling wave has a clock) · ν slider (frequency, 1 to 12 Hz, detents at the book's 3, 6, 12 Hz), amplitude a slider (untyped, ink) · headline states ν, λ and that the wave covers 12 m in one second · none · 2D
- sim-spectrum · Figure 6.3 · electromagnetic-spectrum, wave-speed-relation, photon-energy · variation by slider across fifteen decades: the reader drags one wavelength and watches ν and E move the opposite way on their own scales · still, a spectrum has no clock · log₁₀(λ/m) slider (wavelength, −12 to 3, detents at Example 6.1's 589 nm and the Check Your Learning's 850 MHz, 0.353 m) · headline names the region and λ, ν, E · none · 2D. The visible band wears the colours of light (physical fact); the book's photo strip stays in `originals`.
- Figure 6.4 (radio and cell towers): dropped, a stock scene beside a note; named in `notes`.
- sim-amfm · Figure 6.5 · electromagnetic-spectrum · variation by choice: one signal carried two ways, the carrier bending from one encoding into the other · still, the choice morphs the carrier (choice.curve) and nothing has a clock · choice AM / FM · headline says what varies · none · 2D
- fig-fringes · Figure 6.6 · kept photograph, the text points at it.
- sim-string · Figure 6.7 · standing-waves-quantization · flow by animation, variation by choice: the string vibrates and its nodes stand still · moving, the string oscillates (a vibration is a clock) · choice n = 1 to 6 (a quantum number is discrete, rule 26.1) · headline states n, the n − 1 nodes and λ = 2L/n · none · 2D
- fig-drum · Figure 6.8 · kept photograph, the text points at it.
- fig-solar · Figure 6.9 · kept as the book's image: measured solar data the book does not tabulate; not folded into 6.10, which carries the 5250 °C blackbody as a special.
- sim-blackbody · Figure 6.10 · blackbody-radiation · variation by slider, and a choice of theory that shows the ultraviolet catastrophe: the peak slides into the visible and grows as T rises, and the classical curve runs off the top at short wavelengths · still, the curves answer the slider · T slider (temperature, 2000 to 7000 K, detents at the book's 3000, 4000, 5000, 6000 K, special at 5523 K = 5250 °C, the sun of Figure 6.9), choice observed / classical theory · headline gives T and λ_max · graph alone · 2D. Wavelength axis and λ_max in the wavelength hue; visible band under the curve in the colours of light.
- sim-photoelectric · Figure 6.11 · photoelectric-effect, photon-energy · flow by animation, variation by slider: photons strike the metal and electrons leave only above the threshold, faster as λ shortens and more of them as the light brightens · moving, photons arrive and electrons fly (a clock) · λ slider (wavelength, 200 to 800 nm, detents at the book's 700, 550, 400 nm, special at the threshold 619 nm), brightness slider (untyped, photons per unit time, ink) · headline states whether electrons leave and v_max · none · 2D. The metal is the book's unnamed one (threshold 3.21 × 10⁻¹⁹ J, from the figure's two speeds), drawn in ink as apparatus; the electron ink; the photon wave in the colour of its light.
- fig-neon · Figure 6.12 · kept photograph, the text points at it.
- fig-line-spectra · Figure 6.13 · kept as the book's image: measured spectra.

Binds: wavelength, frequency, energy, temperature. Link to Learning notes (kettle drum video, photoelectric simulation) dropped; the simulation is the trigger for sim-photoelectric.

## Exercises

Three Check Your Learning items inline after their examples (hosts in `ex-frequency`, `ex-photon-energy`, `ex-photoelectric`), book answers. Eight keyed end-of-chapter items: fs-idm27661840 (open), fs-idm14736000, fs-idm74775376, fs-idm60446336, fs-idm104859984, fs-idp28548400, fs-idm83382672 (open, "somewhat different numbers are also possible"), fs-idm115982512. Seven unkeyed numerical items left out and named in `exercise_notes`.

## Wanted at chapter level

- equations `eq-wave-speed` → 6.1-wave-speed
- equations `eq-planck-quantization` → 6.1-blackbody
- equations `eq-photon-energy` → 6.1-photoelectric
- equations `eq-balmer` → 6.1-rydberg
- equations `eq-rydberg` → 6.1-rydberg
- glossary `electromagnetic radiation` → 6.1-light
- glossary `wave`, `wavelength (<i>λ</i>)`, `frequency (<i>ν</i>)`, `amplitude`, `hertz (Hz)`, `intensity` → 6.1-waves
- glossary `electromagnetic spectrum` → 6.1-em-spectrum
- glossary `interference pattern` → 6.1-interference
- glossary `standing wave`, `quantization`, `node` → 6.1-standing-waves
- glossary `continuous spectrum`, `blackbody` → 6.1-blackbody
- glossary `photon`, `wave-particle duality` → 6.1-photoelectric
- glossary `line spectrum` → 6.1-line-spectra
- The concept `photon-energy`'s evidence names Example 6.2 and its Check Your Learning correctly; nothing to change.

### Applied by the chapter pass (2026-09-28)

Every equation anchor above is written. The variable rows, which the list does not name, are anchored as well: λ, ν and c to `6.1-wave-speed`; E, h, n, λ_max and T to `6.1-blackbody`; R∞ and k to `6.1-rydberg`. Glossary rows carry no anchor field, so the glossary lines are not written; the terms "wavelength (λ)" and "frequency (ν)" are now plain words.
