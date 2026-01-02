import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// --- ADICIONE ISTO ---
// Vamos ver se a variável existe. NÃO compartilhe o resultado se tiver sua senha real.
console.log("DEBUG: DATABASE_URL é:", process.env.DATABASE_URL);
// ---------------------

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });