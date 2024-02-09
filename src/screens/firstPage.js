import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

const FirstPage = () => {

  const en = require('../../en.json');
  console.log(en)
  const [oriText, setOriText] = useState(en);
  // const [oriText2,setOriText2] = useState("I am currently in Excellon Software pvt. ltd.")
  const [lang,setLang]=useState('en');


  useEffect(() => {
    const locales = RNLocalize.getLocales();
    const preferredLanguage = locales[0].languageCode;
    setLang(preferredLanguage)
    console.log('Preferred Language:', preferredLanguage);

    
  }, []);


  const translateText = async () => {

      // const encodedParams = new URLSearchParams();
      // encodedParams.set('json_code', '{"text":"thanks for your perce", "author":"Andry RL"}');
      // encodedParams.set('to_lang', 'fr');
      console.log("...................inside fun.........")
      const options = {
        method: 'POST',
        url: 'https://google-translation-unlimited.p.rapidapi.com/translate_json',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '4ec4bde91cmsh4ff8996210f10bdp131da0jsnbd6f9792eae1',
          'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
        },
        data:{
          json_code:JSON.stringify(en),
          to_lang:lang
        }
      };
      console.log("............",options)
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setOriText(response.data.json_traduit)
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <View style={{alignItems:'center'}}>
      <Text style={{width:300,marginTop:100,fontSize:24,color:'black',fontWeight:'bold'}}>{oriText.text}</Text>
      <Text style={{width:300,marginTop:100,fontSize:24,color:'black',fontWeight:'bold'}}>{oriText.author}</Text>
      {/* <Text style={{width:300,marginTop:100,fontSize:24,color:'black',fontWeight:'bold'}}>{oriText2}</Text> */}
    <TouchableOpacity onPress={translateText}>
      <Text style={{backgroundColor:'blue',padding:10,borderRadius:10}}>Translate</Text>
    </TouchableOpacity>
    </View>
  )
}

export default FirstPage;

// early in the morning, casting a warm glow across the landscape. Birds chirp and flutter their wings, greeting the day with enthusiasm. Dew glistens on the grass, a testament to the cool night that has passed. Children laugh and play in the park, their energy contagious. Flowers bloom in vibrant colors, adding beauty to the surroundings. The scent of freshly brewed coffee wafts from nearby cafes, enticing passersby. As the day unfolds, people go about their routines, weaving the fabric of life in this bustling town.