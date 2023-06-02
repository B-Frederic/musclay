<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class TagController extends Controller
{
  /**
   * Get all exercises whith their muscle groups
   *
   * @return JsonResponse
   */
  public function list(): JsonResponse
  {
    // get all tags
    return $this->sendJsonResponse(Tag::all());
  }
}
