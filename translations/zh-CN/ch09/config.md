# Config: 化学（第2版）, Chapter 9 (translation)

The translation pass of `Chemistry 2e` chapter 9 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch09, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term goes to `glossary-ch09.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` carries the same
entry.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows (`Figure 9.1` to `Figure 9.36`, `Sim`) | kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, ch09/9.4/section.json, ch09/9.5/section.json | figure citations in the prose and in `original_caption` | written 图 N.M, （图 N.M） | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch09/9.1/text.html, ch09/9.3/text.html, ch09/9.6/text.html | table eyebrows `Table 9.1`, `Table 9.2`, `Table 9.3` and their citations | written 表 9.1, 表 9.2, 表 9.3 | the ch01 decision (translate.md 5 lists a table's eyebrow as translated) |
| ch09/9.1/text.html, ch09/9.2/text.html, ch09/9.3/text.html, ch09/9.4/text.html, ch09/9.4/section.json | photo credits (5: Master Sgt. Jeffrey Allen with lettered parts, Mark Goodchild, Mark Ott, National Oceanic and Atmospheric Administration, Paul Flowers) | （来源 a：改编自 Master Sgt. Jeffrey Allen 的作品）, （来源：改编自 Mark Goodchild 的作品）, （来源：改编自 Mark Ott 的作品）, （来源：National Oceanic and Atmospheric Administration） (9.4 section.json) and （来源：改编自 National Oceanic and Atmospheric Administration 的作品） (9.1 Figure 9.7, a modification of work), （来源：改编自 Paul Flowers 的作品）; names kept | the book's credit formula of ch01 (names and organisations as printed) |
| ch09/9.1/text.html, 9.2, 9.3, 9.5, 9.6 (inline math) | an inline `$…$` span that ends in `,` or `.` and runs into a Chinese clause (9.1 #pressure; 9.2 #amontons, #charles; 9.3 Example 9.13, #avogadro-revisited; 9.5 section.json exercise; 9.6 #van-der-waals) | the LaTeX is kept byte for byte, punctuation inside the `$…$` included | the source prints that punctuation inside the math; moving it out would change the LaTeX (translate.md 5), so it stays (review pass, finding 29) |
| ch09/9.1/text.html, 9.2, 9.3, 9.4, 9.6 | first mention of a person in the prose: Torricelli, Amontons, Gay-Lussac, Charles, Boyle, Avogadro, Lavoisier, Lagrange, Marie-Anne Paulze Lavoisier, Susan Solomon, Graham, van der Waals | the standard Chinese rendering with the original once in parentheses at the first mention in the chapter | the ch01 formula for names (约翰·道尔顿（John Dalton）); the later mentions stay Chinese only |

### ch09/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/intro/text.html | `buoyant <span data-concept="force">force</span>` (figure 9.1 caption) | 浮<span data-concept="force">力</span>: the span wraps 力 only, after 浮 | Chinese names "buoyant force" as one word 浮力; the span stays on the concept's word 力 (glossary 力) |
| ch09/intro/text.html | `<span data-concept="gas">gas</span> <span data-concept="temperature">temperature</span>` (3rd paragraph) | 气体温度 written as adjacent spans 气体 and 温度 | Chinese compound of the two concept words, each span kept |
| ch09/intro/text.html | `amount` (3rd paragraph) | written 物质的量 | amount of substance in mol (ch01 decision), the source word carries no span |
| ch09/intro/text.html | `Figure 9.1` in the prose | written 图 9.1 | per-book scenario (translate.md 4.6) |

### ch09/9.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.1/text.html | #blood-pressure, `blood <span gas-pressure>pressure</span>`, `systolic <span>pressure</span>`, `diastolic <span>pressure</span>` (and Figure 9.6 caption) | the span wraps the whole compound 血压, 收缩压, 舒张压 | Chinese names each in one word; the span cannot wrap only the 压 (translate.md 3) |
| ch09/9.1/text.html | #atmosphere, Figure 9.7 caption, `high (H) and low (L) <span>pressure</span>` | written 高压（H）区和<span>低压</span>（L）区, the one span on the whole word 低压 | the meteorological names 高压 and 低压 (glossary rows `high pressure`, `low pressure`); the span cannot wrap only 压 of a bound word, and the span count stays one |
| ch09/9.1/text.html, ch09/9.1/section.json | part lists `(a) torr … (c) kPa`, `(a) torr … (c) bar` (Examples 9.1 and 9.3, exercises 3 and 13), the relation `1 bar = 100,000 Pa` | the unit symbols torr and bar kept inside the concept spans (`torr`, `bar-unit`), beside Pa, atm, kPa | a symbol is printed as in the source; the name 托 / 巴 stays in running prose (review pass) |
| ch09/9.1/section.json | exercises[14] solution, `P<sub>gas</sub> = P<sub>atm</sub> + P<sub>vol liquid</sub>`; ch09/9.3/text.html #dalton, `P<sub>Total</sub>`, `n<sub>Total</sub>` | written P<sub>气体</sub>, P<sub>挥发性液体</sub> (P<sub>atm</sub> kept), P<sub>总</sub>, n<sub>总</sub> | an English word inside a subscript is reader-visible (as `\kMM_{\text{未知}}` in 9.4); atm is a unit symbol (review pass) |
| ch09/9.1/text.html | #pressure, sim-head of Figure 9.2, "lowers it" | the second `pressure` span of "raises the pressure, … lowers it" is not repeated: 则会使其降低 | the source has one span for the two clauses; Chinese needs no second noun |
| ch09/9.1/text.html | #pressure, "7 tons" | written 7 短吨 | the text works it out as 14,000 lb; ch01's short ton (4.4) |
| ch09/9.1/text.html | #pressure, "1.5 ft", "120 lbs", "14.7 pounds", "30 feet" (caption), "10 meters" | written 1.5 英尺, 120 磅, 14.7 磅, 30 英尺, 10 米 | unit without a symbol in prose takes the target name (4.4); lb/in², in², ft in formulas kept |
| ch09/9.1/text.html | #pressure, the three equations | the count nouns in `\text{}` (elephant, foot, feet, skater, blade) written 头象, 只脚, 名运动员, 把冰刀 with their measure words | Chinese counts need a measure word (4.1) |
| ch09/9.1/text.html | #barometer, `ρ (lowercase Greek letter rho)` | written ρ（小写希腊字母 rho）, the letter's English name kept | a sentence about the name of a letter (4.3) |
| ch09/9.1/text.html | #blood-pressure, `Greek <em>sphygmos</em> = “pulse”` | written 希腊语 <em>sphygmos</em> = “脉搏”, the Greek word kept in Latin letters | origin of a word (4.3) |
| ch09/9.1/text.html | #barometer, Figure 9.4 sim-head, "13.6 times as short" | written 汞柱的高度只有水柱的 1/13.6 | "N times as short" is not Chinese; same meaning (4.1) |
| ch09/9.1/text.html | #units, last sentence of the opening paragraph | the source has no final full stop; 。 added | a Chinese sentence needs its closing mark |
| ch09/9.1/text.html, ch09/9.1/section.json | `to the right` in Examples 9.3 and 9.4 | written 如右图所示 | translated for meaning |
| ch09/9.1/figures.js | Figure 9.2, `topline` | `'A load of ' + f + ' lb on a ' + a + ' in² ' + NAME + ' presses with …'` becomes `f + ' lb 的载荷压在 ' + a + ' in² 的' + NAME + '上，压强 …'`, the same slots in the same order | English frame cannot carry the slots (4.1) |
| ch09/9.1/figures.js | Figure 9.4, `topline` | `'An atmospheric pressure of ' + p + ' kPa holds up …'` becomes `p + ' kPa 的大气压强可支撑 …'`, same slots | same |
| ch09/9.1/figures.js | Figure 9.5, `topline`, third branch | `'The mercury stands ' + h + ' mm higher in ' + side + ', so the gas is ' + h + ' torr ' + above/below + ' the atmosphere.'` becomes `'汞在' + side + '中高出 ' + h + ' mm，所以气体比大气' + 高/低 + ' ' + h + ' torr。'`; the two `h` slots swap places | Chinese word order differs; the branch `above/below` kept as 高/低 (4.1) |
| ch09/9.1/figures.js | Figure 9.5, `side` | 'the far arm' / 'the gas arm' written 远端一臂 / 气体一臂 | articles dropped (4.1) |
| ch09/9.1/figures.js | Figure 9.2, detent and hover names | 'thumbnail', 'bare foot', 'skater', 'air', 'ice' written 拇指指甲盖, 光脚, 运动员 / 滑冰运动员, 空气, 冰面 | articles and plural grammar collapse (4.1) |
| ch09/9.1/section.json | exercises e2, e8 solutions (`generated_by: ai`) | translated with the LaTeX macros kept | AI-written solutions are translated like the rest (5) |
| ch09/9.1/section.json | exercises cyl1, e4, e5 `answer.solution` | `0.974 atm; 740 mm Hg; 98.7 kPa; 0.987 bar`, `0.809 atm; 82.0 kPa`, `2.2 $\times$ 10<sup>2</sup> kPa` kept | pure numbers and unit symbols; no word to translate |
| ch09/9.1/text.html | #manometer, `the <span liquid>liquid</span> levels in the two arms` (2 places) | the span wraps 液面 in 管子两臂中液面之间的距离 | Chinese names the liquid level in one word; the span cannot wrap only 液 (translate.md 3.3) |

### ch09/9.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.2/text.html | #amontons, `a <span gas-pressure>pressure</span> gauge`; sim-boyle sim-head, `a <span gas-pressure>pressure</span> gauge` | the span wraps the whole compound 压力计 | Chinese names the instrument in one word (glossary 压力计); the span cannot wrap only 压力 (translate.md 3) |
| ch09/9.2/text.html | #boyle, `room <span temperature>temperature</span>`; #combined-gas-law Example 9.10, `body <span temperature>temperature</span>` | the span wraps the whole compound 室温 and 体温 | same as the book-wide rule for 室温, 体温 (ch01); the span cannot wrap only 温 |
| ch09/9.2/text.html | Example 9.7, `boiling <span liquid>liquid</span> ammonia` (2 places) | the span wraps 液氨 | glossary 液氨 is one word; the span cannot wrap only 液 |
| ch09/9.2/text.html | #amontons, #avogadro, #ideal-gas-law, #combined-gas-law, `number of <span mole>moles</span> of <span gas>gas</span>`, `<span volume>volume</span> and <span mole>moles</span> of gas` | written 气体的物质的量（以摩尔计）, the `mole` span on 摩尔 | the quantity is 物质的量 and the unit 摩尔 (glossary 'number of moles'; chapter.json variable n); the book's 'number of moles' is the amount in mol |
| ch09/9.2/text.html | #stp, `number of molecules (<span mole>moles</span>)` and the Figure 9.18 sim-head `moles they hold` | written （摩尔数）, 所含摩尔数 | here the book counts in the unit itself (a number of moles); the span stays on 摩尔 |
| ch09/9.2/text.html | #diving, `“<span atmosphere-unit>atmospheres</span> absolute” or ATA` | written 绝对<span>大气压</span>, the span on 大气压 only; the earlier `atmospheres` written 标准大气压 | 绝对大气压 is the diving term for ATA and cannot carry 标准; the glossary row 标准大气压 (atm) is kept elsewhere |
| ch09/9.2/text.html | #diving, `33 feet`, Example 9.10 `70 feet`, Example 9.9 `1 gal`, `269 gal` | written 33 英尺, 70 英尺, 1 加仑, 269 加仑 | unit without a symbol in prose takes the target name (4.4); `120 °F`, psi, atm, ATA kept |
| ch09/9.2/text.html | Examples 9.6 and 9.9, `750 <span torr>torr</span>`, `745 <span torr>torr</span>` | the span wraps 托; the symbol torr is kept in the equations and wherever no span names the concept | glossary 托, symbol torr kept in formulas (same as 9.1) |
| ch09/9.2/text.html | #ideal-gas-law, bold `ideal gas constant` | the span wraps 理想气体 inside 理想气体常数 | the source wraps `ideal gas` only |
| ch09/9.2/text.html | #history, `relates gas quantities for gases` | written 把气体的各个量联系起来，适用于各种气体, both `gas` spans kept | the two spans need two nouns; Chinese adds 适用于 to carry the second |
| ch09/9.2/text.html | #ideal-gas-law, sim-gas-box sim-head, `the molecules speed up with the temperature` (span `speed`) | written 分子的速率随温度增大, the span on the noun 速率 | the span names the concept speed; English uses it as a verb |
| ch09/9.2/text.html | Example 9.7, `hydrogen gas thermometer` | written 氢气体温度计, the span on 气体 | 氢气 would put the span on a bound 气 (as in ch01 1.2, fuel cell box) |
| ch09/9.2/text.html | Breathing and Boyle's Law, `get rid of waste <span gas>gas</span>` | written 排出<span>废气</span>（二氧化碳）, the span wraps the whole word 废气 | 废气 is the Chinese word (cf. 燃气, 天然气); the span cannot wrap only 气 of a bound word (review pass) |
| ch09/9.2/text.html | every equation | numbers, unit symbols and `\text{torr}`, `\text{atm}`, `\text{K}` kept; only the connecting words `or`, `which means that`, `constant` written 或, 即, 常数 | translate.md 5: words inside `\text{}` are translated, unit symbols are not |
| ch09/9.2/section.json | exercise e28 prompt | `Mount Crumpit` written Crumpit 山 | a place name with no standard rendering kept in Latin letters (2.7); pending row `mount crumpit` |
| ch09/9.2/section.json | exercises e16, e18, e26 `answer.parts[].part` | `moles`, `grams`, `(a)`, `(b)`, `(c)` kept | the English part keys are kept (translate.md 5); not translated in ch01 either |
| ch09/9.2/section.json | exercise e1, e3, e5, e7, e25, e29 `answer.solution` (`generated_by: ai`) | translated with the LaTeX macros (`\kPone`, `\kTtwo` …) and the units in `\text{}` kept | AI-written solutions are translated like the rest (5) |
| ch09/9.2/section.json | exercise e8, e14 hints | `L atm mol⁻¹ K⁻¹` and `P₁/T₁ = P₂/T₂` kept | symbols |
| ch09/9.2/figures.js | `WORD`, `molName` | `WORD` holds the gas names (氦气, 氢气, 氮气, 氧气, 氨, 甲烷, 二氧化碳, 氩气); the hover name `'a ' + WORD + ' atom, ' + f` / `' molecule, '` becomes `WORD.replace(/气$/, '') + '原子，' / '分子，' + f` (氦原子，He; 氨分子，NH₃) | English "a … atom/molecule" built by concatenation; Chinese names the atom or molecule without 气 (4.1) |
| ch09/9.2/figures.js | `PICTURE`, `OVERPLATE` view presets | `front`, `corner`, `above` written 正视, 斜视, 俯视 | button words, not grammar; listed for the owner |
| ch09/9.2/figures.js | Figure 9.10, `topline` and readout note | `'At t K the gauge reads …; the ratio P/T stays at … for this filling of the sphere.'` becomes `'在 t K 时压力计读数为 …；对于球的这一次充气，比值 P/T 保持为 …。'`, same slots in the same order; `'The molecules move X times as fast as at 298 K.'` becomes `'分子运动的速率是 298 K 时的 X 倍。'` | English frame cannot carry the slots (4.1) |
| ch09/9.2/figures.js | Figure 9.10, strip text | `'about ' + n + ' strikes on the wall each second'` becomes `'每秒约撞击器壁 ' + n + ' 次'`; `'n = x mol of air, N molecules drawn'` becomes `'n = x mol 空气，画出 N 个分子'` | English word order (4.1) |
| ch09/9.2/figures.js | Figures 9.11 and 9.12, `topline`, readout notes and the `P_`/`V_` lines | `'At t1 K the line gives … and at t2 K …; P/T is … at both.'` becomes `'在 t1 K 时直线给出 …，在 t2 K 时给出 …；两处的 P/T 均为 …。'`; "the kelvin temperature is X times as great …, and so is the pressure" becomes "开尔文温度是 … 的 X 倍，压强也是 X 倍", so the factor slot is written twice | English frame cannot carry the slots (4.1) |
| ch09/9.2/figures.js | Figure 9.13 + 9.14, `topline` | `(compressing / expanding) + ' the gas from v1 mL by the factor f has ' + (raised / lowered) + ' the pressure by the same factor'` becomes `'把气体从 v1 mL ' + (压缩 / 膨胀) + '，体积变化的倍数为 f，压强' + (升高 / 降低) + '了相同的倍数'` | "by the factor f" after a verb has no Chinese counterpart; the two branches kept (4.1) |
| ch09/9.2/figures.js | Figure 9.15, `topline` (3 branches), labels | the sentences keep their slots (`$\kV = …$`); `P_{lungs} = 1–3 torr lower / higher` becomes `P_{肺} 低 / 高 1–3 torr`, `P_{lungs} = P_{outside}` becomes `P_{肺} = P_{外界}`; the readout subscript `\text{lungs}` becomes `\text{肺}`; `swelling drawn X×` becomes `膨胀画成 X×` | word order and the shortest subscript form (4.1, 4.7) |
| ch09/9.2/figures.js | sim-gas-box, `LAWS` and the strip line | `LAWS` becomes `['自由', '阿蒙顿: V 和 n 固定', …]` (the ASCII colon the code splits on is kept); `'Under ' + name + '’s law, ' + rest.replace(' held', ' are held') + '.'` becomes `'在' + name + '定律下，' + rest + '。'`; the label of the law choice `law held` is written 所选定律 | English possessive and the `held`/`are held` plural branch (4.1); `free` is the no-law button, written 自由 |
| ch09/9.2/figures.js | sim-gas-box, `topline` | `'A sample of n mol of GAS at T K in V L presses at P atm' + …` becomes `'一份 n mol GAS 的样品，在 T K 下、体积为 V L 时，压强为 P atm' + …` | English frame (4.1) |
| ch09/9.2/figures.js | sim-balloons, `head()` | `'Three balloons of X'` / `'Balloons of X, Y, Z'` + `', n mol each at STP: …, and every balloon holds V L.'` becomes `'三个 X 气球'` / `'X、Y、Z 气球'` + `'，STP 下每个 n mol：…，每个气球都装有 V L。'`; the lists are joined with 、 | English frame and list punctuation (4.1) |
| ch09/9.2/figures.js | sim-balloons, hover names | `'a balloon of ' + WORD + ', n mol'` becomes `'装有' + WORD + '的气球，n mol'` | article dropped, genitive turned (4.1) |

### ch09/9.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.3/text.html | #intro, Example 9.12 solution, Example 9.19 solution and the Dalton, stoichiometry and avogadro-revisited paragraphs: `number of <span mole>moles</span>` (and "moles of hydrogen produced", `number of moles of gas A`) | written 物质的量（以<span>摩尔</span>计）, the `mole` span on 摩尔; the same count of spans as the source | the quantity is 物质的量 and the unit 摩尔 (same as 9.2) |
| ch09/9.3/text.html | #intro, "typically measured in <span mole>moles</span> (n)" | written 通常以<span>摩尔</span>度量（n）, the span on 摩尔 | 摩尔 is the unit; the amount is named just before it |
| ch09/9.3/text.html | #intro, #stoichiometry, "chemical <span stoichiometry>stoichiometry</span>" (also the intro "stoichiometry of pure gases") | the span wraps 化学计量 in "化学<span>计量</span>" only where the source has "Chemical" before it (intro, first sentence), and wraps 化学计量 elsewhere | the glossary row stoichiometry is 化学计量 and already contains 化学; "chemical" is absorbed |
| ch09/9.3/text.html | Example 9.11 and #avogadro-revisited: `nitrogen gas`, `ammonia gas`, `hydrogen gas`, `nitrogen and hydrogen <span gas>gases</span>` | the span wraps the whole compound 氮气, 氨气, 氢气; "nitrogen and hydrogen gases … ammonia gas" written 氮和氢两种<span>气体</span>…<span>氨气</span> | Chinese names each gas in one word; the span cannot wrap only 气 (ch01 天然气); "molecular nitrogen gas" written 分子态氮气 |
| ch09/9.3/text.html | Example 9.17, `<span gas>gas</span> grills` | the span wraps 燃气 in 燃气烤架 | 燃气 is the Chinese word for the fuel gas of a grill; the span cannot wrap only 气 |
| ch09/9.3/text.html | #dalton, #over-water, Examples 9.14 to 9.16, `total <span gas-pressure>pressure</span>` (10 places) | the span wraps the whole 总压 | the glossary row total pressure is 总压; the span cannot wrap only 压 |
| ch09/9.3/text.html | #over-water, `liquid water` (3 places, span `liquid`) | the span wraps 液态 in 液态水 | state of matter as adjective (ch01) |
| ch09/9.3/text.html | Example 9.15, `nitrous <span oxide>oxide</span>` | the span wraps 一氧化二氮 | Chinese names the compound in one word (ch01 氧化汞(II)) |
| ch09/9.3/text.html | Example 9.19, `hydrochloric <span acid>acid</span>` | the span wraps 盐酸 | same (ch01 硫酸) |
| ch09/9.3/text.html | Example 9.18, `an edge <span length>length</span>` | the span wraps 棱长 | ch01 rule for 棱长 |
| ch09/9.3/text.html | Figure 9.19 caption, `room <span temperature>temperature</span>` | the span wraps 室温 | ch01 rule for 室温 |
| ch09/9.3/text.html | Example 9.18, "683 billion cubic feet", "billion ft³", `\text{billion}` in the equation | written 683 十亿立方英尺, 683 十亿 ft³ and `\text{十亿}`; the number 1.02 × 10^3 and the symbol ft kept | the printed digits 683 and 1020 are kept (translate.md 3.4); 6830 亿 and 1.02 万亿 would be the natural Chinese counts but change the printed numbers, so 十亿 is written as a unit word after the digits (the earlier reason, that no counting word gives the number, was wrong); cubic feet named in prose |
| ch09/9.3/text.html | Example 9.18, "1.9 miles" | written 1.9 英里 | unit without a symbol takes the target name (4.4) |
| ch09/9.3/text.html | #over-water, `“dry” <span gas-pressure>gas pressure</span>` | written “干”<span>气体压强</span>, the span on 气体压强 | the source's span wraps "gas pressure" |
| ch09/9.3/text.html | #dalton, "exerts the same pressure that it would exert if … alone" | the second 压强 is written without a span: 所产生的<span>压强</span>，与它单独存在于容器中时所产生的压强相同 | the source has one `gas-pressure` span in the sentence; the Chinese needs the noun twice |
| ch09/9.3/text.html | #dalton, `<span mole>mole</span> fraction` | written <span>摩尔</span>分数; the later "a unit of concentration" subject 摩尔分数 carries no span | the source has the span only on the term in bold |
| ch09/9.3/text.html | Figure 9.20 sim-head, `hydrogen, helium and neon` (refs), `all three` | the refs wrap 氢气, 氦气, 氖气 and 这三种气体 | the ref names the cylinder; the word carried is the gas |
| ch09/9.3/text.html | Example 9.14 (b), "in atmospheres" (span `atmosphere-unit`) | written 以<span>标准大气压</span>计 | the glossary row atmosphere (atm) is 标准大气压 |
| ch09/9.3/text.html | Example 9.19, `the provided mass of the limiting reactant, Ga` | written 所给<span>限量反应物</span> Ga 的<span>质量</span>, Ga inside the `mass` type span | Chinese word order puts the element after 限量反应物 |
| ch09/9.3/text.html | #over-water, `a bottle` / `the bottle` (refs `collection-flask`) | written 一个瓶子 / 瓶子 / 瓶 | the source says bottle where the referent label says flask (收集瓶, one form in the caption, the sim-head, the referent label and the figure); the bare word is kept |
| ch09/9.3/text.html | Example 9.12 solution | "Determine the number of moles of carbon and hydrogen in the 100-g sample" and the following sentences keep all four `mole` spans: 物质的量（以<span>摩尔</span>计）four times | same count of spans as the source |
| ch09/9.3/text.html | Example 9.12: "occupies a volume of 1.00 L at 0.984 atm and 50 °C" | the conditions are written first (在 0.984 atm 和 50 °C 下，1.56 g 环丙烷占有 1.00 L 的体积); all spans kept | Chinese word order |
| ch09/9.3/text.html | #solomon, "(the National Medal of Science and the Grande Medaille, respectively)" | （分别是国家科学奖章和大奖章 Grande Medaille） | the French medal's printed name has no standard Chinese rendering beyond 大奖章 |
| ch09/9.3/text.html | #solomon, `The Coldest March` | kept in Latin letters inside the `<em>` | title of a book with no Chinese edition known |
| ch09/9.3/text.html | Figure 9.24 alt, "C O subscript 2, C H subscript 3, and N subscript 2 O" | kept as the spoken formulas, with 下标 for "subscript" | the alt text reads the formulas aloud, the CH₃ is the book's |
| ch09/9.3/text.html | Figure 9.24 / 9.25 alt, `p p m` | written ppm; "years B C" written 公元前 | the alt spells the letters apart for a screen reader; Chinese reads ppm as is |
| ch09/9.3/text.html | #greenhouse, eyebrow `How Sciences Interconnect` | written 各门科学如何相互联系 (glossary row How Sciences Interrelate) | the book's box label; one word differs |
| ch09/9.3/text.html | Examples 9.17 equation, `\text{1 volume}+\text{5 volumes}…` | written `\text{1 体积}+\text{5 体积}` … | words inside `\text{}` are translated (5) |
| ch09/9.3/figures.js | `WORD`, `molName` | gas names written 氢气, 氦气 … 氟利昂-12; `molName` builds 氢原子，H / 氢分子，H₂ from WORD without its 气, with no article | English "a … atom"/"a molecule of …" built by concatenation (4.1); same as 9.2 |
| ch09/9.3/figures.js | sim-gas-density `topline` | `'At p atm and t K, a liter of ' + WORD + ' has a mass of …'` becomes `'在 p atm、t K 下，1 L ' + WORD + '的质量为 …'` | English frame cannot carry the slots in this order (4.1) |
| ch09/9.3/figures.js | sim-dalton, hover names and bar labels | `'a cylinder of ' + WORD + ' alone'` becomes `'只装' + WORD + '的气瓶'`; `WORD + ' alone, ' + NAME` becomes `WORD + '单独，' + NAME`; `WHO` (['hydrogen', 'helium', 'neon']) kept | `WHO` is only the id passed to `F.ref`; the articles and "alone" take the Chinese form |
| ch09/9.3/figures.js | sim-dalton `topline` | the slots `p[0] kPa of hydrogen …` become `p[0] + ' kPa 的氢气、…'` and "press at" 产生的压强为 | Chinese word order (4.1) |
| ch09/9.3/figures.js | sim-over-water `topline` | `'At t °C the trapped gas is par torr of argon and pw torr of water vapor, PT torr in all.'` becomes `'在 t °C 时，被收集的气体含 par torr 的氩气和 pw torr 的水蒸气，共 PT torr。'` | English frame cannot carry the slots (4.1) |
| ch09/9.3/figures.js | sim-combining-volumes `head` | `part` joins with ' 和 ' and each term is `fmt + ' L ' + f`; the sentence becomes `'在相同的温度和压强下，' + left + ' 反应生成 ' + right + '。'` | Chinese word order puts the condition first (4.1) |
| ch09/9.3/figures.js | `view3d` view labels | 'front', 'above', 'corner' written 正视, 俯视, 斜视 | as in 9.2 |
| ch09/9.3/section.json | e7 prompt, "At 25 degrees C" | written 25 摄氏度 | the source spells the unit out, so the target name is used |
| ch09/9.3/section.json | e17 prompt, "1.000 metric ton (1000 kg)"; e12, e13 "1 ton (1.000 × 10³ kg)" | written 1.000 公吨（1000 kg）and 1 吨（1.000 × 10<sup>3</sup> kg） | the kilogram figure fixes the metric tonne |
| ch09/9.3/section.json | cyl7 answer, `3.34 tanks (2.34 × 10<sup>4</sup> L)` | written 3.34 个气瓶（…） | measure word for the count of tanks (4.1) |
| ch09/9.3/section.json | exercises cyl3, cyl4, cyl5, cyl9, e1, e4, e10, e16, e17, e18 `answer.solution` | kept | pure numbers, unit symbols and formulas; no word to translate |
| ch09/9.3/section.json | derivations `source` | 化学（第2版），9.3 气态物质、混合物与反应的化学计量 | the book's title and section title as in ch01 |

### ch09/9.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.4/text.html | #mean-free-path, "At room temperature" (span `temperature`) | the span wraps the whole compound 室温 | the source wraps one English word; Chinese names it in one word (translate.md 3.3, as in ch01) |
| ch09/9.4/text.html | #mean-free-path, "hundreds of times the diameter of the molecule" (no full stop in the source) | 。 added | a Chinese sentence needs its closing mark, as in 9.1 #units (review pass) |
| ch09/9.4/text.html | #diffusion, "the amount of surface area available" (span `area`) | the span wraps the whole compound 表面积 | the source wraps one English word of "surface area"; Chinese names it in one word (ch01 precedent) |
| ch09/9.4/text.html | #uranium, "fissile" and "nuclear fission chain reaction" (spans `fissile-material`, `nuclear-fission`, `chain-reaction`) | the `fissile-material` span wraps 易裂变的 (adjective with its 的); 核<span>裂变</span> wraps 裂变 only, as ch02/2.3 | the quoted adjective is one Chinese phrase; 核裂变 follows the ch02 precedent |
| ch09/9.4/text.html | #diffusion, "both bulbs", "the bulbs" and sim-head (referent spans) | "the bulbs" written 两个玻璃泡; "the lighter/heavier gas" 较轻/较重的气体; the span order of "It takes 243 s for 4.46 × 10⁻⁵ mol Xe" (Example 9.21) and "Hydrogen effuses…" follows the Chinese word order | Chinese word order differs; every span stays in its block |
| ch09/9.4/text.html | #diffusion, "no net transfer of molecules occurs" | written （分子没有<em>净</em>转移） | Chinese word order; the `<em>` stays on 净 |
| ch09/9.4/text.html | #graham, "a mixture of gases" (spans `mixture`, `gas`) | written 气体混合物, the `gas` span before the `mixture` span | Chinese puts the modifier first; both spans stay in the block |
| ch09/9.4/text.html | #graham-calc, Example 9.22 formula `{\text{rate of effusion of CO}}_{2}` | written `{\text{CO}}_{2}\text{ 的泻流速率}` | the English phrase ends in the formula with its subscript; Chinese puts the formula before 的泻流速率, so the `\text{}` is split around the subscript |
| ch09/9.4/text.html | #graham, #graham-calc, display formulas "rate of effusion of A/Xe/…" | `\text{A 的泻流速率}`, `\text{Xe 所用时间}`, `\text{转移的 Xe 的物质的量}` | "X of Y" phrases reorder to Y 的 X; the words inside `\text{}` only |
| ch09/9.4/text.html | #diffusion, rate-of-diffusion formula "amount of gas passing through an area" | written 通过某一面积的气体的物质的量 | the glossary row 'amount of gas' is 气体的物质的量 (the amount in mol); the source's generic "amount" is read as the amount in mol, as in Example 9.21 (mol) |
| ch09/9.4/text.html, ch09/9.4/section.json | #uranium, "molecular weights" (the broken sentence "The small difference in molecular weights … only about 0.4% enrichment, is achieved in one diffuser") and the caption of Figure 9.30 with its missing period | the broken grammar is kept as printed: 相对分子质量的微小差异，仅约 0.4% 的浓缩，在一个扩散器中实现; the caption runs "…部分分离 UF6 必须通过…" with no sentence stop | the book's errors stay (translate.md 3.2) |
| ch09/9.4/text.html | #mean-free-path, last sentence | no final full stop, as printed | the source paragraph ends without a period |
| ch09/9.4/text.html | #graham, Figure 9.29 caption "(blue).The right-side photograph" | the missing space of the source is not carried; the two sentences are separated by 。 | a missing space after a period has no Chinese equivalent |
| ch09/9.4/text.html | #uranium, "Check Your Learning" and the eyebrow "How Sciences Interconnect" | 学习检测 and 各门科学如何相互联系 | the shared glossary and the ch01 precedent |
| ch09/9.4/section.json | exercise e1 solution "4.2 hours"; e4 and e5 solutions | "hours" written 小时 (the answer value and the unit field untouched); the formula list F₂, Ne, … written with 、 | unit without a symbol in the answer takes the target name (4.4); full-width punctuation in prose |
| ch09/9.4/section.json | exercise cyl3 solution `162 g/mol`, cyl1 `52 mL/s`, cyl2 `32 h`, e5 `1.4; 1.2`, e6 `51.7 cm` | kept as printed | numbers and unit symbols only (parity tool lists cyl3 as untranslated) |
| ch09/9.4/figures.js | `molName` | `'an atom of ' + word + ', ' + f` / `'a molecule of ' + word + ', ' + f` become `word + '原子，' + f` / `word + '分子，' + f` (氖原子，Ne; 氢分子，H₂) | English "a/an … of …" built by concatenation (4.1), as in ch01/1.2 |
| ch09/9.4/figures.js | `topline`, the two counts "So far N molecule(s) of …" | `(crossedA === 1 ? ' molecule of ' : ' molecules of ')` removed; sentences written `'到目前为止，已有 ' + crossedA + ' 个 ' + a + ' 分子…'` | English plural branch in figure code (4.1) |
| ch09/9.4/figures.js | readouts of sim-bulbs and sim-diffuser | `\text{rate of effusion of }${TEXF[a]}` becomes `${TEXF[a]}\text{ 的泻流速率}`, and `\text{rate of diffusion of }{}^{235}\text{UF}_6` becomes `{}^{235}\text{UF}_6\text{ 的扩散速率}` | Chinese puts the formula before 的…速率; the TeX around the `\text{}` is kept |
| ch09/9.4/figures.js | `text(ctx, 'molecules drawn: …')`, hover names, `'higher speed ²³⁵UF_{6} diffuses …'` | written in Chinese word order with the same slots (所画分子数：每种气体 ' + N + ' 个；…) | English sentence frame (4.1) |
| ch09/9.4/figures.js | `F.view3d` views `front`, `above` | 正面, 上方 | as in ch01 |
| ch09/9.4/text.html | Example of effusion (Graham's law), the subscript `\kMM_{Unknown}` and `\text{rate of effusion of Unknown}` (3 places) | written `\kMM_{\text{未知}}`; the `\text{}` words translated | a word inside a subscript is reader-visible; the macro and the rest of the formula are unchanged |

### ch09/9.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.5/text.html | #postulates, "the gas laws"; "gas laws" elsewhere (spans `gas`, `scientific-law`) | 气体定律 written <span gas>气体</span><span scientific-law>定律</span>, as in the source order | the glossary row 气体定律 is two concept words in the source; the spans stay in their block |
| ch09/9.5/text.html | #postulates, postulate 1, "Gases are composed of molecules … travelling in straight lines" | the second "molecules" (as subject of "travelling") is dropped: 气体由连续运动的分子组成，沿直线运动 | Chinese has no repeated subject; the three `molecule` spans of the block are kept on 分子 (the third is "other molecules") |
| ch09/9.5/text.html | #postulates, postulate 4, "attractive or repulsive forces" (span `force`) | written 吸引或排斥的<span>力</span> | Chinese puts 力 once after the pair |
| ch09/9.5/text.html | #kmt-part-1, Amontons bullet, "the increased speed of the gas molecules" | `speed` span wraps 速率 in 气体分子速率的增大 | word order |
| ch09/9.5/text.html | #kmt-part-1, Charles bullet, "collision forces" (span `force`) | the span wraps 力 in 碰撞力 | the source wraps one English word; Chinese names it in one compound (ch01 precedent) |
| ch09/9.5/text.html | #kmt-part-1, Dalton bullet, "the (partial) pressures" | written （分）压强; the `gas-pressure` span wraps 压强 | the glossary row partial pressure is 分压; the parenthesis of the source is kept |
| ch09/9.5/text.html | #kmt-part-1, Boyle bullet, "the gas volume of a given amount of gas at a given temperature" | written 一定量的气体在一定温度下的气体体积 with the `gas` and `volume` spans on 气体 and 体积 as in the source | Chinese keeps both words of the source's "gas volume" |
| ch09/9.5/text.html | #kmt-part-1 sim-head, #speeds sim-head (Figure 9.31, Sim) | "the changed sample" written 变化后的样品; "two cylinders of nitrogen" 两个盛有氮气的气缸; "the baseline" 基准气缸; "amount of gas" 气体的物质的量; the `data-ref`/`data-type` spans wrap the same words | word order and glossary rows (气体的物质的量, 气缸 pending) |
| ch09/9.5/text.html | #speeds, "the root mean square speed of a particle, u_rms" (strong spans) | `<strong><span>方均根速率</span></strong><strong><em>u</em><sub>rms</sub></strong>` with the comma of the source dropped | Chinese needs no apposition comma between the two names |
| ch09/9.5/text.html | #speeds, "The kinetic energy (KE) of a particle of mass (m) and speed (u) is given by" | written 动能（KE）由粒子的质量（m）和速率（u）按下式给出 | the English "particle of mass (m) and speed (u)" cannot keep its order with the three spans (`kinetic-energy`, `mass`, `speed`) in Chinese |
| ch09/9.5/text.html | #speeds, "the gas constant" (span `gas`) | written 理想<span>气体</span>常数 | the glossary row gas constant is 理想气体常数; the span wraps 气体 of the compound (ch01 precedent) |
| ch09/9.5/text.html | #speeds, "for nitrogen gas in Figure 9.33" (span `gas`) | written <span>气体</span>氮的这种行为 | 氮气 would put the span on a bound 气 (as in ch01/1.2) |
| ch09/9.5/text.html | #speeds, Example 9.23 first paragraph "Calculate the root-mean-square speed for a nitrogen molecule at 30 °C" | the temperature in a parenthesis after the object: 计算氮分子的方均根速率（30 °C 时）; both `data-type` spans kept | Chinese word order |
| ch09/9.5/text.html | #speeds, `$$\text{effusion rate}\;\propto\;\kurms$$` (#kmt-part-2) | the words in `\text{}` written `\text{泻流速率}` | words in `\text{}` are translated (translate.md 5) |
| ch09/9.5/text.html | #kmt-part-2, "diffuse at relatively fast rates" | written 以相对较快的速率扩散; the sentence "According to Graham’s law, …" kept as printed (the book's error, footnote c-grahams-law) | the book's error stays (translate.md 3.2) |
| ch09/9.5/text.html, ch09/9.5/section.json | `data-original-caption`, figure `original_caption` | "(Figure 9.32) … (Figure 9.33) … (Figure 9.34) molecular speed …" written （图 9.32）…（图 9.33）…（图 9.34）分子速率…; νp, urms, N2 kept as printed | citations of a figure are written 图 N.M (translate.md 4.6) |
| ch09/9.5/text.html | h4 "Check Your Learning", "Solution"; Example 9.23 heading | 学习检测, 解, 例 9.23 · u_rms 的计算 | the shared glossary rows Check Your Learning, Solution, Example |
| ch09/9.5/figures.js | `molName` | `'an atom of ' + word + ', ' + f` / `'a molecule of ' + word + ', ' + f` become `word + '原子，' + f` / `word + '分子，' + f` (氦原子，He; 氧分子，O₂); `MOLS[].word` is the element name 氧, 氮, 氦, 氖, 氩, 氙 | English "a/an … of …" built by concatenation (4.1), as in ch09/9.4 |
| ch09/9.5/figures.js | sim-speeds headline `'For ' + word + ' at ' + T + ' K the most probable speed is … and the root mean square speed is …'` | rewritten `'在 ' + T + ' K 时，' + word + '气的最概然速率为 … m/s，方均根速率为 … m/s。'`; the slot order T before gas changes | the English sentence frame cannot carry the slots in the same order (4.1); `word + '气'` makes 氧气, 氮气, 氦气, 氖气, 氩气, 氙气 |
| ch09/9.5/figures.js | sim-gasbox headline `total + ' speeds of ' + word + ' at ' + T + ' K counted so far; …'` | rewritten `'在 ' + T + ' K 时，已统计 ' + total + ' 个' + word + '气分子的速率；其方均根值为 … m/s，而 √(3RT/ℳ) 给出 … m/s。'` | same as above; the slot order T, total, gas changes |
| ch09/9.5/figures.js | sim-speeds legend `g + ' at ' + c.name` and `c.name + ' at ' + T + ' K'` | written `g + '，' + c.name` and `c.name + '，' + T + ' K'` (O₂，100 K; Xe，300 K) | "X at T" has no one Chinese preposition that fits a legend line; the full-width comma is the plain form |
| ch09/9.5/figures.js | sim-kmt labels `'heated'`, `'volume decreased'`, `'increased gas'`, `'baseline'` and the bench/gas/piston hover names | 加热后, 体积减小后, 气体增加后, 基准; 工作台, 气体，1.00 L, 活塞 | English participles and article phrases collapse to one Chinese form (4.1) |
| ch09/9.5/figures.js | sim-kmt law options, `view3d` view labels | 阿蒙顿定律, 玻意耳定律, 阿伏加德罗定律; `front`, `above`, `corner` written 正面, 上方, 斜角 | the glossary targets; 正面 and 上方 as in other chapters |
| ch09/9.5/figures.js | readout `\text{for every gas}` (sim-speeds) | `\text{对每种气体都相同}` | the words of `\text{}` are translated (translate.md 5) |
| ch09/9.5/section.json | notes: the image label “Charles’s Law” on panel (a) of Figure 9.31 | kept in English inside quotes, as the notes name the label printed on the source image | the label belongs to the source image (translate.md 4.3) |
| ch09/9.5/section.json | exercise e6 (f) "the weight of the balloon and its rigging is 500 pounds", "384 lb"; "60 feet", "1.1 × 10⁵ ft³", "40.0 gallons" | written 500 磅, 384 磅, 60 英尺, 40.0 加仑; the symbols ft³, °F, `g L<sup>−1</sup>` kept as printed | units with no SI equivalent take the Chinese name in prose, the symbol is kept in formulas (4.4, ch01 precedent); 重量 for the balloon's weight (glossary weight) |
| ch09/9.5/section.json | exercises e6 solution, e3/e7 solutions | (a) equal; (b) less than written 相等；小于; the numbers and unit symbols (29.48 g mol⁻¹ …) as printed | numbers and units kept (translate.md 3.4) |
| ch09/9.5/section.json | exercises cyl1 and e7 solutions with numbers only, e.g. `441 m/s` | kept as printed | numbers and unit symbols only (parity tool may list them) |
| ch09/9.5/section.json | derivations `source` | `Chemistry 2e, 9.5 The Kinetic-Molecular Theory` written 化学（第2版），9.5 分子运动论 | the book's title and section title are translated (as 9.3) |

### ch09/9.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.6/text.html | `<span data-concept="force">attractive forces</span>` and "the force of attraction" (causes, van-der-waals, Figure 9.36 sim-head) | the span wraps the whole compound 吸引力; a lone "the force" / "this force" / "force of collisions" keeps the span on 力 | Chinese names the attractive force in one word 吸引力 that contains the concept's word 力 (translate.md 3.3, span stays in its block) |
| ch09/9.6/text.html | causes, "lower KE relative to the attractive forces" | written 动能较低; the abbreviation KE is not kept | a sentence unit about English letters; 动能 carries the meaning (4.3) |
| ch09/9.6/text.html | compressibility, "plots of Z over a large pressure range" and the displayed formula `\text{molar volume of gas at same}\;\kT\;\text{and}\;\kP` | `\text{相同}\;\kT\;\text{和}\;\kP\;\text{下气体的摩尔体积}`; the prose "at the same temperature and pressure" keeps both spans (温度, 压强) | Chinese word order puts the condition before 下 and the noun after it; the `\text` pieces split around the macros |
| ch09/9.6/text.html | Example 9.24, "(a) from the ideal gas law" | written （a）由理想气体状态方程求得 | verb needed in Chinese to close the phrase; the source's bare "from" |
| ch09/9.6/text.html | compressibility, "reaction stoichiometry" (span `stoichiometry`) | written 反应的<span>化学计量</span>, the span wraps 化学计量 (shard row `gas stoichiometry` and the ch17 row `stoichiometry`) | 化学计量学 is the discipline; the stoichiometry of a reaction is 化学计量 (review pass) |
| ch09/9.6/section.json | objectives, `Define compressibility (Z)`; text.html #van-der-waals, `compressibility curves` | written 压缩因子（Z）and 压缩因子曲线 | the quantity Z is the compressibility factor (压缩因子, 化学名词); the book's shorter name is expanded by the Chinese term |
| ch09/9.6/figures.js | sim-real-boxes, `name` | `(q.atoms.length === 1 ? 'an atom of ' : 'a molecule of ') + q.word + ', ' + q.f` becomes `'一个' + q.word + (q.atoms.length === 1 ? '原子' : '分子') + '，' + q.f`; `q.word` is 氦, 氮, 氧, 二氧化碳 (no articles) | English article and "of" phrase built by concatenation (4.1); the noun comes after the substance in Chinese |
| ch09/9.6/figures.js | sim-real-boxes, the two `topline` sentences | the `less`/`more` branches kept as 低/高 and 小/大 and the numbers in the same slots, in Chinese word order (`比理想气体低 x atm`) | English comparative frame cannot carry the slots in order |
| ch09/9.6/figures.js | sim-real-boxes, `'an ideal particle standing for ' + name` | `'一个理想粒子，代表' + name` | English article dropped, same structure |
| ch09/9.6/figures.js | sim-real-boxes, view3d `views` labels | `front`/`corner` written 正面/斜视 | UI label, translated for meaning |
