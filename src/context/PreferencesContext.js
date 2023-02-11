import React, {createContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PreferencesContext = createContext(
    {
        theme: '',
        toggleTheme: () => {},
    }
)

export default PreferencesContext;