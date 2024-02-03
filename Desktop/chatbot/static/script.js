function sendMessage() {
    let userInput = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let message = userInput.value;
    userInput.value = ""; // Clear the input after sending

    // Append user message to chat
    chatBox.innerHTML += `<div>User: ${message}</div>`;

    // Send the message to the Flask backend
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"message": message}),
    })
    .then(response => response.json())
    .then(data => {
        // Append bot reply to chat
        chatBox.innerHTML += `<div>Bot: ${data.reply}</div>`;
        // Auto scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
