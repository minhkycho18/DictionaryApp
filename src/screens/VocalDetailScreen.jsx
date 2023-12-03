import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderVocalDetail from "~/components/VocalDetail/HeaderVocalDetail/HeaderVocalDetail";
import ItemVocalDetail from "~/components/VocalDetail/ItemVocalDetail/ItemVocalDetail";
import ItemVocalMain from "~/components/VocalDetail/ItemVocalMain/ItemVocalMain";
import { GetColor } from "~/helper";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import ItemAddNewWordlist from "~/components/BottomSheet/ItemAddWordlist/ItemAddWordlist";
import ItemWordlist from "~/components/BottomSheet/ItemWordList/ItemWordList";
import Modal from "react-native-modal";
import FormAdd from "~/components/BottomSheet/FormAdd/FormAdd";
import { checkLogin } from "~/helper/Auth";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { getWordListById } from "~/api/WordList";
import { delay } from "~/helper/index";

function VocalDetail() {
  const {
    params: { vocals },
  } = useRoute();
  const [vocal, setVocal] = useState(vocals);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModaAdd, setIsOpenModaAdd] = useState(false);
  const [isWordList, setIsWordList] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [wordlists, setWordlists] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isWordOfSub, setIsWordOfSub] = useState({});
  const [wordlistId, setWordlistId] = useState("");
  const [newSub, setNewSub] = useState({});
  useEffect(() => {
    const checkToken = async () => {
      const check = await checkLogin();
      setIsLogin(check);
    };

    checkToken();
  }, []);
  useEffect(() => {
    const getMyWordList = async () => {
      const result = await getWordListById();
      setWordlists(result);
    };
    if (isOpen) {
      getMyWordList();
      // console.log("huy");
    }
  }, [isOpen]);
  const handlePresentModal = (data) => {
    if (!isLogin) {
      showToast("Error", "Please login to add", "error");
    } else {
      setDataUpdate(data);
      // console.log(`Object`, data);
      setIsOpen(!isOpen);
    }
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1300,
      autoHide: true,
      topOffset: 50,
      // zIndex: 1000,
    });
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
  let count = 0;
  const items = vocal.map((item) => {
    const colorPos = GetColor(item.pos);

    return (
      <View key={item.id}>
        <ItemVocalMain key={item.id} item={item} color={colorPos} />
        {item.definitions.map((definition) => {
          count += 1;
          return (
            <View key={definition.defId}>
              <ItemVocalDetail
                definition={definition}
                color={colorPos}
                item={item}
                count={count}
                onPresentModal={handlePresentModal}
                stateOfSub={isWordOfSub}
                toastLeitner={(t1, t2, t3) => showToast(t1, t2, t3)}
              />
            </View>
          );
        })}
      </View>
    );
  });
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handlePresentModalAdd = () => {
    console.log("ok");
    setIsWordList(true);
    // setIsOpen(false);
    setIsOpenModaAdd(true);
  };
  const create_success = async (res, type) => {
    if (type) {
      handleToastSucess("Success", "Create new wordlist successfully");
      await delay(1000);
    } else {
      handleToastSucess("Success", "Create new subcategory successfully");
      await delay(1000);
      setNewSub(res);
    }
    setIsOpenModaAdd(false);
    setIsOpen(false);
    delay(400);
    setIsOpen(true);
  };

  const handleCloseModalAdd = async () => {
    setIsOpenModaAdd(false);
    await delay(200);
    // setIsOpen(!isOpen);
  };
  const handleAddSub = (wordlistId) => {
    setWordlistId(wordlistId);
    setIsWordList(false);
    setIsOpenModaAdd(!isOpenModaAdd);
    // setIsOpen(false);
  };
  const handleAddWordToSub = async (data) => {
    handleToastSucess("Success", "Add word to vocabulary successfully");
    await delay(1400);
    setIsOpen(false);
    setIsWordOfSub(data);
  };
  const handleToastSucess = (text1, text2) => {
    showToast(text1, text2, "success");
  };

  const handleError = (text1, text2) => {
    showToast(text1, text2, "error");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderVocalDetail vocal={vocal[0]?.word} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {items}
      </ScrollView>
      <Modal
        onBackdropPress={() => setIsOpen(false)}
        onBackButtonPress={() => setIsOpen(false)}
        isVisible={isOpen}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={1000}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        useNativeDriver={false}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.viewBottomSheet}>
            <Text style={styles.headerBottomSheet}>Add to your wordlist</Text>
            <View style={styles.scrollBottom}>
              <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}
              >
                {wordlists.map((item) => (
                  <ItemWordlist
                    onAddSub={handleAddSub}
                    key={item.id}
                    wordlist={item}
                    data={dataUpdate}
                    onAddWordToSub={handleAddWordToSub}
                    onError={handleError}
                    sub={newSub}
                  />
                ))}

                <ItemAddNewWordlist onAddWordList={handlePresentModalAdd} />
              </ScrollView>
            </View>
          </View>
          {isOpenModaAdd && (
            <View>
              <Modal
                onBackdropPress={() => {
                  setIsOpenModaAdd(false);
                  setIsOpen(true);
                }}
                onBackButtonPress={() => setIsOpenModaAdd(false)}
                isVisible={isOpenModaAdd}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                useNativeDriver={true}
                style={{ ...styles.modal, zIndex: 1000 }}
                onModalShow={() => {}}
              >
                <View style={styles.modalContent}>
                  <View style={styles.viewBottomSheet}>
                    <FormAdd
                      isAddWordlist={isWordList}
                      onCancel={handleCloseModalAdd}
                      onCreate={create_success}
                      wordlistId={wordlistId}
                      onError={handleError}
                    />
                  </View>
                </View>
                <Toast
                  config={toastConfig}
                  refs={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </Modal>
            </View>
          )}
        </View>
        {!isOpenModaAdd && (
          <Toast
            config={toastConfig}
            refs={(ref) => {
              Toast.setRef(ref);
            }}
          />
        )}
      </Modal>
      {!isOpen && (
        <Toast
          config={toastConfig}
          refs={(ref) => {
            Toast.setRef(ref);
          }}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  viewBottomSheet: {
    marginHorizontal: 20,
  },
  headerBottomSheet: {
    fontSize: 23,
    fontFamily: "Quicksand-Bold",
    color: colors.textTitle,
    marginBottom: 10,
    textAlign: "center",
  },
  scrollBottom: {
    height: "90%",
    marginTop: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "70%",
  },
});
export default VocalDetail;
