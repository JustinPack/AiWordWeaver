// Assistant.ts
import { spawn, ChildProcess } from 'child_process';

export interface Settings {
    seed?: number;
    threads?: number;
    topK?: number;
    topP?: number;
    temperature?: number;
    repeatLastN?: number;
    repeatPenalty?: number;
    enableHistory?: boolean;
}
export class Assistant {
    private seed: number;
    private threads: number;
    private topK: number;
    private topP: number;
    private temperature: number;
    private repeatLastN: number;
    private repeatPenalty: number;
    private modelPath: string;
    private readonly executable: string;
    private persona: string;
    private prompt: string;
    private format: string;
    private enableHistory: boolean;
    private chatHistory: [string, string][];
    private program: ChildProcess | null;

    constructor() {
        this.seed = 888777;
        this.threads = 11;
        this.topK = 40;
        this.topP = 0.9;
        this.temperature = 0.5;
        this.repeatLastN = 64;
        this.repeatPenalty = 1.3;
        this.modelPath = './path/to/model.bin'; // Update this with the correct path to the model binary
        this.executable = '.src/assets/main'; // Update this with the correct path to the executable
        this.persona = '...'; // Add the persona description
        this.prompt = '...'; // Add the prompt
        this.format = '...'; // Add the format
        this.enableHistory = true;
        this.chatHistory = [];
        this.program = null;
    }

    async prepModel(): Promise<void> {
        if (this.program) {
            return;
        }
        this.program = spawn(this.executable, this.buildCommandArguments());
        if (this.program.stdout) {
            this.program.stdout.setEncoding('utf-8');
            await new Promise((resolve) => {
                // @ts-ignore
                this.program.stdout.once('data', () => resolve(null));
            });
        }
    }


    async askBot(question: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.program || !this.program.stdin || !this.program.stdout) {
                reject('The model is not ready.');
            }

            this.chatHistory.push([question, '']);
            const input = this.buildBotInput();
            // @ts-ignore
            this.program.stdin.write(input + '\n');

            let response = '';
            const onData = (data: Buffer) => {
                response += data.toString();
                if (response.includes('[end of text]')) {
                    // @ts-ignore
                    this.program.stdout.removeListener('data', onData);
                    const cleanResponse = response.replace('[end of text]', '');
                    this.chatHistory[this.chatHistory.length - 1][1] = cleanResponse;
                    resolve(cleanResponse);
                }
            };

            // @ts-ignore
            this.program.stdout.on('data', onData);
        });
    }

    private buildCommandArguments(): string[] {
        return [
            this.executable,
            '-i',
            '--seed', `${this.seed}`,
            '-t', `${this.threads}`,
            '--top_k', `${this.topK}`,
            '--top_p', `${this.topP}`,
            '--repeat_last_n', `${this.repeatLastN}`,
            '--repeat_penalty', `${this.repeatPenalty}`,
            '-m', `${this.modelPath}`,
            '--interactive-start',
        ];
    }

    private buildBotInput(): string {
        let input = this.persona + '\n' + this.prompt;
        const history = this.enableHistory ? this.chatHistory : [this.chatHistory[this.chatHistory.length - 1]];
        for (const [instr, resp] of history) {
            input += this.format.replace('{instruction}', instr).replace('{response}', resp);
        }
        return input;
    }

    updateSettings(newSettings: Settings): void {
        if (newSettings.seed !== undefined) {
            this.seed = newSettings.seed;
        }
        if (newSettings.threads !== undefined) {
            this.threads = newSettings.threads;
        }
        if (newSettings.topK !== undefined) {
            this.topK = newSettings.topK;
        }
        if (newSettings.topP !== undefined) {
            this.topP = newSettings.topP;
        }
        if (newSettings.temperature !== undefined) {
            this.temperature = newSettings.temperature;
        }
        if (newSettings.repeatLastN !== undefined) {
            this.repeatLastN = newSettings.repeatLastN;
        }
        if (newSettings.repeatPenalty !== undefined) {
            this.repeatPenalty = newSettings.repeatPenalty;
        }
        if (newSettings.enableHistory !== undefined) {
            this.enableHistory = newSettings.enableHistory;
        }
    }

    getSettings() {
        return {
            seed: this.seed,
            threads: this.threads,
            topK: this.topK,
            topP: this.topP,
            temperature: this.temperature,
            repeatLastN: this.repeatLastN,
            repeatPenalty: this.repeatPenalty,
            enableHistory: this.enableHistory,
        };
    }
}