Tuesday's ToDo:

- Write the code to create the employee's address properly              DONE
- Write the code to create the date of birth properly                   DONE
- Add the "number to display" drop-down                             ToDo
- Write the search feature                                              DONE
- Write something that ensures ye cannae get the same fotie twice       DONE
- Refactor so that the modal Prev/Next buttons recognise a Search   ToDo
- Correct the search to use only the first part of the email            DONE
- Disable the search input while the search button is working       ToDo

NUMBER TO DISPLAY...


SEARCH-SENSITIVE MODAL

Can either pass an array of displayable responses, or detect it in the function.
If you pass an array... the function gets shorter, and it becomes less tightly coupled to how
you hide or display the search.

I'VE HAD AN IDEA: Create a search array in the search button function. Then, use it if it
exists. An important counterpoint to this strategy is to clear it or declare it null when the
search is cleared (that is, on display-all). ALSO: keep a single global [] called displayedEmployees
that is set to all of them, or reduced by the search hingmy. This means that EVERY employee,
when first set up, gets the class of searchItemHingmy - whatever I called it, I need to
call it something different.