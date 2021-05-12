# spi
SharePoint Importer

The SharePoint Importer is a facade replacement for the original SharePoint QuickEdit mode.
If availabe, it uses the HTML data in the clipboard instead of the text data. This enables it to import manual line breaks in cells, where QuickEdit always fails.

Importing cells with colspan or rowspan will still be rejected.
