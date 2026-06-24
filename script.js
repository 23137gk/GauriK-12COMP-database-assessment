// write the form data
async function writeForm(){

  if (!GLOBAL_user) {
    alert("You must log in first!");
    return;
  }

  console.log("Welcome!")

  const name = document.getElementById("name").value; 
  const Age = document.getElementById("Age").value;
  const EmailAddress = document.getElementById('EmailAddress').value;

  await firebase.database().ref('userInfo/' + GLOBAL_user.uid).set({
  Username: name,
  age: Age,
  email: EmailAddress
});

console.log("Data saved!");
alert("Data saved!");

// Go to other page AFTER saving the data
  window.location.href = "Gamepage.html";

}

var GLOBAL_user; // Google's user object

// set up a listener for the login state of the user.
function fb_login() {
  firebase.auth().onAuthStateChanged(fb_handleLogin);
  fb_popupLogin();
}


// run the google login popup
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then((result) => {
      GLOBAL_user = result.user; // save the user details object to a global variable
      console.log("User has logged in:", GLOBAL_user.email);
    })
    .catch((error) => {
      console.log("Login error:", error);
    });
}

// run when the login state of the user changes
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in");
    GLOBAL_user = _user; //save the user details object to a global variable
  } else {
    console.log("User is Not logged in - Starting the Popup Process");
  }
}

function fb_readListener() {
 console.log("Read Listener");
 firebase.database().ref('/message').on('value', display)
}

function display(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) { // if there is no data, dbData will be null
    console.log('There was no record when trying to read the message');
  }
  else {
    console.log('The message is:' + dbData)
  }

  console.log("Running display(), the message is:" + snapshot.val())
}



function fb_readHighScores() {
  console.log("Reading high scores");
  firebase.database().ref('/users/Sparkly treats').orderByValue().once('value', fb_displayHighScores)
  console.log("Read high scores")
}

function fb_displayHighScores(snapshot) {
  let highScores = snapshot.val()
  console.log("Displaying high score")
  console.log(snapshot.val())
 snapshot.forEach(fb_showOneScore)
}

function fb_showOneScore(child) {
  console.log(child.key+" got "+ child.val()+" points");
}
