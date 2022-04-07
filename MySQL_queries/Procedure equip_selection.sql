DELIMITER //
CREATE PROCEDURE `equip_selection`(IN date_start DATE, IN date_end DATE)
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
COMMENT 'With parameters'
BEGIN
	SELECT vr3.fixture_id,
vr3.fixture_name,
vr3.storage_qty, 
vr3.selected_qty,
    (CASE 
        WHEN (date_start >= vr3.event_start) AND (date_start <= vr3.event_end) THEN vr3.storage_qty-vr3.selected_qty
        WHEN (date_end >= vr3.event_start) AND (date_end <= vr3.event_end) THEN vr3.storage_qty-vr3.selected_qty
        ELSE vr3.storage_qty
    END) AS total,
vr3.event_start,
vr3.event_end    
FROM 
v_result_3 vr3;
END//
DELIMITER ;