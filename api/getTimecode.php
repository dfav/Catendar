<?php
  $response = Array(
    "timecode" => time() * 1000 // Convert epoch seconds to milliseconds
  );

  header('Content-type: application/json');
  echo json_encode($response);
?>