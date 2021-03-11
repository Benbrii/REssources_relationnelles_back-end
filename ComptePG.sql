CREATE TABLE IF NOT EXISTS roles (
	id SERIAL PRIMARY KEY,
	labelle VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS compte (
	id SERIAL PRIMARY KEY,
	email VARCHAR(250),
	motDePasse VARCHAR(250),
	nom VARCHAR(250),
	prenom VARCHAR(250)  ,
	adresse VARCHAR(250),
	ville VARCHAR(250),
	code_postal INT,
	date_de_naissance VARCHAR(250),
	langue VARCHAR(250),
	profile_picture VARCHAR(250),
	pseudo VARCHAR(250),
	id_role INT,
	active BOOLEAN,
	FOREIGN KEY (id_role) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS type_ressource(

   id SERIAL PRIMARY KEY,
   labelle VARCHAR(250)
   
);

CREATE TABLE IF NOT EXISTS ressource(

   id SERIAL PRIMARY KEY,
   titre VARCHAR(250),
   lien VARCHAR(250) NULL,
   date_envoie date,
   id_type INT,
   id_compte INT,
   description TEXT NOT NULL,
   private INT NOT NULL,
   FOREIGN KEY (id_compte) REFERENCES compte(id),
   FOREIGN KEY (id_type) REFERENCES type_ressource(id)
);

CREATE TABLE IF NOT EXISTS consult(

   id SERIAL PRIMARY KEY,
   id_compte INT,
   id_ressource INT,
   date_consult DATE,
   FOREIGN KEY (id_compte) REFERENCES compte(id),
   FOREIGN KEY (id_ressource) REFERENCES ressource(id)
);

CREATE TABLE IF NOT EXISTS commentaire(

   id SERIAL PRIMARY KEY,
   message TEXT,
   id_compte INT,
   id_ressource INT,
   FOREIGN KEY (id_compte) REFERENCES compte(id),
   FOREIGN KEY (id_ressource) REFERENCES ressource(id)
);


CREATE TABLE IF NOT EXISTS categorie(

   id SERIAL PRIMARY KEY,
   labelle VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS ressource_categorie(

   id SERIAL PRIMARY KEY,
   id_ressource INT,
   id_categorie INT,
   FOREIGN KEY (id_ressource) REFERENCES ressource (id),
   FOREIGN KEY (id_categorie) REFERENCES categorie (id)
   
);

CREATE TABLE IF NOT EXISTS piece_jointe(

   id SERIAL  PRIMARY KEY,
   labelle VARCHAR(250)  ,
   url VARCHAR(250)  ,
   type_piece VARCHAR(250)
   
);

CREATE TABLE IF NOT EXISTS ressource_pieceJointe(

   id SERIAL PRIMARY KEY,
   id_ressource INT  ,
   id_pieceJointe INT  ,
   FOREIGN KEY (id_ressource) REFERENCES ressource (id),
   FOREIGN KEY (id_pieceJointe) REFERENCES piece_jointe (id)
   
);

CREATE TABLE IF NOT EXISTS favoris(
   id SERIAL PRIMARY KEY,
   id_compte INT,
   id_ressource INT,
   FOREIGN KEY (id_compte) REFERENCES compte(id),
   FOREIGN KEY (id_ressource) REFERENCES ressource(id)
);

INSERT INTO roles (labelle)
VALUES
('User'),
('Moderator'),
('Admin'),
('Super admin');

INSERT INTO categorie (labelle)
VALUES
('categorie 1'),
('categorie 2'),
('categorie 3'),
('categorie 4');

INSERT INTO type_ressource (labelle) VALUES
('photo'),
('video'),
('article'),
('publication');

