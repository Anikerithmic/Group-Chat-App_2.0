const conversationForm = document.querySelector('.conversation-form');
const conversationInput = document.querySelector('.conversation-form-input');
const conversationButton = document.querySelector('.conversation-form-button');
const conversationWrapper = document.querySelector('.conversation-wrapper');

document.addEventListener('DOMContentLoaded', sendMessage);

    function sendMessage() {
        const message = conversationInput.value.trim();

        if (message !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('conversation-item', 'me');

            const content = `
                <div class="conversation-item-side"></div>
                <div class="conversation-item-content">
                    <div class="conversation-item-box">
                        <div class="conversation-item-text">${message}</div>
                    </div>
                </div>
            `;
            listItem.innerHTML = content;

            conversationWrapper.appendChild(listItem);

            conversationInput.value = '';
        }
    }

conversationButton.addEventListener('click', function () {
    sendMessage();
});

conversationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

