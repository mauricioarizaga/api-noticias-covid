# Api de Noticias sobre COVID

Es una api que permite crear y registrar un usuario. Ver noticias sobre covid, también es posible utilizar filtros para reallizar diferentes tipos de busquedas.
Un administrador activa las cuentas.
Posee dos servicios uno cada 8 minutos, trae las noticias de la api y las guarda en la base de datos si no existen. Y otro que limpieza la base de datos borrando las noticias que sea hayan publicado hace mas de 5 días.

## Clonar el repo :floppy_disk:

Clonar el repositorio en la ubicación que elijas.

```bash
git clone https://github.com/mauricioarizaga/api-noticias-covid.git
```

## Instalación :computer:

En el directorio api, debes ejecutar

```bash
npm install
```

## Ejecución :boat:

Crear la db en postgres. Pueden usar PgAdmin o dbeaver.
Configuran app/config/db.config.js

En el directorio api, debes ejecutar

```bash
npm start
```

Por defecto, el Backend corre en http://localhost:3001
<br><br>
La documentación de los endpoints esta en el archivo [Endpoints](endpoints.md)

# Hecho con mucho :heart:  

* [PostgreSQL](https://www.postgresql.org/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [Sequelize](https://sequelize.org/)
* Todo lo necesario esta en package.json
<br><br>


* [Mauricio Ariel Arizaga Fabregas](https://www.linkedin.com/in/mauricioarielarizaga/)
