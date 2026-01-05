// URL till API:et där växtdata lagras
const url = "http://localhost:3000/plants";

// Hämtar data automatiskt när sidan har laddats
window.addEventListener("load", fetchData);

// Hämtar viktiga element från HTML-formuläret och listan
const plantForm = document.getElementById("plantForm"); // Formuläret för att lägga till/ändra växter
const plantIdField = document.getElementById("plantId"); // Hidden input för att lagra ID vid redigering
const listContainer = document.getElementById("listContainer"); // Container där alla växtkort visas

// Funktion som hämtar alla växter från servern
function fetchData() {
  fetch(url) // Hämtar data från API
    .then((result) => result.json()) // Konverterar svaret till JSON
    .then((plants) => renderList(plants)) // Skickar data till renderList för att visa på sidan
    .catch((err) => console.error(err)); // Loggar fel om något går fel
}

// Funktion som visar växterna på sidan som kort
function renderList(plants) {
  listContainer.innerHTML = ""; // Rensar listan innan ny data visas

  if (plants.length > 0) {
    let html = `<div class="row gap-4 justify-content-center">`; // Startar rad för Bootstrap-kort

    // Loopar igenom varje växt i listan
    plants.forEach((plant) => {
      // Skapar bakgrundsfärg och ramfärg baserat på växtens färg
      const bg = translateColor(plant.color, 0.3); // Bakgrund med lite transparens
      const border = translateColor(plant.color, 1); // Ramfärg med full opacitet

      // Skapar HTML-kort med växtens information
      html += `
            <div class="col-md-3 card p-3 plant-card" style="background-color: ${bg}; border: 2px solid ${border};">
                <div class="card-body text-center">
                    <h3 class="card-title">${plant.name}</h3> <!-- Växtens namn -->
                    <p class="card-text"><em>${plant.species}</em></p> <!-- Växttyp -->
                    <hr>
                    <p>💧 ${plant.water}</p> <!-- Vattenbehov -->
                    <p>📏 ${plant.height} cm</p> <!-- Höjd -->
                    <div class="d-flex justify-content-between mt-3">
                        <!-- Knapp för att ändra växt -->
                        <button class="btn btn-sm btn-light border" onclick="editPlant(${plant.id})">Ändra</button>
                        <!-- Knapp för att ta bort växt -->
                        <button class="btn btn-sm btn-danger" onclick="deletePlant(${plant.id})">Ta bort</button>
                    </div>
                </div>
            </div>`;
    });

    html += `</div>`; // Stänger rad-div
    listContainer.insertAdjacentHTML("beforeend", html); // Lägger till korten i DOM
  } else {
    // Om inga växter finns visas meddelande
    listContainer.innerHTML = `<p class="text-white text-center">Inga växter hittades.</p>`;
  }
}

// Funktion som tar bort en växt baserat på ID
function deletePlant(id) {
  // Bekräftelseruta innan borttagning
  if (confirm("Är du säker?")) {
    fetch(`${url}/${id}`, { method: "DELETE" }) // Skickar DELETE-request till servern
      .then((res) => res.json()) // Konverterar svaret till JSON
      .then((data) => {
        fetchData(); // Uppdaterar listan med nya data
        showFeedback(data.message); // Visar bekräftelse i modal
      });
  }
}

// Funktion som hämtar en växts data och fyller formuläret för redigering
function editPlant(id) {
  fetch(`${url}/${id}`) // Hämtar växt med specifikt ID
    .then((res) => res.json()) // Konverterar till JSON
    .then((plant) => {
      // Fyller formuläret med befintlig data
      plantForm.name.value = plant.name;
      plantForm.species.value = plant.species;
      plantForm.water.value = plant.water;
      plantForm.height.value = plant.height;
      plantForm.color.value = plant.color;
      plantIdField.value = plant.id; // Sparar ID för uppdatering

      // Scrollar upp till formuläret för bättre användarupplevelse
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Funktion som körs när formuläret skickas
plantForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stoppar standardformulärsbeteende (sidladdning)

  // Samlar in data från formuläret
  const plantData = {
    name: plantForm.name.value,
    species: plantForm.species.value,
    water: plantForm.water.value,
    height: plantForm.height.value,
    color: plantForm.color.value,
  };

  const id = plantIdField.value; // Hämtar ID om växten ska uppdateras
  let method = "POST"; // Standard är POST för nya växter

  // Om ID finns används PUT för att uppdatera befintlig växt
  if (id) {
    method = "PUT";
    plantData.id = id;
  }

  // Skickar data till servern
  fetch(url, {
    method: method,
    headers: { "content-type": "application/json" }, // Anger att vi skickar JSON
    body: JSON.stringify(plantData), // Konverterar objekt till JSON
  })
    .then((res) => res.json()) // Konverterar serverns svar till JSON
    .then((data) => {
      fetchData(); // Uppdaterar listan efter ändring
      clearForm(); // Rensar formuläret
      showFeedback(data.message); // Visar bekräftelse i modal
    });
});

// Funktion som rensar formuläret
document.getElementById("clearBtn").addEventListener("click", clearForm);
function clearForm() {
  plantForm.reset(); // Tar bort all text från formuläret
  plantIdField.value = ""; // Nollställer hidden ID-fältet
}

// Skapar en Bootstrap-modal för feedback-meddelanden
const feedbackModal = new bootstrap.Modal(
  document.getElementById("feedbackModal")
);

// Funktion som visar ett meddelande i modal
function showFeedback(message) {
  document.getElementById("modalBody").innerText = message; // Sätter texten i modal
  feedbackModal.show(); // Visar modalen
}

// Funktion som översätter färgnamn till rgba-färg
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

  // Om färgen inte finns används vit som standard
  const rgb = colors[colorName.toLowerCase()] || "255, 255, 255";
  return `rgba(${rgb}, ${opacity})`; // Returnerar färg som rgba-sträng
}
