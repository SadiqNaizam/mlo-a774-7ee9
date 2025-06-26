import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from 'lucide-react';

interface MenuItemProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price, imageUrl, onAddToCart }) => {
  const { toast } = useToast();
  console.log('MenuItem loaded for:', name);

  const handleAddToCartClick = () => {
    onAddToCart(id);
    toast({
      title: "Item Added",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex items-start gap-4 py-6 border-b border-gray-200 last:border-b-0">
      {imageUrl && (
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold text-gray-900 mt-2">${price.toFixed(2)}</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <Button onClick={handleAddToCartClick} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;