<?php
    $url_rss = $_GET['urlData'];
    $curl_handle=curl_init();
    curl_setopt($curl_handle, CURLOPT_URL, $url_rss);
    curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl_handle, CURLOPT_USERAGENT, 'podcast');
    echo $data = curl_exec($curl_handle);
    curl_close($curl_handle);  
    exit();	
