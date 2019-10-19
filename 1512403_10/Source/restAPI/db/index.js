const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	port: '3306',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'carovn'
});

let userDB = {};

userDB.all = () => {
	const sql = 'select * from user';
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

userDB.findByEmail = email => {
	const sql = `select * from user where email = '${email}'`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			return resolve(result[0]);
		});
	});
};

userDB.findById = id => {
	const sql = `select * from user where _id = '${id}'`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

userDB.checkEmailExist = email => {
	const sql = `select count(if(email='${email}',1,null)) as emailExist from user`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			return resolve(result[0].emailExist);
		});
	});
};

userDB.insert = user => {
	const sql = `insert into user set ? `;
	return new Promise((resolve, reject) => {
		pool.query(sql, user, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

module.exports = userDB;