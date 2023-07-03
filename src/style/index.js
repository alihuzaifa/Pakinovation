import { StyleSheet } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
const style = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: responsiveHeight(6.8),
        borderRadius: responsiveWidth(3.8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(7),
    },
})
export default style