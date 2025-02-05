import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import  config  from "@/lib/config";
// or .env.local

const sql = neon(config.env.databaseUrl);
export const db = drizzle({ client: sql });

