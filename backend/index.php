<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
// header('Access-Control-Max-Age: 1728000');
// header('Content-Length: 0');
header('Content-Type: text/plain');

require 'vendor/autoload.php';
require 'core/bootstrap.php';

use App\Core\{Router,Request};

Router::load('routers.php')

->direct(Request::uri(), Request::method());
