import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  ];

  const infoLinks = [
    { name: 'About Us', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Terms of Service', path: '/#terms' },
    { name: 'Privacy Policy', path: '/#privacy' },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Social */}
          <div className="flex flex-col items-center md:items-start space-y-4">
             <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">QuickBites</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Your favorite food, delivered fast.
            </p>
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Spacer */}
          <div className="hidden md:block"></div>

          {/* Informational Links */}
          <div className="flex flex-col items-center md:items-end space-y-2">
             <h3 className="font-semibold mb-2">Information</h3>
             {infoLinks.map((link) => (
               <Link 
                 key={link.name} 
                 to={link.path}
                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
               >
                 {link.name}
               </Link>
             ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} QuickBites. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;