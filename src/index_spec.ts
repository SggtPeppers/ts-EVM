import "mocha";
import { expect } from "chai";

import {foo} from "./index";

describe("Test", () => {
    describe("Tests", () => {
        it("should work", () => {
            expect(foo).to.be.equal(1);
        })
    })
})
