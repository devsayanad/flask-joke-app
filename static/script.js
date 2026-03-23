let currentJoke = "";

// Get joke
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

// Speak joke (emoji removed)
function speakJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  // REMOVE emojis safely
  let cleanText = currentJoke
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "") // emoji range
    .replace(/😂|🤣|😅|😆/g, "");           // common emojis

  let speech = new SpeechSynthesisUtterance(cleanText);

  speech.lang = "en-US";
  speech.rate = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

// Save joke
function saveJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  let saved = JSON.parse(localStorage.getItem("jokes")) || [];
  saved.push(currentJoke);

  localStorage.setItem("jokes", JSON.stringify(saved));

  alert("Saved 💾");
  loadSavedJokes();
}

// Load saved jokes
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

// Delete joke
function deleteJoke(index) {
  let saved = JSON.parse(localStorage.getItem("jokes")) || [];

  saved.splice(index, 1);

  localStorage.setItem("jokes", JSON.stringify(saved));

  loadSavedJokes();
}

// Auto load
window.onload = loadSavedJokes;