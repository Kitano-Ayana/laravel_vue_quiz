<?php
Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['middleware' => ['api']], function () {
  Route::get('information', 'Api\InformationController@index');
  Route::get('category', 'Api\CategoryController@index');
  Route::get('quiz', 'Api\QuizController@index');
  Route::get('ranking', 'Api\RankingController@index');
});
