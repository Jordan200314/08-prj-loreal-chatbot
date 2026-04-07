/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

/* Add message to UI */
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Initial message */
addMessage(
  "ai",
  "👋 Hi! I'm your L’Oréal advisor. Ask me about skincare, haircare, or beauty routines!"
);

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  try {
    const response = await fetch(
      "https://divine-feather-df2a.marzoujt.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    console.log("Worker response:", data);

    addMessage(
      "ai",
      data.reply ||
        data.error ||
        "⚠️ Unexpected response from assistant."
    );
  } catch (error) {
    console.error(error);
    addMessage("ai", "⚠️ Error connecting to assistant.");
  }
});
