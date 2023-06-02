import {StyleSheet, ScrollView} from "react-native";
import HistoryItem from "../components/HistoryItem";
import {getAllData} from "../utils/MockData";
import {useEffect, useState} from "react";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getAllData);
  }, []);

  return (
    <ScrollView style={styles.historyContainer}>
      {data.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 20,
    maxHeight: "70%",
  },
});
