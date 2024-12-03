import "mocha";
import { expect } from "chai";

import { ExecutionContext } from "./executionContext";

describe("Execution Context", () => {
    
        it("Should read correctly", () => {

            const codeHex = "348743411235433355419";
            const codeArray = Uint8Array.from(Buffer.from(codeHex, "hex")); // Convert hex string to Uint8Array

            const execution = new ExecutionContext(codeArray);
            expect(execution.readCode(1)).to.be.equal(0x34n);
            expect(execution.readCode(2)).to.be.equal(0x8743n);
            expect(execution.readCode(2)).to.be.equal(0x4112n);
            expect(execution.readCode(4)).to.be.equal(0x35433355n);
            expect(execution.readCode(1)).to.be.equal(0x41n);
        })
})
