'use client';
import LoginLinks from '@/app/LoginLinks'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';

// export const metadata = {
//     title: 'Laravel',
// }

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
								{/* <li className="nav-item">
									<Link className="nav-link" href="">Your Feed</Link>
								</li> */}
								<li className="nav-item">
									<Link className="nav-link active" href="">Global Feed</Link>
								</li>
							</ul>
						</div>
						<div id="article-list">
              {articleList.map((article) =>(
                <div className="article-preview" key={article.id}>
                    <div className="article-meta">
                      <div className="info">
                        <span className="date">{article.created_at}</span>
                      </div>
								    </div>
                    <Link href={{ pathname:`/article/${article.id}`, query: { id: article.id }}} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                        {/* <ul className="tag-list">
                          <li className="tag-default tag-pill tag-outline">realworld</li>
                          <li className="tag-default tag-pill tag-outline">implementations</li>
                        </ul> */}
                    </Link>
                </div>
              ))}

							{/* <ul className="pagination">
								<li className="page-item active">
                  <Link className="page-link" href="">1</Link>
								</li>
								<li className="page-item">
                  <Link className="page-link" href="">2</Link>
								</li>
							</ul> */}
						</div>
					</div>

					<div className="col-md-3">
						<div className="sidebar">
							<p>Popular Tags</p>

							<div className="tag-list" id="tag-Rank">
                {tagRankList.map((tag) => (
                  <Link href="#" className="tag-pill tag-default" key={tag.id}>{tag.name}</Link>
                ))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
