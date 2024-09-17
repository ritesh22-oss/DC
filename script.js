const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playFemaleVoice('${inpWord}')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ""}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// Function to play the word in a female voice using Web Speech API
function playFemaleVoice(text) {
    const speech = new SpeechSynthesisUtterance(text);  // Create a new speech object
    const voices = window.speechSynthesis.getVoices();  // Get available voices
    // Set to a female voice if available
    speech.voice = voices.find(voice => voice.name.includes("Female") || voice.gender === "female") || voices[0];
    speech.pitch = 1.2;  // Set a higher pitch for a female-like voice
    speech.rate = 0.9;   // Adjust the rate of speech to sound more natural
    window.speechSynthesis.speak(speech);  // Speak the text
}
