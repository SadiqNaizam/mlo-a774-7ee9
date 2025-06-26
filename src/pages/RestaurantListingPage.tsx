import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal } from 'lucide-react';

const sampleRestaurants: RestaurantCardProps[] = [
  {
    id: 1,
    name: "Nonna's Pasta Palace",
    imageUrl: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=800',
    cuisineTypes: ['Italian', 'Pasta', 'Pizza'],
    rating: 4.7,
    deliveryTime: 30,
    slug: 'nonnas-pasta-palace',
  },
  {
    id: 2,
    name: 'The Golden Ladle',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800',
    cuisineTypes: ['Soup', 'Salad', 'Healthy'],
    rating: 4.5,
    deliveryTime: 25,
    slug: 'the-golden-ladle',
  },
  {
    id: 3,
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.6,
    deliveryTime: 20,
    slug: 'burger-bliss',
  },
  {
    id: 4,
    name: 'Sushi Sensation',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800',
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    deliveryTime: 40,
    slug: 'sushi-sensation',
  },
  {
    id: 5,
    name: 'Taco Town',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.4,
    deliveryTime: 25,
    slug: 'taco-town',
  },
  {
    id: 6,
    name: 'Peking Duck House',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800',
    cuisineTypes: ['Chinese', 'Noodles', 'Asian'],
    rating: 4.8,
    deliveryTime: 35,
    slug: 'peking-duck-house',
  }
];

const SkeletonCard = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );

const RestaurantListingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('RestaurantListingPage loaded');
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Find Your Next Meal</h1>
            <p className="text-muted-foreground">Displaying restaurants for "Italian" category.</p>
        </section>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search restaurants..." className="pl-10" />
            </div>
            <div className="flex items-center gap-4">
                <Select defaultValue="recommended">
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="delivery_time">Fastest Delivery</SelectItem>
                    </SelectContent>
                </Select>
                {/* A button for mobile filters could be added here */}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                    <SlidersHorizontal className="mr-2 h-5 w-5"/>
                    Filters
                </h3>
                <Accordion type="multiple" defaultValue={['cuisine', 'price']} className="w-full">
                    <AccordionItem value="cuisine">
                        <AccordionTrigger>Cuisine</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                           <div className="flex items-center space-x-2"><Checkbox id="italian" defaultChecked /><Label htmlFor="italian">Italian</Label></div>
                           <div className="flex items-center space-x-2"><Checkbox id="american" /><Label htmlFor="american">American</Label></div>
                           <div className="flex items-center space-x-2"><Checkbox id="mexican" /><Label htmlFor="mexican">Mexican</Label></div>
                           <div className="flex items-center space-x-2"><Checkbox id="asian" /><Label htmlFor="asian">Asian</Label></div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            <div className="flex items-center space-x-2"><Checkbox id="price1" /><Label htmlFor="price1">$ (Under $10)</Label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="price2" /><Label htmlFor="price2">$$ ($10 - $25)</Label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="price3" /><Label htmlFor="price3">$$$ (Over $25)</Label></div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dietary">
                        <AccordionTrigger>Dietary</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            <div className="flex items-center space-x-2"><Checkbox id="vegetarian" /><Label htmlFor="vegetarian">Vegetarian</Label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="vegan" /><Label htmlFor="vegan">Vegan</Label></div>
                            <div className="flex items-center space-x-2"><Checkbox id="gluten-free" /><Label htmlFor="gluten-free">Gluten-Free</Label></div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </aside>

            {/* Restaurant Grid */}
            <section className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                        : sampleRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} {...restaurant} />
                        ))}
                </div>
            </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;