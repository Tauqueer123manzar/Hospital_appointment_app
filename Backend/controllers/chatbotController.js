const chatbotResponses = {
    "hello": "Hello! Welcome to our Doctor Appointment System. How can I assist you today?",
    "hi": "Hi there! How can I help you with your doctor appointment?",
    "book appointment": "You can book an appointment by clicking on the 'Book Appointment' button on our website. Would you like me to guide you through the process?",
    "cancel appointment": "To cancel an appointment, please go to 'My Appointments' section and click on 'Cancel' next to the appointment you wish to cancel.",
    "reschedule": "To reschedule an appointment, please go to 'My Appointments' section and click on 'Reschedule' next to the appointment you want to change.",
    "doctor availability": "You can check doctor availability by selecting a doctor from the 'Doctors' section and viewing their calendar.",
    "contact": "Would you like to contact our support team? I can suggest some contact options for you.",
    "default": "I'm sorry, I didn't understand that. Could you please rephrase your question? Here are some things I can help with: booking appointments, canceling appointments, rescheduling, or checking doctor availability."
  };
  
  exports.getChatbotResponse = (req, res) => {
    try {
      const userMessage = req.body.message.toLowerCase();
      let response = chatbotResponses.default;
  
      // Check for matching responses
      for (const [key, value] of Object.entries(chatbotResponses)) {
        if (userMessage.includes(key)) {
          response = value;
          break;
        }
      }
  
      // Special case for contact request
      if (userMessage.includes('contact') || response === chatbotResponses.contact) {
        response += " You can call us at +1 (123) 456-7890 or email support@doctorappointment.com. Would you like me to connect you now?";
      }
  
      res.json({ response });
    } catch (error) {
      console.error('Error in chatbot:', error);
      res.status(500).json({ error: 'An error occurred while processing your message' });
    }
  };