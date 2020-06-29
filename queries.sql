create database memory_app;
use memory_app;

create table config (
    wait_before_start INT NOT NULL DEFAULT 3,
    number_of_repeats INT NOT NULL DEFAULT 5,
    number_of_digits INT NOT NULL DEFAULT 4,
    wait_to_show INT NOT NULL DEFAULT 3,
    wait_for_get INT NOT NULL DEFAULT 3
);

INSERT INTO config (
    wait_before_start, number_of_repeats,number_of_digits,wait_to_show,wait_for_get
    ) VALUES (
        3,5,4,3,3
    );