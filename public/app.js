fetch("/back/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
