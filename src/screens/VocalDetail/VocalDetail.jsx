import React from 'react'
import { styles } from './Styles'
import { View } from 'react-native'

import HeaderVocalDetail from '../../components/HeaderVocalDetail/HeaderVocalDetail'
import ItemVocalDetail from '../../components/ItemVocalDetail/ItemVocalDetail'
function VocalDetail() {
  return (
    <View style={styles.container}>
        <HeaderVocalDetail />
        <ItemVocalDetail />
        <ItemVocalDetail />
    </View>
  )
}

export default VocalDetail