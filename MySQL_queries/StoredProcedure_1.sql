
SELECT vr3.fixture_id,
vr3.fixture_name,
vr3.storage_qty, 
vr3.selected_qty,
    (CASE 
        WHEN (vr3.event_start >= '2022-04-10') AND (vr3.event_end <= '2022-04-21') THEN vr3.storage_qty-vr3.selected_qty
        ELSE vr3.storage_qty
    END) AS total,
vr3.event_start,
vr3.event_end    
FROM 
v_result_3 vr3

