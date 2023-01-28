DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  id uuid primary key DEFAULT uuid_generate_v4(),
  name VARCHAR(128) NOT NULL,
  premissions text [] NOT NULL
);

INSERT INTO
  groups (name, premissions)
VALUES
  (
    'admin_group',
    ARRAY ['READ',
                             'WRITE',
                             'DELETE',
                             'SHARE',
                             'UPLOAD_FILES']
  ),
  (
    'user_group',
    ARRAY ['READ',
                                                                    'WRITE',
                                                                    'SHARE']
  );

DROP TABLE IF EXISTS user_group;

CREATE TABLE user_group (
  user_id uuid REFERENCES users (id) ON DELETE CASCADE,
  group_id uuid REFERENCES groups (id) ON DELETE CASCADE,
  CONSTRAINT user_group_pkey PRIMARY KEY (user_id, group_id)
);