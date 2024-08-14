import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { getCategoryVideos } from '../redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import timeSince from '../utils/date';
import './feed.css';

function Feed() {
  const { id } = useParams(); // Get the category ID from the URL parameters
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const { categoryVideos } = useSelector((state) => state.category); // Get category videos from the Redux store
  const { sidebarExtend } = useSelector((state) => state.category); // Get sidebar state from Redux store

  useEffect(() => {
    // Fetch category videos when the component mounts or category ID changes
    dispatch(getCategoryVideos(`search?part=snippet&q=${id ? id : "Coding development"}`));

    // Set the document title based on the category or default to "Home - WatchBox"
    document.title = `${id ? id + "- WatchBox" : "Home - WatchBox"}`;
  }, [id, dispatch]);

  var aDay = 24 * 60 * 60 * 1000; // Define a day in milliseconds

  return (
    <>
      {/* Overlay effect when the sidebar is extended */}
      <div className={`sm:hidden overlayEffect ${sidebarExtend ? "block" : "hidden"}`}></div>

      {/* Video grid container with dynamic padding based on sidebar state */}
      <div className={`pl-0 ${sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"} feedGrid grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-x-[4%] pt-20 mx-3 sm:ml-4 md:pr-[28px] lg:pr-14 gap-y-6 max-w-[100%] bg-contain`}>
        {
          categoryVideos?.map((e, index) => {
            return (
              <div key={index} style={{ marginTop: index === 0 ? "0px" : "0px" }}>
                {/* Render VideoCard component for each video */}
                <VideoCard
                  key={index}
                  title={e.snippet.title}
                  thumbnail={e.snippet?.thumbnails?.medium?.url}
                  on={timeSince(new Date(Date.parse(e.snippet.publishedAt) - aDay))}
                  channel={e.snippet.channelTitle}
                  channelId={e.snippet.channelId}
                  videoId={e.id.videoId}
                />
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default Feed;
