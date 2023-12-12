<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cackes extends Model
{
    use HasFactory;
    protected $table = "cackes";

    public function Sale(): HasMany
    {
        return $this->hasMany(Sale::class);
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
