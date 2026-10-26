# Forced scenarios, 1.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.2/figures.js | sim-electrolysis, the three count lines | `(12 - n === 1 ? '' : 's')`, `(h2 === 1 ? '' : 's')`, `(o2 === 1 ? '' : 's')` collapsed to `''` in both branches; the nouns written ` 个水分子`, ` 个氢分子`, ` 个氧分子` | English plural branch in figure code (4.1) |
| ch01/1.2/figures.js | `namer`, `water3`, `diatomic3`, `flat`, `build` | the hover name `NAME[sym] + ' atom of ' + of` becomes `NAME[sym] + '原子，属于' + of` (氢原子，属于氢分子 H₂); the `of` strings (`a hydrogen molecule, H₂` …) have their article dropped (氢分子 H₂) | English "a/an … of …" built by concatenation (4.1) |
| ch01/1.2/figures.js | sim-states, `NAMES` | `solid/liquid/gas` written 固态/液态/气态 (states) where the glossary has 固体/液体/气体 (substances); the headline `the water as a ` + state written `水处于` + state | the array names the state of the sample, not a body of matter; Chinese needs 态 for the state (4.1) |
| ch01/1.2/figures.js | sim-conservation, readout | subscripts `\text{before}` and `\text{after}` written `\text{前}` and `\text{后}` | a subscript wants the shortest form (4.7) |
| ch01/1.2/text.html | atoms-molecules, spider-web paragraph | "a dime" written 一角硬币, "a football field" 足球场 | cultural reference, translated for meaning (4.4) |
| ch01/1.2/text.html | atoms-molecules, lead atoms paragraph | "300 trillion" written 300 万亿 (the Chinese number word for 3 × 10^14); 3 × 10^14 kept | Chinese counts in 万 and 亿 (4.4) |
| section.json | e17 prompt and solution | "one pound" written 一磅 (the unit has no symbol in the source); "350 °F" kept | unit without a symbol takes the target name (4.4) |
| ch01/1.2/text.html | pure-substances, conservation, everyday-life | a `data-concept` span for a compound-name term (oxide, acid, sulfate) wraps the whole Chinese compound name (氧化汞(II), 氧化铅, 硫酸, 硫酸铅, 氧化铟锡, 聚环氧乙烷) | Chinese names the compound in one word; the span cannot wrap only "oxide" (3) |
| ch01/1.2/text.html | mass-weight, "the force of gravity changes" | `重力<span data-concept="force">作用力</span>`; the span stays in its block | Chinese has no word for "the force" apart from 重力, which is itself the force (3) |
| ch01/1.2/text.html | pure-substances, "Free sodium, an element that is …" | written 游离的钠（一种<span>元素</span>，是…金属固体）和游离的氯（一种<span>元素</span>，是…气体） | keeps both `element` spans and the sentence; the relative clause becomes a parenthesis (3) |
