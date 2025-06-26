import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/CartItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Icons
import { Home, CreditCard, Ticket } from 'lucide-react';

const initialCartItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 14.99,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Sparkling Water',
    price: 2.50,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1607685169343-4f27b4a2e49c?q=80&w=1974&auto=format&fit=crop',
  },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to a backend.
    console.log('Placing order...');
    navigate('/order-tracking'); // Navigate to the path defined in App.tsx
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" defaultValue="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" defaultValue="Anytown" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="CA" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" defaultValue="12345" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <CardDescription>
                  Select a saved payment method or add a new one.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select defaultValue="visa-4242">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa-4242">Visa ending in 4242</SelectItem>
                    <SelectItem value="mastercard-5555">Mastercard ending in 5555</SelectItem>
                    <SelectItem value="new-card">Add a new card</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flow-root">
                  {cartItems.length > 0 ? (
                    cartItems.map(item => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Delivery Fee</p>
                        <p>${deliveryFee.toFixed(2)}</p>
                    </div>
                     <div className="flex items-center gap-2 pt-2">
                        <Label htmlFor="promo" className="sr-only">Promo Code</Label>
                        <Input id="promo" placeholder="Promo Code" className="flex-1" />
                        <Button variant="outline">Apply</Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  size="lg" 
                  className="w-full font-semibold" 
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;