const request = require('supertest');
const app = require('../server');

jest.mock('axios');
const axios = require('axios');

describe('Test de la route des prévisions météo', () => {
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

    test('Retourne les données météo actuelles et les prévisions pour une ville valide', async () => {
        axios.get.mockResolvedValueOnce(mockWeatherData); 
        axios.get.mockResolvedValueOnce(mockForecastData);

        const response = await request(app).post('/').send({ city: 'Paris' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Météo actuelle à Paris, FR');
        expect(response.text).toContain('Température : 15°C');
        expect(response.text).toContain('Conditions : ciel dégagé');

        // Vérifications des prévisions sur 5 jours
        expect(response.text).toContain('Prévisions sur 5 jours à midi');
        expect(response.text).toContain('2025-02-09 12:00:00');
        expect(response.text).toContain('14°C');
        expect(response.text).toContain('partiellement nuageux');
        expect(response.text).toContain('2025-02-10 12:00:00');
        expect(response.text).toContain('16°C');
        expect(response.text).toContain('ensoleillé');
        expect(response.text).toContain('2025-02-11 12:00:00');
        expect(response.text).toContain('12°C');
        expect(response.text).toContain('nuageux');
    });

    test('Retourne une erreur si la ville est introuvable', async () => {
        axios.get.mockRejectedValue(new Error('Ville non trouvée'));

        const response = await request(app).post('/').send({ city: 'FakeCity' });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Ville non trouvée !');
    });
});
