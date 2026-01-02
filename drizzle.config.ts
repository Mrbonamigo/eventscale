import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts", // Onde criamos as tabelas
    out: "./drizzle",            // Pasta onde as migrações serão salvas
    dialect: "postgresql",       // Banco que estamos usando
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});