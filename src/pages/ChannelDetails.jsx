import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { getChannelVideos, getChannelDetails } from '../redux/channelSlice';
import convertToInternationalCurrencySystem from '../utils/convert';
import timeSince from '../utils/date';

function ChannelDetails() {
  const { id } = useParams(); // Get the channel ID from the URL parameters
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const { sidebarExtend } = useSelector((state) => state.category); // Get sidebar state from Redux store
  const { channelDetails } = useSelector((state) => state.channel); // Get channel details from Redux store
  const { channelVideos } = useSelector((state) => state.channel); // Get channel videos from Redux store
  var aDay = 24 * 60 * 60 * 1000; // Define a day in milliseconds

  useEffect(() => {
    // Fetch channel videos and details when the component mounts or channel ID changes
    dispatch(getChannelVideos(`search?channelId=${id}&part=snippet&order=date`));
    dispatch(getChannelDetails(`channels?part=snippet&id=${id}`));
  }, [id, dispatch]);

  return (
    <>
      {/* Overlay effect when the sidebar is extended */}
      <div className={`sm:hidden overlayEffect ${sidebarExtend ? "block" : "hidden"}`}></div>

      <div className={`pt-14 ml-4 pl-0 ${sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"}`}>
        {/* Channel banner image */}
        <img
          className='w-[100%] h-[120px] sm:h-[160px] lg:h-[210px] bg-cover'
          style={{ background: `url(${channelDetails?.brandingSettings?.image?.bannerExternalUrl})` }}
          alt="Channel Banner"
        />

        {/* Channel information section */}
        <div className='gap-x-5 flex items-center my-5'>
          {/* Channel profile image */}
          <img
            className='rounded-[40px] w-12 h-12 md:w-16 md:h-16'
            src={channelDetails?.snippet?.thumbnails?.medium?.url}
            alt="Channel Profile"
          />

          {/* Channel title and details */}
          <div className='flex flex-col'>
            <h3 className='text-md md:text-xl font-medium tracking-wide'>{channelDetails?.snippet?.title}</h3>
            <div className='flex flex-col'>
              {/* Channel custom URL */}
              <span className='text-[12px] md:text-[14px] tracking-wide font-[500] text-[#323232]'>
                {channelDetails?.snippet?.customUrl}
              </span>
              {/* Subscriber count */}
              <span className='text-[12px] md:text-[13px] tracking-wider -mt-1 font-[500] text-[#323232]'>
                {convertToInternationalCurrencySystem(channelDetails?.statistics?.subscriberCount)}
              </span>
            </div>
          </div>
        </div>

        {/* Channel videos section */}
        <div>
          <h4 className='text-[16px] text-[#585858] font-bold tracking-wider'>VIDEOS</h4>
          <div className='gap-x-5 gap-y-3 flex flex-wrap mt-3'>
            {
              channelVideos.map((e, index) => {
                return (
                  <VideoCard
                    key={index + 1}
                    thumbnail={e.snippet?.thumbnails?.medium?.url}
                    width="210px"
                    title={e.snippet.title}
                    channel={e.snippet.channelTitle}
                    on={timeSince(new Date(Date.parse(e.snippet.publishedAt) - aDay))}
                    channelId={e.snippet.channelId}
                    videoId={e.id.videoId}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ChannelDetails;
