<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;

class articleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //一覧取得
        $tagRanking = Tag::withCount('articles')
        ->orderBy('articles_count', 'desc')
        ->limit(10)
        ->get();

        return response()->json(["articles" => Article::all(), "tagRank" => $tagRanking]);
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

        $article = null;
        $article = new Article();
        $article_id = $article->latest('id')->first();

        $addTags = $articleData['article']['tagList'];
        if ($addTags === "") {
            //何もしない
        } else {
            //タグを記事と紐づけ、タグリストに登録
            foreach ($addTags as $addTag) {
                $tags = Tag::firstOrCreate(['name' => $addTag]);
                $tag_id = Tag::where('name', $addTag)->get(['id']);
                $article_id->tags()->attach($tag_id);
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

        return response()->json(["article" => $article, "tags" => $setTags]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //記事の更新
        $input = $request->getContent();
        $articleData = json_decode($input, true);

        $updateArticle = Article::where('id', $id);
        $updateArticle->update(['title' => $articleData['article']['title']]);
        $updateArticle->update(['description' => $articleData['article']['description']]);
        $updateArticle->update(['body' => $articleData['article']['body']]);

        $article = Article::firstWhere('id', $id);

        $editTags = $articleData['article']['tagList'];

        if ($editTags === "") {
            //何もしない
        } else {
            //タグ名があればidを取得、なければDBに登録
            foreach ($editTags as $tag) {
                $tags = Tag::firstOrCreate(['name' => $tag]);
                $tag_id = Tag::where('name', $tag)->get(['id']);
                $article->tags()->attach($tag_id);
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

    public function deleteTagFromArticle(string $article_id, string $tag_id)
    {
        //対象記事のタグの紐づけ解除
        $article = Article::firstWhere('id', $article_id);

        //取得したレコードのタグの紐づけを解除(中間テーブルの対応するレコードが削除)
        $article->tags()->detach($tag_id);

        return response()->json([ 'detachedArticle' => $article ]);
    }
}
