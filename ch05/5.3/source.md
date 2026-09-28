# Enthalpy

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- State the first law of thermodynamics
- Define enthalpy and explain its classification as a state function
- Write and balance thermochemical equations
- Calculate enthalpy changes for various chemical reactions
- Explain Hess’s law and use it to compute reaction enthalpies

Thermochemistry is a branch of {term:chemical thermodynamics}, the science that deals with the relationships between heat, work, and other forms of energy in the context of chemical and physical processes. As we concentrate on thermochemistry in this chapter, we need to consider some widely used concepts of thermodynamics.
Substances act as reservoirs of energy, meaning that energy can be added to them or removed from them. Energy is stored in a substance when the kinetic energy of its atoms or molecules is raised. The greater kinetic energy may be in the form of increased translations (travel or straight-line motions), vibrations, or rotations of the atoms or molecules. When thermal energy is lost, the intensities of these motions decrease and the kinetic energy falls. The total of all possible kinds of energy present in a substance is called the {term:internal energy (*U*)}, sometimes symbolized as *E*.
As a system undergoes a change, its internal energy can change, and energy can be transferred from the system to the surroundings, or from the surroundings to the system. Energy is transferred into a system when it absorbs heat (*q*) from the surroundings or when the surroundings do work (*w*) on the system. For example, energy is transferred into room-temperature metal wire if it is immersed in hot water (the wire absorbs heat from the water), or if you rapidly bend the wire back and forth (the wire becomes warmer because of the work done on it). Both processes increase the internal energy of the wire, which is reflected in an increase in the wire’s temperature. Conversely, energy is transferred out of a system when heat is lost from the system, or when the system does work on the surroundings.
The relationship between internal energy, heat, and work can be represented by the equation:

$$ \text{Δ}U=q+w $$  {eq:fs-idm150109936}

as shown in [ref:CNX_Chem_05_03_Systemqw]. This is one version of the {term:first law of thermodynamics}, and it shows that the internal energy of a system changes through heat flow into or out of the system (positive *q* is heat flow in; negative *q* is heat flow out) or work done on or by the system. The work, *w*, is positive if it is done on the system and negative if it is done by the system.

> FIGURE {fig:CNX_Chem_05_03_Systemqw} src=../../media/CNX_Chem_05_03_Systemqw.jpg class=scaled-down
> alt: A rectangular diagram is shown. A green oval lies in the center of a tan field inside of a gray box. The tan field is labeled “Surroundings” and the equation “Δ U = q + w” is written at the bottom of the diagram. Two arrows face into the green oval and are labeled “q subscript in” and “w subscript on” while two more arrows face away from the oval and are labeled “q subscript out” and “w subscript by.” The center of the oval contains the terms “Δ U > 0”, “System,” and “Δ U < 0.”
> caption: The internal energy, *U*, of a system can be changed by heat flow and work. If heat flows into the system, *q*<sub>in</sub>, or work is done on the system, *w*<sub>on</sub>, its internal energy increases, Δ*U* > 0. If heat flows out of the system, *q*<sub>out</sub>, or work is done by the system, *w*<sub>by</sub>, its internal energy decreases, Δ*U* < 0.

A type of work called {term:expansion work} (or pressure-volume work) occurs when a system pushes back the surroundings against a restraining pressure, or when the surroundings compress the system. An example of this occurs during the operation of an internal combustion engine. The reaction of gasoline and oxygen is exothermic. Some of this energy is given off as heat, and some does work pushing the piston in the cylinder. The substances involved in the reaction are the system, and the engine and the rest of the universe are the surroundings. The system loses energy by both heating and doing work on the surroundings, and its internal energy decreases. (The engine is able to keep the car moving because this process is repeated many times per second while the engine is running.) We will consider how to determine the amount of work involved in a chemical or physical change in the chapter on thermodynamics.

:::note [chemistry link-to-learning] 
This view of [an internal combustion engine](http://openstax.org/l/16combustion) illustrates the conversion of energy produced by the exothermic combustion reaction of a fuel such as gasoline into energy of motion.
:::
As discussed, the relationship between internal energy, heat, and work can be represented as Δ*U* = *q* + *w*. Internal energy is an example of a {term:state function} (or state variable), whereas heat and work are not state functions. The value of a state function depends only on the state that a system is in, and not on how that state is reached. If a quantity is not a state function, then its value *does* depend on how the state is reached. An example of a state function is altitude or elevation. If you stand on the summit of Mt. Kilimanjaro, you are at an altitude of 5895 m, and it does not matter whether you hiked there or parachuted there. The distance you traveled to the top of Kilimanjaro, however, is not a state function. You could climb to the summit by a direct route or by a more roundabout, circuitous path ([ref:CNX_Chem_05_03_Summit]). The distances traveled would differ (distance is not a state function) but the elevation reached would be the same (altitude is a state function).

> FIGURE {fig:CNX_Chem_05_03_Summit} src=../../media/CNX_Chem_05_03_Summit.jpg class=scaled-down
> alt: An aerial photo depicts a view of Mount Kilimanjaro. A straight, green arrow labeled X is drawn from the term “base,” written at the bottom of the mountain, to the term “Summit,” written at the top of the mountain. Another arrow labeled Y is draw from the base to the summit alongside the green arrow, but this arrow is pink and has three large S-shaped curves along its length.
> caption: Paths X and Y represent two different routes to the summit of Mt. Kilimanjaro. Both have the same change in elevation (altitude or elevation on a mountain is a state function; it does not depend on path), but they have very different distances traveled (distance walked is not a state function; it depends on the path). (credit: modification of work by Paul Shaffner)

Chemists ordinarily use a property known as {term:enthalpy (*H*)} to describe the thermodynamics of chemical and physical processes. Enthalpy is defined as the sum of a system’s internal energy (*U*) and the mathematical product of its pressure (*P*) and volume (*V*):

$$ H=U+PV $$  {eq:fs-idm231773856}

Enthalpy is also a state function. Enthalpy values for specific substances cannot be measured directly; only enthalpy *changes* for chemical or physical processes can be determined. For processes that take place at constant pressure (a common condition for many chemical and physical changes), the {term:enthalpy change (Δ*H*)} is:

$$ \text{Δ}H=\text{Δ}U+P\text{Δ}V $$  {eq:fs-idm182172016}

The mathematical product *P*Δ*V* represents work (*w*), namely, expansion or pressure-volume work as noted. By their definitions, the arithmetic signs of Δ*V* and *w* will always be opposite:

$$ P\text{Δ}V=\text{−}w $$  {eq:fs-idm223126448}

Substituting this equation and the definition of internal energy into the enthalpy-change equation yields:

$$ \begin{array}{l}\text{Δ}H=\text{Δ}U+P\text{Δ}V \\ ={q}_{\text{p}}+w-w \\ ={q}_{\text{p}}\end{array} $$  {eq:fs-idm223599728}

where *q<sub>p</sub>* is the heat of reaction under conditions of constant pressure.
And so, if a chemical or physical process is carried out at constant pressure with the only work done caused by expansion or contraction, then the heat flow (*q<sub>p</sub>*) and enthalpy change (Δ*H*) for the process are equal.
The heat given off when you operate a Bunsen burner is equal to the enthalpy change of the methane combustion reaction that takes place, since it occurs at the essentially constant pressure of the atmosphere. On the other hand, the heat produced by a reaction measured in a bomb calorimeter ([ref:CNX_Chem_05_02_BombCalor](module:m68726)) is not equal to Δ*H* because the closed, constant-volume metal container prevents the pressure from remaining constant (it may increase or decrease if the reaction yields increased or decreased amounts of gaseous species). Chemists usually perform experiments under normal atmospheric conditions, at constant external pressure with *q* = Δ*H*, which makes enthalpy the most convenient choice for determining heat changes for chemical reactions.
The following conventions apply when using Δ*H*:
- A negative value of an enthalpy change, Δ*H* < 0, indicates an exothermic reaction; a positive value, Δ*H* > 0, indicates an endothermic reaction. If the direction of a chemical equation is reversed, the arithmetic sign of its Δ*H* is changed (a process that is endothermic in one direction is exothermic in the opposite direction).
- Chemists use a thermochemical equation to represent the changes in both matter and energy. In a thermochemical equation, the enthalpy change of a reaction is shown as a Δ*H* value following the equation for the reaction. This Δ*H* value indicates the amount of heat associated with the reaction involving the number of moles of reactants and products *as shown in the chemical equation*. For example, consider this equation:

$$ {\text{H}}_{2}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{H}}_{2}\text{O}(l)\hspace{2em}\text{Δ}\text{H}=−286\;\text{kJ} $$  {eq:fs-idp13211824}

This equation indicates that when 1 mole of hydrogen gas and $\frac{1}{2}$ mole of oxygen gas at some temperature and pressure change to 1 mole of liquid water at the same temperature and pressure, 286 kJ of heat are released to the surroundings. If the coefficients of the chemical equation are multiplied by some factor, the enthalpy change must be multiplied by that same factor (Δ*H* is an extensive property):

$$ \begin{array}{l}\text{(two-fold increase in amounts)} \\ 2{\text{H}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}\text{H}=2\;\times \;(−286\;\text{kJ})=−572\;\text{kJ} \\ (\text{two-fold decrease in amounts}) \\ \frac{1}{2}{\text{H}}_{2}(g)+\;\frac{1}{4}{\text{O}}_{2}(g)\;\longrightarrow \;\frac{1}{2}{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}\text{H}=\;\frac{1}{2}\;\times \;(−286\;\text{kJ})=−143\;\text{kJ}\end{array} $$  {eq:fs-idm23265328}

- The enthalpy change of a reaction depends on the physical states of the reactants and products, so these must be shown. For example, when 1 mole of hydrogen gas and $\frac{1}{2}$ mole of oxygen gas change to 1 mole of liquid water at the same temperature and pressure, 286 kJ of heat are released. If gaseous water forms, only 242 kJ of heat are released.

$$ {\text{H}}_{2}(g)+\;\frac{1}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g)\hspace{3em}\text{Δ}\text{H}=−242\;\text{kJ} $$  {eq:fs-idp4587936}

:::example {ex:fs-idm9240992} Writing Thermochemical Equations
When 0.0500 mol of HCl(*aq*) reacts with 0.0500 mol of NaOH(*aq*) to form 0.0500 mol of NaCl(*aq*), 2.9 kJ of heat are produced. Write a balanced thermochemical equation for the reaction of one mole of HCl.

$$ \text{HCl}(aq)+\text{NaOH}(aq)\;\longrightarrow \;\text{NaCl}(aq)+{\text{H}}_{2}\text{O}(l) $$  {eq:fs-idp149553440}

**Solution**
For the reaction of 0.0500 mol acid (HCl), *q* = −2.9 kJ. The reactants are provided in stoichiometric amounts (same molar ratio as in the balanced equation), and so the amount of acid may be used to calculate a molar enthalpy change. Since Δ*H* is an extensive property, it is proportional to the amount of acid neutralized:

$$ \text{Δ}\text{H}=1\;\cancel{\text{mol HCl}}\;\times \;\frac{−2.9\;\text{kJ}}{0.0500\;\cancel{\text{mol HCl}}}\;=−58\;\text{kJ} $$  {eq:fs-idp125057232}

The thermochemical equation is then

$$ \text{HCl}(aq)+\text{NaOH}(aq)\;\longrightarrow \;\text{NaCl}(aq)+{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}\text{H}=−58\;\text{kJ} $$  {eq:fs-idm13850464}

**Check Your Learning**
When 1.34 g Zn(*s*) reacts with 60.0 mL of 0.750 M HCl(*aq*), 3.14 kJ of heat are produced. Determine the enthalpy change per mole of zinc reacting for the reaction:

$$ \text{Zn}(s)+2\text{HCl}(aq)\;\longrightarrow \;{\text{ZnCl}}_{2}(aq)+{\text{H}}_{2}(g) $$  {eq:fs-idp6791056}

:::note [answer] Answer:
Δ*H* = −153 kJ
:::
:::
Be sure to take both stoichiometry and limiting reactants into account when determining the Δ*H* for a chemical reaction.

:::example {ex:fs-idp107963312} Writing Thermochemical Equations
A gummy bear contains 2.67 g sucrose, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>. When it reacts with 7.19 g potassium chlorate, KClO<sub>3</sub>, 43.7 kJ of heat are produced. Write a thermochemical equation for the reaction of one mole of sucrose:

$$ {\text{C}}_{12}{\text{H}}_{22}{\text{O}}_{11}(aq)+8{\text{KClO}}_{3}(aq)\;\longrightarrow \;12{\text{CO}}_{2}(g)+11{\text{H}}_{2}\text{O}(l)+8\text{KCl}(aq). $$  {eq:fs-idp12841552}

**Solution**
Unlike the previous example exercise, this one does not involve the reaction of stoichiometric amounts of reactants, and so the *limiting reactant* must be identified (it limits the yield of the reaction and the amount of thermal energy produced or consumed).
The provided amounts of the two reactants are

$$ \begin{array}{l}(2.67\;\text{g})(1\;\text{mol}\text{/}342.3\;\text{g})=0.00780\;\text{mol}\;{\text{C}}_{12}\;{\text{H}}_{22}\;{\text{O}}_{11} \\ (7.19\;\text{g})(1\;\text{mol}\text{/}122.5\;\text{g})=0.0587\;\text{mol}\;\text{KCl}{\text{O}}_{3}\end{array} $$  {eq:fs-idm372152464}

The provided molar ratio of perchlorate-to-sucrose is then

$$ 0.0587\;\text{mol}\;\text{KCl}{\text{O}}_{3}\text{/}0.00780\;\text{mol}\;{\text{C}}_{12}{\text{H}}_{22}{\text{O}}_{11}=7.52 $$  {eq:fs-idm378911456}

The balanced equation indicates 8 mol KClO<sub>3</sub> are required for reaction with 1 mol C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>. Since the provided amount of KClO<sub>3</sub> is less than the stoichiometric amount, it is the limiting reactant and may be used to compute the enthalpy change:

$$ \triangle \text{H}=-43.7\;\text{kJ}\text{/}0.0587\;\text{mol KCl}{\text{O}}_{3}=-744\;\text{kJ}\text{/}\text{mol}\;\text{KCl}{\text{O}}_{3} $$  {eq:fs-idm352441488}

Because the equation, as written, represents the reaction of 8 mol KClO<sub>3</sub>, the enthalpy change is

$$ (-744\;\text{kJ}\text{/}\text{mol}\;\text{KCl}{\text{O}}_{3})(8\;\text{mol}\;\text{KCl}{\text{O}}_{3})=-5960\;\text{kJ} $$  {eq:fs-idm389610336}

The enthalpy change for this reaction is −5960 kJ, and the thermochemical equation is:

$$ {\text{C}}_{12}{\text{H}}_{22}{\text{O}}_{11}+8{\text{KClO}}_{3}\;\longrightarrow \;12{\text{CO}}_{2}+11{\text{H}}_{2}\text{O}+8\text{KCl}\hspace{3em}\text{Δ}\text{H}=−5960\;\text{kJ} $$  {eq:fs-idp90097408}

**Check Your Learning**
When 1.42 g of iron reacts with 1.80 g of chlorine, 3.22 g of FeCl<sub>2</sub>(*s*) and 8.60 kJ of heat is produced. What is the enthalpy change for the reaction when 1 mole of FeCl<sub>2</sub>(*s*) is produced?

:::note [answer] Answer:
Δ*H* = −338 kJ
:::
:::
Enthalpy changes are typically tabulated for reactions in which both the reactants and products are at the same conditions. A {term:standard state} is a commonly accepted set of conditions used as a reference point for the determination of properties under other different conditions. For chemists, the IUPAC standard state refers to materials under a pressure of 1 bar and solutions at 1 M, and does not specify a temperature. Many thermochemical tables list values with a standard state of 1 atm. Because the Δ*H* of a reaction changes very little with such small changes in pressure (1 bar = 0.987 atm), Δ*H* values (except for the most precisely measured values) are essentially the same under both sets of standard conditions. We will include a superscripted “o” in the enthalpy change symbol to designate standard state. Since the usual (but not technically standard) temperature is 298.15 K, this temperature will be assumed unless some other temperature is specified. Thus, the symbol $(\text{Δ}H\text{°})$ is used to indicate an enthalpy change for a process occurring under these conditions. (The symbol Δ*H* is used to indicate an enthalpy change for a reaction occurring under nonstandard conditions.)
The enthalpy changes for many types of chemical and physical processes are available in the reference literature, including those for combustion reactions, phase transitions, and formation reactions. As we discuss these quantities, it is important to pay attention to the *extensive* nature of enthalpy and enthalpy changes. Since the enthalpy change for a given reaction is proportional to the amounts of substances involved, it may be reported on that basis (i.e., as the Δ*H* for specific amounts of reactants). However, we often find it more useful to divide one extensive property (Δ*H*) by another (amount of substance), and report a per-amount *intensive* value of Δ*H*, often “normalized” to a per-mole basis. (Note that this is similar to determining the intensive property specific heat from the extensive property heat capacity, as seen previously.)

## Standard Enthalpy of Combustion
{term:Standard enthalpy of combustion} $(\text{Δ}{H}_{C}^{\text{°}})$ is the enthalpy change when 1 mole of a substance burns (combines vigorously with oxygen) under standard state conditions; it is sometimes called “heat of combustion.” For example, the enthalpy of combustion of ethanol, −1366.8 kJ/mol, is the amount of heat produced when one mole of ethanol undergoes complete combustion at 25 °C and 1 atmosphere pressure, yielding products also at 25 °C and 1 atm.

$$ {\text{C}}_{2}{\text{H}}_{5}\text{OH}(l)+3{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{CO}}_{2}(g+3{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}H\text{°}=\text{−1366.8 kJ} $$  {eq:fs-idm27865968}

Enthalpies of combustion for many substances have been measured; a few of these are listed in [ref:fs-idp98710048]. Many readily available substances with large enthalpies of combustion are used as fuels, including hydrogen, carbon (as coal or charcoal), and {term:hydrocarbons} (compounds containing only hydrogen and carbon), such as methane, propane, and the major components of gasoline.

> TABLE {tab:fs-idp98710048} cols=3 class=top-titled
> title: Standard Molar Enthalpies of Combustion
> summary: A data table is shown that has three columns and eleven rows. The header row reads “Substance,” “Combustion reaction,” and “Enthalpy of Combustion, Δ H subscript C superscript degree symbol (k J/ mol at 25 ° C).” The first column contains entries reading “carbon,” “hydrogen,” “magnesium,” “sulfur,” “carbon monoxide,” “methane,” “acetylene,” “ethanol,” “methanol,” and “isooctane.” The second column contains the equations “C (s) + O (g) right-facing arrow C O subscript 2 (g),” “H subscript 2 (g) + one half O subscript 2 (g) right-facing arrow H subscript 2 O (l),” “M g (s) + one half O subscript 2 (g) right-facing arrow M g O (s),” “S (s) + O subscript 2 (g) right-facing arrow S O subscript 2 (g),” “C O (g) + one half O subscript 2 (g) right-facing arrow C O subscript 2 (g),” “C H subscript 4 (g) + 2 O subscript 2 (g) right-facing arrow C O subscript 2 (g) + 2 H subscript 2 O (g),” “C subscript 2 H subscript 2 (g) + five halves O subscript 2 (g) right-facing arrow 2 C O subscript 2 (g) + H subscript 2 O (l),” “C subscript 2 H subscript 5 O H (l) + 2 O subscript 2 (g) right-facing arrow C O subscript 2 (g) + 3 H subscript 2 O (l),” “C H subscript 3 O H (l) + three halves O subscript 2 (g) right-facing arrow C O subscript 2 (g) + 2 H subscript 2 O (l),” and “C subscript 8 H subscript 18 (l) + twenty five halves O subscript 2 (g) right-facing arrow 8 C O subscript 2 (g) + 9 H subscript 2 O (l).” The final column contains the values “–393.5,” “–285.8,” “–601.6,” “–296.8,” “–283.0,” “–890.8,” “–1301.1,” “–1366.8,” “–726.1,” and “–5460.”

| Substance | Combustion Reaction | Enthalpy of Combustion, $\text{Δ}{H}_{c}^{{}^{\circ}}$ $(\frac{\text{kJ}}{\text{mol}}\;\text{at}\;25\;\text{°C})$ |
| --- | --- | --- |
| carbon | $\text{C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)$ | −393.5 |
| hydrogen | ${\text{H}}_{2}(g)+\;\frac{1}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;{\text{H}}_{2}\text{O}(l)$ | −285.8 |
| magnesium | $\text{Mg}(s)+\;\frac{1}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;\text{MgO}(s)$ | −601.6 |
| sulfur | $\text{S}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{SO}}_{2}(g)$ | −296.8 |
| carbon monoxide | $\text{CO}(g)+\;\frac{1}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)$ | −283.0 |
| methane | ${\text{CH}}_{4}(g)+2{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)+2{\text{H}}_{2}\text{O}(l)$ | −890.8 |
| acetylene | ${\text{C}}_{2}{\text{H}}_{2}(g)+\;\frac{5}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{CO}}_{2}(g)+{\text{H}}_{2}\text{O}(l)$ | −1301.1 |
| ethanol | ${\text{C}}_{2}{\text{H}}_{5}\text{OH}(l)+3{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2CO}}_{2}(g)+3{\text{H}}_{2}\text{O}(l)$ | −1366.8 |
| methanol | ${\text{CH}}_{3}\text{OH}(l)+\;\frac{3}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)+2{\text{H}}_{2}\text{O}(l)$ | −726.1 |
| isooctane | ${\text{C}}_{8}{\text{H}}_{18}(l)+\;\frac{25}{2}\;{\text{O}}_{2}(g)\;\longrightarrow \;8{\text{CO}}_{2}(g)+9{\text{H}}_{2}\text{O}(l)$ | –5465.5 |

:::example {ex:fs-idp90124816} Using Enthalpy of Combustion
As [ref:CNX_Chem_05_03_GasBurning] suggests, the combustion of gasoline is a highly exothermic process. Let us determine the approximate amount of heat produced by burning 1.00 L of gasoline, assuming the enthalpy of combustion of gasoline is the same as that of isooctane, a common component of gasoline. The density of isooctane is 0.692 g/mL.

> FIGURE {fig:CNX_Chem_05_03_GasBurning} src=../../media/CNX_Chem_05_03_GasBurning.jpg class=scaled-down
> alt: A picture shows a large ball of fire burning on a road. A fire truck and fireman are shown in the foreground.
> caption: The combustion of gasoline is very exothermic. (credit: modification of work by “AlexEagle”/Flickr)

**Solution**
Starting with a known amount (1.00 L of isooctane), we can perform conversions between units until we arrive at the desired amount of heat or energy. The enthalpy of combustion of isooctane provides one of the necessary conversions. [ref:fs-idp98710048] gives this value as −5460 kJ per 1 mole of isooctane (C<sub>8</sub>H<sub>18</sub>).
Using these data,

$$ 1.00\;\cancel{\text{L}\;{\text{C}}_{8}{\text{H}}_{18}}\;\times \;\frac{1000\;\cancel{\text{mL}\;{\text{C}}_{8}{\text{H}}_{18}}}{1\;\cancel{\text{L}\;{\text{C}}_{8}{\text{H}}_{18}}}\;\times \;\frac{0.692\;\cancel{\text{g}\;{\text{C}}_{8}{\text{H}}_{18}}}{1\;\cancel{\text{mL}\;{\text{C}}_{8}{\text{H}}_{18}}}\;\times \;\frac{1\;\cancel{\text{mol}\;{\text{C}}_{8}{\text{H}}_{18}}}{114\;\cancel{\text{g}\;{\text{C}}_{8}{\text{H}}_{18}}}\;\times \;\frac{-5460\;\text{kJ}}{1\;\cancel{\text{mol}\;{\text{C}}_{8}{\text{H}}_{18}}}\;=−3.31\;\times \;{10}^{4}\text{kJ} $$  {eq:fs-idp6149744}

The combustion of 1.00 L of isooctane produces 33,100 kJ of heat. (This amount of energy is enough to melt 99.2 kg, or about 218 lbs, of ice.)
Note: If you do this calculation one step at a time, you would find:

$$ \begin{array}{l} \\ 1.00\;\text{L}\;{\text{C}}_{8}{\text{H}}_{18}\;\longrightarrow \;1.00\;\times \;{10}^{3}\;\text{mL}\;{\text{C}}_{8}{\text{H}}_{18} \\ 1.00\;\times \;{10}^{3}\;\text{mL}\;{\text{C}}_{8}{\text{H}}_{18}\;\longrightarrow \;692\;\text{g}\;{\text{C}}_{8}{\text{H}}_{18} \\ 692\;\text{g}\;{\text{C}}_{8}{\text{H}}_{18}\;\longrightarrow \;6.07\;\text{mol}\;{\text{C}}_{8}{\text{H}}_{18} \\ 6.07\;\text{mol}\;{\text{C}}_{8}{\text{H}}_{18}\;\longrightarrow \;−3.31\;\times \;{10}^{4}\text{kJ}\end{array} $$  {eq:fs-idp94999984}

**Check Your Learning**
How much heat is produced by the combustion of 125 g of acetylene?

:::note [answer] Answer:
6.25 $\times$ 10<sup>3</sup> kJ
:::
:::

:::note [chemistry everyday-life] Emerging Algae-Based Energy Technologies (Biofuels)
As reserves of fossil fuels diminish and become more costly to extract, the search is ongoing for replacement fuel sources for the future. Among the most promising biofuels are those derived from algae ([ref:CNX_Chem_05_03_AlgalFuel1]). The species of algae used are nontoxic, biodegradable, and among the world’s fastest growing organisms. About 50% of algal weight is oil, which can be readily converted into fuel such as biodiesel. Algae can yield 26,000 gallons of {index:biofuel} per hectare—much more energy per acre than other crops. Some strains of algae can flourish in brackish water that is not usable for growing other crops. Algae can produce biodiesel, biogasoline, ethanol, butanol, methane, and even jet fuel.

> FIGURE {fig:CNX_Chem_05_03_AlgalFuel1} src=../../media/CNX_Chem_05_03_AlgalFuel1.jpg class=scaled-down
> alt: Three pictures are shown and labeled a, b, and c. Picture a shows a microscopic view of algal organisms. They are brown, multipart strands and net-like structures on a background of light violet. Picture b shows five large tubs full of a brown liquid containing these algal organisms. Picture c depicts a cylinder full of green liquid in the foreground and a poster in the background that has the title “From Field to Fleet.”
> caption: (a) Tiny algal organisms can be (b) grown in large quantities and eventually (c) turned into a useful fuel such as biodiesel. (credit a: modification of work by Micah Sittig; credit b: modification of work by Robert Kerton; credit c: modification of work by John F. Williams)

According to the US Department of Energy, only 39,000 square kilometers (about 0.4% of the land mass of the US or less than $\frac{1}{7}$ of the area used to grow corn) can produce enough algal fuel to replace all the petroleum-based fuel used in the US. The cost of algal fuels is becoming more competitive—for instance, the US Air Force is producing jet fuel from algae at a total cost of under $5 per gallon.^[For more on algal fuel, see http://www.theguardian.com/environment/2010/feb/13/algae-solve-pentagon-fuel-problem.] The process used to produce algal fuel is as follows: grow the algae (which use sunlight as their energy source and CO<sub>2</sub> as a raw material); harvest the algae; extract the fuel compounds (or precursor compounds); process as necessary (e.g., perform a transesterification reaction to make biodiesel); purify; and distribute ([ref:CNX_Chem_05_03_AlgalFuel2]).

> FIGURE {fig:CNX_Chem_05_03_AlgalFuel2} src=../../media/CNX_Chem_05_03_AlgalFuel2.jpg
> alt: A flowchart is shown that contains pictures and words. Reading from left to right, the terms “Grow,” “Harvest,” “Extract,” “Process and purify,” and “Jet fuel gasoline diesel” are shown with right-facing arrows in between each. Above each term, respectively, are diagrams of three containers, three cylinders lying side-by-side, a pyramid-like container with liquid inside, a factory, and a fuel pump. In the space above all of the diagrams and to the left of the images is a diagram of the sun.
> caption: Algae convert sunlight and carbon dioxide into oil that is harvested, extracted, purified, and transformed into a variety of renewable fuels.

:::

:::note [chemistry link-to-learning] 
Click [here](http://openstax.org/l/16biofuel) to learn more about the process of creating algae biofuel.
:::

## Standard Enthalpy of Formation
A {term:standard enthalpy of formation $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$} is an enthalpy change for a reaction in which exactly 1 mole of a pure substance is formed from free elements in their most stable states under standard state conditions. These values are especially useful for computing or predicting enthalpy changes for chemical reactions that are impractical or dangerous to carry out, or for processes for which it is difficult to make measurements. If we have values for the appropriate standard enthalpies of formation, we can determine the enthalpy change for any reaction, which we will practice in the next section on Hess’s law.
The standard enthalpy of formation of CO<sub>2</sub>(*g*) is −393.5 kJ/mol. This is the enthalpy change for the exothermic reaction:

$$ \text{C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)\hspace{3em}\text{Δ}{H}_{\text{f}}^{{}^{\circ}}=\text{Δ}H\text{°}=−393.5\;\text{kJ} $$  {eq:fs-idp185901552}

starting with the reactants at a pressure of 1 atm and 25 °C (with the carbon present as graphite, the most stable form of carbon under these conditions) and ending with one mole of CO<sub>2</sub>, also at 1 atm and 25 °C. For nitrogen dioxide, NO<sub>2</sub>(*g*), $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ is 33.2 kJ/mol. This is the enthalpy change for the reaction:

$$ \frac{1}{2}{\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}{H}_{\text{f}}^{{}^{\circ}}=\text{Δ}H\text{°}=\text{+33.2 kJ} $$  {eq:fs-idp185944512}

A reaction equation with $\frac{1}{2}$ mole of N<sub>2</sub> and 1 mole of O<sub>2</sub> is correct in this case because the standard enthalpy of formation always refers to 1 mole of product, NO<sub>2</sub>(*g*).
You will find a table of standard enthalpies of formation of many common substances in [Appendix G](module:m68865). These values indicate that formation reactions range from highly exothermic (such as −2984 kJ/mol for the formation of P<sub>4</sub>O<sub>10</sub>) to strongly endothermic (such as +226.7 kJ/mol for the formation of acetylene, C<sub>2</sub>H<sub>2</sub>). By definition, the standard enthalpy of formation of an element in its most stable form is equal to zero under standard conditions, which is 1 atm for gases and 1 M for solutions.

:::example {ex:fs-idp167759616} Evaluating an Enthalpy of Formation
Ozone, O<sub>3</sub>(*g*), forms from oxygen, O<sub>2</sub>(*g*), by an endothermic process. Ultraviolet radiation is the source of the energy that drives this reaction in the upper atmosphere. Assuming that both the reactants and products of the reaction are in their standard states, determine the standard enthalpy of formation, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of ozone from the following information:

$$ 3{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{O}}_{3}(g)\hspace{3em}\text{Δ}H\text{°}=\text{+286 kJ} $$  {eq:fs-idp167765152}

**Solution**
$\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ is the enthalpy change for the formation of one mole of a substance in its standard state from the elements in their standard states. Thus, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ for O<sub>3</sub>(*g*) is the enthalpy change for the reaction:

$$ \frac{3}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{O}}_{3}(g) $$  {eq:fs-idp166474448}

For the formation of 2 mol of O<sub>3</sub>(*g*), $\text{Δ}H\text{°}=\text{+286 kJ.}$ This ratio, $(\frac{286\;\text{kJ}}{2\;\text{mol}\;{\text{O}}_{3}}),$ can be used as a conversion factor to find the heat produced when 1 mole of O<sub>3</sub>(*g*) is formed, which is the enthalpy of formation for O<sub>3</sub>(*g*):

$$ \text{Δ}\text{H}\text{° for}\;1\;\text{mole of}\;{\text{O}}_{3}(g)=1\;\cancel{\text{mol}\;{\text{O}}_{3}}\;\times \;\frac{286\;\text{kJ}}{2\;\cancel{\text{mol}\;{\text{O}}_{3}}}\;=143\;\text{kJ} $$  {eq:fs-idp90148272}

Therefore, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}[{\text{O}}_{3}(g)]=\text{+143 kJ/mol}.$
**Check Your Learning**
Hydrogen gas, H<sub>2</sub>, reacts explosively with gaseous chlorine, Cl<sub>2</sub>, to form hydrogen chloride, HCl(*g*). What is the enthalpy change for the reaction of 1 mole of H<sub>2</sub>(*g*) with 1 mole of Cl<sub>2</sub>(*g*) if both the reactants and products are at standard state conditions? The standard enthalpy of formation of HCl(*g*) is −92.3 kJ/mol.

:::note [answer] Answer:
For the reaction ${\text{H}}_{2}(g)+{\text{Cl}}_{2}(g)\;\longrightarrow \;2\text{HCl}(g)\hspace{3em}\text{Δ}H\text{°}=−184.6\;\text{kJ}$
:::
:::

:::example {ex:fs-idp186597312} Writing Reaction Equations for $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$
Write the heat of formation reaction equations for:
(a) C<sub>2</sub>H<sub>5</sub>OH(*l*)
(b) Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>(*s*)
**Solution**
Remembering that $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ reaction equations are for forming 1 mole of the compound from its constituent elements under standard conditions, we have:
(a) $2\text{C}(s,\;\text{graphite})+3{\text{H}}_{2}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{C}}_{2}{\text{H}}_{5}\text{OH}(l)$
(b) $3\text{Ca}(s)+\;\frac{1}{2}{\text{P}}_{4}(s)+4{\text{O}}_{2}(g)\;\longrightarrow \;{\text{Ca}}_{3}({\text{PO}}_{4}{)}_{2}(s)$
Note: The standard state of carbon is graphite, and phosphorus exists as P<sub>4</sub>.
**Check Your Learning**
Write the heat of formation reaction equations for:
(a) C<sub>2</sub>H<sub>5</sub>OC<sub>2</sub>H<sub>5</sub>(*l*)
(b) Na<sub>2</sub>CO<sub>3</sub>(*s*)

:::note [answer] Answer:
(a) $4\text{C}(s,\;\text{graphite})+5{\text{H}}_{2}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{C}}_{2}{\text{H}}_{5}{\text{OC}}_{2}{\text{H}}_{5}(l);$ (b) $2\text{Na}(s)+\text{C}(s,\;\text{graphite})+\;\frac{3}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{Na}}_{2}{\text{CO}}_{3}(s)$
:::
:::

## Hess’s Law
There are two ways to determine the amount of heat involved in a chemical change: measure it experimentally, or calculate it from other experimentally determined enthalpy changes. Some reactions are difficult, if not impossible, to investigate and make accurate measurements for experimentally. And even when a reaction is not hard to perform or measure, it is convenient to be able to determine the heat involved in a reaction without having to perform an experiment.
This type of calculation usually involves the use of {term:Hess’s law}, which states: *If a process can be written as the sum of several stepwise processes, the enthalpy change of the total process equals the sum of the enthalpy changes of the various steps*. Hess’s law is valid because enthalpy is a state function: Enthalpy changes depend only on where a chemical process starts and ends, but not on the path it takes from start to finish. For example, we can think of the reaction of carbon with oxygen to form carbon dioxide as occurring either directly or by a two-step process. The direct process is written:

$$ \text{C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)\hspace{3em}\text{Δ}H\text{°}=−394\;\text{kJ} $$  {eq:fs-idp177510624}

In the two-step process, first carbon monoxide is formed:

$$ \text{C}(s)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{CO}(g)\hspace{3em}\text{Δ}H\text{°}=−111\;\text{kJ} $$  {eq:fs-idp51925136}

Then, carbon monoxide reacts further to form carbon dioxide:

$$ \text{CO}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)\hspace{3em}\text{Δ}H\text{°}=−283\;\text{kJ} $$  {eq:fs-idp161438800}

The equation describing the overall reaction is the sum of these two chemical changes:

$$ \begin{array}{l} \\ \text{Step 1: C}(s)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{CO}(g) \\ \underline{\text{Step 2: CO}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)} \\ \text{Sum: C}(s)+\;\frac{1}{2}{\text{O}}_{2}(g)+\text{CO}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{CO}(g)+{\text{CO}}_{2}(g)\end{array} $$  {eq:fs-idp186572384}

Because the CO produced in Step 1 is consumed in Step 2, the net change is:

$$ \text{C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g) $$  {eq:fs-idp40119312}

According to Hess’s law, the enthalpy change of the reaction will equal the sum of the enthalpy changes of the steps.

$$ \begin{array}{ll}\text{C}(s)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{CO}(g) & \text{Δ}H\text{°}=−111\;\text{kJ} \\ \frac{\text{CO}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)}{\text{C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)\;} & \frac{\text{Δ}H\text{°}=−283\;\text{kJ}}{\text{Δ}H\text{°}=−394\;\text{kJ}}\end{array} $$  {eq:fs-idp128371600}

The result is shown in [ref:CNX_Chem_05_03_HessCO2]. We see that Δ*H* of the overall reaction is the same whether it occurs in one step or two. This finding (overall Δ*H* for the reaction = sum of Δ*H* values for reaction “steps” in the overall reaction) is true in general for chemical and physical processes.

> FIGURE {fig:CNX_Chem_05_03_HessCO2} src=../../media/CNX_Chem_05_03_HessCO2.jpg
> alt: A diagram is shown. A long arrow faces upward on the left with the phrase “H increasing.” A horizontal line at the bottom of the diagram is shown with the formula “C O subscript 2 (g)” below it. A horizontal line at the top of the diagram has the formulas “C (s) + O subscript 2 (g)” above it. The top and bottom lines are connected by a downward facing arrow with the value “Δ H = –394 k J” written beside it. Below and to the right of the top horizontal line is a second horizontal line with the equations “C O (g) + one half O subscript 2 (g)” above it. This line and the bottom line are connected by a downward facing arrow with the value “Δ H = –283 k J” written beside it. The same line and the top line are connected by a downward facing arrow with the value “Δ H = –111 k J” written beside it. There are three brackets to the right of the diagram. The first bracket runs from the top horizontal line to the second horizontal line. It is labeled, “Enthalpy of reactants.” The second bracket runs from the second horizontal line to the bottom horizontal line. It is labeled, “Enthalpy of products.” Both of these brackets are included in the third bracket which runs from the top to the bottom of the diagram. It is labeled, “Enthalpy change of exothermic reaction in 1 or 2 steps.”
> caption: The formation of CO<sub>2</sub>(*g*) from its elements can be thought of as occurring in two steps, which sum to the overall reaction, as described by Hess’s law. The horizontal blue lines represent enthalpies. For an exothermic process, the products are at lower enthalpy than are the reactants.

Before we further practice using Hess’s law, let us recall two important features of Δ*H*.
1. Δ*H* is directly proportional to the quantities of reactants or products. For example, the enthalpy change for the reaction forming 1 mole of NO<sub>2</sub>(*g*) is +33.2 kJ:

$$ \frac{1}{2}{\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}\text{H}=\text{+33.2 kJ} $$  {eq:fs-idp167201504}

When 2 moles of NO<sub>2</sub> (twice as much) are formed, the Δ*H* will be twice as large:

$$ {\text{N}}_{2}(g)+2{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}\text{H}=\text{+66.4 kJ} $$  {eq:fs-idp160717072}

In general, if we multiply or divide an equation by a number, then the enthalpy change should also be multiplied or divided by the same number.
2. Δ*H* for a reaction in one direction is equal in magnitude and opposite in sign to Δ*H* for the reaction in the reverse direction. For example, given that:

$$ {\text{H}}_{2}(g)+{\text{Cl}}_{2}(g)\;\longrightarrow \;2\text{HCl}(g)\hspace{3em}\text{Δ}\text{H}=−184.6\;\text{kJ} $$  {eq:fs-idp146333552}

Then, for the “reverse” reaction, the enthalpy change is also “reversed”:

$$ 2\text{HCl}(g)\;\longrightarrow \;{\text{H}}_{2}(g)+{\text{Cl}}_{2}(g)\hspace{3em}\text{Δ}\text{H}=\text{+184.6 kJ} $$  {eq:fs-idp146345216}

:::example {ex:fs-idp185548816} Stepwise Calculation of $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ Using Hess’s Law
Determine the enthalpy of formation, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}},$ of FeCl<sub>3</sub>(*s*) from the enthalpy changes of the following two-step process that occurs under standard state conditions:

$$ \text{Fe}(s)+{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{2}(s)\hspace{3em}\text{Δ}\text{H}\text{°}=−341.8\;\text{kJ} $$  {eq:fs-idp103964560}

$$ {\text{FeCl}}_{2}(s)+\;\frac{1}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{3}(s)\hspace{3em}\text{Δ}\text{H}\text{°}=−57.7\;\text{kJ} $$  {eq:fs-idp103976192}

**Solution**
We are trying to find the standard enthalpy of formation of FeCl<sub>3</sub>(*s*), which is equal to Δ*H*° for the reaction:

$$ \text{Fe}(s)+\;\frac{3}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{3}(s)\hspace{3em}\text{Δ}{H}_{\text{f}}^{{}^{\circ}}=? $$  {eq:fs-idp190751040}

Looking at the reactions, we see that the reaction for which we want to find Δ*H*° is the sum of the two reactions with known Δ*H* values, so we must sum their Δ*H*s:

$$ \begin{array}{lll}\text{Fe}(s)+{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{2}(s) & & \text{Δ}H\text{°}=−341.8\;\text{kJ} \\ \frac{{\text{FeCl}}_{2}(s)+\;\frac{1}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{3}(s)}{\text{Fe}(s)+\;\frac{3}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{FeCl}}_{3}(s)\;} & & \frac{\text{Δ}H\text{°}=−57.7\;\text{kJ}}{\text{Δ}H\text{°}=−399.5\;\text{kJ}}\end{array} $$  {eq:fs-idp133790064}

The enthalpy of formation, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}},$ of FeCl<sub>3</sub>(*s*) is −399.5 kJ/mol.
**Check Your Learning**
Calculate Δ*H* for the process:

$$ {\text{N}}_{2}(g)+2{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{NO}}_{2}(g) $$  {eq:fs-idp149512304}

from the following information:

$$ {\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2\text{NO}(g)\hspace{3em}\text{Δ}\text{H}=180.5\;\text{kJ} $$  {eq:fs-idp164463232}

$$ \text{NO}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}\text{H}=−57.06\;\text{kJ} $$  {eq:fs-idp164473712}

:::note [answer] Answer:
66.4 kJ
:::
:::
Here is a less straightforward example that illustrates the thought process involved in solving many Hess’s law problems. It shows how we can find many standard enthalpies of formation (and other values of Δ*H*) if they are difficult to determine experimentally.

:::example {ex:fs-idp146901200} A More Challenging Problem Using Hess’s Law
Chlorine monofluoride can react with fluorine to form chlorine trifluoride:
*(i)* $\text{ClF}(g)+{\text{F}}_{2}(g)\;\longrightarrow \;{\text{ClF}}_{3}(g)\hspace{3em}\text{Δ}\text{H}\text{°}=?$
Use the reactions here to determine the Δ*H*° for reaction *(i)*:
*(ii)* $2{\text{OF}}_{2}(g)\;\longrightarrow \;{\text{O}}_{2}(g)+2{\text{F}}_{2}(g)\hspace{3em}\text{Δ}{H}_{(ii)}^{{}^{\circ}}=−49.4\;\text{kJ}$
*(iii)* $2\text{ClF}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{Cl}}_{2}\text{O}(g)+{\text{OF}}_{2}(g)\hspace{3em}\text{Δ}{H}_{(iii)}^{{}^{\circ}}=\text{+214.0 kJ}$
*(iv)* ${\text{ClF}}_{3}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;\frac{1}{2}{\text{Cl}}_{2}\text{O}(g)+\;\frac{3}{2}{\text{OF}}_{2}(g)\hspace{3em}\text{Δ}{H}_{(iv)}^{{}^{\circ}}=\text{+236.2 kJ}$
**Solution**
Our goal is to manipulate and combine reactions *(ii)*, *(iii)*, and *(iv)* such that they add up to reaction *(i)*. Going from left to right in *(i)*, we first see that ClF(*g*) is needed as a reactant. This can be obtained by multiplying reaction *(iii)* by $\frac{1}{2},$ which means that the Δ*H*° change is also multiplied by $\frac{1}{2}\text{:}$

$$ \text{ClF}(g)+\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\frac{1}{2}{\text{Cl}}_{2}\text{O}(g)+\;\frac{1}{2}{\text{OF}}_{2}(g)\hspace{3em}\text{Δ}\text{H}\text{°}=\;\frac{1}{2}(214.0)=\text{+107.0 kJ} $$  {eq:fs-idp167256800}

Next, we see that F<sub>2</sub> is also needed as a reactant. To get this, reverse and halve reaction *(ii)*, which means that the Δ*H*° changes sign and is halved:

$$ \frac{1}{2}{\text{O}}_{2}(g)+{\text{F}}_{2}(g)\;\longrightarrow \;{\text{OF}}_{2}(g)\hspace{3em}\text{Δ}\text{H}\text{°}=\text{+24.7 kJ} $$  {eq:fs-idp160400816}

To get ClF<sub>3</sub> as a product, reverse *(iv)*, changing the sign of Δ*H*°:

$$ \frac{1}{2}{\text{Cl}}_{2}\text{O}(g)+\;\frac{3}{2}{\text{OF}}_{2}(g)\;\longrightarrow \;{\text{ClF}}_{3}(g)+{\text{O}}_{2}(g)\hspace{3em}\text{Δ}\text{H}\text{°}=\text{−236.2 kJ} $$  {eq:fs-idp134608368}

Now check to make sure that these reactions add up to the reaction we want:

$$ \begin{array}{lll}\text{ClF}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\frac{1}{2}{\text{Cl}}_{2}\text{O}(g)+\;\frac{1}{2}{\text{OF}}_{2}(g) & & \text{Δ}H\text{°}=\text{+107.0 kJ} \\ \frac{1}{2}{\text{O}}_{2}(g)+{\text{F}}_{2}(g)\;\longrightarrow \;{\text{OF}}_{2}(g) & & \text{Δ}H\text{°}=\text{+24.7 kJ} \\ \frac{\frac{1}{2}{\text{Cl}}_{2}\text{O}(g)+\;\frac{3}{2}{\text{OF}}_{2}(g)\;\longrightarrow \;{\text{ClF}}_{3}(g)+{\text{O}}_{2}(g)}{\text{ClF}(g)+{\text{F}}_{2}\;\longrightarrow \;{\text{ClF}}_{3}(g)\hspace{8em}} & & \frac{\text{Δ}H\text{°}=−236.2\;\text{kJ}}{\text{Δ}H\text{°}=−104.5\;\text{kJ}}\end{array} $$  {eq:fs-idp134626752}

Reactants $\frac{1}{2}{\text{O}}_{2}$ and $\frac{1}{2}{\text{O}}_{2}$ cancel out product O<sub>2</sub>; product $\frac{1}{2}{\text{Cl}}_{2}\text{O}$ cancels reactant $\frac{1}{2}{\text{Cl}}_{2}\text{O;}$ and reactant $\frac{3}{2}{\text{OF}}_{2}$ is cancelled by products $\frac{1}{2}{\text{OF}}_{2}$ and OF<sub>2</sub>. This leaves only reactants ClF(*g*) and F<sub>2</sub>(*g*) and product ClF<sub>3</sub>(*g*), which are what we want. Since summing these three modified reactions yields the reaction of interest, summing the three modified Δ*H*° values will give the desired Δ*H*°:

$$ \text{Δ}H\text{°}=(+107.0\;\text{kJ})+(24.7\;\text{kJ})+(−236.2\;\text{kJ})=−104.5\;\text{kJ} $$  {eq:fs-idm259960768}

**Check Your Learning**
Aluminum chloride can be formed from its elements:
*(i)* $2\text{Al}(s)+3{\text{Cl}}_{2}(g)\;\longrightarrow \;2{\text{AlCl}}_{3}(s)\hspace{3em}\text{Δ}H\text{°}=?$
Use the reactions here to determine the Δ*H*° for reaction *(i)*:
*(ii)* $\text{HCl}(g)\;\longrightarrow \;\text{HCl}(aq)\hspace{3em}\text{Δ}{H}_{(ii)}^{{}^{\circ}}=−74.8\;\text{kJ}$
*(iii)* ${\text{H}}_{2}(g)+{\text{Cl}}_{2}(g)\;\longrightarrow \;2\text{HCl}(g)\hspace{3em}\text{Δ}{H}_{(iii)}^{{}^{\circ}}=−185\;\text{kJ}$
*(iv)* ${\text{AlCl}}_{3}(aq)\;\longrightarrow \;{\text{AlCl}}_{3}(s)\hspace{3em}\text{Δ}{H}_{(iv)}^{{}^{\circ}}=+323\;\text{kJ/mol}$
*(v)* $\text{2Al}(s)+6\text{HCl}(aq)\;\longrightarrow \;2{\text{AlCl}}_{3}(aq)+3{\text{H}}_{2}(g)\hspace{3em}\text{Δ}{H}_{(v)}^{{}^{\circ}}=−1049\;\text{kJ}$

:::note [answer] Answer:
−1407 kJ
:::
:::
We also can use {index:Hess’s law} to determine the enthalpy change of any reaction if the corresponding enthalpies of formation of the reactants and products are available. The stepwise reactions we consider are: (i) decompositions of the reactants into their component elements (for which the enthalpy changes are proportional to the negative of the enthalpies of formation of the reactants), followed by (ii) re-combinations of the elements to give the products (with the enthalpy changes proportional to the enthalpies of formation of the products). The standard enthalpy change of the overall reaction is therefore equal to: (ii) the sum of the standard enthalpies of formation of all the products plus (i) the sum of the negatives of the standard enthalpies of formation of the reactants. This is usually rearranged slightly to be written as follows, with ∑ representing “the sum of” and *n* standing for the stoichiometric coefficients:

$$ \text{Δ}{H}_{\text{reaction}}^{{}^{\circ}}=\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}(\text{products})-\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}(\text{reactants}) $$  {eq:fs-idp120716832}

The following example shows in detail why this equation is valid, and how to use it to calculate the enthalpy change for a reaction of interest.

:::example {ex:fs-idp120730208} Using Hess’s Law
What is the standard enthalpy change for the reaction:

$$ 3{\text{NO}}_{2}(g)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;2{\text{HNO}}_{3}(aq)+\text{NO}(g)\hspace{3em}\text{Δ}\text{H}\text{°}=? $$  {eq:fs-idp134549904}

**Solution: Using the Equation**
Use the special form of Hess’s law given previously, and values from [Appendix G](module:m68865):

$$ \text{Δ}{H}_{\text{reaction}}^{{}^{\circ}}=\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{(products)}-\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}(\text{reactants}) $$  {eq:fs-idp146127936}

$$ \begin{array}{l} \\ \\ \\ =[2\;\cancel{\text{mol}\;{\text{HNO}}_{3}(aq)}\;\times \;\frac{−207.4\;\text{kJ}}{\cancel{\text{mol}\;{\text{HNO}}_{3}(aq)}}\;+1\;\cancel{\text{mol NO}(g)}\;\times \;\frac{\text{+90.25 kJ}}{\cancel{\text{mol NO}(g)}}] \\ -[3\;\cancel{\text{mol}\;{\text{NO}}_{2}(g)}\;\times \;\frac{\text{+33.2 kJ}}{\cancel{\text{mol}\;{\text{NO}}_{2}(g)}}\;+1\;\cancel{\text{mol}\;{\text{H}}_{2}\text{O}(l)}\;\times \;\frac{−285.83\;\text{kJ}}{\cancel{\text{mol}\;{\text{H}}_{2}\text{O}(l)}}] \\ =[2\times (−206.64)+90.25]-[3\times 33.2+(−285.83)] \\ =–323.03+186.23 \\ =−136.80\;\text{kJ}\end{array} $$  {eq:fs-idp146140160}

**Solution: Supporting Why the General Equation Is Valid**
Alternatively, we can write this reaction as the sum of the decompositions of 3NO<sub>2</sub>(*g*) and 1H<sub>2</sub>O(*l*) into their constituent elements, and the formation of 2HNO<sub>3</sub>(*aq*) and 1NO(*g*) from their constituent elements. Writing out these reactions, and noting their relationships to the $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ values for these compounds (from [Appendix G](module:m68865) ), we have:

$$ 3{\text{NO}}_{2}(g)\;\longrightarrow \;{\text{3/2N}}_{2}(g)+{\text{3O}}_{2}(g)\hspace{3em}\text{Δ}{H}_{1}^{{}^{\circ}}=−99.6\;\text{kJ} $$  {eq:fs-idp134571776}

$$ {\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{2}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\hspace{3em}\text{Δ}{H}_{2}^{{}^{\circ}}=\text{+285.8 kJ}\;[−1\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{H}}_{2}\text{O})] $$  {eq:fs-idp168099120}

$$ {\text{H}}_{2}(g)+{\text{N}}_{2}(g)+3{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{HNO}}_{3}(aq)\hspace{3em}\text{Δ}{H}_{3}^{{}^{\circ}}=−414.8\;\text{kJ}\;[2\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{HNO}}_{3})] $$  {eq:fs-idp168119776}

$$ \frac{1}{2}{\text{N}}_{2}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{NO}(g)\hspace{3em}\text{Δ}{H}_{4}^{{}^{\circ}}=\text{+90.2 kJ}\;[1\;\times \;(\text{NO})] $$  {eq:fs-idp194526576}

Summing these reaction equations gives the reaction we are interested in:

$$ {\text{3NO}}_{2}(g)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;2{\text{HNO}}_{3}(aq)+\text{NO}(g) $$  {eq:fs-idp155650448}

Summing their enthalpy changes gives the value we want to determine:

$$ \begin{array}{rl}\text{Δ}{H}_{\text{rxn}}^{{}^{\circ}} & =\text{Δ}{H}_{1}^{{}^{\circ}}+\text{Δ}{H}_{2}^{{}^{\circ}}+\text{Δ}{H}_{3}^{{}^{\circ}}+\text{Δ}{H}_{4}^{{}^{\circ}}=(−99.6\;\text{kJ})+(\text{+285.8 kJ})+(−414.8\;\text{kJ})+(\text{+90.2 kJ}) \\ & =−138.4\;\text{kJ}\end{array} $$  {eq:fs-idp155662864}

So the standard enthalpy change for this reaction is Δ*H*° = −138.4 kJ.
Note that this result was obtained by (1) multiplying the $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of each product by its stoichiometric coefficient and summing those values, (2) multiplying the $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of each reactant by its stoichiometric coefficient and summing those values, and then (3) subtracting the result found in (2) from the result found in (1). This is also the procedure in using the general equation, as shown.
**Check Your Learning**
Calculate the heat of combustion of 1 mole of ethanol, C<sub>2</sub>H<sub>5</sub>OH(*l*), when H<sub>2</sub>O(*l*) and CO<sub>2</sub>(*g*) are formed. Use the following enthalpies of formation: C<sub>2</sub>H<sub>5</sub>OH(*l*), −278 kJ/mol; H<sub>2</sub>O(*l*), −286 kJ/mol; and CO<sub>2</sub>(*g*), −394 kJ/mol.

:::note [answer] Answer:
−1368 kJ/mol
:::
:::

## Key Concepts and Summary {section:summary}
If a chemical change is carried out at constant pressure and the only work done is caused by expansion or contraction, *q* for the change is called the enthalpy change with the symbol Δ*H*, or $\text{Δ}H\text{°}$ for reactions occurring under standard state conditions at 298 K. The value of Δ*H* for a reaction in one direction is equal in magnitude, but opposite in sign, to Δ*H* for the reaction in the opposite direction, and Δ*H* is directly proportional to the quantity of reactants and products. The standard enthalpy of formation, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}},$ is the enthalpy change accompanying the formation of 1 mole of a substance from the elements in their most stable states at 1 bar and 298.15 K. If the enthalpies of formation are available for the reactants and products of a reaction, the enthalpy change can be calculated using Hess’s law: If a process can be written as the sum of several stepwise processes, the enthalpy change of the total process equals the sum of the enthalpy changes of the various steps.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| $\text{Δ}U=q+w$ |
| $\text{Δ}{H}_{\text{reaction}}^{{}^{\circ}}=\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{(products)}-\sum n\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}(\text{reactants})$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp167492016} type= 
PROBLEM:
Explain how the heat measured in [ref:fs-idm19242032](module:m68726) differs from the enthalpy change for the exothermic reaction described by the following equation:
$\text{HCl}(aq)+\text{NaOH}(aq)\;\longrightarrow \;\text{NaCl}(aq)+{\text{H}}_{2}\text{O}(l)$
SOLUTION:
The enthalpy change of the indicated reaction is for exactly 1 mol HCL and 1 mol NaOH; the heat in the example is produced by 0.0500 mol HCl and 0.0500 mol NaOH.
:::

:::exercise {fs-idp167504688} type= 
PROBLEM:
Using the data in the check your learning section of [ref:fs-idm19242032](module:m68726), calculate Δ*H* in kJ/mol of AgNO<sub>3</sub>(*aq*) for the reaction: $\text{NaCl}(aq)+{\text{AgNO}}_{3}(aq)\;\longrightarrow \;\text{AgCl}(s)+{\text{NaNO}}_{3}(aq)$
:::

:::exercise {fs-idp146867872} type= 
PROBLEM:
Calculate the enthalpy of solution (Δ*H* for the dissolution) per mole of NH<sub>4</sub>NO<sub>3</sub> under the conditions described in [ref:fs-idp325184](module:m68726).
SOLUTION:
25 kJ mol<sup>−1</sup>
:::

:::exercise {fs-idp140736768} type= 
PROBLEM:
Calculate Δ*H* for the reaction described by the equation. (*Hint*: Use the value for the approximate amount of heat absorbed by the reaction that you calculated in a previous exercise.)
$\text{Ba}{(\text{OH})}_{2}\text{·}8{\text{H}}_{2}\text{O}(s)+2{\text{NH}}_{4}\text{SCN}(aq)\;\longrightarrow \;\text{Ba}{(\text{SCN})}_{2}(aq)+2{\text{NH}}_{3}(aq)+10{\text{H}}_{2}\text{O}(l)$
:::

:::exercise {fs-idp107667280} type= 
PROBLEM:
Calculate the enthalpy of solution (Δ*H* for the dissolution) per mole of CaCl<sub>2</sub> (refer to [ref:fs-idm68277040](module:m68726)).
SOLUTION:
81 kJ mol<sup>−1</sup>
:::

:::exercise {fs-idp103276080} type= 
PROBLEM:
Although the gas used in an oxyacetylene torch ([ref:CNX_Chem_05_01_OxyacTorch](module:m68724)) is essentially pure acetylene, the heat produced by combustion of one mole of acetylene in such a torch is likely not equal to the enthalpy of combustion of acetylene listed in [ref:fs-idp98710048]. Considering the conditions for which the tabulated data are reported, suggest an explanation.
:::

:::exercise {fs-idp103280960} type= 
PROBLEM:
How much heat is produced by burning 4.00 moles of acetylene under standard state conditions?
SOLUTION:
5204.4 kJ
:::

:::exercise {fs-idp103290416} type= 
PROBLEM:
How much heat is produced by combustion of 125 g of methanol under standard state conditions?
:::

:::exercise {fs-idp169453984} type= 
PROBLEM:
How many moles of isooctane must be burned to produce 100 kJ of heat under standard state conditions?
SOLUTION:
1.83 $\times$ 10<sup>−2</sup> mol
:::

:::exercise {fs-idp169467440} type= 
PROBLEM:
What mass of carbon monoxide must be burned to produce 175 kJ of heat under standard state conditions?
:::

:::exercise {fs-idp155902352} type= 
PROBLEM:
When 2.50 g of methane burns in oxygen, 125 kJ of heat is produced. What is the enthalpy of combustion per mole of methane under these conditions?
SOLUTION:
–802 kJ mol<sup>−1</sup>
:::

:::exercise {fs-idp155924624} type= 
PROBLEM:
How much heat is produced when 100 mL of 0.250 M HCl (density, 1.00 g/mL) and 200 mL of 0.150 M NaOH (density, 1.00 g/mL) are mixed?
$\text{HCl}(aq)+\text{NaOH}(aq)\;\longrightarrow \;\text{NaCl}(aq)+{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}H\text{°}=−58\;\text{kJ}$
If both solutions are at the same temperature and the specific heat of the products is 4.19 J/g °C, how much will the temperature increase? What assumption did you make in your calculation?
:::

:::exercise {fs-idp166201552} type= 
PROBLEM:
A sample of 0.562 g of carbon is burned in oxygen in a bomb calorimeter, producing carbon dioxide. Assume both the reactants and products are under standard state conditions, and that the heat released is directly proportional to the enthalpy of combustion of graphite. The temperature of the calorimeter increases from 26.74 °C to 27.93 °C. What is the heat capacity of the calorimeter and its contents?
SOLUTION:
15.5 kJ/ºC
:::

:::exercise {fs-idp25402064} type= 
PROBLEM:
Before the introduction of chlorofluorocarbons, sulfur dioxide (enthalpy of vaporization, 6.00 kcal/mol) was used in household refrigerators. What mass of SO<sub>2</sub> must be evaporated to remove as much heat as evaporation of 1.00 kg of CCl<sub>2</sub>F<sub>2</sub> (enthalpy of vaporization is 17.4 kJ/mol)?
The vaporization reactions for SO<sub>2</sub> and CCl<sub>2</sub>F<sub>2</sub> are ${\text{SO}}_{2}(l)\;\longrightarrow \;{\text{SO}}_{2}(g)$ and ${\text{CCl}}_{2}{\text{F}}_{2}(l)\;\longrightarrow \;{\text{CCl}}_{2}{\text{F}}_{2}(g),$ respectively.
:::

:::exercise {fs-idp140766896} type= 
PROBLEM:
Homes may be heated by pumping hot water through radiators. What mass of water will provide the same amount of heat when cooled from 95.0 to 35.0 °C, as the heat provided when 100 g of steam is cooled from 110 °C to 100 °C?
SOLUTION:
7.43 g
:::

:::exercise {fs-idp104124592} type= 
PROBLEM:
Which of the enthalpies of combustion in [ref:fs-idp98710048] the table are also standard enthalpies of formation?
:::

:::exercise {fs-idp165421856} type= 
PROBLEM:
Does the standard enthalpy of formation of H<sub>2</sub>O(*g*) differ from Δ*H*° for the reaction ${\text{2H}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{H}}_{2}\text{O}(g)?$
SOLUTION:
Yes.
:::

:::exercise {fs-idp165437584} type= 
PROBLEM:
Joseph Priestly prepared oxygen in 1774 by heating red mercury(II) oxide with sunlight focused through a lens. How much heat is required to decompose exactly 1 mole of red HgO(*s*) to Hg(*l*) and O<sub>2</sub>(*g*) under standard conditions?
:::

:::exercise {fs-idp161282368} type= 
PROBLEM:
How many kilojoules of heat will be released when exactly 1 mole of manganese, Mn, is burned to form Mn<sub>3</sub>O<sub>4</sub>(*s*) at standard state conditions?
SOLUTION:
459.6 kJ
:::

:::exercise {fs-idp161291648} type= 
PROBLEM:
How many kilojoules of heat will be released when exactly 1 mole of iron, Fe, is burned to form Fe<sub>2</sub>O<sub>3</sub>(*s*) at standard state conditions?
:::

:::exercise {fs-idp184316112} type= 
PROBLEM:
The following sequence of reactions occurs in the commercial production of aqueous nitric acid:
$4{\text{NH}}_{3}(g)+5{\text{O}}_{2}(g)\;\longrightarrow \;4\text{NO}(g)+6{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}\text{H}=−907\;\text{kJ}$
$2\text{NO}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}\text{H}=−113\;\text{kJ}$
$3{\text{NO}}_{2}+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;2{\text{HNO}}_{3}(aq)+\text{NO}(g)\hspace{3em}\text{Δ}\text{H}=−139\;\text{kJ}$
Determine the total enthalpy change for the production of one mole of aqueous nitric acid by this process. Coproducts of the net reaction include water and nitrogen monoxide.
SOLUTION:
−494 kJ/mol
:::

:::exercise {fs-idp154782528} type= 
PROBLEM:
Both graphite and diamond burn.
$\text{C}(s,\;\text{diamond})+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)$
For the conversion of graphite to diamond:
$\text{C}(s,\;\text{graphite})\;\longrightarrow \;\text{C}(s,\;\text{diamond})\hspace{3em}\text{Δ}H\text{°}=1.90\;\text{kJ}$
Which produces more heat, the combustion of graphite or the combustion of diamond?
:::

:::exercise {fs-idp161090368} type= 
PROBLEM:
From the molar heats of formation in [Appendix G](module:m68865), determine how much heat is required to evaporate one mole of water: ${\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g)$
SOLUTION:
44.01 kJ/mol
:::

:::exercise {fs-idp157714624} type= 
PROBLEM:
Which produces more heat?
$\text{Os}(s)\;+\;2{\text{O}}_{2}(g)\;\longrightarrow \;{\text{OsO}}_{4}(s)$
or
$\text{Os}(s)\;+\;2{\text{O}}_{2}(g)\;\longrightarrow \;{\text{OsO}}_{4}(g)$
for the phase change ${\text{OsO}}_{4}(s)\;\longrightarrow \;{\text{OsO}}_{4}(g)\hspace{3em}\text{Δ}\text{H}=56.4\;\text{kJ}$
:::

:::exercise {fs-idp155265632} type= 
PROBLEM:
Calculate $\text{Δ}H\text{°}$ for the process
$\text{Sb}(s)+\;\frac{5}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{SbCl}}_{5}(s)$
from the following information:
$\begin{array}{l} \\ \text{Sb}(s)+\;\frac{3}{2}{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{SbCl}}_{3}(s)\hspace{3em}\text{Δ}H\text{°}=−314\;\text{kJ} \\ {\text{SbCl}}_{3}(s)+{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{SbCl}}_{5}(s)\hspace{3em}\text{Δ}H\text{°}=−80\;\text{kJ}\end{array}$
SOLUTION:
−394 kJ
:::

:::exercise {fs-idp173454656} type= 
PROBLEM:
Calculate $\text{Δ}H\text{°}$ for the process $\text{Zn}(s)+\text{S}(s)+2{\text{O}}_{2}(g)\;\longrightarrow \;{\text{ZnSO}}_{4}(s)$
from the following information:
$\begin{array}{l}\text{Zn}(s)+\text{S}(s)\;\longrightarrow \;\text{ZnS}(s)\hspace{3em}\text{Δ}H\text{°}=−206.0\;\text{kJ} \\ \text{ZnS}(s)+{\text{2O}}_{2}(g)\;\longrightarrow \;{\text{ZnSO}}_{4}(s)\hspace{3em}\text{Δ}H\text{°}=−776.8\;\text{kJ}\end{array}$
:::

:::exercise {fs-idp128497376} type= 
PROBLEM:
Calculate Δ*H* for the process ${\text{Hg}}_{2}{\text{Cl}}_{2}(s)\;\longrightarrow \;2\text{Hg}(l)+{\text{Cl}}_{2}(g)$
from the following information:
$\begin{array}{l}\text{Hg}(l)+{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{HgCl}}_{2}(s)\hspace{3em}\text{Δ}H=−224\;\text{kJ} \\ \text{Hg}(l)+{\text{HgCl}}_{2}(s)\;\longrightarrow \;{\text{Hg}}_{2}{\text{Cl}}_{2}(s)\hspace{3em}\text{Δ}H=−41.2\;\text{kJ}\end{array}$
SOLUTION:
265 kJ
:::

:::exercise {fs-idp204534224} type= 
PROBLEM:
Calculate $\text{Δ}H\text{°}$ for the process ${\text{Co}}_{3}{\text{O}}_{4}(s)\;\longrightarrow \;3\text{Co}(s)+2{\text{O}}_{2}(g)$
from the following information:
$\begin{array}{l} \\ \text{Co}(s)+\;\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;\text{CoO}(s)\hspace{3em}\text{Δ}H\text{°}=−237.9\text{kJ} \\ \text{3CoO}(s)+\frac{1}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{Co}}_{3}{\text{O}}_{4}(s)\hspace{3em}\text{Δ}H\text{°}=−177.5\text{kJ}\end{array}$
:::

:::exercise {fs-idp28899760} type= 
PROBLEM:
Calculate the standard molar enthalpy of formation of NO(*g*) from the following data:
$\begin{array}{l}{\text{N}}_{2}(g)+2{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}H\text{°}=66.4\;\text{kJ} \\ \text{2NO}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{NO}}_{2}(g)\hspace{3em}\text{Δ}H\text{°}=−114.1\;\text{kJ}\end{array}$
SOLUTION:
90.3 kJ/mol
:::

:::exercise {fs-idp149472576} type= 
PROBLEM:
Using the data in [Appendix G](module:m68865), calculate the standard enthalpy change for each of the following reactions:
(a) ${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2\text{NO}(g)$
(b) $\text{Si}(s)+2{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{SiCl}}_{4}(g)$
(c) ${\text{Fe}}_{2}{\text{O}}_{3}(s)+3{\text{H}}_{2}(g)\;\longrightarrow \;2\text{Fe}(s)+3{\text{H}}_{2}\text{O}(l)$
(d) $2\text{LiOH}(s)+{\text{CO}}_{2}(g)\;\longrightarrow \;{\text{Li}}_{2}{\text{CO}}_{3}(s)+{\text{H}}_{2}\text{O}(g)$
:::

:::exercise {fs-idp126940864} type= 
PROBLEM:
Using the data in [Appendix G](module:m68865), calculate the standard enthalpy change for each of the following reactions:
(a) $\text{Si}(s)+2{\text{F}}_{2}(g)\;\longrightarrow \;{\text{SiF}}_{4}(g)$
(b) $2\text{C}(s)+2{\text{H}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CH}}_{3}{\text{CO}}_{2}\text{H}(l)$
(c) ${\text{CH}}_{4}(g)+{\text{N}}_{2}(g)\;\longrightarrow \;\text{HCN}(g)+{\text{NH}}_{3}(g)\text{;}$
(d) ${\text{CS}}_{2}(g)+3{\text{Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+{\text{S}}_{2}{\text{Cl}}_{2}(g)$
SOLUTION:
(a) −1615.0 kJ mol<sup>−1</sup>; (b) −484.3 kJ mol<sup>−1</sup>; (c) 164.2 kJ; (d) −232.1 kJ
:::

:::exercise {fs-idp161656784} type= 
PROBLEM:
The following reactions can be used to prepare samples of metals. Determine the enthalpy change under standard state conditions for each.
(a) $2{\text{Ag}}_{2}\text{O}(s)\;\longrightarrow \;4\text{Ag}(s)+{\text{O}}_{2}(g)$
(b) $\text{SnO}(s)+\text{CO}(g)\;\longrightarrow \;\text{Sn}(s)+{\text{CO}}_{2}(g)$
(c) ${\text{Cr}}_{2}{\text{O}}_{3}(s)+3{\text{H}}_{2}(g)\;\longrightarrow \;2\text{Cr}(s)+3{\text{H}}_{2}\text{O}(l)$
(d) $2\text{Al}(s)+{\text{Fe}}_{2}{\text{O}}_{3}(s)\;\longrightarrow \;{\text{Al}}_{2}{\text{O}}_{3}(s)+2\text{Fe}(s)$
:::

:::exercise {fs-idp184430560} type= 
PROBLEM:
The decomposition of hydrogen peroxide, H<sub>2</sub>O<sub>2</sub>, has been used to provide thrust in the control jets of various space vehicles. Using the data in [Appendix G](module:m68865), determine how much heat is produced by the decomposition of exactly 1 mole of H<sub>2</sub>O<sub>2</sub> under standard conditions.
$2{\text{H}}_{2}{\text{O}}_{2}(l)\;\longrightarrow \;2{\text{H}}_{2}\text{O}(g)+{\text{O}}_{2}(g)$
SOLUTION:
−54.04 kJ mol<sup>−1</sup>
:::

:::exercise {fs-idp173500624} type= 
PROBLEM:
Calculate the enthalpy of combustion of propane, C<sub>3</sub>H<sub>8</sub>(*g*), for the formation of H<sub>2</sub>O(*g*) and CO<sub>2</sub>(*g*). The enthalpy of formation of propane is −104 kJ/mol.
:::

:::exercise {fs-idp86137744} type= 
PROBLEM:
Calculate the enthalpy of combustion of butane, C<sub>4</sub>H<sub>10</sub>(*g*) for the formation of H<sub>2</sub>O(*g*) and CO<sub>2</sub>(*g*). The enthalpy of formation of butane is −126 kJ/mol.
SOLUTION:
−2660 kJ mol<sup>−1</sup>
:::

:::exercise {fs-idp214812192} type= 
PROBLEM:
Both propane and butane are used as gaseous fuels. Which compound produces more heat per gram when burned?
:::

:::exercise {fs-idp214849200} type= 
PROBLEM:
The white pigment TiO<sub>2</sub> is prepared by the reaction of titanium tetrachloride, TiCl<sub>4</sub>, with water vapor in the gas phase: ${\text{TiCl}}_{4}(g)+2{\text{H}}_{2}\text{O}(g)\;\longrightarrow \;{\text{TiO}}_{2}(s)+4\text{HCl}(g).$
How much heat is evolved in the production of exactly 1 mole of TiO<sub>2</sub>(*s*) under standard state conditions?
SOLUTION:
–66.4 kJ
:::

:::exercise {fs-idp195101120} type= 
PROBLEM:
Water gas, a mixture of H<sub>2</sub> and CO, is an important industrial fuel produced by the reaction of steam with red hot coke, essentially pure carbon: $\text{C}(s)+{\text{H}}_{2}\text{O}(g)\;\longrightarrow \;\text{CO}(g)+{\text{H}}_{2}(g).$
(a) Assuming that coke has the same enthalpy of formation as graphite, calculate $\text{Δ}H\text{°}$ for this reaction.
(b) Methanol, a liquid fuel that could possibly replace gasoline, can be prepared from water gas and additional hydrogen at high temperature and pressure in the presence of a suitable catalyst: $2{\text{H}}_{2}(g)+\text{CO}(g)\;\longrightarrow \;{\text{CH}}_{3}\text{OH}(g).$
Under the conditions of the reaction, methanol forms as a gas. Calculate $\text{Δ}H\text{°}$ for this reaction and for the condensation of gaseous methanol to liquid methanol.
(c) Calculate the heat of combustion of 1 mole of liquid methanol to H<sub>2</sub>O(*g*) and CO<sub>2</sub>(*g*).
:::

:::exercise {fs-idp160735680} type= 
PROBLEM:
In the early days of automobiles, illumination at night was provided by burning acetylene, C<sub>2</sub>H<sub>2</sub>. Though no longer used as auto headlamps, acetylene is still used as a source of light by some cave explorers. The acetylene is (was) prepared in the lamp by the reaction of water with calcium carbide, CaC<sub>2</sub>:
${\text{CaC}}_{2}(s)+2{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;\text{Ca}{(\text{OH})}_{2}(s)+{\text{C}}_{2}{\text{H}}_{2}(g).$
Calculate the standard enthalpy of the reaction. The $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of CaC<sub>2</sub> is −15.14 kcal/mol.
SOLUTION:
−122.8 kJ
:::

:::exercise {fs-idp43583200} type= 
PROBLEM:
From the data in [ref:fs-idp98710048], determine which of the following fuels produces the greatest amount of heat per gram when burned under standard conditions: CO(*g*), CH<sub>4</sub>(*g*), or C<sub>2</sub>H<sub>2</sub>(*g*).
:::

:::exercise {fs-idp208963152} type= 
PROBLEM:
The enthalpy of combustion of hard coal averages −35 kJ/g, that of gasoline, 1.28 $\times$ 10<sup>5</sup> kJ/gal. How many kilograms of hard coal provide the same amount of heat as is available from 1.0 gallon of gasoline? Assume that the density of gasoline is 0.692 g/mL (the same as the density of isooctane).
SOLUTION:
3.7 kg
:::

:::exercise {fs-idp208987456} type= 
PROBLEM:
Ethanol, C<sub>2</sub>H<sub>5</sub>OH, is used as a fuel for motor vehicles, particularly in Brazil.
(a) Write the balanced equation for the combustion of ethanol to CO<sub>2</sub>(*g*) and H<sub>2</sub>O(*g*), and, using the data in [Appendix G](module:m68865), calculate the enthalpy of combustion of 1 mole of ethanol.
(b) The density of ethanol is 0.7893 g/mL. Calculate the enthalpy of combustion of exactly 1 L of ethanol.
(c) Assuming that an automobile’s mileage is directly proportional to the heat of combustion of the fuel, calculate how much farther an automobile could be expected to travel on 1 L of gasoline than on 1 L of ethanol. Assume that gasoline has the heat of combustion and the density of n–octane, C<sub>8</sub>H<sub>18</sub> $(\text{Δ}{H}_{\text{f}}^{{}^{\circ}}=−208.4\;\text{kJ/mol;}$ density = 0.7025 g/mL).
:::

:::exercise {fs-idp181957264} type= 
PROBLEM:
Among the substances that react with oxygen and that have been considered as potential rocket fuels are diborane [B<sub>2</sub>H<sub>6</sub>, produces B<sub>2</sub>O<sub>3</sub>(*s*) and H<sub>2</sub>O(*g*)], methane [CH<sub>4</sub>, produces CO<sub>2</sub>(*g*) and H<sub>2</sub>O(*g*)], and hydrazine [N<sub>2</sub>H<sub>4</sub>, produces N<sub>2</sub>(*g*) and H<sub>2</sub>O(*g*)]. On the basis of the heat released by 1.00 g of each substance in its reaction with oxygen, which of these compounds offers the best possibility as a rocket fuel? The $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of B<sub>2</sub>H<sub>6</sub>(*g*), CH<sub>4</sub>(*g*), and N<sub>2</sub>H<sub>4</sub>(*l*) may be found in [Appendix G](module:m68865).
SOLUTION:
On the assumption that the best rocket fuel is the one that gives off the most heat, B<sub>2</sub>H<sub>6</sub> is the prime candidate.
:::

:::exercise {fs-idp124891680} type= 
PROBLEM:
How much heat is produced when 1.25 g of chromium metal reacts with oxygen gas under standard conditions?
:::

:::exercise {fs-idp124901952} type= 
PROBLEM:
Ethylene, C<sub>2</sub>H<sub>4</sub>, a byproduct from the fractional distillation of petroleum, is fourth among the 50 chemical compounds produced commercially in the largest quantities. About 80% of synthetic ethanol is manufactured from ethylene by its reaction with water in the presence of a suitable catalyst. ${\text{C}}_{2}{\text{H}}_{4}(g)+{\text{H}}_{2}\text{O}(g)\;\longrightarrow \;{\text{C}}_{2}{\text{H}}_{5}\text{OH}(l)$
Using the data in the table in [Appendix G](module:m68865), calculate Δ*H*° for the reaction.
SOLUTION:
−88.2 kJ
:::

:::exercise {fs-idp149397888} type= 
PROBLEM:
The oxidation of the sugar glucose, C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>, is described by the following equation:
${\text{C}}_{6}{\text{H}}_{12}{\text{O}}_{6}(s)+6{\text{O}}_{2}(g)\;\longrightarrow \;6{\text{CO}}_{2}(g)+6{\text{H}}_{2}\text{O}(l)\hspace{3em}\text{Δ}\text{H}=−2816\;\text{kJ}$
The metabolism of glucose gives the same products, although the glucose reacts with oxygen in a series of steps in the body.
(a) How much heat in kilojoules can be produced by the metabolism of 1.0 g of glucose?
(b) How many Calories can be produced by the metabolism of 1.0 g of glucose?
:::

:::exercise {fs-idp211817568} type= 
PROBLEM:
Propane, C<sub>3</sub>H<sub>8</sub>, is a hydrocarbon that is commonly used as a fuel.
(a) Write a balanced equation for the complete combustion of propane gas.
(b) Calculate the volume of air at 25 °C and 1.00 atmosphere that is needed to completely combust 25.0 grams of propane. Assume that air is 21.0 percent O<sub>2</sub> by volume. (Hint: We will see how to do this calculation in a later chapter on gases—for now use the information that 1.00 L of air at 25 °C and 1.00 atm contains 0.275 g of O<sub>2</sub>.)
(c) The heat of combustion of propane is −2,219.2 kJ/mol. Calculate the heat of formation, $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of propane given that $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of H<sub>2</sub>O(*l*) = −285.8 kJ/mol and $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}$ of CO<sub>2</sub>(*g*) = −393.5 kJ/mol.
(d) Assuming that all of the heat released in burning 25.0 grams of propane is transferred to 4.00 kilograms of water, calculate the increase in temperature of the water.
SOLUTION:
(a) ${\text{C}}_{3}{\text{H}}_{8}(g)+5{\text{O}}_{2}(g)\;\longrightarrow \;3{\text{CO}}_{2}(g)+4{\text{H}}_{2}\text{O}(l);$ (b) 330 L air; (c) −104.5 kJ mol<sup>−1</sup>; (d) 75.4 °C
:::

:::exercise {fs-idp165246448} type= 
PROBLEM:
During a recent winter month in Sheboygan, Wisconsin, it was necessary to obtain 3500 kWh of heat provided by a natural gas furnace with 89% efficiency to keep a small house warm (the efficiency of a gas furnace is the percent of the heat produced by combustion that is transferred into the house).
(a) Assume that natural gas is pure methane and determine the volume of natural gas in cubic feet that was required to heat the house. The average temperature of the natural gas was 56 °F; at this temperature and a pressure of 1 atm, natural gas has a density of 0.681 g/L.
(b) How many gallons of LPG (liquefied petroleum gas) would be required to replace the natural gas used? Assume the LPG is liquid propane [C<sub>3</sub>H<sub>8</sub>: density, 0.5318 g/mL; enthalpy of combustion, 2219 kJ/mol for the formation of CO<sub>2</sub>(*g*) and H<sub>2</sub>O(*l*)] and the furnace used to burn the LPG has the same efficiency as the gas furnace.
(c) What mass of carbon dioxide is produced by combustion of the methane used to heat the house?
(d) What mass of water is produced by combustion of the methane used to heat the house?
(e) What volume of air is required to provide the oxygen for the combustion of the methane used to heat the house? Air contains 23% oxygen by mass. The average density of air during the month was 1.22 g/L.
(f) How many kilowatt–hours (1 kWh = 3.6 $\times$ 10<sup>6</sup> J) of electricity would be required to provide the heat necessary to heat the house? Note electricity is 100% efficient in producing heat inside a house.
(g) Although electricity is 100% efficient in producing heat inside a house, production and distribution of electricity is not 100% efficient. The efficiency of production and distribution of electricity produced in a coal-fired power plant is about 40%. A certain type of coal provides 2.26 kWh per pound upon combustion. What mass of this coal in kilograms will be required to produce the electrical energy necessary to heat the house if the efficiency of generation and distribution is 40%?
:::

## Glossary
- {def} **chemical thermodynamics**: area of science that deals with the relationships between heat, work, and all forms of energy associated with chemical and physical processes
- {def} **enthalpy (*H*)**: sum of a system’s internal energy and the mathematical product of its pressure and volume
- {def} **enthalpy change (Δ*H*)**: heat released or absorbed by a system under constant pressure during a chemical or physical process
- {def} **expansion work (pressure-volume work)**: work done as a system expands or contracts against external pressure
- {def} **first law of thermodynamics**: internal energy of a system changes due to heat flow in or out of the system or work done on or by the system
- {def} **Hess’s law**: if a process can be represented as the sum of several steps, the enthalpy change of the process equals the sum of the enthalpy changes of the steps
- {def} **hydrocarbon**: compound composed only of hydrogen and carbon; the major component of fossil fuels
- {def} **internal energy (*U*)**: total of all possible kinds of energy present in a substance or substances
- {def} **standard enthalpy of combustion $\text{(}\text{Δ}{H}_{\text{c}}^{{}^{\circ}}\text{)}$**: heat released when one mole of a compound undergoes complete combustion under standard conditions
- {def} **standard enthalpy of formation $\text{(}\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{)}$**: enthalpy change of a chemical reaction in which 1 mole of a pure substance is formed from its elements in their most stable states under standard state conditions
- {def} **standard state**: set of physical conditions as accepted as common reference conditions for reporting thermodynamic properties; 1 bar of pressure, and solutions at 1 molar concentrations, usually at a temperature of 298.15 K
- {def} **state function**: property depending only on the state of a system, and not the path taken to reach that state
