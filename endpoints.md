# Documentación Rutas Cripto - Monedas 

#### - Registro de usuarios /auth/signup
* firstName: Requerido del tipo string.
* lastName: Requerido del tipo string.
* password: Requerido del tipo string. Además tiene que ser alfanúmerico con un mínimo de 8 caracteres. Se guarda encriptado en el campo.
* email: Requerido del tipo email. Se valida que sea email(formato) y sea único.

* Un administrador debe activar las cuentas o puede bloquear alguna cuenta de usuario

El sistema tiene 3 roles(Admin, Inactivo, Users), aunque pueden crearse mas roles.

Ningún usuario es creado si alguno de estos datos, son nulos.

Se podrían incluir otros datos de ser necesarios para nuevas implementaciones.

#### - Login de usuarios /auth/signin
Recibimos username(email) y password.
Verificamos que el usuario exista, y que el password sea de ese usuario. Si da errores devuelve mensajes de error.
Al pasar la validación se genera el token y se envia un JSON con data del usuario necesarios para utilizar la api.
* id
* username
* user_type
* accessToken(El token tiene una validez de 1hr).

## - Listados - Noticias

#### - Listado de noticias sobre Covid dada una fecha /news/bydate
Recibimos la fecha para buscar noticias relacionadas para esa fecha.
Si no contamos con noticias en nuestra DB local, buscamos en la API de noticias, insertamos las noticias en nuestra BD.
Retornamos el listado de todas las noticias encontradas en esa fecha.

#### - Buscar noticias /news/search
Recibimos los parametros de busqueda para las noticias.
Esto nos permitira hacer busquedas, por titulo, descripcion, una fecha dada, y medios de comunicación. También permite ser ordenada por fecha asc y desc, además de paginar los resultados-
Retornamos las noticias según parametros.

## - Administrador

#### - Activar usuarios /admin/user/activate
Recibimos el id del usuario a ser activado.
- idUser En este parametro nos llega el id del usuario
Verificamos mediante middleware que el usuario logueado sea Admin del sistema.
Acá retornamos mensaje de Activado o de error según corresponda.

#### - Bloquear usuarios /admin/user/block
Requerimos el id del usuario a ser bloqueado.
- idUser En este parametro nos llega el id del usuario
Verificamos mediante middleware que el usuario logueado sea Admin del sistema.
Acá retornamos mensaje de Bloqueado o de error según corresponda.

## - Middleware

Se utilzan para verificar en el registro que no haya un usuario con el mismo email.
Verificar que el usuario tenga un token valido para operar dentro de la aplicación.
Validar que la cuenta este activada.
Validar los usuarios que son Administradores de la aplicación.


## - Servicios

#### - Mantenimiento DB Actualizada
Cada 8 minutos se corre un servicio que nos permite guardar las noticias de la API en nuestra DB local.
Los campos son:
id de la noticia.
Nombre del provider.
Scope del provider.
Categoria
titulo.
descripcion.
url de la noticia.
url de la imagen de la noticia.
fecha de publicación.

#### - Limpieza DB
Todos los días a las 01:00 AM(timezone Buenos Aires) se corre un servicio que nos permite limpiar las noticias que tengan mas de 5 dias.



### - Todas las siguientes rutas necesitan el token para poder acceder. De lo contrario les manda un mensaje de error. 