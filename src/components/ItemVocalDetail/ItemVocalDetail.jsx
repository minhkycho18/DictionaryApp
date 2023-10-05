import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
function ItemVocalDetail() {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeftContent}>
            <Text style={styles.headerText}>Button</Text>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <AntDesign name="sound" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.viewIcon}>
            <AntDesign name="addfolder" size={24} color="#5E7172" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize :18 ,letterSpacing :0.6 ,marginTop :15}}>1. Button</Text>
          <View style={{marginLeft :18}}>
            <Text style={{fontSize :18 ,letterSpacing :0.6 ,marginTop :10 ,color :"#64BFE2" ,fontStyle:'italic'}}>(noun)</Text>
            <Text style={styles.definition} >a small, round object, usually made of plastic or metal, sewn onto a piece of clothing and used for fastening two parts together</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ItemVocalDetail;
