import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

const FirstPage = () => {


  const [oriText, setOriText] = useState('My name is Aditya');
  // const [oriText2,setOriText2] = useState("I am currently in Excellon Software pvt. ltd.")
  const [lang,setLang]=useState('en');


  useEffect(() => {
    const locales = RNLocalize.getLocales();
    const preferredLanguage = locales[0].languageCode;
    setLang(preferredLanguage)
    console.log('Preferred Language:', preferredLanguage);

    
  }, []);


  const translateText = async () => {

    const options = {
      method: 'POST',
      url: 'https://google-translation-unlimited.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4ec4bde91cmsh4ff8996210f10bdp131da0jsnbd6f9792eae1',
        'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
      },
      data:{
        texte:oriText,
        to_lang:lang
      } 
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.translation_data);
      const translationData = response.data['translation_data'];
      // console.log(".....",translationData.translation)
      setOriText(translationData.translation)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{alignItems:'center'}}>
      <Text style={{width:300,marginTop:100,fontSize:24,color:'black',fontWeight:'bold'}}>{oriText}</Text>
      {/* <Text style={{width:300,marginTop:100,fontSize:24,color:'black',fontWeight:'bold'}}>{oriText2}</Text> */}
    <TouchableOpacity onPress={translateText}>
      <Text style={{backgroundColor:'blue',padding:10,borderRadius:10}}>Translate</Text>
    </TouchableOpacity>
    </View>
  )
}

export default FirstPage;

// early in the morning, casting a warm glow across the landscape. Birds chirp and flutter their wings, greeting the day with enthusiasm. Dew glistens on the grass, a testament to the cool night that has passed. Children laugh and play in the park, their energy contagious. Flowers bloom in vibrant colors, adding beauty to the surroundings. The scent of freshly brewed coffee wafts from nearby cafes, enticing passersby. As the day unfolds, people go about their routines, weaving the fabric of life in this bustling town.