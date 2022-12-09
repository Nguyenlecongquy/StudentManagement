-- Database: QLHS

-- DROP DATABASE IF EXISTS "QLHS";

-- CREATE DATABASE "QLHS"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;


-----------------------------------------------------------------

-- Table: public.giao_vien

-- DROP TABLE IF EXISTS public.giao_vien;

CREATE TABLE IF NOT EXISTS public.giao_vien
(
    ma_gv character(10) COLLATE pg_catalog."default" NOT NULL,
    ten_gv character varying(50) COLLATE pg_catalog."default",
    ngay_sinh_gv date,
    chuc_danh_gv character varying(50) COLLATE pg_catalog."default",
    ma_khoa character(10) COLLATE pg_catalog."default",
    CONSTRAINT giao_vien_pkey PRIMARY KEY (ma_gv)
);

DROP TABLE USER_GIAOVIEN
create table IF NOT EXISTS USER_GIAOVIEN(
	MAGV CHAR(10),
	USERNAME VARCHAR(50),
	EMAIL VARCHAR(50),
	PASSWORD VARCHAR(255),
	CONSTRAINT PK_USER_GV PRIMARY KEY (USERNAME)
);
ALTER TABLE USER_GIAOVIEN ADD CONSTRAINT FK_USR_GV FOREIGN KEY (MAGV) REFERENCES GIAO_VIEN(MA_GV);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.giao_vien
    OWNER to postgres;

------------------------------------------------------------
-- Table: public.hoc_sinh

-- DROP TABLE IF EXISTS public.hoc_sinh;

CREATE TABLE IF NOT EXISTS public.hoc_sinh
(
    ma_hs character(10) COLLATE pg_catalog."default" NOT NULL,
    ten_hs character varying(50) COLLATE pg_catalog."default",
    ma_lop character(10) COLLATE pg_catalog."default",
    ngay_sinh_hs date,
    gioi_tinh_hs character varying(3) COLLATE pg_catalog."default",
    dia_chi_hs character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT hoc_sinh_pkey PRIMARY KEY (ma_hs)
)
DROP TABLE USER_HOCSINH;
create table IF NOT EXISTS USER_HOCSINH(
	MAHS CHAR(10),
	USERNAME VARCHAR(50),
	EMAIL VARCHAR(50),
	PASSWORD VARCHAR(255),
	CONSTRAINT PK_USER_HS PRIMARY KEY (USERNAME)
);
ALTER TABLE USER_HOCSINH ADD CONSTRAINT FK_USR_HS FOREIGN KEY (MAHS) REFERENCES HOC_SINH(MA_HS);



TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.hoc_sinh
    OWNER to postgres;
------------------------------------------------------------
-- Table: public.khoa

-- DROP TABLE IF EXISTS public.khoa;

CREATE TABLE IF NOT EXISTS public.khoa
(
    ma_khoa character(10) COLLATE pg_catalog."default" NOT NULL,
    ten_khoa character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT khoa_pkey PRIMARY KEY (ma_khoa)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.khoa
    OWNER to postgres;

-------------------------------------------------------------
-- Table: public.diem

-- DROP TABLE IF EXISTS public.diem;

CREATE TABLE IF NOT EXISTS public.diem
(
    ma_hs character(10) COLLATE pg_catalog."default" NOT NULL,
    ma_mh character(10) COLLATE pg_catalog."default" NOT NULL,
    diem_15 real,
    diem_1t real,
    diem_gk real,
    diem_ck real,
    diem_tk real,
    CONSTRAINT diem_pkey PRIMARY KEY (ma_hs, ma_mh)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.diem
    OWNER to postgres;
	
--------------------------------------------------------------
-- Table: public.giang_day

-- DROP TABLE IF EXISTS public.giang_day;

CREATE TABLE IF NOT EXISTS public.giang_day
(
    ma_gv character(10) COLLATE pg_catalog."default" NOT NULL,
    ma_mh character(10) COLLATE pg_catalog."default" NOT NULL,
    ma_lop character(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT giang_day_pkey PRIMARY KEY (ma_gv, ma_mh, ma_lop)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.giang_day
    OWNER to postgres;
---------------------------------------------------------------
-- Table: public.lop

-- DROP TABLE IF EXISTS public.lop;

CREATE TABLE IF NOT EXISTS public.lop
(
    ma_lop character(10) COLLATE pg_catalog."default" NOT NULL,
    ten_lop character varying(10) COLLATE pg_catalog."default",
    si_so_lop integer,
    ma_khoa character(10) COLLATE pg_catalog."default",
    CONSTRAINT lop_pkey PRIMARY KEY (ma_lop)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lop
    OWNER to postgres;
--------------------------------------------------------------
-- Table: public.mon_hoc

-- DROP TABLE IF EXISTS public.mon_hoc;

CREATE TABLE IF NOT EXISTS public.mon_hoc
(
    ma_mh character(10) COLLATE pg_catalog."default" NOT NULL,
    ten_mh character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT mon_hoc_pkey PRIMARY KEY (ma_mh)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.mon_hoc
    OWNER to postgres;

-------------------------------------------------------------
-- Constraint: giao_vien_khoa_fkey

-- ALTER TABLE IF EXISTS public.giao_vien DROP CONSTRAINT IF EXISTS giao_vien_khoa_fkey;

ALTER TABLE IF EXISTS public.giao_vien
    ADD CONSTRAINT giao_vien_khoa_fkey FOREIGN KEY (ma_khoa)
    REFERENCES public.khoa (ma_khoa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


-- Constraint: diem_hoc_sinh_fkey

-- ALTER TABLE IF EXISTS public.diem DROP CONSTRAINT IF EXISTS diem_hoc_sinh_fkey;

ALTER TABLE IF EXISTS public.diem
    ADD CONSTRAINT diem_hoc_sinh_fkey FOREIGN KEY (ma_hs)
    REFERENCES public.hoc_sinh (ma_hs) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

-- Constraint: diem_mon_hoc_fkey

-- ALTER TABLE IF EXISTS public.diem DROP CONSTRAINT IF EXISTS diem_mon_hoc_fkey;

ALTER TABLE IF EXISTS public.diem
    ADD CONSTRAINT diem_mon_hoc_fkey FOREIGN KEY (ma_mh)
    REFERENCES public.mon_hoc (ma_mh) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
-- Constraint: giang_day_giao_vien_fkey

-- ALTER TABLE IF EXISTS public.giang_day DROP CONSTRAINT IF EXISTS giang_day_giao_vien_fkey;

ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_giao_vien_fkey FOREIGN KEY (ma_gv)
    REFERENCES public.giao_vien (ma_gv) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
-- Constraint: giang_day_lop_fkey

-- ALTER TABLE IF EXISTS public.giang_day DROP CONSTRAINT IF EXISTS giang_day_lop_fkey;

ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_lop_fkey FOREIGN KEY (ma_lop)
    REFERENCES public.lop (ma_lop) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

-- Constraint: giang_day_mon_hoc_fkey

-- ALTER TABLE IF EXISTS public.giang_day DROP CONSTRAINT IF EXISTS giang_day_mon_hoc_fkey;

ALTER TABLE IF EXISTS public.giang_day
    ADD CONSTRAINT giang_day_mon_hoc_fkey FOREIGN KEY (ma_mh)
    REFERENCES public.mon_hoc (ma_mh) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

-- Constraint: hoc_sinh_lop_fkey

-- ALTER TABLE IF EXISTS public.hoc_sinh DROP CONSTRAINT IF EXISTS hoc_sinh_lop_fkey;

ALTER TABLE IF EXISTS public.hoc_sinh
    ADD CONSTRAINT hoc_sinh_lop_fkey FOREIGN KEY (ma_lop)
    REFERENCES public.lop (ma_lop) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

-- Constraint: lop_khoa_fkey

-- ALTER TABLE IF EXISTS public.lop DROP CONSTRAINT IF EXISTS lop_khoa_fkey;

ALTER TABLE IF EXISTS public.lop
    ADD CONSTRAINT lop_khoa_fkey FOREIGN KEY (ma_khoa)
    REFERENCES public.khoa (ma_khoa) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
	
	
-- VALUES KHOA
INSERT INTO KHOA(MA_KHOA,TEN_KHOA) VALUES('KHXH','KHOA HOC XA HOI'),
('KHTN','KHOA HOC TU NHIEN')

-- Values GIAO_VIEN
INSERT INTO GIAO_VIEN(MA_GV,TEN_GV) VALUES('ADMIN','ADMIN');
INSERT INTO GIAO_VIEN(MA_GV,TEN_GV,MA_KHOA) VALUES('ADMIN','ADMIN',)
('GV001','NGUYEN VAN BINH','KHXH'),
('GV002','TRAN VAN MINH','KHTN'),('GV003','TRAN THI TU SUONG','KHXH'),
('GV004','NGUYEN THI TUYET MAI','KHTN'),('GV005','TRAN MINH TOAN','KHXH');

INSERT INTO USER_GIAOVIEN(MAGV,USERNAME,EMAIL) VALUES
('ADMIN','ADMIN','ADMIN');

