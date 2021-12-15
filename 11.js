let cityArray = [
  {
    country: "Japan",
    name: "Tokyo",
    population: 13515271,
  },
  {
    country: "India",
    name: "Delhi",
    population: 16753235,
  },
  {
    country: "China",
    name: "Shanghai",
    population: 24870895,
  },
  {
    country: "Brazil",
    name: "São Paulo",
    population: 12252023,
  },
  {
    country: "Mexico",
    name: "Mexico City",
    population: 9209944,
  },

  {
    country: "Egypt",
    name: "Cairo",
    population: 9500000,
  },
  {
    country: "United States",
    name: "New York",
    population: 8804190,
  },
  {
    country: "Japan",
    name: "Osaka",
    population: 2725006,
  },
  {
    country: "United Kingdom",
    name: "London",
    population: 8825001,
  },
  {
    country: "United States",
    name: "Los Angeles",
    population: 3990456,
  },
];

function mostPopulationCity(count, city) {
  return city.sort((a, b) => b.population - a.population).splice(0, count);
}

console.log(mostPopulationCity(2, cityArray));

