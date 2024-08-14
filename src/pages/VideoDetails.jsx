import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoDetails, getRelatedVideos } from '../redux/videoSlice';
import ReactPlayer from 'react-player';
import { FiThumbsUp } from "react-icons/fi";
import timeSince from '../utils/date';
import convertToInternationalCurrencySystem from '../utils/convert';

// Component to render individual video card with thumbnail, title, and channel information
const Video = (props) => {
  const pageRoute = useNavigate(); // Hook to navigate between routes

  return (
    <div className='flex flex-col sm:flex-row w-[98%] sm:w-[90%] sm:items-center sm:items-start gap-x-4 cursor-pointer'>
      <img
        alt="Video Thumbnail"
        onClick={() => pageRoute(`/watch/${props.videoId}`)}
        className='w-[100%] sm:w-[210px] sm:h-[110px] bg-cover'
        src={props.thumbnail}
      />
      <div>
        <h3
          onClick={() => pageRoute(`/watch/${props.videoId}`)}
          className='text-[15px] md:text-[16px] lg:text-[18px] font-medium tracking-wide text-[#000000] md:leading-[24px] w-[100%] sm:w-[110%]'
        >
          {props.title}
        </h3>
        <div onClick={() => pageRoute(`/channel/${props.channelId}`)} className='sm:mt-1'>
          <p className='text-[#606060] text-[13.5px] font-[500] tracking-wide'>{props.channel}</p>
          <p className='text-[#606060] text-[13.5px] font-medium tracking-wider -mt-1'>{props.on}</p>
        </div>
      </div>
    </div>
  );
};

function VideoDetails() {
  const { sidebarExtend } = useSelector((state) => state.category); // Get the sidebar state from the Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const { id } = useParams(); // Get the video ID from the URL parameters
  const { videoDetails } = useSelector((state) => state.video); // Get video details from the Redux store
  const { relatedVideos } = useSelector((state) => state.video); // Get related videos from the Redux store
  var aDay = 24 * 60 * 60 * 1000; // Define a day in milliseconds
  const pageRoute = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    // Fetch video details and related videos whenever the video ID changes
    dispatch(getVideoDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(getRelatedVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`));
  }, [id, dispatch]);

  return (
    <>
      {/* Overlay effect when the sidebar is extended */}
      <div className={`sm:hidden overlayEffect ${sidebarExtend ? "block" : "hidden"}`}></div>

      {/* Main container for video player and video details */}
      <div className={`pl-0 ${sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"} pt-20 ml-4 lg:flex lg:gap-x-7`}>
        {/* Video player container */}
        <div className='w-[96%] lg:max-w-[850px] h-[240px] sm:h-[320px] lg:h-[430px] container'>
          <ReactPlayer
            width="100%"
            height="100%"
            className='react-player'
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
          />
          <div>
            <div className='gap-x-1 flex'>
              {/* Display video tags (limited to 4 tags) */}
              {
                videoDetails?.snippet?.tags?.map((e, index) => {
                  return <a style={{ display: index > 3 ? "none" : "" }} className="text-[#3366CC] text-[13px] font-normal" href={`${e}`}>{e?.slice(0, 15)}</a>;
                })
              }
            </div>
            <h2 className='text-md sm:text-xl md:text-2xl text-[#000000] font-medium'>{videoDetails?.snippet?.title}</h2>
            <div className='sm:flex items-center justify-between mt-3 space-y-3'>
              <h5
                onClick={() => pageRoute(`/channel/${videoDetails?.snippet?.channelId}`)}
                className='w-fit text-sm sm:text-md font-medium text-[#000000] px-3 py-2 rounded-[10px] bg-[#f2f2f2] tracking-wide'
              >
                {videoDetails?.snippet?.channelTitle}
              </h5>
              <div className='gap-x-3 sm:mb-0 flex items-center mb-5'>
                <div className='flex items-center bg-[#f2f2f2] px-3 py-2 rounded-[10px]'>
                  <FiThumbsUp className='w-10 h-6' />
                  <span className='text-[12.4px] sm:text-[14.4px] text-[#0f0f0f] font-medium tracking-wide'>
                    {convertToInternationalCurrencySystem(videoDetails?.statistics?.likeCount) + " Likes"}
                  </span>
                </div>
                <span className='text-[12.4px] sm:text-[14.4px] text-[#0f0f0f] font-medium tracking-wide bg-[#f2f2f2] px-3 py-2 rounded-[10px]'>
                  {convertToInternationalCurrencySystem(videoDetails?.statistics?.viewCount) + " Views"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Container for related videos */}
        <div className='gap-y-4 sm:mt-40 lg:mt-0 flex flex-col mt-48'>
          {
            relatedVideos?.map((e, index) => {
              return (
                <Video
                  key={index + 2}
                  thumbnail={e.snippet?.thumbnails?.medium?.url}
                  width="210px"
                  title={e.snippet.title}
                  channel={e.snippet.channelTitle}
                  on={timeSince(new Date(Date.parse(e.snippet.publishedAt) - aDay))}
                  channelId={e.snippet.channelId}
                  videoId={e.id.videoId}
                />
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
