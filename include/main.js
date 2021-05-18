//This function will be called when the toggle is pressed
function colorChange() {
    //Find the button which will be checked if it's checked or not
    var colorPreferance = document.getElementById("colorPreferance");
    if (colorPreferance.checked == true) {
      preferesDark();
    } else {
      preferesLight();
    }
  }
  
  //Fancy transition between dark mode and light mode
  let trans = () => {
    //Add class
    document.documentElement.classList.add("transition");
    //Wait for the animation to finish then remove the class
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  };
  //IE8 ready function
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState != "loading") fn();
      });
    }
  }
  //More custom when ready function, this is where the sweats go
  function whenReady() {
    
    var preferedColorScheme = localStorage.getItem("colorMode");
    //If the user already has a preferance respect it
    if (preferedColorScheme == "Dark") {
      preferesDark();
    } else if (preferedColorScheme == "Light") {
      preferesLight();
    } else {
      //If they don't then make them use dark mode like a normal person
      preferesDark();
    }
    document
    .getElementById("colorPreferance")
    .addEventListener("click", colorChange, true);
  }
  
  // This function is used whenever dark preferance is used
  function preferesDark() {
    //Start the transition
    trans();
    //Save the preferance
    localStorage.setItem("colorMode", "Dark");
    //Check the box to make it look like dark mode is enabled
    document.getElementById("colorPreferance").checked = true;
    //Add the dark mode css
    document.getElementById("colorScheme").innerHTML =
      '<link rel="stylesheet" type="text/css" href="/include/dark.css">';
  }
  
  // This function is used whenever light preferance is used
  function preferesLight() {
    //Start the transition
    trans();
    //Save the preferance
    localStorage.setItem("colorMode", "Light");
    document.getElementById("colorPreferance").checked = false;
    document.getElementById("colorScheme").innerHTML =
      '<link rel="stylesheet" type="text/css" href="/include/light.css">';
  }
  
  //When the user changes their native color scheme make sure to change too
  function handleColorChange(event) {
    if (event.matches) {
      // Dark mode
      preferesDark();
    } else {
      //There are only 2 options possible, so it should be fine
      preferesLight();
    }
  }
  
  (function(document, navigator, standalone) {
    // prevents links from apps from oppening in mobile safari
    // this javascript must be the first script in your <head>
    if (standalone in navigator && navigator[standalone]) {
      var curnode,
        location = document.location,
        stop = /^(a|html)$/i;
      document.addEventListener(
        "click",
        function(e) {
          curnode = e.target;
          while (!stop.test(curnode.nodeName)) {
            curnode = curnode.parentNode;
          }
          // Condidions to do this only on links to your own app
          // if you want all links, use if('href' in curnode) instead.
          if (
            "href" in curnode && // is a link
            (chref = curnode.href).replace(location.href, "").indexOf("#") && // is not an anchor
            (!/^[a-z\+\.\-]+:/i.test(chref) || // either does not have a proper scheme (relative links)
              chref.indexOf(location.protocol + "//" + location.host) === 0) // or is in the same protocol and domain
          ) {
            e.preventDefault();
            location.href = curnode.href;
          }
        },
        false
      );
    }
  })(document, window.navigator, "standalone");
  
  var mql = matchMedia("(prefers-color-scheme: dark)");
  mql.onchange = handleColorChange;
  ready(whenReady);