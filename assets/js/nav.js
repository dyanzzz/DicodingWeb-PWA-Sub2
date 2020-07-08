document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Load a list of menu links
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Register an event listener for each menu link
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // close sidenav
              let sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Load the content of the page being called
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "./nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  if (page == "") page = "spanyolLeague";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        
        if (page === "home") {
          getLeaguesChampions();
        } else if(page === "spanyolLeague"){
          getSpanyolLeague();
        } else if (page === "saved") {
          getSavedTeams();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>page not found.</p>";
        } else {
          content.innerHTML = "<p>Ups.. the page cannot be accessed.</p>";
        }
      }
    };
    xhttp.open("GET", "./pages/" + page + ".html", true);
    xhttp.send();
  }
});
