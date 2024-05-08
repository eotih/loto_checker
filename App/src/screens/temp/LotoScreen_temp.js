import React, { memo, useState, useCallback } from "react";
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
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import lotoData from "../../mocks/lotoData.json";

const lotoColorList = [
  {
    label: "Phát lộc - Tím",
    value: "phatloc_purple_AFA2FF",
  },
  {
    label: "Phát lộc - Vàng",
    value: "phatloc_yellow_FFA630",
  },
  // {
  //   label: "Phát lộc - Xanh dương",
  //   value: "phatloc_blue_2e5077",
  // },
  // {
  //   label: "Phát lộc - Xanh lá",
  //   value: "phatloc_blue_7FC29B",
  // },
  // {
  //   label: "Phát lộc - Đỏ",
  //   value: "phatloc_red_611C35",
  // },
];

const { width, height } = Dimensions.get("window");
const windowWidth = width - 10;
const windowHeight = height - 10;

const columnsNumber = 9;
const rowsNumber = 9;
const marginAll = 10;

const childWidth = (windowWidth - marginAll) / columnsNumber;
const childHeight = (windowHeight - marginAll) / rowsNumber / 1.7;

const generateGridData = (pageData) => {
  return Array.from({ length: rowsNumber }, (_, y) =>
    Array.from({ length: columnsNumber }, (_, x) => ({
      id: `${String.fromCharCode(65 + x)}${y + 1}`,
      value: pageData[`${String.fromCharCode(65 + x)}${y + 1}`] || "",
    }))
  );
};

function LotoScreen() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [lotoColor, setLotoColor] = useState("phatloc_yellow_FFA630");
  const [inputNumber, setInputNumber] = useState();

  const [firstPageData, setFirstPageData] = useState(
    generateGridData(lotoData[lotoColor.split("_")[1]]?.firstPage)
  );
  const [secondPageData, setSecondPageData] = useState(
    generateGridData(lotoData[lotoColor.split("_")[1]]?.firstPage)
  );
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const handleSetLotoData = (lotoColor) => {
    setLotoColor(lotoColor);
    const initialInputData = lotoData[lotoColor.split("_")[1]];
    setSelectedCells([]);
    setFirstPageData(generateGridData(initialInputData?.firstPage));
    setSecondPageData(generateGridData(initialInputData?.secondPage));
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
          onPress: () => handleSetLotoData(lotoColor),
        },
      ]);
    } else {
      handleSetLotoData(lotoColor);
    }
  };

  const handleCellPress = useCallback((cellId) => {
    if (cellId === "") return;
    setSelectedCells((currentSelectedCells) => {
      if (currentSelectedCells.includes(cellId)) {
        // Inside or after your handleCellPress function

        // If already selected, deselect it
        return currentSelectedCells.filter((id) => id !== cellId);
      } else {
        return [...currentSelectedCells, cellId];
      }
    });
  }, []); // Add dependencies if there are any

  const Grid = memo(({ data, onCellPress }) => (
    <View style={styles.gridContainer}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell) => (
            <TouchableOpacity
              key={cell.id}
              style={[
                styles.cell,
                cell.value === ""
                  ? { backgroundColor: "#" + lotoColor.split("_")[2] }
                  : {},
                selectedCells.includes(cell.value) ? styles.selectedCell : {},
              ]}
              onPress={() => onCellPress(cell.value)}
            >
              <Text
                style={[
                  styles.cellText,
                  selectedCells.includes(cell.value)
                    ? styles.selectedCellText
                    : {},
                ]}
              >
                {cell.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  ));

  const handleSubmitInputNumber = (number) => {
    const isNumberInSelectedCells = selectedCells.includes(number);
    if (isNumberInSelectedCells) {
      alert("Số " + number + " đã có trong lô tô");
    } else {
      handleCellPress(number);
    }
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
        <ScrollView>
          <Picker
            selectedValue={lotoColor}
            mode="dropdown"
            style={{
              borderColor: "#DFE1E4",
              borderStyle: "solid",
              borderWidth: 1,
              width: "100%",
              height: 50,
              marginTop: 12,
              marginBottom: 16,
              justifyContent: "center",
            }}
            itemStyle={{
              color: "#394049",
              letterSpacing: 0.001,
              fontSize: 14,
            }}
            onValueChange={(itemValue, itemIndex) =>
              handleChangeColorLoto(itemValue)
            }
          >
            {lotoColorList.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
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
              onPress={() => handleSubmitInputNumber(inputNumber)}
            >
              Kiểm tra
            </Button>
          </View>
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
