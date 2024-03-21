SELECT
    *
FROM
    Passengers
WHERE
    Sex = 'female'
    AND Survived = 1
    AND Age > 30;

SELECT
    AVG(Age) AS average_age
FROM
    Passengers
WHERE
    Sex = 'male'
    AND Survived = 0;

SELECT
    *
FROM
    Passengers
WHERE
    Fare BETWEEN 20
    AND 50
    AND Embarked = 'C';

SELECT
    COUNT(*) AS total_survivors_first_class
FROM
    Passengers
WHERE
    Survived = 1
    AND Pclass = 1;

SELECT
    *
FROM
    Passengers
WHERE
    Embarked = 'C'
    AND Fare > 75;