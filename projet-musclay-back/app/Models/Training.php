<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
  use HasFactory;
  public function tags()
  {
    return $this->hasManyThrough(
      Tag::class,
      Rel_trainings_tag::class,
      'training_id',
      'id',
      'id',
      'tag_id'
    );
  }

}
