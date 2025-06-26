import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from 'lucide-react';

/**
 * Props for the CartItem component.
 */
interface CartItemProps {
  /** A unique identifier for the cart item. */
  id: string | number;
  /** The name of the product. */
  name: string;
  /** The price of a single unit of the product. */
  price: number;
  /** The quantity of the product in the cart. */
  quantity: number;
  /** The URL for the product's image. */
  imageUrl: string;
  /** Callback function invoked when the quantity is changed. */
  onQuantityChange: (id: string | number, newQuantity: number) => void;
  /** Callback function invoked when the item is removed from the cart. */
  onRemove: (id: string | number) => void;
}

/**
 * A component that displays a single item in the shopping cart.
 * It shows item details, quantity controls, and a remove button.
 */
const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onQuantityChange,
  onRemove,
}) => {
  console.log('CartItem loaded for:', name);

  const handleIncreaseQuantity = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    // Prevent quantity from dropping below 1. Removal is handled by the remove button.
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleRemoveItem = () => {
    onRemove(id);
  };

  const subtotal = (price * quantity).toFixed(2);

  return (
    <div className="flex items-center gap-4 py-4 px-2 border-b last:border-b-0">
      {/* Item Image & Details */}
      <div className="flex items-center gap-4 flex-1">
        <img
          src={imageUrl || 'https://via.placeholder.com/80'}
          alt={name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-base leading-tight">{name}</p>
          <p className="text-sm text-muted-foreground">${price.toFixed(2)} each</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleDecreaseQuantity}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-bold text-lg w-10 text-center" aria-live="polite">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleIncreaseQuantity}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Subtotal and Remove Button */}
      <div className="flex items-center gap-4">
         <p className="font-semibold text-base w-20 text-right">${subtotal}</p>
         <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveItem}
            aria-label={`Remove ${name} from cart`}
            className="text-muted-foreground hover:text-destructive"
         >
            <Trash2 className="h-5 w-5" />
         </Button>
      </div>
    </div>
  );
};

export default CartItem;