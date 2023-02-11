import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer, Switch, TouchableRipple, Text} from "react-native-paper";
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
// render
const {navigation} = props;
const [active, setActive] = useState("TheMovieApp")
const {theme, toggleTheme} = usePreferences();

const onChangeScreen = (screen) =>{
    setActive(screen);
    navigation.navigate(screen);
}
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item 
                    label = "Inicio"
                    active={active === "TheMovieApp"}
                    onPress ={() => onChangeScreen("TheMovieApp")}
                />
                <Drawer.Item 
                    label = "Películas Populares"
                    active={active === "popular"}
                    onPress ={() => onChangeScreen("popular")}
                />
                <Drawer.Item 
                    label = "Nuevas Películas"
                    active={active === "news"}
                    onPress ={() => onChangeScreen("news")}
                />
            </Drawer.Section>
            <Drawer.Section title='Opciones'>
                <TouchableRipple>
                    <View style = {styles.preference}>
                        <Text>Tema oscuro</Text>
                        <Switch  value={theme === "Dark" ? true : false} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
