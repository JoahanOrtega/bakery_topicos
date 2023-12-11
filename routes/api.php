<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CarsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\AuthenticationController;

use App\Http\Controllers\SaleController;
use  App\Http\Controllers\BuyerController;



//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login_user', [AuthenticationController::class, 'login_user']);

Route::get('/wel', function () {
    return view('welcome');
})->name('welcome'); // Asignando el nombre 'welcome' a la ruta '/wel'


Route::middleware('auth:api')->get('/user_index', [AuthenticationController::class, 'user_index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/Car_index', [CarsController::class, 'index']);

Route::middleware('auth:api')->group(function () {

    Route::get('/Car_indexadm', [CarsController::class, 'indexadm']);

    //logout
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    
    //show
    Route::get('/ventas_index', [SaleController::class, 'index']);
    Route::get('/Brands_index', [BrandsController::class, 'index']);

    //create
    Route::get('/Car_brands', [CarsController::class, 'create']);
    Route::post('/createV', [SaleController::class, 'create']);
    Route::post('/infoC', [BuyerController::class, 'create']);

    //store
    Route::post('/insert', [CarsController::class, 'store']);
    Route::post('/insertBrand', [BrandsController::class, 'store']);

    //update
    Route::post('/Updatecar/{id}', [CarsController::class, 'update']);

    //delete
    Route::post('/car/{id}/delete', [CarsController::class, 'destroy']);
    Route::post('/Brands/{id}/delete', [BrandsController::class, 'destroy']);

    
    Route::get('/Car_token', [CarsController::class, 'token']);
    Route::post('/disable/{id}', [CarsController::class, 'disable']);

});
