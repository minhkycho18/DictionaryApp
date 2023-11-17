import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Toast, { ErrorToast } from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

import ItemSubCategory from "~/components/Home/WordList/ItemSubCategory/ItemSubCategory";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";
import { deleteSubCategory, getAllSubCategory } from "~/api/Subcategory";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ListVocalContext } from "~/context/ListVocal";
import Modal from "react-native-modal";
import FormAdd from "~/components/BottomSheet/FormAdd/FormAdd";
import { delay } from "~/helper/index";

import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import ItemSubCategoryOfPublicSub from "~/components/Home/WordList/ItemSubCategoryOfPublicSub/ItemSubCategoryOfPublicSub";
import { ScrollView } from "react-native";

export default function PublicWordlistDetail() {
  const { params } = useRoute();

  const wl = params.Wordlist;
  const [subCategories, setSubCategories] = useState([]);
  const [isOpenModaAdd, setIsOpenModaAdd] = useState(false);

  const navigation = useNavigation();

  const getSubCategory = async (id) => {
    const data = await getAllSubCategory(id);
    setSubCategories(data);
  };

  useEffect(() => {
    getSubCategory(wl.id);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // console.log("huy");
      getSubCategory(wl.id);
    }, [])
  );
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const handleBack = async () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={["#EDEDED", "#fff"]}
      style={{ flex: 1 }}
      // style={tw`pt-1.5 pr-2 pl-2 pb-2   bg-stone-50`}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
              width: "100%",
              height: 350,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                width: "100%",
                height: "70%",
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  left: 10,
                  top: "-32%",
                  zIndex: 1000,
                  padding: 5,
                }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="close-sharp"
                  size={30}
                  color={colors.textColor}
                />
              </TouchableOpacity>

              <View style={styles.viewImage}>
                <View style={styles.Image}>
                  <Image
                    source={require("~/assets/communication.png")}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={{ top: "-15%" }}>
                {/* Title */}
                <Text
                  style={[
                    {
                      color: colors.textTitle,
                      fontFamily: "Quicksand-Bold",
                      fontSize: 20,
                      letterSpacing: 0.2,
                      marginTop: -10,
                    },
                  ]}
                >
                  {wl.title}
                </Text>
              </View>
              <View style={{ top: "-13%", width: "90%" }}>
                {/* Description */}
                <Text
                  numberOfLines={2}
                  style={[
                    {
                      color: colors.gray,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                      letterSpacing: 0.1,
                      textAlign: "center",
                    },
                  ]}
                >
                  when you want to say hello, you will say you want to set
                  active: {wl.listDesc}
                </Text>
              </View>
            </View>
          </View>

          {subCategories.map((item) => (
            <ItemSubCategoryOfPublicSub
              key={item.subcategoryId}
              subcategory={item}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#EDEDED",
    marginBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  dropdown: {
    display: "flex",
    width: "100%",
    marginTop: 50,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
  },

  viewImage: {
    alignItems: "center",
    position: "relative",
  },
  Image: {
    top: "-30%",
    width: 135,
    height: 200,
    backgroundColor: "#fff",
    borderLeftWidth: 5,
    borderLeftColor: "#BFD8C3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
    borderRadius: 10,

    display: "flex",
    alignItems: "center",
    // marginTop: 20,
  },
  image: {
    top: 10,
    marginTop: 10,
    width: "90%",
    height: "68%",
  },
});
