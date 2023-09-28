ALTER TABLE vocab_leitner MODIFY word_desc VARCHAR(255);  
ALTER TABLE vocab_leitner ADD CONSTRAINT word_desc_userid UNIQUE(`word`,`word_desc`,`user_id`);