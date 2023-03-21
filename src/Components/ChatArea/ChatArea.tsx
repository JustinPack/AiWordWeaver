// ChatArea.tsx
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import './ChatArea.scss';

interface ChatMessage {
    user: string;
    bot: string;
}

interface ChatAreaProps {
    chatHistory: ChatMessage[];
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatHistory }) => {
    return (
        <div className="chatArea">
            <Typography variant="h4">Chat</Typography>
            <List>
                {chatHistory.map((message, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={`User: ${message.user}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Bot: ${message.bot}`} />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};
