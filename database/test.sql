select * from giao_vien;
select * from hoc_sinh;
select * from qui_dinh;
delete from giao_vien where ten_gv ='Nguyen Van M';

select * from khoa;
select * from khoa where ma_khoa = 'KHTN' and true;
delete from khoa where ma_khoa = 'CNTT';


select * from user_giaovien;
select * from user_hocsinh;
delete from user_giaovien;


select * from lop;
delete from lop;
delete from lop;
insert into lop(ma_lop,si_so_lop,khoi,ma_khoa) 
values('10A1',40,10,'KHTN'),('10A2',41,10,'KHXH'),
('11A1',40,11,'KHTN'),('12A2',41,12,'KHXH');


-- 
select * from qui_dinh;
select khoi,count(ma_lop) SL
from lop where khoi =11
group by khoi;


update hoc_sinh 
set  ma_lop=null
where ma_lop='10A1';

select ma_gv,ten_gv,email,password
from user_giaovien join giao_vien on ma_gv=magv
where email ='tri@gmail.com'