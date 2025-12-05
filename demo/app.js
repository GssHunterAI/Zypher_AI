// Zypher AI Demo - Static Version with Pre-configured Responses

// State
let currentSettings = {
    use_lora: false,
    lora_filename: null,
    num_steps: 4,
    width: 1024,
    height: 1024,
    use_ip_adapter: false,  // Kept for backward compatibility, now uses FLUX Redux
    ip_adapter_scale: 0.5,  // Redux influence strength
    reference_image: null
};

let conversationHistory = [];
let currentConversationId = null;
let uploadedImage = null;
let useWebSearch = false;

// Mock responses with demo images
const mockResponses = {
    "what kind": {
        text: "I can create a wide variety of logo designs for you! Including:\n\n• Modern Tech & Startup Logos - Clean, minimalist designs with geometric shapes\n• Brand Identity Logos - Professional designs for businesses\n• Eco-Friendly & Organic Logos - Nature-inspired designs with earthy tones\n• Fitness & Sports Logos - Dynamic, energetic designs\n• Food & Beverage Logos - Appetizing designs for restaurants and cafes\n• Professional Services - Law firms, consulting, finance\n• Creative & Artistic - Unique, expressive designs\n\nJust describe your vision, and I'll create a custom logo for you!",
        image: null
    },
    "design tips": {
        text: "Here are key tips for creating memorable logos:\n\n1. **Keep it Simple** - The best logos are clean and easy to recognize\n2. **Make it Scalable** - Should look good at any size\n3. **Use Appropriate Colors** - Colors convey emotions and meaning\n4. **Ensure Versatility** - Works in color and black & white\n5. **Be Unique** - Stand out from competitors\n6. **Make it Timeless** - Avoid trendy elements that date quickly\n7. **Consider Your Audience** - Design for your target market\n\nWould you like me to create a logo with these principles in mind?",
        image: null
    },
    "modern tech startup": {
        text: "I've created a modern tech startup logo for you! This design showcases:\n\n✨ Professional and contemporary aesthetic\n✨ Clean, memorable design elements\n✨ Strong visual identity\n✨ Perfect for innovative companies\n\nThis logo represents innovation, growth, and forward-thinking - ideal for a modern tech startup!",
        image: "assets/demo-logo-1.png"
    },
    "coffee shop": {
        text: "Here's a beautiful coffee shop logo designed for you:\n\n☕ Inviting and memorable design\n☕ Warm, welcoming aesthetic\n☕ Professional and approachable\n☕ Perfect for cafes and coffee brands\n\nThis design captures the essence of quality, comfort, and the perfect coffee experience!",
        image: "assets/demo-logo-2.png"
    },
    "fitness brand": {
        text: "Here's a dynamic fitness brand logo designed for you:\n\n💪 Bold and energetic design\n💪 Strong visual impact\n💪 Athletic and motivational\n💪 Perfect for gyms and fitness brands\n\nThis logo captures power, energy, and motivation - ideal for the fitness industry!",
        image: "assets/demo-logo-3.png"
    },
    "law firm": {
        text: "I've created a professional law firm logo for you:\n\n⚖️ Sophisticated and trustworthy design\n⚖️ Professional aesthetic\n⚖️ Strong sense of authority\n⚖️ Classic and timeless appeal\n\nThis design projects professionalism, trust, and credibility - perfect for legal services.",
        image: "assets/demo-logo-4.png"
    },
    "default": {
        text: "I've created a custom logo based on your description. In the full version, this would be generated using advanced AI models (Flux Schnell). This demo shows a sample output to give you an idea of the quality and style you can expect.\n\nThe actual application uses:\n• Flux Schnell AI model\n• Optional LoRA fine-tuning\n• Reference image influence\n• Customizable dimensions\n• Professional quality output",
        image: "assets/zypher.jpeg"
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    currentConversationId = generateConversationId();
    loadHistory();
    focusInput();
    setupTextareaAutoResize();
    setupEnterKeyHandler();
});

// Generate conversation ID
function generateConversationId() {
    return 'demo_conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// New chat
function newChat() {
    conversationHistory = [];
    currentConversationId = generateConversationId();
    document.getElementById('messages').innerHTML = '';
    document.getElementById('welcomeScreen').style.display = 'flex';
    document.getElementById('promptInput').value = '';
    focusInput();
}

// Send message
function sendMessage() {
    const input = document.getElementById('promptInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Hide welcome screen
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Show loading
    const loadingId = addLoadingMessage();
    
    // Simulate API delay
    setTimeout(() => {
        removeLoadingMessage(loadingId);
        generateMockResponse(message);
    }, 1500);
    
    // Save to history
    saveToHistory(message);
}

// Generate mock response
function generateMockResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = mockResponses.default;
    
    // Match keywords to responses
    if (lowerMessage.includes('what kind') || lowerMessage.includes('what can you')) {
        response = mockResponses["what kind"];
    } else if (lowerMessage.includes('tips') || lowerMessage.includes('advice') || lowerMessage.includes('memorable')) {
        response = mockResponses["design tips"];
    } else if (lowerMessage.includes('rocket') || (lowerMessage.includes('tech') || lowerMessage.includes('startup') || lowerMessage.includes('modern'))) {
        response = mockResponses["modern tech startup"];
    } else if (lowerMessage.includes('coffee') || lowerMessage.includes('cafe') || lowerMessage.includes('minimalist')) {
        response = mockResponses["coffee shop"];
    } else if (lowerMessage.includes('fitness') || lowerMessage.includes('gym') || lowerMessage.includes('vibrant') || lowerMessage.includes('sport')) {
        response = mockResponses["fitness brand"];
    } else if (lowerMessage.includes('law') || lowerMessage.includes('legal') || lowerMessage.includes('professional')) {
        response = mockResponses["law firm"];
    }
    
    addMessage(response.text, 'assistant', response.image);
}

// Add message to chat
function addMessage(text, sender, imageUrl = null, skipSave = false) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = sender === 'user' ? 'U' : 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    // Preserve line breaks and formatting
    textDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    contentDiv.appendChild(textDiv);
    
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Generated Logo';
        img.className = 'generated-image';
        img.onerror = function() {
            // If image fails to load, show a placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px; border-radius: 12px; text-align: center; color: white; margin-top: 12px;';
            placeholder.innerHTML = '<div style="font-size: 48px; margin-bottom: 12px;">🎨</div><div>Demo Logo Placeholder</div><div style="font-size: 12px; margin-top: 8px; opacity: 0.8;">Place your demo images in the assets/ folder</div>';
            contentDiv.appendChild(placeholder);
        };
        contentDiv.appendChild(img);
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom smoothly
    setTimeout(() => {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 100);
    
    // Only add to history and save if not loading from storage
    if (!skipSave) {
        conversationHistory.push({
            text: text,
            sender: sender,
            image: imageUrl,
            timestamp: Date.now()
        });
        
        // Save conversation to localStorage
        saveConversation();
    }
}

// Add loading message
function addLoadingMessage() {
    const messagesContainer = document.getElementById('messages');
    const loadingDiv = document.createElement('div');
    const loadingId = 'loading_' + Date.now();
    loadingDiv.id = loadingId;
    loadingDiv.className = 'message assistant';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'loading-dots';
    dotsDiv.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(dotsDiv);
    loadingDiv.appendChild(avatarDiv);
    loadingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(loadingDiv);
    
    // Scroll to bottom smoothly
    setTimeout(() => {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 100);
    
    return loadingId;
}

// Remove loading message
function removeLoadingMessage(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Use example prompt
function useExamplePrompt(button) {
    const promptText = button.querySelector('.prompt-text').textContent.trim();
    document.getElementById('promptInput').value = promptText;
    focusInput();
    sendMessage();
}

// Toggle settings modal
function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.toggle('open');
}

// Toggle sidebar (mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Update values
function updateStepsValue(value) {
    document.getElementById('stepsValue').textContent = value;
    currentSettings.num_steps = parseInt(value);
}

function updateWidthValue(value) {
    document.getElementById('widthValue').textContent = value;
    currentSettings.width = parseInt(value);
}

function updateHeightValue(value) {
    document.getElementById('heightValue').textContent = value;
    currentSettings.height = parseInt(value);
}

function updateIpAdapterScale(value) {
    document.getElementById('ipAdapterScaleValueInline').textContent = value;
    currentSettings.ip_adapter_scale = value / 100;
}

// Toggle FLUX Redux (image conditioning)
function toggleIpAdapter(checked) {
    currentSettings.use_ip_adapter = checked;
    const content = document.getElementById('referenceContent');
    content.style.display = checked ? 'block' : 'none';
}

// Toggle LoRA
function toggleLoraSettings() {
    const checked = document.getElementById('useLoraToggle').checked;
    currentSettings.use_lora = checked;
    const group = document.getElementById('loraSelectionGroup');
    if (group) {
        group.style.display = checked ? 'block' : 'none';
    }
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result;
        currentSettings.reference_image = e.target.result;
        document.getElementById('previewImgInline').src = e.target.result;
        document.getElementById('imagePreviewInline').style.display = 'block';
        document.getElementById('uploadAreaInline').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Remove reference image
function removeReferenceImage(event) {
    event.stopPropagation();
    uploadedImage = null;
    currentSettings.reference_image = null;
    document.getElementById('imagePreviewInline').style.display = 'none';
    document.getElementById('uploadAreaInline').style.display = 'flex';
    document.getElementById('referenceImageInput').value = '';
}

// Toggle web search
function toggleWebSearchButton() {
    useWebSearch = !useWebSearch;
    const btn = document.getElementById('webSearchToggleBtn');
    if (useWebSearch) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

// Save user profile
function saveUserProfile() {
    const fname = document.getElementById('fnameInput').value;
    const lname = document.getElementById('lnameInput').value;
    
    if (fname && lname) {
        localStorage.setItem('userProfile', JSON.stringify({ fname, lname }));
        alert('Profile saved! (Demo only - not persisted)');
    }
}

// Load model status
function loadModelStatus() {
    const statusDiv = document.getElementById('modelStatus');
    statusDiv.innerHTML = '<div class="status-message">✅ Demo Mode Active<br>No actual models loaded - this is a static demonstration.</div>';
}

// History management
function saveConversation() {
    // Save full conversation to localStorage
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '{}');
    savedConversations[currentConversationId] = {
        messages: conversationHistory,
        lastUpdated: Date.now()
    };
    localStorage.setItem('conversations', JSON.stringify(savedConversations));
}

function saveToHistory(message) {
    const history = getHistoryFromStorage();
    const historyItem = {
        id: currentConversationId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        timestamp: Date.now()
    };
    
    // Remove duplicate if exists
    const filtered = history.filter(item => item.id !== currentConversationId);
    filtered.unshift(historyItem);
    
    // Keep only last 20 items
    const trimmed = filtered.slice(0, 20);
    localStorage.setItem('chatHistory', JSON.stringify(trimmed));
    
    loadHistory();
}

function loadHistory() {
    const history = getHistoryFromStorage();
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<div style="color: var(--text-secondary); font-size: 13px; padding: 12px; text-align: center;">No chat history yet</div>';
        return;
    }
    
    history.forEach(item => {
        const button = document.createElement('button');
        button.className = 'history-item';
        button.textContent = item.title;
        button.onclick = () => loadConversation(item.id);
        if (item.id === currentConversationId) {
            button.classList.add('active');
        }
        historyList.appendChild(button);
    });
}

function loadConversation(conversationId) {
    // Load conversation from localStorage
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '{}');
    const conversation = savedConversations[conversationId];
    
    if (conversation) {
        // Clear current messages
        document.getElementById('messages').innerHTML = '';
        document.getElementById('welcomeScreen').style.display = 'none';
        
        // Load saved messages
        conversationHistory = conversation.messages || [];
        conversationHistory.forEach(msg => {
            addMessage(msg.text, msg.sender, msg.image, true); // Skip save when loading
        });
        
        currentConversationId = conversationId;
    } else {
        // Start new conversation with this ID
        currentConversationId = conversationId;
        conversationHistory = [];
        document.getElementById('messages').innerHTML = '';
        document.getElementById('welcomeScreen').style.display = 'flex';
    }
    
    loadHistory();
}

function clearAllHistory() {
    if (confirm('Are you sure you want to clear all chat history?')) {
        localStorage.removeItem('chatHistory');
        localStorage.removeItem('conversations');
        loadHistory();
        newChat();
    }
}

function getHistoryFromStorage() {
    const stored = localStorage.getItem('chatHistory');
    return stored ? JSON.parse(stored) : [];
}

// Textarea auto-resize
function setupTextareaAutoResize() {
    const textarea = document.getElementById('promptInput');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// Enter key handler
function setupEnterKeyHandler() {
    const textarea = document.getElementById('promptInput');
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Focus input
function focusInput() {
    setTimeout(() => {
        document.getElementById('promptInput').focus();
    }, 100);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('settingsModal');
    const settingsBtn = document.querySelector('.settings-btn-header');
    
    if (modal && modal.classList.contains('open') && 
        !modal.querySelector('.modal-content').contains(e.target) && 
        !settingsBtn.contains(e.target)) {
        modal.classList.remove('open');
    }
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});
