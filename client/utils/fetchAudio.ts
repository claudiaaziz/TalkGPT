export const fetchAudio = async (text: string) => {
	const res = await fetch(
		process.env.EXPO_PUBLIC_SERVER_PORT! + 'text-to-speech/synthesize',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text }),
		}
	);
	return await res.blob();
};
