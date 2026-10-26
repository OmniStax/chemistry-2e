# Log: 化学（第2版）

### Pass 1 (2026-10-26): scaffold

The folder was made by `omnistax-content/tools/scaffold_translation.py` from
`Chemistry 2e` at commit 0372b084ab32e816bf7d637790e596f0e5fd5209, chapters ch01. Nothing is translated yet: every
file is the source's, `book.json` carries `language` zh-CN, `translation_of`
and `translation` (claude-sonnet-5-5, medium). The humanizer review is deferred to the owner.

### Pass 2 (2026-10-26): glossary and book-level labels (claude-sonnet-5-5, medium)

Written: `glossary.zh-CN.json` with 239 rows (authorities: termonline, cnterm-chemistry, cnterm-physics, gb3100, jjf1001, book): the 84 chapter 1 concepts' names and terms, the 31 type labels, the 3 exercise kinds, the 12 sheet titles, the book, chapter and 6 section titles, the book's apparatus labels, and the other vocabulary of the seven pages (units, element names, properties, apparatus words). Book level, through `scaffold_translation.py labels`: the book title 化学（第2版）, 31 type labels, 3 exercise kind labels, 12 sheet titles and the chapter 1 title 基本概念 (48 labels). Through `ost set`: the `name`, `terms` and `statement` of the 84 chapter 1 concepts, the 6 section titles and the 12 `variables` meanings of `ch01/chapter.json`. Concepts of the other chapters stay English (`translation-notes.md`). `section.json` (titles of the pages themselves), `text.html` and `figures.js` are not touched: they are the section agents' pass.

termonline: reachable through `termonline.py` (slow, one to three terms a minute). About 115 terms were looked up. Of the 239 rows, 63 carry a termonline entry URL, 63 carry `"confirm": "termonline"` (no exact entry returned, or not looked up in this pass), 42 carry `"confirm": "owner"` (the book's own labels). Pending rows: none.

Checker: `ost check chemistry-2e-zh-cn` cannot see the book in this environment because the checker's directory walk does not follow the `Chemistry 2e` symlink (it reports no book with that id); the same checker was run with `OMNISTAX_CONTENT_DIR=/home/user OMNISTAX_BOOKS=chemistry-2e-zh-cn npm run check:content` and reports "1 chapters, 6 sections, 1 introduction or summary page, 30 checks, no errors, 35 warnings". The 35 warnings are the elements sheet's section references to chapters not yet added, the 12 sheet files whose `title` is still English, and two non-numeric cells in the source's `water` and `ksp` sheets; the 1,090 notes are the "waits on section" lines of the other chapters' concepts.

The humanizer review is outstanding for the owner.
