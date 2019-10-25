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
	user_id int not null,
    first_name varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci,
    last_name varchar(255) character set utf8mb4 collate utf8mb4_unicode_ci,
    birth_day date,
    gender varchar(6),
    phone varchar(10),
    avatarURL varchar(255),
	google_id varchar(255),
    facebook_id varchar(255),
    modification_time datetime on update current_timestamp,
    primary key(user_id),
    foreign key (user_id) references user(id)
);

select * from user;
select * from user_info;
