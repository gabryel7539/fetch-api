<?php
// Define cabeçalhos para permitir requisições de qualquer origem (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Verifica se a capital foi enviada via GET ou POST
$capital = '';
if (isset($_GET['capital'])) {
    $capital = trim($_GET['capital']);
} elseif (isset($_POST['capital'])) {
    $capital = trim($_POST['capital']);
}

if (empty($capital)) {
    echo json_encode(["erro" => "Capital não fornecida."]);
    exit;
}

// Monta a URL da API
$url = "https://restcountries.com/v3.1/capital/" . urlencode(strtolower($capital));

// Faz a requisição
$response = @file_get_contents($url);

// Verifica se a resposta foi obtida com sucesso
if ($response === FALSE) {
    echo json_encode(["erro" => "Erro ao buscar a API externa."]);
    exit;
}

// Retorna os dados recebidos da API
echo $response;
