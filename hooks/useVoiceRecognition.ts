import Voice, {
	SpeechErrorEvent,
	SpeechResultsEvent,
} from '@react-native-voice/voice';
import { useCallback, useEffect, useState } from 'react';

interface VoiceRecognitionState {
	recognized: string;
	pitchLevel: string;
	errorMessage: string;
	recordingEnded: string;
	recordingStarted: string;
	transcriptionResults: string[];
	partialTranscriptions: string[];
	isRecording: boolean;
}

const useVoiceRecognition = () => {
	const [voiceState, setVoiceState] = useState<VoiceRecognitionState>({
		recognized: '',
		pitchLevel: '',
		errorMessage: '',
		recordingEnded: '',
		recordingStarted: '',
		transcriptionResults: [],
		partialTranscriptions: [],
		isRecording: false,
	});

	useEffect(() => {
		Voice.onSpeechStart = (e: any) => {
			setVoiceState((prevState) => ({
				...prevState,
				recordingStarted: '✔️',
				isRecording: true,
			}));
		};

		Voice.onSpeechRecognized = () => {
			setVoiceState((prevState) => ({
				...prevState,
				recognized: '✔️',
			}));
		};

		Voice.onSpeechEnd = (e: any) => {
			setVoiceState((prevState) => ({
				...prevState,
				recordingEnded: '✔️',
				isRecording: false,
			}));
		};

		Voice.onSpeechError = (e: SpeechErrorEvent) => {
			setVoiceState((prevState) => ({
				...prevState,
				errorMessage: JSON.stringify(e.error),
				isRecording: false,
			}));
		};

		Voice.onSpeechResults = (e: SpeechResultsEvent) => {
			if (e.value)
				setVoiceState((prevState) => ({
					...prevState,
					transcriptionResults: e.value!,
				}));
		};

		Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
			if (e.value) {
				setVoiceState((prevState) => ({
					...prevState,
					partialTranscriptions: e.value!,
				}));
			}
		};

		Voice.onSpeechVolumeChanged = (e: any) => {
			setVoiceState((prevState) => ({
				...prevState,
				pitchLevel: e.value,
			}));
		};

		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);

	const resetVoiceState = useCallback(() => {
		setVoiceState({
			recognized: '',
			pitchLevel: '',
			errorMessage: '',
			recordingEnded: '',
			recordingStarted: '',
			transcriptionResults: [],
			partialTranscriptions: [],
			isRecording: false,
		});
	}, [setVoiceState]);

	const startRecognition = useCallback(async () => {
		resetVoiceState();

		try {
			await Voice.start('en-US');
		} catch (e) {
			console.error(e);
		}
	}, [resetVoiceState]);

	const stopRecognition = useCallback(async () => {
		try {
			await Voice.stop();
		} catch (e) {
			console.error(e);
		}
	}, []);

	const cancelRecognition = useCallback(async () => {
		try {
			await Voice.cancel();
		} catch (e) {
			console.error(e);
		}
	}, []);

	const destroyRecognition = useCallback(async () => {
		try {
			await Voice.destroy();
		} catch (e) {
			console.error(e);
		}
		resetVoiceState();
	}, [resetVoiceState]);

	return {
		voiceState,
		setVoiceState,
		resetVoiceState,
		startRecognition,
		stopRecognition,
		cancelRecognition,
		destroyRecognition,
	};
};
