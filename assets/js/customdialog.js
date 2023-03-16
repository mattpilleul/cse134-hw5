const Alert = document.getElementById("alert");
const Confirm = document.getElementById("confirm");
const Prompt = document.getElementById("prompt");

const AlertDialog = document.getElementById("alertDialog");
const ConfirmDialog = document.getElementById("confirmDialog");
const PromptDialog = document.getElementById("promptDialog");

const alertButton = document.getElementById("alertButton"); // alert
const cancelButton = document.getElementById("cancelButton"); // confirm
const confirmButton = document.getElementById("confirmButton"); // confirm
const promptCancelButton = document.getElementById("promptCancelButton"); // prompt
const submitButton = document.getElementById("submitButton"); // prompt

const answerText = document.getElementById("answerText");

Alert.addEventListener("click", () => {
  document.getElementById("answerUser").innerText = "";
  AlertDialog.showModal();
});

alertButton.addEventListener("click", () => {
  AlertDialog.close();
});

Confirm.addEventListener("click", () => {
  document.getElementById("answerUser").innerText = "";
  ConfirmDialog.showModal();
});

cancelButton.addEventListener("click", () => {
  document.getElementById("answerUser").innerText =
    "Oh, too bade 😢\n Probably next time.";
});

confirmButton.addEventListener("click", () => {
  document.getElementById("answerUser").innerText = "Great ! Let's start 😎";
});

Prompt.addEventListener("click", () => {
  document.getElementById("answerUser").innerText = "";
  PromptDialog.showModal();
});

promptCancelButton.addEventListener("click", () => {
  document.getElementById("answerUser").innerText =
    "User did not enter anything.\nProbably an error, hope someone will soon want to work with me !";
});

submitButton.addEventListener("click", () => {
  let clean = DOMPurify.sanitize(answerText.value);
  switch (true) {
    case answerText.value.length == 0:
      document.getElementById("answerUser").innerText =
        "User did not enter anything.\nI'm not sure about your answer, can you tell me again !";
      break;
    case answerText.value.length > 0:
      document.getElementById(
        "answerUser"
      ).innerText = `User message is the following : \n"${clean}"`;
      break;
    default:
      break;
  }
});
