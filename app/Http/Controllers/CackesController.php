<?php

namespace App\Http\Controllers;

use App\Models\Cackes;
use App\Models\Ingredients;
use Illuminate\Http\Request;

class CackesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cackes = Cackes::with('Ingredients')
            ->where('Available', 1)
            ->get();

        return response()->json($cackes);
    }
    public function indexadm()
    {
        $cackes = Cackes::with('Ingredients')
            ->get();

        return response()->json($cackes);
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
            'type' => 'required|min:4|max:25',
            'size' => 'required',
            'Available' => 'required|min:0',
            'Image' => 'required|mimes:jpeg,png,jpg',
            'flavors' => 'required',
            'price' => 'required|min:0', // Añade validación de tipo de archivo si es necesario
        ]);


        if ($request->hasFile('Image')) {
            $imagePath = $request->file('Image')->store('Images', 'public');

            $auto = Cackes::create([
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
    public function show(Cackes $cacke)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cackes $cacke)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */ public function update(Request $request, $id)
    {
        $cacke = Cackes::find($id);

        if (!$cacke) {
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

            $cacke->update([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
                'size' => $request->size,
                'price' => $request->price,
                'flavors' => $request->flavors,
                "Image" => $imagePath,
                "Available" => $request->Available,
            ]);
        } else {


            $cacke->update([
                'name' => $request->name,
                'stock' => $request->stock,
                'type' => $request->type,
                'size' => $request->size,
                'Km' => $request->Km,
                'price' => $request->price,
                'Available' => $request->Available,
            ]);
        }

        return response()->json(['message' => 'Pastel actualizado correctamente', 'data' => $cacke]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        Cackes::destroy($id);
    }

    public function disable(Request $request, $id)
    {
        $cacke = Cackes::find($id);

        if (!$cacke) {
            return response()->json(['error' => 'Pastel no encontrado'], 404);
        }

        if ($request->hasFile('Image')) {
            $imagePath = $request->file('Image')->store('Images', 'public');
        }
        $cacke->Available = 0;
        $cacke->save();

        return response()->json(['message' => 'Pastel actualizado correctamente']);
    }
}
