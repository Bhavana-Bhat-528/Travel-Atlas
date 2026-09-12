const seedDestinations = [
  {
    title: 'Dudhsagar Waterfalls',
    state: 'Goa',
    country: 'India',
    category: 'Waterfalls',
    description:
      'Dudhsagar Waterfalls is a majestic four-tiered waterfall located on the Mandovi River in Goa. Surrounded by lush Bhagwan Mahaveer Sanctuary forests, it cascades down 310 meters and resembles a flowing sea of milk. It is one of India\'s tallest and most spectacular natural waterfalls.',
    coordinates: { latitude: 15.3144, longitude: 74.3143 },
    coverImage: {
      url: 'https://i.pinimg.com/736x/cb/b0/93/cbb0932c7e9829997c2ce238b66305cf.jpg',
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
          'Visited during peak monsoon. The waterfall flow was terrifyingly gorgeous! The jeep safari through Bhagwan Mahaveer Wildlife Sanctuary was bumpy but full of adrenaline.',
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
          'Winter trek along the forest trail was serene. Water flow is lower than monsoon, but the natural pool base is crystal clear for swimming with lifejackets.',
        travelTips: 'Lifejackets are mandatory for entering the natural water pool at the base.'
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
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkoJuXGOnrhKzNkV7imIIftGJebxoTstjH6o-qwdeLf1lgOcdFvzD2PKd&s=10',
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
          'Breathtaking views everywhere you turn! Waking up to misty green carpeted mountains was magical. Easy road access and plenty of roadside tea stalls serving hot cardamom tea.',
        travelTips: 'Drive carefully around gap road curves; heavy morning fog reduces visibility.'
      },
      {
        rating: 5,
        visitedSeason: 'Autumn',
        travelMode: 'Tour Bus',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'Low',
        familyFriendly: 'Yes',
        timeSpent: 'Full Day',
        review:
          'The Kolukkumalai tea estate sunrise tour is an absolute must-do. Watching the sun rise over the ocean of clouds in Munnar is unforgettable.',
        travelTips: 'Hire a local 4x4 jeep from Suryanelli for the steep climb to Kolukkumalai.'
      }
    ]
  },
  {
    title: 'Taj Mahal',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Historical Places',
    description:
      'An ivory-white marble mausoleum on the south bank of the Yamuna River in Agra. Commissioned by Mughal Emperor Shah Jahan in 1631 to house the tomb of his favorite wife Mumtaz Mahal, it is a UNESCO World Heritage site and one of the Seven Wonders of the World.',
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
      },
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Car',
        parking: 'Paid',
        foodAvailability: 'Nearby',
        crowdLevel: 'Extreme',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Stunning architectural symmetry and intricate marble inlay work. Mehtab Bagh across the river gives a great sunset reflection view without the crowd.',
        travelTips: 'No large backpacks or tripod stands are allowed inside the main monument mausoleum.'
      }
    ]
  },
  {
    title: 'Pangong Tso Lake',
    state: 'Ladakh',
    country: 'India',
    category: 'Lakes',
    description:
      'Pangong Tso is an endorheic high-altitude lake situated in the Himalayas at a height of 4,225 meters. Famous for changing colors from azure blue to deep emerald green throughout the day depending on sun position.',
    coordinates: { latitude: 33.7595, longitude: 78.6674 },
    coverImage: {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThIwVbbsRdBDPtoCGKMZOqZegVVLHwjYmhGElPmNwHn9oqcPqY1-DzlQU&s=10',
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
      'Consistently ranked among Asia\'s finest beaches, Radhanagar Beach on Havelock Island (Swaraj Dweep) boasts powdery white sand, turquoise ocean waters, and mesmerizing sunsets fringed by tropical mahua trees.',
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
          'Cleanest sand and calmest water I have ever seen. Swimming here is very safe with lifeguard supervision.',
        travelTips: 'Stay till 5:30 PM for the sunset, it lights up the sky in vibrant shades of violet and crimson.'
      }
    ]
  },
  {
    title: 'Kedarnath Temple',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Temples',
    description:
      'Kedarnath Temple is a sacred 8th-century stone temple dedicated to Lord Shiva, located in the Garhwal Himalayan range near the Mandakini river. Perched at 3,583 meters above sea level amidst snow-capped peaks.',
    coordinates: { latitude: 30.7346, longitude: 79.0669 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-kedarnath'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Spring',
        travelMode: 'Trekking/Walking',
        parking: 'Paid',
        foodAvailability: 'Available',
        crowdLevel: 'High',
        familyFriendly: 'Partially',
        timeSpent: 'Multi-Day',
        review:
          'The 16 km trek from Gaurikund is challenging but spiritually uplifting. The moment the temple dome appears against the backdrop of Kedarnath peak is spiritual pure bliss.',
        travelTips: 'Pre-register for Char Dham Yatra pass and start trekking by 4 AM to avoid peak afternoon heat.'
      }
    ]
  },
  {
    title: 'Jim Corbett National Park',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Wildlife',
    description:
      'Established in 1936 as India\'s first national park, Jim Corbett National Park in Ramnagar is famous for its Bengal tiger population, dense sal forests, riverine belts, and diverse bird species.',
    coordinates: { latitude: 29.5300, longitude: 78.7747 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-corbett'
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
        timeSpent: 'Full Day',
        review:
          'Dhikala zone open jeep safari gave us a lucky tiger sighting near the Ramganga river! Beautiful landscapes and spotted deer herds.',
        travelTips: 'Book safari permits on the official Forest Department portal 45 days in advance.'
      }
    ]
  },
  {
    title: 'Rishikesh River Rafting',
    state: 'Uttarakhand',
    country: 'India',
    category: 'Adventure',
    description:
      'Known as the Adventure Capital of India, Rishikesh offers exhilarating white-water rafting on the Ganges River with rapids ranging from Grade I to Grade IV set against the picturesque Himalayan foothills.',
    coordinates: { latitude: 30.0869, longitude: 78.2676 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-rishikesh'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Spring',
        travelMode: 'Car',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'High',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Did the 16 km Shivpuri to Laxman Jhula stretch. Roller Coaster and Golf Course rapids were thrilling! Certified guides ensured total safety.',
        travelTips: 'Wear quick-dry synthetic clothing and secure footwear. Cliff jumping spot near the end is fantastic.'
      }
    ]
  },
  {
    title: 'Amer Palace Jaipur',
    state: 'Rajasthan',
    country: 'India',
    category: 'Historical Places',
    description:
      'Amer Fort (Amber Palace) is a majestic UNESCO World Heritage fortress located in Amer, Jaipur. Built with pale yellow and pink sandstone, it features courtyard gardens, the Sheesh Mahal (Mirror Palace), and sweeping views of Maota Lake.',
    coordinates: { latitude: 26.9855, longitude: 75.8513 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-amer'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Car',
        parking: 'Paid',
        foodAvailability: 'Available',
        crowdLevel: 'High',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'The Sheesh Mahal inside Amer Fort leaves you spellbound. The evening light and sound show brings Rajput history vividly alive.',
        travelTips: 'Hire an accredited tourist guide near the main Sun Gate (Suraj Pol) for rich historical anecdotes.'
      }
    ]
  },
  {
    title: 'Rohtang Pass',
    state: 'Himachal Pradesh',
    country: 'India',
    category: 'Road Trips',
    description:
      'Rohtang Pass is a dramatic mountain pass at an altitude of 3,978 meters on the Pir Panjal Range. Connecting Kullu Valley with the Lahaul and Spiti Valleys, it offers breathtaking views of glaciers and snow slopes.',
    coordinates: { latitude: 32.3716, longitude: 77.2466 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-rohtang'
    },
    sampleReviews: [
      {
        rating: 4,
        visitedSeason: 'Summer',
        travelMode: 'Car',
        parking: 'Limited',
        foodAvailability: 'Nearby',
        crowdLevel: 'Extreme',
        familyFriendly: 'Yes',
        timeSpent: 'Full Day',
        review:
          'Even in June, we enjoyed fresh snow! The drive from Manali through Gulaba has mesmerizing mountain vistas.',
        travelTips: 'Green NGT permit is mandatory for vehicles entering Rohtang; apply online a day prior.'
      }
    ]
  },
  {
    title: 'Coorg Hills & Plantations',
    state: 'Karnataka',
    country: 'India',
    category: 'Camping',
    description:
      'Kodagu (Coorg) is an emerald-green hill district in Karnataka celebrated for coffee plantations, spice estates, misty valleys, and outdoor camping under starlit canopy forests.',
    coordinates: { latitude: 12.3375, longitude: 75.8069 },
    coverImage: {
      url: 'https://www.zingbus.com/blog/wp-content/uploads/2026/06/4487.jpg',
      filename: 'seed-coorg'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Monsoon',
        travelMode: 'Car',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'Low',
        familyFriendly: 'Yes',
        timeSpent: 'Multi-Day',
        review:
          'Homestay coffee estate camping in Madikeri was peaceful and refreshing. Waking up to the fresh aroma of blooming coffee flowers and rain was magical.',
        travelTips: 'Try local Coorg Pandi curry and fresh estate-brewed filter coffee.'
      }
    ]
  },
  {
    title: 'Varanasi Ghats',
    state: 'Uttar Pradesh',
    country: 'India',
    category: 'Historical Places',
    description:
      'Varanasi Ghats are riverfront steps leading down to the sacred Ganges River. Dating back centuries, these 88 ghats form the spiritual heart of Kashi, hosting daily Ganga Aarti rituals, wooden rowboats, and timeless heritage.',
    coordinates: { latitude: 25.3176, longitude: 83.0104 },
    coverImage: {
      url: 'https://images.squarespace-cdn.com/content/v1/5e95d9b13e6b2f7f177b574b/1587739848976-248791SKDDTF5WU0WA54/1.+Along+the+ghats.jpg',
      filename: 'seed-varanasi'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Autumn',
        travelMode: 'Trekking/Walking',
        parking: 'Not Available',
        foodAvailability: 'Available',
        crowdLevel: 'Extreme',
        familyFriendly: 'Yes',
        timeSpent: 'Full Day',
        review:
          'The evening Ganga Aarti at Dashashwamedh Ghat is a soulful, mesmerising ritual of brass lamps and chanting. Morning boat ride at Assi Ghat is equally peaceful.',
        travelTips: 'Explore the narrow old city lanes on foot. Try authentic Banarasi lassi near Godowlia crossing.'
      }
    ]
  },
  {
    title: 'Alleppey Backwaters',
    state: 'Kerala',
    country: 'India',
    category: 'Lakes',
    description:
      'Alappuzha (Alleppey) is the hub of Kerala\'s famous backwater network. Featuring tranquil palm-fringed canals, paddy fields, and traditional wooden houseboats (Kettuvallams) gliding along Punnamada Lake.',
    coordinates: { latitude: 9.4981, longitude: 76.3388 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-alleppey'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Public Transport',
        parking: 'Available',
        foodAvailability: 'Available',
        crowdLevel: 'Moderate',
        familyFriendly: 'Yes',
        timeSpent: 'Multi-Day',
        review:
          'Overnight stay on a luxury houseboat was pure bliss. Delicious authentic Kerala Karimeen fish fry served onboard while watching sunset over calm backwaters.',
        travelTips: 'Book government-certified houseboats from Punnamada Jetty for transparent pricing.'
      }
    ]
  },
  {
    title: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
    state: 'Maharashtra',
    country: 'India',
    category: 'Museums',
    description:
      'Formerly Prince of Wales Museum, this premier art, archaeology, and natural history museum in Fort, Mumbai is housed in a magnificent Grade I heritage building combining Indo-Saracenic and Maratha architecture.',
    coordinates: { latitude: 18.9269, longitude: 72.8327 },
    coverImage: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Chhatrapati_Shivaji_Maharaj_Vastu_Sangrahalaya.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
      filename: 'seed-mumbaimuseum'
    },
    sampleReviews: [
      {
        rating: 5,
        visitedSeason: 'Winter',
        travelMode: 'Public Transport',
        parking: 'Paid',
        foodAvailability: 'Available',
        crowdLevel: 'Moderate',
        familyFriendly: 'Yes',
        timeSpent: 'Half Day',
        review:
          'Incredible collection of ancient Indian sculptures, miniature paintings, and natural history exhibits. Beautiful manicured garden surrounding the domed building.',
        travelTips: 'Opt for the audio guide device at entrance; it provides fascinating stories behind key artifacts.'
      }
    ]
  },
  {
    title: 'Meenakshi Amman Temple',
    state: 'Tamil Nadu',
    country: 'India',
    category: 'Temples',
    description:
      'Meenakshi Sundareshwarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai. Renowned for its 14 soaring gopuram towers sculpted with thousands of colorful mythological figures.',
    coordinates: { latitude: 9.9195, longitude: 78.1193 },
    coverImage: {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      filename: 'seed-meenakshi'
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
          'The architectural detail on the thousand-pillar hall and gopurams is unbelievable. Spiritual aura and vibrant temple tradition.',
        travelTips: 'Mobile phones and electronic gadgets are strictly prohibited inside the main temple premises; store them in locker counters outside.'
      }
    ]
  }
];

module.exports = seedDestinations;
