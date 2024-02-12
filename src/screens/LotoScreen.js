import React, { memo, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const initialInputDataPurple = {
  firstPage: {
    A1: 3,
    A2: null,
    A3: null,
    A4: null,
    A5: null,
    A6: 5,
    A7: 7,
    A8: null,
    A9: 6,
    B1: null,
    B2: 12,
    B3: 15,
    B4: 17,
    B5: 10,
    B6: null,
    B7: null,
    B8: 13,
    B9: 18,
    C1: 26,
    C2: null,
    C3: 25,
    C4: null,
    C5: null,
    C6: 23,
    C7: 24,
    C8: null,
    C9: null,
    D1: 39,
    D2: 36,
    D3: null,
    D4: 38,
    D5: 37,
    D6: null,
    D7: 34,
    D8: 31,
    D9: null,
    E1: null,
    E2: 43,
    E3: null,
    E4: 42,
    E5: null,
    E6: 41,
    E7: null,
    E8: 44,
    E9: 47,
    F1: 58,
    F2: null,
    F3: 51,
    F4: null,
    F5: 53,
    F6: null,
    F7: 56,
    F8: null,
    F9: null,
    G1: 66,
    G2: 64,
    G3: null,
    G4: null,
    G5: 60,
    G6: 65,
    G7: null,
    G8: 61,
    G9: 69,
    H1: null,
    H2: null,
    H3: 77,
    H4: 75,
    H5: null,
    H6: 74,
    H7: 71,
    H8: 70,
    H9: null,
    I1: null,
    I2: 82,
    I3: 85,
    I4: 84,
    I5: 89,
    I6: null,
    I7: null,
    I8: null,
    I9: 86,
  },
  secondPage: {
    A1: null,
    A2: 2,
    A3: null,
    A4: null,
    A5: 8,
    A6: 1,
    A7: 9,
    A8: 4,
    A9: null,
    B1: 14,
    B2: 19,
    B3: null,
    B4: 11,
    B5: null,
    B6: null,
    B7: null,
    B8: null,
    B9: 16,
    C1: 22,
    C2: null,
    C3: 27,
    C4: 20,
    C5: null,
    C6: 21,
    C7: null,
    C8: 29,
    C9: 28,
    D1: null,
    D2: 32,
    D3: null,
    D4: null,
    D5: null,
    D6: 33,
    D7: 30,
    D8: 35,
    D9: null,
    E1: null,
    E2: 48,
    E3: 49,
    E4: 46,
    E5: 40,
    E6: null,
    E7: null,
    E8: null,
    E9: 45,
    F1: 57,
    F2: null,
    F3: 59,
    F4: null,
    F5: 50,
    F6: 52,
    F7: 54,
    F8: 55,
    F9: null,
    G1: null,
    G2: 67,
    G3: null,
    G4: 63,
    G5: null,
    G6: null,
    G7: 62,
    G8: null,
    G9: 68,
    H1: 78,
    H2: null,
    H3: 72,
    H4: null,
    H5: 79,
    H6: 76,
    H7: null,
    H8: 73,
    H9: null,
    I1: 90,
    I2: null,
    I3: 80,
    I4: 83,
    I5: 81,
    I6: null,
    I7: 88,
    I8: null,
    I9: 87,
  },
};

const initialInputDataYellow = {
  firstPage: {
    A1: null,
    A2: 9,
    A3: 8,
    A4: null,
    A5: 1,
    A6: null,
    A7: 5,
    A8: null,
    A9: null,
    B1: 10,
    B2: null,
    B3: null,
    B4: 18,
    B5: null,
    B6: 12,
    B7: null,
    B8: 19,
    B9: 14,
    C1: 27,
    C2: null,
    C3: 25,
    C4: 26,
    C5: null,
    C6: null,
    C7: 20,
    C8: null,
    C9: 28,
    D1: null,
    D2: 35,
    D3: 33,
    D4: null,
    D5: 36,
    D6: 38,
    D7: null,
    D8: 31,
    D9: null,
    E1: 48,
    E2: 46,
    E3: null,
    E4: null,
    E5: 41,
    E6: null,
    E7: 47,
    E8: 49,
    E9: null,
    F1: 59,
    F2: null,
    F3: 52,
    F4: 57,
    F5: null,
    F6: 55,
    F7: null,
    F8: null,
    F9: 50,
    G1: null,
    G2: 60,
    G3: 62,
    G4: null,
    G5: 66,
    G6: 69,
    G7: null,
    G8: 68,
    G9: null,
    H1: null,
    H2: 73,
    H3: null,
    H4: 70,
    H5: 71,
    H6: null,
    H7: 77,
    H8: null,
    H9: 75,
    I1: 86,
    I2: null,
    I3: null,
    I4: 88,
    I5: null,
    I6: 89,
    I7: 84,
    I8: 81,
    I9: 90,
  },
  secondPage: {
    A1: 2,
    A2: 6,
    A3: null,
    A4: 3,
    A5: null,
    A6: 7,
    A7: null,
    A8: 4,
    A9: null,
    B1: null,
    B2: null,
    B3: 16,
    B4: 13,
    B5: 11,
    B6: null,
    B7: 17,
    B8: null,
    B9: 15,
    C1: 22,
    C2: null,
    C3: 21,
    C4: null,
    C5: null,
    C6: 23,
    C7: null,
    C8: 29,
    C9: 24,
    D1: 39,
    D2: 37,
    D3: null,
    D4: null,
    D5: 34,
    D6: null,
    D7: 32,
    D8: 30,
    D9: null,
    E1: null,
    E2: 40,
    E3: 43,
    E4: 45,
    E5: 42,
    E6: null,
    E7: null,
    E8: null,
    E9: 44,
    F1: null,
    F2: null,
    F3: 58,
    F4: 54,
    F5: null,
    F6: 56,
    F7: 53,
    F8: 51,
    F9: null,
    G1: 67,
    G2: 65,
    G3: null,
    G4: null,
    G5: null,
    G6: 61,
    G7: 63,
    G8: null,
    G9: 64,
    H1: null,
    H2: null,
    H3: 78,
    H4: 74,
    H5: 72,
    H6: null,
    H7: null,
    H8: 76,
    H9: 79,
    I1: 83,
    I2: 82,
    I3: null,
    I4: null,
    I5: 87,
    I6: 85,
    I7: 80,
    I8: null,
    I9: null,
  },
};
const generateGridData = (pageData) => {
  return Array.from({ length: 9 }, (_, y) =>
    Array.from({ length: 9 }, (_, x) => ({
      id: `${String.fromCharCode(65 + x)}${y + 1}`,
      value: pageData[`${String.fromCharCode(65 + x)}${y + 1}`] || "-",
    }))
  );
};
const lotoColorList = [
  {
    label: "Purple",
    value: "purple",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
];
function LotoScreen() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [lotoColor, setLotoColor] = useState("purple");
  const [showDropDown, setShowDropDown] = useState(false);

  const [firstPageData, setFirstPageData] = useState(
    generateGridData(
      lotoColor === "purple"
        ? initialInputDataPurple.firstPage
        : initialInputDataYellow.firstPage
    )
  );
  const [secondPageData, setSecondPageData] = useState(
    generateGridData(
      lotoColor === "purple"
        ? initialInputDataPurple.secondPage
        : initialInputDataYellow.secondPage
    )
  );
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const handleSetLotoData = (lotoColor) => {
    setLotoColor(lotoColor);
    // Select the initial data based on lotoColor more efficiently
    const initialInputData =
      lotoColor === "purple" ? initialInputDataPurple : initialInputDataYellow;
    setSelectedCells([]);
    // Now, you can directly use the selected initial data without repeating the ternary operation
    setFirstPageData(generateGridData(initialInputData.firstPage));
    setSecondPageData(generateGridData(initialInputData.secondPage));
  };

  const handleChangeColorLoto = (lotoColor) => {
    if (selectedCells.length > 0) {
      Alert.alert("Xác nhận", "Bạn có chắc chắn muốn thay đổi màu lô tô?", [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Thay đổi",
          // Directly pass the new loto color to the function without an intermediate step
          onPress: () => handleSetLotoData(lotoColor),
        },
      ]);
    } else {
      // Directly set loto data if no cells are selected, assuming this is the desired behavior
      // This avoids unnecessary alert interactions if the color can be changed without confirmation
      handleSetLotoData(lotoColor);
    }
  };

  const handleCellPress = (cellId) => {
    setSelectedCells((currentSelectedCells) => {
      if (currentSelectedCells.includes(cellId)) {
        // If already selected, deselect it
        return currentSelectedCells.filter((id) => id !== cellId);
      } else {
        // Else, add to selected cells
        return [...currentSelectedCells, cellId];
      }
    });
  };
  const Grid = ({ data, onCellPress }) => (
    <View style={styles.gridContainer}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell) => (
            <TouchableOpacity
              key={cell.id}
              style={[
                styles.cell,
                selectedCells.includes(cell.value) ? styles.selectedCell : {},
              ]}
              onPress={() => onCellPress(cell.value)}
            >
              <Text style={styles.cellText}>{cell.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );

  // const handleSubmitInputNumber = (number) => {
  //   setLoading(true);
  //   const isNumberInSelectedCells = selectedCells.includes(number);
  //   if (isNumberInSelectedCells) {
  //     alert("Số " + number + " đã có trong lô tô");
  //     setLoading(false);
  //   } else {
  //     handleCellPress(number);
  //     setLoading(false);
  //   }
  // };

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
    <SafeAreaView>
      {/* {loading ?? <ActivityIndicator animating={true} />} */}
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View
          style={{
            margin: 10,
          }}
        >
          <DropDown
            label={"Color"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={lotoColor}
            setValue={handleChangeColorLoto}
            list={lotoColorList}
          />
        </View>
        <ScrollView horizontal style={styles.scrollView}>
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
            Clear
          </Button>
        </View>
        {/* <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TextInput
            label="Nhập số cần kiểm tra"
            value={inputNumber}
            onChangeText={setInputNumber}
            style={{ flex: 1, marginRight: 10 }}
            mode="outlined"
            keyboardType="numeric"
          />
          <Button
            icon="check"
            mode="contained"
            loading={loading}
            onPress={() => handleSubmitInputNumber(inputNumber)}
          >
            Kiểm tra
          </Button>
        </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default memo(LotoScreen);

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  gridContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f9f9f9", // Default background
  },
  cellText: {
    fontSize: 22,
  },
  // Add styles for selected cell
  selectedCell: {
    backgroundColor: "#add8e6", // Light blue background to indicate selection
  },
});
