<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cakes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('Id_Ingredients_fk');
            $table->string('name');
            $table->integer('stock');
            $table->String('type');
            $table->String('size');
            $table->integer('Available');
            $table->String('Image',250);
            $table->string('flavors',250);
            $table->decimal('price', 10, 2);
            $table->timestamps();
            $table->foreign('Id_Ingredients_fk')->references('id')->on('ingredients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cakes');
    }
};
