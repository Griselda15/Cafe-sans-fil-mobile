/* Cette page s'occupera du onboarding process (images qui se suivent avec des bouttons next et précendent)
à la dernière image, on push avec router vers la page login
*/

import {View,
	Text,
	Image,
	Animated,
	Dimensions,
	PanResponder,
	TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView}
from 'react-native';

import { FONTS } from '../static/theme';
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");


// Première page avec image + text
function Page1(){
    return(
    //<ScrollView>
        <View style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/onboarding_images/page1.jpg')} style={styles.image}/>
            </View>
        </View>
    //</ScrollView>
    );
}

// Deuxième page avec image + text
function Page2(){
    return(
        <View style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/onboarding_images/page2.jpg')} style={styles.image}/>
            </View>
        </View>

    );
}

// Troisième page avec image + text + boutton qui redirige vers login page
function Page3(){
    return(
        <View style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/onboarding_images/page3.jpg')} style={styles.image}/>
            </View>
        </View>
    );
}

function Page4(){
    const router = useRouter();
    return(
        <View style={styles.pageContainer}>
            <Text style={{textAlign:'center', padding: 10}}>Du texte indiquant la fin du onboarding process...
                (et peut-être une image)
            </Text>
            <TouchableOpacity onPress={() => {router.push("/login")}} style={styles.centerButton}>
                <Text style={styles.textButton}>
                    Go to Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// fonction qui va tout assembler en un
// on ira de page en page en slidant vers la droite ou la gauche (avancer ou reculer)
// ce serait nice d'avoir une sorte de progress bar en haut.
export default function OnBoarding() {
    const [currentPage, setCurrentPage] = useState(0);
	const translateX = useRef(new Animated.Value(0)).current;

	// Détecter le swipe avec PanResponder
	const panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: () => true,
		onPanResponderRelease: (event, gestureState) => {
			const { dx } = gestureState;

			// Déterminer la direction du swipe
			const direction = dx < -50 ? 1 : dx > 50 ? -1 : 0;

			if (direction !== 0) {
				setCurrentPage((prevPage) => {
					const nextPage = Math.max(0, Math.min(prevPage + direction, 3)); // Limiter entre 0 et 1
					return nextPage;
				});
			}
		},
	});

    // Mise à jour de translateX pour afficher la page courante
	useEffect(() => {
		Animated.spring(translateX, {
			toValue: -currentPage * screenWidth,
			useNativeDriver: true,
			bounciness: 0,
		}).start();
	}, [currentPage]);

	React.useEffect(() => {
		Animated.spring(translateX, {
			toValue: -currentPage * screenWidth,
			useNativeDriver: true,
			bounciness: 0,
		}).start();
	}, [currentPage]);

    return(
        <ScrollView>
        <SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white',
				alignItems: "flex-start",
			}}>
            <Animated.View
            style={{
                flexDirection: "row",
                width: screenWidth * 4,
                transform: [{ translateX }],
            }}
            {...panResponder.panHandlers}>
            <Page1/>
            <Page2/>
            <Page3/>
            <Page4/>
        </Animated.View>
    </SafeAreaView>
    </ScrollView>
    );
}




const styles = StyleSheet.create({
    image: {
        alignSelf: 'auto',
        width:screenWidth,
        margin:10
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth-10,
        flex:1,
        backgroundColor: 'white'
    },
    pageContainer:{
        width:screenWidth,
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    centerButton:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: '#0057ac',
        padding:15,
        margin:100
    },
    textButton:{
        ...FONTS.generalText, fontSize:20
    }

});