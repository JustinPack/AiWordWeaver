import express from 'express';
import { Assistant } from '../Assistant/Assistant';

const app = express();
const port = 5000;

const assistant = new Assistant();
assistant.prepModel().then(() => console.log('Model is ready'));

app.use(express.json());

app.post('/ask_bot', async (req, res) => {
    const question = req.body.question;

    try {
        const response = await assistant.askBot(question);
        res.send(response);
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
