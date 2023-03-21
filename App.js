import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from "expo-contacts";

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers]}
      );
      validContacts = [];
      for (i in data) {
        if (data[i].hasOwnProperty("phoneNumbers")) {
          validContacts.push(data[i]);
        }
      }
      setContact(validContacts);
    }
  }
  
  return (
    <View style={styles.container}>
      <FlatList
          data={contact}
          renderItem={({item}) => <Text>{item.name} {item.phoneNumbers[0].number}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

      <View style={{marginTop: 5, marginBottom: 10}}>
        <Button title="Get Contacts" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
