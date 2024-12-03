const MAX_UINT256 = (2n ** 256n) - 1n; // Maximum value for a 256-bit unsigned integer
const MAX_UINT8 = (2n ** 8n) - 1n; // Maximum value for an 8-bit unsigned integer

class InvalidMemoryAccess extends Error {
    constructor(offset: bigint, value?: bigint) {
        let message = "Error ocurred. Invalid Memory Access ";
        if (value !== undefined) {
            message +=  `value: ${value}, `
        }

        super(message += `offset: ${offset}.`);
        this.name = "InvalidMemoryAccess";
    }
}

class InvalidMemoryValue extends Error {
    constructor(offset: bigint, value: bigint) {
        super(`Error ocurred. Invalid Memory Value offset: ${offset}, value: ${value}.`);
        this.name = "InvalidMemoryValue";
    }
}


export class Memory {
    private memory: bigint[] = [];

    store(offset: bigint, value: bigint): void {
        if (offset < 0n || offset > MAX_UINT256) {
            throw new InvalidMemoryAccess(offset, value);
        }

        if (value < 0n || value > MAX_UINT8) {
            throw new InvalidMemoryValue(offset, value);
        }

        const offsetNumber = Number(offset); 

        // Expand memory if needed
        if (offsetNumber >= this.memory.length) {
            this.memory.length = offsetNumber + 1;
            this.memory.fill(0n, this.memory.length, offsetNumber + 1); // Initialize new elements to 0n
        }

        this.memory[offsetNumber] = value;
    }

    load(offset: bigint) {
        if (offset < 0n) {
            throw new InvalidMemoryAccess(offset);
        }
        if (offset >= this.memory.length) {
            return 0n;
        }

        return this.memory[Number(offset)] || 0n;
    }

    length() {
        return this.memory.length;
    }
}