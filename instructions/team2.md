# Sign In

- 2 text inputs (email et password);
- Un boutton "Login";
- Quand le boutton est cliqué, il faut vérifier si le user existe dans la BD (communiquer avec l'API);
- Si le user existe => on redirige vers la page `homescreen.tsx`;
- Sinon, on affiche un message d'erreur en-dessous du second text input;
- Il faut avoir un Touchable Opacity pour reset son mot de passe;

# Onboarding

- Écrire 3 phrases qui éxpliquent rapidement l'app (son but, comment l'utiliser, etc.);
- Choisir 3 images (parler à Thierno, car il a fait le design Figma) pour les 3 pages d'onboarding;
- La 4e page contient un peu de texte et un boutton qui redirige vers la page `homescreen.tsx`;
- On peut déjà scroll entre les 4 pages en "flingant" vers la droite/gauche, mais ajouter des bouttons (icones flèche droite/gauche);
- Implémenter une sorte de "progress bar" qui sera soit en haut de l'écran, soit entre les bouttons droite/gauche;

# Sign up

- 6 text inputs: email, prénom, nom, matricule, mdp, (vérif sécurité), username;
- Boutton sign up => vérifie validité des logs, et envoie une requête à l'API (le boutton appelle une fonction qui appelle le js script qui request l'API);
- Quand request envoyée, mettre image url a qlq chose de random;
- Une fois que le sign up est successful => rediriger vers `login.tsx`;

### Ressources utiles

- [Layout avec flexbox](https://reactnative.dev/docs/flexbox)
