import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";

function ItemVocalDetail({ definition, color, item, count }) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wrapper, borderColor: color }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.word}>
                {count}. {item.word.toLowerCase()}
              </Text>
              <Text style={{ ...styles.pos, color: color, marginLeft: 18 }}>
                ({item.pos})
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity style={styles.viewIcon}>
                <Image
                  source={require("~/assets/leitner.png")}
                  style={{ width: 24, height: 24, tintColor: "#5E7172" }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewIcon}>
                <AntDesign name="addfolder" size={24} color="#5E7172" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginLeft: 18 }}>
            <Text style={styles.definition}>{definition.wordDesc}</Text>
          </View>
          {definition.examples !== null && (
            <View style={styles.synonym}>
              <Text style={styles.example_main}>Examples:</Text>
              <Text style={styles.example}>{definition.examples}</Text>
            </View>
          )}
          {definition.synonyms.length > 0 && (
            <View style={styles.synonym}>
              <Text style={styles.synonym_main}>Synonym:</Text>
              {definition.synonyms.map((item, index) => (
                <View style={styles.synonym_Item} key={index}>
                  <Text style={styles.synonym_Item__Text}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default ItemVocalDetail;
