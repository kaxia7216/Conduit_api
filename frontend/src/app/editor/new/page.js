'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const Editor = () => {
  const router = useRouter();
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
  const [ tags, setTags ] = useState('');

  const postArticle = async ( title, description, body, tags ) => {
    const tagsStr = tags;
    const tagList = tagsStr.split(' ');
    const postData = { article: { title, description, body, tagList } };

    //クッキーからトークンの取得
    // const response = await fetch('http://localhost/sanctum/csrf-cookie', {
    //   credentials: 'include'
    // });
    // console.log(response);

    //DBにPOSTして記事を保存
    // const res = await fetch(`http://localhost/api/create`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     // 'X-CSRF-TOKEN': response,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(postData),
    // });

    await axios.post(`http://localhost/api/create`, postData, {withCredentials: true});

    // if (!res.ok) {
    //   throw new Error('エラーが発生しました');
    // }
    
    // const postedArticle = await res.json();
    // return postedArticle;
  };

  const submitArticle = async (e) => {
    //再リロード防止
    e.preventDefault();

    await postArticle(title, description, body, tags);

    //リダイレクト
    router.push('/');
    router.refresh();
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {/* <ul className="error-messages">
              <!-- <li>That title is required</li> -->
            </ul> */}
            <form onSubmit={submitArticle}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    id="title"
                    type="text"
                    className="form-control form-control-lg" 
                    placeholder="Article Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    id="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    id="body"
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    onChange={(e) => setBody(e.target.value) }
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input 
                    id="tagList"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <div className="tag-list">
                    <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;