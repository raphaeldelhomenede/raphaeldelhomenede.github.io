const express = require('express');
const app = express();
const path = require('path');

// Utiliser le middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Créer une route pour traiter les données du formulaire
app.post('/get-link', (req, res) => {
    const originalUrl = req.body['original-url'];
    let result = {};

    if (originalUrl && originalUrl.startsWith('https://zu.ct.ws/')) {
        const shortId = originalUrl.split('zu.ct.ws/')[1];
        if (shortId && shortId.length === 11) {
            result.success = true;
            result.shortenedUrl = `https://zu.ct.ws/php/stats.php?shorten_url=${shortId}`;
        } else {
            result.success = false;
            result.error = "L'ID après 'zu.ct.ws/' doit contenir exactement 11 caractères.";
        }
    } else {
        result.success = false;
        result.error = "Veuillez entrer une URL valide qui commence par 'https://zu.ct.ws/'.";
    }

    res.json(result); // Retourner la réponse sous forme JSON
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
