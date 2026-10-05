# The Second and Third Laws of Thermodynamics

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- State and explain the second and third laws of thermodynamics
- Calculate entropy changes for phase transitions and chemical reactions under standard conditions

## The Second Law of Thermodynamics
In the quest to identify a property that may reliably predict the spontaneity of a process, a promising candidate has been identified: entropy. Processes that involve an increase in entropy *of the system* (Δ*S* > 0) are very often spontaneous; however, examples to the contrary are plentiful. By expanding consideration of entropy changes to include *the surroundings*, we may reach a significant conclusion regarding the relation between this property and spontaneity. In thermodynamic models, the system and surroundings comprise everything, that is, the universe, and so the following is true:

$$ \text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}} $$  {eq:fs-idm7595760}

To illustrate this relation, consider again the process of heat flow between two objects, one identified as the system and the other as the surroundings. There are three possibilities for such a process:
1. The objects are at different temperatures, and heat flows from the hotter to the cooler object. *This is always observed to occur spontaneously.* Designating the hotter object as the system and invoking the definition of entropy yields the following:

$$ \text{Δ}{S}_{\text{sys}}=\;\frac{\text{−}{q}_{\text{rev}}}{{T}_{\text{sys}}}\hspace{2em}\text{and}\hspace{2em}\text{Δ}{S}_{\text{surr}}=\;\frac{{q}_{\text{rev}}}{{T}_{\text{surr}}} $$  {eq:fs-idp67516128}

The magnitudes of −*q*<sub>rev</sub> and *q*<sub>rev</sub> are equal, their opposite arithmetic signs denoting loss of heat by the system and gain of heat by the surroundings. Since *T*<sub>sys</sub> > *T*<sub>surr</sub> in this scenario, the entropy *decrease* of the system will be less than the entropy *increase* of the surroundings, and so *the entropy of the universe will increase*:

$$ \begin{array}{l}|\text{Δ}{S}_{\text{sys}}|<|\text{Δ}{S}_{\text{surr}}| \\ \text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}}>0\end{array} $$  {eq:fs-idm241116384}

2. The objects are at different temperatures, and heat flows from the cooler to the hotter object. *This is never observed to occur spontaneously.* Again designating the hotter object as the system and invoking the definition of entropy yields the following:

$$ \text{Δ}{S}_{\text{sys}}=\;\frac{{q}_{\text{rev}}}{{T}_{\text{sys}}}\hspace{2em}\text{and}\hspace{2em}\text{Δ}{S}_{\text{surr}}=\;\frac{\text{−}{q}_{\text{rev}}}{{T}_{\text{surr}}} $$  {eq:fs-idp14273600}

The arithmetic signs of *q*<sub>rev</sub> denote the gain of heat by the system and the loss of heat by the surroundings. The magnitude of the entropy change for the surroundings will again be greater than that for the system, but in this case, the signs of the heat changes (that is, *the direction of the heat flow*) will yield a negative value for Δ*S*<sub>univ</sub>. *This process involves a decrease in the entropy of the universe.*
3. The objects are at essentially the same temperature, *T*<sub>sys</sub> ≈ *T*<sub>surr</sub>, and so the magnitudes of the entropy changes are essentially the same for both the system and the surroundings. In this case, the entropy change of the universe is zero, and the system is *at equilibrium*.

$$ \begin{array}{l}|\text{Δ}{S}_{\text{sys}}|\approx |\text{Δ}{S}_{\text{surr}}| \\ \text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}}=0\end{array} $$  {eq:fs-idm250691808}

These results lead to a profound statement regarding the relation between entropy and spontaneity known as the {term:second law of thermodynamics}: *all spontaneous changes cause an increase in the entropy of the universe.* A summary of these three relations is provided in [ref:fs-idp41455824].

> TABLE {tab:fs-idp41455824} cols=2 class=top-titled
> title: The Second Law of Thermodynamics
> summary: This table contains two columns and three rows. The first column has the following: “capital delta S subscript univ is greater than 0,” “capital delta S subscript univ is less than 0,” and, “capital delta S subscript univ equals 0.” The second column contains the following: “Spontaneous,” “nonspontaneous ( spontaneous in opposite direction ),” and, “reversible ( system is at equilibrium ).”

|  |  |
| --- | --- |
| Δ*S*<sub>univ</sub> > 0 | spontaneous |
| Δ*S*<sub>univ</sub> < 0 | nonspontaneous (spontaneous in opposite direction) |
| Δ*S*<sub>univ</sub> = 0 | at equilibrium |

For many realistic applications, the surroundings are vast in comparison to the system. In such cases, the heat gained or lost by the surroundings as a result of some process represents a very small, nearly infinitesimal, fraction of its total thermal energy. For example, combustion of a fuel in air involves transfer of heat from a system (the fuel and oxygen molecules undergoing reaction) to surroundings that are infinitely more massive (the earth’s atmosphere). As a result, *q*<sub>surr</sub> is a good approximation of *q*<sub>rev</sub>, and the second law may be stated as the following:

$$ \text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}}=\text{Δ}{S}_{\text{sys}}+\frac{{q}_{\text{surr}}}{T} $$  {eq:fs-idp179481536}

We may use this equation to predict the spontaneity of a process as illustrated in [ref:fs-idp33042160].

:::example {ex:fs-idp33042160} Will Ice Spontaneously Melt?
The entropy change for the process

$$ {\text{H}}_{2}\text{O}(s)\;\longrightarrow \;{\text{H}}_{2}\text{O}(l) $$  {eq:fs-idp179791152}

is 22.1 J/K and requires that the surroundings transfer 6.00 kJ of heat to the system. Is the process spontaneous at −10.00 °C? Is it spontaneous at +10.00 °C?
**Solution**
We can assess the spontaneity of the process by calculating the entropy change of the universe. If Δ*S*<sub>univ</sub> is positive, then the process is spontaneous. At both temperatures, Δ*S*<sub>sys</sub> = 22.1 J/K and *q*<sub>surr</sub> = −6.00 kJ.
At −10.00 °C (263.15 K), the following is true:

$$ \begin{array}{rl}\text{Δ}{S}_{\text{univ}} & =\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}}=\text{Δ}{S}_{\text{sys}}+\frac{{q}_{\text{surr}}}{T} \\ & =\text{22.1 J/K}+\frac{−6.00\;\times \;{10}^{3}\;\text{J}}{\text{263.15 K}}\;=−0.7\;\text{J/K}\end{array} $$  {eq:fs-idp170559696}

*S*<sub>univ</sub> < 0, so melting is nonspontaneous (*not* spontaneous) at −10.0 °C.
At 10.00 °C (283.15 K), the following is true:

$$ \begin{array}{l} \\ \text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\frac{{q}_{\text{surr}}}{T} \\ \\ =22.1\;\text{J/K}+\frac{−6.00\;\times \;{10}^{3}\;\text{J}}{\text{283.15 K}}\;=\text{+0.9 J/K}\end{array} $$  {eq:fs-idm42720272}

*S*<sub>univ</sub> > 0, so melting *is* spontaneous at 10.00 °C.
**Check Your Learning**
Using this information, determine if liquid water will spontaneously freeze at the same temperatures. What can you say about the values of *S*<sub>univ</sub>?

:::note [answer] Answer:
Entropy is a state function, so Δ*S*<sub>freezing</sub> = −Δ*S*<sub>melting</sub> = −22.1 J/K and *q*<sub>surr</sub> = +6.00 kJ. At −10.00 °C spontaneous, +0.7 J/K; at +10.00 °C nonspontaneous, −0.9 J/K.
:::
:::

## The Third Law of Thermodynamics
The previous section described the various contributions of matter and energy dispersal that contribute to the entropy of a system. With these contributions in mind, consider the entropy of a pure, perfectly crystalline solid possessing no kinetic energy (that is, at a temperature of absolute zero, 0 K). This system may be described by a single microstate, as its purity, perfect crystallinity and complete lack of motion means there is but one possible location for each identical atom or molecule comprising the crystal (*W* = 1). According to the Boltzmann equation, the entropy of this system is zero.

$$ S=k\;\text{ln}\;W=k\;\text{ln}\;(1)=0 $$  {eq:fs-idp179521936}

**
This limiting condition for a system’s entropy represents the {term:third law of thermodynamics}: *the entropy of a pure, perfect crystalline substance at 0 K is zero.*
Careful calorimetric measurements can be made to determine the temperature dependence of a substance’s entropy and to derive absolute entropy values under specific conditions. {term:Standard entropies (*S*°)} are for one mole of substance under standard conditions (a pressure of 1 bar and a temperature of 298.15 K; see details regarding standard conditions in the thermochemistry chapter of this text). The {term:standard entropy change (Δ*S*°)} for a reaction may be computed using standard entropies as shown below:

$$ \text{Δ}S\text{°}=\sum νS\text{°}\text{(products)}\;-\sum νS\text{°}\text{(reactants)} $$  {eq:fs-idp35409536}

where ν represents stoichiometric coefficients in the balanced equation representing the process. For example, Δ*S*° for the following reaction at room temperature

$$ m\text{A}+n\text{B}\;\longrightarrow \;x\text{C}+y\text{D,} $$  {eq:fs-idm48571920}

is computed as:

$$ =[xS{}^{\circ}(\text{C})+yS\text{°}(\text{D})]\;-\;[mS\text{°}(\text{A})+nS\text{°}(\text{B})] $$  {eq:fs-idp34261696}

A partial listing of standard entropies is provided in [ref:fs-idm78597984], and additional values are provided in [Appendix G](module:m68865). The example exercises that follow demonstrate the use of *S*° values in calculating standard entropy changes for physical and chemical processes.

> TABLE {tab:fs-idm78597984} cols=2 irregular
> summary: The table has two columns and twenty rows. The first row is a header row and it labels the columns, “Substance,” and “S subscript 298 superscript degree symbol ( J mol superscript negative 1 K superscript negative 1 ).” The second row spans both columns and contains the word, “Carbon.” Under the “Substance” column for carbon are the following: C ( s, graphite ), C ( s, diamond ), C O ( g ), C O subscript 2 ( g ), C H subscript 4 ( g ), C subscript 2 H subscript 4 ( g ), C subscript 2 H subscript 6 ( g ), C H subscript 3 O H ( l ), and C subscript 2 H subscript 5 O H ( l ). Under the “S subscript 298 superscript degree symbol ( J mol superscript negative 1 K superscript negative 1 )” column for carbon are the following: 5.740, 2.38, 197.7, 213.8, 186.3, 219.5, 229.5, 126.8, and 160.7. The twelfth row spans both columns and contains the word, “Hydrogen.” Under the “Substance” column for hydrogen are the following: H subscript 2 ( g ), H ( g ), H subscript 2 O ( g ), H subscript 2 O ( l ), H C I ( g ), and H subscript 2 S ( g ). Under the “S subscript 298 superscript degree symbol ( J mol superscript negative 1 K superscript negative 1 )” column for hydrogen are the following: 130.57, 114.6, 188.71, 69.91, 186.8, and 205.7. The nineteenth row spans both columns and contains the word, “Oxygen.” Under the “Substance” column for oxygen is O subscript 2 ( g ). Under the “S subscript 298 superscript degree symbol ( J mol superscript negative 1 K superscript negative 1 )” column for oxygen is 205.03.

| **Substance** | **$S\text{°}$ (J mol<sup>−1</sup> K<sup>−1</sup>)** |
| {span=2} carbon |
| C(*s*, graphite) | 5.740 |
| C(*s*, diamond) | 2.38 |
| CO(*g*) | 197.7 |
| CO<sub>2</sub>(*g*) | 213.8 |
| CH<sub>4</sub>(*g*) | 186.3 |
| C<sub>2</sub>H<sub>4</sub>(*g*) | 219.3 |
| C<sub>2</sub>H<sub>6</sub>(*g*) | 229.2 |
| CH<sub>3</sub>OH(*l*) | 126.8 |
| C<sub>2</sub>H<sub>5</sub>OH(*l*) | 160.7 |
| {span=2} hydrogen |
| H<sub>2</sub>(*g*) | 130.7 |
| H(*g*) | 114.7 |
| H<sub>2</sub>O(*g*) | 188.8 |
| H<sub>2</sub>O(*l*) | 70.0 |
| HCl(*g*) | 186.8 |
| H<sub>2</sub>S(*g*) | 205.7 |
| {span=2} oxygen |
| O<sub>2</sub>(*g*) | 205.2 |

:::example {ex:fs-idp173892208} Determination of Δ*S*°
Calculate the standard entropy change for the following process:

$$ {\text{H}}_{2}\text{O}(g)\;\longrightarrow \;{\text{H}}_{2}\text{O}(l) $$  {eq:fs-idp582800}

**Solution**
Calculate the entropy change using standard entropies as shown above:

$$ \Delta S{}^{\circ}=(1\;\text{mol})(70.0\;\text{J}\;{\text{mol}}^{\text{−}1}\;{\text{K}}^{\text{−}1})-(1\;\text{mol})(188.8\;\text{J}\;{\text{mol}}^{\text{−}1}\;{\text{K}}^{\text{−}1})=\text{−}118.8\;\text{J/K} $$  {eq:fs-idm7244112}

The value for Δ*S*° is negative, as expected for this phase transition (condensation), which the previous section discussed.
**Check Your Learning**
Calculate the standard entropy change for the following process:

$$ {\text{H}}_{2}(g)+{\text{C}}_{2}{\text{H}}_{4}(g)\;\longrightarrow \;{\text{C}}_{2}{\text{H}}_{6}(g) $$  {eq:fs-idp43728512}

:::note [answer] Answer:
−120.6 J K<sup>–1</sup> mol<sup>–1</sup>
:::
:::

:::example {ex:fs-idp34274768} Determination of Δ*S*°
Calculate the standard entropy change for the combustion of methanol, CH<sub>3</sub>OH:

$$ 2{\text{CH}}_{3}\text{OH}(l)+3{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{CO}}_{2}(g)+4{\text{H}}_{2}\text{O}(l) $$  {eq:fs-idp22586368}

**Solution**
Calculate the entropy change using standard entropies as shown above:

$$ \text{Δ}S\text{°}=\sum νS\text{°}\text{(products)}\;-\sum νS\text{°}\text{(reactants)} $$  {eq:fs-idp26460064}

$$ \begin{array}{l}[2\;\text{mol}\;\times \;S\text{°}({\text{CO}}_{2}(g))\;+\;4\;\text{mol}\;\times \;S\text{°}({\text{H}}_{2}\text{O}(l))]\;-\;[2\;\text{mol}\;\times \;S\text{°}({\text{CH}}_{3}\text{OH}(l))\;+3\;\text{mol}\;\times \;S\text{°}({\text{O}}_{2}(g))] \\ \\ =\{\;[2(213.8)+4\;\times \;70.0]\;-\;[2(126.8)+3(205.2)]\;\}=−161.6\;\text{J/K}\end{array} $$  {eq:fs-idm2438144}

**Check Your Learning**
Calculate the standard entropy change for the following reaction:

$$ \text{Ca}{(\text{OH})}_{2}(\text{s})\;\longrightarrow \;\text{CaO}(s)+{\text{H}}_{2}\text{O}(l) $$  {eq:fs-idp53679664}

:::note [answer] Answer:
24.7 J/K
:::
:::

## Key Concepts and Summary {section:summary}
The second law of thermodynamics states that a spontaneous process increases the entropy of the universe, *S*<sub>univ</sub> > 0. If Δ*S*<sub>univ</sub> < 0, the process is nonspontaneous, and if Δ*S*<sub>univ</sub> = 0, the system is at equilibrium. The third law of thermodynamics establishes the zero for entropy as that of a perfect, pure crystalline solid at 0 K. With only one possible microstate, the entropy is zero. We may compute the standard entropy change for a process by using standard entropy values for the reactants and products involved in the process.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| $\text{Δ}S\text{°}=\sum \nu S\text{°}\text{(products)}\;-\sum \nu S\text{°}\text{(reactants)}$ |
| $\text{Δ}S=\;\frac{{q}_{\text{rev}}}{T}$ |
| Δ*S*<sub>univ</sub> = Δ*S*<sub>sys</sub> + Δ*S*<sub>surr</sub> |
| $\text{Δ}{S}_{\text{univ}}=\text{Δ}{S}_{\text{sys}}+\text{Δ}{S}_{\text{surr}}=\text{Δ}{S}_{\text{sys}}+\frac{{q}_{\text{surr}}}{T}$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idp47425392} type= 
PROBLEM:
What is the difference between Δ*S* and Δ*S*° for a chemical change?
:::

:::exercise {fs-idp33735696} type= 
PROBLEM:
Calculate $\text{Δ}S\text{°}$ for the following changes.
(a) ${\text{SnCl}}_{4}(l)\;\longrightarrow \;{\text{SnCl}}_{4}(g)$
(b) ${\text{CS}}_{2}(g)\;\longrightarrow \;{\text{CS}}_{2}(l)$
(c) $\text{Cu}(s)\;\longrightarrow \;\text{Cu}(g)$
(d) ${\text{H}}_{2}\text{O}(l)\;\longrightarrow \;{\text{H}}_{2}\text{O}(g)$
(e) $2{\text{H}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2{\text{H}}_{2}\text{O}(l)$
(f) $2\text{HCl}(g)+\text{Pb}(s)\;\longrightarrow \;{\text{PbCl}}_{2}(s)+{\text{H}}_{2}(g)$
(g) $\text{Zn}(s)+{\text{CuSO}}_{4}(s)\;\longrightarrow \;\text{Cu}(s)+{\text{ZnSO}}_{4}(s)$
SOLUTION:
(a) 107 J/K; (b) −86.7 J/K; (c) 133.2 J/K; (d) 118.8 J/K; (e) −326.6 J/K; (f) −171.9 J/K; (g) −7.2 J/K
:::

:::exercise {fs-idp174223232} type= 
PROBLEM:
Determine the entropy change for the combustion of liquid ethanol, C<sub>2</sub>H<sub>5</sub>OH, under the standard conditions to give gaseous carbon dioxide and liquid water.
:::

:::exercise {fs-idp170448352} type= 
PROBLEM:
Determine the entropy change for the combustion of gaseous propane, C<sub>3</sub>H<sub>8</sub>, under the standard conditions to give gaseous carbon dioxide and water.
SOLUTION:
100.3 J/K
:::

:::exercise {fs-idp125011360} type= 
PROBLEM:
“Thermite” reactions have been used for welding metal parts such as railway rails and in metal refining. One such thermite reaction is ${\text{Fe}}_{2}{\text{O}}_{3}(s)+2\text{Al}(s)\;\longrightarrow \;{\text{Al}}_{2}{\text{O}}_{3}(s)+2\text{Fe}(s).$ Is the reaction spontaneous at room temperature under standard conditions? During the reaction, the surroundings absorb 851.8 kJ/mol of heat.
:::

:::exercise {fs-idp175070256} type= 
PROBLEM:
Using the relevant $S\text{°}$ values listed in [Appendix G](module:m68865), calculate ${\text{Δ}S\text{°}}_{298}$ for the following changes:
(a) ${\text{N}}_{2}(g)+3{\text{H}}_{2}(g)\;\longrightarrow \;2{\text{NH}}_{3}(g)$
(b) ${\text{N}}_{2}(g)+\;\frac{5}{2}{\text{O}}_{2}(g)\;\longrightarrow \;{\text{N}}_{2}{\text{O}}_{5}(g)$
SOLUTION:
(a) −198.1 J/K; (b) −348.9 J/K
:::

:::exercise {fs-idp53811024} type= 
PROBLEM:
From the following information, determine $\text{Δ}S\text{°}$ for the following:
$\text{N}(g)+\text{O}(g)\;\longrightarrow \;\text{NO}(g)\hspace{5em}\text{Δ}S\text{°}=?$
${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;2\text{NO}(g)\hspace{3.5em}\text{Δ}S\text{°}=\text{24.8 J/K}$
${\text{N}}_{2}(g)\;\longrightarrow \;2\text{N}(g)\hspace{5em}\text{Δ}S\text{°}=\text{115.0 J/K}$
${\text{O}}_{2}(g)\;\longrightarrow \;2\text{O}(g)\hspace{5em}\text{Δ}S\text{°}=\text{117.0 J/K}$
:::

:::exercise {fs-idp194136688} type= 
PROBLEM:
By calculating Δ*S*<sub>univ</sub> at each temperature, determine if the melting of 1 mole of NaCl(*s*) is spontaneous at 500 °C and at 700 °C.
${S}_{\text{NaCl}(s)}^{{}^{\circ}}=72.11\frac{\text{J}}{\text{mol·K}}\hspace{3em}{S}_{\text{NaCl}(l)}^{{}^{\circ}}=95.06\;\frac{\text{J}}{\text{mol·K}}\hspace{3em}\text{Δ}{H}_{\text{fusion}}^{{}^{\circ}}=\text{27.95 kJ/mol}$
What assumptions are made about the thermodynamic information (entropy and enthalpy values) used to solve this problem?
SOLUTION:
As Δ*S*<sub>univ</sub> < 0 at each of these temperatures, melting is not spontaneous at either of them. The given values for entropy and enthalpy are for NaCl at 298 K. It is assumed that these do not change significantly at the higher temperatures used in the problem.
:::

:::exercise {fs-idp277989936} type= 
PROBLEM:
Use the standard entropy data in [Appendix G](module:m68865) to determine the change in entropy for each of the following reactions. All the processes occur at the standard conditions and 25 °C.
(a) ${\text{MnO}}_{2}(s)\;\longrightarrow \;\text{Mn}(s)+{\text{O}}_{2}(g)$
(b) ${\text{H}}_{2}(g)+{\text{Br}}_{2}(l)\;\longrightarrow \;\text{2HBr}(g)$
(c) $\text{Cu}(s)+\text{S}(g)\;\longrightarrow \;\text{CuS}(s)$
(d) $\text{2LiOH}(s)+{\text{CO}}_{2}(g)\;\longrightarrow \;{\text{Li}}_{2}{\text{CO}}_{3}(s)+{\text{H}}_{2}\text{O}(g)$
(e) ${\text{CH}}_{4}(g)+{\text{O}}_{2}(g)\;\longrightarrow \;\text{C}(s,\;\text{graphite})+{\text{2H}}_{2}\text{O}(g)$
(f) ${\text{CS}}_{2}(g)+{\text{3Cl}}_{2}(g)\;\longrightarrow \;{\text{CCl}}_{4}(g)+{\text{S}}_{2}{\text{Cl}}_{2}(g)$
:::

:::exercise {fs-idp127896592} type= 
PROBLEM:
Use the standard entropy data in [Appendix G](module:m68865) to determine the change in entropy for each of the following reactions. All the processes occur at the standard conditions and 25 °C.
(a) $\text{C}(s\text{, graphite})+{\text{O}}_{2}(g)\;\longrightarrow \;{\text{CO}}_{2}(g)$
(b) ${\text{O}}_{2}(g)+{\text{N}}_{2}(g)\;\longrightarrow \;\text{2NO}(g)$
(c) $\text{2Cu}(s)+\text{S}(g)\;\longrightarrow \;{\text{Cu}}_{2}\text{S}(s)$
(d) $\text{CaO}(s)+{\text{H}}_{2}\text{O}(l)\;\longrightarrow \;\text{Ca}{(\text{OH})}_{2}(s)$
(e) ${\text{Fe}}_{2}{\text{O}}_{3}(s)+\text{3CO}(g)\;\longrightarrow \;\text{2Fe}(s)+{\text{3CO}}_{2}(g)$
(f) ${\text{CaSO}}_{4}\text{·}{\text{2H}}_{2}\text{O}(s)\;\longrightarrow \;{\text{CaSO}}_{4}(s)+{\text{2H}}_{2}\text{O}(g)$
SOLUTION:
(a) 2.86 J/K; (b) 24.8 J/K; (c) −113.2 J/K; (d) −24.7 J/K; (e) 15.5 J/K; (f) 290.0 J/K
:::

## Glossary
- {def} **second law of thermodynamics**: all spontaneous processes involve an increase in the entropy of the universe
- {def} **standard entropy (*S*°)**: entropy for one mole of a substance at 1 bar pressure; tabulated values are usually determined at 298.15 K
- {def} **standard entropy change (Δ*S*°)**: change in entropy for a reaction calculated using the standard entropies
- {def} **third law of thermodynamics**: entropy of a perfect crystal at absolute zero (0 K) is zero
