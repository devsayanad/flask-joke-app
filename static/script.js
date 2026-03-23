let currentJoke = "";

async function getJoke() {
  const res = await fetch("/get_joke");
  const data = await res.json();

  currentJoke = data.joke;
  document.getElementById("joke").innerText = currentJoke;
}
function speakJoke() {
  
  let cleanText = currentJoke.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");

  let speech = new SpeechSynthesisUtterance(cleanText);
  speechSynthesis.speak(speech);
}

async function saveJoke() {
  if (!currentJoke) return alert("Get a joke first!");

  await fetch("/save_joke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ joke: currentJoke })
  });

  alert("Saved!");
}