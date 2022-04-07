SELECT id_fxt, 
SUM(qty) AS fxt_sum 
FROM `v_selected_fixtures` 
GROUP BY id_fxt;