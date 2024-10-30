# Gunakan image Node.js resmi sebagai base image
FROM node:20.12.2

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build nest
RUN npx nest build

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Mengompilasi TypeScript
RUN npm run build

# Jalankan aplikasi
CMD ["node", "dist/main.js"]