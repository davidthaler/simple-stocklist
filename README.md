# Simple Stocklist

This is a simple client-side app for taking restocking lists. 
There will be one list at a time in the app. There is no server.
The list will persist in ~~local storage~~indexed DB.

## In-Progress

TO-DO items

1. __DONE__item done; markup, handler state variable; requires id if only one handler
2. __DONE__delete item; requires item id, markup and a handler
3. __DROP__~~edit item; markup, handler loads line in to modal~~
4. __DONE__ sized counts input layout is too cramped for numbers to be visible
5. get a Done button that is add + close
6. form validation: When Add fails due to a missing name, it is unclear what happened.
7. ADD: photos. This is a big one because the photos have to be (1) resized and (2) stored, and localStorage will not work for this; we need indexed DB

## Design

### Stocklist

The stock list contains a series of line items with restocking information.
It has three available functions: new apparrel item, new general item and clear all items.

### Line Items

There are two types of items: apparrel (sized) and general (unsized).
Line items displayed in the stocklist have ~~edit~~ and delete options.
They can be marked as done (picked).
For apparrel items, only the sizes with non-zero counts are displayed.
Notes can be added, but only display if there are any.

### Create/~~Edit~~ Modal
~~The edit and create modals are the same,
except that the edit modal for a line item is populated with the current values.~~
There is no edit mode.
For a general item, this has a name, quantity and notes field. 
For apparrel items, it has name, quantity for each possible size, and notes.


### Photos
Later, we will add a photo to line items using a file input tag with `accept="image/*""` and `capture="environment"`.
