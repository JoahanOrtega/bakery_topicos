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
    public function Cakes(): HasMany
    {
        return $this->hasMany(Cakes::class, 'Id_Ingredients_fk', 'id');
    }
}
