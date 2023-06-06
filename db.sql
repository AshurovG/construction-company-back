create table ventilated_facades (
	ventilated_facades_id serial primary key,
	ventilated_facades_title varchar(70) not null,
	ventilated_facades_url text not null
);

insert into ventilated_facades(ventilated_facades_title, ventilated_facades_url)
values
('Вент. фасад 1', 'https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg'),
('Вент. фасад 2', 'https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg'),
('Вент. фасад 3', 'https://www.ecehan.com.tr/wp-content/uploads/2019/05/home-page-kompozit-panel.jpeg'),
('Вент. фасад 4', 'https://dekot21.ru/wp-content/uploads/9/8/3/983bcc84a5d7cf71605828ef9646bb40.jpeg'),
('Вент. фасад 5', 'https://www.stroyportal.ru/media/cache/companies/199248/products/701184179/28440943_image_large.jpg'),
('Вент. фасад 6', 'https://vektorfasad.ru/images/0-270922.jpg');

select * from ventilated_facade_items

create table ventilated_facade_items(
	ventilated_facade_items_id serial primary key,
	ventilated_facade_items_url text not null,
	ventilated_facades_id int not null,
	FOREIGN KEY (ventilated_facades_id) REFERENCES ventilated_facades(ventilated_facades_id)
)

drop table ventilated_facade_items


insert into ventilated_facade_items(ventilated_facade_items_url, ventilated_facades_id)
values
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2),
('https://www.ecehan.com.tr/wp-content/uploads/2019/05/home-page-kompozit-panel.jpeg', 3),
('https://www.ecehan.com.tr/wp-content/uploads/2019/05/home-page-kompozit-panel.jpeg', 3),
('https://www.ecehan.com.tr/wp-content/uploads/2019/05/home-page-kompozit-panel.jpeg', 3),
('https://dekot21.ru/wp-content/uploads/9/8/3/983bcc84a5d7cf71605828ef9646bb40.jpeg', 4),
('https://dekot21.ru/wp-content/uploads/9/8/3/983bcc84a5d7cf71605828ef9646bb40.jpeg', 4),
('https://dekot21.ru/wp-content/uploads/9/8/3/983bcc84a5d7cf71605828ef9646bb40.jpeg', 4),
('https://www.stroyportal.ru/media/cache/companies/199248/products/701184179/28440943_image_large.jpg', 5),
('https://www.stroyportal.ru/media/cache/companies/199248/products/701184179/28440943_image_large.jpg', 5),
('https://www.stroyportal.ru/media/cache/companies/199248/products/701184179/28440943_image_large.jpg', 5),
('https://vektorfasad.ru/images/0-270922.jpg', 6),
('https://vektorfasad.ru/images/0-270922.jpg', 6),
('https://vektorfasad.ru/images/0-270922.jpg', 6);


create table exterior_design (
	exterior_design_id serial primary key,
	exterior_design_title varchar(70) not null,
	exterior_design_url text not null
);

insert into exterior_design(exterior_design_title, exterior_design_url)
values
('Вент. фасад 1', 'https://fasadin.ru/wp-content/uploads/d/d/e/dde1f16aa3171d7681591f3300a9454b.jpeg'),
('Вент. фасад 2', 'http://profstroy.spb.ru/upload/iblock/d6b/d6bf2280328c05f87a967ca0ee6b6811.jpg')

select * from ventilated_facade_items

create table exterior_design_items(
	exterior_design_items_id serial primary key,
	exterior_design_items_url text not null,
	exterior_design_id int not null,
	FOREIGN KEY (exterior_design_id) REFERENCES exterior_design(exterior_design_id)
)

insert into exterior_design_items(exterior_design_items_url, exterior_design_id)
values
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://kremenki-gorod.ru/wp-content/uploads/5/a/4/5a4e01c3e5669a44dba0e3f8657331d9.jpeg', 1),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2),
('https://www.stroyportal.ru/media/cache/companies/173031/products/685484411/2fe8d597-7252-41f8-9fe2-f5b84b844488_image_large.jpg', 2)


select * from questions

insert into questions(questions_title, questions_text)
values 
('Вопрос 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
('Вопрос 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
('Вопрос 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
