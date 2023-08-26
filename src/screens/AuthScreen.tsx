import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import CustomInput from '../components/CustomInput'
import { Feather } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import {StateContext} from '../context/StateContext'

const AuthScreen = ({navigation}:any) => {
  const [form, setForm] = useState<any>({
    userName: '',
    password: ''
  })
  const [errors, setErrors] = useState<any>({})
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useContext(StateContext)
  const [userName, setUserName] = useContext(StateContext)

  const onChange = ({name, value}:{name:string, value:string}) => {
    setForm({...form, [name]: value});

    if(value !== '') {
      if (name === 'password') {
        if (value.length < 5) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]: `Please enter your password`,
            }
          })
        } else {
          setErrors((prev:any) => {
            return { ...prev, [name]: null }
          })
        }
      } else if (name === 'userName') {

        if (value.length < 3) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]: `Please enter your username`,
            }
          })
        } else {
          setErrors((prev:any) => {
            return { ...prev, [name]: null }
          })
        }
      }
    } else {
      setErrors((prev:any) => {
				return { ...prev, [name]: `This field is required` }
			})
    }
  };

  const onSubmit = () => {
    if(form.userName.length > 3 && form.password.length > 5) {
      setUserName(form.userName)
      setLoggedIn(true)
      navigation.navigate('User')
      setForm({
        userName: '',
         password: ''
      })
    } else {
      Alert.alert(
        'Hello there',
        `Please, ensure all input fields are filled correctly, thank you`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true }
      ); 
    }
    // if(form.userName && form.password) {
    //    loginUser(form)(authDispatch);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={{width: '80%'}}>
        <Text style={styles.screenTitle}>Login</Text>

        <CustomInput
          label="Username"
          iconPosition='right'
          placeholder={'Enter Username'}
          value={form.userName || null}
          onChangeText={(value:string) => {onChange({name: 'userName', value})}}
          error={errors.userName}
          marginBottom={5}
          multiline={false}
        />

        <CustomInput
          label="Password"
          placeholder={'Enter Password'}
          value={form.password || null}
          secureTextEntry={isSecureEntry}
          icon={
            <TouchableOpacity onPress={() => {
              setIsSecureEntry(!isSecureEntry);
            }}>
              <Text>{isSecureEntry ? (
                <Feather name="eye" size={18} color="black" /> 
              ) : (
                <Feather name="eye-off" size={18} color="black" />
              )}</Text>
            </TouchableOpacity>
          }
          iconPosition='right'
          onChangeText={(value) => {onChange({name: 'password', value})}}
          error={errors.password}
          marginBottom={15}
          multiline={false}
        />

        <CustomButton
          disabled={loading} 
          onPress={onSubmit}
          loading={loading} 
          primary={true} 
          title='Login' 
        />
      </View>
    </SafeAreaView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  screenTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  }
});