import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PackageCheck, ChefHat, Bike, PartyPopper } from 'lucide-react';

// Define the possible states for an order
type OrderStatus = 'placed' | 'preparing' | 'delivery' | 'delivered';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
  orderId: string;
  estimatedDeliveryTime: string;
}

// Define the stages of the order process
const stages = [
  { 
    id: 'placed' as OrderStatus,
    title: 'Order Placed',
    description: "We've received your order and are confirming it with the restaurant.",
    Icon: PackageCheck 
  },
  { 
    id: 'preparing' as OrderStatus,
    title: 'Preparing Your Meal',
    description: 'The kitchen is fired up and your food is being prepared.',
    Icon: ChefHat
  },
  { 
    id: 'delivery' as OrderStatus,
    title: 'Out for Delivery',
    description: 'Your rider is on the way to you with your delicious meal.',
    Icon: Bike 
  },
  { 
    id: 'delivered' as OrderStatus,
    title: 'Delivered',
    description: 'Your order has arrived. Enjoy your food!',
    Icon: PartyPopper 
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, orderId, estimatedDeliveryTime }) => {
  console.log('OrderTracker loaded for order:', orderId);

  const currentStageIndex = stages.findIndex(stage => stage.id === currentStatus);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Track Your Order</CardTitle>
        <CardDescription>
          Order ID: #{orderId} | Estimated Arrival: {estimatedDeliveryTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {/* Vertical connector line */}
          <div 
            className="absolute left-5 top-5 h-[calc(100%-2rem)] w-0.5 bg-gray-200 dark:bg-gray-700" 
            aria-hidden="true"
          />
          
          <ul className="space-y-10">
            {stages.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              const isUpcoming = index > currentStageIndex;

              const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

              return (
                <li key={stage.id} className="relative flex items-start">
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        status === 'completed' && 'bg-green-500 text-white',
                        status === 'current' && 'bg-blue-500 text-white ring-4 ring-blue-500/30',
                        status === 'upcoming' && 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      )}
                    >
                      <stage.Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4
                      className={cn(
                        'text-lg font-semibold',
                        status === 'upcoming' ? 'text-gray-500' : 'text-gray-900 dark:text-gray-50'
                      )}
                    >
                      {stage.title}
                    </h4>
                    <p
                      className={cn(
                        'text-sm',
                        status === 'upcoming' ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {stage.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;