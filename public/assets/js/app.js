/**
 * public/assets/js/app.js — the only browser-side (client) JavaScript.
 *
 * Everything else runs on the server; THIS file runs in the visitor's
 * browser (it is sent to the page by footer.ejs).
 *
 * Its job: replace the browser's native window.confirm() popup with a
 * styled in-page modal. Any <form> that has a `data-confirm="..."`
 * attribute (e.g. the Delete buttons) will, instead of submitting
 * immediately, open the shared modal defined in footer.ejs and only
 * submit if the user clicks "Confirm".
 *
 * It uses Bootstrap's modal CSS classes but is shown/hidden manually
 * here, so no jQuery or Bootstrap JS is required (and it stays within
 * our strict Content Security Policy, which only allows same-origin JS).
 */

(function () {
  "use strict";

  // Grab the modal and its parts once the page is ready.
  var modal = document.getElementById("confirmModal");
  if (!modal) return; // safety: no modal on this page

  var messageEl = document.getElementById("confirmModalMessage");
  var okBtn = document.getElementById("confirmModalOk");

  // The form waiting for confirmation (set when a guarded form is submitted).
  var pendingForm = null;
  // The backdrop element we create while the modal is open.
  var backdrop = null;

  function openModal(message) {
    messageEl.textContent = message;

    // Dark overlay behind the modal (Bootstrap styles .modal-backdrop).
    backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade show";
    document.body.appendChild(backdrop);
    document.body.classList.add("modal-open");

    // Show the modal (Bootstrap hides .modal by default).
    modal.style.display = "block";
    modal.classList.add("show");
    modal.removeAttribute("aria-hidden");
    okBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    if (backdrop) {
      backdrop.remove();
      backdrop = null;
    }
    document.body.classList.remove("modal-open");
    pendingForm = null;
  }

  // Intercept submissions of any form that asks for confirmation.
  document.addEventListener("submit", function (event) {
    var form = event.target;
    var message = form.getAttribute("data-confirm");
    if (!message) return; // form doesn't need confirmation

    event.preventDefault(); // stop the immediate submit
    pendingForm = form;
    openModal(message);
  });

  // "Confirm" -> actually submit the stored form.
  // form.submit() does NOT re-fire the submit event, so there is no loop.
  okBtn.addEventListener("click", function () {
    var form = pendingForm;
    closeModal();
    if (form) form.submit();
  });

  // Any element marked data-modal-dismiss (Cancel / X) closes the modal.
  modal.addEventListener("click", function (event) {
    if (event.target.closest("[data-modal-dismiss]")) closeModal();
    // Click on the dark area outside the dialog also closes it.
    if (event.target === modal) closeModal();
  });

  // Pressing Escape closes the modal too.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
