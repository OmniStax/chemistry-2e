# Molecular Orbital Theory

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Outline the basic quantum-mechanical approach to deriving molecular orbitals from atomic orbitals
- Describe traits of bonding and antibonding molecular orbitals
- Calculate bond orders based on molecular electron configurations
- Write molecular electron configurations for first- and second-row diatomic molecules
- Relate these electron configurations to the molecules’ stabilities and magnetic properties

For almost every covalent molecule that exists, we can now draw the Lewis structure, predict the electron-pair geometry, predict the molecular geometry, and come close to predicting bond angles. However, one of the most important molecules we know, the oxygen molecule O<sub>2</sub>, presents a problem with respect to its Lewis structure. We would write the following Lewis structure for O<sub>2</sub>:

> IMAGE {img:fs-idm39755904} src=../../media/CNX_Chem_08_04_O2_img.jpg
> alt: A Lewis structure is shown. It is made up of two oxygen atoms, each with two lone pairs of electrons, bonded together with a double bond.

This electronic structure adheres to all the rules governing Lewis theory. There is an O=O double bond, and each oxygen atom has eight electrons around it. However, this picture is at odds with the magnetic behavior of oxygen. By itself, O<sub>2</sub> is not magnetic, but it is attracted to magnetic fields. Thus, when we pour liquid oxygen past a strong magnet, it collects between the poles of the magnet and defies gravity, as in [ref:CNX_Chem_08_00_LiqO2](module:m68743). Such attraction to a magnetic field is called {term:paramagnetism}, and it arises in molecules that have unpaired electrons. And yet, the Lewis structure of O<sub>2</sub> indicates that all electrons are paired. How do we account for this discrepancy?
Magnetic susceptibility measures the force experienced by a substance in a magnetic field. When we compare the weight of a sample to the weight measured in a magnetic field ([ref:CNX_Chem_08_04_Gouy]), paramagnetic samples that are attracted to the magnet will appear heavier because of the force exerted by the magnetic field. We can calculate the number of unpaired electrons based on the increase in weight.

> FIGURE {fig:CNX_Chem_08_04_Gouy} src=../../media/CNX_Chem_08_04_Gouy.jpg class=scaled-down
> alt: A diagram depicts a stand supporting two objects that are held in balance by a horizontal bar. On the right, the bar supports a dish that is holding two weights. On the left there is a line attached to a test tube labeled, “Sample tube.” The test tube has been lowered into the space labeled, “Magnetic field,” between two structures labeled, “Electromagnets.”
> caption: A {index:Gouy} balance compares the mass of a sample in the presence of a magnetic field with the mass with the electromagnet turned off to determine the number of unpaired electrons in a sample.

Experiments show that each O<sub>2</sub> molecule has two unpaired electrons. The Lewis-structure model does not predict the presence of these two unpaired electrons. Unlike oxygen, the apparent weight of most molecules decreases slightly in the presence of an inhomogeneous magnetic field. Materials in which all of the electrons are paired are {term:diamagnetic} and weakly repel a magnetic field. Paramagnetic and diamagnetic materials do not act as permanent magnets. Only in the presence of an applied magnetic field do they demonstrate attraction or repulsion.

:::note [chemistry link-to-learning] 
View this [brief video](http://openstax.org/l/16diamagnetic) to see several demonstrations of paramagnetic and diamagnetic behavior.
:::
Molecular orbital theory (MO theory) provides an explanation of chemical bonding that accounts for the paramagnetism of the oxygen molecule. It also explains the bonding in a number of other molecules, such as violations of the octet rule and more molecules with more complicated bonding (beyond the scope of this text) that are difficult to describe with Lewis structures. Additionally, it provides a model for describing the energies of electrons in a molecule and the probable location of these electrons. Unlike valence bond theory, which uses hybrid orbitals that are assigned to one specific atom, MO theory uses the combination of atomic orbitals to yield molecular orbitals that are *delocalized* over the entire molecule rather than being localized on its constituent atoms. MO theory also helps us understand why some substances are electrical conductors, others are semiconductors, and still others are insulators. [ref:fs-idm162808816] summarizes the main points of the two complementary bonding theories. Both theories provide different, useful ways of describing molecular structure.

> TABLE {tab:fs-idm162808816} cols=2 class=top-titled
> title: Comparison of Bonding Theories
> summary: A table is shown that is composed of two columns and six rows. The header row reads, “Valence Bond Theory,” and, “Molecular Orbital Theory.” The first column contains the phrases: “considers bonds as localized between one pair of atoms,” “creates bonds from overlap of atomic orbitals ( s, p, d…) and hybrid orbitals ( s p , s p superscript 2, s p superscript 3 … ) ,” “forms sigma or pi bonds,” “predicts molecular shape based on the number of regions of electron density,” and, “needs multiple structures are needed to describe resonance.” The second column reads, “considers electrons delocalized throughout the entire molecule,” “combines atomic orbitals to form molecular orbitals ( sigma, sigma superscript asterik, pi, pi superscript asterisk ),” “creates bonding and antibonding interactions based on which orbitals are filled,” “predicts the arrangement of electrons in molecules.”

| Valence Bond Theory | Molecular Orbital Theory |
| --- | --- |
| considers bonds as localized between one pair of atoms | considers electrons delocalized throughout the entire molecule |
| creates bonds from overlap of atomic orbitals (*s, p, d*…) and hybrid orbitals (*sp, sp*<sup>2</sup>, *sp*<sup>3</sup>…) | combines atomic orbitals to form molecular orbitals (σ, σ*, π, π*) |
| forms σ or π bonds | creates bonding and antibonding interactions based on which orbitals are filled |
| predicts molecular shape based on the number of regions of electron density | predicts the arrangement of electrons in molecules |
| needs multiple structures to describe resonance |  |

{term:Molecular orbital theory} describes the distribution of electrons in molecules in much the same way that the distribution of electrons in atoms is described using atomic orbitals. Using quantum mechanics, the behavior of an electron in a molecule is still described by a wave function, *Ψ*, analogous to the behavior in an atom. Just like electrons around isolated atoms, electrons around atoms in molecules are limited to discrete (quantized) energies. The region of space in which a valence electron in a molecule is likely to be found is called a {term:molecular orbital (*Ψ*<sup>2</sup>)}. Like an atomic orbital, a molecular orbital is full when it contains two electrons with opposite spin.
We will consider the molecular orbitals in molecules composed of two identical atoms (H<sub>2</sub> or Cl<sub>2</sub>, for example). Such molecules are called {term:homonuclear diatomic molecules}. In these diatomic molecules, several types of molecular orbitals occur.
The mathematical process of combining atomic orbitals to generate molecular orbitals is called the {term:linear combination of atomic orbitals (LCAO)}. The wave function describes the wavelike properties of an electron. Molecular orbitals are combinations of atomic orbital wave functions. Combining waves can lead to constructive interference, in which peaks line up with peaks, or destructive interference, in which peaks line up with troughs ([ref:CNX_Chem_08_04_waveadd]). In orbitals, the waves are three dimensional, and they combine with in-phase waves producing regions with a higher probability of electron density and out-of-phase waves producing nodes, or regions of no electron density.

> FIGURE {fig:CNX_Chem_08_04_waveadd} src=../../media/CNX_Chem_08_04_waveadd.jpg
> alt: A pair of diagrams are shown and labeled, “a” and “b.” Diagram a shows two identical waves with two crests and two troughs. They are drawn one above the other with a plus sign in between and an equal sign to the right. To the right of the equal sign is a much taller wave with a same number of troughs and crests. Diagram b shows two waves with two crests and two troughs, but they are mirror images of one another rotated over a horizontal axis. They are drawn one above the other with a plus sign in between and an equal sign to the right. To the right of the equal sign is a flat line.
> caption: (a) When in-phase waves combine, constructive interference produces a wave with greater amplitude. (b) When out-of-phase waves combine, destructive interference produces a wave with less (or no) amplitude.

There are two types of molecular orbitals that can form from the overlap of two atomic *s* orbitals on adjacent atoms. The two types are illustrated in [ref:CNX_Chem_08_04_ssigma]. The in-phase combination produces a lower energy {term:σ<sub>*s*</sub> molecular orbital} (read as "sigma-s") in which most of the electron density is directly between the nuclei. The out-of-phase addition (which can also be thought of as subtracting the wave functions) produces a higher energy {term:${\sigma}_{s}^{*}$ molecular orbital} (read as "sigma-s-star") molecular orbital in which there is a node between the nuclei. The asterisk signifies that the orbital is an antibonding orbital. Electrons in a σ*<sub>s</sub>* orbital are attracted by both nuclei at the same time and are more stable (of lower energy) than they would be in the isolated atoms. Adding electrons to these orbitals creates a force that holds the two nuclei together, so we call these orbitals {term:bonding orbitals}. Electrons in the ${\sigma}_{s}^{*}$ orbitals are located well away from the region between the two nuclei. The attractive force between the nuclei and these electrons pulls the two nuclei apart. Hence, these orbitals are called {term:antibonding orbitals}. Electrons fill the lower-energy bonding orbital before the higher-energy antibonding orbital, just as they fill lower-energy atomic orbitals before they fill higher-energy atomic orbitals.

> FIGURE {fig:CNX_Chem_08_04_ssigma} src=../../media/CNX_Chem_08_04_ssigma.jpg class=scaled-down
> alt: A diagram is shown that depicts a vertical upward-facing arrow that lies to the left of all the other portions of the diagram and is labeled, “E.” To the immediate right of the midpoint of the arrow are two circles each labeled with a positive sign, the letter S, and the phrase, “Atomic orbitals.” These are followed by a right-facing horizontal arrow that points to the same two circles labeled with plus signs, but they are now touching and are labeled, “Combine atomic orbitals.” Two right-facing arrows lead to the last portion of the diagram, one facing upward and one facing downward. The upper arrow is labeled, “Subtract,” and points to two oblong ovals labeled with plus signs, and the phrase, “Antibonding orbitals sigma subscript s superscript asterisk.” The lower arrow is labeled, “Add,” and points to an elongated oval with two plus signs that is labeled, “Bonding orbital sigma subscript s.” The heading over the last section of the diagram are the words, “Molecular orbitals.”
> caption: Sigma (σ) and sigma-star (σ*) molecular orbitals are formed by the combination of two *s* atomic orbitals. The dots (·) indicate the locations of nuclei.

:::note [chemistry link-to-learning] 
You can watch [animations](http://openstax.org/l/16molecorbital) visualizing the calculated atomic orbitals combining to form various molecular orbitals at the Orbitron website.
:::
In *p* orbitals, the wave function gives rise to two lobes with opposite phases, analogous to how a two-dimensional wave has both parts above and below the average. We indicate the phases by shading the orbital lobes different colors. When orbital lobes of the same phase overlap, constructive wave interference increases the electron density. When regions of opposite phase overlap, the destructive wave interference decreases electron density and creates nodes. When *p* orbitals overlap end to end, they create σ and σ* orbitals ([ref:CNX_Chem_08_04_pMOsigma]). If two atoms are located along the *x*-axis in a Cartesian coordinate system, the two *p<sub>x</sub>* orbitals overlap end to end and form σ*<sub>px</sub>* (bonding) and ${\sigma}_{px}^{*}$ (antibonding) (read as "sigma-p-x" and "sigma-p-x star," respectively). Just as with *s*-orbital overlap, the asterisk indicates the orbital with a node between the nuclei, which is a higher-energy, antibonding orbital.

> FIGURE {fig:CNX_Chem_08_04_pMOsigma} src=../../media/CNX_Chem_08_04_pMOsigma.jpg class=scaled-down
> alt: Two horizontal rows of diagrams are shown. The upper diagram shows two equally-sized peanut-shaped orbitals with a plus sign in between them connected to a merged orbital diagram by a right facing arrow. The merged diagram has a much larger oval at the center and much smaller ovular orbitals on the edge. It is labeled, “sigma subscript p x.” The lower diagram shows two equally-sized peanut-shaped orbitals with a plus sign in between them connected to a split orbital diagram by a right facing arrow. The split diagram has a much larger oval at the outer ends and much smaller ovular orbitals on the inner edges. It is labeled, “sigma subscript p x superscript asterisk”.
> caption: Combining wave functions of two *p* atomic orbitals along the internuclear axis creates two molecular orbitals, σ*<sub>p</sub>* and ${\sigma}_{p}^{*}.$

The side-by-side overlap of two *p* orbitals gives rise to a {term:pi (π) bonding molecular orbital} and a {term:π* antibonding molecular orbital}, as shown in [ref:CNX_Chem_08_04_pMOpi]. In valence bond theory, we describe π bonds as containing a nodal plane containing the internuclear axis and perpendicular to the lobes of the *p* orbitals, with electron density on either side of the node. In molecular orbital theory, we describe the π orbital by this same shape, and a π bond exists when this orbital contains electrons. Electrons in this orbital interact with both nuclei and help hold the two atoms together, making it a bonding orbital. For the out-of-phase combination, there are two nodal planes created, one along the internuclear axis and a perpendicular one between the nuclei.

> FIGURE {fig:CNX_Chem_08_04_pMOpi} src=../../media/CNX_Chem_08_04_pMOpi.jpg class=scaled-down
> alt: Two horizontal rows of diagrams are shown. The upper and lower diagrams both begin with two vertical peanut-shaped orbitals with a plus sign in between followed by a right-facing arrow. The upper diagram shows the same vertical peanut orbitals bending slightly away from one another and separated by a dotted line. It is labeled, “pi subscript p superscript asterisk.” The lower diagram shows the horizontal overlap of the two orbitals and is labeled, “pi subscript p.”
> caption: Side-by-side overlap of each two *p* orbitals results in the formation of two π molecular orbitals. Combining the out-of-phase orbitals results in an antibonding molecular orbital with two nodes. One contains the internuclear axis, and one is perpendicular to the axis. Combining the in-phase orbitals results in a bonding orbital. There is a node (blue) containing the internuclear axis with the two lobes of the orbital located above and below this node.

In the molecular orbitals of diatomic molecules, each atom also has two sets of *p* orbitals oriented side by side (*p<sub>y</sub>* and *p<sub>z</sub>*), so these four atomic orbitals combine pairwise to create two π orbitals and two π* orbitals. The π*<sub>py</sub>* and ${\pi}_{py}^{*}$ orbitals are oriented at right angles to the π*<sub>pz</sub>* and ${\pi}_{pz}^{*}$ orbitals. Except for their orientation, the π*<sub>py</sub>* and π*<sub>pz</sub>* orbitals are identical and have the same energy; they are {term:degenerate orbitals}. The ${\pi}_{py}^{*}$ and ${\pi}_{pz}^{*}$ antibonding orbitals are also degenerate and identical except for their orientation. A total of six molecular orbitals results from the combination of the six atomic *p* orbitals in two atoms: σ*<sub>px</sub>* and ${\sigma}_{px}^{*},$ π*<sub>py</sub>* and ${\pi}_{py}^{*},$ π*<sub>pz</sub>* and ${\pi}_{pz}^{*}.$

:::example {ex:fs-idm91199824} Molecular Orbitals
Predict what type (if any) of molecular orbital would result from adding the wave functions so each pair of orbitals shown overlap. The orbitals are all similar in energy.

> IMAGE {img:fs-idm110513152} src=../../media/CNX_Chem_08_04_AOtype_img.jpg class=scaled-down
> alt: Three diagrams are shown and labeled “a,” “b,” and “c.” Diagram a shows two horizontal peanut-shaped orbitals laying side-by-side. They are labeled, “3 p subscript x and 3 p subscript x.” Diagram b shows one vertical and one horizontal peanut-shaped orbital which are at right angles to one another. They are labeled, “3 p subscript x and 3 p subscript y.” Diagram c shows two vertical peanut-shaped orbitals laying side-by-side and labeled, “3 p subscript y and 3 p subscript y.”

**Solution**
(a) is an in-phase combination, resulting in a σ<sub>3*p*</sub> orbital
(b) will not result in a new orbital because the in-phase component (bottom) and out-of-phase component (top) cancel out. Only orbitals with the correct alignment can combine.
(c) is an out-of-phase combination, resulting in a ${\pi}_{3p}^{*}$ orbital.
**Check Your Learning**
Label the molecular orbital shown as *σ* or π, bonding or antibonding and indicate where the node occurs.

> IMAGE {img:fs-idm135406128} src=../../media/CNX_Chem_08_04_siganti_img.jpg
> alt: Two orbitals are shown lying end-to-end. Each has one enlarged and one small side. The small sides are facing one another

:::note [answer] Answer:
The orbital is located along the internuclear axis, so it is a σ orbital. There is a node bisecting the internuclear axis, so it is an antibonding orbital.

> IMAGE {img:fs-idm152931472} src=../../media/CNX_Chem_08_04_salabel_img.jpg
> alt: Two orbitals are shown lying end-to-end. Each has one enlarged and one small side. The small sides are facing one another and are separated by a vertical dotted line.

:::
:::

:::note [chemistry chemist-portrait] Walter Kohn: Nobel Laureate
Walter {index:Kohn} ([ref:CNX_Chem_08_04_Kohn]) is a theoretical physicist who studies the electronic structure of solids. His work combines the principles of quantum mechanics with advanced mathematical techniques. This technique, called density functional theory, makes it possible to compute properties of molecular orbitals, including their shape and energies. Kohn and mathematician John Pople were awarded the Nobel Prize in Chemistry in 1998 for their contributions to our understanding of electronic structure. Kohn also made significant contributions to the physics of semiconductors.

> FIGURE {fig:CNX_Chem_08_04_Kohn} src=../../media/CNX_Chem_08_04_Kohn.jpg class=scaled-down
> alt: A photograph of Walter Kohn is shown.
> caption: Walter Kohn developed methods to describe molecular orbitals. (credit: image courtesy of Walter Kohn)

Kohn’s biography has been remarkable outside the realm of physical chemistry as well. He was born in Austria, and during World War II he was part of the Kindertransport program that rescued 10,000 children from the Nazi regime. His summer jobs included discovering gold deposits in Canada and helping Polaroid explain how its instant film worked. Dr. Kohn passed away in 2016 at the age of 93.
:::

:::note [chemistry sciences-interconnect] Computational Chemistry in Drug Design
While the descriptions of bonding described in this chapter involve many theoretical concepts, they also have many practical, real-world applications. For example, drug design is an important field that uses our understanding of chemical bonding to develop pharmaceuticals. This interdisciplinary area of study uses biology (understanding diseases and how they operate) to identify specific targets, such as a binding site that is involved in a disease pathway. By modeling the structures of the binding site and potential drugs, computational chemists can predict which structures can fit together and how effectively they will bind (see [ref:CNX_Chem_08_04_HIVProteas]). Thousands of potential candidates can be narrowed down to a few of the most promising candidates. These candidate molecules are then carefully tested to determine side effects, how effectively they can be transported through the body, and other factors. Dozens of important new pharmaceuticals have been discovered with the aid of computational chemistry, and new research projects are underway.

> FIGURE {fig:CNX_Chem_08_04_HIVProteas} src=../../media/CNX_Chem_08_04_HIVProteas.jpg class=scaled-down
> alt: A diagram of a molecule is shown. The image shows a tangle of ribbon-like, intertwined, pink and green curling lines with a complex ball and stick model in the center.
> caption: The molecule shown, HIV-1 protease, is an important target for pharmaceutical research. By designing molecules that bind to this protein, scientists are able to drastically inhibit the progress of the disease.

:::

## Molecular Orbital Energy Diagrams
The relative energy levels of atomic and molecular orbitals are typically shown in a {term:molecular orbital diagram} ([ref:CNX_Chem_08_04_FillMo]). For a diatomic molecule, the atomic orbitals of one atom are shown on the left, and those of the other atom are shown on the right. Each horizontal line represents one orbital that can hold two electrons. The molecular orbitals formed by the combination of the atomic orbitals are shown in the center. Dashed lines show which of the atomic orbitals combine to form the molecular orbitals. For each pair of atomic orbitals that combine, one lower-energy (bonding) molecular orbital and one higher-energy (antibonding) orbital result. Thus we can see that combining the six 2*p* atomic orbitals results in three bonding orbitals (one σ and two π) and three antibonding orbitals (one σ* and two π*).
We predict the distribution of electrons in these molecular orbitals by filling the orbitals in the same way that we fill atomic orbitals, by the Aufbau principle. Lower-energy orbitals fill first, electrons spread out among degenerate orbitals before pairing, and each orbital can hold a maximum of two electrons with opposite spins ([ref:CNX_Chem_08_04_FillMo]). Just as we write electron configurations for atoms, we can write the molecular electronic configuration by listing the orbitals with superscripts indicating the number of electrons present. For clarity, we place parentheses around molecular orbitals with the same energy. In this case, each orbital is at a different energy, so parentheses separate each orbital. Thus we would expect a diatomic molecule or ion containing seven electrons (such as ${\text{Be}}_{2}{}^{\text{+}})$ would have the molecular electron configuration ${({\sigma}_{1s})}^{2}{({\sigma}_{1s}^{*})}^{2}{({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{1}.$ It is common to omit the core electrons from molecular orbital diagrams and configurations and include only the valence electrons.

> FIGURE {fig:CNX_Chem_08_04_FillMo} src=../../media/CNX_Chem_08_04_FillMo.jpg
> alt: A diagram is shown that has an upward-facing vertical arrow running along the left side labeled, “E.” At the bottom center of the diagram is a horizontal line labeled, “sigma subscript 2 s,” that has two vertical half arrows drawn on it, one facing up and one facing down. This line is connected to the right and left by upward-facing, dotted lines to two more horizontal lines, each labeled, “2 s.” The line on the left has two vertical half arrows drawn on it, one facing up and one facing down while the line of the right has one half arrow facing up drawn on it. These two lines are connected by upward-facing dotted lines to another line in the center of the diagram, but further up from the first. It is labeled, “sigma subscript 2 s superscript asterisk.” This horizontal line has one upward-facing vertical half-arrow drawn on it. The left and right sides of the diagram have headers that read, ”Atomic orbitals,” while the center is header reads “Molecular orbitals”.
> caption: This is the molecular orbital diagram for the homonuclear diatomic ${\text{Be}}_{2}{}^{\text{+}},$ showing the molecular orbitals of the valence shell only. The molecular orbitals are filled in the same manner as atomic orbitals, using the Aufbau principle and Hund’s rule.

## Bond Order
The filled molecular orbital diagram shows the number of electrons in both bonding and antibonding molecular orbitals. The net contribution of the electrons to the bond strength of a molecule is identified by determining the {term:bond order} that results from the filling of the molecular orbitals by electrons.
When using Lewis structures to describe the distribution of electrons in molecules, we define bond order as the number of bonding pairs of electrons between two atoms. Thus a single bond has a bond order of 1, a double bond has a bond order of 2, and a triple bond has a bond order of 3. We define bond order differently when we use the molecular orbital description of the distribution of electrons, but the resulting bond order is usually the same. The MO technique is more accurate and can handle cases when the Lewis structure method fails, but both methods describe the same phenomenon.
In the molecular orbital model, an electron contributes to a bonding interaction if it occupies a bonding orbital and it contributes to an antibonding interaction if it occupies an antibonding orbital. The bond order is calculated by subtracting the destabilizing (antibonding) electrons from the stabilizing (bonding) electrons. Since a bond consists of two electrons, we divide by two to get the bond order. We can determine bond order with the following equation:

$$ \text{bond order}=\;\frac{(\text{number of bonding electrons})\;-\;(\text{number of antibonding electrons})}{2} $$  {eq:fs-idp20436816}

The order of a covalent bond is a guide to its strength; a bond between two given atoms becomes stronger as the bond order increases ([ref:fs-idp43355056](module:m68744)). If the distribution of electrons in the molecular orbitals between two atoms is such that the resulting bond would have a bond order of zero, a stable bond does not form. We next look at some specific examples of MO diagrams and bond orders.

## Bonding in Diatomic Molecules
A dihydrogen molecule (H<sub>2</sub>) forms from two hydrogen atoms. When the atomic orbitals of the two atoms combine, the electrons occupy the molecular orbital of lowest energy, the σ<sub>1*s*</sub> bonding orbital. A dihydrogen molecule, H<sub>2</sub>, readily forms because the energy of a H<sub>2</sub> molecule is lower than that of two H atoms. The σ<sub>1*s*</sub> orbital that contains both electrons is lower in energy than either of the two 1*s* atomic orbitals.
A molecular orbital can hold two electrons, so both electrons in the H<sub>2</sub> molecule are in the σ<sub>1*s*</sub> bonding orbital; the electron configuration is ${({\sigma}_{1s})}^{2}.$ We represent this configuration by a molecular orbital energy diagram ([ref:CNX_Chem_08_04_H2MO]) in which a single upward arrow indicates one electron in an orbital, and two (upward and downward) arrows indicate two electrons of opposite spin.

> FIGURE {fig:CNX_Chem_08_04_H2MO} src=../../media/CNX_Chem_08_04_H2MO-a7a1.jpg
> alt: A diagram is shown that has an upward-facing vertical arrow running along the left side labeled “E.” At the bottom center of the diagram is a horizontal line labeled, “sigma subscript 1 s,” that has two vertical half arrows drawn on it, one facing up and one facing down. This line is connected to the right and left by upward-facing, dotted lines to two more horizontal lines, each labeled, “1 s,” and each with one vertical half-arrow facing up drawn on it. These two lines are connected by upward-facing dotted lines to another line in the center of the diagram, but farther up from the first, and labeled, “sigma subscript 1 s superscript asterisk.” The left and right sides of the diagram have headers that read, ”Atomic orbitals,” while the center header reads, “Molecular orbitals.” The bottom left and right are labeled “H” while the center is labeled “H subscript 2.”
> caption: The molecular orbital energy diagram predicts that H<sub>2</sub> will be a stable molecule with lower energy than the separated atoms.

A dihydrogen molecule contains two bonding electrons and no antibonding electrons so we have

$$ {\text{bond order in H}}_{2}=\;\frac{(2-0)}{2}\;=1 $$  {eq:fs-idm61635600}

Because the bond order for the H–H bond is equal to 1, the bond is a single bond.
A helium atom has two electrons, both of which are in its 1*s* orbital. Two helium atoms do not combine to form a dihelium molecule, He<sub>2</sub>, with four electrons, because the stabilizing effect of the two electrons in the lower-energy bonding orbital would be offset by the destabilizing effect of the two electrons in the higher-energy antibonding molecular orbital. We would write the hypothetical electron configuration of He<sub>2</sub> as ${({\sigma}_{1s})}^{2}{({\sigma}_{1s}^{*})}^{2}$ as in [ref:CNX_Chem_08_04_He2MO]. The net energy change would be zero, so there is no driving force for helium atoms to form the diatomic molecule. In fact, helium exists as discrete atoms rather than as diatomic molecules. The bond order in a hypothetical dihelium molecule would be zero.

$$ {\text{bond order in He}}_{2}=\;\frac{(2-2)}{2}\;=0 $$  {eq:fs-idp1555152}

A bond order of zero indicates that no bond is formed between two atoms.

> FIGURE {fig:CNX_Chem_08_04_He2MO} src=../../media/CNX_Chem_08_04_He2MO-cf1f.jpg
> alt: A diagram is shown that has an upward-facing vertical arrow running along the left side labeled, “E.” At the bottom center of the diagram is a horizontal line labeled, “sigma subscript 1 s,” that has two vertical half arrows drawn on it, one facing up and one facing down. This line is connected to the right and left by upward-facing, dotted lines to two more horizontal lines, each labeled, “1 s,” and each with one vertical half-arrow facing up and one facing down drawn on it. These two lines are connected by upward-facing dotted lines to another line in the center of the diagram, but farther up from the first, and labeled, “sigma subscript 1 s superscript asterisk.” This line has one upward-facing and one downward-facing vertical arrow drawn on it. The left and right sides of the diagram have headers that read, “Atomic orbitals,” while the center header reads, “Molecular orbitals.” The bottom left and right are labeled, “H e,” while the center is labeled, “H e subscript 2.”
> caption: The molecular orbital energy diagram predicts that He<sub>2</sub> will not be a stable molecule, since it has equal numbers of bonding and antibonding electrons.

### The Diatomic Molecules of the Second Period
Eight possible homonuclear diatomic molecules might be formed by the atoms of the second period of the periodic table: Li<sub>2</sub>, Be<sub>2</sub>, B<sub>2</sub>, C<sub>2</sub>, N<sub>2</sub>, O<sub>2</sub>,** F<sub>2</sub>, and Ne<sub>2</sub>. However, we can predict that the Be<sub>2</sub> molecule and the Ne<sub>2</sub> molecule would not be stable. We can see this by a consideration of the molecular electron configurations ([ref:fs-idp20943328]).
We predict valence molecular orbital electron configurations just as we predict electron configurations of atoms. Valence electrons are assigned to valence molecular orbitals with the lowest possible energies. Consistent with Hund’s rule, whenever there are two or more degenerate molecular orbitals, electrons fill each orbital of that type singly before any pairing of electrons takes place.
As we saw in valence bond theory, σ bonds are generally more stable than π bonds formed from degenerate atomic orbitals. Similarly, in molecular orbital theory, σ orbitals are usually more stable than π orbitals. However, this is not always the case. The MOs for the valence orbitals of the second period are shown in [ref:CNX_Chem_08_04_X2MOs]. Looking at Ne<sub>2</sub> molecular orbitals, we see that the order is consistent with the generic diagram shown in the previous section. However, for atoms with three or fewer electrons in the *p* orbitals (Li through N) we observe a different pattern, in which the σ*<sub>p</sub>* orbital is higher in energy than the π*<sub>p</sub>* set. Obtain the molecular orbital diagram for a homonuclear diatomic ion by adding or subtracting electrons from the diagram for the neutral molecule.

> FIGURE {fig:CNX_Chem_08_04_X2MOs} src=../../media/CNX_Chem_08_04_X2MOs-bb74.jpg
> alt: A graph is shown in which the y-axis is labeled, “E,” and appears as a vertical, upward-facing arrow. Across the top, the graph reads, “L i subscript 2,” “B e subscript 2,” “B subscript 2,” “C subscript 2,” “N subscript 2,” “O subscript 2,” “F subscript 2,” and “Ne subscript 2.” Directly below each of these element terms is a single pink line, and all lines are connected to one another by a dashed line, to create an overall line that decreases in height as it moves from left to right across the graph. This line is labeled, “sigma subscript 2 p x superscript asterisk”. Directly below each of these lines is a set of two pink lines, and all lines are connected to one another by a dashed line, to create an overall line that decreases in height as it moves from left to right across the graph. It is consistently lower than the first line. This line is labeled, “pi subscript 2 p y superscript asterisk,” and, “pi subscript 2 p z superscript asterisk.” Directly below each of these double lines is a single pink line, and all lines are connected to one another by a dashed line, to create an overall line that decreases in height as it moves from left to right across the graph. It has a distinctive drop at the label, “O subscript 2.” This line is labeled, “sigma subscript 2 p x.” Directly below each of these lines is a set of two pink lines, and all lines are connected to one another by a dashed line to create an overall line that decreases very slightly in height as it moves from left to right across the graph. It is consistently lower than the third line until it reaches the point labeled, “O subscript 2.” This line is labeled, “pi subscript 2 p y,” and, “pi subscript 2 p z.” Directly below each of these lines is a single blue line, and all lines are connected to one another by a dashed line to create an overall line that decreases in height as it moves from left to right across the graph. This line is labeled, “sigma subscript 2 s superscript asterisk.” Finally, directly below each of these lines is a single blue line, and all lines are connected to one another by a dashed line to create an overall line that decreases in height as it moves from left to right across the graph. This line is labeled. “sigma subscript 2 s.”
> caption: This shows the MO diagrams for each homonuclear diatomic molecule in the second period. The orbital energies decrease across the period as the effective nuclear charge increases and atomic radius decreases. Between N<sub>2</sub> and O<sub>2</sub>, the order of the orbitals changes.

This switch in orbital ordering occurs because of a phenomenon called {term:s-p mixing}. s-p mixing does not create new orbitals; it merely influences the energies of the existing molecular orbitals. The σ<sub>s</sub> wavefunction mathematically combines with the σ<sub>p</sub> wavefunction, with the result that the σ<sub>s</sub> orbital becomes more stable, and the σ<sub>p</sub> orbital becomes less stable ([ref:CNX_Chem_08_04_spmix]). Similarly, the antibonding orbitals also undergo s-p mixing, with the σ<sub>s*</sub> becoming more stable and the σ<sub>p*</sub> becoming less stable.

> FIGURE {fig:CNX_Chem_08_04_spmix} src=../../media/CNX_Chem_08_04_spmix-78e6.jpg
> alt: A diagram is shown. At the bottom left of the diagram is a horizontal line that is connected to the right and left by upward-facing, dotted lines to two more horizontal lines. Those two lines are connected by upward-facing dotted lines to another line in the center of the diagram but farther up from the first. Each of the bottom two central lines has a vertical downward-facing arrow. Above this structure is a horizontal line that is connected to the right and left by upward-facing, dotted lines to two sets of three horizontal lines and those two lines are connected by upward-facing dotted lines to another line in the center of the diagram, but further up from the first. In between the horizontal lines of this structure are two pairs of horizontal lines that are above the first line but below the second and connected by dotted lines to the side horizontal lines. The bottom and top central lines each have an upward-facing vertical arrow. These two structures are redrawn on the right side of the diagram, but this time, the central lines of the bottom structure are moved downward in relation to the side lines. The upper portion of the structure has its central lines shifted upward in relation to the side lines. This structure also shows the bottom line appearing above the set of two lines.
> caption: Without mixing, the MO pattern occurs as expected, with the σ<sub>p</sub> orbital lower in energy than the π<sub>p</sub> orbitals. When s-p mixing occurs, the orbitals shift as shown, with the σ<sub>p</sub> orbital higher in energy than the π<sub>p</sub> orbitals.

s-p mixing occurs when the *s* and *p* orbitals have similar energies. The energy difference between 2*s* and 2*p* orbitals in O, F, and Ne is greater than that in Li, Be, B, C, and N. Because of this, O<sub>2</sub>, F<sub>2</sub>, and Ne<sub>2</sub> exhibit negligible s-p mixing (not sufficient to change the energy ordering), and their MO diagrams follow the normal pattern, as shown in [ref:CNX_Chem_08_04_X2MOs]. All of the other period 2 diatomic molecules do have s-p mixing, which leads to the pattern where the σ<sub>p</sub> orbital is raised above the π<sub>p</sub> set.
Using the MO diagrams shown in [ref:CNX_Chem_08_04_X2MOs], we can add in the electrons and determine the molecular electron configuration and bond order for each of the diatomic molecules. As shown in [ref:fs-idp20943328], Be<sub>2</sub> and Ne<sub>2</sub> molecules would have a bond order of 0, and these molecules do not exist.

> TABLE {tab:fs-idp20943328} cols=3 class=top-titled
> title: Electron Configuration and Bond Order for Molecular Orbitals in Homonuclear Diatomic Molecules of Period Two Elements
> summary: A table is shown that has three columns and nine rows. The header row reads: “Molecule,” “Electron Configuration,” and, “Bond Order.” The first column contains the symbols “L i subscript 2,” “B e subscript 2 ( unstable ),” “B e subscript 2,” “C subscript 2,” “N subscript 2,” “O subscript 2,” “F subscript 2,” and, “Ne subscript 2 ( unstable ).” The second column contains the symbols “( sigma subscript 2 s ) superscript 2,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 2,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 4,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 4 ( sigma subscript 2 p x ) superscript 2,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( sigma subscript 2 p x ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 4 ( pi superscript asterisk subscript 2 p y, pi superscript asterisk subscript 2 p z ) superscript 2,” “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( sigma subscript 2 p x ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 4 ( pi superscript asterisk subscript 2 p y, pi superscript asterisk subscript 2 p z ) superscript 4,” and “( sigma subscript 2 s ) superscript 2 ( sigma superscript asterisk subscript 2 s ) superscript 2 ( sigma subscript 2 p x ) superscript 2 ( pi subscript 2 p y, pi subscript 2 p z ) superscript 4 ( pi superscript asterisk subscript 2 p y, pi superscript asterisk subscript 2 p z ) superscript 4 ( sigma superscript asterisk subscript 2 p x ) superscript 2.” The third column contains the numbers: “1,” “0,” “1,” “2,” “3,” “2,” “1,” “0.”

| Molecule | Electron Configuration | Bond Order |
| --- | --- | --- |
| Li<sub>2</sub> | ${({\sigma}_{2s})}^{2}$ | 1 |
| Be<sub>2</sub> (unstable) | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}$ | 0 |
| B<sub>2</sub> | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{2}$ | 1 |
| C<sub>2</sub> | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}$ | 2 |
| N<sub>2</sub> | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\sigma}_{2px})}^{2}$ | 3 |
| O<sub>2</sub> | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\sigma}_{2px})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\pi}_{2py}^{*},\;{\pi}_{2pz}^{*})}^{2}$ | 2 |
| F<sub>2</sub> | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\sigma}_{2px})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\pi}_{2py}^{*},\;{\pi}_{2pz}^{*})}^{4}$ | 1 |
| Ne<sub>2</sub> (unstable) | ${({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\sigma}_{2px})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\pi}_{2py}^{*},\;{\pi}_{2pz}^{*})}^{4}{({\sigma}_{2px}^{*})}^{2}$ | 0 |

The combination of two lithium atoms to form a lithium molecule, Li<sub>2</sub>, is analogous to the formation of H<sub>2</sub>, but the atomic orbitals involved are the valence 2*s* orbitals. Each of the two lithium atoms has one valence electron. Hence, we have two valence electrons available for the σ<sub>2*s*</sub> bonding molecular orbital. Because both valence electrons would be in a bonding orbital, we would predict the Li<sub>2</sub> molecule to be stable. The molecule is, in fact, present in appreciable concentration in lithium vapor at temperatures near the boiling point of the element. All of the other molecules in [ref:fs-idp20943328] with a bond order greater than zero are also known.
The O<sub>2</sub> molecule has enough electrons to half fill the $({\pi}_{2py}^{*},\;{\pi}_{2pz}^{*})$ level. We expect the two electrons that occupy these two degenerate orbitals to be unpaired, and this molecular electronic configuration for O<sub>2</sub> is in accord with the fact that the oxygen molecule has two unpaired electrons ([ref:CNX_Chem_08_04_O2MO]). The presence of two unpaired electrons has proved to be difficult to explain using Lewis structures, but the molecular orbital theory explains it quite well. In fact, the unpaired electrons of the oxygen molecule provide a strong piece of support for the molecular orbital theory.

:::note [chemistry sciences-interconnect] Band Theory

When two identical atomic orbitals on different atoms combine, two molecular orbitals result (see [ref:CNX_Chem_08_04_ssigma]). The bonding orbital is lower in energy than the original atomic orbitals because the atomic orbitals are in-phase in the molecular orbital. The antibonding orbital is higher in energy than the original atomic orbitals because the atomic orbitals are out-of-phase.
In a solid, similar things happen, but on a much larger scale. Remember that even in a small sample there are a huge number of atoms (typically > 10<sup>23</sup> atoms), and therefore a huge number of atomic orbitals that may be combined into molecular orbitals. When *N* valence atomic orbitals, all of the same energy and each containing one (1) electron, are combined, *N*/2 (filled) bonding orbitals and *N*/2 (empty) antibonding orbitals will result. Each bonding orbital will show an energy lowering as the atomic orbitals are *mostly* in-phase, but each of the bonding orbitals will be a little different and have slightly different energies. The antibonding orbitals will show an increase in energy as the atomic orbitals are *mostly* out-of-phase, but each of the antibonding orbitals will also be a little different and have slightly different energies. The allowed energy levels for all the bonding orbitals are so close together that they form a band, called the valence band. Likewise, all the antibonding orbitals are very close together and form a band, called the conduction band. [ref:CNX_Chem_08_04_Band] shows the bands for three important classes of materials: insulators, semiconductors, and conductors.

> FIGURE {fig:CNX_Chem_08_04_Band} src=../../media/CNX_Chem_08_04_Band.jpg class=scaled-down
> alt: This figure shows three diagrams. The first is labeled, “Insulator,” and it consists of two boxes. The “conduction” box is above and the “valence” box is below. A large gap marked by 4 dashed lines contains a double-headed arrow. One head pointing towards the “conduction box” and the other towards the “valence” box. The arrow is labeled, “Band gap.” The second diagram is similar to the first, but the band gap is about half as large. This diagram is labeled, “Semiconductor.” The third diagram is similar to the other two, but the band gap is about a fifth that of the “Semiconductor” diagram. This diagram is labeled, “Conductor.”
> caption: Molecular orbitals in solids are so closely spaced that they are described as bands. The valence band is lower in energy and the conduction band is higher in energy. The type of solid is determined by the size of the “band gap” between the valence and conduction bands. Only a very small amount of energy is required to move electrons from the valence band to the conduction band in a conductor, and so they conduct electricity well. In an insulator, the band gap is large, so that very few electrons move, and they are poor conductors of electricity. Semiconductors are in between: they conduct electricity better than insulators, but not as well as conductors.

In order to conduct electricity, electrons must move from the filled valence band to the empty conduction band where they can move throughout the solid. The size of the band gap, or the energy difference between the top of the valence band and the bottom of the conduction band, determines how easy it is to move electrons between the bands. Only a small amount of energy is required in a conductor because the band gap is very small. This small energy difference is “easy” to overcome, so they are good conductors of electricity. In an insulator, the band gap is so “large” that very few electrons move into the conduction band; as a result, insulators are poor conductors of electricity. Semiconductors conduct electricity when “moderate” amounts of energy are provided to move electrons out of the valence band and into the conduction band. Semiconductors, such as silicon, are found in many electronics.
Semiconductors are used in devices such as computers, smartphones, and solar cells. Solar cells produce electricity when light provides the energy to move electrons out of the valence band. The electricity that is generated may then be used to power a light or tool, or it can be stored for later use by charging a battery. As of December 2014, up to 46% of the energy in sunlight could be converted into electricity using solar cells.
:::

:::example {ex:fs-idm85103616} Molecular Orbital Diagrams, Bond Order, and Number of Unpaired Electrons
Draw the molecular orbital diagram for the oxygen molecule, O<sub>2</sub>. From this diagram, calculate the bond order for O<sub>2</sub>. How does this diagram account for the paramagnetism of O<sub>2</sub>?
**Solution**
We draw a molecular orbital energy diagram similar to that shown in [ref:CNX_Chem_08_04_X2MOs]. Each oxygen atom contributes six electrons, so the diagram appears as shown in [ref:CNX_Chem_08_04_O2MO].

> FIGURE {fig:CNX_Chem_08_04_O2MO} src=../../media/CNX_Chem_08_04_O2MO-912b.jpg
> alt: A diagram is shown that has an upward-facing vertical arrow running along the left side labeled, “E.” At the bottom center of the diagram is a horizontal line labeled, “sigma subscript 2 s,” that has two vertical half arrows drawn on it, one facing up and one facing down. This line is connected to the right and left by upward-facing, dotted lines to two more horizontal lines, each labeled, “2 s,” and with two vertical half arrows drawn on them, one facing up and one facing down. These two lines are connected by upward-facing dotted lines to another line in the center of the diagram, but farther up from the first and labeled, “sigma subscript 2 s superscript asterisk.” This horizontal line has two vertical half-arrow drawn on it, one facing up and one facing down. Moving further up the center of the diagram is a horizontal line labeled, “sigma subscript 2 p subscript x,” which lies below two horizontal lines, lying side-by-side, and labeled “pi subscript 2 p subscript y,” and “pi subscript 2 p subscript z.” Both the bottom and top lines are connected to the right and left by upward-facing, dotted lines to three more horizontal lines, each labeled, “2 p,” on either side. These sets of lines each hold three upward-facing and one downward-facing half-arrow. They are connected by upward-facing dotted lines to another single line and then pair of double lines in the center of the diagram, but farther up from the lower lines. They are labeled, “sigma subscript 2 p subscript x superscript asterisk,” “pi subscript 2 p subscript y superscript asterisk,” and “pi subscript 2 p subscript z superscript asterisk,” respectively. The lower of these two central, horizontal lines each contain one upward-facing half-arrow. The left and right sides of the diagram have headers that read, ”Atomic orbitals,” while the center header reads, “Molecular orbitals.”
> caption: The molecular orbital energy diagram for O<sub>2</sub> predicts two unpaired electrons.

We calculate the bond order as

$$ {\text{O}}_{2}=\;\frac{(8-4)}{2}\;=2 $$  {eq:fs-idm75364784}

Oxygen's paramagnetism is explained by the presence of two unpaired electrons in the (π<sub>2*py*</sub>, π<sub>2*pz*</sub>)* molecular orbitals.
**Check Your Learning**
The main component of air is N<sub>2</sub>. From the molecular orbital diagram of N<sub>2</sub>, predict its bond order and whether it is diamagnetic or paramagnetic.

:::note [answer] Answer:
N<sub>2</sub> has a bond order of 3 and is diamagnetic.
:::
:::

:::example {ex:fs-idm114393376} Ion Predictions with MO Diagrams
Give the molecular orbital configuration for the valence electrons in ${\text{C}}_{2}{}^{\text{2−}}.$ Will this ion be stable?
**Solution**
Looking at the appropriate MO diagram, we see that the π orbitals are lower in energy than the σ*<sub>p</sub>* orbital. The valence electron configuration for C<sub>2</sub> is ${({\sigma}_{2s})}^{2}{({\sigma}_{\text{2}s}^{*})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}.$ Adding two more electrons to generate the ${\text{C}}_{2}{}^{\text{2−}}$ anion will give a valence electron configuration of ${({\sigma}_{2s})}^{2}{({\sigma}_{\text{2}s}^{*})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\sigma}_{2px})}^{2}.$ Since this has six more bonding electrons than antibonding, the bond order will be 3, and the ion should be stable.
**Check Your Learning**
How many unpaired electrons would be present on a ${\text{Be}}_{2}{}^{\text{2−}}$ ion? Would it be paramagnetic or diamagnetic?

:::note [answer] Answer:
two, paramagnetic
:::
:::

:::note [chemistry link-to-learning] 
Creating molecular orbital diagrams for molecules with more than two atoms relies on the same basic ideas as the diatomic examples presented here. However, with more atoms, computers are required to calculate how the atomic orbitals combine. See [three-dimensional drawings](http://openstax.org/l/16orbitaldiag) of the molecular orbitals for C<sub>6</sub>H<sub>6</sub>.
:::

## Key Concepts and Summary {section:summary}
Molecular orbital (MO) theory describes the behavior of electrons in a molecule in terms of combinations of the atomic wave functions. The resulting molecular orbitals may extend over all the atoms in the molecule. Bonding molecular orbitals are formed by in-phase combinations of atomic wave functions, and electrons in these orbitals stabilize a molecule. Antibonding molecular orbitals result from out-of-phase combinations of atomic wave functions and electrons in these orbitals make a molecule less stable. Molecular orbitals located along an internuclear axis are called σ MOs. They can be formed from *s* orbitals or from *p* orbitals oriented in an end-to-end fashion. Molecular orbitals formed from *p* orbitals oriented in a side-by-side fashion have electron density on opposite sides of the internuclear axis and are called π orbitals.
We can describe the electronic structure of diatomic molecules by applying molecular orbital theory to the valence electrons of the atoms. Electrons fill molecular orbitals following the same rules that apply to filling atomic orbitals; Hund’s rule and the Aufbau principle tell us that lower-energy orbitals will fill first, electrons will spread out before they pair up, and each orbital can hold a maximum of two electrons with opposite spins. Materials with unpaired electrons are paramagnetic and attracted to a magnetic field, while those with all-paired electrons are diamagnetic and repelled by a magnetic field. Correctly predicting the magnetic properties of molecules is in advantage of molecular orbital theory over Lewis structures and valence bond theory.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| $\text{bond order}=\;\frac{(\text{number of bonding electron})-(\text{number of antibonding electrons})}{2}$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp105434592} type= 
PROBLEM:
Sketch the distribution of electron density in the bonding and antibonding molecular orbitals formed from two *s* orbitals and from two *p* orbitals.
:::

:::exercise {fs-idm165679168} type= 
PROBLEM:
How are the following similar, and how do they differ?
(a) σ molecular orbitals and π molecular orbitals
(b) *ψ* for an atomic orbital and *ψ* for a molecular orbital
(c) bonding orbitals and antibonding orbitals
SOLUTION:
(a) Similarities: Both are bonding orbitals that can contain a maximum of two electrons. Differences: σ orbitals are end-to-end combinations of atomic orbitals, whereas π orbitals are formed by side-by-side overlap of orbitals. (b) Similarities: Both are quantum-mechanical constructs that represent the probability of finding the electron about the atom or the molecule. Differences: *ψ* for an atomic orbital describes the behavior of only one electron at a time based on the atom. For a molecule, *ψ* represents a mathematical combination of atomic orbitals. (c) Similarities: Both are orbitals that can contain two electrons. Differences: Bonding orbitals result in holding two or more atoms together. Antibonding orbitals have the effect of destabilizing any bonding that has occurred.
:::

:::exercise {fs-idm138595920} type= 
PROBLEM:
If molecular orbitals are created by combining five atomic orbitals from atom A and five atomic orbitals from atom B combine, how many molecular orbitals will result?
:::

:::exercise {fs-idm177595920} type= 
PROBLEM:
Can a molecule with an odd number of electrons ever be diamagnetic? Explain why or why not.
SOLUTION:
An odd number of electrons can never be paired, regardless of the arrangement of the molecular orbitals. It will always be paramagnetic.
:::

:::exercise {fs-idm41078784} type= 
PROBLEM:
Can a molecule with an even number of electrons ever be paramagnetic? Explain why or why not.
:::

:::exercise {fs-idm100278000} type= 
PROBLEM:
Why are bonding molecular orbitals lower in energy than the parent atomic orbitals?
SOLUTION:
Bonding orbitals have electron density in close proximity to more than one nucleus. The interaction between the bonding positively charged nuclei and negatively charged electrons stabilizes the system.
:::

:::exercise {fs-idm131971232} type= 
PROBLEM:
Calculate the bond order for an ion with this configuration:

$$ {({\sigma}_{2s})}^{2}{({\sigma}_{2s}^{*})}^{2}{({\sigma}_{2px})}^{2}{({\pi}_{2py},\;{\pi}_{2pz})}^{4}{({\pi}_{2py}^{*},\;{\pi}_{2pz}^{*})}^{3} $$  {eq:fs-idp23954224}

:::

:::exercise {fs-idm63124960} type= 
PROBLEM:
Explain why an electron in the bonding molecular orbital in the H<sub>2</sub> molecule has a lower energy than an electron in the 1*s* atomic orbital of either of the separated hydrogen atoms.
SOLUTION:
The pairing of the two bonding electrons lowers the energy of the system relative to the energy of the nonbonded electrons.
:::

:::exercise {fs-idm179535904} type= 
PROBLEM:
Predict the valence electron molecular orbital configurations for the following, and state whether they will be stable or unstable ions.
(a) ${\text{Na}}_{2}{}^{\text{2+}}$
(b) ${\text{Mg}}_{2}{}^{\text{2+}}$
(c) ${\text{Al}}_{2}{}^{\text{2+}}$
(d) ${\text{Si}}_{2}{}^{\text{2+}}$
(e) ${\text{P}}_{2}{}^{\text{2+}}$
(f) ${\text{S}}_{2}{}^{\text{2+}}$
(g) ${\text{F}}_{2}{}^{\text{2+}}$
(h) ${\text{Ar}}_{2}{}^{\text{2+}}$
:::

:::exercise {fs-idm111217280} type= 
PROBLEM:
Determine the bond order of each member of the following groups, and determine which member of each group is predicted by the molecular orbital model to have the strongest bond.
(a) H<sub>2</sub>, ${\text{H}}_{2}{}^{\text{+}},$ ${\text{H}}_{2}{}^{\text{−}}$
(b) O<sub>2</sub>, ${\text{O}}_{2}{}^{\text{2+}},$ ${\text{O}}_{2}{}^{\text{2−}}$
(c) Li<sub>2</sub>, ${\text{Be}}_{2}{}^{\text{+}},$ Be<sub>2</sub>
(d) F<sub>2</sub>, ${\text{F}}_{2}{}^{\text{+}},$ ${\text{F}}_{2}{}^{\text{−}}$
(e) N<sub>2</sub>, ${\text{N}}_{2}{}^{\text{+}},$ ${\text{N}}_{2}{}^{\text{−}}$
SOLUTION:
(a) H<sub>2</sub> bond order = 1, ${\text{H}}_{2}{}^{\text{+}}$ bond order = 0.5, ${\text{H}}_{2}{}^{\text{−}}$ bond order = 0.5, strongest bond is H<sub>2</sub>; (b) O<sub>2</sub> bond order = 2, ${\text{O}}_{2}{}^{\text{2+}}$ bond order = 3; ${\text{O}}_{2}{}^{\text{2−}}$ bond order = 1, strongest bond is ${\text{O}}_{2}{}^{\text{2+}};$ (c) Li<sub>2</sub> bond order = 1, ${\text{Be}}_{2}{}^{\text{+}}$ bond order = 0.5, Be<sub>2</sub> bond order = 0, strongest bond is ${\text{Li}}_{2}$;(d) F<sub>2</sub> bond order = 1, ${\text{F}}_{2}{}^{\text{+}}$ bond order = 1.5, ${\text{F}}_{2}{}^{\text{−}}$ bond order = 0.5, strongest bond is ${\text{F}}_{2}{}^{\text{+}};$ (e) N<sub>2</sub> bond order = 3, ${\text{N}}_{2}{}^{\text{+}}$ bond order = 2.5, ${\text{N}}_{2}{}^{\text{−}}$ bond order = 2.5, strongest bond is N<sub>2</sub>
:::

:::exercise {fs-idm63366704} type= 
PROBLEM:
For the first ionization energy for an N<sub>2</sub> molecule, what molecular orbital is the electron removed from?
:::

:::exercise {fs-idm135320832} type= 
PROBLEM:
Compare the atomic and molecular orbital diagrams to identify the member of each of the following pairs that has the highest first ionization energy (the most tightly bound electron) in the gas phase:
(a) H and H<sub>2</sub>
(b) N and N<sub>2</sub>
(c) O and O<sub>2</sub>
(d) C and C<sub>2</sub>
(e) B and B<sub>2</sub>
SOLUTION:
(a) H<sub>2</sub>; (b) N<sub>2</sub>; (c) O; (d) C<sub>2</sub>; (e) B<sub>2</sub>
:::

:::exercise {fs-idp45731680} type= 
PROBLEM:
Which of the period 2 homonuclear diatomic molecules are predicted to be paramagnetic?
:::

:::exercise {fs-idm76747104} type= 
PROBLEM:
A friend tells you that the 2*s* orbital for fluorine starts off at a much lower energy than the 2*s* orbital for lithium, so the resulting σ<sub>2*s*</sub> molecular orbital in F<sub>2</sub> is more stable than in Li<sub>2</sub>. Do you agree?
SOLUTION:
Yes, fluorine is a smaller atom than Li, so atoms in the 2*s* orbital are closer to the nucleus and more stable.
:::

:::exercise {fs-idm16460880} type= 
PROBLEM:
True or false: Boron contains 2*s*<sup>2</sup>2*p*<sup>1</sup> valence electrons, so only one *p* orbital is needed to form molecular orbitals.
:::

:::exercise {fs-idm16458944} type= 
PROBLEM:
What charge would be needed on F<sub>2</sub> to generate an ion with a bond order of 2?
SOLUTION:
2+
:::

:::exercise {fs-idm76713856} type= 
PROBLEM:
Predict whether the MO diagram for S<sub>2</sub> would show s-p mixing or not.
:::

:::exercise {fs-idm133690944} type= 
PROBLEM:
Explain why ${\text{N}}_{2}{}^{\text{2+}}$ is diamagnetic, while ${\text{O}}_{2}{}^{\text{4+}},$ which has the same number of valence electrons, is paramagnetic.
SOLUTION:
N<sub>2</sub> has s-p mixing, so the π orbitals are the last filled in ${\text{N}}_{2}{}^{\text{2+}}.$ O<sub>2</sub> does not have s-p mixing, so the σ*<sub>p</sub>* orbital fills before the π orbitals.
:::

:::exercise {fs-idm79754896} type= 
PROBLEM:
Using the MO diagrams, predict the bond order for the stronger bond in each pair:
(a) B<sub>2</sub> or ${\text{B}}_{2}{}^{\text{+}}$
(b) F<sub>2</sub> or ${\text{F}}_{2}{}^{\text{+}}$
(c) O<sub>2</sub> or ${\text{O}}_{2}{}^{\text{2+}}$
(d) ${\text{C}}_{2}{}^{\text{+}}$ or ${\text{C}}_{2}{}^{\text{−}}$
:::

## Glossary
- {def} **antibonding orbital**: molecular orbital located outside of the region between two nuclei; electrons in an antibonding orbital destabilize the molecule
- {def} **bond order**: number of pairs of electrons between two atoms; it can be found by the number of bonds in a Lewis structure or by the difference between the number of bonding and antibonding electrons divided by two
- {def} **bonding orbital**: molecular orbital located between two nuclei; electrons in a bonding orbital stabilize a molecule
- {def} **degenerate orbitals**: orbitals that have the same energy
- {def} **diamagnetism**: phenomenon in which a material is not magnetic itself but is repelled by a magnetic field; it occurs when there are only paired electrons present
- {def} **homonuclear diatomic molecule**: molecule consisting of two identical atoms
- {def} **linear combination of atomic orbitals**: technique for combining atomic orbitals to create molecular orbitals
- {def} **molecular orbital**: region of space in which an electron has a high probability of being found in a molecule
- {def} **molecular orbital diagram**: visual representation of the relative energy levels of molecular orbitals
- {def} **molecular orbital theory**: model that describes the behavior of electrons delocalized throughout a molecule in terms of the combination of atomic wave functions
- {def} **paramagnetism**: phenomenon in which a material is not magnetic itself but is attracted to a magnetic field; it occurs when there are unpaired electrons present
- {def} **π bonding orbital**: molecular orbital formed by side-by-side overlap of atomic orbitals, in which the electron density is found on opposite sides of the internuclear axis
- {def} **π* bonding orbital**: antibonding molecular orbital formed by out of phase side-by-side overlap of atomic orbitals, in which the electron density is found on both sides of the internuclear axis, and there is a node between the nuclei
- {def} **σ bonding orbital**: molecular orbital in which the electron density is found along the axis of the bond
- {def} **σ* bonding orbital**: antibonding molecular orbital formed by out-of-phase overlap of atomic orbital along the axis of the bond, generating a node between the nuclei
- {def} **s-p mixing**: change that causes σ*<sub>p</sub>* orbitals to be less stable than π*<sub>p</sub>* orbitals due to the mixing of *s* and *p*-based molecular orbitals of similar energies.
