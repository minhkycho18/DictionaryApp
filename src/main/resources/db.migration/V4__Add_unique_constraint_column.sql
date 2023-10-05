ALTER TABLE users
    ADD UNIQUE (email);
ALTER TABLE users
    ADD COLUMN is_lock boolean default false;

ALTER TABLE word_list
    ADD COLUMN list_type VARCHAR(10) NOT NULL;
ALTER TABLE word_list
    ADD COLUMN create_at TIMESTAMP;

DROP INDEX head_pos ON vocabularies;

