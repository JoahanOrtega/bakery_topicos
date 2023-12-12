<?php

namespace App\Http\Controllers;

use App\Models\Cakes;
use App\Models\Ingredients;
use Illuminate\Http\Request;

class CakesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cakes = Cakes::with('Ingredients')
            ->where('Available', 1)
            ->get();

        return response()->json($cakes);
    }
    public function indexadm()
    {
        $cakes = Cakes::with('Ingredients')
            ->get();

        return response()->json($cakes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ingredients = Ingredients::all();
        return $ingredients;
    }

    public function store(Request $request)
    {
        $request->validate([
            'Id_Ingredients_fk' => 'required',
            'name' => 'required',
            'stock' => 'required|numeric|min:0',
            'type' => 'required',
            'size' => 'required',
            'Available' => 'required|min:0',
            'Image' => 'required|mimes:jpeg,png,jpg',
            'flavors' => 'required',
            'price' => 'required|min:0', // Añade validación de tipo de archivo si es necesario
        ]);


        if ($request->hasFile('Image')) {
            $imagePath = $request->file('Image')->store('Images', 'public');

            $cake = Cakes::create([
                'Id_Ingredients_fk' => $request->Id_Ingredients_fk,
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
                'size' => $request->size,
                'Available' => $request->Available,
                'Image' => $imagePath,
                'flavors' => $request->flavors,
                'price' => $request->price,
            ]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Cakes $cake)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cakes $cake)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */ public function update(Request $request, $id)
    {
        $cake = Cakes::find($id);

        if (!$cake) {
            return response()->json(['error' => 'Pastel no encontrado'], 404);
        }

        $request->validate([
            'name' => 'required',
            'stock' => 'required|numeric|min:0',
            'type' => 'required|min:4|max:25',
            'size' => 'required',
            'flavors' => 'required',
            'price' => 'required|min:0',

        ]);
        if ($request->hasFile('Image')) {
            $imagePath = $request->file('Image')->store('Images', 'public');

            $cake->update([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
                'size' => $request->size,
                'price' => $request->price,
                'flavors' => $request->flavors,
                'Image' => $imagePath,
                'Available' => $request->Available,
            ]);
        } else {


            $cake->update([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
                'size' => $request->size,
                'flavors' => $request->flavors,
                'price' => $request->price,
                'Available' => $request->Available,
            ]);
        }

        return response()->json(['message' => 'Pastel actualizado correctamente', 'data' => $cake]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        Cakes::destroy($id);
    }

    public function disable(Request $request, $id)
    {
        $cake = Cakes::find($id);

        if (!$cake) {
            return response()->json(['error' => 'Pastel no encontrado'], 404);
        }

        if ($request->hasFile('Image')) {
            $imagePath = $request->file('Image')->store('Images', 'public');
        }
        $cake->Available = 0;
        $cake->save();

        return response()->json(['message' => 'Pastel actualizado correctamente']);
    }
}
