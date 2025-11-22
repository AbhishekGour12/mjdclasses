import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import url from '../misc/url';
// import { ProfileContext } from '../profilecontext';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
// import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ username, profile, logout }) {
    const [courses, setCourses] = useState();
    const [courses1, setCourses1] = useState();
    const [filter, setFilter] = useState();
    const Navigate = useNavigate()

    let data = async () => {
        let result = await axios.post(`${url}course_detail`);

        let array = result.data;
        setFilter(result.data)
        let array1 = [];
        console.log(array)
        for (let i = 0; i < array.length; i++) {
            let match = false;
            for (let j = 0; j < array1.length; j++) {
                if (array[i].type == array[j].type) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                array1.push(array[i].type);
            }
        }


        let array2 = [];
        for (let i = 0; i < array1.length; i++) {
            let match = false;
            for (let j = 0; j < array2.length; j++) {
                if (array1[i] == array2[j]) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                array2.push(array1[i]);
            }
        }
        console.log(array2)
        setCourses(array2)

    }



    useEffect(() => {

        data();

        console.log(profile)
        const handleResize = () => {
            if (window.innerWidth > 1276) {
                document.querySelector('.sidebar').style.display = 'none';
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);


    }, [])
    let courses_type = (e) => {
        let array = [];

        for (let i = 0; i < filter.length; i++) {
            if (filter[i].type == e) {
                array.push(filter[i].title)

            }
        }
        console.log(array)
        setCourses1(array)
        document.querySelector('.sidebar-details').style.display = "none"
        document.querySelector('.course-type').style.display = "block"

    }

    function course_modal() {
        document.querySelector('.sidebar-details').style.display = "block"
        document.querySelector('.course-type').style.display = "none"

    }
    let search = async (course) => {

        let result = await axios.get(`${url}searchcourses/${course}/searchcourses/${course}`);
        if (result.data.success) {
            localStorage.setItem("id", result.data.id)
            Navigate('/courses')
            document.querySelector('.sidebar').style.display = "none"
        }

    }


    return (
        <div className='sidebar modal border h-full w-full hidden'>
            <div id="sidebar" className=' opacity mt-0 '>
                <div className='sidebar-details'>


                    <div className='sidebar-top p-3 border-b-2 border-gray-300'>
                        {profile ? <div className='  pl-3 text-purple-500 font-bold text-base title'>
                            {username}

                        </div> : <div className='  pl-3 text-purple-500 font-bold text-base hover:cursor-pointer'>
                            <Link to="/login" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}>Login</Link>
                        </div>}
                        {profile ? <div className=' mt-3 pl-3 text-purple-500 font-bold text-base  hover:cursor-pointer' onClick={logout}>
                            Log out
                        </div> : <div className=' mt-3 pl-3 text-purple-500 font-bold text-base  hover:cursor-pointer'>
                            Signup
                        </div>}
                        <div className=' mt-3 pl-3 text-purple-500 font-bold text-base hover:cursor-pointer'>
                            <Link to="/resume" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}> Edit Resume </Link>
                        </div>
                        <div className=' mt-3 pl-3 text-purple-500 font-bold text-base hover:cursor-pointer'>
                            <Link to="/quiz" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}> Quiz </Link>
                        </div>
                        <div className=' mt-3 pl-3 text-purple-500 font-bold text-base hover:cursor-pointer'>
                            <Link to="/business" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}> Business </Link>
                        </div>
                        <div className=' mt-3 pl-3 text-purple-500 font-bold text-base hover:cursor-pointer'>
                            <Link to="/planpricing" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}> Plan & Pricing </Link>
                        </div>

                    </div>
                    <div className='sidebar-middel-section p-3 border-b'>
                        <p className='text-gray-600 font-bold text-lg'>Most Popular</p>
                        <div className='courses'>
                            {courses ? courses.map(Element => (
                                <div className=' mt-3 flex justify-between item-center hover:cursor-pointer ' >
                                    <div className='flex justify-start' onMouseOver={() => courses_type(Element)}>
                                        <i className='fa-solid fa-angle-left   text-gray-400 text-lg' ></i>


                                    </div>
                                    <div className='font-semibold text-base text-center flex justify-end  hover:cursor-pointer'>
                                        {Element}
                                    </div>

                                </div>

                            )) : ''}


                        </div>



                    </div>
                    <div className='sidebar-bottom p-3'>
                        <div className='mt-3 font-bold text-lg text-gray-500'>
                            More from Tech Temple

                        </div>

                        <div className='mt-3 text-gray-400 text-lg font-semibold'>
                            <Link to="/successstories" onClick={() => { document.querySelector('.sidebar').style.display = "none" }}>Success Stories</Link>

                        </div>
                        <div className='mt-3 text-gray-400 text-lg font-semibold'>
                            Help & Support

                        </div>

                    </div>
                </div>cd 

                <div className='course-type hidden w-full h-full'>
                    <div className='flex p-3 bg-purple-500' onClick={course_modal}>
                        <i className='fa-solid fa-angle-left   text-white text-lg'></i>
                        <div className='ml-3 font-bold text-lg  text-white'>
                            Menu
                        </div>

                    </div>
                    <div className='mt-3 p-3'>
                        {courses1 ? courses1.map(Element => (
                            <div className='mt-3 hover:cursor-pointer' onClick={() => search(Element)}>
                                {Element}
                            </div>

                        )) : ''}

                    </div>

                </div>





            </div>

        </div>
    )
}
