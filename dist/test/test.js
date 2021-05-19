"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const PersonalDataService_1 = require("../PersonalDataService");
describe('Convert function', function () {
    let objectBefore = {
        id: 107,
        name: "Subhash Talwar",
        email: "subhash_talwar@ruecker-hoppe.name",
        gender: "Male",
        status: "Active",
        created_at: "2021-05-17T03:50:05.627+05:30",
        updated_at: "2021-05-17T03:50:05.627+05:30"
    };
    let convertedObject = PersonalDataService_1.convert(objectBefore);
    it('Name comparison', function () {
        assert_1.default.equal(objectBefore.name, convertedObject.name);
    });
    it('Email comparison', function () {
        assert_1.default.equal(objectBefore.email, convertedObject.email);
    });
    it('Status comparison', function () {
        assert_1.default.equal(objectBefore.status, convertedObject.status);
    });
    it('Checking the correctness of the login', function () {
        let log = objectBefore.email.substring(0, objectBefore.email.lastIndexOf("@"));
        assert_1.default.equal(log, convertedObject.login);
    });
    it('Checking if uuid is assigned a value', function () {
        assert_1.default.equal(convertedObject.uuid != null && convertedObject.uuid != undefined, true);
    });
});
