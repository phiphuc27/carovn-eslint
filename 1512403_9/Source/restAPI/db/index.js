const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'us-cdbr-iron-east-05.cleardb.net',
	port: '3306',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'heroku_27d81ad66052804'
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

userDB.findProfileByEmail = email => {
	const sql = `select * from user u join user_info i on u.id = i.id where u.email = '${email}'`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			else return resolve(result[0]);
		});
	});
};

userDB.findById = id => {
	const sql = `select * from user where id = ${id}`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			if (result.length === 0) return resolve(result);
			else return resolve(result[0]);
		});
	});
};

userDB.findProfileById = id => {
	const sql = `select * from user u join user_info i on u.id = i.id where u.id = ${id}`;
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			if (result.length === 0) return resolve(result);
			else return resolve(result[0]);
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

userDB.updatePassword = (password, id) => {
	const sql = `update user set ? where id =${id} `;
	return new Promise((resolve, reject) => {
		pool.query(sql, password, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

userDB.insertProfile = profile => {
	const sql = `insert into user_info set ? `;
	return new Promise((resolve, reject) => {
		pool.query(sql, profile, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

userDB.updateProfile = (profile, id) => {
	const sql = `update user_info set ? where id = ${id} `;
	return new Promise((resolve, reject) => {
		pool.query(sql, profile, (err, result) => {
			if (err) reject(err);
			return resolve(result);
		});
	});
};

module.exports = userDB;
