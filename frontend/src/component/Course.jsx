import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import list from "../list.json";
import Cards from './Cards';

function Course() {
  const filterData = list;

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-semibold px-7 py-9">Let's Grow Together</h1>
        <p>
          Let's Begin your Journey with us, complete daily tasks, solve quizzes, and be yourself. 
          Start memorizing everything, check where you stand, what you want, what can be done, play games, and track your progress.
        </p>
      </div>

      {/* Cards Section */}
      <div>
        <Slider {...settings}>
          {filterData.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </Slider>
      </div>

      {/* Removing Blank Space after Cards */}
      <div className="pb-2"></div> {/* Reduce or remove padding */}
    </div>
  );
}

export default Course;
