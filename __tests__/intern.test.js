const Intern = require("../lib/intern.js");

describe("Intern class", () => {

    test("Can set school name via constructor argument", () => {
        const testValue = 'Oklahoma';
        const e = new Intern("Foo", 1, "test@test.com", testValue);
        expect(e.school).toBe(testValue);
    });

    test("getRole() should return 'Intern'", () =>{
        const testValue = "Intern";
        const e = new Intern("Foo", 1, "test@test.com", testValue);
        expect(e.getRole()).toBe(testValue);
    })

    test("Can get school name via getSchool() method", () => {
        const testValue = "SMU";
        const e = new Intern("Foo", 1, "test@test.com", testValue);
        expect(e.getSchool()).toBe(testValue);
    })
})