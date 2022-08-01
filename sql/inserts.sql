# Gender
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('ADVENTURE');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('COMEDY');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('ACTION');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('SCIENCE_FICTION');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('MUSICAL');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('FANTASY');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('HORROR');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('DRAMA');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('SUSPENSE');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('FAMILY');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('ANIME');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`genders` (`name`) VALUES ('DOCUMENTARY');

# User
INSERT INTO `heroku_0f0c398c8ab9cf8`.`users` (`password`, `name`, `email`, `isAdmin`) VALUES ('123456', 'Germán', 'waltongerman@gmail.com');


# Movies
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es', 'Avengers', '2012-03-26', '5', '4');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/54/Avengers_Age_Of_Ultron_Poster.png/revision/latest?cb=20191029195118&path-prefix=es', 'Avengers: Age of Ultron', '2015-03-23', '5', '4');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/bf/Iron_Man_1_Portada.png/revision/latest?cb=20191029194450&path-prefix=es', 'Iron Man', '2008-03-30', '5', '4');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://amc-theatres-res.cloudinary.com/v1608334213/amc-cdn/production/2/movies/300/337/Poster/p_800x1200_AMC_EdwardScissorhands_En_09252020.jpg', 'Edward Scissorhands', '1991-02-14', '5', '64');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://pics.filmaffinity.com/Frankenweenie-121243257-large.jpg', 'Frankenweenie', '2012-11-01', '3.9', '74');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`movies` (`image`, `title`, `creationDate`, `score`, `genderId`) VALUES ('https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/6555AA4740B5E88C27563CF0530407639BAE6816D00A341E1E81733A386C79AB/scale?width=506&aspectRatio=2.00&format=jpeg', 'Toy Story', '1996-03-14', '5', '4');


# Characters
INSERT INTO `heroku_0f0c398c8ab9cf8`.`characters` (`image`, `name`, `age`, `weight`, `history`) VALUES ('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/245px-Robert_Downey%2C_Jr._2012.jpg', 'Tony Stark', '55', '90', 'Anthony Edward Stark, más conocido como Tony Stark, es un personaje ficticio que da vida a este personaje, un multimillonario magnate empresarial y filántropo estadounidense, playboy e ingenioso científico, que sufrió una grave lesión en el pecho durante un secuestro en el Medio Oriente. Cuando sus captores intentan forzarlo a construir un arma de destrucción masiva fabrica, en cambio, una armadura para salvar su vida y escapar del cautiverio. Más tarde, Stark desarrolla su traje, agregando armas y otros dispositivos tecnológicos que diseñó a través de su compañía, Industrias Stark. Él usa el traje y las versiones sucesivas para proteger al mundo como Iron Man. Aunque al principio ocultó su verdadera identidad, Stark finalmente declaró quién era en un anuncio público.');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`characters` (`image`, `name`, `age`, `weight`, `history`) VALUES ('https://www.quever.news/u/fotografias/m/2020/9/12/f850x638-1140_78629_4825.jpg', 'Thor', '50', '110', 'Thor es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics. El personaje, que se basa en la deidad nórdica homónima, es el dios del trueno asgardiano poseedor del martillo encantado, Mjolnir, que le otorga capacidad de volar y manipular el clima entre sus otros atributos sobrehumanos, además de concentrar su poder.');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`characters` (`image`, `name`, `age`, `weight`, `history`) VALUES ('https://static.wikia.nocookie.net/toy-story/images/2/2f/Woody-toy-story.png/revision/latest?cb=20141226205906&path-prefix=es', 'Buddy', '40', '2', 'Woody es un juguete leal que ha sido el juguete favorito de Andy desde la guardería. Es determinado, apasionado, y haría cualquier cosa por sus amigos más queridos y cercanos. Considera cada uno de los juguetes como una familia y hace todo lo posible para mantener a su familia unida en todo momento.');
INSERT INTO `heroku_0f0c398c8ab9cf8`.`characters` (`image`, `name`, `age`, `weight`, `history`) VALUES ('https://static.wikia.nocookie.net/p__/images/6/61/JD_as_Acissorhamds.jpeg/revision/latest?cb=20160323144628&path-prefix=protagonist', 'Edward', '25', '70', 'La película cuenta la historia de un hombre creado artificialmente llamado Edward, que tiene tijeras en vez de manos. Edward es adoptado por una familia de clase media que vive en un idílico barrio residencial y acaba enamorado de la hija, Kim.');


