<?php
    $response = Array(
        "timecode" => time() * 1000
    );

    header('Content-type: application/json');
    echo json_encode($response);
?>