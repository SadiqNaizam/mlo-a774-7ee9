import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the possible states for an order, matching the OrderTracker component
type OrderStatus = 'placed' | 'preparing' | 'delivery' | 'delivered';
const orderStatuses: OrderStatus[] = ['placed', 'preparing', 'delivery', 'delivered'];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  // State to manage the current order status
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('placed');

  // Effect to simulate the order progressing through statuses
  useEffect(() => {
    // Find the index of the current status
    const currentIndex = orderStatuses.indexOf(currentStatus);
    
    // If the order is not yet delivered, set a timeout to advance to the next status
    if (currentIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(orderStatuses[currentIndex + 1]);
      }, 5000); // Advance status every 5 seconds

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [currentStatus]); // Rerun effect when currentStatus changes

  // Placeholder data for the order
  const orderDetails = {
    orderId: 'QB-1A2B3C',
    estimatedDeliveryTime: '7:45 PM',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 container mx-auto py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Order Tracker */}
          <div className="lg:col-span-1">
            <OrderTracker
              currentStatus={currentStatus}
              orderId={orderDetails.orderId}
              estimatedDeliveryTime={orderDetails.estimatedDeliveryTime}
            />
          </div>

          {/* Right Column: Map and Actions */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Delivery Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                  {/* Placeholder for a map component. Using an image for demonstration. */}
                  <img 
                    src="https://www.mapquestapi.com/staticmap/v5/map?key=YOUR_API_KEY&center=40.7128,-74.0060&zoom=12&size=600,400&route=40.7128,-74.0060|40.7580,-73.9855" 
                    alt="Map showing delivery route from restaurant to destination" 
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=Live+Map+View'; e.currentTarget.onerror = null; }}
                  />
                </div>
                 <p className="text-sm text-muted-foreground mt-2">
                    Map is for illustrative purposes. Your real-time driver location will appear here.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button asChild className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;