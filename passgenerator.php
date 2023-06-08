<?php
$senha = "teste";
$hash = password_hash($senha, PASSWORD_BCRYPT);
echo $hash;
?>
