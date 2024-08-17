import { PrismaClient } from "@prisma/client";

// export const prismaClient = new PrismaClient({
//     errorFormat: 'pretty',
//     log: ['warn', 'error', "info", "query"]
// })

let prismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            errorFormat: 'pretty',
            log: ['warn', 'error', "info", "query"]
        });
    }
    prismaClient = global.prisma;
}
export { prismaClient };

// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client'

// import pkg from 'pg'; // Use default import for CommonJS module
// const { Pool } = pkg;

// // Your connection setup
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// const adapter = new PrismaPg(pool)
// export const prismaClient = new PrismaClient({ adapter })