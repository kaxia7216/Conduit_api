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
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(articleController::class)->group(function () {
    Route::post('/create', 'store');
    Route::get('/articles', 'index');
    Route::get('/article/{id}', 'show');
    Route::put('/edit/{id}', 'update');
    Route::delete('/delete/{id}', 'destroy');
    Route::post('/createComment/{id}', 'addComment');
    Route::get('/comments/{id}', 'getComments');
    Route::delete('/deleteComment/{id}', 'destroyComment');
    Route::delete('/tag-delete/{article_id}&{tag_id}', 'deleteTagFromArticle');
});
