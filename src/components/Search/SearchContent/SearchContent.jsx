import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from './Style'
function SearchContent() {
  return (
    <View style={styles.searchResult}>
          <Image
            source={require("~/assets/searchDoc.png")}
            style={styles.image}
          />
          <Text style={styles.Text}>Search something ...</Text>
    </View>
  )
}

export default SearchContent