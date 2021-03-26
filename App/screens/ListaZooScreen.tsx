import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import { View } from '../components/Themed';

export default function ListaZooScreen() {
  return (
    <View style={styles.container}>
      <Card>
      <Card.Title>Nome Do anime</Card.Title>
       <Card.Divider></Card.Divider>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
