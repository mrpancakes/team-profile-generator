const Engineer = require("../lib/engineer.js");

describe("Engineer class", () => {

    test("Can set github username via constructor argument", () =>{
        const testUserName = 'testgithubname';
        const e = new Engineer('Scott', 91, 'test@test.com', 'testgithubname');
        expect(e.github).toBe(testUserName);
    });

    test("getRole() should return 'Engineer'", () => {
        const testValue = 'Engineer';
        const e = new Engineer('Scott', 91, 'test@test.com', 'samplename');
        expect(e.getRole()).toBe(testValue);
    })

    test("Can get github username via getGithubName()", () =>{
        const testUserName = 'samplename';
        const e = new Engineer('Scott', 91, 'test@test.com', 'samplename');
        expect(e.getGithubName()).toBe(testUserName);
    });

})