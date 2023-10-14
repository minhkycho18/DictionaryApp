DELETE
FROM level_leitner;

INSERT INTO level_leitner
values
       (0, 'Waiting', 0),
       (1, 'Starting', 0),
       (2, 'Every day', 24),
       (3, 'Every 2 days', 48),
       (4, 'Every 4 days', 96),
       (5, 'Every 8 days', 192),
       (6, 'Every 16 days', 384),
       (7, 'Learned', 0);