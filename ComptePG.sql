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
	authlevel INT,
	id_role INT,
	FOREIGN KEY (id_role) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS ressource(

   id SERIAL PRIMARY KEY,
   titre VARCHAR(250),
   theme VARCHAR(250),
   lien VARCHAR(250) NULL,
   date_envoie date,
   type_ressource VARCHAR(250),
   id_compte INT,
   description TEXT NOT NULL,
   private INT NOT NULL,
   FOREIGN KEY (id_compte) REFERENCES compte(id)
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
   id_ressource INT  ,
   id_categorie INT  ,
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

INSERT INTO compte (email, motDePasse, nom, prenom, adresse, ville, code_postal, date_de_naissance, langue, profile_picture, pseudo, authlevel, id_role) 
VALUES 
('http://www.yopmail.com/?edgard-qopawik','zbeb9a6a','Quentin','Edgard','45 Rue de la Durantire','Lille',5900,'09/06/1972','france','qopawik.pic','qopawik',4,1),
('http://www.yopmail.com/?hugues-diqupa','7svv7kwp','Moreau','Hugues','5 Allée des Moignies','Saint-Geoire-en-Valdaine ',38620,'08/12/1983','france','diqupa.pic','diqupa',3,2),
('http://www.yopmail.com/?lucien-zidokad','af428viu','Chauveau','Lucien','44 Route du Sixte','Coulanges-sur-Yonne',89480,'10/02/1981','france','zidokad.pic','zidokad',2,3),
('http://www.yopmail.com/?caroline-pexur','755ye6mv','Aubry','Caroline','30 Rue de la Bruyére','Claudon',88410,'02/11/1992','france','pexur.pic','pexur',1,4);

INSERT INTO categorie (labelle) VALUES
('photo'),
('video'),
('article'),
('publication');

INSERT INTO ressource (titre, theme, lien, date_envoie, type_ressource, id_compte, description, private) VALUES
('This is a test', '', 'http://res.cloudinary.com/dp0owoyww/raw/upload/v1613471830/REssources_relationnelles/33e3ddaa708619e4c3c2a33dcb5d6f36.gif', '16/02/2021', '', 1, 'gjroijgir\r\ngjrjgirejg\r\njgrjgioer', 0),
('This is a test', '', 'http://res.cloudinary.com/dp0owoyww/raw/upload/v1613470892/REssources_relationnelles/296c784ea885c846beaa0a66fd646448.jpg', '16/02/2021', 'Photo', 1, 'grgdr', 0),
('This is a test', 'Thème 2', 'http://res.cloudinary.com/dp0owoyww/raw/upload/v1613471304/REssources_relationnelles/779020503963664424.png', '16/02/2021', 'Photo', 1, 'fezfzefze', 1);