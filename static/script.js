let currentJoke = "";


async function getJoke() {
  try {
    const res = await fetch("/get_joke");
    const data = await res.json();

    currentJoke = data.joke;
    document.getElementById("joke").innerText = currentJoke;
  } catch (error) {
    document.getElementById("joke").innerText = "Failed to load joke 😅";
  }
}


function speakJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  let speech = new SpeechSynthesisUtterance(currentJoke);
  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

function saveJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  let saved = JSON.parse(localStorage.getItem("jokes")) || [];
  saved.push(currentJoke);

  localStorage.setItem("jokes", JSON.stringify(saved));

  alert("Saved 💾");
  loadSavedJokes();
}

function loadSavedJokes() {
  let saved = JSON.parse(localStorage.getItem("jokes")) || [];
  let container = document.getElementById("savedJokes");

  if (!container) return;

  container.innerHTML = "";

  saved.forEach((joke, index) => {
    let div = document.createElement("div");

    div.innerHTML = `
      <p>${joke}</p>
      <button onclick="deleteJoke(${index})">🗑️ Delete</button>
      <hr>
    `;

    container.appendChild(div);
  });
}
function deleteJoke(index) {
  let saved = JSON.parse(localStorage.getItem("jokes")) || [];

  saved.splice(index, 1);

  localStorage.setItem("jokes", JSON.stringify(saved));

  loadSavedJokes();
}


window.onload = loadSavedJokes;