// src/ProfileCard.jsx
function ProfileCard({ name, role, image, bio }) {
  return (
    <div className="p-4 max-w-sm bg-white shadow-lg rounded-2xl text-center">
      <img 
        src={image} 
        alt={name} 
        className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
      />
      <h2 className="text-xl font-semibold mt-3">{name}</h2>
      <p className="text-gray-500">{role}</p>
      <p className="mt-2 text-sm text-gray-600">{bio}</p>
    </div>
  );
}

export default ProfileCard;
