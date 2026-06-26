// saving the users score to the database
function saveScore(gameName, score) {

  // getting the user that is signed in from the database
  const user = firebase.auth().currentUser;
  if (!user) return; // if no user is signed in then stop the function


  // getting the users name from database
  firebase.database().ref("userData/" + user.uid).once("value").then((snapshot) => {
    const data = snapshot.val(); // getting the data from database
    const name = data.Username; // getting the name from the sign in form

    // saving the scores and names under the 'users' string on database
    firebase.database().ref("users/" + user.uid + "/games/" + gameName).set({
      playerName: name,
      Score: score
    });

    console.log("Saved:", gameName, score);
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



// saving the review to database
function saveReview() {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please log in first."); // if no user is signed in then show the alert
    return;
  }

  let review = document.getElementById("review").value;


  if (review == "") {
    alert("Please write a review first.");
    return;
  }

  // get the username form firebase
  firebase.database().ref("userInfo/" + user.uid).once("value").then(function(snapshot){
    let name = snapshot.val().Username;

    // putting the review in firebase
    firebase.database().ref("reviews").push({
      userId: user.uid, // the user uid
      Username: name, // the user name
      Review: review // the user review
    });

    document.getElementById("reviewMessage").innerHTML = "Review saved!";
    document.getElementById("review").value = "";
  });
}


// displaying all reviews
function loadReviews() {
  const container = document.getElementById("allReviews");
  container.innerHTML = ""; // clearing the old reviews first

  // getting all the reviews from the database
  firebase.database().ref("reviews").once("value").then(function(snapshot){
    snapshot.forEach(function(child){
      let review = child.val();

      // adding the review to the gamepage
      container.innerHTML +=
      "<p>" + review.Username + ": " + review.Review + "</p>";
    });
  });
}