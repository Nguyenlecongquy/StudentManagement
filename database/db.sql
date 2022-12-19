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
    diem_15 real,
    diem_1t real,
    diem_gk real,
    diem_ck real,
    diem_tk real,
    CONSTRAINT diem_pkey PRIMARY KEY (ma_hs, ma_mh)
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
    si_so_lop integer,
	khoi varchar(10),
    ma_khoa character(10),
    CONSTRAINT lop_pkey PRIMARY KEY (ma_lop)
);

--------------------------------------------------------------
-- Table: public.mon_hoc

CREATE TABLE IF NOT EXISTS public.mon_hoc
(
    ma_mh character(10)  NOT NULL,
    ten_mh character varying(50),
    CONSTRAINT mon_hoc_pkey PRIMARY KEY (ma_mh)
);


-------------------------------------------------------------
-- Constraint: giao_vien_khoa_fkey

ALTER TABLE IF EXISTS public.giao_vien
    ADD CONSTRAINT giao_vien_khoa_fkey FOREIGN KEY (ma_khoa)
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

-- Values HOC_SINH
INSERT INTO HOC_SINH(MA_HS,TEN_HS) VALUES
('HS20120563','NGUYEN LE CONG QUY'),
('HS20120603','TRAN MINH TRI'),
('HS20120555','NGUYEN XUAN QUAN'),
('HS20120627','HOANG VINH');

insert into lop(ma_lop,khoi,si_so_lop,ma_khoa)
values('10A1','10',40,'KHTN'),('10A2','10',45,'KHXH'),
('11A1','11',41,'KHTN'),('11A2','11',42,'KHXH');

