const id = "G01-dsc";
const version = "1.1.1";

$("input").keyup(function (e) {
  console.log(e.key);
  if (e.key === "Enter") {
    this.value = "";
    this.blur();
  }
});

$(".profil-logo").click(function () {
  console.log("You clicked on logo !");
});
