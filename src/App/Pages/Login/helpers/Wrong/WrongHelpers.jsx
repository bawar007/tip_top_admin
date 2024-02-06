const wrongClassSpan = "wrong";

const clearWrongSpan = (spanEl, inputs) =>
  setTimeout(() => {
    spanEl.innerHTML = "";
    spanEl.classList.remove(wrongClassSpan);
    inputs.forEach((input) => input.classList.remove("adminInputWrong"));
  }, 3000);

const addWrongClass = (spanEl, inputs, INFO) => {
  spanEl.classList.add(wrongClassSpan);

  if (INFO === "BAD_L_P") {
    spanEl.innerHTML = "Błędny login lub hasło";
  } else if (INFO === "NO_DATE") {
    spanEl.innerHTML = "wprowadz dane";
  }

  inputs.forEach((input) => input.classList.add("adminInputWrong"));
};

export const WrongHandler = (spanEl, inputs, INFO) => {
  clearWrongSpan(spanEl.current, inputs);
  addWrongClass(spanEl.current, inputs, INFO);
};
