# arXiv API notes for Mesoscale and Nanoscale Physics

## Category mapping
- Mesoscale and Nanoscale Physics (arXiv) maps to category `cond-mat.mes-hall`.
- Use the primary category field when present; entries can be cross-listed under multiple categories.

## API endpoint
- Base: `https://export.arxiv.org/api/query`
- Typical query for newest submissions:
  - `search_query=cat:cond-mat.mes-hall`
  - `sortBy=submittedDate`
  - `sortOrder=descending`
  - `max_results=200` (increase if a single day has many papers)

## Date logic
- Use `published` as the submission date.
- Define "latest day" by the maximum `published` date (UTC) among fetched entries.
- Filter all entries whose `published` date equals that latest day.

## Fields to extract
- `id` (arXiv URL), `title`, `summary`, `published`, `updated`
- `authors` (list of names)
- `arxiv:primary_category` (term)
- `category` terms (for all categories)
- `link` rel=alternate (HTML), rel=related title=pdf (PDF)
