import {
    StyleSheet
  } from 'react-native';

const stylesI = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    dateInput: {
        flex: 1,
        padding: 10,
    },
    iconContainer: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
});

export default stylesI;