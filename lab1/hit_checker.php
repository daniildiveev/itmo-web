<?php
    $x = floatval($_GET["x_field"]);
    $y = floatval($_GET["y_field"]);
    $r = floatval($_GET["R_field"]);

    if ($x > 0 && $y > 0) {
        if ($y <= -$x + $r) $result = "Точка попадает в область";
        else $result = "Точка не попадает в область";
    }

    else if ($x < 0 && $y > 0) {
        if ($x > -$r && $y < $r/2) $result = "Точка попадает в область";
        else $result = "Точка не попадает в область";
    }

    else if ($x > 0 && $y < 0){
        if (sqrt($x ** 2 + $y ** 2) < $r) $result = "Точка попадает в область";
        else $result = "Точка не попадает в область";
    }

    else $result = "Точка не попадает в область";

    $data = array('hit' => $result,
                  'exec_time' => (microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"])
        );
    echo json_encode($data);
    http_response_code(201);
?>
