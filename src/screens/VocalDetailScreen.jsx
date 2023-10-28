import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderVocalDetail from "~/components/VocalDetail/HeaderVocalDetail/HeaderVocalDetail";
import ItemVocalDetail from "~/components/VocalDetail/ItemVocalDetail/ItemVocalDetail";
import { getDetailVocal } from "~/api/Dictionary";
import ItemVocalMain from "~/components/VocalDetail/ItemVocalMain/ItemVocalMain";
import { GetColor } from "~/helper";
function VocalDetail() {
  const {
    params: { vocals },
  } = useRoute();
  const [vocal, setVocal] = useState(vocals);

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
              />
            </View>
          );
        })}
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderVocalDetail vocal={vocal[0]?.word} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {items}
      </ScrollView>
    </SafeAreaView>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
export default VocalDetail;
