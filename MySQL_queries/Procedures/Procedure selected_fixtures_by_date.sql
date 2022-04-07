DELIMITER //
CREATE PROCEDURE `selected_fixtures_by_date`(IN date_start DATE, IN date_end DATE)
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
COMMENT 'With parameters'
BEGIN
SELECT `id_fxt`, 
`start`,
`end`
FROM `v_selected_fixtures` 
WHERE (((date_start >= v_selected_fixtures.`start`) 
AND 
(date_start <= v_selected_fixtures.`end`)) 
OR ((date_end >= v_selected_fixtures.`start`) 
AND (date_end <= v_selected_fixtures.`end`)));
END//
DELIMITER ;