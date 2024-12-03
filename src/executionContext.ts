import { Memory }  from "./memory";

import {Stack}  from "./stack";


export class ExecutionContext {
    code: Uint8Array;
    pc: number;
    stack: Stack;
    memory: Memory;
    stopped = false;

    constructor(code: Uint8Array = new Uint8Array(), pc: number = 0, stack: Stack = new Stack(), memory: Memory = new Memory()) {
        this.code = code;
        this.pc = pc;
        this.stack = stack;
        this.memory = memory;
        this.stopped = false;
    }

    stop() {
        this.stopped = true;
    }

    readCode(numBytes: number): bigint {
        if (this.pc + numBytes > this.code.length) {
            throw new Error(`Out of bounds: Cannot read ${numBytes} bytes from code.`);
        }

        const value = this.code.subarray(this.pc, this.pc + numBytes)
            .reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n);

        this.pc += numBytes;
        return value;
    }

}

// Example usage
// const code = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
// const context = new ExecutionContext(code);

// console.log(context.readCode(2)); // Output: 4660n (0x1234)
// console.log(context.readCode(2)); // Output: 22136n (0x5678)
