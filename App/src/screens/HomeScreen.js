import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  { id: "phatloc_yellow_FFA630", title: "Phát lộc - Vàng" },
  { id: "phatloc_purple_AFA2FF", title: "Phát lộc - Tím" },
];

const Item = ({ item, onPress, selectedId }) => (
  <TouchableOpacity
    key={item.id}
    onPress={onPress}
    style={[styles.item, selectedId === item.id && styles.selectedItem]}
  >
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  const handleItemPress = (id) => {
    setSelectedId(id);
    // Perform additional actions on item press (optional)
    console.log("Item pressed:", id);
    navigation.navigate("LotoScreen", { value: id });
  };

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => handleItemPress(item.id)}
      selectedId={selectedId}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId} // Ensures re-render when selectedId changes
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9c2ff",
  },
  selectedItem: {
    backgroundColor: "#6e3b6e",
  },
  title: {
    fontSize: 16,
  },
});

export default App;
