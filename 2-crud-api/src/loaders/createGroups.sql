
DROP TABLE IF EXISTS groups;


CREATE TABLE groups (id uuid primary key DEFAULT uuid_generate_v4(),
                                                 name VARCHAR(128) NOT NULL,
                                                                   premissions text[] NOT NULL);


INSERT INTO groups (name, premissions)
VALUES ('admin_group', ARRAY['READ',
                             'WRITE',
                             'DELETE',
                             'SHARE',
                             'UPLOAD_FILES']), ('user_group', ARRAY['READ',
                                                                    'WRITE',
                                                                    'SHARE']);

