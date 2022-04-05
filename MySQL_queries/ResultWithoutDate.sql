

SELECT 
f.id AS fixture_id,
f.fixture AS fixture_name,
f.qty AS storage_qty,
s.qty AS selected_qty,
f.qty-s.qty AS result_qty
FROM lighting_fxt f
INNER JOIN selected_fixtures s
ON f.id = s.id_fxt;

      
	  