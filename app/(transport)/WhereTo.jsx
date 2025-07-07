import { Text, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

// Components
import WhereToModal from '../components/WhereToModal';
import ThemedView from '../components/ThemedView';
import { Colors } from '../../constant/Colors';

const WhereTo = () => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [showWhereToModal, setShowWhereToModal] = useState(false);

  useEffect(() => {
    setShowWhereToModal(true);
  }, []);

  return (
    <ThemedView style={styles.container} safe>
      <Text style={{ color: themed.text }}>hello world</Text>

      <WhereToModal
        isVisible={showWhereToModal}
        onClose={() => setShowWhereToModal(false)}
      />
    </ThemedView>
  );
};

export default WhereTo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // helpful for visibility
    justifyContent: 'center',
    alignItems: 'center',
  },
});
