import { IPS, LOGS } from './data';
import { dbStructure, TABLES } from './types';
let { Client } = require('pg');

let con = new Client({  
    host: "localhost",  
    user: "myuser",  // Adjusted for typical Postgres setup  
    password: "mypassword",  
    database: "mydb"  
});  

con.connect();

async function main() {
    let table: keyof typeof dbStructure;

    for (table in dbStructure) { //loop over each table to insert 
        await connectAndInsert(table);
    }
    con.end();
    console.log('done inserting')
}

async function connectAndInsert(targetTable: keyof typeof dbStructure) {
    let lines = generateInsertLines(targetTable);

    for (let i = 0; i < lines.length; i++) {
        let sql = `INSERT INTO ${targetTable} 
        (${dbStructure[targetTable].columns.join(", ")}) 
        VALUES ${lines[i]}`;

        try {
            let res = await con.query(sql);
        } catch (err) {
            console.error(err.stack)
        }
    }
    console.log(`done inserting ${targetTable}`)
}

function generateInsertLines(targetTable: keyof typeof dbStructure): string[] {
    let lines: string[] = []; //format: ["('xxx', 'xxx')", "('xxx', 'xxx')", ...]
    switch (targetTable) {
        case TABLES.ip:
            console.log(IPS.length);
            for (let i = 0; i < IPS.length; i++) {
                lines.push(`
                ("${IPS[i].ip}", ${IPS[i].created_at}, ${IPS[i].update_at}, ${IPS[i].deleted_at}, "${IPS[i].lat}", "${IPS[i].lon}")
                `);
            }
            break;
        case TABLES.logs:
            for (let i = 0; i < LOGS.length; i++) {
                lines.push(`
                    (${LOGS[i].ip_id}, ${LOGS[i].created_at}, ${LOGS[i].update_at}, ${LOGS[i].deleted_at}, "${LOGS[i].path}", "${LOGS[i].method}", ${LOGS[i].status}, ${LOGS[i].latency})
                `);
            }
            break;

        default:
            console.log("wrong table name");
    }

    return lines;
}

main();
