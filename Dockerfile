FROM node:18.17.1
WORKDIR /app
ENV PORT 2000
ENV MODEL_URL 'https://storage.googleapis.com/model-bucket-daniel/model.json'
COPY . .
RUN npm install
EXPOSE 2000
CMD [ "npm", "run", "start" ]
