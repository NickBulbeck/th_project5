Known bugs:

- Modal 			When there's only one search result, there is an "empty box" div around where the prev/next
         			buttons would be if they existed. Looks untidy.
- select list 		When the user reloads the page using the select list, the search input needs to be reset
                    so that the button always says "submit" (not "display all"), and the input field is 
                    enabled and has the correct "Search..." placeholder text.
- Hitchhiker emails The email addresses are all too long to fit in the card, and they overflow. Looks a bit 
                    messy. (Only applies when the Douglas Adams option is selected, mind.)
- Exceeds			There's no real alternative font, shading, colour-scheme etc to meet the final rubric for
					Exceeds. Can't really decide on one either.
- createModal		Needs re-factoring so that the array it uses is global.
- easter egg		When there's an error, there's no way to re-set the page other than by re-loading it.
					This is very poor; there needs to be at least a button or something.
- clearGallery / prepGallery - these functions seem to do practically the same thing. Don't need both!