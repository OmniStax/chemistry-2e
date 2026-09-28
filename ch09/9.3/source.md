# Stoichiometry of Gaseous Substances, Mixtures, and Reactions

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Use the ideal gas law to compute gas densities and molar masses
- Perform stoichiometric calculations involving gaseous substances
- State Dalton’s law of partial pressures and use it in calculations involving gaseous mixtures

The study of the chemical behavior of gases was part of the basis of perhaps the most fundamental chemical revolution in history. French nobleman Antoine {index:Lavoisier}, widely regarded as the “father of modern chemistry,” changed chemistry from a qualitative to a quantitative science through his work with gases. He discovered the law of conservation of matter, discovered the role of oxygen in combustion reactions, determined the composition of air, explained respiration in terms of chemical reactions, and more. He was a casualty of the French Revolution, guillotined in 1794. Of his death, mathematician and astronomer Joseph-Louis Lagrange said, “It took the mob only a moment to remove his head; a century will not suffice to reproduce it.”^[“Quotations by Joseph-Louis Lagrange,” last modified February 2006, accessed February 10, 2015, http://www-history.mcs.st-andrews.ac.uk/Quotations/Lagrange.html] Much of the knowledge we do have about Lavoisier's contributions is due to his wife, Marie-Anne Paulze Lavoisier, who worked with him in his lab. A trained artist fluent in several languages, she created detailed illustrations of the equipment in his lab, and translated texts from foreign scientists to complement his knowledge. After his execution, she was instrumental in publishing Lavoisier's major treatise, which unified many concepts of chemistry and laid the groundwork for significant further study.
As described in an earlier chapter of this text, we can turn to chemical stoichiometry for answers to many of the questions that ask “How much?” The essential property involved in such use of stoichiometry is the amount of substance, typically measured in moles (*n*). For gases, molar amount can be derived from convenient experimental measurements of pressure, temperature, and volume. Therefore, these measurements are useful in assessing the stoichiometry of pure gases, gas mixtures, and chemical reactions involving gases. This section will not introduce any new material or ideas, but will provide examples of applications and ways to integrate concepts already discussed.

## Gas Density and Molar Mass
The ideal gas law described previously in this chapter relates the properties of pressure *P*, volume *V*, temperature *T*, and molar amount *n*. This law is universal, relating these properties in identical fashion regardless of the chemical identity of the gas:

$$ PV=nRT $$  {eq:fs-idm185500528}

The density *d* of a gas, on the other hand, is determined by its identity. As described in another chapter of this text, the density of a substance is a characteristic property that may be used to identify the substance.

$$ d=\frac{m}{V} $$  {eq:fs-idm214345680}

Rearranging the ideal gas equation to isolate *V* and substituting into the density equation yields

$$ d=\frac{mP}{nRT}=(\frac{m}{n})\frac{P}{RT} $$  {eq:fs-idm162939760}

The ratio *m*/*n* is the definition of molar mass, *ℳ*:

$$ \mathcal{M}=\frac{m}{n} $$  {eq:fs-idm465259200}

The density equation can then be written

$$ d=\frac{\mathcal{M}P}{RT} $$  {eq:fs-idm487853552}

This relation may be used for calculating the densities of gases of known identities at specified values of pressure and temperature as demonstrated in [ref:fs-idp128586304].

:::example {ex:fs-idp128586304} Measuring Gas Density
What is the density of molecular nitrogen gas at STP?
**Solution**
The molar mass of molecular nitrogen, N<sub>2</sub>, is 28.01 g/mol. Substituting this value along with standard temperature and pressure into the gas density equation yields

$$ d=\frac{\mathcal{M}P}{RT}=\frac{(28.01\;\text{g/mol})(1.00\;\text{atm})}{(0.0821\;{\text{L·atm·mol}}^{\text{−1}}{\text{K}}^{\text{−}1})(273\;\text{K})}=1.25\;\text{g/L} $$  {eq:fs-idm200230128}

**Check Your Learning**
What is the density of molecular hydrogen gas at 17.0 °C and a pressure of 760 torr?

:::note [answer] Answer:
d = 0.0847 g/L
:::
:::
When the identity of a gas is unknown, measurements of the mass, pressure, volume, and temperature of a sample can be used to calculate the molar mass of the gas (a useful property for identification purposes). Combining the ideal gas equation

$$ PV=nRT $$  {eq:fs-idm200001904}

and the definition of molar mass

$$ \mathcal{M}=\frac{m}{n} $$  {eq:fs-idm479492256}

yields the following equation:

$$ \mathcal{M}=\frac{mRT}{PV} $$  {eq:fs-idm441399648}

Determining the molar mass of a gas via this approach is demonstrated in [ref:fs-idp74274064].

:::example {ex:fs-idp74274064} Determining the Molecular Formula of a Gas from its Molar Mass and Empirical Formula
Cyclopropane, a gas once used with oxygen as a general anesthetic, is composed of 85.7% carbon and 14.3% hydrogen by mass. Find the empirical formula. If 1.56 g of cyclopropane occupies a volume of 1.00 L at 0.984 atm and 50 °C, what is the molecular formula for cyclopropane?
**Solution**
First determine the empirical formula of the gas. Assume 100 g and convert the percentage of each element into grams. Determine the number of moles of carbon and hydrogen in the 100-g sample of cyclopropane. Divide by the smallest number of moles to relate the number of moles of carbon to the number of moles of hydrogen. In the last step, realize that the smallest whole number ratio is the empirical formula:

$$ \text{85.7 g C}\;\times \;\frac{\text{1 mol C}}{\text{12.01 g C}}\;=\text{7.136 mol C}\hspace{2em}\frac{7.136}{7.136}\;=\text{1.00 mol C} $$  {eq:fs-idm18588864}

$$ \text{14.3 g H}\;\times \;\frac{\text{1 mol H}}{\text{1.01 g H}}\;=\text{14.158 mol H}\hspace{2em}\frac{14.158}{7.136}\;=\text{1.98 mol H} $$  {eq:fs-idm150258896}

Empirical formula is CH<sub>2</sub> [empirical mass (EM) of 14.03 g/empirical unit].
Next, use the provided values for mass, pressure, temperature and volume to compute the molar mass of the gas:

$$ \mathcal{M}=\frac{mRT}{PV}=\frac{(1.56\;\text{g})(0.0821\;{\text{L·atm·mol}}^{\text{−}1}{\text{K}}^{-1})(323\;\text{K})}{(0.984\;\text{atm})(1.00\;\text{L})}=42.0\;\text{g/mol} $$  {eq:fs-idp110330000}

Comparing the molar mass to the empirical formula mass shows how many empirical formula units make up a molecule:

$$ \frac{\mathcal{M}}{EM}=\frac{42.0\;\text{g/mol}}{14.0\;\text{g/mol}}=3 $$  {eq:fs-idm220246400}

The molecular formula is thus derived from the empirical formula by multiplying each of its subscripts by three:

$$ {({\text{CH}}_{2})}_{3}={\text{C}}_{3}{\text{H}}_{6} $$  {eq:fs-idm171124064}

**Check Your Learning**
Acetylene, a fuel used in welding torches, is composed of 92.3% C and 7.7% H by mass. Find the empirical formula. If 1.10 g of acetylene occupies of volume of 1.00 L at 1.15 atm and 59.5 °C, what is the molecular formula for acetylene?

:::note [answer] Answer:
Empirical formula, CH; Molecular formula, C<sub>2</sub>H<sub>2</sub>
:::
:::

:::example {ex:fs-idp207136496} Determining the Molar Mass of a Volatile Liquid
The approximate molar mass of a volatile liquid can be determined by:
1. Heating a sample of the liquid in a flask with a tiny hole at the top, which converts the liquid into gas that may escape through the hole
2. Removing the flask from heat at the instant when the last bit of liquid becomes gas, at which time the flask will be filled with only gaseous sample at ambient pressure
3. Sealing the flask and permitting the gaseous sample to condense to liquid, and then weighing the flask to determine the sample’s mass (see [ref:CNX_Chem_09_03_liquidgas])

> FIGURE {fig:CNX_Chem_09_03_liquidgas} src=../../media/CNX_Chem_09_03_liquidgas.jpg
> alt: This figure shows four photos each connected by a right-facing arrow. The first photo shows a glass flask with aluminum foil covering the top sitting on a scale. The second photo shows a syringe being inserted into the flask through the aluminum foil covering. The third photo shows the glass flask being inserted into a beaker of water. The water appears to be heated at 100. The fourth photo shows the glass flask being weighed again.
> caption: When the volatile liquid in the flask is heated past its boiling point, it becomes gas and drives air out of the flask. At ${t}_{l\;\longrightarrow \;g},$ the flask is filled with volatile liquid gas at the same pressure as the atmosphere. If the flask is then cooled to room temperature, the gas condenses and the mass of the gas that filled the flask, and is now liquid, can be measured. (credit: modification of work by Mark Ott)

Using this procedure, a sample of chloroform gas weighing 0.494 g is collected in a flask with a volume of 129 cm<sup>3</sup> at 99.6 °C when the atmospheric pressure is 742.1 mm Hg. What is the approximate molar mass of chloroform?
**Solution**
Since $\mathcal{M} =\;\frac{m}{n}$ and $n=\;\frac{PV}{RT},$ substituting and rearranging gives $\mathcal{M} =\;\frac{mRT}{PV},$
then

$$ \mathcal{M} =\;\frac{mRT}{PV}\;=\;\frac{(\text{0.494 g})\;\times \;\text{0.08206 L·atm/mol K}\;\times \;\text{372.8 K}}{\text{0.976 atm}\;\times \;\text{0.129 L}}\;=120\;\text{g/mol}. $$  {eq:fs-idm11022240}

**Check Your Learning**
A sample of phosphorus that weighs 3.243 $\times$ 10<sup>−2</sup> g exerts a pressure of 31.89 kPa in a 56.0-mL bulb at 550 °C. What are the molar mass and molecular formula of phosphorus vapor?

:::note [answer] Answer:
124 g/mol P<sub>4</sub>
:::
:::

## The Pressure of a Mixture of Gases: Dalton’s Law
Unless they chemically react with each other, the individual gases in a mixture of gases do not affect each other’s pressure. Each individual gas in a mixture exerts the same pressure that it would exert if it were present alone in the container ([ref:CNX_Chem_09_03_DaltonLaw1]). The pressure exerted by each individual gas in a mixture is called its {term:partial pressure}. This observation is summarized by {term:Dalton’s law of partial pressures}: *The total pressure of a mixture of ideal gases is equal to the sum of the partial pressures of the component gases*:

$$ {P}_{Total}={P}_{A}+{P}_{B}+{P}_{C}+...={\Sigma}_{\text{i}}{P}_{\text{i}} $$  {eq:fs-idp65742144}

In the equation *P<sub>Total</sub>* is the total pressure of a mixture of gases, *P<sub>A</sub>* is the partial pressure of gas A; *P<sub>B</sub>* is the partial pressure of gas B; *P<sub>C</sub>* is the partial pressure of gas C; and so on.

> FIGURE {fig:CNX_Chem_09_03_DaltonLaw1} src=../../media/CNX_Chem_09_03_DaltonLaw1-f981.jpg
> alt: This figure includes images of four gas-filled cylinders or tanks. Each has a valve at the top. The interior of the first cylinder is shaded blue. This region contains 5 small blue circles that are evenly distributed. The label “300 k P a” is on the cylinder. The second cylinder is shaded lavender. This region contains 8 small purple circles that are evenly distributed. The label “450 k P a” is on the cylinder. To the right of these cylinders is a third cylinder. Its interior is shaded pale yellow. This region contains 12 small yellow circles that are evenly distributed. The label “6000 k P a” is on this region of the cylinder. An arrow labeled “Total pressure combined” appears to the right of these three cylinders. This arrow points to a fourth cylinder. The interior of this cylinder is shaded a pale green. It contains evenly distributed small circles in the following quantities and colors; 5 blue, 8 purple, and 12 yellow. This cylinder is labeled “1350 k P a.”
> caption: If equal-volume cylinders containing gasses at pressures of 300 kPa, 450 kPa, and 600 kPa are all combined in the same-size cylinder, the total pressure of the gas mixture is 1350 kPa.

The partial pressure of gas A is related to the total pressure of the gas mixture via its {term:mole fraction (*X*)}, a unit of concentration defined as the number of moles of a component of a solution divided by the total number of moles of all components:

$$ {P}_{A}={X}_{A}\;\times \;{P}_{Total}\hspace{2em}\text{where}\hspace{2em}{X}_{A}=\;\frac{{n}_{A}}{{n}_{Total}} $$  {eq:fs-idp18188304}

where *P<sub>A</sub>*, *X<sub>A</sub>*, and *n<sub>A</sub>* are the partial pressure, mole fraction, and number of moles of gas A, respectively, and *n<sub>Total</sub>* is the number of moles of all components in the mixture.

:::example {ex:fs-idp143452448} The Pressure of a Mixture of Gases
A 10.0-L vessel contains 2.50 $\times$ 10<sup>−3</sup> mol of H<sub>2</sub>, 1.00 $\times$ 10<sup>−3</sup> mol of He, and 3.00 $\times$ 10<sup>−4</sup> mol of Ne at 35 °C.
(a) What are the partial pressures of each of the gases?
(b) What is the total pressure in atmospheres?
**Solution**
The gases behave independently, so the partial pressure of each gas can be determined from the ideal gas equation, using $P=\;\frac{nRT}{V}$:

$$ {P}_{{\text{H}}_{2}}=\;\frac{(2.50\;\times \;{10}^{\text{−3}}\;\cancel{\text{mol}})(0.08206\;\cancel{\text{L}}\;\text{atm}\;\cancel{{\text{mol}}^{\text{−1}}\;{\text{K}}^{\text{−1}}})(308\;\cancel{\text{K}})}{10.0\;\cancel{\text{L}}}\;=6.32\;\times \;{10}^{\text{−3}}\;\text{atm} $$  {eq:fs-idp201684064}

$$ {P}_{\text{He}}=\;\frac{(1.00\;\times \;{10}^{\text{−3}}\;\cancel{\text{mol}})(0.08206\;\cancel{\text{L}}\;\text{atm}\;\cancel{{\text{mol}}^{\text{−1}}\;{\text{K}}^{\text{−1}}})(308\;\cancel{\text{K}})}{10.0\;\cancel{\text{L}}}\;=2.53\;\times \;{10}^{\text{−3}}\;\text{atm} $$  {eq:fs-idp100280736}

$$ {P}_{\text{Ne}}=\;\frac{(3.00\;\times \;{10}^{\text{−4}}\;\cancel{\text{mol}})(0.08206\;\cancel{\text{L}}\;\text{atm}\;\cancel{{\text{mol}}^{\text{−1}}\;{\text{K}}^{\text{−1}}})(308\;\cancel{\text{K}})}{10.0\;\cancel{\text{L}}}\;=7.58\;\times \;{10}^{\text{−4}}\;\text{atm} $$  {eq:fs-idp36264816}

The total pressure is given by the sum of the partial pressures:

$$ {P}_{\text{T}}={P}_{{\text{H}}_{2}}+{P}_{\text{He}}+{P}_{\text{Ne}}=(0.00632+0.00253+0.00076)\;\text{atm}=9.61\;\times \;{10}^{\text{−3}}\;\text{atm} $$  {eq:fs-idp207663808}

**Check Your Learning**
A 5.73-L flask at 25 °C contains 0.0388 mol of N<sub>2</sub>, 0.147 mol of CO, and 0.0803 mol of H<sub>2</sub>. What is the total pressure in the flask in atmospheres?

:::note [answer] Answer:
1.137 atm
:::
:::
Here is another example of this concept, but dealing with mole fraction calculations.

:::example {ex:fs-idp107854880} The Pressure of a Mixture of Gases
A gas mixture used for anesthesia contains 2.83 mol oxygen, O<sub>2</sub>, and 8.41 mol nitrous oxide, N<sub>2</sub>O. The total pressure of the mixture is 192 kPa.
(a) What are the mole fractions of O<sub>2</sub> and N<sub>2</sub>O?
(b) What are the partial pressures of O<sub>2</sub> and N<sub>2</sub>O?
**Solution**
The mole fraction is given by ${X}_{A}=\;\frac{{n}_{A}}{{n}_{Total}}$ and the partial pressure is *P<sub>A</sub>* = *X<sub>A</sub>* $\times$ *P<sub>Total</sub>*.
For O<sub>2</sub>,

$$ {X}_{{O}_{2}}=\;\frac{{n}_{{O}_{2}}}{{n}_{Total}}\;=\;\frac{\text{2.83 mol}}{(2.83+8.41)\;\text{mol}}\;=0.252 $$  {eq:fs-idm52855552}

and ${P}_{{O}_{2}}={X}_{{O}_{2}}\;\times \;{P}_{Total}=0.252\;\times \;\text{192 kPa}=\text{48.4 kPa}$
For N<sub>2</sub>O,

$$ {X}_{{N}_{2}O}=\;\frac{{n}_{{N}_{2}O}}{{n}_{Total}}\;=\;\frac{\text{8.41 mol}}{(2.83+8.41)\;\text{mol}}\;=0.748 $$  {eq:fs-idp202334992}

and

${P}_{{N}_{2}O}={X}_{{N}_{2}O}\;\times \;{P}_{Total}=0.748\;\times \;\text{192 kPa}=\text{144 kPa}$
**Check Your Learning**
What is the pressure of a mixture of 0.200 g of H<sub>2</sub>, 1.00 g of N<sub>2</sub>, and 0.820 g of Ar in a container with a volume of 2.00 L at 20 °C?

:::note [answer] Answer:
1.87 atm
:::
:::

## Collection of Gases over Water
A simple way to collect gases that do not react with water is to capture them in a bottle that has been filled with water and inverted into a dish filled with water. The pressure of the gas inside the bottle can be made equal to the air pressure outside by raising or lowering the bottle. When the water level is the same both inside and outside the bottle ([ref:CNX_Chem_09_03_WaterVapor]), the pressure of the gas is equal to the atmospheric pressure, which can be measured with a barometer.

> FIGURE {fig:CNX_Chem_09_03_WaterVapor} src=../../media/CNX_Chem_09_03_WaterVapor.jpg class=scaled-down
> alt: This figure shows a diagram of equipment used for collecting a gas over water. To the left is an Erlenmeyer flask. It is approximately two thirds full of a lavender colored liquid. Bubbles are evident in the liquid. The label “Reaction Producing Gas” appears below the flask. A line segment connects this label to the liquid in the flask. The flask has a stopper in it through which a single glass tube extends from the open region above the liquid in the flask up, through the stopper, to the right, then angles down into a pan that is nearly full of light blue water. This tube again extends right once it is well beneath the water’s surface. It then bends up into an inverted flask which is labeled “Collection Flask.” This collection flask is positioned with its mouth beneath the surface of the light blue water and appears approximately half full. Bubbles are evident in the water in the inverted flask. The open space above the water in the inverted flask is labeled “collected gas.”
> caption: When a reaction produces a gas that is collected above water, the trapped gas is a mixture of the gas produced by the reaction and water vapor. If the collection flask is appropriately positioned to equalize the water levels both within and outside the flask, the pressure of the trapped gas mixture will equal the atmospheric pressure outside the flask (see the earlier discussion of manometers).

However, there is another factor we must consider when we measure the pressure of the gas by this method. Water evaporates and there is always gaseous water (water vapor) above a sample of liquid water. As a gas is collected over water, it becomes saturated with water vapor and the total pressure of the mixture equals the partial pressure of the gas plus the partial pressure of the water vapor. The pressure of the pure gas is therefore equal to the total pressure minus the pressure of the water vapor—this is referred to as the “dry” gas pressure, that is, the pressure of the gas only, without water vapor. The {term:vapor pressure of water}, which is the pressure exerted by water vapor in equilibrium with liquid water in a closed container, depends on the temperature ([ref:CNX_Chem_09_03_WaterVapor2]); more detailed information on the temperature dependence of water vapor can be found in [ref:fs-idm68841392], and vapor pressure will be discussed in more detail in the next chapter on liquids.

> FIGURE {fig:CNX_Chem_09_03_WaterVapor2} src=../../media/CNX_Chem_09_03_WaterVapor2.jpg class=scaled-down
> alt: A graph is shown. The horizontal axis is labeled “Temperature ( degrees C )” with markings and labels provided for multiples of 20 beginning at 0 and ending at 100. The vertical axis is labeled “Vapor pressure ( torr )” with marking and labels provided for multiples of 200, beginning at 0 and ending at 800. A smooth solid black curve extends from the origin up and to the right across the graph. The graph shows a positive trend with an increasing rate of change. On the vertical axis is ( 7 60) and an arrow pointing to it. The arrow is labeled, “Vapor pressure at ( 100 degrees C ).”
> caption: This graph shows the vapor pressure of water at sea level as a function of temperature.

> TABLE {tab:fs-idm68841392} cols=8 class=top-titled irregular
> summary: This table has six columns and 13 rows. The first row is a header and it labels each column, “Temperature (degree sign C),” “Pressure (torr),” “Temperature (degree sign C),” “Pressure (torr),” “Temperature (degree sign C),” and “Pressure (torr).” Under the first column are the following: negative 10, negative 5, negative 2, 0, 2, 4, 6, 8, 10, 12, 14, and 16. Under the second column are the following: 1.95, 3.0, 3.9, 4.6, 5.3, 6.1, 7.0, 8.0, 9.2, 10.5, 12.0, and 13.6. Under the third column are the following: 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, and 29. Under the fourth column are the following: 15.5, 16.5, 17.5, 18.7, 19.8, 21.1, 22.4, 23.8, 25.2, 26.7, 28.3, and 30.0. Under the fifth column are the following: 30, 35, 40, 50, 60, 70, 80, 90, 95, 99, 100.0, and 101.0. Under the sixth column are the following: 31.8, 42.2, 55.3, 92.5, 149.4, 233.7, 355.1, 525.8, 633.9, 733.2, 760.0, and 787.6.

| {span=6} Vapor Pressure of Ice and Water in Various Temperatures at Sea Level |
| Temperature (°C) | Pressure (torr) | Temperature (°C) | Pressure (torr) | Temperature (°C) | Pressure (torr) |
| –10 | 1.95 | 18 | 15.5 | 30 | 31.8 |
| –5 | 3.0 | 19 | 16.5 | 35 | 42.2 |
| –2 | 3.9 | 20 | 17.5 | 40 | 55.3 |
| 0 | 4.6 | 21 | 18.7 | 50 | 92.5 |
| 2 | 5.3 | 22 | 19.8 | 60 | 149.4 |
| 4 | 6.1 | 23 | 21.1 | 70 | 233.7 |
| 6 | 7.0 | 24 | 22.4 | 80 | 355.1 |
| 8 | 8.0 | 25 | 23.8 | 90 | 525.8 |
| 10 | 9.2 | 26 | 25.2 | 95 | 633.9 |
| 12 | 10.5 | 27 | 26.7 | 99 | 733.2 |
| 14 | 12.0 | 28 | 28.3 | 100.0 | 760.0 |
| 16 | 13.6 | 29 | 30.0 | 101.0 | 787.6 |

:::example {ex:fs-idp46681200} Pressure of a Gas Collected Over Water
If 0.200 L of argon is collected over water at a temperature of 26 °C and a pressure of 750 torr in a system like that shown in [ref:CNX_Chem_09_03_WaterVapor], what is the partial pressure of argon?
**Solution**
According to Dalton’s law, the total pressure in the bottle (750 torr) is the sum of the partial pressure of argon and the partial pressure of gaseous water:

$$ {P}_{\text{T}}={P}_{\text{Ar}}+{P}_{{\text{H}}_{2}\text{O}} $$  {eq:fs-idp297283264}

Rearranging this equation to solve for the pressure of argon gives:

$$ {P}_{\text{Ar}}={P}_{\text{T}}-{P}_{{\text{H}}_{2}\text{O}} $$  {eq:fs-idp33156768}

The pressure of water vapor above a sample of liquid water at 26 °C is 25.2 torr ([Appendix E](module:m68863)), so:

$$ {P}_{\text{Ar}}=750\;\text{torr}\;-25.2\;\text{torr}=725\;\text{torr} $$  {eq:fs-idm40258608}

**Check Your Learning**
A sample of oxygen collected over water at a temperature of 29.0 °C and a pressure of 764 torr has a volume of 0.560 L. What volume would the dry oxygen from this sample have under the same conditions of temperature and pressure?

:::note [answer] Answer:
0.537 L
:::
:::

## Chemical Stoichiometry and Gases
Chemical stoichiometry describes the quantitative relationships between reactants and products in chemical reactions.
We have previously measured quantities of reactants and products using masses for solids and volumes in conjunction with the molarity for solutions; now we can also use gas volumes to indicate quantities. If we know the volume, pressure, and temperature of a gas, we can use the ideal gas equation to calculate how many moles of the gas are present. If we know how many moles of a gas are involved, we can calculate the volume of a gas at any temperature and pressure.

## Avogadro’s Law Revisited
Sometimes we can take advantage of a simplifying feature of the stoichiometry of gases that solids and solutions do not exhibit: All gases that show ideal behavior contain the same number of molecules in the same volume (at the same temperature and pressure). Thus, the ratios of volumes of gases involved in a chemical reaction are given by the coefficients in the equation for the reaction, provided that the gas volumes are measured at the same temperature and pressure.
We can extend Avogadro’s law (that the volume of a gas is directly proportional to the number of moles of the gas) to chemical reactions with gases: Gases combine, or react, in definite and simple proportions by volume, provided that all gas volumes are measured at the same temperature and pressure. For example, since nitrogen and hydrogen gases react to produce ammonia gas according to ${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\;\longrightarrow \;2{\text{NH}}_{3}(g),$ a given volume of nitrogen gas reacts with three times that volume of hydrogen gas to produce two times that volume of ammonia gas, if pressure and temperature remain constant.
The explanation for this is illustrated in [ref:CNX_Chem_09_03_Ammonia]. According to Avogadro’s law, equal volumes of gaseous N<sub>2</sub>, H<sub>2</sub>, and NH<sub>3</sub>, at the same temperature and pressure, contain the same number of molecules. Because one molecule of N<sub>2</sub> reacts with three molecules of H<sub>2</sub> to produce two molecules of NH<sub>3</sub>, the volume of H<sub>2</sub> required is three times the volume of N<sub>2</sub>, and the volume of NH<sub>3</sub> produced is two times the volume of N<sub>2</sub>.<sub></sub>

> FIGURE {fig:CNX_Chem_09_03_Ammonia} src=../../media/CNX_Chem_09_03_Ammonia.jpg
> alt: This diagram provided models of the chemical reaction written with formulas across the bottom of the figure. The reaction is written; N subscript 2 plus 3H subscript 2 followed by an arrow pointing right to NH subscript 3. Just above the formulas, space-filling models are provided. Above NH subscript 2, two blue spheres are bonded. Above 3H subscript 2, three pairs of two slightly smaller white spheres are bonded. Above NH subscript 3, two molecules are shown composed each of a central blue sphere to which three slightly smaller white spheres are bonded. Across the top of the diagram, the reaction is illustrated with balloons. To the left is a light blue balloon, which is labeled “N subscript 2”. This balloon contains a single space-filling model composed of two bonded blue spheres. This balloon is followed by a plus sign, then three grey balloons which are each labeled “H subscript 2.” Each of these balloons similarly contain a single space-filling model composed of two bonded white spheres. These white spheres are slightly smaller than the blue spheres. An arrow follows that points right to two light-green balloons, which are each labeled “2 NH subscript 3.” Each light-green balloon contains a space-filling model composed of a single central blue sphere to which three slightly smaller white spheres are bonded.
> caption: One volume of N<sub>2</sub> combines with three volumes of H<sub>2</sub> to form two volumes of NH<sub>3</sub>.

:::example {ex:fs-idp89809920} Reaction of Gases
Propane, C<sub>3</sub>H<sub>8</sub>(*g*), is used in gas grills to provide the heat for cooking. What volume of O<sub>2</sub>(*g*) measured at 25 °C and 760 torr is required to react with 2.7 L of propane measured under the same conditions of temperature and pressure? Assume that the propane undergoes complete combustion.
**Solution**
The ratio of the volumes of C<sub>3</sub>H<sub>8</sub> and O<sub>2</sub> will be equal to the ratio of their coefficients in the balanced equation for the reaction:

$$ \begin{array}{l}{\text{C}}_{3}{\text{H}}_{8}(g)+5{\text{O}}_{2}(g) \longrightarrow 3{\text{CO}}_{2}(g)+4{\text{H}}_{2}\text{O}(l) \\ \text{1 volume}+\text{5 volumes}\hspace{3.5em}\text{3 volumes}+\text{4 volumes}\end{array} $$  {eq:fs-idp57291280}

From the equation, we see that one volume of C<sub>3</sub>H<sub>8</sub> will react with five volumes of O<sub>2</sub>:

$$ 2.7\;\cancel{\text{L}\;{\text{C}}_{3}{\text{H}}_{8}}\;\times \;\frac{\text{5 L}\;{\text{O}}_{2}}{1\;\cancel{\text{L}\;{\text{C}}_{3}{\text{H}}_{8}}}\;=\text{13.5 L}\;{\text{O}}_{2} $$  {eq:fs-idp8505312}

A volume of 13.5 L of O<sub>2</sub> will be required to react with 2.7 L of C<sub>3</sub>H<sub>8</sub>.
**Check Your Learning**
An acetylene tank for an oxyacetylene welding torch provides 9340 L of acetylene gas, C<sub>2</sub>H<sub>2</sub>, at 0 °C and 1 atm. How many tanks of oxygen, each providing 7.00 $\times$ 10<sup>3</sup> L of O<sub>2</sub> at 0 °C and 1 atm, will be required to burn the acetylene?

$$ 2{\text{C}}_{2}{\text{H}}_{2}+5{\text{O}}_{2}\;\longrightarrow \;4{\text{CO}}_{2}+2{\text{H}}_{2}\text{O} $$  {eq:fs-idp172649872}

:::note [answer] Answer:
3.34 tanks (2.34 $\times$ 10<sup>4</sup> L)
:::
:::

:::example {ex:fs-idp240638800} Volumes of Reacting Gases
Ammonia is an important fertilizer and industrial chemical. Suppose that a volume of 683 billion cubic feet of gaseous ammonia, measured at 25 °C and 1 atm, was manufactured. What volume of H<sub>2</sub>(*g*), measured under the same conditions, was required to prepare this amount of ammonia by reaction with N<sub>2</sub>?

$$ {\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\;\longrightarrow \;2{\text{NH}}_{3}(g) $$  {eq:fs-idp109603280}

**Solution**
Because equal volumes of H<sub>2</sub> and NH<sub>3</sub> contain equal numbers of molecules and each three molecules of H<sub>2</sub> that react produce two molecules of NH<sub>3</sub>, the ratio of the volumes of H<sub>2</sub> and NH<sub>3</sub> will be equal to 3:2. Two volumes of NH<sub>3</sub>, in this case in units of billion ft<sup>3</sup>, will be formed from three volumes of H<sub>2</sub>:

$$ 683\;\cancel{\text{billion}\;{\text{ft}}^{3}\;{\text{NH}}_{3}}\;\times \;\frac{\text{3 billion}\;{\text{ft}}^{3}\;{\text{H}}_{2}}{2\;\cancel{\text{billion}\;{\text{ft}}^{3}\;{\text{NH}}_{3}}}\;=1.02\;\times \;{10}^{3}\;\text{billion}\;{\text{ft}}^{3}\;{\text{H}}_{2} $$  {eq:fs-idp171418912}

The manufacture of 683 billion ft<sup>3</sup> of NH<sub>3</sub> required 1020 billion ft<sup>3</sup> of H<sub>2</sub>. (At 25 °C and 1 atm, this is the volume of a cube with an edge length of approximately 1.9 miles.)
**Check Your Learning**
What volume of O<sub>2</sub>(*g*) measured at 25 °C and 760 torr is required to react with 17.0 L of ethylene, C<sub>2</sub>H<sub>4</sub>(*g*), measured under the same conditions of temperature and pressure? The products are CO<sub>2</sub> and water vapor.

:::note [answer] Answer:
51.0 L
:::
:::

:::example {ex:fs-idp13049024} Volume of Gaseous Product
What volume of hydrogen at 27 °C and 723 torr may be prepared by the reaction of 8.88 g of gallium with an excess of hydrochloric acid?

$$ 2\text{Ga}(s)+6\text{HCl}(aq)\;\longrightarrow \;2{\text{GaCl}}_{3}(aq)+3{\text{H}}_{2}(g) $$  {eq:fs-idm20890912}

**Solution**
Convert the provided mass of the limiting reactant, Ga, to moles of hydrogen produced:

$$ 8.88\;\cancel{\text{g Ga}}\;\times \;\frac{1\;\cancel{\text{mol Ga}}}{69.723\;\cancel{\text{g Ga}}}\;\times \;\frac{\text{3 mol}\;{\text{H}}_{2}}{2\;\cancel{\text{mol Ga}}}\;=0.191\;{\text{mol H}}_{2} $$  {eq:fs-idm46693760}

Convert the provided temperature and pressure values to appropriate units (K and atm, respectively), and then use the molar amount of hydrogen gas and the ideal gas equation to calculate the volume of gas:

$$ V=(\frac{nRT}{P})=\;\frac{0.191\;\cancel{\text{mol}}\;\times \;\text{0.08206 L}\;\cancel{\text{atm}\;{\text{mol}}^{\text{−1}}\;{\text{K}}^{\text{−1}}}\;\times \;\text{300 K}}{0.951\;\cancel{\text{atm}}}\;=\text{4.94 L} $$  {eq:fs-idp48121168}

**Check Your Learning**
Sulfur dioxide is an intermediate in the preparation of sulfuric acid. What volume of SO<sub>2</sub> at 343 °C and 1.21 atm is produced by burning 1.00 kg of sulfur in excess oxygen?

:::note [answer] Answer:
1.30 $\times$ 10<sup>3</sup> L
:::
:::

:::note [chemistry sciences-interconnect] Greenhouse Gases and Climate Change
The thin skin of our atmosphere keeps the earth from being an ice planet and makes it habitable. In fact, this is due to less than 0.5% of the air molecules. Of the energy from the sun that reaches the earth, almost $\frac{1}{3}$ is reflected back into space, with the rest absorbed by the atmosphere and the surface of the earth. Some of the energy that the earth absorbs is re-emitted as infrared (IR) radiation, a portion of which passes back out through the atmosphere into space. Most of this IR radiation, however, is absorbed by certain atmospheric gases, effectively trapping heat within the atmosphere in a phenomenon known as the *greenhouse effect*. This effect maintains global temperatures within the range needed to sustain life on earth. Without our atmosphere, the earth's average temperature would be lower by more than 30 °C (nearly 60 °F). The major greenhouse gases (GHGs) are water vapor, carbon dioxide, methane, and ozone. Since the Industrial Revolution, human activity has been increasing the concentrations of GHGs, which have changed the energy balance and are significantly altering the earth’s climate ([ref:CNX_Chem_09_03_GlobalWarming]).

> FIGURE {fig:CNX_Chem_09_03_GlobalWarming} src=../../media/CNX_Chem_09_03_GlobalWarming-b740.jpg class=scaled-down
> alt: This diagram shows half of a two dimensional view of the earth in blue and green at the left of the image. A slight distance outside the hemisphere is a grey arc. A line segment connects the label “Atmosphere” to the region between the hemisphere and the grey arc. In this region, near the surface of the earth the chemical formulas C O subscript 2, C H subscript 3, and N subscript 2 O appear. Five red arrows formed from wavy lines extend from green regions on the earth out into and just beyond the region labeled “Atmosphere.” The label “Infrared radiation” points to one of these red arrows. At a fair distance outside of the grey arc appears a yellow circle with a jagged boundary. This circle is labeled “Sun.” From it extend yellow arrows with wavy lines which extend toward the earth. Three of the arrows extend to the green region on the earth. One of the arrows appears to be reflected off the grey arc, causing its path to turn away from the earth.
> caption: Greenhouse gases trap enough of the sun’s energy to make the planet habitable—this is known as the greenhouse effect. Human activities are increasing greenhouse gas levels, warming the planet and causing more extreme weather events.

There is strong evidence from multiple sources that higher atmospheric levels of CO<sub>2</sub> are caused by human activity, with fossil fuel burning accounting for about $\frac{3}{4}$ of the recent increase in CO<sub>2</sub>. Reliable data from ice cores reveals that CO<sub>2</sub> concentration in the atmosphere is at the highest level in the past 800,000 years; other evidence indicates that it may be at its highest level in 20 million years. In recent years, the CO<sub>2</sub> concentration has increased preindustrial levels of ~280 ppm to more than 400 ppm today ([ref:CNX_Chem_09_03_GlobalWarming2]).

> FIGURE {fig:CNX_Chem_09_03_GlobalWarming2} src=../../media/CNX_Chem_09_03_GlobalWarming2.jpg
> alt: This figure has the heading “Carbon Dioxide in the Atmosphere.” The first graph has a horizontal axis label “Year ( B C )” and a vertical axis label “Carbon dioxide concentration ( p p m ).” The horizontal axis labels begin at 700,000 on the left and increases by multiples of 100,000 up to 0 on the right. The vertical axis begins at 0 and increases by multiples of 50 extending up to 400. A jagged, cyclical pattern is shown that begins before 600,000 B C at under 200 p p m. Up to 0 B C values appear to vary cyclically up to a high of about 300 p p m. Extending beyond 0 B C to the right, the carbon dioxide concentration appears to be on a steady increase, having reached nearly 400 p p m in recent years. The second graph is shown to magnify the portion of the graph that is most recent. This graph begins just before the year 1960 and includes markings for multiples of 10 up to the year 2010. The vertical axis begins just below 320 p p m and includes markings for all multiples of 20 up to 400 p p m. A smooth black line is shown extending through a jagged red data pattern. The trend is a steady, nearly linear increase from the lower left to the upper right on the graph.
> caption: CO<sub>2</sub> levels over the past 700,000 years were typically from 200–300 ppm, with a steep, unprecedented increase over the past 50 years.

:::

:::note [chemistry link-to-learning] 
Click [here](http://openstax.org/l/16GlobalWarming) to see a 2-minute video explaining greenhouse gases and global warming.
:::

:::note [chemistry chemist-portrait] Susan Solomon
Atmospheric and climate scientist Susan {index:Solomon} ([ref:CNX_Chem_09_03_SusanSolom]) is the author of one of *The New York Times* books of the year (*The Coldest March*, 2001), one of Time magazine’s 100 most influential people in the world (2008), and a working group leader of the Intergovernmental Panel on Climate Change (IPCC), which was the recipient of the 2007 Nobel Peace Prize. She helped determine and explain the cause of the formation of the ozone hole over Antarctica, and has authored many important papers on climate change. She has been awarded the top scientific honors in the US and France (the National Medal of Science and the Grande Medaille, respectively), and is a member of the National Academy of Sciences, the Royal Society, the French Academy of Sciences, and the European Academy of Sciences. Formerly a professor at the University of Colorado, she is now at MIT, and continues to work at NOAA.
For more information, watch this [video](http://openstax.org/l/16SusanSolomon) about Susan Solomon.

> FIGURE {fig:CNX_Chem_09_03_SusanSolom} src=../../media/CNX_Chem_09_03_SusanSolom.jpg class=scaled-down
> alt: A photograph is shown of Susan Solomon sitting next to a globe.
> caption: Susan Solomon’s research focuses on climate change and has been instrumental in determining the cause of the ozone hole over Antarctica. (credit: National Oceanic and Atmospheric Administration)

:::

## Key Concepts and Summary {section:summary}
The ideal gas law can be used to derive a number of convenient equations relating directly measured quantities to properties of interest for gaseous substances and mixtures. Appropriate rearrangement of the ideal gas equation may be made to permit the calculation of gas densities and molar masses. Dalton’s law of partial pressures may be used to relate measured gas pressures for gaseous mixtures to their compositions. Avogadro’s law may be used in stoichiometric computations for chemical reactions involving gaseous reactants or products.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| *P<sub>Total</sub>* = *P<sub>A</sub>* + *P<sub>B</sub>* + *P<sub>C</sub>* + … = Ʃ<sub>i</sub>*P*<sub>i</sub> |
| *P<sub>A</sub>* = *X<sub>A</sub> P<sub>Total</sub>* |
| ${X}_{A}=\;\frac{{n}_{A}}{{n}_{Total}}$ |
|  |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp231956592} type= 
PROBLEM:
What is the density of laughing gas, dinitrogen monoxide, N<sub>2</sub>O, at a temperature of 325 K and a pressure of 113.0 kPa?
:::

:::exercise {fs-idp64305520} type= 
PROBLEM:
Calculate the density of Freon 12, CF<sub>2</sub>Cl<sub>2</sub>, at 30.0 °C and 0.954 atm.
SOLUTION:
4.64 g L<sup>−1</sup>
:::

:::exercise {fs-idp50300640} type= 
PROBLEM:
Which is denser at the same temperature and pressure, dry air or air saturated with water vapor? Explain.
:::

:::exercise {fs-idm31331424} type= 
PROBLEM:
A cylinder of O<sub>2</sub>(*g*) used in breathing by patients with emphysema has a volume of 3.00 L at a pressure of 10.0 atm. If the temperature of the cylinder is 28.0 °C, what mass of oxygen is in the cylinder?
SOLUTION:
38.8 g
:::

:::exercise {fs-idp20795744} type= 
PROBLEM:
What is the molar mass of a gas if 0.0494 g of the gas occupies a volume of 0.100 L at a temperature 26 °C and a pressure of 307 torr?
:::

:::exercise {fs-idp19006560} type= 
PROBLEM:
What is the molar mass of a gas if 0.281 g of the gas occupies a volume of 125 mL at a temperature 126 °C and a pressure of 777 torr?
SOLUTION:
72.0 g mol<sup>−1</sup>
:::

:::exercise {fs-idp39361600} type= 
PROBLEM:
How could you show experimentally that the molecular formula of propene is C<sub>3</sub>H<sub>6</sub>, not CH<sub>2</sub>?
:::

:::exercise {fs-idp37043264} type= 
PROBLEM:
The density of a certain gaseous fluoride of phosphorus is 3.93 g/L at STP. Calculate the molar mass of this fluoride and determine its molecular formula.
SOLUTION:
88.1 g mol<sup>−1</sup>; PF<sub>3</sub>
:::

:::exercise {fs-idm10841488} type= 
PROBLEM:
Consider this question: What is the molecular formula of a compound that contains 39% C, 45% N, and 16% H if 0.157 g of the compound occupies 125 mL with a pressure of 99.5 kPa at 22 °C?
(a) Outline the steps necessary to answer the question.
(b) Answer the question.
:::

:::exercise {fs-idp13701424} type= 
PROBLEM:
A 36.0–L cylinder of a gas used for calibration of blood gas analyzers in medical laboratories contains 350 g CO<sub>2</sub>, 805 g O<sub>2</sub>, and 4,880 g N<sub>2</sub>. At 25 degrees C, what is the pressure in the cylinder in atmospheres?
SOLUTION:
141 atm, 107,000 torr, 14,300 kPa
:::

:::exercise {fs-idp106657088} type= 
PROBLEM:
A cylinder of a gas mixture used for calibration of blood gas analyzers in medical laboratories contains 5.0% CO<sub>2</sub>, 12.0% O<sub>2</sub>, and the remainder N<sub>2</sub> at a total pressure of 146 atm. What is the partial pressure of each component of this gas? (The percentages given indicate the percent of the total pressure that is due to each component.)
:::

:::exercise {fs-idp207682832} type= 
PROBLEM:
A sample of gas isolated from unrefined petroleum contains 90.0% CH<sub>4</sub>, 8.9% C<sub>2</sub>H<sub>6</sub>, and 1.1% C<sub>3</sub>H<sub>8</sub> at a total pressure of 307.2 kPa. What is the partial pressure of each component of this gas? (The percentages given indicate the percent of the total pressure that is due to each component.)
SOLUTION:
CH<sub>4</sub>: 276 kPa; C<sub>2</sub>H<sub>6</sub>: 27 kPa; C<sub>3</sub>H<sub>8</sub>: 3.4 kPa
:::

:::exercise {fs-idp19919472} type= 
PROBLEM:
A mixture of 0.200 g of H<sub>2</sub>, 1.00 g of N<sub>2</sub>, and 0.820 g of Ar is stored in a closed container at STP. Find the volume of the container, assuming that the gases exhibit ideal behavior.
:::

:::exercise {fs-idp86142480} type= 
PROBLEM:
Most mixtures of hydrogen gas with oxygen gas are explosive. However, a mixture that contains less than 3.0 % O<sub>2</sub> is not. If enough O<sub>2</sub> is added to a cylinder of H<sub>2</sub> at 33.2 atm to bring the total pressure to 34.5 atm, is the mixture explosive?
SOLUTION:
Yes
:::

:::exercise {fs-idp100299232} type= 
PROBLEM:
A commercial mercury vapor analyzer can detect, in air, concentrations of gaseous Hg atoms (which are poisonous) as low as 2 $\times$ 10<sup>−6</sup> mg/L of air. At this concentration, what is the partial pressure of gaseous mercury if the atmospheric pressure is 733 torr at 26 °C?
:::

:::exercise {fs-idm12594800} type= 
PROBLEM:
A sample of carbon monoxide was collected over water at a total pressure of 756 torr and a temperature of 18 °C. What is the pressure of the carbon monoxide? (See [ref:fs-idm68841392] for the vapor pressure of water.)
SOLUTION:
740 torr
:::

:::exercise {fs-idp38931136} type= 
PROBLEM:
In an experiment in a general chemistry laboratory, a student collected a sample of a gas over water. The volume of the gas was 265 mL at a pressure of 753 torr and a temperature of 27 °C. The mass of the gas was 0.472 g. What was the molar mass of the gas?
:::

:::exercise {fs-idp211830176} type= 
PROBLEM:
Joseph Priestley first prepared pure oxygen by heating mercuric oxide, HgO:
$2\text{HgO}(s)\;\longrightarrow \;2\text{Hg}(l)+{\text{O}}_{2}(g)$
(a) Outline the steps necessary to answer the following question: What volume of O<sub>2</sub> at 23 °C and 0.975 atm is produced by the decomposition of 5.36 g of HgO?
(b) Answer the question.
SOLUTION:
(a) Determine the moles of HgO that decompose; using the chemical equation, determine the moles of O<sub>2</sub> produced by decomposition of this amount of HgO; and determine the volume of O<sub>2</sub> from the moles of O<sub>2</sub>, temperature, and pressure. (b) 0.308 L
:::

:::exercise {fs-idp46179152} type= 
PROBLEM:
Cavendish prepared hydrogen in 1766 by the novel method of passing steam through a red-hot gun barrel:
$4{\text{H}}_{2}\text{O}(g)+3\text{Fe}(s)\;\longrightarrow \;{\text{Fe}}_{3}{\text{O}}_{4}(s)+4{\text{H}}_{2}(g)$
(a) Outline the steps necessary to answer the following question: What volume of H<sub>2</sub> at a pressure of 745 torr and a temperature of 20 °C can be prepared from the reaction of 15.0 g of H<sub>2</sub>O?
(b) Answer the question.
:::

:::exercise {fs-idp39473616} type= 
PROBLEM:
The chlorofluorocarbon CCl<sub>2</sub>F<sub>2</sub> can be recycled into a different compound by reaction with hydrogen to produce CH<sub>2</sub>F<sub>2</sub>(*g*), a compound useful in chemical manufacturing:
${\text{CCl}}_{2}{\text{F}}_{2}(g)+4{\text{H}}_{2}(g)\;\longrightarrow \;{\text{CH}}_{2}{\text{F}}_{2}(g)+2\text{HCl}(g)$
(a) Outline the steps necessary to answer the following question: What volume of hydrogen at 225 atm and 35.5 °C would be required to react with 1 ton (1.000 $\times$ 10<sup>3</sup> kg) of CCl<sub>2</sub>F<sub>2</sub>?
(b) Answer the question.
SOLUTION:
(a) Determine the molar mass of CCl<sub>2</sub>F<sub>2</sub>. From the balanced equation, calculate the moles of H<sub>2</sub> needed for the complete reaction. From the ideal gas law, convert moles of H<sub>2</sub> into volume. (b) 3.72 $\times$ 10<sup>3</sup> L
:::

:::exercise {fs-idp152416544} type= 
PROBLEM:
Automobile air bags are inflated with nitrogen gas, which is formed by the decomposition of solid sodium azide (NaN<sub>3</sub>). The other product is sodium metal. Calculate the volume of nitrogen gas at 27 °C and 756 torr formed by the decomposition of 125 g of sodium azide.
:::

:::exercise {fs-idp169761136} type= 
PROBLEM:
Lime, CaO, is produced by heating calcium carbonate, CaCO<sub>3</sub>; carbon dioxide is the other product.
(a) Outline the steps necessary to answer the following question: What volume of carbon dioxide at 875 K and 0.966 atm is produced by the decomposition of 1 ton (1.000 $\times$ 10<sup>3</sup> kg) of calcium carbonate?
(b) Answer the question.
SOLUTION:
(a) Balance the equation. Determine the grams of CO<sub>2</sub> produced and the number of moles. From the ideal gas law, determine the volume of gas. (b) 7.43 $\times$ 10<sup>5</sup> L
:::

:::exercise {fs-idp228232112} type= 
PROBLEM:
Before small batteries were available, carbide lamps were used for bicycle lights. Acetylene gas, C<sub>2</sub>H<sub>2</sub>, and solid calcium hydroxide were formed by the reaction of calcium carbide, CaC<sub>2</sub>, with water. The ignition of the acetylene gas provided the light. Currently, the same lamps are used by some cavers, and calcium carbide is used to produce acetylene for carbide cannons.
(a) Outline the steps necessary to answer the following question: What volume of C<sub>2</sub>H<sub>2</sub> at 1.005 atm and 12.2 °C is formed by the reaction of 15.48 g of CaC<sub>2</sub> with water?
(b) Answer the question.
:::

:::exercise {fs-idp197293648} type= 
PROBLEM:
Calculate the volume of oxygen required to burn 12.00 L of ethane gas, C<sub>2</sub>H<sub>6</sub>, to produce carbon dioxide and water, if the volumes of C<sub>2</sub>H<sub>6</sub> and O<sub>2</sub> are measured under the same conditions of temperature and pressure.
SOLUTION:
42.00 L
:::

:::exercise {fs-idp88428400} type= 
PROBLEM:
What volume of O<sub>2</sub> at STP is required to oxidize 8.0 L of NO at STP to NO<sub>2</sub>? What volume of NO<sub>2</sub> is produced at STP?
:::

:::exercise {fs-idp259668928} type= 
PROBLEM:
Consider the following questions:
(a) What is the total volume of the CO<sub>2</sub>(*g*) and H<sub>2</sub>O(*g*) at 600 °C and 0.888 atm produced by the combustion of 1.00 L of C<sub>2</sub>H<sub>6</sub>(*g*) measured at STP?
(b) What is the partial pressure of H<sub>2</sub>O in the product gases?
SOLUTION:
(a) 18.0 L; (b) 0.533 atm
:::

:::exercise {fs-idp68901248} type= 
PROBLEM:
Methanol, CH<sub>3</sub>OH, is produced industrially by the following reaction:
$\text{CO}(g)+2{\text{H}}_{2}(g)\;\overset{\hspace{2em}\text{copper catalyst 300 °C, 300 atm}\hspace{2em}}{\to}\;{\text{CH}}_{3}\text{OH}(g)$
Assuming that the gases behave as ideal gases, find the ratio of the total volume of the reactants to the final volume.
:::

:::exercise {fs-idp41440272} type= 
PROBLEM:
What volume of oxygen at 423.0 K and a pressure of 127.4 kPa is produced by the decomposition of 129.7 g of BaO<sub>2</sub> to BaO and O<sub>2</sub>?
SOLUTION:
10.57 L O<sub>2</sub>
:::

:::exercise {fs-idp86448160} type= 
PROBLEM:
A 2.50-L sample of a colorless gas at STP decomposed to give 2.50 L of N<sub>2</sub> and 1.25 L of O<sub>2</sub> at STP. What is the colorless gas?
:::

:::exercise {fs-idm29455728} type= 
PROBLEM:
Ethanol, C<sub>2</sub>H<sub>5</sub>OH, is produced industrially from ethylene, C<sub>2</sub>H<sub>4</sub>, by the following sequence of reactions:
$3{\text{C}}_{2}{\text{H}}_{4}+2{\text{H}}_{2}{\text{SO}}_{4}\;\longrightarrow \;{\text{C}}_{2}{\text{H}}_{5}{\text{HSO}}_{4}+{({\text{C}}_{2}{\text{H}}_{5})}_{2}{\text{SO}}_{4}$
${\text{C}}_{2}{\text{H}}_{5}{\text{HSO}}_{4}+{({\text{C}}_{2}{\text{H}}_{5})}_{2}{\text{SO}}_{4}+3{\text{H}}_{2}\text{O}\;\longrightarrow \;3{\text{C}}_{2}{\text{H}}_{5}\text{OH}+2{\text{H}}_{2}{\text{SO}}_{4}$
What volume of ethylene at STP is required to produce 1.000 metric ton (1000 kg) of ethanol if the overall yield of ethanol is 90.1%?
SOLUTION:
5.40 $\times$ 10<sup>5</sup> L
:::

:::exercise {fs-idp55931680} type= 
PROBLEM:
One molecule of hemoglobin will combine with four molecules of oxygen. If 1.0 g of hemoglobin combines with 1.53 mL of oxygen at body temperature (37 °C) and a pressure of 743 torr, what is the molar mass of hemoglobin?
:::

:::exercise {fs-idp69237328} type= 
PROBLEM:
A sample of a compound of xenon and fluorine was confined in a bulb with a pressure of 18 torr. Hydrogen was added to the bulb until the pressure was 72 torr. Passage of an electric spark through the mixture produced Xe and HF. After the HF was removed by reaction with solid KOH, the final pressure of xenon and unreacted hydrogen in the bulb was 36 torr. What is the empirical formula of the xenon fluoride in the original sample? (Note: Xenon fluorides contain only one xenon atom per molecule.)
SOLUTION:
XeF<sub>4</sub>
:::

:::exercise {fs-idp224745536} type= 
PROBLEM:
One method of analyzing amino acids is the van Slyke method. The characteristic amino groups (−NH<sub>2</sub>) in protein material are allowed to react with nitrous acid, HNO<sub>2</sub>, to form N<sub>2</sub> gas. From the volume of the gas, the amount of amino acid can be determined. A 0.0604-g sample of a biological sample containing glycine, CH<sub>2</sub>(NH<sub>2</sub>)COOH, was analyzed by the van Slyke method and yielded 3.70 mL of N<sub>2</sub> collected over water at a pressure of 735 torr and 29 °C. What was the percentage of glycine in the sample?
${\text{CH}}_{2}({\text{NH}}_{2}){\text{CO}}_{2}\text{H}+{\text{HNO}}_{2}\;\longrightarrow \;{\text{CH}}_{2}(\text{OH}){\text{CO}}_{2}\text{H}+{\text{H}}_{2}\text{O}+{\text{N}}_{2}$
:::

## Glossary
- {def} **Dalton’s law of partial pressures**: total pressure of a mixture of ideal gases is equal to the sum of the partial pressures of the component gases
- {def} **mole fraction (*X*)**: concentration unit defined as the ratio of the molar amount of a mixture component to the total number of moles of all mixture components
- {def} **partial pressure**: pressure exerted by an individual gas in a mixture
- {def} **vapor pressure of water**: pressure exerted by water vapor in equilibrium with liquid water in a closed container at a specific temperature
