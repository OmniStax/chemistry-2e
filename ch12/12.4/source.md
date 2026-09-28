# Integrated Rate Laws

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Explain the form and function of an integrated rate law
- Perform integrated rate law calculations for zero-, first-, and second-order reactions
- Define half-life and carry out related calculations
- Identify the order of a reaction from concentration/time data

The rate laws discussed thus far relate the rate and the concentrations of reactants. We can also determine a second form of each rate law that relates the concentrations of reactants and time. These are called {term:integrated rate laws}. We can use an integrated rate law to determine the amount of reactant or product present after a period of time or to estimate the time required for a reaction to proceed to a certain extent. For example, an integrated rate law is used to determine the length of time a radioactive material must be stored for its radioactivity to decay to a safe level.
Using calculus, the differential rate law for a chemical reaction can be integrated with respect to time to give an equation that relates the amount of reactant or product present in a reaction mixture to the elapsed time of the reaction. This process can either be very straightforward or very complex, depending on the complexity of the differential rate law. For purposes of discussion, we will focus on the resulting integrated rate laws for first-, second-, and zero-order reactions.

## First-Order Reactions
Integration of the rate law for a simple first-order reaction (rate = *k*[*A*]) results in an equation describing how the reactant concentration varies with time:

$$ [A{]}_{t}=[A{]}_{0}\;{e}^{\text{−}kt} $$  {eq:fs-idm380890320}

where [*A*]*t* is the concentration of *A* at any time *t*, [*A*]<sub>0</sub> is the initial concentration of *A*, and *k* is the first-order rate constant.
For mathematical convenience, this equation may be rearranged to other formats, including direct and indirect proportionalities:

$$ \text{ln}(\frac{{[A]}_{t}}{{[A]}_{0}})=-kt\hspace{2em}\text{or}\hspace{2em}\text{ln}(\frac{{[A]}_{0}}{{[A]}_{t}})=kt $$  {eq:fs-idm500086336}

and a format showing a linear dependence of concentration in time:

$$ \text{ln}[A{]}_{t}=\text{ln}[A{]}_{0}\;\text{−}kt $$  {eq:fs-idm358923408}

:::example {ex:fs-idm148528000} The Integrated Rate Law for a First-Order Reaction
The rate constant for the first-order decomposition of cyclobutane, C<sub>4</sub>H<sub>8</sub> at 500 °C is 9.2 $\times$ 10<sup>−3</sup> s<sup>−1</sup>:

$$ {\text{C}}_{4}{\text{H}}_{8}\;\longrightarrow \;{\text{2C}}_{2}{\text{H}}_{4} $$  {eq:fs-idp60442464}

How long will it take for 80.0% of a sample of C<sub>4</sub>H<sub>8</sub> to decompose?
**Solution**
Since the relative change in reactant concentration is provided, a convenient format for the integrated rate law is:

$$ \text{ln}(\frac{{[A]}_{0}}{[A{]}_{t}})=kt $$  {eq:fs-idp11818384}

The initial concentration of C<sub>4</sub>H<sub>8</sub>, [*A*]<sub>0</sub>, is not provided, but the provision that 80.0% of the sample has decomposed is enough information to solve this problem. Let *x* be the initial concentration, in which case the concentration after 80.0% decomposition is 20.0% of *x* or 0.200*x.* Rearranging the rate law to isolate *t* and substituting the provided quantities yields:

$$ \begin{array}{rl}t & =\text{ln}\;\frac{[x]}{[0.200x]}\;\times \;\frac{1}{k} \\ & =\text{ln}\;5\;\times \;\frac{1}{9.2\;\times \;{10}^{−3}\;{\text{s}}^{−1}} \\ & =1.609\;\times \;\frac{1}{9.2\;\times \;{10}^{−3}\;{\text{s}}^{−1}} \\ & =1.7\;\times \;{10}^{2}\;\text{s}\end{array} $$  {eq:fs-idm92065248}

**Check Your Learning**
Iodine-131 is a radioactive isotope that is used to diagnose and treat some forms of thyroid cancer. Iodine-131 decays to xenon-131 according to the equation:

$$ \text{I-131}\;\longrightarrow \;\text{Xe-131}+\text{electron} $$  {eq:fs-idm115576112}

The decay is first-order with a rate constant of 0.138 d<sup>−1</sup>. How many days will it take for 90% of the iodine−131 in a 0.500 *M* solution of this substance to decay to Xe-131?

:::note [answer] Answer:
16.7 days
:::
:::
In the next example exercise, a linear format for the integrated rate law will be convenient:

$$ \begin{array}{rll}\text{ln}[A{]}_{t} & = & (\text{−}k)(t)+\text{ln}{[A]}_{0} \\ y & = & mx+b\end{array} $$  {eq:fs-idm88512368}

A plot of ln[*A*]<sub>*t*</sub> versus *t* for a first-order reaction is a straight line with a slope of −*k* and a *y*-intercept of ln[*A*]<sub>0</sub>. If a set of rate data are plotted in this fashion but do *not* result in a straight line, the reaction is not first order in *A*.

:::example {ex:fs-idp35909968} Graphical Determination of Reaction Order and Rate Constant
Show that the data in [ref:CNX_Chem_12_01_KDataH2O2](module:m68786) can be represented by a first-order rate law by graphing ln[H<sub>2</sub>O<sub>2</sub>] versus time. Determine the rate constant for the decomposition of H<sub>2</sub>O<sub>2</sub> from these data.
**Solution**
The data from [ref:CNX_Chem_12_01_KDataH2O2](module:m68786) are tabulated below, and a plot of ln[H<sub>2</sub>O<sub>2</sub>] is shown in [ref:CNX_Chem_12_04_FrstOKin].

> TABLE {tab:fs-idp114347648} cols=4 class=unnumbered
> summary: This table contains four columns and six rows. The first row is a header row, and it labels each column, “Trial,” “Time ( h ),” “[ H subscript 2 O subscript 2 ] ( M ),” and “l n [ H subscript 2 O subscript 2 ].” Under the “Trial” column are the numbers: 1, 2, 3, 4, and 5. Under the column, “Time ( h )” are the numbers 0, 6.00, 12.00, 18.00, and 24.00. Under the column “[ H subscript 2 O subscript 2 ] ( M ),” are the numbers 1.000, 0.500, 0.250, 0.125, and 0.0625. Under the column, “l n [ H subscript 2 O subscript 2 ],” are the numbers: 0.0, negative 0.693, negative 1.386, negative 2.079, and negative 2.772.

| Time (h) | [H<sub>2</sub>O<sub>2</sub>] (*M*) | ln[H<sub>2</sub>O<sub>2</sub>] |
| --- | --- | --- | --- |
| 0.00 | 1.000 | 0.000 |
| 6.00 | 0.500 | −0.693 |
| 12.00 | 0.250 | −1.386 |
| 18.00 | 0.125 | −2.079 |
| 24.00 | 0.0625 | −2.772 |

> FIGURE {fig:CNX_Chem_12_04_FrstOKin} src=../../media/CNX_Chem_12_04_FrstOKin.jpg class=scaled-down
> alt: A graph is shown with the label “Time ( h )” on the x-axis and “l n [ H subscript 2 O subscript 2 ]” on the y-axis. The x-axis shows markings at 6, 12, 18, and 24 hours. The vertical axis shows markings at negative 3, negative 2, negative 1, and 0. A decreasing linear trend line is drawn through five points represented at the coordinates (0, 0), (6, negative 0.693), (12, negative 1.386), (18, negative 2.079), and (24, negative 2.772).
> caption: A linear relationship between ln[H<sub>2</sub>O<sub>2</sub>] and time suggests the decomposition of hydrogen peroxide is a first-order reaction.

The plot of ln[H<sub>2</sub>O<sub>2</sub>] versus time is linear, indicating that the reaction may be described by a first-order rate law.
According to the linear format of the first-order integrated rate law, the rate constant is given by the negative of this plot’s slope.

$$ \text{slope}=\;\frac{\text{change in}\;y}{\text{change in}\;x}\;=\;\frac{\text{Δ}y}{\text{Δ}x}\;=\;\frac{\text{Δln}[{\text{H}}_{2}{\text{O}}_{2}]}{\text{Δ}t} $$  {eq:fs-idp49567824}

The slope of this line may be derived from two values of ln[H<sub>2</sub>O<sub>2</sub>] at different values of *t* (one near each end of the line is preferable). For example, the value of ln[H<sub>2</sub>O<sub>2</sub>] when *t* is 0.00 h is 0.000; the value when *t* = 24.00 h is −2.772

$$ \begin{array}{rll}\text{slope} & = & \frac{−2.772-0.000}{\text{24.00}-\text{0.00 h}} \\ & = & \frac{−2.772}{\text{24.00 h}} \\ & = & −0.116\;{\text{h}}^{−1} \\ k & = & -\text{slope}=-(−0.116\;{\text{h}}^{−1})=0.116\;{\text{h}}^{−1}\end{array} $$  {eq:fs-idm14805520}

**Check Your Learning**
Graph the following data to determine whether the reaction $A\;\longrightarrow \;B+C$ is first order.

> TABLE {tab:fs-idm149704608} cols=3 class=unnumbered
> summary: This table has three columns and six rows. The first row is a header row, and it labels each column, “Trial,” “Time ( s ),” and, “[ A ].” Under the “Trial” column are the numbers: 1, 2, 3, 4, and 5. Under the “Time ( s )” column are the numbers: 4.0, 8.0, 12.0, 16.0, and 20.0. Under the “ [ A ]” column are the numbers: 0.220, 0.144, 0.110, 0.088, and 0.074.

| Time (s) | [*A*] |
| --- | --- | --- |
| 4.0 | 0.220 |
| 8.0 | 0.144 |
| 12.0 | 0.110 |
| 16.0 | 0.088 |
| 20.0 | 0.074 |

:::note [answer] Answer:
The plot of ln[*A*]<sub>*t*</sub> vs. *t* is not linear, indicating the reaction is not first order:

> IMAGE {img:fs-idm135178736} src=../../media/CNX_Chem_12_04_CYL1_img.jpg class=scaled-down
> alt: A graph, labeled above as “l n [ A ] vs. Time” is shown. The x-axis is labeled, “Time ( s )” and the y-axis is labeled, “l n [ A ].” The x-axis shows markings at 5, 10, 15, 20, and 25 hours. The y-axis shows markings at negative 3, negative 2, negative 1, and 0. A slight curve is drawn connecting five points at coordinates of approximately (4, negative 1.5), (8, negative 2), (12, negative 2.2), (16, negative 2.4), and (20, negative 2.6).

:::
:::

## Second-Order Reactions
The equations that relate the concentrations of reactants and the rate constant of second-order reactions can be fairly complicated. To illustrate the point with minimal complexity, only the simplest second-order reactions will be described here, namely, those whose rates depend on the concentration of just one reactant. For these types of reactions, the differential rate law is written as:

$$ \text{rate}=k{[A]}^{2} $$  {eq:fs-idm149309552}

For these second-order reactions, the integrated rate law is:

$$ \frac{1}{[A{]}_{t}}\;=kt+\;\frac{1}{{[A]}_{0}} $$  {eq:fs-idm72168352}

where the terms in the equation have their usual meanings as defined earlier.

:::example {ex:fs-idm85213520} The Integrated Rate Law for a Second-Order Reaction
The reaction of butadiene gas (C<sub>4</sub>H<sub>6</sub>) to yield C<sub>8</sub>H<sub>12</sub> gas is described by the equation:

$$ {\text{2C}}_{4}{\text{H}}_{\text{6}}(g)\;\longrightarrow \;{\text{C}}_{8}{\text{H}}_{\text{12}}(g) $$  {eq:fs-idm46947984}

This “dimerization” reaction is second order with a rate constant equal to 5.76 $\times$ 10<sup>−2</sup> L mol<sup>−1</sup> min<sup>−1</sup> under certain conditions. If the initial concentration of butadiene is 0.200 *M*, what is the concentration after 10.0 min?
**Solution**
For a second-order reaction, the integrated rate law is written

$$ \frac{1}{[A{]}_{t}}\;=kt+\;\frac{1}{{[A]}_{0}} $$  {eq:fs-idm191622048}

We know three variables in this equation: [*A*]<sub>0</sub> = 0.200 mol/L, *k* = 5.76 $\times$ 10<sup>−2</sup> L/mol/min, and *t* = 10.0 min. Therefore, we can solve for [*A*], the fourth variable:

$$ \begin{array}{rll}\frac{1}{[A{]}_{t}} & = & (5.76\;\times \;{10}^{−2}\;{\text{L mol}}^{−1}\;{min}^{−1})\;(10\;\text{min})+\;\frac{1}{0.200\;{\text{mol}}^{−1}} \\ \frac{1}{[A{]}_{t}} & = & (5.76\;\times \;{10}^{−1}\;{\text{L mol}}^{−1})+5.00\;{\text{L mol}}^{−1} \\ \frac{1}{[A{]}_{t}} & = & 5.58\;{\text{L mol}}^{−1} \\ [A{]}_{t} & = & 1.79\;\times \;{10}^{−1}\;{\text{mol L}}^{−1}\end{array} $$  {eq:fs-idp58774528}

Therefore 0.179 mol/L of butadiene remain at the end of 10.0 min, compared to the 0.200 mol/L that was originally present.
**Check Your Learning**
If the initial concentration of butadiene is 0.0200 *M*, what is the concentration remaining after 20.0 min?

:::note [answer] Answer:
0.0195 mol/L
:::
:::
The integrated rate law for second-order reactions has the form of the equation of a straight line:

$$ \begin{array}{rll}\frac{1}{[A{]}_{t}} & = & kt+\;\frac{1}{{[A]}_{0}} \\ y & = & mx+b\end{array} $$  {eq:fs-idm140436832}

A plot of $\frac{1}{[A{]}_{t}}$ versus *t* for a second-order reaction is a straight line with a slope of *k* and a *y*-intercept of $\frac{1}{{[A]}_{0}}.$ If the plot is not a straight line, then the reaction is not second order.

:::example {ex:fs-idp69093472} Graphical Determination of Reaction Order and Rate Constant
The data below are for the same reaction described in [ref:fs-idm85213520]. Prepare and compare two appropriate data plots to identify the reaction as being either first or second order. After identifying the reaction order, estimate a value for the rate constant.
**Solution**

> TABLE {tab:fs-idm140502592} cols=3 class=unnumbered
> summary: This table contains two columns and six rows. The first row is a header row and it labels each column, “Time ( s ),” and “[ C subscript 4 H subscript 6 ] ( M ).”  Under the “Time ( s )” column are the numbers: 0, 1600, 3200, 4800, and 6200. Under the column “[ C subscript 4 H subscript 6 ] ( M )” are the numbers: 1.00 times ten to the negative 2; 5.04 times ten to the negative 3; 3.37 times ten to the negative 3; 2.53 times ten to the negative 3; and 2.08 times ten to the negative 3.

| Time (s) | [C<sub>4</sub>H<sub>6</sub>] (*M*) |
| --- | --- | --- |
| 0 | 1.00 $\times$ 10<sup>−2</sup> |
| 1600 | 5.04 $\times$ 10<sup>−3</sup> |
| 3200 | 3.37 $\times$ 10<sup>−3</sup> |
| 4800 | 2.53 $\times$ 10<sup>−3</sup> |
| 6200 | 2.08 $\times$ 10<sup>−3</sup> |

In order to distinguish a first-order reaction from a second-order reaction, prepare a plot of ln[C<sub>4</sub>H<sub>6</sub>]<sub>*t*</sub> versus *t* and compare it to a plot of $\frac{\text{1}}{[{\text{C}}_{4}{\text{H}}_{6}{]}_{t}}$ versus *t*. The values needed for these plots follow.

> TABLE {tab:fs-idp62232800} cols=3 class=unnumbered
> summary: This table contains three columns and six rows. The first row is a header row and it labels each column, “Time ( s ),” “1 over [ C subscript 4 H subscript 6 ] ( M superscript negative 1 ),” and “l n [ C subscript 4 H subscript 6 ].” Under the column “Time ( s )” are the numbers: 0, 1600, 3200, 4800, and 6200. Under the “1 over [ C subscript 4 H subscript 6 ] ( M superscript negative 1 )” column are the numbers: 100, 198, 296, 395, and 481. Under the “l n [ C subscript 4 H subscript 6 ]” column are the numbers: negative 4.605, negative 5.289, negative 5.692, negative 5.978, and negative 6.175.

| Time (s) | $\frac{1}{[{\text{C}}_{4}{\text{H}}_{6}]}\;({M}^{−1})$ | ln[C<sub>4</sub>H<sub>6</sub>] |
| --- | --- | --- |
| 0 | 100 | −4.605 |
| 1600 | 198 | −5.289 |
| 3200 | 296 | −5.692 |
| 4800 | 395 | −5.978 |
| 6200 | 481 | −6.175 |

The plots are shown in [ref:CNX_Chem_12_04_2OrdKin], which clearly shows the plot of ln[C<sub>4</sub>H<sub>6</sub>]<sub>*t*</sub> versus *t* is not linear, therefore the reaction is not first order. The plot of $\frac{1}{[{\text{C}}_{4}{\text{H}}_{6}{]}_{t}}$ versus *t* is linear, indicating that the reaction is second order.

> FIGURE {fig:CNX_Chem_12_04_2OrdKin} src=../../media/CNX_Chem_12_04_2OrdKin.jpg class=scaled-down
> alt: Two graphs are shown, each with the label “Time ( s )” on the x-axis. The graph on the left is labeled, “l n [ C subscript 4 H subscript 6 ],” on the y-axis. The graph on the right is labeled “1 divided by [ C subscript 4 H subscript 6 ],” on the y-axis. The x-axes for both graphs show markings at 3000 and 6000. The y-axis for the graph on the left shows markings at negative 6, negative 5, and negative 4. A decreasing slightly concave up curve is drawn through five points at coordinates that are (0, negative 4.605), (1600, negative 5.289), (3200, negative 5.692), (4800, negative 5.978), and (6200, negative 6.175). The y-axis for the graph on the right shows markings at 100, 300, and 500. An approximately linear increasing curve is drawn through five points at coordinates that are (0, 100), (1600, 198), (3200, 296), and (4800, 395), and (6200, 481).
> caption: These two graphs show first- and second-order plots for the dimerization of C<sub>4</sub>H<sub>6</sub>. The linear trend in the second-order plot (right) indicates that the reaction follows second-order kinetics.

According to the second-order integrated rate law, the rate constant is equal to the slope of the $\frac{1}{[A{]}_{t}}$ versus *t* plot. Using the data for *t* = 0 *s* and *t* = 6200 *s*, the rate constant is estimated as follows:

$$ k=\text{slope}=\frac{(481\;{M}^{−1}-100\;{M}^{−1})}{(6200\;\text{s}-0\;\text{s})}=0.0614\;{\text{M}}^{−1}\;{\text{s}}^{−1} $$  {eq:fs-idm363866800}

**Check Your Learning**
Do the following data fit a second-order rate law?

> TABLE {tab:fs-idm88760288} cols=3 class=unnumbered
> summary: This table contains two columns and seven rows. The first row is a header row, and it labels each column “Time ( s )” and “[ A ] ( M ).” Under the “Time ( s )” column are the numbers: 5, 10, 15, 20, 25, and 35. Under the “[ A ] ( M )” column are the numbers 0.952, 0.625, 0.465, 0.370, 0.308, and 0.230.

| Time (s) | [*A*] (*M*) |
| --- | --- | --- |
| 5 | 0.952 |
| 10 | 0.625 |
| 15 | 0.465 |
| 20 | 0.370 |
| 25 | 0.308 |
| 35 | 0.230 |

:::note [answer] Answer:
Yes. The plot of $\frac{1}{[A{]}_{t}}$ vs. *t* is linear:

> IMAGE {img:fs-idm144508704} src=../../media/CNX_Chem_12_04_CYL2_img.jpg class=scaled-down
> alt: A graph, with the title “1 divided by [ A ] vs. Time” is shown, with the label, “Time ( s ),” on the x-axis. The label “1 divided by [ A ]” appears left of the y-axis. The x-axis shows markings beginning at zero and continuing at intervals of 10 up to and including 40. The y-axis on the left shows markings beginning at 0 and increasing by intervals of 1 up to and including 5. A line with an increasing trend is drawn through six points at approximately (4, 1), (10, 1.5), (15, 2.2), (20, 2.8), (26, 3.4), and (36, 4.4).

:::
:::

## Zero-Order Reactions
For zero-order reactions, the differential rate law is:

$$ \text{rate}=k $$  {eq:fs-idp24382368}

A zero-order reaction thus exhibits a constant reaction rate, regardless of the concentration of its reactant(s). This may seem counterintuitive, since the reaction rate certainly can’t be finite when the reactant concentration is zero. For purposes of this introductory text, it will suffice to note that zero-order kinetics are observed for some reactions only under certain specific conditions. These same reactions exhibit different kinetic behaviors when the specific conditions aren’t met, and for this reason the more prudent term *pseudo-zero-order* is sometimes used.
The integrated rate law for a zero-order reaction is a linear function:

$$ \begin{array}{rll}[A{]}_{t} & = & \text{−}kt+{[A]}_{0} \\ y & = & mx+b\end{array} $$  {eq:fs-idm130548304}

A plot of [*A*] versus *t* for a zero-order reaction is a straight line with a slope of *−k* and a *y*-intercept of [*A*]<sub>0</sub>. [ref:CNX_Chem_12_04_AmDecomK] shows a plot of [NH<sub>3</sub>] versus *t* for the thermal decomposition of ammonia at the surface of two different heated solids. The decomposition reaction exhibits first-order behavior at a quartz (SiO<sub>2</sub>) surface, as suggested by the exponentially decaying plot of concentration versus time. On a tungsten surface, however, the plot is linear, indicating zero-order kinetics.

:::example {ex:fs-idm339943456} Graphical Determination of Zero-Order Rate Constant
Use the data plot in [ref:CNX_Chem_12_04_AmDecomK] to graphically estimate the zero-order rate constant for ammonia decomposition at a tungsten surface.
**Solution**
The integrated rate law for zero-order kinetics describes a linear plot of reactant concentration, [*A*]<sub>*t*</sub>, versus time, *t*, with a slope equal to the negative of the rate constant, −*k*.  Following the mathematical approach of previous examples, the slope of the linear data plot (for decomposition on W) is estimated from the graph. Using the ammonia concentrations at *t* = 0 and *t* = 1000 s:

$$ k=\text{−slope}=-\frac{(0.0015\;\text{mol}\;{\text{L}}^{−1}-0.0028\;\text{mol}\;{\text{L}}^{−1})}{(1000\;\text{s}-0\;\text{s})}=1.3\;\times \;{10}^{−6}\;\text{mol}\;{\text{L}}^{−1}\;{\text{s}}^{−1} $$  {eq:fs-idm375658448}

**Check Your Learning**
The zero-order plot in [ref:CNX_Chem_12_04_AmDecomK] shows an initial ammonia concentration of 0.0028 mol L<sup>−1</sup> decreasing linearly with time for 1000 s. Assuming no change in this zero-order behavior, at what time (min) will the concentration reach 0.0001 mol L<sup>−1</sup>?

:::note [answer] Answer:
35 min
:::
:::

> FIGURE {fig:CNX_Chem_12_04_AmDecomK} src=../../media/CNX_Chem_12_04_AmDecomK.jpg class=scaled-down
> alt: A graph is shown with the label, “Time ( s ),” on the x-axis and, “[ N H subscript 3 ] M,” on the y-axis. The x-axis shows a single value of 1000 marked near the right end of the axis. The vertical axis shows markings at 1.0 times 10 superscript negative 3, 2.0 times 10 superscript negative 3, and 3.0 times 10 superscript negative 3. A decreasing linear trend line is drawn through six points at the approximate coordinates: (0, 2.8 times 10 superscript negative 3), (200, 2.6 times 10 superscript negative 3), (400, 2.3 times 10 superscript negative 3), (600, 2.0 times 10 superscript negative 3), (800, 1.8 times 10 superscript negative 3), and (1000, 1.6 times 10 superscript negative 3). This line is labeled “Decomposition on W.” A decreasing slightly concave up curve is similarly drawn through eight points at the approximate coordinates: (0, 2.8 times 10 superscript negative 3), (100, 2.5 times 10 superscript negative 3), (200, 2.1 times 10 superscript negative 3), (300, 1.9 times 10 superscript negative 3), (400, 1.6 times 10 superscript negative 3), (500, 1.4 times 10 superscript negative 3), and (750, 1.1 times 10 superscript negative 3), ending at about (1000, 0.7 times 10 superscript negative 3). This curve is labeled “Decomposition on S i O subscript 2.”
> caption: The decomposition of NH<sub>3</sub> on a tungsten (W) surface is a zero-order reaction, whereas on a quartz (SiO<sub>2</sub>) surface, the reaction is first order.

## The Half-Life of a Reaction
The {term:half-life of a reaction (*t*<sub>1/2</sub>)} is the time required for one-half of a given amount of reactant to be consumed. In each succeeding half-life, half of the remaining concentration of the reactant is consumed. Using the decomposition of hydrogen peroxide ([ref:CNX_Chem_12_01_KDataH2O2](module:m68786)) as an example, we find that during the first half-life (from 0.00 hours to 6.00 hours), the concentration of H<sub>2</sub>O<sub>2</sub> decreases from 1.000 *M* to 0.500 *M*. During the second half-life (from 6.00 hours to 12.00 hours), it decreases from 0.500 *M* to 0.250 *M*; during the third half-life, it decreases from 0.250 *M* to 0.125 *M*. The concentration of H<sub>2</sub>O<sub>2</sub> decreases by half during each successive period of 6.00 hours. The decomposition of hydrogen peroxide is a first-order reaction, and, as can be shown, the half-life of a first-order reaction is independent of the concentration of the reactant. However, half-lives of reactions with other orders depend on the concentrations of the reactants.

### First-Order Reactions
An equation relating the half-life of a first-order reaction to its rate constant may be derived from the integrated rate law as follows:

$$ \begin{array}{rll} \\ \text{ln}\;\frac{{[A]}_{0}}{[A{]}_{t}} & = & kt \\ t & = & \text{ln}\;\frac{{[A]}_{0}}{[A{]}_{t}}\;\times \;\frac{1}{k}\end{array} $$  {eq:fs-idm58156032}

Invoking the definition of half-life, symbolized ${t}_{1\text{/}2},$ requires that the concentration of *A* at this point is one-half its initial concentration: $t={t}_{1\text{/}2},$ $[A{]}_{t}=\;\frac{1}{2}{[A]}_{0}.$
Substituting these terms into the rearranged integrated rate law and simplifying yields the equation for half-life:

$$ \begin{array}{rll}{t}_{1\text{/}2} & = & \text{ln}\;\frac{{[A]}_{0}}{\frac{1}{2}{[A]}_{0}}\;\times \;\frac{1}{k} \\ & = & \text{ln}\;2\;\times \;\frac{1}{k}\;=0.693\;\times \;\frac{1}{k} \\ {t}_{1\text{/}2} & = & \frac{0.693}{k}\end{array} $$  {eq:fs-idp22354416}

This equation describes an expected inverse relation between the half-life of the reaction and its rate constant, *k*. Faster reactions exhibit larger rate constants and correspondingly shorter half-lives. Slower reactions exhibit smaller rate constants and longer half-lives.

:::example {ex:fs-idm35443680} Calculation of a First-order Rate Constant using Half-Life
Calculate the rate constant for the first-order decomposition of hydrogen peroxide in water at 40 °C, using the data given in [ref:CNX_Chem_12_04_HPerDcmp].

> FIGURE {fig:CNX_Chem_12_04_HPerDcmp} src=../../media/CNX_Chem_12_04_HPerDcmp.jpg class=scaled-down
> alt: A diagram of 5 beakers is shown, each approximately half-filled with colored substances. Beneath each beaker are three rows of text. The first beaker contains a bright green substance and is labeled below as, “1.000 M, 0 s, and ( 0 h ).” The second beaker contains a slightly lighter green substance and is labeled below as, “0.500 M, 2.16 times 10 superscript 4 s, and ( 6 h ).” The third beaker contains an even lighter green substance and is labeled below as, “0.250 M, 4.32 times 10 superscript 4 s, and ( 12 h ).” The fourth beaker contains a green tinted substance and is labeled below as, “0.125 M, 6.48 times 10 superscript 4 s, and ( 18 h ).” The fifth beaker contains a colorless substance and is labeled below as, “0.0625 M, 8.64 times 10 superscript 4 s, and ( 24 h ).”
> caption: The decomposition of H<sub>2</sub>O<sub>2</sub> $({\text{2H}}_{2}{\text{O}}_{2}\;\longrightarrow \;{\text{2H}}_{2}\text{O}+{\text{O}}_{2})$ at 40 °C is illustrated. The intensity of the color symbolizes the concentration of H<sub>2</sub>O<sub>2</sub> at the indicated times; H<sub>2</sub>O<sub>2</sub> is actually colorless.

**Solution**
Inspecting the concentration/time data in [ref:CNX_Chem_12_04_HPerDcmp] shows the half-life for the decomposition of H<sub>2</sub>O<sub>2</sub> is 2.16 $\times$ 10<sup>4</sup> s:

$$ \begin{array}{rll}{t}_{1\text{/}2} & = & \frac{0.693}{k} \\ k & = & \frac{0.693}{{t}_{1\text{/}2}}\;=\;\frac{0.693}{2.16\;\times \;{10}^{4}\;\text{s}}\;=3.21\;\times \;{10}^{−5}\;{\text{s}}^{−1}\end{array} $$  {eq:fs-idm2063184}

**Check Your Learning**
The first-order radioactive decay of iodine-131 exhibits a rate constant of 0.138 d<sup>−1</sup>. What is the half-life for this decay?

:::note [answer] Answer:
5.02 d.
:::
:::

### Second-Order Reactions
Following the same approach as used for first-order reactions, an equation relating the half-life of a second-order reaction to its rate constant and initial concentration may be derived from its integrated rate law:

$$ \frac{1}{[A{]}_{t}}\;=kt+\;\frac{1}{{[A]}_{0}} $$  {eq:fs-idm51410640}

or

$$ \frac{1}{[A]}\;-\;\frac{1}{{[A]}_{0}}\;=kt $$  {eq:fs-idp65846848}

Restrict *t* to *t*<sub>1/2</sub>

$$ t={t}_{1\text{/}2} $$  {eq:fs-idm22521392}

define [*A*]<sub>*t*</sub> as one-half [*A*]<sub>0</sub>

$$ [A{]}_{t}=\;\frac{1}{2}{[A]}_{0} $$  {eq:fs-idp30638736}

and then substitute into the integrated rate law and simplify:

$$ \begin{array}{rll}\frac{1}{\frac{1}{2}{[A]}_{0}}\;-\;\frac{1}{{[A]}_{0}} & = & k{t}_{1\text{/}2} \\ \frac{2}{{[A]}_{0}}-\;\frac{1}{{[A]}_{0}} & = & k{t}_{1\text{/}2} \\ \frac{1}{{[A]}_{0}} & = & k{t}_{1\text{/}2} \\ {t}_{1\text{/}2} & = & \frac{1}{k{[A]}_{0}}\end{array} $$  {eq:fs-idm125982128}

For a second-order reaction, ${t}_{1\text{/}2}$ is inversely proportional to the concentration of the reactant, and the half-life increases as the reaction proceeds because the concentration of reactant decreases. Unlike with first-order reactions, the rate constant of a second-order reaction cannot be calculated directly from the half-life unless the initial concentration is known.

### Zero-Order Reactions
As for other reaction orders, an equation for zero-order half-life may be derived from the integrated rate law:

$$ [A]=\text{−}kt+{[A]}_{0} $$  {eq:fs-idm118774848}

Restricting the time and concentrations to those defined by half-life: $t={t}_{1\text{/}2}$ and $[A]=\;\frac{{[A]}_{0}}{2}.$ Substituting these terms into the zero-order integrated rate law yields:

$$ \begin{array}{rll}\frac{{[\text{A}]}_{0}}{2} & = & \text{−}k{t}_{1\text{/}2}+{[\text{A}]}_{0} \\ k{t}_{1\text{/}2} & = & \frac{{[\text{A}]}_{0}}{2} \\ {t}_{1\text{/}2} & = & \frac{{[A]}_{0}}{2k}\end{array} $$  {eq:fs-idp5725728}

As for all reaction orders, the half-life for a zero-order reaction is inversely proportional to its rate constant. However, the half-life of a zero-order reaction increases as the initial concentration increases.
Equations for both differential and integrated rate laws and the corresponding half-lives for zero-, first-, and second-order reactions are summarized in [ref:fs-idm117482272].

> TABLE {tab:fs-idm117482272} cols=4 class=top-titled
> title: Summary of Rate Laws for Zero-, First-, and Second-Order Reactions
> summary: This table contains four columns and seven rows. The first column and the first row both serve as headers. The first cell in the first column is blank and is followed by, “rate law,” “units of rate constant,” “integrated rate law,” “plot needed for linear fit of rate date,” “relationship between slope of linear plot and rate constant,” and “half-life.” The first row labels each column, “Zero-Order,” “First-Order,” and “Second-Order.” Under “Zero-order” are the following: “rate = k,” “M s superscript negative 1,” “[ A ] = negative k t + [ A ] subscript 0,” “[ A ] v s. t,” “k = negative slope,” and “t subscript one half = [ A ] subscript 0 over 2 k.” Under “First-Order” are the following: “rate = k [ A ],” “s superscript negative 1,” “l n [ A ] = negative k t plus l n [ A ] subscript 0,” “l n [ A ] v s. t,” “k = negative slope,” and “t subscript one half = 0.693 over k.” Under “Second-Order” are the following: “rate = k [ A ] superscript 2,” “M superscript negative 1 s superscript negative 1,” “1 over [ A ] = k t + ( 1 over [ A ] subscript 0 ),” “1 over [ A ] v s. t,” “k = positive slope,” and “t subscript one half – 1 over [ A ] subscript 0 k.”

|  | Zero-Order | First-Order | Second-Order |
| --- | --- | --- | --- |
| rate law | rate = *k* | rate = *k*[*A*] | rate = *k*[*A*]<sup>2</sup> |
| units of rate constant | *M* s<sup>−1</sup> | s<sup>−1</sup> | *M*<sup>−1</sup> s<sup>−1</sup> |
| integrated rate law | $[A]=\text{−}kt+[A{]}_{0}$ | $\text{ln}[A]=\text{−}kt+\text{ln}[A{]}_{0}$ | $\frac{1}{[A]}\;=kt+(\frac{1}{{[A]}_{0}})$ |
| plot needed for linear fit of rate data | [*A*] vs. *t* | ln[*A*] vs. *t* | $\frac{1}{[A]}$ vs. *t* |
| relationship between slope of linear plot and rate constant | *k* = −slope | *k* = −slope | *k* = slope |
| half-life | ${t}_{1\text{/}2}=\;\frac{{[A]}_{0}}{2k}$ | ${t}_{1\text{/}2}=\frac{0.693}{k}$ | ${t}_{1\text{/}2}=\frac{1}{{[A]}_{0}k}$ |

:::example {ex:fs-idm494886672} Half-Life for Zero-Order and Second-Order Reactions
What is the half-life for the butadiene dimerization reaction described in [ref:fs-idm85213520]?
**Solution**
The reaction in question is second order, is initiated with a 0.200 mol L<sup>−1</sup> reactant solution, and exhibits a rate constant of 0.0576 L mol<sup>−1</sup> min<sup>−1</sup>. Substituting these quantities into the second-order half-life equation:

$$ \begin{array}{rll}{t}_{1\text{/}2} & = & \frac{1}{[(0.0576\;\text{L}\;{\text{mol}}^{−1}\;{\text{min}}^{−1})(0.200\;\text{mol}\;{\text{L}}^{−1})]}=86.8\;\text{min}\end{array} $$  {eq:fs-idm493908080}

**Check Your Learning**
What is the half-life (min) for the thermal decomposition of ammonia on tungsten (see [ref:fs-idm339943456])?

:::note [answer] Answer:
18 min
:::
:::

## Key Concepts and Summary {section:summary}
Integrated rate laws are mathematically derived from differential rate laws, and they describe the time dependence of reactant and product concentrations.
The half-life of a reaction is the time required to decrease the amount of a given reactant by one-half. A reaction’s half-life varies with rate constant and, for some reaction orders, reactant concentration. The half-life of a zero-order reaction decreases as the initial concentration of the reactant in the reaction decreases. The half-life of a first-order reaction is independent of concentration, and the half-life of a second-order reaction decreases as the concentration increases.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| integrated rate law for zero-order reactions: $[A{]}_{t}=\text{−}kt+{[A]}_{0},$ |
| half-life for a zero-order reaction ${t}_{1\text{/}2}=\;\frac{{[A]}_{0}}{2k}$ |
| integrated rate law for first-order reactions: $\text{ln}[A{]}_{t}=\text{−}kt+\text{ln}{[A]}_{0},$ |
| half-life for a first-order reaction ${t}_{1\text{/}2}=\;\frac{0.693}{k}$ |
| integrated rate law for second-order reactions: $\frac{1}{[A{]}_{t}}\;=kt+\;\frac{1}{{[A]}_{0}},$ |
| half-life for a second-order reaction ${t}_{1\text{/}2}=\;\frac{1}{{[A]}_{0}k}$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp11885680} type= 
PROBLEM:
Describe how graphical methods can be used to determine the order of a reaction and its rate constant from a series of data that includes the concentration of *A* at varying times.
:::

:::exercise {fs-idp145037952} type= 
PROBLEM:
Use the data provided to graphically determine the order and rate constant of the following reaction: ${\text{SO}}_{2}{\text{Cl}}_{2}\;\longrightarrow \;{\;\text{SO}}_{2}+{\text{Cl}}_{2}$

> TABLE {tab:fs-idp120830736} cols=5 class=column-header unnumbered irregular
> summary: This table contains two columns and eight rows. The first column is labeled, “Time ( s ),” and the second column is labeled, “[ S O subscript 2 C l subscript 2 ] ( M ).” Under the “Time ( s )” column are the numbers: 0; 5.00 times ten to the third power; 1.00 times ten to the fourth power; 1.50 times ten to the fourth power; 2.50 times ten to the fourth power; 3.00 times ten to the fourth power; and 4.00 times ten to the fourth power. Under the “[ S O subscript 2 C l subscript 2 ] ( M )” column are the numbers: 0.100, 0.0896, 0.0802, 0.0719, 0.0577, 0.0517, and 0.0415.

| Time (s) | 0 | 5.00 $\times$ 10<sup>3</sup> | 1.00 $\times$ 10<sup>4</sup> | 1.50 $\times$ 10<sup>4</sup> |
| [SO<sub>2</sub>Cl<sub>2</sub>] (*M*) | 0.100 | 0.0896 | 0.0802 | 0.0719 |
| Time (s) | 2.50 $\times$ 10<sup>4</sup> | 3.00 $\times$ 10<sup>4</sup> | 4.00 $\times$ 10<sup>4</sup> | {rows=2}  |
| [SO<sub>2</sub>Cl<sub>2</sub>] (*M*) | 0.0577 | 0.0517 | 0.0415 |

SOLUTION:
Plotting a graph of ln[SO<sub>2</sub>Cl<sub>2</sub>] versus *t* reveals a linear trend; therefore we know this is a first-order reaction:

> IMAGE {img:fs-idm141495696} src=../../media/CNX_Chem_12_04_Exercise02_img.jpg
> alt: A graph is shown with the label “Time ( s )” on the x-axis and “l n [ S O subscript 2 C l subscript 2 ] M” on the y-axis. The x-axis begins at 0 and extends to 4.00 times 10 superscript 4 with markings every 1.00 times 10 superscript 4. The y-axis shows markings extending from negative 3.5 to negative 2.5. A decreasing linear trend line is drawn through seven points at the approximate coordinates: (0, negative 2.3), (0.5 times 10 superscript 4, negative 2.4), (1.0 times 10 superscript 4, negative 2.5), (1.5 times 10 superscript 4, negative 2.6), (2.0 times 10 superscript 4, negative 2.9), (2.5 times 10 superscript 4, negative 3.0), and (3.0 times 10 superscript 4, negative 3.2).

*k* = 2.20 $\times$ 10<sup>–5</sup> s<sup>−1</sup>
:::

:::exercise {fs-idp27819360} type= 
PROBLEM:
Pure ozone decomposes slowly to oxygen, ${\text{2O}}_{3}(g)\;\longrightarrow \;{\text{3O}}_{2}(g).$ Use the data provided in a graphical method and determine the order and rate constant of the reaction.

> TABLE {tab:fs-idp72766816} cols=5 class=column-header unnumbered irregular
> summary: This table has two columns and eight rows. The first row is a header row, and it labels each column, “Time ( h ),” and, “[ O subscript 3 ] ( M ).” Under the “Time ( h )” column are the numbers: 0; 2.0 times ten to the third power; 7.6 times ten to the third power; 1.00 times ten to the fourth power; 1.23 times ten to the fourth power; 1.43 times ten to the fourth power; 1.70 times ten to the fourth power. Under the “[ O subscript 3 ] ( M )” column are the numbers: 1.00 times ten to the negative 5; 4.98 times ten to the negative 6; 2.07 times ten to the negative 6; 1.66 times ten to the negative 6; 1.39 times ten to the negative 6; 1.22 times ten to the negative 6; and 1.05 times ten to the negative 6.

| Time (h) | 0 | 2.0 $\times$ 10<sup>3</sup> | 7.6 $\times$ 10<sup>3</sup> | 1.00 $\times$ 10<sup>4</sup> |
| [O<sub>3</sub>] (*M*) | 1.00 $\times$ 10<sup>−5</sup> | 4.98 $\times$ 10<sup>−6</sup> | 2.07 $\times$ 10<sup>−6</sup> | 1.66 $\times$ 10<sup>−6</sup> |
| Time (h) | 1.23 $\times$ 10<sup>4</sup> | 1.43 $\times$ 10<sup>4</sup> | 1.70 $\times$ 10<sup>4</sup> | {rows=2}  |
| [O<sub>3</sub>] (*M*) | 1.39 $\times$ 10<sup>−6</sup> | 1.22 $\times$ 10<sup>−6</sup> | 1.05 $\times$ 10<sup>−6</sup> |

SOLUTION:

> IMAGE {img:fs-idm95556784} src=../../media/CNX_Chem_12_04_Exercise04_img_new.jpg
> alt: A graph is shown with the label, “t ( h ,)” on the x-axis and, “1 divided by [ O subscript 3 ] M,” on the y-axis. The x-axis shows markings at 0, 2 times 10 superscript 3, 6 times 10 superscript 3, 10 time 10 superscript 3, 14 times 10 superscript 3, and 18 times 10 superscript 3. The y-axis shows markings beginning at 0, increasing by 1 up to and including 9. An increasing linear trend line is drawn through seven points at the coordinates: (0, 1.00), (2.0 times 10 superscript 3, 2.01), (7.6 times 10 superscript 3, 4.83), (1.00 times 10 superscript 4, 6.02), (1.23 times 10 superscript 4 , 6.02), (1.43 times 10 superscript 4, 8.20) and (1.70 times 10 superscript 4, 9.52). A horizontal line segment is drawn through the first point and a vertical line segment is similarly drawn through the last point to make a right triangle on the graph. The horizontal leg of the triangle is labeled “ capital delta t.” The vertical leg is labeled “capital delta 1 divided by [ O subscript 3 ].”

The plot is nicely linear, so the reaction is second order. *k* = 50.1 L mol<sup>−1</sup> h<sup>−1</sup>
:::

:::exercise {fs-idm81797520} type= 
PROBLEM:
From the given data, use a graphical method to determine the order and rate constant of the following reaction:
$2X\;\longrightarrow \;Y+Z$

> TABLE {tab:fs-idm133654768} cols=9 class=column-header unnumbered
> summary: This table contains two columns and nine rows. The first row is a header row, and it labels each column, “Time ( s ),” and “[ X ] ( M ).” Under the “Time ( s )” column are the numbers: 5.0, 10.0, 15.0, 20.0, 25.0, 30.0, 35.0, and 40.0. Under the “[ X ] ( M )” column are the numbers; 0.0990, 0.497, 0.0332, 0.0249, 0.0200, 0.0166, 0.0143, and 0.0125.

|  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Time (s) | 5.0 | 10.0 | 15.0 | 20.0 | 25.0 | 30.0 | 35.0 | 40.0 |
| [*X*] (*M*) | 0.0990 | 0.0497 | 0.0332 | 0.0249 | 0.0200 | 0.0166 | 0.0143 | 0.0125 |

:::

:::exercise {fs-idm81821952} type= 
PROBLEM:
What is the half-life for the first-order decay of phosphorus-32? $({}_{15}^{32}\text{P}\;\longrightarrow \;{}_{16}^{32}\text{S}+{\text{e}}^{-})$ The rate constant for the decay is 4.85 $\times$ 10<sup>−2</sup> day<sup>−1</sup>.
SOLUTION:
14.3 d
:::

:::exercise {fs-idp123052496} type= 
PROBLEM:
What is the half-life for the first-order decay of carbon-14? $({}_{\;6}^{14}\text{C}\longrightarrow {}_{\;7}^{14}\text{N}+{\text{e}}^{-})$ The rate constant for the decay is 1.21 $\times$ 10<sup>−4</sup> year<sup>−1</sup>.
:::

:::exercise {fs-idm86787888} type= 
PROBLEM:
What is the half-life for the decomposition of NOCl when the concentration of NOCl is 0.15 *M*? The rate constant for this second-order reaction is 8.0 $\times$ 10<sup>−8</sup> L mol<sup>−1</sup> s<sup>−1</sup>.
SOLUTION:
8.3 $\times$ 10<sup>7</sup> s
:::

:::exercise {fs-idm71090800} type= 
PROBLEM:
What is the half-life for the decomposition of O<sub>3</sub> when the concentration of O<sub>3</sub> is 2.35 $\times$ 10<sup>−6</sup> *M*? The rate constant for this second-order reaction is 50.4 L mol<sup>−1</sup> h<sup>−1</sup>.
:::

:::exercise {fs-idm110943344} type= 
PROBLEM:
The reaction of compound  *A* to give compounds  *C* and  *D* was found to be second-order in  *A*. The rate constant for the reaction was determined to be 2.42 L mol<sup>−1</sup> s<sup>−1</sup>. If the initial concentration is 0.500 mol/L, what is the value of t<sub>1/2</sub>?
SOLUTION:
0.826 s
:::

:::exercise {fs-idm82644240} type= 
PROBLEM:
The half-life of a reaction of compound *A* to give compounds *D* and *E* is 8.50 min when the initial concentration of *A* is 0.150 M. How long will it take for the concentration to drop to 0.0300 M if the reaction is (a) first order with respect to *A* or (b) second order with respect to *A*?
:::

:::exercise {fs-idp55838576} type= 
PROBLEM:
Some bacteria are resistant to the antibiotic penicillin because they produce penicillinase, an enzyme with a molecular weight of 3 $\times$ 10<sup>4</sup> g/mol that converts penicillin into inactive molecules. Although the kinetics of enzyme-catalyzed reactions can be complex, at low concentrations this reaction can be described by a rate law that is first order in the catalyst (penicillinase) and that also involves the concentration of penicillin. From the following data: 1.0 L of a solution containing 0.15 µg (0.15 $\times$ 10<sup>−6</sup> g) of penicillinase, determine the order of the reaction with respect to penicillin and the value of the rate constant.

> TABLE {tab:fs-idp79245440} cols=2 class=unnumbered
> summary: This table contains two columns and four rows. The first row is a header row, and it labels each column, “[ Penicillin ] ( M ),” and, “Rate ( mol / L / min ).” Under the “[ Penicillin ] ( M )” column are the numbers: 2.0 times ten to the negative six; 3.0 times ten to the negative six; and 4.0 times ten to the negative 6. Under the “Rate ( mol / L / min )” column are the numbers: 1.0 times ten to the negative ten; 1.5 times ten to the negative 10; and 2.0 times ten to the negative 10.

| [Penicillin] (*M*) | Rate (mol L<sup>−1</sup> min<sup>−1</sup>) |
| --- | --- |
| 2.0 $\times$ 10<sup>−6</sup> | 1.0 $\times$ 10<sup>−10</sup> |
| 3.0 $\times$ 10<sup>−6</sup> | 1.5 $\times$ 10<sup>−10</sup> |
| 4.0 $\times$ 10<sup>−6</sup> | 2.0 $\times$ 10<sup>−10</sup> |

SOLUTION:
The reaction is first order. *k* = 1.0 $\times$ 10<sup>7</sup> L mol<sup>−1</sup> min<sup>−1</sup>
:::

:::exercise {fs-idm22532944} type= 
PROBLEM:
Both technetium-99 and thallium-201 are used to image heart muscle in patients with suspected heart problems. The half-lives are 6 h and 73 h, respectively. What percent of the radioactivity would remain for each of the isotopes after 2 days (48 h)?
:::

:::exercise {fs-idm84405632} type= 
PROBLEM:
There are two molecules with the formula C<sub>3</sub>H<sub>6</sub>. Propene, ${\text{CH}}_{3}\text{CH}={\text{CH}}_{2},$ is the monomer of the polymer polypropylene, which is used for indoor-outdoor carpets. Cyclopropane is used as an anesthetic:

> IMAGE {img:fs-idm21764176} src=../../media/CNX_Chem_12_04_Cycloprop_img.jpg
> alt: A structural formula for cyclopropane is shown. Three C H subscript 2 groups are positioned as vertices of an equilateral triangle connected with single bonds represented by line segments.

When heated to 499 °C, cyclopropane rearranges (isomerizes) and forms propene with a rate constant of
5.95 $\times$ 10<sup>−4</sup> s<sup>−1</sup>. What is the half-life of this reaction? What fraction of the cyclopropane remains after 0.75 h at 499 °C?
SOLUTION:
1.16 × 10<sup>3</sup> s ; 20% remains
:::

:::exercise {fs-idm45932336} type= 
PROBLEM:
Fluorine-18 is a radioactive isotope that decays by positron emission to form oxygen-18 with a half-life of 109.7 min. (A positron is a particle with the mass of an electron and a single unit of positive charge; the equation is $\;{}_{9}^{18}\text{F}\longrightarrow {}_{\;8}^{18}\text{O}+{}_{+1}^{\;0}\text{e})$  Physicians use <sup>18</sup>F to study the brain by injecting a quantity of fluoro-substituted glucose into the blood of a patient. The glucose accumulates in the regions where the brain is active and needs nourishment.
(a) What is the rate constant for the decomposition of fluorine-18?
(b) If a sample of glucose containing radioactive fluorine-18 is injected into the blood, what percent of the radioactivity will remain after 5.59 h?
(c) How long does it take for 99.99% of the <sup>18</sup>F to decay?
:::

:::exercise {fs-idp89138768} type= 
PROBLEM:
Suppose that the half-life of steroids taken by an athlete is 42 days. Assuming that the steroids biodegrade by a first-order process, how long would it take for $\frac{1}{64}$ of the initial dose to remain in the athlete’s body?
SOLUTION:
252 days
:::

:::exercise {fs-idp120051200} type= 
PROBLEM:
Recently, the skeleton of King Richard III was found under a parking lot in England. If tissue samples from the skeleton contain about 93.79% of the carbon-14 expected in living tissue, what year did King Richard III die? The half-life for carbon-14 is 5730 years.
:::

:::exercise {fs-idp157675232} type= 
PROBLEM:
Nitroglycerine is an extremely sensitive explosive. In a series of carefully controlled experiments, samples of the explosive were heated to 160 °C and their first-order decomposition studied. Determine the average rate constants for each experiment using the following data:

> TABLE {tab:fs-idp121895360} cols=9 class=column-header unnumbered
> summary: This table contains three columns and nine rows. The first row is a header row, and it labels each column, “Initial [ C subscript 3 H subscript 5 N subscript 3 O subscript 9 ] ( M ),” “t ( s ),” and “% Decomposed.” Under the “Initial [ C subscript 3 H subscript 5 N subscript 3 O subscript 9 ] ( M )” column are the numbers: 4.88, 3.52, 2.29, 1.81, 5.33, 4.05, 2.95, and 1.72. Under the “t ( s )” column are the numbers: 300, 300, 300, 300, 180, 180, 180, and 180. Under the “% Decomposed” column are the numbers: 52.0, 52.9, 53.2, 53.9, 34.6, 35.9, 36.0, and 35.4.

|  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Initial [C<sub>3</sub>H<sub>5</sub>N<sub>3</sub>O<sub>9</sub>] (*M*) | 4.88 | 3.52 | 2.29 | 1.81 | 5.33 | 4.05 | 2.95 | 1.72 |
| *t* (s) | 300 | 300 | 300 | 300 | 180 | 180 | 180 | 180 |
| % Decomposed | 52.0 | 52.9 | 53.2 | 53.9 | 34.6 | 35.9 | 36.0 | 35.4 |

SOLUTION:

> TABLE {tab:fs-idm247275488} cols=2 class=unnumbered
> summary: This table has five columns and nine rows. The first row is a header row, and it labels each column: “[ A ] subscript 0 ( M ),” “[ A ] ( M ),” “l n ( [ A ] subscript 0 over [ A ] ),” “t ( s ),” and “k times 10 to the third power ( s superscript negative 1 ).” Under the “[ A ] subscript 0 ( M )” column are the numbers: 4.88, 3.52, 2.29, 1.81, 5.33, 4.05, 2.95, and 1.72. Under the “[ A ] ( M )” column are the numbers: 2.34, 1.66, 1.07, 0.834, 3.49, 2.61, 1.89, and 1.11. Under the “l n ( [ A ] subscript 0 over [ A ] )” column are the numbers: 0.734, 0.752, 0.761, 0.775, 0.423, 0.439, 0.445, and 0.438. Under the “t ( s )” column are the numbers: 300, 300, 300, 300, 180, 180, 180, and 180. Under the “k times 10 to the third power ( s superscript negative 1 )” columns are the numbers: 2.45, 2.51, 2.54, 2.58, 2.35, 2.44, 2.47, and 2.43.

| [*A*]<sub>0</sub> (*M*) | *k* $\times$ 10<sup>3</sup> (s<sup>−1</sup>) |
| --- | --- |
| 4.88 | 2.45 |
| 3.52 | 2.51 |
| 2.29 | 2.53 |
| 1.81 | 2.58 |
| 5.33 | 2.36 |
| 4.05 | 2.47 |
| 2.95 | 2.48 |
| 1.72 | 2.43 |

:::

:::exercise {fs-idm43018880} type= 
PROBLEM:
For the past 10 years, the unsaturated hydrocarbon 1,3-butadiene $({\text{CH}}_{\text{2}}=\text{CH}-\text{CH}={\text{CH}}_{2})$ has ranked 38th among the top 50 industrial chemicals. It is used primarily for the manufacture of synthetic rubber. An isomer exists also as cyclobutene:

> IMAGE {img:fs-idp18440944} src=../../media/CNX_Chem_12_04_ExSolutio2_img.jpg
> alt: A structural formula for cyclobutene is shown. The figure has two C H subscript 2 groups as the upper two vertices of a square structure. These groups are connected by a single, short line segment. Line segments extend below each of these C H subscript 2 groups to C H groups positioned at the lower two vertices of the square structure. The C H groups are connected with a double line segment indicating a double bond.

The isomerization of cyclobutene to butadiene is first-order and the rate constant has been measured as 2.0 $\times$ 10<sup>−4</sup> s<sup>−1</sup> at 150 °C in a 0.53-L flask. Determine the partial pressure of cyclobutene and its concentration after 30.0 minutes if an isomerization reaction is carried out at 150 °C with an initial pressure of 55 torr.
:::

## Glossary
- {def} **half-life of a reaction (*t*<sub>l/2</sub>)**: time required for half of a given amount of reactant to be consumed
- {def} **integrated rate law**: equation that relates the concentration of a reactant to elapsed time of reaction
