/* 
cette page est la page la plus complexe de l'app
On veut avoir la liste de tt les cafés, avec des filtres, une barre de recherche, des catégories, etc.
Choses importantes à définir avant de commencer:
    - le layout de la page (orientation des flatlist, par exemple)
    - le chargement des données (créer un loading skeleton), et séparer le loading du texte à l'image, si l'api le permet
    - choisir une UI pas trop cluttered

Chaque container de café sera wrapped dans une touchable opacity qui redirigera vers la page individuelle des cafés
(pour l'instant).

ressources pouvant être utile:
https://www.npmjs.com/package/react-native-skeleton-content
https://www.npmjs.com/package/react-loading-skeleton

*/
import { Text, StyleSheet } from "react-native";
import {FONTS} from '../static/theme';

//utilisez cet objet pour récupérer les infos d'un café
// si vous voulez les infos pour plus de cafés, écrivez une requête dans le dossier ~/script
import {cafeObj} from "../assets/exemple_data/cafe_exemple";

export default function Homepage() {
    return (
        <Text style={styles.exempleText}> This is a fully functional homepage {"\n"}
        ...kinda
        </Text>
    )
}

const styles = StyleSheet.create({
// mettez vos styles ici
    exempleText :{
        textAlign: 'center',
        fontSize: 20,
        marginTop:50,
        fontFamily: FONTS.generalText.fontFamily
    }
});