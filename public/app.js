fetch("/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
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
