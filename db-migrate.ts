import { setupDatabase } from "../lib/db-setup"

async function main() {
  try {
    console.log("Starting database migration...")
    await setupDatabase()
    console.log("Database migration completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error during database migration:", error)
    process.exit(1)
  }
}

main()
