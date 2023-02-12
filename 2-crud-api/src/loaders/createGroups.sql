DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
  group_id uuid primary key DEFAULT uuid_generate_v4(),
  name VARCHAR(128) NOT NULL,
  permissions text [] NOT NULL
);

INSERT INTO
  groups (name, permissions)
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

-- CREATE TABLE user_group (
--   user_id uuid REFERENCES users (user_id) ON DELETE CASCADE,
--   group_id uuid REFERENCES groups (group_id) ON DELETE CASCADE,
--   CONSTRAINT user_group_pkey PRIMARY KEY (user_id, group_id)
-- );