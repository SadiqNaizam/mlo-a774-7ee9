import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Clock } from 'lucide-react';
import StarRating from '@/components/StarRating'; // Assuming this component exists

export interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: number; // in minutes
  slug: string; // for clean URL navigation if routes change
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  slug,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  return (
    <Link 
      to="/restaurant-menu" 
      state={{ restaurantId: id, restaurantSlug: slug }} 
      className="group block"
      aria-label={`View menu for ${name}`}
    >
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=QuickBites'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-bold tracking-tight truncate">{name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary">
                {cuisine}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 bg-muted/40 text-sm text-muted-foreground flex justify-between items-center">
          <div className="flex items-center gap-2">
             {/* Assuming StarRating can take a rating and a readOnly prop or similar */}
            <StarRating rating={rating} readOnly={true} size={16} />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}-{deliveryTime + 10} min</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;