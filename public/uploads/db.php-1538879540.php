<?php
$db = new mysqli(
  'localhost', //hostname
  'root', //username
  '', //password
  'battery' //dbname
);

/**
 * @param $message
 * @param $location
 */
function alert($message, $location = false) {
  echo '<script>';
  echo "alert('{$message}');";
  if ($location) {
    echo "location.href='{$location}'";
  }
  echo '</script>';
}
?>
