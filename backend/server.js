const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    "neo4j+s://28f8c951.databases.neo4j.io", 
    neo4j.auth.basic("neo4j", "6rgdwy4deMjR5-U9kFBO4jjQqhUTTe9nV0vqTFgrgAk")
);
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server is running");
});
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`gi);
});
app.post("/add-student", async (req, res) => {

    const { name, email, course } = req.body;

    const session = driver.session();

    try {
        await session.run(
            `
            MERGE (s:Student {email: $email})
            SET s.name = $name
            MERGE (c:Course {name: $course})
            MERGE (s)-[:ENROLLED_IN]->(c)
            `,
            { name, email, course }
        );

        res.json({ message: "Student saved to database ✅" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving student" });
    } finally {
        await session.close();
    }
});
app.get("/get-students", async (req, res) => {

    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (s:Student)-[:ENROLLED_IN]->(c:Course)
            RETURN s.name AS name, s.email AS email, c.name AS course
            `
        );

        const students = result.records.map(record => ({
            name: record.get("name"),
            email: record.get("email"),
            course: record.get("course")
        }));

        res.json(students);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching students" });
    } finally {
        await session.close();
    }
});
app.delete("/delete-student/:email", async (req, res) => {

    const email = req.params.email;
    const session = driver.session();

    try {
        await session.run(
            `
            MATCH (s:Student {email: $email})
            DETACH DELETE s
            `,
            { email }
        );

        res.json({ message: "Student deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting student" });
    } finally {
        await session.close();
    }
});
app.post("/login", async (req, res) => {

    const { email } = req.body;

    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (s:Student {email: $email})
            RETURN s
            `,
            { email }
        );

        if (result.records.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    } finally {
        await session.close();
    }
});