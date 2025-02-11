const request = require('supertest');
const { exec } = require('child_process');
const app = require('../server');

describe('Test du serveur', () => {
    test('La route GET / doit répondre avec un statut 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Mining Weather');
    });

    test('La requête cURL GET sur / doit retourner le code HTML de la page', (done) => {
        exec('curl -X GET http://localhost:3000', (error, stdout, stderr) => {
            if (error) {
                done(error);
                return;
            }
            expect(stdout).toContain('Mining Weather');
            done();
        });
    });
});
