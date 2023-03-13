import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

const host = `localhost:${port}`;
const _request = request(host);

export default _request;
