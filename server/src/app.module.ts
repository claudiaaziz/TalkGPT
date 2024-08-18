import { Module } from '@nestjs/common';
import { TextToSpeechController } from './text-to-speech.controller';
import { ChatService } from './gpt.service';
import { TextToSpeechService } from './text-to-speech.service';

@Module({
	imports: [],
	controllers: [TextToSpeechController],
	providers: [ChatService, TextToSpeechService],
})
export class AppModule {}
