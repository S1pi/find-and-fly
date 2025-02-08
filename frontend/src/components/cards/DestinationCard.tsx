const DestinationCard = () => {
  return (
    // Basic container for a destination card
    <div className="bg-primary h-74 w-44 rounded-lg">
      {/* Container for image */}
      <div className="bg-[url('../public/img/landscape-3846391_1280.jpg')] bg-cover bg-center h-50 rounded-t-lg"></div>
      {/* Container for text and stars */}
      <div>
        <h1>Destination Name</h1>
        <div>⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  );
};

export default DestinationCard;
