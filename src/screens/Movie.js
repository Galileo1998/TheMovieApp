import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import {Text, Title, IconButton} from "react-native-paper";
import { getMovieByIdApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import {map} from "lodash";
import { Rating } from 'react-native-ratings';
import usePreferences from '../hooks/usePreferences';
import starDark from "../assets/img/starDark.png";
import starLight from "../assets/img/starLight.png";

export default function Movie(props) {
    const {route} = props;
    const {id} = route.params;
    const [movie, setMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        getMovieByIdApi(id)
        .then((response) => {
            setMovie(response);
        });
    }, [])

    if (!movie) return null;

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieImage movieInformation={movie} />
                <MovieTrailer setShowVideo = {setShowVideo}/>
                <MovieTitle movie = {movie}/>
                <MovieRating voteCount = {movie.vote_count} voteAverage = {movie.vote_average}/>
                <Text style = {styles.overview}>{movie.overview}</Text>
                <Text style = {[styles.overview, {marginBottom: 30}]}>Fecha de lanzamiento: {movie.release_date}</Text>
            </ScrollView>

            <ModalVideo show = {showVideo} setShow = {setShowVideo} idMovie = {id}/>
        </>
    );
}

function MovieImage(props) 
{
    const { movieInformation } = props;

    return (
      <View style={styles.viewPoster}>
        {movieInformation != null && (
            <Image
                style={styles.poster}
                source={{ uri: `${BASE_PATH_IMG}/w500${movieInformation.poster_path}`}}
            />
        )}

      </View>
    );
}

function MovieTrailer(props){
    const {setShowVideo} = props;
    
    return (
        <View style = {styles.viewPlay}>
            <IconButton
                icon = "play" 
                color = "#000"
                size={30}
                style = {styles.play}
                onPress = {() => setShowVideo(true)}/>
        </View>
    );
}

function MovieTitle(props) {
    const {movie} = props;
    return (
        <View style = {styles.viewInfo}>
            <Title>{movie.title}</Title>
            <View style = {styles.viewGenres}>
                {map(movie.genres, (genre) => 
                (
                    <Text key={genre.id} style= {styles.genre}>{genre.name}</Text>
                ))}
            </View>
        </View>
    );
}

function MovieRating(props)
{
    const {voteCount, voteAverage} = props;
    const media = voteAverage / 2;
    const {theme} = usePreferences();

    return (
        <View style = {styles.viewRating}>
            <Rating 
                type = "custom"
                ratingImage = {theme === "Dark" ? starDark : starLight}
                ratingColor = "#FFC205"
                ratingBackgroundColor={theme === "Dark" ? "#192734": "#F0F0F0"}
                startingValue = {media}
                imageSize = {20}
                style = {{ marginRight: 15}}
            />
            <Text style={{fontSize: 16, marginRight: 5}}>{media}</Text>
            <Text style = {{fontSize: 12, color: "#8697A5"}}>
                {voteCount} votos
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewPoster: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 1,
      textShadowRadius: 10,
    },
    poster: {
      width: '100%',
      height: 500,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    viewPlay: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    play: {
      backgroundColor: '#1C1C1C',
      marginTop: -40,
      marginRight: 30,
      width: 60,
      height: 60,
      borderRadius: 100,
    },
    viewInfo: {
      marginHorizontal: 30,
    },
    viewGenres: {
      flexDirection: 'row',
    },
    genre: {
      marginRight: 20,
      color: '#8697A5',
    },
    viewRating: {
      marginHorizontal: 30,
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    overview: {
      marginHorizontal: 30,
      marginTop: 20,
      textAlign: 'justify',
      color: '#8697A5',
    },
  });