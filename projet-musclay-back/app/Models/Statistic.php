<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
  use HasFactory;
  public function exercise()
  {
    return $this->hasOne(
      Exercise::class,
      'id',
      'exercise_id',
    );
  }
}
