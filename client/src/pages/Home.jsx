import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Carousel } from 'flowbite-react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=2');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className='min-h-screen mt-14 overflow-auto'>
      <div className='pt-1 mt-5 mb-10 max-w-7xl mx-auto h-72 sm:h-96 xl:h-[484px] 2xl:h-[583px]'>
        <Carousel slideInterval={2500} pauseOnHover>
          <img
            src='https://st2.depositphotos.com/1000423/9888/i/950/depositphotos_98884116-stock-photo-high-technology-blue-background.jpg'
            alt='...'
          />
          <img
            src='https://st2.depositphotos.com/1907633/8862/i/950/depositphotos_88627992-stock-photo-business-man-hand-working-on.jpg'
            alt='...'
          />
          <img
            src='https://st.depositphotos.com/1000423/1335/i/950/depositphotos_13350411-stock-photo-image-of-light-blue-planet.jpg'
            alt='...'
          />
          <img
            src='https://static8.depositphotos.com/1000816/870/i/950/depositphotos_8704647-stock-photo-business-handshake-with-company-team.jpg'
            alt='...'
          />
          <img
            src='https://static9.depositphotos.com/1029473/1190/i/950/depositphotos_11900496-stock-photo-networking-and-internet-concept.jpg'
            alt='...'
          />
        </Carousel>
      </div>
      <div className='p-3 bg-gray-700 dark:bg-slate-700  mx-auto max-w-4xl rounded-tl-3xl rounded-br-3xl'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
