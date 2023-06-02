<?php

namespace App\Http\Controllers;

use App\Models\Statistic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;


class StatisticController extends Controller
{
  public function list(): JsonResponse
  {

    // if user it's not logged
    if (!auth()->user()) {
      return $this->sendEmptyResponse(Response::HTTP_FORBIDDEN);
    }

    // get all statitics
    return response()->json(Statistic::all()->load('exercise')->where('user_id', auth()->user()->id)->sortByDesc('created_at')->groupBy(['created_at','exercise_id']),200);
  }

  /**
   * create statistics (bulk insert)
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
    
    // We transform json array get from the request to a php array
    for ($i = 0; $i < count($request->all()); $i++) {
      $relTarainingTags[] = [
        'set_number' => $request[$i]["set_number"],
        'repetitions' => $request[$i]["repetitions"],
        'weight' => $request[$i]["weight"],
        'score' => $request[$i]["score"],
        'comment' => $request[$i]["comment"],
        'user_id' => auth()->user()->id,
        'exercise_id' => $request[$i]["exercise_id"],
      ];
    }

    // We insert the array into the database
    Statistic::insert($relTarainingTags);

    // If everything is ok we send a succes response
    return $this->sendEmptyResponse(
      Response::HTTP_CREATED
    );
  }
}
