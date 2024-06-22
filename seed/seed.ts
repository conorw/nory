// use typeorm to seed the database
// open the seed.xlsx file, use each sheet to seed the database
// this is a one-time operation, so we can use a script

import { DataSource } from 'typeorm';
import { Staff, Ingredient, Recipe, Modifier, Menu, Location } from '../src/lib/types';
import xlsx from 'node-xlsx';

const seed = async () => {
    const AppDataSource = new DataSource({
        type: 'sqlite',
        database: '../db.sqlite',
        entities: [Staff, Ingredient, Recipe, Modifier, Menu, Location],
        synchronize: true,
        logging: false
    });

    const db = await AppDataSource.initialize();
    // open the seed.xlsx file using node-xlsx, use each sheet to seed the database
    // this is a one-time operation, so we can use a script
    const spreadsheet = xlsx.parse('seed.xlsx');
    // for each sheet, insert the rows into the database
    for (const sheet of spreadsheet) {
        const [...rows] = sheet.data;
        // remove the header row
        rows.shift();
        const entity = sheet.name;
        // translate the header name to the entity name
        // e.g. 'ingredients' -> Ingredient
        // but staff is not plural, so we need to handle that
        const entityName = entity.slice(-1) === 's' ? entity.slice(0, -1).charAt(0).toUpperCase() + entity.slice(0, -1).slice(1) : entity.charAt(0).toUpperCase() + entity.slice(1);
        console.log(`Seeding ${entityName}, ${entity}`);
        const repository = db.getRepository(entityName);
        // console.log(repository);
        for (const row of rows) {
            // convert row to json entity
            const jsonRow = Object.fromEntries(row.map((value, index) => [sheet.data[0][index], value]));
            console.log(jsonRow);
            const entity = repository.create(jsonRow);
            await repository.save(entity);
        }
    }
    console.log('Database seeded');
};

seed();
