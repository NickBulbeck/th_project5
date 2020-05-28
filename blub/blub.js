const blubObject = {
  blubFunction: function(element) {
                  if(element) {
                    element.textContent += "This is a separate piece of text pulled in from github.";
                  }
                  console.log("blubObject[blubFunction] has been found!");
                },
  blubArray: [1,2,3,4,5,6,7],
  blubString: "The quick brown fox jumps over the lazy dug."
}