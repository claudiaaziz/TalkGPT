import { Audio } from 'expo-av';

export const playFromPath = async (path: string) => {
	try {
		const soundObj = new Audio.Sound();
		await soundObj.loadAsync({ uri: path });
		await soundObj.playAsync();
	} catch (e) {
		console.error(e);
	}
};
