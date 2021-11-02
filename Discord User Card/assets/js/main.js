const input = document.querySelectorAll("input");
const pflogo = document.querySelectorAll(".profil-logo");

for (let i = 0; i < input.length; i++) {
  const inp = input[i];
  inp.addEventListener("keydown", (button) => {
    if (button.key === "Enter") {
      inp.value = "";
      inp.blur();
    }
  });
}

for (let i = 0; i < pflogo.length; i++) {
  const logo = pflogo[i];
  logo.addEventListener("click", () => {
    alert("Le système n'est pas fait, à vous de le faire haha !");
  });
}
