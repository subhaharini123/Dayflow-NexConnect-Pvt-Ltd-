const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const dbPath = path.join(__dirname, 'nexconnect.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    // Auto-initialize tables and seed data if database is empty
    initializeDatabaseIfEmpty();
  }
});

function initializeDatabaseIfEmpty() {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='employees'", (err, row) => {
    if (err) {
      console.error('Error checking database status:', err.message);
      return;
    }
    
    if (!row) {
      console.log('SQLite database is empty. Automatically initializing schema and seeding data...');
      try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        
        db.exec(schemaSql, (err) => {
          if (err) {
            console.error('Failed to create schema on auto-init:', err.message);
          } else {
            console.log('Schema created successfully. Running seeding script...');
            
            // Execute seed.js to parse CSV and insert initial records
            exec('node seed.js', { cwd: __dirname }, (error, stdout, stderr) => {
              if (error) {
                console.error('Auto-seeding failed:', error.message);
              } else {
                console.log('Auto-seeding output:', stdout.trim());
              }
            });
          }
        });
      } catch (e) {
        console.error('Database auto-initialization crashed:', e);
      }
    } else {
      console.log('SQLite database already initialized with table schemas.');
    }
  });
}

// Helper to execute SQLite queries with a Promise interface matching pg's { rows: [...] }
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    // Translate PostgreSQL parameters ($1, $2) to SQLite (?)
    const cleanSql = sql.replace(/\$\d+/g, '?');
    
    // Determine query type (SELECT uses .all, others use .run)
    const isSelect = cleanSql.trim().toLowerCase().startsWith('select');
    
    if (isSelect) {
      db.all(cleanSql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Parse JSON columns in rows back to objects
          const parsedRows = (rows || []).map(row => {
            const newRow = { ...row };
            if (typeof newRow.resume === 'string') {
              try { newRow.resume = JSON.parse(newRow.resume); } catch (e) {}
            }
            if (typeof newRow.private_info === 'string') {
              try { newRow.private_info = JSON.parse(newRow.private_info); } catch (e) {}
            }
            if (typeof newRow.salary === 'string') {
              try { newRow.salary = JSON.parse(newRow.salary); } catch (e) {}
            }
            return newRow;
          });
          resolve({ rows: parsedRows });
        }
      });
    } else {
      db.run(cleanSql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ 
            rows: [],
            lastID: this.lastID,
            changes: this.changes
          });
        }
      });
    }
  });
};

module.exports = {
  query,
  db
};
