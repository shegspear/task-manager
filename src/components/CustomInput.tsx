import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {colors} from '../utils/colors'

type PropT = {
  onChangeText:(arg:string) => void,
  iconPosition:string,
  style?:any,
  value:string,
  label:string,
  icon?:any,
  error:string,
  placeholder:string,
  secureTextEntry?:boolean,
  marginBottom:number,
  multiline:boolean
}

const CustomInput = ({
  onChangeText,
  iconPosition,
  style,
  value,
  label,
  icon,
  error,
  placeholder,
  secureTextEntry,
  marginBottom,
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
    <View style={[styles.inputContainer, {marginBottom: marginBottom}]}>
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
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  wrapper: {
   height: 42,
   borderColor: colors.grey,
   borderWidth: 1,
   borderRadius: 4,
   flexDirection: 'row',
   paddingHorizontal: 5,
   alignItems: 'center',
   marginTop: 5,
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