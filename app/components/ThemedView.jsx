import { useColorScheme, View } from 'react-native'

import { Colors } from '../../constant/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const ThemedView = ({style, safe = false, ...props}) => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

    if(!safe) return (
        <View 
            style = {[{backgroundColor: themed.background}, style]}
            {...props}
        />
    )


    const insets = useSafeAreaInsets()

    return (
        <View 
            style = {[{
                backgroundColor: themed.background, 
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: 10,
                paddingRight: 10
            },
                style
            ]}
            {...props}
        />
    )

}

export default ThemedView

