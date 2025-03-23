import mysql from 'mysql2/promise';
import '../config/envConfig';
declare const promisePool: mysql.Pool;
export default promisePool;
