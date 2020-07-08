const base_url = "https://api.football-data.org/v2/";
const options = {
  method: 'GET',
  //body: JSON.stringify(myPost),
  headers: {
    'X-Auth-Token': '7f4a6b31d0334e2c8d0b5db07bfc317b'
  }
};

// The block of code that will be called if fetch is successful
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() will make the catch block called
    return Promise.reject(new Error(response.statusText));

  } else {
    // Turn an object into Promise so that it can be "then" right
    return Promise.resolve(response);

  }
}

// Block of code to parse json into a JavaScript array
function json(response) {
  return response.json();
}

// The code block for handling errors in the catch block
function error(error) {
  // The error parameter is from Promise.reject ()
  console.log("Error : " + error);
}




//=============================================================================

// The code block for making json data requests
function getLeaguesChampions() {
  //document.getElementById("body-content").removeAttribute("class");

  if ("caches" in window) {
    caches.match(base_url + "competitions/2001/standings/", options).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          getDataLeagueChampions(data);
        });
      }
    });
  }

  fetch(base_url + "competitions/2001/standings/", options)
    .then(status)
    .then(json)
    .then(function(data) {
      // JavaScript objects / arrays from response.json () enter through data.
      getDataLeagueChampions(data);
    })
    .catch(error);
}

function getDataLeagueChampions(data){
  let leaguesHTML = "";
  let leaguesHTMLHeader = "";

    leaguesHTMLHeader += `
      <div class="col s12 m12">
        <div class="card-panel">
          <span class="blue-text text-darken-3">
            <h5>${data.competition.name}</h5>
          </span>
        </div>
      </div>
    `;

    data.standings.forEach(function(standingData, index) {
      if(standingData.type==='TOTAL'){
        leaguesHTML += `
          <div class="col s12 m12" >
            <table class="highlight responsive-table">
              <thead>
                <tr bgcolor="#e3f2fd">
                    <th width="5%">#</th>
                    <th width="29%">${standingData.group}</th>
                    <th width="8%">Played</th>
                    <th width="8%">Won</th>
                    <th width="8%">Draw</th>
                    <th width="8%">Lost</th>
                    <th width="8%">For</th>
                    <th width="8%">Against</th>
                    <th width="8%">Goal Diff</th>
                    <th width="8%">Points</th>
                </tr>
              </thead>
              <tbody>
        `;
        data.standings[index].table.forEach(function(teams) {
          leaguesHTML += `
                <tr>
                  <td>${teams.position}</td>
                  <td>
                    <a href="./team.html?id=${teams.team.id}">
                      <div class="row valign-wrapper">
                        <div class="col s2">
                          <img src="${teams.team.crestUrl}" class="responsive-img">
                        </div>
                        <div class="col s10">
                          <span class="blue-text text-darken-4">
                          ${teams.team.name}
                          </span>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>${teams.playedGames}</td>
                  <td>${teams.won}</td>
                  <td>${teams.draw}</td>
                  <td>${teams.lost}</td>
                  <td>${teams.goalsFor}</td>
                  <td>${teams.goalsAgainst}</td>
                  <td>${teams.goalDifference}</td>
                  <td>${teams.points}</td>
                </tr>
          `;
        })
        leaguesHTML += `
              </tbody>
            </table>
          </div>
        `;
      }

    });
  // Insert the card component into the element with the id #content
  document.getElementById("leagues").innerHTML = leaguesHTMLHeader + leaguesHTML;
}

//=============================================================================

function getSpanyolLeague() {
  //document.getElementById("body-content").removeAttribute("class");

  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/standings/", options).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          getDataSpanyolLeague(data);
        });
      }
    });
  }

  fetch(base_url + "competitions/2014/standings/", options)
    .then(status)
    .then(json)
    .then(function(data) {
      // JavaScript objects / arrays from response.json () enter through data.
      getDataSpanyolLeague(data);
    })
    .catch(error);
}

function getDataSpanyolLeague(data){
  let leaguesHTML = "";
  let leaguesHTMLHeader = "";

  leaguesHTMLHeader += `
    <div class="col s12 m12">
      <div class="card-panel">
        <span class="blue-text text-darken-3">
          <h5>${data.competition.name}</h5>
        </span>
      </div>
    </div>
  `;

  data.standings.forEach(function(standingData, index) {
    if(standingData.type==='TOTAL'){
      leaguesHTML += `
        <div class="col s12 m12" >
          <table class="highlight responsive-table">
            <thead>
              <tr bgcolor="#e3f2fd">
                  <th width="5%">#</th>
                  <th width="29%">Team</th>
                  <th width="8%">Played</th>
                  <th width="8%">Won</th>
                  <th width="8%">Draw</th>
                  <th width="8%">Lost</th>
                  <th width="8%">For</th>
                  <th width="8%">Against</th>
                  <th width="8%">Goal Difference</th>
                  <th width="8%">Points</th>
              </tr>
            </thead>
            <tbody>
      `;
      data.standings[index].table.forEach(function(league) {
        leaguesHTML += `
              <tr>
              <td>${league.position}</td>
                <td>
                  <a href="./team.html?id=${league.team.id}">
                    <div class="row valign-wrapper">
                      <div class="col s2">
                        <img src="${league.team.crestUrl}" class="responsive-img">
                      </div>
                      <div class="col s10">
                        <span class="blue-text text-darken-4">
                        ${league.team.name}
                        </span>
                      </div>
                    </div>
                  </a>
                </td>
                <td>${league.playedGames}</td>
                <td>${league.won}</td>
                <td>${league.draw}</td>
                <td>${league.lost}</td>
                <td>${league.goalsFor}</td>
                <td>${league.goalsAgainst}</td>
                <td>${league.goalDifference}</td>
                <td>${league.points}</td>
              </tr>
        `;
      })
      leaguesHTML += `
            </tbody>
          </table>
        </div>
      `;
    }

  });

  // Insert the card component into the element with the id #content
  document.getElementById("leagues").innerHTML = leaguesHTMLHeader + leaguesHTML;
}

//=============================================================================

function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Retrieve the parameter query value (? Id =)
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "./teams/" + idParam, options).then(function(response) {
        if (response) {
          response.json().then(function(data) {

            getDataTeamById(data);

            // Send the json parsed data object so that it can be saved to indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "./teams/" + idParam, options)
      .then(status)
      .then(json)
      .then(function(data) {
        // The JavaScript object from response.json () enters via a data variable.
        // console.log(data);
        // Arrange teams card components dynamically

        getDataTeamById(data);

        // Send the json parsed data object so that it can be saved to indexed db
        resolve(data);
      });
  });
}

function getDataTeamById(data){
  let leagueHTML = '';
  let squadHTMLHeader = '';
  let squadHTML = '';

  leagueHTML += `<div class="col s12 m12">&nbsp;</div>`;
  leagueHTML += `
    <div class="col s12 m12">
      <div class="row valign-wrapper">
        <div class="col s2">
          <img src="${data.crestUrl}" class="responsive-img">
        </div>
        <div class="col s10 ">
          <span class="black-text">
            <h2>${data.name}</h2>
          </span>
        </div>
      </div>
    </div>

    <div class="col s12 m12">
  `;

  data.activeCompetitions.forEach(function(tag, index) {
    leagueHTML += `
      <span class="new badge blue darken-4" data-badge-caption="">${tag.name}</span>
    `;
  });
  leagueHTML += `
    </div>

    <div class="col s12 m6" >
      <div class="card">
        <div class="card-content">

          <table>
            <tbody>
              <tr>
                <td width="30%">Name</td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td>Short Name</td>
                <td>${data.shortName}</td>
              </tr>
              <tr>
                <td>TLA</td>
                <td>${data.tla}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>${snarkdown(data.address)}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>${data.phone}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <div class="col s12 m6" >
      <div class="card">
        <div class="card-content">

          <table>
            <tbody>
              <tr>
                <td width="30%">Website</td>
                <td>${data.website}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td>Founded</td>
                <td>${data.founded}</td>
              </tr>
              <tr>
                <td>Club Colors</td>
                <td>${data.clubColors}</td>
              </tr>
              <tr>
                <td>Venue</td>
                <td>${data.venue}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  `;

  squadHTMLHeader += `
    <div class="col s12 m12">
      <div class="card-panel">
        <span class="blue-text text-darken-3">
          <h5>SQUAD</h5>
        </span>
      </div>
    </div>
  `;

  squadHTML += `
    <div class="col s12 m12" >
      <table class="highlight responsive-table">
        <thead>
          <tr bgcolor="#e3f2fd">
            <th width="5%">No.</th>
            <th width="20%">Name</th>
            <th width="13%">Position</th>
            <th width="13%">Birth</th>
            <th width="13%">Country</th>
            <th width="13%">Nationality</th>
            <th width="13%">Shirt</th>
            <th width="10%">Role</th>
          </tr>
        </thead>
        <tbody>
  `;
  let no = 1;
  data.squad.forEach(function(squadData, index) {
    let dob = squadData.dateOfBirth.substr(0, 10);

    squadHTML += `
      <tr>
        <td>${no}</td>
        <td>${squadData.name}</td>
        <td>${squadData.position}</td>
        <td>${dob}</td>
        <td>${squadData.countryOfBirth}</td>
        <td>${squadData.nationality}</td>
        <td>${squadData.shirtNumber}</td>
        <td>${squadData.role}</td>
      </tr>
    `;
    no++;
  });

  squadHTML += `
        </tbody>
      </table>
    </div>
  `;

  // Insert the card component into the element with the id #content
  document.getElementById("teams").innerHTML = leagueHTML + squadHTMLHeader + squadHTML;
}

//=============================================================================

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Arrange team card components dynamically
    let teamsHTML = "";
    let teamsHTMLHeader = "";

    teamsHTMLHeader += `
      <div class="col s12 m12">
        <div class="card-panel">
          <span class="blue-text text-darken-3">
            <h5>Favourite</h5>
          </span>
        </div>
      </div>
    `;

    teams.forEach(function(team) {

      teamsHTML += `
        <div class="col s12 m3" >
          <div class="card">
            <a href="./team.html?id=${team.id}&saved=true">
              <div class="card-image waves-effect waves-block waves-light">
                <img height="200px" src="${team.crestUrl}" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${team.shortName}</span>
              <p>${team.name}</p>
            </div>
          </div>
        </div>
      `;

    });
    // Insert the card component into the element with the id #content
    document.getElementById("teams").innerHTML = teamsHTMLHeader + teamsHTML;
  });
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  idParam = parseInt(idParam, 10);

  getById(idParam).then(function(team) {

    let leagueHTML = '';
    let squadHTMLHeader = '';
    let squadHTML = '';

    leagueHTML += `<div class="col s12 m12">&nbsp;</div>`;
    leagueHTML += `
      <div class="col s12 m12">
        <div class="row valign-wrapper">
          <div class="col s2">
            <img src="${team.crestUrl}" class="responsive-img">
          </div>
          <div class="col s10 ">
            <span class="black-text">
              <h2>${team.name}</h2>
            </span>
          </div>
        </div>
      </div>

      <div class="col s12 m12">
    `;

    team.activeCompetitions.forEach(function(tag, index) {
      leagueHTML += `
        <span class="new badge blue darken-4" data-badge-caption="">${tag.name}</span>
      `;
    });
    leagueHTML += `
      </div>

      <div class="col s12 m6" >
        <div class="card">
          <div class="card-content">

            <table>
              <tbody>
                <tr>
                  <td width="30%">Name</td>
                  <td>${team.name}</td>
                </tr>
                <tr>
                  <td>Short Name</td>
                  <td>${team.shortName}</td>
                </tr>
                <tr>
                  <td>TLA</td>
                  <td>${team.tla}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>${snarkdown(team.address)}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>${team.phone}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div class="col s12 m6" >
        <div class="card">
          <div class="card-content">

            <table>
              <tbody>
                <tr>
                  <td width="30%">Website</td>
                  <td>${team.website}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>${team.email}</td>
                </tr>
                <tr>
                  <td>Founded</td>
                  <td>${team.founded}</td>
                </tr>
                <tr>
                  <td>Club Colors</td>
                  <td>${team.clubColors}</td>
                </tr>
                <tr>
                  <td>Venue</td>
                  <td>${team.venue}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    `;

    squadHTMLHeader += `
      <div class="col s12 m12">
        <div class="card-panel">
          <span class="blue-text text-darken-3">
            <h5>SQUAD</h5>
          </span>
        </div>
      </div>
    `;

    squadHTML += `
      <div class="col s12 m12" >
        <table class="highlight responsive-table">
          <thead>
            <tr bgcolor="#e3f2fd">
              <th width="5%">No.</th>
              <th width="20%">Name</th>
              <th width="13%">Position</th>
              <th width="13%">Birth</th>
              <th width="13%">Country</th>
              <th width="13%">Nationality</th>
              <th width="13%">Shirt</th>
              <th width="10%">Role</th>
            </tr>
          </thead>
          <tbody>
    `;
    let no = 1;
    team.squad.forEach(function(squadData, index) {
      let dob = squadData.dateOfBirth.substr(0, 10);

      squadHTML += `
        <tr>
          <td>${no}</td>
          <td>${squadData.name}</td>
          <td>${squadData.position}</td>
          <td>${dob}</td>
          <td>${squadData.countryOfBirth}</td>
          <td>${squadData.nationality}</td>
          <td>${squadData.shirtNumber}</td>
          <td>${squadData.role}</td>
        </tr>
      `;
      no++;
    });

    squadHTML += `
          </tbody>
        </table>
      </div>
    `;

    // Insert the card component into the element with the id #content
    document.getElementById("teams").innerHTML = leagueHTML + squadHTMLHeader + squadHTML;
  });
}
