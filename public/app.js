//page buttons
const searchBtn = $(".search");
const homeBtn = $('a[href="#home"]');
const userSerarchBtn = $("#submitUser");
const bbqRecipesBtn = $('a[href="#bbqrecipes"]');
const bbqForumBtn = $('a[href="#bbqforum"]');
const bourbonForumBtn = $('a[href="#bourbonforum"]');
const bourbonReviewsBtn = $('a[href="#bourbonreviews"]');
// const $refreshBBQRecipeBtn = $(".refreshBBQRecipes");
const $addBBqRecipeBtn = $(".addBBqRecipe");
const $submitBourbonReview = $(".submitBourbonReview");
const $addBourbonReview = $(".addBourbonReview");
//
//page divs
const users = $(".users");
const bbqforum = $(".bbqForumContainer");
const bbqrecipes = $(".bbqRecipeContainer");
const bourbonforum = $(".bourbonForumContainer");
const bourbonreviews = $(".bourbonReviewContainer");
const bourbonReviewAll = $(".bourbonReviewAll");
const bbqRecipeTextArea = $(".bbqRecipeTextArea");
//
//page text fields
const userNameInput = $("#userName");
const firstName = $("#firstName");
const lastName = $("#lastName");
const userPassword = $("#userPassword");
const youTubeChannel = $("#youtubeChannel");
//
//opening prompt
const userName = prompt("Please Enter Your User Name.");
console.log(userName);
const user_idTextarea = $("#user_id");

fetch("/api/users")
  .then((res) => res.json())
  .then((data) => {
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
          user_idTextarea.val(userName);
          BourbonUser_id.val(userName);
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
bourbonReviewsBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "none");
  $(".bbqrecipes").css("display", "none");
  $(".selectedBBQRecipeAll").css("display", "none");
  $(".addBBqRecipe").css("display", "none");
  $(".bourbonReviewContainer").css("display", "block");
  $(".bourbonReviewAll").css("display", "block");
  $(".bourbonReviewTable").css("display", "block");
  $(".addBourbonReview").css("display", "block");
  $(".bourbonReviewTextArea").css("display", "none");
  $(".bbqRecipeTextArea").css("display", "none");

  fetch("/api/bourbonreviews")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#bourbonReviewTable tbody");
      data.forEach((bourbonreview) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${bourbonreview.user_name}</td>
    <td>${bourbonreview.bourbon_type}</td>
    <td>${bourbonreview.bourbon_name}</td>
    <td>${bourbonreview.review}</td>
    <td>${bourbonreview.notes}</td>
    `;
        tableBody.appendChild(row);
      });
    });
});
$addBourbonReview.on("click", () => {
  $(".bourbonReviewTextArea").css("display", "block");
  $(".bourbonReviewAll").css("display", "none");
  $(".addBourbonReview").css("display", "none");
});
const BourbonUser_id = $("#BourbonUser_id");
const bourbonType = $("#bourbonType");
const bourbonName = $("#bourbonName");
const review = $("#review");
const notes = $("#notes");

$submitBourbonReview.on("click", () => {
  fetch("/api/bourbonreviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: BourbonUser_id.val().trim(),
      bourbonType: bourbonType.val().trim(),
      bourbonName: bourbonName.val().trim(),
      review: review.val().trim(),
      notes: notes.val().trim(),
    }),
  }).then((res) => {
    if (res.ok) {
      alert("Review Added created successfully!");
      $(".bourbonReviewTextArea").css("display", "none");
      fetch("/api/bourbonreviews")
        .then((response) => response.json())
        .then((data) => {
          const tableBody = document.querySelector("#bourbonreviews tbody");
          data.forEach((bourbonreview) => {
            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${recipe.user_name}</td>
          <td>${recipe.title}</td>
          <td>${recipe.ingredients}</td>
          <td>${recipe.steps}</td>
          <td>${recipe.temperature}</td>
          <td>${recipe.comments}</td>
          <td>${recipe.post_date}</td>
        `;
            tableBody.appendChild(row);
          });
          $(".bourbonReviewAll").css("display", "block");
          $(".addBourbonReview").css("display", "block");
        });
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  });
});
//bbqrecipes clicked
const $bbqRecipes = $(".selectedBBQRecipeAll");

bbqRecipesBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "none");
  $(".bbqRecipeTextArea").css("display", "none");
  $(".bourbonReviewTextArea").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "block");
  $(".bbqrecipes").css("display", "flex");
  $(".selectedBBQRecipeAll").css("display", "flex");
  $(".addBBqRecipe").css("display", "block");

  console.log("I was clicked");
  fetch("/api/bbqrecipes")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#recipesTable tbody");
      data.forEach((recipe) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${recipe.user_name}</td>
          <td>${recipe.title}</td>
          <td>${recipe.ingredients}</td>
          <td>${recipe.steps}</td>
          <td>${recipe.temperature}</td>
          <td>${recipe.comments}</td>
          <td>${recipe.post_date}</td>
        `;
        tableBody.appendChild(row);
      });
    });
});
$addBBqRecipeBtn.on("click", () => {
  $(".bbqRecipeTextArea").css("display", "block");
  $(".bbqrecipes").css("display", "none");
});
const $submitRecipe = $(".submitRecipe");
const user_id = $("#user_id");
const recipeTitle = $("#recipeTitle");
const ingredients = $("#ingredients");
const steps = $("#steps");
const temperature = $("#temperature");
const comments = $("#comments");
const post_dateRecipe = $("#post_dateRecipe");

$submitRecipe.on("click", () => {
  fetch("/api/bbqrecipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id.val().trim(),
      title: recipeTitle.val().trim(),
      ingredients: ingredients.val().trim(),
      steps: steps.val().trim(),
      temperature: temperature.val(),
      comments: comments.val(),
      post_date: post_dateRecipe.val(),
    }),
  }).then((res) => {
    if (res.ok) {
      alert("Recipe Added created successfully!");
      $(".bbqRecipeTextArea").css("display", "none");
      user_id = "";
      title = "";
      ingredients = "";
      steps = "";
      temperature = "";
      comments = "";
      post_date = "";
      fetch("/api/bbqrecipes")
        .then((response) => response.json())
        .then((data) => {
          const tableBody = document.querySelector("#recipesTable tbody");
          data.forEach((recipe) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${recipe.user_name}</td>
            <td>${recipe.title}</td>
            <td>${recipe.ingredients}</td>
            <td>${recipe.steps}</td>
            <td>${recipe.temperature}</td>
            <td>${recipe.comments}</td>
            <td>${recipe.post_date}</td>
          `;
            tableBody.appendChild(row);
          });
          $(".bbqrecipes").css("display", "flex");
          $(".addBBqRecipe").css("display", "block");
        });
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  });
});
//allows us to ensure bourbon review list is updated.
//

homeBtn.on("click", () => {
  $(".newUser").css("display", "none");
  $(".bourbonForumContainer").css("display", "none");
  $(".bourbonReviewContainer").css("display", "none");
  $(".bbqRecipeTextArea").css("display", "none");
  $(".bourbonReviewTextArea").css("display", "none");
  $(".bbqForumContainer").css("display", "none");
  $(".bbqRecipeContainer").css("display", "none");
  $(".bbqrecipes").css("display", "none");
  $(".selectedBBQRecipeAll").css("display", "none");
  $(".addBBqRecipe").css("display", "none");
});
//add the below if there is time.
//bbqforum clicked
// bbqForumBtn.on("click", () => {
//   $(".newUser").css("display", "none");
//   $(".bourbonForumContainer").css("display", "none");
//   $(".bourbonReviewContainer").css("display", "none");
//   $(".bbqRecipeContainer").css("display", "none");
//   $(".bbqForumContainer").css("display", "block");
// });
// //
// //bourbon forum clicked
// bourbonForumBtn.on("click", () => {
//   $(".newUser").css("display", "none");
//   $(".bbqRecipeContainer").css("display", "none");
//   $(".bbqForumContainer").css("display", "none");
//   $(".bourbonReviewContainer").css("display", "none");
//   $(".bourbonForumContainer").css("display", "block");
// });
// //
// //bourbon review clicked
// bourbonReviewsBtn.on("click", () => {
//   $(".newUser").css("display", "none");
//   $(".bourbonForumContainer").css("display", "none");
//   $(".bbqRecipeContainer").css("display", "none");
//   $(".bbqForumContainer").css("display", "none");
//   $(".bourbonReviewContainer").css("display", "block");
// });
