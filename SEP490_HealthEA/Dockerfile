# Sử dụng hình ảnh Node.js phiên bản 20
FROM node:20-alpine AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package.json ./

# Cài đặt các phụ thuộc
RUN npm install --force

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng bằng Vite
RUN npm run build

# Bắt đầu một giai đoạn mới để phục vụ ứng dụng
FROM node:20-alpine AS production 
RUN apk update && apk add xsel
# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp đã xây dựng từ giai đoạn trước
COPY --from=build /app/dist ./dist

# Cài đặt serve để phục vụ các tệp đã xây dựng
RUN npm install -g -n serve

# Mở cổng 5173
EXPOSE 5173

# Khởi động ứng dụng
CMD ["serve", "-n", "-s", "dist", "-l", "5173", "--no-clipboard"]