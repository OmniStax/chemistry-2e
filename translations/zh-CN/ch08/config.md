# Config: 化学（第2版）, Chapter 8 (translation)

The translation pass of `Chemistry 2e` chapter 8 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch08, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added as pending |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` carries the same
entry.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/intro/text.html, ch08/8.1/text.html, ch08/8.2/text.html, ch08/8.3/text.html, ch08/8.4/text.html | figure and sim eyebrows | `Figure N.M`, `Sim`, the bare `Figure` of the photographs and the composite `Figure 8.3 + 8.4 + 8.5` style eyebrows (7 composites in 8.1 to 8.4) kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, section.json | figure citations in the prose, in the captions and in the notes | written 图 N.M, （图 8.22） | the app links only `Figure N.M` (translate.md 4.6); recorded once per book in ch01 |
| ch08/8.1/text.html, ch08/8.4/text.html | table eyebrows `Table 8.1` to `Table 8.3` | written 表 8.1 to 表 8.3; the box eyebrows `Portrait of a Chemist` and `How Sciences Interconnect` written 化学家小传 and 各门科学如何相互联系 | translate.md 5 lists a table's eyebrow as translated; the ch01 rule |
| ch08/intro/text.html, ch08/8.4/text.html | photo credits (2) | （来源：改编自 Jefferson Lab 的作品）, （来源：Walter Kohn 提供的图片）; names kept as printed | the ch01 credit formula ("modification of work by X" and a plain credit; "image courtesy of X" is a plain credit) |
| ch08/8.2/text.html, ch08/8.3/text.html, ch08/8.4/text.html | spans on compound names (硫酸铵, 硫酸根, 酸雨, 硫酸, 液氧) | each span wraps the whole Chinese compound that contains the concept's word (硫酸盐 / 硫酸, 酸, 液体); one row per page below | Chinese names the compound in one word; the span cannot wrap only the English-style part (ch01 rule, translate.md 3.3) |

### ch08/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/intro/text.html | `<span data-concept="valence-shell">valence shell</span> <span data-concept="electron">electron</span> pair repulsion (VSEPR) <span data-concept="scientific-theory">theory</span>` | written 价层电子对互斥理论（VSEPR） with the spans on 价层, 电子, 理论 (the form of the ch07 row `valence shell electron-pair repulsion theory (VSEPR)`); 对互斥 and （VSEPR） stay outside | Chinese puts the acronym after the whole term; the span words are split by the fixed term 价层电子对互斥理论 (review pass: 理论 moved before the acronym) |
| ch08/intro/text.html | `<span data-concept="liquid">liquid</span> nitrogen` and `liquid oxygen` | written `<span data-concept="liquid">液氮</span>` and `<span data-concept="liquid">液氧</span>`, the span on the whole compound | the span wraps the whole Chinese compound containing the concept word (same rule as the compound-name row above, and as 液氧 in 8.4 #paramagnetism); 液体氮 / 液体氧 was dropped in the review pass because the ch08 rows `liquid nitrogen` and `liquid oxygen` are 液氮 and 液氧 and the captions say so |
| ch08/intro/text.html | `orbital <span data-concept="hybridization">hybridization</span>` | written 轨道杂化 with the span on 杂化 | glossary term of the concept is 杂化 |
| ch08/intro/text.html | `<em>s, p,</em> and <em>d</em>` | written `<em>s、p</em> 和 <em>d</em>` | Chinese list punctuation |
| ch08/intro/figures.js | `N₂`, `O₂` labels | unchanged | formulas, nothing to translate |

### ch08/8.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.1/text.html (#sigma-pi), section.json (sim-overlap original_caption) | `<strong><span data-concept="sigma-bond">sigma bonds</span> (σ bonds)</strong>`, `<span data-concept="pi-bond">pi bond (π bond)</span>`, "Sigma (σ) bonds", "Pi (π) bonds" | written `<strong><span data-concept="sigma-bond">σ 键</span>（英文 sigma bonds）</strong>`, `<span data-concept="pi-bond">π 键（英文 pi bond）</span>`, and in the sim-overlap original_caption plain `σ 键`, `π 键` (review pass: the English letter name is kept only in the two bold definitions); the strong and the span stay where the source has them | the source spells the English name of the Greek letter and then gives the symbol; the glossary renders both as σ 键 / π 键, so "σ 键（σ 键）" would say nothing; the English name is kept in parentheses (translate.md 4.3, 4.5; same device as ch01/1.5 significant figures) |
| ch08/8.1/text.html (#bond-distance, #valence-bond, #sigma-pi) | spans on "the energy of the system", "the sum of the energies", "the bond distance of 74 pm", "a force we define as a covalent bond", "the attractive and repulsive forces" | the inner spans change order or sit on the head word: `<span>体系</span>的<span>能量</span>`, `吸引和排斥的<span>力</span>`, `吸引<span>力</span>` | Chinese puts the possessor before the noun; "attractive and repulsive forces" is one span in the source and 吸引力和排斥力 would put the span on a bound 力 (word order, translate.md 3.3); spans stay in their blocks |
| ch08/8.1/text.html (#valence-bond) | `<span data-concept="hybridization">hybridization</span>` | span wraps 杂化 (glossary row hybridization, ch18 杂化轨道) | the concept name is 原子轨道的杂化; the prose word is 杂化 |
| ch08/8.1/text.html (#valence-bond, #sigma-pi) | "VSEPR theory" (span `scientific-theory` on "theory") | 价层电子对互斥<span>理论</span>, the span on 理论 only | the span wraps the word that names the concept; the glossary row VSEPR theory is the whole compound |
| ch08/8.1/text.html (#bond-distance) | Table 8.1 head "Length (pm)" and "Energy (kJ/mol)"; "A comparison of some bond lengths and energies" | 键长 and 能量 (not 键能): the spans are `bond-length` and `energy-and-work`, kept as the source tags them | the spans name the concepts of the source; 键能 would be the `bond-energy` span; the unit in a table head or axis label is in full-width parentheses 键长（pm）, 能量（kJ/mol）, 核间距（pm）, 能量（10⁻¹⁹ J）, as the heads of ch01 to ch07 (review pass) |
| ch08/8.1/figures.js | `f.orb`, hover names `the nucleus of a ${NAME[who]} atom` | `${NAME[who]}原子的 … 轨道`, `${NAME[t.who]}原子的原子核`; `NAME` values 氢, 氯, 碳; articles dropped | English "the … orbital of a … atom" built by concatenation; Chinese word order and no article (translate.md 4.1) |
| ch08/8.1/figures.js | sim-morse hover name, headline strings | `'a hydrogen atom, its nucleus the dot'` as `氢原子，圆点为其原子核`; `'At ' + r + ' pm …'` as `'在 ' + r + ' pm 处，…'` with the same slots | English sentence frames rewritten in Chinese word order, code shape and slots kept (translate.md 4.1) |
| ch08/8.1/figures.js | `STATES[].label` 'p + p end to end', 'p + p at an angle', 'p + p side by side' | `p + p 头碰头`, `p + p 成一定角度`, `p + p 肩并肩`; `\text{one }\sigma\text{ bond}` as `\text{一个 }\sigma\text{ 键}` | words of option labels and `\text{}` are translated; "one" carries the article of the source |
| ch08/8.1/text.html (#sigma-pi, sim-overlap head), 8.1/figures.js, 8.4/text.html (sim-mo-shapes head) | "Along the axis itself, there is a node, that is, a plane with no probability of finding an electron"; figures.js "the node, a plane through the internuclear axis"; "the faint planes are nodes" | 沿轴本身有一个<strong><span data-concept="node">节面</span></strong>，即电子出现概率为零的平面; 节面，一个通过核间轴的平面; 淡色的平面是节面 | where the source calls the node a plane the word is 节面 (the ch08 row `nodal plane`), since 节点 is a point in Chinese; the `node` span therefore holds 节面 (recorded exception to the span-holds-target rule); elsewhere the source word node stays 节点 (review pass) |

### ch08/8.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.2/text.html (#sp, #sp3, #sp3d) | `<span data-concept="lone-pair">lone pairs</span> of <span data-concept="electron">electrons</span>` (4 places) | written `<span data-concept="lone-pair">孤<span data-concept="electron">电子</span>对</span>`, the electron span nested inside the lone-pair span | 孤电子对 already contains 电子, so the two spans cannot sit side by side; same device as ch07 |
| ch08/8.2/text.html (#sp, section.json sim-sp original_caption) | `To accommodate these two <span data-concept="electron">electron</span> domains`, "consistent with the geometry for two domains" | written 这两个<span data-concept="electron">电子</span>域, 两个电子域 | the span wraps 电子 of 电子域 (pending term); the source's "domain" is the region of electron density, 电子密度区域, elsewhere on the page |
| ch08/8.2/text.html (#sp2) | `orbital <span data-concept="energy-and-work">energy</span> level diagram` | written 表示轨道<span data-concept="energy-and-work">能量</span>的能级图 | 能级图 is one word, so the span cannot wrap its 能; the span moves to the 能量 of the clause, in the same block |
| ch08/8.2/text.html (#examples, #sp3d) | `<span data-concept="sulfate">sulfate</span>` in "Ammonium sulfate" and "the sulfate ion" | span wraps 硫酸铵 and 硫酸根 (followed by the `ion` span on 离子) | Chinese names the compound in one word and the anion 硫酸根; the span cannot wrap only "sulfate" (as in ch01) |
| ch08/8.2/text.html (#sp3d) | `${\text{ClF}}_{4}{}^{\text{+}}.$`, `${\text{PCl}}_{6}{}^{\text{−}},$`, `${\text{IF}}_{6}{}^{\text{+}},$`, `${\text{ICl}}_{4}{}^{\text{−}},$` | the sentence punctuation inside the `$…$` is moved out: `${\text{ClF}}_{4}{}^{\text{+}}$ 中`, `${\text{IF}}_{6}{}^{\text{+}}$、IF₅、…` | the comma or period belongs to the English sentence; inside the TeX it would print after the ion in the Chinese sentence |
| ch08/8.2/text.html (#sp3), section.json summary_html | "a sigma (σ) bond", "sigma (σ) bonds", "Pi (π) bonds" | written σ 键, π 键 without the English letter name | the English name of the Greek letter is kept only in the two bold definitions of 8.1 #sigma-pi; in running sentences σ 键 / π 键 stands alone as in Chinese textbooks (review pass; translate.md 4.3) |
| ch08/8.2/text.html, section.json | "the" in `<span data-type="angle">the <span data-concept="bond-angle">bond angle</span></span>`; articles before spans | dropped; the spans wrap 键角 alone | English article, no Chinese form (translate.md 4.1) |
| ch08/8.2/text.html (#water-problem) | `linear combination of atomic orbitals, LCAO, (a technique that we will encounter again later)` | written 通过<em>原子轨道线性组合</em>（LCAO，我们以后还会遇到的一种方法）来实现, the parenthesis moved after the term | Chinese word order of "is mathematically accomplished by …"; the em and span stay on the term |
| ch08/8.2/figures.js | `WORDS = { 2: 'Two', … }` and the three templates that use it (sim-sp3d headline, `${m.name}: … regions of electron density`, sim-hybrid-sets headline) | `WORDS` holds 两/三/四/五/六 and each template carries 个: `${WORDS[i]}个电子密度区域：…`; the headlines are rewritten in Chinese word order with the same slots | English "Three regions of electron density: a trigonal planar arrangement of sp² hybrid orbitals, 120° apart." cannot keep its slot order; numeral and measure word (4.1) |
| ch08/8.2/figures.js | `NAMES` values and `NAMES[m.c].split(' ')[0]` | values written 氢（H）, 氯（Cl） … with full-width parentheses as in ch07; the code `.split(' ')[0]` becomes `.split('（')[0]` to take the element name | the hover names follow ch07's form; the one-token code change keeps the "of phosphorus" slot working |
| ch08/8.2/figures.js | hover names `an ${HYB_NAME[n]} hybrid orbital`, `the valence s orbital`, `a valence p orbital (p${AXN[i]})`, `an sp³ orbital of carbon …`, `an ${hy} hybrid orbital of ${…}` (9 places) | articles dropped: `${HYB_NAME[n]} 杂化轨道`, `价层 p 轨道（p${AXN[i]}）`, `${元素}的 ${hy} 杂化轨道` | English article and "of" genitive built by concatenation (4.1) |
| ch08/8.2/figures.js | `ANGLES[5]` `'90° and 120°'`, `ARRANGE` | written `90° 和 120°`; `ARRANGE` holds the shape names (直线形 … 八面体形) and the templates add 呈…排列 | the array feeds "a ${ARRANGE[i]} arrangement" in the headline and `\text{${ARRANGE[i]}}` in the readout (4.1) |
| ch08/8.2/section.json | e5 answer.solution | the book's unclosed parenthesis kept: `T 形（A 上有两对孤电子对 …，或（A 上有三对孤电子对）…` | exercise_notes says the key keeps it; "nothing improved" (translate.md 3.2) |
| ch08/8.2/text.html, section.json, figures.js | valence orbital (rows `valence orbital`, ch18 shard 价轨道) | written 价轨道; the pending row 价层轨道 of the page agent was not used. The modifier forms stay 价层 s 轨道 and 价层 p 轨道 ("the valence s orbital", figures.js hover names) | one target for one source across the book: ch18's shard already holds 价轨道 (化学名词) and `book-rows.json` writes the hybridization statement with it; 价层 is the shared row valence shell |
| ch08/8.2/section.json | exercise e11 (the strike-anywhere match) | written 擦燃火柴 (the page agent had 随处可擦火柴) | reuse of the ch18 shard row `strike-anywhere match` |

### ch08/8.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.3/text.html | #resonance-hybridization, "lone pairs of electrons" and #resonance-hybridization Example 8.4, "one lone pair of electrons" (spans `lone-pair` and `electron`) | written 孤<span electron>电子</span>对 inside the `lone-pair` span (nested spans, as in ch01 to ch07) | 孤电子对 is one word that holds 电子; the source has a span on "lone pairs" and another on "electrons" (translate.md 3.3) |
| ch08/8.3/text.html | #hybrids-and-p, sim-multiple-bonds sim-head, "cosine of <span data-type="angle">the twist</span>" | span wraps 扭转角 | "the twist" is the twist angle; Chinese needs 角 to carry a cosine (扭转的余弦 does not read) |
| ch08/8.3/text.html | #hybrids-and-p, the first paragraph, "single <span covalent-bond>covalent bonds</span>" and "double and <span triple-bond>triple bonds</span>" | 单<span>共价键</span>; 双键和<span>三键</span> | 单 and 双 are bound to the word they qualify; the span stays on the glossary word |
| ch08/8.3/text.html | #resonance-hybridization, "(See the next module.)" | written （参见下一节。） | "module" is the book's word for a section (module m68747 is 8.4) |
| ch08/8.3/text.html | Example 8.4, "Some <span acid>acid</span> rain" and "sulfuric <span acid>acid</span>" | span wraps 酸雨 and 硫酸 | Chinese names each in one word (same as ch01 1.3 and ch14) |
| ch08/8.3/section.json | e8 solution (b) "as in Example 8.4" | written 如例 8.4 所示 | cross reference to the example heading, which is 例 8.4 |
| ch08/8.3/figures.js | sim-hybrid-levels, `WORD`, topline | `WORD = ['', 'one', 'two', 'three']` becomes `['', '一', '两', '三']`; `unhybridized p orbital${st.hyb === 3 ? '' : 's'}` collapses to one form; template rewritten with measure word 个: `在 ${st.name} 杂化的碳原子中，${WORD[st.hyb]}个 ${st.name} 杂化轨道和${WORD[4 - st.hyb]}个未杂化的 p 轨道各容纳一个电子。` | English plural branch and number words in figure code (4.1); Chinese needs the measure word 个 |
| ch08/8.3/figures.js | sim-hybrid-levels, label `Orbitals in the ${s.name} hybridized C atom in ${s.mol}` | `${s.mol} 中 ${s.name} 杂化 C 原子的轨道` (the two slots swap places) | English "in the X hybridized C atom in M" cannot keep the slot order in Chinese |
| ch08/8.3/figures.js | sim-multiple-bonds, pickable names `'one π bond'`, `'the second π bond'`, `'the π bond, above the plane'` | 一个 π 键, 第二个 π 键, π 键，位于平面上方 (articles dropped) | English article grammar collapses to one Chinese form (4.1) |
| ch08/8.3/figures.js | sim-multiple-bonds, `'unhybridized 2p orbital, one phase'` / `'the other phase'`, legend `p orbital, one phase` | 一个相位 / 另一个相位 | "phase" of a wave is 相位 (the glossary 相 is the phase of matter); the article is dropped |
| ch08/8.3/figures.js | sim-multiple-bonds, `aria: 'twist of one CH2 group about the C–C axis'` | 一个 CH2 基团绕 C–C 轴的扭转 | the noun twist is 扭转; no angle is added in the aria |
| ch08/8.3/section.json | exercises[cyl1].answer.solution | `<em>sp</em><sup>2</sup>` as printed | a pure formula answer with no prose; `translation_parity.py` lists it as untranslated, nothing to translate (as the pure-math solutions of ch01 1.5 and 1.6) |

### ch08/8.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.4/text.html | #paramagnetism, "pour <span liquid>liquid</span> oxygen" | span wraps 液氧 | 液氧 is one word that holds 液; the source spans the adjective liquid (same pattern as 天然气 in ch01) |
| ch08/8.4/text.html | #mo-diagram, "The relative <span energy>energy</span> levels of atomic and ..."; #allowed levels in the Band Theory box ("The allowed <span energy>energy</span> levels"); Example 8.6 "a molecular orbital <span energy>energy</span> diagram"; #diatomic "a <span MO>molecular orbital</span> <span energy>energy</span> diagram" | span wraps 能级 (and 分子轨道<span>能级</span>图 in the two diagram phrases) | Chinese names energy level and energy-level diagram with 能级, which does not contain the glossary word 能量 (translate.md 3.3, the span stays in its block) |
| ch08/8.4/text.html | #diatomic, the equations `{\text{bond order in H}}_{2}` and `{\text{bond order in He}}_{2}` | written `{\text{H}}_{2}\text{ 的键级}` and `{\text{He}}_{2}\text{ 的键级}` | Chinese puts the formula before 的键级; the LaTeX outside \text{} is unchanged |
| ch08/8.4/text.html | #mo-diagram, "(such as ${\text{Be}}_{2}{}^{\text{+}})$" | the opening bracket written as ASCII `(` (not full-width) | the closing bracket is inside the math and cannot move; a full-width opening bracket would not match it |
| ch08/8.4/text.html | Example 8.7, "Give the molecular orbital configuration for the valence electrons in ${\text{C}}_{2}{}^{\text{2−}}.$ Will this ion be stable?" | written 给出 ${\text{C}}_{2}{}^{\text{2−}}$ 中价电子的分子轨道构型。这个离子会稳定吗？ | the sentence mark is moved out of the math and written in Chinese, the chapter rule below (review pass) |
| ch08/8.4/text.html, section.json | `(read as "sigma-s")`, `"sigma-s-star"`, `"sigma-p-x"`, `"sigma-p-x star"`; "Sigma (σ) and sigma-star (σ*)" in the Figure 8.29 caption | 读作“西格玛-s”, “西格玛-s-星”, “西格玛-p-x”, “西格玛-p-x 星”; 西格玛（σ）和西格玛星（σ*） | the English spoken names of the symbols; the Greek letter name is rendered 西格玛 and the sentence kept (translate.md 4.3) |
| ch08/8.4/text.html | Portrait of a Chemist, "the Kindertransport program" and "Polaroid" | written “儿童撤离行动”（Kindertransport）项目 and 宝丽来（Polaroid） with the original in full-width brackets | German word and a company name for which the Chinese is a description or transliteration; the original is kept so the reader can find it (translate.md 4.3) |
| ch08/8.4/text.html | "Walter Kohn", "John Pople", "Kohn" | names kept in Latin letters | no standard rendering looked up (translate.md 2.7) |
| ch08/8.4/text.html | "period 2" (#second-period), "first- and second-row" (objective 4 of section.json) | 第 2 周期; 第一周期和第二周期 | the book's "row" is the period; 周期 is the glossary word and carries the span |
| ch08/8.4/figures.js | sim-mo-fill `hits` names: `'the ' + l.id + ' atomic orbital' + (l.deg > 1 ? 's' : '') + ' of one ' + X + ' atom'` and the "other" twin | `'一个 ' + X + ' 原子的 ' + l.id + ' 原子轨道'` and `'另一个 ' + X + ' 原子的 ' + l.id + ' 原子轨道'` | plural branch and articles collapse to one form (4.1); the Chinese puts the atom before the orbital, the code shape is kept |
| ch08/8.4/figures.js | sim-mo-fill `hits` name `'the ' + name + ' ' + (anti ? 'antibonding' : 'bonding') + ' molecular orbital'` | `name + ' ' + (anti ? '反键' : '成键') + '分子轨道'` | article dropped (4.1) |
| ch08/8.4/figures.js | sim-period2 `hits` name `'the ' + nm + ' orbital' + (deg > 1 ? 's' : '') + ' of ' + X + '₂'` | `X + '₂ 的 ' + nm + ' 轨道'` | plural branch collapses; the owner phrase goes first in Chinese (4.1) |
| ch08/8.4/figures.js | sim-mo-shapes `nm = 'the ' + name + ' molecular orbital'` and its `', one phase'`, `', the other phase'`, `', an outer lobe'` etc. | `name + ' 分子轨道'`, `'，一种相位'`, `'，另一种相位'`, `'，一个外侧的瓣'` | articles dropped (4.1); "phase" of a wave is 相位 (the glossary 相 is the phase of matter), as in 8.3 |
| ch08/8.4/figures.js | sim-mo-shapes `'The orbital has ' + I.nodes + '.'` | `'该轨道' + I.nodes + '。'` with the nodes phrases written to follow 该轨道 (在两核之间没有节点, 有一个包含核间轴的节点 ...) | English "no node / one node" noun phrases need a Chinese verb phrase after the subject |
| ch08/8.4/figures.js | sim-mo-fill readout `\text{bond order of } \text{X}_2^q = ...` | `\text{X}_2^q\text{ 的键级} = ...` | the formula goes before 的键级 in Chinese |
| ch08/8.4/figures.js | sim-mo-fill readout small line (`All the valence electrons are paired, so ` ... ` is paramagnetic` ... `, and with a bond order of zero it is not stable.`) | `所有价电子都已成对，所以 ` + name + ` 是顺磁性的` ... `，且键级为零，所以它不稳定。`; the three branches (zero, one, n unpaired) are kept and the n branch is written `'有 ' + unp + ' 个电子未成对，所以 '` | English subject-verb agreement is not needed; the measure word 个 is |
| ch08/8.4/figures.js | sim-mo-fill headline `name + ' has the valence configuration ' + conf + '.'` | `name + ' 的价电子构型为 ' + conf + '。'` | word order |
| ch08/8.4/figures.js | sim-bands `NAME = { ins: 'an insulator', semi: 'a semiconductor', cond: 'a conductor' }` | `绝缘体`, `半导体`, `导体` | English articles collapse (4.1) |
| ch08/8.4/figures.js | sim-bands headline `'In ' + NAME + ' the band gap is ' + ...` | `'在' + NAME + '中，带隙' + (大 / 适中 / 很小) + '。'` | word order |
| ch08/8.4/figures.js | sim-bands readout `N/2 \text{bonding (filled)}`, `N/2 \text{antibonding (empty)}` | `N/2 \text{个成键轨道（填满）}`, `N/2 \text{个反键轨道（空）}` | the Chinese measure word 个 and the noun 轨道 are needed after a number; the source leaves the noun implicit |
| ch08/8.4/figures.js | sim-waves headline third branch `'At a phase difference of ' + P.v + '°, the sum has ' + a + ' times the amplitude of either wave.'` | `'相位差为 ' + P.v + '° 时，和的振幅是任一波振幅的 ' + a + ' 倍。'` | word order |
| ch08/8.4/figures.js | sim-gouy `options` labels `'off'`, `'on'` | `'关'`, `'开'` | one-character state words for the electromagnet toggle |
| ch08/8.4/figures.js | sim-mo-fill / sim-spmix canvas labels `3p_{x} and 3p_{y}`, `(a)`, `σp meets πp` | `3p_{x} 与 3p_{y}`, `（a）`, `σp 与 πp 相遇` | full-width part labels as in prose |
| ch08/8.4/section.json | e9 solution, "Each ion has twice the valence electrons of one atom less two for the 2+ charge" | written 每个离子的价电子数是一个原子价电子数的两倍，再减去 2+ 电荷所对应的两个电子 | the source clause has no verb in English "less two"; Chinese needs the object stated |
| ch08/8.4/section.json | e14 solution, "so atoms in the 2s orbital are closer to the nucleus" | 2s 轨道中的原子, as printed | an error of the book (it means electrons) is kept (translate.md 3.2) |
| ch08/8.4/text.html | #second-period, `<span data-concept="electrically-neutral">neutral</span> <span data-concept="molecule">molecule</span>` (Example 8.6 step) | the span wraps 中性 of 中性分子, not the concept's 电中性 | Chinese says 中性分子 where English says "the neutral molecule"; 电中性分子 would put an added 电 into the sentence (translate.md 3.3, the span stays in its block) |
| ch08/8.3/text.html, 8.3/section.json, 8.4/text.html, 8.4/section.json | a sentence mark (comma, period) printed inside `$…$` before the next Chinese words | the mark is moved out of the math and written in Chinese (，、。), as 8.2 does: `$\text{H−C≡C−H}$ 中`, `${\sigma}_{px}^{*}$、π…`, `…^{1}$。通常…` | one chapter rule for the 12 places found in the review pass; formulas ending a list inside a solution formula line (8.2 e14) are left as printed |
| ch08/8.2/section.json | e12 answer image alt, "a chlorate atom single bonded to two oxygen atoms" | 一个氯原子与两个氧原子 | a slip of the source alt text ("chlorate atom" is not an entity; it describes the Cl of ClO₃⁻) corrected in the alt text only (review pass) |
| ch08/8.4/text.html | #mo-theory, `<span data-concept="molecular-structure">molecular structure</span>` | 分子构型 kept | the shared ch07 row `Molecular structure` = 分子构型 binds; the review proposal 分子结构 for this sentence was declined (review pass) |
