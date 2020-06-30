<?php
require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db = new mysqli('localhost', $_ENV['USER'], $_ENV['PASSWORD'], 'memory_app');

if ($_COOKIE['secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7'] != true && (!$_POST || $_POST['user'] != 'evg' || $_POST['pass'] != 'evg')) {
?>
    <form method="POST">
        <input type=text name="user" />
        <input type=password name="pass" />
        <button type="submit">Login</button>
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
            <div>
                <label for="n1">wait_before_start</label>
                <input type="number" name="wait_before_start" id="n1" value="<?php echo (int) $row['wait_before_start']; ?>" />
            </div>
            <div>
                <label for="n2">number_of_repeats</label>
                <input type="number" name="number_of_repeats" id="n2" value="<?php echo (int) $row['number_of_repeats']; ?>" /></div>
            <div>
                <label for="n3">number_of_digits</label>
                <input type="number" name="number_of_digits" id="n3" value="<?php echo (int) $row['number_of_digits']; ?>" />
            </div>
            <div>
                <label for="n4">wait_to_show</label>
                <input type="number" name="wait_to_show" id="n4" value="<?php echo (int) $row['wait_to_show']; ?>" />
            </div>
            <div>
                <label for="n5">wait_for_get</label>
                <input type="number" name="wait_for_get" id="n5" value="<?php echo (int) $row['wait_for_get']; ?>" />
            </div>
        </div>
        <button type="submit">OK</button>
    </form>
<?php
} elseif (isset($_POST['saving_updates'])) {
    $query = 'update config set wait_before_start='.$_POST['wait_before_start'].
        ', number_of_repeats='.$_POST['number_of_repeats'].
        ', number_of_digits='.$_POST['number_of_digits'].
        ', wait_to_show='.$_POST['wait_to_show'].
        ', wait_for_get='.$_POST['wait_for_get'];
    $db->query($query);
?>
    <div><span>DONE.</span></div>
    <a href="#" onclick='javascript:window.location.reload();'>Back to login</a>
<?php

    setcookie('secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7', '');
}
?>