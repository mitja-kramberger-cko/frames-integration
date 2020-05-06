const payButton = document.querySelector("#pay-button");
const form = document.querySelector("#payment-form");

Frames.init({
  publicKey: "pk_test_a1d5b0af-b7e6-4398-b5d6-6393c5b4c177"
});

Frames.addEventHandler(
  Frames.Events.CARD_VALIDATION_CHANGED,
  () => payButton.disabled = !Frames.isCardValid()
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  Frames.submitCard()
    .then(function (data) {
      Frames.addCardToken(form, data.token);
      form.submit();
    });
});