console.time("fetch");
fetch("https://www.example.com/")
  .then((response) => response.text())
  .then((test) => console.log(test))
  .catch((error) => console.log(error));
