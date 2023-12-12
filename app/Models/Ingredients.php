<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ingredients extends Model
{
    use HasFactory;

    protected $table = "ingredients";
    protected $fillable = [
        'Desc'
    ];
    public function Cackes(): HasMany
    {
        return $this->hasMany(Cackes::class, 'Id_Ingredients_fk', 'id');
    }
}
