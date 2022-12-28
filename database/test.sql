select * from giao_vien;
select * from hoc_sinh;

delete from giao_vien where ten_gv ='Nguyen Van M';

select * from khoa;
select * from khoa where ma_khoa = 'KHTN' and true;
delete from khoa where ma_khoa = 'CNTT';




select * from user_giaovien;
delete from user_giaovien;

select * from lop;
delete from lop;
update lop 
set  si_so_lop=40, khoi=11 
where ma_lop='10A2' returning *;

delete from lop;
insert into lop(ma_lop,si_so_lop,khoi,ma_khoa) 
values('10A1',40,10,'KHTN'),('10A2',41,10,'KHXH'),
('11A1',40,11,'KHTN'),('12A2',41,12,'KHXH');