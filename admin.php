<?php

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
?>
    <form method="post">
        <input type="hidden" name="saving_updates" />
        <div>
            <div>
                <label for="n1">Text</label>
                <input type="number" name="n1" id="n1">
            </div>
            <div>
                <label for="n2">Text</label>
                <input type="number" name="n2" id="n2"></div>
            <div>
                <label for="n3">Text</label>
                <input type="number" name="n3" id="n3">
            </div>
        </div>
        <button type="submit">OK</button>
    </form>
<?php
} else {
?>
    <div><span>DONE.</span></div>
    <a href="#" onclick='javascript:window.location.reload();'>Back to login</a>
<?php
    setcookie('secretname586748xesjuyertfywertxgfzf4376r7438gt46ixtbfa7', '');
}
?>