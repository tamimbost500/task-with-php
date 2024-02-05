<?php

namespace App\Controllers;

use App\Core\App;
use Requests_Response;

class memberController
{
    public function index()
    {

        $membersData = App::get('database')->selectAll('members');

        echo json_encode($membersData);
    }

    public function save()
    {
        $data = [
          'name' => $_POST['name'],
          'sectorIds' => $_POST['sectorIds'],
          'isAgree' => $_POST['isAgree'] ? 1 : 0
        ];

        $memberId = App::get('database')->insert('members', $data);

        $data['id'] = $memberId ;


        echo json_encode($data);

    }

    public function update()
    {

        $parameters = [
            'name' => $_POST['name'],
            'sectorIds' => $_POST['sectorIds'],
            'isAgree' => $_POST['isAgree'] ? 1 : 0,
          ];

        $id = $_POST['id'];

        $columnValuePairs = implode(', ', array_map(function ($column, $value) {
            $formattedValue = is_numeric($value) ? $value : "'$value'";
            return "$column = $formattedValue";
        }, array_keys($parameters), $parameters));

        $sql = sprintf(
            'UPDATE %s SET %s WHERE id = %s',
            "members",
            $columnValuePairs,
            $id
        );

        $res = App::get('database')->sqlInsert($sql);

        if(empty($res)) {
            $parameters["id"] = (int) $id;
            echo json_encode($parameters);
        }


    }

    public function delete()
    {

        $id = (int) $_POST['id'];

        $sql = "DELETE FROM members WHERE id = {$id} ";
        $res = App::get('database')->sqlInsert($sql);

        if(empty($res)) {
            echo json_encode($id);
        }
    }
}
