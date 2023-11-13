FROM node

WORKDIR /usr/app/
COPY Mural/package.json .
RUN npm i
COPY Mural/tsconfig.json .
COPY Mural/.env .
COPY Mural/src/ /usr/app/src


EXPOSE 3000

CMD [ "npm", "run", "dev" ]
