fetch("https://example.com")
  .then((response) => response.text())
  .then((test) => console.log(test))
  .catch((error) => {
    console.error("Error fetching the page:", error);
  });
