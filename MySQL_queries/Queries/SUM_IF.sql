SELECT 
vr3.fixture_id,
vr3.fixture_name,
vr3.event_id,++
vr3.storage_qty, 
SUM(selected_qty) AS selected_qty,

    SUM(CASE 
        WHEN ('2022-04-08' >= vr3.event_start) AND ('2022-04-08' <= vr3.event_end) THEN selected_qty
        WHEN ('2022-04-08' >= vr3.event_start) AND ('2022-04-08' <= vr3.event_end) THEN selected_qty
        ELSE 0
    END) AS new_selected_qty,
    
    (CASE 
        WHEN ('2022-04-08' >= vr3.event_start) AND ('2022-04-08' <= vr3.event_end) THEN vr3.storage_qty-SUM(selected_qty)
        WHEN ('2022-04-08' >= vr3.event_start) AND ('2022-04-08' <= vr3.event_end) THEN vr3.storage_qty-SUM(selected_qty)
        ELSE vr3.storage_qty
    END) AS result_qty,
vr3.event_start,
vr3.event_end    
FROM 
v_result_3 vr3
GROUP BY vr3.fixture_id;
