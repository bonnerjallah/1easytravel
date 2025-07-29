import { StyleSheet, Text, View } from 'react-native'


import RideLayout from '../../components/RideLayout'

const RideTracker = () => {
  return (
    <RideLayout snapPoints={["25%", "30%"]} index={1} enablePanDownToClose={true}>
      <Text>RideTracker</Text>
    </RideLayout>
  )
}

export default RideTracker

const styles = StyleSheet.create({})