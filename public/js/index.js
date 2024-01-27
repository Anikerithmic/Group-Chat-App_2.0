
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.querySelector('.conversation-form');
    const messageInput = document.querySelector('.conversation-form-input');
    const conversationWrapper = document.querySelector('.conversation-wrapper');
    let lastMessageId = null;

    // const fetchMessages = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.get('/chat/message', { headers: { "Authorization": token } });
    //         const messages = response.data;
    //         if (Array.isArray(messages)) {
    //             messages.forEach(message => {
    //                 renderMessage(message);
    //             });
    //         } else {
    //             console.error('Invalid messages data format:', messages);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching messages:', error);
    //     }
    // };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/chat/message', { headers: { "Authorization": token } });
            const messages = response.data;
            messages.forEach(message => {
                if (message.id > lastMessageId) {
                    renderMessage(message);
                    lastMessageId = message.id;
                }
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Function to render a single message
    const renderMessage = (message) => {
        const messageItem = document.createElement('li');
        messageItem.classList.add('conversation-item',);
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
        
    };

    const sendMessage = async (message) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/message', message, { headers: { "Authorization": token } });
            const newMessage = response.data.newMessage;
            renderMessage(newMessage);
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        const messageText = { message };
        if (message !== '') {
            sendMessage(messageText);
            messageInput.value = '';
        }
    });

    // fetchMessages();
    setInterval(fetchMessages, 1000);

});

