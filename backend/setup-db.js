#!/usr/bin/env node

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
};

async function setupDatabase() {
  const client = new Client(config);

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if database exists
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'algoforge';"
    );

    if (result.rows.length === 0) {
      console.log('Creating database algoforge...');
      await client.query('CREATE DATABASE algoforge;');
      console.log('✅ Database algoforge created');
    } else {
      console.log('✅ Database algoforge already exists');
    }

    await client.end();

    // Connect to algoforge database to create tables
    const dbClient = new Client({
      ...config,
      database: 'algoforge',
    });

    await dbClient.connect();
    console.log('✅ Connected to algoforge database');

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'src/database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Creating tables...');
    await dbClient.query(schema);
    console.log('✅ Tables created');

    // Read and execute seed.sql
    const seedPath = path.join(__dirname, 'src/database/seed.sql');
    const seed = fs.readFileSync(seedPath, 'utf8');

    console.log('Seeding database...');
    await dbClient.query(seed);
    console.log('✅ Database seeded');

    await dbClient.end();
    console.log('✅ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
