import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white">
      <div className="max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-12 my-6">
        {/* About Us Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          About Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">GrowMind</span> is a platform dedicated to nurturing children's mental well-being. 
          We aim to offer an interactive and engaging experience for children while enabling parents, educators, and healthcare specialists to monitor their mental health progress.
        </p>

        {/* Our Purpose */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600 dark:text-indigo-400">
          Our Purpose
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          At GrowMind, we believe that a child’s mental health is just as important as their physical health. Mental well-being directly influences their ability to learn, grow, and interact with others. Our platform combines fun and educational activities like quizzes, daily tasks, memory games, mood tracking, and a to-do list to ensure that children can enjoy the process of mental development.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          We also understand that monitoring mental progress is not only the responsibility of the child, but also of their caregivers. Therefore, we’ve created a system where parents and healthcare professionals can track, evaluate, and take the necessary steps to support a child's mental development.
        </p>

        {/* Features for Children */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600 dark:text-indigo-400">
          Features for Children
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6">
          <li><strong>Quizzes:</strong> Engage in fun quizzes designed to challenge and stimulate cognitive development.</li>
          <li><strong>Daily Tasks:</strong> Daily tasks that promote responsibility and a structured routine.</li>
          <li><strong>Memory Games:</strong> Play interactive memory games that help improve focus and memory retention.</li>
          <li><strong>To-Do List:</strong> Organize tasks and goals to promote productivity and responsibility.</li>
          <li><strong>Mood Tracker:</strong> Track emotions and moods to understand feelings and mental state better.</li>
        </ul>

        {/* Features for Parents and Specialists */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600 dark:text-indigo-400">
          For Parents and Healthcare Specialists
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Parents and healthcare specialists play a critical role in a child’s mental health journey. Through our platform, parents can monitor their child's mood, progress in daily tasks, quiz results, and games. This allows them to have a clear understanding of their child’s mental state and take necessary actions if needed.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          For healthcare specialists, GrowMind provides an easy-to-use interface for evaluating the mental health of children over time. This data-driven approach aids in offering better support for children, enabling specialists to intervene and help as required.
        </p>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Join us in making mental well-being a priority for children. Together, we can empower the next generation to grow healthy, both mentally and physically.
          </p>
          <a href="/" className="text-white bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-full text-lg transition-all duration-300">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
