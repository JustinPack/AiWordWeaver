// InputArea.tsx
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './InputArea.scss';

interface InputAreaProps {
    onUserInput: (input: string) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onUserInput }) => {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        onUserInput(input);
        setInput('');
    };

    return (
        <div className="inputArea">
            <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                label="Type your message"
                variant="outlined"
                fullWidth
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Send
            </Button>
        </div>
    );
};
