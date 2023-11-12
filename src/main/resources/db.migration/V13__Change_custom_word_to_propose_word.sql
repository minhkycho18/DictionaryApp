ALTER TABLE vocabularies
    CHANGE word_type `status` VARCHAR(10);

ALTER TABLE vocabularies
    CHANGE modified_at contributed_at timestamp;

ALTER TABLE vocabularies
    CHANGE modified_by contributed_by varchar(255);