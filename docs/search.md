# Website Search

## What search covers

Search is for **holiday packages**. The header search and `/search` page both
call the package-search API (`/user/search?query=...`). A matching suggestion
opens that package; submitting the query opens the results page.

Search does not currently search general website pages, services, blogs, or
offers.

## What to try

Enter a package or travel-related keyword, for example:

- A package name
- A destination or region, such as India, South India, or Kashmir
- A place listed on a package itinerary
- A trip or experience keyword, such as beach, wildlife, or spiritual

These are examples of queries to try, not a guarantee that every term is
indexed. The frontend sends the entered text to the API; the backend controls
which package fields are searched and how results are matched.

## Search behavior

- Search starts as you type, with a short debounce.
- Any non-empty query can be submitted.
- Suggestions show package name, zone, and available destinations.
- Selecting a suggestion navigates directly to the package.
- Submitting the search opens `/search?query=<your search>`.
- An empty query is ignored.

## API contract used by the frontend

The client sends a URL-encoded `query` parameter to `GET /user/search` and
expects matching packages in `data.packages`. Each result is used as a package
with a `slug` and may include `packageName`, `images`, `zoneId.name`, and
`destinations`.

The exact matching fields, ranking, and backend validation rules are not
defined in this frontend repository.
