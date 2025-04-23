import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// creates a sql connection to the database using the environment variables
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// this sql function we export is used as a tagged template literal to execute sql queries safely
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
