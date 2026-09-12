# Measurement Uncertainty, Accuracy, and Precision

## Learning Objectives {section:learning-objectives}
By the end of this section, you will be able to:
- Define accuracy and precision
- Distinguish exact and uncertain numbers
- Correctly represent uncertainty in quantities using significant figures
- Apply proper rounding rules to computed quantities

Counting is the only type of measurement that is free from uncertainty, provided the number of objects being counted does not change while the counting process is underway. The result of such a counting measurement is an example of an {term:exact number}. By counting the eggs in a carton, one can determine *exactly* how many eggs the carton contains. The numbers of defined quantities are also exact. By definition, 1 foot is exactly 12 inches, 1 inch is exactly 2.54 centimeters, and 1 gram is exactly 0.001 kilogram. Quantities derived from measurements other than counting, however, are uncertain to varying extents due to practical limitations of the measurement process used.

## Significant Figures in Measurement
The numbers of measured quantities, unlike defined or directly counted quantities, are not exact. To measure the volume of liquid in a graduated cylinder, you should make a reading at the bottom of the meniscus, the lowest point on the curved surface of the liquid.

> FIGURE {fig:fs-idm337865984} src=../../media/CNX_Chem_01_05_Measure.jpg
> alt: This diagram shows a 25 milliliter graduated cylinder filled with about 20.8 milliliters of fluid. The diagram zooms in on the meniscus, which is the curved surface of the water that is visible when the graduated cylinder is viewed from the side. You make the reading at the lowest point of the curve of the meniscus.
> caption: To measure the volume of liquid in this graduated cylinder, you must mentally subdivide the distance between the 21 and 22 mL marks into tenths of a milliliter, and then make a reading (estimate) at the bottom of the meniscus.

Refer to the illustration in [ref:fs-idm337865984]. The bottom of the meniscus in this case clearly lies between the 21 and 22 markings, meaning the liquid volume is *certainly* greater than 21 mL but less than 22 mL. The meniscus appears to be a bit closer to the 22-mL mark than to the 21-mL mark, and so a reasonable estimate of the liquid’s volume would be 21.6 mL. In the number 21.6, then, the digits 2 and 1 are certain, but the 6 is an estimate. Some people might estimate the meniscus position to be equally distant from each of the markings and estimate the tenth-place digit as 5, while others may think it to be even closer to the 22-mL mark and estimate this digit to be 7. Note that it would be pointless to attempt to estimate a digit for the hundredths place, given that the tenths-place digit is uncertain. In general, numerical scales such as the one on this graduated cylinder will permit measurements to one-tenth of the smallest scale division. The scale in this case has 1-mL divisions, and so volumes may be measured to the nearest 0.1 mL.
This concept holds true for all measurements, even if you do not actively make an estimate. If you place a quarter on a standard electronic balance, you may obtain a reading of 6.72 g. The digits 6 and 7 are certain, and the 2 indicates that the mass of the quarter is likely between 6.71 and 6.73 grams. The quarter weighs *about* 6.72 grams, with a nominal uncertainty in the measurement of ± 0.01 gram. If the coin is weighed on a more sensitive balance, the mass might be 6.723 g. This means its mass lies between 6.722 and 6.724 grams, an uncertainty of 0.001 gram. Every measurement has some {term:uncertainty}, which depends on the device used (and the user’s ability). All of the digits in a measurement, including the uncertain last digit, are called {term:significant figures} or {term:significant digits}. Note that zero may be a measured value; for example, if you stand on a scale that shows weight to the nearest pound and it shows “120,” then the 1 (hundreds), 2 (tens) and 0 (ones) are all significant (measured) values.
A measurement result is properly reported when its significant digits accurately represent the certainty of the measurement process. But what if you were analyzing a reported value and trying to determine what is significant and what is not? Well, for starters, all nonzero digits are significant, and it is only zeros that require some thought. We will use the terms “leading,” “trailing,” and “captive” for the zeros and will consider how to deal with them.

> IMAGE {img:fs-idm244068192} src=../../media/CNX_Chem_01_05_SigDigits5_img.jpg class=scaled-down
> alt: The left diagram uses the example of 3090. The zero in the hundreds place is labeled “captive” and the zero in the ones place is labeled trailing. The right diagram uses the example 0.008020. The three zeros in the ones, tenths, and hundredths places are labeled “leading.” The zero in the ten-thousandths place is labeled “captive” and the zero in the millionths place is labeled “trailing.”

Starting with the first nonzero digit on the left, count this digit and all remaining digits to the right. This is the number of significant figures in the measurement unless the last digit is a trailing zero lying to the left of the decimal point.

> IMAGE {img:fs-idp40720144} src=../../media/CNX_Chem_01_05_SigDigits1_img.jpg
> alt: The left diagram uses the example of 1267 meters. The number 1 is the first nonzero figure on the left. 1267 has 4 significant figures in total. The right diagram uses the example of 55.0 grams. The number 5 in the tens place is the first nonzero figure on the left. 55.0 has 3 significant figures. Note that the 0 is to the right of the decimal point and therefore is a significant figure.

Captive zeros result from measurement and are therefore always significant. Leading zeros, however, are never significant—they merely tell us where the decimal point is located.

> IMAGE {img:fs-idm113793344} src=../../media/CNX_Chem_01_05_SigDigits2_img.jpg
> alt: The left diagram uses the example of 70.607 milliliters. The number 7 is the first nonzero figure on the left. 70.607 has 5 significant figures in total, as all figures are measured including the 2 zeros. The right diagram uses the example of 0.00832407 milliliters. The number 8 is the first nonzero figure on the left. 0.00832407 has 6 significant figures.

The leading zeros in this example are not significant. We could use exponential notation (as described in [Appendix B](module:m68860)) and express the number as 8.32407 $\times$ 10<sup>−3</sup>; then the number 8.32407 contains all of the significant figures, and 10<sup>−3</sup> locates the decimal point.
The number of significant figures is uncertain in a number that ends with a zero to the left of the decimal point location. The zeros in the measurement 1,300 grams could be significant or they could simply indicate where the decimal point is located. The ambiguity can be resolved with the use of exponential notation: 1.3 $\times$ 10<sup>3</sup> (two significant figures), 1.30 $\times$ 10<sup>3</sup> (three significant figures, if the tens place was measured), or 1.300 $\times$ 10<sup>3</sup> (four significant figures, if the ones place was also measured). In cases where only the decimal-formatted number is available, it is prudent to assume that all trailing zeros are not significant.

> IMAGE {img:fs-idp29412624} src=../../media/CNX_Chem_01_05_SigDigits3_img.jpg class=scaled-down
> alt: This figure uses the example of 1300 grams. The one and the 3 are significant figures as they are clearly the result of measurement. The 2 zeros could be significant if they were measured or they could be placeholders.

When determining significant figures, be sure to pay attention to reported values and think about the measurement and significant figures in terms of what is reasonable or likely when evaluating whether the value makes sense. For example, the official January 2014 census reported the resident population of the US as 317,297,725. Do you think the US population was correctly determined to the reported nine significant figures, that is, to the exact number of people? People are constantly being born, dying, or moving into or out of the country, and assumptions are made to account for the large number of people who are not actually counted. Because of these uncertainties, it might be more reasonable to expect that we know the population to within perhaps a million or so, in which case the population should be reported as 3.17 $\times$ 10<sup>8</sup> people.

## Significant Figures in Calculations
A second important principle of uncertainty is that results calculated from a measurement are at least as uncertain as the measurement itself. Take the uncertainty in measurements into account to avoid misrepresenting the uncertainty in calculated results. One way to do this is to report the result of a calculation with the correct number of significant figures, which is determined by the following three rules for {term:rounding} numbers:
1. When adding or subtracting numbers, round the result to the same number of decimal places as the number with the least number of decimal places (the least certain value in terms of addition and subtraction).
2. When multiplying or dividing numbers, round the result to the same number of digits as the number with the least number of significant figures (the least certain value in terms of multiplication and division).
3. If the digit to be dropped (the one immediately to the right of the digit to be retained) is less than 5, “round down” and leave the retained digit unchanged; if it is more than 5, “round up” and increase the retained digit by 1. If the dropped digit is 5, and it’s either the last digit in the number or it’s followed only by zeros, round up or down, whichever yields an even value for the retained digit. If any nonzero digits follow the dropped 5, round up. (The last part of this rule may strike you as a bit odd, but it’s based on reliable statistics and is aimed at avoiding any bias when dropping the digit “5,” since it is equally close to both possible values of the retained digit.)
The following examples illustrate the application of this rule in rounding a few different numbers to three significant figures:
- 0.028675 rounds “up” to 0.0287 (the dropped digit, 7, is greater than 5)
- 18.3384 rounds “down” to 18.3 (the dropped digit, 3, is less than 5)
- 6.8752 rounds “up” to 6.88 (the dropped digit is 5, and a nonzero digit follows it)
- 92.85 rounds “down” to 92.8 (the dropped digit is 5, and the retained digit is even)
Let’s work through these rules with a few examples.

:::example {ex:fs-idp40552528} Rounding Numbers
Round the following to the indicated number of significant figures:
(a) 31.57 (to two significant figures)
(b) 8.1649 (to three significant figures)
(c) 0.051065 (to four significant figures)
(d) 0.90275 (to four significant figures)
**Solution**
(a) 31.57 rounds “up” to 32 (the dropped digit is 5, and the retained digit is even)
(b) 8.1649 rounds “down” to 8.16 (the dropped digit, 4, is less than 5)
(c) 0.051065 rounds “down” to 0.05106 (the dropped digit is 5, and the retained digit is even)
(d) 0.90275 rounds “up” to 0.9028 (the dropped digit is 5, and the retained digit is even)
**Check Your Learning**
Round the following to the indicated number of significant figures:
(a) 0.424 (to two significant figures)
(b) 0.0038661 (to three significant figures)
(c) 421.25 (to four significant figures)
(d) 28,683.5 (to five significant figures)

:::note [answer] Answer:
(a) 0.42; (b) 0.00387; (c) 421.2; (d) 28,684
:::
:::

:::example {ex:fs-idp61408240} Addition and Subtraction with Significant Figures
Rule: When adding or subtracting numbers, round the result to the same number of decimal places as the number with the fewest decimal places (i.e., the least certain value in terms of addition and subtraction).
(a) Add 1.0023 g and 4.383 g.
(b) Subtract 421.23 g from 486 g.
**Solution**
(a) $\begin{array}{l} \\ \begin{array}{l} \\ \frac{\begin{array}{l}\hspace{1.4em}1.0023 g \\ \text{+ 4.383 g}\end{array}}{\hspace{1.5em}5.3853 g}\end{array}\end{array}$
Answer is 5.385 g (round to the thousandths place; three decimal places)
(b) $\begin{array}{l}\begin{array}{l} \\ \end{array} \\ \frac{\begin{array}{l} \;486 g \\ -421.23 g\end{array}}{\hspace{1.3em}64.77 g}\end{array}$
Answer is 65 g (round to the ones place; no decimal places)

> IMAGE {img:fs-idm330284704} src=../../media/CNX_Chem_01_05_SigDigits4_img.jpg class=scaled-down
> alt: Figure A shows 1.0023 being added to 4.383 to yield the answer 5.385. 1.0023 goes to the ten thousandths place, but 4.383 goes to the thousandths place, making it the less precise of the two numbers. Therefore the answer, 5.3853, should be rounded to the thousandths, to yield 5.385. Figure B shows 486 grams minus 421.23 grams, which yields the answer 64.77 grams. This answer should be rounded to the ones place, making the answer 65 grams.

**Check Your Learning**
(a) Add 2.334 mL and 0.31 mL.
(b) Subtract 55.8752 m from 56.533 m.

:::note [answer] Answer:
(a) 2.64 mL; (b) 0.658 m
:::
:::

:::example {ex:fs-idp34148976} Multiplication and Division with Significant Figures
Rule: When multiplying or dividing numbers, round the result to the same number of digits as the number with the fewest significant figures (the least certain value in terms of multiplication and division).
(a) Multiply 0.6238 cm by 6.6 cm.
(b) Divide 421.23 g by 486 mL.
**Solution**
(a) $\begin{array}{l}\begin{array}{l}\text{0.6238 cm}\;\times \;6.6\;\text{cm}=4.11708\;{\text{cm}}^{2}\;\longrightarrow \;\text{result is}\;4.1\;{\text{cm}}^{2}\;(\text{round to two significant figures}) \\ \text{four significant figures}\;\times \;\text{two significant figures}\;\longrightarrow \;\text{two significant figures answer}\end{array}\end{array}$
(b) $\begin{array}{l}\frac{\text{421.23 g}}{\text{486 mL}}\;=\text{0.866728... g/mL}\;\longrightarrow \;\text{result is 0.867 g/mL}\;(\text{round to three significant figures}) \\ \frac{\text{five significant figures}}{\text{three significant figures}}\;\longrightarrow \;\text{three significant figures answer}\end{array}$
**Check Your Learning**
(a) Multiply 2.334 cm and 0.320 cm.
(b) Divide 55.8752 m by 56.53 s.

:::note [answer] Answer:
(a) 0.747 cm<sup>2</sup> (b) 0.9884 m/s
:::
:::
In the midst of all these technicalities, it is important to keep in mind the reason for these rules about significant figures and rounding—to correctly represent the certainty of the values reported and to ensure that a calculated result is not represented as being more certain than the least certain value used in the calculation.

:::example {ex:fs-idp40680240} Calculation with Significant Figures
One common bathtub is 13.44 dm long, 5.920 dm wide, and 2.54 dm deep. Assume that the tub is rectangular and calculate its approximate volume in liters.
**Solution**

$$ \begin{array}{lll}V & = & l\;\times \;w\;\times \;d \\ & = & \text{13.44 dm}\;\times \;\text{5.920 dm}\;\times \;\text{2.54 dm} \\ & = & \text{202.09459}...\;{\text{dm}}^{3}(\text{value from calculator}) \\ & = & {\text{202 dm}}^{3}\text{, or 202 L}\;(\text{answer rounded to three significant figures})\end{array} $$  {eq:fs-idm15365184}

**Check Your Learning**
What is the density of a liquid with a mass of 31.1415 g and a volume of 30.13 cm<sup>3</sup>?

:::note [answer] Answer:
1.034 g/mL
:::
:::

:::example {ex:fs-idm148976192} Experimental Determination of Density Using Water Displacement
A piece of rebar is weighed and then submerged in a graduated cylinder partially filled with water, with results as shown.

> IMAGE {img:fs-idm332426528} src=../../media/CNX_Chem_01_04_CylRebar.jpg class=scaled-down
> alt: This diagram shows the initial volume of water in a graduated cylinder as 13.5 milliliters. A 69.658 gram piece of metal rebar is added to the graduated cylinder, causing the water to reach a final volume of 22.4 milliliters

(a) Use these values to determine the density of this piece of rebar.
(b) Rebar is mostly iron. Does your result in (a) support this statement? How?
**Solution**
The volume of the piece of rebar is equal to the volume of the water displaced:

$$ \text{volume}=\text{22.4 mL}-\text{13.5 mL}=\text{8.9 mL}={\text{8.9 cm}}^{3} $$  {eq:fs-idm180698816}

(rounded to the nearest 0.1 mL, per the rule for addition and subtraction)
The density is the mass-to-volume ratio:

$$ \text{density}=\;\frac{\text{mass}}{\text{volume}}\;=\;\frac{\text{69.658 g}}{{\text{8.9 cm}}^{3}}={\text{7.8 g/cm}}^{3} $$  {eq:fs-idp135143440}

(rounded to two significant figures, per the rule for multiplication and division)
From [ref:fs-idm45639696](module:m68674), the density of iron is 7.9 g/cm<sup>3</sup>, very close to that of rebar, which lends some support to the fact that rebar is mostly iron.
**Check Your Learning**
An irregularly shaped piece of a shiny yellowish material is weighed and then submerged in a graduated cylinder, with results as shown.

> IMAGE {img:fs-idm283007920} src=../../media/CNX_Chem_01_04_CylGold.jpg class=scaled-down
> alt: This diagram shows the initial volume of water in a graduated cylinder as 17.1 milliliters. A 51.842 gram gold colored rock is added to the graduated cylinder, causing the water to reach a final volume of 19.8 milliliters

(a) Use these values to determine the density of this material.
(b) Do you have any reasonable guesses as to the identity of this material? Explain your reasoning.

:::note [answer] Answer:
(a) 19 g/cm<sup>3</sup>; (b) It is likely gold; the right appearance for gold and very close to the density given for gold in [ref:fs-idm45639696](module:m68674).
:::
:::

## Accuracy and Precision
Scientists typically make repeated measurements of a quantity to ensure the quality of their findings and to evaluate both the {term:precision} and the {term:accuracy} of their results. Measurements are said to be precise if they yield very similar results when repeated in the same manner. A measurement is considered accurate if it yields a result that is very close to the true or accepted value. Precise values agree with each other; accurate values agree with a true value. These characterizations can be extended to other contexts, such as the results of an archery competition ([ref:fs-idm1827280]).

> FIGURE {fig:fs-idm1827280} src=../../media/CNX_Chem_01_05_Archery.jpg
> alt: Figures A through C each show targets with holes where the arrows hit. The archer in figure A was both accurate and precise as all 3 arrows are clustered in the center of the target. In figure B, the archer is precise but not accurate, as all 3 arrows are clustered together but to the upper right of the center of the target. In Figure C, the archer is neither accurate nor precise as the 3 holes are not close together and are located both to the upper right and right of the target.
> caption: (a) These arrows are close to both the bull’s eye and one another, so they are both accurate and precise. (b) These arrows are close to one another but not on target, so they are precise but not accurate. (c) These arrows are neither on target nor close to one another, so they are neither accurate nor precise.

Suppose a quality control chemist at a pharmaceutical company is tasked with checking the accuracy and precision of three different machines that are meant to dispense 10 ounces (296 mL) of cough syrup into storage bottles. She proceeds to use each machine to fill five bottles and then carefully determines the actual volume dispensed, obtaining the results tabulated in [ref:fs-idp31780400].

> TABLE {tab:fs-idp31780400} cols=3 class=top-titled
> title: Volume (mL) of Cough Medicine Delivered by 10-oz (296 mL) Dispensers
> summary: The volume, in milliliters, of cough medicine delivered by dispensers 1, 2 and 3 are shown in a table. The values for dispenser 1 are 283.3, 284.1, 283.9, 284.0, and 284.1. The values for dispenser 2 are 298.3, 294.2, 296.0, 297.8, and 293.9. The values for dispenser 3 are 296.1, 295.9, 296.1, 296.0, and 296.1.

| Dispenser #1 | Dispenser #2 | Dispenser #3 |
| --- | --- | --- |
| 283.3 | 298.3 | 296.1 |
| 284.1 | 294.2 | 295.9 |
| 283.9 | 296.0 | 296.1 |
| 284.0 | 297.8 | 296.0 |
| 284.1 | 293.9 | 296.1 |

Considering these results, she will report that dispenser #1 is precise (values all close to one another, within a few tenths of a milliliter) but not accurate (none of the values are close to the target value of 296 mL, each being more than 10 mL too low). Results for dispenser #2 represent improved accuracy (each volume is less than 3 mL away from 296 mL) but worse precision (volumes vary by more than 4 mL). Finally, she can report that dispenser #3 is working well, dispensing cough syrup both accurately (all volumes within 0.1 mL of the target volume) and precisely (volumes differing from each other by no more than 0.2 mL).

## Key Concepts and Summary {section:summary}
Quantities can be defined or measured. Measured quantities have an associated uncertainty that is represented by the number of significant figures in the quantity’s number. The uncertainty of a calculated quantity depends on the uncertainties in the quantities used in the calculation and is reflected in how the value is rounded. Quantities are characterized with regard to accuracy (closeness to a true or accepted value) and precision (variation among replicate measurement results).

## Chemistry End of Chapter Exercises {section:exercises}

:::exercise {fs-idm29064528} type= 
PROBLEM:
Express each of the following numbers in scientific notation with correct significant figures:
(a) 711.0
(b) 0.239
(c) 90743
(d) 134.2
(e) 0.05499
(f) 10000.0
(g) 0.000000738592
:::

:::exercise {fs-idp24074624} type= 
PROBLEM:
Express each of the following numbers in exponential notation with correct significant figures:
(a) 704
(b) 0.03344
(c) 547.9
(d) 22086
(e) 1000.00
(f) 0.0000000651
(g) 0.007157
SOLUTION:
(a) 7.04 $\times$ 10<sup>2</sup>; (b) 3.344 $\times$ 10<sup>−2</sup>; (c) 5.479 $\times$ 10<sup>2</sup>; (d) 2.2086 $\times$ 10<sup>4</sup>; (e) 1.00000 $\times$ 10<sup>3</sup>; (f) 6.51 $\times$ 10<sup>−8</sup>; (g) 7.157 $\times$ 10<sup>−3</sup>
:::

:::exercise {fs-idp26053648} type= 
PROBLEM:
Indicate whether each of the following can be determined exactly or must be measured with some degree of uncertainty:
(a) the number of eggs in a basket
(b) the mass of a dozen eggs
(c) the number of gallons of gasoline necessary to fill an automobile gas tank
(d) the number of cm in 2 m
(e) the mass of a textbook
(f) the time required to drive from San Francisco to Kansas City at an average speed of 53 mi/h
:::

:::exercise {fs-idp30473840} type= 
PROBLEM:
Indicate whether each of the following can be determined exactly or must be measured with some degree of uncertainty:
(a) the number of seconds in an hour
(b) the number of pages in this book
(c) the number of grams in your weight
(d) the number of grams in 3 kilograms
(e) the volume of water you drink in one day
(f) the distance from San Francisco to Kansas City
SOLUTION:
(a) exact; (b) exact; (c) uncertain; (d) exact; (e) uncertain; (f) uncertain
:::

:::exercise {fs-idp191983136} type= 
PROBLEM:
How many significant figures are contained in each of the following measurements?
(a) 38.7 g
(b) 2 $\times$ 10<sup>18</sup> m
(c) 3,486,002 kg
(d) 9.74150 $\times$ 10<sup>−4</sup> J
(e) 0.0613 cm<sup>3</sup>
(f) 17.0 kg
(g) 0.01400 g/mL
:::

:::exercise {fs-idp16088144} type= 
PROBLEM:
How many significant figures are contained in each of the following measurements?
(a) 53 cm
(b) 2.05 $\times$ 10<sup>8</sup> m
(c) 86,002 J
(d) 9.740 $\times$ 10<sup>4</sup> m/s
(e) 10.0613 m<sup>3</sup>
(f) 0.17 g/mL
(g) 0.88400 s
SOLUTION:
(a) two; (b) three; (c) five; (d) four; (e) six; (f) two; (g) five
:::

:::exercise {fs-idp334498416} type= 
PROBLEM:
The following quantities were reported on the labels of commercial products. Determine the number of significant figures in each.
(a) 0.0055 g active ingredients
(b) 12 tablets
(c) 3% hydrogen peroxide
(d) 5.5 ounces
(e) 473 mL
(f) 1.75% bismuth
(g) 0.001% phosphoric acid
(h) 99.80% inert ingredients
:::

:::exercise {fs-idp15391168} type= 
PROBLEM:
Round off each of the following numbers to two significant figures:
(a) 0.436
(b) 9.000
(c) 27.2
(d) 135
(e) 1.497 $\times$ 10<sup>−3</sup>
(f) 0.445
SOLUTION:
(a) 0.44; (b) 9.0; (c) 27; (d) 140; (e) 1.5 $\times$ 10<sup>−3</sup>; (f) 0.44
:::

:::exercise {fs-idp108082000} type= 
PROBLEM:
Round off each of the following numbers to two significant figures:
(a) 517
(b) 86.3
(c) 6.382 $\times$ 10<sup>3</sup>
(d) 5.0008
(e) 22.497
(f) 0.885
:::

:::exercise {fs-idp358584288} type= 
PROBLEM:
Perform the following calculations and report each answer with the correct number of significant figures.
(a) 628 $\times$ 342
(b) (5.63 $\times$ 10<sup>2</sup>) $\times$ (7.4 $\times$ 10<sup>3</sup>)
(c) $\frac{28.0}{13.483}$
(d) 8119 $\times$ 0.000023
(e) 14.98 + 27,340 + 84.7593
(f) 42.7 + 0.259
SOLUTION:
(a) 2.15 $\times$ 10<sup>5</sup>; (b) 4.2 $\times$ 10<sup>6</sup>; (c) 2.08; (d) 0.19; (e) 27,440; (f) 43.0
:::

:::exercise {fs-idp356573616} type= 
PROBLEM:
Perform the following calculations and report each answer with the correct number of significant figures.
(a) 62.8 $\times$ 34
(b) 0.147 + 0.0066 + 0.012
(c) 38 $\times$ 95 $\times$ 1.792
(d) 15 – 0.15 – 0.6155
(e) $8.78\;\times \;(\frac{0.0500}{0.478})$
(f) 140 + 7.68 + 0.014
(g) 28.7 – 0.0483
(h) $\frac{(88.5-87.57)}{45.13}$
:::

:::exercise {fs-idp30946992} type= 
PROBLEM:
Consider the results of the archery contest shown in this figure.
(a) Which archer is most precise?
(b) Which archer is most accurate?
(c) Who is both least precise and least accurate?

> IMAGE {img:fs-idp94481888} src=../../media/CNX_Chem_01_05_Archer2_img.jpg class=scaled-down
> alt: 4 targets are shown each with 4 holes indicating where the arrows hit the targets. Archer W put all 4 arrows closely around the center of the target. Archer X put all 4 arrows in a tight cluster but far to the lower right of the target. Archer Y put all 4 arrows at different corners of the target. All 4 arrows are very far from the center of the target. Archer Z put 2 arrows close to the target and 2 other arrows far outside of the target.

SOLUTION:
(a) Archer X; (b) Archer W; (c) Archer Y
:::

:::exercise {fs-idp33718320} type= 
PROBLEM:
Classify the following sets of measurements as accurate, precise, both, or neither.
(a) Checking for consistency in the weight of chocolate chip cookies: 17.27 g, 13.05 g, 19.46 g, 16.92 g
(b) Testing the volume of a batch of 25-mL pipettes: 27.02 mL, 26.99 mL, 26.97 mL, 27.01 mL
(c) Determining the purity of gold: 99.9999%, 99.9998%, 99.9998%, 99.9999%
:::

## Glossary
- {def} **accuracy**: how closely a measurement aligns with a correct value
- {def} **exact number**: number derived by counting or by definition
- {def} **precision**: how closely a measurement matches the same measurement when repeated
- {def} **rounding**: procedure used to ensure that calculated results properly reflect the uncertainty in the measurements used in the calculation
- {def} **significant digits**: (also, *significant figures*) all of the measured digits in a determination, including the uncertain last digit
- {def} **significant figures**: (also, *significant digits*) all of the measured digits in a determination, including the uncertain last digit
- {def} **uncertainty**: estimate of amount by which measurement differs from true value
