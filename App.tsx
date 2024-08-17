import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
	const [borderColor, setBorderColor] = useState<'lightgray' | 'lightgreen'>(
		'lightgray'
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Talk GPT</Text>
			<Text style={styles.instruction}>
				Press and hold the button to record your voice. Release it to
				send the recording and hear a response.
			</Text>
			<Text style={{ marginVertical: 10, fontSize: 16 }}>
				Your message:
			</Text>
			<Pressable
				style={[styles.holdToSpeakPressable, { borderColor }]}
				onPressIn={() => setBorderColor('lightgreen')}
				onPressOut={() => setBorderColor('lightgray')}
			>
				<Text>Hold to speak</Text>
			</Pressable>
			<Button title='Replay last message' onPress={() => {}} />
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
