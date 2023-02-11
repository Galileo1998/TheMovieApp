import React, {useState, useEffect} from 'react';
import {Text, Title, Button} from "react-native-paper";
import {map} from "lodash";
import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { getPopularMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import noImage from "../assets/img/jpg/default-image.png";
import {Rating} from "react-native-ratings";
import usePreferences from '../hooks/usePreferences'; 


export default function Popular(props) {
// render
    const {navigation} = props;
    const [movies, setMovies] = useState(null)
    const {theme} = usePreferences();
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1)

    useEffect(() => {
        getPopularMoviesApi(page)
        .then((response) => {
            const totalPages = response.total_pages;
            if(page < totalPages)
            {
                if(!movies)
                {
                    setMovies(response.results);
                }
                else{
                    setMovies([...movies, ...response.results])
                }
            }
            else
            {
                setShowBtnMore(false);
            }
        })
    }, [page])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {map(movies, (movie, index) => (
                <Movie key = {index} movie = {movie} theme={theme} navigation={navigation}/>
            ))}
            {showBtnMore && (
                <Button 
                    mode='contained' 
                    contentStyle={styles.lodadMoreContainer} 
                    style = {styles.loadMore}
                    labelStyle = {{color: theme === "Dark" ? "#FFF" : "#000"}}
                    onPress={() => setPage(page + 1)}>
                    Cargar más ...
                </Button>
            )}
        </ScrollView>
    )
}

function Movie (props)
{
    const {movie, theme, navigation} = props;
    const {id, poster_path, title, release_date, vote_count, vote_average} = movie;

    const goMovie = () =>{
        navigation.navigate("movie", {id});
    }

    return (
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style = {styles.movie}>
                <View style = {styles.left}>
                    <Image style = {styles.image} source = {
                        poster_path
                        ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                        : noImage
                    }
                    />
                </View>
                <View>
                    <Title style ={{fontSize: 18, width: 250, marginRight: 10}}>{title}</Title>
                    <Text style ={{fontSize: 15}}>{release_date}</Text>
                    <MovieRating theme = {theme} voteCount = {movie.vote_count} voteAverage = {movie.vote_average}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

function MovieRating (props)
{
    const {voteCount, voteAverage, theme} = props;
    const media = voteAverage / 2;

    return (
        <View style ={styles.viewRating}>
            <Rating 
                type = "custom"
                ratingImage = {theme === "Dark" ? starDark : starLight}
                ratingColor = "#FFC205"
                ratingBackgroundColor={theme === "Dark" ? "#192734": "#F0F0F0"}
                startingValue = {media}
                imageSize = {20}
                style = {{ marginRight: 15}}
            />
            <Text style = {{fontSize: 12, color:"#8697A5", marginTop: 5}}>{voteCount} votos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movie: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    left: {
      marginRight: 20,
    },
    image: {
      width: 100,
      height: 150,
    },
    viewRating: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    lodadMoreContainer: {
      paddingTop: 10,
      paddingBottom: 30,
    },
    loadMore: {
      backgroundColor: 'transparent',
    },
  });
