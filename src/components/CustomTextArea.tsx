import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {colors} from '../utils/colors'
import { FormControl, TextArea } from "native-base";

type PropT = {
  onChangeText:(arg:string) => void,
  iconPosition:string,
  style?:any,
  value:string,
  label:string,
  icon?:any,
  error:string,
  placeholder:string,
  secureTextEntry?:boolean
  multiline:boolean
}

const CustomTextArea = ({
  onChangeText,
  iconPosition,
  style,
  value,
  label,
  icon,
  error,
  placeholder,
  secureTextEntry,
  multiline
}:PropT) => {
  const [focused, setFocused] = useState<boolean>(false);

  const getFlexDirection = () => {
    if(icon && iconPosition) {
      if(iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    };
  };

  const getBorderColor = () => {
    if(error) {
      return colors.danger;
    }

    if(focused) {
      return colors.primary;
    }else {
      return colors.grey;
    }
  };

  return (
    <View style={styles.inputContainer}>
        {label && (<Text>{label}</Text>)}

        <View style={[styles.wrapper, 
            {alignItems: icon ? 'center' : 'baseline'},
            { borderColor: getBorderColor(), flexDirection: getFlexDirection()}
          ]}>
         <View>{icon && icon}</View>

         <TextInput
            placeholder={placeholder}
            style={[styles.textInput, style]}
            onChangeText={onChangeText}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            secureTextEntry={secureTextEntry}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={'top'}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
  )
}

export default CustomTextArea

const styles = StyleSheet.create({
  wrapper: {
   height: 100,
   borderColor: colors.grey,
   borderWidth: 1,
   borderRadius: 4,
   flexDirection: 'row',
   paddingHorizontal: 5,
   alignItems: 'center',
   marginTop: 5,
   marginBottom: 15,
  },

  inputContainer: {
   paddingVertical: 12,
  },

  textInput: {
      flex: 1,
      width: '100%',
      color: 'black',
  },

  error: {
     color: colors.danger,
     paddingTop: 4,
     fontSize: 12,
  }
});