<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class articleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(["articles" => Article::all()]);
    }

    /**
     * Store a newly created resource in storage.
     * {
     *  "article": {
     *  "title": "How to train your dragon",
     *  "description": "Ever wonder how?",
     *  "body": "You have to believe",
     *  "tagList": ["reactjs", "angularjs", "dragons"]
     *  }
     * }
     */
    public function store(Request $request)
    {
        //JSON形式に変更
        $input = $request->getContent();
        $articleData = json_decode($input, true);

        $article = new Article();
        $article->title = $articleData['article']['title'];
        $article->description = $articleData['article']['description'];
        $article->body = $articleData['article']['body'];
        $article->save();

        $addTags = $articleData['article']['tagList'];
        if ($addTags === []) {
            //何もしない
        } else {
            //タグを記事と紐づけ、タグリストに登録
            foreach ($addTags as $addTag) {
                $tags = Tag::firstOrCreate(['name' => $addTag]);
                $tag_id = Tag::where('name', $addTag)->get(['id']);
                $article->tags()->attach($tag_id);
                $tags = null;
            }
        }

        return response()->json(["article" => $article]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
