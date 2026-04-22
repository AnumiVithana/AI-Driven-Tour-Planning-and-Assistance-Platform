export const featuredTours = [
	{
		id: 1,
		title: "Nature & Wildlife Safaris",
		duration: "5 Days / 4 Nights",
		price: "From $450",
		image: "/images/tours/nature.png",
		destinations: ["Yala National Park", "Udawalawe", "Sinharaja Forest"],
		category: "Nature",
		description: "Immerse yourself in the untamed beauty of Sri Lanka with our Nature & Wildlife Safari. This 5-day journey takes you deep into the heart of Yala and Udawalawe National Parks, renowned for their dense populations of free-roaming elephants, elusive leopards, and majestic crocodiles. You'll also explore the dense, biodiverse canopies of the Sinharaja Forest Reserve, a UNESCO World Heritage site home to rare endemic birds and flora. Enjoy guided jeep safaris at dawn and dusk, staying in comfortable eco-lodges that let you fall asleep to the sounds of the jungle.",
		itinerary: [
			{ day: "Day 1", title: "Arrival & Transfer to Udawalawe", description: "Arrive at Bandaranaike International Airport. You will be greeted by your guide and transferred to your eco-lodge near Udawalawe National Park. Evening relaxation and welcome dinner." },
			{ day: "Day 2", title: "Udawalawe Elephant Safari", description: "Early morning jeep safari in Udawalawe to witness massive herds of Asian Elephants. Afternoon visit to the Elephant Transit Home. Evening transfer to Yala." },
			{ day: "Day 3", title: "In Search of Leopards at Yala", description: "Full day safari inside Yala National Park, famous for having one of the highest leopard densities in the world. Includes a packed jungle picnic lunch." },
			{ day: "Day 4", title: "Sinharaja Rainforest Trek", description: "Transfer to Sinharaja. Embark on a guided trek through the dense, primary rainforest with an expert tracker to spot endemic birds and rare purple-faced langurs." },
			{ day: "Day 5", title: "Departure", description: "Morning bird watching session followed by breakfast. Transfer back to Colombo or the airport for your onward journey." }
		],
		budgetDetails: {
			total: "$450 per person",
			included: ["4 Nights 3-Star Eco-Lodge Accommodation", "Daily Breakfast & Dinner", "All Safari Jeep Rentals & Park Fees", "English-speaking Naturalist Guide", "A/C Vehicle Transfers"],
			excluded: ["International Flights", "Lunches", "Tips for drivers/guides", "Travel Insurance"]
		}
	},
	{
		id: 2,
		title: "Heritage & Cultural Wonders",
		duration: "7 Days / 6 Nights",
		price: "From $580",
		image: "/images/tours/heritage.png",
		destinations: ["Sigiriya Lion Rock", "Temple of the Tooth Relic", "Galle Fort", "Golden Temple"],
		category: "Heritage",
		description: "Step back in time and uncover the rich history of ancient Ceylon. This 7-day cultural immersion begins with the awe-inspiring Sigiriya Lion Rock, a massive monolithic rock fortress decorated with ancient frescoes. You'll then travel to Kandy to witness the sacred Temple of the Tooth Relic during magical evening rituals, and explore the Golden Cave Temple in Dambulla, filled with millennia-old Buddha statues. The journey concludes on the coast, where you'll wander through the charming cobblestone streets of the 17th-century Galle Dutch Fort.",
		itinerary: [
			{ day: "Day 1", title: "Arrival & Transfer to Dambulla", description: "Arrival in Colombo and immediate scenic drive to the Cultural Triangle. Check-in to your heritage hotel and relax." },
			{ day: "Day 2", title: "Sigiriya Rock Fortress", description: "Morning climb of the spectacular 5th-century Sigiriya Lion Rock. Afternoon visit to traditional village for authentic Sri Lankan cooking class and lunch." },
			{ day: "Day 3", title: "Dambulla Caves & Spice Garden", description: "Explore the Dambulla Cave Temple featuring magnificent ancient statues. En route to Kandy, stop at a traditional Matale spice garden." },
			{ day: "Day 4", title: "Kandy Cultural Tour", description: "Visit the revered Temple of the Sacred Tooth Relic. In the evening, enjoy a VIP seat at a traditional Kandyan cultural dance and fire-walking show." },
			{ day: "Day 5", title: "Journey to the South Coast", description: "Drive south to the coastal city of Galle. Afternoon at leisure on the beach." },
			{ day: "Day 6", title: "Galle Dutch Fort", description: "Guided walking tour through the UNSECO-listed Galle Fort, exploring 17th-century Dutch architecture, lighthouses, and boutique cafes." },
			{ day: "Day 7", title: "Departure", description: "Morning beach walk. Transfer to the airport via the scenic Southern Expressway." }
		],
		budgetDetails: {
			total: "$580 per person",
			included: ["6 Nights Boutique Heritage Hotel Accommodation", "Daily Breakfast", "All Entrance Ticket Fees (Sigiriya, Kandy, Dambulla)", "Cultural Show Tickets", "Private A/C Transport"],
			excluded: ["International Flights", "Lunches & Dinners", "Photo/Video permits at temples", "Personal expenses"]
		}
	},
	{
		id: 3,
		title: "Scenic Hill Country Journey",
		duration: "4 Days / 3 Nights",
		price: "From $320",
		image: "/images/tours/scenic.png",
		destinations: ["Ella", "Nuwara Eliya", "Nine Arches Bridge", "Diyaluma Falls"],
		category: "Scenic",
		description: "Escape to the cool, misty heights of Sri Lanka's 'Little England' with our Scenic Hill Country Journey. This refreshing 4-day tour navigates through endless rolling tea estates and cascading waterfalls. You'll take one of the world's most beautiful train rides through the mountains to reach Ella, hike to the iconic Nine Arches Bridge, and swim in the natural infinity pools atop Diyaluma Falls. Perfect for nature lovers and photographers seeking breathtaking panoramic views.",
		itinerary: [
			{ day: "Day 1", title: "Tea Plantations of Nuwara Eliya", description: "Drive up the winding, misty mountains to Nuwara Eliya. Take a guided tour of a working British-era tea factory and enjoy a fresh cup of Ceylon tea." },
			{ day: "Day 2", title: "The Famous Blue Train Ride", description: "Board the scenic train from Nanu Oya to Ella. Recognized as one of the most beautiful train journeys in the world, winding through clouds, forests, and tea farms." },
			{ day: "Day 3", title: "Ella Rock & Nine Arches Bridge", description: "Morning hike to the summit of Little Adam's Peak or Ella Rock. In the afternoon, visit the architectural marvel of the Nine Arches Bridge to watch trains pass." },
			{ day: "Day 4", title: "Diyaluma Falls & Departure", description: "Hike to the top of Sri Lanka's second highest waterfall, Diyaluma. Enjoy swimming in the natural upper pools before descending and transferring out." }
		],
		budgetDetails: {
			total: "$320 per person",
			included: ["3 Nights Mountain View Accommodation", "Daily Breakfast", "First-Class Scenic Train Tickets", "Tea Factory Tour & Degustation", "Chauffeur Guide"],
			excluded: ["International Flights", "Lunches & Dinners", "Optional Tuk Tuk rides", "Tips"]
		}
	},
	{
		id: 4,
		title: "Tropical Beach Holidays",
		duration: "6 Days / 5 Nights",
		price: "From $490",
		image: "/images/tours/beach.png",
		destinations: ["Mirissa Beach", "Bentota Beach", "Hikkaduwa Beach", "Passikudah"],
		category: "Beach",
		description: "Relax, unwind, and soak up the sun on Sri Lanka's most pristine coastlines. Over 6 days, you will experience the ultimate coastal lifestyle, from the lively surfing waves of Hikkaduwa to the serene, crystal-clear shallow bays of Passikudah. In Mirissa, wake up early for a spectacular whale-watching expedition before enjoying fresh seafood right on the sand. Whether you crave thrilling water sports or pure golden-sand relaxation, this beach holiday delivers it all.",
		itinerary: [
			{ day: "Day 1", title: "Arrival & Coastal Drive to Bentota", description: "Arrive at the airport. Take a breezy drive along the western coast to Bentota. Settle into your beachfront resort." },
			{ day: "Day 2", title: "Water Sports & River Safari", description: "Morning of thrilling water sports (jet skiing, windsurfing) on the Bentota lagoon. Afternoon relaxing madu river boat safari through dense mangrove tunnels." },
			{ day: "Day 3", title: "Hikkaduwa Coral Sanctuary", description: "Drive down to the vibrant surf town of Hikkaduwa. Snorkel in the shallow coral sanctuary to see colorful reef fish and swim with giant sea turtles." },
			{ day: "Day 4", title: "Mirissa Arrival & Secret Beach", description: "Journey deeper south to Mirissa. Spend the afternoon exploring the hidden 'Secret Beach' and enjoying the lively sunset bar scene." },
			{ day: "Day 5", title: "Whale Watching Expedition", description: "Wake up at 5:30 AM to board a deep-sea catamaran. Spend the morning spotting Blue Whales, Sperm Whales, and pods of Spinner Dolphins." },
			{ day: "Day 6", title: "Departure", description: "Enjoy a final morning swim and fresh coconut on the beach before transferring back to the airport." }
		],
		budgetDetails: {
			total: "$490 per person",
			included: ["5 Nights 4-Star Beach Resort Accommodation", "Daily Buffet Breakfast", "Whale Watching Boat Ticket", "Madu River Boat Safari Safari", "A/C Transport"],
			excluded: ["International Flights", "Lunches & Dinners", "Extra Water Sports equipment rental", "Snorkeling gear rental"]
		}
	},
	{
		id: 5,
		title: "Romantic Honeymoon Packages",
		duration: "8 Days / 7 Nights",
		price: "From $850",
		image: "/images/tours/honeymoon.png",
		destinations: ["Bentota Beach", "Ella", "Mirissa Beach"],
		category: "Honeymoon",
		description: "Celebrate your love with a curated 8-day romantic escape blending luxury, intimacy, and adventure. Start with candlelit dinners on the quiet, golden shores of Bentota Beach, surrounded by swaying palms. Then, retreat to the lush, secluded mountains of Ella for private hikes and breathtaking sunrise views from your boutique villa. The trip finishes perfectly in Mirissa, where you'll enjoy sunset sailing, couples spa treatments, and the magic of the turquoise Indian Ocean.",
		itinerary: [
			{ day: "Day 1", title: "Welcome & Beachfront Luxury", description: "VIP airport pickup with floral garlands. Transfer to a 5-star Bentota resort. Evening private beachfront candlelit dinner." },
			{ day: "Day 2", title: "Couples Spa & Lagoon Cruise", description: "Morning rejuvenating Ayurveda couples spa treatment. Afternoon private sunset boat cruise along the gentle lagoon network." },
			{ day: "Day 3", title: "Drive to the Misty Mountains", description: "Take a scenic, winding drive up into the cool hill country of Ella. Check into a luxury boutique cliffside villa with a private plunge pool." },
			{ day: "Day 4", title: "Private Tea Estate Picnic", description: "Gentle morning stroll to Little Adam's Peak followed by a luxury catered picnic lunch arranged inside a private, functioning tea plantation." },
			{ day: "Day 5", title: "Descent to the Southern Ocean", description: "Drive down the mountains to the boutique surf town of Mirissa. Check into your ocean-view suite." },
			{ day: "Day 6", title: "Private Sunset Sailing", description: "Day at leisure on the pristine beaches. In the late afternoon, board a private luxury yacht for sunset drinks and swimming in secluded bays." },
			{ day: "Day 7", title: "Leisure & Seafood Feast", description: "Total relaxation day. Evening farewell dinner featuring giant tiger prawns and fresh catch of the day by the seashore." },
			{ day: "Day 8", title: "Departure", description: "Breakfast in bed before your private chauffeur transfers you back to the airport." }
		],
		budgetDetails: {
			total: "$850 per person",
			included: ["7 Nights 5-Star / Boutique Luxury Accommodation", "Daily Breakfast & 2 Special Dinners", "Couples Spa Treatment", "Private Sunset Yacht Charter", "VIP Private Transport"],
			excluded: ["International Flights", "Standard Lunches & Dinners", "Alcoholic beverages", "Travel Insurance"]
		}
	},
	{
		id: 6,
		title: "Budget Backpacking Trips",
		duration: "10 Days / 9 Nights",
		price: "From $299",
		image: "/images/tours/budget.png",
		destinations: ["Colombo", "Kandy", "Ella", "Galle"],
		category: "Budget",
		description: "Experience the vibrant soul of Sri Lanka without breaking the bank on this epic 10-day backpacking adventure. Designed for the spirited traveler, you'll utilize local scenic trains and buses to traverse the island. Navigate the bustling street markets and street food scenes of Colombo, explore the cultural hub of Kandy, hike the lush trails of Ella, and surf the waves down south near Galle. Stay in highly-rated social hostels, meet fellow travelers, and dive deep into authentic local experiences.",
		itinerary: [
			{ day: "Day 1", title: "Colombo Street Life", description: "Arrive in Colombo. Navigate the chaotic and colorful Pettah markets and eat incredible street food (kottu roti) at Galle Face Green." },
			{ day: "Day 2", title: "Train to Kandy", description: "Take the local public train to Kandy. Settle into your hostel and take a self-guided walk around the beautifully serene Kandy Lake." },
			{ day: "Day 3", title: "Temple of the Tooth & Bus to Nuwara Eliya", description: "Morning visit to the Temple of the Tooth. Catch a cheap, winding local bus up through the tea estates to Nuwara Eliya." },
			{ day: "Day 4", title: "The Blue Train to Ella", description: "Wake up early, grab a corner seat on the cheap Third Class train carriage, and experience the legendary, wildly scenic mountain ride to Ella." },
			{ day: "Day 5", title: "Hiking Ella", description: "Full day of free hiking! Conquer Ella Rock in the morning, visit the Nine Arches Bridge, and relax at a backpacker cafe." },
			{ day: "Day 6", title: "Bus down to the Coast (Dewata / Galle)", description: "Take a local bus all the way down from the mountains to the southern coast. Check into a surf hostel near Galle." },
			{ day: "Day 7", title: "Beginner Surf Lessons", description: "Hit the waves at Dewata beach, renowned for being perfect for beginner surfers. Rent a board for a few dollars. Evening hostel party." },
			{ day: "Day 8", title: "Galle Fort Walkaround", description: "Take a tuk-tuk into Galle Dutch Fort. Enjoy free walking around the historic ramparts and cliff jumping at Flag Rock." },
			{ day: "Day 9", title: "Unawatuna Beach Hop", description: "Rent a scooter or walk the coast across Unawatuna and Jungle Beach, soaking in the tropical sun and cheap local curries." },
			{ day: "Day 10", title: "Train to Colombo & Departure", description: "Take the famously scenic coastal train line right along the beach back to Colombo for your departure." }
		],
		budgetDetails: {
			total: "$299 per person",
			included: ["9 Nights Highly-Rated Hostel Accommodation (Dorms)", "Daily Basic Breakfast", "All Train and Public Bus Tickets (Pre-booked where required)", "24/7 Digital Concierge Support"],
			excluded: ["International Flights", "Lunches & Dinners", "Tuk-Tuk rides", "Temple entrance fees", "Surf board rentals"]
		}
	},
	{
		id: 7,
		title: "Short City Break",
		duration: "3 Days / 2 Nights",
		price: "From $180",
		image: "/images/tours/city.png",
		destinations: ["Colombo", "Dehiwala Zoo", "Kelaniya Raja Maha Vihara"],
		category: "City",
		description: "A fast-paced, exciting 3-day getaway into the cosmopolitan heart of Sri Lanka. Discover the perfect blend of modern life and historical charm in Colombo, strolling along Galle Face Green at sunset and shopping in the vibrant Pettah markets. You'll also visit the sacred Kelaniya Raja Maha Vihara temple to admire its intricate ancient murals, and spend an afternoon surrounded by exotic wildlife at the sprawling Dehiwala Zoo. Ideal for a quick weekend recharge.",
		itinerary: [
			{ day: "Day 1", title: "Arrival & City Highlights", description: "Pick up from airport. Guided city tour of modern Colombo, Independence Square, and the incredible Red Mosque in chaotic Pettah." },
			{ day: "Day 2", title: "Spirituality & Wildlife", description: "Morning visit to the tranquil, ancient Kelaniya Raja Maha Vihara temple. Afternoon spent at the massive Dehiwala Zoological Gardens." },
			{ day: "Day 3", title: "Shopping & Departure", description: "Morning devoted to souvenir shopping at bare-bones local craft markets or high-end clothing boutiques like Odel. Afternoon transfer out." }
		],
		budgetDetails: {
			total: "$180 per person",
			included: ["2 Nights 4-Star City Center Hotel", "Daily Buffet Breakfast", "Colombo City Tour", "Temple & Zoo Entrance Fees", "A/C Chauffeur Vehicle"],
			excluded: ["International Flights", "Lunches & Dinners", "Personal Shopping", "Tips"]
		}
	}
];
