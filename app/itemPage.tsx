/* cette "page" contiendra la page individuelle des items. 
Cette page est enfaite plus un modal component (pop-up).
il faut afficher:
    - photo
    - nom
    - reste de l'info de l'api (ou placeholder si manque d'infos)
    - boutton commander (pour l'instant ne fait rien)

Documentation du component modal: https://reactnative.dev/docs/modal
*/

// pour l'instant, les infos dans cet exemple devraient suffire
import { useState } from 'react';
import {itemObj} from '../assets/exemple_data/item_exemple';
import { Alert, View, Text, TouchableOpacity, Modal, ScrollView, Pressable, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


export default function Item(){
    // state variable pour définir 2 états: si le modal est visible ou non
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);
                    }}>
                    
                        <View style={styles.centeredView}>
                            <ScrollView>
                                <View style={styles.modalContainer}>
                                        <Text>Ceci est un modal</Text> 
                                        
                                        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)} style={{flexDirection:'row-reverse'}}>
                                            <Text style={{color:'red'}}>Hide Modal</Text>
                                        </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                </Modal>

                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{backgroundColor:'grey', borderRadius:25, margin:30}}>
                    <Text style={{textAlign:'center', fontSize:20, margin:20}}>Show Modal</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});