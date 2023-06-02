<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exercise;

class Muscle_group extends Model
{
  use HasFactory;

  public function exercises()
  {
    return $this->hasManyThrough(
      Exercise::class,
      Rel_exercises_musclegroup::class,
      'muscle_group_id',
      'id',
      'id',
      'exercise_id'
    );
  }
}
