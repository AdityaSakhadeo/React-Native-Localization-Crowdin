import { View, Text } from 'react-native'
import React from 'react'
import FirstPage from './src/screens/firstPage'
import LoginPage from './src/screens/login'
import Home from './src/screens/home'
import Login from './src/screens/login'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'


const App = () => {
  const STACK = createNativeStackNavigator()
  return (
    <Provider store={store}>
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <STACK.Screen name='Home' component={Home} options={{headerShown:false}}/>
      </STACK.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App