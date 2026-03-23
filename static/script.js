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
    console.error(error);
  }
}

// Speak joke
function speakJoke() {
  if (!currentJoke) {
    alert("Get a joke first!");
    return;
  }

  let cleanText = currentJoke.replace(/😂|🤣|😅|😆/g, "");

  let speech = new SpeechSynthesisUtterance(cleanText);
  speech.lang = "en-US";

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

// Save joke
async function saveJoke() {
  if (!currentJoke || currentJoke.length < 5) {
    alert("Get a valid joke first!");
    return;
  }

  console.log("Saving:", currentJoke); // debug

  try {
    const res = await fetch("/save_joke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ joke: currentJoke })
    });

    const data = await res.json();

    alert(data.message || "Saved!");
  } catch (error) {
    alert("Failed to save joke 😅");
    console.error(error);
  }
}