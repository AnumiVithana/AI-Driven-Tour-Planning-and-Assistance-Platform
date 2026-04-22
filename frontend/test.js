const fs = require('fs');
const content = fs.readFileSync('app/data/destinations.js', 'utf8');

// A crude bit of parsing to just evaluate the array
let parsedString = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
let popularDestinations;
try {
  // Try evaluating it
  popularDestinations = eval('(' + parsedString + ')');
} catch(e) {
  console.log('Error parsing:', e);
  process.exit(1);
}

const defaultReviews = [
  { user: "Sarah Jenkins", text: "Amazing place with scenic views, highly recommended!" },
  { user: "Michael Chen", text: "Perfect for relaxing and hiking. The atmosphere is incredible." },
  { user: "Emma Watson", text: "A truly unforgettable experience in Sri Lanka. Pictures don't do it justice." }
];

const defaultActivitiesMap = {
  "Nature": ["Hiking trails", "Photography", "Wildlife spotting", "Guided tours"],
  "Heritage": ["Historical tours", "Cultural sightseeing", "Museum visits", "Architecture photography"],
  "Beach": ["Swimming", "Surfing", "Sunbathing", "Seafood dining"],
  "City": ["Shopping", "City walking tours", "Local dining", "Nightlife"],
  "Budget": ["Local shopping", "Budget sightseeing", "Street food", "Backpacking"]
};

const updated = popularDestinations.map(dest => {
  if(!dest.reviews) dest.reviews = [defaultReviews[Math.floor(Math.random() * defaultReviews.length)], defaultReviews[Math.floor(Math.random() * defaultReviews.length)]];
  if(!dest.activities) dest.activities = defaultActivitiesMap[dest.category] || ["Sightseeing", "Photography"];
  if(!dest.averageRating) dest.averageRating = (Math.random() * 0.5 + 4.5).toFixed(1); // 4.5 - 5.0
  if(!dest.highlights) dest.highlights = ["Beautiful Scenery", "Local Culture"];
  return dest;
});

const output = 'export const popularDestinations = ' + JSON.stringify(updated, null, 2) + ';';
fs.writeFileSync('app/data/destinations.js', output);
console.log('Successfully updated destinations.js');
