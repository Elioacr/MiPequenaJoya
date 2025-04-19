# 🧵 Mi Pequeña Joya - Guía de Instalación

Este proyecto está dividido en tres partes principales: *Base de Datos, **Backend (Java)* y *Frontend (Node.js)*. A continuación, se detallan los pasos necesarios para su correcta instalación y ejecución.

---

## 📦 Base de Datos (MySQL)

### 1. Instalación de MySQL

Descarga e instala MySQL desde el sitio oficial:

👉 [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

Durante la instalación, configura un usuario (root) y una contraseña segura.

### 2. Creación de la Base de Datos

Una vez instalado MySQL, puedes crear la base de datos ejecutando el siguiente comando en tu cliente de MySQL (como MySQL Workbench o consola):

sql
CREATE DATABASE bd_mi_pequena_joya;


---

## 🔧 Backend (Java + Maven)

### 1. Instalación de Java 17

Descarga Java 17 desde:

👉 [https://adoptium.net/es/temurin/releases/](https://adoptium.net/es/temurin/releases/)

Verifica la instalación con:

bash
java -version


### 2. Instalación de Apache Maven

Descarga e instala Maven desde:

👉 [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

Verifica la instalación con:

bash
mvn -version


### 3. Ejecución del proyecto backend

Ubica la terminal en el directorio del backend:

bash
cd \MiPequenaJoyaElio\MiPequenaJoyaBackend


Compila y ejecuta el proyecto con:

bash
mvn spring-boot:run


---

## 💻 Frontend (Node.js)

### 1. Instalación de Node.js (v22.11.0 o superior)

Descarga Node.js desde:

👉 [https://nodejs.org/en](https://nodejs.org/en)

Verifica la versión instalada:

bash
node -v


### 2. Instalación de NPM (v11.0.0 o superior)

NPM se instala junto con Node.js. Verifica su versión con:

bash
npm -v


### 3. Instalación de dependencias

Ubica la terminal en la carpeta del frontend y ejecuta:

bash
npm install


### 4. Ejecutar el proyecto

bash
npm run dev