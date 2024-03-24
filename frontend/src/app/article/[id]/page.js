'use client';
import Link from 'next/link'
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Article = () => {
  const getParams = useSearchParams();
  const router = useRouter();
  const [ articleId, setArticleId ] = useState(getParams.get('id'));
  const [ detailArticle, setdetailArticle ] = useState([]);
  const [ tagList, setTagList ] = useState([]);
  const [ commentList, setCommentList ] = useState([]);
  const [ newComment, setNewComment ] = useState('');

  const getDetailArticle = async (article_id) => {
    const resArticle = await fetch(`http://localhost/api/article/${article_id}`, { next: { revalidate: 60 }});
    const result = await resArticle.json();

    return result;
  };

  const getArticleComment = async (article_id) => {
    const resComment = await fetch(`http://localhost/api/comments/${article_id}`, { cache: 'no-store' });
    const result = await resComment.json();

    return result;
  };

  const deleteArticle = async (article_id) => {
    const url = `http://localhost/api/delete/${article_id}`;

    try {
      await axios.delete(url, {withCredentials: true});
    } catch(error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    await deleteArticle(articleId);

    router.push('/');
    router.refresh();
  };

  const postComment = async (newComment, article_id) => {
    const comment = newComment;
    const postCommentData = { comment: { comment } };

    await axios.post(`http://localhost/api/createComment/${article_id}`, postCommentData, {withCredentials: true});
  };

  const handlePostComment = async (e) => {
    const nowCommentList = [...commentList, newComment];

    //再リロード防止
    e.preventDefault();

    try {
      await postComment(newComment, articleId);
    } catch(error) {
      return console.error(error);
    }

    setCommentList(nowCommentList);

    router.push(`/article/${articleId}?id=${articleId}`);
    router.refresh();
  };

  useEffect(() => {
    const fetchDetailData = async (articleId) => {
        try {
          //記事詳細とそれに付随するタグ一覧を取得
          const resArticleData = await getDetailArticle(articleId);
          setdetailArticle(resArticleData.article);
          setTagList(resArticleData.tags);

          //記事に対するコメントを取得
          const resCommentData = await getArticleComment(articleId);
          setCommentList(resCommentData.comments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchDetailData(articleId);
  }, []);

  return (
    <div className="article-page" key={detailArticle.id}>
      <div className="banner">
        <div className="container" id="header-title">
          <h1>{detailArticle.title}</h1>

          <div className="article-meta">
            <div className="info">
              <span className="date">{detailArticle.created_at}</span>
            </div>

            &nbsp;&nbsp;

            <button className="btn btn-sm btn-outline-secondary">
              <Link href={{ pathname:`/editor/edit`, query: { id: detailArticle.id }}}><i className="ion-edit"></i>Edit Article</Link>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12" id="main-page">
            <p>{detailArticle.body}</p>
            <ul className="tag-list">
              {tagList.map((tag, index) => (
                <li key={index} className="tag-default tag-pill tag-outline">{tag.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <div className="info">
              <span className="date">{detailArticle.created_at}</span>
            </div>

            &nbsp;
            <button className="btn btn-sm btn-outline-secondary">
              <Link href={{ pathname:`/editor/edit`, query: { id: detailArticle.id }}}><i className="ion-edit"></i>Edit Article</Link>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" method="get" action="">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  onChange={(e) => setNewComment(e.target.value)}
                >
                </textarea>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-primary" onClick={handlePostComment}>Post Comment</button>
              </div>
            </form>

            <div id="comments"></div>
            { commentList.map((comment, index) => (
              <div className="card" key={index}>
                <div className="card-block">
                  <p className="card-text">
                    {comment.body}
                  </p>
                </div>
                <div className="card-footer">
                  &nbsp;
                  <span className="date-posted">{comment.created_at}</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;