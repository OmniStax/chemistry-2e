# Mathematical Treatment of Measurement Results

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Explain the dimensional analysis (factor label) approach to mathematical calculations involving quantities
- Use dimensional analysis to carry out unit conversions for a given property and computations involving two or more properties

It is often the case that a quantity of interest may not be easy (or even possible) to measure directly but instead must be calculated from other directly measured properties and appropriate mathematical relationships. For example, consider measuring the average speed of an athlete running sprints. This is typically accomplished by measuring the *time* required for the athlete to run from the starting line to the finish line, and the *distance* between these two lines, and then computing *speed* from the equation that relates these three properties:

$$ \text{speed}=\;\frac{\text{distance}}{\text{time}} $$  {eq:fs-idm290867056}

An Olympic-quality sprinter can run 100 m in approximately 10 s, corresponding to an average speed of

$$ \frac{\text{100 m}}{\text{10 s}}\;=\text{10 m/s} $$  {eq:fs-idm257675424}

(For this and the next calculation, assume the trailing zeros are significant digits.) Note that this simple arithmetic involves dividing the numbers of each measured quantity to yield the number of the computed quantity (100/10 = 10) *and likewise* dividing the units of each measured quantity to yield the unit of the computed quantity (m/s = m/s). Now, consider using this same relation to predict the time required for a person running at this speed to travel a distance of 25 m. The same relation among the three properties is used, but in this case, the two quantities provided are a speed (10 m/s) and a distance (25 m). To yield the sought property, time, the equation must be rearranged appropriately:

$$ \text{time}=\;\frac{\text{distance}}{\text{speed}} $$  {eq:fs-idm219214640}

The time can then be computed as:

$$ \frac{\text{25 m}}{\text{10 m/s}}\;=\text{2.5 s} $$  {eq:fs-idp106016944}

Again, arithmetic on the numbers (25/10 = 2.5) was accompanied by the same arithmetic on the units (m/(m/s) = s) to yield the number and unit of the result, 2.5 s. Note that, just as for numbers, when a unit is divided by an identical unit (in this case, m/m), the result is “1”—or, as commonly phrased, the units “cancel.”
These calculations are examples of a versatile mathematical approach known as {term:dimensional analysis} (or the {term:factor-label method}). Dimensional analysis is based on this premise: *the units of quantities must be subjected to the same mathematical operations as their associated numbers*. This method can be applied to computations ranging from simple unit conversions to more complex, multi-step calculations involving several different quantities.

## Conversion Factors and Dimensional Analysis
A ratio of two equivalent quantities expressed with different measurement units can be used as a {term:unit conversion factor}. For example, the lengths of 2.54 cm and 1 in. are equivalent (by definition), and so a unit conversion factor may be derived from the ratio,

$$ \frac{\text{2.54 cm}}{\text{1 in.}}\;\text{(2.54 cm}=\text{1 in.) or 2.54}\;\frac{\text{cm}}{\text{in.}} $$  {eq:fs-idm256748160}

Several other commonly used conversion factors are given in [ref:fs-idm222237232].

> TABLE {tab:fs-idm222237232} cols=3 class=top-titled
> title: Common Conversion Factors
> summary: This table is divided into 3 columns. They are titled length, volume, and mass. The following units are under the length column: 1 meter is equal to 1.0936 yards, 1 inch is equal to 2.54 cm 1 kilometer is equal to 0.62137 miles, 1 mile is equal to 1609.3 meters. The following units are under the volume column: 1 liter is equal to 1.0567 quarts, 1 quart is equal to 0.94635 meters, one cubic foot is equal to 28.317 liters, 1 tablespoon is equal to 14.787 milliliters. The following units are under the mass column: 1 kilogram is equal to 2.2046 pounds, 1 pound is equal to 453.59 grams, 1 avoirdupois ounce is equal to 28.349 grams, 1 troy ounce is equal to 31.103 grams.

| Length | Volume | Mass |
| --- | --- | --- |
| 1 m = 1.0936 yd | 1 L = 1.0567 qt | 1 kg = 2.2046 lb |
| 1 in. = 2.54 cm (exact) | 1 qt = 0.94635 L | 1 lb = 453.59 g^[Strictly speaking, the ounce and pound are units of weight, *W* (a force equal to the product of mass and gravitational acceleration, *W* = *mg*). The conversion relations in this table are commonly used to equate masses and weight assuming a nominal value for *g* at the surface of the earth.] |
| 1 km = 0.62137 mi | 1 ft<sup>3</sup> = 28.317 L | 1 (avoirdupois) oz = 28.349 g |
| 1 mi = 1609.3 m | 1 tbsp = 14.787 mL | 1 (troy) oz = 31.103 g |

When a quantity (such as distance in inches) is multiplied by an appropriate unit conversion factor, the quantity is converted to an equivalent value with different units (such as distance in centimeters). For example, a basketball player’s vertical jump of 34 inches can be converted to centimeters by:

$$ 34\;\cancel{\text{in.}}\;\times \;\frac{\text{2.54 cm}}{1\;\cancel{\text{in.}}}\;=\text{86 cm} $$  {eq:fs-idm153590912}

Since this simple arithmetic involves *quantities*, the premise of dimensional analysis requires that we multiply both *numbers and units*. The numbers of these two quantities are multiplied to yield the number of the product quantity, 86, whereas the units are multiplied to yield $\frac{\text{in.}\;\times \;\text{cm}}{\text{in.}}$. Just as for numbers, a ratio of identical units is also numerically equal to one, $\frac{\text{in.}}{\text{in.}}\;=\text{1,}$ and the unit product thus simplifies to *cm*. (When identical units divide to yield a factor of 1, they are said to “cancel.”) Dimensional analysis may be used to confirm the proper application of unit conversion factors as demonstrated in the following example.

:::example {ex:fs-idm150235328} Using a Unit Conversion Factor
The mass of a competition frisbee is 125 g. Convert its mass to ounces using the unit conversion factor derived from the relationship 1 oz = 28.349 g ([ref:fs-idm222237232]).
**Solution**
Given the conversion factor, the mass in ounces may be derived using an equation similar to the one used for converting length from inches to centimeters.

$$ x\;\text{oz}=\text{125 g}\;\times \;\text{unit conversion factor} $$  {eq:fs-idm138056288}

The unit conversion factor may be represented as:

$$ \frac{\text{1 oz}}{\text{28.349 g}}\;\text{and}\;\frac{\text{28.349 g}}{\text{1 oz}} $$  {eq:fs-idm233281680}

The correct unit conversion factor is the ratio that cancels the units of grams and leaves ounces.

$$ \begin{array}{lll}x\;\text{oz} & = & 125\;\cancel{\text{g}}\;\times \;\frac{\text{1 oz}}{\text{28.349}\;\cancel{\text{g}}} \\ & = & (\frac{125}{\text{28.349}})\;\text{oz} \\ & = & \text{4.41 oz (three significant figures)}\end{array} $$  {eq:fs-idm222314304}

**Check Your Learning**
Convert a volume of 9.345 qt to liters.

:::note [answer] Answer:
8.844 L
:::
:::
Beyond simple unit conversions, the factor-label method can be used to solve more complex problems involving computations. Regardless of the details, the basic approach is the same—all the *factors* involved in the calculation must be appropriately oriented to ensure that their *labels* (units) will appropriately cancel and/or combine to yield the desired unit in the result. As your study of chemistry continues, you will encounter many opportunities to apply this approach.

:::example {ex:fs-idm305814320} Computing Quantities from Measurement Results and Known Mathematical Relations
What is the density of common antifreeze in units of g/mL? A 4.00-qt sample of the antifreeze weighs 9.26 lb.
**Solution**
Since $\text{density}\;=\;\frac{\text{mass}}{\text{volume}}$, we need to divide the mass in grams by the volume in milliliters. This will require converting the provided volume from quarts to milliliters and converting the provided mass from pounds to grams. The necessary conversion factors are given in [ref:fs-idm222237232]: 1 lb = 453.59 g; 1 L = 1.0567 qt; 1 L = 1,000 mL. Mass may be converted from pounds to grams as follows:

$$ \text{9.26}\;\cancel{\text{lb}}\;\times \;\frac{\text{453.59 g}}{1\;\cancel{\text{lb}}}\;=4.20\;\times \;{10}^{3}\;\text{g} $$  {eq:fs-idm336821696}

Volume may be converted from quarts to milliliters via two steps:
1. *Convert quarts to liters.*

$$ \text{4.00}\;\cancel{\text{qt}}\;\times \;\frac{\text{1 L}}{\text{1.0567}\;\cancel{\text{qt}}}\;=\text{3.78 L} $$  {eq:fs-idm279137456}

2. *Convert liters to milliliters.*

$$ \text{3.78}\;\cancel{\text{L}}\;\times \;\frac{\text{1000 mL}}{1\;\cancel{\text{L}}}\;=3.78\;\times \;{10}^{3}\;\text{mL} $$  {eq:fs-idm289883088}

Then,

$$ \text{density}=\;\frac{\text{4.20}\;\times \;{10}^{3}\;\text{g}}{3.78\;\times \;{10}^{3}\;\text{mL}}\;=\text{1.11 g/mL} $$  {eq:fs-idm144640128}

Alternatively, the calculation could be set up in a way that uses three unit conversion factors sequentially as follows:

$$ \frac{\text{9.26}\;\cancel{\text{lb}}}{\text{4.00}\;\cancel{\text{qt}}}\;\times \;\frac{\text{453.59 g}}{1\;\cancel{\text{lb}}}\;\times \;\frac{\text{1.0567}\;\cancel{\text{qt}}}{1\;\cancel{\text{L}}}\;\times \;\frac{1\;\cancel{\text{L}}}{\text{1000 mL}}\;=\text{1.11 g/mL} $$  {eq:fs-idm9873904}

**Check Your Learning**
What is the volume in liters of 1.000 oz, given that 1 L = 1.0567 qt and 1 qt = 32 oz (exactly)?

:::note [answer] Answer:
2.957 × 10<sup>−2</sup> L
:::
:::

:::example {ex:fs-idm306560960} Computing Quantities from Measurement Results and Known Mathematical Relations
While being driven from Philadelphia to Atlanta, a distance of about 1250 km, a 2014 Lamborghini Aventador Roadster uses 213 L gasoline.
(a) What (average) fuel economy, in miles per gallon, did the Roadster get during this trip?
(b) If gasoline costs $3.80 per gallon, what was the fuel cost for this trip?
**Solution**
(a) First convert distance from kilometers to miles:

$$ 1250\;\cancel{\text{km}}\;\times \;\frac{\text{0.62137 mi}}{1\;\cancel{\text{km}}}\;=\text{777 mi} $$  {eq:fs-idm60362224}

and then convert volume from liters to gallons:

$$ 213\;\cancel{\text{L}}\;\times \;\frac{\text{1.0567}\;\cancel{\text{qt}}}{1\;\cancel{\text{L}}}\;\times \;\frac{\text{1 gal}}{4\;\cancel{\text{qt}}}\;=\text{56.3 gal} $$  {eq:fs-idm214696672}

Finally,

$$ \text{(average) mileage}=\;\frac{\text{777 mi}}{\text{56.3 gal}}\;=\text{13.8 miles/gallon}=\text{13.8 mpg} $$  {eq:fs-idm114266320}

Alternatively, the calculation could be set up in a way that uses all the conversion factors sequentially, as follows:

$$ \frac{1250\;\cancel{\text{km}}}{213\;\cancel{\text{L}}}\;\times \;\frac{\text{0.62137 mi}}{1\;\cancel{\text{km}}}\;\times \;\frac{1\;\cancel{\text{L}}}{\text{1.0567}\;\cancel{\text{qt}}}\;\times \;\frac{4\;\cancel{\text{qt}}}{\text{1 gal}}=\text{13.8 mpg} $$  {eq:fs-idm171836160}

(b) Using the previously calculated volume in gallons, we find:

$$ 56.3\;\cancel{\text{gal}}\;\times \;\frac{\text{\$3.80}}{1\;\cancel{\text{gal}}}=\text{\$214} $$  {eq:fs-idm328491840}

**Check Your Learning**
A Toyota Prius Hybrid uses 59.7 L gasoline to drive from San Francisco to Seattle, a distance of 1300 km (two significant digits).
(a) What (average) fuel economy, in miles per gallon, did the Prius get during this trip?
(b) If gasoline costs $3.90 per gallon, what was the fuel cost for this trip?

:::note [answer] Answer:
(a) 51 mpg; (b) $62
:::
:::

## Conversion of Temperature Units
We use the word {term:temperature} to refer to the hotness or coldness of a substance. One way we measure a change in temperature is to use the fact that most substances expand when their temperature increases and contract when their temperature decreases. The liquid in a common glass thermometer changes its volume as the temperature changes, and the position of the trapped liquid's surface along a printed scale may be used as a measure of temperature.
Temperature scales are defined relative to selected reference temperatures: Two of the most commonly used are the freezing and boiling temperatures of water at a specified atmospheric pressure. On the Celsius scale, 0 °C is defined as the freezing temperature of water and 100 °C as the boiling temperature of water. The space between the two temperatures is divided into 100 equal intervals, which we call degrees. On the {term:Fahrenheit} scale, the freezing point of water is defined as 32 °F and the boiling temperature as 212 °F. The space between these two points on a Fahrenheit thermometer is divided into 180 equal parts (degrees).
Defining the Celsius and Fahrenheit temperature scales as described in the previous paragraph results in a slightly more complex relationship between temperature values on these two scales than for different units of measure for other properties. Most measurement units for a given property are directly proportional to one another (y = mx). Using familiar length units as one example:

$$ \text{length in feet}=(\frac{\text{1 ft}}{\text{12 in.}})\;\times \;\text{length in inches} $$  {eq:fs-idm6121760}

where y = length in feet, x = length in inches, and the proportionality constant, m, is the conversion factor. The Celsius and Fahrenheit temperature scales, however, do not share a common zero point, and so the relationship between these two scales is a linear one rather than a proportional one (y = mx + b). Consequently, converting a temperature from one of these scales into the other requires more than simple multiplication by a conversion factor, m; it also must take into account differences in the scales’ zero points (b).
The linear equation relating Celsius and Fahrenheit temperatures is easily derived from the two temperatures used to define each scale. Representing the Celsius temperature as *x* and the Fahrenheit temperature as *y*, the slope, *m*, is computed to be:

$$ m=\;\frac{\text{Δ}y}{\text{Δ}x}\;=\frac{\text{212 °F}-\text{32 °F}\;}{\text{100 °C}-\text{0 °C}}\;=\;\frac{\text{180 °F}}{\text{100 °C}}\;=\;\frac{\text{9 °F}}{\text{5 °C}} $$  {eq:fs-idm229969840}

The *y*-intercept of the equation, *b*, is then calculated using either of the equivalent temperature pairs, (100 °C, 212 °F) or (0 °C, 32 °F), as:

$$ b=y-mx=\text{32 °F}-\;\frac{\text{9 °F}}{\text{5 °C}}\;\times \;\text{0 °C}=\text{32 °F} $$  {eq:fs-idm234430272}

The equation relating the temperature (*T*) scales is then:

$$ {T}_{\text{°F}}=(\frac{\text{9 °F}}{\text{5 °C}}\;\times \;{T}_{\text{°C}})+\text{32 °F} $$  {eq:fs-idm305465424}

An abbreviated form of this equation that omits the measurement units is:

$$ {T}_{\text{°F}}=\;(\frac{9}{5\;}\;\times \;{T}_{\text{°C}})+32 $$  {eq:fs-idm226315088}

Rearrangement of this equation yields the form useful for converting from Fahrenheit to Celsius:

$$ {T}_{\text{°C}}=\;\frac{5\;}{9}({T}_{\text{°F}}-32) $$  {eq:fs-idm138168256}

As mentioned earlier in this chapter, the SI unit of temperature is the kelvin (K). Unlike the Celsius and Fahrenheit scales, the kelvin scale is an absolute temperature scale in which 0 (zero) K corresponds to the lowest temperature that can theoretically be achieved. Since the kelvin temperature scale is absolute, a degree symbol is not included in the unit abbreviation, K. The early 19th-century discovery of the relationship between a gas’s volume and temperature suggested that the volume of a gas would be zero at −273.15 °C. In 1848, British physicist William Thompson, who later adopted the title of Lord Kelvin, proposed an absolute temperature scale based on this concept (further treatment of this topic is provided in this text’s chapter on gases).
The freezing temperature of water on this scale is 273.15 K and its boiling temperature is 373.15 K. Notice the numerical difference in these two reference temperatures is 100, the same as for the Celsius scale, and so the linear relation between these two temperature scales will exhibit a slope of $1\;\frac{\text{K}}{\text{°C}}$. Following the same approach, the equations for converting between the kelvin and Celsius temperature scales are derived to be:

$$ {T}_{\text{K}}={T}_{\text{°C}}+\text{273.15} $$  {eq:fs-idp289344}

$$ {T}_{\text{°C}}={T}_{\text{K}}-\text{273.15} $$  {eq:fs-idm303916848}

The 273.15 in these equations has been determined experimentally, so it is not exact. [ref:CNX_Chem_01_06_TempScales] shows the relationship among the three temperature scales.

> FIGURE {fig:CNX_Chem_01_06_TempScales} src=../../media/CNX_Chem_01_06_TempScales.jpg
> alt: Three thermometers are shown for the Fahrenheit, Celsius, and Kelvin scales. Under the Fahrenheit scale, the boiling point of water is 212 degrees while the freezing point is 32 degrees, with 180 Fahrenheit degrees between them. Under the Celsius scale, the boiling point is 100 degrees while the freezing point is 0 degrees, with 100 Celsius degrees between them. Under the Kelvin scale, the boiling point is 373.15 K while the freezing point is 273.15 K, with 100 kelvins between them. 233.15 K is equal to negative 40 degrees Celsius, which is also equal to negative 40 degrees Fahrenheit.
> caption: The Fahrenheit, Celsius, and kelvin temperature scales are compared.

Although the kelvin (absolute) temperature scale is the official SI temperature scale, Celsius is commonly used in many scientific contexts and is the scale of choice for nonscience contexts in almost all areas of the world. Very few countries (the U.S. and its territories, the Bahamas, Belize, Cayman Islands, and Palau) still use Fahrenheit for weather, medicine, and cooking.

:::example {ex:fs-idm75569040} Conversion from Celsius
Normal body temperature has been commonly accepted as 37.0 °C (although it varies depending on time of day and method of measurement, as well as among individuals). What is this temperature on the kelvin scale and on the Fahrenheit scale?
**Solution**

$$ \text{K}=\text{°C}+273.15=37.0+273.2=\text{310.2 K} $$  {eq:fs-idm223031696}

$$ \text{°F}=\frac{9}{5}\text{°C}+32.0=(\frac{9}{5}\;\times \;37.0)+32.0=66.6+32.0=\text{98.6 °F} $$  {eq:fs-idp114907616}

**Check Your Learning**
Convert 80.92 °C to K and °F.

:::note [answer] Answer:
354.07 K, 177.66 °F
:::
:::

:::example {ex:fs-idm309453552} Conversion from Fahrenheit
Baking a ready-made pizza calls for an oven temperature of 450 °F. If you are in Europe, and your oven thermometer uses the Celsius scale, what is the setting? What is the kelvin temperature?
**Solution**

$$ \text{°C}=\;\frac{5}{9}\text{(°F}-\text{32)}=\;\frac{5}{9}(450-32)=\;\frac{5}{9}\;\times \;418=\text{232 °C}\;\longrightarrow \;\text{set oven to 230 °C}\hspace{2em}(\text{two significant figures}) $$  {eq:fs-idm32912}

$$ \text{K}=\text{°C}+273.15=\frac{5}{9}\text{(°F}-\text{32)}+273.15=\frac{5}{9}(450-32)+273.15=505.4\;\text{K}\;\longrightarrow 5.1\times {10}^{2}\text{K} $$  {eq:fs-idm144212448}

**Check Your Learning**
Convert 50 °F to °C and K.

:::note [answer] Answer:
10 °C, 280 K
:::
:::

## Key Concepts and Summary {section:summary}
Measurements are made using a variety of units. It is often useful or necessary to convert a measured quantity from one unit into another. These conversions are accomplished using unit conversion factors, which are derived by simple applications of a mathematical approach called the factor-label method or dimensional analysis. This strategy is also employed to calculate sought quantities using measured quantities and appropriate mathematical relations.

## Key Equations {section:key-equations}

> TABLE {tab:key-equations-table} cols=1 class=unnumbered unstyled
> summary: key equations table

|  |
| --- |
| ${T}_{\text{°C}}=\;\frac{5}{9}\;\times \;({T}_{\text{°F}}-32)$ |
| ${T}_{\text{°F}}=\;(\frac{9}{5}\;\times \;{T}_{\text{°C}})+32$ |
| ${T}_{\text{K}}=\text{°C}+273.15$ |
| ${T}_{\text{°C}}=\text{K}-273.15$ |

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idm287695728} type= 
PROBLEM:
Write conversion factors (as ratios) for the number of:
(a) yards in 1 meter
(b) liters in 1 liquid quart
(c) pounds in 1 kilogram
SOLUTION:
(a) $\frac{\text{1.0936 yd}}{\text{1 m}}$; (b) $\frac{\text{0.94635 L}}{\text{1 qt}}$; (c) $\frac{\text{2.2046 lb}}{\text{1 kg}}$
:::

:::exercise {fs-idm321326256} type= 
PROBLEM:
Write conversion factors (as ratios) for the number of:
(a) kilometers in 1 mile
(b) liters in 1 cubic foot
(c) grams in 1 ounce
:::

:::exercise {fs-idp43396912} type= 
PROBLEM:
The label on a soft drink bottle gives the volume in two units: 2.0 L and 67.6 fl oz. Use this information to derive a conversion factor between the English and metric units. How many significant figures can you justify in your conversion factor?
SOLUTION:
$\begin{array}{l}\frac{\text{2.0 L}}{\text{67.6 fl oz}}\;=\;\frac{\text{0.030 L}}{\text{1 fl oz}}\end{array}$
Only two significant figures are justified.
:::

:::exercise {fs-idm124621456} type= 
PROBLEM:
The label on a box of cereal gives the mass of cereal in two units: 978 grams and 34.5 oz. Use this information to find a conversion factor between the English and metric units. How many significant figures can you justify in your conversion factor?
:::

:::exercise {fs-idm125803088} type= 
PROBLEM:
Soccer is played with a round ball having a circumference between 27 and 28 in. and a weight between 14 and 16 oz. What are these specifications in units of centimeters and grams?
SOLUTION:
68–71 cm; 400–450 g
:::

:::exercise {fs-idm128259568} type= 
PROBLEM:
A woman’s basketball has a circumference between 28.5 and 29.0 inches and a maximum weight of 20 ounces (two significant figures). What are these specifications in units of centimeters and grams?
:::

:::exercise {fs-idm203954352} type= 
PROBLEM:
How many milliliters of a soft drink are contained in a 12.0-oz can?
SOLUTION:
355 mL
:::

:::exercise {fs-idm290820272} type= 
PROBLEM:
A barrel of oil is exactly 42 gal. How many liters of oil are in a barrel?
:::

:::exercise {fs-idp32978240} type= 
PROBLEM:
The diameter of a red blood cell is about 3 $\times$ 10<sup>−4</sup> in. What is its diameter in centimeters?
SOLUTION:
8 $\times$ 10<sup>−4</sup> cm
:::

:::exercise {fs-idp3893440} type= 
PROBLEM:
The distance between the centers of the two oxygen atoms in an oxygen molecule is 1.21 $\times$ 10<sup>−8</sup> cm. What is this distance in inches?
:::

:::exercise {fs-idm280166528} type= 
PROBLEM:
Is a 197-lb weight lifter light enough to compete in a class limited to those weighing 90 kg or less?
SOLUTION:
yes; weight = 89.4 kg
:::

:::exercise {fs-idm311405440} type= 
PROBLEM:
A very good 197-lb weight lifter lifted 192 kg in a move called the clean and jerk. What was the mass of the weight lifted in pounds?
:::

:::exercise {fs-idm159954784} type= 
PROBLEM:
Many medical laboratory tests are run using 5.0 μL blood serum. What is this volume in milliliters?
SOLUTION:
5.0 $\times$ 10<sup>−3</sup> mL
:::

:::exercise {fs-idm293326720} type= 
PROBLEM:
If an aspirin tablet contains 325 mg aspirin, how many grams of aspirin does it contain?
:::

:::exercise {fs-idm101514016} type= 
PROBLEM:
Use scientific (exponential) notation to express the following quantities in terms of the SI base units in [ref:fs-idm81346144](module:m68674):
(a) 0.13 g
(b) 232 Gg
(c) 5.23 pm
(d) 86.3 mg
(e) 37.6 cm
(f) 54 μm
(g) 1 Ts
(h) 27 ps
(i) 0.15 mK
SOLUTION:
(a) 1.3 $\times$ 10<sup>−4</sup> kg; (b) 2.32 $\times$ 10<sup>8</sup> kg; (c) 5.23 $\times$ 10<sup>−12</sup> m; (d) 8.63 $\times$ 10<sup>−5</sup> kg; (e) 3.76 $\times$ 10<sup>−1</sup> m; (f) 5.4 $\times$ 10<sup>−5</sup> m; (g) 1 $\times$ 10<sup>12</sup> s; (h) 2.7 $\times$ 10<sup>−11</sup> s; (i) 1.5 $\times$ 10<sup>−4</sup> K
:::

:::exercise {fs-idm247037968} type= 
PROBLEM:
Complete the following conversions between SI units.
(a) 612 g = ________ mg
(b) 8.160 m = ________ cm
(c) 3779 μg = ________ g
(d) 781 mL = ________ L
(e) 4.18 kg = ________ g
(f) 27.8 m = ________ km
(g) 0.13 mL = ________ L
(h) 1738 km = ________ m
(i) 1.9 Gg = ________ g
:::

:::exercise {fs-idp54026624} type= 
PROBLEM:
Gasoline is sold by the liter in many countries. How many liters are required to fill a 12.0-gal gas tank?
SOLUTION:
45.4 L
:::

:::exercise {fs-idm242942368} type= 
PROBLEM:
Milk is sold by the liter in many countries. What is the volume of exactly 1/2 gal of milk in liters?
:::

:::exercise {fs-idm186995360} type= 
PROBLEM:
A long ton is defined as exactly 2240 lb. What is this mass in kilograms?
SOLUTION:
1.0160 $\times$ 10<sup>3</sup> kg
:::

:::exercise {fs-idm311016240} type= 
PROBLEM:
Make the conversion indicated in each of the following:
(a) the men’s world record long jump, 29 ft 4¼ in., to meters
(b) the greatest depth of the ocean, about 6.5 mi, to kilometers
(c) the area of the state of Oregon, 96,981 mi<sup>2</sup>, to square kilometers
(d) the volume of 1 gill (exactly 4 oz) to milliliters
(e) the estimated volume of the oceans, 330,000,000 mi<sup>3</sup>, to cubic kilometers.
(f) the mass of a 3525-lb car to kilograms
(g) the mass of a 2.3-oz egg to grams
:::

:::exercise {fs-idm250694352} type= 
PROBLEM:
Make the conversion indicated in each of the following:
(a) the length of a soccer field, 120 m (three significant figures), to feet
(b) the height of Mt. Kilimanjaro, at 19,565 ft, the highest mountain in Africa, to kilometers
(c) the area of an 8.5- × 11-inch sheet of paper in cm<sup>2</sup>
(d) the displacement volume of an automobile engine, 161 in.<sup>3</sup>, to liters
(e) the estimated mass of the atmosphere, 5.6 × 10<sup>15</sup> tons, to kilograms
(f) the mass of a bushel of rye, 32.0 lb, to kilograms
(g) the mass of a 5.00-grain aspirin tablet to milligrams (1 grain = 0.00229 oz)
SOLUTION:
(a) 394 ft; (b) 5.9634 km; (c) 6.0 $\times$ 10<sup>2</sup>; (d) 2.64 L; (e) 5.1 $\times$ 10<sup>18</sup> kg; (f) 14.5 kg; (g) 325 mg
:::

:::exercise {fs-idm219388000} type= 
PROBLEM:
Many chemistry conferences have held a 50-Trillion Angstrom Run (two significant figures). How long is this run in kilometers and in miles? (1 Å = 1 $\times$ 10<sup>−10</sup> m)
:::

:::exercise {fs-idm311640624} type= 
PROBLEM:
A chemist’s 50-Trillion Angstrom Run (see [ref:fs-idm219388000]) would be an archeologist’s 10,900 cubit run. How long is one cubit in meters and in feet? (1 Å = 1 $\times$ 10<sup>−8</sup> cm)
SOLUTION:
0.46 m; 1.5 ft/cubit
:::

:::exercise {fs-idm306975136} type= 
PROBLEM:
The gas tank of a certain luxury automobile holds 22.3 gallons according to the owner’s manual. If the density of gasoline is 0.8206 g/mL, determine the mass in kilograms and pounds of the fuel in a full tank.
:::

:::exercise {fs-idm244153744} type= 
PROBLEM:
As an instructor is preparing for an experiment, he requires 225 g phosphoric acid. The only container readily available is a 150-mL Erlenmeyer flask. Is it large enough to contain the acid, whose density is 1.83 g/mL?
SOLUTION:
Yes, the acid’s volume is 123 mL.
:::

:::exercise {fs-idm110873792} type= 
PROBLEM:
To prepare for a laboratory period, a student lab assistant needs 125 g of a compound. A bottle containing 1/4 lb is available. Did the student have enough of the compound?
:::

:::exercise {fs-idp15401744} type= 
PROBLEM:
A chemistry student is 159 cm tall and weighs 45.8 kg. What is her height in inches and weight in pounds?
SOLUTION:
62.6 in (about 5 ft 3 in.) and 101 lb
:::

:::exercise {fs-idm207241008} type= 
PROBLEM:
In a recent Grand Prix, the winner completed the race with an average speed of 229.8 km/h. What was his speed in miles per hour, meters per second, and feet per second?
:::

:::exercise {fs-idm289866560} type= 
PROBLEM:
Solve these problems about lumber dimensions.
(a) To describe to a European how houses are constructed in the US, the dimensions of “two-by-four” lumber must be converted into metric units. The thickness $\times$ width $\times$ length dimensions are 1.50 in. $\times$ 3.50 in. $\times$ 8.00 ft in the US. What are the dimensions in cm $\times$ cm $\times$ m?
(b) This lumber can be used as vertical studs, which are typically placed 16.0 in. apart. What is that distance in centimeters?
SOLUTION:
(a) 3.81 cm $\times$ 8.89 cm $\times$ 2.44 m; (b) 40.6 cm
:::

:::exercise {fs-idm95632784} type= 
PROBLEM:
The mercury content of a stream was believed to be above the minimum considered safe—1 part per billion (ppb) by weight. An analysis indicated that the concentration was 0.68 parts per billion. What quantity of mercury in grams was present in 15.0 L of the water, the density of which is 0.998 g/ml? $\text{(1 ppb Hg}=\;\frac{\text{1 ng Hg}}{\text{1 g water}}\text{)}$
:::

:::exercise {fs-idm215857872} type= 
PROBLEM:
Calculate the density of aluminum if 27.6 cm<sup>3</sup> has a mass of 74.6 g.
SOLUTION:
2.70 g/cm<sup>3</sup>
:::

:::exercise {fs-idm215482272} type= 
PROBLEM:
Osmium is one of the densest elements known. What is its density if 2.72 g has a volume of 0.121 cm<sup>3</sup>?
:::

:::exercise {fs-idm361862336} type= 
PROBLEM:
Calculate these masses.
(a) What is the mass of 6.00 cm<sup>3</sup> of mercury, density = 13.5939 g/cm<sup>3</sup>?
(b) What is the mass of 25.0 mL octane, density = 0.702 g/cm<sup>3</sup>?
SOLUTION:
(a) 81.6 g; (b) 17.6 g
:::

:::exercise {fs-idm305607360} type= 
PROBLEM:
Calculate these masses.
(a) What is the mass of 4.00 cm<sup>3</sup> of sodium, density = 0.97 g/cm<sup>3</sup> ?
(b) What is the mass of 125 mL gaseous chlorine, density = 3.16 g/L?
:::

:::exercise {fs-idm216432832} type= 
PROBLEM:
Calculate these volumes.
(a) What is the volume of 25 g iodine, density = 4.93 g/cm<sup>3</sup>?
(b) What is the volume of 3.28 g gaseous hydrogen, density = 0.089 g/L?
SOLUTION:
(a) 5.1 mL; (b) 37 L
:::

:::exercise {fs-idm182387776} type= 
PROBLEM:
Calculate these volumes.
(a) What is the volume of 11.3 g graphite, density = 2.25 g/cm<sup>3</sup>?
(b) What is the volume of 39.657 g bromine, density = 2.928 g/cm<sup>3</sup>?
:::

:::exercise {fs-idm208263472} type= 
PROBLEM:
Convert the boiling temperature of gold, 2966 °C, into degrees Fahrenheit and kelvin.
SOLUTION:
5371 °F, 3239 K
:::

:::exercise {fs-idm291580080} type= 
PROBLEM:
Convert the temperature of scalding water, 54 °C, into degrees Fahrenheit and kelvin.
:::

:::exercise {fs-idm126910176} type= 
PROBLEM:
Convert the temperature of the coldest area in a freezer, −10 °F, to degrees Celsius and kelvin.
SOLUTION:
−23 °C, 250 K
:::

:::exercise {fs-idm294247168} type= 
PROBLEM:
Convert the temperature of dry ice, −77 °C, into degrees Fahrenheit and kelvin.
:::

:::exercise {fs-idm312310640} type= 
PROBLEM:
Convert the boiling temperature of liquid ammonia, −28.1 °F, into degrees Celsius and kelvin.
SOLUTION:
−33.4 °C, 239.8 K
:::

:::exercise {fs-idm307064960} type= 
PROBLEM:
The label on a pressurized can of spray disinfectant warns against heating the can above 130 °F. What are the corresponding temperatures on the Celsius and kelvin temperature scales?
:::

:::exercise {fs-idm161487744} type= 
PROBLEM:
The weather in Europe was unusually warm during the summer of 1995. The TV news reported temperatures as high as 45 °C. What was the temperature on the Fahrenheit scale?
SOLUTION:
113 °F
:::

## Glossary
- {def} **dimensional analysis**: (also, *factor-label method*) versatile mathematical strategy for calculations involving quantities that subjects the quantities’ units to the same mathematical operations as their numbers
- {def} **factor-label method**: (also, *dimensional analysis*) versatile mathematical strategy for calculations involving quantities that subjects the quantities’ units to the same mathematical operations as their numbers
- {def} **Fahrenheit**: unit of temperature; water freezes at 32 °F and boils at 212 °F on this scale
- {def} **temperature**: intensive property representing the hotness or coldness of matter
- {def} **unit conversion factor**: ratio of equivalent quantities expressed with different units; used to convert from one unit to a different unit
