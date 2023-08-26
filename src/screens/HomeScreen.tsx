import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, View, StyleSheet, Alert, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CustomInput from '../components/CustomInput';
import CustomTextArea from '../components/CustomTextArea';
import CustomButton from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import {StateContext} from '../context/StateContext'

const HomeScreen = ({ navigation }:any) => {
  const [form, setForm] = useState<any>({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [tasks, setTasks] = useState<any>([])
  const [userName, setUserName] = useContext(StateContext)

  const onChange = ({name, value}:{name:string, value:string}) => {
    setForm({...form, [name]: value});

    if(value !== '') {
      if (name === 'title') {
        if (value.length < 3) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]: `Please enter your task title`,
            }
          })
        } else {
          setErrors((prev:any) => {
            return { ...prev, [name]: null }
          })
        }
      } else if (name === 'description') {

        if (value.length < 3) {
          setErrors((prev:any) => {
            return {
              ...prev,
              [name]: `Please enter your task description`,
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
    if(form.title.length > 3 && form.description.length > 5) {
      let obj = {
        title: form.title,
        description: form.description,
        done: false
      }
      setTasks([...tasks, obj])
      setForm({
        title: '',
        description: ''
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
  };

  const removeTask = (id:number) => {
    let arr1 = tasks
    let arr2 = arr1.filter((cur:any, idx:number) => id !== idx)
    setTasks(arr2)
  }

  const markAsComplete = (id:number) => {
    let arr1 = tasks
    let arr2:any = []
    arr1.forEach((cur:any, idx:number) => {
      if(id === idx) {
        cur.done = true
      }
      arr2.push(cur)
    })
    setTasks(arr2)
  }

  const logout = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.head}>
        <Text style={styles.screenTitle}>
          Welcome to your Task manager
        </Text>

        <TouchableOpacity onPress={logout}>
         <SimpleLineIcons name="logout" size={24} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 15}}>

        <CustomInput
          label="Title"
          iconPosition='right'
          placeholder={'Enter task title'}
          value={form.title || null}
          onChangeText={(value:string) => {onChange({name: 'title', value})}}
          error={errors.title}
          marginBottom={5}
          multiline={false}
        />

        <CustomTextArea 
          label="Description"
          iconPosition='right'
          placeholder={'Enter task description'}
          value={form.description || null}
          onChangeText={(value:string) => {onChange({name: 'description', value})}}
          error={errors.description}
          multiline={true}
        />

        <CustomButton
          disabled={loading} 
          onPress={onSubmit}
          loading={loading} 
          secondary={true} 
          title='Submit' 
        />
      </View>

      <FlatList
          data={tasks}
          ItemSeparatorComponent={() => (
              <View
                  style={{ height: 0, width: 0, backgroundColor: 'transparent' }}
              />
          )}
          renderItem={({ item, index }) => (
            <View style={[styles.taskCont, {borderColor: !item.done ? colors.accent : colors.grey}]}>
              <View>
                <Text 
                  style={{
                    textDecorationLine: item.done ? 'line-through' : 'none', 
                    color: item.done ? colors.grey : colors.accent,
                    marginBottom: 5
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    textDecorationLine: item.done ? 'line-through' : 'none', 
                    color: item.done ? colors.grey : colors.accent,
                    marginBottom: 5
                  }}
                >
                  {item.description}
                </Text>
              </View>

              <View style={[styles.taskCtrl, {display: item.done ? 'none' : 'flex'}]}>
                <TouchableOpacity onPress={() => markAsComplete(index)}>
                  <AntDesign name="check" size={24} color="green" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeTask(index)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={20}
      />

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },

  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },

  screenTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },

  taskCont: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  },

  taskCtrl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    marginTop: 10
  }
});