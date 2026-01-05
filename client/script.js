const url = "http://localhost:3000/plants";

window.addEventListener("load", fetchData);

const plantForm = document.getElementById("plantForm");
const plantIdField = document.getElementById("plantId");
const listContainer = document.getElementById("listContainer");

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((plants) => renderList(plants))
    .catch((err) => console.error(err));
}

function renderList(plants) {
  listContainer.innerHTML = "";

  if (plants.length > 0) {
    let html = `<div class="row gap-4 justify-content-center">`;
    plants.forEach((plant) => {
      const bg = translateColor(plant.color, 0.3);
      const border = translateColor(plant.color, 1);

      html += `
            <div class="col-md-3 card p-3 plant-card" style="background-color: ${bg}; border: 2px solid ${border};">
                <div class="card-body text-center">
                    <h3 class="card-title">${plant.name}</h3>
                    <p class="card-text"><em>${plant.species}</em></p>
                    <hr>
                    <p>💧 ${plant.water}</p>
                    <p>📏 ${plant.height} cm</p>
                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-sm btn-light border" onclick="editPlant(${plant.id})">Ändra</button>
                        <button class="btn btn-sm btn-danger" onclick="deletePlant(${plant.id})">Ta bort</button>
                    </div>
                </div>
            </div>`;
    });
    html += `</div>`;
    listContainer.insertAdjacentHTML("beforeend", html);
  } else {
    listContainer.innerHTML = `<p class="text-white text-center">Inga växter hittades.</p>`;
  }
}

function deletePlant(id) {
  if (confirm("Är du säker?")) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
        showFeedback(data.message);
      });
  }
}

function editPlant(id) {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((plant) => {
      plantForm.name.value = plant.name;
      plantForm.species.value = plant.species;
      plantForm.water.value = plant.water;
      plantForm.height.value = plant.height;
      plantForm.color.value = plant.color;
      plantIdField.value = plant.id;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

plantForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const plantData = {
    name: plantForm.name.value,
    species: plantForm.species.value,
    water: plantForm.water.value,
    height: plantForm.height.value,
    color: plantForm.color.value,
  };

  const id = plantIdField.value;
  let method = "POST";

  if (id) {
    method = "PUT";
    plantData.id = id;
  }

  fetch(url, {
    method: method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(plantData),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchData();
      clearForm();
      showFeedback(data.message);
    });
});

document.getElementById("clearBtn").addEventListener("click", clearForm);
function clearForm() {
  plantForm.reset();
  plantIdField.value = "";
}

const feedbackModal = new bootstrap.Modal(
  document.getElementById("feedbackModal")
);
function showFeedback(message) {
  document.getElementById("modalBody").innerText = message;
  feedbackModal.show();
}

function translateColor(colorName, opacity) {
  const colors = {
    röd: "220, 53, 69",
    grön: "25, 135, 84",
    blå: "13, 110, 253",
    gul: "255, 193, 7",
    guld: "218, 165, 32",
    rosa: "214, 51, 132",
    vit: "255, 255, 255",
    lila: "111, 66, 193",
  };
  const rgb = colors[colorName.toLowerCase()] || "255, 255, 255";
  return `rgba(${rgb}, ${opacity})`;
}
