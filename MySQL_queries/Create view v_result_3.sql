CREATE VIEW v_result_3 AS
SELECT
f.id AS fixture_id,
s.id_event AS event_id,
f.fixture AS fixture_name,
f.qty AS storage_qty,
s.qty AS selected_qty,
f.qty-s.qty AS result_qty,
DATE(e.`start`) AS event_start,
DATE(e.`end`) AS event_end
FROM lighting_fxt f
LEFT OUTER JOIN selected_fixtures s
ON f.id = s.id_fxt
LEFT OUTER JOIN events e
ON s.id_event = e.id;