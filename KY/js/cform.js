$(document).ready(function () {
  var form = document.getElementById("ajax-contact-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("ajax-contact-form-status");
    const errorField = document.getElementById("form-errors");
    errorField.innerHTML = "";
    const data = new FormData(event.target);
    // convert to json
    const formObject = {};
    data.forEach((value, key) => {
      formObject[key] = value;
    });
    fetch(event.target.action, {
      method: form.method,
      body: JSON.stringify(formObject),
      headers: {
        contentType: "application/json",
        Accept: "application/json",
      },
      mode: "no-cors",
    })
      .then(() => {
        status.innerHTML = "Thanks for your submission!";
      })
      .catch(() => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }
  form.addEventListener("submit", handleSubmit);
});

function freset() {
  $("#note").html("");
  document.getElementById("ajax-contact-form").reset();
  $("#fields").show();
}
