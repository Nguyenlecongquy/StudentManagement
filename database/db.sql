-- Database: QLHS

-- DROP DATABASE IF EXISTS "QLHS";
-- CREATE DATABASE "QLHS"

-----------------------------------------------------------------
-- Thứ tự Drop Drop các bảng
drop table if exists giang_day;
drop table if exists diem;
drop table if exists mon_hoc;
drop table if exists user_giaovien;
drop table if exists user_hocsinh;
drop table if exists giao_vien;
drop table if exists hoc_sinh;
drop table if exists lop;
drop table if exists khoa;
drop table if exists qui_dinh;

-----------------------------------------------------------------

-- Table: public.giao_vien

-- DROP TABLE IF EXISTS public.giao_vien;

CREATE TABLE IF NOT EXISTS giao_vien
(
    ma_gv character(10) NOT NULL,
    ten_gv character varying(50),
    ngay_sinh_gv date,
    chuc_danh_gv character varying(50),
    ma_khoa character(10),
    CONSTRAINT giao_vien_pkey PRIMARY KEY (ma_gv)
);

-- DROP TABLE USER_GIAOVIEN
create table IF NOT EXISTS USER_GIAOVIEN(
	MAGV CHAR(10),
	USERNAME VARCHAR(50),
	EMAIL VARCHAR(50),
	PASSWORD VARCHAR(255),
	CONSTRAINT PK_USER_GV PRIMARY KEY (USERNAME)
);
ALTER TABLE USER_GIAOVIEN ADD CONSTRAINT FK_USR_GV FOREIGN KEY (MAGV) REFERENCES GIAO_VIEN(MA_GV);

------------------------------------------------------------
-- Table: public.hoc_sinh

CREATE TABLE IF NOT EXISTS hoc_sinh
(
    ma_hs character(10)  NOT NULL,
    ten_hs character varying(50),
    ma_lop character(10) ,
    ngay_sinh_hs date,
    gioi_tinh_hs character varying(3),
    dia_chi_hs character varying(100),
    CONSTRAINT hoc_sinh_pkey PRIMARY KEY (ma_hs)
);

CREATE TABLE IF NOT EXISTS USER_HOCSINH(
	MAHS CHAR(10),
	USERNAME VARCHAR(50),
	EMAIL VARCHAR(50),
	PASSWORD VARCHAR(255),
	CONSTRAINT PK_USER_HS PRIMARY KEY (USERNAME)
);
ALTER TABLE USER_HOCSINH ADD CONSTRAINT FK_USR_HS FOREIGN KEY (MAHS) REFERENCES HOC_SINH(MA_HS);



------------------------------------------------------------
-- Table: public.khoa

-- DROP TABLE IF EXISTS public.khoa;

CREATE TABLE IF NOT EXISTS public.khoa
(
    ma_khoa character(10) NOT NULL,
    ten_tat char(10),
    ten_khoa character varying(50) ,
    CONSTRAINT khoa_pkey PRIMARY KEY (ma_khoa)
);


-------------------------------------------------------------
-- Table: public.diem

CREATE TABLE IF NOT EXISTS public.diem
(
    ma_hs character(10) NOT NULL,
    ma_mh character(10) NOT NULL,
    hoc_ki text NOT NULL,
    diem_15 real,
    diem_1t real,
    diem_gk real,
    diem_ck real,
    diem_tk real,
    CONSTRAINT diem_pkey PRIMARY KEY (ma_hs, ma_mh, hoc_ki)
);


--------------------------------------------------------------
-- Table: public.giang_day

CREATE TABLE IF NOT EXISTS giang_day
(
    ma_gv character(10)  NOT NULL,
    ma_mh character(10)  NOT NULL,
    ma_lop character(10) NOT NULL,
    CONSTRAINT giang_day_pkey PRIMARY KEY (ma_gv, ma_mh, ma_lop)
);

---------------------------------------------------------------
-- Table: public.lop

CREATE TABLE IF NOT EXISTS public.lop
(
    ma_lop character(10)  NOT NULL,
    ten_lop text,
    si_so_lop integer,
	khoi int,
    ma_khoa character(10),
    CONSTRAINT lop_pkey PRIMARY KEY (ma_lop)
);

--------------------------------------------------------------
-- Table: public.mon_hoc

CREATE TABLE IF NOT EXISTS public.mon_hoc
(
    ma_mh character(10)  NOT NULL,
    ten_mh character varying(50),
    ma_khoa character(10),
    CONSTRAINT mon_hoc_pkey PRIMARY KEY (ma_mh)
);

--Table qui_dinh
CREATE TABLE IF NOT EXISTS QUI_DINH(
	id int  not null,
	tuoi_toi_da int,
	tuoi_toi_thieu int,
	si_so_toi_da int,
	diem_chuan_dat_mon float,
	so_luong_mon_hoc int,
	so_luong_lop_10 int,
	so_luong_lop_11 int,
	so_luong_lop_12 int,
	CONSTRAINT quidinh_pkey PRIMARY KEY (id)
	
);
insert into qui_dinh(id,tuoi_toi_da,tuoi_toi_thieu,si_so_toi_da,
diem_chuan_dat_mon,so_luong_mon_hoc,so_luong_lop_10,so_luong_lop_11,
					so_luong_lop_12)
values(1,20,15,40,5.0,9,4,3,2);

-------------------------------------------------------------
-- Constraint: giao_vien_khoa_fkey

ALTER TABLE IF EXISTS public.giao_vien
    ADD CONSTRAINT giao_vien_khoa_fkey FOREIGN KEY (ma_khoa)
    REFERENCES public.khoa (ma_khoa) ;

-- Constraint: mon_hoc_khoa_fkey

ALTER TABLE IF EXISTS public.mon_hoc
    ADD CONSTRAINT mon_hoc_khoa_fkey FOREIGN KEY (ma_khoa)
    REFERENCES public.khoa (ma_khoa) ;

-- Constraint: diem_hoc_sinh_fkey

ALTER TABLE IF EXISTS public.diem
    ADD CONSTRAINT diem_hoc_sinh_fkey FOREIGN KEY (ma_hs)
    REFERENCES public.hoc_sinh (ma_hs);

-- Constraint: diem_mon_hoc_fkey
ALTER TABLE IF EXISTS public.diem
    ADD CONSTRAINT diem_mon_hoc_fkey FOREIGN KEY (ma_mh)
    REFERENCES public.mon_hoc (ma_mh);
	
-- Constraint: giang_day_giao_vien_fkey
ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_giao_vien_fkey FOREIGN KEY (ma_gv)
    REFERENCES public.giao_vien (ma_gv);
	
-- Constraint: giang_day_lop_fkey
ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_lop_fkey FOREIGN KEY (ma_lop)
    REFERENCES public.lop (ma_lop);

-- Constraint: giang_day_mon_hoc_fkey
ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_mon_hoc_fkey FOREIGN KEY (ma_mh)
    REFERENCES public.mon_hoc (ma_mh);

-- Constraint: hoc_sinh_lop_fkey
ALTER TABLE IF EXISTS public.hoc_sinh
    ADD CONSTRAINT hoc_sinh_lop_fkey FOREIGN KEY (ma_lop)
    REFERENCES public.lop (ma_lop);

-- Constraint: lop_khoa_fkey
ALTER TABLE IF EXISTS public.lop
    ADD CONSTRAINT lop_khoa_fkey FOREIGN KEY (ma_khoa)
    REFERENCES public.khoa (ma_khoa);
	
	
-- VALUES KHOA
INSERT INTO KHOA(MA_KHOA,TEN_KHOA) VALUES('KHXH','KHOA HOC XA HOI'),
('KHTN','KHOA HOC TU NHIEN');

-- Values GIAO_VIEN
INSERT INTO GIAO_VIEN(MA_GV,TEN_GV,MA_KHOA) VALUES
('GV00001110','NGUYEN VAN BINH','KHXH'),
('GV00001111','TRAN VAN MINH','KHTN'),
('GV00001112','TRAN THI TU SUONG','KHXH'),
('GV00001113','NGUYEN THI TUYET MAI','KHTN'),
('GV00001114','TRAN MINH TOAN','KHXH');

--value lop


insert into lop(ma_lop,si_so_lop,khoi,ma_khoa) 
values('10A1',4,10,'KHTN'),('10A2',4,10,'KHXH'),
('10A3',0,10,'KHTN'),('10A4',0,10,'KHXH'),
('11A1',0,11,'KHXH'),('11A2',0,11,'KHTN'),
('11A3',0,11,'KHXH'),('12A1',0,12,'KHXH'),
('12A2',0,11,'KHTN');
-- Values HOC_SINH
INSERT INTO HOC_SINH(MA_HS,TEN_HS,ma_lop) VALUES
('HS20120563','Nguyen Le Cong Quy','10A1'),
('HS20120603','Tran Minh Tri','10A1'),
('HS20120555','Nguyen Xuan Quan','10A2'),
('HS20120627','Hoang Vinh','10A2'),
('HS20120456','Nguyen B','10A1'),
('HS20120262','Le Van','10A1'),
('HS20120666','Hoang Ha','10A2'),
('HS20120156','Nguyen A','10A2');


--value mon

insert into mon_hoc(ma_mh,ten_mh,ma_khoa)
values('MH00001111','Toan','KHTN'),
('MH00001112','Ly','KHTN'),
('MH00001113','Hoa','KHTN'),
('MH00001114','Van','KHXH'),
('MH00001115','Su','KHXH'),
('MH00001116','Dia','KHXH'),
('MH00001117','Dao duc','KHXH'),
('MH00001118','The duc','KHTN'),
('MH00001119','Sinh','KHTN');

--value diem

insert into diem(ma_hs,ma_mh,hoc_ki,diem_15,diem_1t,diem_gk,diem_ck,diem_tk)
values('HS20120603','MH00001111', 'HK1',2,2,2,2,2),
('HS20120603','MH00001112', 'HK1',8,8,8,8,8),
('HS20120603','MH00001113', 'HK1',7,7,7,7,7),
('HS20120603','MH00001114', 'HK1',6,6,6,6,6),
('HS20120603','MH00001115', 'HK1',7,7,7,7,7),
('HS20120603','MH00001116', 'HK1',3,3,3,3,3),
('HS20120603','MH00001117', 'HK1',4,4,4,4,4),
('HS20120603','MH00001118', 'HK1',3,3,3,3,3),
('HS20120603','MH00001119', 'HK1',2,2,2,2,2),

('HS20120555','MH00001111', 'HK1',7,7,7,7,7),
('HS20120555','MH00001112', 'HK1',8,8,8,8,8),
('HS20120555','MH00001113', 'HK1',7,7,7,7,7),
('HS20120555','MH00001114', 'HK1',9,9,9,9,9),
('HS20120555','MH00001115', 'HK1',6,6,6,6,6),
('HS20120555','MH00001116', 'HK1',6,6,6,6,6),
('HS20120555','MH00001117', 'HK1',5,5,5,5,5),
('HS20120555','MH00001118', 'HK1',4,4,4,4,4),
('HS20120555','MH00001119', 'HK1',4,4,4,4,4),

('HS20120627','MH00001111', 'HK1',4,4,4,4,4),
('HS20120627','MH00001112', 'HK1',5,5,5,5,5),
('HS20120627','MH00001113', 'HK1',6,6,6,6,6),
('HS20120627','MH00001114', 'HK1',9,9,9,9,9),
('HS20120627','MH00001115', 'HK1',8,8,8,8,8),
('HS20120627','MH00001116', 'HK1',7,7,7,7,7),
('HS20120627','MH00001117', 'HK1',8,8,8,8,8),
('HS20120627','MH00001118', 'HK1',8,8,8,8,8),
('HS20120627','MH00001119', 'HK1',10,10,10,10,10),

('HS20120563','MH00001111', 'HK1',8,8,8,8,8),
('HS20120563','MH00001112', 'HK1',7,7,7,7,7),
('HS20120563','MH00001113', 'HK1',7,7,7,7,7),
('HS20120563','MH00001114', 'HK1',9,9,9,9,9),
('HS20120563','MH00001115', 'HK1',5,5,5,5,5),
('HS20120563','MH00001116', 'HK1',4,4,4,4,4),
('HS20120563','MH00001117', 'HK1',4,4,4,4,4),
('HS20120563','MH00001118', 'HK1',6,6,6,6,6),
('HS20120563','MH00001119', 'HK1',2,2,2,2,2),

('HS20120156','MH00001111', 'HK1',8,8,8,8,8),
('HS20120156','MH00001112', 'HK1',7,7,7,7,7),
('HS20120156','MH00001113', 'HK1',7,7,7,7,7),
('HS20120156','MH00001114', 'HK1',9,9,9,9,9),
('HS20120156','MH00001115', 'HK1',5,5,5,5,5),
('HS20120156','MH00001116', 'HK1',4,4,4,4,4),
('HS20120156','MH00001117', 'HK1',4,4,4,4,4),
('HS20120156','MH00001118', 'HK1',6,6,6,6,6),
('HS20120156','MH00001119', 'HK1',2,2,2,2,2),

('HS20120666','MH00001111', 'HK1',8,8,8,8,8),
('HS20120666','MH00001112', 'HK1',7,7,7,7,7),
('HS20120666','MH00001113', 'HK1',7,7,7,7,7),
('HS20120666','MH00001114', 'HK1',9,9,9,9,9),
('HS20120666','MH00001115', 'HK1',5,5,5,5,5),
('HS20120666','MH00001116', 'HK1',4,4,4,4,4),
('HS20120666','MH00001117', 'HK1',4,4,4,4,4),
('HS20120666','MH00001118', 'HK1',6,6,6,6,6),
('HS20120666','MH00001119', 'HK1',2,2,2,2,2),

('HS20120262','MH00001111', 'HK1',8,8,8,8,8),
('HS20120262','MH00001112', 'HK1',7,7,7,7,7),
('HS20120262','MH00001113', 'HK1',7,7,7,7,7),
('HS20120262','MH00001114', 'HK1',9,9,9,9,9),
('HS20120262','MH00001115', 'HK1',5,5,5,5,5),
('HS20120262','MH00001116', 'HK1',4,4,4,4,4),
('HS20120262','MH00001117', 'HK1',4,4,4,4,4),
('HS20120262','MH00001118', 'HK1',6,6,6,6,6),
('HS20120262','MH00001119', 'HK1',2,2,2,2,2),

('HS20120456','MH00001111', 'HK1',8,8,8,8,8),
('HS20120456','MH00001112', 'HK1',7,7,7,7,7),
('HS20120456','MH00001113', 'HK1',7,7,7,7,7),
('HS20120456','MH00001114', 'HK1',9,9,9,9,9),
('HS20120456','MH00001115', 'HK1',5,5,5,5,5),
('HS20120456','MH00001116', 'HK1',4,4,4,4,4),
('HS20120456','MH00001117', 'HK1',4,4,4,4,4),
('HS20120456','MH00001118', 'HK1',6,6,6,6,6),
('HS20120456','MH00001119', 'HK1',2,2,2,2,2);
