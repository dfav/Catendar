<?php
  require_once('../php/database.php');
  $response = Array();
  $item = Array();
  $date = isset($_GET['date']) && strlen($_GET['date']) == 8 ? intval($_GET['date']) : null;

  if ($date) {
    $stmt = DB::run("SELECT `imageURL`, `quote`, `author` FROM heroes WHERE `dateCode` = ?", [$date]);
    $row = $stmt->fetch(PDO::FETCH_LAZY);
    
    // Always return data, if no match was found, pick a random entry.
    if (!$row) {
      $stmt = DB::run("SELECT `imageURL`, `quote`, `author` FROM `heroes` ORDER BY RAND() LIMIT 1");
      $row = $stmt->fetch(PDO::FETCH_LAZY);
    }
    
    $response['heroURL'] = './media/images/' . $row['imageURL'];
    $response['quote'] = $row['quote'];
    $response ['author'] = $row['author'];
  } else {
    $response['error'] = "There is no hero for that date";
  }

  header('Content-type: application/json');
  echo json_encode($response);
?>