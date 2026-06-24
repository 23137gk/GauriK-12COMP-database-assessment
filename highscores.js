window.onload = function () {
  loadHighScores("SparklyTreats", "sparklyList");
  loadHighScores("GeoDash", "geoList");
};

function loadHighScores(gameName, listId) {

  firebase.database().ref("users").once("value")
    .then((snapshot) => {

      let scores = [];

      snapshot.forEach((userSnapshot) => {

        let gameData = userSnapshot.child("games/" + gameName);

        if (gameData.exists()) {

          scores.push({
            name: gameData.child("playerName").val(),
            score: gameData.child("Score").val()
          });

        }
      });

      scores.sort((a, b) => b.score - a.score);

      displayScores(scores, listId);

    });
}

function displayScores(scores, listId) {

  let list = document.getElementById(listId);
  list.innerHTML = "";

  scores.forEach((player) => {
    list.innerHTML += `<li>${player.name} - ${player.score}</li>`;
  });

}