# Plan: Preface (m68662)

Source: `source.md` (converted from CNXML). Status: built 2026-09-12 as
the book's own introduction, in the one job that builds the whole of
Chapter 1, without a review stop, on Chen's instruction; the plan is left
here for review after.

## What the page is

The book's Preface, kept as a page of its own beside the chapters and
listed before Chapter 1, as root rule 21 asks. It is OpenStax's welcome
and its account of the publisher, the licence and the errata process,
the book's coverage and scope, the changes of the second edition, the
three feature boxes (Chemistry in Everyday Life, How Sciences
Interconnect, Portrait of a Chemist), the art program, the Link to
Learning feature, the worked examples and their Check Your Learning, the
answer key, the student and instructor resources, the Community Hubs,
the technology partners, and the authors and reviewers. The book prints
no learning objectives, no summary, no glossary and no exercises here,
so the page carries none of them, and it has no lead, since nothing is
written in the book's place. Its module and slug are the `intro` record
of `book.json` (m68662, `preface`).

The module is twenty titled sections nested three deep (About OpenStax
resources holds Customization, Errata and Format; About Chemistry 2e
holds Coverage and scope through Answers to Questions in the Book;
Additional resources holds the student and instructor resources, the
Community Hubs and the technology partners; About the authors holds the
three author lists). The page mirrors that nesting with `<section id>`
blocks, one per title, so that a reader can fold a group and its parts
together, and every title is an `<h2>` in the book's own wording and
its own capitalisation, the header the app's explorer and fold read.
The ids are the titles in kebab case: `about-openstax`,
`customization`, `coverage-and-scope`, `comprehensive-art-program`,
`reviewers`, and so on; the welcome paragraph before the first title
sits in a `welcome` section of its own. The four italic paragraph leads
of the second-edition changes stay `<em>`, the three feature boxes and
the three kinds of interactive stay lists, and the author and reviewer
lists, which the CNXML sets one name per line with `<newline>`, keep
their line breaks as `<br>`; the converter drops those elements, so the
breaks are written from the CNXML. The one link the book writes into a
sentence, to the Community Hubs, is kept.

## The figure

The Comprehensive art program section prints seven images with no
number and no caption, one from each of seven chapters (the cotton and
cellulose of 1.2, the Rutherford apparatus of 2.2, the hydrochloric
acid solution of 4.2, the d orbitals of 6.3, the alkanes of 20.1, the
face-centered cubic cell of 10.6 and the alpha decay of 21.3), as a
sample of what the program draws. They are kept, since the one sentence
of the passage is about them and root rule 21 keeps an introduction's
images. They are one `figure` row, `fig-art-program`, with the seven
images as its `originals` in the book's order, the one kind the tables
give an unnumbered book image: a `photo` row must carry a number, and
these carry none, so the row is `figure`, its eyebrow reads "Figure",
the label the app gives an unnumbered `figure` row, and it has no
caption, since the book prints none. One row rather than seven, because
the book prints them as one run under one sentence and seven bare
"Figure" eyebrows down the page would label a sample as if it were
seven figures. The text carries them as a `figure.photo` with seven
`<img>` elements and their alt texts, and `data-original` names the
seven paths comma-separated, as a figure with several originals does.
The bundle's images carry no `width`, so `widths` stays empty and no
`data-original-width` is written. They are served from `media/intro/`,
the book's own folder beside the chapters', at `/media/intro/`, under
the bundle's file names.

## Figures beyond it

None. The Preface states no chemistry, draws no sketch and names no
typed symbol, so there is nothing for a Sim to transform and nothing
for one to add (root rule 15), no `\k` macro is needed, and the page
binds no type.

## What is left out

Nothing of the text. The errata form, the instructor and student
resources and the technology partners are things the book reaches only
through "your book page on OpenStax.org", which is the book's plain
wording and stays plain, without a link; the `notes` say so. Two things
the tables cannot say are worth recording here: the `figure` kind
describes itself as a faithful copy that serves exercises, which these
seven images are not, so an unnumbered kept image is still a gap in the
figure kinds; and the module's `<newline>` elements are dropped by the
converter, so `source.md` runs the author lists together where the page
keeps their lines.
