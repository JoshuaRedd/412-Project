FROM node:latest

WORKDIR /app

EXPOSE 8000

# COPY package.json package-lock.json server.js /app/
# COPY public/* /app/public/

RUN npm init -y
RUN npm install express body-parser mysql nodemon

CMD echo "Hello world!" 

# CMD ["npx", "nodemon", "server.js"]
# CMD ["/bin/bash"]