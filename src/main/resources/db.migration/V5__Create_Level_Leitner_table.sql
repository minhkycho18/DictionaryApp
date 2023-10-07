ALTER TABLE vocab_leitner
    MODIFY level int NOT NULL;

CREATE TABLE level_leitner
(
    level int primary key,
    name  varchar(50) not null,
    time  int         not null
);

INSERT INTO level_leitner
values (1, 'Waiting', 0),
       (2, 'Every day', 24),
       (3, 'Every 2 days', 48),
       (4, 'Every 4 days', 96),
       (5, 'Every 8 days', 192),
       (6, 'Every 16 days', 384),
       (7, 'Every 32 days', 768),
       (8, 'Learned', 0);

ALTER TABLE vocab_leitner
    ADD CONSTRAINT fk_level_leitner FOREIGN KEY (level) REFERENCES level_leitner (level);



