# Equilibrium Calculations

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Identify the changes in concentration or pressure that occur for chemical species in equilibrium systems
- Calculate equilibrium concentrations or pressures and equilibrium constants, using various algebraic approaches

Having covered the essential concepts of chemical equilibria in the preceding sections of this chapter, this final section will demonstrate the more practical aspect of using these concepts and appropriate mathematical strategies to perform various equilibrium calculations. These types of computations are essential to many areas of science and technology—for example, in the formulation and dosing of pharmaceutical products. After a drug is ingested or injected, it is typically involved in several chemical equilibria that affect its ultimate concentration in the body system of interest. Knowledge of the quantitative aspects of these equilibria is required to compute a dosage amount that will solicit the desired therapeutic effect.
Many of the useful equilibrium calculations that will be demonstrated here require terms representing changes in reactant and product concentrations. These terms are derived from the stoichiometry of the reaction, as illustrated by decomposition of ammonia:

$$ 2{\text{NH}}_{3}(g)\overset{}{\rightleftharpoons}{\text{N}}_{2}(g)+3{\text{H}}_{2}(g) $$  {eq:fs-idp2372544}

As shown earlier in this chapter, this equilibrium may be established within a sealed container that initially contains either NH<sub>3</sub> only, or a mixture of any two of the three chemical species involved in the equilibrium. Regardless of its initial composition, a reaction mixture will show the same relationships between changes in the concentrations of the three species involved, as dictated by the reaction stoichiometry (see also the related content on expressing reaction rates in the chapter on kinetics). For example, if the nitrogen concentration increases by an amount *x*:

$$ \text{Δ}[{\text{N}}_{2}]=+ x $$  {eq:fs-idp309373104}

the corresponding changes in the other species concentrations are

$$ \text{Δ}[{\text{H}}_{2}]=\text{Δ}[{\text{N}}_{2}](\frac{3\;\text{mol}\;{\text{H}}_{2}}{1\;\text{mol}\;{\text{N}}_{2}})=+3x $$  {eq:fs-idp117027920}

$$ \text{Δ}[{\text{NH}}_{3}]=\text{−}\text{Δ}[{\text{N}}_{2}](\frac{2\;\text{mol}\;{\text{NH}}_{3}}{1\;\text{mol}\;{\text{N}}_{2}})=−2x $$  {eq:fs-idp301878592}

where the negative sign indicates a decrease in concentration.

:::example {ex:fs-idp184218304} Determining Relative Changes in Concentration
Derive the missing terms representing concentration changes for each of the following reactions.
(a) $\begin{array}{llll}{\text{C}}_{2}{\text{H}}_{2}(g)+ & 2{\text{Br}}_{2}(g) & \rightleftharpoons & {\text{C}}_{2}{\text{H}}_{2}{\text{Br}}_{4}(g) \\ x & \_\_\_\_\_ & & \_\_\_\_\_\end{array}$
(b) $\begin{array}{llll}{\text{I}}_{2}(aq)+ & {\text{I}}^{\text{−}}(aq) & \rightleftharpoons & {\text{I}}_{3}{}^{\text{−}}(aq) \\ \_\_\_\_\_ & \_\_\_\_\_ & & x\end{array}$
(c) $\begin{array}{lllll}{\text{C}}_{3}{\text{H}}_{8}(g)+ & 5{\text{O}}_{2}(g) & \rightleftharpoons & 3{\text{CO}}_{2}(g)+ & 4{\text{H}}_{2}\text{O}(g) \\ x & \_\_\_\_\_ & & \_\_\_\_\_ & \_\_\_\_\_\end{array}$
**Solution**
(a) $\begin{array}{llll}{\text{C}}_{2}{\text{H}}_{2}(g)+ & 2{\text{Br}}_{2}(g) & \rightleftharpoons & {\text{C}}_{2}{\text{H}}_{2}{\text{Br}}_{4}(g) \\ x & 2x & & -x\end{array}$
(b) $\begin{array}{llll}{\text{I}}_{2}(aq)+ & {\text{I}}^{\text{−}}(aq) & \rightleftharpoons & {\text{I}}_{3}{}^{\text{−}}(aq) \\ -x & -x & & x\end{array}$
(c) $\begin{array}{lllll}{\text{C}}_{3}{\text{H}}_{8}(g)+ & 5{\text{O}}_{2}(g) & \rightleftharpoons & 3{\text{CO}}_{2}(g)+ & 4{\text{H}}_{2}\text{O}(g) \\ x & 5x & & −3x & −4x\end{array}$
**Check Your Learning**
Complete the changes in concentrations for each of the following reactions:
(a) $\begin{array}{llll}2{\text{SO}}_{2}(g)+ & {\text{O}}_{2}(g) & \rightleftharpoons & 2{\text{SO}}_{3}(g) \\ \_\_\_\_\_ & x & & \_\_\_\_\_\end{array}$
(b) $\begin{array}{lll}{\text{C}}_{4}{\text{H}}_{8}(g) & \rightleftharpoons & 2{\text{C}}_{2}{\text{H}}_{4}(g) \\ \_\_\_\_\_ & & −2x\end{array}$
(c) $\begin{array}{lllll}4{\text{NH}}_{3}(g)+ & 7{\text{O}}_{2}(g) & \rightleftharpoons & 4{\text{NO}}_{2}(g)+ & 6{\text{H}}_{2}\text{O}(g) \\ \\ \_\_\_\_\_ & \_\_\_\_\_ & & \_\_\_\_\_ & \_\_\_\_\_\end{array}$

:::note [answer] Answer:
(a) 2*x*, *x*, −2*x;* (b) *x*, −2*x;* (c) 4*x*, 7*x*, −4*x*, −6*x* or −4*x*, −7*x*, 4*x*, 6*x*
:::
:::

## Calculation of an Equilibrium Constant
The equilibrium constant for a reaction is calculated from the equilibrium concentrations (or pressures) of its reactants and products. If these concentrations are known, the calculation simply involves their substitution into the K expression, as was illustrated by [ref:fs-idp54423808](module:m68798). A slightly more challenging example is provided next, in which the reaction stoichiometry is used to derive equilibrium concentrations from the information provided. The basic strategy of this computation is helpful for many types of equilibrium computations and relies on the use of terms for the reactant and product concentrations *initially* present, for how they *change* as the reaction proceeds, and for what they are when the system reaches *equilibrium*. The acronym ICE is commonly used to refer to this mathematical approach, and the concentrations terms are usually gathered in a tabular format called an ICE table.

:::example {ex:fs-idp157656016} Calculation of an Equilibrium Constant
Iodine molecules react reversibly with iodide ions to produce triiodide ions.

$$ {\text{I}}_{2}(aq)+{\text{I}}^{\text{−}}(aq)\rightleftharpoons {\text{I}}_{3}{}^{\text{−}}(aq) $$  {eq:fs-idp73967168}

If a solution with the concentrations of I<sub>2</sub> and I<sup>−</sup> both equal to 1.000 $\times$ 10<sup>−3</sup> *M* before reaction gives an equilibrium concentration of I<sub>2</sub> of 6.61 $\times$ 10<sup>−4</sup> *M*, what is the equilibrium constant for the reaction?
**Solution**
To calculate the equilibrium constants, equilibrium concentrations are needed for all the reactants and products:

$$ {K}_{C}=\frac{[{{\text{I}}_{3}}^{-}]}{[{\text{I}}_{2}][{\text{I}}^{\text{−}}]} $$  {eq:fs-idm215755504}

Provided are the initial concentrations of the reactants and the equilibrium concentration of the product.  Use this information to derive terms for the equilibrium concentrations of the reactants, presenting all the information in an ICE table.

> IMAGE {img:fs-idp68301536} src=../../media/CNX_Chem_13_04_ICETable1_img.jpg class=scaled-down
> alt: This table has two main columns and four rows. The first row for the first column does not have a heading and then has the following in the first column: Initial concentration ( M ), Change ( M ), Equilibrium concentration ( M ). The second column has the header, “I subscript 2 plus sign I superscript negative sign equilibrium arrow I subscript 3 superscript negative sign.” Under the second column is a subgroup of three rows and three columns. The first column has the following: 1.000 times 10 to the negative third power, negative x, [ I subscript 2 ] subscript i minus x. The second column has the following: 1.000 times 10 to the negative third power, negative x, [ I superscript negative sign ] subscript i minus x. The third column has the following: 0, positive x, [ I superscript negative sign ] subscript i plus x.

At equilibrium the concentration of I<sub>2</sub> is 6.61 $\times$ 10<sup>−4</sup> *M* so that

$$ 1.000\;\times \;{10}^{−3}-x=6.61\;\times \;{10}^{−4} $$  {eq:fs-idp119575776}

$$ x=1.000\;\times \;{10}^{−3}-6.61\;\times \;{10}^{−4} $$  {eq:fs-idp120750608}

$$ =3.39\;\times \;{10}^{−4}\;M $$  {eq:fs-idp8604640}

The ICE table may now be updated with numerical values for all its concentrations:

> IMAGE {img:fs-idp182836896} src=../../media/CNX_Chem_13_04_ICETable2_img.jpg class=scaled-down
> alt: This table has two main columns and four rows. The first row for the first column does not have a heading and then has the following in the first column: Initial concentration ( M ), Change ( M ), Equilibrium concentration ( M ). The second column has the header, “I subscript 2 plus sign I superscript negative sign equilibrium arrow I subscript 3 superscript negative sign.” Under the second column is a subgroup of three rows and three columns. The first column has the following: 1.000 times 10 to the negative third power, negative 3.39 times 10 to the negative fourth power, 6.61 times 10 to the negative fourth power. The second column has the following: 1.000 times 10 to the negative third power, negative 3.39 times 10 to the negative fourth power, 6.61 times 10 to the negative fourth power. The third column has the following: 0, positive 3.39 times 10 to the negative fourth power, 3.39 times 10 to the negative fourth power.

Finally, substitute the equilibrium concentrations into the *K* expression and solve:

$$ {K}_{c}=\frac{[{\text{I}}_{3}{}^{\text{−}}]}{[{\text{I}}_{2}][{\text{I}}^{\text{−}}]} $$  {eq:fs-idp140787760}

$$ =\;\frac{3.39\;\times \;{10}^{−4}\;M}{(6.61\;\times \;{10}^{−4}\;M)(6.61\;\times \;{10}^{−4}\;M)}\;=776 $$  {eq:fs-idp97785984}

**Check Your Learning**
Ethanol and acetic acid react and form water and ethyl acetate, the solvent responsible for the odor of some nail polish removers.

$$ {\text{C}}_{2}{\text{H}}_{5}\text{OH}+{\text{CH}}_{3}{\text{CO}}_{2}\text{H}\rightleftharpoons {\text{CH}}_{3}{\text{CO}}_{2}{\text{C}}_{2}{\text{H}}_{5}+{\text{H}}_{2}\text{O} $$  {eq:fs-idp343410432}

When 1 mol each of C<sub>2</sub>H<sub>5</sub>OH and CH<sub>3</sub>CO<sub>2</sub>H are allowed to react in 1 L of the solvent dioxane, equilibrium is established when $\frac{1}{3}$ mol of each of the reactants remains. Calculate the equilibrium constant for the reaction. (Note: Water is a solute in this reaction.)

:::note [answer] Answer:
*K<sub>c</sub>* = 4
:::
:::

## Calculation of a Missing Equilibrium Concentration
When the equilibrium constant and all but one equilibrium concentration are provided, the other equilibrium concentration(s) may be calculated. A computation of this sort is illustrated in the next example exercise.

:::example {ex:fs-idp69595744} Calculation of a Missing Equilibrium Concentration
Nitrogen oxides are air pollutants produced by the reaction of nitrogen and oxygen at high temperatures. At 2000 °C, the value of the *K<sub>c</sub>* for the reaction, ${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\rightleftharpoons 2\text{NO}(g),$ is 4.1 $\times$ 10<sup>−4</sup>. Calculate the equilibrium concentration of NO(*g*) in air at 1 atm pressure and 2000 °C.  The equilibrium concentrations of N<sub>2</sub> and O<sub>2</sub> at this pressure and temperature are 0.036 M and 0.0089 M, respectively.
**Solution**
Substitute the provided quantities into the equilibrium constant expression and solve for [NO]:

$$ {K}_{c}=\frac{{[\text{NO}]}^{2}}{[{\text{N}}_{2}]\;[{\text{O}}_{2}]} $$  {eq:fs-idp57551600}

$$ {[\text{NO}]}^{2}={K}_{c}[{\text{N}}_{2}]\;[{\text{O}}_{2}] $$  {eq:fs-idp68622944}

$$ [\text{NO}]=\;\sqrt{{K}_{c}[{\text{N}}_{2}]\;[{\text{O}}_{2}]} $$  {eq:fs-idp146257328}

$$ =\;\sqrt{(4.1\;\times \;{10}^{−4})(0.036)(0.0089)} $$  {eq:fs-idp60894832}

$$ =\;\sqrt{1.31\;\times \;{10}^{−7}} $$  {eq:fs-idp334861312}

$$ =3.6\;\times \;{10}^{−4} $$  {eq:fs-idp166439104}

Thus [NO] is 3.6 $\times$ 10<sup>−4</sup> mol/L at equilibrium under these conditions.
To confirm this result, it may be used along with the provided equilibrium concentrations to calculate a value for *K*:

$$ {K}_{c}=\;\frac{{[\text{NO}]}^{2}}{[{\text{N}}_{2}]\;[{\text{O}}_{2}]} $$  {eq:fs-idp71208832}

$$ =\;\frac{{(3.6\;\times \;{10}^{−4})}^{2}}{(0.036)(0.0089)} $$  {eq:fs-idp217492240}

$$ =4.0\;\times \;{10}^{−4} $$  {eq:fs-idp175632608}

This result is consistent with the provided value for *K* within nominal uncertainty, differing by just 1 in the least significant digit’s place.
**Check Your Learning**
The equilibrium constant *K<sub>c</sub>* for the reaction of nitrogen and hydrogen to produce ammonia at a certain temperature is 6.00 $\times$ 10<sup>−2</sup>. Calculate the equilibrium concentration of ammonia if the equilibrium concentrations of nitrogen and hydrogen are 4.26 *M* and 2.09 *M*, respectively.

:::note [answer] Answer:
1.53 mol/L
:::
:::

## Calculation of Equilibrium Concentrations from Initial Concentrations
Perhaps the most challenging type of equilibrium calculation can be one in which equilibrium concentrations are derived from initial concentrations and an equilibrium constant. For these calculations, a four-step approach is typically useful:
1. Identify the direction in which the reaction will proceed to reach equilibrium.
2. Develop an ICE table.
3. Calculate the concentration changes and, subsequently, the equilibrium concentrations.
4. Confirm the calculated equilibrium concentrations.
The last two example exercises of this chapter demonstrate the application of this strategy.

:::example {ex:fs-idp88215808} Calculation of Equilibrium Concentrations
Under certain conditions, the equilibrium constant *K<sub>c</sub>* for the decomposition of PCl<sub>5</sub>(*g*) into PCl<sub>3</sub>(*g*) and Cl<sub>2</sub>(*g*) is 0.0211. What are the equilibrium concentrations of PCl<sub>5</sub>, PCl<sub>3</sub>, and Cl<sub>2</sub> in a mixture that initially contained only PCl<sub>5</sub> at a concentration of 1.00 *M*?
**Solution**
Use the stepwise process described earlier.
1. *Determine the direction the reaction proceeds.*
The balanced equation for the decomposition of PCl<sub>5</sub> is

$$ {\text{PCl}}_{5}(g)\rightleftharpoons {\text{PCl}}_{3}(g)+{\text{Cl}}_{2}(g) $$  {eq:fs-idp154661952}

Because only the reactant is present initially *Q<sub>c</sub>* = 0 and the reaction will proceed to the right.
2. *Develop an ICE table.*

> IMAGE {img:fs-idp123608720} src=../../media/CNX_Chem_13_04_ICETable3_img.jpg class=scaled-down
> alt: This table has two main columns and four rows. The first row for the first column does not have a heading and then has the following in the first column: Initial concentration ( M ), Change ( M ), Equilibrium concentration ( M ). The second column has the header, “P C l subscript 5 equilibrium arrow P C l subscript 3 plus C l subscript 2.” Under the second column is a subgroup of three rows and three columns. The first column has the following: 1.00, negative x, 1.00 minus x. The second column has the following: 0, positive x, x. The third column has the following: 0, positive x, x.

3. *Solve for the change and the equilibrium concentrations.*
Substituting the equilibrium concentrations into the equilibrium constant equation gives

$$ {K}_{c}=\;\frac{[{\text{PCl}}_{3}][{\text{Cl}}_{2}]}{[{\text{PCl}}_{5}]}\;=0.0211 $$  {eq:fs-idp164721504}

$$ =\;\frac{(x)(x)}{(1.00-x)} $$  {eq:fs-idp53365296}

$$ 0.0211=\;\frac{(x)(x)}{(1.00-x)} $$  {eq:fs-idp149459776}

$$ 0.0211(1.00-x)={x}^{2} $$  {eq:fs-idp140218208}

$$ {x}^{2}+0.0211x-0.0211=0 $$  {eq:fs-idp163277840}

[Appendix B](module:m68860) shows an equation of the form *ax*<sup>2</sup> + *bx* + *c* = 0 can be rearranged to solve for *x*:

$$ x=\;\frac{-b\;\pm \;\sqrt{{b}^{2}-4ac}}{2a} $$  {eq:fs-idp334007984}

In this case, *a* = 1, *b* = 0.0211, and *c* = −0.0211. Substituting the appropriate values for *a*, *b*, and *c* yields:

$$ x=\;\frac{-0.0211\;\pm \;\sqrt{{(0.0211)}^{2}-4(1)(−0.0211)}}{2(1)} $$  {eq:fs-idp226282512}

$$ =\;\frac{-0.0211\;\pm \;\sqrt{(4.45\;\times \;{10}^{−4})+(8.44\;\times \;{10}^{−2})}}{2} $$  {eq:fs-idp87874832}

$$ =\;\frac{-0.0211\;\pm \;0.291}{2} $$  {eq:fs-idp272647552}

The two roots of the quadratic are, therefore,

$$ x=\;\frac{-0.0211+0.291}{2}\;=0.135 $$  {eq:fs-idp157645520}

and

$$ x=\;\frac{-0.0211-0.291}{2}\;=−0.156 $$  {eq:fs-idp43934576}

For this scenario, only the positive root is physically meaningful (concentrations are either zero or positive), and so *x* = 0.135 *M*.
The equilibrium concentrations are

$$ [{\text{PCl}}_{5}]\;=\;1.00-0.135=0.87\;M $$  {eq:fs-idp178654352}

$$ [{\text{PCl}}_{3}]=x=0.135\;M $$  {eq:fs-idp220490768}

$$ [{\text{Cl}}_{2}]=x=0.135\;M $$  {eq:fs-idp86894240}

4. *Confirm the calculated equilibrium concentrations.*
Substitution into the expression for *K<sub>c</sub>* (to check the calculation) gives

$$ {K}_{c}=\;\frac{[{\text{PCl}}_{3}][{\text{Cl}}_{2}]}{[{\text{PCl}}_{5}]}=\;\frac{(0.135)(0.135)}{0.87}\;=0.021 $$  {eq:fs-idp129485024}

The equilibrium constant calculated from the equilibrium concentrations is equal to the value of *K<sub>c</sub>* given in the problem (when rounded to the proper number of significant figures).
**Check Your Learning**
Acetic acid, CH<sub>3</sub>CO<sub>2</sub>H, reacts with ethanol, C<sub>2</sub>H<sub>5</sub>OH, to form water and ethyl acetate, CH<sub>3</sub>CO<sub>2</sub>C<sub>2</sub>H<sub>5</sub>.

$$ {\text{CH}}_{3}{\text{CO}}_{2}\text{H}+{\text{C}}_{2}{\text{H}}_{5}\text{OH}\rightleftharpoons {\text{CH}}_{3}{\text{CO}}_{2}{\text{C}}_{2}{\text{H}}_{5}+{\text{H}}_{2}\text{O} $$  {eq:fs-idp176324304}

The equilibrium constant for this reaction with dioxane as a solvent is 4.0. What are the equilibrium concentrations for a mixture that is initially 0.15 *M* in CH<sub>3</sub>CO<sub>2</sub>H, 0.15 *M* in C<sub>2</sub>H<sub>5</sub>OH, 0.40 *M* in CH<sub>3</sub>CO<sub>2</sub>C<sub>2</sub>H<sub>5</sub>, and 0.40 *M* in H<sub>2</sub>O?

:::note [answer] Answer:
[CH<sub>3</sub>CO<sub>2</sub>H] = 0.18 *M*, [C<sub>2</sub>H<sub>5</sub>OH] = 0.18 *M*, [CH<sub>3</sub>CO<sub>2</sub>C<sub>2</sub>H<sub>5</sub>] = 0.37 *M*, [H<sub>2</sub>O] = 0.37 *M*
:::
**Check Your Learning**
A 1.00-L flask is filled with 1.00 mole of H<sub>2</sub> and 2.00 moles of I<sub>2</sub>. The value of the equilibrium constant for the reaction of hydrogen and iodine reacting to form hydrogen iodide is 50.5 under the given conditions. What are the equilibrium concentrations of H<sub>2</sub>, I<sub>2</sub>, and HI in moles/L?

$$ {\text{H}}_{2}(g)+{\text{I}}_{2}(g)\rightleftharpoons 2\text{HI}(g) $$  {eq:fs-idp140225920}

:::note [answer] Answer:
[H<sub>2</sub>] = 0.06 *M*, [I<sub>2</sub>] = 1.06 *M*, [HI] = 1.88 *M*
:::
:::

:::example {ex:fs-idm94442464} Calculation of Equilibrium Concentrations Using an Algebra-Simplifying Assumption
What are the concentrations at equilibrium of a 0.15 *M* solution of HCN?

$$ \text{HCN}(aq)\;\rightleftharpoons \;{\text{H}}^{\text{+}}(aq)+{\text{CN}}^{\text{−}}(aq)\hspace{5em}{K}_{c}=4.9\;\times \;{10}^{\text{−10}} $$  {eq:fs-idm7657280}

**Solution**
Using “*x*” to represent the concentration of each product at equilibrium gives this ICE table.

> IMAGE {img:fs-idm90952112} src=../../media/CNX_Chem_13_04_ICETable30_img.jpg class=scaled-down
> alt: This table has two main columns and four rows. The first row for the first column does not have a heading and then has the following: Initial pressure ( M ), Change ( M ), Equilibrium ( M ). The second column has the header, “H C N ( a q ) equilibrium arrow H superscript plus sign ( a q ) plus C N subscript negative sign ( a q ).” Under the second column is a subgroup of three columns and three rows. The first column has the following: 0.15, negative x, 0.15 minus x. The second column has the following: 0, positive x, x. The third column has the following: 0, positive x, x.

Substitute the equilibrium concentration terms into the *K<sub>c</sub>* expression

$$ {K}_{c}=\frac{(x)(x)}{0.15-x} $$  {eq:fs-idp73418848}

rearrange to the quadratic form and solve for *x*

$$ {x}^{2}+4.9\;\times \;{10}^{\text{−10}}x-7.35\;\times \;{10}^{\text{−11}}=0 $$  {eq:fs-idm107468128}

$$ x=8.56\;\times \;{10}^{\text{−6}}\;M\;(\text{3 sig. figs.})=8.6\;\times \;{10}^{\text{−6}}\;M\;(\text{2 sig. figs.}) $$  {eq:fs-idp64062640}

Thus [H<sup>+</sup>] = [CN<sup>–</sup>] = *x* = 8.6 $\times$ 10<sup>–6</sup> *M* and [HCN] = 0.15 – *x* = 0.15 *M*.
Note in this case that the change in concentration is significantly less than the initial concentration (a consequence of the small *K*), and so the initial concentration experiences a negligible change:

$$ \text{if}\;x\;\ll \;0.15\;\text{M},\;\text{then}\;(0.15-x)\approx 0.15 $$  {eq:fs-idm475573296}

This approximation allows for a more expedient mathematical approach to the calculation that avoids the need to solve for the roots of a quadratic equation:

$$ {K}_{c}=\;\frac{(x)(x)}{0.15-x}\;\approx \;\frac{{x}^{2}}{0.15} $$  {eq:fs-idm85563776}

$$ 4.9\;\times \;{10}^{\text{−10}}=\;\frac{{x}^{2}}{0.15} $$  {eq:fs-idm30961472}

$$ {x}^{2}=(0.15)(4.9\;\times \;{10}^{\text{−10}})=7.4\;\times \;{10}^{\text{−11}} $$  {eq:fs-idp78338656}

$$ x=\sqrt{7.4\;\times \;{10}^{\text{−11}}}=8.6\;\times \;{10}^{\text{−6}}\;M $$  {eq:fs-idm27824720}

The value of *x* calculated is, indeed, much less than the initial concentration

$$ 8.6\;\times \;{10}^{−6}\ll 0.15 $$  {eq:fs-idm477300048}

and so the approximation was justified. If this simplified approach were to yield a value for *x* that did *not* justify the approximation, the calculation would need to be repeated without making the approximation.
**Check Your Learning**
What are the equilibrium concentrations in a 0.25 *M* NH<sub>3</sub> solution?

$$ {\text{NH}}_{3}(aq)+{\text{H}}_{2}\text{O}(l)\;\rightleftharpoons \;{\text{NH}}_{4}{}^{\text{+}}(aq)+{\text{OH}}^{\text{−}}(aq)\hspace{5em}{K}_{\text{c}}=1.8\;\times \;{10}^{\text{−5}} $$  {eq:fs-idm103584160}

:::note [answer] Answer:
$[{\text{OH}}^{\text{−}}]=[{\text{NH}}_{4}{}^{\text{+}}]=0.0021\;M;$ [NH<sub>3</sub>] = 0.25 *M*
:::
:::

## Key Concepts and Summary {section:summary}
Calculating values for equilibrium constants and/or equilibrium concentrations is of practical benefit to many applications. A mathematical strategy that uses initial concentrations, changes in concentrations, and equilibrium concentrations (and goes by the acronym ICE) is useful for several types of equilibrium calculations.

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp78773232} type= 
PROBLEM:
A reaction is represented by this equation: $\text{A}(aq)+2\text{B}(aq)\rightleftharpoons 2\text{C}(aq)\hspace{5em}{K}_{c}=1\;\times \;{10}^{3}$
(a) Write the mathematical expression for the equilibrium constant.
(b) Using concentrations ≤1 *M*, identify two sets of concentrations that describe a mixture of A, B, and C at equilibrium.
SOLUTION:
${K}_{c}=\;\frac{{[\text{C}]}^{2}}{[\text{A}]{[\text{B}]}^{2}}.$ [A] = 0.1 *M*, [B] = 0.1 *M*, [C] = 1 *M*; and [A] = 0.01, [B] = 0.250, [C] = 0.791.
:::

:::exercise {fs-idp235853120} type= 
PROBLEM:
A reaction is represented by this equation: $2\text{W}(aq)\rightleftharpoons \text{X}(aq)+2\text{Y}(aq)\hspace{5em}{K}_{c}=5\;\times \;{10}^{−4}$
(a) Write the mathematical expression for the equilibrium constant.
(b) Using concentrations of ≤1 *M*, identify two sets of concentrations that describe a mixture of W, X, and Y at equilibrium.
:::

:::exercise {fs-idp288474752} type= 
PROBLEM:
What is the value of the equilibrium constant at 500 °C for the formation of NH<sub>3</sub> according to the following equation?
${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\rightleftharpoons 2{\text{NH}}_{3}(g)$
An equilibrium mixture of NH<sub>3</sub>(*g*), H<sub>2</sub>(*g*), and N<sub>2</sub>(*g*) at 500 °C was found to contain 1.35 *M* H<sub>2</sub>, 1.15 *M* N<sub>2</sub>, and 4.12 $\times$ 10<sup>−1</sup> *M* NH<sub>3</sub>.
SOLUTION:
*K<sub>c</sub>* = 6.00 $\times$ 10<sup>−2</sup>
:::

:::exercise {fs-idp220009680} type= 
PROBLEM:
Hydrogen is prepared commercially by the reaction of methane and water vapor at elevated temperatures.
${\text{CH}}_{4}(g)+{\text{H}}_{2}\text{O}(g)\rightleftharpoons 3{\text{H}}_{2}(g)+\text{CO}(g)$
What is the equilibrium constant for the reaction if a mixture at equilibrium contains gases with the following concentrations: CH<sub>4</sub>, 0.126 *M*; H<sub>2</sub>O, 0.242 *M*; CO, 0.126 *M*; H<sub>2</sub> 1.15 *M*, at a temperature of 760 °C?
:::

:::exercise {fs-idp343440336} type= 
PROBLEM:
A 0.72-mol sample of PCl<sub>5</sub> is put into a 1.00-L vessel and heated. At equilibrium, the vessel contains 0.40 mol of PCl<sub>3</sub>(*g*) and 0.40 mol of Cl<sub>2</sub>(*g*). Calculate the value of the equilibrium constant for the decomposition of PCl<sub>5</sub> to PCl<sub>3</sub> and Cl<sub>2</sub> at this temperature.
SOLUTION:
*K<sub>c</sub>* = 0.50
:::

:::exercise {fs-idp99340080} type= 
PROBLEM:
At 1 atm and 25 °C, NO<sub>2</sub> with an initial concentration of 1.00 *M* is 0.0033% decomposed into NO and O<sub>2</sub>. Calculate the value of the equilibrium constant for the reaction.
$2{\text{NO}}_{2}(g)\rightleftharpoons 2\text{NO}(g)+{\text{O}}_{2}(g)$
:::

:::exercise {fs-idp70745776} type= 
PROBLEM:
Calculate the value of the equilibrium constant *K<sub>P</sub>* for the reaction $2\text{NO}(g)+{\text{Cl}}_{2}(g)\rightleftharpoons 2\text{NOCl}(g)$ from these equilibrium pressures: NO, 0.050 atm; Cl<sub>2</sub>, 0.30 atm; NOCl, 1.2 atm.
SOLUTION:
*K<sub>P</sub>* = 1.9 $\times$ 10<sup>3</sup>
:::

:::exercise {fs-idp95397216} type= 
PROBLEM:
When heated, iodine vapor dissociates according to this equation:
${\text{I}}_{2}(g)\rightleftharpoons 2\text{I}(g)$
At 1274 K, a sample exhibits a partial pressure of I<sub>2</sub> of 0.1122 atm and a partial pressure due to I atoms of 0.1378 atm. Determine the value of the equilibrium constant, *K<sub>P</sub>*, for the decomposition at 1274 K.
:::

:::exercise {fs-idp148498768} type= 
PROBLEM:
A sample of ammonium chloride was heated in a closed container.
${\text{NH}}_{4}\text{Cl}(s)\rightleftharpoons {\text{NH}}_{3}(g)+\text{HCl}(g)$
At equilibrium, the pressure of NH<sub>3</sub>(*g*) was found to be 1.75 atm. What is the value of the equilibrium constant *K<sub>P</sub>* for the decomposition at this temperature?
SOLUTION:
*K<sub>P</sub>* = 3.06
:::

:::exercise {fs-idp165909856} type= 
PROBLEM:
At a temperature of 60 °C, the vapor pressure of water is 0.196 atm. What is the value of the equilibrium constant *K<sub>P</sub>* for the vaporization equilibrium at 60 °C?
${\text{H}}_{2}\text{O}(l)\rightleftharpoons {\text{H}}_{2}\text{O}(g)$
:::

:::exercise {fs-idp189641568} type= 
PROBLEM:
Complete the following partial ICE tables.
(a)
$\begin{array}{lllll} & 2{\text{SO}}_{3}(g) & \rightleftharpoons & 2{\text{SO}}_{2}(g)+ & {\text{O}}_{2}(g) \\ \text{change} & \text{\_\_\_} & & \text{\_\_\_} & +x\end{array}$
(b)
$\begin{array}{llllll} & 4{\text{NH}}_{3}(g) & +\;3{\text{O}}_{2}(g) & \rightleftharpoons & 2{\text{N}}_{2}(g)+ & 6{\text{H}}_{2}\text{O}(g) \\ \text{change} & \text{\_\_\_} & +x & & \text{\_\_\_} & \text{\_\_\_}\end{array}$
(c)
$\begin{array}{lllll} & 2{\text{CH}}_{4}(g) & \rightleftharpoons & {\text{C}}_{2}{\text{H}}_{2}(g)+ & 3{\text{H}}_{2}(g) \\ \text{change} & \text{\_\_\_} & & +x & \text{\_\_\_}\end{array}$
(d)
$\begin{array}{llllll} & {\text{CH}}_{4}(g)+ & {\text{H}}_{2}\text{O}(g) & \rightleftharpoons & \text{CO}(g)+ & 3{\text{H}}_{2}(g) \\ \text{change} & \text{\_\_\_} & +x & & \text{\_\_\_} & \text{\_\_\_}\end{array}$
(e)
$\begin{array}{llll}{\text{NH}}_{4}\text{Cl}(s) & \rightleftharpoons & {\text{NH}}_{3}(g)+ & \text{HCl}(g) \\ \text{change} & & +x & \text{\_\_\_}\end{array}$
(f)
$\begin{array}{llll}\text{Ni}(s)+ & 4\text{CO}(g) & \rightleftharpoons & \text{Ni}{(\text{CO})}_{4}(g) \\ \text{change} & +x & & \text{\_\_\_}\end{array}$
SOLUTION:
(a) −2*x*, +2*x*; (b) $\frac{4}{3}x$, $-\frac{2}{3}x$, −2*x*; (c) −2*x*, 3*x*; (d) *x*, –*x*, −3*x*; (e) +*x*; (f) $-\frac{1}{4}x$
:::

:::exercise {fs-idp155255936} type= 
PROBLEM:
Complete the following partial ICE tables.
(a)
$\begin{array}{lllll} & 2{\text{H}}_{2}(g)+ & {\text{O}}_{2}(g) & \rightleftharpoons & 2{\text{H}}_{2}\text{O}(g) \\ \text{change} & \text{\_\_\_} & \text{\_\_\_} & & +x\end{array}$
(b)
$\begin{array}{llllll} & {\text{CS}}_{2}(g)+ & 4{\text{H}}_{2}(g) & \rightleftharpoons & {\text{CH}}_{4}(g)+ & 2{\text{H}}_{2}\text{S}(g) \\ \text{change} & +x & \text{\_\_\_} & & \text{\_\_\_} & \text{\_\_\_}\end{array}$
(c)
$\begin{array}{lllll} & {\text{H}}_{2}(g)+ & {\text{Cl}}_{2}(g) & \rightleftharpoons & 2\text{HCl}(g) \\ \text{change} & +x & \text{\_\_\_} & & \text{\_\_\_}\end{array}$
(d)
$\begin{array}{llllll} & 2{\text{NH}}_{3}(g) & +\;2{\text{O}}_{2}(g) & \rightleftharpoons & {\text{N}}_{2}\text{O}(g)+ & 3{\text{H}}_{2}\text{O}(g) \\ \text{change} & \text{\_\_\_} & \text{\_\_\_} & & \text{\_\_\_} & +x\end{array}$
(e)
$\begin{array}{llll}{\text{NH}}_{4}\text{HS}(s) & \rightleftharpoons & {\text{NH}}_{3}(g)+ & {\text{H}}_{2}\text{S}(g) \\ \text{change} & & +x & \text{\_\_\_}\end{array}$
(f)
$\begin{array}{llll}\text{Fe}(s)+ & 5\text{CO}(g) & \rightleftharpoons & \text{Fe}{(\text{CO})}_{5}(g) \\ \text{change} & \text{\_\_\_} & & +x\end{array}$
:::

:::exercise {fs-idp116788016} type= 
PROBLEM:
Why are there no changes specified for Ni in [ref:fs-idp189641568], part (f)? What property of Ni does change?
SOLUTION:
Activities of pure crystalline solids equal 1 and are constant; however, the mass of Ni does change.
:::

:::exercise {fs-idp76682304} type= 
PROBLEM:
Why are there no changes specified for NH<sub>4</sub>HS in [ref:fs-idp155255936], part (e)? What property of NH<sub>4</sub>HS does change?
:::

:::exercise {fs-idp99980832} type= 
PROBLEM:
Analysis of the gases in a sealed reaction vessel containing NH<sub>3</sub>, N<sub>2</sub>, and H<sub>2</sub> at equilibrium at 400 °C established the concentration of N<sub>2</sub> to be 1.2 *M* and the concentration of H<sub>2</sub> to be 0.24 *M*.
${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\rightleftharpoons 2{\text{NH}}_{3}(g)\hspace{5em}{K}_{c}=0.50\;\text{at}\;400\;\text{°}\text{C}$
Calculate the equilibrium molar concentration of NH<sub>3</sub>.
SOLUTION:
[NH<sub>3</sub>] = 9.1 $\times$ 10<sup>−2</sup> *M*
:::

:::exercise {fs-idp120770528} type= 
PROBLEM:
Calculate the number of moles of HI that are at equilibrium with 1.25 mol of H<sub>2</sub> and 1.25 mol of I<sub>2</sub> in a 5.00−L flask at 448 °C.
${\text{H}}_{2}+{\text{I}}_{2}\rightleftharpoons 2\text{HI}\hspace{5em}{K}_{c}=50.2\;\text{at}\;448\;\text{°}\text{C}$
:::

:::exercise {fs-idp316125088} type= 
PROBLEM:
What is the pressure of BrCl in an equilibrium mixture of Cl<sub>2</sub>, Br<sub>2</sub>, and BrCl if the pressure of Cl<sub>2</sub> in the mixture is 0.115 atm and the pressure of Br<sub>2</sub> in the mixture is 0.450 atm?
${\text{Cl}}_{2}(g)+{\text{Br}}_{2}(g)\rightleftharpoons 2\text{BrCl}(g)\hspace{5em}{K}_{P}=4.7\;\times \;{10}^{−2}$
SOLUTION:
*P*<sub>BrCl</sub> = 4.9 $\times$ 10<sup>−2</sup> atm
:::

:::exercise {fs-idp193760224} type= 
PROBLEM:
What is the pressure of CO<sub>2</sub> in a mixture at equilibrium that contains 0.50 atm H<sub>2</sub>, 2.0 atm of H<sub>2</sub>O, and 1.0 atm of CO at 990 °C?
${\text{H}}_{2}(g)+{\text{CO}}_{2}(g)\rightleftharpoons {\text{H}}_{2}\text{O}(g)+\text{CO}(g)\hspace{5em}{K}_{P}=1.6\;\text{at}\;990\;\text{°C}$
:::

:::exercise {fs-idp170146416} type= 
PROBLEM:
Cobalt metal can be prepared by reducing cobalt(II) oxide with carbon monoxide.
$\text{CoO}(s)+\text{CO}(g)\rightleftharpoons \text{Co}(s)+{\text{CO}}_{2}(g)\hspace{5em}{K}_{c}=4.90\;\times \;{10}^{2}\text{at}\;550\;\text{°C}$
What concentration of CO remains in an equilibrium mixture with [CO<sub>2</sub>] = 0.100 *M*?
SOLUTION:
[CO] = 2.04 $\times$ 10<sup>−4</sup> *M*
:::

:::exercise {fs-idp277387888} type= 
PROBLEM:
Carbon reacts with water vapor at elevated temperatures.
$\text{C}(s)+{\text{H}}_{2}\text{O}(g)\rightleftharpoons \text{CO}(g)+{\text{H}}_{2}(g)\hspace{5em}{K}_{c}=0.2\;\text{at}\;1000\;\text{°C}$
Assuming a reaction mixture initially contains only reactants, what is the concentration of CO in an equilibrium mixture with [H<sub>2</sub>O] = 0.500 *M* at 1000 °C?
:::

:::exercise {fs-idp151659712} type= 
PROBLEM:
Sodium sulfate 10−hydrate, Na<sub>2</sub>SO<sub>4</sub>·10H<sub>2</sub>O, dehydrates according to the equation
${\text{Na}}_{2}{\text{SO}}_{4}\text{·}10{\text{H}}_{2}\text{O}(s)\rightleftharpoons {\text{Na}}_{2}{\text{SO}}_{4}(s)+10{\text{H}}_{2}\text{O}(g)\hspace{5em}{K}_{P}=4.08\;\times \;{10}^{−25}\;\text{at}\;25\;\text{°C}$
What is the pressure of water vapor at equilibrium with a mixture of Na<sub>2</sub>SO<sub>4</sub>·10H<sub>2</sub>O and NaSO<sub>4</sub>?
SOLUTION:
${P}_{{\text{H}}_{\text{2}}}{}_{\text{O}}=3.64\;\times \;{10}^{\text{−3}}\;\text{atm}$
:::

:::exercise {fs-idp97213088} type= 
PROBLEM:
Calcium chloride 6−hydrate, CaCl<sub>2</sub>·6H<sub>2</sub>O, dehydrates according to the equation
${\text{CaCl}}_{\text{2}}\text{·}6{\text{H}}_{2}\text{O}(s)\rightleftharpoons {\text{CaCl}}_{2}(s)+6{\text{H}}_{2}\text{O}(g)\hspace{5em}{K}_{P}=5.09\;\times \;{10}^{−44}\;\text{at}\;25\;\text{°C}$
What is the pressure of water vapor at equilibrium with a mixture of CaCl<sub>2</sub>·6H<sub>2</sub>O and CaCl<sub>2</sub> at 25 °C?
:::

:::exercise {fs-idp210607184} type= 
PROBLEM:
A student solved the following problem and found the equilibrium concentrations to be [SO<sub>2</sub>] = 0.590 *M*, [O<sub>2</sub>] = 0.0450 *M*, and [SO<sub>3</sub>] = 0.260 *M*. How could this student check the work without reworking the problem? The problem was: For the following reaction at 600 °C:
$2{\text{SO}}_{2}(g)+{\text{O}}_{2}(g)\rightleftharpoons 2{\text{SO}}_{3}(g)\hspace{5em}{K}_{c}=4.32$
SOLUTION:
Calculate *Q* based on the calculated concentrations and see if it is equal to *K<sub>c</sub>*. Because *Q* does equal 4.32, the system must be at equilibrium.
:::

:::exercise {fs-idp359131456} type= 
PROBLEM:
A student solved the following problem and found [N<sub>2</sub>O<sub>4</sub>] = 0.16 *M* at equilibrium. How could this student recognize that the answer was wrong without reworking the problem? The problem was: What is the equilibrium concentration of N<sub>2</sub>O<sub>4</sub> in a mixture formed from a sample of NO<sub>2</sub> with a concentration of 0.10 *M*?
$2{\text{NO}}_{2}(g)\rightleftharpoons {\text{N}}_{2}{\text{O}}_{4}(g)\hspace{5em}{K}_{c}=160$
:::

:::exercise {fs-idp91440288} type= 
PROBLEM:
Assume that the change in concentration of N<sub>2</sub>O<sub>4</sub> is small enough to be neglected in the following problem.
(a) Calculate the equilibrium concentration of both species in 1.00 L of a solution prepared from 0.129 mol of N<sub>2</sub>O<sub>4</sub> with chloroform as the solvent.
${\text{N}}_{2}{\text{O}}_{4}(g)\rightleftharpoons 2{\text{NO}}_{2}(g)\hspace{5em}{K}_{c}=1.07\;\times \;{10}^{−5}$ in chloroform
(b) Confirm that the change is small enough to be neglected.
SOLUTION:
(a) [NO<sub>2</sub>] = 1.17 $\times$ 10<sup>−3</sup> *M*; [N<sub>2</sub>O<sub>4</sub>] = 0.128 *M*; (b) The assumption that *x* is negligibly small compared to 0.129 is confirmed by comparing the initial concentration of the N<sub>2</sub>O<sub>4</sub> to its concentration at equilibrium (they differ by just 1 in the least significant digit’s place).
:::

:::exercise {fs-idp145400352} type= 
PROBLEM:
Assume that the change in concentration of COCl<sub>2</sub> is small enough to be neglected in the following problem.
(a) Calculate the equilibrium concentration of all species in an equilibrium mixture that results from the decomposition of COCl<sub>2</sub> with an initial concentration of 0.3166 *M*.
${\text{COCl}}_{2}(g)\rightleftharpoons \text{CO}(g)+{\text{Cl}}_{2}(g)\hspace{5em}{K}_{c}=2.2\;\times \;{10}^{−10}$
(b) Confirm that the change is small enough to be neglected.
:::

:::exercise {fs-idm19235840} type= 
PROBLEM:
Assume that the change in pressure of H<sub>2</sub>S is small enough to be neglected in the following problem.
(a) Calculate the equilibrium pressures of all species in an equilibrium mixture that results from the decomposition of H<sub>2</sub>S with an initial pressure of 0.824 atm.
$2{\text{H}}_{2}\text{S}(g)\rightleftharpoons 2{\text{H}}_{2}(g)+{\text{S}}_{2}(g)\hspace{5em}{K}_{P}=2.2\;\times \;{10}^{−6}$
(b) Confirm that the change is small enough to be neglected.
SOLUTION:
(a) [H<sub>2</sub>S] = 0.810 atm, [H<sub>2</sub>] = 0.014 atm, [S<sub>2</sub>] = 0.0072 atm; (b) The assumption that 2*x* is negligibly small compared to 0.824 is confirmed by comparing the initial concentration of the H<sub>2</sub>S to its concentration at equilibrium (0.824 atm versus 0.810 atm, a difference of less than 2%).
:::

:::exercise {fs-idp124881392} type= 
PROBLEM:
What are all concentrations after a mixture that contains [H<sub>2</sub>O] = 1.00 *M* and [Cl<sub>2</sub>O] = 1.00 *M* comes to equilibrium at 25 °C?
${\text{H}}_{2}\text{O}(g)+{\text{Cl}}_{2}\text{O}(g)\rightleftharpoons 2\text{HOCl}(g)\hspace{5em}{K}_{c}=0.0900$
:::

:::exercise {fs-idp55521216} type= 
PROBLEM:
What are the concentrations of PCl<sub>5</sub>, PCl<sub>3</sub>, and Cl<sub>2</sub> in an equilibrium mixture produced by the decomposition of a sample of pure PCl<sub>5</sub> with [PCl<sub>5</sub>] = 2.00 *M*?
${\text{PCl}}_{5}(g)\rightleftharpoons {\text{PCl}}_{3}(g)+{\text{Cl}}_{2}(g)\hspace{5em}{K}_{c}=0.0211$
SOLUTION:
[PCl<sub>5</sub>] = 1.80 *M*; [Cl<sub>2</sub>] = 0.195 *M*; [PCl<sub>3</sub>] = 0.195 *M*.
:::

:::exercise {fs-idp116933168} type= 
PROBLEM:
Calculate the number of grams of HI that are at equilibrium with 1.25 mol of H<sub>2</sub> and 63.5 g of iodine at 448 °C.
${\text{H}}_{2}+{\text{I}}_{2}\rightleftharpoons 2\text{HI}\hspace{5em}{K}_{c}=50.2\;\text{at}\;448\;\text{°C}$
SOLUTION:
507 g
:::

:::exercise {fs-idp307489856} type= 
PROBLEM:
Butane exists as two isomers, *n*−butane and isobutane.

> IMAGE {img:fs-idp222844848} src=../../media/CNX_Chem_13_05_Butane_img.jpg class=scaled-down
> alt: Three Lewis structures are shown. The first is labeled, “n dash Butane,” and has a C H subscript 3 single bonded to a C H subscript 2 group. This C H subscript 2 group is single bonded to another C H subscript 2 group which is single bonded to a C H subscript 3 group. The second is labeled, “iso dash Butane,” and is composed of a C H group single bonded to three C H subscript 3 groups. The third structure shows a chain of atoms: “C H subscript 3, C H subscript 2, C H subscript 2, C H subscript 3,” a double-headed arrow, then a carbon atom single bonded to three C H subscript 3 groups as well as a hydrogen atom.

*K<sub>P</sub>* = 2.5 at 25 °C
What is the pressure of isobutane in a container of the two isomers at equilibrium with a total pressure of 1.22 atm?
:::

:::exercise {fs-idp99670512} type= 
PROBLEM:
What is the minimum mass of CaCO<sub>3</sub> required to establish equilibrium at a certain temperature in a 6.50-L container if the equilibrium constant (*K<sub>c</sub>*) is 0.50 for the decomposition reaction of CaCO<sub>3</sub> at that temperature?
${\text{CaCO}}_{3}(s)\rightleftharpoons \text{CaO}(s)+{\text{CO}}_{2}(g)$
SOLUTION:
330 g
:::

:::exercise {fs-idp186517200} type= 
PROBLEM:
The equilibrium constant (*K<sub>c</sub>*) for this reaction is 1.60 at 990 °C:
${\text{H}}_{2}(g)+{\text{CO}}_{2}(g)\rightleftharpoons {\text{H}}_{2}\text{O}(g)+\text{CO}(g)$
Calculate the number of moles of each component in the final equilibrium mixture obtained from adding 1.00 mol of H<sub>2</sub>, 2.00 mol of CO<sub>2</sub>, 0.750 mol of H<sub>2</sub>O, and 1.00 mol of CO to a 5.00-L container at 990 °C.
:::

:::exercise {fs-idp301926064} type= 
PROBLEM:
In a 3.0-L vessel, the following equilibrium partial pressures are measured: N<sub>2</sub>, 190 torr; H<sub>2</sub>, 317 torr; NH<sub>3</sub>, 1.00 $\times$ 10<sup>3</sup> torr.
${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\rightleftharpoons 2{\text{NH}}_{3}(g)$
(a) How will the partial pressures of H<sub>2</sub>, N<sub>2</sub>, and NH<sub>3</sub> change if H<sub>2</sub> is removed from the system? Will they increase, decrease, or remain the same?
(b) Hydrogen is removed from the vessel until the partial pressure of nitrogen, at equilibrium, is 250 torr. Calculate the partial pressures of the other substances under the new conditions.
:::

:::exercise {fs-idp291800000} type= 
PROBLEM:
The equilibrium constant (*K<sub>c</sub>*) for this reaction is 5.0 at a given temperature.
$\text{CO}(g)+{\text{H}}_{2}\text{O}(g)\rightleftharpoons {\text{CO}}_{2}(g)+{\text{H}}_{2}(g)$
(a) On analysis, an equilibrium mixture of the substances present at the given temperature was found to contain 0.20 mol of CO, 0.30 mol of water vapor, and 0.90 mol of H<sub>2</sub> in a liter. How many moles of CO<sub>2</sub> were there in the equilibrium mixture?
(b) Maintaining the same temperature, additional H<sub>2</sub> was added to the system, and some water vapor was removed by drying. A new equilibrium mixture was thereby established containing 0.40 mol of CO, 0.30 mol of water vapor, and 1.2 mol of H<sub>2</sub> in a liter. How many moles of CO<sub>2</sub> were in the new equilibrium mixture? Compare this with the quantity in part (a), and discuss whether the second value is reasonable. Explain how it is possible for the water vapor concentration to be the same in the two equilibrium solutions even though some vapor was removed before the second equilibrium was established.
SOLUTION:
(a) 0.33 mol. (b) [CO<sub>2</sub>] = 0.50 *M*. Added H<sub>2</sub> forms some water as a result of a shift to the left after H<sub>2</sub> is added.
:::

:::exercise {fs-idp157265136} type= 
PROBLEM:
Antimony pentachloride decomposes according to this equation:
${\text{SbCl}}_{5}(g)\rightleftharpoons {\text{SbCl}}_{3}(g)+{\text{Cl}}_{2}(g)$
An equilibrium mixture in a 5.00-L flask at 448 °C contains 3.85 g of SbCl<sub>5</sub>, 9.14 g of SbCl<sub>3</sub>, and 2.84 g of Cl<sub>2</sub>. How many grams of each will be found if the mixture is transferred into a 2.00-L flask at the same temperature?
:::

:::exercise {fs-idp121255200} type= 
PROBLEM:
Consider the equilibrium
$4{\text{NO}}_{2}(g)+6{\text{H}}_{2}\text{O}(g)\rightleftharpoons 4{\text{NH}}_{3}(g)+7{\text{O}}_{2}(g)$
(a) What is the expression for the equilibrium constant (*K<sub>c</sub>*) of the reaction?
(b) How must the concentration of NH<sub>3</sub> change to reach equilibrium if the reaction quotient is less than the equilibrium constant?
(c) If the reaction were at equilibrium, how would an increase in the volume of the reaction vessel affect the pressure of NO<sub>2</sub>?
(d) If the change in the pressure of NO<sub>2</sub> is 28 torr as a mixture of the four gases reaches equilibrium, how much will the pressure of O<sub>2</sub> change?
SOLUTION:
(a) ${K}_{c}=\;\frac{{[{\text{NH}}_{3}]}^{4}{[{\text{O}}_{2}]}^{7}}{{[{\text{NO}}_{2}]}^{4}{[{\text{H}}_{2}\text{O}]}^{6}}.$ (b) [NH<sub>3</sub>] must increase for *Q<sub>c</sub>* to reach *K<sub>c</sub>*. (c) The increase in system volume would lower the partial pressures of all reactants (including NO<sub>2</sub>). (d) ${P}_{{\text{O}}_{\text{2}}}=49\;\text{torr}$
:::

:::exercise {fs-idp222775760} type= 
PROBLEM:
The binding of oxygen by hemoglobin (Hb), giving oxyhemoglobin (HbO<sub>2</sub>), is partially regulated by the concentration of H<sub>3</sub>O<sup>+</sup> and dissolved CO<sub>2</sub> in the blood. Although the equilibrium is complicated, it can be summarized as
${\text{HbO}}_{2}(aq)+{\text{H}}_{3}{\text{O}}^{\text{+}}(aq)+{\text{CO}}_{2}(g)\rightleftharpoons {\text{CO}}_{2}\text{−}\text{Hb}\text{−}{\text{H}}^{\text{+}}+{\text{O}}_{2}(g)+{\text{H}}_{2}\text{O}(l)$
(a) Write the equilibrium constant expression for this reaction.
(b) Explain why the production of lactic acid and CO<sub>2</sub> in a muscle during exertion stimulates release of O<sub>2</sub> from the oxyhemoglobin in the blood passing through the muscle.
:::

:::exercise {fs-idp149802032} type= 
PROBLEM:
Liquid N<sub>2</sub>O<sub>3</sub> is dark blue at low temperatures, but the color fades and becomes greenish at higher temperatures as the compound decomposes to NO and NO<sub>2</sub>. At 25 °C, a value of *K<sub>P</sub>* = 1.91 has been established for this decomposition. If 0.236 moles of N<sub>2</sub>O<sub>3</sub> are placed in a 1.52-L vessel at 25 °C, calculate the equilibrium partial pressures of N<sub>2</sub>O<sub>3</sub>(*g*), NO<sub>2</sub>(*g*), and NO(*g*).
SOLUTION:
${P}_{{\text{N}}_{\text{2}}}{}_{{\text{O}}_{\text{3}}}=1.90\;\text{atm and}\;{P}_{\text{NO}}={P}_{{\text{NO}}_{\text{2}}}=1.90\;\text{atm}$
:::

:::exercise {fs-idp303786512} type= 
PROBLEM:
A 1.00-L vessel at 400 °C contains the following equilibrium concentrations: N<sub>2</sub>, 1.00 *M*; H<sub>2</sub>, 0.50 *M*; and NH<sub>3</sub>, 0.25 *M*. How many moles of hydrogen must be removed from the vessel to increase the concentration of nitrogen to 1.1 *M*? The equilibrium reaction is
${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\rightleftharpoons 2{\text{NH}}_{3}(g)$
:::
