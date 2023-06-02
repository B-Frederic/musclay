<?php

namespace App\Http\Controllers;

use App\Models\Set;
use App\Models\Training;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class SetController extends Controller
{
  /**
   * Get all sets group by exercise
   *
   * @return JsonResponse
   */
  public function list(): JsonResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // we check if the training is own by the user
    // $training = Training::where('user_id', auth()->user()->id)->find($id);

    // if object is empty that's mean the id doesn't exist so we send a not found response
    // if (!$training) {
    //   return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    // }

    // return $this->sendJsonResponse(Set::all()->where('training_id', $training->id)->groupBy('exercise_id'));
    return $this->sendJsonResponse(Set::join('trainings', 'sets.training_id', '=', 'trainings.id')->where('user_id', auth()->user()->id)->get(array('sets.*'))->groupBy(['training_id', 'exercise_id']));


  }

  /**
   * delete relation by training id
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

    // we check if the training is own by the user
    $training = Training::where('user_id', auth()->user()->id)->find($id);

    // Get sets to delete
    $sets = Set::where('training_id', $training->id);

    // if doesn't exist we return NOT FOUND error
    if (!$sets) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we delete the training
    if (!$sets->delete()) {
      // if there is an error we return INTERNAL SERVER ERROR
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we return code NO_CONTENT
    return $this->sendEmptyResponse(Response::HTTP_NO_CONTENT);
  }

  /**
   * create sets (bulk insert)
   *
   * @param Request  $request
   *                          
   * @param int|null $id
   *
   * @return SymfonyResponse
   */
  public function add(Request $request): SymfonyResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // we check if the training is own by the user
    $training = Training::where('user_id', auth()->user()->id)->find($request[0]["training_id"]);

    // if object is empty that's mean the id doesn't exist so we send a not found response
    if (!$training) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // We transform json array get from the request to a php array
    for ($i = 0; $i < count($request->all()); $i++) {
      $relTarainingTags[] = [
        'set_number' => $request[$i]["set_number"],
        'repetitions' => $request[$i]["repetitions"],
        'weight' => $request[$i]["weight"],
        'training_id' => $training->id,
        'exercise_id' => $request[$i]["exercise_id"],
      ];
    }

    // We insert the array into the database
    Set::insert($relTarainingTags);

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      Set::all()->where('training_id', $request[0]["training_id"]),
      Response::HTTP_CREATED
    );
  }
}
