import Link from 'next/link';

const ArticleList = ({articleList}) => {
    return (
        <div id="article-list">
            {articleList.map((article, index) =>(
                <div className="article-preview" key={index}>
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
    );
};

export default ArticleList;