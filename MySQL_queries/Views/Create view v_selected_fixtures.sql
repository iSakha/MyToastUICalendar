CREATE VIEW `v_selected_fixtures` AS
SELECT
`selected_fixtures`.id,
`selected_fixtures`.id_fxt,
`selected_fixtures`.id_event,
`selected_fixtures`.qty,
`events`.title,
DATE(`events`.`start`) AS `start`,
DATE(`events`.`end`) AS `end`
FROM `selected_fixtures`
JOIN `events` ON
`selected_fixtures`.`id_event` = `events`.id
ORDER BY `id_fxt`;
