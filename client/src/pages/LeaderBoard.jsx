import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import Confetti from 'react-confetti';
import { RiCopperCoinFill } from 'react-icons/ri';
import { useWindowSize } from 'react-use'; // Optional hook for dynamic sizing
import axios from "axios";


const leaderboardData = [
  { rank: 1, name: 'Josh Rees', course: 'MCA', score: 300, image: '/path/to/image1.jpg' },
  { rank: 2, name: 'Jane Smith', course: 'MA', score: 280, image: '/path/to/image2.jpg' },
  { rank: 3, name: 'John Doe', course: 'CS', score: 275, image: '/path/to/image3.jpg' },
  { rank: 4, name: 'Sarah Connor', course: 'Bio', score: 260, image: '/path/to/image4.jpg' },
  { rank: 5, name: 'Mark Lee', course: 'Maths', score: 250, image: '/path/to/image5.jpg' },
  { rank: 6, name: 'Josh Rees', course: 'Maths', score: 240, image: '/path/to/image1.jpg' },
  { rank: 7, name: 'Jane Smith', course: 'Bio', score: 230, image: '/path/to/image2.jpg' },
  { rank: 8, name: 'John Doe', course: 'CS', score: 220, image: '/path/to/image3.jpg' },
  { rank: 9, name: 'Sarah Connor', course: 'MA', score: 210, image: '/path/to/image4.jpg' },
  { rank: 10, name: 'Mark Lee', course: 'CS', image: '/path/to/image5.jpg' },
];

const LeaderBoard = () => {
  const { width, height } = useWindowSize(); // Get window size for confetti sizing
  const topUser = leaderboardData[0]; // The first user in the list
  const [showConfetti, setShowConfetti] = useState(true);

  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState(""); // New state for course name

  const fetchUserData = async () => {
    try {
      const courseResponse = await axios.get(
        "http://localhost:8000/api/v1/users/data",
        {
          withCredentials: true,
        }
      );
      setSubjects(courseResponse.data.data.courseEnrollments[0].subjects);
      setCourse(courseResponse.data.data.courseEnrollments[0].courseName);
      console.log(courseResponse.data.data);
      
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    // Auto-hide the confetti after 5 seconds
    fetchUserData();
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex bg-gray-900 text-gray-200 min-h-screen">
      <SideMenu />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Leaderboard</h1>
        <div className="flex space-x-6">
          {/* Featured Card for the Top User (Left Side) */}
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md w-1/3 h-96 relative">
            {showConfetti && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
              </div>
            )}
            <div className="text-blue-400 text-xl font-semibold mb-2">1st Rank</div>
            <img src={topUser.image} alt={`${topUser.name}`} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-700" />
            <div className="text-2xl font-bold text-gray-100">{topUser.name}</div>
            <div className="text-sm text-gray-400">{topUser.course}</div>

            {/* Single Coin Icon for Top User */}
            <div className="text-yellow-400 text-xl mt-2">
              <RiCopperCoinFill color="yellow" size="1.5em" />
            </div>

            <div className="mt-4 text-4xl font-bold text-blue-400">{topUser.score}</div>
            <div className="text-gray-400">Points</div>
          </div>

          {/* Leaderboard List (Right Side) */}
          <div className="flex-1">
            <div className="space-y-4">
              {leaderboardData.slice(1).map((user) => (
                <div key={user.rank} className="flex items-center p-4 bg-gray-800 rounded-lg shadow">
                  <div className="text-xl font-bold mr-4 text-gray-300">{user.rank}</div>
                  <img src={user.image} alt={`${user.name}`} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-700" />
                  <div className="flex-grow">
                    <div className="text-lg font-semibold text-gray-100">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.course}</div>
                  </div>

                  {/* Single Coin Icon for Each User */}
                  <div className="text-yellow-400 text-lg">
                    <RiCopperCoinFill color="yellow" size="1.5em" />
                  </div>

                  <div className="ml-6 text-blue-400 font-semibold text-lg">Score {user.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
