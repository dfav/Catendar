<?php
    header('Content-type: application/json');
    $response = Array(
        "date" => "2017-12-17"
    );
    echo json_encode($response);
?>