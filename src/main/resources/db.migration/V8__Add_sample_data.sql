INSERT INTO vocab_note.users (name, email, gender, password, image, role_id, is_lock)
VALUES
    ('learner1', 'learner1@gmail.com', 'MALE', '$2a$10$shVGSEIJpLjVaJfAzCSuEOkuow/2bGHFwCedSz0O5TQx9xrR0PDte', null, 3, null),
    ('learner2', 'learner2@gmail.com', 'MALE', '$2a$10$jxDjHmsxdpQswfyY8p/ng.DCBSk0FkM91AnCjHjtF.7SY/kLkWZ9y', null, 3, null),
    ('learner3', 'learner3@gmail.com', 'MALE', '$2a$10$GRcZUArt6MJG7x/h0IDvcOXX7cclgg.p1J1Ti0n8KXzQTascIN40m', null, 3, null),
    ('manager1', 'manager1@gmail.com', 'MALE', '$2a$10$dTU9CRTn4o/p3i.8XMvL3u83eJ2WK01CyMOQL.BIa/m1mLJDxi6ny', null, 2, null),
    ('manager2', 'manager2@gmail.com', 'MALE', '$2a$10$wINRTYNEA4nsAnWInBeuMuo1lJ.T6/VwVBTCQUd1QvpMDcytjk0YG', null, 2, null),
    ('admin', 'admin@gmail.com', 'MALE', '$2a$10$0NWBdd2x3m7rEk..5B9Lt.xj3aqnfiLgdtjNP8T2zO3CHTnIf6lfu', null, 1, null);

INSERT INTO vocab_note.word_list (word_list_id, title, list_desc, user_id, list_type, created_at)
VALUES
    (1, 'wordlist1', 'wordlist1', 1, 'PUBLIC', '2023-10-10 16:02:22'),
    (2, 'wordlist2', 'wordlist2', 1, 'PRIVATE', '2023-10-10 16:02:55'),
    (3, 'wordList3', 'wordlist3', 2, 'PUBLIC', '2023-10-10 16:03:20'),
    (6, 'wordlist6', 'wordlist6', 2, 'PRIVATE', '2023-10-10 16:04:35'),
    (7, 'wordlist7', 'wordlist7', 4, 'PUBLIC', '2023-10-10 16:05:00'),
    (8, 'wordlist8', 'wordlist8', 4, 'PUBLIC', '2023-10-10 16:05:25');

INSERT INTO vocab_note.subcategory (subcategory_id, title, amount_of_word, subcategory_type, created_by, word_list_id)
VALUES
    (1, 'subcategory1', 20, 'DEFAULT', 'learner1@gmail.com', 1),
    (2, 'subcategory2', 30, 'DEFAULT', 'learner1@gmail.com', 1),
    (3, 'subcategory3', 10, 'DEFAULT', 'learner2@gmail.com', 3),
    (4, 'subcategory4', 5, 'CUSTOM', 'learner2@gmail.com', 2),
    (5, 'subcategory5', 8, 'DEFAULT', 'manager1@gmail.com', 2),
    (6, 'subcategory6', 7, 'DEFAULT', 'manager1@gmail.com', 3),
    (7, 'subcategory7', 6, 'DEFAULT', 'admin@gmail.com', 3);

INSERT INTO vocab_note.subcategory_detail (vocab_id, def_id, subcategory_id, is_quiz, is_review, is_flashcard, last_learning)
VALUES
    (7387, 23160, 2, 0, 1, 0, null),
    (10763, 12194, 2, 1, 0, 1, null),
    (11463, 14605, 2, 0, 1, 1, null),
    (11715, 15364, 1, 1, 0, 0, null),
    (13136, 19323, 2, 0, 1, 0, null),
    (17367, 9647, 1, 1, 0, 1, null),
    (18526, 14629, 2, 0, 1, 0, null),
    (19711, 18258, 2, 1, 0, 1, null),
    (22725, 24951, 2, 0, 1, 0, null),
    (23117, 27834, 2, 1, 0, 1, null),
    (25350, 36450, 2, 0, 1, 0, null),
    (27841, 28811, 1, 1, 0, 1, null),
    (30637, 35531, 2, 0, 1, 0, null),
    (31198, 36204, 2, 1, 0, 1, null),
    (34769, 15280, 2, 0, 1, 0, null),
    (38027, 44155, 1, 1, 0, 1, null),
    (38782, 46380, 2, 0, 1, 0, null),
    (41666, 1715, 1, 0, 1, 1, null),
    (45355, 36888, 2, 1, 0, 0, null),
    (45805, 39153, 1, 0, 0, 1, null),
    (47068, 41657, 2, 0, 1, 1, null),
    (47674, 44706, 2, 1, 1, 0, null),
    (47761, 44937, 1, 0, 1, 1, null),
    (52760, 14096, 1, 1, 0, 0, null),
    (54116, 62767, 1, 0, 1, 1, null),
    (55084, 51321, 1, 1, 0, 1, null),
    (58592, 45570, 1, 0, 1, 0, null),
    (60419, 40865, 2, 1, 0, 1, null),
    (60760, 54852, 2, 0, 1, 0, null),
    (62996, 60819, 1, 1, 0, 1, null),
    (63111, 44140, 1, 0, 1, 0, null),
    (65180, 64082, 2, 1, 0, 1, null),
    (73331, 68495, 1, 0, 1, 0, null),
    (74683, 65962, 2, 0, 1, 1, null),
    (77325, 38895, 2, 1, 0, 0, null),
    (85736, 33631, 1, 0, 0, 1, null),
    (88480, 39312, 2, 1, 0, 1, null),
    (88548, 80124, 2, 0, 1, 0, null),
    (91824, 87122, 1, 1, 0, 1, null),
    (93736, 92307, 2, 0, 1, 0, null),
    (93830, 92509, 1, 0, 1, 1, null),
    (94222, 34253, 2, 1, 0, 0, null),
    (99165, 101610, 2, 0, 0, 1, null),
    (102619, 31189, 2, 1, 0, 1, null),
    (103180, 15260, 1, 0, 1, 0, null),
    (104003, 90237, 2, 1, 0, 1, null),
    (109040, 87494, 2, 0, 1, 0, null),
    (113149, 99019, 2, 1, 0, 1, null),
    (113285, 99152, 1, 0, 1, 0, null),
    (113937, 100111, 1, 1, 0, 1, null);

