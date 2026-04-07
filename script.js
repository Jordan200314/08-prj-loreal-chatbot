const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Conversation memory
let messages = [
  {
    role: "system",
    content: "You are L'Oréal's Smart Routine & Product Advisor 💄. Only answer questions about skincare, makeup, haircare, fragrances, and beauty routines. Be friendly and helpful."
  }
];

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
  messages.push({ role: "user", content: message });
  userInput.value = "";

  try {
    const workerUrl = "https://shrill-king-8935.marzoujt.workers.dev/";

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }) // ✅ must send 'messages' array
    });

    const data = await response.json();

    let reply = "";

    if (data.choices && data.choices[0]?.message?.content) {
      reply = data.choices[0].message.content;
    } else if (data.error) {
      reply = `⚠️ Error from API: ${data.error}`;
    } else {
      reply = "⚠️ Unexpected response from assistant.";
    }

    addMessage("ai", reply);
    messages.push({ role: "assistant", content: reply });

  } catch (error) {
    addMessage("ai", "⚠️ Error connecting to assistant.");
    console.error(error);
  }
});
