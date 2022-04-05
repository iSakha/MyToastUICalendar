CREATE VIEW `v_result_5` AS
SELECT `vr3`.`fixture_id` AS `fixture_id`,
 `vr3`.`event_id` AS `event_id`,
 `vr3`.`fixture_name` AS `fixture_name`,
 `vr3`.`storage_qty` AS `storage_qty`,
 `vr3`.`selected_qty` AS `selected_qty`,
 CASE 
 WHEN `vr3`.`event_start` IS NULL 
 THEN `vr3`.`storage_qty` 
 ELSE `vr3`.`storage_qty` - `vr3`.`selected_qty` 
 END 
 AS `result_qty`,
 `vr3`.`event_start` AS `event_start`,
 `vr3`.`event_end` AS `event_end` 
 FROM `v_result_3` `vr3`