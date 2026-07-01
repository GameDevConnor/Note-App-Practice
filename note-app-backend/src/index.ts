import express from "express";
import cors from "cors";

import prisma from "../prisma/prisma.config.ts";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("server running on localhost:5000");
})

app.get("/test/get", async (request, response) => {

    const notes = await prisma.note.findMany();

    response.json(notes);
})