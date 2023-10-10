import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { styles } from './Style'
import { AntDesign } from '@expo/vector-icons'; 
function SearchContent() {
  return (
    <View style={styles.searchResult}>
          <Image
            source={require("~/assets/searchDoc.png")}
            style={styles.image}
          />
          <Text style={styles.Text}>Search something ...</Text>
    </View>
    // <View style={styles.historySearch}>
    //     <Text style={styles.Text}>Search History</Text>
    //     <View style={styles.historySearch_content}>
    //           <View style={styles.history_item}>
    //              <TouchableOpacity><Text>take</Text></TouchableOpacity>
    //              <AntDesign name="closecircle" size={16} color="#9F9F9F" style={styles.iconClose}/>
    //           </View>
    //     </View>
    // </View>
  )
}

export default SearchContent