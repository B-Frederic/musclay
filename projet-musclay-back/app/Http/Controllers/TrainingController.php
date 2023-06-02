<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class TrainingController extends Controller
{
  /**
   * Get all exercises whith their muscle groups
   *
   * @return JsonResponse
   */
  public function list(): JsonResponse
  {
    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // get trainings from auth user id
    return $this->sendJsonResponse(Training::all()->where('user_id', auth()->user()->id)->load('tags'));
  }

  /**
   * delete a training
   *
   * @param int $id
   *
   * @return SymfonyResponse
   */
  public function delete(int $id): SymfonyResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // Get training to delete
    $training = Training::where('user_id', auth()->user()->id)->find($id);

    // if doesn't exist we return NOT FOUND error
    if (!$training) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we delete the training
    if (!$training->delete()) {
      // if there is an error we return INTERNAL SERVER ERROR
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we return code NO_CONTENT
    return $this->sendEmptyResponse(Response::HTTP_NO_CONTENT);
  }

  /**
   * create training
   *
   * @param Request  $request
   *                          
   * @param int|null $id
   *
   * @return SymfonyResponse
   */
  public function add(Request $request, ?int $id = null): SymfonyResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // If there is not all parameters on request we send a bad request error
    if (!$this->checkRequest($request)) {
      return $this->sendEmptyResponse(Response::HTTP_BAD_REQUEST);
    }

    $training = new Training();

    // we put data get from the request into the orm object
    $this->populateObject($request, $training);
    $training->user_id = auth()->user()->id;

    // We save into database the new record
    if (!$training->save()) {
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      $training,
      Response::HTTP_CREATED
    );
  }

  /**
   * edit training
   *
   * @param Request  $request
   *                          
   * @param int $id
   *
   * @return SymfonyResponse
   */
  public function edit(Request $request, int $id): SymfonyResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // If there is not all parameters on request we send a bad request error
    if (!$this->checkRequest($request)) {
      return $this->sendEmptyResponse(Response::HTTP_BAD_REQUEST);
    }

    // We get training from his id
    $training = Training::where('user_id', auth()->user()->id)->find($id);

    // if object is empty that's mean the id doesn't exist so we send a not found response
    if (!$training) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we put data get from the request into the orm object
    $this->populateObject($request, $training);

    // We save into database the new record
    if (!$training->save()) {
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      $training,
      Response::HTTP_OK
    );
  }

  /**
   *
   * @param Request
   *
   * @return bool
   */
  private function checkRequest(Request $request): bool
  {
    if ($request->isMethod('patch')) {
      return $request->filled(['name']);
    }
    if ($request->isMethod('post')) {
      return $request->filled(['name']);
    }
    return true;
  }

  /**
   *
   * @param Request  $request
   * @param Training $training
   *
   * @return Training
   */
  private function populateObject(Request $request, Training $training): Training
  {
    if ($request->filled('name')) {
      $training->name = $request->input('name');
    }
    return $training;
  }
}
