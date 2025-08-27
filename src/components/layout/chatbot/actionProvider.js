// Add this to your ActionProvider component
const handleProjectHelp = () => {
  const botMessage = createChatBotMessage('Here are common project management questions:', {
    widget: 'projectOptions',
  });
  setState((prev) => ({
    ...prev,
    messages: [...prev.messages, botMessage],
  }));
};

const handleTaskCreation = () => {
  const botMessage = createChatBotMessage('To create a new task: 1. Go to your project 2. Click "Add Task" 3. Fill in details 4. Click "Save"');
  setState((prev) => ({
    ...prev,
    messages: [...prev.messages, botMessage],
  }));
};

// Update the return statement to include these actions
return (
  <div>
    {React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        actions: {
          handleHello,
          handleHelp,
          handleProjectHelp,
          handleTaskCreation,
        },
      });
    })}
  </div>
);