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

// Version Checker | You can delete

fetch(
  "https://raw.githubusercontent.com/Sybrax/Discord-User-Card/main/assets/json/version.json"
)
  .then((response) => response.json())
  .then((response) => {
    $.getJSON("../assets/json/version.json", function (data) {
      versionUpdate(data, response);
    });
  })
  .catch((err) => {
    console.log("Version check error : " + err);
  });

function versionUpdate(a, n) {
  if (a.version < n.version) {
    $("body").append(function () {
      const div = document.createElement("div");
      div.classList.add("updateVersion");
      div.setAttribute("onClick", "this.remove()");
      div.innerHTML = `<p>The version you are testing is not up to date (${a.version}), the latest version (${n.version}) is available on <a href="https://github.com/Sybrax/Discord-User-Card">github</a>.</p>`;

      return div;
    });
  }
}
