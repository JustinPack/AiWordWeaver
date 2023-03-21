// SettingsArea.tsx
import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
} from '@mui/material';
import './SettingsArea.scss';
import {Assistant} from '../Assistant/Assistant';

interface SettingsAreaProps {
    assistant: Assistant;
    onUpdateSettings: (settings: any) => void;
}

export const SettingsArea: React.FC<SettingsAreaProps> = ({ assistant, onUpdateSettings }) => {
    const [settings, setSettings] = useState(assistant.getSettings());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setSettings({ ...settings, [name]: newValue });
    };

    const handleSave = () => {
        onUpdateSettings(settings);
    };

    return (
        <div className="settingsArea">
            <h2>Settings</h2>
            <FormControl component="fieldset">
                <FormLabel component="legend">Assistant Settings</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settings.enableHistory}
                                onChange={handleChange}
                                name="rememberHistory"
                            />
                        }
                        label="Remember history"
                    />
                    {/* Add more settings components here */}
                </FormGroup>
            </FormControl>
            <Button onClick={handleSave} variant="contained" color="primary">
                Save
            </Button>
        </div>
    );
};
