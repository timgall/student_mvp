const searchBtn = $(".search");

const users = $(".users");
const bbqforum = $(".bbqforum");
const bbqrecipes = $(".bbqforum");
const bourbonforum = $(".bourbonforum");
const bourbonreviews = $(".bourbonreviews");

const userName = prompt("Please Enter Your User Name.");
console.log(userName);
fetch("/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let userExists = false;
    data.forEach((user) => {
      if (user.user_name === userName) {
        userExists = true;
        let passwordInput;
        let passwordAttempts = 0;
        let passwordAccurate = false;
        while (!passwordAccurate && passwordAttempts < 3) {
          passwordInput = prompt(
            `Welcome ${userName}. Please enter your password.`
          );
          passwordAttempts++;
          if (user.user_password === passwordInput) {
            passwordAccurate = true;
            alert(`Welcome ${userName}!`);
            // set visibility of homescreen to welcome screen
          } else if (passwordAttempts === 3) {
            alert("You have exceeded the maximum number of attempts. Goodbye.");
            window.close();
          } else {
            alert("Password was incorrect. Please try again.");
          }
        }
      }
    });
    if (!userExists) {
      alert(`User ${userName} does not exist!`);
      $(".newUser").css("display", "block");
    }
  });

fetch("/api/bbqforum")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/bourbonforum")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/bbqrecipes")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/bourbonreviews")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
