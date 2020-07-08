let dbPromised = idb.open("footbalDataOrg", 1, function(upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("team saved successfully.");
      M.toast({html: 'Team Saved Successfully.'});
      
    })
    .catch(function(error){
      console.log(error);
      M.toast({html: 'Error, please try again'});
    });
}


function removeTeam(idParam){
  dbPromised
    .then(function(db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      console.log(idParam);
      store.delete(idParam);
      return tx.complete;
    })
    .then(function() {
      console.log('team deleted');
      M.toast({html: 'Team Deleted.'});
      window.location.href = './index.html#saved';
    })
    .catch(function(error){
      console.log(error);
      M.toast({html: 'Error, please try again'});
    });
}


function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByTitle(title) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      let titleIndex = store.index("name");
      let range = IDBKeyRange.bound(title, title + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}
