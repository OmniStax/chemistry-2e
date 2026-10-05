# Potential, Free Energy, and Equilibrium

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Explain the relations between potential, free energy change, and equilibrium constants
- Perform calculations involving the relations between cell potentials, free energy changes, and equilibrium
- Use the Nernst equation to determine cell potentials under nonstandard conditions

So far in this chapter, the relationship between the cell potential and reaction *spontaneity* has been described, suggesting a link to the free energy change for the reaction (see chapter on thermodynamics). The interpretation of potentials as measures of oxidant *strength* was presented, bringing to mind similar measures of acid-base strength as reflected in equilibrium constants (see the chapter on acid-base equilibria). This section provides a summary of the relationships between potential and the related thermodynamic properties ΔG and K.

## E° and ΔG°
The standard free energy change of a process, Δ*G*°, was defined in a previous chapter as the maximum work that could be performed by a system, *w*<sub>max</sub>. In the case of a redox reaction taking place within a galvanic cell under standard state conditions, essentially all the work is associated with transferring the electrons from reductant-to-oxidant, *w*<sub>elec</sub>:

$$ \text{Δ}G\text{°}={w}_{\text{max}}={w}_{\text{elec}} $$  {eq:fs-idm215765968}

The work associated with transferring electrons is determined by the total amount of charge (coulombs) transferred and the cell potential:

$$ \begin{array}{rll}\text{Δ}G\text{°}={w}_{\text{elec}} & = & \text{−}nF{E}_{\text{cell}}^{\text{°}} \\ \text{Δ}G\text{°} & = & \text{−}nF{E}_{\text{cell}}^{\text{°}}\end{array} $$  {eq:fs-idm655964560}

where *n* is the number of moles of electrons transferred, *F* is **Faraday’s constant**, and *E*°<sub>cell</sub> is the standard cell potential. TFaraday's constant is defined as the charge in coulombs of one mole of electrons, *F* = 96,485 C/mol e<sup>–</sup>.he relation between free energy change and standard cell potential confirms the sign conventions and spontaneity criteria previously discussed for both of these properties: spontaneous redox reactions exhibit positive potentials and negative free energy changes.

## E° and K
Combining a previously derived relation between ΔG° and K (see the chapter on thermodynamics) and the equation above relating ΔG° and *E*°<sub>cell</sub> yields the following:

$$ \begin{array}{rll}\text{Δ}G\text{°} & = & \text{−}RT\;\text{ln}\;K=\text{−}nF{E}_{\text{cell}}^{\text{°}} \\ {E}_{\text{cell}}^{\text{°}} & = & (\frac{RT}{nF})\;\text{ln}\;K\end{array} $$  {eq:fs-idm205421792}

This equation indicates redox reactions with large (positive) standard cell potentials will proceed far towards completion, reaching equilibrium when the majority of reactant has been converted to product. A summary of the relations between *E*°, Δ*G*° and *K* is depicted in [ref:CNX_Chem_17_04_Relation], and a table correlating reaction spontaneity to values of these properties is provided in [ref:fs-idm241340256].

> FIGURE {fig:CNX_Chem_17_04_Relation} src=../../media/CNX_Chem_17_04_Relation.jpg class=scaled-down
> alt: A diagram is shown that involves three double headed arrows positioned in the shape of an equilateral triangle. The vertices are labeled in red. The top vertex is labeled “K.“ The vertex at the lower left is labeled “delta G superscript degree symbol.” The vertex at the lower right is labeled “E superscript degree symbol subscript cell.” The right side of the triangle is labeled “E superscript degree symbol subscript cell equals ( R T divided by n  F ) l n K.” The lower side of the triangle is labeled “delta G superscript degree symbol equals negative n F E superscript degree symbol subscript cell.” The left side of the triangle is labeled “delta G superscript degree symbol equals negative R T l n K.”
> caption: Graphic depicting the relation between three important thermodynamic properties.

> TABLE {tab:fs-idm241340256} cols=4 irregular
> summary: No Summary

| *K* | Δ*G*° | *E*°<sub>cell</sub> |  |
| > 1 | < 0 | > 0 | Reaction is spontaneous under standard conditions <br>Products more abundant at equilibrium |
| < 1 | > 0 | < 0 | Reaction is non-spontaneous under standard conditions <br>Reactants more abundant at equilibrium |
| = 1 | = 0 | = 0 | Reaction is at equilibrium under standard conditions <br>Reactants and products equally abundant |

:::example {ex:fs-idp16667568} Equilibrium Constants, Standard Cell Potentials, and Standard Free Energy Changes
Use data from [Appendix L](module:m68870) to calculate the standard cell potential, standard free energy change, and equilibrium constant for the following reaction at 25 °C. Comment on the spontaneity of the forward reaction and the composition of an equilibrium mixture of reactants and products.

$$ 2{\text{Ag}}^{\text{+}}(aq)+\text{Fe}(s)\rightleftharpoons \text{2Ag}(s)+{\text{Fe}}^{2+}(aq) $$  {eq:fs-idm89214592}

**Solution**
The reaction involves an oxidation-reduction reaction, so the standard cell potential can be calculated using the data in [Appendix L](module:m68870).

$$ \begin{array}{llrll} \\ \text{anode (oxidation):} & \text{Fe}(s)\;\longrightarrow \;{\text{Fe}}^{2+}(aq)+{\text{2e}}^{\text{−}} & {E}_{{\text{Fe}}^{2+}\text{/Fe}}^{{}^{\circ}} & = & \text{−0.447 V} \\ \text{cathode (reduction):} & 2\;\times \;({\text{Ag}}^{\text{+}}(aq)+{\text{e}}^{\text{−}}\;\longrightarrow \;\text{Ag}(s)) & {E}_{{\text{Ag}}^{\text{+}}\text{/Ag}}^{{}^{\circ}} & = & \text{0.7996 V} \\ & {E}_{\text{cell}}^{{}^{\circ}}={E}_{\text{cathode}}^{{}^{\circ}}-{E}_{\text{anode}}^{{}^{\circ}}= & {E}_{{\text{Ag}}^{\text{+}}\text{/Ag}}^{{}^{\circ}}-{E}_{{\text{Fe}}^{2+}\text{/Fe}}^{{}^{\circ}} & = & \text{+1.247 V}\end{array} $$  {eq:fs-idm7297840}

With *n* = 2, the equilibrium constant is then

$$ \begin{array}{rll}{E}_{\text{cell}}^{{}^{\circ}} & = & \frac{\text{0.0592 V}}{n}\;\text{log}\;K \\ K & = & {10}^{n\;\times \;{E}_{\text{cell}}^{{}^{\circ}}\text{/}\text{0.0592 V}} \\ K & = & {10}^{2\;\times \;\text{1.247 V/0.0592 V}} \\ K & = & {10}^{42.128} \\ K & = & 1.3\;\times \;{10}^{42}\end{array} $$  {eq:fs-idp2572928}

The standard free energy is then

$$ \begin{array}{rll}\text{Δ}{G}^{{}^{\circ}} & = & \text{−}nF{E}_{\text{cell}}^{{}^{\circ}} \\ \text{Δ}G\text{°} & = & −2\;\times \;96,485\;\frac{\text{C}}{\text{mol}}\;\times \;1.247\;\frac{\text{J}}{\text{C}}=−240.6\;\frac{\text{kJ}}{\text{mol}}\end{array} $$  {eq:fs-idp126961280}

The reaction is spontaneous, as indicated by a negative free energy change and a positive cell potential. The *K* value is very large, indicating the reaction proceeds to near completion to yield an equilibrium mixture containing mostly products.
**Check Your Learning**
What is the standard free energy change and the equilibrium constant for the following reaction at room temperature? Is the reaction spontaneous?

$$ \text{Sn}(s)+2{\text{Cu}}^{2+}(aq)\rightleftharpoons {\text{Sn}}^{2+}(aq)+2{\text{Cu}}^{\text{+}}(aq) $$  {eq:fs-idp7040368}

:::note [answer] Answer:
Spontaneous; *n* = 2; ${E}_{\text{cell}}^{{}^{\circ}}=\text{+0.291 V};$ $\text{Δ}G\text{°}=−56.2\;\frac{\text{kJ}}{\text{mol}};$ *K* = 6.8 $\times$ 10<sup>9</sup>.
:::
:::

## Potentials at Nonstandard Conditions:  The Nernst Equation
Most of the redox processes that interest science and society do not occur under standard state conditions, and so the potentials of these systems under nonstandard conditions are a property worthy of attention. Having established the relationship between potential and free energy change in this section, the previously discussed relation between free energy change and reaction mixture composition can be used for this purpose.

$$ \text{Δ}G=\text{Δ}G\text{°}+RT\;\text{ln}\;Q $$  {eq:fs-idp76596960}

Notice the reaction quotient, *Q*, appears in this equation, making the free energy change dependent upon the composition of the reaction mixture. Substituting the equation relating free energy change to cell potential yields the {term:Nernst equation}:

$$ \text{−}nF{E}_{\text{cell}}=\text{−}nF{E}_{\text{cell}}^{{}^{\circ}}+RT\;\text{ln}\;Q $$  {eq:fs-idp17520176}

$$ {E}_{\text{cell}}={E}_{\text{cell}}^{{}^{\circ}}-\;\frac{RT}{nF}\;\text{ln}\;Q $$  {eq:fs-idm642366960}

This equation describes how the potential of a redox system (such as a galvanic cell) varies from its standard state value, specifically, showing it to be a function of the number of electrons transferred, *n*, the temperature, *T*, and the reaction mixture composition as reflected in *Q*. A convenient form of the Nernst equation for most work is one in which values for the fundamental constants (R and F) and standard temperature (298) K), along with a factor converting from natural to base-10 logarithms, have been included:

$$ {E}_{\text{cell}}={E}_{\text{cell}}^{{}^{\circ}}-\;\frac{0.0592\text{V}}{n}\;\text{log}\;Q $$  {eq:fs-idp195072512}

:::example {ex:fs-idm240817536} Predicting Redox Spontaneity Under Nonstandard Conditions
Use the Nernst equation to predict the spontaneity of the redox reaction shown below.

$$ \text{Co}(s)+{\text{Fe}}^{2+}(aq,\;1.94\;M)\;\longrightarrow \;{\text{Co}}^{2+}(aq\text{, 0.15}\;M)+\text{Fe}(s) $$  {eq:fs-idm365472}

**Solution**
Collecting information from [Appendix L](module:m68870) and the problem,

$$ \begin{array}{llrll} \\ \text{Anode (oxidation):} & \text{Co}(s)\;\longrightarrow \;{\text{Co}}^{2+}(aq)+{\text{2e}}^{\text{−}} & {E}_{{\text{Co}}^{2+}\text{/Co}}^{{}^{\circ}} & = & \text{−0.28 V} \\ \text{Cathode (reduction):} & {\text{Fe}}^{2+}(aq)+{\text{2e}}^{\text{−}}\;\longrightarrow \;\text{Fe}(s) & {E}_{{\text{Fe}}^{2+}\text{/Fe}}^{{}^{\circ}} & = & \text{−0.447 V} \\ & {E}_{\text{cell}}^{{}^{\circ}}={E}_{\text{cathode}}^{{}^{\circ}}-{E}_{\text{anode}}^{{}^{\circ}}= & \text{−0.447 V}-(\text{−0.28 V}) & = & \text{−0.17 V}\end{array} $$  {eq:fs-idp61630144}

Notice the negative value of the standard cell potential indicates the process is not spontaneous under standard conditions. Substitution of the Nernst equation terms for the nonstandard conditions yields:

$$ \begin{array}{rll}Q & = & \frac{{[\text{Co}}^{2+}]}{{[\text{Fe}}^{2+}]}\;=\;\frac{0.15\;M}{1.94\;M}\;=0.077 \\ {E}_{\text{cell}} & = & {E}_{\text{cell}}^{{}^{\circ}}-\;\frac{0.0592 V}{n}\;\text{log}\;Q \\ {E}_{\text{cell}} & = & −0.1\text{7 V}-\;\frac{0.0592 V}{2}\;\text{log}\;0.077 \\ {E}_{\text{cell}} & = & \text{−0.17 V}+0.033 V=−0.14 V\end{array} $$  {eq:fs-idp99119696}

The cell potential remains negative (slightly) under the specified conditions, and so the reaction remains nonspontaneous.
**Check Your Learning**
For the cell schematic below, identify values for *n* and *Q*, and calculate the cell potential, *E*<sub>cell</sub>.

$$ \text{Al}(s)\,|\,{\text{Al}}^{3+}(aq,\;0.15\;M)\,\|\,{\text{Cu}}^{2+}(aq,\;0.025\;M)\,|\,\text{Cu}(s) $$  {eq:fs-idp18135232}

:::note [answer] Answer:
*n* = 6; *Q* = 1440; *E*<sub>cell</sub> = +1.97 V, spontaneous.
:::
:::
A {term:concentration cell} is constructed by connecting two nearly identical half-cells, each based on the same half-reaction and using the same electrode, varying only in the concentration of one redox species. The potential of a concentration cell, therefore, is determined only by the difference in concentration of the chosen redox species. The example problem below illustrates the use of the Nernst equation in calculations involving concentration cells.

:::example {ex:fs-idp211103648} Concentration Cells
What is the cell potential of the concentration cell described by

$$ \text{Zn}(s)\,|\,{\text{Zn}}^{2+}(aq\text{, 0.10}\;M)\,\|\,{\text{Zn}}^{2+}(aq\text{, 0.50}\;M)\,|\,\text{Zn}(s) $$  {eq:fs-idp85858736}

**Solution**
From the information given:

$$ \begin{array}{l} \\ \underline{\begin{array}{llllllrll}\text{Anode:} & & & \text{Zn}(s)\;\longrightarrow \;{\text{Zn}}^{2+}(aq\text{, 0.10}\;M)+{\text{2e}}^{\text{−}} & & & {E}_{\text{anode}}^{{}^{\circ}} & = & \text{−0.7618 V} \\ \text{Cathode:} & & & {\text{Zn}}^{2+}(aq\text{, 0.50}\;M)+{\text{2e}}^{\text{−}}\;\longrightarrow \;\text{Zn}(s) & & & {E}_{\text{cathode}}^{{}^{\circ}} & = & \text{−0.7618 V}\end{array}} \\ \begin{array}{llllllrll}\text{Overall:} & & & {\text{Zn}}^{2+}(aq\text{, 0.50}\;M)\;\longrightarrow \;{\text{Zn}}^{2+}(aq\text{, 0.10}\;M) & & & {E}_{\text{cell}}^{{}^{\circ}} & = & \text{0.000 V}\end{array}\end{array} $$  {eq:fs-idp5275888}

Substituting into the Nernst equation,

$$ {E}_{\text{cell}}=\text{0.000 V}-\;\frac{\text{0.0592 V}}{2}\;\text{log}\;\frac{0.10}{0.50}\;=+0.021 V $$  {eq:fs-idp235695968}

The positive value for cell potential indicates the overall cell reaction (see above) is spontaneous. This spontaneous reaction is one in which the zinc ion concentration in the cathode falls (it is reduced to elemental zinc) while that in the anode rises (it is produced by oxidation of the zinc anode). A greater driving force for zinc reduction is present in the cathode, where the zinc(II) ion concentration is greater (*E*<sub>cathode</sub> > *E*<sub>anode</sub>).
**Check Your Learning**
The concentration cell above was allowed to operate until the cell reaction reached equilibrium. What are the cell potential and the concentrations of zinc(II) in each half-cell for the cell now?

:::note [answer] Answer:
*E*<sub>cell</sub> = 0.000 V; [Zn<sup>2+</sup>]<sub>cathode</sub> = [Zn<sup>2+</sup>]<sub>anode</sub> = 0.30 *M*
:::
:::

## Key Concepts and Summary {section:summary}
Potential is a thermodynamic quantity reflecting the intrinsic driving force of a redox process, and it is directly related to the free energy change and equilibrium constant for the process. For redox processes taking place in electrochemical cells, the maximum (electrical) work done by the system is easily computed from the cell potential and the reaction stoichiometry and is equal to the free energy change for the process. The equilibrium constant for a redox reaction is logarithmically related to the reaction’s cell potential, with larger (more positive) potentials indicating reactions with greater driving force that equilibrate when the reaction has proceeded far towards completion (large value of *K*). Finally, the potential of a redox process varies with the composition of the reaction mixture, being related to the reactions standard potential and the value of its reaction quotient, *Q*, as described by the Nernst equation.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| ${E}_{\text{cell}}^{{}^{\circ}}=\;\frac{RT}{nF}\;\text{ln}\;K$ |
| ${E}_{\text{cell}}^{{}^{\circ}}=\;\frac{0.02\text{57 V}}{n}\;\text{ln}\;K=\;\frac{0.0\text{592 V}}{n}\;\text{log}\;K\hspace{5em}(\text{at 298.15}\;K)$ |
| ${E}_{\text{cell}}={E}_{\text{cell}}^{{}^{\circ}}-\;\frac{RT}{nF}\;\text{ln}\;Q\hspace{5em}\text{(Nernst equation)}$ |
| ${E}_{\text{cell}}={E{}^{\circ}}_{\text{cell}}-\;\frac{0.0592 V}{n}\;\text{log}\;Q\hspace{5em}(\text{at 298.15}\;K)$ |
| Δ*G* = −*nFE*<sub>cell</sub> |
| $\text{Δ}{G}^{{}^{\circ}}=\text{−}nF{E}_{\text{cell}}^{{}^{\circ}}$ |
| ${w}_{\text{ele}}={w}_{\text{max}}=\text{−}nF{E}_{\text{cell}}$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp144244864} type= 
PROBLEM:
For each pair of standard cell potential and electron stoichiometry values below, calculate a corresponding standard free energy change (kJ).
(a) 0.000 V, n = 2
(b) +0.434 V, n = 2
(c) −2.439 V, n = 1
SOLUTION:
(a) 0 kJ/mol; (b) −83.7 kJ/mol; (c) +235.3 kJ/mol
:::

:::exercise {fs-idp27704096} type= 
PROBLEM:
For each pair of standard free energy change and electron stoichiometry values below, calculate a corresponding standard cell potential.
(a) 12 kJ/mol, n = 3
(b) −45 kJ/mol, n = 1
:::

:::exercise {fs-idm3860960} type= 
PROBLEM:
Determine the standard cell potential and the cell potential under the stated conditions for the electrochemical reactions described here. State whether each is spontaneous or nonspontaneous under each set of conditions at 298.15 K.
(a) $\text{Hg}(l)+{\text{S}}^{2−}(aq\text{, 0.10}\;M)+2{\text{Ag}}^{\text{+}}(aq\text{, 0.25}\;M)\;\longrightarrow \;2\text{Ag}(s)+\text{HgS}(s)$
(b) The cell made from an anode half-cell consisting of an aluminum electrode in 0.015 *M* aluminum nitrate solution and a cathode half-cell consisting of a nickel electrode in 0.25 *M* nickel(II) nitrate solution.
(c) The cell comprised of a half-cell in which aqueous bromide ion (1.0 *M*) is being oxidized to aqueous bromine (0.11 *M*) and a half-cell in which Al<sup>3+</sup> (0.023 *M*) is being reduced to aluminum metal.
SOLUTION:
(a) standard cell potential: 1.50 V, spontaneous; cell potential under stated conditions: 1.43 V, spontaneous; (b) standard cell potential: 1.405 V, spontaneous; cell potential under stated conditions: 1.423 V, spontaneous; (c) standard cell potential: −2.749 V, nonspontaneous; cell potential under stated conditions: −2.733 V, nonspontaneous
:::

:::exercise {fs-idp126191568} type= 
PROBLEM:
Determine Δ*G* and Δ*G*° for each of the reactions in the previous problem.
:::

:::exercise {fs-idp17461440} type= 
PROBLEM:
Use the data in [Appendix L](module:m68870) to calculate equilibrium constants for the following reactions. Assume 298.15 K if no temperature is given.
(a) $\text{AgCl}(s)\rightleftharpoons {\text{Ag}}^{\text{+}}(aq)+{\text{Cl}}^{\text{−}}(aq)$
(b) $\text{CdS}(s)\rightleftharpoons {\text{Cd}}^{2+}(aq)+{\text{S}}^{2−}(aq)\hspace{5em}\text{at 377 K}$
(c) ${\text{Hg}}^{2+}(aq)+4{\text{Br}}^{\text{−}}(aq)\rightleftharpoons {[{\text{HgBr}}_{4}]}^{2−}(aq)$
(d) ${\text{H}}_{2}\text{O}(l)\rightleftharpoons {\text{H}}^{\text{+}}(aq)+{\text{OH}}^{\text{−}}(aq)\hspace{5em}\text{at 25}\;{}^{\circ}\text{C}$
SOLUTION:
(a) 1.7 $\times$ 10<sup>−10</sup>; (b) 2.6 $\times$ 10<sup>−21</sup>; (c) 4.693 $\times$ 10<sup>21</sup>; (d) 1.0 $\times$ 10<sup>−14</sup>
:::

## Glossary
- {def} **concentration cell**: galvanic cell comprising half-cells of identical composition but for the concentration of one redox reactant or product
- {def} **Faraday’s constant (F)**: charge on 1 mol of electrons; *F* = 96,485 C/mol e<sup>−</sup>
- {def} **Nernst equation**: relating the potential of a redox system to its composition
