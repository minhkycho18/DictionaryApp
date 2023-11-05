import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import ItemSub from "./ItemSub/ItemSub";
import { getAllSubCategory } from "~/api/Subcategory";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function Index(props) {
  const navigation = useNavigation();
  const [subs, setSubs] = useState([]);
  const handlePress = () => {
    console.log("Play Game");
  };

  useEffect(() => {
    console.log(props.route.params.wordlist);
    const getAllSub = async (id) => {
      const subCategories = await getAllSubCategory(id);
      setSubs(subCategories);
    };
    getAllSub(props.route.params.wordlist.id);
  }, []);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <TouchableOpacity
        style={Styles.iconClose}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="close" size={30} color={colors.textTitle} />
      </TouchableOpacity>
      <View style={Styles.content}>
        <View style={Styles.viewImage}>
          <View style={Styles.imageWordlist}>
            <Image
              source={require("~/assets/wordlist.png")}
              style={Styles.Image}
            />
          </View>
        </View>
        <View>
          <Text
            style={[
              tw`mt-2`,
              {
                textAlign: "center",
                color: colors.textTitle,
                fontFamily: "Quicksand-Bold",
                fontSize: 22,
              },
            ]}
          >
            {props.route.params.wordlist.title}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginTop: 5,
          }}
        >
          {subs.map((item) => (
            <ItemSub
              key={item.subcategoryId}
              Sub={item}
              onPress={handlePress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    width: "100%",
    height: "85%",
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
  },
  iconClose: {
    position: "absolute",
    top: 10,
    left: 10,
    alignItems: "center",
  },
  viewImage: {
    width: "100%",
    height: 60,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  imageWordlist: {
    width: 110,
    height: 110,
    position: "absolute",
    top: -50,
    borderRadius: 50,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  Image: {
    width: 110,
    height: 110,
    borderRadius: 50,
  },
});
