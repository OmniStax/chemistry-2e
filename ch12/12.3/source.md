# Rate Laws

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Explain the form and function of a rate law
- Use rate laws to calculate reaction rates
- Use rate and concentration data to identify reaction orders and derive rate laws

As described in the previous module, the rate of a reaction is often affected by the concentrations of reactants. {term:Rate laws} (sometimes called *differential rate laws*) or {term:rate equations} are mathematical expressions that describe the relationship between the rate of a chemical reaction and the concentration of its reactants. As an example, consider the reaction described by the chemical equation

$$ aA+bB\;\longrightarrow \;products $$  {eq:fs-idm248316432}

where *a* and *b* are stoichiometric coefficients. The rate law for this reaction is written as:

$$ \text{rate}=k[A{]}^{m}[B{]}^{n} $$  {eq:fs-idm276589968}

in which [*A*] and [*B*] represent the molar concentrations of reactants, and *k* is the {term:rate constant}, which is specific for a particular reaction at a particular temperature. The exponents *m* and *n* are the {term:reaction orders} and are typically positive integers, though they can be fractions, negative, or zero. The rate constant *k* and the reaction orders *m* and *n* must be determined experimentally by observing how the rate of a reaction changes as the concentrations of the reactants are changed. The rate constant *k* is independent of the reactant concentrations, but it does vary with temperature.
The reaction orders in a rate law describe the mathematical dependence of the rate on reactant concentrations. Referring to the generic rate law above, the reaction is *m* order with respect to *A* and *n* order with respect to *B*. For example, if *m* = 1 and *n* = 2, the reaction is first order in *A* and second order in *B*. The {term:overall reaction order} is simply the sum of orders for each reactant. For the example rate law here, the reaction is third order overall (1 + 2 = 3). A few specific examples are shown below to further illustrate this concept.
The rate law:

$$ \text{rate}=k[{\text{H}}_{2}{\text{O}}_{2}] $$  {eq:fs-idm204886480}

describes a reaction that is first order in hydrogen peroxide and first order overall. The rate law:

$$ \text{rate}=k{[{\text{C}}_{4}{\text{H}}_{6}]}^{2} $$  {eq:fs-idm185553664}

describes a reaction that is second order in C<sub>4</sub>H<sub>6</sub> and second order overall. The rate law:

$$ \text{rate}=k[{\text{H}}^{\text{+}}][{\text{OH}}^{\text{−}}] $$  {eq:fs-idm41933536}

describes a reaction that is first order in H<sup>+</sup>, first order in OH<sup>−</sup>, and second order overall.

:::example {ex:fs-idm235878704} Writing Rate Laws from Reaction Orders
An experiment shows that the reaction of nitrogen dioxide with carbon monoxide:

$$ {\text{NO}}_{\text{2}}(g)+\text{CO(}g)\;\longrightarrow \;\text{NO(}g)+{\text{CO}}_{2}(g) $$  {eq:fs-idm189808080}

is second order in NO<sub>2</sub> and zero order in CO at 100 °C. What is the rate law for the reaction?
**Solution**
The reaction will have the form:

$$ \text{rate}=k[{\text{NO}}_{2}{]}^{m}{[\text{CO}]}^{n} $$  {eq:fs-idm212887136}

The reaction is second order in NO<sub>2</sub>; thus *m* = 2. The reaction is zero order in CO; thus *n* = 0. The rate law is:

$$ \text{rate}=k[{\text{NO}}_{2}{]}^{2}[\text{CO}{]}^{0}=k{[{\text{NO}}_{2}]}^{2} $$  {eq:fs-idm49710800}

Remember that a number raised to the zero power is equal to 1, thus [CO]<sup>0</sup> = 1, which is why the CO concentration term may be omitted from the rate law: the rate of reaction is solely dependent on the concentration of NO<sub>2</sub>. A later chapter section on reaction mechanisms will explain how a reactant’s concentration can have no effect on a reaction rate despite being involved in the reaction.
**Check Your Learning**
The rate law for the reaction:

$$ {\text{H}}_{\text{2}}(g)+2\text{NO(}g)\;\longrightarrow \;{\text{N}}_{2}\text{O(}g)+{\text{H}}_{2}\text{O(}g) $$  {eq:fs-idm122197664}

has been determined to be rate = *k*[NO]<sup>2</sup>[H<sub>2</sub>]. What are the orders with respect to each reactant, and what is the overall order of the reaction?

:::note [answer] Answer:
order in NO = 2; order in H<sub>2</sub> = 1; overall order = 3
:::
**Check Your Learning**
In a transesterification reaction, a triglyceride reacts with an alcohol to form an ester and glycerol. Many students learn about the reaction between methanol (CH<sub>3</sub>OH) and ethyl acetate (CH<sub>3</sub>CH<sub>2</sub>OCOCH<sub>3</sub>) as a sample reaction before studying the chemical reactions that produce biodiesel:

$$ {\text{CH}}_{3}\text{OH}+{\text{CH}}_{3}{\text{CH}}_{2}{\text{OCOCH}}_{3}\;\longrightarrow \;{\text{CH}}_{3}{\text{OCOCH}}_{3}+{\text{CH}}_{3}{\text{CH}}_{2}\text{OH} $$  {eq:fs-idm155639824}

The rate law for the reaction between methanol and ethyl acetate is, under certain conditions, determined to be:

$$ \text{rate}=k[{\text{CH}}_{3}\text{OH}] $$  {eq:fs-idm236204576}

What is the order of reaction with respect to methanol and ethyl acetate, and what is the overall order of reaction?

:::note [answer] Answer:
order in CH<sub>3</sub>OH = 1; order in CH<sub>3</sub>CH<sub>2</sub>OCOCH<sub>3</sub> = 0; overall order = 1
:::
:::
A common experimental approach to the determination of rate laws is the {term:method of initial rates}. This method  involves measuring reaction rates for multiple experimental trials carried out using different initial reactant concentrations. Comparing the measured rates for these trials permits determination of the reaction orders and, subsequently, the rate constant, which together are used to formulate a rate law. This approach is illustrated in the next two example exercises.

:::example {ex:fs-idm234815200} Determining a Rate Law from Initial Rates
Ozone in the upper atmosphere is depleted when it reacts with nitrogen oxides. The rates of the reactions of nitrogen oxides with ozone are important factors in deciding how significant these reactions are in the formation of the ozone hole over Antarctica ([ref:CNX_Chem_12_03_OzoneHole]). One such reaction is the combination of nitric oxide, NO, with ozone, O<sub>3</sub>:

> FIGURE {fig:CNX_Chem_12_03_OzoneHole} src=../../media/CNX_Chem_12_03_OzoneHole.jpg class=scaled-down
> alt: A view of Earth’s southern hemisphere is shown. A nearly circular region of approximately half the diameter of the image is shown in shades of purple, with Antarctica appearing in a slightly lighter color than the surrounding ocean areas. Immediately outside this region is a narrow bright blue zone followed by a bright green zone. In the top half of the figure, the purple region extends slightly outward from the circle and the blue zone extends more outward to the right of the center as compared to the lower half of the image. In the upper half of the image, the majority of the space outside the purple region is shaded green, with a few small strips of interspersed blue regions. The lower half however shows the majority of the space outside the central purple zone in yellow, orange, and red. The red zones appear in the lower central and left regions outside the purple zone. To the lower right of this image is a color scale that is labeled “Total Ozone (Dobsone units).” This scale begins at 0 and increases by 100’s up to 700. At the left end of the scale, the value 0 shows a very deep purple color, 100 is indigo, 200 is blue, 300 is green, 400 is a yellow-orange, 500 is red, 600 is pink, and 700 is white.
> caption: A contour map showing stratospheric ozone concentration and the “ozone hole” that occurs over Antarctica during its spring months. (credit: modification of work by NASA)

$$ \text{NO(}g)+{\text{O}}_{3}(g)\;\longrightarrow \;{\text{NO}}_{\text{2}}(g)+{\text{O}}_{2}(g) $$  {eq:fs-idm215850976}

This reaction has been studied in the laboratory, and the following rate data were determined at 25 °C.

> TABLE {tab:fs-idm205685856} cols=4 class=unnumbered
> summary: This table has four columns and six rows. The first row is a header row, and it labels each column: “Trial,” “[ N O ] ( mol / L),” “[ O subscript 3 ] ( mol / L ),” and “capital delta [ N O subscript 2 ] divided by capital delta t ( mol L superscript negative 1 s superscript negative 1 ).” Under the “Trial” column are the numbers: 1, 2, 3, 4, and 5. Under the “[ N O ] ( mol / L)” column are the numbers: 1.00 times ten to the negative six power; 1.00 times ten to the negative six power; 1.00 times ten to the negative six power; 2.00 times ten to the negative six power; and 3.00 times ten to the negative six power. Under the “[ O subscript 3 ] ( mol / L )” column are the numbers: 3.00 times ten to the negative six; 6.00 times ten to the negative six; 9.00 times ten to the negative six; 9.00 times ten to the negative six; and 9.00 times ten to the negative six. Under the column “capital delta [ N O subscript 2 ] divided by capital delta t ( mol L superscript negative 1 s superscript negative 1 )” are the numbers: 6.60 times ten to the negative five; 1.32 times ten to the negative four; 1.98 times ten to the negative four; 3.96 times ten to the negative four; and 5.94 times ten to the negative four.

| Trial | [NO] (mol/L) | [O<sub>3</sub>] (mol/L) | $\frac{\text{Δ}[{\text{NO}}_{2}]}{\text{Δ}t}\;(\text{mol}\;{\text{L}}^{−1}\;{\text{s}}^{−1})$ |
| --- | --- | --- | --- |
| 1 | 1.00 $\times$ 10<sup>−6</sup> | 3.00 $\times$ 10<sup>−6</sup> | 6.60 $\times$ 10<sup>−5</sup> |
| 2 | 1.00 $\times$ 10<sup>−6</sup> | 6.00 $\times$ 10<sup>−6</sup> | 1.32 $\times$ 10<sup>−4</sup> |
| 3 | 1.00 $\times$ 10<sup>−6</sup> | 9.00 $\times$ 10<sup>−6</sup> | 1.98 $\times$ 10<sup>−4</sup> |
| 4 | 2.00 $\times$ 10<sup>−6</sup> | 9.00 $\times$ 10<sup>−6</sup> | 3.96 $\times$ 10<sup>−4</sup> |
| 5 | 3.00 $\times$ 10<sup>−6</sup> | 9.00 $\times$ 10<sup>−6</sup> | 5.94 $\times$ 10<sup>−4</sup> |

Determine the rate law and the rate constant for the reaction at 25 °C.
**Solution**
The rate law will have the form:

$$ \text{rate}=k[\text{NO}{]}^{m}[{\text{O}}_{\text{3}}{]}^{n} $$  {eq:fs-idm14888352}

Determine the values of *m*, *n*, and *k* from the experimental data using the following three-part process:
1. *Determine the value of* m *from the data in which [NO] varies and [O<sub>3</sub>] is constant.* In the last three experiments, [NO] varies while [O<sub>3</sub>] remains constant. When [NO] doubles from trial 3 to 4, the rate doubles, and when [NO] triples from trial 3 to 5, the rate also triples. Thus, the rate is also directly proportional to [NO], and *m* in the rate law is equal to 1.
2. *Determine the value of* n *from data in which [O<sub>3</sub>] varies and [NO] is constant.* In the first three experiments, [NO] is constant and [O<sub>3</sub>] varies. The reaction rate changes in direct proportion to the change in [O<sub>3</sub>]. When [O<sub>3</sub>] doubles from trial 1 to 2, the rate doubles; when [O<sub>3</sub>] triples from trial 1 to 3, the rate increases also triples. Thus, the rate is directly proportional to [O<sub>3</sub>], and *n* is equal to 1.The rate law is thus:

$$ \text{rate}=k{[\text{NO}]}^{1}{[{\text{O}}_{3}]}^{1}=k[\text{NO}][{\text{O}}_{3}] $$  {eq:fs-idm236326672}

3. *Determine the value of* k *from one set of concentrations and the corresponding rate*. The data from trial 1 are used below:

$$ \begin{array}{rl}k & =\;\frac{\text{rate}}{[\text{NO}][{\text{O}}_{3}]} \\ & =\;\frac{6.60\;\times \;{10}^{−5}\;\cancel{{\text{mol L}}^{−1}}{\text{s}}^{-1}}{(1.00\;\times \;{10}^{−6}\;\cancel{{\text{mol L}}^{−1}})\;(3.00\;\times \;{10}^{−6}\;\text{mol}\;{\text{L}}^{-1})} \\ & =\text{2}.\text{2}0\;\times \;{10}^{7}\;\text{L}\;{\text{mol}}^{-1}{\text{s}}^{-1}\end{array} $$  {eq:fs-idm208899344}

**Check Your Learning**
Acetaldehyde decomposes when heated to yield methane and carbon monoxide according to the equation:

$$ {\text{CH}}_{3}\text{CHO(}g)\;\longrightarrow \;{\text{CH}}_{\text{4}}(g)+\text{CO(}g) $$  {eq:fs-idm196768496}

Determine the rate law and the rate constant for the reaction from the following experimental data:

> TABLE {tab:fs-idm276791216} cols=3 class=unnumbered
> summary: This table has three columns and four rows. The first row is a header row, and it labels each column, “Trial,” “[ C H subscript 3 C H O ] ( mol / L),” and “negative capital delta [ C H subscript 3 C H O ] divided by capital delta t ( mol L superscript negative 1 s superscript negative 1 ).” Under the “Trial” column are the numbers: 1, 2, and 3. Under the “[ C H subscript 3 C H O ] ( mol / L)” are the numbers: 1.75 times ten to the negative three; 3.50 times ten to the negative three; and 7.00 times ten to the negative three. Under the column “negative capital delta [ C H subscript 3 C H O ] divided by capital delta t ( mol L superscript negative 1 s superscript negative 1 )” are the numbers: 2.06 times ten to the negative 11; 8.24 times ten to the negative 11; and 3.30 times ten to the negative ten.

| Trial | [CH<sub>3</sub>CHO] (mol/L) | $-\;\frac{{\text{Δ[CH}}_{3}\text{CHO]}}{\text{Δ}t}\;(\text{mol}\;{\text{L}}^{−1}\;{\text{s}}^{−1})$ |
| --- | --- | --- |
| 1 | 1.75 $\times$ 10<sup>−3</sup> | 2.06 $\times$ 10<sup>−11</sup> |
| 2 | 3.50 $\times$ 10<sup>−3</sup> | 8.24 $\times$ 10<sup>−11</sup> |
| 3 | 7.00 $\times$ 10<sup>−3</sup> | 3.30 $\times$ 10<sup>−10</sup> |

:::note [answer] Answer:
$\text{rate}=k{[{\text{CH}}_{3}\text{CHO}]}^{2}$ with *k* = 6.73 $\times$ 10<sup>−6</sup> L/mol/s
:::
:::

:::example {ex:fs-idm285627376} Determining Rate Laws from Initial Rates
Using the initial rates method and the experimental data, determine the rate law and the value of the rate constant for this reaction:

$$ \text{2NO(}g)+{\text{Cl}}_{2}(g)\;\longrightarrow \;\text{2NOCl(}g) $$  {eq:fs-idm275365520}

> TABLE {tab:fs-idm285249664} cols=4 class=unnumbered
> summary: This table has four columns and four rows. The first row is a header row, and it labels the columns, “Trial,” “[ N O ] ( mol / L),” “[ C l subscript 2 ] ( mol / L ),” and “negative capital delta [ N O] divided by capital delta t ( mol L superscript negative 1 s superscript negative 1 ).” Under the column “Trial” are the numbers: 1, 2, and 3. Under the column “[ N O ] ( mol / L)” are the numbers: 0.10, 0.10, and 0.15. Under the column “[ C l subscript 2 ] ( mol / L )” are the numbers: 0.10, 0.15, and 0.10. Under the column “negative delta [ N O] divided by delta t ( mol L superscript negative 1 s superscript negative 1” are the numbers: 0.00300, 0.00450, 0.00675.

| Trial | [NO] (mol/L) | [Cl<sub>2</sub>] (mol/L) | $-\;\frac{\text{Δ}[\text{NO}]}{\text{Δ}t}\;(\text{mol}\;{\text{L}}^{−1}\;{\text{s}}^{−1})$ |
| --- | --- | --- | --- |
| 1 | 0.10 | 0.10 | 0.00300 |
| 2 | 0.10 | 0.15 | 0.00450 |
| 3 | 0.15 | 0.10 | 0.00675 |

**Solution**
The rate law for this reaction will have the form:

$$ \text{rate}=k[\text{NO}{]}^{m}{[{\text{Cl}}_{2}]}^{n} $$  {eq:fs-idm220277104}

As in [ref:fs-idm234815200], approach this problem in a stepwise fashion, determining the values of *m* and *n* from the experimental data and then using these values to determine the value of *k*. In this example, however, an explicit algebraic approach (vs. the implicit approach of the previous example) will be used to determine the values of *m* and *n*:
1. *Determine the value of* m *from the data in which [NO] varies and [Cl<sub>2</sub>] is constant*. Write the ratios with the subscripts *x* and *y* to indicate data from two different trials:

$$ \frac{{\text{rate}}_{x}}{{\text{rate}}_{y}}\;=\;\frac{k{\text{[}\text{NO}\text{]}}_{x}^{m}{\text{[}{\text{Cl}}_{2}\text{]}}_{x}^{n}}{k{\text{[}\text{NO}\text{]}}_{y}^{m}{\text{[}{\text{Cl}}_{2}\text{]}}_{y}^{n}} $$  {eq:fs-idm359376496}

Using the third trial and the first trial, in which [Cl<sub>2</sub>] does not vary, gives:

$$ \frac{\text{rate 3}}{\text{rate 1}}\;=\;\frac{0.00675}{0.00300}\;=\;\frac{k(0.15{)}^{m}(0.10{)}^{n}}{k{\text{(0.10)}}^{m}(0.10{)}^{n}} $$  {eq:fs-idp81408128}

Canceling equivalent terms in the numerator and denominator leaves:

$$ \frac{0.00675}{0.00300}\;=\;\frac{{(0.15)}^{m}}{{(0.10)}^{m}} $$  {eq:fs-idm185610624}

which simplifies to:

$$ 2.25={(1.5)}^{m} $$  {eq:fs-idm285203088}

Use logarithms to determine the value of the exponent *m*:

$$ \begin{array}{rll}\text{ln}(2.25) & = & m\text{ln}(1.5) \\ \frac{\text{ln}(2.25)}{\text{ln}(1.5)} & = & m \\ 2 & = & m\end{array} $$  {eq:fs-idm222931920}

Confirm the result

$$ {1.5}^{2}=2.25 $$  {eq:fs-idm10561024}

2. *Determine the value of* n *from data in which [Cl<sub>2</sub>] varies and [NO] is constant.*

$$ \frac{\text{rate 2}}{\text{rate 1}}\;=\;\frac{0.00450}{0.00300}\;=\;\frac{k(0.10{)}^{m}(0.15{)}^{n}}{k(0.10{)}^{m}(0.10{)}^{n}} $$  {eq:fs-idp69093344}

Cancelation gives:

$$ \frac{0.0045}{0.0030}\;=\;\frac{{(0.15)}^{n}}{{(0.10)}^{n}} $$  {eq:fs-idp5205776}

which simplifies to:

$$ 1.5={(1.5)}^{n} $$  {eq:fs-idm97106784}

Thus *n* must be 1, and the form of the rate law is:

$$ \text{rate}=k{[\text{NO}]}^{m}{[{\text{Cl}}_{2}]}^{n}=k{[\text{NO}]}^{2}[{\text{Cl}}_{2}] $$  {eq:fs-idm215496784}

3. *Determine the numerical value of the rate constant* k *with appropriate units.* The units for the rate of a reaction are mol/L/s. The units for *k* are whatever is needed so that substituting into the rate law expression affords the appropriate units for the rate. In this example, the concentration units are mol<sup>3</sup>/L<sup>3</sup>. The units for *k* should be mol<sup>−2</sup> L<sup>2</sup>/s so that the rate is in terms of mol/L/s.
To determine the value of *k* once the rate law expression has been solved, simply plug in values from the first experimental trial and solve for *k*:

$$ \begin{array}{rll}0.00300\;\text{mol}\;{\text{L}}^{-1}\;{\text{s}}^{−1} & = & k{(0.10\;\text{mol}\;{\text{L}}^{−1})}^{2}{(0.10\;\text{mol}\;{\text{L}}^{−1})}^{1} \\ k & = & 3.0\;{\text{mol}}^{−2}\;{\text{L}}^{2}\;{\text{s}}^{−1}\end{array} $$  {eq:fs-idm263345248}

**Check Your Learning**
Use the provided initial rate data to derive the rate law for the reaction whose equation is:

$$ {\text{OCl}}^{\text{−}}(aq)+{\text{I}}^{\text{−}}(aq)\;\longrightarrow \;{\text{OI}}^{\text{−}}(aq)+{\text{Cl}}^{\text{−}}(aq) $$  {eq:fs-idm205740176}

> TABLE {tab:fs-idm275492048} cols=4 class=unnumbered
> summary: This table has four columns and four rows. The first row is a header row and it labels each column, “Trial,” “[ O C l superscript negative sign ] ( mol / L),” “[ I superscript negative sign ] ( mol / l ),” and “Initial Rate ( mol / L / s).” Under the column “Trial” are the numbers: 1, 2, and 3. Under the column “[ O C l superscript negative sign ] ( mol / L)” are the numbers 0.0040, 0.0020, and 0.0020. Under the column “[ I superscript negative sign ] ( mol / l )” are the numbers: 0.0020, 0.0040, and 0.0020. Under the column “Initial Rate ( mol / L / s)” are the numbers: 0.00184, 0.00092, and 0.00046.

| Trial | [OCl<sup>−</sup>] (mol/L) | [I<sup>−</sup>] (mol/L) | Initial Rate (mol/L/s) |
| --- | --- | --- | --- |
| 1 | 0.0040 | 0.0020 | 0.00184 |
| 2 | 0.0020 | 0.0040 | 0.00092 |
| 3 | 0.0020 | 0.0020 | 0.00046 |

Determine the rate law expression and the value of the rate constant *k* with appropriate units for this reaction.

:::note [answer] Answer:
$\frac{\text{rate 2}}{\text{rate 3}}\;=\;\frac{0.00092}{0.00046}\;=\;\frac{k(0.0020{)}^{x}(0.0040{)}^{y}}{k(0.0020{)}^{x}(0.0020{)}^{y}}$
2.00 = 2.00<sup>*y*</sup>
*y* = 1
$\frac{\text{rate 1}}{\text{rate 2}}\;=\;\frac{0.00184}{0.00092}\;=\;\frac{k(0.0040{)}^{x}(0.0020{)}^{y}}{k(0.0020{)}^{x}(0.0040{)}^{y}}$
$\begin{array}{rll}2.00 & = & \frac{{2}^{x}}{{2}^{y}} \\ 2.00 & = & \frac{{2}^{x}}{{2}^{1}} \\ 4.00 & = & {2}^{x} \\ x & = & 2\end{array}$
Substituting the concentration data from trial 1 and solving for *k* yields:
$\begin{array}{rll}\text{rate} & = & k{[{\text{OCl}}^{\text{−}}]}^{2}{[{\text{I}}^{\text{−}}]}^{1} \\ 0.00184 & = & k{\text{(0.0040)}}^{\text{2}}{\text{(0.0020)}}^{1} \\ k & = & 5.75\;\times \;{10}^{4}\;{\text{mol}}^{-2}\;{\text{L}}^{2}{\text{s}}^{-1}\end{array}$
:::
:::

## Reaction Order and Rate Constant Units
In some of our examples, the reaction orders in the rate law happen to be the same as the coefficients in the chemical equation for the reaction. This is merely a coincidence and very often not the case.
Rate laws may exhibit fractional orders for some reactants, and negative reaction orders are sometimes observed when an increase in the concentration of one reactant causes a decrease in reaction rate. A few examples illustrating these points are provided:

$$ \begin{array}{l} \\ {\text{NO}}_{2}+\text{CO}\;\longrightarrow \;\text{NO}+{\text{CO}}_{\text{2}}\hspace{3em}\text{rate}=k[{\text{NO}}_{2}{]}^{2} \\ {\text{CH}}_{3}\text{CHO}\;\longrightarrow \;{\text{CH}}_{4}+\text{CO}\hspace{3em}\text{rate}=k[{\text{CH}}_{3}\text{CHO}{]}^{2} \\ {\text{2N}}_{2}{\text{O}}_{5}\;\longrightarrow \;{\text{NO}}_{2}+{\text{O}}_{\text{2}}\hspace{2em}\text{rate}=k[{\text{N}}_{2}{\text{O}}_{5}] \\ {\text{2NO}}_{2}+{\text{F}}_{2}\;\longrightarrow \;{\text{2NO}}_{2}\text{F}\hspace{3em}\text{rate}=k[{\text{NO}}_{2}]\;[{\text{F}}_{2}] \\ {\text{2NO}}_{2}\text{Cl}\;\longrightarrow \;{\text{2NO}}_{2}+{\text{Cl}}_{2}\hspace{3em}\text{rate}=k[{\text{NO}}_{2}\text{Cl}]\end{array} $$  {eq:fs-idm213140144}

It is important to note that *rate laws are determined by experiment only and are not reliably predicted by reaction stoichiometry.*
The units for a rate constant will vary as appropriate to accommodate the overall order of the reaction. The unit of the rate constant for the second-order reaction described in [ref:fs-idm234815200] was determined to be $\text{L}\;{\text{mol}}^{−1}\;{\text{s}}^{−1}.$ For the third-order reaction described in [ref:fs-idm285627376], the unit for *k* was derived to be ${\text{L}}^{2}\;{\text{mol}}^{−2}\;{\text{s}}^{−1}.$ Dimensional analysis requires the rate constant unit for a reaction whose overall order is *x* to be ${\text{L}}^{x-1}\;{\text{mol}}^{1-x}\;{\text{s}}^{−1}.$ [ref:fs-idm233742304] summarizes the rate constant units for common reaction orders.

> TABLE {tab:fs-idm233742304} cols=2 class=top-titled
> title: Rate Constant Units for Common Reaction Orders
> summary: This table has two columns and four rows. The first row is a header row and it labels each column, “Reaction order,” and “Units of k.” Under the “Reaction Order” column are: “( m + n ),” “zero,” “first,” “second,” and, “third.” Under the “Units of k” column are: “mol superscript 1 minus ( m + n) L superscript ( m + n) minus 1 s superscript negative one,” “mol / L / s,” “s superscript negative 1,” “L / mol / s,” and “mol superscript negative 2 L superscript 2 s superscript negative 1.”

| Overall Reaction Order (*x*) | Rate Constant Unit (L<sup>*x*−1</sup> mol<sup>1−*x*</sup> s<sup>−1</sup>) |
| --- | --- |
| 0 (zero) | mol L<sup>−1</sup> s<sup>−1</sup> |
| 1 (first) | s<sup>−1</sup> |
| 2 (second) | L mol<sup>−1</sup> s<sup>−1</sup> |
| 3 (third) | L<sup>2</sup> mol<sup>−2</sup> s<sup>−1</sup> |

Note that the units in this table were derived using specific units for concentration (mol/L) and time (s), though any valid units for these two properties may be used.

## Key Concepts and Summary {section:summary}
Rate laws (*differential rate laws*) provide a mathematical description of how changes in the concentration of a substance affect the rate of a chemical reaction. Rate laws are determined experimentally and cannot be predicted by reaction stoichiometry. The order of reaction describes how much a change in the concentration of each substance affects the overall rate, and the overall order of a reaction is the sum of the orders for each substance present in the reaction. Reaction orders are typically first order, second order, or zero order, but fractional and even negative orders are possible.

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idm181252208} type= 
PROBLEM:
How do the rate of a reaction and its rate constant differ?
:::

:::exercise {fs-idm256410736} type= 
PROBLEM:
Doubling the concentration of a reactant increases the rate of a reaction four times. With this knowledge, answer the following questions:
(a) What is the order of the reaction with respect to that reactant?
(b) Tripling the concentration of a different reactant increases the rate of a reaction three times. What is the order of the reaction with respect to that reactant?
SOLUTION:
(a) 2; (b) 1
:::

:::exercise {fs-idm211287824} type= 
PROBLEM:
Tripling the concentration of a reactant increases the rate of a reaction nine-fold. With this knowledge, answer the following questions:
(a) What is the order of the reaction with respect to that reactant?
(b) Increasing the concentration of a reactant by a factor of four increases the rate of a reaction four-fold. What is the order of the reaction with respect to that reactant?
:::

:::exercise {fs-idm291799584} type= 
PROBLEM:
How will the rate of reaction change for the process: $\text{CO(}g)+{\text{NO}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)+\text{NO(}g)$ if the rate law for the reaction is $\text{rate}=k{[{\text{NO}}_{2}]}^{2}?$
(a) Decreasing the pressure of NO<sub>2</sub> from 0.50 atm to 0.250 atm.
(b) Increasing the concentration of CO from 0.01 *M* to 0.03 *M*.
SOLUTION:
(a) The process reduces the rate by a factor of 4. (b) Since CO does not appear in the rate law, the rate is not affected.
:::

:::exercise {fs-idm207653024} type= 
PROBLEM:
How will each of the following affect the rate of the reaction: $\text{CO(}g)+{\text{NO}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)+\text{NO(}g)$ if the rate law for the reaction is $\text{rate}=k[{\text{NO}}_{2}][\text{CO}]$?
(a) Increasing the pressure of NO<sub>2</sub> from 0.1 atm to 0.3 atm
(b) Increasing the concentration of CO from 0.02 *M* to 0.06 *M*.
:::

:::exercise {fs-idm222164384} type= 
PROBLEM:
Regular flights of supersonic aircraft in the stratosphere are of concern because such aircraft produce nitric oxide, NO, as a byproduct in the exhaust of their engines. Nitric oxide reacts with ozone, and it has been suggested that this could contribute to depletion of the ozone layer. The reaction $\text{NO}+{\text{O}}_{3}\;\longrightarrow \;{\text{NO}}_{2}+{\text{O}}_{2}$ is first order with respect to both NO and O<sub>3</sub> with a rate constant of 2.20 $\times$ 10<sup>7</sup> L/mol/s. What is the instantaneous rate of disappearance of NO when [NO] = 3.3 $\times$ 10<sup>−6</sup> *M* and [O<sub>3</sub>] = 5.9 $\times$ 10<sup>−7</sup> *M*?
SOLUTION:
4.3 $\times$ 10<sup>−5</sup> mol/L/s
:::

:::exercise {fs-idm53134032} type= 
PROBLEM:
Radioactive phosphorus is used in the study of biochemical reaction mechanisms because phosphorus atoms are components of many biochemical molecules. The location of the phosphorus (and the location of the molecule it is bound in) can be detected from the electrons (beta particles) it produces:
${}_{\text{15}}^{\text{32}}\text{P}\;\longrightarrow \;{}_{16}^{32}\text{S}+{\text{e}}^{-}$
rate = 4.85 $\times$ 10<sup>−2</sup> ${\text{day}}^{-1}[{}^{32}\text{P}]$
What is the instantaneous rate of production of electrons in a sample with a phosphorus concentration of 0.0033 *M*?
:::

:::exercise {fs-idm140350624} type= 
PROBLEM:
The rate constant for the radioactive decay of <sup>14</sup>C is 1.21 $\times$ 10<sup>−4</sup> year<sup>−1</sup>. The products of the decay are nitrogen atoms and electrons (beta particles):
${}_{6}^{14}\text{C}\;\longrightarrow \;{}_{7}^{14}\text{N}+{\text{e}}^{-}$
$\text{rate}=k[{}_{6}^{14}\text{C}]$
What is the instantaneous rate of production of N atoms in a sample with a carbon-14 content of 6.5 $\times$ 10<sup>−9</sup> *M*?
SOLUTION:
7.9 $\times$ 10<sup>−13</sup> mol/L/year
:::

:::exercise {fs-idm147604432} type= 
PROBLEM:
The decomposition of acetaldehyde is a second order reaction with a rate constant of 4.71 $\times$ 10<sup>−8</sup> L mol<sup>−1</sup> s<sup>−1</sup>. What is the instantaneous rate of decomposition of acetaldehyde in a solution with a concentration of 5.55 $\times$ 10<sup>−4</sup> *M*?
:::

:::exercise {fs-idm32841312} type= 
PROBLEM:
Alcohol is removed from the bloodstream by a series of metabolic reactions. The first reaction produces acetaldehyde; then other products are formed. The following data have been determined for the rate at which alcohol is removed from the blood of an average male, although individual rates can vary by 25–30%. Women metabolize alcohol a little more slowly than men:

> TABLE {tab:fs-idm121830912} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column serves as a header and labels each row, “[ C subscript 2 H subscript 5 O H ] ( M ),” and, “Rate ( mol / L / h ).” To the right of the “Initial Rate ( mol / L / s)” header are the numbers: 4.4 times ten to the negative 2; 3.3 times ten to the negative 2; 2.2 times ten to the negative 2. To the right of the “Rate ( mol / L / h )” header are the numbers: 2.0 times ten to the negative 2, 2.0 times ten to the negative 2, and 2.0 times ten to the negative 2.

|  |  |  |  |
| --- | --- | --- | --- |
| [C<sub>2</sub>H<sub>5</sub>OH] (*M*) | 4.4 $\times$ 10<sup>−2</sup> | 3.3 $\times$ 10<sup>−2</sup> | 2.2 $\times$ 10<sup>−2</sup> |
| Rate (mol L<sup>−1</sup> h<sup>−1</sup>) | 2.0 $\times$ 10<sup>−2</sup> | 2.0 $\times$ 10<sup>−2</sup> | 2.0 $\times$ 10<sup>−2</sup> |

Determine the rate law, the rate constant, and the overall order for this reaction.
SOLUTION:
rate = *k*; *k* = 2.0 $\times$ 10<sup>−2</sup> mol L<sup>−1</sup> h<sup>−1</sup> (about 0.9 g L<sup>−1</sup> h<sup>−1</sup> for the average male); The reaction is zero order.
:::

:::exercise {fs-idm233306880} type= 
PROBLEM:
Under certain conditions the decomposition of ammonia on a metal surface gives the following data:

> TABLE {tab:fs-idm155842464} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column labels each row, “[ N H subscript 3 ] ( M ),” and “Rate ( mol / L / h superscript 1 ).” The numbers to the right of the header, “[ N H subscript 3 ] ( M )” are: 1.0 times ten to the negative three; 2.0 times ten to the negative three; and 3.0 times ten to the negative three. The numbers to the right of the header, “Rate ( mol / L / h superscript 1” are: 1.5 times ten to the negative six; 1.50 times ten to the negative 6; and 1.5 times ten to the negative six.

|  |  |  |  |
| --- | --- | --- | --- |
| [NH<sub>3</sub>] (*M*) | 1.0 $\times$ 10<sup>−3</sup> | 2.0 $\times$ 10<sup>−3</sup> | 3.0 $\times$ 10<sup>−3</sup> |
| Rate (mol L<sup>−1</sup> h<sup>−1</sup>) | 1.5 $\times$ 10<sup>−6</sup> | 1.5 $\times$ 10<sup>−6</sup> | 1.5 $\times$ 10<sup>−6</sup> |

Determine the rate law, the rate constant, and the overall order for this reaction.
:::

:::exercise {fs-idm263803776} type= 
PROBLEM:
Nitrosyl chloride, NOCl, decomposes to NO and Cl<sub>2</sub>.
$\text{2NOCl(}g)\;\longrightarrow \;\text{2NO(}g)+{\text{Cl}}_{2}(g)$
Determine the rate law, the rate constant, and the overall order for this reaction from the following data:

> TABLE {tab:fs-idm176170864} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column labels each row, “[ N O C l ] ( M ),” and, “Rate ( mol / L / h ).” To the right of the header, “[ N O C l ] ( M )” are the numbers: 0.10, 0.20, and 0.30. To the right of the header, “Rate ( mol / L / h )” are the numbers: 8.0 times ten to the negative ten; 3.2 times ten to the negative 9; and 7.2 times ten to the negative 9.

|  |  |  |  |
| --- | --- | --- | --- |
| [NOCl] (*M*) | 0.10 | 0.20 | 0.30 |
| Rate (mol L<sup>−1</sup> h<sup>−1</sup>) | 8.0 $\times$ 10<sup>−10</sup> | 3.2 $\times$ 10<sup>−9</sup> | 7.2 $\times$ 10<sup>−9</sup> |

SOLUTION:
rate = *k*[NOCl]<sup>2</sup>; *k* = 8.0 $\times$ 10<sup>−8</sup> L/mol/h; second order
:::

:::exercise {fs-idm146074112} type= 
PROBLEM:
From the following data, determine the rate law, the rate constant, and the order with respect to *A* for the reaction $A\;\longrightarrow \;2C.$

> TABLE {tab:fs-idm146675536} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column labels each row, “[ A ] ( M ),” and “Rate ( mol / L / h).” To the right of the header, “[ A ] ( M ),” are the numbers: 1.33 times ten to the negative 2; 2.66 times ten to the negative 2; and 3.99 times ten to the negative 2.” To the right of the header, “Rate ( mol / L / h),” are the numbers 3.80 times ten to the negative 7; 1.52 times ten to the negative 6; and 3.42 times ten to the negative 6.

|  |  |  |  |
| --- | --- | --- | --- |
| [*A*] (*M*) | 1.33 $\times$ 10<sup>−2</sup> | 2.66 $\times$ 10<sup>−2</sup> | 3.99 $\times$ 10<sup>−2</sup> |
| Rate (mol L<sup>−1</sup> h<sup>−1</sup>) | 3.80 $\times$ 10<sup>−7</sup> | 1.52 $\times$ 10<sup>−6</sup> | 3.42 $\times$ 10<sup>−6</sup> |

:::

:::exercise {fs-idm238094880} type= 
PROBLEM:
Nitrogen monoxide reacts with chlorine according to the equation:
$\text{2NO(}g)+{\text{Cl}}_{2}(g)\;\longrightarrow \;\text{2NOCl(}g)$
The following initial rates of reaction have been observed for certain reactant concentrations:

> TABLE {tab:fs-idp1859024} cols=3 class=unnumbered
> summary: This table has three columns and four rows. The first row serves as a header row and labels each column, “[ N O ] ( mol / L superscript 1 ),” “[ C l subscript 2 ] ( mol / L ),” and, “Rate ( mol / L / h ).” Under the column “[ N O ] ( mol / L superscript 1 )” are the numbers: 0.50, 1.00, and 1.00. Under the column “[ C l subscript 2 ] ( mol / L)” are the numbers: 0.50, 0.50, and 1.00. Under the column “Rate ( mol / L / h )” are the numbers: 1.14, 4.56, and 9.12.

| [NO] (mol/L) | [Cl<sub>2</sub>] (mol/L) | Rate (mol L<sup>−1</sup> h<sup>−1</sup>) |
| --- | --- | --- |
| 0.50 | 0.50 | 1.14 |
| 1.00 | 0.50 | 4.56 |
| 1.00 | 1.00 | 9.12 |

What is the rate law that describes the rate’s dependence on the concentrations of NO and Cl<sub>2</sub>? What is the rate constant? What are the orders with respect to each reactant?
SOLUTION:
rate = *k*[NO]<sup>2</sup>[Cl<sub>2</sub>]; *k* = 9.1 L<sup>2</sup> mol<sup>−2</sup> h<sup>−1</sup>; second order in NO; first order in Cl<sub>2</sub>
:::

:::exercise {fs-idm168734944} type= 
PROBLEM:
Hydrogen reacts with nitrogen monoxide to form dinitrogen monoxide (laughing gas) according to the equation: ${\text{H}}_{2}(g)+\text{2NO(}g)\;\longrightarrow \;{\text{N}}_{2}\text{O(}g)+{\text{H}}_{2}\text{O(}g)$
Determine the rate law, the rate constant, and the orders with respect to each reactant from the following data:

> TABLE {tab:fs-idm261821504} cols=4 class=column-header unnumbered
> summary: This table has four columns and three rows. The first column labels each row, “[ N O ] ( M ),” “[ H subscript 2 ] ( M ),” and “Rate ( mol / L / s ).” To the right of the header “[ N O ] ( M )” are the numbers: 0.30, 0.60, and 0.60. To the right of the header “[ H subscript 2 ] ( M )” are the numbers: 0.35, 0.35, and 0.70. To the right of the header, “Rate ( mol / L / s )” are the numbers 2.835 times ten to the negative 3; 1.134 times 10 to the negative two; and 2.268 times ten to the negative 2.”

|  |  |  |  |
| --- | --- | --- | --- |
| [NO] (*M*) | 0.30 | 0.60 | 0.60 |
| [H<sub>2</sub>] (*M*) | 0.35 | 0.35 | 0.70 |
| Rate (mol L<sup>−1</sup> s<sup>−1</sup>) | 2.835 $\times$ 10<sup>−3</sup> | 1.134 $\times$ 10<sup>−2</sup> | 2.268 $\times$ 10<sup>−2</sup> |

:::

:::exercise {fs-idm49483024} type= 
PROBLEM:
For the reaction $A\;\longrightarrow \;B+C,$ the following data were obtained at 30 °C:

> TABLE {tab:fs-idm262119440} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column labels each row, “[ A ] ( M ),” and “Rate ( mol / L / s ).” To the right of the header, “[ A ] ( M ),” are the numbers: 0.230, 0.356, and 0.557. To the right of the header, “Rate ( mol / L / s ),” are the numbers: 4.7 times ten to the negative 4; 9.99 times ten to the negative 4; and 2.44 times ten to the negative 3.

|  |  |  |  |
| --- | --- | --- | --- |
| [*A*] (*M*) | 0.230 | 0.356 | 0.557 |
| Rate (mol L<sup>−1</sup> s<sup>−1</sup>) | 4.17 $\times$ 10<sup>−4</sup> | 9.99 $\times$ 10<sup>−4</sup> | 2.44 $\times$ 10<sup>−3</sup> |

(a) What is the order of the reaction with respect to [*A*], and what is the rate law?
(b) What is the rate constant?
SOLUTION:
(a) The rate law is second order in A and is written as rate = *k*[*A*]<sup>2</sup>. (b) *k* = 7.88 $\times$ 10<sup>−3</sup> L mol<sup>−1</sup> s<sup>−1</sup>
:::

:::exercise {fs-idm140371280} type= 
PROBLEM:
For the reaction $Q\;\longrightarrow \;W+X,$ the following data were obtained at 30 °C:

> TABLE {tab:fs-idm53317088} cols=4 class=column-header unnumbered
> summary: This table has four columns and two rows. The first column labels each row, “[ Q ] subscript initial ( M ),” and “Rate ( mol / L / s ).” To the right of the header, “[ Q ] subscript initial ( M ),” are the numbers: 0.170, 0.212, and 0.357. To the right of the header, “Rate ( mol / L / s ),” are the numbers: 6.68 times ten to the negative 3; 1.04 times ten to the negative 2; and 2.94 times ten to the negative 2.

|  |  |  |  |
| --- | --- | --- | --- |
| [*Q*]<sub>initial</sub> (*M*) | 0.170 | 0.212 | 0.357 |
| Rate (mol L<sup>−1</sup> s<sup>−1</sup>) | 6.68 $\times$ 10<sup>−3</sup> | 1.04 $\times$ 10<sup>−2</sup> | 2.94 $\times$ 10<sup>−2</sup> |

(a) What is the order of the reaction with respect to [*Q*], and what is the rate law?
(b) What is the rate constant?
:::

:::exercise {fs-idm57376432} type= 
PROBLEM:
The rate constant for the first-order decomposition at 45 °C of dinitrogen pentoxide, N<sub>2</sub>O<sub>5</sub>, dissolved in chloroform, CHCl<sub>3</sub>, is 6.2 $\times$ 10<sup>−4</sup> min<sup>−1</sup>.
${\text{2N}}_{2}{\text{O}}_{5}\;\longrightarrow \;{\text{4NO}}_{2}+{\text{O}}_{2}$
What is the rate of the reaction when [N<sub>2</sub>O<sub>5</sub>] = 0.40 *M*?
SOLUTION:
(a) 2.5 $\times$ 10<sup>−4</sup> mol/L/min
:::

:::exercise {fs-idm152420960} type= 
PROBLEM:
The annual production of HNO<sub>3</sub> in 2013 was 60 million metric tons Most of that was prepared by the following sequence of reactions, each run in a separate reaction vessel.
(a) ${\text{4NH}}_{3}(g)+{\text{5O}}_{2}(g)\;\longrightarrow \;\text{4NO(}g)+{\text{6H}}_{2}\text{O(}g)$
(b) $\text{2NO(}g)+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{2NO}}_{2}(g)$
(c) ${\text{3NO}}_{2}(g)+{\text{H}}_{2}\text{O(}l)\;\longrightarrow \;{\text{2HNO}}_{3}(aq)+\text{NO(}g)$
The first reaction is run by burning ammonia in air over a platinum catalyst. This reaction is fast. The reaction in equation (c) is also fast. The second reaction limits the rate at which nitric acid can be prepared from ammonia. If equation (b) is second order in NO and first order in O<sub>2</sub>, what is the rate of formation of NO<sub>2</sub> when the oxygen concentration is 0.50 *M* and the nitric oxide concentration is 0.75 *M*? The rate constant for the reaction is 5.8 $\times$ 10<sup>−6</sup> L<sup>2</sup> mol<sup>−2</sup> s<sup>−1</sup>.
:::

:::exercise {fs-idm237267424} type= 
PROBLEM:
The following data have been determined for the reaction:
${\text{I}}^{\text{−}}+{\text{OCl}}^{\text{−}}\;\longrightarrow \;{\text{IO}}^{\text{−}}+{\text{Cl}}^{\text{−}}$

> TABLE {tab:fs-idm189410736} cols=4 class=unnumbered
> summary: This table has four columns and four rows. The first column labels each row. The first cell in the first column is blank, and then each row is labeled, “[ I superscript negative sign ] subscript initial ( M ),” “[ O C l superscript negative sign ] subscript initial ( M ),” and, “Rate ( mol / L / s ).” To the right of the blank cell are the numbers: 1, 2, and 3. To the right of the header, “[ I superscript negative sign ] subscript initial ( M ),” are the numbers: 0.10, 0.20, and 0.30. To the right of the header, “[ O C l superscript negative sign ] subscript initial ( M ),” are the numbers: 0.050, 0.050, and 0.010. To the right of the header, “Rate ( mol / L / s ),” are the numbers: 3.05 times ten to the negative 4; 6.20 times ten to the negative 4; and 1.83 times ten to the negative 4.

|  | 1 | 2 | 3 |
| --- | --- | --- | --- |
| ${[{\text{I}}^{\text{−}}]}_{\text{initial}}$ (*M*) | 0.10 | 0.20 | 0.30 |
| ${[{\text{OCl}}^{\text{−}}]}_{\text{initial}}$ (*M*) | 0.050 | 0.050 | 0.010 |
| Rate (mol L<sup>−1</sup> s<sup>−1</sup>) | 3.05 $\times$ 10<sup>−4</sup> | 6.20 $\times$ 10<sup>−4</sup> | 1.83 $\times$ 10<sup>−4</sup> |

Determine the rate law and the rate constant for this reaction.
SOLUTION:
rate = *k*[I<sup>−</sup>][OCl<sup>−</sup>]; *k* = 6.1 $\times$ 10<sup>−2</sup> L mol <sup>−1</sup> s<sup>−1</sup>
:::

## Glossary
- {def} **method of initial rates**: common experimental approach to determining rate laws that involves measuring reaction rates at varying initial reactant concentrations
- {def} **overall reaction order**: sum of the reaction orders for each substance represented in the rate law
- {def} **rate constant (*k*)**: proportionality constant in a rate law
- {def} **rate law**: (also, rate equation) (also, differential rate laws) mathematical equation showing the dependence of reaction rate on the rate constant and the concentration of one or more reactants
- {def} **reaction order**: value of an exponent in a rate law (for example, zero order for 0, first order for 1, second order for 2, and so on)
