<?php

namespace App\Controllers;

use App\Core\App;

class sectorsController
{
    public function index()
    {

        $sectorsData = App::get('database')->sqlInsert("SELECT * FROM sectors") ;

        echo json_encode($sectorsData);
    }
}
