# Back end được xây dựng dựa trên NodeJS + ExpressJS:

-   NodeJS là framework hỗ trợ lập trình, đặc biệt là mảng web
-   ExpressJS là thư viện giúp tạo ra 1 server để client gửi yêu cầu đến

Trang tham khảo ExpressJS: https://expressjs.com/

# Về cấu trúc thư mục back-end như sau:

-   node_modules: Đây là thư mục của nodeJS chứa các thư viện liên quan (Này ko cần quan tâm)
-   src: Thư mục chứa mã nguồn chính của back-end
    -   app: thư mục chứa thao tác với cơ sở dữ liệu
        -   controllers: chứa các hàm / class xử lý các yêu cầu: Ví dụ client gửi request lấy thông tin thì controller sẽ chứa hàm lấy thông tin từ db rồi trả về
        -   model: Chứa các lượt đồ cơ sở dữ liệu để thao tác trực tiếp với db: controllers sẽ dùng model để lấy dữ liệu
            Mô hình như sau: request -> controller -> model -> db
    -   db: Thư mục chứa file liên kết db
    -   index.js: File entry point ( đầu vào của chương trình) dùng để chạy server
-   .gitignore: file chứa thông tin các file or folder ko cần đẩy lên git

# Cú pháp

-   Start server: mở cmd -> nhập npm start
-   Ctrl + C để dừng

# Một số thư viện hỗ trợ nếu back end thấy hợp lý thì dùng:

-   nodemon: Dùng để debug và tự reset lại server khi chương trình có thay đổi:
    -   Tham khảo: https://www.npmjs.com/package/nodemon
-   morgan: Dùng để hiện log thông báo khi có client gọi API
    -   Tham khảo: https://www.npmjs.com/package/morgan

# format code cho đẹp

-   mọi người tại extension prettier về format lại code cho đẹp
