import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchById } from '../redux/searchSlice';
import timeSince from '../utils/date';
import { useNavigate } from 'react-router-dom';

function SearchFeed() {
  const { id } = useParams(); // Get the search query from the URL parameters
  const { searchResults } = useSelector((state) => state.search); // Get search results from the Redux store
  const { sidebarExtend } = useSelector((state) => state.category); // Get the sidebar state from the Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const pageRoute = useNavigate(); // Hook to programmatically navigate between routes

  var aDay = 24 * 60 * 60 * 1000; // Define a day in milliseconds

  useEffect(() => {
    // Dispatch the searchById action to fetch search results based on the search query
    dispatch(searchById(`search?part=snippet&q=${id}`));
  }, [id, dispatch]);

  return (
    <>
      {/* Overlay effect when the sidebar is extended */}
      <div className={`sm:hidden overlayEffect ${sidebarExtend ? "block" : "hidden"}`}></div>

      {/* Container for displaying search results with dynamic padding based on sidebar state */}
      <div className={`pl-0 ${sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"} pt-20 ml-4 w-100% flex flex-col gap-y-5`}>
        {
          searchResults.map((e, index) => {
            return (
              <div key={index * 2} className='flex flex-col gap-y-3 sm:flex-row gap-x-4 md:gap-x-8 w-[98%] justify-center cursor-pointer sm:mx-0'>
                {/* Thumbnail image of the video, navigates to the video page when clicked */}
                <img 
                  onClick={() => pageRoute(`/watch/${e.id?.videoId}`)} 
                  className='w-[97%] sm:w-[29%] md:w-[25%] sm:rounded-[23px]' 
                  src={e.snippet?.thumbnails?.medium?.url} 
                />
                
                {/* Details of the video such as title, channel, and description */}
                <div className='w-[92%] sm:w-[60%] md:w-[70%] lg:w-[60%]'>
                  <h3 className='text-md sm:text-lg md:text-xl traking-wide font-normal text-[#0f0f0f] leading-[19px] sm:leading-[22px] md:leading-[24px]'>
                    {e.snippet?.title}
                  </h3>
                  <span className='text-[#606060] text-[12px]'>{timeSince(new Date(Date.parse(e.snippet?.publishedAt) - aDay))}</span>
                  <h4 
                    onClick={() => pageRoute(`/channel/${e.snippet?.channelId}`)} 
                    className='font-medium text-[#606060] text-[12px] sm:my-1'
                  >
                    {e.snippet?.channelTitle}
                  </h4>
                  <p 
                    onClick={() => pageRoute(`/watch/${e.id?.videoId}`)} 
                    className='traking-wider font-normal text-[10px] sm:text-[#0f0f0f] text-[13px] leading-[16px]'
                  >
                    {e.snippet?.description?.slice(0, 124) + "..."}
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  )
}

export default SearchFeed;
