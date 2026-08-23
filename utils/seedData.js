const seedDestinations = [
  {
    title: 'Dudhsagar Waterfalls',
    state: 'Goa',
    country: 'India',
    category: 'Waterfalls',
    description:
      'Dudhsagar Waterfalls is a majestic four-tiered waterfall located on the Mandovi River in Goa. Surrounded by lush Bhagwan Mahaveer Sanctuary forest, it cascades down 310 meters and resembles a sea of milk. It is one of India\'s tallest and most spectacular waterfalls.',
    coordinates: { latitude: 15.3144, longitude: 74.3143 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-dudhsagar'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Monsoon',
        travelMode: 'Public Transport',
        parking: 'Limited',
        foodAvailability: 'Pack Your Own',
        crowdLevel: 'High',
        familyFriendly: 'Partially',
        timeSpent: 'Full Day',
        review:
          'Visited in July during peak monsoon. The waterfall flow was terrifyingly gorgeous! The jeep safari through Bhagwan Mahaveer Wildlife Sanctuary was bumpy but thrill-filled.',
        travelTips: 'Book the official Forest Dept jeep tickets early in Kulem. Carry rainproof covers for camera and phones.'
      },
      {
        rating: 4,
        visitedSeason: 'Winter',
        travelMode: 'Trekking/Walking',
        parking: 'Available',
        foodAvailability: 'Pack Your Own',
        crowdLevel: 'Moderate',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Winter trek along the railway track area was serene. Water flow is lower than monsoon, but the natural pool base is crystal clear for swimming with lifejackets.',
        travelTips: 'Lifejackets are mandatory for entering the water pool.'
      }
    ]
  },
  {
    title: 'Munnar Tea Gardens',
    state: 'Kerala',
    country: 'India',
    category: 'Mountains',
    description:
      'Munnar is a tranquil hill station in the Western Ghats mountain range of Kerala, renowned for its rolling tea plantations, mist-covered hills, crisp mountain air, and exotic flora like the Neelakurinji flower.',
    coordinates: { latitude: 10.0889, longitude: 77.0595 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-munnar'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Car',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'Moderate',
        familyFriendly: 'Yes',
        timeSpent: 'Multi-Day',
        review:
          'Breathtaking views everywhere you turn! Waking up to misty green carpeted mountains was magical. Easy road access and plenty of roadside tea stalls.',
        travelTips: 'Drive carefully around gap road curves; heavy morning fog reduces visibility.'
      }
    ]
  },
  {
    title: 'Taj Mahal',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Historical Places',
    description:
      'An ivory-white marble mausoleum on the south bank of the Yamuna River in Agra. Commissioned by Shah Jahan in 1631, it is a UNESCO World Heritage site and one of the Seven Wonders of the World.',
    coordinates: { latitude: 27.1751, longitude: 78.0421 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-tajmahal'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Autumn',
        travelMode: 'Public Transport',
        parking: 'Paid',
        foodAvailability: 'Available',
        crowdLevel: 'High',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Sunrise at the Taj is unforgettable. The morning light reflecting off white marble creates soft golden hues. Highly recommended for couples and families.',
        travelTips: 'Buy online tickets to skip long security queues at East Gate.'
      }
    ]
  },
  {
    title: 'Pangong Tso Lake',
    state: 'Ladakh',
    country: 'India',
    category: 'Lakes',
    description:
      'Pangong Tso is an endorheic high-altitude lake situated in the Himalayas at a height of 4,225 meters. Famous for changing colors from azure blue to deep emerald green throughout the day.',
    coordinates: { latitude: 33.7595, longitude: 78.6674 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-pangong'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Summer',
        travelMode: 'Bike',
        parking: 'Available',
        foodAvailability: 'Nearby',
        crowdLevel: 'Moderate',
        familyFriendly: 'Partially',
        timeSpent: 'Full Day',
        review:
          'Riding bikes over Chang La Pass to reach Pangong was an adventure of a lifetime. Camping overnight near the lake under starry skies is surreal.',
        travelTips: 'Acclimatize in Leh for at least 2 days prior to prevent AMS altitude sickness. Carry portable oxygen.'
      }
    ]
  },
  {
    title: 'Radhanagar Beach',
    state: 'Andaman & Nicobar Islands',
    country: 'India',
    category: 'Beaches',
    description:
      'Consistently ranked among Asia\'s finest beaches, Radhanagar Beach on Havelock Island boasts powdery white sand, turquoise ocean waters, and mesmerizing sunsets fringed by tropical rainforest.',
    coordinates: { latitude: 11.9842, longitude: 92.9525 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-radhanagar'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Public Transport',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'Low',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Cleanest sand and calmest water I have ever seen. Swimming here is safe and pleasant.',
        travelTips: 'Stay till 5:30 PM for the sunset, it lights up the sky in shades of violet.'
      }
    ]
  }
];

module.exports = seedDestinations;
