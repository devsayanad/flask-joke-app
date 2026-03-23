let currentJoke = "";

// Get joke from Flask backend
async function getJoke() {
  try {
    const res = await fetch("/get_joke");
    const data = await res.json();

    currentJoke = data.joke;

    document.getElementById("joke").innerText = currentJoke;
  } catch (error) {
    document.getElementById("joke").innerText = "Failed to load joke 😅";
    console.error(error);
  }
}

// Speak joke (SAFE VERSION - no emoji regex)
function speakJoke() {
  if (!currentJoke) {
    alert("Get a joke first!");
    return;
  }

  // Optional light cleanup (safe for all browsers)
  let cleanText = currentJoke.replace(/😂|🤣|😅|😆/g, "");

  let speech = new SpeechSynthesisUtterance(cleanText);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.cancel(); // stop previous speech
  speechSynthesis.speak(speech);
}

// Save joke to backend
async function saveJoke() {
  if (!currentJoke) {
    alert("Get a joke first!");
    return;
  }

  try {
    await fetch("/save_joke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ joke: currentJoke })
    });

    alert("Saved successfully! 💾");
  } catch (error) {
    alert("Failed to save joke 😅");
    console.error(error);
  }
}