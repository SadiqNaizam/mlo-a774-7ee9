import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, MapPin, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  const cartItemCount = 3; // Placeholder for cart item count logic

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">QuickBites</span>
        </Link>

        {/* Middle Section: Delivery Address */}
        <Button 
          variant="outline" 
          className="flex-1 sm:flex-none sm:max-w-xs justify-start px-3"
          onClick={() => console.log('Change address clicked')}
        >
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <div className="text-left overflow-hidden">
            <p className="text-xs font-normal text-muted-foreground">Deliver to:</p>
            <p className="text-sm font-medium truncate">123 Main St, Anytown, USA</p>
          </div>
        </Button>

        {/* Right Section: Cart */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Open shopping cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;