/* la première page vers laquelle on est redirigé sera celle de onboarding
il faut chercher comment faire qu'au premier log in seulement, on ait le processus d'onboarding
*/

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import OnBoarding from "./onboarding";

export default function Index() {
  const router = useRouter();
  return (
    <View>

      <View style={styles.zone}>
        <TouchableOpacity
          onPress={() => {router.push("/homepage")}}>
        <Text style={styles.hypertext}>Sauter à la homepage</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {router.push("/login")}}>
        <Text style={styles.hypertext}>Sauter au Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {router.push("/itemPage")}}>
        <Text style={styles.hypertext}>Sauter à la page Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {router.push("/cafe")}}>
        <Text style={styles.hypertext}>Sauter à la page Café</Text>
        </TouchableOpacity>
      </View>

      <OnBoarding/>
    </View>
  );
}

const styles = StyleSheet.create({
  hypertext: {
    color:'blue', textDecorationLine:'underline'
  },
  zone :{
    marginTop:100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})