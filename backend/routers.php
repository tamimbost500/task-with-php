<?php


$router->get('sectors', 'sectorsController@index');
$router->get('member', 'memberController@index');
$router->post('member/save', 'memberController@save');
$router->post('member/delete', 'memberController@delete');
$router->post('member/update', 'memberController@update');
$router->post('', 'reportController@getData');
