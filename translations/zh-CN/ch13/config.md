# Config: 化学（第2版）, Chapter 13 (translation)

The translation pass of `Chemistry 2e` chapter 13 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch13, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added as pending |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` and `notes-ch13.md`
carry the same entry.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M` and `Sim` kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose (图 13.1 to 图 13.9, 12 places) | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch13/13.1/text.html, ch13/13.3/text.html | photo credits (Figure 13.4 of 13.1, Figure 13.8 of 13.3) | （来源：http://images-of-elements.com/bromine.php）, （来源：改编自 “D Coetzee”/Flickr 的作品） | the credit formula of chapter 1; the URL and the names stay as printed (translate.md 5) |
| ch13/13.2/section.json, ch13/13.4/section.json | `answer.parts[].part` (13.2 cyl3 and e25, "(a) Q…"; 13.4 cyl4–cyl6, e74, e76, e78, e84, e88, "pressure of H₂S", "pressure of NO" …) | kept as printed | translate.md 5 keeps `answer.parts[].part` byte for byte; owner to decide whether it becomes translatable (as ch01 1.4 and 1.6) |
| ch13/13.4/section.json | exercise e86 prompt (d), "28 torr" | unit kept as `torr` | unit symbol kept as printed (translate.md 5) |

### ch13/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/intro/text.html | `the forward and reverse <span data-concept="reaction-rate">reaction rates</span>` | written 正反应和逆<span>反应速率</span>; the span wraps 反应速率 only | Chinese shares 反应速率 across 正 and 逆 (正反应和逆反应速率); the concept word stays in one span |

### ch13/13.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.1/figures.js | `topline` of Figure 13.2: `pl(nS, 'N_{2}O_{4} has', 'N_{2}O_{4} have')`, `pl(nJ, 'pair', 'pairs')`, `nJ === 1 ? 'has' : 'have'` | collapsed to one Chinese form: `nS + ' 个 N_{2}O_{4} 已分裂，' + nJ + ' 对 NO_{2} 已结合'`; the helper `pl` stays in the code, unused | English singular/plural and has/have agreement (4.1) |
| ch13/13.1/text.html | sim-head of Figure 13.2: spans `forward` and `reverse` in "the rates of the forward and reverse reactions" | the spans wrap 正 and 逆 in "正、逆反应的速率" | Chinese shares 反应 between the two adjectives; the span stays in its block (3.3) |
| ch13/13.1/text.html | spans `its` (`n2o4`, `no2`) in "its concentration" | spans wrap 其 | the pronoun is kept as a span on the referent |
| ch13/13.1/text.html | Figure 13.3 alt "juggling pins" and caption "clubs" | both written 杂耍球棒 | Chinese uses one word for juggling pins and clubs |
| ch13/13.1/text.html | Figure 13.4 caption `(credit: http://images-of-elements.com/bromine.php)` | （来源：http://images-of-elements.com/bromine.php） | credit formula of chapter 1; URL kept |
| ch13/13.1/text.html | Figure 13.2 and the liquid-bromine paragraph, span `liquid` | the span wraps 液态 | the state of the sample, as in ch01/1.2 and the 13.2 row; the glossary row liquid is the body of matter 液体 |

### ch13/13.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.2/text.html | #coupled, "two or more *coupled* equilibrium reactions" (span `coupled-equilibrium`) | written 涉及两个或多个相互关联的平衡反应: the span wraps 相互关联的 and the next span `chemical-equilibrium` wraps 平衡: `<em><span>相互关联的</span></em><span>平衡</span>反应` | a single reaction is not 多重, so the adjective "coupled" is rendered 相互关联的 (the noun 多重平衡 stays the glossary term); the source wraps "coupled" and "equilibrium" in two spans, both kept in place (3.3); review pass |
| ch13/13.2/text.html | #quotient, "stoichiometry of the balanced equation" (spans `stoichiometry`, `balanced-equation`) and #coupled, "stoichiometric coefficients" (span `coefficient`) | 化学计量 wrapped and 关系 left outside the span; 系数 wrapped inside 化学计量系数 | the glossary has 化学计量关系 and 化学计量系数 as compounds; the source spans wrap only "stoichiometry" and "coefficients" (3.3) |
| ch13/13.2/text.html | #homogeneous, "either liquid or gaseous phases" (span `liquid`) and "R is the gas constant" (span `gas`) | the span wraps 液态 in 液态或气态的相, and 气体 inside 理想气体常数 | Chinese says 液态 for the state of a body of matter (as in ch01/1.2) and 理想气体常数 is one compound (glossary row gas constant); the span stays in its block |
| ch13/13.2/text.html, ch13/13.2/section.json | Example 13.5 equations, Check Your Learning e25 (a) to (d): `0.50\;\text{at}\;400 °C` and the three like it | `\text{at}` written `\text{（}400\;^\circ\text{C}\;\text{时）}`, read `K_c1 = 0.50（400 °C 时）` (e25: `K_c = 0.50（400 °C 时）`); the same form on 13.3 and 13.4; the first record said `\text{，温度}`, which is not what the text had; review pass | "K = 0.50 at 400 °C" cannot be put word for word into Chinese; the numbers, the TeX around the `\text{}` and the unit stay as printed (3.5, 4.4) |
| ch13/13.2/figures.js | Figure 13.6 `topline`: `Mixture ${m} starts with $\kQc$ ${dir} $\kKc$, so it reacts in the ${way} direction.` with `dir` 'below'/'above', `way` 'forward'/'reverse' | template rewritten in Chinese word order with the same slots: `混合物 ${m} 起初的 $\kQc$ ${dir} $\kKc$，所以它沿${way}反应。`, `dir` 小于/大于, `way` 正向/逆向 | English sentence frame with adverb slots cannot carry the same order in Chinese (4.1) |
| ch13/13.2/figures.js | Figure 13.6 `${fmt(pr.v, 0)}% of the way` | written `已完成 ${fmt(pr.v, 0)}%` | idiom "of the way" translated for meaning (4.4) |
| ch13/13.2/figures.js | sim-magnitude-k `topline`: `${pct}% of the NO_{2} has become N_{2}O_{4}.` | `$K_c = …$ 时，${pct}% 的 NO_{2} 已变成 N_{2}O_{4}。`, the clause moved after the K slot | English "At K = …, x% of the … has become …" cannot keep its order in Chinese (4.1) |
| ch13/13.2/section.json | e21 solution: "homogenous" | written 均相 | the book misspells "homogeneous" in this answer; the misspelling has no Chinese counterpart (4.3), the answer is otherwise as printed |
| ch13/13.2/section.json | e9, e10, e12 prompts: the full stop inside `$…(aq).$` before "Is" / "KI<sub>3</sub> is composed of …" | the stop inside the math is dropped where the Chinese sentence goes on (`$…(aq)$ 表示的反应的平衡常数表达式`) and written 。 at the end of the Chinese sentence | the stop is English sentence punctuation placed inside the TeX; the TeX itself is unchanged (3.5) |

### ch13/13.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.3/figures.js | sim-le-chatelier, `phrase` (`${word} is added/removed`, `the volume is cut to a third`, `the mixture is heated/cooled to … °C`) | rebuilt in Chinese word order with the same slots: `加入/移出 ${word}`, `体积缩小为原来的三分之一`, `混合物被加热/冷却至 … °C`; the `n > 0 ? … : …` and `st.T > R.T ? … : …` branches kept | English passive "is added / is removed / is heated / is cooled" is built by concatenation (4.1) |
| ch13/13.3/figures.js | sim-le-chatelier, headline `Adding/Removing ${word} makes …` and `shifts right/left` | `${n > 0 ? '加入' : '移出'} ${word} 使 … ，平衡向${right ? '右' : '左'}移动。` | English gerund subject and adverb "right/left" become Chinese verb and direction word (4.1) |
| ch13/13.3/figures.js | sim-le-chatelier, final headline: `list(a)` ("A and B", "A, B and C"), `more X`, `less Y`, `a larger/smaller/the same K` | `list` joins with 、 and 和; `more X` becomes `X 更多`, `less Y` `Y 更少`, joined with ，; `kk` becomes `$K$ 变大 / 变小 / 不变`; the sentence is reordered to `平衡重新建立后，与之前相比，… ；$K$ …。` | English "and", comparatives and article phrases built by concatenation (4.1) |
| ch13/13.3/text.html | Equation `K_c = 50.0 at 400 °C`, `\text{at}` | `\text{（}400\;^\circ\text{C}\;\text{时）}`, read `K_c = 50.0（400 °C 时）` like 13.2 and 13.4 (review pass; was `\text{在}…\text{时}`) | Chinese says 在 … 时 around the condition; the addition is the other half of the preposition "at" |
| ch13/13.3/text.html | rate laws `forward\;…` and `reverse\;…` (display math, the words are outside `\text{}`) | kept as printed | translate.md 5 keeps all LaTeX outside `\text{}`; the two English words stay visible in the equation (owner to decide whether to wrap them in `\text{正向}` / `\text{逆向}`) |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, spans `carbonate` (calcium carbonate), `acid` (sulfuric acid), `hydrogen-carbonate` (hydrogen carbonate), `ion` (hydrogen ions) | the span wraps 碳酸 inside 碳酸钙, 酸 inside 硫酸, 碳酸 (the glossary target of hydrogen carbonate), and 离子 inside 氢离子 | the glossary names the compounds as single words (碳酸钙, 硫酸, 氢离子) while the source wraps one English word of each; the span stays in its block (3.3) |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, 2nd paragraph: "reacting to produce **hydrogen carbonate**, a weak acid" (span `hydrogen-carbonate`) | written 生成<span>碳酸</span>，这是一种弱酸; the ion that follows is 碳酸氢根离子 (intro alt too) | the book calls H₂CO₃ "hydrogen carbonate", a misnomer with no Chinese counterpart; the compound is written by its name 碳酸 (a departure from translate.md 3.2, recorded here), the anion HCO₃⁻ 碳酸氢根离子. The span's concept `hydrogen-carbonate` is 碳酸氢盐 in 18.6, so its hover opens a different term; the span stays in place (3.3); review pass |
| ch13/13.3/text.html | #haber, "at low temperatures" (three places) and span `temperature` | written 在低温下 / 低温有利于 / 低温下的; the span wraps the whole 低温 | Chinese says 低温, not 低温度; the span stays in its block, as 高温 in 13.4 (3.3); review pass |
| ch13/13.3/text.html | #temperature, spans `temperature` ("temperature-dependence") and `exothermic-and-endothermic` ("endothermic", "exothermic") | the span wraps 温度 in 温度依赖关系 and 吸热的 / 放热的 (with 的) | the Chinese compound and the glossary adjective forms |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, "flat" | written “跑气” | idiom for a drink that has lost its carbonation, translated for meaning (4.4) |
| ch13/13.3/text.html | #haber, "two billion pounds" | 二十亿磅 | Chinese counts in 亿; the unit has no symbol in the source, so it takes its name 磅 (glossary row pound; 4.4) |
| ch13/13.3/section.json | notes: the sentence about "Le Chatelier’s principle" written once without its accent | the English form kept in quotation marks inside the Chinese sentence | a sentence about English spelling (4.3) |
| ch13/13.3/text.html | spans `reaction-rate` ("rates", "rate", "rate of the forward reaction", "rate of this reaction") and `partial-pressure` ("pressures", "pressure") | the spans wrap 速率, 正反应的速率, 逆反应的速率, 这个反应的速率 and 压强; the glossary targets are 反应速率 and 分压 | the source wraps the bare word "rate" or "pressure" in these places, and the Chinese keeps the word the sentence uses (速率 alone, 压强 alone); the span stays in its block, the concept word is inside it (3.3) |
| ch13/13.3/text.html | spans `dissolved` ("dissolved carbon dioxide", "dissolved CO₂") | the span wraps 溶解的 | glossary row dissolved is 溶解的; recorded because the verb row dissolution is 溶解 and the lone 溶解 appears in the displayed equation |

### ch13/13.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.4/text.html | Example 13.8, "at high temperatures" (span `temperature`) | the span wraps 高温 in 在高温下 | Chinese says 高温 where English says "high temperatures"; the compound holds the concept's word, as 室温 and 体温 in chapter 1 (3.3) |
| ch13/13.4/text.html | Example 13.8, "Nitrogen oxides" (span `oxide`) | the span wraps the whole compound name 氮氧化物 | Chinese names the compound in one word; the span cannot wrap only "oxides" (3.3; as 氧化汞(II) in chapter 1) |
| ch13/13.4/text.html | Example 13.7, "iodide ions", "triiodide ions" (span `ion`) | the span wraps 离子 inside 碘离子 and 三碘离子 | glossary names the ions as single words (碘离子, 三碘离子) while the source wraps the one word "ions" (3.3) |
| ch13/13.4/text.html | Example 13.8 prompt, `${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\rightleftharpoons 2\text{NO}(g),$` | the comma inside the TeX is dropped; the Chinese sentence goes on with 的 | the comma is English sentence punctuation placed inside the math, as the full stops of chapter 13.2 e9, e10, e12 (3.5) |
| ch13/13.4/section.json | `\text{at}` in `K_c = 0.50 at 400 °C` (e64), `K_c = 4.90 × 10^2 at 550 °C` (e68), `K_P = 4.08 × 10^−25 at 25 °C` (e70), `K_c = 50.2 at 448 °C` (e79) | `\text{at}` written `\text{（}T\;\text{°C}\;\text{时）}` (or the `{}^{\circ}` form), read `K_c = 0.50（400 °C 时）`, the numbers and the TeX around it as printed; review pass (the first record said `\text{，温度}`) | "K = 0.50 at 400 °C" cannot be put word for word into Chinese; the same solution as ch13/13.2 (3.5, 4.4) |
| ch13/13.4/text.html | Example 13.10, `\text{3 sig. figs.}`, `\text{2 sig. figs.}` | `\text{3 位有效数字}`, `\text{2 位有效数字}` | the English abbreviation "sig. figs." inside `\text{}` is spelled out in Chinese (4.3) |
| ch13/13.4/figures.js | sim-small-x, topline | `$x$ is P% of [A]i, and the approximation … puts $x$ Q% too high.` rebuilt as `$x$ 是 [A]i 的 P%，近似 … 使 $x$ 偏高 Q%。` with the same slots | English "X is P% of Y … puts x Q% too high" cannot keep its word order in Chinese (4.1) |
| ch13/13.4/figures.js | sim-small-x, hover names `x = … M, the positive root of the quadratic`, `x cannot exceed … = … M` | `x = … M，一元二次方程的正根`, `x 不能超过 … = … M` | English clause order; the slots stay (4.1) |
| ch13/13.4/figures.js | sim-small-x, readout small line `If $x \ll c$, then $x \approx …$ = … M.` | `若 $x \ll c$，则 $x \approx …$ = … M。` | if/then clause (4.1) |
| ch13/13.4/text.html | spans inside one block (#changes, #calc-k, #missing, #initial, Examples 13.7–13.10, sim-head) | a few spans stand in a different order from the source inside their paragraph (e.g. 反应物和产物的平衡浓度 for "equilibrium concentrations of the reactants and products") | Chinese word order; no span leaves its block, and the id and concept multisets are equal (3.3) |
