<?php

namespace App\Http\Controllers;

use App\Models\Rel_trainings_tag;
use App\Models\Training;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class RelTrainingTagController extends Controller
{
  /**
   * Get all relations between trainings and tags
   *
   * @return JsonResponse
   */
  // public function list(): JsonResponse
  // {
  //   // if user it's not logged
  //   if (!auth()->user()) {
  //     return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
  //   }

  //   // get all tags
  //   return $this->sendJsonResponse(Rel_trainings_tag::all());
  // }

  /**
   * create relation between training and tags (bulk insert)
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

    // we check if the training is own by the user
    $training = Training::where('user_id', auth()->user()->id)->find($request[0]["training_id"]);

    // if object is empty that's mean the id doesn't exist so we send a not found response
    if (!$training) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // We transform json array get from the request to a php array
    for ($i = 0; $i < count($request->all()); $i++) {
      $relTarainingTags[] = [
        'training_id' => $training->id,
        'tag_id' => $request[$i]["tag_id"]
      ];
    }

    // We insert the array into the database
    Rel_trainings_tag::insert($relTarainingTags);

    // If everything is ok we send a succes response
    return $this->sendJsonResponse(
      Rel_trainings_tag::all()->where('training_id', $request[0]["training_id"]),
      Response::HTTP_CREATED
    );
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

    // if object is empty that's mean the id doesn't exist so we send a not found response
    if (!$training) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // Get training to delete
    $rel_trainings_tags = Rel_trainings_tag::where('training_id', $training->id);

    // if doesn't exist we return NOT FOUND error
    if (!$rel_trainings_tags) {
      return $this->sendEmptyResponse(Response::HTTP_NOT_FOUND);
    }

    // we delete the training
    if (!$rel_trainings_tags->delete()) {
      // if there is an error we return INTERNAL SERVER ERROR
      return $this->sendEmptyResponse(Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // If everything is ok we return code NO_CONTENT
    return $this->sendEmptyResponse(Response::HTTP_NO_CONTENT);
  }
}
