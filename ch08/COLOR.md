# Chapter 8 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue.

## What the chapter binds

One type, `energy`, and only where an energy is drawn as a quantity.

| Section | Binds | What wears it |
|---|---|---|
| `intro` | nothing | one photograph and a Lewis structure in ink |
| 8.1 | `energy` | the energy axis, curve and readout of Figure 8.2, the bond energy marked at its minimum and the E of the readout; the internuclear distance is a length and stays ink |
| 8.2 | `energy` | only where an orbital energy-level diagram (8.9, 8.13, 8.16) is drawn live: its E axis; the orbital lines and electron arrows are ink. The 3D hybrid figures bind nothing |
| 8.3 | `energy` if Figure 8.22 is drawn live, otherwise nothing | as 8.2 |
| 8.4 | `energy` | the energy axis of every MO diagram and of the bands of 8.39. Bond order, the count of electrons and the number of unpaired electrons are untyped counts and stay ink |

## Orbitals, phases, atoms

- **Atoms** take the element palette through `F.el` in every figure: hydrogen white, carbon black, oxygen red, nitrogen blue, chlorine green, sulfur yellow, phosphorus orange, and the rest from the library. A nucleus drawn as the book's dot is ink.
- **Orbital lobes are not a type.** A lobe is a surface of a wave function, and its sign is the one thing about it the reader must tell apart. The two phases take two categorical colours, `F.cat(0)` and `F.cat(1)`, the same pair in every figure of the chapter and never a hue the page binds; the legend or the caption names them as the two phases of the wave function. Where phase is not the lesson (the hybrid sets of 8.2 drawn in the book's single colour), all lobes take `F.cat(0)`, and the book's "s blue, p red, hybrid yellow" becomes three categorical colours `F.cat(0..2)` in the mixing figures, named in a legend.
- **Nodes** are drawn as a dashed plane or line in ink.
- **Electrons** in energy-level and MO diagrams are ink half-arrows; unpaired ones may be set apart by position, never by a hue.
- **The Band Theory figure (8.39)**: the valence and conduction bands take two categorical colours; the band gap is an energy and its bracket takes the energy hue.
- **The magnet** in any O₂ figure is a drawn thing with no type; its poles may carry the conventional N/S labels in ink.

## What stays in ink

Lengths and distances (bond length, internuclear distance), angles, bond order, counts of σ and π bonds and of electrons, the Lewis structures, every axis rule, arrow and label that is not an energy, and the letters of the hybridization names. No symbol is written with a `\k` macro except `E` (`\kE`) where an energy is stated.

## As built

As planned. `energy` is bound on the energy axis of Figure 8.2, on the axes of the live energy-level and MO diagrams of 8.2, 8.3 and 8.4, and on the band gap bracket of Figure 8.39; phases are `F.cat(0)` and `F.cat(1)` throughout, the s, p and hybrid orbitals of the mixing figures `F.cat(0..2)`, the four σ orbitals of Figure 8.38 `F.cat(1)`, and the valence and conduction bands of Figure 8.39 two categorical colours.
