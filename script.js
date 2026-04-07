const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Add message to chat
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Initial message
addMessage("ai", "👋 Hi! I'm your L’Oréal advisor. Ask me about skincare, haircare, or beauty routines!");

// Send message
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch("https://shrill-king-8935.marzoujt.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    addMessage("ai", data.reply);
  } catch (error) {
    addMessage("ai", "⚠️ Error connecting to assistant.");
    console.error(error);
  }
});