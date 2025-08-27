import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX, FiMail, FiPhone, FiUsers } from 'react-icons/fi';
import { FaRobot, FaLightbulb, FaCode, FaServer, FaMobile } from 'react-icons/fa';
import './index.css';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Nova, your digital assistant from InnovateSoft Solutions. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Common questions for a software solutions company
  const commonQuestions = [
    {
      category: "Services",
      questions: [
        "What services do you offer?",
        "Do you develop mobile apps?",
        "Do you provide cloud solutions?",
        "What industries do you serve?"
      ]
    },
    {
      category: "Projects",
      questions: [
        "How long does a typical project take?",
        "What's your development process?",
        "Do you work with startups?",
        "Can I see examples of your work?"
      ]
    },
    {
      category: "Pricing",
      questions: [
        "What are your pricing models?",
        "Do you offer maintenance packages?",
        "Is there a free consultation?",
        "What's included in your packages?"
      ]
    }
  ];

  // Knowledge base for the chatbot
  const knowledgeBase = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon"],
    services: ["services", "what do you offer", "what can you do", "development", "design"],
    pricing: ["price", "cost", "how much", "pricing", "budget"],
    contact: ["contact", "get in touch", "speak to someone", "talk to agent", "representative"],
    projects: ["project", "timeline", "process", "how long", "delivery"],
    portfolio: ["examples", "portfolio", "showcase", "previous work", "case studies"],
    technologies: ["technologies", "tech stack", "what technologies", "tools", "framework"],
    goodbye: ["bye", "goodbye", "see you", "thanks", "thank you", "that's all"]
  };

  // Responses for different categories
  const responses = {
    greeting: "Hello! I'm Nova, your digital assistant from InnovateSoft Solutions. How can I help you today?",
    services: "We offer a wide range of services including custom software development, web applications, mobile apps (iOS & Android), cloud solutions, DevOps, UI/UX design, and digital transformation consulting.",
    pricing: "We offer flexible pricing models: fixed-price projects, time & materials, and dedicated team options. Most projects range from $15,000 to $150,000+ depending on complexity. We'd be happy to provide a customized quote!",
    contact: "You can reach us at info@innovatesoft.com or call (800) 555-1234 during business hours (9AM-5PM EST). Would you like me to connect you with a solutions architect?",
    projects: "Our typical project timeline is 3-6 months from discovery to launch. We follow an agile methodology with 2-week sprints, regular demos, and continuous feedback loops to ensure we're building exactly what you need.",
    portfolio: "We've worked with companies across finance, healthcare, e-commerce, and education sectors. You can view our case studies at innovatesoft.com/portfolio. Any specific industry you're interested in?",
    technologies: "We work with modern technologies including React, Node.js, Python, .NET, AWS, Azure, React Native, Flutter, Kubernetes, and more. We choose the best stack for each project's requirements.",
    default: "I'm not sure I understand. Could you please rephrase your question? You can also ask about our services, pricing, or request to speak with a human representative.",
    goodbye: "Thank you for chatting with InnovateSoft Solutions! If you have more questions later, I'm always here. Have a great day!"
  };

  // Function to simulate API call delay
  const simulateAPIRequest = () => {
    return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  };

  // Function to categorize user message and generate appropriate response
  const generateResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate API request delay
    await simulateAPIRequest();
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Determine the category of the user's message
    let category = 'default';
    
    for (const [key, terms] of Object.entries(knowledgeBase)) {
      if (terms.some(term => lowerCaseMessage.includes(term))) {
        category = key;
        break;
      }
    }
    
    // Generate response based on category
    let responseText = responses[category] || responses.default;
    
    // Add follow-up for certain categories
    if (category === 'services') {
      responseText += " Is there a specific service you're interested in?";
    } else if (category === 'pricing') {
      responseText += " Would you like to schedule a free consultation to discuss your project?";
    } else if (category === 'contact') {
      responseText += " I can have someone contact you within 24 hours.";
    }
    
    setIsTyping(false);
    return responseText;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Generate and add bot response
    const botResponse = await generateResponse(inputText);
    
    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  // Handle quick question selection
  const handleQuickQuestion = async (question) => {
    setInputText(question);
    
    // Small delay to allow input text to update
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const chatContainer = document.getElementById('chatbot-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      {showChatbot && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <FaRobot className="chatbot-avatar" />
              <div>
                <h3>Nova Assistant</h3>
                <p>InnovateSoft Solutions</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setShowChatbot(false)}>
              <FiX />
            </button>
          </div>
          
          <div id="chatbot-messages" className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="quick-questions">
            <h4>Quick Questions</h4>
            {commonQuestions.map((category, index) => (
              <div key={index} className="question-category">
                <p>{category.category}</p>
                <div className="question-buttons">
                  {category.questions.map((question, qIndex) => (
                    <button
                      key={qIndex}
                      className="question-btn"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={isTyping}
            />
            <button onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
      
      <button className="chatbot-toggle-btn" onClick={() => setShowChatbot(!showChatbot)}>
        {showChatbot ? <FiX /> : <FiMessageSquare />}
        <span>Help</span>
      </button>
    </div>
  );
};

export default Chatbot;