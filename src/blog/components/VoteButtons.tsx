import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Magnet } from '../../components/Animations';

interface VoteButtonsProps {
  postId: number;
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  apiBase: string;
}

export default function VoteButtons({ postId, upvotes: initialUpvotes, downvotes: initialDownvotes, userVote: initialUserVote, apiBase }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: 'up' | 'down') => {
    if (isVoting) return;
    setIsVoting(true);

    try {
      const res = await fetch(`${apiBase}/api/blog/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType: type }),
      });

      if (res.ok) {
        const data = await res.json();
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
        setUserVote(data.userVote);
      }
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase font-bold tracking-widest opacity-60 mr-2">
        Reactions
      </span>
      <Magnet strength={0.1}>
        <button
          onClick={() => handleVote('up')}
          disabled={isVoting}
          className={`flex items-center gap-2 neo-border px-3 py-2 transition-colors font-mono text-xs font-bold ${
            userVote === 'up'
              ? 'bg-neo-blue text-paper-bg neo-brutal-shadow'
              : 'bg-paper-bg hover:bg-neo-blue/20'
          }`}
        >
          <ThumbsUp size={14} className={userVote === 'up' ? 'fill-current' : ''} />
          {upvotes}
        </button>
      </Magnet>
      
      <Magnet strength={0.1}>
        <button
          onClick={() => handleVote('down')}
          disabled={isVoting}
          className={`flex items-center gap-2 neo-border px-3 py-2 transition-colors font-mono text-xs font-bold ${
            userVote === 'down'
              ? 'bg-neo-pink text-paper-bg neo-brutal-shadow'
              : 'bg-paper-bg hover:bg-neo-pink/20'
          }`}
        >
          <ThumbsDown size={14} className={userVote === 'down' ? 'fill-current' : ''} />
          {downvotes}
        </button>
      </Magnet>
    </div>
  );
}
