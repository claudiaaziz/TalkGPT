import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { fetchAudio } from './utils/fetchAudio';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { writeAudioToFile } from './utils/writeAudioToFile';

Audio.setAudioModeAsync({
	allowsRecordingIOS: true,
	staysActiveInBackground: false,
	playsInSilentModeIOS: true,
	shouldDuckAndroid: true,
	playThroughEarpieceAndroid: false,
});

export default function App() {
	const {
		voiceState,
		startRecognition,
		stopRecognition,
		destroyRecognition,
	} = useVoiceRecognition();

	const [borderColor, setBorderColor] = useState<'lightgray' | 'lightgreen'>(
		'lightgray'
	);

	const handleSubmit = async () => {
		if (!voiceState.transcriptionResults[0]) return;

		try {
			const audioBlob = await fetchAudio(
				voiceState.transcriptionResults[0]
			);
			const reader = new FileReader();
			reader.onload = async (e) => {
				if (e.target && typeof e.target.result === 'string') {
					const audioData = e.target.result.split(',')[1];
					const path = await writeAudioToFile(audioData);
				}
			};
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(voiceState, null, 2)}</Text>
			{/* <Text style={styles.title}>Talk GPT🤖</Text>
			<Text style={styles.instruction}>
				Press and hold the button to record your voice. Release it to
				send the recording and hear a response.
			</Text>
			<Text style={{ marginVertical: 10, fontSize: 16 }}>
				Your message:
			</Text> */}
			<Pressable
				style={[styles.holdToSpeakPressable, { borderColor }]}
				onPressIn={() => {
					setBorderColor('lightgreen');
					startRecognition();
				}}
				onPressOut={() => {
					setBorderColor('lightgray');
					stopRecognition();
				}}
			>
				<Text>Hold to speak</Text>
			</Pressable>
			{/* <Button title='Replay last message' onPress={() => {}} /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	instruction: {
		textAlign: 'center',
		color: '#333',
		marginBottom: 5,
		fontSize: 12,
	},
	holdToSpeakPressable: {
		// backgroundColor: 'pink',
		width: '90%',
		padding: 30,
		gap: 10,
		borderWidth: 3,
		// borderColor: 'lightgray',
		alignItems: 'center',
		borderRadius: 10,
	},
});
