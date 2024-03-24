import Link from 'next/link'

const TagRankList = ({tagRankList}) => {
    return (
        <div className="tag-list" id="tag-Rank">
            {tagRankList.map((tag, index) => (
                <Link href="#" className="tag-pill tag-default" key={index}>{tag.name}</Link>
            ))}
        </div>
    );
};

export default TagRankList;