SELECT vr3.fixture_id,
vr3.fixture_name,
vr3.storage_qty, 
    (CASE 
        WHEN vr3.storage_qty <= '23' THEN 12
        ELSE 1
    END) AS total

FROM 
v_result_3 vr3
WHERE
event_start IS NOT NULL
