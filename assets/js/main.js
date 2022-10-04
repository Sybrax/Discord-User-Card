const input = document.querySelectorAll("input");
const profilLogo = document.querySelectorAll(".profil-logo");
const modal = document.querySelector(".modal-container");

const toggleModal = () => {
  modal.classList.toggle("active");
};

input.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      input.value = "";
      input.blur();
    }
  });
});

profilLogo.forEach((logo) => {
  logo.addEventListener("click", toggleModal);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    toggleModal();
  }
});
