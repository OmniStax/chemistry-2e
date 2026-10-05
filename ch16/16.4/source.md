# Free Energy

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Define Gibbs free energy, and describe its relation to spontaneity
- Calculate free energy change for a process using free energies of formation for its reactants and products
- Calculate free energy change for a process using enthalpies of formation and the entropies for its reactants and products
- Explain how temperature affects the spontaneity of some processes
- Relate standard free energy changes to equilibrium constants

One of the challenges of using the second law of thermodynamics to determine if a process is spontaneous is that it requires measurements of the entropy change for the system *and* the entropy change for the surroundings. An alternative approach involving a new thermodynamic property defined in terms of system properties only was introduced in the late nineteenth century by American mathematician Josiah Willard {index:Gibbs}. This new property is called the {term:Gibbs free energy (*G*)} (or simply the *free energy*), and it is defined in terms of a system’s enthalpy and entropy as the following:

$$ G=H-TS $$  {eq:fs-idm129849344}

Free energy is a state function, and at constant temperature and pressure, the {term:free energy change (Δ*G*)} may be expressed as the following:

$$ \text{Δ}G=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm279983248}

(For simplicity’s sake, the subscript “sys” will be omitted henceforth.)
The relationship between this system property and the spontaneity of a process may be understood by recalling the previously derived second law expression:

$$ \text{Δ}{S}_{\text{univ}}=\text{Δ}S+\;\frac{{q}_{\text{surr}}}{T} $$  {eq:fs-idm33912192}

The first law requires that *q*<sub>surr</sub> = −*q*<sub>sys</sub>, and at constant pressure *q*<sub>sys</sub> = Δ*H*, so this expression may be rewritten as:

$$ \text{Δ}{S}_{\text{univ}}=\text{Δ}S-\;\frac{\text{Δ}H}{T} $$  {eq:fs-idm195954976}

Multiplying both sides of this equation by −*T*, and rearranging yields the following:

$$ \text{−}T\text{Δ}{S}_{\text{univ}}=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm248567088}

Comparing this equation to the previous one for free energy change shows the following relation:

$$ \text{Δ}G=\text{−}T\text{Δ}{S}_{\text{univ}} $$  {eq:fs-idm117423648}

The free energy change is therefore a reliable indicator of the spontaneity of a process, being directly related to the previously identified spontaneity indicator, Δ*S*<sub>univ</sub>. [ref:fs-idm211518768] summarizes the relation between the spontaneity of a process and the arithmetic signs of these indicators.

> TABLE {tab:fs-idm211518768} cols=3 class=top-titled
> title: Relation between Process Spontaneity and Signs of Thermodynamic Properties
> summary: This table has three columns and three rows. The first column has the following: “capital delta S subscript univ is greater than 0,” “capital delta S subscript univ is less than 0,” and, “capital delta S subscript univ equals 0.” The second column contains the following: “capital delta G is less than 0,” “capital delta G is greater than 0,” and, “capital delta G equals 0.” The third column contains the following: “Spontaneous,” “nonspontaneous ( spontaneous in opposite direction ),” and, “reversible ( system is at equilibrium ).”

|  |  |  |
| --- | --- | --- |
| Δ*S*<sub>univ</sub> > 0 | Δ*G* < 0 | spontaneous |
| Δ*S*<sub>univ</sub> < 0 | Δ*G* > 0 | nonspontaneous |
| Δ*S*<sub>univ</sub> = 0 | Δ*G* = 0 | at equilibrium |

## What’s “Free” about Δ*G*?
In addition to indicating spontaneity, the free energy change also provides information regarding the amount of useful work (*w*) that may be accomplished by a spontaneous process. Although a rigorous treatment of this subject is beyond the scope of an introductory chemistry text, a brief discussion is helpful for gaining a better perspective on this important thermodynamic property.
For this purpose, consider a spontaneous, exothermic process that involves a decrease in entropy. The free energy change, as defined by

$$ \text{Δ}G=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm343621088}

may be interpreted as representing the difference between the enthalpy change of the process, Δ*H*, and the energy lost to the surroundings, *T*Δ*S*. The difference between the energy produced and the energy lost is the energy available (or “free”) to do useful work by the process, Δ*G*. If the process somehow could be made to take place under conditions of thermodynamic reversibility, the amount of work that could be done would be maximal:

$$ \text{Δ}G={w}_{max} $$  {eq:fs-idm353619776}

where ${w}_{max}$ refers to all types of work except expansion (pressure-volume) work.
However, as noted previously in this chapter, such conditions are not realistic. In addition, the technologies used to extract work from a spontaneous process (e.g., batteries) are never 100% efficient, and so the work done by these processes is always less than the theoretical maximum. Similar reasoning may be applied to a nonspontaneous process, for which the free energy change represents the *minimum* amount of work that must be done *on* the system to carry out the process.

## Calculating Free Energy Change
Free energy is a state function, so its value depends only on the conditions of the initial and final states of the system. A convenient and common approach to the calculation of free energy changes for physical and chemical reactions is by use of widely available compilations of standard state thermodynamic data. One method involves the use of standard enthalpies and entropies to compute {term:standard free energy changes, Δ*G*°}, according to the following relation.

$$ \text{Δ}G\text{°}=\text{Δ}H\text{°}-T\text{Δ}S\text{°} $$  {eq:fs-idm182227520}

:::example {ex:fs-idm117444432} Using Standard Enthalpy and Entropy Changes to Calculate Δ*G*°
Use standard enthalpy and entropy data from [Appendix G](module:m68865) to calculate the standard free energy change for the vaporization of water at room temperature (298 K). What does the computed value for Δ*G*° say about the spontaneity of this process?
**Solution**
The process of interest is the following:

$$ {\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g) $$  {eq:fs-idm59589120}

The standard change in free energy may be calculated using the following equation:

$$ \text{Δ}G\text{°}=\text{Δ}H\text{°}-T\text{Δ}S\text{°} $$  {eq:fs-idm165858560}

From [Appendix G](module:m68865):

> TABLE {tab:fs-idm230329280} cols=3 class=unnumbered
> summary: This table has three columns and three rows. The first row is a header row and it labels each column: “Substance,” “capital delta H subscript f superscript degree symbol ( k J / mol),” and “S subscript 298 superscript degree symbol ( J / K dot mol ).” Under the “Substance” column are H subscript 2 O ( l ) and H subscript 2 O ( g ). Under the “capital delta H subscript f superscript degree symbol ( k J / mol)” column are the values negative 286.83 and negative 241.82. Under the “S subscript 298 superscript degree symbol ( J / K dot mol )” column are the values 70.0 and 188.8.

| Substance | $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{(kJ/mol)}$ | $S\text{°}\text{(J/K·mol)}$ |
| --- | --- | --- |
| H<sub>2</sub>O(*l*) | −285.83 | 70.0 |
| H<sub>2</sub>O(*g*) | −241.82 | 188.8 |

Using the appendix data to calculate the standard enthalpy and entropy changes yields:

$$ \begin{array}{l}\text{Δ}H\text{°}=\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{H}}_{2}\text{O}(g))\;-\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{H}}_{2}\text{O}(l)) \\ =[\text{−241.82 kJ/mol}-(\text{−285.83})]\;\text{kJ/mol}=\text{44.01 kJ}\end{array} $$  {eq:fs-idm164142400}

$$ \begin{array}{l}\text{Δ}S\text{°}=1\;\text{mol}\;\times \;S\text{°}({\text{H}}_{2}\text{O}(g))\;-1\;\text{mol}\;\times \;S\text{°}({\text{H}}_{2}\text{O}(l)) \\ =\text{(1 mol)}188.8\;\text{J/mol·K}-\text{(1 mol)}70.0\;\text{J/mol K}=118.8\;\text{J/K}\end{array} $$  {eq:fs-idm171591584}

$$ \text{Δ}G\text{°}=\text{Δ}H\text{°}-T\text{Δ}S\text{°} $$  {eq:fs-idm129668064}

Substitution into the standard free energy equation yields:

$$ \begin{array}{l}\text{Δ}G\text{°}=\text{Δ}H\text{°}-T\text{Δ}S\text{°} \\ \\ =\text{44.01 kJ}-(\text{298 K}\;\times \;118.8\;\text{J/K})\;\times \;\frac{\text{1 kJ}}{\text{1000 J}}\end{array} $$  {eq:fs-idm246654432}

$$ \text{44.01 kJ}-\text{35.4 kJ}=\text{8.6 kJ} $$  {eq:fs-idm135070448}

At 298 K (25 °C) $\text{Δ}G\text{°}>0,$ so boiling is nonspontaneous (*not* spontaneous).
**Check Your Learning**
Use standard enthalpy and entropy data from [Appendix G](module:m68865) to calculate the standard free energy change for the reaction shown here (298 K). What does the computed value for Δ*G*° say about the spontaneity of this process?

$$ {\text{C}}_{2}{\text{H}}_{6}(g)\;\longrightarrow \;{\text{H}}_{2}(g)+{\text{C}}_{2}{\text{H}}_{4}(g) $$  {eq:fs-idm276750416}

:::note [answer] Answer:
$\text{Δ}G\text{°}=\text{102.0 kJ/mol};$ the reaction is nonspontaneous (*not* spontaneous) at 25 °C.
:::
:::
The standard free energy change for a reaction may also be calculated from {term:standard free energy of formation Δ*G*<sub>f</sub>°} values of the reactants and products involved in the reaction. The standard free energy of formation is the free energy change that accompanies the formation of one mole of a substance from its elements in their standard states. Similar to the standard enthalpy of formation, $\text{Δ}{G}_{\text{f}}^{{}^{\circ}}$ is by definition zero for elemental substances in their standard states. The approach used to calculate $\text{Δ}{G}^{\text{°}}$ for a reaction from $\text{Δ}{G}_{\text{f}}^{{}^{\circ}}$ values is the same as that demonstrated previously for enthalpy and entropy changes. For the reaction

$$ m\text{A}+n\text{B}\;\longrightarrow \;x\text{C}+y\text{D}, $$  {eq:fs-idm250621408}

the standard free energy change at room temperature may be calculated as

$$ \begin{array}{l} \\ \\ \text{Δ}G\text{°}=\sum \nu \text{Δ}G\text{°}(\text{products})\;-\sum \nu \text{Δ}G\text{°}(\text{reactants}) \\ \\ =[x\text{Δ}{G}_{\text{f}}^{{}^{\circ}}(\text{C})+y\text{Δ}{G}_{\text{f}}^{{}^{\circ}}(\text{D})]\;-\;[m\text{Δ}{G}_{\text{f}}^{{}^{\circ}}(\text{A})+n\text{Δ}{G}_{\text{f}}^{{}^{\circ}}(\text{B})].\end{array} $$  {eq:fs-idm193663184}

:::example {ex:fs-idm202485584} Using Standard Free Energies of Formation to Calculate Δ*G*°
Consider the decomposition of yellow mercury(II) oxide.

$$ \text{HgO}(s,\;\text{yellow})\;\longrightarrow \;\text{Hg}(l)\;+\;\frac{1}{2}{\text{O}}_{2}(g) $$  {eq:fs-idm217690608}

Calculate the standard free energy change at room temperature, $\text{Δ}G\text{°},$ using (a) standard free energies of formation and (b) standard enthalpies of formation and standard entropies. Do the results indicate the reaction to be spontaneous or nonspontaneous under standard conditions?
**Solution**
The required data are available in [Appendix G](module:m68865) and are shown here.

> TABLE {tab:fs-idm232730384} cols=4 class=unnumbered
> summary: This table has four columns and four rows. The first row is a header row, and it labels each column: “Compound,” “capital delta G subscript f superscript degree symbol ( k J / mol ),” “capital delta H subscript f superscript degree symbol ( k J / mol ),” and “S subscript 298 superscript degree symbol ( J / K dot mol ).” Under the “Compound” column are the following: “H g O ( s, yellow ),” “H g ( l ),” and “O subscript 2 ( g ).” Under the “capital delta G subscript f superscript degree symbol ( k J / mol )” column are the following values: negative 58.43, 0, and 0. Under the “capital delta H subscript f superscript degree symbol ( k J / mol )” column are the values: negative 90.46, 0, and 0. Under the “S subscript 298 superscript degree symbol ( J / K dot mol )” column are the values: 71.13, 75.9, and 205.2.

| Compound | $\text{Δ}{G}_{\text{f}}^{{}^{\circ}}\;\text{(kJ/mol)}$ | $\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\;\text{(kJ/mol)}$ | $S\text{°}\;\text{(J/K·mol)}$ |
| --- | --- | --- | --- |
| HgO (*s*, yellow) | −58.43 | −90.46 | 71.13 |
| Hg(*l*) | 0 | 0 | 75.9 |
| O<sub>2</sub>(*g*) | 0 | 0 | 205.2 |

(a) Using free energies of formation:

$$ \text{Δ}G\text{°}=\sum ν{G}_{f}^{{}^{\circ}}\text{(products)}\;-\sum ν\text{Δ}{G}_{f}^{{}^{\circ}}\text{(reactants)} $$  {eq:fs-idm211589632}

$$ =[1\text{Δ}{G}_{f}^{{}^{\circ}}\text{Hg}(l)+\;\frac{1}{2}\text{Δ}{G}_{f}^{{}^{\circ}}{\text{O}}_{\text{2}}(g)]\;-\;1\text{Δ}{G}_{f}^{{}^{\circ}}\text{HgO}(s,\;\text{yellow}) $$  {eq:fs-idm178475312}

$$ =[1\;\text{mol}\text{(0 kJ/mol)}+\;\frac{1}{2}\;\text{mol(0 kJ/mol)}]\;-\text{1 mol(−58.43 kJ/mol)}=\text{58.43 kJ/mol} $$  {eq:fs-idm164697728}

(b) Using enthalpies and entropies of formation:

$$ \text{Δ}H\text{°}=\sum ν\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{(products)}\;-\sum ν\text{Δ}{H}_{\text{f}}^{{}^{\circ}}\text{(reactants)} $$  {eq:fs-idm147522592}

$$ =[1\text{Δ}{H}_{f}^{{}^{\circ}}\text{Hg}(l)+\frac{1}{2}\text{Δ}{H}_{f}^{{}^{\circ}}{\text{O}}_{2}(g)]\;-1\text{Δ}{H}_{f}^{{}^{\circ}}\text{HgO}(s,\;\text{yellow}) $$  {eq:fs-idm39030688}

$$ =[\text{1 mol}(\text{0 kJ/mol})\;+\;\frac{1}{2}\;\text{mol}(\text{0 kJ/mol})]\;-\text{1 mol}(\text{−90.46 kJ/mol})=\text{90.46 kJ/mol} $$  {eq:fs-idm261408512}

$$ \Delta S\text{°}=\sum \nu \text{Δ}S\text{°}\text{(products)}-\sum \nu \text{Δ}S\text{°}\text{(reactants)} $$  {eq:fs-idp6944752}

$$ =[1\text{Δ}S\text{°}\text{Hg}(l)\;+\;\frac{1}{2}\text{Δ}S\text{°}{\text{O}}_{2}(g)]\;-1\text{Δ}S\text{°}\text{HgO}(s,\;\text{yellow}) $$  {eq:fs-idm61090368}

$$ =[\text{1 mol}\;(\text{75.9 J/mol K})\;+\;\frac{1}{2}\;\text{mol}(\text{205.2 J/mol K})]\;-\text{1 mol}(\text{71.13 J/mol K})=\text{107.4 J/mol K} $$  {eq:fs-idm131288608}

$$ \text{Δ}G\text{°}=\text{Δ}H\text{°}-T\text{Δ}S\text{°}=\text{90.46 kJ}-\text{298.15 K}\;\times \;\text{107.4 J/K·mol}\;\times \;\frac{\text{1 kJ}}{\text{1000 J}} $$  {eq:fs-idm153411216}

$$ \text{Δ}G\text{°}=(90.46-32.01)\;\text{kJ/mol}=\text{58.45 kJ/mol} $$  {eq:fs-idm190648624}

Both ways to calculate the standard free energy change at 25 °C give the same numerical value (to three significant figures), and both predict that the process is nonspontaneous (*not* spontaneous) at room temperature.
**Check Your Learning**
Calculate Δ*G*° using (a) free energies of formation and (b) enthalpies of formation and entropies ([Appendix G](module:m68865)). Do the results indicate the reaction to be spontaneous or nonspontaneous at 25 °C?

$$ {\text{C}}_{2}{\text{H}}_{4}(g)\;\longrightarrow \;{\text{H}}_{2}(g)+{\text{C}}_{2}{\text{H}}_{2}(g) $$  {eq:fs-idm213619408}

:::note [answer] Answer:
(a)  140.8 kJ/mol, nonspontaneous
(b)  141.5 kJ/mol, nonspontaneous
:::
:::

## Free Energy Changes for Coupled Reactions
The use of free energies of formation to compute free energy changes for reactions as described above is possible because *G* is a state function, and the approach is analogous to the use of Hess’ Law in computing enthalpy changes (see the chapter on thermochemistry). Consider the vaporization of water as an example:

$$ {\text{H}}_{2}\text{O}(l)\to {\text{H}}_{2}\text{O}(g) $$  {eq:fs-idm359616576}

An equation representing this process may be derived by adding the formation reactions for the two phases of water (necessarily reversing the reaction for the liquid phase). The free energy change for the sum reaction is the sum of free energy changes for the two added reactions:

$$ \begin{array}{l}\underline{\begin{array}{ll}{\text{H}}_{2}(g)+\frac{1}{2}{\text{O}}_{2}(g)\to {\text{H}}_{2}\text{O}(g)\hspace{6.6em}\text{Δ}{G}_{\text{f}}^{{}^{\circ}}\text{gas} & \\ {\text{H}}_{2}\text{O}(l)\to {\text{H}}_{2}(g)+\frac{1}{2}{\text{O}}_{2}(g)\hspace{5.6em}-\text{Δ}{G}_{\text{f}}^{{}^{\circ}}\text{liquid}\end{array}} \\ \begin{array}{ll} \\ {\text{H}}_{2}\text{O}(l)\to {\text{H}}_{2}\text{O}(g)\hspace{10em}\text{Δ}G{}^{\circ}=\text{Δ}{G}_{\text{f}}^{{}^{\circ}}\text{gas}-\text{Δ}{G}_{\text{f}}^{{}^{\circ}}\text{liquid} & \end{array}\end{array} $$  {eq:fs-idm360093056}

This approach may also be used in cases where a nonspontaneous reaction is enabled by coupling it to a spontaneous reaction. For example, the production of elemental zinc from zinc sulfide is thermodynamically unfavorable, as indicated by a positive value for Δ*G*°:

$$ \text{ZnS}(s)\to \text{Zn}(s)+\text{S}(s)\hspace{5em}\text{Δ}{G}_{1}^{{}^{\circ}}=201.3\;\text{kJ} $$  {eq:fs-idm347055872}

The industrial process for production of zinc from sulfidic ores involves coupling this decomposition reaction to the thermodynamically favorable oxidation of sulfur:

$$ \text{S}(s)+{\text{O}}_{\text{2}}(g)\to {\text{SO}}_{\text{2}}(g)\hspace{5em}\text{Δ}{G}_{2}^{{}^{\circ}}=\text{−}300.1\;\text{kJ} $$  {eq:fs-idm356637216}

The coupled reaction exhibits a negative free energy change and is spontaneous:

$$ \text{ZnS}(s)+{\text{O}}_{2}(g)\to \text{Zn}(s)+\text{S}{\text{O}}_{2}(g)\hspace{5em}\text{Δ}G{}^{\circ}=201.3\;\text{kJ}+-300.1\;\text{kJ}=–98.8\;\text{kJ} $$  {eq:fs-idm343614160}

This process is typically carried out at elevated temperatures, so this result obtained using standard free energy values is just an estimate. The gist of the calculation, however, holds true.

:::example {ex:fs-idm348331936} Calculating Free Energy Change for a Coupled Reaction
Is a reaction coupling the decomposition of ZnS to the formation of H2S expected to be spontaneous under standard conditions?
**Solution**
Following the approach outlined above and using free energy values from [Appendix G](module:m68865):

$$ \begin{array}{l}\text{Decomposition of zinc sulfide:}\hspace{5em}\text{ZnS}(s)\to \text{Zn}(s)+\text{S}(s)\hspace{5em}\text{Δ}{G}_{1}^{{}^{\circ}}=201.3\;\text{kJ} \\ \text{Formation of hydrogen sulfide:}\hspace{5em}\text{S}(s)+{\text{H}}_{2}(g)\to {\text{H}}_{\text{2}}\text{S}(g)\hspace{5em}\text{Δ}{G}_{2}^{{}^{\circ}}=-33.4\;\text{kJ} \\ \text{Coupled reaction:}\hspace{2em}\text{ZnS}(s)+{\text{H}}_{2}(g)\to \text{Zn}(s)+{\text{H}}_{\text{2}}\text{S}(g)\hspace{4em}\text{Δ}G\text{°}=201.3\;\text{kJ}+-33.4\;\text{kJ}=167.9\;\text{kJ}\end{array} $$  {eq:fs-idm343484288}

The coupled reaction exhibits a positive free energy change and is thus nonspontaneous.
**Check Your Learning**
What is the standard free energy change for the reaction below? Is the reaction expected to be spontaneous under standard conditions?

$$ \text{FeS}(s)+{\text{O}}_{2}(g)\to \text{Fe}(s)+{\text{SO}}_{\text{2}}(g) $$  {eq:fs-idm360883312}

:::note [answer] Answer:
−199.7 kJ; spontaneous
:::
:::

## Temperature Dependence of Spontaneity
As was previously demonstrated in this chapter’s section on entropy, the spontaneity of a process may depend upon the temperature of the system. Phase transitions, for example, will proceed spontaneously in one direction or the other depending upon the temperature of the substance in question. Likewise, some chemical reactions can also exhibit temperature dependent spontaneities. To illustrate this concept, the equation relating free energy change to the enthalpy and entropy changes for the process is considered:

$$ \text{Δ}G=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm182396560}

The spontaneity of a process, as reflected in the arithmetic sign of its free energy change, is then determined by the signs of the enthalpy and entropy changes and, in some cases, the absolute temperature. Since *T* is the absolute (kelvin) temperature, it can only have positive values. Four possibilities therefore exist with regard to the signs of the enthalpy and entropy changes:
1. **Both Δ*H* and Δ*S* are positive.** This condition describes an endothermic process that involves an increase in system entropy. In this case, Δ*G* will be negative if the magnitude of the *T*Δ*S* term is greater than Δ*H*. If the *T*Δ*S* term is less than Δ*H*, the free energy change will be positive. Such a process is *spontaneous at high temperatures and nonspontaneous at low temperatures.*
2. **Both Δ*H* and Δ*S* are negative.** This condition describes an exothermic process that involves a decrease in system entropy. In this case, Δ*G* will be negative if the magnitude of the *T*Δ*S* term is less than Δ*H*. If the *T*Δ*S* term’s magnitude is greater than Δ*H*, the free energy change will be positive. Such a process is *spontaneous at low temperatures and nonspontaneous at high temperatures.*
3. **Δ*H* is positive and Δ*S* is negative.** This condition describes an endothermic process that involves a decrease in system entropy. In this case, Δ*G* will be positive regardless of the temperature. Such a process is *nonspontaneous at all temperatures.*
4. **Δ*H* is negative and Δ*S* is positive.** This condition describes an exothermic process that involves an increase in system entropy. In this case, Δ*G* will be negative regardless of the temperature. Such a process is *spontaneous at all temperatures.*
These four scenarios are summarized in [ref:CNX_Chem_16_04_Scenarios].

> FIGURE {fig:CNX_Chem_16_04_Scenarios} src=../../media/CNX_Chem_16_04_Scenarios.jpg
> alt: A table with three columns and four rows is shown. The first column has the phrase, “Delta S greater than zero ( increase in entropy ),” in the third row and the phrase, “Delta S less than zero ( decrease in entropy),” in the fourth row. The second and third columns have the phrase, “Summary of the Four Scenarios for Enthalpy and Entropy Changes,” written above them. The second column has, “delta H greater than zero ( endothermic ),” in the second row, “delta G less than zero at high temperature, delta G greater than zero at low temperature, Process is spontaneous at high temperature,” in the third row, and “delta G greater than zero at any temperature, Process is nonspontaneous at any temperature,” in the fourth row. The third column has, “delta H less than zero ( exothermic ),” in the second row, “delta G less than zero at any temperature, Process is spontaneous at any temperature,” in the third row, and “delta G less than zero at low temperature, delta G greater than zero at high temperature, Process is spontaneous at low temperature.”
> caption: There are four possibilities regarding the signs of enthalpy and entropy changes.

:::example {ex:fs-idm299243200} Predicting the Temperature Dependence of Spontaneity
The incomplete combustion of carbon is described by the following equation:

$$ \text{2C}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;\text{2CO}(g) $$  {eq:fs-idm124549040}

How does the spontaneity of this process depend upon temperature?
**Solution**
Combustion processes are exothermic (Δ*H* < 0). This particular reaction involves an increase in entropy due to the accompanying increase in the amount of gaseous species (net gain of one mole of gas, Δ*S* > 0). The reaction is therefore spontaneous (Δ*G* < 0) at all temperatures.
**Check Your Learning**
Popular chemical hand warmers generate heat by the air-oxidation of iron:

$$ \text{4Fe}(s)+{\text{3O}}_{2}(g)\;\longrightarrow \;{\text{2Fe}}_{2}{\text{O}}_{3}(s) $$  {eq:fs-idm247358864}

How does the spontaneity of this process depend upon temperature?

:::note [answer] Answer:
Δ*H* and Δ*S* are negative; the reaction is spontaneous at low temperatures.
:::
:::
When considering the conclusions drawn regarding the temperature dependence of spontaneity, it is important to keep in mind what the terms “high” and “low” mean. Since these terms are adjectives, the temperatures in question are deemed high or low relative to some reference temperature. A process that is nonspontaneous at one temperature but spontaneous at another will necessarily undergo a change in “spontaneity” (as reflected by its Δ*G*) as temperature varies. This is clearly illustrated by a graphical presentation of the free energy change equation, in which Δ*G* is plotted on the *y* axis versus *T* on the *x* axis:

$$ \text{Δ}G=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm161001120}

$$ y=b+mx $$  {eq:fs-idm285695760}

Such a plot is shown in [ref:CNX_Chem_16_05_TempSpont]. A process whose enthalpy and entropy changes are of the same arithmetic sign will exhibit a temperature-dependent spontaneity as depicted by the two yellow lines in the plot. Each line crosses from one spontaneity domain (positive or negative Δ*G*) to the other at a temperature that is characteristic of the process in question. This temperature is represented by the *x*-intercept of the line, that is, the value of *T* for which Δ*G* is zero:

$$ \text{Δ}G=0=\text{Δ}H-T\text{Δ}S $$  {eq:fs-idm187292464}

$$ T=\;\frac{\text{Δ}H}{\text{Δ}S} $$  {eq:fs-idm280698832}

So, saying a process is spontaneous at “high” or “low” temperatures means the temperature is above or below, respectively, that temperature at which Δ*G* for the process is zero. As noted earlier, the condition of ΔG = 0 describes a system at equilibrium.

> FIGURE {fig:CNX_Chem_16_05_TempSpont} src=../../media/CNX_Chem_16_04_TempSpont-d7b9.jpg class=scaled-down
> alt: A graph is shown where the y-axis is labeled, “Free energy,” and the x-axis is labeled, “Increasing temperature ( K ).” The value of zero is written midway up the y-axis with the label, “delta G greater than 0,” written above this line and, “delta G less than 0,” written below it. The bottom half of the graph is labeled on the right as, “Spontaneous,” and the top half is labeled on the right as, “Nonspontaneous.” A green line labeled, “delta H less than 0, delta S greater than 0,” extends from a quarter of the way up the y-axis to the bottom right of the graph. A yellow line labeled, “delta H less than 0, delta S less than 0,” extends from a quarter of the way up the y-axis to the middle right of the graph. A second yellow line labeled, “delta H greater than 0, delta S greater than 0,” extends from three quarters of the way up the y-axis to the middle right of the graph. A red line labeled, “delta H greater than 0, delta S less than 0,” extends from three quarters of the way up the y-axis to the top right of the graph.
> caption: These plots show the variation in Δ*G* with temperature for the four possible combinations of arithmetic sign for Δ*H* and Δ*S*.

:::example {ex:fs-idm232248480} Equilibrium Temperature for a Phase Transition
As defined in the chapter on liquids and solids, the boiling point of a liquid is the temperature at which its liquid and gaseous phases are in equilibrium (that is, when vaporization and condensation occur at equal rates). Use the information in [Appendix G](module:m68865) to estimate the boiling point of water.
**Solution**
The process of interest is the following phase change:

$$ {\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g) $$  {eq:fs-idm181862672}

When this process is at equilibrium, Δ*G* = 0, so the following is true:

$$ 0=\text{Δ}H\text{°}-T\text{Δ}S\text{°}\hspace{5em}\text{or}\hspace{5em}T=\;\frac{\text{Δ}H\text{°}}{\text{Δ}S\text{°}} $$  {eq:fs-idm275207392}

Using the standard thermodynamic data from [Appendix G](module:m68865),

$$ \begin{array}{rll}\text{Δ}H\text{°} & = & 1\;\text{mol}\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{H}}_{2}\text{O}(g))\;-1\;\text{mol}\;\times \;\text{Δ}{H}_{\text{f}}^{{}^{\circ}}({\text{H}}_{2}\text{O}(l)) \\ & = & \text{(1 mol)}-\text{241.82 kJ/mol}-\text{(1 mol)}(-\text{286.83 kJ/mol})=\text{44.01 kJ}\end{array} $$  {eq:fs-idm159129872}

$$ \begin{array}{rll}\text{Δ}S\text{°} & = & 1\;\text{mol}\;\times \;\text{Δ}S\text{°}({\text{H}}_{2}\text{O}(g))\;-1\;\text{mol}\;\times \;\text{Δ}S\text{°}({\text{H}}_{2}\text{O}(l)) \\ & = & \text{(1 mol)}\;\text{188.8 J/K·mol}-\text{(1 mol)}\;\text{70.0 J/K·mol}=\text{118.8 J/K}\end{array} $$  {eq:fs-idp163630608}

$$ T=\;\frac{\text{Δ}H\text{°}}{\text{Δ}S\text{°}}\;=\;\frac{44.01\;\times \;{10}^{3}\;\text{J}}{118.8\;\text{J/K}}\;=370.5\;\text{K}=97.3\;\text{°C} $$  {eq:fs-idm250608432}

The accepted value for water’s normal boiling point is 373.2 K (100.0 °C), and so this calculation is in reasonable agreement. Note that the values for enthalpy and entropy changes data used were derived from standard data at 298 K ([Appendix G](module:m68865)). If desired, you could obtain more accurate results by using enthalpy and entropy changes determined at (or at least closer to) the actual boiling point.
**Check Your Learning**
Use the information in [Appendix G](module:m68865) to estimate the boiling point of CS<sub>2</sub>.

:::note [answer] Answer:
313 K (accepted value 319 K)
:::
:::

## Free Energy and Equilibrium
The free energy change for a process may be viewed as a measure of its driving force. A negative value for Δ*G* represents a driving force for the process in the forward direction, while a positive value represents a driving force for the process in the reverse direction. When Δ*G* is zero, the forward and reverse driving forces are equal, and the process occurs in both directions at the same rate (the system is at equilibrium).
In the chapter on equilibrium the *reaction quotient*, *Q*, was introduced as a convenient measure of the status of an equilibrium system. Recall that *Q* is the numerical value of the mass action expression for the system, and that you may use its value to identify the direction in which a reaction will proceed in order to achieve equilibrium. When *Q* is lesser than the equilibrium constant, *K*, the reaction will proceed in the forward direction until equilibrium is reached and *Q* = *K*. Conversely, if *Q* > *K*, the process will proceed in the reverse direction until equilibrium is achieved.
The free energy change for a process taking place with reactants and products present under *nonstandard conditions* (pressures other than 1 bar; concentrations other than 1 M) is related to the standard free energy change according to this equation:

$$ \text{Δ}G=\text{Δ}G\text{°}+RT\;\text{ln}\;Q $$  {eq:fs-idm55093920}

*R* is the gas constant (8.314 J/K mol), *T* is the kelvin or absolute temperature, and *Q* is the reaction quotient. For gas phase equilibria, the pressure-based reaction quotient, *Q<sub>P</sub>*, is used. The concentration-based reaction quotient, *Q<sub>C</sub>*, is used for condensed phase equilibria. This equation may be used to predict the spontaneity for a process under any given set of conditions as illustrated in [ref:fs-idm192477856].

:::example {ex:fs-idm192477856} Calculating Δ*G* under Nonstandard Conditions
What is the free energy change for the process shown here under the specified conditions?
*T* = 25 °C, ${P}_{{\text{N}}_{2}}=\text{0.870 atm},$ ${P}_{{\text{H}}_{2}}=\text{0.250 atm},$ and ${P}_{{\text{NH}}_{3}}=\text{12.9 atm}$

$$ {\text{2NH}}_{3}(g)\;\longrightarrow \;{\text{3H}}_{2}(g)+{\text{N}}_{2}(g)\hspace{5em}\text{Δ}G\text{°}=\text{33.0 kJ/mol} $$  {eq:fs-idm8287616}

**Solution**
The equation relating free energy change to standard free energy change and reaction quotient may be used directly:

$$ \begin{array}{l}\text{Δ}G=\text{Δ}G\text{°}+RT\;\text{ln}\;Q=33.0\;\frac{\text{kJ}}{\text{mol}}\;+\;(8.314\;\frac{\text{J}}{\text{mol K}}\;\times \;\text{298 K}\;\times \;\text{ln}\;\frac{({0.250}^{3})\;\times \;0.870}{{12.9}^{2}}) \\ \\ =9680\;\frac{\text{J}}{\text{mol}}\;\text{or 9.68 kJ/mol}\end{array} $$  {eq:fs-idm150025600}

Since the computed value for Δ*G* is positive, the reaction is nonspontaneous under these conditions.
**Check Your Learning**
Calculate the free energy change for this same reaction at 875 °C for a mixture containing each gas at a partial pressure of 1.88 atm. Is the reaction spontaneous under these conditions?

:::note [answer] Answer:
Δ*G* = 45.1 kJ/mol; no
:::
:::
For a system at equilibrium, *Q* = *K* and Δ*G* = 0, and the previous equation may be written as

$$ 0=\text{Δ}G\text{°}+RT\;\text{ln}\;K\hspace{5em}(\text{at equilibrium}) $$  {eq:fs-idm228614064}

$$ \text{Δ}G\text{°}=\text{−}RT\;\text{ln}\;K\hspace{5em}\text{or}\hspace{5em}K={e}^{-\;\frac{\text{Δ}G\text{°}}{RT}} $$  {eq:fs-idm55951760}

This form of the equation provides a useful link between these two essential thermodynamic properties, and it can be used to derive equilibrium constants from standard free energy changes and vice versa. The relations between standard free energy changes and equilibrium constants are summarized in [ref:fs-idm159425040].

> TABLE {tab:fs-idm159425040} cols=3 class=top-titled
> title: Relations between Standard Free Energy Changes and Equilibrium Constants
> summary: This table has three columns and four rows. The first row is a header row, and it labels each column, “K,” “capital delta G superscript degree symbol,” and “Comments.” Under the “K” column are the following: “greater than 1,” “less than 1,” and “equal to 1.” Under the “capital delta G superscript degree symbol” column are the following: “less than 0,” “greater than 0,” and “equal to 0.” Under the “Comments” column are the following: “Products are more abundant at equilibrium,” “Reactants are more abundant at equilibrium,” and “Reactants and products are equally abundant at equilibrium.”

| *K* | Δ*G*° | Composition of an Equilibrium Mixture |
| --- | --- | --- |
| > 1 | < 0 | Products are more abundant |
| < 1 | > 0 | Reactants are more abundant |
| = 1 | = 0 | Reactants and products are comparably abundant |

:::example {ex:fs-idm300346368} Calculating an Equilibrium Constant using Standard Free Energy Change
Given that the standard free energies of formation of Ag<sup>+</sup>(*aq*), Cl<sup>−</sup>(*aq*), and AgCl(*s*) are 77.1 kJ/mol, −131.2 kJ/mol, and −109.8 kJ/mol, respectively, calculate the solubility product, *K*<sub>sp</sub>, for AgCl.
**Solution**
The reaction of interest is the following:

$$ \text{AgCl}(s)\;\rightleftharpoons \;{\text{Ag}}^{\text{+}}(aq)+{\text{Cl}}^{\text{−}}(aq)\hspace{5em}{K}_{\text{sp}}=[{\text{Ag}}^{\text{+}}][{\text{Cl}}^{\text{−}}] $$  {eq:fs-idm266185728}

The standard free energy change for this reaction is first computed using standard free energies of formation for its reactants and products:

$$ \begin{array}{l} \\ \text{Δ}G\text{°}=[\text{Δ}{G}_{\text{f}}^{{}^{\circ}}({\text{Ag}}^{\text{+}}(aq))\;+\text{Δ}{G}_{\text{f}}^{{}^{\circ}}({\text{Cl}}^{\text{−}}(aq))]\;-\;[\text{Δ}{G}_{\text{f}}^{{}^{\circ}}(\text{AgCl}(s))] \\ =[\text{77.1 kJ/mol}-\text{131.2 kJ/mol}]-[-\text{109.8 kJ/mol}]=\text{55.7 kJ/mol}\end{array} $$  {eq:fs-idm111103296}

The equilibrium constant for the reaction may then be derived from its standard free energy change:

$$ {K}_{\text{sp}}={e}^{-\frac{\text{Δ}G\text{°}}{RT}}=\text{exp}(-\;\frac{\text{Δ}G\text{°}}{RT})\;=\text{exp}(-\;\frac{55.7\;\times \;{10}^{3}\;\text{J/mol}}{8.314\;\text{J/mol·K}\;\times \;298.15\;\text{K}})=\text{exp}(-22.470)={e}^{-22.470}=1.74\;\times \;{10}^{\text{−10}} $$  {eq:fs-idm267274240}

This result is in reasonable agreement with the value provided in [Appendix J](module:m68868).
**Check Your Learning**
Use the thermodynamic data provided in [Appendix G](module:m68865) to calculate the equilibrium constant for the dissociation of dinitrogen tetroxide at 25 °C.

$$ {\text{2NO}}_{2}(g)\;\rightleftharpoons \;{\text{N}}_{2}{\text{O}}_{4}(g) $$  {eq:fs-idm193826960}

:::note [answer] Answer:
*K* = 0.32
:::
:::
To further illustrate the relation between these two essential thermodynamic concepts, consider the observation that reactions spontaneously proceed in a direction that ultimately establishes equilibrium. As may be shown by plotting the free energy versus the extent of the reaction (for example, as reflected in the value of *Q*), equilibrium is established when the system’s free energy is minimized ([ref:CNX_Chem_16_04_Gibbs]). If a system consists of reactants and products in nonequilibrium amounts (*Q* ≠ *K*), the reaction will proceed spontaneously in the direction necessary to establish equilibrium.

> FIGURE {fig:CNX_Chem_16_04_Gibbs} src=../../media/CNX_Chem_16_04_Gibbs-1aa8.jpg
> alt: Three graphs, labeled, “a,” “b,” and “c” are shown where the y-axis is labeled, “Gibbs free energy ( G ),” and, “G superscript degree sign ( reactants ),” while the x-axis is labeled, “Reaction progress,” and “Reactants,” on the left and, “Products,” on the right. In graph a, a line begins at the upper left side and goes steadily down to a point about halfway up the y-axis and two thirds of the way on the x-axis, then rises again to a point labeled, “G superscript degree sign ( products ),” that is slightly higher than halfway up the y-axis. The distance between the beginning and ending points of the graph is labeled as, “delta G less than 0,” while the lowest point on the graph is labeled, “Q equals K greater than 1.” In graph b, a line begins at the middle left side and goes steadily down to a point about two fifths up the y-axis and one third of the way on the x-axis, then rises again to a point labeled, “G superscript degree sign ( products ),” that is near the top of the y-axis. The distance between the beginning and ending points of the graph is labeled as, “delta G greater than 0,” while the lowest point on the graph is labeled, “Q equals K less than 1.” In graph c, a line begins at the upper left side and goes steadily down to a point near the bottom of the y-axis and half way on the x-axis, then rises again to a point labeled, “G superscript degree sign ( products ),” that is equal to the starting point on the y-axis which is labeled, “G superscript degree sign ( reactants ).” The lowest point on the graph is labeled, “Q equals K equals 1.” At the top of the graph is the label, “Delta G superscript degree sign equals 0.”
> caption: These plots show the free energy versus reaction progress for systems whose standard free energy changes are (a) negative, (b) positive, and (c) zero. Nonequilibrium systems will proceed spontaneously in whatever direction is necessary to minimize free energy and establish equilibrium.

## Key Concepts and Summary {section:summary}
Gibbs free energy (*G*) is a state function defined with regard to system quantities only and may be used to predict the spontaneity of a process. A negative value for Δ*G* indicates a spontaneous process; a positive Δ*G* indicates a nonspontaneous process; and a Δ*G* of zero indicates that the system is at equilibrium. A number of approaches to the computation of free energy changes are possible.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| Δ*G* = Δ*H* − *T*Δ*S* |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idm162318800} type= 
PROBLEM:
What is the difference between Δ*G* and Δ*G*° for a chemical change?
:::

:::exercise {fs-idm203151232} type= 
PROBLEM:
A reaction has $\text{Δ}H\text{°}$ = 100 kJ/mol and $\text{Δ}S\text{°}=\text{250 J/mol·K.}$ Is the reaction spontaneous at room temperature? If not, under what temperature conditions will it become spontaneous?
SOLUTION:
The reaction is nonspontaneous at room temperature.
Above 400 K, Δ*G* will become negative, and the reaction will become spontaneous.
:::

:::exercise {fs-idm139518608} type= 
PROBLEM:
Explain what happens as a reaction starts with Δ*G* < 0 (negative) and reaches the point where Δ*G* = 0.
:::

:::exercise {fs-idm195989408} type= 
PROBLEM:
Use the standard free energy of formation data in [Appendix G](module:m68865) to determine the free energy change for each of the following reactions, which are run under standard state conditions and 25 °C. Identify each as either spontaneous or nonspontaneous at these conditions.
(a) ${\text{MnO}}_{2}(s)\;\longrightarrow \;\text{Mn}(s)+{\text{O}}_{2}(g)$
(b) ${\text{H}}_{2}(g)+{\text{Br}}_{2}(l)\;\longrightarrow \;\text{2HBr}(g)$
(c) $\text{Cu}(s)+\text{S}(g)\;\longrightarrow \;\text{CuS}(s)$
(d) $\text{2LiOH}(s)+{\text{CO}}_{2}(g)\;\longrightarrow \;{\text{Li}}_{2}{\text{CO}}_{3}(s)+{\text{H}}_{2}\text{O}(g)$
(e) ${\text{CH}}_{4}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;\text{C}(s,\;\text{graphite})+{\text{2H}}_{2}\text{O}(g)$
(f) ${\text{CS}}_{2}(g)+{\text{3Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+{\text{S}}_{2}{\text{Cl}}_{2}(g)$
SOLUTION:
(a) 465.1 kJ nonspontaneous; (b) −106.86 kJ spontaneous; (c) −291.9 kJ spontaneous; (d) −83.4 kJ spontaneous; (e) −406.7 kJ spontaneous; (f) −154.3  kJ spontaneous
:::

:::exercise {fs-idm134681120} type= 
PROBLEM:
Use the standard free energy data in [Appendix G](module:m68865) to determine the free energy change for each of the following reactions, which are run under standard state conditions and 25 °C. Identify each as either spontaneous or nonspontaneous at these conditions.
(a) $\text{C}(s\text{, graphite})+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)$
(b) ${\text{O}}_{2}(g)+{\text{N}}_{2}(g)\;\longrightarrow \;\text{2NO}(g)$
(c) $\text{2Cu}(s)+\text{S}(g)\;\longrightarrow \;{\text{Cu}}_{2}\text{S}(s)$
(d) $\text{CaO}(s)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;\text{Ca}{(\text{OH})}_{2}(s)$
(e) ${\text{Fe}}_{2}{\text{O}}_{3}(s)+\text{3CO}(g)\;\longrightarrow \;\text{2Fe}(s)+{\text{3CO}}_{2}(g)$
(f) ${\text{CaSO}}_{4}\text{·}{\text{2H}}_{2}\text{O}(s)\;\longrightarrow \;{\text{CaSO}}_{4}(s)+{\text{2H}}_{2}\text{O}(g)$
:::

:::exercise {fs-idm260990256} type= 
PROBLEM:
Given:
${\text{P}}_{4}(s)+{\text{5O}}_{2}(g)\;\longrightarrow \;{\text{P}}_{4}{\text{O}}_{10}(s)\hspace{5em}\text{Δ}G\text{°}=\text{−2697.0 kJ/mol}$
${\text{2H}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2H}}_{2}\text{O}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−457.18 kJ/mol}$
${\text{6H}}_{2}\text{O}(g)+{\text{P}}_{4}{\text{O}}_{10}(s)\;\longrightarrow \;{\text{4H}}_{3}{\text{PO}}_{4}(l)\hspace{5em}\text{Δ}G\text{°}=\text{−428.66 kJ/mol}$
(a) Determine the standard free energy of formation, $\text{Δ}{G}_{\text{f}}^{{}^{\circ}},$ for phosphoric acid.
(b) How does your calculated result compare to the value in [Appendix G](module:m68865)? Explain.
SOLUTION:
(a) The standard free energy of formation is –1124.3 kJ/mol. (b) The calculation agrees with the value in [Appendix G](module:m68865) because free energy is a state function (just like the enthalpy and entropy), so its change depends only on the initial and final states, not the path between them.
:::

:::exercise {fs-idm160458752} type= 
PROBLEM:
Is the formation of ozone (O<sub>3</sub>(*g*)) from oxygen (O<sub>2</sub>(*g*)) spontaneous at room temperature under standard state conditions?
:::

:::exercise {fs-idm207879392} type= 
PROBLEM:
Consider the decomposition of red mercury(II) oxide under standard state conditions.
$\text{2HgO}(s,\;\text{red})\;\longrightarrow \;\text{2Hg}(l)+{\text{O}}_{2}(g)$
(a) Is the decomposition spontaneous under standard state conditions?
(b) Above what temperature does the reaction become spontaneous?
SOLUTION:
(a) The reaction is nonspontaneous; (b) Above 566 °C the process is spontaneous.
:::

:::exercise {fs-idm217769472} type= 
PROBLEM:
Among other things, an ideal fuel for the control thrusters of a space vehicle should decompose in a spontaneous exothermic reaction when exposed to the appropriate catalyst. Evaluate the following substances under standard state conditions as suitable candidates for fuels.
(a) Ammonia: ${\text{2NH}}_{3}(g)\;\longrightarrow \;{\text{N}}_{2}(g)+{\text{3H}}_{2}(g)$
(b) Diborane: ${\text{B}}_{2}{\text{H}}_{6}(g)\;\longrightarrow \;\text{2B}(g)+{\text{3H}}_{2}(g)$
(c) Hydrazine: ${\text{N}}_{2}{\text{H}}_{4}(g)\;\longrightarrow \;{\text{N}}_{2}(g)+{\text{2H}}_{2}(g)$
(d) Hydrogen peroxide: ${\text{H}}_{2}{\text{O}}_{2}(l)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g)+\;\frac{1}{2}{\text{O}}_{2}(g)$
:::

:::exercise {fs-idm21106912} type= 
PROBLEM:
Calculate Δ*G*° for each of the following reactions from the equilibrium constant at the temperature given.
(a) ${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;\text{2NO}(g)\hspace{5em}\text{T}=2000\;\text{°C}\hspace{5em}{K}_{p}=4.1\;\times \;{10}^{\text{−4}}$
(b) ${\text{H}}_{2}(g)+{\text{I}}_{2}(g)\;\longrightarrow \;\text{2HI}(g)\hspace{5em}\text{T}=400\;\text{°C}\hspace{5em}{K}_{p}=50.0$
(c) ${\text{CO}}_{2}(g)+{\text{H}}_{2}(g)\;\longrightarrow \;\text{CO}(g)+{\text{H}}_{2}\text{O}(g)\hspace{5em}\text{T}=980\;\text{°C}\hspace{5em}{K}_{p}=1.67$
(d) ${\text{CaCO}}_{3}(s)\;\longrightarrow \;\text{CaO}(s)+{\text{CO}}_{2}(g)\hspace{5em}\text{T}=900\;\text{°C}\hspace{5em}{K}_{p}=1.04$
(e) $\text{HF}(aq)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{3}{\text{O}}^{\text{+}}(aq)+{\text{F}}^{\text{−}}(aq)\hspace{5em}\text{T}=25\;\text{°C}\hspace{5em}{K}_{a}=7.2\;\times \;{10}^{\text{−4}}$
(f) $\text{AgBr}(s)\;\longrightarrow \;{\text{Ag}}^{\text{+}}(aq)+{\text{Br}}^{\text{−}}(aq)\hspace{5em}\text{T}=25\;\text{°C}\hspace{5em}{K}_{sp}=3.3\;\times \;{10}^{\text{−13}}$
SOLUTION:
(a) 1.5 $\times$ 10<sup>2</sup> kJ; (b) −21.9 kJ; (c) −5.34 kJ; (d) −0.383 kJ; (e) 18 kJ; (f) 71 kJ
:::

:::exercise {fs-idm118316848} type= 
PROBLEM:
Calculate Δ*G*° for each of the following reactions from the equilibrium constant at the temperature given.
(a) ${\text{Cl}}_{2}(g)+{\text{Br}}_{2}(g)\;\longrightarrow \;\text{2BrCl}(g)\hspace{5em}\text{T}=25\;\text{°C}\hspace{5em}{K}_{p}=4.7\;\times \;{10}^{\text{−2}}$
(b) ${\text{2SO}}_{2}(g)+{\text{O}}_{2}(g)\;\rightleftharpoons \;{\text{2SO}}_{3}(g)\hspace{5em}\text{T}=500\;\text{°C}\hspace{5em}{K}_{p}=48.2$
(c) ${\text{H}}_{2}\text{O}(l)\;\rightleftharpoons \;{\text{H}}_{2}\text{O}(g)\hspace{5em}\text{T}=60\;\text{°C}\hspace{5em}{K}_{p}=\text{0.196}$
(d) $\text{CoO}(s)+\text{CO}(g)\;\rightleftharpoons \;\text{Co}(s)+{\text{CO}}_{2}(g)\hspace{5em}\text{T}=550\;\text{°C}\hspace{5em}{K}_{p}=4.90\;\times \;{10}^{2}$
(e) ${\text{CH}}_{3}{\text{NH}}_{2}(aq)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{CH}}_{3}{\text{NH}}_{3}{}^{\text{+}}(aq)+{\text{OH}}^{\text{−}}(aq)\hspace{5em}\text{T}=25\;\text{°C}\hspace{5em}{K}_{b}=4.4\;\times \;{10}^{\text{−4}}$
(f) ${\text{PbI}}_{2}(s)\;\longrightarrow \;{\text{Pb}}^{2+}(aq)+{\text{2I}}^{\text{−}}(aq)\hspace{5em}\text{T}=25\;\text{°C}\hspace{5em}{K}_{sp}=8.7\;\times \;{10}^{\text{−9}}$
:::

:::exercise {fs-idm128725552} type= 
PROBLEM:
Calculate the equilibrium constant at 25 °C for each of the following reactions from the value of Δ*G*° given.
(a) ${\text{O}}_{2}(g)+{\text{2F}}_{2}(g)\;\longrightarrow \;{\text{2OF}}_{2}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−9.2 kJ}$
(b) ${\text{I}}_{2}(s)+{\text{Br}}_{2}(l)\;\longrightarrow \;\text{2IBr}(g)\hspace{5em}\text{Δ}G\text{°}=\text{7.3 kJ}$
(c) $\text{2LiOH}(s)+{\text{CO}}_{2}(g)\;\longrightarrow \;{\text{Li}}_{2}{\text{CO}}_{3}(s)+{\text{H}}_{2}\text{O}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−79 kJ}$
(d) ${\text{N}}_{2}{\text{O}}_{3}(g)\;\longrightarrow \;\text{NO}(g)+{\text{NO}}_{2}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−1.6 kJ}$
(e) ${\text{SnCl}}_{4}(l)\;\longrightarrow \;{\text{SnCl}}_{4}(l)\hspace{5em}\text{Δ}G\text{°}=\text{8.0 kJ}$
SOLUTION:
(a) *K* = 41; (b) *K* = 0.053; (c) *K* = 6.9 $\times$ 10<sup>13</sup>; (d) *K* = 1.9; (e) *K* = 0.04
:::

:::exercise {fs-idm124546864} type= 
PROBLEM:
Calculate the equilibrium constant at 25 °C for each of the following reactions from the value of Δ*G*° given.
(a) ${\text{I}}_{2}(s)+{\text{Cl}}_{2}(g)\;\longrightarrow \;\text{2ICl}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−10.88 kJ}$
(b) ${\text{H}}_{2}(g)+{\text{I}}_{2}(s)\;\longrightarrow \;\text{2HI}(g)\hspace{5em}\text{Δ}G\text{°}=\text{3.4 kJ}$
(c) ${\text{CS}}_{2}(g)+{\text{3Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+{\text{S}}_{2}{\text{Cl}}_{2}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−39 kJ}$
(d) ${\text{2SO}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2SO}}_{3}(g)\hspace{5em}\text{Δ}G\text{°}=\text{−141.82 kJ}$
(e) ${\text{CS}}_{2}(g)\;\longrightarrow \;{\text{CS}}_{2}(l)\hspace{5em}\text{Δ}G\text{°}=\text{−1.88 kJ}$
:::

:::exercise {fs-idm182192304} type= 
PROBLEM:
Calculate the equilibrium constant at the temperature given.
(a) ${\text{O}}_{2}(g)+{\text{2F}}_{2}(g)\;\longrightarrow \;{\text{2F}}_{2}\text{O}(g)\hspace{5em}(\text{T}=100\;\text{°C})$
(b) ${\text{I}}_{2}(s)+{\text{Br}}_{2}(l)\;\longrightarrow \;\text{2IBr}(g)\hspace{5em}(\text{T}=0.0\;\text{°C})$
(c) $\text{2LiOH}(s)+{\text{CO}}_{2}(g)\;\longrightarrow \;{\text{Li}}_{2}{\text{CO}}_{3}(s)+{\text{H}}_{2}\text{O}(g)\hspace{5em}(\text{T}=575\;\text{°C})$
(d) ${\text{N}}_{2}{\text{O}}_{3}(g)\;\longrightarrow \;\text{NO}(g)+{\text{NO}}_{2}(g)\hspace{5em}(\text{T}=−10.0\;\text{°C})$
(e) ${\text{SnCl}}_{4}(l)\;\longrightarrow \;{\text{SnCl}}_{4}(g)\hspace{5em}(\text{T}=200\;\text{°C})$
SOLUTION:
In each of the following, the value of Δ*G* is not given at the temperature of the reaction. Therefore, we must calculate Δ*G* from the values Δ*H*° and Δ*S* and then calculate Δ*G* from the relation Δ*G* = Δ*H*° − *T*Δ*S*°. (a) *K* = 1.07 × 10<sup>−13</sup>; (b) *K* = 2.51 $\times$ 10<sup>−3</sup>; (c) *K* = 2.73 $\times$ 10<sup>4</sup>; (d) *K* = 0.219; (e) *K* = 16.1
:::

:::exercise {fs-idm45665120} type= 
PROBLEM:
Calculate the equilibrium constant at the temperature given.
(a) ${\text{I}}_{2}(s)+{\text{Cl}}_{2}(g)\;\longrightarrow \;\text{2ICl}(g)\hspace{5em}(\text{T}=100\;\text{°C})$
(b) ${\text{H}}_{2}(g)+{\text{I}}_{2}(s)\;\longrightarrow \;\text{2HI}(g)\hspace{5em}(\text{T}=0.0\;\text{°C})$
(c) ${\text{CS}}_{2}(g)+{\text{3Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+{\text{S}}_{2}{\text{Cl}}_{2}(g)\hspace{5em}(\text{T}=125\;\text{°C})$
(d) ${\text{2SO}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2SO}}_{3}(g)\hspace{5em}(\text{T}=675\;\text{°C})$
(e) ${\text{CS}}_{2}(g)\;\longrightarrow \;{\text{CS}}_{2}(l)\hspace{5em}(\text{T}=90\;\text{°C})$
:::

:::exercise {fs-idm104559776} type= 
PROBLEM:
Consider the following reaction at 298 K:
${\text{N}}_{2}{\text{O}}_{4}(g)\;\rightleftharpoons \;{\text{2NO}}_{2}(g)\hspace{5em}{K}_{P}=0.142$
What is the standard free energy change at this temperature? Describe what happens to the initial system, where the reactants and products are in standard states, as it approaches equilibrium.
SOLUTION:
The standard free energy change is $\text{Δ}{G}^{{}^{\circ}}=\text{−}RT\;\text{ln}\;K=\text{4.84 kJ/mol}.$ When reactants and products are in their standard states (1 bar or 1 atm), *Q* = 1. As the reaction proceeds toward equilibrium, the reaction shifts left (the amount of products drops while the amount of reactants increases): *Q* < 1, and $\text{Δ}G$ becomes less positive as it approaches zero. At equilibrium, *Q* = *K*, and Δ*G* = 0.
:::

:::exercise {fs-idm139694688} type= 
PROBLEM:
Determine the normal boiling point (in kelvin) of dichloromethane, CH<sub>2</sub>Cl<sub>2</sub>. Find the actual boiling point using the Internet or some other source, and calculate the percent error in the temperature. Explain the differences, if any, between the two values.
:::

:::exercise {fs-idm217271728} type= 
PROBLEM:
Under what conditions is ${\text{N}}_{2}{\text{O}}_{3}(g)\;\longrightarrow \;\text{NO}(g)+{\text{NO}}_{2}(g)$ spontaneous?
SOLUTION:
The reaction will be spontaneous at temperatures greater than 287 K.
:::

:::exercise {fs-idm13994016} type= 
PROBLEM:
At room temperature, the equilibrium constant (*K<sub>w</sub>*) for the self-ionization of water is 1.00 $\times$ 10<sup>−14</sup>. Using this information, calculate the standard free energy change for the aqueous reaction of hydrogen ion with hydroxide ion to produce water. (Hint: The reaction is the reverse of the self-ionization reaction.)
:::

:::exercise {fs-idm113450896} type= 
PROBLEM:
Hydrogen sulfide is a pollutant found in natural gas. Following its removal, it is converted to sulfur by the reaction ${\text{2H}}_{2}\text{S}(g)+{\text{SO}}_{2}(g)\;\rightleftharpoons \;\frac{3}{8}{\text{S}}_{8}(s,\;\text{rhombic})+{\text{2H}}_{2}\text{O}(l).$ What is the equilibrium constant for this reaction? Is the reaction endothermic or exothermic?
SOLUTION:
*K* = 5.35 $\times$ 10<sup>15</sup>; The process is exothermic.
:::

:::exercise {fs-idm56827936} type= 
PROBLEM:
Consider the decomposition of CaCO<sub>3</sub>(*s*) into CaO(*s*) and CO<sub>2</sub>(*g*). What is the equilibrium partial pressure of CO<sub>2</sub> at room temperature?
:::

:::exercise {fs-idm64731488} type= 
PROBLEM:
In the laboratory, hydrogen chloride (HCl(*g*)) and ammonia (NH<sub>3</sub>(*g*)) often escape from bottles of their solutions and react to form the ammonium chloride (NH<sub>4</sub>Cl(*s*)), the white glaze often seen on glassware. Assuming that the number of moles of each gas that escapes into the room is the same, what is the maximum partial pressure of HCl and NH<sub>3</sub> in the laboratory at room temperature? (Hint: The partial pressures will be equal and are at their maximum value when at equilibrium.)
SOLUTION:
1.0 $\times$ 10<sup>−8</sup> atm. This is the maximum pressure of the gases under the stated conditions.
:::

:::exercise {fs-idm189903696} type= 
PROBLEM:
Benzene can be prepared from acetylene. ${\text{3C}}_{2}{\text{H}}_{2}(g)\;\rightleftharpoons \;{\text{C}}_{6}{\text{H}}_{6}(g).$ Determine the equilibrium constant at 25 °C and at 850 °C. Is the reaction spontaneous at either of these temperatures? Why is all acetylene not found as benzene?
:::

:::exercise {fs-idm203633872} type= 
PROBLEM:
Carbon dioxide decomposes into CO and O<sub>2</sub> at elevated temperatures. What is the equilibrium partial pressure of oxygen in a sample at 1000 °C for which the initial pressure of CO<sub>2</sub> was 1.15 atm?
SOLUTION:
$x=1.29\;\times \;{10}^{-5}\;\text{atm}={P}_{{\text{O}}_{2}}$
:::

:::exercise {fs-idm181696144} type= 
PROBLEM:
Carbon tetrachloride, an important industrial solvent, is prepared by the chlorination of methane at 850 K.
${\text{CH}}_{4}(g)+{\text{4Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+\text{4HCl}(g)$
What is the equilibrium constant for the reaction at 850 K? Would the reaction vessel need to be heated or cooled to keep the temperature of the reaction constant?
:::

:::exercise {fs-idm230037264} type= 
PROBLEM:
Acetic acid, CH<sub>3</sub>CO<sub>2</sub>H, can form a dimer, (CH<sub>3</sub>CO<sub>2</sub>H)<sub>2</sub>, in the gas phase.
${\text{2CH}}_{3}{\text{CO}}_{2}\text{H}(g)\;\longrightarrow \;{({\text{CH}}_{3}{\text{CO}}_{2}\text{H})}_{2}(g)$
The dimer is held together by two hydrogen bonds with a total strength of 66.5 kJ per mole of dimer.

> IMAGE {img:fs-idm191384928} src=../../media/CNX_Chem_16_04_aceticdimr_img.jpg
> alt: This Lewis structure shows a six-sided ring structure composed of a methyl group single bonded to a carbon, which is double bonded to an oxygen atom in an upward position and single bonded to an oxygen atom in a downward position. The lower oxygen is single bonded to a hydrogen, which is connected by a dotted line to an oxygen that is double bonded to a carbon in an upward position. This carbon is single bonded to a methyl group to its right and to an oxygen in the upward position that is single bonded to a hydrogen that is connected by a dotted line to the double bonded oxygen on the left.

At 25 °C, the equilibrium constant for the dimerization is 1.3 $\times$ 10<sup>3</sup> (pressure in atm). What is Δ*S*° for the reaction?
SOLUTION:
−0.16 kJ
:::

:::exercise {fs-idm62833440} type= 
PROBLEM:
Determine Δ*G*º for the following reactions.
(a) Antimony pentachloride decomposes at 448 °C. The reaction is:
${\text{SbCl}}_{5}(g)\longrightarrow {\text{SbCl}}_{3}(g)+{\text{Cl}}_{2}(g)$
An equilibrium mixture in a 5.00 L flask at 448 °C contains 3.85 g of SbCl<sub>5</sub>, 9.14 g of SbCl<sub>3</sub>, and 2.84 g of Cl<sub>2</sub>.
(b) Chlorine molecules dissociate according to this reaction:
${\text{Cl}}_{2}(g)\;\longrightarrow \;2\text{Cl}(g)$
1.00% of Cl<sub>2</sub> molecules dissociate at 975 K and a pressure of 1.00 atm.
SOLUTION:
(a) 22.1 kJ; (b) 98.9 kJ/mol
:::

:::exercise {fs-idm234603840} type= 
PROBLEM:
Given that the $\text{Δ}{G}_{\text{f}}^{{}^{\circ}}$ for Pb<sup>2+</sup>(*aq*) and Cl<sup>−</sup>(*aq*) is −24.3 kJ/mole and −131.2 kJ/mole respectively, determine the solubility product, *K*<sub>sp</sub>, for PbCl<sub>2</sub>(*s*).
:::

:::exercise {fs-idm193107712} type= 
PROBLEM:
Determine the standard free energy change, $\text{Δ}{G}_{\text{f}}^{{}^{\circ}},$ for the formation of S<sup>2−</sup>(*aq*) given that the $\text{Δ}{G}_{\text{f}}^{{}^{\circ}}$ for Ag<sup>+</sup>(*aq*) and Ag<sub>2</sub>S(*s*) are 77.1 kJ/mole and −39.5 kJ/mole respectively, and the solubility product for Ag<sub>2</sub>S(*s*) is 8 $\times$ 10<sup>−51</sup>.
SOLUTION:
90 kJ/mol
:::

:::exercise {fs-idm184693712} type= 
PROBLEM:
Determine the standard enthalpy change, entropy change, and free energy change for the conversion of diamond to graphite. Discuss the spontaneity of the conversion with respect to the enthalpy and entropy changes. Explain why diamond spontaneously changing into graphite is not observed.
:::

:::exercise {fs-idm208071680} type= 
PROBLEM:
The evaporation of one mole of water at 298 K has a standard free energy change of 8.58 kJ.
${\text{H}}_{2}\text{O}(l)\;\rightleftharpoons \;{\text{H}}_{2}\text{O}(g)\hspace{5em}\text{Δ}G\text{°}=\text{8.58 kJ}$
(a) Is the evaporation of water under standard thermodynamic conditions spontaneous?
(b) Determine the equilibrium constant, *K<sub>P</sub>*, for this physical process.
(c) By calculating ∆*G*, determine if the evaporation of water at 298 K is spontaneous when the partial pressure of water, ${P}_{{\text{H}}_{2}\text{O}},$ is 0.011 atm.
(d) If the evaporation of water were always nonspontaneous at room temperature, wet laundry would never dry when placed outside. In order for laundry to dry, what must be the value of ${P}_{{\text{H}}_{2}\text{O}}$ in the air?
SOLUTION:
(a) Under standard thermodynamic conditions, the evaporation is nonspontaneous; (b) *K<sub>p</sub>* = 0.031; (c) The evaporation of water is spontaneous; (d) ${P}_{{\text{H}}_{2}\text{O}}$ must always be less than *K<sub>p</sub>* or less than 0.031 atm. 0.031 atm represents air saturated with water vapor at 25 °C, or 100% humidity.
:::

:::exercise {fs-idm156294896} type= 
PROBLEM:
In glycolysis, the reaction of glucose (Glu) to form glucose-6-phosphate (G6P) requires ATP to be present as described by the following equation:
$\text{Glu}+\text{ATP}\;\longrightarrow \;\text{G6P}+\text{ADP}\hspace{5em}\text{Δ}G\text{°}=\text{−17 kJ}$
In this process, ATP becomes ADP summarized by the following equation:
$\text{ATP}\;\longrightarrow \;\text{ADP}\hspace{5em}\text{Δ}G\text{°}=\text{−30 kJ}$
Determine the standard free energy change for the following reaction, and explain why ATP is necessary to drive this process:
$\text{Glu}\;\longrightarrow \;\text{G6P}\hspace{5em}\text{Δ}G\text{°}=?$
:::

:::exercise {fs-idm222211904} type= 
PROBLEM:
One of the important reactions in the biochemical pathway glycolysis is the reaction of glucose-6-phosphate (G6P) to form fructose-6-phosphate (F6P):
$\text{G6P}\;\rightleftharpoons \;\text{F6P}\hspace{5em}\text{Δ}G\text{°}=\text{1.7 kJ}$
(a) Is the reaction spontaneous or nonspontaneous under standard thermodynamic conditions?
(b) Standard thermodynamic conditions imply the concentrations of G6P and F6P to be 1 *M*, however, in a typical cell, they are not even close to these values. Calculate Δ*G* when the concentrations of G6P and F6P are 120 μ*M* and 28 μ*M* respectively, and discuss the spontaneity of the forward reaction under these conditions. Assume the temperature is 37 °C.
SOLUTION:
(a) Nonspontaneous as $\text{Δ}{G}^{{}^{\circ}}>0;$ (b) $\text{Δ}G=\text{Δ}{G}^{\text{°}}+RT\;\text{ln}\;Q,$ $\text{Δ}G=1.7\;\times \;{10}^{3}+\;(8.314\;\times \;310\;\times \;\text{ln}\;\frac{28}{120})\;=\text{−2.1 kJ}.$ The forward reaction to produce F6P is spontaneous under these conditions.
:::

:::exercise {fs-idm154668704} type= 
PROBLEM:
Without doing a numerical calculation, determine which of the following will reduce the free energy change for the reaction, that is, make it less positive or more negative, when the temperature is increased. Explain.
(a) ${\text{N}}_{2}(g)+{\text{3H}}_{2}(g)\;\longrightarrow \;{\text{2NH}}_{3}(g)$
(b) $\text{HCl}(g)+{\text{NH}}_{3}(g)\;\longrightarrow \;{\text{NH}}_{4}\text{Cl}(s)$
(c) ${({\text{NH}}_{4})}_{2}{\text{Cr}}_{2}{\text{O}}_{7}(s)\;\longrightarrow \;{\text{Cr}}_{2}{\text{O}}_{3}(s)+{\text{4H}}_{2}\text{O}(g)+{\text{N}}_{2}(g)$
(d) $\text{2Fe}(s)+{\text{3O}}_{2}(g)\;\longrightarrow \;{\text{Fe}}_{2}{\text{O}}_{3}(s)$
:::

:::exercise {fs-idm114483936} type= 
PROBLEM:
When ammonium chloride is added to water and stirred, it dissolves spontaneously and the resulting solution feels cold. Without doing any calculations, deduce the signs of Δ*G*, Δ*H*, and Δ*S* for this process, and justify your choices.
SOLUTION:
Δ*G* is negative as the process is spontaneous. Δ*H* is positive as with the solution becoming cold, the dissolving must be endothermic. Δ*S* must be positive as this drives the process, and it is expected for the dissolution of any soluble ionic compound.
:::

:::exercise {fs-idm182364544} type= 
PROBLEM:
An important source of copper is from the copper ore, chalcocite, a form of copper(I) sulfide. When heated, the Cu<sub>2</sub>S decomposes to form copper and sulfur described by the following equation:
${\text{Cu}}_{2}\text{S}(s)\;\longrightarrow \;\text{Cu}(s)+\text{S}(s)$
(a) Determine $\text{Δ}G\text{°}$ for the decomposition of Cu<sub>2</sub>S(*s*).
(b) The reaction of sulfur with oxygen yields sulfur dioxide as the only product. Write an equation that describes this reaction, and determine $\text{Δ}G\text{°}$ for the process.
(c) The production of copper from chalcocite is performed by roasting the Cu<sub>2</sub>S in air to produce the Cu. By combining the equations from Parts (a) and (b), write the equation that describes the roasting of the chalcocite, and explain why coupling these reactions together makes for a more efficient process for the production of the copper.
:::

:::exercise {fs-idm153799616} type= 
PROBLEM:
What happens to $\text{Δ}G$ (becomes more negative or more positive) for the following chemical reactions when the partial pressure of oxygen is increased?
(a) $\text{S}(s)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{SO}}_{2}(g)$
(b) ${\text{2SO}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2SO}}_{3}(g)$
(c) $\text{HgO}(s)\;\longrightarrow \;\text{Hg}(l)+{\text{O}}_{2}(g)$
SOLUTION:
(a) Increasing the oxygen partial pressure will yield a decrease in *Q* and $\text{Δ}G$ thus becomes more negative. (b) Increasing the oxygen partial pressure will yield a decrease in *Q* and $\text{Δ}G$ thus becomes more negative. (c) Increasing the oxygen partial pressure will yield an increase in *Q* and $\text{Δ}G$ thus becomes more positive.
:::

## Glossary
- {def} **Gibbs free energy change (*G*)**: thermodynamic property defined in terms of system enthalpy and entropy; all spontaneous processes involve a decrease in *G*
- {def} **standard free energy change (Δ*G*°)**: change in free energy for a process occurring under standard conditions (1 bar pressure for gases, 1 M concentration for solutions)
- {def} **standard free energy of formation $(\text{Δ}{G}_{\text{f}}^{{}^{\circ}})$**: change in free energy accompanying the formation of one mole of substance from its elements in their standard states
