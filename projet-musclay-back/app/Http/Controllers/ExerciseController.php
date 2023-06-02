<?php

namespace App\Http\Controllers;

use App\Models\Muscle_group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
  /**
   * Get all exercises whith their muscle groups
   *
   * @return JsonResponse
   */
  public function list(): JsonResponse
  {
    return $this->sendJsonResponse(Muscle_group::all()->load('exercises'));
  }
}
