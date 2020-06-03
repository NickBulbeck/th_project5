/* The actual app:
  - Get 12 random employees, in a way that refreshes every time you redisplay the page. All 12 must 
    come in a single request.
  - Display them in the way shown.
  - Add a search feature that filters the names. I'm going to go with: do this on the api itself, and
    look for names on the site. There's not much value in filtering a small number of names that are
    already all in your field of view.
  - Dynamically add a modal window, launched when you click on an employee, that displays a load more
    info. It also has a forward and back button to cycle through the employees, that handles the end
    of the list explicitly. It's also closeable.
  - Use the stylings added, but change at least one of color, background-color, box or text shadows,
    font.

  My additional thoughts:
  - It may be possible to get code from my own api on heroku or something like that
  - Douglas Adams button: probably, do the random name thing.
  - Do this as a learning exercise: that is, do it via xmlHTTPrequest, AJAX, Promise, and/or fetch()


Files: 
  - app.js, with the main app in it.
  - dataAccess.js, with the data array in it and the functions that set up the users from the api
  - app.js that has everything else.
*/

// 


// Elements:
const usersDisplayed = 12;

// Creating the HTML:

const createSearch = () => {

}

const createGallery = () => {
  
}

const createModal = () => {
  console.log("creating the modal...");
}
