create database E_Commerce
use E_Commerce

create table Roles(
	id varchar(5) primary key,
	name varchar(50)
)

create table Users(
	id varchar(5) primary key,
	username varchar(50),
	password varchar(500),
	id_role varchar(5),
	customer_name nvarchar(max),
	phone varchar(20),
	house_address nvarchar(100),
	address1 nvarchar(100),
	address2 nvarchar(100),
	address3 nvarchar(100),
	active bit default(1),

	FOREIGN KEY (id_role) REFERENCES Roles(id)
)

create table Category(
	id varchar(10) primary key,
	name nvarchar(50),
	slug varchar(50),
	active bit default(1)
)

create table Product(
	id varchar(10) primary key,
	title nvarchar(100),
	id_cate varchar(10),
	categorySlug varchar(max),
	gender nvarchar(10),
	image1 varchar(max),
	image2 varchar(max),
	price int default(0),
	slug varchar(100),
	genres varchar(max),
	actors nvarchar(max),
	status varchar(50),
	release int,
	descriptions nvarchar(max),
	sale int default(0),
	active bit default(1),
	director nvarchar(max),
	video varchar(max)

	FOREIGN KEY (id_cate) REFERENCES Category(id)
)
alter table Product drop column size


create table Cart(
	id varchar(9) primary key,
	customer_id varchar(5),
	address nvarchar(max),
	create_date smalldatetime,
	total int default(0),
	status nvarchar(50) default (N'đang chờ xữ lí'),
	active bit default(1),

	FOREIGN KEY (customer_id) REFERENCES Users(id)
)

create table CartInfo(
	cart_id varchar(9),
	product_id varchar(10),
	quantity int default(0),
	active bit default(1),

	primary key (cart_id, product_id),
	foreign key (cart_id) references Cart(id),
	foreign key (product_id) references Product(id)
)
alter table CartInfo drop column size

create table Rate(
	user_id varchar(5),
	product_id varchar(10),
	score float default(0),

	primary key (user_id, product_id),
	foreign key (user_id) references Users(id),
	foreign key (product_id) references Product(id)
)


insert into Roles values('00001', 'admin')
insert into Roles values('00002', 'customer')

insert into Users values('aaaaa','admin','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00001',N'Nguyễn Hoàng Thái Dương','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)
insert into Users values('aaaad','admin@gmail.com','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00001',N'Nguyễn Hoàng Thái Dương','0366330205',N'481 Tỉnh Lộ 10',N'Thành phố Hồ Chí Minh',N'Quận Bình Tân',N'Phường Bình Trị Đông B', 1)
insert into Users values('bbbbb','customer','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00003',N'Nguyễn Hoàng Thái Dương','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)

insert into Users values('2','customer','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00003',N'Nguyễn Hoàng Thái Dương','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)
insert into Users values('330','customer','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00003',N'Nguyễn Âu Duy','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)
insert into Users values('100','customer','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00003',N'Nguyễn Văn Bầu','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)
insert into Users values('wd2ef','thaiduong020502@gmail.com','$2a$12$68/ysYveNCsqjD2ocSxSSe7LeEusqEbgJjyiVPmYszdCxP8.oaWFG','00003',N'Nguyễn Văn Bầu','0366330205',N'30 đường Lê Hồng Phong',N'Hồ Chí Minh',N'Bình Tân',N'Bình trị Đông B', 1)


update Users set password = '$2a$12$du28zFKD4Zv0b4yRcM6f5.BThFPqCk7OhZhoOpe2nS3optbQ1aaWi' where id = 'aaaaa'