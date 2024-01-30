
const messageForm = document.querySelector('.conversation-form');
const messageInput = document.querySelector('.conversation-form-input');
const conversationWrapper = document.querySelector('.conversation-wrapper');
let lastMessageId = null;


document.addEventListener('DOMContentLoaded', () => { // on domContentloaded initialy it fetches all the messags form the db
    fetchMessages();

    // // Loading messages from local storage on page load
    // const storedMessages = localStorage.getItem('messages');
    // if (storedMessages) {
    //     const parsedMessages = JSON.parse(storedMessages);

    //     renderMessage(parsedMessages);
    //     fetchNewMessages();
    // };
});

messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        // Sending message to the server on submit button
        try {
            const token = localStorage.getItem('token');
            console.log('msggg:', message);
            const response = await axios.post('/message', { message }, { headers: { "Authorization": token } });

            renderMessage(response.data.newMessage);

        } catch (error) {
            console.error('Error sending message:', error);
        }
        messageInput.value = '';
    }
});

const renderMessage = (message) => {
    const messageItem = document.createElement('li');
    messageItem.classList.add('conversation-item');
    messageItem.innerHTML = `
        <div class="conversation-item-content">
            <div class="conversation-item-wrapper">
                <div class="conversation-item-box">
                    <div class="conversation-item-text">
                        <p>${message.message}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    conversationWrapper.appendChild(messageItem);
    lastMessageId = message.id;
};

const fetchMessages = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/chat/message`, { headers: { "Authorization": token } });

        if (response.data.messages && Array.isArray(response.data.messages)) {
            if (response.data.messages.length > 0) {

                response.data.messages.forEach(message => {
                    renderMessage(message);
                });

                // Stores messages in localstorage 
                localStorage.setItem('messages', JSON.stringify(response.data.messages));
            } else {
                console.log("No messages to fetch");
            }
        } else {
            console.log("Invalid or empty message data in the response");

        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

const fetchNewMessages = async () => {
    try {
        if (lastMessageId === undefined) {
            lastMessageId = 0;
        }
        const token = localStorage.getItem('token');
        const response = await axios.get(`/chat/newMessages?id=${lastMessageId}`, { headers: { "Authorization": token } });

        if (response.data.messages && response.data.messages.length > 0) {
    
            response.data.messages.forEach(message => {
                renderMessage(message);
            });

            // Concatenating the new messages with old stored messages.
            let storedMessages = JSON.parse(localStorage.getItem('messages'));
            if (!Array.isArray(storedMessages)) {
                storedMessages = [];
            }
            storedMessages = storedMessages.concat(response.data.messages);
            localStorage.setItem('messages', JSON.stringify(storedMessages));

            // Update lastMessageId if needed
            lastMessageId = response.data.messages[response.data.messages.length - 1].id;
        } else {
            console.log("No new messages");
        }
    } catch (error) {
        console.error('Error fetching new messages:', error);
    }
};

setInterval(fetchNewMessages, 1000);


