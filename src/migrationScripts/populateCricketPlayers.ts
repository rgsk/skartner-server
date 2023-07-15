// NODE_PATH=src ts-node src/migrationScripts/populateCricketPlayers.ts

import csv from 'csv-parser';
import { db } from 'db';
import fs from 'fs';
import path from 'path';

const parseFile = <T>(filePath: string, columns: string[]) => {
  return new Promise<T[]>((resolve) => {
    const data: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const item: any = {};
        for (let column of columns) {
          item[column] = row[column];
        }
        data.push(item);
      })
      .on('end', () => {
        resolve(data);
      });
  });
};

const fun = async () => {
  const data = await parseFile<{ ID: string; NAME: string }>(
    path.join(__dirname, 'cricket-data.csv'),
    ['ID', 'NAME']
  );
  const dataToBeStored = data.map((r) => ({ dataId: +r.ID, name: r.NAME }));
  const result = await db.cricketPlayer.createMany({ data: dataToBeStored });
  console.log(result);
};

fun();
