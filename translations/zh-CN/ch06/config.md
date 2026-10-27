# Config: 化学（第2版）, Chapter 6 (translation)

The translation pass of `Chemistry 2e` chapter 6 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch06, every page it lists |
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
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch06/6.3/text.html, ch06/6.5/text.html | table eyebrows `Table 6.1` to `Table 6.3` | written 表 6.1 to 表 6.3 | one form for all tables of the book (chapter 1) |
| ch06/intro/text.html, 6.1/text.html and section.json, 6.3/text.html and section.json | photo credits | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X"; names and organisations kept as printed | the book-level formula of chapter 1 |
| ch06/6.1/figures.js, ch06/6.3/figures.js, ch06/6.4/figures.js, ch06/6.5/figures.js | plural branches, articles and sentence frames of hover names, headlines and readouts | rewritten in Chinese word order with the same slots; the singular/plural branches collapse to one form | English grammar built by concatenation (4.1); the pages list each place below |
| ch06/6.1/section.json to 6.5/section.json | exercises whose `answer.solution` is only a number with its unit, or a formula | kept as printed (`translation_parity.py` lists them as "untranslated?") | nothing to translate; the same as chapter 1 |

### ch06/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/intro/text.html | Figure 6.1 caption, `(credit: modification of work by NASA and ESA)` | written （来源：改编自 NASA 和欧洲空间局（ESA）的作品）; ESA expanded, NASA expanded earlier in the same caption | one credit formula for the book (chapter 1 precedent); acronyms glossed once |
| ch06/intro/text.html | figure citation `Figure 6.1` in the prose | written 图 6.1 | recorded once per book (translate.md 4.6) |

### ch06/6.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.1/text.html | `#standing-waves`, "(also known as **stationary waves**)" | written （也称为 **stationary waves**），the English kept in the `<strong>` with the `wave` span on "waves" | the passage names the second English term of the same concept; Chinese has 驻波 for both, so the sentence would read 驻波（也称为驻波）(translate.md 4.3) |
| ch06/6.1/text.html | `#waves`, `#standing-waves`, `#em-spectrum` and others: spans on 波 in 电磁波, 声波, 行波, 谐波, 基波, 载波 | the `wave` span wraps 波 inside the compound | Chinese names these in one word, the span stays in its block (glossary note of `wave`) |
| ch06/6.1/text.html | `#photoelectric` Example 6.2, excited neon <span data-concept="atom">atoms</span>; `#waves` radiant `heat` | span wraps 氖原子 whole; span wraps 辐射热 whole | the span wraps the whole Chinese compound that contains the concept word (chapter 1 precedent) |
| ch06/6.1/text.html | `#blackbody`, "room <span temperature>temperature</span>" | span wraps 室温 | Chinese names it in one word (chapter 1 precedent) |
| ch06/6.1/text.html | `#waves`, "the speed of light", `a constant speed of 2.998 x 10^8 m/s` | 光速 for the type-velocity span on "the speed of light"; 恒定的速率 for "constant speed" | 光速 is the standing word; the glossary row speed is 速率 |
| ch06/6.1/text.html | `#rydberg`, "Neils Bohr" | written 尼尔斯·玻尔 (the glossary rendering of Niels Bohr); the misspelling is kept only in section.json `notes`, quoted | a misspelling of a Latin-letter name has no Chinese form |
| ch06/6.1/text.html, section.json | `#light`, "units": miles, "several miles" | written 英里 | unit with no SI symbol in the book takes the Chinese name (translate.md 4.4) |
| ch06/6.1/text.html | Figure 6.3 `data-original-caption`, eight credits | written （来源“X”：改编自 Y 的作品；…）with the image labels translated (宇宙射线, PET 扫描, X 射线, 牙科固化, 夜视, 遥控器, 手机, 微波炉, 调幅广播) and the names of people and agencies kept as printed | one credit formula for the book; the source's eight labelled credits are joined as a list |
| ch06/6.1/text.html | Figure 6.9 caption credit | written （来源：改编自 American Society for Testing and Materials (ASTM) Terrestrial Reference Spectra for Photovoltaic Performance Evaluation 的作品） | the credit names a work by its English title, kept |
| ch06/6.1/text.html | figure citations in the prose (图 6.2 to 图 6.13) | written 图 N.M | recorded once per book (translate.md 4.6) |
| ch06/6.2/text.html (Rydberg constant, Example 6.5 solution), 6.3/text.html (spin paragraph, ħ and ±½ sentences), 6.5/text.html (Example 6.13 solution) | sentence-final punctuation that the source sets inside `$…$` | taken out of the math and set where the Chinese word order puts it (`$R_{\infty}$ 的理论值`, `$\kdE=\frac{h\kc}{\klam}$ 求得`, `$-\frac{1}{2}$ 时则向下`, `$\hbar=\frac{h}{2\pi}$，即`, `$\left(\pm\frac{1}{2}\right)$，所以`); in Example 6.13 the label `\text{Al:}\hspace{2em}(…)` became 从 Al 中电离出第三个电子 | in English the full stop or comma closes the sentence after the formula; in Chinese the formula sits mid-clause, so the mark moves with the word order (review pass) |
| ch06/6.1/text.html, #hodgkin box ("determination of molecular structure") | the span `molecular-structure` wraps 分子结构 | the ch07 row `molecular structure` → 分子构型 is the VSEPR geometry sense; X-ray diffraction determines the full structure of a molecule, so 分子结构 (review pass #8) |
| ch06/6.1 to 6.5 section.json | `exercise_notes` apparatus words | one wording on every page: 书后答案, 没有答案的题, 建议思路, 标明为 OmniStax 自拟的, 注释 | the shared rows `answer key` and `suggested approach`, shard rows `unkeyed item` and `note`; 提示 would read as "hint" (review pass #4) |
| ch06/6.1/section.json | exercises e3 to e6 `answer.parts[].part` ("energy in joules", "(a) wavelength", ...) | kept in English | the table of translate.md 5 lists `answer.parts[].{part,value,unit,tol}` as kept; the labels are left for the owner to decide. The same for 6.2 e1 ("energy", "wavelength"), review pass #30 |
| ch06/6.1/section.json | exercises `answer.solution` that is pure math with units (cyl2, cyl3, e3, e6) | kept as printed | a number with its unit and no words to translate |
| ch06/6.1/figures.js | `REGIONS` names and the `reg.name === 'visible'` / `'radio'` tests in sim-spectrum | names written in Chinese; the tests compare with 可见光, and the 'radio' branch (`'a radio wave'`) is dropped because 无线电波 is already the region name | the code tests the displayed name; the English article branch collapses (translate.md 4.1) |
| ch06/6.1/figures.js | sim-spectrum `topline` | `'Radiation of wavelength ' + … + ' is ' + (…)` becomes `'波长为 ' + … + ' 的辐射是' + (…)` with the same slots | English sentence frame cannot carry the slots in the same order |
| ch06/6.1/figures.js | sim-string `topline`, `(n === 1 ? ' half-wavelength' : ' half-wavelengths')` and `(n - 1 === 1 ? ' node' : ' nodes')` | collapsed to ` 个半波长` and ` 个节点` | English plural branch in figure code (4.1) |
| ch06/6.1/figures.js | sim-photoelectric `unit: 'photons/s'`, `\\text{threshold}` subscripts | written `光子/s` and `\\text{阈}` | unit word in the language; a subscript wants the shortest form (4.7) |
| ch06/6.1/figures.js | sim-blackbody TeX `\\text{nm at}\\ \\kT` | written `\\text{nm，}\\kT` | "at" has no Chinese word that fits a TeX readout; the full-width comma separates the two quantities |
| ch06/6.1/text.html | #light (discharge tube), "low-pressure hydrogen gas" (span `gas`) | the span wraps 气 in 氢<span>气</span>, the element name staying outside | Chinese names hydrogen gas in one word 氢气; the span sits on the concept's own character as for 天然气 in chapter 1 (translate.md 3.3, the span stays in its block) |
| ch06/6.1/text.html | #rydberg, "an <span data-concept="empirical-formula-of-a-compound">empirical formula</span>" (Balmer series fit) | the span wraps 经验公式, while the glossary row of the concept is 实验式 | the source's span tags the chemistry concept, but the text means a formula fitted to data; 实验式 would mean the simplest formula of a compound (compound-formula sense), 经验公式 is the physics word |
| ch06/6.1/text.html | #standing-waves, spans `end-point` on "endpoints" of a string | the span wraps 端点, while the shared row end point is 滴定终点 | the source's span is the chemistry concept; the book means the two ends of a vibrating string, and 滴定终点 would be wrong |
| ch06/6.1/figures.js | sim-photoelectric hit-name, `'a photon of ' + nm + ' nm'` | becomes `nm + ' nm 的光子'` | English article and "of" phrase, Chinese word order (4.1) |

### ch06/6.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.2/text.html | #planetary-model, "The electrostatic <span data-concept="force">force</span>" | the span wraps 静电力 whole | the glossary row (chapter 21 shard) is 静电力, and the Chinese compound contains the concept word 力 (translate.md 3.3, the span stays in its block) |
| ch06/6.2/text.html | #energy-ladder "The lowest few <span>energy</span> levels", "from one <span>energy</span> level to another", the list item "(<span>energy</span> levels)", #features last paragraph "quantized <span>energy</span> levels" | the span wraps 能级 whole (energy level, glossary row of the chapter 7 shard) where the source wraps only "energy" | Chinese names an energy level in one word, 能级; the span cannot wrap only 能 |
| ch06/6.2/text.html | #energy-ladder, "<span>law</span> of conservation of <span>energy</span>" | written <span>能量</span><span>守恒定律</span>, the two spans in the other order | Chinese word order: 能量守恒定律; both spans stay in their block |
| ch06/6.2/text.html | #stationary-states, "the initial and final orbital <span>energies</span>" | one span on 能量 after 初始轨道和最终轨道的 | "initial and final orbital energies" is one noun phrase in Chinese, and the source has one span |
| ch06/6.2/text.html | #worked-examples, Example 6.5 solution, "The <span>wavelength</span> of a <span>photon</span> with <span>this energy</span>" | written 具有<span>这一能量</span>的<span>光子的波长</span> (the two type spans in the other order, the concept spans inside them kept) | Chinese puts the modifier "with this energy" before the noun phrase |
| ch06/6.2/text.html | #worked-examples, Example 6.5 solution, "in Electromagnetic Energy" | the title of section 6.1 written “电磁能”, with quotation marks | a reference to another section by its title; 电磁能 is the translated section title and a bare title reads as part of the sentence |
| ch06/6.2/text.html | #energy-ladder and #orbit-radius, citations "Figure 6.14", "Figure 6.15" | written 图 6.14, 图 6.15 | recorded once per book (translate.md 4.6) |
| ch06/6.2/text.html, ch06/6.2/section.json | data-original-caption, original_caption (Figure 6.14 + 6.15) | the markers "(Figure 6.14)" and "(Figure 6.15)" written （图 6.14）and （图 6.15） | the marker is a citation of a figure in prose (translate.md 4.6) |
| ch06/6.2/figures.js | `const pad = …` (new line before `IONS`) and the calls `pad(ion)` in the three headlines and the label 'the orbits n = 1 to 6 of ' + ion | a one-line helper adds the space between Chinese and a Latin ion name (He⁺, Li²⁺) and adds none before 氢 | the ion name is a string that is either a Chinese word (氢) or a Latin formula, and the space between CJK and Latin is the chapter-1 rule; the English sentence frame has no such need |
| ch06/6.2/figures.js | `IONS[0].name` | 'hydrogen' written '氢' | the name stands for the atom in headlines (在氢中) |
| ch06/6.2/figures.js | all headlines of sim-bohr-ladder, sim-orbit-rung, sim-series; the note of sim-bohr-ladder | the English frames "In ION the …", "A photon of X, which is …, is absorbed and the electron rises …" rewritten in Chinese word order with the same slots (在ION中，…; 一个波长为 X 的光子（属于…）被吸收，电子…) | English sentence frame cannot carry the slots in the same order |
| ch06/6.2/figures.js | `region(nm)` | 'violet light' … 'red light' written 紫光 … 红光 (the colour word plus 光 is built as `colour + '光'`), 'ultraviolet light' and 'infrared light' written 紫外光 and 红外光 | English "X light" built by concatenation; Chinese names these as 紫光, 紫外光 |
| ch06/6.2/figures.js | sim-series readout `small` line, `(cond ? 'The four visible lines … ; the' : 'The') + ' quotient …'` | the 'The' / 'the' branch ends become `cond ? '四条可见谱线，…；' : ''` followed by '商 … 是里德伯常量' | the English article collapses (translate.md 4.1) |
| ch06/6.2/figures.js | sim-series `where`, `nVis + ' in the visible'` … | written `nVis + ' 条在可见光区'`, 条在紫外线区, 条在红外线区 | English plural-free count phrase needs the measure word 条 |
| ch06/6.2/section.json | exercises e3 prompt, "a potential of 1 volt" | written 1 伏特的电势作用下 | unit named in Chinese in prose, symbol V is not printed in the source (translate.md 4.4) |
| ch06/6.2/figures.js | sim-series note, `'each line is one transition from the orbit n₂ written above it down to n₁ = ' + n1` | becomes `'每条谱线是从其上方标出的轨道 n₂ 落到 n₁ = ' + n1 + ' 的一次跃迁'` | the sentence frame carries the slot n1 in the middle; Chinese needs a closing phrase after it (4.1) |

### ch06/6.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.3/text.html | #de-broglie, #electron-interference, #uncertainty, "wave–particle duality" (span `wave` on "wave", 5 places) | the span wraps the whole compound 波粒二象性, where the source wraps only "wave" | Chinese names wave-particle duality in one word whose first character is 波; the span cannot wrap only 波 (translate.md 3.3, the span stays in its block) |
| ch06/6.3/text.html | #quantum-model, "three-dimensional stationary waves" (span `wave`) | the span wraps 驻波 | stationary wave is one Chinese word, 驻波 (shared with standing wave) |
| ch06/6.3/text.html | #quantum-model, "complex probability <span amplitude>amplitudes</span>" | written 复<span>概率幅</span>, the span wraps 概率幅 | the Chinese term for a probability amplitude is 概率幅; 振幅 (the shared row amplitude) would be a different quantity |
| ch06/6.3/text.html | #uncertainty, "Heisenberg’s <span uncertainty>uncertainty</span> principle", "…principle can be shown…" | the span wraps 不确定性 in 不确定性原理, while the quantities of the same span elsewhere are 不确定度 | the glossary fixes 海森伯不确定性原理 (不确定性) and the shared row uncertainty is 不确定度 |
| ch06/6.3/text.html | #shells, #subshells, #orientation, the `energy` spans on "energy levels" ("discrete <span>energy</span> levels", "from one <span>energy</span> level to another", "the <span>energy</span> levels for the same principal quantum number") | the span wraps 能级 whole | Chinese names an energy level in one word, 能级 (as in 6.2); the span cannot wrap only 能 |
| ch06/6.3/text.html | #subshells, #orientation, #spin, #pauli, `quantum-number` spans in 角量子数, 磁量子数, 主量子数, 自旋量子数 | the span wraps 量子数 only, after the qualifier 角, 磁, 主, 自旋 (one span, as in the source); in the bold name 角<span>量子数</span>（副量子数、角动量量子数） | the book's two names secondary and angular momentum are one Chinese term 角量子数, so the parenthesis carries the aliases (see the glossary row) |
| ch06/6.3/text.html | #electron-interference, sim-head 6.18 and #de-broglie sim-head 6.17: `data-ref` spans "the source", "the screen", "it" | written 电子源, 屏, 它 (the span wraps the noun phrase the Chinese needs: 电子源 for "the source") | Chinese cannot name "the source" or "the screen" by one bare word in the same place; 电子源 is the referent label |
| ch06/6.3/text.html | #electron-interference, Example 6.6 and #uncertainty, "a mass of 9.109 × 10^-28 g", "an uncertainty with a value of at least" | the type spans keep their place but the concept span moves with the Chinese word order (质量为 9.109 × 10⁻²⁸ g; 不确定度的值必须至少为) | Chinese word order |
| ch06/6.3/text.html | #worked-examples, Example 6.8 array `\text{orbital labeled}`, `\text{orbitals total}` | written `\text{个标记为}\;5s\;\text{的轨道}` and `25\;\text{个轨道（合计）}` | the English frame "N orbitals labeled X" has the label at the end; Chinese wraps it (个标记为 X 的轨道), the words inside \text{} are translated |
| ch06/6.3/text.html, ch06/6.3/section.json | #quantum-model "special distribution"; Example 6.7 "m can have values"; e3 key "m₁"; e14 ν for the velocity | the slips are kept as the book prints them: 特殊分布 (the book's "special" for spatial), `<em>m</em>`, `<em>m</em><sub>1</sub>`, ν; section notes translated, quoting the English words | an error of the book stays and its correction stays a correction (root item 13, translate.md 3.2) |
| ch06/6.3/text.html, ch06/6.3/section.json | "secondary (angular momentum) quantum number", "angular momentum or azimuthal quantum number" | written 角量子数（副量子数、角动量量子数） in the prose and the summary, and 角量子数（角动量量子数或方位量子数） in Table 6.1; later mentions 角量子数 alone | the two English names are one Chinese term (glossary row); the aliases are given once at the definition |
| ch06/6.3/text.html | #subshells, "followed by the f-, g-, and h- orbitals for l = 3, 4, and 5" | written 接下来是 f、g 和 h 轨道，分别对应 l = 3, 4, 5, the first two letters in one `<em>f、g</em>` | the English hyphen-suffix list "f-, g-, and h-orbitals" has no Chinese form; the emphasis count of the block is kept |
| ch06/6.3/text.html | #quantum-model, "represented by the Greek letter psi, ψ" | written 用希腊字母 psi（ψ）表示 | the name of the Greek letter is a sentence about letters; the Latin name kept in the sentence (4.3) |
| ch06/6.3/text.html | figure citations in the prose, table eyebrow, "(a)", "(b)" part labels | 图 6.16 to 图 6.23, 表 6.1, （a）（b）（c）; "in Electromagnetic Energy" written “电磁能”一节 | recorded once per book (4.6) |
| ch06/6.3/text.html, ch06/6.3/section.json | Figure 6.16 credit | （来源：改编自 Sukanto Debnath 的作品） | one credit formula for the book (chapter 1) |
| ch06/6.3/figures.js | sim-orbit-wave topline | `${cap(WORDS[k])} wavelength${k > 1 ? 's' : ''} of L pm fit the C pm orbit exactly…` rewritten `C pm 的轨道恰好容纳${WORDS[k]}个 L pm 的波长，…`; the non-whole branch likewise; `WORDS` becomes 零 to 八 and `cap` is no longer called | English plural branch and sentence frame (4.1), Chinese word order |
| ch06/6.3/figures.js | sim-double-slit topline | `${N} electron${N === 1 ? ' has' : 's have'} arrived.` becomes `已有 ${N} 个电子到达。` | English plural branch collapses (4.1) |
| ch06/6.3/figures.js | sim-de-broglie topline | the `q.name === 'electron' ? 'An' : 'A'` branch removed; the sentence reads `以 ${vs} 运动的${q.name}，其德布罗意波长为 …，${cmp}。`; `cmp` strings 约为原子大小的 N 倍 / 与原子的大小相当 / 比原子小约 N 倍; label `λ of the ${q.name}` becomes `${q.name}的 λ` | English article branch collapses (4.1); Chinese word order |
| ch06/6.3/figures.js | sim-radial topline | `radial node${nodes === 1 ? '' : 's'}` collapsed; ", at X and Y from the nucleus." becomes ，位于距原子核 X 和 Y 处。 | English plural branch and word order (4.1) |
| ch06/6.3/figures.js | sim-orbital-shapes readout and headline | `\\text{orbital${l ? 's' : ''}}` becomes `\\text{个轨道}`; "one of the ${WORDS[2l+1]} p orbitals" becomes `${name} 轨道，${WORDS[2 * l + 1]}个 ${sub.value} 轨道之一` | English plural branch collapses (4.1), Chinese word order |
| ch06/6.3/figures.js | sim-orbital-shapes, the orbital choice `aria` | `'the orbital of the ' + l + ' subshell'` becomes `l + ' 亚层的轨道'` | Chinese word order; the code shape differs (translation_parity reports it) |
| ch06/6.3/figures.js | sim-de-broglie `P` names | the particle names 'electron', 'proton', 'softball' written 电子, 质子, 垒球 and the comparison with 'electron' is dropped with the article branch | the display name is also the topline noun; the logic is unchanged |
| ch06/6.3/figures.js | sim-radial and sim-orbital-shapes `views` | 'side', 'above', 'along x/y/z' written 侧面, 上方, 沿 x 轴, 沿 y 轴, 沿 z 轴 | the view buttons are reader-visible labels |
| ch06/6.3/text.html | #electron-interference, display equation `\kE_{\text{final}}-\kE_{\text{initial}}` | the subscripts written `\text{f}` and `\text{i}` | a subscript wants the shortest form (4.7); `f` and `i` agree with the `n_{\text{f}}`, `n_{\text{i}}` of the same equation and with the `\kEf`, `\kEi` of 6.2 (review pass; 末/初 was dropped) |

### ch06/6.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.4/text.html | #notation, "(read “two–p–four”)" and "(read “three–d–eight”)" | rendered （读作“二–p–四”） and （读作“三–d–八”） | the spoken English reading of the notation 2p⁴ and 3d⁸ is a sentence about how the symbol is read aloud; the Chinese reading names the number and the letter in Chinese (translate.md 4.3) |
| ch06/6.4/text.html | #aufbau, "from the German word <em>Aufbau</em> (“to build up”)" | rendered 源自德语单词 <em>Aufbau</em>（“逐步构建”）, the wording the page's Figure 6.27 caption uses for "building up"; the German word stays in Latin letters in the `<em>` | a sentence about the origin of a German word, with no Chinese equivalent (translate.md 4.3); the term itself is 构造原理 |
| ch06/6.4/text.html | #hunds-rule, "the next <span energy>energy</span> level"; #after-argon, Example 6.10 "order of filling of the <span energy>energy</span> levels"; #periodic-table, "highest <span energy>energy</span> level orbitals" | the `energy-and-work` span wraps 能级 whole (下一个<span>能级</span>, 各<span>能级</span>, 最高<span>能级</span>的轨道) | Chinese names an energy level in one word, 能级, as in 6.2 and 6.3; the span cannot wrap only 能 |
| ch06/6.4/text.html | #periodic-table, "Main group elements (sometimes called representative elements)" | written 主族元素（有时也称为典型元素）; the span `main-group-element` sits on 典型元素 | the shared glossary renders main group elements and representative elements both as 主族元素, so 主族元素（有时也称为主族元素）would say nothing; the alias 典型元素 is the usual second name (collision, translate.md 4.5; pending row) |
| ch06/6.4/text.html | #notation list item 1, "the principal quantum shell, <em>n</em>" | written 主量子<span shell>电子层</span>的序号 <em>n</em> | Chinese has no word for the "principal quantum shell"; 电子层 is the shell and 主量子数 n numbers it (pending row) |
| ch06/6.4/text.html | #orbital-energies, "penetrating" and #after-argon "less penetrating" | written 钻穿能力较弱/减弱 with no span | the chemistry term for orbital penetration is 钻穿 (钻穿效应); the shared row penetration (穿透) belongs to radiation in chapter 21 (pending row) |
| ch06/6.4/text.html | #ions, Example 6.11 (e) | the book's stray "(e)." is kept as （e）. | an error of the book stays (translate.md 3.2) |
| ch06/6.4/text.html, ch06/6.4/section.json | figure citations in the prose, "(a)" to "(f)" part labels, sim-head eyebrows | 图 6.24 to 图 6.29, （a）…（f）; `Figure 6.24`, `Sim`, `Figure` eyebrows kept | recorded once per book (translate.md 4.6) |
| ch06/6.4/section.json | exercise e18 prompt, "the Agatha Christie mystery story “The Pale Horse.”" | written 阿加莎·克里斯蒂的推理小说《灰马酒店》 | a book title with a standard Chinese title (names of people and works keep the standard rendering, translate.md 2.7) |
| ch06/6.4/section.json | exercise e20 prompt, "Cobalt–60 and iodine–131" | written 钴–60 和碘–131, the en dash kept | the isotope names are written element-name plus mass number, as printed |
| ch06/6.4/section.json | exercises e14 options "Both Mg and S", "Both Si and S." | written Mg 和 S 都是, Si 和 S 都是。 | the English "Both … and …" has no Chinese frame without a predicate; the stray final full stop of the last option is kept as 。 |
| ch06/6.4/figures.js | sim-aufbau `un` (the unpaired-electron phrase) | `u === 0 ? 'no unpaired electrons' : u === 1 ? 'one unpaired electron' : u + ' unpaired electrons'` becomes `u === 0 ? '没有未成对电子' : '有 ' + u + ' 个未成对电子'`; the same `un` serves the readout (`'实测基态' + un + '。'`) | English singular/plural branch collapses to one Chinese form (4.1) |
| ch06/6.4/figures.js | sim-aufbau exception headline | `(cnt === 1 ? 'one electron goes' : cnt + ' electrons go')` becomes `'有 ' + cnt + ' 个电子进入'`; ` and ` in `dst.join` and `src.join` becomes ` 和 `; the sentence is rewritten in Chinese order with the same slots (`abbr(Z, pred)`, `dst`, `src`, `abbr(Z, obs)`) | English plural branch and sentence frame (4.1) |
| ch06/6.4/figures.js | sim-periodic `where`, `kind`, `rule`, topline | `'period ' + p + ', group ' + g` becomes `'第 ' + p + ' 周期、第 ' + g + ' 族'`; the three `kind` strings (`a main group element` …) become 主族元素, 过渡元素, 内过渡元素 and the two comparisons `kind === …` that look them up follow them; the topline reads `<name>位于<where>，属于 s 区，是<kind>。`; the `rule` sentences are rewritten in Chinese order | the `kind` string is also the lookup key in the code (as in 1.4); English "stands in … and is a …" and the articles have no Chinese frame (4.1) |
| ch06/6.4/figures.js | ELS, the 118 element names | the English names become the Chinese element names of 化学元素名称 (氢 … 鿫); `NAME` is only displayed (hover name, headline, chosen square) | element names are the authority's (translate.md 2.7) |
| ch06/6.4/text.html | #periodic-table, spans `f-block-element` on 内过渡元素 | the span wraps 内过渡元素, while the book concept `f-block-element` has no glossary row of its own | the shard row inner transition elements is 内过渡元素; the concept name is still untranslated in the shared tables (chapter 7 shard note) |

### ch06/6.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.5/text.html | #ionization-energy, "than <span data-type="energy">that</span> of beryllium"; #ie-exceptions, "than <span data-type="energy">that</span> for nitrogen" | the pronoun span is written on a repeated noun: 铍的<span>电离能</span> (#ionization-energy) and 氮的<span>第一电离能</span> (#ie-exceptions) | Chinese has no pronoun for "that of", it repeats the noun (or drops it); the span stays in its block and keeps its `energy` type |
| ch06/6.5/text.html | #ionic-radii, "the sulfide anion"; #electron-affinity, "a fluoride anion (F–)"; #reactivity, "fluorine anions" | the `anion` span wraps the whole compound: <span>硫离子</span>, <span>氟离子</span>, <span>氟离子</span> | Chinese names the anion in one word (硫离子, 氟离子, shared row sulfide ion); the span cannot wrap only "anion" (translate.md 3.3, as ch01 wraps whole compound names) |
| ch06/6.5/text.html | #periodic-properties, #covalent-radius, #effective-nuclear-charge, #ionic-radii, #electron-affinity, "principal <span data-concept="quantum-number">quantum number</span>" | written 主<span>量子数</span> | the span keeps the same words as the source (quantum number); 主 is the English "principal" and stays outside |
| ch06/6.5/text.html | #effective-nuclear-charge, display equation `Z_{\text{eff}}=Z-\text{shielding}` | `\text{shielding}` becomes `\text{屏蔽}`; the subscript `\text{eff}` is kept as the abbreviation the prose also keeps (<em>Z</em><sub>eff</sub>) | an abbreviation of a symbol, not a word of the sentence |
| ch06/6.5/text.html | #effective-nuclear-charge, Example 6.12, "(Note: Fl is the symbol for flerovium, element 114, NOT fluorine)" | written （注：Fl 是𫓧的元素符号，𫓧是第 114 号元素，并非氟）; capitals of NOT become 并非 | Chinese has no capitals for emphasis; 𫓧 is the shared glossary row flerovium (ch18) |
| ch06/6.5/text.html, ch06/6.5/section.json | figure citations in the prose, （a）（b） part labels and （图 6.31）-style labels in the original captions; table eyebrows | 图 6.30 to 图 6.35; （a）（b）; （图 6.31）; 表 6.2, 表 6.3; the `Figure 6.30`, `Figure 6.31 + 6.33`, `Sim`, `Figure` eyebrows kept | recorded once per book (translate.md 4.6) |
| ch06/6.5/figures.js | sim-successive `WORD`, `ORD` and the headline, `n > 1 ? 's' : ''` | `WORD = ['', '一', '两', '三', '四', '五']`, `ORD = ['', '第一', …, '第五']`; the plural branch is dropped; the headline reads `钾有一个价电子，所以它的电离能在第一次电离之后跃升：$\kIE_{2}$ 是 $\kIE_{1}$ 的 7.29 倍。` | English plural branch and ordinal words (4.1); the sentence is in Chinese word order with the same slots (`BY[s].name`, `WORD[n]`, `ORD[n]`, n + 1, n, ratio) |
| ch06/6.5/figures.js | sim-successive hover name, `ORD[i + 1] \|\| (i + 1) + 'th'` | `${name}的${ORD[i + 1] \|\| '第 ' + (i + 1) + ' '}电离能，…` (钾的第一电离能 … 钾的第 6 电离能) | the English ordinal suffix `th` has no Chinese form; the fallback keeps the number (4.1) |
| ch06/6.5/figures.js | sim-halogen-radii headline and hover names | `The ${s}–${s} distance is … so the covalent radius of ${name} is … pm.` written `${s}–${s} 距离为 … pm，所以${name}的共价半径为 … pm。`; `a ${name} atom` becomes `${name}原子` | Chinese word order; English article dropped (4.1) |
| ch06/6.5/figures.js | sim-trends-graph headline, `verb`, `cut` | `falls`/`rises` become 减小/增大 and the sentence is `在第 N 周期中，从 X 到 Y，…，半径由 a pm减小到 b pm。`; `cut` becomes `，此处半径曲线止于 Z = N` | Chinese word order of the same slots (4.1) |
| ch06/6.5/figures.js | sim-ions hover name | `an atom of ${word}` / `the aluminum ion` / `the sulfide ion` become `${word}原子` / `铝离子` / `硫离子` | English "an atom of", the articles and the genitive have no Chinese form (4.1); 铝离子, 硫离子 are shared rows (ch02) |
| ch06/6.5/figures.js | sim-ions protons and electrons line | `${Zp} protons, ${e} electrons` becomes `${Zp} 个质子，${e} 个电子` | plural nouns collapse to one Chinese form with the measure word 个 (4.1) |
| ch06/6.5/figures.js | `ELEMENTS`, the 88 element names | the English names become the Chinese element names of 化学元素名称 (氢 … 镭); the hover names, the halogen choice and the headline use them, `.toLowerCase()` stays in the code and changes nothing | element names are the authority's (translate.md 2.7) |
