ALTER TABLE `word_list`
ADD COLUMN `modified_at` TIMESTAMP,
ADD COLUMN `modified_by` VARCHAR(255);