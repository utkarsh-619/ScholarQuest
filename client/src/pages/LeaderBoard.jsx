import React, { useEffect, useState } from 'react';
import SideMenu from '../components/sideMenu';
import Confetti from 'react-confetti';
import { RiCopperCoinFill } from 'react-icons/ri';
import { useWindowSize } from 'react-use';
import axios from "axios";

const LeaderBoard = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [topUser, setTopUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/lbddata",
        { withCredentials: true }
      );

      const data = response.data.data;
      data.sort((a, b) => b.auraPoints - a.auraPoints);
      setLeaderboardData(data);
      setTopUser(data[0]);
      
    } catch (err) {
      console.error("Failed to fetch leaderboard data:", err);
    }
  };

  useEffect(() => {
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
          {topUser && (
            <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md w-1/3 h-96 relative">
              {showConfetti && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                  <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
                </div>
              )}
              <div className="text-blue-400 text-xl font-semibold mb-2">1st Rank</div>
              <img src={topUser.profilePhoto} alt={`${topUser.username}`} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-700" />
              <div className="text-2xl font-bold text-gray-100">{topUser.username}</div>
              <div className="text-sm text-gray-400 uppercase text-center">{topUser.courseName}</div>
              <div className="text-yellow-400 text-xl mt-2">
                <RiCopperCoinFill color="yellow" size="1.5em" />
              </div>
              <div className="mt-4 text-4xl font-bold text-blue-400">{topUser.auraPoints}</div>
              <div className="text-gray-400">Points</div>
            </div>
          )}
          <div className="flex-1">
            <div className="space-y-4">
              {leaderboardData.length > 1 && leaderboardData.slice(1).map((user, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg shadow">
                  <div className="text-xl font-bold mr-4 text-gray-300">{index + 2}</div>
                  <img src={user.profilePhoto} alt={`${user.username}`} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-700" />
                  <div className="flex-grow">
                    <div className="text-lg font-semibold text-gray-100">{user.username}</div>
                    <div className="text-sm text-gray-400 uppercase">{user.courseName}</div>
                  </div>
                  <div className="text-yellow-400 text-lg">
                    <RiCopperCoinFill color="yellow" size="1.5em" />
                  </div>
                  <div className="ml-6 text-blue-400 font-semibold text-lg">Score {user.auraPoints}</div>
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
