let myForm = document.querySelector(".form");
let phone = document.querySelector("#phone");

phone.addEventListener("input", phoneInputMask);
function phoneInputMask(event) {
  if (!/^\+\d*$/.test(phone.value)) {
    phone.value = "+380";
  }
  if (!/\d/.test(event.key)) {
    event.preventDefault();
  }
}

function formValidation(form) {
  function removeErrorLabel(input) {
    let inputContainer = input.parentNode;
    if (inputContainer.classList.contains("error")) {
      inputContainer.querySelector(".error-label").remove();
      inputContainer.classList.remove("error");
    }
  }

  function createErrorLabel(input, text) {
    let inputContainer = input.parentNode;
    let errorLabel = document.createElement("label");
    errorLabel.textContent = text;
    errorLabel.classList.add("error-label");
    inputContainer.classList.add("error");
    inputContainer.append(errorLabel);
  }

  let result = true;
  let allInput = form.querySelectorAll("input");
  for (let input of allInput) {
    removeErrorLabel(input);

    if (input.dataset.item == "true") {
      if (input.value == "") {
        removeErrorLabel(input);
        createErrorLabel(input, "Поле не заповнене!");
        result = false;
      }
    }

    if (input.dataset.minLength) {
      if (
        input.value.length < input.dataset.minLength &&
        input.value.length != 0
      ) {
        removeErrorLabel(input);
        if (input.dataset.minLength < 5) {
          createErrorLabel(
            input,
            `Введіть не менше ніж ${input.dataset.minLength} символи`
          );
        } else {
          createErrorLabel(
            input,
            `Введіть не менше ніж ${input.dataset.minLength} символів`
          );
        }
        result = false;
      }
    }

    let email = document.querySelector("#email");
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value.match(mailFormat) && email.value != "") {
      removeErrorLabel(email);
      createErrorLabel(email, "Невірний формат Email");
      result = false;
    }
  }
  return result;
}

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formValidation(this) == true) {
    alert("Форма була відправлена!");
  }
});
