document.addEventListener('DOMContentLoaded', function(){

	// SIDEBAR NAVIGATION
	let elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();

	function loadNav(){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				// reload list menu
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				// register event listener for menu
				document.querySelectorAll('.sidenav a, .topnav a')
				.forEach(function(elm){
					elm.addEventListener('click', function(event){
						// Tutup sidenav
						let sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
						
						// load page content loader 
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", './nav.html', true);
		xhttp.send();
	}
	
	// Load page content
	let page = window.location.hash.substr(1);
	if(page == '') page = 'home';
	loadPage(page);

	function loadPage(page){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				let content = document.querySelector(".body-content");
				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if(this.status == 404) {
					content.innerHTML = "<p>Page not found.</p>";
				} else {
					content.innerHTML = "<p>Ups.. the page cannot be accessed.</p>";
				}
			}
		};
		xhttp.open("GET", './pages/'+page+'.html', true);
		xhttp.send();
	}

});
