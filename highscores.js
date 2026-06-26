window.onload = function () {
  loadHighScores("SparklyTreats", "sparklyList");
  loadHighScores("GeoDash", "geoList");
};


// loading the hgihscores for both games
function loadHighScores(gameName, listId) {

  // getting all users from database
  firebase.database().ref("users").once("value").then((snapshot) => {
    let scores = [];
    snapshot.forEach((userSnapshot) => {

      // get the users score from the game
      let gameData = userSnapshot.child("games/" + gameName);

      // check if score is in database
      if (gameData.exists()) {

        // adding users name and score to array
          scores.push({
            name: gameData.child("playerName").val(),
            score: gameData.child("Score").val()
          });
      }
    });

    // sorting scores from highest to lowest
    scores.sort(function(a, b) {
      return b.score - a.score;
    });

    displayScores(scores, listId);
  });
}


// displaying the scores
function displayScores(scores, listId) {
  let list = document.getElementById(listId);
  list.innerHTML = "";

  scores.forEach(function(player) {
    // adding the user name and score
    list.innerHTML += "<li>" + player.name + " - " + player.score + "</li>";
  });
}