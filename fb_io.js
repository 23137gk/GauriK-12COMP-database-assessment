

// saving the users score to the database
function saveScore(gameName, score) {

    // getting the user that is signed in from the database
  const user = firebase.auth().currentUser;
  if (!user) return; // if no user is signed in then stop the function


  // getting the users name from database
  firebase.database().ref("userInfo/" + user.uid).once("value")
    .then((snapshot) => {

      const data = snapshot.val(); // getting the data from database
      const name = data.name; // getting the name from the sign in form


      // saving the scores and names under the 'users' string on database
      firebase.database().ref("users/" + user.uid + "/games/" + gameName).update({
        Score: score,
        name: name
      });

      console.log("Saved:", name, score);
    });
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    GLOBAL_user = user;
    console.log("User:", user.email);
  } else {
    GLOBAL_user = null;
    console.log("No user");
  }
});