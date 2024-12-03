/* 
Cette page s'occupe du processus de login. 
Il faut 2 text inputs: email et password. Un boutton login.
Un text pour password oublié --> push vers reset password
un text pour register
Elle envoie ensuite une requête à l'API pour vérifier ces infos.
Si les infos sont bonnes --> redirection vers homepage
Sinon, afficher un texte d'erreur en dessous du boutton login
Il faut en dessous du textInput password avoir un texte (hyperlink) vers la page resetPwd
*/

import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FONTS } from "../static/theme";

export default function Login() {
  //initialisation du router (pour rediriger vers une autre page)
  const router = useRouter();

  // au lieu de tout de suite push vers homepage, il faut d'abord vérifier via l'api que les
  // logs dans les textInputs sont valides. Et afficher une erreur sinon.

  return (
    <View style={styles.loginContainer}>
      <Text style={{ textAlign: "center" }}>
        This is a fully functional login page
      </Text>

      <TouchableOpacity
        onPress={() => {
          router.push("/resetpwd");
        }}
      >
        <Text style={styles.hypertext}>
          Well, well, well... password forgotten?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/homepage");
        }}
      >
        <Text style={{ ...styles.hypertext, marginTop: 15 }}>
          Login and go to homepage
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    margin: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  hypertext: {
    color: "blue",
    textDecorationLine: "underline",
    fontFamily: FONTS.generalText.fontFamily,
    textAlign: "center",
  },
});

