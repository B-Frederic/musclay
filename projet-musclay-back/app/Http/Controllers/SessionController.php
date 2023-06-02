<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class SessionController extends Controller
{
  /**
   * Get all session by the training id
   *
   * @param int $id
   * 
   * @return JsonResponse
   */
  public function list(int $id): JsonResponse
  {
    // get sessions from training id
    return $this->sendJsonResponse(Session::all()->where('training_id', $id));
  }

  /**
   * create session
   *
   * @param Request  $request
   *                          
   * @param int $id
   *
   * @return SymfonyResponse
   */
  public function add(Request $request, int $id): SymfonyResponse
  {
    // If there is not all parameters on request we send a bad request error
    if (!$this->checkRequest($request)) {
      return $this->sendEmptyResponse(Response::HTTP_BAD_REQUEST);
    }

    $session = new Session();

    // we put data get from the request into the orm object
    $this->populateObject($request, $session);
    $session->training_id = $id;

    // We save into database the new record
    if (!$session->save()) {
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      $session,
      Response::HTTP_CREATED
    );
  }

  /**
   * edit session
   *
   * @param Request  $request
   *                          
   * @param int $id
   *
   * @return SymfonyResponse
   */
  public function edit(Request $request, int $id): SymfonyResponse
  {
    // If there is not all parameters on request we send a bad request error
    if (!$this->checkRequest($request)) {
      return $this->sendEmptyResponse(Response::HTTP_BAD_REQUEST);
    }

    // We get sessin from his id
    $session = Session::find($id);

    // if object is empty that's mean the id doesn't exist so we send a not found response
    if (!$session) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we put data get from the request into the orm object
    $this->populateObject($request, $session);

    // We save into database the new record
    if (!$session->save()) {
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      $session,
      Response::HTTP_OK
    );
  }

  /**
   * delete a session
   *
   * @param int $id
   *
   * @return SymfonyResponse
   */
  public function delete(int $id): SymfonyResponse
  {
    // Get the session to delete
    $session = Session::find($id);

    // if doesn't exist we return NOT FOUND error
    if (!$session) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we delete the training
    if (!$session->delete()) {
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we send a succes response
    return $this->sendEmptyResponse(Response::HTTP_NO_CONTENT);
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
      return $request->filled('name') || $request->filled('id');
    }
    if ($request->isMethod('post')) {
      return $request->filled(['name']);
    }
    return true;
  }

  /**
   *
   * @param Request $request
   * @param Session $session
   *
   * @return Training
   */
  private function populateObject(Request $request, Session $session): Session
  {
    if ($request->filled('name')) {
      $session->name = $request->input('name');
    }
    return $session;
  }
}
