import ProfileCard from "./Profilecard.jsx";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ProfileCard
        name="Aayush Saini"
        role="Full Stack Developer"
        image="https://randomuser.me/api/portraits/men/32.jpg"
        bio="Passionate about React, Node.js and building scalable apps."
      />
    </div>
  );
}

export default App;
