// import React, { useState, useEffect, useRef } from 'react';
// import { FaRobot, FaTimes, FaPhone, FaEnvelope, FaCalendarAlt, FaCalendarTimes, FaUserMd } from 'react-icons/fa';
// import '../App.css';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "Hello! I'm your appointment assistant. How can I help you today?", isUser: false }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   const toggleChatbot = () => setIsOpen(!isOpen);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => scrollToBottom(), [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;
    
//     // Add user message
//     setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
//     setInputMessage('');
    
//     // Simulate bot response
//     setTimeout(() => {
//       setMessages(prev => [...prev, { 
//         text: "Thanks for your message! A representative will get back to you shortly.", 
//         isUser: false 
//       }]);
//     }, 1000);
//   };

//   const handleQuickAction = (action) => {
//     setMessages(prev => [...prev, 
//       { text: action, isUser: true },
//       { text: `Taking you to ${action}...`, isUser: false }
//     ]);
//     // Here you would actually navigate to the relevant section
//   };

//   return (
//     <>
//       {/* Floating action button */}
//       <button className="chatbot-fab" onClick={toggleChatbot}>
//         <FaRobot className="chatbot-icon" />
//         <span>Need help?</span>
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div className="chatbot-modal-overlay" onClick={toggleChatbot}>
//           <div className="chatbot-modal" onClick={e => e.stopPropagation()}>
//             {/* Header */}
//             <div className="chatbot-header">
//               <div className="chatbot-title">
//                 <FaRobot className="header-icon" />
//                 <h3>Appointment Assistant</h3>
//               </div>
//               <button className="close-btn" onClick={toggleChatbot}>
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="chatbot-messages">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
//                   {msg.text}
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Quick Actions */}
//             <div className="quick-actions">
//               <button onClick={() => handleQuickAction('Book Appointment')}>
//                 <FaCalendarAlt /> Book
//               </button>
//               <button onClick={() => handleQuickAction('Cancel Appointment')}>
//                 <FaCalendarTimes /> Cancel
//               </button>
//               <button onClick={() => handleQuickAction('Check Doctor Availability')}>
//                 <FaUserMd /> Doctors
//               </button>
//             </div>

//             {/* Input Area */}
//             <form className="chatbot-input" onSubmit={handleSendMessage}>
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 placeholder="Type your message here..."
//               />
//               <button type="submit">Send</button>
//             </form>

//             {/* Support Options */}
//             <div className="support-options">
//               <p>Need immediate assistance?</p>
//               <div className="support-buttons">
//                 <a href="tel:+11234567890" className="support-btn">
//                   <FaPhone /> Call Support
//                 </a>
//                 <a href="mailto:support@clinic.com" className="support-btn">
//                   <FaEnvelope /> Email Us
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;



import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPhone, FaEnvelope, FaCalendarAlt, FaCalendarTimes, FaUserMd } from 'react-icons/fa';
import '../App.css';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your appointment assistant. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = { 
        text: getBotResponse(inputMessage), 
        isUser: false 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('book') || input.includes('appointment')) {
      return "You can book an appointment by selecting a doctor and available time slot. Would you like me to guide you through the process?";
    } else if (input.includes('cancel')) {
      return "To cancel an appointment, please go to your appointments page and click 'Cancel' next to the appointment you wish to cancel.";
    } else if (input.includes('doctor') || input.includes('availability')) {
      return "You can check doctor availability by visiting our 'Doctors' section. Each doctor's profile shows their available time slots.";
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with your medical appointment today?";
    } else if (input.includes('contact') || input.includes('help')) {
      return "For immediate assistance, you can call us at +91 (754) 920- or email support@easycare.com.";
    } else {
      return "I'm sorry, I didn't understand that. I can help with booking appointments, cancellations, or doctor availability. Could you please rephrase?";
    }
  };

  const handleQuickAction = (action) => {
    // Add quick action message
    setMessages(prev => [...prev, 
      { text: action, isUser: true },
      { text: getBotResponse(action), isUser: false }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-modal-overlay" onClick={onClose}>
      <div className="chatbot-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-title">
            <FaRobot className="header-icon" />
            <h3>Appointment Assistant</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={() => handleQuickAction('Book Appointment')}>
            <FaCalendarAlt /> Book
          </button>
          <button onClick={() => handleQuickAction('Cancel Appointment')}>
            <FaCalendarTimes /> Cancel
          </button>
          <button onClick={() => handleQuickAction('Doctor Availability')}>
            <FaUserMd /> Doctors
          </button>
        </div>

        {/* Input Area */}
        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>

        {/* Support Options */}
        <div className="support-options">
          <p>Need immediate assistance?</p>
          <div className="support-buttons">
            <a href="tel:+917549200441" className="support-btn">
              <FaPhone /> Call Support
            </a>
            <a href="mailto:mdtauqueermanzar@gmail.com" className="support-btn">
              <FaEnvelope /> Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;