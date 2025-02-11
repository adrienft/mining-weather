const request = require("supertest");
const app = require("../server");

describe("Tests sur la route /favorite", () => {
    beforeEach(() => {
        app.locals.favorites = []; // Réinitialiser les favoris avant chaque test
    });

    test("Ajoute une ville aux favoris", async () => {
        const response = await request(app)
            .post("/favorite")
            .send({ city: "Paris" });

        expect(app.locals.favorites).toContain("Paris");
        expect(response.status).toBe(302); // Redirection attendue
        expect(response.headers.location).toBe("/"); // Vérifie la redirection
    });

    test("Ne doit pas ajouter une ville déjà en favoris", async () => {
        app.locals.favorites.push("Paris");

        const response = await request(app)
            .post("/favorite")
            .send({ city: "Paris" });

        expect(app.locals.favorites).toEqual(["Paris"]);
        expect(app.locals.favorites.length).toBe(1);
        expect(response.status).toBe(302);
    });

    test("Ajoute plusieurs villes aux favoris", async () => {
        await request(app).post("/favorite").send({ city: "Paris" });
        await request(app).post("/favorite").send({ city: "Londres" });

        expect(app.locals.favorites).toEqual(["Paris", "Londres"]);
        expect(app.locals.favorites.length).toBe(2);
    });
});
