import React, { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData } from '../../Redux/slices/homeSlice';
import { fetchResumeData } from '@/Redux/slices/resumeSlice';
import menImage from '../../assets/men.png';
import HomeSkeleton from '../skeleton/HomeSkeleton';


function Home() {
  const dispatch = useDispatch();
  const { homeData,loading } = useSelector((store) => store.home);
  const { resumeData } = useSelector((store) => store.resume);
  const { currentMode } = useSelector((store) => store.mode);

  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    (async () => {
      await dispatch(fetchHomeData());
      await dispatch(fetchResumeData());
    })();
  }, [dispatch]);

  useEffect(() => {
    // Initialize AOS only once
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });

    // Optionally, you can handle AOS refresh here if needed
    // For example, call AOS.refresh() if the DOM updates significantly
  }, []);

  const downloadResume = () => {
    if (resumeData) {
      window.open(resumeData?.resumeImage?.secure_url, '_blank');
    } else {
      console.error('No resume URL found');
    }
  };

  const array = homeData?.position?.split(',');
  const [text] = useTypewriter({
    words: array,
    loop: true,
  });

  if (!loading) return <div className={` my-component flex flex-wrap justify-between px-5 md:px-32 md:py-[7.3rem] py-[3rem] gap-12 md:gap-0`}><HomeSkeleton/></div>;

  return (
    <>
      <section className={` my-component flex flex-wrap justify-between px-5 md:px-32 md:py-[7.3rem] py-[3rem] gap-12 md:gap-0`}>

      <div className="text-center md:text-left md:w-1/2 w-full">
          <div>
            <div data-aos="fade-right" className="mb-14 flex flex-col">
              <h1 className={``}>
                HELLO, MY NAME IS
              </h1>
              <div className="bg-blue-500 w-20 h-1 mt-2 rounded-full hidden md:flex hover:w-36 transition ease-in duration-500"></div>
            </div>
            <h1
              data-aos="fade-right"
              className={` title md:text-6xl text-5xl font-bold capitalize`}
            >
              {homeData?.heading || 'Md. Zaid'}
            </h1>
            <h3
              data-aos="fade-right"
              className="subTitle md:text-3xl text-xl font-medium mt-3"
            >
              And I'm a <span className="text-blue-500">{text}</span>
              <Cursor className="text-blue-500" />
            </h3>
            <p
              data-aos="fade-right"
              className="md:text-lg text-sm md:mt-10 mt-5"
            >
              {homeData?.summary ||
                `Passionate Computer Science Undergrad, Competitive Programmer | MERN Stack Enthusiast`}
            </p>

            <div className="mt-6">
              <button
                style={{
                  background: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)'
                }}
                className={`${currentMode === 'dark' ? 'border-slate-200' : 'border-gray-800 text-white'
                  } border rounded-full mr-4  transition-all duration-200 ease-in px-4 py-1 hover:scale-90`}
              >
                Hire Me
              </button>
              <button
                style={{
                  background: 'linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)'
                }}
                className={`${currentMode === 'dark' ? ' border-slate-200' : 'border-gray-800 text-white'} hover:scale-90 border rounded-full mr-4  transition-all duration-200 ease-in px-4 py-1`}
                onClick={downloadResume}
              >
                View CV
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-8 justify-center md:justify-start">
            <a
              href={homeData?.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="  border border-gray-800 text-blue-500 bg-white hover:bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full  hover:text-white transition duration-300 ease-in"
            >
              <FaGithub size={15} data-aos="fade-left" />
            </a>
            <a
              href={homeData?.linkdinLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" border border-gray-800 text-blue-500 bg-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
            >
              <FaLinkedin size={15} data-aos="fade-left" />
            </a>
            <a
              href={homeData?.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" border border-gray-800 text-blue-500 bg-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
            >
              <FaInstagram size={15} data-aos="fade-left" />
            </a>
            <a
              href={homeData?.letCodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="  border border-gray-800 text-blue-500 bg-white w-8 h-8  flex items-center justify-center rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300  ease-in"
            >
              <img
                src="https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=000000"
                alt="LeetCode"
                className=" w-6 h-6 rounded-full transition-all duration-300 ease-in"
              />
            </a>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center">
          <div style={{
            borderRadius: "81% 19% 46% 54% / 32% 19% 81% 68%   ",
          }} className=' bg-blue-600 w-[400px] h-[400px] overflow-hidden'>

            <img src={homeData?.homeImage?.secure_url || menImage} className='w-full h-full object-cover' />

          </div>

        </div>
         
      </section>
    </>
  );
}

export default Home;
