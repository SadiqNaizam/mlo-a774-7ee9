import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/MenuItem';

// shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icons
import { Star, Clock, ShoppingCart, Trash2 } from 'lucide-react';

// Interfaces for our data structures
interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Appetizers' | 'Main Courses' | 'Desserts';
}

interface ICartItem extends IMenuItem {
  quantity: number;
}

// Placeholder data for the restaurant menu
const restaurantData = {
  name: 'Trattoria di Vento',
  address: '456 Oak Avenue, Flavor Town',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  rating: 4.8,
  deliveryTime: '25-35 min',
};

const menuItemsData: IMenuItem[] = [
  { id: 1, name: 'Bruschetta al Pomodoro', description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1505253716362-afb749868513?q=80&w=2070&auto=format&fit=crop', category: 'Appetizers' },
  { id: 2, name: 'Calamari Fritti', description: 'Golden fried squid served with a zesty marinara sauce.', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1625944012285-13a83351cf59?q=80&w=1974&auto=format&fit=crop', category: 'Appetizers' },
  { id: 3, name: 'Spaghetti Carbonara', description: 'Classic pasta with pancetta, egg yolk, Pecorino Romano, and black pepper.', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1608796837827-c717c3ea7100?q=80&w=1974&auto=format&fit=crop', category: 'Main Courses' },
  { id: 4, name: 'Margherita Pizza', description: 'Simple and delicious with San Marzano tomatoes, fresh mozzarella, and basil.', price: 15.50, imageUrl: 'https://images.unsplash.com/photo-1598021680133-eb3a7331d3b0?q=80&w=1964&auto=format&fit=crop', category: 'Main Courses' },
  { id: 5, name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with marinara and melted mozzarella.', price: 21.00, imageUrl: 'https://plus.unsplash.com/premium_photo-1664478239035-3d8931349133?q=80&w=2070&auto=format&fit=crop', category: 'Main Courses' },
  { id: 6, name: 'Tiramisu', description: 'Layers of coffee-soaked ladyfingers and creamy mascarpone.', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1571877232231-c27ee5383344?q=80&w=1974&auto=format&fit=crop', category: 'Desserts' },
  { id: 7, name: 'Cannoli', description: 'Crispy pastry shells filled with sweet, creamy ricotta.', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1627998336209-5d278065b999?q=80&w=1974&auto=format&fit=crop', category: 'Desserts' },
];

const RestaurantMenuPage = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  console.log('RestaurantMenuPage loaded');

  const handleAddToCart = (itemId: string | number) => {
    const itemToAdd = menuItemsData.find(item => item.id === itemId);
    if (!itemToAdd) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          {/* Restaurant Info Header */}
          <section className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border">
              <AvatarImage src={restaurantData.imageUrl} alt={restaurantData.name} className="object-cover" />
              <AvatarFallback>{restaurantData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{restaurantData.name}</h1>
              <p className="text-md text-muted-foreground mt-1">{restaurantData.address}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                <Badge variant="secondary" className="text-sm">
                  <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
                  {restaurantData.rating}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Clock className="h-4 w-4 mr-1.5" />
                  {restaurantData.deliveryTime}
                </Badge>
              </div>
            </div>
          </section>

          {/* Menu Section */}
          <Tabs defaultValue="Main Courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="Appetizers">Appetizers</TabsTrigger>
              <TabsTrigger value="Main Courses">Main Courses</TabsTrigger>
              <TabsTrigger value="Desserts">Desserts</TabsTrigger>
            </TabsList>
            
            {(['Appetizers', 'Main Courses', 'Desserts'] as const).map(category => (
                <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 gap-y-4">
                        {menuItemsData
                            .filter(item => item.category === category)
                            .map(item => (
                                <MenuItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    onAddToCart={handleAddToCart}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Cart Sheet */}
      <Sheet>
        <SheetTrigger asChild>
           <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg flex items-center justify-center">
             <ShoppingCart className="h-7 w-7" />
             {totalCartItems > 0 && 
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs">
                    {totalCartItems}
                </Badge>
             }
             <span className="sr-only">Open Cart</span>
           </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Order</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto -mx-6 px-6 divide-y">
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground text-center mt-8">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-semibold">{item.name} (x{item.quantity})</p>
                    <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <SheetFooter className="mt-auto border-t pt-4">
                <div className="w-full">
                    <div className="flex justify-between items-center font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button size="lg" className="w-full" asChild>
                        <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;