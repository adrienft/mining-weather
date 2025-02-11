# Mining Weather

## Mining Weather, qu'est-ce que c'est ?

Mining Weather est une application développée en Node.js qui permet d’accéder facilement aux conditions et aux prévisions météorologiques d'une ville à partir de l’API OpenWeather. Les utilisateurs peuvent rechercher une ville, consulter la météo en temps réel ainsi que les prévisions sur cinq jours, et enregistrer leurs villes préférées pour un accès rapide.

## Quelles fonctionnalités propose-t-elle ?

L'application met à disposition trois fonctionnalités principales :
- Consulter la météo actuelle pour obtenir les conditions en temps réel ;
- Accéder aux prévisions sur 5 jours afin d'anticiper les évolutions météorologiques ;
- Ajouter des villes en favoris pour un accès rapide aux prévisions locales.

## Comment construire l'application à partir des sources ?

1. Clonez le dépôt Git et rendez-vous dans le répertoire ainsi créé :

    ```sh
    git clone https://github.com/adrienft/mining-weather.git
    cd mining-weather
    ```

3. Installez les dépendances :

    ```sh
    npm install
    ```

## Comment tester les fonctionnalités ?

1. Vous pouvez tester les différentes fonctionnalités à l'aide de la commande ci-dessous :
   
    ```sh
    npm test
    ```

   Si l'application n'est pas lancée, l'un des tests échouera automatiquement. 

## Comment exécuter l'application localement ?

1. Créez un fichier `.env` contenant votre clé d'API OpenWeather ainsi que le port de fonctionnement de l'application :

    ```env
    OPENWEATHER_API_KEY=Votre_Clé_API
    PORT=3000
    ```

3. Démarrez l'application avec :

    ```sh
    npm start
    ```
    
    ou si vous êtes puriste...

    ```sh
    node server.js
    ```

5. Ouvrez un navigateur et accédez à l'adresse `http://localhost:3000`.

## Comment tester l'application avec Docker ?

1. Créez un fichier `.env` contenant votre clé d'API OpenWeather ainsi que le port de fonctionnement de l'application :
   
    ```env
    OPENWEATHER_API_KEY=Votre_Clé_API
    PORT=3000
    ```

1. Construisez l'image Docker :
   
   a. À l'aide des sources (précédemment clonées) :
   
    ```sh
    docker build -t mining-weather .
    ```
    
   b. (ou) En téléchargeant l'image depuis DockerHub :
   
    ```sh
    docker pull adrienft/mining-weather:v1.0.0
    ```

3. Exécutez ensuite le conteneur :

   a. Depuis les sources précédemment clonées :

    ```sh
    docker run -p 3000:3000 --env-file .env mining-weather
    ```

   b. (ou) Depuis l'image précédemment téléchargée sur DockerHub :
   
    ```sh
    docker run -p 3000:3000 --env-file .env adrienft/mining-weather:v1.0.0
    ```

5. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Annexe - Pourquoi si peu de commits ? 

De nombreux tests ont été réalisés dans un dépôt privé pour se faire la main et ne pas polluer les journaux de celui-ci. 
Cela représente plus d'une centaine de commits sur le projet. 

![image](https://github.com/user-attachments/assets/49cf9e05-9fe6-414d-a544-f272e096478c)


---

Ce document fournit toutes les informations nécessaires pour installer, tester et exécuter l'application Mining Weather.
