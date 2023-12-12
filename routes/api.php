<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

use App\Http\Controllers\SaleController;
use  App\Http\Controllers\BuyerController;
use App\Http\Controllers\CackesController;
use App\Http\Controllers\IngredientsController;


Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login_user', [AuthenticationController::class, 'login_user']);

Route::get('/wel', function () {
    return view('welcome');
})->name('welcome');


Route::middleware('auth:api')->get('/user_index', [AuthenticationController::class, 'user_index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/cake_index', [CackesController::class, 'index']);

Route::middleware('auth:api')->group(function () {

    Route::get('/cake_indexadm', [CackesController::class, 'indexadm']);

    //logout
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    
    //show
    Route::get('/sells_index', [SaleController::class, 'index']);
    Route::get('/Ingredients_index', [IngredientsController::class, 'index']);

    //create
    Route::get('/cake_ingredients', [CackesController::class, 'create']);
    Route::post('/createV', [SaleController::class, 'create']);
    Route::post('/infoC', [BuyerController::class, 'create']);

    //store
    Route::post('/insert', [CackesController::class, 'store']);
    Route::post('/insertIngredient', [IngredientsController::class, 'store']);

    //update
    Route::post('/Updatecacke/{id}', [CackesController::class, 'update']);

    //delete
    Route::post('/cacke/{id}/delete', [CackesController::class, 'destroy']);
    Route::post('/Brands/{id}/delete', [IngredientsController::class, 'destroy']);

    
    Route::get('/cacke_token', [CackesController::class, 'token']);
    Route::post('/disable/{id}', [CackesController::class, 'disable']);

});
