import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

// Lucide Icons
import { Search, Pizza, Utensils, Sandwich, Soup } from 'lucide-react';

// --- Placeholder Data ---

const sampleRestaurants: RestaurantCardProps[] = [
  {
    id: 1,
    name: "The Pizza Palace",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
    cuisineTypes: ["Pizza", "Italian"],
    rating: 4.5,
    deliveryTime: 25,
    slug: "the-pizza-palace"
  },
  {
    id: 2,
    name: "Sushi Central",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800",
    cuisineTypes: ["Sushi", "Japanese"],
    rating: 4.8,
    deliveryTime: 30,
    slug: "sushi-central"
  },
  {
    id: 3,
    name: "Burger Bliss",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
    cuisineTypes: ["Burgers", "American"],
    rating: 4.3,
    deliveryTime: 20,
    slug: "burger-bliss"
  },
  {
    id: 4,
    name: "Noodle House",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800",
    cuisineTypes: ["Noodles", "Asian"],
    rating: 4.6,
    deliveryTime: 35,
    slug: "noodle-house"
  },
  {
    id: 5,
    name: "Salad Grove",
    imageUrl: "https://images.unsplash.com/photo-1546793663-3d8b20f41621?q=80&w=800",
    cuisineTypes: ["Salads", "Healthy"],
    rating: 4.9,
    deliveryTime: 15,
    slug: "salad-grove"
  }
];

const foodCategories = [
  { name: 'Pizza', icon: Pizza },
  { name: 'Burgers', icon: Sandwich },
  { name: 'Sushi', icon: Utensils },
  { name: 'Soups', icon: Soup }
];

const promotions = [
    { title: '50% Off Your First Order!', description: 'Use code: NEWBITE50', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800' },
    { title: 'Free Delivery This Weekend', description: 'On all orders over $20', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800' }
];


const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleSearch = () => {
    // In a real app, you'd pass the search query
    console.log('Navigating to restaurant listing...');
    navigate('/restaurant-listing');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted/20 py-12 md:py-20">
          <div className="container text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Your favorite food, delivered fast.</h1>
            <p className="text-muted-foreground md:text-lg mb-8 max-w-2xl mx-auto">
              Get the best restaurants in your neighborhood delivered to your door.
            </p>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Search for restaurants or dishes" className="pl-10" />
              </div>
              <Button type="submit" onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
            <div className="container">
                <h2 className="text-2xl font-bold text-center mb-8">Top Categories</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {foodCategories.map((category) => (
                        <Button 
                            key={category.name} 
                            variant="outline" 
                            className="h-auto flex-col p-4 gap-2"
                            onClick={() => navigate('/restaurant-listing')} // Navigates to the listing page
                        >
                            <category.icon className="h-8 w-8 text-primary" />
                            <span className="font-semibold">{category.name}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </section>


        {/* Featured Restaurants Carousel */}
        <section className="bg-muted/20 py-12">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Restaurants</h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {sampleRestaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <RestaurantCard {...restaurant} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Promotions Carousel */}
        <section className="py-12">
            <div className="container">
                <h2 className="text-2xl font-bold text-center mb-8">Today's Deals</h2>
                 <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent>
                    {promotions.map((promo, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <Card className="overflow-hidden relative text-white">
                                <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover brightness-50" />
                                <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold">{promo.title}</h3>
                                    <p className="text-sm">{promo.description}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;