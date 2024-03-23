'use client';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Article = () => {
  const getParams = useSearchParams();
  const articleId = getParams.get('id');
  const [detailArticle, setdetailArticle] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [commentList, setCommentList] = useState([]);

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
            {/* <Link href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></Link> */}
            <div className="info">
              {/* <Link href="/profile/eric-simons" className="author">Eric Simons</Link> */}
              <span className="date">{detailArticle.created_at}</span>
            </div>
            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons <span className="counter">(10)</span>
            </button> */}
            &nbsp;&nbsp;
            {/* <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button> */}
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger">
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
              {tagList.map((tag) => (
                <li key={tag.id} className="tag-default tag-pill tag-outline">{tag.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            {/* <Link href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></Link> */}
            <div className="info">
            {/* <Link href="" className="author">Eric Simons</Link> */}
              <span className="date">{detailArticle.created_at}</span>
            </div>

            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button> */}
            &nbsp;
            {/* <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article <span className="counter">(29)</span>
            </button> */}
            <button className="btn btn-sm btn-outline-secondary" form="article-edit">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger" form="article-delete">
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" method="get" action="">
              <div className="card-block">
                <textarea id="post-comment" className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div className="card-footer">
                {/* <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" /> */}
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div id="comments"></div>
            { commentList.map((comment) => (
              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    {comment.body}
                  </p>
                </div>
                <div className="card-footer">
                  {/* <Link href="/profile/author" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </Link> */}
                  &nbsp;
                  {/* <Link href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</Link> */}
                  <span className="date-posted">{comment.created_at}</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            ))}
            {/* <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div className="card-footer">
                <Link href="/profile/author" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </Link>
                &nbsp;
                <Link href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</Link>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;