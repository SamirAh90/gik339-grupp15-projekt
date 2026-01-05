const url = "http://localhost:3000/res";

// Hämta formuläret från DOM
const userForm = document.getElementById("userForm");

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((users) => {
      // FIX: Bytte namn från 'res' till 'users' för tydlighet
      if (users.length > 0) {
        let html =
          '<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">';

        // FIX: Bytte namn från 'res' till 'user' inuti loopen
        users.forEach((user) => {
          html += `<li class="bg-${user.color}-200 basis-1/4 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between">
          <h3>${user.firstName} ${user.lastName}</h3>
          <p>Användarnamn: ${user.username}</p>
          <div>
            <button class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentUser('${user.id}')">
              Ändra
            </button>
            <button class="border border-${user.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deleteUser('${user.id}')">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += "</ul>";

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    })
    .catch((err) => console.error("Kunde inte hämta lista:", err));
}

function setCurrentUser(id) {
  console.log("Hämtar användare med ID:", id);

  fetch(`${url}/${id}`)
    .then((res) => {
      // Om status inte är 200-299 (t.ex. 404 eller 500) kasta fel
      if (!res.ok) throw new Error(`Server svarade med status: ${res.status}`);
      return res.json();
    })
    .then((user) => {
      console.log("Hämtad användardata:", user);
      // Här kan du senare lägga till kod för att fylla i formuläret med user-data
      // T.ex: userForm.firstName.value = user.firstName;
    })
    .catch((err) => console.error("Fetch error:", err));
}

function deleteUser(id) {
  console.log("Delete user with ID:", id);
  // Kom ihåg att implementera delete-logiken här sen
}

userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    firstName: userForm.firstName.value,
    lastName: userForm.lastName.value,
    username: userForm.username.value,
    color: userForm.color.value,
  };

  const request = new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request)
    .then((response) => response.json()) // Läste in JSON svaret
    .then((data) => {
      console.log("Svar från server:", data);
      userForm.reset();
      fetchData(); // Uppdatera listan direkt efter vi sparat
    })
    .catch((err) => console.error("Kunde inte spara:", err));
}
