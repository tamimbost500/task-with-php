<?php

namespace App\Models ;

use App\Core\App;

class sectorsModel
{
    public function memberSave($name, $sectorsId, $isAgree)
    {

        $sql = "INSERT INTO `members` ( `name`, `sector_ids`, `isAgree`) VALUES ($name, $sectorsId,  $isAgree)";

        try {
            return App::get('database')->sqlInsert($sql) ;
        } catch(\PDOException $e) {

            die($e->getMessage());

        }
    }


}
