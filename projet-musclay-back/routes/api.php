<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\RelTrainingTagController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SetController;
use App\Http\Controllers\SocialiteController;

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
// Les routes des exercices
Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'
], function ($router) {
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::post('/refresh', [AuthController::class, 'refresh']);
  Route::delete('/delete', [AuthController::class, 'delete']);
  Route::get('/user-profile', [AuthController::class, 'userProfile']);
  Route::post('/google', [GoogleController::class, 'auth']);
});

// Route::middleware('cors')->post('/google', [GoogleController::class, 'auth']);

// user routes
Route::patch('/update', [UserController::class, 'userUpdate']);

// exercises routes
Route::get('/exercises', [ExerciseController::class, 'list'])->name('Exercises-list');

// trainings routes
Route::get('/trainings', [TrainingController::class, 'list'])->name('Trainings-list');
Route::post('/training', [TrainingController::class, 'add'])->name('Trainings-add');
Route::delete('/training/{id}', [TrainingController::class, 'delete'])->name('Trainings-delete');
Route::patch('/training/{id}', [TrainingController::class, 'edit'])->name('Trainings-edit');

// tags routes
Route::get('/tags', [TagController::class, 'list'])->name('Tags-list');
Route::post('/reltrainingtags', [RelTrainingTagController::class, 'add'])->name('RelTrainingTag-add');
Route::delete('/reltrainingtags/{id}', [RelTrainingTagController::class, 'delete'])->name('RelTrainingTag-delete');

// tags sets
Route::get('/training/sets', [SetController::class, 'list'])->name('Sets-list');
Route::delete('/training/{id}/sets', [SetController::class, 'delete'])->name('Sets-delete');
Route::post('/sets', [SetController::class, 'add'])->name('Sets-add');

// statistic
Route::get('/user/statistics', [StatisticController::class, 'list'])->name('Statistics-list');
Route::post('/statistics', [StatisticController::class, 'add'])->name('Statistics-add');

// sessions routes
// Route::get('/training/{id}/sessions/', [SessionController::class, 'list'])->name('Sessions-list');
// Route::post('/training/{id}/sessions/', [SessionController::class, 'add'])->name('Sessions-add');
// Route::patch('/sessions/{id}', [SessionController::class, 'edit'])->name('Sessions-edit');
// Route::delete('/sessions/{id}', [SessionController::class, 'delete'])->name('Sessions-delete');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
