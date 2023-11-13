FROM node

WORKDIR /usr/app/
COPY build ./build
RUN npm i serve -g
EXPOSE 3001
CMD [ "npm", "run", "dev" ]


