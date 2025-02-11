const request = require('supertest');
const app = require('../server');

jest.mock('axios');
const axios = require('axios');

describe('Test de la route météo actuelle', () => {
    const mockWeatherData = {
        data: {
            name: 'Paris',
            sys: { country: 'FR' },
            main: { temp: 15 },
            weather: [{ description: 'ciel dégagé' }]
        }
    };

    test('Retourne les données météo pour une ville valide', async () => {
        axios.get.mockResolvedValue(mockWeatherData);
        const response = await request(app).post('/').send({ city: 'Paris' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Météo actuelle à Paris, FR');
        expect(response.text).toContain('Température : 15°C');
        expect(response.text).toContain('Conditions : ciel dégagé');
    });

    test('Retourne une erreur si la ville est introuvable', async () => {
        axios.get.mockRejectedValue(new Error('Ville non trouvée'));
        const response = await request(app).post('/').send({ city: 'VIVELESMINESALES' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Ville non trouvée !');
    });
});
