import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'

type PropT = {
    title:string,
    secondary?:boolean,
    primary?:boolean,
    danger?:boolean,
    loading:boolean,
    disabled:boolean,
    onPress:(arg:any) => void
}

const CustomButton = ({
    title,
    secondary,
    primary,
    danger,
    loading,
    disabled,
    onPress
}:PropT) => {

    const getBgColor = () => {
        if (disabled) {
          return colors.grey;
        };
  
        if(primary) {
          return colors.primary;
        };
  
        if(danger) {
          return colors.danger;
        }
        
        if(secondary) {
          return colors.secondary;
        }
    };

  return (
    <TouchableOpacity 
        disabled={disabled} 
        onPress={onPress}
        style={[styles.wrapper, {backgroundColor: getBgColor()}]}>

        <View style={[styles.loaderSection]}>
         {loading && <ActivityIndicator color={primary ? colors.secondary : colors.primary} />}
          {title && (
          <Text style={{
            color: disabled ? 'black' : colors.white,
            paddingLeft: loading ? 10 : 0,
          }}>
            {title}
          </Text>
          )}
        </View>

    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    wrapper: {
     height: 42,
     paddingHorizontal: 5,
     marginVertical: 5,
     borderRadius: 4,
     alignItems: 'center',
     justifyContent: 'space-evenly'
    },
 
    loaderSection: {
     flexDirection: 'row'
    },
 
    textInput: {
        flex: 1,
        width: '100%',
    },
 
    error: {
       color: colors.danger,
       paddingTop: 4,
       fontSize: 12,
    }
 });