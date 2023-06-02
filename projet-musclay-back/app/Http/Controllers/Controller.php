<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  /**
   * Provide a centralized display of a JSON, with httpCode, to all Controllers
   *
   * @param mixed $data
   * @param int $httpCode
   *
   * @return JsonResponse
   */
  protected function sendJsonResponse($data, int $httpCode = Response::HTTP_OK): JsonResponse
  {
    return response()->json($data, $httpCode);
  }

  /**
   * Provide a centralized empty response, with httpStatusCode, to all Controllers
   *
   * @param int $httpCode
   *
   * @return Response
   */
  protected function sendEmptyResponse(int $httpCode = Response::HTTP_NO_CONTENT): Response
  {
    return response('', $httpCode);
  }
}
