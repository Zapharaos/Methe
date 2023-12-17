import { Alert } from 'react-native';

export const showCancelOkAlert = async (title: string, message: string, cancel:string, confirm:string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        Alert.alert(
            title,
            message,
            [
                { text: cancel, style: 'cancel', onPress: () => resolve(false) },
                { text: confirm, onPress: () => resolve(true) },
            ]
        );
    });
}
