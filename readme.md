Tuesday's ToDo:

- Write the code to create the employee's address properly              DONE
- Write the code to create the date of birth properly                   DONE
- Add the "number to display" drop-down                             ToDo
- Write the search feature                                              DONE
- Write something that ensures ye cannae get the same fotie twice       DONE
- Refactor so that the modal Prev/Next buttons recognise a Search       DONE
- Correct the search to use only the first part of the email            DONE
- Disable the search input while the search button is working           DONE
- Add an appropriate response if there's naebdy in the search           DONE
- Fix the bug at line 254 and find the employee fae the div             DONE
- Add text to the modal next/prev div to mark full/Search           ToDo
- Decide on where to put the select list - in form or on its own        DONE
- Design the Douglas Adams event listener                           ToDo
- Re-factor to get the data in dataAccess                           ToDo



FULL/SEARCH...

First, find out if there's a search or not. Think I can do this if search-input.valud isn't ''.
Then, set up the text (cycle through search results, cycle through all students) accordingly.
Then create an H3 element or something that looks right, and append it to the right element.

DOUGLAS ADAMS EVENT LISTENER

It's a question of what order to chain Promises together in, and how to get the data from the web into
the page. As an exercise, I want to do it using separate calls - one to randomuser, and one to 
randomapi. Base this on the code in the promises.js file in the Perform Cleanup With finally() 
workspace - https://teamtreehouse.com/workspaces/41527460.

RE-FACTOR TO USE dataAccess.js 

The getJSON function fae the above workspace can go there. All it should have is a flag that says 
how many folk we need or whether it's a Douglas Adams call.
