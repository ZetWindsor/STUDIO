CREATE USER 'Emilio' @'localhost' IDENTIFIED BY '1234abc';

GRANT
SELECT
,
UPDATE
    ON Books TO 'Emilio' @'localhost';

REVOKE DELETE ON Books
FROM
    'Emilio' @'localhost';

FLUSH PRIVILEGES;