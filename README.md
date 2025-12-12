# SBSlab

## Publications data source

The Publications section is rendered from:

- `data/publications.json`

To update the Publications content using the Excel table:

1. Replace/update `data/publications_source.xlsx`
2. Run:
   ```bash
   python tools/excel_to_publications.py
   ```
3. Commit and push the updated `data/publications.json`

Display rules:
- Journal vs Proceedings (2 buckets)
- Sorted by year (DESC), and latest-first within the same year
- Journal entries append `(IF …, Top …%)` in the venue line when available
