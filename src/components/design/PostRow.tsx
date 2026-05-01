import type { Post } from '../../data/siteData';

interface PostRowProps {
  post: Post;
  showPinBadge?: boolean;
  onClick?: (id: string | number) => void;
}

export function PostRow({ post, showPinBadge = false, onClick }: PostRowProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(post.id);
  };

  return (
    <button className="post-row" onClick={handleClick}>
      <span className="post-cat mono" data-cat={post.cat}>{post.cat}</span>
      <span className="post-title serif">
        {showPinBadge && post.pinned && <span className="post-pin">PIN</span>}
        {post.title}
      </span>
      <span className="post-author">{post.author}</span>
      <span className="post-date">{post.date}</span>
      <span className="post-views" style={{ textAlign: 'right' }}>{post.views.toLocaleString()}</span>
    </button>
  );
}
