CREATE extension IF NOT EXISTS "uuid-ossp";


DROP TABLE IF EXISTS users;


CREATE TABLE users (id uuid primary key DEFAULT uuid_generate_v4(),
                                                login VARCHAR(128) NOT NULL,
                                                                   password VARCHAR(128) NOT NULL,
                                                                                         age INTEGER NOT NULL,
                                                                                                     is_deleted BOOLEAN NOT NULL DEFAULT FALSE);


INSERT INTO users (login, password, age)
VALUES ('admin555',
        'password',
        105), ('marcus_aurelius',
               'romeftw',
               55), ('socrates',
                     'iknownothing',
                     55), ('plato',
                           'citizen1',
                           65);

