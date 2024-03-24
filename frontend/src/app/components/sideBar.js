import Link from 'next/link'
import TagRankList from './tagRankList';

const SideBar = ({tagRankList}) => {
    return (
        <div className="sidebar">
            <p>Popular Tags</p>
            <TagRankList tagRankList={tagRankList} />
        </div>
    );
};

export default SideBar;