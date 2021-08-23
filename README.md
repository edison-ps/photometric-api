# Photometric API

## Contexto
API REST desenvolvida para armazenar os dados coletados pelo AQObject

## Tecnologia usada

Desenvolvimento:
> O projeto foi escrito em Node.js e utilizando o Express, JWT, Joi e o MariaDB. Este foi um experimento de desenvolvimento para um sistema operacional não corriqueiro que é o DSM 6.2 Synology DiskStation Manager que é uma versão do Linux que roda em processadores Intel Atom. O modelo utilizado é o DS1511+ com processador Dual Core de 1.8 Ghz, todos os pacotes foram instalados normalmente através do npm

> Até o presente momento foram implementadas as seguintes rotas.

* /users - Tabela de usuários (POST, GET e DELETE)
* /login - Tabela de usuários (POST)
* /comparations - Tabela de estrelas de comparação (POST, GET e DELETE)
* /filters - Tabela de filtros (POST, GET e DELETE)
* /objects - Tabela de objetos (POST, GET e DELETE)
* /observations - Tabela de observações (POST, GET e DELETE)
