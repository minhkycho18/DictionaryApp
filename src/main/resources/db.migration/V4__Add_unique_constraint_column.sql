ALTER TABLE users
    ADD UNIQUE (email);
ALTER TABLE users
    ADD COLUMN is_lock boolean default false;

ALTER TABLE word_list
    ADD COLUMN list_type VARCHAR(10) NOT NULL;
ALTER TABLE word_list
    ADD COLUMN created_at TIMESTAMP;

ALTER TABlE subcategory_detail
    ADD COLUMN is_quiz BOOLEAN default false;
ALTER TABlE subcategory_detail
    ADD COLUMN is_review BOOLEAN default false;
ALTER TABlE subcategory_detail
    ADD COLUMN is_flashcard BOOLEAN default false;
ALTER TABlE subcategory_detail
    ADD COLUMN last_learning TIMESTAMP;

DROP INDEX head_pos ON vocabularies;

