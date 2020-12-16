<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1,
width=device-width, height=device-height" />
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="pragma" content="no-cache">
    <style>
        input,
        label {
            width: 45%;
            display: inline-block;
            font-size: large;
        }

        form {
            margin-top: 10%;
            text-align: center;
        }

        .row {
            display: block;
            margin-top: 15px;
        }

        .submit_btn {
            margin-top: 10px;
        }
    </style>
</head>

<body>

    <?php
    require './vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
	
    $db = new mysqli('127.0.0.1:3307', $_ENV['USERNAME'], $_ENV['PASSWORD'], 'memory_app');

    if ($_COOKIE['secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7'] != true && 
    (!$_POST || $_POST['user'] != $_ENV['U'] || $_POST['pass'] !=  $_ENV['P'])) {
    ?>
        <form method="POST">
            <label>Имя</label>
            <input type=text name="user" />
            <label>Пароль</label>
            <input type=password name="pass" />
            <div class="submit_btn">
                <button type="submit">Войти</button>
            </div>
        </form>
    <?php
    } elseif (!isset($_POST['saving_updates'])) {
        setcookie('secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7', true);
        $query = 'select * from config';
        $res = $db->query($query);
        $row = $res->fetch_assoc();
    ?>
        <form method="post">
            <input type="hidden" name="saving_updates" />
            <div>
                <div class="row">
                    <label for="n1">Задержка перед началом</label>
                    <input type="number" min="0" name="wait_before_start" id="n1" value="<?php echo (int) $row['wait_before_start']; ?>" />
                </div>
                <div class="row">
                    <label for="n2">Кол-во повторений</label>
                    <input type="number" min="1" name="number_of_repeats" id="n2" value="<?php echo (int) $row['number_of_repeats']; ?>" /></div>
                <div class="row">
                    <label for="n3">Кол-во цифр для запоминания</label>
                    <input type="number" min="1" name="number_of_digits" id="n3" value="<?php echo (int) $row['number_of_digits']; ?>" />
                </div>
                <div class="row">
                    <label for="n4">Показывать цифры (секунд)</label>
                    <input type="number" min="0" name="wait_to_show" id="n4" value="<?php echo (int) $row['wait_to_show']; ?>" />
                </div>
                <div class="row">
                    <label for="n5">Ждать ввода цифр (секунд)</label>
                    <input type="number" min="0" name="wait_for_get" id="n5" value="<?php echo (int) $row['wait_for_get']; ?>" />
                </div>
            </div>
            <div class="submit_btn">
                <button type="submit">OK</button>
            </div>
        </form>
    <?php
    } elseif (isset($_POST['saving_updates'])) {
        $query = 'update config set wait_before_start=' . $_POST['wait_before_start'] .
            ', number_of_repeats=' . $_POST['number_of_repeats'] .
            ', number_of_digits=' . $_POST['number_of_digits'] .
            ', wait_to_show=' . $_POST['wait_to_show'] .
            ', wait_for_get=' . $_POST['wait_for_get'];
        $db->query($query);
    ?>
        <div><span>Записано. Вышел...</span></div>
        <a href="#" onclick='javascript:window.location.reload();'>Назад к вводу имени и пароля</a>
    <?php

        setcookie('secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7', '');
    }
    ?>

</body>

</html>
