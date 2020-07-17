import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Driver from "./Driver";
import Colors from "../constants/Colors";
const arr = [1, 2, 3, 4];

const ListDrivers = ({ available, drivers }) => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            available ? null : { backgroundColor: Colors.$redBusy }
          ]}
        />
        <Text style={styles.statusText}>
          {available ? "available" : "busy"}
        </Text>
      </View>
      <View style={styles.listContainer}>
        {drivers.length === 0 ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: Colors.$white }}>
              there is no {available ? "available" : "busy"} driver for the
              moment
            </Text>
          </View>
        ) : (
          <FlatList
            alwaysBounceVertical
            bounces
            indicatorStyle="white"
            style={styles.flatlist}
            data={drivers}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Driver driver={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.$driversBlue,
    borderRadius: 30,
    height: 220,
    marginBottom: 15,
    paddingVertical: 20
  },
  flatlist: {
    height: "100%"
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.$greenConected
  },
  statusText: {
    fontSize: 18,
    color: Colors.$gray,
    textTransform: "uppercase",
    marginLeft: 5,
    fontWeight: "900"
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});

export default ListDrivers;
