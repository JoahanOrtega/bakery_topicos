<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

use App\Http\Controllers\SaleController;
use  App\Http\Controllers\BuyerController;
use App\Http\Controllers\CakesController;
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
Route::get('/cake_index', [CakesController::class, 'index']);

Route::middleware('auth:api')->group(function () {

    Route::get('/cake_indexadm', [CakesController::class, 'indexadm']);

    //logout
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    
    //show
    Route::get('/sells_index', [SaleController::class, 'index']);
    Route::get('/Ingredients_index', [IngredientsController::class, 'index']);

    //create
    Route::get('/cake_ingredients', [CakesController::class, 'create']);
    Route::post('/createV', [SaleController::class, 'create']);
    Route::post('/infoC', [BuyerController::class, 'create']);

    //store
    Route::post('/insert', [CakesController::class, 'store']);
    Route::post('/insertIngredient', [IngredientsController::class, 'store']);

    //update
    Route::post('/Updatecake/{id}', [CakesController::class, 'update']);

    //delete
    Route::post('/cake/{id}/delete', [CakesController::class, 'destroy']);
    Route::post('/Brands/{id}/delete', [IngredientsController::class, 'destroy']);

    
    Route::get('/cake_token', [CakesController::class, 'token']);
    Route::post('/disable/{id}', [CakesController::class, 'disable']);

});
