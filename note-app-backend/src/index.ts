import express from "express";
import cors from "cors";
// import { PrismaClient } from "./generated/prisma/client.ts";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { env } from "node:process";


const app = express();

app.use(express.json());
app.use(cors());

// const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
// const prisma = new PrismaClient({adapter});

app.listen(5000, () => {
    console.log("server running on localhost:5000");
});

app.get("/api/notes", async (request, response) => {
    // const notes = await prisma.note.findMany();
    // response.json(notes);
})