<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cakes extends Model
{
    use HasFactory;
    protected $table = "cakes";

    public function Sale(): HasMany
    {
        return $this->hasMany(Sale::class, 'Id_foreign_keycakes', 'id');
    }

    public function Ingredients(): BelongsTo
    {
        return $this->belongsTo(Ingredients::class, 'Id_Ingredients_fk');
    }

    protected $fillable = [
        'Id_Ingredients_fk',
        'name',
        'stock',
        'type',
        'size',
        'Available',
        'Image',
        'flavors',
        'price',
    ];
}
