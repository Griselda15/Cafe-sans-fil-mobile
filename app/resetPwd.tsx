/* cette page va reset le password de l'utilisateur.
il faut un textInput pour l'email
un boutton envoyer qui va vérifier que l'email est associé à un compte (via l'api)
s'il y a un match, on push vers une nouvelle page qui va contenir 2 text inputs:
un pour password
deuxieme pour confirmer password
(il faut vérifier que les passwords sont sécuritaires)

il y aura ensuite un boutton qui va envoyer une api request pour updater le compte de l'utilisateur
*/

import {Text} from 'react-native';

export default function ResetPwd() {
    return(
        <Text>Reset your password? gl lol</Text>
    )
}