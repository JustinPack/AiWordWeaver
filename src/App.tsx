// App.tsx
import React, { useState } from 'react';
import { Assistant } from './Components/Assistant/Assistant';
import { ChatArea } from './Components/ChatArea/ChatArea';
import { InputArea } from './Components/InputArea/InputArea';
import { SettingsArea } from './Components/SettingsArea/SettingsArea';
import './App.scss';

const assistant = new Assistant();
assistant.prepModel().then(r => console.log(r));

function App() {
    const [chatHistory, setChatHistory] = useState<Array<{ user: string; bot: string }>>([]);

    const handleUserInput = async (input: string) => {
        const botResponse = await assistant.askBot(input);
        setChatHistory([...chatHistory, { user: input, bot: botResponse }]);
    };

    const handleUpdateSettings = (newSettings: any) => {
        assistant.updateSettings(newSettings);
    };

    return (
        <div className="App">
            <ChatArea chatHistory={chatHistory} />
            <InputArea onUserInput={handleUserInput} />
            <SettingsArea assistant={assistant} onUpdateSettings={handleUpdateSettings} />
        </div>
    );
}

export default App;
