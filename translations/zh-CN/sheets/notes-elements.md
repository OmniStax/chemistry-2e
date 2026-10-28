# Notes: sheet elements (Appendix A)

| Sheet | Cell | What was done | Why |
|---|---|---|---|
| elements | `title`, `source` | title 元素 (as book.json lists); `source` translated, units kJ/mol and pm kept | reader-visible prose |
| elements | `elements[].name` (118) | Chinese element names of 化学元素名称, identical to the ch06/6.4 `ELS` list (氢 ... 鿫, Rf 𬬻 ... Og 鿫) | element names are the authority's; no suffix 气 |
| elements | `category`, `classification`, `state` (all 118) | kept in English | they are `z.enum` values in `omnistax-web/src/lib/content/sheets.ts` (ELEMENT_CATEGORIES/CLASSES/STATES) and keys of the colour maps in `lib/sheets/elements.ts`; translating them would fail validation and break the colouring. `Elements.svelte` prints `e.category`, `e.state`, `e.classification` raw (lines 218, 227, 228, 247, 249), so the reader sees English there: an app change (an i18n label map) is needed; the targets, if wanted: alkali metal 碱金属, alkaline earth metal 碱土金属, transition metal 过渡金属, post-transition metal 后过渡金属, metalloid 半金属, nonmetal 非金属, halogen 卤素, noble gas 稀有气体, lanthanide 镧系元素, actinide 锕系元素, metal 金属, solid 固体, liquid 液体, gas 气体, unknown 未知 |
| elements | `block` (s/p/d/f), `configuration` | kept | enum identifier and orbital notation |
| elements | search (`Elements.svelte`/`elements.ts` matches `name.toLowerCase().startsWith`) | none | Chinese names match by prefix as typed; the page has no English-name search left |
