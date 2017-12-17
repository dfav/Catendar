<?php
  $response = Array(
    "heroURL" => "./media/images/stock-2.jpg",
    "quote" => "I wish I was a dancing unicorn kitty",
    "quoteAuthor" => "Alissa Pulverson"
  );

  header('Content-type: application/json');
  echo json_encode($response);
?>