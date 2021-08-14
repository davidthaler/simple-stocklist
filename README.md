# Simple Stocklist

This is a simple client-side app for taking restocking lists. 
There will be one list at a time in the app. There is no server.
The list will persist in local storage.

# Stocklist

The stock list contains a series of line items with restocking information.
It has three available functions: new apparrel item, new general item and clear all items.

# Line Items

There are two types of items: apparrel (sized) and general (unsized).
Line items displayed in the stocklist have edit and delete options.
For apparrel items, only the sizes with non-zero counts are displayed.
Notes only display if there are any.

# Create/Edit Modal
The edit and create modals are the same, 
except that the edit modal for a line item is populated with the current values.
For a general item, this has a name, quantity and notes field. 
For apparrel items, it has name, quantity for each possible size, and notes.


# Photos
Later, we will add a photo to line items using a file input tag with `accept="image/*""` and `capture="environment"`.