<?php

	require 'cors.php';
	require 'connection.php';

	$json = file_get_contents('php://input');
    $params = json_decode($json);


    switch ($params->passCode) {
    	case '001':
    		$data = [];
    		for($i = 1; $i < 13; $i ++) {
    			$stmt = $pdo -> prepare('SELECT COUNT(*) FROM pedidos WHERE MONTH(fecha) = ?');
    			$stmt -> execute([ $i ]);
    			array_push($data, $stmt -> fetchColumn());
    		}
    		$res = $data;	
    	break;
    }


    header('Content-Type: application/json');

    echo json_encode($res);

?>