<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;

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
                $article->tags()->sync($tag_id);
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
        //１件の記事とそのタグの取得
        $article = Article::firstWhere('id', $id);
        $setTags = $article->tags()->get();

        //コメントの取得
        $comments = $article->comments()->get();

        // return response()->json(["article" => $article, "tags" => $setTags, "comments" => $comments]);
        return response()->json(["article" => $article]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $input = $request->getContent();
        $articleData = json_decode($input, true);

        $updateArticle = Article::where('id', $id);
        $updateArticle->update(['title' => $articleData['article']['title']]);
        $updateArticle->update(['description' => $articleData['article']['theme']]);
        $updateArticle->update(['body' => $articleData['article']['text']]);

        $article = Article::firstWhere('id', $id);

        $editTags = $articleData['article']['tagList'];
        if ($editTags === []) {
            //何もしない
        } else {
            //タグ名があればidを取得、なければDBに登録
            $tagList = explode(" ", $editTags);

            foreach ($tagList as $tag) {
                $tags = Tag::firstOrCreate(['name' => $tag]);
                $tag_id = Tag::where('name', $tag)->get(['id']);
                $article->tags()->sync($tag_id);
                $tags = null;
            }
        }

        return response()->json(["article" => $article]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //articleに対応するコメントを削除
        $comments = Comment::where('article_id', $id);
        $comments->delete();

        //articleを削除
        $article = Article::firstWhere('id', $id);
        $article->delete();

        //取得したレコードのタグの紐づけを解除(中間テーブルの対応するレコードが削除)
        // $article->tags()->detach($articleTag_id);

        return response()->json([], 204);
    }

    public function addComment(Request $request, string $id)
    {
        //コメントを登録
        $input = $request->getContent();
        $commentData = json_decode($input, true);

        $comment = new Comment();
        $comment->article_id = $id;
        $comment->body = $commentData['comment']['comment'];
        $comment->save();

        return response()->json(["comment" => $comment]);
    }

    public function getComments(string $id)
    {
        //コメントリストを取得
        $comments = Comment::where('article_id', $id)->get();

        return response()->json(["comments" => $comments]);
    }

    public function destroyComment(string $id)
    {
        //コメントの削除
        $comment = Comment::firstWhere('id', $id);
        $comment->delete();

        return response()->json([], 204);
    }
}
