import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import axios from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import { selectLanguage, setLanguage, setTranslateText,selectTranslateText } from '../redux/langSllice';
import {setTranslations,getTranslations} from '../../TranslateUtil'

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading,setLoading] = useState(true);

  const en = require('../../en.json');
  console.log(en)
  const oriText = useSelector(selectTranslateText);
  const dispatch = useDispatch();
  const lang = useSelector(selectLanguage);
 
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const cachedTranslations = await getTranslations();
        if (cachedTranslations[lang]) {
          // Use cached translations
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<Language fetched without API");
          setLoading(true);
          dispatch(setTranslateText(cachedTranslations[lang]));
          setLoading(false);
        } else {
          // Fetch translations from API
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<Language fetched with API")
          setLoading(true);
          const translations = await translateText();
          setLoading(false);
          // Update cache with new translations
          cachedTranslations[lang] = translations;
          await setTranslations(cachedTranslations);
        }
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Handle error appropriately
      } finally {

      }
    };

    const locales = RNLocalize.getLocales();
    const preferredLanguage = locales[0]?.languageCode || 'en';
    console.log('Before Language Set:', lang);
    dispatch(setLanguage(preferredLanguage));
    console.log('after Language set:', preferredLanguage);
    fetchTranslations();
  }, [dispatch, lang]);

  const translateText = async () => {
    const options = {
      method: 'POST',
      url: 'https://google-translation-unlimited.p.rapidapi.com/translate_json',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4ec4bde91cmsh4ff8996210f10bdp131da0jsnbd6f9792eae1',
        'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
      },
      data: {
        json_code: JSON.stringify(oriText),
        to_lang: lang
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      dispatch(setTranslateText(response.data.json_traduit));
      return response.data.json_traduit;
    } catch (error) {
      console.error(error);
      return '';
    }
  };


  const handleLogin = async () => {
    // Validations...
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
        forceLogin: true
      });

      console.log("Response:", JSON.stringify(response))
      if (response.data.IsLogInSuccessful) {
        setLogin(true);
        alert("Login Successful");
        navigation.navigate('Home')
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
        {loading ? (
          <ActivityIndicator size={'large'} color={'#0000ff'} />
        ) : (
          <>
            <Text style={styles.heading}>{oriText.login}</Text>
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
            <Text style={styles.forgetText}>{oriText.forget}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.button}>
                  <Text style={styles.buttonLabel}>{oriText.login}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.regButton}>
                  <Text style={styles.buttonLabel}>{oriText.register}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {login && (
              <View>
                <Text>{username}</Text>
                <Text>{password}</Text>
              </View>
            )}
          </>
        )}
      </View>
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
    top: 40
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
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  regButton: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
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
  forgetText: {
    color: '#C33F22',
    marginLeft: 170,
    marginBottom: 30
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
