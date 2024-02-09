import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const firstPage = () => {
  return (
    <View style={{alignItems:'center'}}>
      <Text style={{width:300,marginTop:100}}>The sun rises early in the morning, casting a warm glow across the landscape. Birds chirp and flutter their wings, greeting the day with enthusiasm. Dew glistens on the grass, a testament to the cool night that has passed. Children laugh and play in the park, their energy contagious. Flowers bloom in vibrant colors, adding beauty to the surroundings. The scent of freshly brewed coffee wafts from nearby cafes, enticing passersby. As the day unfolds, people go about their routines, weaving the fabric of life in this bustling town.</Text>
      <TouchableOpacity>
        <Text style={{fontSize:20,backgroundColor:'blue',color:'yellow',padding:10,borderRadius:10,marginTop:10}}>Translate</Text>
      </TouchableOpacity>
    </View>
  )
}

export default firstPage