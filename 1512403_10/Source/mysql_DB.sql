create database if not exists heroku_27d81ad66052804;
use heroku_27d81ad66052804;
create table if not exists user (
	_id int auto_increment primary key,
	user_name varchar(255) not null,
	email varchar(255) not null,
    password varchar(255) not null,
    create_time datetime default current_timestamp,
    modification_time datetime on update current_timestamp
);

select * from user;
