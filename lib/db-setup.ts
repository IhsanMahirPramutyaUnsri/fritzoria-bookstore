import fs from "fs"
import path from "path"
import { query } from "./db"

export async function setupDatabase() {
  try {
    console.log("Setting up database...")

    // Read the schema file
    const schemaPath = path.join(process.cwd(), "lib", "schema.sql")
    const schema = fs.readFileSync(schemaPath, "utf8")

    // Split the schema into individual statements
    const statements = schema
      .split(";")
      .filter((statement) => statement.trim() !== "")
      .map((statement) => statement.trim() + ";")

    // Execute each statement
    for (const statement of statements) {
      await query(statement)
    }

    console.log("Database setup complete!")
  } catch (error) {
    console.error("Error setting up database:", error)
    throw error
  }
}
