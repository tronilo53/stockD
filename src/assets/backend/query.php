<?php

	require 'cors.php';
	require 'connection.php';

	$json = file_get_contents('php://input');
    $params = json_decode($json);


    switch ($params->passCode) {
    	case '001':
    		$data = [];
    		for($i = 1; $i < 13; $i ++) {
    			$stmt = $pdo -> prepare('SELECT COUNT(*) FROM pedidos WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?');
    			$stmt -> execute([ $i, $params->year ]);
    			array_push($data, $stmt -> fetchColumn());
    		}
    		$res = $data;	
    	break;
    	case '002':
    		$data = [];
    		if($params->model === 'Delaqua') {
    			$stmt = $pdo -> prepare('SELECT * FROM equipos_delaqua');
    			$stmt -> execute();
    			foreach ($stmt -> fetchAll() as $rows) {
    				array_push($data, $rows['stock']);
    			}
    		}else {
    			$stmt = $pdo -> prepare('SELECT * FROM equipos_desincal');
    			$stmt -> execute();
    			foreach ($stmt -> fetchAll() as $rows) {
    				array_push($data, $rows['stock']);
    			}
    		}
    		$res = $data;
    	break;
    }


    header('Content-Type: application/json');

    echo json_encode($res);

?>