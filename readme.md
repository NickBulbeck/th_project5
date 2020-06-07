Friday's next job:

I need to create an array of useful properties - mini-objects, say - to store the 
employee data as it comes through. So it's readily accessible to the function 
setting up the gallery item, but then also subsequently to the function setting
up the modal. AND - crucially - to the navigation buttons on the modal itself.

So: have a blank array. Each time an employee is read in, and you create the gallery
entry, push the employee to loadedUsers array. Keep them as is, rather than pre-process,
I think. But do this in createGalleryEntry, not in loadEmployees, because the link
between the array and the galleryEntry must be explicit. Something like an id.

So... the back/forward button must link explicitly to an array position, plus or minus
one (and be hidden if you're at the end or the beginning). Which means each modal must have a number, from 0 to 11.

Step 0: Decision on how (or whether) to de-duplicate the name/email/etc setup.
      DECISION: don't bother. It creates as many problems as it solves.
Step 1: In createGallery, push stuff to the loadedUsers array.
Step 2(-):  Decision on whether to create and populate the modal separately, or
            remove the modal entirely and re-create it each time.
      DECISION: delete and re-create it each time. That way it only needs a single
      number as a parameter, and it can get a' the data fae the 
Step 2: In createModal, use element.dataset.index to get access to a' the stuff.