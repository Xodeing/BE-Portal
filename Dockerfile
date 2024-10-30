# Gunakan image Node.js resmi sebagai base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Mengompilasi TypeScript
RUN npm run build

# Jalankan aplikasi
CMD ["node", "dist/main.js"]