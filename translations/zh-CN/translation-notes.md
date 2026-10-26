# Translation notes: 化学（第2版）

Every forced scenario of the translation of `Chemistry 2e` into zh-CN
(`docs/prompts/translate.md` item 4), and anything else the owner should see: one entry per
place, with the file, the span or line, what was done and why.

| File | Span or line | What was done | Why |
|---|---|---|---|

## Other things for the owner

Pass 2 (glossary and book-level labels, 2026-10-26, claude-sonnet-5-5, medium). No forced scenario has arisen yet, so the table above is empty.

- **Concepts of other chapters stay English.** Only the 84 concepts of chapter 1 have a Chinese `name`, `terms` and `statement`; the other 1,090 concepts of `book.json` are the source's, as `translate.md` item 5 says, and are translated with their chapters. The checker's "waits on section" warnings are those rows.
- **Owner-confirm labels** (`"confirm": "owner"` in the glossary, no authority covers them): the book title 化学（第2版）; the apparatus labels Check Your Learning 学习检测, Link to Learning 学习链接, Chemistry in Everyday Life 日常生活中的化学, Portrait of a Chemist 化学家小传, How Sciences Interrelate 各门科学如何相互联系, Learning Objectives 学习目标, Key Concepts and Summary 关键概念与小结, Key Equations 关键方程式, Chemistry End of Chapter Exercises 化学章末习题, Example 例, Solution 解, Answer 答案, Strategy 思路, Discussion 讨论; the exercise kinds 习题 and 模拟习题; the chapter title 基本概念 and the six section titles; the twelve sheet titles; the page titles 引言 and the chrome words 图, 表, 模拟.
- **termonline was reachable** (headless Chromium through `termonline.py`), but slow (one to three terms a minute), so about 115 terms were looked up and the rest of the 63 rows flagged `"confirm": "termonline"` were not. Of those looked up, a few come back with no exact entry under the English term (gas, mixture, homogeneous and heterogeneous mixture, metal, periodic table, liter, chemistry, chemical property); their targets are the standard textbook terms and stay flagged until someone confirms them on the site.
- **Decisions that differ from, or sit beside, the authority.** `weight` 重量 follows 物理学名词 (the sibling physics book renders the physical quantity as 重力); `states of matter` 物态 (物理学名词) instead of 物质状态; `pressure` 压强 (物理学名词 lists 压强 and 压力, chemistry books write 压力); `metalloid` 半金属 (化学名词) against 类金属 (物理学名词); `conversion factor` 换算因子 (化学名词) against the 换算因数 of GB 3102; `law of conservation of matter` 物质守恒定律 keeps the book's word matter, where termonline lists 质量守恒 (质量守恒定律 is the textbook name); `rounding` 修约 (GB/T 8170), which termonline does not list; `factor-label method` 因子标记法, for which no standard Chinese name was found (a literal rendering); `alchemy` 炼金术, where 化学名词 lists 金丹术; `acidity` 酸性 (property), where 酸度 is the degree of acidity.
- **Collision matter / substance.** Both are 物质 in the authority (物理学名词 lists `substance, matter` under one entry). The book separates them only through `pure substance` 纯净物 (termonline lists 纯物质, 电力名词 only), so the pure substance is the qualified form; the rest is left to context.
- **Phase / state.** Section 1.2's title says phases; the text says states. 相 for phase and 物态 for state of matter are kept apart; the term 相 was not found in termonline and is flagged.
- **Type `equilibrium-constant`** has `dimension` "none" (a word), but the type belongs to a later chapter's staging, so `ost` will not write it from chapter 1; it is to be set to 无 with Chapter 13.
- **Sheets.** The twelve files under `sheets/` still carry their English `title`; the checker warns that each differs from the book's listed Chinese title. Translating the files is outside this pass.
- **Introduction page** (`ch01/intro`) title and the section prose are for the section agents.
