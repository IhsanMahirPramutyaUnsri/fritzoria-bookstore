import mysql from "serverless-mysql"

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
})

export async function query(q: string, values: (string | number | boolean | null)[] = []) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export default db
