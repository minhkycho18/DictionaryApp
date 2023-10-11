import React, { useState ,useEffect } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { styles } from './Style'
import { AntDesign } from '@expo/vector-icons';
import { removeHistory } from '~/helper/asyncStorage';
function SearchContent({history, onRemove}) {
  
  return (
    <View style={styles.main}>
      {history.length > 0 ?  (
        <View style={styles.historySearch}>
          <Text style={styles.Text}>Search History</Text>
          <View style={styles.historySearch_content}>
            {history.map((item, index) => (
              <View style={styles.history_item} key={index}>
                <TouchableOpacity><Text>{item}</Text></TouchableOpacity>
                <AntDesign name="closecircle" size={18} color="#9F9F9F" style={styles.iconClose} onPress={() => onRemove(index)} />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.searchResult}>
          <Image
            source={require("~/assets/searchDoc.png")}
            style={styles.image}
          />
          <Text style={styles.Text}>Search something ...</Text>
        </View>
      )}
    </View>
    
    
    
    
    
    
    


  )
}

export default SearchContent