import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as RNLocalize from 'react-native-localize';
 import axios from 'axios';
 
 
export default function Login() {
  const en = require('../../en.json')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setlogin] = useState(false);
  const [oriText,setOriText] = useState(en)
  const [lang,setLang] = useState('en')


 
  useEffect(() => {
    const locales = RNLocalize.getLocales();
    const preferredLanguage = locales[0].languageCode;
    setLang(preferredLanguage);
    console.log('Preferred Language:', preferredLanguage);

    translateText();
  }, [lang]);
 
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
 
  const handleLogin = async () => {
 
 
    //validations...
    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }
 
    if (password.trim() === "") {
      alert("Password cannot be empty");
      return;
    }
 
 
    try {
      
        console.log("Api Call Started of Login")
        const response = await axios.post('http://fordtst.excelloncloud.com/exApis/api/Authenticate/Login', {
          username: username,
          password: password,
          forceLogin:true
        });
 
     
        console.log("Response/..............",JSON.stringify(response))
        if (response.data.IsLogInSuccessful) {
          setlogin(true);
          alert("Login Successful");
          navigation.navigate('profile');
          setUsername("");
          setPassword("");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      } catch (error) {

      
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      }
   
 
  };
 
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={oriText.username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={oriText.password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.forgettext}>Forget password?</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>{oriText.login}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.regbutton}>
              <Text style={styles.buttonLabel}>{oriText.register}</Text>
            </View>
          </TouchableOpacity>
        </View>
 
      </View>
      {login &&
        <View>
          <Text>{username}</Text>
          <Text>{password}</Text>
        </View>
      }
    </>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 100,
    top:40
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row'
 
  },
  button: {
    backgroundColor: 'green',
    width: 60,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  regbutton: {
    backgroundColor: 'green',
    width: 80,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgettext: {
    color: '#C33F22',
    marginLeft: 170,
    marginBottom: 30
  }
});
 