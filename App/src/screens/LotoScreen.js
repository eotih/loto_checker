import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import lotoData from "../mocks/lotoData.json";

const { width, height } = Dimensions.get("window");
const windowWidth = width - 10;
const windowHeight = height - 10;

const columnsNumber = 9;
const rowsNumber = 9;
const marginAll = 10;

const childWidth = (windowWidth - marginAll) / columnsNumber;
const childHeight = (windowHeight - marginAll) / rowsNumber / 1.7 + 10;

const generateGridData = (pageData) => {
  return Array.from({ length: rowsNumber }, (_, y) =>
    Array.from({ length: columnsNumber }, (_, x) => ({
      id: `${String.fromCharCode(65 + x)}${y + 1}`,
      value: pageData[`${String.fromCharCode(65 + x)}${y + 1}`] || "",
    }))
  );
};
function LotoScreen({ route }) {
  const [selectedCells, setSelectedCells] = useState([]);
  console.log("🚀 ~ LotoScreen ~ selectedCells:", selectedCells);

  const [dataColor, setdataColor] = useState(route?.params?.value ?? "phatloc_purple_AFA2FF");
  const scrollViewRef = useRef(null);

  const [firstPageData, setFirstPageData] = useState(
    generateGridData(lotoData[dataColor.split("_")[1]]?.firstPage)
  );
  const [secondPageData, setSecondPageData] = useState(
    generateGridData(lotoData[dataColor.split("_")[1]]?.secondPage)
  );
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  useEffect(() => {
    setTimeout(function () {
      scrollViewRef.current?.flashScrollIndicators();
    }, 500);
  }, []);

  const handleCellPress = useCallback((cellId) => {
    if (cellId === "") return;
    setSelectedCells((currentSelectedCells) =>
      currentSelectedCells.includes(cellId)
        ? currentSelectedCells.filter((id) => id !== cellId)
        : [...currentSelectedCells, cellId]
    );
  }, []);

  const Cell = memo(({ cellData, isSelected, onCellPress }) => (
    <TouchableOpacity
      key={cellData.id}
      style={[
        styles.cell,
        cellData.value === ""
          ? { backgroundColor: "#" + dataColor.split("_")[2] }
          : {},
        isSelected ? styles.selectedCell : {},
      ]}
      onPress={() => onCellPress(cellData.value)}
    >
      <Text
        style={[styles.cellText, isSelected ? styles.selectedCellText : {}]}
      >
        {cellData.value}
      </Text>
    </TouchableOpacity>
  ));

  const Grid = ({ data, onCellPress }) => {
    console.log("🚀 ~ Grid ~ Grid: render");
    return (
      <View style={styles.gridContainer}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell) => (
              <Cell
                key={cell.id}
                cellData={cell}
                isSelected={selectedCells.includes(cell.value)}
                onCellPress={onCellPress}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  const handleClear = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa lô tô?", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: () => setSelectedCells([]),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        marginTop: marginAll * 2,
      }}
    >
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView
          style={{
            height: windowHeight - marginAll * 2,
          }}
        >
          <ScrollView
            horizontal
            style={styles.scrollView}
            persistentScrollbar={true}
            ref={scrollViewRef}
          >
            <Grid data={firstPageData} onCellPress={handleCellPress} />
            <Grid data={secondPageData} onCellPress={handleCellPress} />
          </ScrollView>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button icon="" mode="contained" onPress={handleClear}>
              Xóa tất cả
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default memo(LotoScreen);

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  gridContainer: {
    margin: 10,
    borderWidth: 1,
    height: "100%",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: childWidth,
    height: childHeight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  cellText: {
    fontSize: 22,
    fontWeight: "600",
  },
  selectedCellText: {
    color: "white",
  },
  selectedCell: {
    backgroundColor: "#000",
  },
});
