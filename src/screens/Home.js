import React, {useState, useEffect} from 'react';
import { Title } from 'react-native-paper';
import {map} from "lodash";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';


export default function Home(props) {
    const {navigation} = props;
    const [newMovies, setNewMovies] = useState(null);
    const [genreList, setGenreList] = useState(null);
    const [genreSelected, setGenreSelected] = useState(28);
    const [genreMovies, setGenreMovies] = useState(null)

    useEffect(() => {
        getNewsMoviesApi()
        .then((response) => {
            setNewMovies(response.results);
        });
    }, []);

    useEffect(() => {
        getAllGenresApi()
        .then((response) => {
            setGenreList(response.genres);
        })
    }, [])

    useEffect(() => {
        getGenreMoviesApi(genreSelected)
        .then((response) => {
            setGenreMovies(response.results);
        });
    }, [genreSelected])

    const onChangeGenre = (newGenreId) => {
        setGenreSelected(newGenreId);
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas Películas</Title>
                    <CarouselVertical data = {newMovies} navigation = {navigation}/>
                </View>
            )}
            <View style = {styles.genres}>
                <Title style={styles.genresTitles}>Películas por género</Title>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    style= {styles.genreList}>
                    {map(genreList, (genre) => (
                        <Text key = {genre.id} 
                            style= {[styles.genre, {color: genre.id !== genreSelected ? "#8697A5" : "#FFF"}]}
                            onPress={() => onChangeGenre(genre.id)}>
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>
                {genreMovies && (
                    <CarouselMulti data = {genreMovies} navigation = {navigation}/>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10,
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22,
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genresTitles: {
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22,
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 20,
        padding: 10
    },
    genre: {
        marginRight: 20,
        fontSize: 16,
    }
})
