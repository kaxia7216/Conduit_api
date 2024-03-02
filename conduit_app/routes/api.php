<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\articleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/create', [articleController::class, 'store']);
Route::get('/articles', [articleController::class, 'index']);
Route::get('/article/{id}', [articleController::class, 'show']);
Route::put('/edit/{id}', [articleController::class, 'update']);
Route::delete('/delete/{id}', [articleController::class, 'destroy']);
