import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import categories from '../utils/categories';
import Navbar from './Navbar';
import { setSelectedCategory } from '../redux/categorySlice';
import Menu from '../assets/Menu';
import logo from "../assets/ytLogo.png";
import { Link } from 'react-router-dom';
import { setSidebarExtendedValue } from '../redux/categorySlice';

function Sidebar() {
  const pageRoute = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { selectedCategory } = useSelector((state) => state.category); // Get selected category from Redux store
  const [sidebarExtended, setSidebarExtended] = useState(false); // Local state to track sidebar visibility

  return (
    <>
      {/* Render the Navbar component and pass sidebar state as props */}
      <Navbar sidebarExtended={sidebarExtended} setSidebarExtended={setSidebarExtended} />

      {/* Sidebar for larger screens */}
      <div className='absolute w-[10%] bg-[#fff] top-20 hidden sm:block'>
        <div className='gap-y-6 fixed z-20 flex flex-col'>
          {
            categories.map((e) => {
              // Render the sidebar items when extended
              if (sidebarExtended) {
                return (
                  <button
                    onClick={() => {
                      dispatch(setSelectedCategory(e.name)); // Update selected category in Redux store
                      if (e.name === "Home") {
                        pageRoute(`/`); // Navigate to the home page
                      } else {
                        pageRoute(`/feed/${e.name}`); // Navigate to the selected category's feed
                      }
                    }}
                    key={e.id}
                  >
                    <div
                      style={{
                        backgroundColor: selectedCategory === e.name ? "#f2f2f2" : "#fff",
                        borderRadius: selectedCategory === e.name ? "10px" : "0px"
                      }}
                      className='gap-x-4 flex items-center px-2 py-2 ml-2'
                    >
                      {selectedCategory === e.name ? e.active : e.icon}
                      <h4 className="text-md font-semibold tracking-wide">{e.name}</h4>
                    </div>
                  </button>
                )
              } else {
                // Render a compact sidebar item when not extended
                return (
                  <button
                    onClick={() => {
                      dispatch(setSelectedCategory(e.name)); // Update selected category in Redux store
                      if (e.name === "Home") {
                        pageRoute(`/`); // Navigate to the home page
                      } else {
                        pageRoute(`/feed/${e.name}`); // Navigate to the selected category's feed
                      }
                    }}
                    key={e.id}
                  >
                    <div
                      style={{
                        backgroundColor: selectedCategory === e.name ? "#f2f2f2" : "#fff",
                        borderRadius: selectedCategory === e.name ? "10px" : "0px"
                      }}
                      className='gap-x-4 flex items-center px-2 py-2 ml-2'
                    >
                      {selectedCategory === e.name ? e.active : e.icon}
                    </div>
                  </button>
                )
              }
            })
          }
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div className='block sm:hidden bg-[#ffff] top-0 fixed z-10 transition ease-in-out delay-150 h-[100vh]'>
        <div className={`${sidebarExtended ? "block" : "hidden"} flex items-center space-x-4 ml-3 -mt-4 pl-2`}>
          <button
            onClick={() => {
              dispatch(setSidebarExtendedValue(!sidebarExtended)); // Update sidebar state in Redux store
              setSidebarExtended(!sidebarExtended); // Toggle local sidebar state
            }}
          >
            <Menu />
          </button>
          <Link to='/'>
            <img className="w-32" src={logo} alt="Logo" />
          </Link>
        </div>

        <div className='gap-y-6 flex flex-col'>
          {
            categories.map((e) => {
              if (sidebarExtended) {
                return (
                  <button
                    onClick={() => {
                      dispatch(setSelectedCategory(e.name)); // Update selected category in Redux store
                      if (sidebarExtended) {
                        dispatch(setSidebarExtendedValue(false)); // Collapse the sidebar after selection
                        setSidebarExtended(false); // Update local sidebar state
                      }
                      if (e.name === "Home") {
                        pageRoute(`/`); // Navigate to the home page
                      } else {
                        pageRoute(`/feed/${e.name}`); // Navigate to the selected category's feed
                      }
                    }}
                    key={e.id}
                  >
                    <div
                      style={{
                        backgroundColor: selectedCategory === e.name ? "#f2f2f2" : "#fff",
                        borderRadius: selectedCategory === e.name ? "10px" : "0px"
                      }}
                      className='gap-x-4 flex items-center px-2 py-2 ml-2'
                    >
                      {selectedCategory === e.name ? e.active : e.icon}
                      <h4 className="text-md font-semibold tracking-wide">{e.name}</h4>
                    </div>
                  </button>
                )
              }
            })
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar;
