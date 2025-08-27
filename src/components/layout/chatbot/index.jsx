import React, { useState } from 'react';
import ChatBot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './index.css';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { FaRobot, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';

// Chatbot config
const config = {
  initialMessages: [
    {
      id: 1,
      message: 'Hello! I\'m Bot Assistant. How can I help you today?',
      type: 'bot',
    },
  ],
  botName: 'Bot Assistant',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#4361ee',
    },
    chatButton: {
      backgroundColor: '#4361ee',
    },
  },
  customComponents: {
    header: () => (
      <div className="chatbot-header">
        <FaRobot className="chatbot-header-icon" />
        <h3>Bot Assistant</h3>
        <button className="chatbot-close-btn">
          <FiX />
        </button>
      </div>
    ),
  },
  widgets: [
    {
      widgetName: 'roleSelector',
      widgetFunc: (props) => <RoleSelector {...props} />,
      mapStateToProps: ['messages'],
    },
    {
      widgetName: 'commonQuestions',
      widgetFunc: (props) => <CommonQuestions {...props} />,
      mapStateToProps: ['messages'],
    },
    {
      widgetName: 'customQueryOption',
      widgetFunc: (props) => <CustomQueryOption {...props} />,
      mapStateToProps: ['messages'],
    },
    {
      widgetName: 'followUpOptions',
      widgetFunc: (props) => <FollowUpOptions {...props} />,
      mapStateToProps: ['messages'],
    },
    {
      widgetName: 'voiceSettings',
      widgetFunc: (props) => <VoiceSettings {...props} />,
      mapStateToProps: ['messages'],
    },
  ],
};

// Helper function to clean and shorten response
const cleanResponse = (text) => {
  let cleaned = text.replace(/[*_`#\[\]]/g, '');
  const sentences = cleaned.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length > 3) {
    cleaned = sentences.slice(0, 3).join('. ') + '.';
  }
  cleaned = cleaned.replace(/https?:\/\/\S+/g, '[link]');
  cleaned = cleaned.trim();
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }
  return cleaned;
};

// API function to query your Flask RAG endpoint
const fetchRAGResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/rag/query',
      { question: userMessage },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return cleanResponse(response.data.answer || "Sorry, I couldn't understand your question.");
  } catch (error) {
    console.error('Error querying RAG API:', error);
    if (error.response?.status === 429) {
      return "I'm getting too many requests. Please wait a moment and try again.";
    }
    return "I'm having trouble responding. Please try again later.";
  }
};

// Common questions for each role
const roleQuestions = {
  softwareEngineer: [
    "How to estimate story points accurately?",
    "What should I do if I'm blocked on a task?",
    "How to handle technical debt in Agile?",
    "What's the best way to collaborate with QA?",
    "How to improve code reviews in Agile?"
  ],
  scrumMaster: [
    "How to facilitate effective standups?",
    "What to do when sprint goals aren't met?",
    "How to handle team conflicts in Agile?",
    "What metrics are most useful for Scrum Masters?",
    "How to improve team velocity?"
  ],
  qaEngineer: [
    "How to write effective test cases in Agile?",
    "What's the best way to report bugs?",
    "How to collaborate with developers in Agile?",
    "How to prioritize testing in short sprints?",
    "What automation tools work best in Agile?"
  ],
  projectManager: [
    "How to track project progress effectively?",
    "What's the best way to manage stakeholder expectations?",
    "How to handle scope creep in projects?",
    "What project metrics are most important?",
    "How to improve team productivity?"
  ]
};

// Widget components
const RoleSelector = ({ actions }) => {
  const handleRoleSelect = (role) => {
    actions.handleRoleSelection(role);
  };

  return (
    <div className="role-selector">
      <button onClick={() => handleRoleSelect('softwareEngineer')} className="role-btn">
        Software Engineer
      </button>
      <button onClick={() => handleRoleSelect('scrumMaster')} className="role-btn">
        Scrum Master
      </button>
      <button onClick={() => handleRoleSelect('qaEngineer')} className="role-btn">
        QA Engineer
      </button>
      <button onClick={() => handleRoleSelect('projectManager')} className="role-btn">
        Project Manager
      </button>
    </div>
  );
};

const CommonQuestions = ({ actions, payload }) => {
  const questions = roleQuestions[payload.role] || [];
  
  const handleQuestionClick = (question) => {
    actions.handleCommonQuestion(question);
  };

  return (
    <div className="common-questions">
      {questions.map((question, index) => (
        <button 
          key={index} 
          onClick={() => handleQuestionClick(question)}
          className="question-btn"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

const CustomQueryOption = ({ actions }) => {
  return (
    <div className="custom-query-option">
      <p>Type your question below and press enter:</p>
    </div>
  );
};

const FollowUpOptions = ({ actions }) => {
  return (
    <div className="follow-up-options">
      <button onClick={() => actions.handleRestart()} className="follow-up-btn">
        Ask another question
      </button>
    </div>
  );
};

const VoiceSettings = ({ actions, voices }) => {
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    const voice = voices.find(v => v.name === voiceName);
    setSelectedVoice(voiceName);
    actions.setSelectedVoice(voice);
  };

  return (
    <div className="voice-settings">
      <div className="voice-toggle">
        <button onClick={actions.toggleVoice} className="voice-btn">
          {actions.voiceEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
        <span>{actions.voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
      </div>
      {actions.voiceEnabled && (
        <div className="voice-selector">
          <label htmlFor="voice-select">Narrator:</label>
          <select 
            id="voice-select" 
            onChange={handleVoiceChange}
            value={selectedVoice || ''}
          >
            <option value="">Default</option>
            {voices.filter(v => v.lang.includes('en')).map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

// Action Provider
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [userRole, setUserRole] = useState(null);
  const [showCustomQueryOption, setShowCustomQueryOption] = useState(false);
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const speakMessage = (message) => {
    if (voiceEnabled) {
      const voiceToUse = selectedVoice || voices.find(v => v.default) || voices[0];
      if (voiceToUse) {
        speak({ text: message, voice: voiceToUse });
      }
    }
  };

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello! What is your role in your Agile project?', {
      widget: 'roleSelector'
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    speakMessage('Hello! What is your role in your Agile project?');
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    const roleDisplayName = role === 'qaEngineer' ? 'QA Engineer' : 
                         role === 'projectManager' ? 'Project Manager' : 
                         role === 'scrumMaster' ? 'Scrum Master' : 'Software Engineer';
    
    const message = `Great! As a ${roleDisplayName}, here are some common questions you might have:`;
    const botMessage = createChatBotMessage(message, {
      widget: 'commonQuestions',
      payload: { role }
    });
    
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    speakMessage(message);
    
    setTimeout(() => {
      const customQueryMessage = createChatBotMessage('Or you can ask your own question:', {
        widget: 'customQueryOption'
      });
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, customQueryMessage],
      }));
      speakMessage('Or you can ask your own question:');
      setShowCustomQueryOption(true);
    }, 1000);
  };

  const handleCommonQuestion = async (question) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, createChatBotMessage('Answer is...', { loading: true })],
    }));

    const reply = await fetchRAGResponse(question);
    
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter(msg => !msg.loading).concat(createChatBotMessage(reply)),
    }));
    speakMessage(reply);
    
    const followUpMessage = createChatBotMessage('Would you like to ask another question?', {
      widget: 'followUpOptions'
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, followUpMessage],
    }));
    speakMessage('Would you like to ask another question?');
  };

  const handleCustomQuery = async (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, createChatBotMessage('Answer is...', { loading: true })],
    }));

    const reply = await fetchRAGResponse(message);
    
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter(msg => !msg.loading).concat(createChatBotMessage(reply)),
    }));
    speakMessage(reply);
    
    const followUpMessage = createChatBotMessage('Would you like to ask another question?', {
      widget: 'followUpOptions'
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, followUpMessage],
    }));
    speakMessage('Would you like to ask another question?');
  };

  const handleRestart = () => {
    setUserRole(null);
    setShowCustomQueryOption(false);
    const botMessage = createChatBotMessage('Okay, let me know how I can help you!', {
      widget: 'roleSelector'
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    speakMessage('Okay, let me know how I can help you!');
  };

  const toggleVoice = () => {
    if (speaking) {
      cancel();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleHello,
            handleRoleSelection,
            handleCommonQuestion,
            handleCustomQuery,
            handleRestart,
            userRole,
            showCustomQueryOption,
            toggleVoice,
            voiceEnabled,
            setSelectedVoice,
            voices
          },
        })
      )}
    </div>
  );
};

// Message Parser
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('restart')) {
      actions.handleHello();
    } else if (actions.userRole && actions.showCustomQueryOption) {
      actions.handleCustomQuery(message);
    } else {
      actions.handleCustomQuery(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          parse: parse,
          actions,
        })
      )}
    </div>
  );
};

// Main Component
const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const { supported, voices } = useSpeechSynthesis();

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="chatbot-container">
      {showChatbot && (
        <div className="chatbot-window">
          <ChatBot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}
      <button className="chatbot-button" onClick={toggleChatbot}>
        {showChatbot ? <FiX /> : <FiMessageSquare />}
      </button>
    </div>
  );
};

export default Chatbot;