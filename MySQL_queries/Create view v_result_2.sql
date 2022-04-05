CREATE VIEW v_result_2 AS
SELECT 
f.id AS fixture_id,
s.id_event AS event_id,
f.fixture AS fixture_name,
f.qty AS storage_qty,
s.qty AS selected_qty,
f.qty-s.qty AS result_qty,
e.`start` AS event_start,
e.`end` AS event_end
FROM lighting_fxt f
INNER JOIN selected_fixtures s
ON f.id = s.id_fxt
INNER JOIN events e
ON s.id_event = e.id;