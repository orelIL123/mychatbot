// GPT-Chat Widget for Business Websites
// Version 1.0.0

(function() {
  // Widget configuration
  const config = {
    apiUrl: '/api/chat', // Will be replaced during initialization
    clientId: null, // Will be set during initialization
    position: 'bottom-right',
    primaryColor: '#0078ff',
    secondaryColor: '#f0f4f8',
    headerText: 'שאל/י אותנו',
    placeholderText: 'הקלד/י הודעה...',
    welcomeMessage: 'שלום! במה אוכל לעזור לך היום?',
    logoUrl: null, // Optional custom logo
    autoOpen: false, // Whether to auto-open the chat on page load
    language: 'he' // Default language (Hebrew)
  };

  // Widget state
  const state = {
    isOpen: false,
    messages: [],
    isTyping: false
  };

  // Create widget elements
  function createWidgetElements() {
    // Create main container
    const container = document.createElement('div');
    container.id = 'gpt-chat-widget-container';
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.direction = 'rtl'; // RTL for Hebrew
    
    // Position the widget
    if (config.position === 'bottom-right') {
      container.style.bottom = '20px';
      container.style.right = '20px';
    } else if (config.position === 'bottom-left') {
      container.style.bottom = '20px';
      container.style.left = '20px';
    }
    
    // Create chat button
    const chatButton = document.createElement('div');
    chatButton.id = 'gpt-chat-widget-button';
    chatButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/></svg>';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.backgroundColor = config.primaryColor;
    chatButton.style.display = 'flex';
    chatButton.style.justifyContent = 'center';
    chatButton.style.alignItems = 'center';
    chatButton.style.cursor = 'pointer';
    chatButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    chatButton.style.transition = 'all 0.3s ease';
    
    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'gpt-chat-widget-window';
    chatWindow.style.display = 'none';
    chatWindow.style.flexDirection = 'column';
    chatWindow.style.position = 'absolute';
    chatWindow.style.bottom = '80px';
    chatWindow.style.right = '0';
    chatWindow.style.width = '350px';
    chatWindow.style.height = '500px';
    chatWindow.style.backgroundColor = '#fff';
    chatWindow.style.borderRadius = '10px';
    chatWindow.style.overflow = 'hidden';
    chatWindow.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    
    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.id = 'gpt-chat-widget-header';
    chatHeader.style.padding = '15px';
    chatHeader.style.backgroundColor = config.primaryColor;
    chatHeader.style.color = '#fff';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    
    const headerText = document.createElement('div');
    headerText.textContent = config.headerText;
    
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '&times;';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    
    chatHeader.appendChild(headerText);
    chatHeader.appendChild(closeButton);
    
    // Create chat messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'gpt-chat-widget-messages';
    messagesContainer.style.flex = '1';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.padding = '15px';
    messagesContainer.style.display = 'flex';
    messagesContainer.style.flexDirection = 'column';
    messagesContainer.style.gap = '10px';
    
    // Create chat input area
    const inputArea = document.createElement('div');
    inputArea.id = 'gpt-chat-widget-input-area';
    inputArea.style.padding = '15px';
    inputArea.style.borderTop = '1px solid #e0e0e0';
    inputArea.style.display = 'flex';
    
    const textInput = document.createElement('input');
    textInput.id = 'gpt-chat-widget-input';
    textInput.type = 'text';
    textInput.placeholder = config.placeholderText;
    textInput.style.flex = '1';
    textInput.style.padding = '10px';
    textInput.style.border = '1px solid #e0e0e0';
    textInput.style.borderRadius = '20px';
    textInput.style.outline = 'none';
    
    const sendButton = document.createElement('button');
    sendButton.id = 'gpt-chat-widget-send';
    sendButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/></svg>';
    sendButton.style.marginRight = '10px';
    sendButton.style.backgroundColor = config.primaryColor;
    sendButton.style.color = '#fff';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '50%';
    sendButton.style.width = '40px';
    sendButton.style.height = '40px';
    sendButton.style.display = 'flex';
    sendButton.style.justifyContent = 'center';
    sendButton.style.alignItems = 'center';
    sendButton.style.cursor = 'pointer';
    
    inputArea.appendChild(textInput);
    inputArea.appendChild(sendButton);
    
    // Assemble the chat window
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);
    
    // Add elements to container
    container.appendChild(chatWindow);
    container.appendChild(chatButton);
    
    // Add container to document
    document.body.appendChild(container);
    
    // Return references to elements
    return {
      container,
      chatButton,
      chatWindow,
      closeButton,
      messagesContainer,
      textInput,
      sendButton
    };
  }

  // Add event listeners to widget elements
  function addEventListeners(elements) {
    const { chatButton, closeButton, textInput, sendButton } = elements;
    
    // Toggle chat window when button is clicked
    chatButton.addEventListener('click', () => {
      toggleChatWindow();
    });
    
    // Close chat window when close button is clicked
    closeButton.addEventListener('click', () => {
      toggleChatWindow(false);
    });
    
    // Send message when send button is clicked
    sendButton.addEventListener('click', () => {
      sendMessage();
    });
    
    // Send message when Enter key is pressed
    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Toggle chat window visibility
  function toggleChatWindow(forceState = null) {
    const chatWindow = document.getElementById('gpt-chat-widget-window');
    
    // Set state based on forceState or toggle current state
    state.isOpen = forceState !== null ? forceState : !state.isOpen;
    
    // Update UI
    chatWindow.style.display = state.isOpen ? 'flex' : 'none';
    
    // If opening for the first time and no messages, add welcome message
    if (state.isOpen && state.messages.length === 0) {
      addMessage('assistant', config.welcomeMessage);
    }
  }

  // Add a message to the chat
  function addMessage(role, content) {
    // Add to state
    state.messages.push({ role, content });
    
    // Create message element
    const messagesContainer = document.getElementById('gpt-chat-widget-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `gpt-chat-widget-message ${role}`;
    messageElement.style.maxWidth = '80%';
    messageElement.style.padding = '10px 15px';
    messageElement.style.borderRadius = '18px';
    messageElement.style.marginBottom = '5px';
    
    // Style based on role
    if (role === 'user') {
      messageElement.style.alignSelf = 'flex-start';
      messageElement.style.backgroundColor = config.secondaryColor;
    } else {
      messageElement.style.alignSelf = 'flex-end';
      messageElement.style.backgroundColor = config.primaryColor;
      messageElement.style.color = '#fff';
    }
    
    messageElement.textContent = content;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    state.isTyping = true;
    
    const messagesContainer = document.getElementById('gpt-chat-widget-messages');
    const typingElement = document.createElement('div');
    typingElement.id = 'gpt-chat-widget-typing';
    typingElement.className = 'gpt-chat-widget-message assistant';
    typingElement.style.alignSelf = 'flex-end';
    typingElement.style.backgroundColor = config.primaryColor;
    typingElement.style.color = '#fff';
    typingElement.style.maxWidth = '80%';
    typingElement.style.padding = '10px 15px';
    typingElement.style.borderRadius = '18px';
    typingElement.style.marginBottom = '5px';
    typingElement.innerHTML = '<span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span>';
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add animation
    const dots = typingElement.querySelectorAll('.typing-dot');
    dots.forEach((dot, index) => {
      dot.style.animation = `typingAnimation 1.4s ${index * 0.2}s infinite`;
    });
    
    // Add animation keyframes
    if (!document.getElementById('gpt-chat-widget-styles')) {
      const style = document.createElement('style');
      style.id = 'gpt-chat-widget-styles';
      style.innerHTML = `
        @keyframes typingAnimation {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    state.isTyping = false;
    
    const typingElement = document.getElementById('gpt-chat-widget-typing');
    if (typingElement) {
      typingElement.remove();
    }
  }

  // Send message to API
  async function sendMessage() {
    const textInput = document.getElementById('gpt-chat-widget-input');
    const message = textInput.value.trim();
    
    // Don't send empty messages
    if (!message) return;
    
    // Clear input
    textInput.value = '';
    
    // Add user message to chat
    addMessage('user', message);
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      // Send request to API
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          clientId: config.clientId
        })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // Hide typing indicator
      hideTypingIndicator();
      
      // Add assistant response to chat
      addMessage('assistant', data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Hide typing indicator
      hideTypingIndicator();
      
      // Add error message
      addMessage('assistant', 'מצטער, אירעה שגיאה בעת שליחת ההודעה. אנא נסה שוב מאוחר יותר.');
    }
  }

  // Initialize the widget
  function init(options = {}) {
    // Merge options with default config
    Object.assign(config, options);
    
    // Create widget elements
    const elements = createWidgetElements();
    
    // Add event listeners
    addEventListeners(elements);
    
    // Auto-open if configured
    if (config.autoOpen) {
      setTimeout(() => {
        toggleChatWindow(true);
      }, 1000);
    }
  }

  // Expose public API
  window.GPTChatWidget = {
    init,
    open: () => toggleChatWindow(true),
    close: () => toggleChatWindow(false),
    toggle: () => toggleChatWindow()
  };
})();
