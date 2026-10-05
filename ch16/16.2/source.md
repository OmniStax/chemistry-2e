# Entropy

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Define entropy
- Explain the relationship between entropy and the number of microstates
- Predict the sign of the entropy change for chemical and physical processes

In 1824, at the age of 28, Nicolas Léonard Sadi {index:Carnot} ([ref:CNX_Chem_16_03_Carnot]) published the results of an extensive study regarding the efficiency of steam heat engines. A later review of Carnot’s findings by Rudolf {index:Clausius} introduced a new thermodynamic property that relates the spontaneous heat flow accompanying a process to the temperature at which the process takes place. This new property was expressed as the ratio of the *reversible* heat (*q*<sub>rev</sub>) and the kelvin temperature (*T*). In thermodynamics, a {term:reversible process} is one that takes place at such a slow rate that it is always at equilibrium and its direction can be changed (it can be “reversed”) by an infinitesimally small change in some condition. Note that the idea of a reversible process is a formalism required to support the development of various thermodynamic concepts; no real processes are truly reversible, rather they are classified as *irreversible*.

> FIGURE {fig:CNX_Chem_16_03_Carnot} src=../../media/CNX_Chem_16_03_Carnot.jpg class=scaled-down
> alt:  A portrait of Rudolf Clasius is shown.
> caption: (a) Nicholas Léonard Sadi Carnot’s research into steam-powered machinery and (b) Rudolf Clausius’s later study of those findings led to groundbreaking discoveries about spontaneous heat flow processes.

Similar to other thermodynamic properties, this new quantity is a state function, so its change depends only upon the initial and final states of a system. In 1865, Clausius named this property {term:entropy (*S*)} and defined its change for any process as the following:

$$ \text{Δ}S=\;\frac{{q}_{\text{rev}}}{T} $$  {eq:fs-idm146915824}

The entropy change for a real, irreversible process is then equal to that for the theoretical reversible process that involves the same initial and final states.

## Entropy and Microstates
Following the work of Carnot and Clausius, Ludwig {index:Boltzmann} developed a molecular-scale statistical model that related the entropy of a system to the *number of microstates* (*W*) possible for the system. A {term:microstate} is a specific configuration of all the locations and energies of the atoms or molecules that make up a system. The relation between a system’s entropy and the number of possible microstates is

$$ S=k\;\text{ln}\;W $$  {eq:fs-idp33531488}

where *k* is the Boltzmann constant, 1.38 $\times$ 10<sup>−23</sup> J/K.
As for other state functions, the change in entropy for a process is the difference between its final (*S*<sub>f</sub>) and initial (*S*<sub>i</sub>) values:

$$ \text{Δ}S={S}_{\text{f}}-{S}_{\text{i}}=k\;\text{ln}\;{W}_{\text{f}}-k\;\text{ln}\;{W}_{\text{i}}=k\;\text{ln}\;\frac{{W}_{\text{f}}}{{W}_{\text{i}}} $$  {eq:fs-idm76606496}

For processes involving an increase in the number of microstates, *W*<sub>f</sub> > *W*<sub>i</sub>, the entropy of the system increases and Δ*S* > 0. Conversely, processes that reduce the number of microstates, *W*<sub>f</sub> < *W*<sub>i</sub>, yield a decrease in system entropy, Δ*S* < 0. This molecular-scale interpretation of entropy provides a link to the probability that a process will occur as illustrated in the next paragraphs.
Consider the general case of a system comprised of *N* particles distributed among *n* boxes. The number of microstates possible for such a system is *n<sup>N</sup>*. For example, distributing four particles among two boxes will result in 2<sup>4</sup> = 16 different microstates as illustrated in [ref:CNX_Chem_16_02_Microstates]. Microstates with equivalent particle arrangements (not considering individual particle identities) are grouped together and are called *distributions*. The probability that a system will exist with its components in a given distribution is proportional to the number of microstates within the distribution. Since entropy increases logarithmically with the number of microstates, *the most probable distribution is therefore the one of greatest entropy*.

> FIGURE {fig:CNX_Chem_16_02_Microstates} src=../../media/CNX_Chem_16_02_Microstates.jpg
> alt: Five rows of diagrams that look like dominoes are shown and labeled a, b, c, d, and e. Row a has one “domino” that has four dots on the left side, red, green, blue and yellow in a clockwise pattern from the top left, and no dots on the right. Row b has four “dominos,” each with three dots on the left and one dot on the right. The first shows a “domino” with green, yellow and blue on the left and red on the right. The second “domino” has yellow, blue and red on the left and green on the right. The third “domino” has red, green and yellow on the left and blue on the right while the fourth has red, green and blue on the left and yellow on the right. Row c has six “dominos”, each with two dots on either side. The first has a red and green on the left and a blue and yellow on the right. The second has a red and blue on the left and a green and yellow on the right while the third has a yellow and red on the left and a green and blue on the right. The fourth has a green and blue on the left and a red and yellow on the right. The fifth has a green and yellow on the left and a red and blue on the right. The sixth has a blue and yellow on the left and a green and red on the right. Row d has four “dominos,” each with one dot on the left and three on the right. The first “domino” has red on the left and a blue, green and yellow on the right. The second has a green on the left and a red, yellow and blue on the right. The third has a blue on the left and a red, green and yellow on the right. The fourth has a yellow on the left and a red, green and blue on the right. Row e has 1 “domino” with no dots on the left and four dots on the right that are red, green, blue and yellow.
> caption: The sixteen microstates associated with placing four particles in two boxes are shown. The microstates are collected into five distributions—(a), (b), (c), (d), and (e)—based on the numbers of particles in each box.

For this system, the most probable configuration is one of the six microstates associated with distribution (c) where the particles are evenly distributed between the boxes, that is, a configuration of two particles in each box. The probability of finding the system in this configuration is $\frac{6}{16}$ or $\frac{3}{8}.$ The least probable configuration of the system is one in which all four particles are in one box, corresponding to distributions (a) and (e), each with a probability of $\frac{1}{16}.$ The probability of finding all particles in only one box (either the left box or right box) is then $(\frac{1}{16}\;+\;\frac{1}{16})\;=\;\frac{2}{16}$ or $\frac{1}{8}.$
As you add more particles to the system, the number of possible microstates increases exponentially (2<sup>*N*</sup>). A macroscopic (laboratory-sized) system would typically consist of moles of particles (*N* ~ 10<sup>23</sup>), and the corresponding number of microstates would be staggeringly huge. Regardless of the number of particles in the system, however, the distributions in which roughly equal numbers of particles are found in each box are always the most probable configurations.
This matter dispersal model of entropy is often described qualitatively in terms of the *disorder* of the system. By this description, microstates in which all the particles are in a single box are the most ordered, thus possessing the least entropy. Microstates in which the particles are more evenly distributed among the boxes are more disordered, possessing greater entropy.
The previous description of an ideal gas expanding into a vacuum ([ref:CNX_Chem_16_02_Gas](module:m68816)) is a macroscopic example of this particle-in-a-box model. For this system, the most probable distribution is confirmed to be the one in which the matter is most uniformly dispersed or distributed between the two flasks. Initially, the gas molecules are confined to just one of the two flasks. Opening the valve between the flasks increases the volume available to the gas molecules and, correspondingly, the number of microstates possible for the system. Since *W*<sub>f</sub> > *W*<sub>i</sub>, the expansion process involves an increase in entropy (Δ*S* > 0) and is spontaneous.
A similar approach may be used to describe the spontaneous flow of heat. Consider a system consisting of two objects, each containing two particles, and two units of thermal energy (represented as “*”) in [ref:CNX_Chem_16_03_Energy]. The hot object is comprised of particles **A** and **B** and initially contains both energy units. The cold object is comprised of particles **C** and **D**, which initially has no energy units. Distribution (a) shows the three microstates possible for the initial state of the system, with both units of energy contained within the hot object. If one of the two energy units is transferred, the result is distribution (b) consisting of four microstates. If both energy units are transferred, the result is distribution (c) consisting of three microstates. Thus, we may describe this system by a total of ten microstates. The probability that the heat does not flow when the two objects are brought into contact, that is, that the system remains in distribution (a), is $\frac{3}{10}.$ More likely is the flow of heat to yield one of the other two distribution, the combined probability being $\frac{7}{10}.$ The most likely result is the flow of heat to yield the uniform dispersal of energy represented by distribution (b), the probability of this configuration being $\frac{4}{10}.$ This supports the common observation that placing hot and cold objects in contact results in spontaneous heat flow that ultimately equalizes the objects’ temperatures. And, again, this spontaneous process is also characterized by an increase in system entropy.

> FIGURE {fig:CNX_Chem_16_03_Energy} src=../../media/CNX_Chem_16_03_Energy.jpg class=scaled-down
> alt: Three rows labeled a, b, and c are shown and each contains rectangles with two sides where the left side is labeled, “A,” and “B,” and the right is labeled, “C,” and “D.” Row a has three rectangles where the first has a dot above and below the letter A, the second has a dot above the A and B, and the third which has a dot above and below the letter B. Row b has four rectangles; the first has a dot above A and C, the second has a dot above A and D, the third has a dot above B and C and the fourth has a dot above B and D. Row c has three rectangles; the first has a dot above and below the letter C, the second has a dot above C and D and the third has a dot above and below the letter D.
> caption: This shows a microstate model describing the flow of heat from a hot object to a cold object. (a) Before the heat flow occurs, the object comprised of particles **A** and **B** contains both units of energy and as represented by a distribution of three microstates. (b) If the heat flow results in an even dispersal of energy (one energy unit transferred), a distribution of four microstates results. (c) If both energy units are transferred, the resulting distribution has three microstates.

:::example {ex:fs-idm141128112} Determination of Δ*S*
Calculate the change in entropy for the process depicted below.

> IMAGE {img:CNX_Chem_16_03_Matter_img} src=../../media/CNX_Chem_16_03_Matter_img.jpg
> alt: A diagram shows one rectangle with two sides that has four dots, red, green, yellow and blue written on the left side. A right-facing arrow leads to six more two-sided rectangles, each with two dots on the left and right sides. The first rectangle has a red and green dot on the left and a blue and yellow on the right, while the second shows a red and blue on the left and a green and yellow on the right. The third rectangle has a red and yellow dot on the left and a blue and green on the right, while the fourth shows a green and blue on the left and a red and yellow on the right. The fifth rectangle has a yellow and green dot on the left and a blue and red on the right, while the sixth shows a yellow and blue on the left and a green and red on the right.

**Solution**
The initial number of microstates is one, the final six:

$$ \text{Δ}S=k\;\text{ln}\;\frac{{W}_{\text{c}}}{{W}_{\text{a}}}\;=1.38\;\times \;{10}^{−23}\;\text{J/K}\;\times \;\text{ln}\;\frac{6}{1}\;=2.47\;\times \;{10}^{−23}\;\text{J/K} $$  {eq:fs-idm221426432}

The sign of this result is consistent with expectation; since there are more microstates possible for the final state than for the initial state, the change in entropy should be positive.
**Check Your Learning**
Consider the system shown in [ref:CNX_Chem_16_03_Energy]. What is the change in entropy for the process where *all* the energy is transferred from the hot object (**AB**) to the cold object (**CD**)?

:::note [answer] Answer:
0 J/K
:::
:::

## Predicting the Sign of Δ*S*
The relationships between entropy, microstates, and matter/energy dispersal described previously allow us to make generalizations regarding the relative entropies of substances and to predict the sign of entropy changes for chemical and physical processes. Consider the phase changes illustrated in [ref:CNX_Chem_16_03_Entropies]. In the solid phase, the atoms or molecules are restricted to nearly fixed positions with respect to each other and are capable of only modest oscillations about these positions. With essentially fixed locations for the system’s component particles, the number of microstates is relatively small. In the liquid phase, the atoms or molecules are free to move over and around each other, though they remain in relatively close proximity to one another. This increased freedom of motion results in a greater variation in possible particle locations, so the number of microstates is correspondingly greater than for the solid. As a result, *S*<sub>liquid</sub> > *S*<sub>solid</sub> and the process of converting a substance from solid to liquid (melting) is characterized by an increase in entropy, Δ*S* > 0. By the same logic, the reciprocal process (freezing) exhibits a decrease in entropy, Δ*S* < 0.

> FIGURE {fig:CNX_Chem_16_03_Entropies} src=../../media/CNX_Chem_16_03_Entropies.jpg
> alt: Three stoppered flasks are shown with right and left-facing arrows in between each; the first is labeled above as, “delta S greater than 0,” and below as, “delta S less than 0,” while the second is labeled above as, “delta S greater than 0,” and below as, “delta S less than 0.” A long, right-facing arrow is drawn above all the flasks and labeled, “Increasing entropy.” The left flask contains twenty-seven particles arranged in a cube in the bottom of the flask and is labeled, “Crystalline solid,” below. The middle flask contains twenty-seven particles dispersed randomly in the bottom of the flask and is labeled, “Liquid,” below. The right flask contains twenty-seven particles dispersed inside of the flask and moving rapidly and is labeled, “Gas,” below.
> caption: The entropy of a substance increases (Δ*S* > 0) as it transforms from a relatively ordered solid, to a less-ordered liquid, and then to a still less-ordered gas. The entropy decreases (Δ*S* < 0) as the substance transforms from a gas to a liquid and then to a solid.

Now consider the gaseous phase, in which a given number of atoms or molecules occupy a *much* greater volume than in the liquid phase. Each atom or molecule can be found in many more locations, corresponding to a much greater number of microstates. Consequently, for any substance, *S*<sub>gas</sub> > *S*<sub>liquid</sub> > *S*<sub>solid</sub>, and the processes of vaporization and sublimation likewise involve increases in entropy, Δ*S* > 0. Likewise, the reciprocal phase transitions, condensation and deposition, involve decreases in entropy, Δ*S* < 0.
According to kinetic-molecular theory, the temperature of a substance is proportional to the average kinetic energy of its particles. Raising the temperature of a substance will result in more extensive vibrations of the particles in solids and more rapid translations of the particles in liquids and gases. At higher temperatures, the distribution of kinetic energies among the atoms or molecules of the substance is also broader (more dispersed) than at lower temperatures. Thus, the entropy for any substance increases with temperature ([ref:CNX_Chem_16_02_EntGraph]).

> FIGURE {fig:CNX_Chem_16_02_EntGraph} src=../../media/CNX_Chem_16_02_EntGraph.jpg
> alt: Two graphs are shown. The y-axis of the left graph is labeled, “Fraction of molecules,” while the x-axis is labeled, “Velocity, v ( m / s ),” and has values of 0 through 1,500 along the axis with increments of 500. Four lines are plotted on this graph. The first, labeled, “100 K,” peaks around 200 m / s while the second, labeled, “200 K,” peaks near 300 m / s and is slightly lower on the y-axis than the first. The third line, labeled, “500 K,” peaks around 550 m / s and is lower than the first two on the y-axis. The fourth line, labeled, “1000 K,” peaks around 750 m / s and is the lowest of the four on the y-axis. Each line get increasingly broad. The second graph has a y-axis labeled, “Entropy, S,” with an upward-facing arrow and an x-axis labeled, “Temperature ( K ),” and a right-facing arrow. The graph has three equally spaced columns in the background, labeled, “Solid,” “Liquid,” and, “Gas,” from left to right. A line extends slightly upward through the first column in a slight upward direction, then goes straight up in the transition between the first two columns. In then progresses in a slight upward direction through the second column, then goes up dramatically between the second and third columns, then continues in a slight upward direction once more. The first vertical region of this line is labeled, “Melting,” and the second is labeled, “Boiling.”
> caption: Entropy increases as the temperature of a substance is raised, which corresponds to the greater spread of kinetic energies. When a substance undergoes a phase transition, its entropy changes significantly.

:::note [chemistry link-to-learning] 
Use [interactive simulator](http://openstax.org/l/16freemotion) to visualize the dependence of particle location and freedom of motion on physical state and temperature for several different atoms and molecules.
:::
The entropy of a substance is influenced by the structure of the particles (atoms or molecules) that comprise the substance. With regard to atomic substances, heavier atoms possess greater entropy at a given temperature than lighter atoms, which is a consequence of the relation between a particle’s mass and the spacing of quantized translational energy levels (a topic beyond the scope of this text). For molecules, greater numbers of atoms increase the number of ways in which the molecules can vibrate and thus the number of possible microstates and the entropy of the system.
Finally, variations in the types of particles affects the entropy of a system. Compared to a pure substance, in which all particles are identical, the entropy of a mixture of two or more different particle types is greater. This is because of the additional orientations and interactions that are possible in a system comprised of nonidentical components. For example, when a solid dissolves in a liquid, the particles of the solid experience both a greater freedom of motion and additional interactions with the solvent particles. This corresponds to a more uniform dispersal of matter and energy and a greater number of microstates. The process of dissolution therefore involves an increase in entropy, Δ*S* > 0.
Considering the various factors that affect entropy allows us to make informed predictions of the sign of Δ*S* for various chemical and physical processes as illustrated in [ref:fs-idm151499136].

:::example {ex:fs-idm151499136} Predicting the Sign of ∆*S*
Predict the sign of the entropy change for the following processes. Indicate the reason for each of your predictions.
(a) One mole liquid water at room temperature $\longrightarrow$ one mole liquid water at 50 °C
(b) ${\text{Ag}}^{\text{+}}(aq)+{\text{Cl}}^{\text{−}}(aq)\;\longrightarrow \;\text{AgCl}(s)$
(c) ${\text{C}}_{6}{\text{H}}_{6}(l)+\frac{15}{2}{\text{O}}_{2}(g)\;\longrightarrow \;6{\text{CO}}_{2}(g)+3{\text{H}}_{2}\text{O}(l)$
(d) ${\text{NH}}_{3}(s)\;\longrightarrow \;{\text{NH}}_{\text{3}}(l)$
**Solution**
(a) positive, temperature increases
(b) negative, reduction in the number of ions (particles) in solution, decreased dispersal of matter
(c) negative, net decrease in the amount of gaseous species
(d) positive, phase transition from solid to liquid, net increase in dispersal of matter
**Check Your Learning**
Predict the sign of the entropy change for the following processes. Give a reason for your prediction.
(a) ${\text{NaNO}}_{3}(s)\;\longrightarrow \;{\text{Na}}^{\text{+}}(aq)+{\text{NO}}_{3}{}^{\text{−}}(aq)$
(b) the freezing of liquid water
(c) ${\text{CO}}_{2}(s)\;\longrightarrow \;{\text{CO}}_{2}(g)$
(d) ${\text{CaCO}}_{3}(s)\;\longrightarrow \;\text{CaO}(s)+{\text{CO}}_{2}(g)$

:::note [answer] Answer:
(a) Positive; The solid dissolves to give an increase of mobile ions in solution. (b) Negative; The liquid becomes a more ordered solid. (c) Positive; The relatively ordered solid becomes a gas. (d) Positive; There is a net increase in the amount of gaseous species.
:::
:::

## Key Concepts and Summary {section:summary}
Entropy (*S*) is a state function that can be related to the number of microstates for a system (the number of ways the system can be arranged) and to the ratio of reversible heat to kelvin temperature. It may be interpreted as a measure of the dispersal or distribution of matter and/or energy in a system, and it is often described as representing the “disorder” of the system.
For a given substance, entropy depends on phase with *S*<sub>solid</sub> < *S*<sub>liquid</sub> < *S*<sub>gas</sub>. For different substances in the same physical state at a given temperature, entropy is typically greater for heavier atoms or more complex molecules. Entropy increases when a system is heated and when solutions form. Using these guidelines, the sign of entropy changes for some chemical reactions and physical changes may be reliably predicted.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| $\text{Δ}S=\;\frac{{q}_{\text{rev}}}{T}$ |
| *S* = *k* ln *W* |
| $\text{Δ}S=k\;\text{ln}\;\frac{{W}_{\text{f}}}{{W}_{\text{i}}}$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp46279440} type= 
PROBLEM:
In [ref:CNX_Chem_16_02_Microstates] all possible distributions and microstates are shown for four different particles shared between two boxes. Determine the entropy change, Δ*S*, if the particles are initially evenly distributed between the two boxes, but upon redistribution all end up in Box (b).
:::

:::exercise {fs-idm145774432} type= 
PROBLEM:
In [ref:CNX_Chem_16_02_Microstates] all of the possible distributions and microstates are shown for four different particles shared between two boxes. Determine the entropy change, Δ*S*, for the system when it is converted from distribution (b) to distribution (d).
SOLUTION:
There are four initial microstates and four final microstates.
$\text{Δ}S=k\;\text{ln}\;\frac{{W}_{\text{f}}}{{W}_{\text{i}}}\;=1.38\;\times \;{\text{10}}^{−23}\;\text{J/K}\;\times \;\text{ln}\;\frac{4}{4}\;=0$
:::

:::exercise {fs-idm56843152} type= 
PROBLEM:
How does the process described in the previous item relate to the system shown in [ref:CNX_Chem_16_02_Gas](module:m68816)?
:::

:::exercise {fs-idm72753056} type= 
PROBLEM:
Consider a system similar to the one in [ref:CNX_Chem_16_02_Microstates], except that it contains six particles instead of four. What is the probability of having all the particles in only one of the two boxes in the case? Compare this with the similar probability for the system of four particles that we have derived to be equal to $\frac{1}{8}.$ What does this comparison tell us about even larger systems?
SOLUTION:
The probability for all the particles to be on one side is $\frac{1}{32}.$ This probability is noticeably lower than the $\frac{1}{8}$ result for the four-particle system. The conclusion we can make is that the probability for all the particles to stay in only one part of the system will decrease rapidly as the number of particles increases, and, for instance, the probability for all molecules of gas to gather in only one side of a room at room temperature and pressure is negligible since the number of gas molecules in the room is very large.
:::

:::exercise {fs-idm215906096} type= 
PROBLEM:
Consider the system shown in [ref:CNX_Chem_16_03_Energy]. What is the change in entropy for the process where the energy is initially associated only with particle A, but in the final state the energy is distributed between two different particles?
:::

:::exercise {fs-idm18362192} type= 
PROBLEM:
Consider the system shown in [ref:CNX_Chem_16_03_Energy]. What is the change in entropy for the process where the energy is initially associated with particles A and B, and the energy is distributed between two particles in different boxes (one in A-B, the other in C-D)?
SOLUTION:
There is only one initial state. For the final state, the energy can be contained in pairs A-C, A-D, B-C, or B-D. Thus, there are four final possible states.
$\text{Δ}S=k\;\text{ln}\;(\frac{{W}_{\text{f}}}{{W}_{\text{i}}})=1.38\;\times \;{10}^{-23}\;\text{J/K}\;\times \;\text{ln}\;(\frac{4}{1})=1.91\;\times \;{10}^{-23}\;\text{J/K}$
:::

:::exercise {fs-idm199093136} type= 
PROBLEM:
Arrange the following sets of systems in order of increasing entropy. Assume one mole of each substance and the same temperature for each member of a set.
(a) H<sub>2</sub>(*g*), HBrO<sub>4</sub>(*g*), HBr(*g*)
(b) H<sub>2</sub>O(*l*), H<sub>2</sub>O(*g*), H<sub>2</sub>O(*s*)
(c) He(*g*), Cl<sub>2</sub>(*g*), P<sub>4</sub>(*g*)
:::

:::exercise {fs-idm215000480} type= 
PROBLEM:
At room temperature, the entropy of the halogens increases from I<sub>2</sub> to Br<sub>2</sub> to Cl<sub>2</sub>. Explain.
SOLUTION:
The masses of these molecules would suggest the opposite trend in their entropies. The observed trend is a result of the more significant variation of entropy with a physical state. At room temperature, I<sub>2</sub> is a solid, Br<sub>2</sub> is a liquid, and Cl<sub>2</sub> is a gas.
:::

:::exercise {fs-idm12232336} type= 
PROBLEM:
Consider two processes: sublimation of I<sub>2</sub>(*s*) and melting of I<sub>2</sub>(*s*) (Note: the latter process can occur at the same temperature but somewhat higher pressure).
${\text{I}}_{2}(s)\;\longrightarrow \;{\text{I}}_{2}(g)$
${\text{I}}_{2}(s)\;\longrightarrow \;{\text{I}}_{2}(l)$
Is Δ*S* positive or negative in these processes? In which of the processes will the magnitude of the entropy change be greater?
:::

:::exercise {fs-idm136809856} type= 
PROBLEM:
Indicate which substance in the given pairs has the higher entropy value. Explain your choices.
(a) C<sub>2</sub>H<sub>5</sub>OH(*l*) or C<sub>3</sub>H<sub>7</sub>OH(*l*)
(b) C<sub>2</sub>H<sub>5</sub>OH(*l*) or C<sub>2</sub>H<sub>5</sub>OH(*g*)
(c) 2H(*g*) or H(*g*)
SOLUTION:
(a) C<sub>3</sub>H<sub>7</sub>OH(*l*) as it is a larger molecule (more complex and more massive), and so more microstates describing its motions are available at any given temperature. (b) C<sub>2</sub>H<sub>5</sub>OH(*g*) as it is in the gaseous state. (c) 2H(*g*), since entropy is an extensive property, and so two H atoms (or two moles of H atoms) possess twice as much entropy as one atom (or one mole of atoms).
:::

:::exercise {fs-idm216212480} type= 
PROBLEM:
Predict the sign of the entropy change for the following processes.
(a) An ice cube is warmed to near its melting point.
(b) Exhaled breath forms fog on a cold morning.
(c) Snow melts.
:::

:::exercise {fs-idm203140096} type= 
PROBLEM:
Predict the sign of the entropy change for the following processes. Give a reason for your prediction.
(a) ${\text{Na}}^{+}(aq)+{\text{Cl}}^{−}(aq)\;\longrightarrow \;\text{NaCl}(s)$
(b) $2\text{Fe}(s)+\frac{3}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{Fe}}_{2}{\text{O}}_{2}(s)$
(c) $2{\text{C}}_{6}{\text{H}}_{14}(l)+19{\text{O}}_{2}(g)\;\longrightarrow \;14{\text{H}}_{2}\text{O}(g)+12{\text{CO}}_{2}(g)$
SOLUTION:
(a) Negative. The relatively ordered solid precipitating decreases the number of mobile ions in solution. (b) Negative. There is a net loss of three moles of gas from reactants to products. (c) Positive. There is a net increase of seven moles of gas from reactants to products.
:::

:::exercise {fs-idm213645360} type= 
PROBLEM:
Write the balanced chemical equation for the combustion of methane, CH<sub>4</sub>(*g*), to give carbon dioxide and water vapor. Explain why it is difficult to predict whether Δ*S* is positive or negative for this chemical reaction.
:::

:::exercise {fs-idp19392560} type= 
PROBLEM:
Write the balanced chemical equation for the combustion of benzene, C<sub>6</sub>H<sub>6</sub>(*l*), to give carbon dioxide and water vapor. Would you expect Δ*S* to be positive or negative in this process?
SOLUTION:
${\text{C}}_{6}{\text{H}}_{6}(l)+7.5{\text{O}}_{2}(g)\;\longrightarrow {\text{3H}}_{2}\text{O(}g)+{\text{6CO}}_{2}(g)$
There are 7.5 moles of gas initially, and 3 + 6 = 9 moles of gas in the end. Therefore, it is likely that the entropy increases as a result of this reaction, and Δ*S* is positive.
:::

## Glossary
- {def} **entropy (*S*)**: state function that is a measure of the matter and/or energy dispersal within a system, determined by the number of system microstates; often described as a measure of the disorder of the system
- {def} **microstate**: possible configuration or arrangement of matter and energy within a system
- {def} **reversible process**: process that takes place so slowly as to be capable of reversing direction in response to an infinitesimally small change in conditions; hypothetical construct that can only be approximated by real processes
