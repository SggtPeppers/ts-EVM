import "mocha";
import { expect } from "chai";

import { Memory }  from "./memory";

const MAX_UINT256 = (2n ** 256n) - 1n; // Maximum value for a 256-bit unsigned integer
const MAX_UINT8 = (2n ** 8n) - 1n; // Maximum value for an 8-bit unsigned integer

describe("Memory Tests", () => {
    
    describe("Store", () => {

        it("should revert negative offset", () => {
            const memory = new Memory();
            let _error = { name: '' };
            try {
                memory.store(-1n, 2n);
            } catch (e: any) {
                _error.name = e.name;
            }
            expect(_error.name).to.be.equal('InvalidMemoryAccess');  
        });

        it("should revert maxUINT256 offset", () => {
            const memory = new Memory();
            let _error = { name: '' };
            try {
                memory.store(MAX_UINT256 + 1n, 10n);
            } catch (e: any) {
                _error.name = e.name;
            }
            expect(_error.name).to.be.equal('InvalidMemoryAccess');  
        });

        it("should revert negative value", () => {
            const memory = new Memory();
            
            let _error = { name: '' };
            try {
                memory.store(10n, -100n);
            } catch (e: any) {
                _error.name = e.name;
            }
            expect(_error.name).to.be.equal('InvalidMemoryValue');
        });
        
        it("should revert value over maxUINT8", () => {
            const memory = new Memory();
            
            let _error = { name: '' };
            try {
                memory.store(10n, MAX_UINT8 + 1n);
            } catch (e: any) {
                _error.name = e.name;
            }
            expect(_error.name).to.be.equal('InvalidMemoryValue');
        });
    });


    describe("Load", () => {
        
        it("should return the correct value stored in that chunk", () => {
            const memory = new Memory();
            memory.store(0n, 100n);
            memory.store(10n, 100n);
            expect(memory.load(15n)).to.be.equal(0n);
            expect(memory.load(5n)).to.be.equal(0n);
        });


        it("should return 0, grater than memory length", () => {
            const memory = new Memory();
            memory.store(0n, 100n);
            memory.store(10n, 100n);
            expect(memory.load(15n)).to.be.equal(0n);
            expect(memory.load(5n)).to.be.equal(0n);
        });

        it("should revert negative offset", () => {
            const memory = new Memory();
            
            let _error = { name: '' };
            try {
                memory.store(10n, 25n);
                memory.load(-1n);
            } catch (e: any) {
                _error.name = e.name;
            }
            expect(_error.name).to.be.equal('InvalidMemoryAccess');
        });
    });
});