CREATE TABLE `history_contribution` (
   history_id INT PRIMARY KEY AUTO_INCREMENT,
   vocab_id BIGINT NOT NULL,
   `status` VARCHAR(25),
   confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   confirmed_by VARCHAR(100) NOT NULL
);