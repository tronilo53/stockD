<?php

	require 'cors.php';
	require 'connection.php';

	$json = file_get_contents('php://input');
    $params = json_decode($json);


    switch ($params->passCode) {
    	/*
		* * Obtener el número total de pedidos realizados referentes a un mes y un año concretos
    	*/
    	case '001':
    		$data = [];
    		for($i = 1; $i < 13; $i ++) {
    			$stmt = $pdo -> prepare('SELECT COUNT(*) FROM pedidos WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?');
    			$stmt -> execute([ $i, $params->year ]);
    			array_push($data, $stmt -> fetchColumn());
    		}
    		$res = $data;	
    	break;
    	/*
		* * Obtener el número de equipos en stock referentes a una categoria [Delaqua - Desincal]
    	*/
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
    	/*
		* * Obtener informacion de los pedidos realizados
    	*/
    	case '003':
    		if($params->mes && $params->anio) {
    			$stmt = $pdo -> prepare('SELECT * FROM pedidos WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?');
    			$stmt -> execute([ $params->mes, $params->anio ]);
    		}elseif($params->anio) {
    			$stmt = $pdo -> prepare('SELECT * FROM pedidos WHERE YEAR(fecha) = ?');
    			$stmt -> execute([ $params->anio ]);
    		}elseif($params->referencia) {
    			$stmt = $pdo -> prepare('SELECT * FROM pedidos WHERE referencia = ?');
    			$stmt -> execute([ $params->referencia ]);
    		}else {
    			$stmt = $pdo -> prepare('SELECT * FROM pedidos');
    			$stmt -> execute();
    		}
    		$res = $stmt -> fetchAll();
    	break;
    }


    header('Content-Type: application/json');

    echo json_encode($res);

?>