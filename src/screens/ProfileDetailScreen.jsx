import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { getImageUpload } from "~/helper/cloudinary";
import { UpdateProfile } from "~/api/Auth";
import AppLoader from "~/components/AppLoader";
import { delay } from "~/helper";
import { useNavigation } from "@react-navigation/native";

export default function ProfileDetailScreen(props) {
  const [user, setUser] = useState(props.route.params.user);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(props.route.params.user.name);
  const [email, setEmail] = useState(props.route.params.user.email);
  const [gender, setGender] = useState(props.route.params.user.gender);
  const [loaded] = useFonts(configFont);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [fileResponseAvatar, setFileResponseAvatar] = useState("");
  const [avatar, setAvatar] = useState(user.image);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const nameRef = useRef();
  if (!loaded) {
    return null;
  }
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Specify the allowed MIME types for audio files
      });

      if (result.assets[0].size < 5242880) {
        setIsLoadingAvatar(!isLoadingAvatar);
        const res = await getImageUpload({
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].name,
        });
        setFileResponseAvatar(res);
        setAvatar(res);
        setIsLoadingAvatar(false);

        console.log("done res: ", res);
      }
      console.log("tes: ", result);
      if(!isEdit) setEdit(!isEdit);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = () => {
    const update = async () => {
      try {
        setIsLoading(true);
        const res = await UpdateProfile({
          name: name,
          image: avatar,
        });
        console.log("tes: ", res);
        setIsLoading(false);
        setEdit(false);
        nameRef.current.setNativeProps({
          style: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          },
        });
        showToast("Success", "Update successful!", "success");
        await delay(1500);

        // navigation.goBack();
      } catch (error) {
        setIsLoading(false);
        console.log("tes: ", error);

        showToast("Error", error, "error");
      }
    };
    update();
  };

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1300,
      autoHide: true,
      topOffset: 60,
    });
  };
  return (
    <SafeAreaView style={Styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#5671CC", "#9D97F9"]}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View style={Styles.viewHeader}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#fff"
            style={{ padding: 3, marginTop: 5 }}
            onPress={() => navigation.push("Profile")}
          />
          <Text style={Styles.textHeader}>Profile</Text>
        </View>
        <View style={Styles.content}>
          <View
            style={{
              position: "absolute",
              left: "53%",
              // transform: [{ translateX: -50 }],
            }}
          >
            {/* <Image
              source={require("~/assets/man.png")}
              style={Styles.viewImage}
            /> */}
            {!isLoadingAvatar ? (
              avatar == null ? (
                <Image
                  source={require("~/assets/man.png")}
                  style={Styles.viewImage}
                />
              ) : (
                <Image source={{ uri: avatar }} style={Styles.viewImage} />
              )
            ) : (
              <View
                style={[
                  Styles.viewImage,
                  {
                    display: "flex",
                    justifyContent: "center",
                  },
                ]}
              >
                <ActivityIndicator size="small" color="#2C94E6" />
              </View>
            )}

            <TouchableOpacity
              style={Styles.viewCamera}
              onPress={() => pickDocument()}
            >
              <Image
                source={require("~/assets/camera.png")}
                style={Styles.iconCamera}
              />
            </TouchableOpacity>
          </View>

          <View style={Styles.viewEdit}>
            <TouchableOpacity
              // style={{backgroundColor:'yellow'}}
              onPress={() => {
                setEdit(!isEdit);
                if (!isEdit) {
                  nameRef.current.setNativeProps({
                    style: {
                      borderBottomColor: "#6a64f1",
                      borderBottomWidth: 2,
                    },
                  });
                } else {
                  nameRef.current.setNativeProps({
                    style: {
                      borderBottomColor: "#ccc",
                      borderBottomWidth: 1,
                    },
                  });
                }
              }}
            >
              <FontAwesome name="pencil" size={24} color={colors.textColor} />
            </TouchableOpacity>
          </View>

          <View ref={nameRef} style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Name</Text>
              {!isEdit ? (
                <Text
                  style={[
                    Styles.textPlacehoder,
                    {
                      color: colors.textColor,
                    },
                  ]}
                >
                  {name}
                </Text>
              ) : (
                <TextInput
                  style={Styles.textPlacehoder}
                  value={name}
                  onChangeText={setName}
                />
              )}
            </View>
          </View>
          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Email</Text>
              {/* {!isEdit ? ( */}
              <Text
                style={[
                  Styles.textPlacehoder,
                  {
                    color: colors.textColor,
                  },
                ]}
              >
                {email}
              </Text>
              {/* ) : (
                <TextInput
                  style={Styles.textPlacehoder}
                  value={email}
                  onChangeText={setEmail}
                />
              )} */}
            </View>
          </View>
          <View style={{ ...Styles.ViewItem, borderBottomWidth: 0 }}>
            <View>
              <Text style={Styles.textLabel}>Gender</Text>
              <View style={Styles.viewGender}>
                <TouchableOpacity
                  style={{ flexDirection: "row", gap: 10, marginRight: 25 }}
                  disabled={true}
                  onPress={() => {
                    setGender("MALE");
                  }}
                >
                  {gender === "MALE" ? (
                    <View style={Styles.cirle_choose}>
                      <View style={Styles.cirle_child}></View>
                    </View>
                  ) : (
                    <View style={Styles.cirle}></View>
                  )}
                  <Text style={Styles.textLabel}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", gap: 10 }}
                  disabled={true}
                  onPress={() => {
                    setGender("FEMALE");
                  }}
                >
                  {gender === "FEMALE" ? (
                    <View style={Styles.cirle_choose}>
                      <View style={Styles.cirle_child}></View>
                    </View>
                  ) : (
                    <View style={Styles.cirle}></View>
                  )}
                  <Text style={Styles.textLabel}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isEdit && (
            <TouchableOpacity style={Styles.confirm} onPress={handleConfirm}>
              <Text style={{ ...Styles.textLabel, color: "#4096FF" }}>
                Confirm
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={Styles.changePass}
            onPress={() => navigation.push("ChangePassScreen")}
          >
            <Text style={{ ...Styles.textLabel, color: "#9D97F9" }}>
              Change password
            </Text>
          </TouchableOpacity>
        </View>
        <Toast
          config={toastConfig}
          refs={(ref) => {
            Toast.setRef(ref);
          }}
        />
        {isLoading ? <AppLoader /> : ""}
      </LinearGradient>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  viewHeader: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    alignItems: "center",
  },
  textHeader: {
    fontFamily: "Quicksand-Bold",
    color: "#fff",
    fontSize: 26,
    letterSpacing: 0.2,
  },
  content: {
    width: "100%",
    height: Platform.OS === "ios" ? 400 : 430,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 30,
    marginTop: "28%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  viewImage: {
    backgroundColor: "#EDEDED",
    width: 130,
    height: 130,
    borderRadius: 90,
    position: "absolute",
    top: -80,
    left: "53%",
    transform: [{ translateX: -50 }],
  },
  viewEdit: {
    width: "100%",
    alignItems: "flex-end",
  },
  ViewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 25,
    paddingBottom: 8,
  },
  textLabel: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
    color: colors.textColor,
  },
  textPlacehoder: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
    color: colors.textTitle,
  },
  viewGender: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
  },
  cirle: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
  },
  cirle_choose: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#5671CC",
  },
  cirle_child: {
    width: 12,
    height: 12,
    backgroundColor: "#5671CC",
    borderRadius: 6,
  },
  changePass: {
    backgroundColor: "#fff",
    width: 150,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#9D97F9",
    position: "absolute",
    bottom: 25,
    left: "50%",
    transform: [{ translateX: -50 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  confirm: {
    backgroundColor: "#fff",
    width: 150,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#4096FF",
    position: "absolute",
    bottom: "21%",
    left: "50%",
    transform: [{ translateX: -50 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconCamera: {
    position: "absolute",
    width: 20,
    height: 20,
  },
  viewCamera: {
    position: "absolute",
    backgroundColor: "rgb(228 228 231)",
    width: 35,
    height: 35,
    bottom: -40,
    left: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 1000,
  },
});
