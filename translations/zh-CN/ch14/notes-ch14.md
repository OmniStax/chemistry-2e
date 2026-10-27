# Translation notes: 化学（第2版）, Chapter 14

Owner-visible notes of the chapter 14 pass: every forced scenario (the same rows as `config.md`,
`docs/prompts/translate.md` item 4) and the doubtful choices of the pages. The shared
`translation-notes.md` is not edited by the chapter agents; fold this file into it.

## Forced scenarios

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); same as ch01 |
| ch14/14.2/text.html, ch14/14.7/text.html | table eyebrows `Table 14.1`, `Table 14.2` | written 表 14.1 and 表 14.2 | translate.md 5 lists a table's eyebrow as translated; same as ch01 |
| ch14/intro, 14.2, 14.3, 14.6/text.html | photo credits (9 in the text.html files) | （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：…；b：…）; names kept as printed ("HomeSpot HQ"/Flickr, John Tann, Mark Ott …) | the chapter-1 credit formula |
| every text.html, section.json | `data-concept` spans on Chinese compounds, adjectives and ion names | the span wraps the Chinese word that carries the concept: the whole compound for `acid` / `hydroxide` / `nitrate` (硝酸, 氢氧化钾, 硝酸铝, 碳酸 …), 氢氧根 beside 离子 for `hydroxide` + `ion` (the concept row 氢氧化物 is the compound class, the ion is 氢氧根离子), 碳酸根 for `carbonate`, 酸性 / 碱性 / 中性 (with or without 的) for `acidic-solution` / `basic-solution` / `neutral-solution`, 缓冲 beside 溶液 for `buffer-composition`, 极性 for `bond-polarity`, 大气 for `earth-atmosphere`, 酸碱反应 for `bronsted-lowry-acids-bases`, 体温 for `temperature`, 液态 for `liquid`, 计 for `meter` | Chinese names each in one word and the English concept word is only a part of it, or the book's concept term is longer than the word the source wraps (shorter or compound wraps, as ch01 天然气, 室温); found in the chapter sweep |
| every text.html, section.json | concentration modifiers written with a hyphen in the source (`0.125-M solution`, `0.0125-<em>M</em>`, `0.10-M NaOH`, also in `data-original-caption`) | written 0.125 <em>M</em> 的…溶液 (hyphen dropped, `M` kept as a separate word) | the English compound-modifier hyphen has no Chinese counterpart (as ch01/1.6); one form on every page (review pass) |
| ch14/14.3/text.html | `<span data-concept="ph">PH</span><sub>3</sub>` in "SiH4 < PH3 < H2S < HCl" | kept as printed: the `ph` span stays on `PH` of PH₃ | the book's mis-tagged span in a formula; the formula stays byte for byte (translate.md 5), not a pH concept |

### ch14/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/intro/text.html | `<span data-concept="liquid">Liquid</span> water` | span wraps 液态 (of 液态水) | Chinese says 液态水 for liquid water; the concept word 液体 would read as a noun (translate.md 3.3) |
| ch14/intro/text.html | `<span data-concept="system">systems</span>`, `<span data-concept="chemical-equilibrium">equilibrium</span>` | wrap 体系 and 平衡 (English plural collapses) | concept names `system` and `chemical-equilibrium` are still English in book.json; 体系 and 平衡 follow the glossary compounds 缓冲体系, 酸碱平衡 |
| ch14/intro/text.html | `H+` in the paragraph | kept as printed, written H+ without superscript | the book prints it so (recorded in section.json notes) |

### ch14/14.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.1/text.html | #definitions, "alkali (<span base>base</span>) <span mixtures>solutions</span>" | written 与碱溶液接触后, the span on 碱, the parenthetical gloss "(base)" not written | alkali and base are both 碱 in the glossary, so the gloss would read 碱（碱）(translate.md 4.5) |
| ch14/14.1/text.html | #definitions, "The significance of hydrogen was reemphasized in 1884 when Arrhenius defined …" | written 1884 年，当…将酸定义为…时，氢的重要性再次得到强调 | the Chinese order puts the clause with 当…时 before the main clause; the two ideas stay in one sentence |
| ch14/14.1/text.html, ch14/14.1/section.json | `hydroxide` spans in "hydroxide ion", "hydroxide anions", "hydroxide" (conjugate-pairs, ionization, autoionization, Examples 14.1 and 14.2) | the span wraps 氢氧根, and the neighbouring `ion` / `anion` span wraps 离子 / 阴离子 (氢氧根离子, 氢氧根阴离子) | the concept row is 氢氧化物 (the compound class) but Chinese names the ion 氢氧根; the span cannot wrap only "hydroxide" as a word (3) |
| ch14/14.1/text.html | #conjugate-pairs, "conjugate pairs" in `<em><span conjugate-acid-base-pairs>` | written 共轭酸碱对 | the concept name and glossary row; 共轭对 alone is not the chemistry term |
| ch14/14.1/text.html | #autoionization, "an amphiprotic substance" (span `amphiprotic-species`) | the span wraps 质子两性 and the noun 物质 stays outside | the glossary row is the adjective 质子两性的 / the noun 质子两性物种; the book says "substance" here, so the span wraps the adjective part only (3) |
| ch14/14.1/text.html | #autoionization, "Liquid water undergoes autoionization" (spans `liquid`, `water-autoionization`) | written 液态水的自电离, `液态` on liquid and `水的自电离` on the concept | state of matter takes 态 (as in ch01 1.2); the concept row is 水的自电离 (see ch01 liquid/solid spans) |
| ch14/14.1/text.html | #autoionization, "approximately two out of every billion" | written 每十亿个水分子中约有两个 | Chinese counts a billion as 十亿; number unchanged (4.4) |
| ch14/14.1/text.html | Example 14.2, "from the stress of increased hydronium ion concentration" | written 水合氢离子浓度增大这一扰动 | Chinese equilibrium shifts are caused by 扰动, not 压力; same meaning |
| ch14/14.1/text.html, ch14/14.1/section.json | "hydronium ion", "hydroxide ion", "ammonium ion" … with `ion` span | span wraps 离子 only, preceded by 水合氢 / 氢氧根 / 铵根 / 氟 / 吡啶鎓 | Chinese names the ion in one word; the span stays in its block |
| ch14/14.1/text.html | Example 14.1 and 14.2, h4 "Solution" and "Check Your Learning" | 解 and 学习检测, the ch01 forms | same as ch01 |
| ch14/14.1/text.html, ch14/14.1/section.json | `\text{at}` in the Kw display (summary_html) | `\text{at}\;25\;{}^{\circ}\text{C}` becomes `\text{（在}\;25\;{}^{\circ}\text{C}\text{时）}` | the English preposition precedes the value, Chinese brackets it with 在 … 时 (4.1); TeX outside \text{} unchanged |
| ch14/14.1/section.json | e9, e10 solutions, labels `BA`, `CB`, `BB`, `CA` | the letters kept; the key sentence written 标记为：布朗斯特–劳里酸 = BA；其共轭碱 = CB；… | abbreviations of the English names, printed after the formulas (4.3) |
| ch14/14.1/section.json | e9 solution (e) "OH⁻(CB and CA)" | written OH⁻(CB 和 CA) | the English "and" inside the label |
| ch14/14.1/figures.js | fig-water-ammonia, hover names `` `${NAME[s]} of the ${who}` `` (2d `hits` and 3d `pickable`) | become `` `${who}中的${NAME[s]}` `` (水分子中的氧原子); `MOL[*].name` and `NAME` carry the nouns without articles | English genitive "X of the Y" (4.1) |
| ch14/14.1/figures.js | fig-water-ammonia, `ROLE` and `STEP` labels `H_{2}O (acid)`, `Remove H⁺`, `Add H⁺` | written `H_{2}O（酸）`, `移去 H⁺`, `加上 H⁺` | full-width brackets in Chinese text; the verbs 移去 / 加上 name the step |
| ch14/14.1/figures.js | sim-kw, `headline` "there is N times as much hydronium ion as hydroxide ion" | written 水合氢离子是氢氧根离子的 N 倍 (both branches) | English "times as much … as" has the Chinese form …是…的 N 倍; the slots keep their branch (4.1) |

### ch14/14.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.2/text.html | `hydroxide` spans in "hydroxide ions" and "hydroxide" (acidic-basic, p-functions, neutral-ph); `ion` spans after hydronium | the `hydroxide` span wraps 氢氧根 and the neighbouring `ion` span wraps 离子; "hydronium ion" has the `ion` span on 离子 only, preceded by unspanned 水合氢 (a "hydronium and hydroxide ions" pair keeps one `ion` span) | the concept row is 氢氧化物 (the compound class) but Chinese names the ion in one word; same as 14.1 |
| ch14/14.2/text.html | "potassium hydroxide" (Example 14.6, two spans `hydroxide`); "carbonic acid", "sulfuric acid", "nitric acid", "Acid rain" (`acid` spans) | the span wraps the whole compound word 氢氧化钾, 碳酸, 硫酸, 硝酸, 酸雨 (and 酸 in 酸损害) | Chinese names each compound in one word; the span stays in its block (as 1.2/1.3 ch01) |
| ch14/14.2/text.html | `meter` span in "pH meter" | the span wraps 计 only: `pH` `<span>计</span>` | the concept meter is the unit 米; here the instrument suffix 计 is the nearest word |
| ch14/14.2/text.html | acidic-basic, "A solution is neutral if … acidic if … basic if …" | the adjectives carry the spans as 中性的, 酸性的, 碱性的; the sentence is reordered as 溶液如果含有…，就是中性的 | Chinese conditional order; the three strong and span wraps stay |
| ch14/14.2/text.html | neutral-ph, "acidic solutions are those with … molarities" | written 酸性溶液是指…的溶液, the plural "those" becomes 溶液 | English pronoun "those" |
| ch14/14.2/text.html | neutral-ph, "references to pH values" | written 提到 pH 时均默认指 25 °C 时的 pH | "values" collapses; English plural has no Chinese form (4.1) |
| ch14/14.2/text.html | Example 14.4, "What is the pH of stomach acid, a solution of HCl …" | written 胃酸是 HCl 的溶液，其…浓度为…，胃酸的 pH 是多少？ with the span `ph` on 胃酸的 pH | the apposition "stomach acid, a solution of …" precedes the question in Chinese; sentence kept as one |
| ch14/14.2/text.html | Example 14.5 display `\text{antilog of }-7.3` | written `-7.3\text{ 的反对数}` (and `\text{or}` → `\text{或}`) | Chinese puts the operand before 的反对数; TeX outside \text{} unchanged |
| ch14/14.2/text.html, ch14/14.2/section.json | Figure 14.3 caption "It also is corrodes statues" | written 它还会腐蚀…雕像; the typo of the source cannot be reproduced in Chinese; section.json `notes` keeps the English quotation | a grammatical slip in English only (root item 13); no Chinese equivalent |
| ch14/14.2/text.html | credits "modification of work by" | （来源 a：改编自 X 的作品；b：改编自“Eden, Janine and Jim”/Flickr 的作品）, （来源 b：…）, （来源：…） | chapter-1 formula |
| ch14/14.2/text.html | alt of Figure 14.3 "revolutionary war era"; alt of Figure 14.5 "subscript" and the spaced letters `H C l`, `p H` | 美国独立战争时期; 下标; the spaced letters kept as printed | cultural reference translated for meaning (4.4): 革命战争 would read as China's; the alt's letter-by-letter spelling is kept |
| ch14/14.2/text.html, ch14/14.2/section.json | "autoionization constant" (span), "ion product of water" (span), exercise e17 "ionization constant for water" | written 自电离常数, 水的离子积常数, 水的离子积常数 | the book names K_w three ways; the glossary has 水的离子积常数, and 水的电离常数 is a different quantity in Chinese |
| ch14/14.2/section.json | derivation `pkw` node 2, `\text{at}\ 25\ {}^{\circ}\text{C}` | becomes `\text{（在}\ 25\ {}^{\circ}\text{C}\text{时）}` | the English preposition precedes the value; Chinese brackets it with 在 … 时 (4.1), as in 14.1 |
| ch14/14.2/section.json | e19 solution "(a) …; (b) …" | labels written （a）…（d） and the semicolons ； | prose punctuation (3.5) |
| ch14/14.2/figures.js | sim-ph-scale `kind` ('neutral' / 'acidic' / 'basic') and `rel` branch tests | the code values become 中性 / 酸性 / 碱性 (the labels of Table 14.1), the topline reads 呈${kind}, and the `rel` comparisons follow them (kind === '中性' …) | the string is both the reader-visible word and the lookup in `rel`; logic unchanged |
| ch14/14.2/figures.js | sim-ph-scale hover name `${name}: pH about ${pv} at 25 °C` | written `${name}：25 °C 时 pH 约为 ${pv}` | Chinese word order |
| ch14/14.2/figures.js | topline `At ${T} °C, pH ${p} is ${kind}: … ${rel} …` | written `在 ${T} °C 时，pH ${p} 是${kind}：… ${rel} …。` with rel 等于 / 大于 / 小于 | Chinese word order; the slots keep their branches |

### ch14/14.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.3/text.html | spans on named acids and hydroxides: `acid` on 硝酸, 高氯酸, 亚硝酸, 乙酸, 甲酸, 硫酸, 亚硫酸 (source "nitric <span>acid</span>" etc.), `hydroxide` on 氢氧化铝, 氢氧化钙, 氢氧化钾 | the span wraps the whole Chinese compound that contains the concept's word, as in ch01 (天然气) | the source wraps one English word of "nitric acid", "aluminum hydroxide"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.3/text.html | `hydroxide` span in "hydroxide ion" (lines of the conjugate and structure sections, Example 14.13) | the span wraps 氢氧根, the ion's word, beside `ion` on 离子; the concept's name is 氢氧化物 | the source wraps "hydroxide" of "hydroxide ion"; Chinese names the ion 氢氧根离子 (glossary), not 氢氧化物 |
| ch14/14.3/text.html | `base` spans on "bases" after "weak acids and" / "strong acids and" (first paragraph) | the span wraps 弱碱 and 强碱 | the source wraps "bases" alone; Chinese forms 弱碱 and 强碱 as one word, each containing the concept's word 碱 |
| ch14/14.3/text.html | "wheres" (conjugate section, "wheres those above hydronium ion") and "much lesser than" (Example 14.12) | written 而 and 远小于; section.json `notes` keeps the two English quotations as the note's subject | misspellings of English words cannot be carried into Chinese (translate.md 4.3); the note no longer holds for the Chinese text of these two places |
| ch14/14.3/text.html | percent ionization formulas: `\text{\% ionization}` (two displays) | written `\text{电离百分数}` | 电离百分数 (glossary) is the whole term for "percent ionization"; "% ionization" has no word-for-word Chinese form |
| ch14/14.3/text.html | Example 14.12, `(1.8\%\;\text{of 0.534})` | written `(1.8\%\;\text{，占 0.534 的比例})` | English "1.8% of 0.534" puts the base after the percent; the math stays in its order and the Chinese text carries the relation |
| ch14/14.3/text.html | Example 14.12 sentence "permits the simplifying assumption that x will be much lesser than 0.534" | rendered 远小于 | see "much lesser than" above |
| ch14/14.3/text.html | sentence with the soluble ion `[Al(H2O)2(OH)4]⁻` in the aluminum hydroxide paragraph | "by reaction with hydroxide ion" moved before the formula (通过与氢氧根离子反应，转化为可溶离子 …：) | the math run ends with its comma and the sentence needs the verb phrase before the object in Chinese |
| ch14/14.3/figures.js | sim-acid-water, topline (`one`, `who`, the plural branches `'has' : 'have'`, `'their protons' : 'its proton'`) | the line is rewritten in Chinese word order with the same slots: `在 ${cs} M 的${A.name}溶液中，${who}已把质子转移给水，pH 为 ${ph}。`; `who` is `每个${A.unit}都`, `每 100 个${A.unit}中不到 1 个` or `每 100 个${A.unit}中有 ${s.n} 个`; the `one = A.unit.slice(0, -1)` singular is dropped and the `unit` words are 分子 / 离子 | English plural, singular and agreement branches (4.1) and an English sentence frame that cannot carry the slots in order |
| ch14/14.3/figures.js | sim-acid-water, hover names `an`/`bn` (`'a molecule of hydrogen chloride, HCl'`, `'a chloride ion, Cl⁻'` …) | become `氯化氢分子，HCl`, `氯离子，Cl⁻` …; the articles `a`/`an` are dropped | English article grammar collapses to one Chinese form (4.1), as in ch01 |
| ch14/14.3/figures.js | sim-conjugate-ladder, `cap = (s) => s[0].toUpperCase() + s.slice(1)` used in `headline` | `cap` is the identity function | English sentence-initial capital (4.1); the call sites stay |
| ch14/14.3/figures.js | sim-conjugate-ladder, `headline` sentences and `ka`/`kb` hover words (`'a strong acid'`, `'not an acid in water'` …) | written in Chinese word order, e.g. `${p.an}是强酸，其共轭碱${p.bn}的强度可以忽略不计。` | English sentence frames with the name in the nominative cannot carry the slots in order (4.1) |
| ch14/14.3/figures.js | sim-conjugate-ladder, row `P('H2', …, 'hydrogen', 'H⁻', 'hydride ion')` | the acid's name is 氢气 | the glossary row 氢 is the element; the substance H₂ is 氢气 (pending row) |
| ch14/14.3/section.json | exercise e58, hint of part (e) "phenylamine (aniline)" | written 苯胺 once | both English names are 苯胺 in Chinese (glossary row aniline); the alias cannot be shown (4.3) |
| ch14/14.3/section.json | exercise e43, solution (a) "polyoxy acids" | written 含氧酸 | no standard Chinese term for "polyoxy acid"; the glossary row oxyacid is used (pending row, doubt) |
| ch14/14.3/section.json | exercise e56 prompt | `确定硫酸氢根离子的 K_a，${…}.$ 在 0.10 M 溶液中，该酸电离了 29%。` | the math run `HSO₄⁻.` carries its own full stop and cannot be moved or edited, so the formula follows the sentence's object as in the source |
| ch14/14.3/section.json | `answer.parts[].part` of cyl7 ("percent ionization") | kept in English | translate.md 5 keeps `answer.parts[].part` byte for byte (the owner decides, translation-notes.md) |
| ch14/14.3/text.html, ch14/14.3/section.json | math runs that carry their own closing `,` `.` `?` `:` (Example 14.8 `${NO₂⁻},$`, Example 14.12 and the like, exercises e15 `CH₃NH₃⁺,$`, e18 `H₂BO₃⁻?$`, e22 `BrO₂⁻,$`) | left as printed; where the clause could end on the run it was reordered (the acid-strength and base-strength sentences, Example 14.14 `溶质为 ${HSO₄⁻?}$`) | the punctuation is part of the source's `$…$` run, which is kept byte for byte (translate.md 5); no reordering of the Chinese sentence can remove a comma that stands inside the run (review pass) |
| ch14/14.3/section.json | exercises e4 and e38 prompts, `NH<sub>3,</sub>` | the comma inside `<sub>` is dropped: `NH<sub>3</sub> 溶液` | the comma sits inside the HTML `<sub>`, not in a math run; the book's slip, not carried (review pass) |
| ch14/14.3/text.html | "general molecular formula" and "relatively insoluble" (Ternary acids, amphoterism) | the `molecular-formula` span wraps 通式 and the `insoluble` span wraps 难溶 | the Chinese words are 通式 and 难溶; the glossary words 分子式 and 不溶 do not fit (4.5, review pass) |

### ch14/14.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.4/text.html, ch14/14.4/section.json | spans on named acids: `acid` on 盐酸 (Example 14.15 ×2, first section), 乙酸 (Examples 14.16 and the basic-ions section), 多元酸 (metal-ions section) | the span wraps the whole Chinese compound that contains the concept's word | the source wraps one English word of "hydrochloric acid", "acetic acid", "polyprotic acid"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.4/text.html | `nitrate` span in "aluminum nitrate" (metal-ions section) | the span wraps 硝酸铝, the whole compound name | the source wraps "nitrate" alone; Chinese names the compound in one word (as for `acid` above) |
| ch14/14.4/text.html | "acid or base ionization" (first section, basic-ions section) | written 酸电离或碱电离, the span `acid-ionization` on 酸电离 and `base-ionization` on 碱电离 | the source's elliptical "acid or base ionization" wraps "acid" and "base ionization"; Chinese cannot leave 酸 bare of 电离, and the glossary term is 酸电离 |
| ch14/14.4/text.html | "Aqueous salt solutions" (first section) | written 盐的水溶液 with the `mixtures` span on 溶液 only (盐的水<span>溶液</span>) | the source wraps "solutions" alone; 水 stays outside the span to keep its extent |
| ch14/14.4/text.html | "weak acid cations" (conclusion of the acidic-ions section), "weak base anions" (basic-ions section) | written 弱酸性阳离子, 弱碱性阴离子 with the span on 弱酸 / 弱碱 and 性 outside | English noun-modifier stack; Chinese needs 性 to attach 弱酸 to 阳离子 |
| ch14/14.4/text.html | "the base ammonia" (acidic-ions section) | written 氨这种碱（NH₃）, the `base` span on 碱 | the source says "the base ammonia", not "weak base"; the apposition is turned into 氨这种碱 so no word is added, the span stays on 碱 |
| ch14/14.4/text.html | `group` span in "group 1 and 2", "(group 1)", "(group 2)" | written 第 1 和第 2 族 (span on the shared 族), 第 1 族, 第 2 族 | Chinese gives the ordinal before 族; "1 and 2" shares one 族 |
| ch14/14.4/text.html | "both acidic and basic ions" (both-ions section) | `acidic-solution` span on 酸性 and `base` span on 碱 in 碱性 (碱<span>性) | the source wraps "acidic" with the acidic-solution concept and "basic" with `base`; the spans keep their concepts |
| ch14/14.4/text.html | "the bonded water molecules’ O–H bonds are more polar than in nonbonded water molecules" | written 键合水分子的 O–H 键比未键合水分子中的极性更强, the `polar` span on 极性 | English comparative "more polar"; Chinese says 极性更强 |
| ch14/14.4/text.html | Example 14.17 (b), "4.7 × 10^−11,and its" | written ，且其 | the source runs the comma and "and" together without a space; Chinese has no such space, so the misprint cannot be carried (the section.json `notes` says so) |
| ch14/14.4/text.html | Example 14.17 (c), the paragraph break before "and its" | the first paragraph ends ，and the second begins 且其 | the source splits the sentence at the comma; kept |
| ch14/14.4/text.html | Example 14.15, question without a question mark | 的 pH 是多少 with no closing mark, as in the source | the source's missing "?" is carried over |
| ch14/14.4/text.html | Example 14.16 and the `\text{for}` inside `\kKbion\;(\text{for}\;…)` and `\kKa\;(\text{for}\;…)` | written `\text{对于}` | a word in `\text{}` in math is translated (translate.md 5) |
| ch14/14.4/text.html | Example 14.18 display `(\text{an acidic solution})` | written `(\text{酸性溶液})` | the article dropped (4.1) |
| ch14/14.4/text.html | "when dissolved" in the preamble of the metal-ions section; "dissolution of aluminum nitrate" | 溶解 for "dissolved" (span `dissolved` on 溶解) and the noun "dissolution" written 溶解 | one Chinese word for the adjective-participle and the noun |
| ch14/14.4/text.html | "the sequential or step-wise transfer of protons" | written 质子可以依次或逐级转移 | "sequential" and "step-wise" are two English words for one idea; both kept (依次, 逐级) |
| ch14/14.4/text.html | "the bonded water molecules" / "nonbonded" / "the free water molecule" | written 键合水分子, 未键合水分子, 游离水分子 (pending rows) | the book has no Chinese equivalent of "bonded water" as a term |
| ch14/14.4/figures.js | sim-salt-ions, `verdict` | each sentence rewritten in Chinese word order with the same slots: `${s.name} 中，${a.s} 是弱酸，${b.s} 不与水反应，所以溶液呈酸性。`; the comparison is `${a.s} 的 $\kKa$ 大于/小于 ${b.s} 的 $\kKbion$`; the articles (`a weak acid`, `a weak base`) dropped | English frame "$\kKa$ of ${a.s}" cannot carry the slots in order, and English articles collapse (4.1) |
| ch14/14.4/figures.js | sim-salt-ions, `inert:` line | written `不水解：` with the ions joined by `、` instead of `, ` | the separator of a Chinese list in prose |
| ch14/14.4/figures.js | fig-hydrated-al, hover names (`the aluminum atom, Al`, `an oxygen atom of a bonded water molecule` …) | written 铝原子，Al, 键合水分子的氧原子 …; the articles `the`/`a`/`an` dropped | English article grammar collapses to one Chinese form (4.1) |
| ch14/14.4/section.json | exercise cyl1 prompt | split after the question: 在 … 溶液中，水合氢离子浓度是多少？硝酸铵是一种盐，其组成离子为 ${…}$ 和 ${…}.$ 哪一种酸更强，${…}$ 还是 ${…}?$ | the source's apposition "a salt composed of the ions X and Y." ends with a full stop inside the math run and the last math run ends with "?"; neither can be moved, so the apposition becomes its own clause and no closing 。or ？ is added |
| ch14/14.4/section.json | `notes` | the English quotation “,and” kept as a quotation in the note; the note says that the Chinese text cannot show it | see Example 14.17 (b) above |
| ch14/14.4/section.json | `exercise_notes`, "novocaine" | written 普鲁卡因 (pending row) | the trade name novocaine is procaine in Chinese |
| ch14/14.4/text.html | Example 14.15 intro `[C₆H₅NH₃]Cl,$`, the basic-ions sentence `CH₃CO₂⁻\text{,}$` and `(CH₃CO₂⁻),$` | left as printed, the comma inside the math run | the punctuation is part of the source's `$…$` run (translate.md 5, review pass) |
| ch14/14.4/text.html | Example 14.15 first sentence ends "…solution of anilinium chloride" with no question mark | written with ？ | the book dropped the question mark; the Chinese question needs one (review pass) |

### ch14/14.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.5/text.html | spans on named acids: `acid` on 乙酸, 硫酸, 碳酸 (×3), 磷酸 | the span wraps the whole Chinese compound that contains the concept's word | the source wraps the word "acid" in "acetic acid", "sulfuric acid", "carbonic acid", "phosphoric acid"; Chinese names each acid in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.5/text.html | `carbonate` + `ion` spans in "carbonate ions" (×3) | written 碳酸根离子 with the `carbonate` span on 碳酸根 and the `ion` span on 离子 | the glossary's carbonate ion is 碳酸根离子; the two source spans keep their order |
| ch14/14.5/text.html | `ion` span in "hydronium ions", "bicarbonate ion" | spans wrap 离子 only, after 水合氢 and 碳酸氢根 | the source wraps "ions" alone |
| ch14/14.5/text.html | `saturated` span, Example 14.19 | the span wraps 饱和 and 溶液 follows (饱和溶液) | the source wraps "saturated" alone |
| ch14/14.5/text.html | `acidic` span, Example 14.19 "The solution is acidic" | written 呈酸性, the span on 酸性 (glossary acidic solution 酸性溶液 → 酸性) | Chinese says 呈酸性 where English says "is acidic" |
| ch14/14.5/text.html | `\text{First ionization:}`, `\text{Second ionization:}`, `\text{Third ionization:}`, `\text{more than}`, `\text{; complete dissociation}` | written 第一步电离：, 第二步电离：, 第三步电离：, 大于, ；完全解离 inside `\text{}` | words in `\text{}` are translated (translate.md 5); the ordinal "First/Second/Third" has no English-only grammar here |
| ch14/14.5/text.html | "is larger than ... by a factor of 10^4" (diprotic); "larger than the second by a factor of at least 20" | written "是 … 的 10^4 倍"; "至少是第二电离常数的 20 倍" | Chinese states a multiple as 是…的 N 倍, not 大 N 倍 (review pass) |
| ch14/14.5/text.html | "palatable amount of dissolved carbon dioxide" | written 适口量的溶解的二氧化碳 | no one-word Chinese equivalent of "palatable" |
| ch14/14.5/text.html, ch14/14.5/section.json | "Carbonated water" | written “碳酸水”, quotation marks kept | everyday name of the drink; no glossary row, recorded as pending |
| ch14/14.5/figures.js | sim-stepwise topline `${sp[1]} lies ${rel(...)} ${sp[0]}, and …` and `rel` | `rel(hi, lo, ref)` returns 约为 ref 的 1/N (below) or 是 ref 的 N 倍 (above) and the sentence is rewritten as `${sp[1]} 约为 ${sp[0]} 的 1/N，${sp[2]} …` (Chinese does not state a reduction as 低 N 倍) | English "N times below/above" frame cannot carry the slots in the same order |
| ch14/14.5/figures.js | readout `small` line "= X M at every starting concentration, since …" | rewritten as `= X M，在每个起始浓度下都是如此，因为 …` | Chinese word order |
| ch14/14.5/section.json | exercise answer `parts[].part` labels (`(a) <em>K</em><sub>a</sub>`, `[H₃O⁺] = [HS⁻]` …) | kept as printed; only the solution text of e76 has （a）（b）（c） | `answer.parts[].part` is a kept field (translate.md 5) |
| ch14/14.5/text.html, ch14/14.5/section.json | Example 14.19 `$\kconcHyd,$ $[HCO₃⁻],$ 和 …` and exercise e2 `[H₃O⁺],$ [OH⁻]、…` | left as printed, the comma inside the math run | the punctuation is part of the source's `$…$` run (translate.md 5, review pass) |

### ch14/14.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.6/text.html | `buffer` + `mixtures` spans in "buffer solution(s)" (many) | `buffer-composition` span on 缓冲 and `mixtures` span on 溶液, side by side | the glossary's buffer is 缓冲溶液, which already contains 溶液; the source wraps "buffer" and "solution" separately, so the two spans keep their order inside the one Chinese term |
| ch14/14.6/text.html | first paragraph "a buffer solution, or a buffer" | written "缓冲溶液，或称为缓冲液", the `strong` and span on 缓冲液 | buffer and buffer solution are both 缓冲溶液 in the glossary; the short form 缓冲液 keeps the two names of the sentence apart (recorded as pending) |
| ch14/14.6/text.html | spans on named acids: `acid` on 乙酸 (×9), 碳酸 (×4), 乳酸 (×2) | the span wraps the whole Chinese compound that contains the concept's word | the source wraps the word "acid" in "acetic acid", "carbonic acid", "lactic acid"; Chinese names each acid in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.6/text.html | `acid-ionization` span in "acetic acid ionization equilibrium" | written 乙酸电离 with the span on the whole of it, 平衡 in its own `chemical-equilibrium` span | the glossary's acid ionization is 酸电离; the source wraps "acid ionization" after "acetic", Chinese says 乙酸电离 |
| ch14/14.6/text.html | `hydroxide` + `ion` spans in "hydroxide ion"; `hydroxide` alone in "the added hydroxide", "an excess of hydroxide", "hydroxide molarity" | 氢氧根 (`hydroxide`) + 离子 (`ion`); where the source has `hydroxide` alone the span wraps 氢氧根离子 | the glossary's hydroxide ion is 氢氧根离子; Chinese has no bare "hydroxide" for the ion |
| ch14/14.6/text.html | `ion` span in "hydronium ion", "acetate ion", "bicarbonate ion", "hydrogen carbonate ion" | spans wrap 离子 only, after 水合氢, 乙酸根, 碳酸氢根 | the source wraps "ion" alone |
| ch14/14.6/text.html | `temperature` span in "body temperature" | the span wraps 体温 | the source wraps "temperature" alone; Chinese names it in one word (recorded for ch01 too) |
| ch14/14.6/text.html | `acidic-solution` span, "most of the by-products ... are acidic" | written 呈酸性, the span on 酸性 | Chinese says 呈酸性 where English says "are acidic" |
| ch14/14.6/text.html | `dissolved` span, "the dissolved carbon dioxide" | the span wraps 溶解的 | the source wraps "dissolved" alone |
| ch14/14.6/text.html | Example 14.20 (c) "a solution of an unbuffered solution with a pH of 4.74" | written "的溶液，即 pH 为 4.74 的非缓冲溶液"; the `unbuffered` ref span wraps "pH 为 4.74 的非缓冲溶液" and keeps its inner `mixtures` and `ph` spans | the source's redundant "solution of an unbuffered solution" cannot be written word for word in Chinese; 即 joins the two |
| ch14/14.6/text.html | "Figure 14.16 ... has little affect" (misspelling) | written 几乎没有影响 | the book's spelling error cannot be carried into Chinese; section.json notes quotes the English misspelling |
| ch14/14.6/text.html | "the buffer pairs pKa" (missing apostrophe) | written 由该缓冲对的 $\kpKa$ 所决定的值 (the span wraps 缓冲 and 对 stands outside it, as 缓冲对 is the standard term) | the missing apostrophe is an English-only error; the symbol is kept |
| ch14/14.6/text.html | "1 pH unit" and "A change of 1 pH unit occurs when ..." | written "…时，pH 发生 1 个单位的变化" | Chinese word order puts the condition first |
| ch14/14.6/text.html | Example 14.20 table heads "Initial concentration (M)" etc. | 初始浓度（M）, 变化（M）, 平衡浓度（M） without `concentration` spans | the source has no span in these cells |
| ch14/14.6/text.html | `\text{base}`, `\text{acid}` in the blood equation | 碱, 酸 inside `\text{}` | words in `\text{}` are translated (translate.md 5) |
| ch14/14.6/text.html | alt of fig-compare: image labels "Unbuffered", "p H equals 8.0 buffer" | rendered 非缓冲 and “pH 等于 8.0 的缓冲溶液” | the alt describes the labels; the image itself keeps English |
| ch14/14.6/text.html | photo credit "(credit: modification of work by Mark Ott)" | （来源：改编自 Mark Ott 的作品） | ch01 credit decision |
| ch14/14.6/text.html | Portrait of a Chemist: names, institutions | 劳伦斯·约瑟夫·亨德森, 卡尔·阿尔贝特·哈塞尔巴尔赫, 克里斯蒂安·玻尔, 索伦森, 哈佛大学, 斯特拉斯堡, 哈佛商学院; English given in parentheses at first mention of Henderson, Hasselbalch, Bohr, Sørensen | standard renderings of names; recorded as pending |
| ch14/14.6/section.json | `notes` quoted "1.0 mL of 0.10 NaOH", "has little affect", "buffer pairs pKa" | the English quoted inside “ ” | the notes describe the book's printed errors, which only exist in English |
| ch14/14.6/section.json | derivations `src` "Appendix B" | 附录 B | words of a `src` are translated (translate.md 5) |
| ch14/14.6/section.json | cyl1 solution "moles/L", "moles" | 摩尔/升, 摩尔 | unit words of the book's answer; the symbols mol, L elsewhere stay |
| ch14/14.6/figures.js | ctl labels `\\text{add}` and `\\text{buffer}` | \\text{加入}, \\text{缓冲溶液} | translated slider names; 缓冲溶液 is longer than "buffer" and may need the track's own line (translate.md 4.7) |
| ch14/14.6/figures.js | topline "Adding X mmol of NaOH moves the buffer from pH 4.74 to Y and the unbuffered solution from pH 4.74 to Z." | 加入 X mmol NaOH，使缓冲溶液的 pH 从 4.74 变为 Y，使非缓冲溶液的 pH 从 4.74 变为 Z。 | Chinese word order; slots keep their order |
| ch14/14.6/figures.js | note "All N mmol of CH₃CO₂H is used up; ..." | 全部 N mmol 的 CH₃CO₂H 已耗尽；… | Chinese word order |
| ch14/14.6/figures.js | `lab.add('buffer'|'unbuffered', …)` curve labels | 缓冲溶液, 非缓冲溶液 | translated figure labels |

### ch14/14.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.7/text.html | `concentrated` span in "equally concentrated" (Examples 14.21 (b), 14.22 (b), the stage list) | written 浓度相同, the span wrapping 浓度相同 | the glossary's concentrated is 浓的; Chinese says the two samples have the same concentration (浓度) and not that they are equally "concentrated" |
| ch14/14.7/text.html | `dilute` span in "dilute solution" | the span wraps 稀 (glossary 稀的) in 稀溶液, with `mixtures` on 溶液 | Chinese says 稀溶液; the adjective takes no 的 here |
| ch14/14.7/text.html | `acidic-solution`, `neutral-solution`, `basic-solution` spans (the stage list, Example 14.21 (c), "In more basic solutions") | the spans wrap 酸性, 中性, 碱性, without the 的 of the glossary forms 酸性的, 中性的, 碱性的; "In more basic solutions" written 碱性更强的溶液 with the span on 碱性 only | Chinese uses the bare adjective after 呈 and 由…转变为; the span stays in its block |
| ch14/14.7/text.html | `end-point` span in "titration end points" and "titration's end point" | the span wraps 滴定终点 (glossary), "titration" not written separately | the glossary's end point is 滴定终点, which already contains "titration" |
| ch14/14.7/text.html | `acid` span in "acetic acid" (Example 14.22, 乙酸 ×4) | the span wraps 乙酸 (ch14/14.6 precedent) | Chinese names the acid in one word |
| ch14/14.7/text.html | `hydroxide` and `ion` spans in "hydroxide ion" | `hydroxide` on 氢氧根, `ion` on 离子 (ch14/14.6 precedent) | the glossary's hydroxide ion is 氢氧根离子 |
| ch14/14.7/text.html | `ion` span in "hydronium ion", "acetate ion" | the span wraps 离子 only, after 水合氢, 乙酸根 | the source wraps "ion" alone |
| ch14/14.7/text.html | Example 14.21 (b) "intial" (misspelling) | written 初始 | the book's spelling error cannot be carried into Chinese; section.json notes quotes the English |
| ch14/14.7/text.html | `\text{, and }` in Example 14.22 (d) | written `\text{, 且 }`, the comma ASCII | words in `\text{}` are translated, ASCII punctuation inside math |
| ch14/14.7/text.html | `\text{red}`, `\text{yellow}`, `\text{Base}`, `\text{Acid}` in the indicator and Henderson-Hasselbalch equations | 红色, 黄色, 碱, 酸 inside `\text{}` | words in `\text{}` are translated (translate.md 5) |
| ch14/14.7/text.html | Example 14.22 first sentence "the titration of 25.00 mL of CH3CO2H with 0.100 M NaOH" | written 对 25.00 mL 0.100 M CH3CO2H 的滴定，所用 NaOH 为 0.100 M; the `weak-titration` ref span wraps 对…的滴定 | Chinese word order puts the object before 的滴定 |
| ch14/14.7/text.html | #titration-curves, "these two curves", "the strong and weak acid titrations" | written 强酸和弱酸滴定 with the `weak-acid` span on 弱酸 only | the source's span wraps "weak acid" inside the shared phrase "strong and weak acid" |
| ch14/14.7/text.html | #indicators, "pH 5.0 × 10⁻⁹ M ... In more basic solutions where" | the relative clause moved before the noun: 在水合氢离子浓度小于…（pH > 8.3）、碱性更强的溶液中 | Chinese puts the modifier before the noun |
| ch14/14.7/text.html | #titration-curves, "conjugate acid-base partners" | written 这对共轭酸碱 | glossary has 共轭酸碱对; Chinese does not need "partners" |
| ch14/14.7/text.html | #indicators, "both conjugate partners" | written 这对共轭酸碱的两个成员 | same |
| ch14/14.7/text.html | figure alt of fig-indicators | indicator names given as the Chinese name with the English label in parentheses (结晶紫（Crystal violet）); "p H" written pH; "2 comma 4 dash Dinitrophenol", "m dash Nitrophenol", "o dash Cresolphthalein" written 2,4-二硝基酚（2,4-Dinitrophenol）, 间硝基酚（m-Nitrophenol）, 邻甲酚酞（o-Cresolphthalein）; "Eriochrome * Black T" kept in parentheses as printed | the image labels stay English; the alt describes them for a reader of Chinese; the spelled-out punctuation of the English alt is a screen-reader transcription |
| ch14/14.7/text.html, ch14/14.7/section.json | "(Figure 14.18)", "(Figure 14.20)" in data-original-caption and original_caption; part labels (a), (b) | written （图 14.18）, （图 14.20）, （a）, （b） | figure citations in prose are translated (translate.md 4.6); full-width labels (ch01) |
| ch14/14.7/text.html | table 14.2 heads "Moles of NaOH Added" | written 加入 NaOH 的物质的量; no unit added | 物质的量 is the quantity (mol) of the SI, not "amount of matter"; the source has no unit in the head |
| ch14/14.7/section.json | notes | the printed "intial" quoted in 例 14.21; the roman "pKa" of the indicator equation written pK<sub>a</sub> | the notes describe the book's printed errors, which only exist in English |
| ch14/14.7/section.json | referents labels "the titration of 0.100 M HCl", "the titration of 0.100 M acetic acid" | 0.100 M HCl 的滴定, 0.100 M 乙酸的滴定 | Chinese word order |
| ch14/14.7/section.json | cyl1, cyl2, e94 `answer.solution` ("0.00: 1.000; …", "0.00 mL: 2.37; …", "(a) pH = 2.50; …") | kept | values and unit symbols only, no sentence (pure-math solution) |
| ch14/14.7/figures.js | `${s.name} range` (sim band label, its `F.measure` twin, ×3 places) | written `${s.name}变色区间` | the band is the indicator's color-change interval (变色区间) |
| ch14/14.7/figures.js | readout `small` line "X changes from red to yellow between a and b mL of NaOH." | written `${ic.name}在加入 a 至 b mL NaOH 之间由红色变为黄色。`; the capitalisation code `ic.name[0].toUpperCase() + ic.name.slice(1)` dropped | Chinese has no capital; English sentence frame cannot carry the slots in the same order (4.1) |
| ch14/14.7/figures.js | topline "At v mL of NaOH, stage, the HCl solution is at pH p and X is colour." | written `加入 v mL NaOH，stage，sample溶液的 pH 为 p，X呈颜色。`; `sample` (HCl / acetic acid / weak acid) replaced by `sample` = 'HCl ' / 乙酸 / 弱酸 (trailing space after the Latin name only) | word order of Chinese; the space between Latin letters and CJK |
| ch14/14.7/figures.js | `stage` strings "the initial state", "halfway to the equivalence point", "before the equivalence point", "the equivalence point", "past the equivalence point" | 初始状态, 半化学计量点, 化学计量点之前, 化学计量点, 化学计量点之后 | articles dropped; "halfway to the equivalence point" is the half-equivalence point (glossary 半化学计量点) |
| ch14/14.7/figures.js | hover names (flask, buret, solution, equivalence point, half-equivalence point, color-change bar) | English genitive/"of the" phrases rewritten in Chinese word order with the same slots, e.g. `${key === 'weak' ? '弱酸' : '强酸'}滴定的化学计量点，pH …`; `a`/`the` dropped | English article and genitive grammar (4.1) |


## Other things for the owner (chapter 14)

- **Merge fix.** 14.7 text.html, the indicator form of the Henderson-Hasselbalch equation, had `[\text{Base}]/[\text{Acid}]` untranslated while the page's other displays used 碱 and 酸; it now reads `[\text{碱}]/[\text{酸}]`.
- **酸式硫酸钠 for sodium bisulfate.** Example 14.14 (14.3) said 硫酸氢钠, the 化学名词 form; chapter 2's shard already has the row `sodium bisulfate` 酸式硫酸钠, so the page now reuses it. Owner to decide whether the book uses 硫酸氢钠 throughout. Review pass: the reviewer asked for 硫酸氢钠 (chapter 2's shard and pages would also change); not applied, because another chapter's files are not edited from this pass and the row is chapter 2's decision. Open for the chapter 2 owner.
- **水的离子积常数 and ch17.** The source names K_w three ways ("ion-product constant for water", "ion product of water", "autoionization constant", "ionization constant for water"). Chapter 14 writes the first two and the exercise forms 水的离子积常数 (the row `ion-product constant for water`), the third 自电离常数 (span in 14.2). The 14.1 exercise "ion product of water at 80 °C" said 水的离子积 and was changed to 水的离子积常数. Chapter 17's shard has the unqualified 水的离子积 for the same source (its exercise e8); its own note says to unify; owner to decide.
- **乙酸根 for the acetate ion.** The glossary row acetate is 乙酸盐 (the salt); the pages write the anion 乙酸根 and 乙酸根离子 (ion). Row `acetate (the anion)`, to be confirmed.
- **缓冲液 once.** In the definition "buffer solution, or a buffer" (14.6) the short form is 缓冲液, everywhere else 缓冲溶液. The span on 缓冲液 does not contain the concept's term 缓冲溶液 (recorded).
- **氢氧根 and 氢氧化物.** The concept `hydroxide` has the term 氢氧化物 (the compound class); the pages wrap 氢氧根 (the ion) in its spans, since Chinese names the ion 氢氧根离子. If the concept is meant for the ion, its term should be 氢氧根.
- **Page rows already in a glossary, not repeated in the shard (16 pending rows).** ammonium ion, Robert Boyle, aqueous solution, product (from 14.2 and 14.7), fossil fuel, exothermic, equilibrium, methylamine, octahedron, aluminum chloride, ammonium nitrate, copper(II) oxide (all with the same target in the shared glossary or another chapter's shard), sodium bisulfate (see above), a composite row "carbonic acid, sulfuric acid, nitric acid, acid rain (acid spans)" whose members have rows, and the second "ion product of water" row (same as 14.1's). 14.1's row `ion product of water` is kept once.
- **Terms with a doubt.** 含氧酸 for "polyoxy acids" (14.3 e43; the 'poly' is not rendered); 索伦森 for Sørensen (also 瑟伦森); 玻尔效应 (Bohr effect); 酚羟基 and 芳环 (14.3 e45); 键合水分子 and 游离水分子 (14.4, no standard term); 非缓冲溶液 (14.6); 一元的 for the adjective monoprotic; the 14.7 indicator dye names (结晶紫, 甲酚红, 百里酚蓝, 赤藓红 B, 铬黑 T, 溴酚蓝, 溴甲酚绿, 甲基红, 溴甲酚紫, 茜素, 酚红, 间硝基酚, 邻甲酚酞, 百里酚酞, 茜素黄 R, 2,4-二硝基酚), each with the English name in parentheses in the alt text of Figure 14.19 for the screen reader.
- **Unverified termonline rows.** 179 of the 246 rows of `glossary-ch14.json` carry `"confirm": "termonline"` (the chapter scaffold rows and the 64 added by this merge); none of the 64 was looked up at termonline.cn in this pass.
- **Kept in English.** Names of photographers and organisations in credits (Chris M Morris, Eden, Janine and Jim/Flickr, Jacopo Werther, Sahar Atwa, HomeSpot HQ/Flickr, John Tann, Mark Ott, Emil Kehnel); the English given names in parentheses after the Chinese names of Henderson, Hasselbalch, Bohr and Sørensen (14.6); the English dye labels in parentheses (14.7 alt); `answer.parts[].part` labels in English and in half-width (a) on 14.2, 14.3, 14.5, 14.6 and 14.7 (translate.md 5 keeps them byte for byte; as in chapter 1, owner to decide); the pure-math `answer.solution` fields flagged by `translation_parity.py`; the figure images' own English labels.
- **Source misprints not carried.** "It also is corrodes" (14.2), "wheres" and "much lesser than" (14.3), ",and" (14.4), "has little affect" and the missing apostrophe in "pairs pKa" (14.6), the comma inside `NH<sub>3,</sub>` (14.3 e4, e38), the missing question mark of Example 14.15 (14.4), "intial" (14.7): each written correctly in Chinese, the English quoted in `notes`.
- **Review pass, declined: shared row `acidity`.** The reviewer proposed a note on the shared row (酸度 when the book means the measured degree). The shared glossary is read-only for this pass, so no note was added; 酸度 in 14.2 (Measuring pH), the 14.3 Figure 14.9 alt and 14.6 (Portrait ¶2) stays, and the owner may add the note.
- **Review pass, terms changed.** 化学计量点 / 半化学计量点 for equivalence point (the 1984 legal units dropped 当量); no coined noun for conjugate partner (共轭酸, 共轭碱, 共轭酸碱对 by context); 缓冲对 (new row); 不水解 / 不与水反应 for the book's "inert" ions (row `inert`).
- **Humanizer review and `npm run dev` read-through** are outstanding for the owner.
