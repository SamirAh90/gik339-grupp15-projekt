const url = "http://localhost:3000/res";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((res) => {
      if (res.length > 0) {
        let html =
          '<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">';
        res.forEach((res) => {
          html += `<li class="bg-${res.color}-200 basis-1/4 text-${res.color}-900 p-2 rounded-md border-2 border-${res.color}-400 flex flex-col justify-between">
          <h3>${res.firstName} ${res.lastName}</h3>
          <p>Användarnamn: ${res.username}</p>
          <div>
            <button class="border border-${res.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2">
              Ändra
            </button>
            <button class="border border-${res.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2">
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
    });
}

console.log(userForm);
userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    firstName: "",
    lastName: "",
    username: "",
    color: "",
  };
  serverUserObject.firstName = userForm.firstName.value;
  serverUserObject.lastName = userForm.lastName.value;
  serverUserObject.username = userForm.username.value;
  serverUserObject.color = userForm.color.value;

  console.log(serverUserObject);
}
