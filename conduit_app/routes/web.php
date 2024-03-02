<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/create', function () {
    $editMode = 0;
    return view('create-edit', compact('editMode'));
});

Route::post('/create', function () {
    return view('home');
});

Route::get('/article/{id}', function ($id) {
    return view('article', compact('id'));
});

Route::get('/edit/{id}', function ($id) {
    $editMode = 1;
    return view('create-edit', compact('editMode', 'id'));
});

Route::get('/edit', function () {
    return view('home');
});
