'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (key) => {
  const resArticle = await fetch(key, { cache: 'no-store' });
  const result = await resArticle.json();

  return result;
}

const Editor = () => {
  const router = useRouter();
  const getParams = useSearchParams();
  const article_id = getParams.get('id');

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ body, setBody ] = useState('');
  const [ newTags, setNewTags ] = useState('');
  const { data, error, isLoading } = useSWR(`http://localhost/api/article/${article_id}`, fetcher);

  const putArticle = async (article_id, title, description, body, tags) => {
    const tagsStr = tags;
    const tagList = tagsStr.split(' ');
    const putData = { article: { title, description, body, tagList } };

    const res = await axios.put(`http://localhost/api/edit/${article_id}`, putData, {withCredentials: true});
  };

  const handlePut = async (e) => {
    //再リロード防止
    e.preventDefault();

    await putArticle(article_id, title, description, body, newTags);

    //リダイレクト
    router.push('/');
    router.refresh();
  };

  const deleteTag = async (article_id, tag_id) => {
    //axios
    await axios.delete(`http://localhost/api/tag-delete/${article_id}&${tag_id}`, {withCredentials: true});
  };

  const handleDeleteTag = async (article_id, tag_id) => {
    //再リロード防止
    // e.preventDefault();

    await deleteTag(article_id, tag_id);

    //リダイレクト
    router.push(`/editor/edit?id=${article_id}`);
    router.refresh();
  };

  if (error) return <div>エラーです</div>;
  if(isLoading) return <div>読み込み中...</div>;

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {/* <ul className="error-messages">
              <!-- <li>That title is required</li> -->
            </ul> */}
            <form onSubmit={handlePut} key={data?.article.id}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    id="title"
                    type="text"
                    className="form-control form-control-lg" 
                    defaultValue={data?.article.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    id="description"
                    type="text"
                    className="form-control"
                    defaultValue={data?.article.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    id="body"
                    className="form-control"
                    rows="8"
                    defaultValue={data?.article.body}
                    onChange={(e) => setBody(e.target.value) }
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input 
                    id="tagList"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                  <div className="tag-list">
                    {data?.tags.map((tag, index) => (
                      <span className="tag-default tag-pill" key={index} onClick={() => {handleDeleteTag(data?.article.id, tag.id)}}>
                        <i className="ion-close-round"></i> {tag.name}
                      </span>
                    ))}
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