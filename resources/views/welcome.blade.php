<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite('resources/css/app.css')
        <title>Bakery Topicos</title>

        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body class="">
        <div id="app">
            <h1></h1>
        </div>
    </body>
</html>
