let film = [];
let filmler = {};

async function filmArama() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  };

  var film_Ad = document.querySelector(".film").value;
  const spinner = document.querySelector(".loading-spinner");
  var listContainer = document.querySelector(".film-list");

  listContainer.innerHTML = "";
  listContainer.appendChild(spinner);
  spinner.style.display = "block";

  fetch(`https://www.omdbapi.com/?apikey=16936c35&s=${film_Ad}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bir hata oluştu");
      }
      return response.json();
    })
    .then((data) => {
      spinner.style.display = "none";

      if (data.Response == "False") {
        alert("Film bulunamadı");
        return;
      }

      filmler = {
        ad: film_Ad,
      };

      film.push(filmler);
      console.log(film);

      data.Search.forEach((film) => {
        var div = document.createElement("div");
        var btn = document.createElement("button");
        btn.textContent = "➕ Favorilere Ekle";
        btn.style.padding = "10px 16px";
        btn.style.backgroundColor = "#6C63FF";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.transition = "all 0.3s ease";
        btn.style.fontWeight = "600";
        btn.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        btn.onmouseover = function () {
          btn.style.backgroundColor = "#5848e5";
        };

        btn.onmouseleave = function () {
          btn.style.backgroundColor = "#6C63FF";
        };

        btn.addEventListener("click", () => {
          let favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];
          const varMi = favoriler.some((f) => f.Title === film.Title);
          if (!varMi) {
            favoriler.push(film);
            localStorage.setItem("favoriler", JSON.stringify(favoriler));
            alert(`${film.Title} favorilere eklendi.`);
          } else {
            alert(`${film.Title} zaten favorilerde.`);
          }
        });

        div.className = "film-item";
        div.textContent = `Film İsmi: ${film_Ad}`;
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.alignItems = "center";
        div.style.gap = "5px";
        div.style.padding = "20px";
        div.style.marginBottom = "5px";
        div.style.color = "white";
        div.innerHTML = `
          <div>
            <strong>${film.Title}</strong> (${film.Year})
          </div>
        `;
        div.appendChild(btn);
        listContainer.appendChild(div);
      });
    })
    .catch((error) => {
      console.error(error);
      spinner.style.display = "none";
    });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function favorileriYukle(){
  const favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];
  const favoriContainer = document.querySelector(".c-2");

  favoriler.forEach((film) => {
    const div = document.createElement("div");
    div.className = "favori-item";
    div.style.color = "white";
    div.style.marginTop = "5px";
    div.textContent = `${film.Title} (${film.Year})`;
    favoriContainer.appendChild(div);
  });
}

window.onload = favorileriYukle;
