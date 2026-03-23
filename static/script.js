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

  let cleanText = currentJoke.replace(/😂|🤣|😅|😆/g, "");

  let speech = new SpeechSynthesisUtterance(cleanText);
  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

function saveJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  let saved = JSON.parse(localStorage.getItem("jokes")) || [];

  saved.push(currentJoke);

  localStorage.setItem("jokes", JSON.stringify(saved));

  alert("Saved locally 💾");
}

function loadSavedJokes() {
  let saved = JSON.parse(localStorage.getItem("jokes")) || [];

  let container = document.getElementById("savedJokes");

  if (!container) return;

  if (saved.length === 0) {
    container.innerHTML = "<p>No jokes saved 😢</p>";
    return;
  }

  container.innerHTML = "";

  saved.forEach(joke => {
    let p = document.createElement("p");
    p.innerText = joke;

    let hr = document.createElement("hr");

    container.appendChild(p);
    container.appendChild(hr);
  });
}


window.onload = loadSavedJokes;