fetch("/api/mvp")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
