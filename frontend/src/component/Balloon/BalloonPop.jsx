import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BalloonPop.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BalloonPop = () => {
    const [thought, setThought] = useState("");
    const [poppedThoughts, setPoppedThoughts] = useState([]);
    const [message, setMessage] = useState("");
    const [balloons, setBalloons] = useState([]);
    const [isPopAnimation, setIsPopAnimation] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // For calendar
    const [moodData, setMoodData] = useState({}); // Track number of bad moods for each date

    // Function to generate a new balloon with a random color
    const generateBalloon = () => {
        if (thought.trim() === "") {
            setMessage("Please enter a thought to create a balloon!");
            return;
        }

        const colors = ['#ff6f61', '#f8b400', '#4caf50', '#2196f3', '#9c27b0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newBalloon = {
            id: Math.random(),
            color: randomColor,
            text: thought,
        };

        setBalloons([...balloons, newBalloon]);
        setMessage("Click on the balloon to pop it!");
        setThought(""); // Clear input after creating a balloon
    };

    // Function to handle balloon pop
    const handlePop = (id) => {
        setIsPopAnimation(true); // Trigger the animation

        setTimeout(() => {
            // Find and remove the popped balloon
            const balloon = balloons.find((b) => b.id === id);
            if (balloon) {
                setPoppedThoughts([...poppedThoughts, balloon.text]);
                setBalloons(balloons.filter((b) => b.id !== id));

                // Update mood data for selected date
                if (selectedDate) {
                    const dateKey = selectedDate.toLocaleDateString();
                    const currentMoodCount = moodData[dateKey] || 0;
                    setMoodData({ ...moodData, [dateKey]: currentMoodCount + 1 });
                }

                setMessage("Great job! You've popped a worry!");
            }
            setIsPopAnimation(false); // Reset the animation state
        }, 500); // Wait for animation to finish before removing the balloon
    };

    // Prepare data for the graph
    const graphData = {
        labels: Object.keys(moodData), // Dates as labels
        datasets: [
            {
                label: "Bad Moods (Popped Balloons)",
                data: Object.values(moodData), // Corresponding mood counts
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="balloon-container">
            <h1>Thought Balloon Pop</h1>
            <p>Write your worry in the balloon and pop it away!</p>

            <input
                type="text"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Write your thought here..."
            />
            <button onClick={generateBalloon}>Create Balloon</button>

            {/* DatePicker for selecting a date */}
            <div className="date-picker">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="Select a date"
                    dateFormat="yyyy/MM/dd"
                />
            </div>

            {/* Display balloons dynamically */}
            <div className="balloon-display">
                {balloons.map((balloon) => (
                    <div
                        key={balloon.id}
                        className={`balloon ${isPopAnimation ? "popping" : ""}`}
                        style={{ backgroundColor: balloon.color }}
                        onClick={() => handlePop(balloon.id)}
                    >
                        {balloon.text}
                    </div>
                ))}
            </div>

            {/* Popped thoughts will be displayed here */}
            <div className="popped-thoughts">
                <h2>Popped Thoughts:</h2>
                {poppedThoughts.length > 0 ? (
                    poppedThoughts.map((thought, index) => (
                        <div key={index} className="popped-balloon">
                            💭 {thought}
                        </div>
                    ))
                ) : (
                    <p>No thoughts popped yet!</p>
                )}
            </div>

            {/* Feedback message */}
            <p className="message">{message}</p>

            {/* Display graph */}
            {Object.keys(moodData).length > 0 && (
                <div className="graph-container">
                    <h2>Mood Tracker (Bad Moods vs Dates)</h2>
                    <Line data={graphData} />
                </div>
            )}
        </div>
    );
};

export default BalloonPop;
