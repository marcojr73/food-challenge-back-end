FROM node

# escolher uma pasta para colocar a minha aplicação -> CD
WORKDIR /usr/src/

# copiar o projeto da máquina host para dentro da imagem
COPY . /usr/src/

# expor a porta de comunicação
EXPOSE 5000

# rodar o comando que baixa as deps
RUN npm i

# só quando eu estiver rodando isso como container
CMD ["npm", "start"]