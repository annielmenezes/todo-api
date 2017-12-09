import supertest from "supertest";
import { expect } from "chai";
import setupApp from "../../src/app.js";

global.setupApp = setupApp;
global.supertest = supertest;
global.expect = expect;

