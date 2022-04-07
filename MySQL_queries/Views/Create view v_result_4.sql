CREATE VIEW v_result_4 AS
SELECT vr3.fixture_id,
vr3.fixture_name,
vr3.storage_qty, 
vr3.selected_qty,
    (CASE 
        WHEN vr3.event_start IS NULL THEN vr3.storage_qty
        ELSE vr3.storage_qty-vr3.selected_qty
    END) AS total,
vr3.event_start,
vr3.event_end    
FROM 
v_result_3 vr3

