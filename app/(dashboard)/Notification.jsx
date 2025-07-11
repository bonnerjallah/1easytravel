import { StyleSheet, View, useColorScheme, FlatList, Image } from 'react-native'
import { format } from 'date-fns'
import { Ionicons } from '@expo/vector-icons'

// UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constant/Colors'

// Sample Notifications
const notifications = [
  {
    title: "Payment successful",
    message: "You have successfully paid for the ride to China House",
    timestamp: new Date(),
    icon: 'card-outline',
  },
  {
    title: "Credit card is now connected",
    message: "You have successfully connected your card",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    icon: 'card-outline',
  },
  {
    title: "Account setup successful",
    message: "You have successfully set up your account",
    timestamp: new Date('2022-05-10T08:15:00'),
    icon: 'person-circle-outline',
  }
]

const Notification = () => {
  
  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const getGroup = (timestamp) => {
    const now = new Date()
    const date = new Date(timestamp)
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const notifDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const diffDays = (nowDate - notifDate) / (1000 * 60 * 60 * 24)

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return format(date, 'MMMM d, yyyy')
  }

  const getDisplayTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now - date) / 60000)

    if (now.toDateString() === date.toDateString()) {
      if (diffMinutes < 1) return "now"
      if (diffMinutes < 60) return `${diffMinutes}min`
    }

    return format(date, 'HH:mm')
  }

  // Group notifications by date
  const grouped = notifications.reduce((acc, item) => {
    const group = getGroup(item.timestamp)
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

  const renderGroupedNotifications = () => {
    return Object.entries(grouped).map(([date, items]) => (
      <View key={date}>
        <Spacer height={20} />
        <ThemedText title style={styles.groupTitle}>{date}</ThemedText>

        {items.map((item, index) => (
          <View key={index} style={styles.notificationItem}>
            <Ionicons name={item.icon} size={30} color={themed.tabIconColor} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <ThemedText title style={styles.title}>{item.title}</ThemedText>
              <ThemedText>{item.message}</ThemedText>
            </View>
            <ThemedText style={styles.time}>{getDisplayTime(item.timestamp)}</ThemedText>
          </View>
        ))}
      </View>
    ))
  }

  return (
    <ThemedView style={styles.container} safe>
      <Spacer height={20} />
      <ThemedText variant="heading" title style={styles.heading}>Notifications</ThemedText>
      {renderGroupedNotifications()}
    </ThemedView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 28,
    marginBottom: 10
  },
  groupTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    columnGap: 10,
  },
  icon: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: "gray"
  },
  title: {
    fontWeight: 'bold'
  },
  time: {
    marginLeft: 10,
    fontSize: 12,
    color: 'gray'
  }
})
