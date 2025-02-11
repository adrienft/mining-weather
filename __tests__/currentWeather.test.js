const request = require('supertest');
const app = require('../server');

jest.mock('axios');
const axios = require('axios');

describe('Test de la route météo actuelle (tout en simulant les prévisions mais pas de vérification)', () => {
    const mockWeatherData = {
        data: {
            name: 'Paris',
            sys: { country: 'FR' },
            main: { temp: 15 },
            weather: [{ description: 'ciel dégagé' }],
        },
    };

    const mockForecastData = {
        data: {
            list: [
                { dt_txt: '2025-02-09 12:00:00', main: { temp: 14 }, weather: [{ description: 'partiellement nuageux' }] },
                { dt_txt: '2025-02-10 12:00:00', main: { temp: 16 }, weather: [{ description: 'ensoleillé' }] },
                { dt_txt: '2025-02-11 12:00:00', main: { temp: 12 }, weather: [{ description: 'nuageux' }] },
            ],
        },
    };

    test('Retourne les données météo actuelles pour une ville valide', async () => {
        axios.get.mockResolvedValueOnce(mockWeatherData);
        axios.get.mockResolvedValueOnce(mockForecastData);

        const response = await request(app).post('/').send({ city: 'Paris' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Météo actuelle à Paris, FR');
        expect(response.text).toContain('Température : 15°C');
        expect(response.text).toContain('Conditions : ciel dégagé');

        // Les prévisions sont simulées mais pas vérifiées
        // Aucune vérification pour les prévisions ici
    });

    test('Retourne une erreur si la ville est introuvable', async () => {
        axios.get.mockRejectedValue(new Error('Ville non trouvée'));
        const response = await request(app).post('/').send({ city: 'FakeCity' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Ville non trouvée !');
    });
});
