document.getElementById("userForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;

  var data = {
    name: name,
    mobile: mobile
  };

  // Send data to server-side script for processing
  fetch("/saveData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (response.ok) {
      alert("Data saved successfully!");
    } else {
      alert("Error saving data. Please try again.");
    }
  })
  .catch(function(error) {
    alert("An error occurred. Please try again later.");
    console.error(error);
  });
});
