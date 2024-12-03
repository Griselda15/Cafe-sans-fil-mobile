# HomeScreen

### Buts

- Présenter une liste des cafés étudiants;
- Avoir une barre de recherche;
- Avoir des filtres/catégories;

### Pour cela, il faut

- Communiquer avec l'API pour récupérer une liste des cafés (faire attention à l'optimisation);
- Suivez le design figma, pour le layout;
- Utiliser les [flatlist](https://reactnative.dev/docs/flatlist) pour automatiser et procéduraliser le render des cafés;
- Créer un squelette de chargement pour chaque café container.

### La page contiendra

- Une barre de recherche (text input) qui regarde dans le dataset (on peut chercher pour un café (puis pour des items));
- Des filtres (exemple: favoris, etc.), ce sera juste le front-end, pas de logique associé. Il suffit simplement d'ajouter ces bouttons;
- Une flatlist (horizontale) café recemment visité;
- Une flatlist (horizontale) café à proximité (si trop compliqué, faire cafés populaires);
- Une flatlist (verticale) de tout les cafés;

### Ressources utiles

- [Flatlist](https://reactnative.dev/docs/flatlist)
- [TextInput](https://reactnative.dev/docs/textinput)
- [Layout avec flexbox](https://reactnative.dev/docs/flexbox)
