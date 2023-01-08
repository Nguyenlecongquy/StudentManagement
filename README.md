# StudentManagement
**I. Phần mềm quản lý học sinh**  là công cụ được xây dựng nhắm hỗ trợ các quy trình, công việc quản lý học sinh. Nhắm mang đến quản lý một cách hiệu quả cho giáo viên.

**Các tính năng của phần mềm gồm:**
1. Quản lý khoa
2. Quản lý lớp
3. Quản lý học sinh
4. Quản lý giáo viên
5. Quản lý môn học
6. Quản lý điểm môn, điểm tổng kết

**II. Tham khảo giữa backend và front-end:**
Vì project chứa cả 2 folder front-end, back-end vì thế 2 bên có thể dễ dàng truy cập lẫn nhau để đọc, tìm hiểu cách viết code và cách thức hoạt động.

**III.Công nghệ của dự án :**
- Front-end:
  - VueJS: phiên bản 3.2.45
  - Các thư viện liên quan đến front-end. (Thông tin chi tiết nằm trong file package.json của thư mục front-end)
- Back-end:
  - ExpressJS: phiên bản 4.18.2
  - Các thư viện liên quan đến back-end. (Thông tin chi tiết nằm trong file package.json của thư mục back-end)

- PostgreSQL: phiên bản 9.6.24*

**IV. Cấu hình để chạy local ứng dụng**

*Bước 1*: Clone source từ github https://github.com/Nguyenlecongquy/StudentManagement và checkout main để lấy source từ nhánh main

*Bước 2*: Vào trang chủ PostgreSQL để tải phần mềm PostgreSQL https://www.enterprisedb.com/downloads/postgres-postgresql-downloads và cấu hình như hướng dẫn của PostgreSQL

*Bước 3*: Mở PostGresSQL và sử dụng file db.sql trong thư mục database để tạo cơ sở dữ liệu.

    Khi tạo cơ sở dữ liệu đặt username = postgres và password= 123456

*Bước 4*: Mở Visual Studio Code và import mã nguồn của StudentManagement.

*Bước 5*: Tiến hành mở 2 terminal tại thư mục của StudentManagement
- Terminal 1: di chuyển vào thư mục front-end
  - Nhập npm i để cài đặt node_module
  - Sau đó, nhập npm run dev để chạy server web
- Terminal 2: Di chuyển vào thư mục back-end
  - Nhập npm i để cài đặt node_module
  - Sau đó, nhập npm start để chạy server

*Bước 6*: Mở trình duyệt và nhập URL: http://127.0.0.1:5173/ để truy cập website



**V. Các công việc đã hoàn thành**


***Hoàn thành***: 
- Đáp ứng các yêu cầu của dự án gồm: 
  - Tiếp nhận học sinh
  - Lập danh sách lớp
  - Tra cứu học sinh
  - Nhận bảng điểm môn
  - Lập báo cáo tổng kết
  - Thay đổi qui định

- Các chức năng đã hoàn thành: 
  - Đăng ký - Đăng nhập - Đăng xuất
  - Chỉnh sửa thông tin cá nhân
  - Thêm, xoá khoa
  - Thêm, xoá, sửa, tra cứu giáo viên
  - Thêm, xoá, sửa môn học
  - Sắp xếp tăng dần, giảm dần
  - Thêm ,xoá, sửa học sinh
  - Thêm, xoá, sửa, tra cứu lớp
  - Tìm kiếm học sinh
  - Xuất bảng điểm môn theo lớp
  - Xuất báo cáo tổng kết từng lớp
  - Thay đổi qui định về lớp, học sinh, môn

***Mong đợi***:
- Cải thiện giao diện người dùng đẹp hơn, thể hiện nhiều cách thức hiển thị dư liệu hơn như biểu đồ, ...
- Thêm các chức năng phân quyền Giáo viên và Học sinh
## Hướng dẫn sử dụng git
### Bước 1: Clone dự án
- Git init
- Git clone https://github.com/Nguyenlecongquy/StudentManagement.git
- Git checkout dev
### Bước 2: Tạo branch mới theo chức năng. 
- Git checkout -b <featute / tên branch>, ví dụ: git checkout -b feature/login-ui
- Kiểm tra các branch: git branch
- Nhảy sang branch khác: git checkout <tên branch>
### Bước 3: Add vào local, và push (push vào branch dev)
- git add .
- git commit -m "message"
- git push origin <tên branch đang code>, không phải branch dev hay main nhé. 
- Nếu nó không cho push, tức đã xảy ra xung đột file, thì git pull origin dev, xử lý conflict, rồi thực hiện push lại.
### Bước 4: Pull request
- Sau khi xong chức năng, thì thực hiện pull request, merge vào Branch dev.
- T6 hoặc T7 hàng tuần review code, Code ok thì approve pull request vào branch dev (không tự ý approve)
### Lưu ý: trước khi code thì nên Pull từ trên branch dev về (git pull origin dev), không pull thì lúc push xảy ra xung đột thì phải pull lại (Branch dev có review code trước rồi, nên không lo pull về bị xung đột)
