SELECT 
fixture_id,
event_id, 
fixture_name,
storage_qty,
selected_qty,
SUM(selected_qty) AS result_qty,
event_start,
event_end 
FROM `v_result_3` 
WHERE ((('2022-04-11' >= v_result_3.`event_start`) 
AND 
('2022-04-11' <= v_result_3.`event_end`)) 
OR (('2022-04-18' >= v_result_3.`event_start`) 
AND ('2022-04-18' <= v_result_3.`event_end`)))
GROUP BY fixture_id;