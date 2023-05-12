//page buttons
const searchBtn = $(".search");
const userSerarchBtn = $("#submitUser");
const bbqRecipesBtn = $('a[href="#bbqrecipes"]');
const bbqForumBtn = $('a[href="#bbqforum"]');
const bourbonForumBtn = $('a[href="#bourbonforum"]');
const bourbonReviewsBtn = $('a[href="#bourbonreviews"]');
const $refreshBBQRecipeBtn = $(".refreshBBQRecipes");
//
//page divs
const users = $(".users");
const bbqforum = $(".bbqForumContainer");
const bbqrecipes = $(".bbqRecipeContainer");
const bourbonforum = $(".bourbonForumContainer");
const bourbonreviews = $(".bourbonReviewContainer");
const bourbonReviewAll = $(".bourbonReviewAll");
//
//opening prompt
const userName = prompt("Please Enter Your User Name.");
console.log(userName);
fetch("/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let userExists = false;
    let currentUser = null;
    data.forEach((user) => {
      if (user.user_name === userName) {
        userExists = true;
        currentUser = user;
      }
    });
    if (userExists) {
      let passwordInput;
      let passwordAttempts = 0;
      let passwordAccurate = false;
      while (!passwordAccurate && passwordAttempts < 3) {
        passwordInput = prompt(
          `Welcome ${userName}. Please enter your password.`
        );
        passwordAttempts++;
        if (currentUser.user_password === passwordInput) {
          passwordAccurate = true;
          alert(`Welcome ${userName}!`);
          // set visibility of homescreen to welcome screen
          break;
        } else if (passwordAttempts === 3) {
          alert("You have exceeded the maximum number of attempts. Goodbye.");
          window.close();
        } else {
          alert("Password was incorrect. Please try again.");
        }
      }
    } else {
      alert(`User ${userName} does not exist!`);
      $(".newUser").css("display", "block");
    }
  });
//
//new user div show and input
const userNameInput = $("#userName");
const firstName = $("#firstName");
const lastName = $("#lastName");
const userPassword = $("#userPassword");
const youTubeChannel = $("#youtubeChannel");

userSerarchBtn.on("click", () => {
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: userNameInput.val().trim(),
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      user_password: userPassword.val().trim(),
      youtube_channel: youTubeChannel.val(),
    }),
  })
    .then((res) => {
      if (res.ok) {
        alert("User created successfully!");
        $(".newUser").css("display", "none");
        userNameInput = "";
        firstName = "";
        lastName = "";
        userPassword = "";
        youTubeChannel = "";
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
//
//bbqrecipes clicked
const $bbqRecipes = $(".selectedBBQRecipeAll");
bbqRecipesBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "block");
  $(".bbqRecipeAll").css("display", "block");
  $(".selectedBBQRecipeAll").css("display", "block");

  fetch("/api/bbqrecipes")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((bbqrecipes) => {
        console.log(users);
        const $bbqRecipesAll = $("<div></div>").addClass("bbqrecipes");
        const $recipeDetails = $("<div></div>").text(
          "@" +
            bbqrecipes.user_name +
            " " +
            "Title: " +
            bbqrecipes.title +
            " " +
            "Ingredients: " +
            bbqrecipes.ingredients +
            " " +
            "Steps: " +
            bbqrecipes.temperature +
            " " +
            "Comments: " +
            bbqrecipes.comments +
            " " +
            "Date Posted: " +
            bbqrecipes.post_date
        );
        const $lineBreak = $("<br>");
        $bbqRecipesAll.append($recipeDetails);
        $bbqRecipesAll.append($lineBreak);
        $bbqRecipes.prepend($bbqRecipesAll);
      });
    });

  //@users.user_name
});
//allows us to ensure bourbon review list is updated.
//
//bbqforum clicked
bbqForumBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "none");
  $(".bbqForumContainer").css("display", "block");
});
//
//bourbon forum clicked
bourbonForumBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bbqRecipeContainer").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "none");
  $(".bourbonForumContainer").css("display", "block");
});
//
//bourbon review clicked
bourbonReviewsBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "block");
});
//
//
// fetch("/api/bbqforum")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch("/api/bourbonforum")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch("/api/bbqrecipes")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch("/api/bourbonreviews")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
