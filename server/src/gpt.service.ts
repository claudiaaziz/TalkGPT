import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CreateChatCompletionRequestMessage } from 'openai/resources';

@Injectable()
export class ChatService {
	private openai: OpenAI;
	private conversationHistory: CreateChatCompletionRequestMessage[] = [];
	// private conversationHistory: {
	// 	role: 'user' | 'system' | 'assistant' | 'function';
	// 	content: CreateChatCompletionRequestMessage;
	// }[] = [];

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPEN_AI_API_KEY,
		});
	}

	async chatWithGPT(content: string) {
		this.conversationHistory.push({
			role: 'user',
			content,
		});
		const chatCompletion = await this.openai.chat.completions.create({
			messages: [ 
				{ role: 'user', content: 'You are a helpful assistant' },
				...this.conversationHistory,
			],
			model: 'gpt-4',
		});

		this.conversationHistory.push({
			role: 'assistant',
			content: chatCompletion.choices[0].message.content,
		});

        return chatCompletion.choices[0].message.content;
	}
}
