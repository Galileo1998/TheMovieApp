import Reac, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import WebView from 'react-native-webview';
import YouTube from 'react-native-youtube';
import { getVideoMovieApi } from '../api/movies';

export default function ModalVideo(props) {
// render
    const {show, setShow, idMovie} = props;
    const [video, setVideo] = useState(null);

    useEffect(() => {
        getVideoMovieApi(idMovie)
        .then((response) => {
            let idVideo = null;
            response.results.forEach((video) => {
                if(video.site === 'YouTube' && !idVideo)
                {
                    idVideo = video.key;
                }
            });
            setVideo(idVideo);
        }
        )
    }, [])
// apiKey="AIzaSyC5PxTPHlFBIs1x_sgDQ__aDXJJqauOClg"
    return (
        <Modal visible={show} contentContainerStyle = {styles.modal}>
            {Platform.OS === "ios" ? (
                <YouTube
                videoId={video} 
                apiKey='AIzaSyC5PxTPHlFBIs1x_sgDQ__aDXJJqauOClg'
                style={{ alignSelf: 'stretch', height: 300 }}
                autoplay = {true}
                />
            ): (
                <WebView style={{width: 500}} source = {{uri: `https://www.youtube.com/embed/${video}?controls=0&showInfo=0`,}}/>
            )}

            <IconButton icon="close"
                        onPress={() => setShow(false)}
                        style={styles.close}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#000",
        height: "120%",
        alignItems: "center",
    },
    close:{
        backgroundColor: "#1EA2F3",
        width: 50,
        height: 50,
        borderRadius: 100,
        position: "absolute",
        bottom: 100,
    },
    video: {
        alignSelf: "stretch",
        height: 300,
    }
})
