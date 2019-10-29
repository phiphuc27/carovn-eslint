create database if not exists heroku_27d81ad66052804;
use heroku_27d81ad66052804;
create table if not exists user (
	id int auto_increment primary key,
	email varchar(255) not null,
    password varchar(255),
    create_time datetime default current_timestamp,
    modification_time datetime on update current_timestamp
);

create table if not exists user_info (
	id int not null primary key,
    first_name varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci,
    last_name varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci,
    birth_day date,
    gender varchar(6),
    avatarURL varchar(255),
    modification_time datetime on update current_timestamp,
    foreign key (id) references user(id)
);

select * from user;
select * from user_info;
select * from user u join user_info i on u.id = i.id where u.id = 21;
