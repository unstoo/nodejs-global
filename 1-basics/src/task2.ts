import * as fs from 'node:fs';
import csvtojson from 'csvtojson';

const csvFolder = process.cwd() + '/csv';
const filePath = csvFolder + '/data.csv';

const task2 = async () => {
  await inRam();
  await viaStreams();
};

const handler = (err: string | Error) => console.log(err)

const inRam = async () => {
  let buffer: Buffer = Buffer.alloc(0);
  const converter = csvtojson({ delimiter: ',' }).fromFile(filePath);
  converter.on('data', (data: Buffer) => {
    buffer = Buffer.concat([buffer, data]);
  });
  converter.on('end', () => {
    fs.writeFileSync(csvFolder + '/inRAM.txt', buffer.toString());
  });
  converter.on('error', handler);
};

const viaStreams = async () => {
  const readable = fs.createReadStream(filePath).on('error', handler);
  const converter = csvtojson({ delimiter: ',' }).on('error', handler);
  const writable = fs.createWriteStream(csvFolder + '/viaStreams.txt').on('error', handler);
  readable.pipe(converter).pipe(writable);
};

task2();