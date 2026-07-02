// ===============================
// WRITEHER - JELAJAHI AI
// ===============================

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const chips = document.querySelectorAll(".chip");

const resetButton = document.getElementById("resetChat");
const chatActions = document.getElementById("chatActions");

// ===============================
// Saat chip diklik
// ===============================
chips.forEach(chip => {
    chip.addEventListener("click", () => {
        input.value = chip.textContent;
        input.focus();
    });
});

// ===============================
// Tambahkan bubble chat
// ===============================
function addMessage(sender, message) {
    chatBox.classList.remove("hidden");
    chatActions.classList.remove("hidden");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    messageDiv.innerHTML = `
        <div class="bubble">
            ${message}
        </div>
    `;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===============================
// Reset Chat
// ===============================
resetButton.addEventListener("click", () => {
    chatBox.innerHTML = "";
    chatBox.classList.add("hidden");
    chatActions.classList.add("hidden");
    input.value = "";
    input.focus();
});

// ===============================
// Tanya ke backend Python
// ===============================
async function askGemini(question) {
    const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: question
        })
    });

    const data = await response.json();
    return data.reply;
}

// ===============================
// Kirim pesan
// ===============================
async function sendMessage() {
    const question = input.value.trim();

    if (question === "") {
        addMessage("ai", "😊 Yuk, ceritakan dulu minat atau tujuanmu.");
        return;
    }

    addMessage("user", question);
    input.value = "";

    addMessage("ai", `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `);

    button.disabled = true;
    button.textContent = "…";

    try {
        const answer = await askGemini(question);

        const lastMessage = chatBox.lastElementChild;
        lastMessage.innerHTML = `
            <div class="bubble">
                ${answer.replace(/\n/g, "<br>")}
            </div>
        `;
    } catch (error) {
        const lastMessage = chatBox.lastElementChild;
        lastMessage.innerHTML = `
            <div class="bubble">
                Maaf, backend Python belum bisa dihubungi. Pastikan Flask masih menyala ya.
            </div>
        `;
    }

    button.disabled = false;
    button.textContent = "➜";
    input.focus();
}

// ===============================
// Klik tombol kirim
// ===============================
button.addEventListener("click", sendMessage);

// ===============================
// Tekan Enter untuk kirim
// ===============================
input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        sendMessage();
    }
});