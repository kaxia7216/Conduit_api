'use client';
import LoginLinks from '@/app/LoginLinks'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import SideBar from './components/sideBar';
import ArticleList from './components/articleList';

const Home = () => {
  const [articleList, setArticleList] = useState([]);
  const [tagRankList, setTagRankList] = useState([]);

  const getArticleInfo = async () => {
    const res = await fetch('http://localhost/api/articles', { cache: 'no-store' });
    const result = await res.json();

    return result;
  };

  //useSWRにしたい
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getArticleInfo();
            setArticleList(response.articles);
            setTagRankList(response.tagRank);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    fetchData();
  }, []);
  
	return (
		<div className="home-page">
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">conduit</h1>
					<p>A place to share your knowledge.</p>
				</div>
			</div>

			<div className="container page">
				<div className="row">
					<div className="col-md-9">
						<div className="feed-toggle">
							<ul className="nav nav-pills outline-active">
								<li className="nav-item">
									<Link className="nav-link active" href="">Global Feed</Link>
								</li>
							</ul>
						</div>
            <ArticleList articleList={articleList} />
					</div>

					<div className="col-md-3">
            <SideBar tagRankList={tagRankList} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
